# 73 — Test Fixtures & Mocks

## Fixtures

- [ ] `makeCard()`
- [ ] `makePlan()`
- [ ] `makeCategory()`
- [ ] `makeTopic()`
- [ ] `makeQuestion()`

## Mock strategy (preferred)

- Mock the service layer used by the page.
- Avoid mocking UI library internals unless necessary.

## Test utilities

- [ ] `renderWithAdminProviders(ui)` wrapper:
  - theme provider
  - auth provider (mock)
  - query client (if used)

## Missing parts checklist

- [ ] Confirm whether tests should be co-located with route or in `apps/admin/tests/*`.
