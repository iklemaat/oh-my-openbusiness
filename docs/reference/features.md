# Oh-My-OpenBusiness Features Reference

## Agents

Oh-My-OpenBusiness provides 11 specialized UX Research agents. Each has distinct expertise, optimized models, and tool permissions.

### Core Agents

Core-agent tab cycling is deterministic via injected runtime order field. The fixed priority order is Sisyphus (order: 1), Hephaestus (order: 2), Prometheus (order: 3), and Atlas (order: 4). Remaining agents follow after that stable core ordering.

| Agent | Model | Purpose |
|-------|-------|---------|
| **Sisyphus** | `qwen3.5-plus` | The default Research Director. Plans research, delegates to specialists, and executes complex studies using specialized subagents with aggressive parallel execution. Todo-driven workflow with extended thinking (8192 budget). Fallback: `bailian-coding-plan/glm-5` → `bailian-coding-plan/kimi-k2.5`. |
| **Hephaestus** | `glm-5` | The Deep Researcher. Autonomous research inspired by thorough exploration. Goal-oriented execution with thorough source exploration before synthesis. Explores web sources, extracts user feedback, and synthesizes findings end-to-end without premature stopping. Requires a bailian-coding-plan provider. |
| **Oracle** | `qwen3.5-plus` | Insight synthesis, finding validation, strategic analysis. High-IQ consultation with stellar logical reasoning and deep pattern analysis. Fallback: `bailian-coding-plan/glm-5`. |
| **Librarian** | `qwen3.5-plus` | Industry research, benchmark lookup, academic paper analysis. Deep research understanding with evidence-based answers. 1M context for large documents. Fallback: `bailian-coding-plan/glm-5`. |
| **Explore** | `glm-5` | Web and social media scouting. Fast pattern detection across Reddit, X/Twitter, forums, reviews. Fallback: `bailian-coding-plan/glm-4.7`. |
| **Multimodal-Looker** | `kimi-k2.5` | Visual content specialist. Analyzes screenshots, interface designs, visual UX patterns. Multimodal (text+image) input. Fallback: `bailian-coding-plan/qwen3.5-plus`. |

### Planning Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| **Prometheus** | `qwen3.5-plus` | Research planner with interview mode. Creates detailed research plans through iterative questioning. Fallback: `bailian-coding-plan/glm-5`. |
| **Metis** | `glm-5` | Research consultant — pre-research analysis. Identifies hidden assumptions, ambiguities, and research gaps. Fallback: `bailian-coding-plan/glm-4.7`. |
| **Momus** | `glm-4.7` | Plan reviewer — validates research plans against clarity, verifiability, and completeness standards. Fallback: `bailian-coding-plan/glm-5`. |

### Orchestration Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| **Atlas** | `qwen3.5-plus` | Research orchestrator. Executes planned research systematically, managing tasks and coordinating work. Fallback: `bailian-coding-plan/glm-5`. |
| **Sisyphus-Junior** | _(category-dependent)_ | Category-spawned research executor. Model is selected automatically based on the research category. Fallback: `bailian-coding-plan/MiniMax-M2.5` → `bailian-coding-plan/glm-4.7`. |

### Invoking Agents

The main agent invokes these automatically, but you can call them explicitly:

```
Ask @oracle to synthesize these findings into actionable insights
Ask @librarian to find industry benchmarks for checkout abandonment
Ask @explore to scan Reddit and Twitter for user complaints
```

### Tool Restrictions

| Agent | Restrictions |
|-------|-------------|
| oracle | Read-only: cannot write, edit, or delegate (blocked: write, edit, task, call_omo_agent) |
| librarian | Cannot write, edit, or delegate (blocked: write, edit, task, call_omo_agent) |
| explore | Cannot write, edit, or delegate (blocked: write, edit, task, call_omo_agent) |
| multimodal-looker | Allowlist: `read` only |
| atlas | Cannot delegate (blocked: task, call_omo_agent) |
| momus | Cannot write, edit, or delegate (blocked: write, edit, task) |

### Background Agents

Run agents in the background and continue working:

- Have GLM-5 research social media while Qwen3.5 Plus analyzes reviews
- Kimi K2.5 scans visual patterns while MiniMax M2.5 does quick lookups
- Fire massive parallel source searches, continue synthesis, use results when ready

```
# Launch in background
task(subagent_type="explore", load_skills=["social-listener"], prompt="Find checkout complaints on Reddit", run_in_background=true)

# Continue working...
# System notifies on completion

# Retrieve results when needed
background_output(task_id="bg_abc123")
```

#### Visual Multi-Agent with Tmux

Enable `tmux.enabled` to see background agents in separate tmux panes:

```json
{
  "tmux": {
    "enabled": true,
    "layout": "main-vertical"
  }
}
```

When running inside tmux:

- Background agents spawn in new panes
- Watch multiple research agents work in real-time
- Each pane shows agent output live
- Auto-cleanup when agents complete

Customize agent models, prompts, and permissions in `oh-my-openbusiness.jsonc`.

## Category System

A Category is an agent configuration preset optimized for specific research domains. Instead of delegating everything to a single AI agent, it is far more efficient to invoke specialists tailored to the nature of the research task.

### What Categories Are and Why They Matter

- **Category**: "What kind of research is this?" (determines model, temperature, prompt mindset)
- **Skill**: "What tools and knowledge are needed?" (injects specialized knowledge, MCP tools, workflows)

By combining these two concepts, you can generate optimal research agents through `task`.

### Built-in Categories

| Category | Default Model | Use Cases |
|----------|---------------|-----------|
| `visual-audit` | `bailian-coding-plan/kimi-k2.5` | Heuristic evaluation, visual analysis, accessibility |
| `thematic-analysis` | `bailian-coding-plan/glm-5` | Pattern identification, qualitative coding |
| `deep-research` | `bailian-coding-plan/kimi-k2.5` | In-depth investigation, thorough exploration |
| `creative-insights` | `bailian-coding-plan/qwen3.5-plus` | Creative analysis, ideation, novel connections |
| `quick-lookup` | `bailian-coding-plan/MiniMax-M2.5` | Fast fact-finding, single-source queries |
| `content-coding` | `bailian-coding-plan/glm-5` | Qualitative data coding, sentiment classification |
| `report-writing` | `bailian-coding-plan/kimi-k2.5` | Research report generation, documentation |
| `comprehensive-study` | `bailian-coding-plan/qwen3.5-plus` | Full research studies, multi-source synthesis |

### Usage

Specify the `category` parameter when invoking the `task` tool.

```typescript
task({
  category: "visual-audit",
  prompt: "Evaluate the checkout flow using Nielsen's 10 heuristics",
});
```

### Custom Categories

You can define custom categories in your plugin config file.

#### Category Configuration Schema

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Human-readable description of the category's purpose |
| `model` | string | AI model ID to use (e.g., `bailian-coding-plan/qwen3.5-plus`) |
| `variant` | string | Model variant (e.g., `max`, `xhigh`) |
| `temperature` | number | Creativity level (0.0 ~ 2.0) |
| `top_p` | number | Nucleus sampling parameter (0.0 ~ 1.0) |
| `prompt_append` | string | Content to append to system prompt |
| `thinking` | object | Thinking model configuration |
| `reasoningEffort` | string | Reasoning effort level |
| `textVerbosity` | string | Text verbosity level |
| `tools` | object | Tool usage control |
| `maxTokens` | number | Maximum response token count |
| `is_unstable_agent` | boolean | Mark agent as unstable |

#### Example Configuration

```jsonc
{
  "categories": {
    // 1. Define new custom category
    "competitive-intel": {
      "model": "bailian-coding-plan/glm-5",
      "temperature": 0.3,
      "prompt_append": "You are a competitive intelligence analyst. Focus on actionable insights.",
    },

    // 2. Override existing category (change model)
    "visual-audit": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "temperature": 0.1,
    },

    // 3. Configure thinking model and restrict tools
    "deep-reasoning": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "thinking": {
        "type": "enabled",
        "budgetTokens": 16000,
      },
    },
  },
}
```

### Sisyphus-Junior as Delegated Executor

When you use a Category, a special agent called **Sisyphus-Junior** performs the work.

- **Characteristic**: Cannot **re-delegate** tasks to other agents.
- **Purpose**: Prevents infinite delegation loops and ensures focus on the assigned research task.

## Advanced Configuration

### Fallback Models

Configure per-agent fallback chains with arrays that can mix plain model strings and per-model objects:

```jsonc
{
  "agents": {
    "sisyphus": {
      "fallback_models": [
        "bailian-coding-plan/glm-5",
        { "model": "bailian-coding-plan/kimi-k2.5", "thinking": { "type": "enabled", "budgetTokens": 8192 } }
      ]
    }
  }
}
```

When a model errors, the runtime can move through the configured fallback array. Object entries let you tune the backup model itself.

### File-Based Prompts

Load agent system prompts from external files using `file://` URLs in the `prompt` field, or append additional content with `prompt_append`.

```jsonc
{
  "agents": {
    "sisyphus": {
      "prompt": "file:///path/to/custom-research-prompt.md"
    },
    "oracle": {
      "prompt_append": "file:///path/to/additional-context.md"
    }
  },
  "categories": {
    "deep-research": {
      "prompt_append": "file:///path/to/deep-research-context.md"
    }
  }
}
```

Supports `~` expansion for home directory and relative `file://` paths.

Useful for:
- Version controlling research prompts separately from config
- Sharing prompts across projects
- Keeping configuration files concise
- Adding category-specific research context without duplicating base prompts

### Session Recovery

The system automatically recovers from common session failures without user intervention:

- **Missing tool results**: reconstructs recoverable tool state
- **Thinking block violations**: Recovers from API thinking block mismatches
- **Empty messages**: Reconstructs message history when content is missing
- **Context window limits**: Gracefully handles context window exceeded errors with intelligent compaction
- **JSON parse errors**: Recovers from malformed tool outputs

Recovery happens transparently during agent execution. You see the result, not the failure.

## Skills

Skills bring specialized research workflows with embedded MCP servers and detailed instructions. A Skill is a mechanism that injects **specialized knowledge (Context)** and **tools (MCP)** for specific research domains into agents.

### Built-in Skills

| Skill | Trigger | Description |
|-------|---------|-------------|
| **web-scraper** | Web scraping, data extraction | Autonomous web scraping for UX research. Extracts structured user feedback from forums, reviews, social media. |
| **social-listener** | Social media, forum monitoring | Social media and forum listening. Monitors Reddit, X/Twitter, HN, Quora, Product Hunt, G2, Trustpilot. |
| **sentiment-analyzer** | Sentiment analysis, emotion detection | 3-phase sentiment analysis protocol. Classifies, aggregates patterns, generates insights. |
| **persona-builder** | Persona creation, user segmentation | Data-driven persona creation from web research. Behavioral clustering, evidence-backed traits. |
| **journey-mapper** | Journey mapping, pain point analysis | Customer journey map creation. 7-phase structure, emotional curves, pain points. |
| **ux-heuristics** | Heuristic evaluation, UX audit | Nielsen's 10 usability heuristics evaluation. Severity ratings, protocol-based assessment. |
| **research-methodology** | Research planning, methodology | GDS 4-phase research framework. Method selection matrix, evidence standards. |
| **competitor-analyst** | Competitive analysis, benchmarking | Competitive UX benchmarking. Feature comparison, review mining, pattern identification. |
| **data-triangulator** | Cross-validation, evidence quality | Cross-validate findings across 3+ source types. Flag contradictions, weight evidence quality. |
| **research-architect** | Multi-wave research planning | Design multi-wave research plans with optimal source sequencing and parallelization. |
| **playwright** | Browser tasks, screenshots | Browser automation via Playwright MCP. Screenshots of interfaces, accessibility audits. |
| **playwright-cli** | Browser tasks via CLI | Browser automation through Playwright CLI integration. |

### Browser Automation Options

Oh-My-OpenBusiness provides browser automation via Playwright MCP for web research.

#### Playwright MCP (Default)

```yaml
mcp:
  playwright:
    command: npx
    args: ["@playwright/mcp@latest"]
```

**Usage**:

```
/playwright Navigate to a competitor's checkout page and take a screenshot
```

**Capabilities**:

- Navigate and interact with web pages
- Take screenshots and PDFs
- Fill forms and click elements
- Scrape content
- Capture accessibility trees

### Custom Skill Creation (SKILL.md)

You can add custom skills directly to `.opencode/skills/` in your project root or `~/.config/opencode/skills/` in your home directory.

**Example: `.opencode/skills/my-skill/SKILL.md`**

```markdown
---
name: my-skill
description: My custom research skill
mcp:
  my-mcp:
    command: npx
    args: ["-y", "my-mcp-server"]
---

# My Skill Prompt

This content will be injected into the agent's system prompt.
```

**Skill Load Locations** (priority order, highest first):

- `.opencode/skills/*/SKILL.md` (project, OpenCode native)
- `~/.config/opencode/skills/*/SKILL.md` (user, OpenCode native)
- `.claude/skills/*/SKILL.md` (project, Claude Code compat)
- `.agents/skills/*/SKILL.md` (project, Agents convention)
- `~/.agents/skills/*/SKILL.md` (user, Agents convention)

Same-named skill at higher priority overrides lower.

Disable built-in skills via `disabled_skills: ["playwright"]` in config.

### Category + Skill Combo Strategies

You can create powerful specialized research agents by combining Categories and Skills.

#### The UX Auditor

- **Category**: `visual-audit`
- **load_skills**: `["ux-heuristics", "playwright"]`
- **Effect**: Evaluates interfaces using Nielsen heuristics and verifies with browser screenshots.

#### The Social Researcher

- **Category**: `deep-research`
- **load_skills**: `["social-listener", "sentiment-analyzer"]`
- **Effect**: Deep social media research with sentiment analysis across multiple platforms.

#### The Report Writer

- **Category**: `report-writing`
- **load_skills**: `["research-methodology", "data-triangulator"]`
- **Effect**: Produces methodologically sound research reports with triangulated evidence.

### task Prompt Guide

When delegating research, **clear and specific** prompts are essential. Include these 7 elements:

1. **TASK**: What research needs to be done? (single objective)
2. **EXPECTED OUTCOME**: What is the research deliverable?
3. **REQUIRED SKILLS**: Which skills should be loaded via `load_skills`?
4. **REQUIRED TOOLS**: Which tools must be used? (whitelist)
5. **MUST DO**: What must be done (constraints)
6. **MUST NOT DO**: What must never be done
7. **CONTEXT**: Product context, audience, what's already known

**Bad Example**:

> "Research this"

**Good Example**:

> **TASK**: Find user complaints about checkout abandonment on Reddit and Twitter
> **CONTEXT**: E-commerce checkout flow, targeting mobile users
> **MUST DO**: Extract direct quotes, note sentiment, identify specific pain points
> **MUST NOT DO**: Make assumptions without evidence, generalize from single sources
> **EXPECTED**: At least 20 unique complaints with quotes, sources, dates, and sentiment classification

## Commands

Commands are slash-triggered workflows that execute predefined templates.

### Built-in Commands

| Command | Description |
|---------|-------------|
| `/init-deep` | Initialize hierarchical AGENTS.md knowledge base |
| `/start-research` | Start autonomous UX research session |
| `/research-loop` | Start self-referential research loop until saturation |

### /init-deep

**Purpose**: Generate hierarchical AGENTS.md files throughout your project

**Usage**:

```
/init-deep [--create-new] [--max-depth=N]
```

Creates directory-specific context files that agents automatically read.

### /start-research

**Purpose**: Start autonomous UX research session

**Usage**:

```
/start-research checkout-abandonment
```

Loads research plan from `.sisyphus/plans/`, executes research waves in parallel, synthesizes findings, and produces deliverables.

### /research-loop

**Purpose**: Self-referential research loop that runs until saturation

**Usage**:

```
/research-loop "checkout abandonment"
```

Continuously researches until no new questions emerge. Each iteration fires parallel agents across source types, synthesizes findings, and checks for saturation.

### Custom Commands

Load custom commands from:

- `.opencode/command/*.md` (project, OpenCode native)
- `~/.config/opencode/command/*.md` (user, OpenCode native)
- `.claude/commands/*.md` (project, Claude Code compat)
- `~/.config/opencode/commands/*.md` (user, Claude Code compat)

## Tools

### Research Tools

| Tool | Description |
|------|-------------|
| **task** | Category-based research delegation. Supports built-in categories like `visual-audit`, `thematic-analysis`, `deep-research`, etc. |
| **call_omo_agent** | Spawn explore/librarian agents. Supports `run_in_background`. |
| **background_output** | Retrieve background research results |
| **background_cancel** | Cancel running background research tasks |
| **skill** | Load and execute a skill by name. Returns detailed instructions with context applied. |
| **skill_mcp** | Invoke MCP server operations from skill-embedded MCPs. |

### Visual Analysis Tools

| Tool | Description |
|------|-------------|
| **look_at** | Analyze media files (PDFs, images, diagrams) via Multimodal-Looker agent. Extracts specific information or summaries from documents, describes visual content. |

### Session Tools

| Tool | Description |
|------|-------------|
| **session_list** | List all OpenCode sessions |
| **session_read** | Read messages and history from a session |
| **session_search** | Full-text search across session messages |
| **session_info** | Get session metadata and statistics |

### Task Management Tools

Requires `experimental.task_system: true` in config.

| Tool | Description |
|------|-------------|
| **task_create** | Create a new task with auto-generated ID |
| **task_get** | Retrieve a task by ID |
| **task_list** | List all active tasks |
| **task_update** | Update an existing task |

**Task Schema**:

```ts
interface Task {
  id: string; // T-{uuid}
  subject: string; // Imperative: "Scan Reddit for complaints"
  description: string;
  status: "pending" | "in_progress" | "completed" | "deleted";
  activeForm?: string; // Present continuous: "Scanning Reddit"
  blocks: string[]; // Tasks this blocks
  blockedBy: string[]; // Tasks blocking this
  owner?: string; // Agent name
  metadata?: Record<string, unknown>;
  threadID: string; // Session ID (auto-set)
}
```

**Dependencies and Parallel Execution**:

```
[Scan Reddit]    ──┐
                    ├──→ [Synthesize findings] ──→ [Generate report]
[Scan Twitter]   ──┘
```

- Tasks with empty `blockedBy` run in parallel
- Dependent tasks wait until blockers complete

**Storage**: Tasks are stored as JSON files in `.sisyphus/tasks/`.

**When to Use**: Use Tasks when research has multiple steps with dependencies, multiple subagents will collaborate, or progress should persist across sessions.

### Interactive Terminal Tools

| Tool | Description |
|------|-------------|
| **interactive_bash** | Tmux-based terminal for TUI apps. Pass tmux subcommands directly without prefix. |

## Hooks

Hooks intercept and modify behavior at key points in the agent lifecycle across the full session, message, tool, and parameter pipeline.

### Hook Events

| Event | When | Can |
|-------|------|-----|
| **PreToolUse** | Before tool execution | Block, modify input, inject context |
| **PostToolUse** | After tool execution | Add warnings, modify output, inject messages |
| **Message** | During message processing | Transform content, detect keywords, activate modes |
| **Event** | On session lifecycle changes | Recovery, fallback, notifications |
| **Transform** | During context transformation | Inject context, validate blocks |
| **Params** | When setting API parameters | Adjust model settings, effort level |

### Built-in Hooks

#### Context & Injection

| Hook | Event | Description |
|------|-------|-------------|
| **directory-agents-injector** | PreToolUse + PostToolUse | Auto-injects AGENTS.md when reading files. Deprecated for OpenCode 1.1.37+. |
| **directory-readme-injector** | PreToolUse + PostToolUse | Auto-injects README.md for directory context. |
| **compaction-context-injector** | Event | Preserves critical context during session compaction. |
| **context-window-monitor** | Event | Monitors context window usage and tracks token consumption. |
| **preemptive-compaction** | Event | Proactively compacts sessions before hitting token limits. |

#### Productivity & Control

| Hook | Event | Description |
|------|-------|-------------|
| **keyword-detector** | Message + Transform | Detects keywords and activates modes: `ultrawork`/`ulw` (max research intensity), `search`/`find` (parallel exploration), `analyze`/`investigate` (deep analysis). |
| **think-mode** | Params | Auto-detects extended thinking needs. |
| **auto-slash-command** | Message | Automatically executes slash commands from prompts. |
| **category-skill-reminder** | Event + PostToolUse | Reminds agents about available category skills for delegation. |

#### Quality & Safety

| Hook | Event | Description |
|------|-------|-------------|
| **thinking-block-validator** | Transform | Validates thinking blocks to prevent API errors. |
| **write-existing-file-guard** | PreToolUse | Prevents accidental overwrites of existing files without reading them first. |

#### Recovery & Stability

| Hook | Event | Description |
|------|-------|-------------|
| **session-recovery** | Event | Recovers from session errors — missing tool results, thinking block issues, empty messages. |
| **runtime-fallback** | Event + Message | Automatically switches to backup models on retryable API errors. |
| **model-fallback** | Event + Message | Manages model fallback chain when primary model is unavailable. |
| **json-error-recovery** | PostToolUse | Recovers from JSON parse errors in tool outputs. |

#### Notifications & UX

| Hook | Event | Description |
|------|-------|-------------|
| **auto-update-checker** | Event | Checks for new versions on session creation. |
| **background-notification** | Event | Notifies when background research tasks complete. |
| **session-notification** | Event | OS notifications when agents go idle. |
| **agent-usage-reminder** | PostToolUse + Event | Reminds you to leverage specialized research agents. |

#### Task Management

| Hook | Event | Description |
|------|-------|-------------|
| **task-resume-info** | PostToolUse | Provides task resume information for continuity. |
| **delegate-task-retry** | PostToolUse + Event | Retries failed task delegation calls. |
| **empty-task-response-detector** | PostToolUse | Detects empty responses from delegated tasks. |
| **tasks-todowrite-disabler** | PreToolUse | Disables TodoWrite tool when task system is active. |

#### Continuation

| Hook | Event | Description |
|------|-------|-------------|
| **todo-continuation-enforcer** | Event | Enforces todo completion — yanks idle agents back to work. |
| **compaction-todo-preserver** | Event | Preserves todo state during session compaction. |
| **unstable-agent-babysitter** | Event | Handles unstable agent behavior with recovery strategies. |

#### Research-Specific

| Hook | Event | Description |
|------|-------|-------------|
| **research-memory** | Event | Tracks and persists research findings across sessions. |
| **prometheus-md-only** | PreToolUse | Enforces markdown-only output for Prometheus planner. |
| **sisyphus-junior-notepad** | PreToolUse | Manages notepad state for Sisyphus-Junior agents. |

### Disabling Hooks

Disable specific hooks in config:

```json
{
  "disabled_hooks": ["comment-checker"]
}
```

## MCPs

### Built-in MCPs

| MCP | Description |
|-----|-------------|
| **websearch** | General web search via Exa/Tavily |
| **reddit** | Reddit posts and comments |
| **x-twitter** | Tweets and threads |
| **semantic-scholar** | Academic papers |
| **playwright** | Browser automation, screenshots |
| **nlp-api** | Sentiment analysis, NER |
| **google-analytics** | Behavioral data |
| **appstore-reviews** | App Store/Play Store reviews |
| **academic-search** | Academic search |
| **social-search** | Social media search |
| **webpage-extractor** | Full article extraction (Jina Reader) |
| **accessibility-scanner** | WCAG audits |
| **context7** | Documentation lookup |

Disable built-in MCPs: `{ "disabled_mcps": ["websearch", "context7"] }`
