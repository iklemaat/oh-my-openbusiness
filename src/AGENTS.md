# src/ — Plugin Source

**Generated:** 2026-04-03

## OVERVIEW

Entry point `index.ts` orchestrates 5-step initialization: loadConfig → createManagers → createTools → createHooks → createPluginInterface.

## KEY FILES

| File | Purpose |
|------|---------|
| `index.ts` | Plugin entry, exports `OhMyOpenCodePlugin` |
| `plugin-config.ts` | JSONC parse, multi-level merge, Zod validation |
| `create-managers.ts` | BackgroundManager, SkillMcpManager, ConfigHandler |
| `create-tools.ts` | SkillContext + AvailableCategories + ToolRegistry |
| `create-hooks.ts` | Session + Tool-Guard + Transform + Continuation hooks |
| `plugin-interface.ts` | OpenCode hook handlers: config, tool, chat.message, chat.params, chat.headers, event, tool.execute.before, tool.execute.after |

## CONFIG LOADING

```
loadPluginConfig(directory, ctx)
  1. User: ~/.config/opencode/oh-my-opencode.jsonc
  2. Project: .opencode/oh-my-opencode.jsonc
  3. mergeConfigs(user, project) → deepMerge for agents/categories, Set union for disabled_*
  4. Zod safeParse → defaults for omitted fields
  5. migrateConfigFile() → legacy key transformation
```

## HOOK COMPOSITION

```
createHooks()
  ├─→ createCoreHooks()
  │   ├─ createSessionHooks()     # contextWindowMonitor, thinkMode, modelFallback, researchMemory, runtimeFallback...
  │   ├─ createToolGuardHooks()   # commentChecker, rulesInjector, writeExistingFileGuard, jsonErrorRecovery...
  │   └─ createTransformHooks()   # claudeCodeHooks, keywordDetector, contextInjector, thinkingBlockValidator
  ├─→ createContinuationHooks()   # stopContinuationGuard, compactionContextInjector, compactionTodoPreserver...
  └─→ createSkillHooks()          # categorySkillReminder, autoSlashCommand
```
