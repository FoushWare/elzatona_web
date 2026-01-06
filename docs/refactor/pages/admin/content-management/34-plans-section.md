# 34 — Plans Section

## UI intent

Manage learning plans:

- List plans
- Expand to show plan structure
- Manage plan cards and plan questions

## Restore tasks

- [ ] Restore plans list.
- [ ] Restore expansion + structure rendering.
- [ ] Restore plan cards management entry point (modal).

## Refactor tasks

- [ ] Split components:
  - `PlansSection`
  - `PlansList`
  - `PlanStructureTree`
- [ ] Extract selectors:
  - plan -> cards/categories/topics

## TDD tasks

- [ ] Unit test selectors/mappers.

## Test suite tasks

- [ ] Integration test: open plan cards modal from plan.

## Missing parts checklist

- [ ] Confirm plan->question relation rules.
- [ ] Confirm inactive cards handling in plan.
