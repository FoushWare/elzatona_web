# 11 — AuthZ / Guards

## Goal

Ensure only authorized admin users can access content management actions.

## Restore tasks

- [ ] Restore any existing guard logic from source branch.
- [ ] Confirm behavior when unauthenticated:
  - Redirect to login, or
  - Render nothing + provider redirects.

## Refactor tasks

- [ ] Centralize authorization checks:
  - Prefer a single guard at layout/route boundary.
  - Avoid scattered checks inside sections.
- [ ] Standardize "not authorized" UX.

## TDD tasks

- [ ] Unit test guard decision function (if extracted).
- [ ] Integration test: unauthenticated user does not see content.

## Test suite tasks

- [ ] Add mock auth provider wrapper for tests.

## Missing parts checklist

- [ ] Role-based access needed (super admin vs editor)?
- [ ] Audit logging needed for admin actions?
