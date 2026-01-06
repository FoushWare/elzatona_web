# 10 — Routing & Layout (App Router)

## Target route

- `/admin/content-management`
- File: `apps/admin/src/app/admin/content-management/page.tsx`

## Restore tasks

- [ ] Restore `page.tsx` into admin app.
- [ ] Restore route-level `loading.tsx` if it existed.
- [ ] Ensure it renders under `apps/admin/src/app/layout.tsx`.

## Refactor tasks

- [ ] Decide Server vs Client split:
  - Keep the page a Server Component if possible.
  - Move interactive UI into a client component (`"use client"`) sub-tree.
- [ ] Ensure route file boundaries match manifesto (no mega-file page).

## TDD tasks

- [ ] Add a render test verifying:
  - Admin layout wrapper exists (navbar present if relevant).
  - Page title/primary heading exists.

## Test suite tasks

- [ ] Admin app: route render test suite.
- [ ] Add smoke snapshot only if stable (optional).

## Missing parts checklist

- [ ] Any redirects expected?
- [ ] Query-string usage (nuqs) expected?
- [ ] Error boundary behavior expected?
