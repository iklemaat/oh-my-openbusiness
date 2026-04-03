import { z } from "zod"

export const RalphLoopConfigSchema = z.object({
  enabled: z.boolean().default(true),
  default_max_iterations: z.number().default(100),
  state_dir: z.string().optional(),
  default_strategy: z.enum(["continue", "reset"]).optional(),
})

export type RalphLoopConfig = z.infer<typeof RalphLoopConfigSchema>
