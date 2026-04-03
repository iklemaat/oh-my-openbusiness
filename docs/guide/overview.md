# What Is Oh My OpenBusiness?

Oh My OpenBusiness is a multi-model agent orchestration harness for OpenCode. It transforms a single AI agent into a coordinated UX research team that delivers validated findings.

Not locked to Claude. Not locked to OpenAI. Not locked to anyone.

Just better research, smarter model routing, real orchestration.

---

## Quick Start

### Installation

Paste this into your LLM agent session:

```
Install and configure oh-my-openbusiness by following the instructions in the docs.
```

Or read the full [Installation Guide](./installation.md) for manual setup, provider authentication, and troubleshooting.

### Your First Research

Once installed, just type:

```
/start-research checkout abandonment
```

That's it. The agent figures everything out — discovers sources, extracts user feedback, synthesizes findings, produces deliverables. Keeps researching until every question is answered.

Want more control? Press **Tab** to enter [Prometheus mode](./orchestration.md) for interview-based research planning, then run `/start-research` for full orchestration.

---

## The Philosophy: Breaking Free

We used to call this "Claude Code on steroids." That was wrong.

This isn't about making Claude Code better. It's about breaking free from the idea that one model, one provider, one way of working is enough. Anthropic wants you locked in. OpenAI wants you locked in. Everyone wants you locked in.

Oh My OpenBusiness doesn't play that game. It orchestrates across models, picking the right brain for the right job. Qwen3.5 Plus for orchestration. GLM-5 for deep reasoning. Kimi K2.5 for multimodal analysis. MiniMax M2.5 for quick tasks. All working together, automatically.

---

## How It Works: Agent Orchestration

Instead of one agent doing everything, Oh My OpenBusiness uses **specialized agents that delegate to each other** based on research task type.

**The Architecture:**

```
User Research Request
    ↓
[Intent Gate] — Classifies research intent
    ↓
[Sisyphus] — Research Director, plans and delegates
    ↓
    ├─→ [Prometheus] — Research planning (interview mode)
    ├─→ [Atlas] — Research orchestration and execution
    ├─→ [Oracle] — Insight synthesis and analysis
    ├─→ [Librarian] — Industry research and benchmarks
    ├─→ [Explore] — Web and social media scouting
    └─→ [Category-based agents] — Specialized by research type
```

When Sisyphus delegates to a subagent, it doesn't pick a model name. It picks a **category** — `visual-audit`, `thematic-analysis`, `deep-research`, `creative-insights`. The category automatically maps to the right model. You touch nothing.

For a deep dive into how agents collaborate, see the [Orchestration System Guide](./orchestration.md).

---

## Meet the Agents

### Sisyphus: The Research Director

Named after the Greek myth. He rolls the boulder every day. Never stops. Never gives up.

Sisyphus is your main orchestrator. He plans research, delegates to specialists, and drives findings to completion with aggressive parallel execution. He doesn't stop halfway. He doesn't get distracted. He finishes.

**Recommended models:**

- **Qwen3.5 Plus** — Best overall. 1M context, multimodal, thinking enabled.
- **Kimi K2.5** — Great multimodal alternative.
- **GLM 5** — Solid option with strong reasoning.

Sisyphus works best on qwen3.5-plus. Other models route to Hephaestus for deep research.

### Hephaestus: The Deep Researcher

Named with intentional irony. Hephaestus runs on GLM-5. Give him a research goal, not a recipe. He explores the web, extracts user feedback, and synthesizes findings end-to-end without hand-holding.

Use Hephaestus when you need deep autonomous research, thorough exploration across multiple source types, or cross-domain knowledge synthesis.

**Why this beats single-model research:**

- **Multi-model orchestration.** Single-model tools route everything to one model. OmO routes different research tasks to different models automatically. GLM-5 for deep reasoning. Qwen3.5 Plus for synthesis. MiniMax M2.5 for speed. The right brain for the right job.
- **Background agents.** Fire 5+ agents in parallel. Something single-model tools simply cannot do. While one agent researches social media, another mines reviews, another scans forums. Like a real research team.
- **Category system.** Research tasks are routed by intent, not model name. `thematic-analysis` gets GLM-5. `visual-audit` gets Kimi K2.5. `quick` gets MiniMax M2.5. No manual juggling.
- **Accumulated wisdom.** Subagents learn from previous results. Patterns discovered in task 1 are passed to task 5. Mistakes made early aren't repeated. The system gets smarter as it works.

### Prometheus: The Research Planner

Prometheus interviews you like a real researcher. Asks clarifying questions. Identifies research scope and ambiguities. Builds a detailed research plan before a single source is consulted.

Press **Tab** to enter Prometheus mode, or type `@plan "your research"` from Sisyphus.

### Atlas: The Research Conductor

Atlas executes Prometheus research plans. Distributes tasks to specialized subagents. Accumulates learnings across research waves. Verifies completion independently.

Run `/start-research` to activate Atlas on your latest research plan.

### Oracle: The Insight Analyst

High-IQ strategic consultant for research synthesis and complex analysis. Consult Oracle when facing contradictory findings, multi-source triangulation, or strategic pattern identification.

### Supporting Cast

- **Metis** — Gap analyzer. Catches what Prometheus missed before research plans are finalized.
- **Momus** — Ruthless reviewer. Validates research plans against clarity, verification, and context criteria.
- **Explore** — Web and social media scout. Searches Reddit, X/Twitter, forums, reviews for user voices.
- **Librarian** — Industry research and benchmarks. Stays current on research papers and best practices.
- **Multimodal Looker** — Vision and visual UX analysis.

---

## Working Modes

### Ultrawork Mode: For the Lazy

Type `ultrawork` or just `ulw`. That's it.

The agent figures everything out. Discovers relevant sources. Extracts user feedback. Synthesizes findings. Verifies through triangulation. Keeps researching until every question is answered.

This is the "just do it" mode. Full automatic. You don't have to think deep because the agent thinks deep for you.

### Prometheus Mode: For the Precise

Press **Tab** to enter Prometheus mode.

Prometheus interviews you like a real researcher. Asks clarifying questions. Identifies research scope and ambiguities. Builds a detailed research plan before a single source is consulted.

Then run `/start-research` and Atlas takes over. Tasks are distributed to specialized subagents. Each completion is verified independently. Learnings accumulate across research waves. Progress tracks across sessions.

Use Prometheus for multi-week research projects, critical user studies, complex competitive analysis, or when you want a documented research trail.

---

## Agent Model Matching

Different agents work best with different models. Oh My OpenBusiness automatically assigns optimal models based on capabilities, but you can customize everything.

### Default Configuration

Models are auto-configured at install time. The system uses the bailian-coding-plan provider with 8 models. At runtime, fallback chains ensure research continues even if your preferred model is unavailable. Each agent has a provider priority chain. The system tries models in order until it finds an available one.

### Custom Model Configuration

You can override specific agents or categories in your config:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",

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
    "visual-audit": {
      "model": "bailian-coding-plan/kimi-k2.5",
    },

    // Deep reasoning: GLM-5
    "thematic-analysis": { "model": "bailian-coding-plan/glm-5" },

    // Quick tasks: MiniMax M2.5 (fast and cheap)
    "quick-lookup": { "model": "bailian-coding-plan/MiniMax-M2.5" },

    // Complex research: Qwen3.5 Plus
    "comprehensive-study": { "model": "bailian-coding-plan/qwen3.5-plus" },
  },
}
```

### Model Capabilities

**Qwen3.5 Plus** (most capable):

- 1M context window, multimodal (text+image), thinking enabled
- Best for: orchestration, synthesis, complex planning

**GLM-5 / GLM-4.7** (strong reasoning):

- 202K context, thinking enabled, "Agentic Engineering"
- Best for: deep research, pattern detection, analysis

**Kimi K2.5** (multimodal):

- 262K context, multimodal (text+image), thinking enabled, "Visual Agentic Intelligence"
- Best for: visual analysis, heuristic evaluation, creative work

**MiniMax M2.5** (fast):

- 196K context, thinking enabled, "SOTA in Agent"
- Best for: quick lookup tasks, fast processing

See the [Agent-Model Matching Guide](./agent-model-matching.md) for complete details on which models work best for each agent, safe vs dangerous overrides, and provider priority chains.

---

## Why It's Better Than Single-Model Research

Using a single AI agent for research is like having one researcher do everything alone.

Oh My OpenBusiness turns that into a coordinated team:

**Parallel execution.** Single-model tools process one thing at a time. OmO fires background agents in parallel — social listening, review mining, and forum scanning happening simultaneously. Like having 5 researchers instead of 1.

**Intent Gate.** Single-model tools take your prompt and run. OmO classifies your true research intent first — discovery, deep research, audit, competitive analysis — then routes accordingly. Fewer misinterpretations, better findings.

**Web extraction MCPs.** Reddit, X/Twitter, semantic-scholar, appstore-reviews, webpage-extractor, social-search. Each brings its own data source, scoped to the research task. Context window stays clean instead of bloating with every tool.

**Discipline enforcement.** Todo enforcer yanks idle agents back to work. Research memory tracks findings across sessions. The system doesn't let the agent slack off.

**The fundamental advantage.** Models have different temperaments. Qwen3.5 Plus orchestrates deeply. GLM-5 reasons architecturally. Kimi K2.5 visualizes. MiniMax M2.5 moves fast. Single-model tools force you to pick one personality for all tasks. Oh My OpenBusiness leverages them all, routing by research task type. This isn't a temporary hack — it's the only architecture that makes sense as models specialize further. The gap between multi-model orchestration and single-model limitation widens every month. We're betting on that future.

---

## The Intent Gate

Before acting on any request, Sisyphus classifies your true research intent.

Are you asking for discovery research? Deep analysis? Competitive audit? Synthesis? The Intent Gate figures out what you actually want, not just the literal words you typed. This means the agent understands context, nuance, and the real research goal behind your request.

Single-model tools don't have this. They take your prompt and run. Oh My OpenBusiness thinks first, then researches.

---

## What's Next

- **[Installation Guide](./installation.md)** — Complete setup instructions, provider authentication, and troubleshooting
- **[Orchestration Guide](./orchestration.md)** — Deep dive into agent collaboration, planning with Prometheus, and execution with Atlas
- **[Agent-Model Matching Guide](./agent-model-matching.md)** — Which models work best for each agent and how to customize
- **[Configuration Reference](../reference/configuration.md)** — Full config options with examples
- **[Features Reference](../reference/features.md)** — Complete feature documentation
- **[Manifesto](../manifesto.md)** — Philosophy behind the project

---

**Ready to start?** Type `/start-research checkout-abandonment` and see what a coordinated AI research team can do.
