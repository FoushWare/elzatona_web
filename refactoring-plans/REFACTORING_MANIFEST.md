# Elzatona Web Refactoring Manifest

## ⚠️ Critical Note: Incomplete Admin/Website App Separation

**Status**: 🟡 IN PROGRESS - PARTIAL COMPLETION

The refactoring to separate admin and website apps is **INCOMPLETE**. Currently:

- ✅ `apps/admin/` app created and partially populated
- ✅ Core admin routes migrated (dashboard, content, problem-solving, etc.)
- ⚠️ **DUPLICATE ROUTES** still exist in `apps/website/src/app/admin/`
- ❌ Old routes in website app NOT deleted
- ❌ Some features NOT fully migrated (learning-cards, logs, questions)

**See**: `ADMIN_APP_MIGRATION_STATUS.md` for complete details, risks, and migration plan.

**Action Required**: Complete the consolidation of all admin routes to `apps/admin/` and remove duplicates from `apps/website/` before merging major features.

---

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

| Page                 | Route                       | Status   | Lines (Before) | Lines (After) | Components | Security | Tests | SonarQube | Priority                   |
| -------------------- | --------------------------- | -------- | -------------- | ------------- | ---------- | -------- | ----- | --------- | -------------------------- |
| Admin Root           | `/admin`                    | Done     | 5              | 17            | 1/1        | ✅       | 0%    | ❌        | Low                        |
| Admin Dashboard      | `/admin/dashboard`          | Done     | 380            | 6             | 1/8        | ✅       | 0%    | ❌        | High                       |
| Admin Login          | `/admin/login`              | Done     | 5              | 120           | 3/3        | ✅       | 0%    | ❌        | High                       |
| Content Management   | `/admin/content-management` | Done     | 3367           | 256           | 12/12      | ✅       | 0%    | ❌        | **CRITICAL**               |
| Content Questions    | `/admin/content/questions`  | Done     | 1496           | 216           | 8/8        | ✅       | 0%    | ❌        | **CRITICAL**               |
| Frontend Tasks Admin | `/admin/frontend-tasks`     | Done     | 1250           | 240           | 4/4        | ✅       | 0%    | ❌        | High                       |
| Problem Solv. Admin  | `/admin/problem-solving`    | Done     | 1500           | 220           | 4/4        | ✅       | 0%    | ❌        | High                       |
| Feature Reports      | `/admin/reports`            | Deplaned | 4433           | -             | 0/3        | ❌       | 0%    | ❌        | Neglected for this release |
| Frontend Task Detail | `/frontend-tasks/[id]`      | Planned  | 1535           | -             | 0/6        | ❌       | 0%    | ❌        | High                       |
| Guided Learning      | `/features/guided-learning` | Planned  | 1019           | -             | 0/6        | ❌       | 0%    | ❌        | Medium                     |
| Custom Practice      | `/custom-practice/[planId]` | Planned  | 585            | -             | 0/5        | ❌       | 0%    | ❌        | Medium                     |
| Flashcards           | `/flashcards`               | Planned  | 780            | -             | 0/5        | ❌       | 0%    | ❌        | Medium                     |

## Deferred Features

The following features have been deferred or neglected for the current release to focus on core stability and product-critical scenarios:

- **Feature Reports (`/admin/reports`)**: Not required for this release. Legacy files have been removed, and navigation links deactivated.

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

12. ✅ Problem Solving Admin (`/admin/problem-solving`) - **COMPLETED**
13. ✅ Frontend Tasks Admin (`/admin/frontend-tasks`) - **COMPLETED**
14. Learning Cards Admin (`/admin/learning-cards`)
15. Users Management (`/admin/users`)

### Phase 5: Advanced Features (Weeks 11-12)

16. Custom Roadmap (`/custom-roadmap`) - **3115 lines**
17. Guided Practice (`/guided-practice`) - **3966 lines**
18. Flashcards (`/flashcards`)
19. Settings (`/settings`)
20. Remaining pages

## Known Issues (Database Abstraction Layer)

- Vitest coverage reporting is not fully integrated for all database abstraction code. Some files may not be included in lcov output due to toolchain or config limitations. See docs/testing/DATABASE_ABSTRACTION_TESTS.md for details and workarounds.
- Some advanced DB-specific flows require manual verification beyond automated tests.
- E2E test coverage for all CRUD flows is in progress; see apps/admin/tests/e2e/ for latest status.

## 🔴 CRITICAL: Admin/Website App Separation Status

### Current Issue

Duplicate admin routes exist in both locations:

- ⚠️ `apps/website/src/app/admin/` - OLD LOCATION (deprecated, should be removed)
- ✅ `apps/admin/src/app/admin/` - NEW LOCATION (primary, use this)

### Impact

- Code duplication causing maintenance burden
- Routing ambiguity for developers
- Increased bundle size for website app
- Risk of out-of-sync implementations

**See**: `ADMIN_APP_MIGRATION_STATUS.md` for complete details, risks, and migration plan.

### App Architecture Goal

```
apps/
├── website/          - User-facing routes only
│   └── src/app/ (no admin routes)
│
└── admin/           - Admin routes only
    └── src/app/admin/
```

### Current Status

- ✅ Admin app created: `apps/admin/`
- ✅ Core routes migrated (60%): dashboard, content, problem-solving
- ⚠️ DUPLICATE ROUTES: Still exist in website app
- ❌ CLEANUP PENDING: Old routes not yet removed
- ❌ INCOMPLETE: Some features still in website app only

### Action Required

Consolidate all admin routes to `apps/admin/` and remove duplicates from `apps/website/` before merging major features.

Estimated timeline: 6-10 hours

## Next Steps

1. ✅ Create refactoring documentation structure
2. ✅ Establish code quality gates
3. 🔴 **PRIORITY**: Complete admin/website app separation (see ADMIN_APP_MIGRATION_STATUS.md)
4. ⏳ Set up automated testing pipelines
5. ⏳ Create component library standards
6. ⏳ Continue Phase 1-5 refactoring

This manifesto serves as the foundation for our refactoring journey, ensuring we maintain high standards while systematically improving the codebase.
