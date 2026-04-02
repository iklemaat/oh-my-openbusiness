import { createWebsearchConfig } from "./websearch"
import { academic_search } from "./academic-search"
import { social_search } from "./social-search"
import type { OhMyOpenCodeConfig } from "../config/schema"

export { McpNameSchema, type McpName } from "./types"

type RemoteMcpConfig = {
  type: "remote"
  url: string
  enabled: boolean
  headers?: Record<string, string>
  oauth?: false
}

export function createBuiltinMcps(disabledMcps: string[] = [], config?: OhMyOpenCodeConfig) {
  const mcps: Record<string, RemoteMcpConfig> = {}

  if (!disabledMcps.includes("websearch")) {
    const websearchConfig = createWebsearchConfig(config?.websearch)
    if (websearchConfig) {
      mcps.websearch = websearchConfig
    }
  }

  if (!disabledMcps.includes("academic-search")) {
    mcps["academic-search"] = academic_search
  }

  if (!disabledMcps.includes("social-search")) {
    mcps["social-search"] = social_search
  }

  return mcps
}
