---
name: ux-heuristics
description: "Nielsen's 10 usability heuristics and UX evaluation frameworks. Triggers: usability audit, heuristic evaluation, accessibility check, UX review, interface assessment."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "2.0.0"
mcp:
  - accessibility-scanner
  - playwright
---

# UX Heuristics

Nielsen's 10 Usability Heuristics and evaluation frameworks for systematic UX assessment.

## When to Use This Skill

- Conducting a heuristic evaluation of an interface
- Performing a UX audit against established standards
- Checking accessibility compliance (WCAG)
- Evaluating competitor interfaces
- Identifying usability issues before user testing

## Nielsen's 10 Usability Heuristics

### 1. Visibility of System Status
**Principle**: The system should always keep users informed about what is going on.
**Check**: Loading indicators, progress bars, confirmation messages, error states.
**Violation**: User clicks a button and nothing appears to happen.

### 2. Match Between System and Real World
**Principle**: The system should speak the user's language, not system-oriented terms.
**Check**: Labels, terminology, icons that match user mental models.
**Violation**: Using "404 Error" instead of "Page not found."

### 3. User Control and Freedom
**Principle**: Users need a clearly marked "emergency exit" to leave unwanted states.
**Check**: Undo, redo, cancel, back buttons, close dialogs easily.
**Violation**: No way to cancel a long-running operation.

### 4. Consistency and Standards
**Principle**: Users should not have to wonder whether different words, situations, or actions mean the same thing.
**Check**: Consistent terminology, placement, behavior across the interface.
**Violation**: "Save" in one place, "Submit" in another for the same action.

### 5. Error Prevention
**Principle**: Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.
**Check**: Confirmations for destructive actions, input validation, constraints.
**Violation**: Allowing users to submit a form with invalid data.

### 6. Recognition Rather Than Recall
**Principle**: Minimize the user's memory load by making objects, actions, and options visible.
**Check**: Visible menus, recent actions, form field labels, instructions.
**Violation**: Multi-step form where users must remember info from step 1.

### 7. Flexibility and Efficiency of Use
**Principle**: Accelerators — unseen by the novice user — may speed up the interaction for the expert user.
**Check**: Keyboard shortcuts, customization, power user features.
**Violation**: No way to repeat a common action without going through the full flow.

### 8. Aesthetic and Minimalist Design
**Principle**: Interfaces should not contain information which is irrelevant or rarely needed.
**Check**: Visual hierarchy, whitespace, removal of unnecessary elements.
**Violation**: Cluttered pages with competing visual elements.

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**Principle**: Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.
**Check**: Clear error messages, actionable solutions, no technical jargon.
**Violation**: "Error 0x80040E14" with no explanation.

### 10. Help and Documentation
**Principle**: It's best if the system doesn't need any additional explanation, but it may be necessary to provide documentation.
**Check**: Searchable help, task-focused documentation, examples.
**Violation**: Help documentation that describes the interface rather than how to accomplish tasks.

## Severity Rating Scale

| Severity | Description | Action |
|----------|-------------|--------|
| **Critical (4)** | Blocks task completion, affects all users | Fix immediately |
| **Major (3)** | Significant friction, affects most users | Fix in next sprint |
| **Minor (2)** | Annoyance, affects some users | Add to backlog |
| **Cosmetic (1)** | No usability impact, visual polish | Nice to have |

## Evaluation Protocol

For each heuristic:
1. **Inspect the interface** against the heuristic criteria
2. **Identify violations** with specific examples (screenshots, descriptions)
3. **Rate severity** using the scale above
4. **Recommend fixes** that are specific and actionable
5. **Note what works well** — not everything is a problem

## Output Format

For each finding:
```
## [H#] Heuristic Name — Severity

**Issue**: [What's wrong, specifically]
**Location**: [Where in the interface]
**Evidence**: [Screenshot description or specific example]
**Impact**: [How this affects users]
**Recommendation**: [Specific, actionable fix]
```
