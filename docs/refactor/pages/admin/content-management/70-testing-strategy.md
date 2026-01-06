# 70 — Testing Strategy (TDD + Suites)

## Scope

Testing for `admin/content-management` in **apps/admin**.

## Test layers

### Unit tests

- Pure functions (selectors/mappers)
- Small hooks (selection/filters)

### Integration tests (React Testing Library)

- Page renders + loads data
- Modals open/close + submit flows
- Mutations call service and update UI

### Optional E2E

- Only if project already uses Playwright/Cypress.

## Restore-phase tests (minimum)

- [ ] Render test: page mounts.
- [ ] Error state test: service rejects -> error UI.

## Refactor-phase tests (expand coverage)

- [ ] Filtering tests
- [ ] Selection tests
- [ ] Mutation flows tests

## Missing parts checklist

- [ ] Confirm where admin tests live and how Jest is configured for admin app.
- [ ] Confirm any existing test IDs to keep stable.
