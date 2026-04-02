---
name: sentiment-analyzer
description: "Sentiment analysis for user feedback, reviews, and social media. Triggers: analyze sentiment, gauge user opinion, review analysis, social listening, feedback categorization."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "1.0.0"
---

# Sentiment Analyzer

Systematic sentiment analysis for user-generated content. Categorizes and quantifies user emotions, opinions, and attitudes from text data.

## When to Use This Skill

- Analyzing large volumes of user reviews
- Gauging sentiment from social media mentions
- Categorizing feedback from surveys or support tickets
- Tracking sentiment changes over time
- Comparing sentiment across competitors

## Sentiment Classification Framework

### Primary Sentiment
- **Positive**: Expressing satisfaction, praise, recommendation
- **Negative**: Expressing frustration, complaint, warning others
- **Neutral**: Factual statements, questions, balanced views
- **Mixed**: Contains both positive and negative elements

### Sentiment Intensity
- **Strong**: Highly emotional language, emphatic statements
- **Moderate**: Clear opinion but measured expression
- **Mild**: Subtle preference or slight concern

### Sentiment Targets
What is the sentiment directed at?
- **Product/Service**: The core offering
- **Specific Feature**: A particular functionality
- **User Experience**: The overall interaction
- **Price/Value**: Cost-related opinions
- **Customer Support**: Service and help experiences
- **Competitor**: Comparisons with alternatives

## Analysis Protocol

### Phase 1: Individual Classification
For each piece of content:
1. **Read the full text** — Don't judge by first impression
2. **Identify the primary sentiment** — Positive, Negative, Neutral, Mixed
3. **Rate the intensity** — Strong, Moderate, Mild
4. **Identify the target** — What specifically is being evaluated
5. **Extract key phrases** — The exact words that reveal sentiment

### Phase 2: Pattern Aggregation
1. **Count by sentiment** — What percentage is positive vs negative?
2. **Identify top targets** — What do people feel most strongly about?
3. **Find recurring themes** — What specific aspects drive sentiment?
4. **Track intensity distribution** — Are opinions polarized or moderate?

### Phase 3: Insight Generation
1. **Connect sentiment to behavior** — Do negative sentiments correlate with abandonment?
2. **Identify sentiment drivers** — What specific features/issues drive the strongest emotions?
3. **Note sentiment shifts** — Has sentiment changed after updates or events?
4. **Surface contradictions** — Where do stated opinions conflict with actual behavior?

## Output Format

```
## Sentiment Analysis Summary

**Overall Sentiment**: [Positive/Negative/Mixed] ([X]% positive, [Y]% negative, [Z]% neutral)
**Sample Size**: [N items analyzed]
**Source Types**: [forums, reviews, social media, etc.]

### Sentiment by Target
| Target | Positive | Negative | Neutral | Top Driver |
|--------|----------|----------|---------|------------|
| [Feature X] | [N]% | [N]% | [N]% | [What drives sentiment] |

### Key Themes
**Positive Drivers**:
- [Theme]: [Example quote]

**Negative Drivers**:
- [Theme]: [Example quote]

### Notable Patterns
- [Pattern observation with evidence]

### Recommendations
- [Actionable recommendation based on sentiment findings]
```

## Anti-Patterns to Avoid

- **False positivity**: "It's okay" is not positive — it's lukewarm
- **Ignoring intensity**: 100 mild complaints < 10 furious complaints
- **Averaging away extremes**: Polarized opinions are meaningful data
- **Confusing frequency with importance**: Rare but intense sentiments matter
- **Ignoring the "why"**: Sentiment without the reason behind it is useless
