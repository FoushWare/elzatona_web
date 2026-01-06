# 01 — Current State Audit (Baseline)

## Facts (observed)

- Admin app uses App Router at `apps/admin/src/app/*`.
- No `apps/admin/src/app/admin/content-management` route exists yet.
- A stub route exists in website app: `apps/website/src/app/admin/content-management/page.tsx`.
- Website also has `apps/website/src/app/admin/layout.tsx` and tests for content-management.

## Restore tasks (baseline capture)

- [ ] Identify where `admin/content-management` _should_ live: `apps/admin/src/app/admin/content-management/`.
- [ ] List current routes under `apps/admin/src/app/admin` and confirm whether `/admin/*` is currently served by admin app only.
- [ ] Confirm whether website app still intentionally contains `/admin/*` routes (expected: **no**, per separation rule).

## Missing parts checklist (what disappeared)

- [ ] Page sections (stats/search/cards/plans/categories/topics/questions).
- [ ] Modals/dialogs (topic questions, card management, delete confirmation).
- [ ] Data fetching / caching strategy.
- [ ] Mutations (create/update/delete; assign questions to plans; manage plan cards).
- [ ] Permissions/guards.
- [ ] Error/loading/empty states.
- [ ] Notifications/toasts.

## Refactor tasks (design constraints)

- [ ] Enforce: `apps/admin` must not import from `apps/website`.
- [ ] Decide what is shared vs admin-only:
  - Shared candidates -> `libs/*`
  - Admin-only -> `apps/admin/*`

## TDD tasks

- [ ] Write/maintain a minimal “does not crash” render test for the route in **admin app**.
- [ ] Create fixture builders for cards/plans/categories/topics/questions.

## Test suite tasks

- [ ] Identify current failing tests referring to website admin route.
- [ ] Decide migration path:
  - Move tests to admin app, or
  - Create shared test utilities for both apps (only if needed).
