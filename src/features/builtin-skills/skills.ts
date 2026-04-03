import type { BuiltinSkill } from "./types"
import type { BrowserAutomationProvider } from "../../config/schema"

import {
  playwrightSkill,
  agentBrowserSkill,
  playwrightCliSkill,
  webScraperSkill,
  socialListenerSkill,
  sentimentAnalyzerSkill,
  personaBuilderSkill,
  journeyMapperSkill,
  uxHeuristicsSkill,
  researchMethodologySkill,
  competitorAnalystSkill,
  dataTriangulatorSkill,
  researchArchitectSkill,
} from "./skills/index"

export interface CreateBuiltinSkillsOptions {
  browserProvider?: BrowserAutomationProvider
  disabledSkills?: Set<string>
}

export function createBuiltinSkills(options: CreateBuiltinSkillsOptions = {}): BuiltinSkill[] {
  const { browserProvider = "playwright", disabledSkills } = options

  let browserSkill: BuiltinSkill
  if (browserProvider === "agent-browser") {
    browserSkill = agentBrowserSkill
  } else if (browserProvider === "playwright-cli") {
    browserSkill = playwrightCliSkill
  } else {
    browserSkill = playwrightSkill
  }

  const skills = [
    browserSkill,
    webScraperSkill,
    socialListenerSkill,
    sentimentAnalyzerSkill,
    personaBuilderSkill,
    journeyMapperSkill,
    uxHeuristicsSkill,
    researchMethodologySkill,
    competitorAnalystSkill,
    dataTriangulatorSkill,
    researchArchitectSkill,
  ]

  if (!disabledSkills) {
    return skills
  }

  return skills.filter((skill) => !disabledSkills.has(skill.name))
}
