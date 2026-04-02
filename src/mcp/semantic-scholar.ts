export const semantic_scholar = {
  type: "remote" as const,
  url: "https://mcp.semantic-scholar.org/mcp",
  enabled: true,
  headers: process.env.SEMANTIC_SCHOLAR_API_KEY
    ? { Authorization: `Bearer ${process.env.SEMANTIC_SCHOLAR_API_KEY}` }
    : undefined,
  oauth: false as const,
}
