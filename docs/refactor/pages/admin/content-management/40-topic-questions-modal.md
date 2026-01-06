# 40 — Topic Questions Modal

## UI intent

From a selected plan+topic, allow selecting questions and adding them to the plan.

## Restore tasks

- [ ] Restore modal open/close.
- [ ] Restore per-question selection.
- [ ] Restore select-all / deselect-all.
- [ ] Restore submit action (insert plan_questions rows) + UI update.

## Refactor tasks

- [ ] Extract state + handlers to `useTopicQuestionsModal()`.
- [ ] Extract submit into service method.

## TDD tasks

- [ ] Unit test selection logic.
- [ ] Unit test submit request payload builder.

## Test suite tasks

- [ ] Integration test: select questions -> submit -> modal closes -> UI reflects assignments.

## Missing parts checklist

- [ ] Confirm whether assigning duplicates should be prevented.
- [ ] Confirm whether remove/unassign happens from same modal or elsewhere.
