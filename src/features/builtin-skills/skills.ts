import type { BuiltinSkill } from "./types"
import type { BrowserAutomationProvider } from "../../config/schema"

import {
  playwrightSkill,
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
  const { disabledSkills } = options

  const skills = [
    playwrightSkill,
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
