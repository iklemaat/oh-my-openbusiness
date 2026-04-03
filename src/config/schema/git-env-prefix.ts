import { z } from "zod"

export const GitEnvPrefixSchema = z.string().default("")

export type GitEnvPrefix = z.infer<typeof GitEnvPrefixSchema>
