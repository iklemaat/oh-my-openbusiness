import { z } from "zod"

export const BrowserAutomationProviderSchema = z.enum([
  "playwright",
  "playwright-cli",
])

export const BrowserAutomationConfigSchema = z.object({
  /**
   * Browser automation provider to use for web scraping and visual research.
   * - "playwright": Uses Playwright MCP server (@playwright/mcp) - default
   * - "playwright-cli": Uses Playwright CLI - token-efficient CLI alternative
   */
  provider: BrowserAutomationProviderSchema.default("playwright"),
})

export type BrowserAutomationProvider = z.infer<
  typeof BrowserAutomationProviderSchema
>
export type BrowserAutomationConfig = z.infer<typeof BrowserAutomationConfigSchema>
