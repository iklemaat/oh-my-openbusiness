# oh-my-openbusiness — Autonomous UX Research System

**Generated:** 2026-04-03 | **Branch:** dev

## OVERVIEW

OpenCode plugin (npm: `oh-my-opencode`) that transforms OpenCode into an autonomous UX Research system. Extracts user feedback from the web (social media, forums, reviews, blogs), synthesizes findings into actionable insights, and produces research deliverables (reports, personas, journey maps).

## ARCHITECTURE

```
oh-my-openbusiness/
├── src/
│   ├── index.ts              # Plugin entry: loadConfig → createManagers → createTools → createHooks → createPluginInterface
│   ├── plugin-config.ts      # JSONC multi-level config: project → user → defaults (Zod)
│   ├── agents/               # 11 UX Research agents (Sisyphus, Hephaestus, Oracle, Librarian, Explore, Atlas, Prometheus, Metis, Momus, Multimodal-Looker, Sisyphus-Junior)
│   ├── hooks/                # Lifecycle hooks for research memory, context management, session recovery
│   ├── tools/                # Research tools (delegate-task, skill, skill-mcp, background tools, session manager)
│   ├── features/             # Feature modules (background-agent, builtin-skills, builtin-commands, skill-mcp-manager)
│   ├── shared/               # Shared utilities
│   ├── config/               # Zod schema system
│   ├── cli/                  # CLI: install, run, doctor, mcp-oauth
│   ├── mcp/                  # 13 built-in remote MCPs for web research
│   ├── plugin/               # OpenCode hook handlers + hook composition
│   └── plugin-handlers/      # Config loading pipeline
├── .opencode/
│   ├── skills/               # 7 UX Research skills (web-scraper, social-listener, sentiment-analyzer, persona-builder, journey-mapper, ux-heuristics, research-methodology)
│   └── command/              # Research commands (start-research, research-loop)
├── .sisyphus/
│   ├── plans/                # Research plans (checkout-abandonment.md)
│   ├── drafts/               # Draft reports
│   ├── findings/             # Persistent research findings
│   ├── deliverables/         # Generated reports, personas, journey maps
│   └── research-memory/      # Cross-session research memory
└── README.md
```

## RESEARCH FLOW

```
/start-research <topic>
  ├─→ Sisyphus (Research Director) receives request
  ├─→ Wave 1: Broad Discovery (parallel explore + librarian agents)
  │   ├─→ Explore (Web Scout) → Reddit, X/Twitter, forums, reviews
  │   ├─→ Librarian (Industry Researcher) → benchmarks, papers, reports
  │   └─→ Collect findings with quotes, sources, sentiment
  ├─→ Wave 2: Deep Dive (targeted research into identified patterns)
  ├─→ Wave 3: Validation & Triangulation (cross-validate findings)
  ├─→ Wave 4: Synthesis (thematic analysis, personas, journey maps)
  ├─→ Wave 5: Recommendations (prioritized, evidence-backed actions)
  └─→ Deliver: Research report with executive summary, findings, recommendations
```

## 11 UX RESEARCH AGENTS

| Agent | Role | Model | Type |
|-------|------|-------|------|
| **Sisyphus** | Research Director — orchestrates multi-wave research | qwen3.5-plus | primary |
| **Hephaestus** | Deep Researcher — autonomous end-to-end research | glm-5 | subagent |
| **Oracle** | Insight Analyst — synthesizes findings into insights | qwen3-max | subagent |
| **Librarian** | Industry Researcher — benchmarks, papers, reports | qwen3-coder-plus | subagent |
| **Explore** | Web Scout — social media, forums, reviews | qwen3-coder-next | subagent |
| **Atlas** | Master Orchestrator — full context coordination | qwen3.5-plus | primary |
| **Prometheus** | Research Planner — large-scale research planning | qwen3-coder-plus | subagent |
| **Metis** | Research Consultant — optimization and refinement | qwen3-coder-next | subagent |
| **Momus** | Plan Reviewer — quality analysis with reasoning | glm-4.7 | subagent |
| **Sisyphus-Junior** | Research Assistant — multimodal research | kimi-k2.5 | subagent |
| **Multimodal-Looker** | Visual Analyst — image/visual UX analysis | kimi-k2.5 | subagent |

## 10 BUILT-IN SKILLS (TypeScript)

| Skill | Purpose |
|-------|---------|
| **web-scraper** | Autonomous web scraping for UX research |
| **social-listener** | Social media and forum monitoring |
| **sentiment-analyzer** | 3-phase sentiment analysis protocol |
| **persona-builder** | Data-driven persona creation |
| **journey-mapper** | Customer journey map generation |
| **ux-heuristics** | Nielsen's 10 heuristics evaluation |
| **research-methodology** | GDS 4-phase research framework |
| **competitor-analyst** | Competitive UX benchmarking |
| **data-triangulator** | Cross-validate findings across sources |
| **research-architect** | Multi-wave research plan design |

## 13 MCPs (Web Research)

| MCP | Source | Purpose |
|-----|--------|---------|
| **websearch** | Exa/Tavily | General web search |
| **reddit** | Reddit API | Reddit posts and comments |
| **x-twitter** | X/Twitter API | Tweets and threads |
| **semantic-scholar** | Semantic Scholar API | Academic papers |
| **playwright** | Playwright MCP | Browser automation, screenshots |
| **nlp-api** | Apify | Sentiment analysis, NER |
| **google-analytics** | Google Analytics API | Behavioral data |
| **appstore-reviews** | Apify | App Store/Play Store reviews |
| **academic-search** | Academic sources | Research papers |
| **social-search** | Social platforms | Social media search |
| **webpage-extractor** | Jina Reader | Full article extraction |
| **accessibility-scanner** | Accessibility API | WCAG audits |
| **context7** | Context7 | Documentation lookup |

## 8 RESEARCH CATEGORIES

| Category | Model | Purpose |
|----------|-------|---------|
| **visual-audit** | kimi-k2.5 | Heuristic evaluation, visual analysis |
| **thematic-analysis** | glm-5 | Pattern identification, coding |
| **deep-research** | kimi-k2.5 | In-depth investigation |
| **creative-insights** | qwen3.5-plus | Creative analysis, ideation |
| **quick-lookup** | MiniMax-M2.5 | Fast fact-finding |
| **content-coding** | glm-5 | Qualitative data coding |
| **report-writing** | kimi-k2.5 | Research report generation |
| **comprehensive-study** | qwen3.5-plus | Full research studies |

## INITIALIZATION FLOW

```
OhMyOpenCodePlugin(ctx)
  ├─→ loadPluginConfig()         # JSONC parse → project/user merge → Zod validate → migrate
  ├─→ createManagers()           # BackgroundManager, SkillMcpManager, ConfigHandler
  ├─→ createTools()              # SkillContext + AvailableCategories + ToolRegistry
  ├─→ createHooks()              # Session + Tool-Guard + Transform + Continuation hooks
  └─→ createPluginInterface()    # OpenCode hook handlers → PluginInterface
```

## MULTI-LEVEL CONFIG

```
Project (.opencode/oh-my-opencode.jsonc)  →  User (~/.config/opencode/oh-my-opencode.jsonc)  →  Defaults
```

- `agents`, `categories`: deep merged recursively
- `disabled_*` arrays: Set union (concatenated + deduplicated)
- Zod `safeParse()` fills defaults for omitted fields

## CONVENTIONS

- **Runtime**: Bun only — never use npm/yarn
- **TypeScript**: strict mode, ESNext, bundler moduleResolution, `bun-types`
- **Test pattern**: Bun test (`bun:test`), co-located `*.test.ts`, given/when/then style
- **Factory pattern**: `createXXX()` for all tools, hooks, agents
- **Agent modes**: `primary` (user-facing) vs `subagent` (delegated)
- **Config format**: JSONC with comments, Zod validation, snake_case keys
- **File naming**: kebab-case for all files/directories
- **Imports**: relative within module, barrel imports across modules
- **No path aliases**: no `@/` — relative imports only

## ANTI-PATTERNS

- Never use `as any`, `@ts-ignore`, `@ts-expect-error`
- Never suppress lint/type errors
- Never add emojis to code/comments unless user explicitly asks
- Never commit unless explicitly requested
- Never run `bun publish` directly — use GitHub Actions
- Never modify `package.json` version locally
- Test: given/when/then — never use Arrange-Act-Assert comments
- Never create catch-all files (`utils.ts`, `helpers.ts`, `service.ts`)
- Empty catch blocks `catch(e) {}` — always handle errors
- index.ts is entry point ONLY — never dump business logic there

## COMMANDS

```bash
bun test                    # Bun test suite
bun run build              # Build plugin (ESM + declarations + schema)
bun run build:all          # Build + platform binaries
bun run typecheck           # tsc --noEmit
bunx oh-my-opencode install # Interactive setup
bunx oh-my-opencode doctor  # Health diagnostics
bunx oh-my-opencode run     # Non-interactive session
```

## NOTES

- Logger writes to `/tmp/oh-my-opencode.log` — check there for debugging
- Background tasks: 5 concurrent per model/provider (configurable)
- Model fallback: bailian-coding-plan provider with 8 models
- Build: bun build (ESM) + tsc --emitDeclarationOnly
