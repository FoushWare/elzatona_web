# 30 — Page Shell & State Management

## Responsibilities

- Page-level loading/error state
- Global search/filter state
- Expansion state for trees/accordions
- Modal state + selected entities

## Restore tasks

- [ ] Restore the page shell markup and primary layout.
- [ ] Restore all state required for existing UX.

## Refactor tasks

- [ ] Split mega-state into section-local hooks:
  - `useFilters`
  - `useExpansionState`
  - `useModals`
- [ ] Keep derived values memoized and isolated.

## TDD tasks

- [ ] Unit test reducers/helpers for state transitions (if introduced).

## Test suite tasks

- [ ] Integration test:
  - loading -> loaded
  - error -> error UI

## Missing parts checklist

- [ ] Ensure no `console.log`-only error handling.
- [ ] Ensure all nullable entities are guarded (no runtime crashes).
