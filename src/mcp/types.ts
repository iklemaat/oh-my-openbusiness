import { z } from "zod"

export const McpNameSchema = z.enum([
  "websearch",
  "semantic-scholar",
  "reddit",
  "playwright",
  "accessibility-scanner",
  "x-twitter",
  "nlp-api",
  "google-analytics",
  "appstore-reviews",
])

export type McpName = z.infer<typeof McpNameSchema>

export const AnyMcpNameSchema = z.string().min(1)

export type AnyMcpName = z.infer<typeof AnyMcpNameSchema>
