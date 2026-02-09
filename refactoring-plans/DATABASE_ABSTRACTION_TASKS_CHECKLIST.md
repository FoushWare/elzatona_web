# Database Abstraction Layer: Task Checklist

## Integration & E2E Tasks

- [ ] T001 Add integration tests for all repository methods in libs/database/src/repositories/
- [ ] T002 [P] Add integration tests for all adapter methods in libs/database/src/adapters/
- [ ] T003 Add E2E tests for category, topic, section, flashcard, and user progress flows in apps/admin/tests/e2e/
- [ ] T004 [P] Ensure integration/E2E tests are included in CI config in .github/workflows/
- [ ] T005 Document integration/E2E test coverage in docs/testing/DATABASE_ABSTRACTION_TESTS.md

## Polish & Verification

- [ ] T006 Run type-check and address strict mode violations in libs/database/
- [ ] T007 [P] Run linting and formatting on all new/changed files in libs/database/
- [ ] T008 Perform manual CRUD verification for all repository/adapters in libs/database/
- [ ] T009 [P] Verify database switching and error handling in libs/database/src/

## Documentation

- [ ] T010 Update documentation for new repositories and adapters in docs/database/questions-schema.md
- [ ] T011 [P] Add known issues (Vitest coverage, DB-specific quirks) to refactoring-plans/REFACTORING_MANIFEST.md
- [ ] T012 Document integration/E2E test setup and troubleshooting in docs/testing/DATABASE_ABSTRACTION_TESTS.md

## Dependencies

- T001 → T002, T003
- T003, T004 → T005
- T006, T007 → T008, T009
- T005, T008, T009 → T010, T011, T012

## Parallel Execution Examples

- T002 and T004 can be done in parallel after T001
- T007 and T009 can be done in parallel after T006
- T011 and T012 can be done in parallel after T010

## MVP Scope

- T001, T002, T003, T006, T007

## Independent Test Criteria

- Each repository and adapter method is covered by integration tests
- E2E tests validate CRUD and progress flows
- Type-check and lint pass with no errors
- Documentation is up to date and includes known issues
