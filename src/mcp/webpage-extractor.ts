export const webpage_extractor = {
  type: "remote" as const,
  url: "https://r.jina.ai",
  enabled: true,
  headers: process.env.JINA_API_KEY
    ? { Authorization: `Bearer ${process.env.JINA_API_KEY}` }
    : undefined,
  oauth: false as const,
}
