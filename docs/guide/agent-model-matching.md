# Agent-Model Matching Guide

> **For agents and users**: Why each research agent needs a specific model — and how to customize without breaking things.

## The Core Insight: Models Think Differently

Think of AI models as researchers on a team. Each has a different brain, different personality, different strengths. **A model isn't just "smarter" or "dumber." It thinks differently.** Give the same research instruction to qwen3.5-plus and glm-5, and they'll approach it in fundamentally different ways.

This isn't a bug. It's the foundation of the entire system.

Oh My OpenBusiness assigns each agent a model that matches its _working style_ — like building a research team where each person is in the role that fits their personality.

### Sisyphus: The Research Director

Sisyphus is the researcher who knows everyone, coordinates across disciplines, and gets research done through communication and delegation. Plans research waves, understands context across all source types, delegates work intelligently, and synthesizes findings well. But deep, purely autonomous exploration? That's better left to Hephaestus.

**This is why Sisyphus uses qwen3.5-plus.** This model excels at:

- Following complex, multi-step instructions (Sisyphus's prompt is ~1,100 lines)
- Maintaining conversation flow across many tool calls
- Understanding nuanced delegation and orchestration patterns
- 1M context window for full research scope awareness
- Multimodal input for visual research elements

### Hephaestus: The Deep Researcher

Hephaestus is the researcher who stays in their room exploring sources all day. Doesn't ask for permission. Might seem single-minded. But give them a research question and they'll emerge hours later with findings nobody else could have found.

**This is why Hephaestus uses GLM-5.** GLM-5 is built for exactly this:

- Deep, autonomous exploration without hand-holding
- Strong reasoning across multiple source types
- Principle-driven execution (give a goal, not a recipe)
- Working independently for extended periods
- Thinking enabled for complex pattern detection

### The Takeaway

Every agent's prompt is tuned to match its model's capabilities. **When you change the model, you change the brain — and the same instructions get understood completely differently.** Model matching isn't about "better" or "worse." It's about fit.

---

## How Models Think Differently

This matters for understanding why some agents support multiple model families while others don't.

**qwen3.5-plus** responds to **mechanics-driven** prompts — detailed checklists, templates, step-by-step procedures. More rules = more compliance. You can write a 1,100-line prompt with nested workflows and qwen3.5-plus will follow every step.

**GLM-5** responds to **principle-driven** prompts — concise principles, structured format, explicit decision criteria. GLM-5 works best when you state the research goal and let it figure out the mechanics.

Agents that support both families (Prometheus, Atlas) auto-detect your model at runtime and switch prompts accordingly. You don't have to think about it.

---

## Agent Profiles

### Communicators → qwen3.5-plus / kimi-k2.5 / glm-5

These agents have prompts tuned for models that reliably follow complex, multi-layered instructions.

| Agent | Role | Model | Notes |
|-------|------|-------|-------|
| **Sisyphus** | Research Director | qwen3.5-plus | 1M context, multimodal, thinking. Best for orchestration. |
| **Metis** | Research Consultant | glm-5 | Strong reasoning for gap analysis and optimization. |

### Dual-Prompt Agents → qwen3.5-plus preferred, glm-5 supported

These agents ship separate prompts for different model families. They auto-detect your model and switch at runtime.

| Agent | Role | Model | Notes |
|-------|------|-------|-------|
| **Prometheus** | Research Planner | qwen3.5-plus | 1M context for complex planning. Auto-switches for glm-5. |
| **Atlas** | Master Orchestrator | qwen3.5-plus | Full context coordination. Auto-switches for glm-5. |

### Deep Specialists → glm-5

These agents are built for GLM's reasoning style. Their prompts assume autonomous, goal-oriented execution.

| Agent | Role | Model | Notes |
|-------|------|-------|-------|
| **Hephaestus** | Deep Researcher | glm-5 | Autonomous research. Thinking enabled. The craftsman. |
| **Oracle** | Insight Analyst | qwen3.5-plus | Complex synthesis. 1M context for large finding sets. |
| **Momus** | Plan Reviewer | glm-4.7 | Strong reasoning for quality review. Thinking enabled. |

### Utility Runners → Speed over Intelligence

These agents do web searching, social listening, and retrieval. They intentionally use the fastest, most efficient models available. **Don't "upgrade" them to qwen3.5-plus** — that's hiring your lead researcher to file paperwork.

| Agent | Role | Model | Notes |
|-------|------|-------|-------|
| **Explore** | Web Scout | glm-5 | Strong reasoning for pattern detection in user feedback. |
| **Librarian** | Industry Researcher | qwen3.5-plus | 1M context for large documents and reports. |
| **Multimodal Looker** | Visual Analyst | kimi-k2.5 | Multimodal (text+image) for visual UX analysis. |
| **Sisyphus-Junior** | Research Assistant | MiniMax-M2.5 | Fast for simple research tasks. |

---

## Model Capabilities

### qwen3.5-plus (Most Capable)

1M context window, multimodal (text+image), thinking enabled. Best for orchestration, synthesis, complex planning.

| Capability | Detail |
|------------|--------|
| **Context** | 1,000,000 tokens — largest in the system |
| **Multimodal** | Accepts text and image input |
| **Thinking** | Enabled with 8,192 token budget |
| **Output** | Up to 65,536 tokens |
| **Best For** | Sisyphus, Atlas, Prometheus, Oracle, Librarian |

### GLM-5 / GLM-4.7 (Strong Reasoning)

202K context, thinking enabled, "Agentic Engineering" — designed for autonomous task execution.

| Capability | Detail |
|------------|--------|
| **Context** | 202,752 tokens |
| **Thinking** | Enabled with 8,192 token budget |
| **Output** | Up to 16,384 tokens |
| **Best For** | Hephaestus, Metis, Explore, Momus |

### Kimi K2.5 (Multimodal)

262K context, multimodal (text+image), thinking enabled, "Visual Agentic Intelligence."

| Capability | Detail |
|------------|--------|
| **Context** | 262,144 tokens |
| **Multimodal** | Accepts text and image input |
| **Thinking** | Enabled with 8,192 token budget |
| **Output** | Up to 32,768 tokens |
| **Best For** | Multimodal-Looker, visual-audit category, artistry category |

### MiniMax M2.5 (Fast)

196K context, thinking enabled, "SOTA in Agent" — designed for agent tasks with speed.

| Capability | Detail |
|------------|--------|
| **Context** | 196,608 tokens |
| **Thinking** | Enabled with 8,192 token budget |
| **Output** | Up to 24,576 tokens |
| **Best For** | Sisyphus-Junior, quick-lookup category |

### qwen3-max-2026-01-23 (General Reasoning)

262K context, no thinking, no multimodal. Strong general-purpose reasoning.

| Capability | Detail |
|------------|--------|
| **Context** | 262,144 tokens |
| **Thinking** | Not available |
| **Output** | Up to 32,768 tokens |
| **Best For** | Writing category, general reasoning |

### qwen3-coder-next / qwen3-coder-plus (Large Context)

262K / 1M context. Optimized for code but usable for large document processing.

| Capability | Detail |
|------------|--------|
| **Context** | 262,144 (next) / 1,000,000 (plus) |
| **Thinking** | Not available |
| **Best For** | Large document processing, utility tasks |

---

## Research Categories

When agents delegate work, they don't pick a model name — they pick a **category**. The category maps to the right model automatically.

| Category | Model | When Used |
|----------|-------|-----------|
| `visual-audit` | kimi-k2.5 | Heuristic evaluation, visual analysis, accessibility |
| `thematic-analysis` | glm-5 | Pattern identification, qualitative coding |
| `deep-research` | kimi-k2.5 | In-depth investigation, thorough exploration |
| `creative-insights` | qwen3.5-plus | Creative analysis, ideation, novel connections |
| `quick-lookup` | MiniMax-M2.5 | Fast fact-finding, single-source queries |
| `content-coding` | glm-5 | Qualitative data coding, sentiment classification |
| `report-writing` | kimi-k2.5 | Research report generation, documentation |
| `comprehensive-study` | qwen3.5-plus | Full research studies, multi-source synthesis |

See the [Orchestration System Guide](./orchestration.md) for how agents dispatch tasks to categories.

---

## Customization

### Example Configuration

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

    // Research planner: Qwen3.5 Plus for complex planning
    "prometheus": {
      "model": "bailian-coding-plan/qwen3.5-plus",
      "prompt_append": "Leverage deep & quick agents heavily, always in parallel.",
    },
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

  // Limit expensive models; let cheap ones run freely
  "background_task": {
    "providerConcurrency": {
      "bailian-coding-plan": 5,
    },
    "modelConcurrency": {
      "bailian-coding-plan/qwen3.5-plus": 2,
      "bailian-coding-plan/MiniMax-M2.5": 10,
    },
  },
}
```

### Safe vs Dangerous Overrides

**Safe** — similar capabilities:

- Sisyphus: qwen3.5-plus → glm-5 (both strong reasoning)
- Prometheus: qwen3.5-plus → glm-5 (both support thinking)
- Atlas: qwen3.5-plus → glm-5 (both strong reasoning)

**Dangerous** — capability mismatch:

- Sisyphus → MiniMax-M2.5: **Too weak for orchestration. Sisyphus needs the most capable model.**
- Hephaestus → qwen3-coder-next: **Coder models aren't optimized for research reasoning.**
- Explore → qwen3.5-plus: **Cost waste. Explore needs reasoning, not max capability.**
- Librarian → MiniMax-M2.5: **Librarian needs 1M context for large documents.**

### How Model Resolution Works

Each agent has a fallback chain. The system tries models in priority order until it finds one available. You don't need to configure providers per model. Just set your API key and the system figures out which models are available.

```
Agent Request → User Override (if configured) → Fallback Chain → System Default
```

### File-Based Prompts

You can load agent system prompts from external files using `file://` URLs in the `prompt` field, or append additional content with `prompt_append`.

```jsonc
{
  "agents": {
    "sisyphus": {
      "prompt": "file:///path/to/custom-sisyphus-prompt.md"
    },
    "oracle": {
      "prompt_append": "file:///path/to/oracle-additional-context.md"
    }
  },
  "categories": {
    "deep-research": {
      "prompt_append": "file:///path/to/deep-research-append.md"
    }
  }
}
```

The file content is loaded at runtime and injected into the agent's system prompt. Supports `~` expansion for home directory and relative `file://` paths.

---

## See Also

- [Installation Guide](./installation.md) — Setup and authentication
- [Orchestration System Guide](./orchestration.md) — How agents dispatch tasks to categories
- [Configuration Reference](../reference/configuration.md) — Full config options
- [`src/shared/model-requirements.ts`](../../src/shared/model-requirements.ts) — Source of truth for fallback chains
