export type FallbackEntry = {
  providers: string[];
  model: string;
  variant?: string;
  reasoningEffort?: string;
  temperature?: number;
  top_p?: number;
  maxTokens?: number;
  thinking?: { type: "enabled" | "disabled"; budgetTokens?: number };
};

export type ModelRequirement = {
  fallbackChain: FallbackEntry[];
  variant?: string;
  requiresModel?: string;
  requiresAnyModel?: boolean;
  requiresProvider?: string[];
};

export const AGENT_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  sisyphus: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        variant: "max",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
    requiresAnyModel: true,
  },
  hephaestus: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        variant: "medium",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
    requiresProvider: ["bailian-coding-plan"],
  },
  oracle: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-max-2026-01-23",
        variant: "high",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  librarian: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
    ],
  },
  explore: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "MiniMax-M2.5",
        thinking: { type: "enabled", budgetTokens: 4096 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
      },
    ],
  },
  "multimodal-looker": {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "kimi-k2.5",
        variant: "medium",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  prometheus: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
        variant: "max",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-max-2026-01-23",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  metis: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
        variant: "high",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
      },
    ],
  },
  momus: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
        variant: "xhigh",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-max-2026-01-23",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  atlas: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
      },
    ],
  },
  "sisyphus-junior": {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "kimi-k2.5",
        variant: "medium",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
    ],
  },
};

export const CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  "visual-engineering": {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
        variant: "high",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "kimi-k2.5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  ultrabrain: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        variant: "xhigh",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  deep: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        variant: "medium",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "kimi-k2.5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  artistry: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "kimi-k2.5",
        variant: "high",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-max-2026-01-23",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  quick: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "MiniMax-M2.5",
        thinking: { type: "enabled", budgetTokens: 4096 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
        thinking: { type: "enabled", budgetTokens: 4096 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
    ],
  },
  "unspecified-low": {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "MiniMax-M2.5",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-4.7",
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-next",
      },
    ],
  },
  "unspecified-high": {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        variant: "max",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-coder-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
  writing: {
    fallbackChain: [
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3-max-2026-01-23",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "glm-5",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
      {
        providers: ["bailian-coding-plan"],
        model: "qwen3.5-plus",
        thinking: { type: "enabled", budgetTokens: 8192 },
      },
    ],
  },
};
