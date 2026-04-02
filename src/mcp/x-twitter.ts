export const x_twitter = {
  type: "remote" as const,
  url: "https://mcp.x.com/mcp",
  enabled: true,
  headers: process.env.X_API_KEY
    ? { Authorization: `Bearer ${process.env.X_API_KEY}` }
    : undefined,
  oauth: false as const,
}
