---
name: journey-mapper
description: "Create customer journey maps and experience maps from research data. Triggers: journey map, experience map, service blueprint, user flow mapping, touchpoint analysis."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "1.0.0"
---

# Journey Mapper

Create customer journey maps and experience maps from research data. Visualizes the user's end-to-end experience across time and channels.

## When to Use This Skill

- After collecting research data about user experiences
- When you need to identify pain points across the full journey
- For multi-channel experiences (web → phone → in-store)
- To align teams on the complete user experience
- Before redesigning a service or process

## Journey Map Principles (from the book)

1. **User Perspective**: Map what the user does/feels, not internal processes.
2. **Holistic**: Everything counts — even touchpoints you don't control (talking to a friend).
3. **Validated**: Every emotion and action must be backed by research data.
4. **Before and After**: The journey starts before they open your app and ends long after they close it.

## Journey Map Structure

### Axis X (Time): Journey Phases
Common phases:
1. **Awareness** — User realizes they have a need
2. **Consideration** — User explores options
3. **Acquisition** — User signs up/purchases
4. **Onboarding** — User learns to use the product
5. **Usage** — User interacts with the product regularly
6. **Support** — User encounters a problem and seeks help
7. **Loyalty/Advocacy** — User becomes a repeat customer or advocate

### Swimlanes (What to Track)

| Lane | What It Captures | Example |
|------|-----------------|---------|
| **Doing** | Observable actions | "Searches for alternatives on Google" |
| **Thinking** | Questions and doubts | "Is this secure enough for my data?" |
| **Feeling** | Emotional state (graph line) | 😊 → 😐 → 😤 → 😊 |
| **Touchpoints** | Where interaction happens | Website, app, email, phone, store |
| **Pain Points** | Friction and frustration | "Form has 15 fields, takes 10 minutes" |
| **Opportunities** | Ideas for improvement | "Could auto-fill from Google account" |

## Journey Map Creation Protocol

### Phase 1: Data Collection
1. **Map the phases** — What are the stages of the user's journey?
2. **Gather evidence per phase** — What does research show for each stage?
3. **Identify touchpoints** — Where does the user interact with the product/service?
4. **Capture emotions** — How does the user feel at each stage? (from quotes, observations)

### Phase 2: Map Construction
1. **Draw the emotional curve** — Plot satisfaction/frustration across phases
2. **Add actions** — What is the user doing at each phase?
3. **Add thoughts** — What questions/doubts do they have?
4. **Mark touchpoints** — Where does interaction happen?
5. **Highlight pain points** — Where are the valleys in the emotional curve?

### Phase 3: Opportunity Identification
1. **Find the valleys** — Where is the user most frustrated?
2. **Brainstorm solutions** — What could elevate each valley?
3. **Prioritize** — Which opportunities have the biggest impact?
4. **Connect to research** — Every opportunity must address a research-validated pain point

## Output Format

```
# Journey Map: [Persona Name] — [Experience]

## Overview
**Persona**: [Who is taking this journey]
**Scenario**: [What they're trying to accomplish]
**Research Basis**: [What data this map is based on]

## Journey Phases

| Phase | [Phase 1] | [Phase 2] | [Phase 3] | [Phase 4] |
|-------|-----------|-----------|-----------|-----------|
| **Doing** | [Actions] | [Actions] | [Actions] | [Actions] |
| **Thinking** | [Questions] | [Questions] | [Questions] | [Questions] |
| **Feeling** | 😊/😐/😤 | 😊/😐/😤 | 😊/😐/😤 | 😊/😐/😤 |
| **Touchpoints** | [Where] | [Where] | [Where] | [Where] |
| **Pain Points** | [Issues] | [Issues] | [Issues] | [Issues] |

## Emotional Curve
```
High 😊 |     *           *
        |    * *         * *
        |   *   *   *   *   *
        |  *     * * * *     *
Low  😤 | *       *           *
        +--------------------------
          Aware  Consider  Acquire  Use
```

## Pain Point Analysis
| Pain Point | Phase | Severity | Evidence |
|------------|-------|----------|----------|
| [Description] | [Phase] | Critical/Major/Minor | "[Quote or data]" |

## Opportunities
| Opportunity | Addresses | Impact | Effort | Priority |
|-------------|-----------|--------|--------|----------|
| [Idea] | [Pain point] | High/Med/Low | High/Med/Low | P0/P1/P2 |

## Research Evidence
| Finding | Source | Quote |
|---------|--------|-------|
| [What we know] | [Research method] | "[Direct quote]" |
```

## Anti-Patterns to Avoid

- **Process maps disguised as journeys**: Flowcharts that ignore emotion are not journey maps
- **Happy path only**: Must include the frustrating moments, not just the ideal flow
- **Made-up emotions**: Every emotional state needs research backing
- **Ignoring "before" and "after"**: The journey doesn't start when they open the app
- **Solo creation**: Journey maps made alone in a cave have no impact — involve the team
- **Too granular**: Don't map every micro-interaction — focus on meaningful phases
