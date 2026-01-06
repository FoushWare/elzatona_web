# 60 — Admin vs Website Separation (No Nesting / No Cross-Imports)

## Rule

- `apps/admin` and `apps/website` must not import from each other.

## Restore tasks

- [ ] During restore, track any imports that reference `apps/website/*`.
- [ ] Replace them with:
  - `libs/*` shared modules, or
  - Admin-local implementations.

## Refactor tasks

- [ ] Identify shared abstractions needed by both apps (if any) and move to `libs/*`.
- [ ] Update path aliases/import paths to reference libs.
- [ ] Add guardrails:
  - lint rule or boundary enforcement (Nx tags) to prevent cross-imports.

## TDD tasks

- [ ] Add a boundary test (lint/CI check) that fails on cross-app imports.

## Test suite tasks

- [ ] Ensure admin build/test pipeline runs independently from website.

## Missing parts checklist

- [ ] Website currently has `/admin/*` routes; plan migration:
  - remove
  - redirect
  - 404
