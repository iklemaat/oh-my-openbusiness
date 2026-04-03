# src/mcp/ — 13 Built-in Remote MCPs for UX Research

**Generated:** 2026-04-03

## OVERVIEW

Tier 1 of the three-tier MCP system. 13 remote HTTP MCPs created via `createBuiltinMcps(disabledMcps, config)`.

## BUILT-IN MCPs

| Name | URL | Env Vars | Purpose |
|------|-----|----------|---------|
| **websearch** | Exa/Tavily | `EXA_API_KEY` or `TAVILY_API_KEY` | General web search |
| **reddit** | `mcp.reddit.com/mcp` | None | Reddit posts and comments |
| **x-twitter** | `mcp.x.com/mcp` | None | Tweets and threads |
| **semantic-scholar** | `mcp.semantic-scholar.org/mcp` | None | Academic papers |
| **playwright** | npx `@playwright/mcp@latest` | None | Browser automation, screenshots |
| **nlp-api** | Apify | `APIFY_API_TOKEN` | Sentiment analysis, NER |
| **google-analytics** | Google Analytics | Google auth | Behavioral data |
| **appstore-reviews** | Apify | `APIFY_API_TOKEN` | App Store/Play Store reviews |
| **academic-search** | Academic sources | Varies | Research papers |
| **social-search** | Social platforms | Varies | Social media search |
| **webpage-extractor** | Jina Reader | `JINA_API_KEY` | Full article extraction |
| **accessibility-scanner** | Accessibility API | Varies | WCAG audits |
| **context7** | `mcp.context7.com/mcp` | `CONTEXT7_API_KEY` | Documentation lookup |

## REGISTRATION PATTERN

```typescript
// Static export
export const reddit = {
  type: "remote" as const,
  url: "https://mcp.reddit.com/mcp",
  enabled: true,
  oauth: false as const,
}

// Factory with config
export function createWebsearchConfig(config?: WebsearchConfig): RemoteMcpConfig
```

## ENABLE/DISABLE

```jsonc
// Method 1: disabled_mcps array
{ "disabled_mcps": ["websearch", "reddit"] }

// Method 2: enabled flag
{ "mcp": { "websearch": { "enabled": false } } }
```

## THREE-TIER SYSTEM

| Tier | Source | Mechanism |
|------|--------|-----------|
| 1. Built-in | `src/mcp/` | 13 remote HTTP, created by `createBuiltinMcps()` |
| 2. Claude Code | `.mcp.json` | `${VAR}` expansion via `claude-code-mcp-loader` |
| 3. Skill-embedded | SKILL.md YAML | Managed by `SkillMcpManager` (stdio + HTTP) |

## FILES

| File | Purpose |
|------|---------|
| `index.ts` | `createBuiltinMcps()` factory |
| `types.ts` | `McpNameSchema` enum with 13 MCPs |
| `websearch.ts` | Exa/Tavily provider with config |
| `reddit.ts` | Reddit MCP config |
| `x-twitter.ts` | X/Twitter MCP config |
| `semantic-scholar.ts` | Academic papers MCP |
| `playwright.ts` | Browser automation MCP |
| `nlp-api.ts` | NLP analysis MCP |
| `google-analytics.ts` | Analytics MCP |
| `appstore-reviews.ts` | App reviews MCP |
| `academic-search.ts` | Academic search MCP |
| `social-search.ts` | Social search MCP |
| `webpage-extractor.ts` | Jina Reader MCP |
| `accessibility-scanner.ts` | Accessibility MCP |
