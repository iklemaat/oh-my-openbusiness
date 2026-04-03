# research-loop

Self-referential UX research loop. Doesn't stop until 100% of research questions are answered.

## Usage

/research-loop [research-topic]

## What it does

1. Clarifies the research topic and breaks it into specific questions
2. Researches each question across multiple source types in parallel
3. For every answer found, checks if it raises new questions
4. Researches those new questions
5. Repeats until no new questions emerge (saturation)
6. Synthesizes all findings into a comprehensive research report

## How it works

The loop follows this cycle:

```
ASK: What do we need to know?
  ↓
RESEARCH: Fire parallel agents across source types (social, reviews, forums, competitors)
  ↓
SYNTHESIZE: What did we learn? What patterns emerged?
  ↓
QUESTION: What new questions does this raise?
  ↓
  If new questions → loop back to RESEARCH
  If no new questions → SATURATION REACHED
  ↓
DELIVER: Comprehensive research report with all findings
```

## Source Types (always used in parallel)

- **Social listening**: Reddit, X/Twitter, TikTok mentions
- **Review mining**: App Store, Play Store, G2, Trustpilot, Capterra
- **Forum scanning**: Hacker News, Quora, niche forums, Discord/Slack exports
- **Competitor analysis**: Direct and indirect competitor UX patterns
- **Industry research**: Benchmarks, best practices, academic papers
- **Web scraping**: Blog posts, articles, case studies

## Stop Conditions

The loop terminates when ALL of these are true:
- No new questions emerge from synthesis (saturation)
- All original questions answered with strong/moderate evidence
- Findings triangulated across 2+ source types
- 2 consecutive loops produced no new significant findings

## Example

/research-loop checkout abandonment

This will research why users abandon checkout flows, iterating until all aspects are understood.
