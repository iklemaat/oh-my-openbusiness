import { z } from "zod"

export const ClaudeCodeConfigSchema = z.object({
  hooks: z.union([z.boolean(), z.object({})]).optional(),
  skills: z.boolean().optional(),
  agents: z.boolean().optional(),
  commands: z.boolean().optional(),
  plugins: z.boolean().optional(),
  plugins_override: z.record(z.string(), z.boolean()).optional(),
})

export type ClaudeCodeConfig = z.infer<typeof ClaudeCodeConfigSchema>
