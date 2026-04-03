export const JOURNEY_MAP_TEMPLATE = `# Journey Map: {{journey_name}}

## Overview
- **Persona**: {{persona}}
- **Scenario**: {{scenario}}
- **Research Sources**: {{source_count}} sources
- **Data Points**: {{data_points}} findings analyzed

## Journey Stages

| Stage | Actions | Thoughts | Emotions | Pain Points | Opportunities | Evidence |
|-------|---------|----------|----------|-------------|---------------|----------|
{{journey_rows}}

## Emotional Curve
- **Peak Positive**: {{peak_positive_stage}} — {{peak_positive_reason}}
- **Peak Negative**: {{peak_negative_stage}} — {{peak_negative_reason}}

## Critical Moments of Truth
{{moments_of_truth}}

## Drop-off Points
{{dropoff_points}}

## Opportunity Map
| Stage | Opportunity | Impact | Effort | Evidence |
|-------|------------|--------|--------|----------|
{{opportunity_rows}}

---

**Generated**: {{timestamp}}
**Research Topic**: {{research_topic}}
**Total Findings**: {{total_findings}}
`
