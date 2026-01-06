# Admin: Content Management — Refactor Workspace

## Scope

This folder contains the restore + refactor reference for the `admin/content-management` route (App Router).

## Goals

- Restore the full page behavior from branch `fix/main-branch-import-paths`.
- Refactor section-by-section following the project refactor manifesto (behavior-preserving).
- Enforce separation: `apps/admin` and `apps/website` must not import from each other.

## Target location (after restore)

- Route: `apps/admin/src/app/admin/content-management/page.tsx`

## Work order (do not refactor before restore)

1. `01-current-state-audit.md`
2. `02-restore-plan.md`
3. `10-routing-layout.md`
4. `20-domain-models.md`
5. `21-data-access-layer.md`
6. UI sections (`30-*` and `40-*` docs)
7. Separation guardrails (`60-*` docs)
8. Testing strategy + implementation (`70-*` docs)

## Document map

- `01-current-state-audit.md`
- `02-restore-plan.md`
- `10-routing-layout.md`
- `11-authz-and-guards.md`
- `20-domain-models.md`
- `21-data-access-layer.md`
- `30-page-shell-and-state.md`
- `31-stats-section.md`
- `32-search-and-filters.md`
- `33-cards-section.md`
- `34-plans-section.md`
- `40-topic-questions-modal.md`
- `41-card-management-modal.md`
- `42-delete-confirmation.md`
- `60-admin-website-separation.md`
- `70-testing-strategy.md`
- `71-unit-tests-checklist.md`
- `72-integration-tests-checklist.md`
- `73-test-fixtures-and-mocks.md`
