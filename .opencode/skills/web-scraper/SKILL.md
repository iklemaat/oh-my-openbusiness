---
name: web-scraper
description: "Autonomous web scraping for UX research. Triggers: scrape forums, extract comments, collect reviews, gather social media posts, extract user feedback from websites."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "1.0.0"
allowed-tools:
  - Bash(playwright-cli:*)
  - Bash(python:*)
---

# Web Scraper

Autonomous web scraping skill for UX research. Extracts user-generated content from forums, review sites, social media, and comment sections.

## When to Use This Skill

- Need to extract user comments from forum threads
- Scraping review sites for structured feedback
- Collecting social media posts about a product/topic
- Gathering user feedback from website comment sections
- Extracting data from product review pages

## Scraping Strategy by Source Type

### Forums (Reddit, Hacker News, specialized forums)
- Extract: post title, author, content, upvotes, replies, timestamps
- Focus: complaints, workarounds, comparisons, feature requests
- Pattern: Thread → Posts → Replies (hierarchical)

### Review Sites (App Store, Google Reviews, Trustpilot, G2)
- Extract: rating, review text, date, helpfulness votes, version
- Focus: pain points, praise patterns, version-specific issues
- Pattern: Product page → Reviews → Filters (rating, date, version)

### Social Media (Twitter/X, LinkedIn, Facebook groups)
- Extract: post content, engagement metrics, sentiment indicators
- Focus: real-time reactions, complaints, praise, comparisons
- Pattern: Search query → Posts → Engagement data

### Comment Sections (blogs, news articles, YouTube)
- Extract: comment text, author, date, replies, likes
- Focus: user opinions, corrections, additional context
- Pattern: Article/page → Comments → Threaded replies

## Data Extraction Protocol

1. **Identify the source structure** — Understand the page layout and data patterns
2. **Extract structured data** — Pull content, metadata, and engagement metrics
3. **Clean and normalize** — Remove HTML, normalize formatting, handle encoding
4. **Tag and categorize** — Apply initial codes (complaint, praise, question, suggestion)
5. **Store for analysis** — Save in structured format (JSON/CSV) with source attribution

## Anti-Patterns to Avoid

- Scraping personal/private content without consent
- Over-scraping (respect rate limits and terms of service)
- Extracting without context (always capture source URL and date)
- Ignoring contradictory data (capture ALL voices, not just confirming ones)

## Output Format

For each scraped item:
```
{
  "source_type": "forum|review|social|comment",
  "source_url": "https://...",
  "date": "YYYY-MM-DD",
  "content": "Direct quote from user",
  "sentiment": "positive|negative|neutral|mixed",
  "topic_tags": ["checkout", "pricing", "navigation"],
  "engagement": { "likes": 0, "replies": 0 },
  "user_context": "anonymous|verified|expert"
}
```
