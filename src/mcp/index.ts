import { createWebsearchConfig } from "./websearch"
import { semantic_scholar } from "./semantic-scholar"
import { reddit } from "./reddit"
import { playwright } from "./playwright"
import { accessibility_scanner } from "./accessibility-scanner"
import { x_twitter } from "./x-twitter"
import { nlp_api } from "./nlp-api"
import { google_analytics } from "./google-analytics"
import { appstore_reviews } from "./appstore-reviews"
import type { OhMyOpenCodeConfig } from "../config/schema"

export { McpNameSchema, type McpName } from "./types"

type RemoteMcpConfig = {
  type: "remote"
  url: string
  enabled: boolean
  headers?: Record<string, string>
  oauth?: boolean
}

export function createBuiltinMcps(disabledMcps: string[] = [], config?: OhMyOpenCodeConfig) {
  const mcps: Record<string, RemoteMcpConfig> = {}

  if (!disabledMcps.includes("websearch")) {
    const websearchConfig = createWebsearchConfig(config?.websearch)
    if (websearchConfig) {
      mcps.websearch = websearchConfig
    }
  }

  if (!disabledMcps.includes("semantic-scholar")) {
    mcps["semantic-scholar"] = semantic_scholar
  }

  if (!disabledMcps.includes("reddit")) {
    mcps.reddit = reddit
  }

  if (!disabledMcps.includes("playwright")) {
    mcps.playwright = playwright
  }

  if (!disabledMcps.includes("accessibility-scanner")) {
    mcps["accessibility-scanner"] = accessibility_scanner
  }

  if (!disabledMcps.includes("x-twitter")) {
    mcps["x-twitter"] = x_twitter
  }

  if (!disabledMcps.includes("nlp-api")) {
    mcps["nlp-api"] = nlp_api
  }

  if (!disabledMcps.includes("google-analytics")) {
    mcps["google-analytics"] = google_analytics
  }

  if (!disabledMcps.includes("appstore-reviews")) {
    mcps["appstore-reviews"] = appstore_reviews
  }

  return mcps
}
