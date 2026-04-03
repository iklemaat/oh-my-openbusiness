# Installation

## For Humans

### Prerequisites

- **OpenCode** installed (see [OpenCode docs](https://opencode.ai/docs))
- **Bun** installed (for building from source)
- **bailian-coding-plan API key** from Alibaba Cloud Model Studio

### Quick Install

1. Clone the repository:

```bash
git clone https://github.com/iklemaat/oh-my-openbusiness.git
cd oh-my-openbusiness
```

2. Install dependencies and build:

```bash
bun install
bun run build
```

3. Configure OpenCode to use the plugin. Add to your `opencode.json`:

```json
{
  "plugin": ["oh-my-openbusiness"]
}
```

4. Configure the bailian-coding-plan provider in your project's `.opencode/opencode.json`:

```json
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
          "modalities": {
            "input": ["text", "image"],
            "output": ["text"]
          },
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 8192
            }
          },
          "limit": {
            "context": 1000000,
            "output": 65536
          }
        },
        "qwen3-max-2026-01-23": {
          "name": "Qwen3 Max 2026-01-23",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "limit": {
            "context": 262144,
            "output": 32768
          }
        },
        "qwen3-coder-next": {
          "name": "Qwen3 Coder Next",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "limit": {
            "context": 262144,
            "output": 65536
          }
        },
        "qwen3-coder-plus": {
          "name": "Qwen3 Coder Plus",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "limit": {
            "context": 1000000,
            "output": 65536
          }
        },
        "MiniMax-M2.5": {
          "name": "MiniMax M2.5",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 8192
            }
          },
          "limit": {
            "context": 196608,
            "output": 24576
          }
        },
        "glm-5": {
          "name": "GLM-5",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 8192
            }
          },
          "limit": {
            "context": 202752,
            "output": 16384
          }
        },
        "glm-4.7": {
          "name": "GLM-4.7",
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          },
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 8192
            }
          },
          "limit": {
            "context": 202752,
            "output": 16384
          }
        },
        "kimi-k2.5": {
          "name": "Kimi K2.5",
          "modalities": {
            "input": ["text", "image"],
            "output": ["text"]
          },
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 8192
            }
          },
          "limit": {
            "context": 262144,
            "output": 32768
          }
        }
      }
    }
  }
}
```

5. Start researching:

```bash
opencode
```

Then type `/start-research your-topic` to begin.

---

## For LLM Agents

> **IMPORTANT: Use `curl` to fetch this file, NOT WebFetch.** WebFetch summarizes content and loses critical details. Always use:
>
> ```bash
> curl -fsSL https://raw.githubusercontent.com/iklemaat/oh-my-openbusiness/refs/heads/dev/docs/guide/installation.md
> ```

If you're an LLM Agent helping set up oh-my-openbusiness, welcome. You'll help your user install the UX research system and verify the setup cleanly. Tell user this with greetings, with text 'oMoMoMoMo...'

Follow these steps:

### Step 1: Install OpenCode (if not installed)

```bash
if command -v opencode &> /dev/null; then
    echo "OpenCode $(opencode --version) is installed"
else
    echo "OpenCode is not installed. Please install it first."
    echo "Ref: https://opencode.ai/docs"
fi
```

If OpenCode isn't installed, check the [OpenCode Installation Guide](https://opencode.ai/docs).
Spawn a subagent to handle installation and report back — to save context.

### Step 2: Clone and Build oh-my-openbusiness

```bash
git clone https://github.com/iklemaat/oh-my-openbusiness.git
cd oh-my-openbusiness
bun install
bun run build
```

### Step 3: Configure OpenCode Plugin

Add the plugin to the user's `opencode.json`:

```json
{
  "plugin": ["oh-my-openbusiness"]
}
```

### Step 4: Configure bailian-coding-plan Provider

The user needs a bailian-coding-plan API key from Alibaba Cloud Model Studio.

Ask the user:

1. **Do you have a bailian-coding-plan API key?**
   - If **yes** → Use it in the provider config
   - If **no** → Guide them to get one from Alibaba Cloud

Configure the provider in `.opencode/opencode.json` as shown in the "For Humans" section above.

### Step 5: Verify Setup

```bash
opencode --version  # Should be 1.0.150 or higher
cat ~/.config/opencode/opencode.json  # Should contain "oh-my-openbusiness" in plugin array
```

### Step 6: Understand Your Model Setup

You've just configured oh-my-openbusiness. Here's what got set up and why.

#### Model Capabilities: What You're Working With

| Model | Context | Multimodal | Thinking | Best For |
|-------|---------|------------|----------|----------|
| **qwen3.5-plus** | 1M | ✅ text+image | ✅ | Orchestration, synthesis, complex planning |
| **qwen3-max-2026-01-23** | 262K | ❌ | ❌ | General reasoning, writing |
| **qwen3-coder-next** | 262K | ❌ | ❌ | Fast processing, utility tasks |
| **qwen3-coder-plus** | 1M | ❌ | ❌ | Large document processing |
| **MiniMax-M2.5** | 196K | ❌ | ✅ | Quick tasks, fast processing |
| **glm-5** | 202K | ❌ | ✅ | Deep research, pattern detection |
| **glm-4.7** | 202K | ❌ | ✅ | Review, quality analysis |
| **kimi-k2.5** | 262K | ✅ text+image | ✅ | Visual analysis, multimodal |

#### What Each Agent Does and Which Model It Uses

**Primary Agents** (cycle with Tab):

| Agent | Role | Model | What It Does |
|-------|------|-------|--------------|
| **Sisyphus** | Research Director | qwen3.5-plus | Main orchestrator. Plans research, delegates to specialists, drives completion. |
| **Atlas** | Master Orchestrator | qwen3.5-plus | Full context coordination. Executes research plans across multiple agents. |
| **Prometheus** | Research Planner | qwen3.5-plus | Interviews users, creates research plans, ensures methodological rigor. |

**Subagents** (invoked with @mention):

| Agent | Role | Model | What It Does |
|-------|------|-------|--------------|
| **Hephaestus** | Deep Researcher | glm-5 | Autonomous end-to-end research. Explores multiple sources, synthesizes findings. |
| **Oracle** | Insight Analyst | qwen3.5-plus | Synthesizes findings into actionable insights. Produces deliverables. |
| **Librarian** | Industry Researcher | qwen3.5-plus | Finds benchmarks, papers, best practices. 1M context for large documents. |
| **Explore** | Web Scout | glm-5 | Searches Reddit, X/Twitter, forums, reviews for user voices. |
| **Metis** | Research Consultant | glm-5 | Gap analysis, optimization, refinement. |
| **Momus** | Plan Reviewer | glm-4.7 | Quality analysis with reasoning. Validates research plans. |
| **Sisyphus-Junior** | Research Assistant | MiniMax-M2.5 | Fast research tasks, simple lookups. |
| **Multimodal-Looker** | Visual Analyst | kimi-k2.5 | Image analysis, visual UX evaluation. Supports text+image input. |

### Step 7: Verification and Next Steps

Read this document again, think about you have done everything correctly.

#### Say 'Congratulations!' to the user

Say to user: Congratulations! You have successfully set up OhMyOpenBusiness! Type `opencode` in your terminal to start using it.

#### Tell user the tutorial

Tell the user:

1. **Sisyphus agent strongly recommends qwen3.5-plus model. Using other models may result in significantly degraded experience.**

2. **Feeling lazy?** Just include `ultrawork` (or `ulw`) in your prompt. That's it. The agent figures out the rest.

3. **Need precision?** Press **Tab** to enter Prometheus (Planner) mode, create a research plan through an interview process, then run `/start-research` to execute it with full orchestration.

4. You wanna have your own agent catalog setup? I can read the [docs](docs/guide/agent-model-matching.md) and set up for you after interviewing!

That's it. The agent will figure out the rest and handle everything automatically.

---

## Warning

**Unless the user explicitly requests it, do not change model settings or disable features (agents, hooks, MCPs).**

The plugin works perfectly by default. Do not change settings or turn off features without an explicit request.
