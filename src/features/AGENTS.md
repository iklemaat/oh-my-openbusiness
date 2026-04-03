# src/features/ — Feature Modules

**Generated:** 2026-04-03

## OVERVIEW

Standalone feature modules wired into plugin/ layer. Each is self-contained with own types, implementation, and tests.

## MODULE MAP

| Module | Files | Purpose |
|--------|-------|---------|
| **opencode-skill-loader** | 33 | YAML frontmatter skill loading from 4 scopes (project, opencode, user, global) |
| **background-agent** | 31 | Task lifecycle, concurrency (5/model), polling, spawner pattern for parallel research waves |
| **builtin-skills** | 13 | 10 UX Research skills: web-scraper, social-listener, sentiment-analyzer, persona-builder, journey-mapper, ux-heuristics, research-methodology, competitor-analyst, data-triangulator, research-architect |
| **builtin-commands** | 9 | Research commands: init-deep, start-research, research-loop |
| **skill-mcp-manager** | 12 | MCP client lifecycle per session (stdio + HTTP) for research MCPs |
| **claude-code-plugin-loader** | 10 | Unified plugin discovery from .opencode/plugins/ |
| **claude-code-mcp-loader** | 6 | .mcp.json loading with ${VAR} env expansion |
| **context-injector** | 6 | AGENTS.md/README.md injection into context |
| **claude-code-session-state** | 3 | Subagent session state tracking |
| **claude-code-command-loader** | 3 | Load commands from .opencode/commands/ |
| **claude-code-agent-loader** | 3 | Load agents from .opencode/agents/ |
| **task-toast-manager** | 4 | Task progress notifications |
| **tool-metadata-store** | 3 | Tool execution metadata cache |
| **run-continuation-state** | 5 | Persistent state for `run` command continuation |
| **hook-message-injector** | 5 | System message injection for hooks |
| **boulder-state** | 5 | Persistent state for multi-step operations |

## KEY MODULES

### background-agent (31 files)

Core orchestration engine for parallel research waves. `BackgroundManager` manages task lifecycle:
- States: pending → running → completed/error/cancelled/interrupt
- Concurrency: per-model/provider limits via `ConcurrencyManager` (FIFO queue)
- Polling: 3s interval, completion via idle events + stability detection
- spawner/: 8 focused files composing via `SpawnerContext` interface

### opencode-skill-loader (33 files)

4-scope skill discovery (project > opencode > user > global):
- YAML frontmatter parsing from SKILL.md files
- Skill merger with priority deduplication
- Template resolution with variable substitution
- Provider gating for model-specific skills

### builtin-skills (10 skill objects)

| Skill | Purpose |
|-------|---------|
| web-scraper | Autonomous web scraping for UX research |
| social-listener | Social media and forum monitoring |
| sentiment-analyzer | 3-phase sentiment analysis protocol |
| persona-builder | Data-driven persona creation |
| journey-mapper | Customer journey map generation |
| ux-heuristics | Nielsen's 10 heuristics evaluation |
| research-methodology | GDS 4-phase research framework |
| competitor-analyst | Competitive UX benchmarking |
| data-triangulator | Cross-validate findings across sources |
| research-architect | Multi-wave research plan design |

Browser automation via playwright skill (Playwright MCP).
