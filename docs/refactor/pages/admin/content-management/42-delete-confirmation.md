# 42 — Delete Confirmation (Cards/Plans/Categories/Topics/Questions)

## UI intent

Provide consistent delete confirmation + safe feedback.

## Restore tasks

- [ ] Restore delete confirmation dialog.
- [ ] Restore isDeleting state.
- [ ] Restore success/error toasts.
- [ ] Restore list refresh after delete.

## Refactor tasks

- [ ] Standardize delete flows across entities.
- [ ] Extract reusable confirm dialog usage pattern.

## TDD tasks

- [ ] Unit test: delete handler calls service and updates state.

## Test suite tasks

- [ ] Integration: confirm delete triggers service call.

## Missing parts checklist

- [ ] Confirm referential integrity rules (cannot delete if referenced).
