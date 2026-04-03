# Manifesto

The principles and philosophy behind Oh My OpenBusiness.

---

## Human Intervention is a Failure Signal

**HUMAN IN THE LOOP = BOTTLENECK**

Think about autonomous driving. When a human has to take over the wheel, that's not a feature. It's a failure of the system. The car couldn't handle the situation on its own.

**Why is UX research any different?**

When you find yourself:
- Correcting the AI's shallow findings
- Manually searching for sources the agent missed
- Guiding the agent step-by-step through research
- Repeatedly clarifying the same research requirements

That's not "human-AI collaboration." That's the AI failing to do its job.

**Oh My OpenBusiness is built on this premise**: Human intervention during agentic research is fundamentally a wrong signal. If the system is designed correctly, the agent should complete the research without requiring you to babysit it.

---

## Indistinguishable Research

**Goal: Research produced by the agent should be indistinguishable from research conducted by a senior UX researcher.**

Not "AI-generated findings that need cleanup." Not "a good starting point." The actual, final, publication-ready research deliverable.

This means:
- Following established research methodologies exactly
- Proper evidence triangulation without being asked
- Findings that actually answer the research questions
- No AI slop (over-generalization, unsupported claims, scope creep)
- Citations and source attribution only when they add value

If you can tell whether a report was produced by a human or an agent, the agent has failed.

---

## Token Cost vs Productivity

**Higher token usage is acceptable if it significantly increases research quality.**

Using more tokens to:
- Have multiple specialized agents research in parallel across different source types
- Get the job done completely without human intervention
- Verify findings thoroughly through triangulation
- Accumulate research wisdom across sessions

That's a worthwhile investment when it means 10x, 20x, or 100x productivity gains.

**However:**

Unnecessary token waste is not pursued. The system optimizes for:
- Using cheaper models for simple lookup tasks
- Avoiding redundant exploration across sources
- Caching learnings across research sessions
- Stopping research when sufficient evidence is gathered

Token efficiency matters. But not at the cost of research quality or human cognitive load.

---

## Minimize Human Cognitive Load

**The human should only need to say what they want to know. Everything else is the agent's job.**

Two approaches achieve this:

### Approach 1: Prometheus (Interview Mode)

You say: "I want to understand why users abandon checkout."

Prometheus:
- Researches existing data to understand what's already known
- Asks clarifying questions based on actual findings
- Surfaces edge cases you hadn't considered
- Documents research decisions as you make them
- Generates a complete research plan

**You provide intent. The agent provides structure.**

### Approach 2: Ultrawork (Just Do It Mode)

You say: "ulw research checkout abandonment"

The agent:
- Figures out the right research approach
- Researches best practices and methodologies
- Executes following research conventions
- Verifies all findings through triangulation
- Keeps going until every question is answered

**You provide intent. The agent handles everything.**

In both cases, the human's job is to **express what they want to know**, not to manage how the research gets done.

---

## Predictable, Continuous, Delegatable

**The ideal research agent should work like a research lab**: research question goes in, validated findings come out.

### Predictable

Given the same inputs:
- Same research topic
- Same source types
- Same evidence standards

The output should be consistent. Not random, not surprising, not "creative" in ways you didn't ask for.

### Continuous

Research should survive interruptions:
- Session crashes? Resume with `/start-research`
- Need to step away? Progress is tracked
- Multi-week research project? Context is preserved

The agent maintains state. You don't have to.

### Delegatable

Just like you can assign a research task to a capable team member and trust them to handle it, you should be able to delegate to the agent.

This means:
- Clear research questions, answered independently
- Self-correcting behavior when a source yields nothing
- Escalation (to Oracle, to user) only when truly needed
- Complete research, not "mostly done"

---

## The Core Loop

```
Human Intent → Agent Execution → Verified Result
       ↑                              ↓
       └──────── Minimum ─────────────┘
          (intervention only on true failure)
```

Everything in Oh My OpenBusiness is designed to make this loop work:

| Feature | Purpose |
|---------|---------|
| Prometheus | Extract research intent through intelligent interview |
| Metis | Catch ambiguities before they derail research |
| Momus | Verify research plans are complete before execution |
| Orchestrator | Coordinate research without human micromanagement |
| Todo Continuation | Force completion, prevent "I'm done" lies |
| Category System | Route to optimal model without human decision |
| Background Agents | Parallel research across sources without blocking user |
| Wisdom Accumulation | Learn from research, don't repeat mistakes |

---

## What This Means in Practice

**You should be able to:**

1. Describe what you want to know (high-level or detailed, your choice)
2. Let the agent interview you if needed
3. Confirm the research plan (or just let ultrawork handle it)
4. Walk away
5. Come back to completed, verified, publication-ready research

**If you can't do this, something in the system needs to improve.**

---

## The Future We're Building

A world where:
- Human researchers focus on **what** to learn, not **how** to get AI to research it
- Research quality is independent of who (or what) conducted it
- Complex research projects are as easy as simple ones (just take longer)
- "Prompt engineering" becomes as obsolete as "compiler debugging"

**The agent should be invisible.** Not in the sense that it's hidden, but in the sense that it just works. Like electricity, like running water, like the internet.

You flip the switch. The light turns on. You don't think about the power grid.

That's the goal.

---

## Further Reading

- [Overview](./guide/overview.md)
- [Orchestration Guide](./guide/orchestration.md)
