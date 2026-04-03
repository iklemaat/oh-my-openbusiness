import { describe, expect, test } from "bun:test"
import { createBuiltinMcps } from "./index"

const ALL_BUILTIN_MCP_COUNT = 13
const ALL_BUILTIN_MCP_NAMES = [
  "websearch",
  "semantic-scholar",
  "reddit",
  "playwright",
  "accessibility-scanner",
  "x-twitter",
  "nlp-api",
  "google-analytics",
  "appstore-reviews",
  "context7",
  "grep_app",
  "academic-search",
  "social-search",
]

describe("createBuiltinMcps", () => {
  test("should return all MCPs when disabled_mcps is empty", () => {
    const disabledMcps: string[] = []
    const result = createBuiltinMcps(disabledMcps)
    expect(result).toHaveProperty("websearch")
    expect(result).toHaveProperty("context7")
    expect(result).toHaveProperty("grep_app")
    expect(result).toHaveProperty("reddit")
    expect(result).toHaveProperty("x-twitter")
    expect(result).toHaveProperty("semantic-scholar")
    expect(Object.keys(result)).toHaveLength(ALL_BUILTIN_MCP_COUNT)
  })

  test("should filter out disabled built-in MCPs", () => {
    const disabledMcps = ["context7"]
    const result = createBuiltinMcps(disabledMcps)
    expect(result).toHaveProperty("websearch")
    expect(result).not.toHaveProperty("context7")
    expect(result).toHaveProperty("grep_app")
    expect(result).toHaveProperty("reddit")
    expect(Object.keys(result)).toHaveLength(ALL_BUILTIN_MCP_COUNT - 1)
  })

  test("should filter out all built-in MCPs when all disabled", () => {
    const disabledMcps = [...ALL_BUILTIN_MCP_NAMES]
    const result = createBuiltinMcps(disabledMcps)
    expect(Object.keys(result)).toHaveLength(0)
  })

  test("should ignore custom MCP names in disabled_mcps", () => {
    const disabledMcps = ["context7", "playwright", "custom"]
    const result = createBuiltinMcps(disabledMcps)
    expect(result).toHaveProperty("websearch")
    expect(result).not.toHaveProperty("context7")
    expect(result).not.toHaveProperty("playwright")
    expect(result).toHaveProperty("grep_app")
    expect(result).toHaveProperty("reddit")
    expect(Object.keys(result)).toHaveLength(ALL_BUILTIN_MCP_COUNT - 2)
  })

  test("should handle empty disabled_mcps by default", () => {
    const result = createBuiltinMcps()
    expect(result).toHaveProperty("websearch")
    expect(result).toHaveProperty("context7")
    expect(result).toHaveProperty("grep_app")
    expect(result).toHaveProperty("reddit")
    expect(Object.keys(result)).toHaveLength(ALL_BUILTIN_MCP_COUNT)
  })

  test("should only filter built-in MCPs, ignoring unknown names", () => {
    const disabledMcps = ["playwright", "sqlite", "unknown-mcp"]
    const result = createBuiltinMcps(disabledMcps)
    expect(result).toHaveProperty("websearch")
    expect(result).toHaveProperty("context7")
    expect(result).toHaveProperty("grep_app")
    expect(result).toHaveProperty("reddit")
    expect(Object.keys(result)).toHaveLength(ALL_BUILTIN_MCP_COUNT - 1)
  })

  test("should not throw when websearch disabled even if tavily configured without API key", () => {
    const originalTavilyKey = process.env.TAVILY_API_KEY
    delete process.env.TAVILY_API_KEY
    const disabledMcps = ["websearch"]
    const config = { websearch: { provider: "tavily" as const } }

    try {
      const createMcps = () => createBuiltinMcps(disabledMcps, config)
      expect(createMcps).not.toThrow()
      const result = createMcps()
      expect(result).not.toHaveProperty("websearch")
    } finally {
      if (originalTavilyKey) process.env.TAVILY_API_KEY = originalTavilyKey
    }
  })
})
