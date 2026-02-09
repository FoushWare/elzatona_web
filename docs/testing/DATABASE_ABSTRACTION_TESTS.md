# Database Abstraction Layer: Integration & E2E Test Coverage

## Integration Tests

- All repository methods (CRUD, query, progress, preferences) are covered by integration tests in libs/database/src/repositories/**tests**/
- All adapter methods are covered by unit and basic integration tests in libs/database/src/adapters/postgresql/**tests**/

## E2E Tests

- Category CRUD E2E test implemented in apps/admin/tests/e2e/category-crud.e2e.ts
- Additional E2E tests for topic, section, flashcard, and user progress flows are planned for this directory

## CI Integration

- .github/workflows/e2e-tests.yml runs Playwright E2E tests for admin and CRUD flows
- Test database secrets and environment are validated for safety
- Artifacts (reports, videos) are uploaded for review

## Known Issues

- Some advanced DB-specific flows may require additional manual verification
- Vitest coverage reporting is not fully integrated for all database abstraction code (see REFACTORING_MANIFEST.md)

## Next Steps

- Expand E2E coverage for all DB entities
- Monitor CI for failures and coverage gaps
- Update documentation as new tests are added

## Test Setup & Troubleshooting

### Test Setup

- Integration tests for repositories: libs/database/src/repositories/**tests**/
- Integration tests for adapters: libs/database/src/adapters/postgresql/**tests**/
- E2E tests for CRUD flows: apps/admin/tests/e2e/
- Run all tests with: `npx vitest run` and `npx playwright test`
- Ensure test database secrets are set for E2E (see .github/workflows/e2e-tests.yml)

### Troubleshooting

- If Vitest coverage (lcov.info) is missing, check vitest.config.ts for correct include/exclude patterns and coverage provider
- For Playwright E2E failures, verify test database is not production and all required secrets are present
- If DB switching or error handling tests fail, check adapter config and mock implementations
- For manual verification, use database admin UI to confirm CRUD operations

### Known Issues

- Some DB abstraction files may not be included in coverage due to toolchain limitations
- E2E tests for all flows are in progress; see category-crud.e2e.ts for example

### References

- See docs/database/questions-schema.md for schema details
- See refactoring-plans/REFACTORING_MANIFEST.md for known issues and quality gates
