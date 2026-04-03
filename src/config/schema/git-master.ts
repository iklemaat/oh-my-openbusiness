import { z } from "zod"

export const GitMasterConfigSchema = z.object({
  commit_footer: z.boolean().default(false),
  include_co_authored_by: z.boolean().default(false),
  git_env_prefix: z.string().default(""),
})

export type GitMasterConfig = z.infer<typeof GitMasterConfigSchema>

export function assertValidGitEnvPrefix(prefix: string): string {
  return prefix
}
