import { z } from "zod"

export const OpenClawGatewaySchema = z.object({
  url: z.string(),
  token: z.string().optional(),
  type: z.string().optional(),
  timeout: z.number().optional(),
  command: z.string().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  method: z.string().optional(),
})

export const OpenClawHookSchema = z.object({
  type: z.string(),
  command: z.string(),
  enabled: z.boolean().default(true),
  gateway: z.string().default(""),
  instruction: z.string().optional(),
})

export const OpenClawReplyListenerConfigSchema = z.object({
  enabled: z.boolean().default(false),
  channel: z.string().optional(),
  pollIntervalMs: z.number().optional(),
  discordBotToken: z.string().optional(),
  discordChannelId: z.string().optional(),
  authorizedDiscordUserIds: z.array(z.string()).optional(),
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  rateLimitPerMinute: z.number().optional(),
  includePrefix: z.boolean().optional(),
  maxMessageLength: z.number().optional(),
})

export const OpenClawConfigSchema = z.object({
  enabled: z.boolean().default(true),
  gateway: OpenClawGatewaySchema.optional(),
  gateways: z.array(OpenClawGatewaySchema).default([]),
  hooks: z.record(z.string(), OpenClawHookSchema).default({}),
  replyListener: OpenClawReplyListenerConfigSchema.optional(),
})

export type OpenClawConfig = z.infer<typeof OpenClawConfigSchema>
export type OpenClawGateway = z.infer<typeof OpenClawGatewaySchema>
export type OpenClawHook = z.infer<typeof OpenClawHookSchema>
export type OpenClawReplyListenerConfig = z.infer<typeof OpenClawReplyListenerConfigSchema>
