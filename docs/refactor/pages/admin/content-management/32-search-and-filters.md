# 32 — Search & Filters

## UI intent

- Search across multiple entities.
- Optional filter by card type or other facets.

## Restore tasks

- [ ] Restore search input, debouncing, and filters.
- [ ] Restore filtering logic for cards/plans/etc.

## Refactor tasks

- [ ] Extract hook: `useContentManagementFilters()`.
- [ ] Extract pure selectors:
  - `filterCards(cards, filters)`
  - `filterPlans(plans, filters)`

## TDD tasks

- [ ] Unit test selectors.
- [ ] Unit test debounce behavior (fake timers) if implemented.

## Test suite tasks

- [ ] Integration test: typing in search reduces visible items.

## Missing parts checklist

- [ ] Confirm search scope (titles only? descriptions? questions text?).
