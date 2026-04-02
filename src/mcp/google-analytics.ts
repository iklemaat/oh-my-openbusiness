export const google_analytics = {
  type: "remote" as const,
  url: "https://mcp.google.com/analytics/mcp",
  enabled: true,
  headers: process.env.GOOGLE_ANALYTICS_API_KEY
    ? { Authorization: `Bearer ${process.env.GOOGLE_ANALYTICS_API_KEY}` }
    : undefined,
  oauth: true as const,
}
