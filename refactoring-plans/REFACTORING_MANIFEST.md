# Elzatona Web Refactoring Manifest

## Overview

This document outlines the comprehensive refactoring strategy for the Elzatona web application to achieve:

- Clean, maintainable code following SOLID principles
- Component-based architecture with proper separation of concerns
- Enhanced security and code quality
- Database-agnostic design
- Comprehensive testing coverage

## Project Structure Analysis

### Current Architecture

- **Framework**: Next.js with TypeScript
- **Build System**: Nx monorepo
- **Styling**: TailwindCSS
- **Database**: PostgreSQL (with plans for multi-database support)
- **Testing**: Jest + Playwright
- **Code Quality**: SonarQube + ESLint + Prettier

## Review Rules and Quality Gates

### Pre-Refactoring Requirements

Before starting any refactoring work, the following must be completed:

1. **Analysis Phase**
   - [ ] Run SonarQube analysis and document all issues
   - [ ] Run GitHub SAST scan and document all vulnerabilities
   - [ ] Document current line count and complexity
   - [ ] Identify all security hotspots
   - [ ] List all dependencies and their versions
   - [ ] Create component breakdown plan

2. **Planning Phase**
   - [ ] Create detailed refactoring plan document
   - [ ] Identify components to extract (atoms, molecules, organisms)
   - [ ] Plan database abstraction points
   - [ ] Define testing strategy
   - [ ] Get code review approval for plan

### Code Review Criteria

All refactored code must meet these criteria:

1. **Component Size**
   - Atoms: Maximum 50 lines
   - Molecules: Maximum 150 lines
   - Organisms: Maximum 200 lines
   - Templates: Maximum 300 lines
   - Pages: Maximum 500 lines

2. **Code Quality**
   - Cyclomatic complexity: <10 per function
   - Maximum nesting: 3 levels
   - No code duplication: <3%
   - TypeScript strict mode enabled
   - All types properly defined (no `any`)

3. **Security**
   - All user inputs validated
   - All outputs sanitized
   - Authentication checks on protected routes
   - Authorization checks on all operations
   - No hardcoded secrets
   - CSRF protection where needed

4. **Testing**
   - Unit test coverage: ≥90%
   - Integration test coverage: ≥80%
   - E2E tests for critical flows
   - Security tests for auth flows
   - All tests passing

5. **Performance**
   - Page load time: <2 seconds
   - First Contentful Paint: <1.5 seconds
   - Bundle size optimized
   - No memory leaks

### Quality Gates

All refactored pages must pass these gates before merging:

1. **SonarQube Quality Gate**
   - [ ] Quality gate: PASS
   - [ ] Security hotspots: 0 critical, 0 high
   - [ ] Code smells: <10 per 1000 lines
   - [ ] Technical debt: <5% of development time
   - [ ] Coverage: ≥80%

2. **GitHub SAST**
   - [ ] Critical vulnerabilities: 0
   - [ ] High vulnerabilities: 0
   - [ ] Secret scanning: 0 secrets detected
   - [ ] Dependency vulnerabilities: 0 critical
   - [ ] CodeQL analysis: PASS

3. **Testing**
   - [ ] All unit tests passing
   - [ ] All integration tests passing
   - [ ] All E2E tests passing
   - [ ] Coverage requirements met

4. **Code Review**
   - [ ] Code review approved
   - [ ] Security review completed
   - [ ] Performance review completed
   - [ ] Documentation updated

## Development Standards

### SOLID Principles Application

1. **Single Responsibility Principle**
   - Each component has one clear purpose
   - Each function does one thing
   - Each class manages one concern

2. **Open/Closed Principle**
   - Components open for extension via props
   - Closed for modification (use composition)
   - Use interfaces for extensibility

3. **Liskov Substitution Principle**
   - Components can be substituted with compatible ones
   - Props interfaces are consistent
   - No breaking changes in component APIs

4. **Interface Segregation Principle**
   - Small, focused prop interfaces
   - No unused props
   - Clear component contracts

5. **Dependency Inversion Principle**
   - Depend on abstractions (interfaces)
   - Inject dependencies via props
   - Use repository pattern for data access

### Component Design Rules

1. **Size Limits**
   - Atoms: 10-50 lines
   - Molecules: 50-150 lines
   - Organisms: 100-200 lines
   - Templates: 150-300 lines
   - Pages: 200-500 lines

2. **Nesting Limits**
   - Maximum 3 levels of JSX nesting
   - Maximum 3 levels of function nesting
   - Use early returns to reduce nesting

3. **State Management**
   - Local state: useState for component state
   - Global state: Zustand for app state
   - Server state: TanStack Query
   - Form state: React Hook Form

4. **TypeScript Requirements**
   - Strict mode enabled
   - No `any` types (use `unknown` if needed)
   - All props typed
   - All functions typed
   - All hooks typed

### File Organization

```
components/
├── atoms/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── index.ts
├── molecules/
│   ├── SearchBar.tsx
│   ├── Card.tsx
│   └── index.ts
├── organisms/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── index.ts
└── templates/
    ├── DashboardTemplate.tsx
    └── index.ts
```

### Import Organization

1. React/Next.js imports
2. Third-party library imports
3. Internal library imports (`@elzatona/*`)
4. Component imports (relative)
5. Utility imports (relative)
6. Type imports (at end)

Example:

```typescript
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@elzatona/common-ui";
import { useAuth } from "@elzatona/contexts";
import { SearchBar } from "../molecules/SearchBar";
import { formatDate } from "../../utils/date";
import type { User } from "../../types/user";
```

## Page Refactoring Tracking

| Page                  | Route                        | Status  | Lines (Before) | Lines (After) | Components | Security | Tests | SonarQube | Priority     |
| --------------------- | ---------------------------- | ------- | -------------- | ------------- | ---------- | -------- | ----- | --------- | ------------ |
| Admin Root            | `/admin`                     | Done    | 5              | 17            | 1/1        | ✅       | 0%    | ❌        | Low          |
| Admin Dashboard       | `/admin/dashboard`           | Done    | 380            | 6             | 1/8        | ✅       | 0%    | ❌        | High         |
| Admin Login           | `/admin/login`               | Done    | 5              | 120           | 3/3        | ✅       | 0%    | ❌        | High         |
| Content Management    | `/admin/content-management`  | Planned | 3367           | -             | 0/15       | ❌       | 0%    | ❌        | **CRITICAL** |
| Content Questions     | `/admin/content/questions`   | Planned | 1496           | -             | 0/8        | ❌       | 0%    | ❌        | **CRITICAL** |
| Frontend Task Detail  | `/frontend-tasks/[id]`       | Planned | 1535           | -             | 0/6        | ❌       | 0%    | ❌        | High         |
| Guided Learning       | `/features/guided-learning`  | Planned | 1019           | -             | 0/6        | ❌       | 0%    | ❌        | Medium       |
| Custom Practice       | `/custom-practice/[planId]`  | Planned | 585            | -             | 0/5        | ❌       | 0%    | ❌        | Medium       |
| Flashcards            | `/flashcards`                | Planned | 780            | -             | 0/5        | ❌       | 0%    | ❌        | Medium       |
| Problem Solving       | `/problem-solving/[id]`      | Planned | 515            | -             | 0/5        | ❌       | 0%    | ❌        | Medium       |

**Status Legend:**

- Planned: Plan created, not started
- In Progress: Currently being refactored
- Review: Completed, awaiting review
- Done: Completed and merged

## Success Metrics

### Code Quality Metrics

- Code coverage: >80% (target: 90%)
- SonarQube quality gate: PASS
- Critical security vulnerabilities: 0
- High security vulnerabilities: 0
- Technical debt ratio: <5%
- Code duplication: <3%

### Performance Metrics

- Page load time: <2 seconds
- First Contentful Paint: <1.5 seconds
- Bundle size reduction: 30%+
- Server response time: <200ms

### Maintainability Metrics

- Average component size: <200 lines
- Maximum file size: <500 lines
- Cyclomatic complexity: <10 per function
- Code review time: Reduced by 50%

## Refactoring Phases

### Phase 1: Critical Infrastructure (Weeks 1-2)

1. ✅ Home Page (`/`) - **COMPLETED**
   - Components moved to `libs/common-ui/`
   - Page reduced from 565 to 66 lines
   - Atomic design structure implemented
2. Authentication (`/auth`)
3. ✅ Admin Dashboard (`/admin/dashboard`) - **COMPLETED**
   - Separated into `apps/admin`
   - Wired to shared `AdminDashboard` component
   - Port 3001 configured for dev

### Phase 2: Core Features (Weeks 3-5)

4. User Dashboard (`/dashboard`)
5. Content Management (`/admin/content-management`) - **3367 lines**
6. Questions Management (`/admin/content/questions`) - **1496 lines**
7. Browse Practice Questions (`/browse-practice-questions`)

### Phase 3: Learning Features (Weeks 6-8)

8. Learning Paths (`/learning-paths`)
9. Guided Learning (`/features/guided-learning`)
10. Free Style Practice (`/free-style-practice`) - **3941 lines**
11. Frontend Tasks (`/frontend-tasks`) - **1535 lines**

### Phase 4: Admin Features (Weeks 9-10)

12. Problem Solving Admin (`/admin/problem-solving`)
13. Frontend Tasks Admin (`/admin/frontend-tasks`)
14. Learning Cards Admin (`/admin/learning-cards`)
15. Users Management (`/admin/users`)

### Phase 5: Advanced Features (Weeks 11-12)

16. Custom Roadmap (`/custom-roadmap`) - **3115 lines**
17. Guided Practice (`/guided-practice`) - **3966 lines**
18. Flashcards (`/flashcards`)
19. Settings (`/settings`)
20. Remaining pages

## Next Steps

1. ✅ Create refactoring documentation structure
2. ✅ Establish code quality gates
3. ⏳ Set up automated testing pipelines
4. ⏳ Create component library standards
5. ⏳ Begin Phase 1 refactoring

This manifesto serves as the foundation for our refactoring journey, ensuring we maintain high standards while systematically improving the codebase.
