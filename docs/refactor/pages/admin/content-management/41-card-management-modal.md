# 41 — Plan Card Management Modal

## UI intent

Manage which cards are included in a plan:

- Add/remove cards
- Toggle active status
- Maintain ordering

## Restore tasks

- [ ] Restore modal open/close.
- [ ] Restore fetching current plan cards.
- [ ] Restore available cards list.
- [ ] Restore add/remove/toggle actions.

## Refactor tasks

- [ ] Extract into dedicated components:
  - `PlanCardsEditor`
  - `AvailableCardsPicker`
- [ ] Move all mutations into service layer.

## TDD tasks

- [ ] Unit test ordering helper (next order index).
- [ ] Unit test toggle active payload.

## Test suite tasks

- [ ] Integration test: add card -> list updates.
- [ ] Integration test: toggle active -> UI reflects change.

## Missing parts checklist

- [ ] Confirm whether drag-and-drop ordering exists/required.
