import type { CommandDefinition } from "../claude-code-command-loader"
import type { BuiltinCommandName, BuiltinCommands } from "./types"
import { INIT_DEEP_TEMPLATE } from "./templates/init-deep"
import { START_RESEARCH_TEMPLATE } from "./templates/start-research"
import { RESEARCH_LOOP_TEMPLATE } from "./templates/research-loop"

export interface LoadBuiltinCommandsOptions {
  useRegisteredAgents?: boolean
}

function createBuiltinCommandDefinitions(
  options?: LoadBuiltinCommandsOptions,
): Record<BuiltinCommandName, Omit<CommandDefinition, "name">> {
  return {
    "init-deep": {
      description: "(builtin) Initialize hierarchical AGENTS.md knowledge base",
      template: `<command-instruction>
${INIT_DEEP_TEMPLATE}
</command-instruction>

<user-request>
$ARGUMENTS
</user-request>`,
      argumentHint: "[--create-new] [--max-depth=N]",
    },
    "start-research": {
      description: "(builtin) Start autonomous UX research session",
      agent: "sisyphus",
      template: `<command-instruction>
${START_RESEARCH_TEMPLATE}
</command-instruction>

<session-context>
Session ID: $SESSION_ID
Timestamp: $TIMESTAMP
</session-context>

<user-request>
$ARGUMENTS
</user-request>`,
      argumentHint: "[research-topic]",
    },
    "research-loop": {
      description: "(builtin) Start self-referential UX research loop until saturation",
      agent: "sisyphus",
      template: `<command-instruction>
${RESEARCH_LOOP_TEMPLATE}
</command-instruction>

<session-context>
Session ID: $SESSION_ID
Timestamp: $TIMESTAMP
</session-context>

<user-request>
$ARGUMENTS
</user-request>`,
      argumentHint: '"research-topic"',
    },
  }
}

export function loadBuiltinCommands(
  disabledCommands?: BuiltinCommandName[],
  options?: LoadBuiltinCommandsOptions,
): BuiltinCommands {
  const builtinCommandDefinitions = createBuiltinCommandDefinitions(options)
  const disabled = new Set(disabledCommands ?? [])
  const commands: BuiltinCommands = {}

  for (const [name, definition] of Object.entries(builtinCommandDefinitions)) {
    if (!disabled.has(name as BuiltinCommandName)) {
      const { argumentHint: _argumentHint, ...openCodeCompatible } = definition
      commands[name] = { ...openCodeCompatible, name } as CommandDefinition
    }
  }

  return commands
}
