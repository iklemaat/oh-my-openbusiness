export const appstore_reviews = {
  type: "remote" as const,
  url: "https://api.apify.com/v2/mcp/appstore-reviews",
  enabled: true,
  headers: process.env.APIFY_API_TOKEN
    ? { Authorization: `Bearer ${process.env.APIFY_API_TOKEN}` }
    : undefined,
  oauth: false as const,
}
