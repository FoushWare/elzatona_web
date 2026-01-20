# Database Abstraction Testing Guide

## Test Types
- Unit tests for repository interfaces and adapters
- Integration tests for API routes
- End-to-end tests for user flows (see tests/e2e/database-abstraction.e2e.test.ts)

## Running Tests
See README.md for commands to run all, unit, integration, and E2E tests.

## Coverage & Quality Gates
- Run coverage report after every major change
- Maintain coverage badge in README.md
- Run SonarQube scan before merging

## E2E & Polish Phase Summary
- E2E tests validate full user flows and error handling
- Coverage report must show ≥90% for constitution compliance
- SonarQube quality gate must pass before release

## Documentation
- Update this guide with new scenarios
- Add examples to DATABASE_CONFIGURATION_GUIDE.md

## Team Guidelines
- Review all test PRs for coverage and quality
- Use pre-commit hooks to enforce test runs
- Keep test data isolated and reset between tests
