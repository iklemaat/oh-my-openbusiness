# src/plugin/ — OpenCode Hook Handlers + Hook Composition

**Generated:** 2026-04-03

## OVERVIEW

Core glue layer. Assembles OpenCode hook handlers and composes lifecycle hooks into the PluginInterface.

## HANDLER FILES

| File | OpenCode Hook | Purpose |
|------|---------------|---------|
| `chat-message.ts` | `chat.message` | First-message variant, session setup, keyword detection |
| `chat-params.ts` | `chat.params` | Anthropic effort level, think mode |
| `event.ts` | `event` | Session lifecycle (created, deleted, idle, error), research memory hook |
| `tool-execute-before.ts` | `tool.execute.before` | Pre-tool guards (file guard, label truncator, rules injector) |
| `tool-execute-after.ts` | `tool.execute.after` | Post-tool hooks (output truncation, comment checker, metadata) |
| `messages-transform.ts` | `experimental.chat.messages.transform` | Context injection, thinking block validation |
| `tool-registry.ts` | `tool` | Research tools assembled from factories |
| `chat-headers.ts` | `chat.headers` | Copilot x-initiator header injection |
| `skill-context.ts` | — | Skill/browser/category context for tool creation |

## HOOK COMPOSITION (hooks/ subdir)

| File | Tier | Count |
|------|------|-------|
| `create-session-hooks.ts` | Session | 19 |
| `create-tool-guard-hooks.ts` | Tool Guard | 13 |
| `create-skill-hooks.ts` | Skill | 2 |
| `create-core-hooks.ts` | Aggregator | Session + Guard + Transform |

## SUPPORT FILES

| File | Purpose |
|------|---------|
| `available-categories.ts` | Build `AvailableCategory[]` for agent prompt injection |
| `session-agent-resolver.ts` | Resolve which agent owns a session |
| `session-status-normalizer.ts` | Normalize session status across OpenCode versions |
| `recent-synthetic-idles.ts` | Dedup rapid idle events |
| `unstable-agent-babysitter.ts` | Track unstable agent behavior across sessions |
| `types.ts` | `PluginContext`, `PluginInterface`, `ToolsRecord`, `TmuxConfig` |
| `config-handler.ts` | Runtime config loading and caching |

## KEY PATTERNS

- Each handler exports a function receiving `(hookRecord, ctx, pluginConfig, managers)` → returns OpenCode hook function
- Handlers iterate over hook records, calling each hook with `(input, output)` in sequence
- `safeHook()` wrapper in composition files catches errors per-hook without breaking the chain
- Tool registry uses `filterDisabledTools()` before returning
