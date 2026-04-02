/**
 * Atlas - Research Task Orchestrator Agent
 *
 * Orchestrates research tasks via task() to complete ALL tasks in a research plan until fully done.
 * You are the conductor of a symphony of specialized research agents.
 *
 * Routing:
 * 1. GPT models (openai/*, github-copilot/gpt-*) → gpt.ts (GPT-5.4 optimized)
 * 2. Gemini models (google/*, google-vertex/*) → gemini.ts (Gemini-optimized)
 * 3. Default (Claude, etc.) → default.ts (Claude-optimized)
 */

import type { AgentConfig } from "@opencode-ai/sdk"
import type { AgentMode, AgentPromptMetadata } from "../types"
import { isGptModel, isGeminiModel } from "../types"
import type { AvailableAgent, AvailableSkill, AvailableCategory } from "../dynamic-agent-prompt-builder"
import { buildCategorySkillsDelegationGuide } from "../dynamic-agent-prompt-builder"
import type { CategoryConfig } from "../../config/schema"
import { mergeCategories } from "../../shared/merge-categories"

import { getDefaultAtlasPrompt } from "./default"
import { getGptAtlasPrompt } from "./gpt"
import { getGeminiAtlasPrompt } from "./gemini"
import {
  getCategoryDescription,
  buildAgentSelectionSection,
  buildCategorySection,
  buildSkillsSection,
  buildDecisionMatrix,
} from "./prompt-section-builder"

const MODE: AgentMode = "primary"

export type AtlasPromptSource = "default" | "gpt" | "gemini"

/**
 * Determines which Atlas prompt to use based on model.
 */
export function getAtlasPromptSource(model?: string): AtlasPromptSource {
  if (model && isGptModel(model)) {
    return "gpt"
  }
  if (model && isGeminiModel(model)) {
    return "gemini"
  }
  return "default"
}

export interface OrchestratorContext {
  model?: string
  availableAgents?: AvailableAgent[]
  availableSkills?: AvailableSkill[]
  userCategories?: Record<string, CategoryConfig>
}

/**
 * Gets the appropriate Atlas prompt based on model.
 */
export function getAtlasPrompt(model?: string): string {
  const source = getAtlasPromptSource(model)

  switch (source) {
    case "gpt":
      return getGptAtlasPrompt()
    case "gemini":
      return getGeminiAtlasPrompt()
    case "default":
    default:
      return getDefaultAtlasPrompt()
  }
}

function buildDynamicOrchestratorPrompt(ctx?: OrchestratorContext): string {
  const agents = ctx?.availableAgents ?? []
  const skills = ctx?.availableSkills ?? []
  const userCategories = ctx?.userCategories
  const model = ctx?.model

  const allCategories = mergeCategories(userCategories)
  const availableCategories: AvailableCategory[] = Object.entries(allCategories).map(([name]) => ({
    name,
    description: getCategoryDescription(name, userCategories),
  }))

  const categorySection = buildCategorySection(userCategories)
  const agentSection = buildAgentSelectionSection(agents)
  const decisionMatrix = buildDecisionMatrix(agents, userCategories)
  const skillsSection = buildSkillsSection(skills)
  const categorySkillsGuide = buildCategorySkillsDelegationGuide(availableCategories, skills)

  const basePrompt = getAtlasPrompt(model)

  return basePrompt
    .replace("{CATEGORY_SECTION}", categorySection)
    .replace("{AGENT_SECTION}", agentSection)
    .replace("{DECISION_MATRIX}", decisionMatrix)
    .replace("{SKILLS_SECTION}", skillsSection)
    .replace("{{CATEGORY_SKILLS_DELEGATION_GUIDE}}", categorySkillsGuide)
}

export function createAtlasAgent(ctx: OrchestratorContext): AgentConfig {
  const baseConfig = {
    description:
      "Orchestrates research tasks via task() to complete ALL tasks in a research plan until fully done. (Task Orchestrator - OhMyOpenBusiness)",
    mode: MODE,
    ...(ctx.model ? { model: ctx.model } : {}),
    temperature: 0.1,
    prompt: buildDynamicOrchestratorPrompt(ctx),
    color: "#10B981",
  }

  return baseConfig as AgentConfig
}
createAtlasAgent.mode = MODE

export const atlasPromptMetadata: AgentPromptMetadata = {
  category: "advisor",
  cost: "EXPENSIVE",
  promptAlias: "Atlas",
  triggers: [
    {
      domain: "Research task orchestration",
      trigger: "Complete ALL research tasks in a plan with verification",
    },
    {
      domain: "Multi-agent research coordination",
      trigger: "Parallel research task execution across specialized agents",
    },
  ],
  useWhen: [
    "User provides a research plan with multiple tasks",
    "Multiple research tasks need to be completed in sequence or parallel",
    "Research requires coordination across multiple specialized agents",
  ],
  avoidWhen: [
    "Single simple research task that doesn't require orchestration",
    "Tasks that can be handled directly by one agent",
    "When user wants to execute research tasks manually",
  ],
  keyTrigger:
    "Research task list provided OR multiple research tasks requiring multi-agent orchestration",
}
