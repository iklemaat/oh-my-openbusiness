import { z } from "zod"

export const BuiltinCommandNameSchema = z.enum([
  "init-deep",
  "start-research",
  "research-loop",
])

export type BuiltinCommandName = z.infer<typeof BuiltinCommandNameSchema>
