---
name: persona-builder
description: "Build data-driven user personas from research findings. Triggers: create personas, user archetypes, behavioral segments, audience profiles, user modeling."
license: "MIT"
metadata:
  source: "Built-in UX Research skill"
  version: "1.0.0"
---

# Persona Builder

Create data-driven user personas based on behavioral patterns discovered through research. Every persona trait must be backed by research evidence.

## When to Use This Skill

- After completing discovery research with behavioral data
- When the team needs to align on who they're designing for
- Before designing features to ensure they serve real user needs
- When stakeholders have conflicting assumptions about users

## Persona Principles (from the book)

1. **Based on Data**: Every trait must have a research quote or data point backing it up.
2. **Behavior > Demographics**: "Juan, impaciente y experto tecnológico" is gold. "Juan, 34 años" is irrelevant.
3. **Anti-Personas**: Define explicitly who you are NOT designing for.
4. **3-4 Maximum**: More than 4 personas is like having none.
5. **Not Marketing Segments**: Personas are behavioral, not demographic.

## Persona Creation Protocol

### Phase 1: Behavioral Clustering
1. **Review all research data** — quotes, observations, behavioral patterns
2. **Group by goals and frustrations** — Users with identical goals and pains go together
3. **Identify primary patterns** — Which behavioral cluster is largest/most important?
4. **Name the clusters** — Give each group a descriptive label

### Phase 2: Persona Construction
For each persona, define:

**Name and Photo**: Realistic name, realistic photo (NOT stock model photos).

**Behavioral Summary** (most important section):
- How they approach the problem your product solves
- Their typical workflow or decision process
- What they value and what frustrates them

**Goals** (what they want to achieve):
- Primary goal (the main reason they'd use your product)
- Secondary goals (related needs)

**Frustrations** (what stops them):
- Current pain points with existing solutions
- Specific barriers to achieving their goals

**Context** (the environment they operate in):
- When and where they interact with your product
- What else is happening in their life/work
- Tools and workarounds they currently use

**Research Evidence** (CRITICAL — every persona needs this):
- Direct quotes that support each trait
- Behavioral observations from research
- Data points that validate the pattern

### Phase 3: Validation
1. **Check against data** — Does every trait have evidence?
2. **Check for overlap** — Are personas distinct enough?
3. **Check with stakeholders** — "Do you recognize this user?"
4. **Define anti-personas** — Who are we explicitly NOT designing for?

## Output Format

```
# [Persona Name]

> "[Representative quote that captures this persona's attitude]"

## Behavioral Summary
[2-3 sentences describing how this person approaches the problem space]

## Goals
- **Primary**: [Main goal they want to achieve]
- **Secondary**: [Related goals]

## Frustrations
- [Specific frustration with current solutions]
- [What blocks them from achieving their goals]

## Context
- **When**: [When they encounter the problem]
- **Where**: [Physical/digital environment]
- **Tools**: [What they currently use]
- **Workarounds**: [Creative solutions they've invented]

## Research Evidence
| Trait | Evidence | Source |
|-------|----------|--------|
| [Behavioral trait] | "[Direct quote or observation]" | [Research source] |

## Design Implications
- [What this persona means for design decisions]
- [Features that would serve this persona well]
- [Things that would frustrate this persona]
```

## Anti-Persona Format

```
# Anti-Persona: [Name]

**Who they are**: [Description of user we're NOT designing for]
**Why not them**: [Business/design rationale]
**What they'd want instead**: [What would serve them — so we know we're building the wrong thing]
```

## Anti-Patterns to Avoid

- **Fictional personas**: Created in a room without data = fiction, not UX
- **Demographic focus**: Age, income, location are less useful than behaviors
- **Too many personas**: 12 personas = no personas. Stick to 3-4.
- **Stock photos**: Model photos reduce credibility
- **Dead documents**: Personas that live in a PDF and never get seen
- **Marketing segments**: "Women 25-34" is not a persona
