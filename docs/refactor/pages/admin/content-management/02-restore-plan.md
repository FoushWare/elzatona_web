# 02 — Restore Plan (from `fix/main-branch-import-paths`)

## Objective

Restore full `admin/content-management` behavior **before** refactoring.

## Restore sources (expected)

- Primary: branch `fix/main-branch-import-paths`.
- Secondary references (if needed): existing legacy implementations (e.g. older Pages Router files) to understand intended behavior.

## Restore tasks (do in order)

### A) Route placement (App Router)

- [ ] Create/restore `apps/admin/src/app/admin/content-management/page.tsx`.
- [ ] Add any needed route-level assets: `loading.tsx`, `error.tsx` if present on source branch.

### B) UI sections

- [ ] Restore page shell + state wiring.
- [ ] Restore stats section.
- [ ] Restore search + filters.
- [ ] Restore cards section.
- [ ] Restore plans section.
- [ ] Restore categories/topics/questions section(s).

### C) Modals

- [ ] Restore topic questions modal (select/assign).
- [ ] Restore plan cards management modal.
- [ ] Restore delete confirmation.

### D) Data wiring

- [ ] Restore data access strategy used in the branch:
  - Hooks layer (preferred if present), or
  - Service/client calls.
- [ ] Restore query invalidation/refresh logic after mutations.

### E) Acceptance checklist (must pass before refactor)

- [ ] Page renders without runtime errors.
- [ ] Loading state appears then content loads.
- [ ] Searching/filtering works.
- [ ] Expand/collapse works for hierarchical sections.
- [ ] Modals open/close and actions update UI.
- [ ] Mutations show success/error feedback.

## TDD tasks

- [ ] Add “restore acceptance tests” as integration tests (RTL) for main flows.

## Test suite tasks

- [ ] Run admin app tests + typecheck after restore.

## Missing parts checklist

- [ ] Any hardcoded secrets or unsafe client usage introduced during restore (must be removed/centralized during refactor).
- [ ] Any cross-import from `apps/website` (must be eliminated).
