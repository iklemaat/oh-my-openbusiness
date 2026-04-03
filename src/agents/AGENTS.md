# src/agents/ — 11 UX Research Agent Definitions

**Generated:** 2026-04-03

## OVERVIEW

Agent factories following `createXXXAgent(model) → AgentConfig` pattern. Each has static `mode` property. Built via `buildAgent()` compositing factory + categories + skills.

## AGENT INVENTORY

| Agent | Role | Model | Mode | Purpose |
|-------|------|-------|------|---------|
| **Sisyphus** | Research Director | qwen3.5-plus | primary | Main orchestrator, plans + delegates research waves |
| **Hephaestus** | Deep Researcher | glm-5 | subagent | Autonomous end-to-end research with thorough exploration |
| **Oracle** | Insight Analyst | qwen3-max | subagent | Synthesizes findings into actionable insights |
| **Librarian** | Industry Researcher | qwen3-coder-plus | subagent | External research: benchmarks, papers, reports |
| **Explore** | Web Scout | qwen3-coder-next | subagent | Web search: social media, forums, reviews |
| **Multimodal-Looker** | Visual Analyst | kimi-k2.5 | subagent | Image/visual UX analysis |
| **Metis** | Research Consultant | qwen3-coder-next | subagent | Research optimization and refinement |
| **Momus** | Plan Reviewer | glm-4.7 | subagent | Research plan quality review |
| **Atlas** | Master Orchestrator | qwen3.5-plus | primary | Full context coordination |
| **Prometheus** | Research Planner | qwen3-coder-plus | subagent | Strategic research planning |
| **Sisyphus-Junior** | Research Assistant | kimi-k2.5 | all | Category-spawned research executor |

## TOOL RESTRICTIONS

| Agent | Denied Tools |
|-------|-------------|
| Oracle | edit, task |
| Librarian | edit, task, call_omo_agent |
| Explore | edit, task, call_omo_agent |
| Momus | write, edit, task |
| Atlas | task, call_omo_agent |

## STRUCTURE

```
agents/
├── sisyphus/                # Research Director (default.ts, gpt-5-4.ts)
├── hephaestus/              # Deep Researcher (gpt.ts, gpt-5-3-codex.ts, gpt-5-4.ts, agent.ts)
├── oracle.ts                # Insight Analyst
├── librarian.ts             # Industry Researcher
├── explore.ts               # Web Scout
├── multimodal-looker.ts     # Visual Analyst
├── metis.ts                 # Research Consultant
├── momus.ts                 # Plan Reviewer
├── atlas/                   # Master Orchestrator
├── prometheus/              # Research Planner
├── sisyphus-junior/         # Research Assistant
├── types.ts                 # AgentFactory, AgentMode
├── agent-builder.ts         # buildAgent() composition
├── utils.ts                 # Agent utilities
├── builtin-agents.ts        # createBuiltinAgents() registry
├── builtin-agents/          # maybeCreateXXXConfig conditional factories
├── dynamic-agent-prompt-builder.ts  # Prompt composition
└── model-requirements.ts    # Fallback chains (bailian-coding-plan)
```

## FACTORY PATTERN

```typescript
const createXXXAgent: AgentFactory = (model: string) => ({
  instructions: "...",
  model,
  temperature: 0.1,
  // ...config
})
createXXXAgent.mode = "subagent" // or "primary" or "all"
```

Model resolution: 4-step: override → category-default → provider-fallback → system-default. All models use `bailian-coding-plan` provider.

## MODES

- **primary**: Respects UI-selected model, uses fallback chain
- **subagent**: Uses own fallback chain, ignores UI selection
- **all**: Available in both contexts (Sisyphus-Junior)
