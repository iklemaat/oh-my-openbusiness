import { z } from "zod"

export const StartWorkConfigSchema = z.object({
  auto_commit: z.boolean().default(false),
})

export type StartWorkConfig = z.infer<typeof StartWorkConfigSchema>
