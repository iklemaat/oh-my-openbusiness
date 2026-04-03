# src/tools/ — Research Tools

**Generated:** 2026-04-03

## OVERVIEW

Research tools registered via `createToolRegistry()`. Factory functions (`createXXXTool`) for all tools.

## TOOL CATALOG

### Task Management (4)

| Tool | Factory | Parameters |
|------|---------|------------|
| `task_create` | `createTaskCreateTool` | subject, description, blockedBy, blocks, metadata, parentID |
| `task_list` | `createTaskList` | (none) |
| `task_get` | `createTaskGetTool` | id |
| `task_update` | `createTaskUpdateTool` | id, subject, description, status, addBlocks, addBlockedBy, owner, metadata |

### Delegation (1)

| Tool | Factory | Parameters |
|------|---------|------------|
| `task` | `createDelegateTask` | description, prompt, category, subagent_type, run_in_background, session_id, load_skills, command |

**8 Research Categories**: visual-audit, thematic-analysis, deep-research, creative-insights, quick-lookup, content-coding, report-writing, comprehensive-study

### Agent Invocation (1)

| Tool | Factory | Parameters |
|------|---------|------------|
| `call_omo_agent` | `createCallOmoAgent` | description, prompt, subagent_type, run_in_background, session_id |

### Background Tasks (2)

| Tool | Factory | Parameters |
|------|---------|------------|
| `background_output` | `createBackgroundOutput` | task_id, block, timeout, full_session, include_thinking, message_limit, since_message_id |
| `background_cancel` | `createBackgroundCancel` | taskId, all |

### Session History (4)

| Tool | Factory | Parameters |
|------|---------|------------|
| `session_list` | `createSessionManagerTools` | (none) |
| `session_read` | `createSessionManagerTools` | session_id, include_todos, limit |
| `session_search` | `createSessionManagerTools` | query, session_id, case_sensitive, limit |
| `session_info` | `createSessionManagerTools` | session_id |

### Skill/Command (2)

| Tool | Factory | Parameters |
|------|---------|------------|
| `skill` | `createSkillTool` | name, user_message |
| `skill_mcp` | `createSkillMcpTool` | mcp_name, tool_name/resource_name/prompt_name, arguments |

### System (1)

| Tool | Factory | Parameters |
|------|---------|------------|
| `interactive_bash` | Direct | tmux_command |

## DELEGATION CATEGORIES

| Category | Model | Domain |
|----------|-------|--------|
| visual-audit | kimi-k2.5 high | Heuristic evaluation, visual analysis |
| thematic-analysis | glm-5 xhigh | Pattern identification, coding |
| deep-research | kimi-k2.5 medium | In-depth investigation |
| creative-insights | qwen3.5-plus high | Creative analysis, ideation |
| quick-lookup | MiniMax-M2.5 | Fast fact-finding |
| content-coding | glm-5 | Qualitative data coding |
| report-writing | kimi-k2.5 | Research report generation |
| comprehensive-study | qwen3.5-plus max | Full research studies |

## HOW TO ADD A TOOL

1. Create `src/tools/{name}/index.ts` exporting factory
2. Create `src/tools/{name}/types.ts` for parameter schemas
3. Create `src/tools/{name}/tools.ts` for implementation
4. Register in `src/plugin/tool-registry.ts`
