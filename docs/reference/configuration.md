# Configuration Reference

Complete reference for Oh My OpenBusiness plugin configuration.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [File Locations](#file-locations)
  - [Quick Start Example](#quick-start-example)
- [Core Concepts](#core-concepts)
  - [Agents](#agents)
  - [Categories](#categories)
  - [Model Resolution](#model-resolution)
- [Task System](#task-system)
  - [Background Tasks](#background-tasks)
  - [Sisyphus Agent](#sisyphus-agent)
- [Features](#features)
  - [Skills](#skills)
  - [Hooks](#hooks)
  - [Commands](#commands)
  - [Browser Automation](#browser-automation)
  - [Tmux Integration](#tmux-integration)
  - [Notification](#notification)
  - [MCPs](#mcps)
- [Advanced](#advanced)
  - [Runtime Fallback](#runtime-fallback)
  - [Model Capabilities](#model-capabilities)
  - [Experimental](#experimental)
- [Reference](#reference)
  - [Environment Variables](#environment-variables)

---

## Getting Started

### File Locations

User config is loaded first, then project config overrides it.

1. Project config: `.opencode/oh-my-openbusiness.jsonc` or `.opencode/oh-my-openbusiness.json`
2. User config (`.jsonc` preferred over `.json`):

| Platform    | Path candidates |
| ----------- | --------------- |
| macOS/Linux | `~/.config/opencode/oh-my-openbusiness.json[c]` |
| Windows     | `%APPDATA%\opencode\oh-my-openbusiness.json[c]` |

JSONC supports `// line comments`, `/* block comments */`, and trailing commas.

Enable schema autocomplete:

```json
{
  "$schema": "https://opencode.ai/config.json"
}
```

### Quick Start Example

Here's a practical starting configuration for UX Research:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",

  "provider": {
    "bailian-coding-plan": {
      "npm": "@ai-sdk/anthropic",
      "name": "Model Studio Coding Plan",
      "options": {
        "baseURL": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "qwen3.5-plus": {
          "name": "Qwen3.5 Plus",
          "modalities": { "input": ["text", "image"], "output": ["text"] },
          "options": { "thinking": { "type": "enabled", "budgetTokens": 8192 } },
          "limit": { "context": 1000000, "output": 65536 }
        }
      }
    }
  },

  "agents": {
    // Main orchestrator: Qwen3.5 Plus works best
    "sisyphus": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "thinking": { "type": "enabled", "budgetTokens": 8192 },
    },

    // Deep researcher: GLM-5 for strong reasoning
    "hephaestus": { "model": "bailian-coding-plan/glm-5" },

    // Insight synthesis: Qwen3.5 Plus for max capability
    "oracle": { "model": "bailian-coding-plan/qwen3.5-plus" },
  },

  "categories": {
    // Visual analysis: Kimi K2.5 for multimodal
    "visual-audit": { "model": "bailian-coding-plan/kimi-k2.5" },

    // Deep reasoning: GLM-5
    "thematic-analysis": { "model": "bailian-coding-plan/glm-5" },

    // Quick tasks: MiniMax M2.5 (fast and cheap)
    "quick-lookup": { "model": "bailian-coding-plan/MiniMax-M2.5" },

    // Complex research: Qwen3.5 Plus
    "comprehensive-study": { "model": "bailian-coding-plan/qwen3.5-plus" },
  },

  // Limit concurrent research tasks
  "background_task": {
    "providerConcurrency": {
      "bailian-coding-plan": 5,
    },
    "modelConcurrency": {
      "bailian-coding-plan/qwen3.5-plus": 2,
      "bailian-coding-plan/MiniMax-M2.5": 10,
    },
  },

  "experimental": { "task_system": true },
  "tmux": { "enabled": false },
}
```

---

## Core Concepts

### Agents

Override built-in agent settings. Available agents: `sisyphus`, `hephaestus`, `prometheus`, `oracle`, `librarian`, `explore`, `multimodal-looker`, `metis`, `momus`, `atlas`, `sisyphus-junior`.

```json
{
  "agents": {
    "explore": { "model": "bailian-coding-plan/glm-5", "temperature": 0.1 },
    "multimodal-looker": { "disable": true }
  }
}
```

Disable agents entirely: `{ "disabled_agents": ["oracle", "multimodal-looker"] }`

Core agents receive an injected runtime `order` field for deterministic Tab cycling in the UI: Sisyphus = 1, Hephaestus = 2, Prometheus = 3, Atlas = 4.

#### Agent Options

| Option | Type | Description |
|--------|------|-------------|
| `model` | string | Model override (`provider/model`) |
| `fallback_models` | string\|array | Fallback models on API errors |
| `temperature` | number | Sampling temperature |
| `top_p` | number | Top-p sampling |
| `prompt` | string | Replace system prompt. Supports `file://` URIs |
| `prompt_append` | string | Append to system prompt. Supports `file://` URIs |
| `tools` | array | Allowed tools list |
| `disable` | boolean | Disable this agent |
| `mode` | string | Agent mode (`primary`, `subagent`, `all`) |
| `color` | string | UI color |
| `permission` | object | Per-tool permissions |
| `category` | string | Inherit model from category |
| `variant` | string | Model variant: `max`, `high`, `medium`, `low`, `xhigh` |
| `maxTokens` | number | Max response tokens |
| `thinking` | object | Extended thinking configuration |
| `reasoningEffort` | string | Reasoning effort: `none`, `minimal`, `low`, `medium`, `high`, `xhigh` |

#### Fallback Models with Per-Model Settings

`fallback_models` accepts either a single model string or an array. Array entries can be plain strings or objects with individual model settings:

```jsonc
{
  "agents": {
    "sisyphus": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "fallback_models": [
        "bailian-coding-plan/glm-5",
        {
          "model": "bailian-coding-plan/kimi-k2.5",
          "thinking": { "type": "enabled", "budgetTokens": 8192 }
        }
      ]
    }
  }
}
```

#### File URIs for Prompts

Both `prompt` and `prompt_append` support loading content from files via `file://` URIs.

```jsonc
{
  "agents": {
    "sisyphus": {
      "prompt_append": "file:///absolute/path/to/research-prompt.md"
    }
  }
}
```

### Categories

Domain-specific model delegation used by the `task()` tool. When Sisyphus delegates research, it picks a category, not a model name.

#### Built-in Categories

| Category | Default Model | Description |
|----------|---------------|-------------|
| `visual-audit` | `bailian-coding-plan/kimi-k2.5` | Heuristic evaluation, visual analysis |
| `thematic-analysis` | `bailian-coding-plan/glm-5` | Pattern identification, qualitative coding |
| `deep-research` | `bailian-coding-plan/kimi-k2.5` | In-depth investigation |
| `creative-insights` | `bailian-coding-plan/qwen3.5-plus` | Creative analysis, ideation |
| `quick-lookup` | `bailian-coding-plan/MiniMax-M2.5` | Fast fact-finding |
| `content-coding` | `bailian-coding-plan/glm-5` | Qualitative data coding |
| `report-writing` | `bailian-coding-plan/kimi-k2.5` | Research report generation |
| `comprehensive-study` | `bailian-coding-plan/qwen3.5-plus` | Full research studies |

Disable categories: `{ "disabled_categories": ["comprehensive-study"] }`

### Model Resolution

Runtime priority:

1. **User override** — model set in config → used exactly as-is
2. **Category default** — model inherited from the assigned category config
3. **User `fallback_models`** — user-configured fallback list
4. **Provider fallback chain** — built-in provider/model chain
5. **System default** — OpenCode's configured default model

#### Agent Provider Chains

| Agent | Default Model | Provider Priority |
|-------|---------------|-------------------|
| **Sisyphus** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus (max)` → `bailian-coding-plan/glm-5` → `bailian-coding-plan/kimi-k2.5` |
| **Hephaestus** | `glm-5` | `bailian-coding-plan/glm-5 (medium)` → `bailian-coding-plan/glm-4.7` |
| **Oracle** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus (high)` → `bailian-coding-plan/glm-5` |
| **Librarian** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus` → `bailian-coding-plan/glm-5` |
| **Explore** | `glm-5` | `bailian-coding-plan/glm-5` → `bailian-coding-plan/glm-4.7` |
| **Multimodal-Looker** | `kimi-k2.5` | `bailian-coding-plan/kimi-k2.5 (medium)` → `bailian-coding-plan/qwen3.5-plus` |
| **Prometheus** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus (max)` → `bailian-coding-plan/glm-5` |
| **Metis** | `glm-5` | `bailian-coding-plan/glm-5 (high)` → `bailian-coding-plan/glm-4.7` |
| **Momus** | `glm-4.7` | `bailian-coding-plan/glm-4.7 (xhigh)` → `bailian-coding-plan/glm-5` |
| **Atlas** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus` → `bailian-coding-plan/glm-5` |
| **Sisyphus-Junior** | `MiniMax-M2.5` | `bailian-coding-plan/MiniMax-M2.5` → `bailian-coding-plan/glm-4.7` |

#### Category Provider Chains

| Category | Default Model | Provider Priority |
|----------|---------------|-------------------|
| **visual-audit** | `kimi-k2.5` | `bailian-coding-plan/kimi-k2.5` → `bailian-coding-plan/qwen3.5-plus` |
| **thematic-analysis** | `glm-5` | `bailian-coding-plan/glm-5` → `bailian-coding-plan/glm-4.7` |
| **deep-research** | `kimi-k2.5` | `bailian-coding-plan/kimi-k2.5` → `bailian-coding-plan/glm-5` |
| **creative-insights** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus` → `bailian-coding-plan/kimi-k2.5` |
| **quick-lookup** | `MiniMax-M2.5` | `bailian-coding-plan/MiniMax-M2.5` → `bailian-coding-plan/glm-4.7` |
| **content-coding** | `glm-5` | `bailian-coding-plan/glm-5` → `bailian-coding-plan/glm-4.7` |
| **report-writing** | `kimi-k2.5` | `bailian-coding-plan/kimi-k2.5` → `bailian-coding-plan/qwen3.5-plus` |
| **comprehensive-study** | `qwen3.5-plus` | `bailian-coding-plan/qwen3.5-plus (max)` → `bailian-coding-plan/glm-5` |

Run `bunx oh-my-opencode doctor --verbose` to see effective model resolution for your config.

---

## Task System

### Background Tasks

Control parallel research execution and concurrency limits.

```json
{
  "background_task": {
    "defaultConcurrency": 5,
    "staleTimeoutMs": 180000,
    "providerConcurrency": { "bailian-coding-plan": 5 },
    "modelConcurrency": { "bailian-coding-plan/qwen3.5-plus": 2 }
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `defaultConcurrency` | - | Max concurrent tasks (all providers) |
| `staleTimeoutMs` | `180000` | Interrupt tasks with no activity (min: 60000) |
| `providerConcurrency` | - | Per-provider limits |
| `modelConcurrency` | - | Per-model limits. Overrides provider limits. |

Priority: `modelConcurrency` > `providerConcurrency` > `defaultConcurrency`

### Sisyphus Agent

Configure the main research orchestration system.

```json
{
  "sisyphus_agent": {
    "disabled": false,
    "planner_enabled": true,
    "replace_plan": true
  }
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `disabled` | `false` | Disable all Sisyphus orchestration |
| `planner_enabled` | `true` | Enable Prometheus (Research Planner) agent |
| `replace_plan` | `true` | Demote default plan agent to subagent mode |

---

## Features

### Skills

Skills bring domain-specific research expertise and embedded MCPs.

Built-in skills: `web-scraper`, `social-listener`, `sentiment-analyzer`, `persona-builder`, `journey-mapper`, `ux-heuristics`, `research-methodology`, `competitor-analyst`, `data-triangulator`, `research-architect`, `playwright`, `playwright-cli`

Disable built-in skills: `{ "disabled_skills": ["playwright"] }`

### Hooks

Disable built-in hooks via `disabled_hooks`:

```json
{ "disabled_hooks": ["comment-checker"] }
```

Available hooks: `research-memory`, `todo-continuation-enforcer`, `context-window-monitor`, `session-recovery`, `session-notification`, `tool-output-truncator`, `directory-agents-injector`, `directory-readme-injector`, `empty-task-response-detector`, `think-mode`, `auto-update-checker`, `agent-usage-reminder`, `non-interactive-env`, `interactive-bash-session`, `compaction-context-injector`, `thinking-block-validator`, `preemptive-compaction`, `auto-slash-command`, `sisyphus-junior-notepad`, `runtime-fallback`

### Commands

Disable built-in commands via `disabled_commands`:

```json
{ "disabled_commands": ["init-deep"] }
```

Available commands: `init-deep`, `start-research`, `research-loop`

### Browser Automation

Browser automation via Playwright MCP for web scraping and visual research.

```json
{ "browser_automation_engine": { "provider": "playwright" } }
```

### Tmux Integration

Run background subagents in separate tmux panes.

```json
{
  "tmux": {
    "enabled": true,
    "layout": "main-vertical",
    "main_pane_size": 60
  }
}
```

### Notification

Force-enable session notifications:

```json
{ "notification": { "force_enable": true } }
```

### MCPs

Built-in MCPs (enabled by default): `websearch`, `reddit`, `x-twitter`, `semantic-scholar`, `playwright`, `nlp-api`, `google-analytics`, `appstore-reviews`, `academic-search`, `social-search`, `webpage-extractor`, `accessibility-scanner`, `context7`.

```json
{ "disabled_mcps": ["websearch", "context7"] }
```

---

## Advanced

### Runtime Fallback

Auto-switches to backup models on API errors.

```json
{
  "runtime_fallback": {
    "enabled": true,
    "retry_on_errors": [400, 429, 503, 529],
    "max_fallback_attempts": 3,
    "cooldown_seconds": 60,
    "notify_on_fallback": true
  }
}
```

### Model Capabilities

```jsonc
{
  "model_capabilities": {
    "enabled": true,
    "auto_refresh_on_start": true,
    "refresh_timeout_ms": 5000
  }
}
```

### Experimental

```json
{
  "experimental": {
    "truncate_all_tool_outputs": false,
    "aggressive_truncation": false,
    "auto_resume": false,
    "task_system": true
  }
}
```

---

## Reference

### Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENCODE_CONFIG_DIR` | Override OpenCode config directory |
| `JINA_API_KEY` | API key for webpage-extractor MCP |
| `APIFY_API_TOKEN` | API key for nlp-api and appstore-reviews MCPs |
