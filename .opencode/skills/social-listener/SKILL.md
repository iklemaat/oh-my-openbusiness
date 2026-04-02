---
name: social-listener
description: "Social media and forum listening for UX research. Triggers: monitor social mentions, track user conversations, find forum discussions, social listening, brand monitoring."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "2.0.0"
mcp:
  - reddit
  - x-twitter
  - nlp-api
---

# Social Listener

Social media and forum listening skill for UX research. Finds and analyzes user conversations across social platforms, forums, and online communities.

## When to Use This Skill

- Monitoring what users say about a product/service
- Finding pain points from real user conversations
- Tracking competitor mentions and comparisons
- Discovering user workarounds and hacks
- Identifying emerging trends in user behavior

## Source Map

### Social Media Platforms
| Platform | Best For | Search Strategy |
|----------|----------|----------------|
| **Reddit** | Deep discussions, complaints, workarounds | Subreddit search, keyword threads, comparison posts |
| **Twitter/X** | Real-time reactions, quick complaints | Keyword search, brand mentions, hashtag tracking |
| **LinkedIn** | Professional/B2B opinions, industry trends | Industry groups, thought leader posts, company pages |
| **Facebook Groups** | Community discussions, support questions | Group search, topic-specific communities |
| **TikTok** | Visual complaints, demo frustrations | Hashtag search, product review videos |

### Forums and Communities
| Platform | Best For | Search Strategy |
|----------|----------|----------------|
| **Hacker News** | Tech product discussions, expert opinions | Site search, keyword threads, "Show HN" posts |
| **Product Hunt** | Product launches, early adopter feedback | Product comments, alternatives discussions |
| **Indie Hackers** | Startup/indie product feedback | Product discussions, pricing conversations |
| **Stack Overflow** | Developer experience, API frustrations | Tag search, unanswered questions, highly voted |
| **Quora** | User questions, comparison requests | Question search, "best alternative to" queries |
| **Discord/Slack** | Real-time community discussions | Community channels, support threads |

### Review Platforms
| Platform | Best For | Search Strategy |
|----------|----------|----------------|
| **G2/Capterra** | B2B software reviews, feature comparisons | Product reviews, alternative comparisons |
| **App Store/Play Store** | Mobile app feedback, version-specific issues | Reviews by version, rating filters |
| **Trustpilot** | Service quality, customer experience | Company reviews, response patterns |
| **Google Reviews** | Local business experiences | Location-specific reviews |

## Listening Protocol

### Phase 1: Source Identification
1. **Map the conversation landscape** — Where do users talk about this topic?
2. **Identify key communities** — Which subreddits, groups, forums are most active?
3. **Find comparison threads** — "X vs Y" posts reveal user decision criteria
4. **Locate complaint hubs** — Where do frustrated users vent?

### Phase 2: Data Collection
1. **Search with varied queries** — Product name, common complaints, alternatives
2. **Capture direct quotes** — User's actual words are evidence
3. **Note context** — Date, platform, user type (if visible)
4. **Track engagement** — Upvotes, replies, likes indicate resonance

### Phase 3: Pattern Extraction
1. **Group by theme** — What topics keep coming up?
2. **Identify sentiment** — Positive, negative, or neutral toward each theme?
3. **Find workarounds** — What creative solutions have users invented?
4. **Note contradictions** — Where do different communities disagree?

## Search Query Patterns

### Complaint Discovery
- "[product] sucks" / "[product] frustrating" / "[product] annoying"
- "why does [product] not" / "hate [product]" / "[product] worst"
- "alternative to [product]" / "switching from [product]"

### Feature Request Discovery
- "[product] should" / "wish [product] would" / "[product] needs"
- "feature request [product]" / "missing in [product]"

### Comparison Discovery
- "[product] vs [competitor]" / "[product] or [competitor]"
- "best [category] tool" / "[category] alternatives"

## Output Format

For each conversation thread:
```
## [Platform] — [Thread Title/Topic]

**Source**: [URL]
**Date**: [YYYY-MM-DD]
**Engagement**: [N upvotes/replies/likes]

**Key Quotes**:
> "[Direct quote from user]"

**Themes**: [complaint, praise, comparison, workaround, question]
**Sentiment**: [positive/negative/neutral/mixed]
**User Context**: [new user, power user, switcher, etc.]

**Insight**: [What this reveals about user needs/behavior]
```

## Anti-Patterns to Avoid

- **Listening to the wrong community** — Tech forums ≠ your average user
- **Overweighting vocal minorities** — Loud complainers ≠ majority opinion
- **Ignoring positive signals** — What users love is as important as what they hate
- **Taking single comments as trends** — Need patterns across multiple sources
- **Missing the context** — A complaint from 2020 may be irrelevant today
