import type { BuiltinSkill } from "../types"

export const playwrightSkill: BuiltinSkill = {
  name: "playwright",
  description: "Browser automation via Playwright MCP for web scraping, visual research, screenshots, and accessibility audits.",
  template: `# Playwright Browser Automation — UX Research

This skill provides browser automation capabilities via the Playwright MCP server for UX research purposes: visual audits, accessibility checks, screenshots of competitor interfaces, and web scraping of dynamic content.

## Use Cases for UX Research

- **Visual audits**: Screenshot competitor interfaces for heuristic evaluation
- **Accessibility checks**: Capture pages for accessibility analysis
- **Dynamic content scraping**: Extract content from SPAs that require JavaScript rendering
- **User flow documentation**: Screenshot step-by-step user flows
- **Competitor monitoring**: Capture visual changes over time

## Available via Playwright MCP

- Navigate to URLs
- Take screenshots (full page, element-level)
- Extract page content
- Interact with page elements
- Capture accessibility tree`,
  mcpConfig: {
    playwright: {
      command: "npx",
      args: ["@playwright/mcp@latest"],
    },
  },
}
