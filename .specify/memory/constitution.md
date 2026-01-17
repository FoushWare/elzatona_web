<!--
Sync Impact Report:
- Version change: N/A -> 1.0.0
- List of modified principles: Established new project principles.
- Added sections: Core Principles, Branching & Release Strategy, Development Workflow, Governance.
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
-->

# Elzatona Web Constitution

## Core Principles

### I. Spec-Driven Development (SDD)

Every feature, refactor, or bug fix MUST start with a specification. Focus on product scenarios and predictable outcomes instead of "vibe coding" from scratch. The specification is the single source of truth that defines "done".

### II. Predictable Outcomes

Development must prioritize stability and predictability. This is achieved through detailed technical plans (after specs but before code) that outline architecture, data models, and API contracts.

### III. Component-Based Architecture

Follow the Atomic Design pattern (Atoms, Molecules, Organisms, Templates, Pages). Maintain strict size limits and clear separation of concerns. Reusability is a first-class citizen.

### IV. Model Strategy

Development uses a two-phase model approach to optimize cost and quality:

- **Planning Phase (`/generate`)**: Use premium models (e.g., Opus 4.5) for architectural design, spec transformation, and task breakdown. Focus on comprehensive analysis and detailed planning.
- **Implementation Phase (`/implement`)**: Use low-cost models (e.g., 0x) for focused code execution. Strict adherence to plans and tasks with minimal token consumption.

This strategy ensures high-quality architecture while maintaining cost efficiency during execution.

### V. Quality Gates (NON-NEGOTIABLE)

All code must pass through strict quality gates:

- Unit test coverage ≥ 90% (for logic)
- SonarQube quality gate: PASS
- 0 Critical/High security vulnerabilities
- No "any" types in TypeScript; strict mode enabled.

### V. Security by Design

All user inputs must be validated, and outputs sanitized. Authentication and authorization checks are mandatory for all protected routes and operations. No hardcoded secrets.

## Branching & Release Strategy

### Main Branch

The `main` branch represents production-ready code. Commits to `main` only happen via verified releases.

### Develop Branch

The `develop` branch is the integration branch for all ongoing features. All refactoring and development branches must start from `develop` and merge back into it via PRs.

### Release Branches

`release/vX.X.X` branches are created from `develop` when preparing for a deployment. Only bug fixes are allowed on release branches before they are merged into `main` and back into `develop`.

### Feature Branches

`feature/` or `refactor/` branches are short-lived branches for specific tasks, always branching off and returning to `develop`.

## Development Workflow

1. **Specify**: Define the product scenario and acceptance criteria (`.github/specs/`).
2. **Plan**: Create a technical implementation plan (`.github/plans/`).
3. **Task**: Break down the plan into actionable items (`.github/tasks/`).
4. **Implement**: Execute code changes based on the tasks.
5. **Verify**: Run unit, integration, and E2E tests to validate against the spec.

## Governance

This Constitution supersedes all other ad-hoc practices. Any deviation must be justified and documented. Changes to the Constitution require user approval and a migration plan if existing code is affected.

All Pull Requests must be reviewed against these principles.

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17
