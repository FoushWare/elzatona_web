# Admin/Website App Separation - Implementation Plan

## Feature Specification

**Feature Name**: Complete Admin/Website App Separation  
**Priority**: 🔴 P0 (Critical)  
**Estimated Effort**: 6-10 hours  
**Target Branch**: `feat/complete-admin-app-separation`

---

## Technical Context

### Current State

- **Admin App**: `apps/admin/` - Partially populated (60%)
- **Website App**: `apps/website/` - Contains duplicate admin routes
- **Conflict**: 11 duplicate routes exist between both apps
- **Risk Level**: HIGH - Developer confusion, deployment ambiguity

### Technology Stack

- Framework: Next.js 15+ with App Router
- Build System: Nx Monorepo
- Runtime: Node.js 20
- Testing: Vitest + Playwright
- CI/CD: GitHub Actions

### Dependencies

- `@elzatona/common-ui` - Shared UI components
- `@elzatona/database` - Database abstraction layer
- `@elzatona/types` - Shared TypeScript types
- `@elzatona/contexts` - Shared React contexts
- `@elzatona/hooks` - Shared React hooks

---

## Constitution Check

| Principle                   | Status       | Notes                                  |
| --------------------------- | ------------ | -------------------------------------- |
| Single Responsibility       | ⚠️ VIOLATING | Admin routes in two apps               |
| Separation of Concerns      | ⚠️ VIOLATING | Admin logic mixed with website         |
| DRY (Don't Repeat Yourself) | 🔴 VIOLATING | 11 duplicate route implementations     |
| Maintainability             | 🔴 AT RISK   | Changes must be made in 2 places       |
| Testability                 | ⚠️ AT RISK   | Unclear which implementation is tested |

**Action Required**: This migration will RESOLVE all constitution violations.

---

## Phase 0: Research & Analysis

### Task 0.1: Code Difference Analysis

**Duration**: 30 minutes  
**Owner**: TBD

**Objective**: Identify all differences between duplicate routes

**Steps**:

1. Compare `apps/website/src/app/admin/content/` vs `apps/admin/src/app/admin/content/`
2. Compare `apps/website/src/app/admin/content-management/` vs `apps/admin/src/app/admin/content-management/`
3. Compare `apps/website/src/app/admin/frontend-tasks/` vs `apps/admin/src/app/admin/frontend-tasks/`
4. Compare `apps/website/src/app/admin/login/` vs `apps/admin/src/app/admin/login/`
5. Compare `apps/website/src/app/admin/problem-solving/` vs `apps/admin/src/app/admin/problem-solving/`
6. Document which implementation has newer/better code
7. Create diff report

**Output**: `research.md` with comparison findings

---

### Task 0.2: Dependency Mapping

**Duration**: 30 minutes  
**Owner**: TBD

**Objective**: Map all dependencies and imports that need updating

**Steps**:

1. List all imports from `apps/website/src/app/admin/` to shared libs
2. List all imports from `apps/admin/src/app/admin/` to shared libs
3. Identify any local components/utilities in each location
4. Map API routes and their consumers
5. Document any hardcoded URLs or paths

**Output**: Dependency map in `research.md`

---

## Phase 1: Data Model & Contracts

### Task 1.1: Define Admin App API Routes

**Duration**: 1 hour  
**Owner**: TBD

**Objective**: Ensure all API routes are defined in admin app

**Routes to Verify/Create**:

```
apps/admin/src/app/api/
├── admin/
│   ├── create/route.ts           # Admin user creation
│   ├── dashboard-stats/route.ts  # Dashboard statistics
│   ├── learning-cards/route.ts   # Learning cards CRUD
│   ├── logs/route.ts             # Admin activity logs
│   ├── questions/route.ts        # Questions management
│   └── users/route.ts            # User management
```

**Acceptance Criteria**:

- [ ] All API routes from website app exist in admin app
- [ ] TypeScript types match between apps
- [ ] Response formats are consistent

---

### Task 1.2: Page Route Structure

**Duration**: 30 minutes  
**Owner**: TBD

**Objective**: Define complete admin app page structure

**Target Structure**:

```
apps/admin/src/app/admin/
├── layout.tsx                    # Admin layout (exists)
├── page.tsx                      # Admin home (exists)
├── content/                      # Content management (exists)
│   └── questions/
│       └── components/           # Question components
├── content-management/           # Content management (exists)
│   └── hooks/                    # Content hooks
├── dashboard/                    # Dashboard (exists)
├── frontend-tasks/               # Frontend tasks (exists)
├── learning-cards/               # Learning cards (MIGRATE)
│   └── page.tsx
├── login/                        # Login (exists)
├── logs/                         # Activity logs (MIGRATE)
│   └── page.tsx
├── problem-solving/              # Problem solving (exists)
├── questions/                    # Questions route (MIGRATE)
│   └── page.tsx
└── users/                        # User management (MIGRATE)
    └── page.tsx
```

---

## Phase 2: Migration Tasks

### Task 2.1: Migrate Learning Cards

**Duration**: 45 minutes  
**Owner**: TBD  
**Priority**: HIGH

**Source**: `apps/website/src/app/admin/learning-cards/`  
**Destination**: `apps/admin/src/app/admin/learning-cards/`

**Steps**:

1. Copy all files from source to destination
2. Update all imports to use `@elzatona/*` packages
3. Verify no local dependencies remain
4. Update any hardcoded paths
5. Run TypeScript check
6. Test manually on port 3001

**Acceptance Criteria**:

- [ ] All files copied to admin app
- [ ] No TypeScript errors
- [ ] Page renders correctly on localhost:3001/admin/learning-cards
- [ ] All CRUD operations work

---

### Task 2.2: Migrate Logs

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: MEDIUM

**Source**: `apps/website/src/app/admin/logs/`  
**Destination**: `apps/admin/src/app/admin/logs/`

**Steps**:

1. Copy all files from source to destination
2. Update all imports to use `@elzatona/*` packages
3. Verify no local dependencies remain
4. Update any hardcoded paths
5. Run TypeScript check
6. Test manually on port 3001

**Acceptance Criteria**:

- [ ] All files copied to admin app
- [ ] No TypeScript errors
- [ ] Page renders correctly on localhost:3001/admin/logs
- [ ] Log viewing functionality works

---

### Task 2.3: Migrate Questions Route

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: HIGH

**Source**: `apps/website/src/app/admin/questions/`  
**Destination**: `apps/admin/src/app/admin/questions/` (or integrate with `/admin/content/questions/`)

**Decision Required**: Should `/admin/questions/` be a redirect to `/admin/content/questions/` or a standalone route?

**Steps**:

1. Analyze current questions route functionality
2. Compare with `/admin/content/questions/`
3. If duplicate functionality: Create redirect
4. If unique functionality: Copy and integrate
5. Update imports and paths
6. Test functionality

**Acceptance Criteria**:

- [ ] Questions route accessible from admin app
- [ ] No duplicate functionality
- [ ] All CRUD operations work

---

### Task 2.4: Migrate Users Management

**Duration**: 45 minutes  
**Owner**: TBD  
**Priority**: HIGH

**Source**: `apps/website/src/app/admin/users/`  
**Destination**: `apps/admin/src/app/admin/users/`

**Steps**:

1. Copy all files from source to destination
2. Update all imports to use `@elzatona/*` packages
3. Verify user repository integration
4. Update any hardcoded paths
5. Run TypeScript check
6. Test user listing, editing, role changes

**Acceptance Criteria**:

- [ ] All files copied to admin app
- [ ] No TypeScript errors
- [ ] Page renders correctly on localhost:3001/admin/users
- [ ] User CRUD operations work
- [ ] Role management works

---

### Task 2.5: Consolidate Duplicate Routes

**Duration**: 1 hour  
**Owner**: TBD  
**Priority**: HIGH

**Objective**: Choose canonical implementation for duplicates

**Routes to Consolidate**:

1. `/admin/content/` - Compare implementations, keep best
2. `/admin/content-management/` - Compare implementations, keep best
3. `/admin/frontend-tasks/` - Compare implementations, keep best
4. `/admin/login/` - Compare implementations, keep best
5. `/admin/problem-solving/` - Compare implementations, keep best

**Steps for Each Route**:

1. Run diff between website and admin implementations
2. Identify which has newer features/fixes
3. If admin app has newer: Keep admin, document differences
4. If website app has newer: Copy changes to admin
5. Verify no functionality lost

**Acceptance Criteria**:

- [ ] All routes have single canonical implementation in admin app
- [ ] No feature regression
- [ ] Tests pass for all routes

---

## Phase 3: Cleanup Tasks

### Task 3.1: Remove Old Admin Routes from Website

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: CRITICAL

**Objective**: Delete duplicate admin routes from website app

**Steps**:

1. Verify all functionality exists in admin app
2. Create backup branch (just in case)
3. Delete `apps/website/src/app/admin/` folder entirely
4. Run `npm run build` for website app
5. Fix any broken imports
6. Run tests

**Acceptance Criteria**:

- [ ] Folder `apps/website/src/app/admin/` deleted
- [ ] Website app builds successfully
- [ ] No broken imports
- [ ] Website tests pass

---

### Task 3.2: Update Website Navigation

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: HIGH

**Objective**: Remove admin links from website navigation

**Files to Check**:

- `apps/website/src/app/layout.tsx`
- Any shared navigation components
- Any hardcoded admin URLs in website app

**Steps**:

1. Search for `/admin` references in website app
2. Remove or update navigation links
3. Remove admin redirects from website layout
4. Update any conditional admin UI elements

**Acceptance Criteria**:

- [ ] No admin links in website navigation
- [ ] No admin redirects in website layout
- [ ] Website doesn't expose admin routes

---

### Task 3.3: Update Admin App Configuration

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: MEDIUM

**Objective**: Ensure admin app is properly configured for standalone deployment

**Files to Update**:

- `apps/admin/project.json` - Nx project config
- `apps/admin/next.config.js` - Next.js config
- `apps/admin/.env.local` - Environment variables
- Vercel/deployment config if applicable

**Steps**:

1. Verify port configuration (3001 for dev)
2. Verify environment variables are separate
3. Update any shared config references
4. Verify build output is correct

**Acceptance Criteria**:

- [ ] Admin app runs independently on port 3001
- [ ] Admin app builds successfully
- [ ] Environment variables are isolated

---

## Phase 4: Testing Tasks

### Task 4.1: Manual Smoke Testing

**Duration**: 1 hour  
**Owner**: TBD  
**Priority**: CRITICAL

**Objective**: Verify all admin functionality works

**Test Checklist**:

| Route                       | Test Cases          | Status |
| --------------------------- | ------------------- | ------ |
| `/admin`                    | Home page loads     | ⬜     |
| `/admin/dashboard`          | Stats display       | ⬜     |
| `/admin/login`              | Login flow works    | ⬜     |
| `/admin/content`            | Content list loads  | ⬜     |
| `/admin/content-management` | CRUD operations     | ⬜     |
| `/admin/content/questions`  | Question management | ⬜     |
| `/admin/frontend-tasks`     | Task management     | ⬜     |
| `/admin/problem-solving`    | Problem management  | ⬜     |
| `/admin/learning-cards`     | Card management     | ⬜     |
| `/admin/logs`               | Log viewing         | ⬜     |
| `/admin/users`              | User management     | ⬜     |

**Acceptance Criteria**:

- [ ] All routes accessible
- [ ] No 404 errors
- [ ] No console errors
- [ ] All CRUD operations work

---

### Task 4.2: Integration Testing

**Duration**: 1 hour  
**Owner**: TBD  
**Priority**: HIGH

**Objective**: Run existing tests against admin app

**Steps**:

1. Run `npm run test` in admin app
2. Run `npm run test:e2e` if E2E tests exist
3. Fix any failing tests due to path changes
4. Update test imports if needed

**Acceptance Criteria**:

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] E2E tests pass (if applicable)

---

### Task 4.3: Build Verification

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: CRITICAL

**Objective**: Verify both apps build successfully

**Steps**:

1. Run `npm run build` for admin app
2. Run `npm run build` for website app
3. Run `npm run build` for entire monorepo
4. Fix any build errors

**Acceptance Criteria**:

- [ ] Admin app builds without errors
- [ ] Website app builds without errors
- [ ] Monorepo builds without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## Phase 5: Documentation & Cleanup

### Task 5.1: Update Architecture Documentation

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: MEDIUM

**Files to Update**:

- `refactoring-plans/REFACTORING_MANIFEST.md` - Mark separation as COMPLETE
- `ADMIN_APP_MIGRATION_STATUS.md` - Mark as RESOLVED
- `docs/structure.md` - Update project structure
- `README.md` - Update if needed

**Steps**:

1. Update manifest to mark admin separation complete
2. Archive migration status document
3. Update structure documentation
4. Add deployment notes for separate apps

**Acceptance Criteria**:

- [ ] All docs reflect new architecture
- [ ] No references to duplicate routes
- [ ] Clear instructions for running each app

---

### Task 5.2: CI/CD Pipeline Update

**Duration**: 30 minutes  
**Owner**: TBD  
**Priority**: HIGH

**Objective**: Ensure CI/CD handles both apps correctly

**Files to Check**:

- `.github/workflows/ci-checks.yml`
- Any deployment workflows
- Vercel/Netlify config

**Steps**:

1. Verify admin app is included in CI
2. Verify website app still works in CI
3. Update any app-specific build commands
4. Test PR workflow

**Acceptance Criteria**:

- [ ] CI passes for both apps
- [ ] Both apps deploy correctly
- [ ] No CI failures

---

### Task 5.3: Final Cleanup

**Duration**: 15 minutes  
**Owner**: TBD  
**Priority**: LOW

**Objective**: Remove temporary files and close migration

**Steps**:

1. Remove any backup branches
2. Remove migration tracking files if desired
3. Update CHANGELOG.md
4. Create PR for final merge

**Acceptance Criteria**:

- [ ] No temporary files remain
- [ ] Clean git history
- [ ] PR approved and merged

---

## Task Checklist Summary

### Phase 0: Research (1 hour)

- [ ] 0.1: Code Difference Analysis (30 min)
- [ ] 0.2: Dependency Mapping (30 min)

### Phase 1: Data Model & Contracts (1.5 hours)

- [ ] 1.1: Define Admin App API Routes (1 hour)
- [ ] 1.2: Page Route Structure (30 min)

### Phase 2: Migration (3.5 hours)

- [ ] 2.1: Migrate Learning Cards (45 min)
- [ ] 2.2: Migrate Logs (30 min)
- [ ] 2.3: Migrate Questions Route (30 min)
- [ ] 2.4: Migrate Users Management (45 min)
- [ ] 2.5: Consolidate Duplicate Routes (1 hour)

### Phase 3: Cleanup (1.5 hours)

- [ ] 3.1: Remove Old Admin Routes from Website (30 min)
- [ ] 3.2: Update Website Navigation (30 min)
- [ ] 3.3: Update Admin App Configuration (30 min)

### Phase 4: Testing (2.5 hours)

- [ ] 4.1: Manual Smoke Testing (1 hour)
- [ ] 4.2: Integration Testing (1 hour)
- [ ] 4.3: Build Verification (30 min)

### Phase 5: Documentation (1.25 hours)

- [ ] 5.1: Update Architecture Documentation (30 min)
- [ ] 5.2: CI/CD Pipeline Update (30 min)
- [ ] 5.3: Final Cleanup (15 min)

---

## Total Estimated Time: 10.75 hours

### By Priority:

- 🔴 CRITICAL: 4 hours (Tasks 3.1, 4.1, 4.3)
- 🟠 HIGH: 4.5 hours (Tasks 2.1-2.5, 3.2, 4.2, 5.2)
- 🟡 MEDIUM: 1.5 hours (Tasks 3.3, 5.1)
- 🟢 LOW: 0.75 hours (Task 5.3 + Research)

---

## Success Criteria

### Technical Criteria

- [ ] All admin routes consolidated in `apps/admin/`
- [ ] `apps/website/src/app/admin/` folder deleted
- [ ] Both apps build without errors
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint errors

### Functional Criteria

- [ ] All admin functionality works on port 3001
- [ ] Website works without admin routes
- [ ] Login/logout flows work
- [ ] All CRUD operations functional
- [ ] No broken links or 404s

### Documentation Criteria

- [ ] Architecture docs updated
- [ ] Migration marked complete
- [ ] CI/CD configured correctly

---

## Rollback Plan

If migration fails:

1. Checkout previous commit
2. Restore `apps/website/src/app/admin/` from git history
3. Document what went wrong
4. Create bug fix plan
5. Retry with fixes

---

## Sign-Off

| Role      | Name | Approved | Date |
| --------- | ---- | -------- | ---- |
| Developer | TBD  | ⬜       |      |
| Tech Lead | TBD  | ⬜       |      |
| QA        | TBD  | ⬜       |      |

---

**Plan Created**: January 30, 2026  
**Status**: READY FOR EXECUTION  
**Next Step**: Assign owner and begin Phase 0
