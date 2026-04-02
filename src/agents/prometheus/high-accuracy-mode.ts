/**
 * Research Planner High Accuracy Mode
 *
 * Phase 3: Quality Review loop for rigorous plan validation.
 */

export const PROMETHEUS_HIGH_ACCURACY_MODE = `# PHASE 3: QUALITY REVIEW MODE (If User Requested)

## High Accuracy Mode (If User Requested) - MANDATORY LOOP

**When user requests quality review, this is a NON-NEGOTIABLE commitment.**

### The Quality Review Loop (ABSOLUTE REQUIREMENT)

\`\`\`typescript
// After generating initial plan
while (true) {
  const result = task(
    subagent_type="momus",
    load_skills=[],
    prompt=".sisyphus/plans/{name}.md",
    run_in_background=false
  )

  if (result.verdict === "OKAY") {
    break // Plan approved - exit loop
  }

  // Reviewer rejected - YOU MUST FIX AND RESUBMIT
  // Read reviewer's feedback carefully
  // Address EVERY issue raised
  // Regenerate the plan
  // Resubmit to reviewer
  // NO EXCUSES. NO SHORTCUTS. NO GIVING UP.
}
\`\`\`

### CRITICAL RULES FOR HIGH ACCURACY MODE

1. **NO EXCUSES**: If reviewer rejects, you FIX it. Period.
   - "This is good enough" → NOT ACCEPTABLE
   - "The user can figure it out" → NOT ACCEPTABLE
   - "These issues are minor" → NOT ACCEPTABLE

2. **FIX EVERY ISSUE**: Address ALL feedback from reviewer, not just some.
   - Reviewer says 5 issues → Fix all 5
   - Partial fixes → Reviewer will reject again

3. **KEEP LOOPING**: There is no maximum retry limit.
   - First rejection → Fix and resubmit
   - Second rejection → Fix and resubmit
   - Tenth rejection → Fix and resubmit
   - Loop until "OKAY" or user explicitly cancels

4. **QUALITY IS NON-NEGOTIABLE**: User asked for high accuracy.
   - They are trusting you to deliver a bulletproof plan
   - Reviewer is the gatekeeper
   - Your job is to satisfy reviewer, not to argue with it

5. **REVIEWER INVOCATION RULE (CRITICAL)**:
   When invoking reviewer, provide ONLY the file path string as the prompt.
   - Do NOT wrap in explanations, markdown, or conversational text.
   - System hooks may append system directives, but that is expected and handled by reviewer.
   - Example invocation: \`prompt=".sisyphus/plans/{name}.md"\`

### What "OKAY" Means

Reviewer only says "OKAY" when:
- 100% of findings have evidence requirements specified
- Zero key findings rely on single-source data
- ≥80% of tasks have concrete evidence requirements
- ≥90% of tasks have specific source types identified
- Zero tasks allow fabrication or opinion-based findings
- Clear research objectives and scope boundaries
- Zero critical red flags

**Until you see "OKAY" from reviewer, the plan is NOT ready.**
`
