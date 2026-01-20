# Database Abstraction Layer: Task Checklist

## Setup & Infrastructure

- [ ] T001 Ensure Nx/monorepo structure is up to date for database abstraction
- [ ] T002 [P] Update CI workflows for secret scanning, Prettier, and test coverage (.github/workflows/)

## Repository & Adapter Implementation

- [ ] T003 Implement repository pattern for all DB entities in libs/database/src/repositories/
- [ ] T004 [P] Implement adapter pattern for PostgreSQL in libs/database/src/adapters/postgresql/
- [ ] T005 [P] Prepare stubs for future DB adapters (SQLite, MySQL) in libs/database/src/adapters/

## Testing

- [ ] T006 Add integration tests for all repository methods in libs/database/src/repositories/**tests**/
- [ ] T007 [P] Add integration tests for all adapter methods in libs/database/src/adapters/postgresql/**tests**/
- [ ] T008 Add E2E Playwright tests for CRUD flows in apps/admin/tests/e2e/
- [ ] T009 [P] Ensure SonarQube and coverage reporting for all DB code

## Documentation

- [ ] T010 Update schema and migration docs in docs/database/questions-schema.md and related files (requirement: documentation)
- [ ] T011 [P] Add troubleshooting, error extraction, and known issues to docs/testing/DATABASE_ABSTRACTION_TESTS.md and refactoring-plans/REFACTORING_MANIFEST.md (requirements: documentation, error extraction, coverage gap, DB-specific quirks)
- [ ] T012 Document CI/CD and pre-push hook requirements in docs/ (requirement: documentation, error extraction)

## Risks & Mitigations

- [ ] T013 Document pre-push hook error extraction and resolution steps in docs/testing/DATABASE_ABSTRACTION_TESTS.md (requirement: error extraction)
- [ ] T014 [P] Track and document coverage gaps and DB-specific quirks in docs/ (requirement: coverage gap, DB-specific quirks)

## Finalization

- [ ] T015 Finalize and push all code/doc changes to remote (requirement: all above)
- [ ] T016 [P] Create PR to develop and resolve any pre-push/CI errors (requirement: error extraction, CI quality gates)
- [ ] T017 Begin next refactor: /frontend-tasks/[id] page per manifesto

## Parallel Execution Examples

- T002, T004, T005, T007, T009, T011, T014, T016 can be done in parallel after their dependencies

## MVP Scope

- T003, T004, T006, T008, T010, T015

## Independent Test Criteria

- All repository and adapter methods are covered by integration tests
- E2E CRUD flows pass in CI
- Prettier and secret scanning pass in CI
- Documentation is up to date and includes troubleshooting
