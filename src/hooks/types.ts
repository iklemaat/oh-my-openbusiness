import type { PluginInput } from "@opencode-ai/plugin"

export type HookFunction = (
  event: {
    type: string
    properties?: Record<string, unknown>
  },
  ctx: {
    session?: {
      id: string
      messages?: Array<{
        role: string
        content?: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
      }>
    }
    directory: string
    log?: {
      warn: (msg: string) => void
      info: (msg: string) => void
      error: (msg: string) => void
    }
  } & PluginInput,
) => Promise<void>
