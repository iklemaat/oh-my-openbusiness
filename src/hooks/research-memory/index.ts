/**
 * Research Memory Hook
 *
 * Captures learnings from each completed research session and updates
 * the pattern library and skill effectiveness data.
 *
 * Fires on: session.idle (after research completes)
 *
 * What it does:
 * 1. Extracts findings from the research output
 * 2. Updates source-effectiveness.json (which sources produced best results)
 * 3. Updates pattern-library.json (recurring user behavior patterns)
 * 4. Updates findings-index.json (searchable index of all past findings)
 * 5. Generates skill-improvement suggestions if patterns repeat 3+ times
 */

import type { HookFunction } from "../types"

interface ResearchMemory {
  session_id: string
  timestamp: string
  research_topic: string
  sources_used: string[]
  findings_count: number
  insights_count: number
  source_effectiveness: Record<string, SourceEffectiveness>
  patterns_detected: PatternEntry[]
}

interface SourceEffectiveness {
  source_type: string
  findings_produced: number
  quality_score: number // 0-1 based on evidence strength
  last_used: string
  total_uses: number
  avg_quality: number
}

interface PatternEntry {
  pattern: string
  first_seen: string
  occurrences: number
  sources: string[]
  confidence: "low" | "medium" | "high"
  related_findings: string[]
}

function extractTextContent(
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> | undefined,
): string {
  if (!content) return ""
  if (typeof content === "string") return content
  return content.map((block) => block.text ?? "").join(" ")
}

export function createResearchMemoryHook(): HookFunction {
  return async (event, ctx) => {
    if (event.type !== "session.idle") return

    const session = ctx.session
    if (!session) return

    // Only process research sessions
    const isResearchSession = session.messages?.some(
      (m: any) =>
        m.role === "user" &&
        /investigate|research|analyze|audit|find.*about|what.*people.*say/i.test(extractTextContent(m.content))
    )

    if (!isResearchSession) return

    // Extract research topic from first user message
    const firstUserMessage = session.messages?.find((m: any) => m.role === "user")
    const researchTopic = extractTextContent(firstUserMessage?.content).slice(0, 200) || "unknown"

    // Count findings and insights in the session
    const assistantMessages = session.messages?.filter((m: any) => m.role === "assistant") || []
    let findingsCount = 0
    let insightsCount = 0
    const sourcesUsed = new Set<string>()

    for (const msg of assistantMessages) {
      const content = extractTextContent(msg.content)
      findingsCount += (content.match(/finding|evidence|quote|data point/gi) || []).length
      insightsCount += (content.match(/insight|pattern|theme|recommendation/gi) || []).length

      // Extract source types mentioned
      const sourceMatches = content.match(
        /(reddit|twitter|x\.com|forum|review|app store|play store|survey|analytics)/gi
      )
      sourceMatches?.forEach((s: string) => sourcesUsed.add(s.toLowerCase()))
    }

    // Build memory entry
    const memory: ResearchMemory = {
      session_id: session.id,
      timestamp: new Date().toISOString(),
      research_topic: researchTopic,
      sources_used: Array.from(sourcesUsed),
      findings_count: findingsCount,
      insights_count: insightsCount,
      source_effectiveness: {},
      patterns_detected: [],
    }

    // Calculate source effectiveness
    for (const source of sourcesUsed) {
      const sourceFindings = findingsCount / Math.max(sourcesUsed.size, 1)
      memory.source_effectiveness[source] = {
        source_type: source,
        findings_produced: Math.round(sourceFindings),
        quality_score: insightsCount > 0 ? Math.min(insightsCount / findingsCount, 1) : 0,
        last_used: memory.timestamp,
        total_uses: 1,
        avg_quality: insightsCount > 0 ? Math.min(insightsCount / findingsCount, 1) : 0,
      }
    }

    // Save to research memory
    const memoryPath = `${ctx.directory}/.sisyphus/research-memory`

    try {
      // Append to findings index
      const findingsIndex = await readOrCreateJson(`${memoryPath}/findings-index.json`, {
        sessions: [],
        total_findings: 0,
        total_insights: 0,
      })

      findingsIndex.sessions.push({
        id: memory.session_id,
        topic: memory.research_topic,
        timestamp: memory.timestamp,
        findings: memory.findings_count,
        insights: memory.insights_count,
        sources: memory.sources_used,
      })
      findingsIndex.total_findings += memory.findings_count
      findingsIndex.total_insights += memory.insights_count

      await writeJson(`${memoryPath}/findings-index.json`, findingsIndex)

      // Update source effectiveness
      const sourceEffectiveness = await readOrCreateJson(
        `${memoryPath}/source-effectiveness.json`,
        {}
      )

      for (const [source, data] of Object.entries(memory.source_effectiveness)) {
        if (!sourceEffectiveness[source]) {
          sourceEffectiveness[source] = data
        } else {
          const existing = sourceEffectiveness[source]
          existing.total_uses += 1
          existing.last_used = data.last_used
          existing.findings_produced += data.findings_produced
          // Running average
          existing.avg_quality =
            (existing.avg_quality * (existing.total_uses - 1) + data.quality_score) /
            existing.total_uses
        }
      }

      await writeJson(`${memoryPath}/source-effectiveness.json`, sourceEffectiveness)

      // Update pattern library
      const patternLibrary = await readOrCreateJson(`${memoryPath}/pattern-library.json`, {
        patterns: [],
        last_updated: null,
      })

      // Extract potential patterns from findings (simple keyword-based for now)
      const patternKeywords = [
        "abandon",
        "frustrat",
        "confus",
        "slow",
        "expensive",
        "hidden",
        "unclear",
        "broken",
        "missing",
        "difficult",
      ]

      for (const msg of assistantMessages) {
        const content = extractTextContent(msg.content)
        for (const keyword of patternKeywords) {
          const regex = new RegExp(keyword, "gi")
          const matches = content.match(regex)
          if (matches && matches.length >= 2) {
            const existingPattern = patternLibrary.patterns.find(
              (p: PatternEntry) => p.pattern === keyword
            )

            if (existingPattern) {
              existingPattern.occurrences += matches.length
              existingPattern.sources = [
                ...new Set([...existingPattern.sources, ...memory.sources_used]),
              ]
              if (existingPattern.occurrences >= 5) {
                existingPattern.confidence = "high"
              } else if (existingPattern.occurrences >= 3) {
                existingPattern.confidence = "medium"
              }
            } else {
              patternLibrary.patterns.push({
                pattern: keyword,
                first_seen: memory.timestamp,
                occurrences: matches.length,
                sources: [...memory.sources_used],
                confidence: matches.length >= 5 ? "high" : matches.length >= 3 ? "medium" : "low",
                related_findings: [memory.session_id],
              })
            }
          }
        }
      }

      patternLibrary.last_updated = memory.timestamp
      await writeJson(`${memoryPath}/pattern-library.json`, patternLibrary)

      // Generate skill improvement suggestions
      const highConfidencePatterns = patternLibrary.patterns.filter(
        (p: PatternEntry) => p.confidence === "high"
      )

      if (highConfidencePatterns.length > 0) {
        const skillImprovements = await readOrCreateJson(
          `${memoryPath}/skill-improvements.json`,
          { suggestions: [], last_generated: null }
        )

        for (const pattern of highConfidencePatterns) {
          const suggestion = {
            pattern: pattern.pattern,
            suggestion: `Add ${pattern.pattern} detection to research prompts. This pattern appeared ${pattern.occurrences} times across ${pattern.sources.length} source types.`,
            confidence: pattern.confidence,
            generated_at: memory.timestamp,
          }

          // Avoid duplicate suggestions
          const exists = skillImprovements.suggestions.some(
            (s: any) => s.pattern === pattern.pattern
          )
          if (!exists) {
            skillImprovements.suggestions.push(suggestion)
          }
        }

        skillImprovements.last_generated = memory.timestamp
        await writeJson(`${memoryPath}/skill-improvements.json`, skillImprovements)
      }
    } catch (error) {
      // Non-critical: memory capture failure should not break the session
      ctx.log?.warn(`Research memory capture failed: ${error}`)
    }
  }
}

async function readOrCreateJson(path: string, defaultValue: any): Promise<any> {
  try {
    const { readFile } = await import("fs/promises")
    const content = await readFile(path, "utf-8")
    return JSON.parse(content)
  } catch {
    return JSON.parse(JSON.stringify(defaultValue))
  }
}

async function writeJson(path: string, data: any): Promise<void> {
  const { writeFile, mkdir } = await import("fs/promises")
  const { dirname } = await import("path")
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, JSON.stringify(data, null, 2), "utf-8")
}
