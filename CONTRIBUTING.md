# Contributing to Elzatona

Thank you for helping make Elzatona better! This guide covers everything you need to start contributing effectively.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Coding Conventions](#coding-conventions)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Feature Ownership](#feature-ownership)
- [Reporting Bugs](#reporting-bugs)

---

## Getting Started

### 1. Fork and clone

```bash
git clone https://github.com/<your-handle>/elzatona-web.git
cd elzatona-web
```

### 2. Install dependencies

```bash
bun install
# or: npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
cp .env.test.local.example .env.test.local
cp .env.dev.local.example .env.dev.local
```

Fill in the values in `.env.local`. The required variables are documented in [README.md](./README.md#-environment-variables) and in each `.env.*.example` file.

### 4. Start the development server

```bash
# Website (port 3000)
bun run dev

# Admin panel (port 3001)
bun run dev:admin
```

---

## Project Structure

This is an **Nx monorepo**:

```
elzatona-web/
├── apps/
│   ├── website/     # Public-facing Next.js app (App Router, port 3000)
│   └── admin/       # Admin panel Next.js app (Pages Router, port 3001)
├── libs/
│   ├── auth/        # Supabase auth helpers
│   ├── common-ui/   # Shared UI component library
│   ├── contexts/    # React contexts (auth, etc.)
│   ├── database/    # Database abstraction layer
│   ├── hooks/       # Shared React hooks
│   ├── shared-data/ # Shared data fetching layer
│   ├── types/       # Shared TypeScript types
│   └── utilities/   # Shared utility functions
├── features/        # Feature documentation with test scenarios
└── docs/            # Developer documentation
```

See [docs/structure.md](./docs/structure.md) for detailed layout.

---

## Development Workflow

### Available Commands

```bash
# Development
bun run dev             # Start website
bun run dev:admin       # Start admin panel

# Testing
bun run test            # Run all tests
bun run test:unit       # Unit tests only
bun run test:integration # Integration tests only
bun run test:e2e        # E2E tests (Playwright)

# Quality
bun run lint:all        # Lint all files
bun run lint:fix        # Lint and auto-fix
bun run type-check      # TypeScript type checking
bun run format          # Prettier formatting
```

---

## Branching Strategy

We follow **feature branch** workflow. See [docs/GIT_BRANCHING_STRATEGY.md](./docs/GIT_BRANCHING_STRATEGY.md) for the full strategy.

| Branch           | Purpose                                |
| ---------------- | -------------------------------------- |
| `main`           | Production-ready code                  |
| `develop`        | Integration branch for features        |
| `feature/<name>` | New features                           |
| `fix/<name>`     | Bug fixes                              |
| `chore/<name>`   | Non-functional changes (docs, tooling) |

**Example:**

```bash
git checkout develop
git checkout -b feature/my-new-feature
# ... make changes ...
git push origin feature/my-new-feature
# Open a PR against develop
```

---

## Coding Conventions

### TypeScript

- **Strict mode** is enabled — no `any` types without justification.
- Always type function parameters and return values explicitly.
- Use shared types from `@elzatona/types` before defining local ones.

### Imports

```typescript
// ✅ Use path aliases, not relative paths for cross-lib imports
import { Button } from "@elzatona/common-ui";
import { useCards } from "@elzatona/hooks";
import { LearningCard } from "@elzatona/types";

// ✅ Use @/ for within-app imports
import { MyComponent } from "@/components/MyComponent";
```

### Components

- Place components co-located with their feature route inside `apps/`.
- Place reusable components in `libs/common-ui/` or `libs/shared-components/`.
- Every component file should have a matching `.test.tsx` file.

### Naming

| Thing              | Convention                  | Example                   |
| ------------------ | --------------------------- | ------------------------- |
| React components   | PascalCase                  | `CardFormModal.tsx`       |
| Hooks              | camelCase with `use` prefix | `useLearningCards.ts`     |
| Utility functions  | camelCase                   | `formatDate.ts`           |
| Types / Interfaces | PascalCase                  | `LearningCard`            |
| Files              | kebab-case for routes       | `learning-cards/page.tsx` |

---

## Testing

All changes **must** include relevant tests. Test files live co-located with their source:

```
MyComponent.tsx
MyComponent.test.tsx              # Unit tests
MyComponent.integration.test.tsx  # Integration tests
```

### Behavior-Driven Development (BDD)

For every new feature or major refactor, you must provide:

1. **Scenarios** in `feature-BDD.md` using Gherkin syntax (Given/When/Then).
2. **Technical Design** in `feature-TDD.md` covering architecture and API changes.
3. **Automated Tests** that map directly to the BDD scenarios.

We use **Playwright** for E2E scenarios and **Jest** for technical verification.

### Before Submitting

```bash
bun run test          # Must pass
bun run type-check    # Must pass
bun run lint:all      # Must pass (or fix with lint:fix)
```

Coverage must stay ≥ 90%.

---

## Pull Request Process

1. **Ensure tests pass** locally before opening a PR.
2. **Target `develop`** branch (not `main`).
3. **Fill in the PR template** — describe _what_ and _why_, not just _how_.
4. **Link related issues** using `Closes #<issue-number>`.
5. **Request a review** from at least one maintainer via CODEOWNERS (`.github/CODEOWNERS`).
6. Address all review comments before merging.
7. **Squash merge** is preferred to keep history clean.

---

## Feature Ownership

Each major feature is documented in a dedicated directory within [`features/`](./features/README.md). A complete feature doc set includes:

- **`feature-spec.md`**: Business context and user flow.
- **`feature-BDD.md`**: Behavioral scenarios for testing.
- **`feature-TDD.md`**: Technical implementation details.
- **`test-design.md`**: How the feature is verified.

Before picking up a feature, read its documentation set to understand the expected behavior and technical constraints.

---

## Reporting Bugs

1. Check [existing issues](https://github.com/FoushWare/elzatona-web/issues) to avoid duplicates.
2. Open a new issue with:
   - **Steps to reproduce**
   - **Expected behaviour**
   - **Actual behaviour**
   - **Environment** (browser, OS, Node version)

---

## Questions?

Open a [GitHub Discussion](https://github.com/FoushWare/elzatona-web/discussions) for questions that don't fit as issues.
