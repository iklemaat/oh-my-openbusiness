# src/hooks/ — Lifecycle Hooks

**Generated:** 2026-04-03

## OVERVIEW

Lifecycle hooks for research context management, session recovery, and UX research workflow. All hooks follow `createXXXHook(deps) → HookFunction` factory pattern.

## HOOK TIERS

### Tier 1: Session Hooks — `create-session-hooks.ts`

| Hook | Event | Purpose |
|------|-------|---------|
| contextWindowMonitor | session.idle | Track context window usage |
| preemptiveCompaction | session.idle | Trigger compaction before limit |
| sessionRecovery | session.error | Auto-retry on recoverable errors |
| sessionNotification | session.idle | OS notifications on completion |
| thinkMode | chat.params | Model variant switching (extended thinking) |
| modelFallback | chat.params | Provider-level model fallback on errors |
| autoUpdateChecker | session.created | Check npm for plugin updates |
| agentUsageReminder | chat.message | Remind about available research agents |
| nonInteractiveEnv | chat.message | Adjust behavior for `run` command |
| interactiveBashSession | tool.execute | Tmux session for interactive tools |
| editErrorRecovery | tool.execute.after | Retry failed file edits |
| delegateTaskRetry | tool.execute.after | Retry failed research delegations |
| questionLabelTruncator | tool.execute.before | Truncate long question labels |
| taskResumeInfo | chat.message | Inject task context on resume |
| anthropicEffort | chat.params | Adjust reasoning effort level |
| runtimeFallback | event | Auto-switch models on API provider errors |
| noSisyphusGpt | chat.message | Block Sisyphus from using GPT models |
| noHephaestusNonGpt | chat.message | Block Hephaestus from using non-GPT models |
| researchMemory | session.idle | Track and persist research findings across sessions |

### Tier 2: Tool Guard Hooks — `create-tool-guard-hooks.ts`

| Hook | Event | Purpose |
|------|-------|---------|
| commentChecker | tool.execute.after | Block AI-generated comment patterns |
| toolOutputTruncator | tool.execute.after | Truncate oversized tool output |
| directoryAgentsInjector | tool.execute.before | Inject dir AGENTS.md into context |
| directoryReadmeInjector | tool.execute.before | Inject dir README.md into context |
| emptyTaskResponseDetector | tool.execute.after | Detect empty/failed task responses |
| rulesInjector | tool.execute.before | Conditional rules injection |
| tasksTodowriteDisabler | tool.execute.before | Disable TodoWrite when task system active |
| writeExistingFileGuard | tool.execute.before | Require Read before Write on existing files |
| jsonErrorRecovery | tool.execute.after | Detect JSON parse errors, inject correction |
| readImageResizer | tool.execute.after | Resize images for context efficiency |
| todoDescriptionOverride | tool.execute.before | Override todo descriptions |
| webfetchRedirectGuard | tool.execute.after | Guard webfetch redirects |
| bashFileReadGuard | tool.execute.before | Require read before bash file operations |

### Tier 3: Transform Hooks — `create-transform-hooks.ts`

| Hook | Event | Purpose |
|------|-------|---------|
| claudeCodeHooks | messages.transform | Claude Code settings.json compatibility |
| keywordDetector | messages.transform | Detect research modes from user input |
| contextInjectorMessagesTransform | messages.transform | Inject AGENTS.md/README.md into context |
| thinkingBlockValidator | messages.transform | Validate thinking block structure |

### Tier 4: Continuation Hooks — `create-continuation-hooks.ts`

| Hook | Event | Purpose |
|------|-------|---------|
| stopContinuationGuard | chat.message | Guard stop continuation |
| compactionContextInjector | session.compacted | Re-inject context after compaction |
| compactionTodoPreserver | session.compacted | Preserve todos through compaction |
| todoContinuationEnforcer | session.idle | Force continuation on incomplete todos |
| unstableAgentBabysitter | session.idle | Monitor unstable agent behavior |
| backgroundNotificationHook | event | Background task completion notifications |
| atlasHook | event | Master orchestrator for background sessions |

### Tier 5: Skill Hooks — `create-skill-hooks.ts`

| Hook | Event | Purpose |
|------|-------|---------|
| categorySkillReminder | chat.message | Remind about category+skill delegation |
| autoSlashCommand | chat.message | Auto-detect `/command` in user input |

## KEY HOOKS

### research-memory

Tracks research findings across sessions. On session.idle, analyzes assistant messages for findings, patterns, and sources. Persists to `.sisyphus/research-memory/` for cross-session continuity.

### delegate-task-retry

Retries failed research delegations with adjusted prompts. Critical for autonomous research where network errors or model failures shouldn't abort the entire research wave.

### model-fallback

Provider-level model fallback. If a model fails, automatically switches to the next model in the fallback chain. Essential for the bailian-coding-plan provider with 8 models.

### runtime-fallback

Auto-switches models on API provider errors. Works at the event level to catch and recover from provider failures during research execution.
