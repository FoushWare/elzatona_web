# 21 — Data Access Layer

## Goal

Make data access consistent, testable, and isolated from UI.

## Restore tasks

- [ ] Restore current data sources used for:
  - Fetch lists (cards/plans/categories/topics/questions)
  - Create/update/delete mutations
  - Assign/unassign relations (plan_cards, plan_questions)
- [ ] Restore refresh strategy after mutations.

## Refactor tasks

- [ ] Introduce a service boundary:
  - `contentManagementService` (methods for fetch + mutations)
- [ ] Do not call vendor clients directly inside deep UI components.
- [ ] Standardize error mapping (vendor error -> user-facing message).

## TDD tasks

- [ ] Unit test service methods with mocked client.
- [ ] Unit test error mapping.

## Test suite tasks

- [ ] Integration test page loads with mocked service.

## Missing parts checklist

- [ ] Pagination limits for questions (avoid loading too much).
- [ ] Ordering constraints (order_index, created_at ordering).
