export const nlp_api = {
  type: "remote" as const,
  url: "https://api.apify.com/v2/mcp/nlp-api-mcp",
  enabled: true,
  headers: process.env.APIFY_API_TOKEN
    ? { Authorization: `Bearer ${process.env.APIFY_API_TOKEN}` }
    : undefined,
  oauth: false as const,
}
