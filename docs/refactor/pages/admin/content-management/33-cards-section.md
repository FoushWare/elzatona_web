# 33 — Cards Section

## UI intent

Manage learning cards:

- List cards (ordered)
- Expand to see details/children
- Create/edit/delete

## Restore tasks

- [ ] Restore cards list rendering.
- [ ] Restore expand/collapse interactions.
- [ ] Restore create/edit/delete actions.

## Refactor tasks

- [ ] Split components:
  - `CardsSection`
  - `CardsList`
  - `CardItem`
  - `CardActions`
- [ ] Remove data fetching from leaf components.

## TDD tasks

- [ ] Unit test: expand/collapse state handler.

## Test suite tasks

- [ ] Integration test: delete card -> success toast -> list refresh.

## Missing parts checklist

- [ ] Confirm constraints: can delete if used in plans?
- [ ] Confirm ordering rules (order_index).
