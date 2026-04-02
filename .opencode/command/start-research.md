# start-research

Start autonomous UX research execution from a research plan.

## Usage

/start-research [plan-name]

## What it does

1. Loads the research plan from `.sisyphus/plans/{plan-name}.md`
2. Registers research tasks as TODOs
3. Executes research waves in parallel
4. Synthesizes findings into insights
5. Generates deliverables (report, personas, journey maps)

## Example

/start-research checkout-abandonment

This will execute the research plan saved at `.sisyphus/plans/checkout-abandonment.md`.
