# Testing Best Practices

This guide outlines best practices for writing, organizing, and maintaining tests in the Elzatona Web project.

## Principles
- Write independent, deterministic tests
- Use repository mocks for unit tests
- Cover all CRUD operations and error cases
- Ensure ≥90% coverage for all repositories, adapters, and API routes
- Use E2E tests for full user flows
- Integrate tests into CI/CD pipeline
- Document test scenarios and edge cases

## Structure
- Unit tests: `libs/database/src/repositories/__tests__/`
- Integration tests: `tests/integration/database/`
- E2E tests: `tests/e2e/`
- Utilities/mocks: `tests/utils/`

## Running Tests
See README.md for commands to run all, unit, integration, and E2E tests.

## Coverage & Quality Gates
- Run coverage report after every major change
- Maintain coverage badge in README.md
- Run SonarQube scan before merging

## Documentation
- Update DATABASE_ABSTRACTION_TESTING_GUIDE.md with new scenarios
- Add examples to DATABASE_CONFIGURATION_GUIDE.md

## Team Guidelines
- Review all test PRs for coverage and quality
- Use pre-commit hooks to enforce test runs
- Keep test data isolated and reset between tests
