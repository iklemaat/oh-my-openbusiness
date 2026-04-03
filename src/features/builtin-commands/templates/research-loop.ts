export const RESEARCH_LOOP_TEMPLATE = `You are initiating a self-referential UX research loop. This loop does NOT stop until 100% of research questions are answered with strong or moderate evidence.

## Research Topic

$ARGUMENTS

If no arguments provided, ask the user what they want to research.

## The Loop

This is a self-referential loop. After each iteration, you MUST check:

### Saturation Check (after each iteration)

Ask yourself:
1. Are all original research questions answered with strong/moderate evidence?
2. Did this iteration raise any NEW questions that need answering?
3. Have 2 consecutive iterations produced no new significant findings?
4. Are key findings triangulated across 2+ source types?

**If ALL answers are YES to questions 1, 3, 4 and NO to question 2 → SATURATION REACHED → STOP and deliver final report.**

**If ANY answer fails → LOOP AGAIN with new questions.**

### Each Iteration Must:

1. **Identify gaps** — What questions remain unanswered?
2. **Fire parallel research** — 3-5 explore agents + librarian agents across different source types
3. **Synthesize** — What new patterns emerged?
4. **Question** — What new questions does this raise?
5. **Check saturation** — If saturated, STOP and deliver. If not, LOOP.

### Source Types (always used in parallel each iteration)

- **Social listening**: Reddit, X/Twitter, TikTok mentions
- **Review mining**: App Store, Play Store, G2, Trustpilot, Capterra
- **Forum scanning**: Hacker News, Quora, niche forums
- **Competitor analysis**: Direct and indirect competitor UX patterns
- **Industry research**: Benchmarks, best practices, academic papers
- **Web scraping**: Blog posts, articles, case studies

### Stop Conditions (ALL must be true)

- No new questions emerge from synthesis (saturation)
- All original questions answered with strong/moderate evidence
- Findings triangulated across 2+ source types
- 2 consecutive iterations produced no new significant findings

### Final Deliverable (when loop stops)

1. **Executive Summary** — Key findings in 3-5 bullets
2. **Research Questions** — Each question with answer and evidence level
3. **Findings by Theme** — Organized patterns with direct quotes
4. **Personas** — If user segments identified
5. **Journey Map** — If pain points mapped
6. **Recommendations** — Prioritized, evidence-backed actions
7. **Gaps** — What still needs research (if any)
8. **Evidence Quality Report** — Strong/Medium/Weak breakdown

## Execution Rules

- Track ALL work with todos
- Fire agents in parallel, NEVER sequentially
- Load relevant skills before delegating
- Verify all findings with direct quotes
- NEVER present shallow findings as complete
- NEVER fabricate quotes or data
- DO NOT stop early — the loop continues until TRUE saturation

## Session Context

Session ID: $SESSION_ID
Timestamp: $TIMESTAMP`
