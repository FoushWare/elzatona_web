# Tasks: Admin App Separation

**Input**: Design documents from `/specs/005-admin-app-separation/`
**Prerequisites**: spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Analysis and preparation for migration

- [x] T001 Analyze route differences between apps/website/src/app/admin/ and apps/admin/src/app/admin/
- [x] T002 [P] Document local component dependencies in both apps
- [x] T003 [P] Inventory API routes in both apps that need consolidation
- [x] T004 Create backup of current website admin routes before migration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Verify admin app builds successfully: `pnpm nx run admin:build`
- [x] T006 Verify website app builds successfully: `pnpm nx run website:build`
- [x] T007 Ensure admin app runs on port 3001: `pnpm nx run admin:dev`
- [x] T008 [P] Verify shared library imports work in both apps (@elzatona/common-ui, @elzatona/database, @elzatona/types)
- [x] T009 Create admin app API structure: apps/admin/src/app/api/admin/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Admin Accesses All Features from Admin App (Priority: P1) 🎯 MVP

**Goal**: All admin functionality is accessible exclusively through admin app on port 3001

**Independent Test**: Login to admin app and navigate to every admin feature - verify all pages load and function correctly

### Implementation for User Story 1

#### Route Migration Tasks

- [x] T010 [P] [US1] Migrate learning cards: Copy apps/website/src/app/admin/learning-cards/ to apps/admin/src/app/admin/learning-cards/
- [x] T011 [P] [US1] Migrate logs: Copy apps/website/src/app/admin/logs/ to apps/admin/src/app/admin/logs/
- [x] T012 [P] [US1] Migrate users: Copy apps/website/src/app/admin/users/ to apps/admin/src/app/admin/users/
- [x] T013 [US1] Handle questions route: Create redirect from apps/admin/src/app/admin/questions/page.tsx to /admin/content/questions

#### API Route Migration

- [x] T014 [P] [US1] Create admin user API: apps/admin/src/app/api/admin/users/route.ts
- [x] T015 [P] [US1] Create learning cards API: apps/admin/src/app/api/admin/learning-cards/route.ts
- [ ] T016 [P] [US1] Create logs API: apps/admin/src/app/api/admin/logs/route.ts (no dedicated API found)
- [x] T017 [P] [US1] Create dashboard stats API: apps/admin/src/app/api/admin/dashboard-stats/route.ts

#### Import and Dependency Updates

- [x] T018 [US1] Update all imports in migrated learning cards to use @elzatona/* packages
- [x] T019 [US1] Update all imports in migrated logs to use @elzatona/* packages
- [x] T020 [US1] Update all imports in migrated users to use @elzatona/* packages
- [x] T021 [US1] Update any hardcoded URLs/paths to admin app structure

#### Duplicate Route Consolidation

- [x] T022 [US1] Compare content routes: Verify apps/admin/src/app/admin/content/ is canonical version
- [x] T023 [US1] Compare content-management routes: Verify apps/admin/src/app/admin/content-management/ is canonical
- [x] T024 [US1] Compare frontend-tasks routes: Verify apps/admin/src/app/admin/frontend-tasks/ is canonical
- [x] T025 [US1] Compare login routes: Verify apps/admin/src/app/admin/login/ is canonical
- [x] T026 [US1] Compare problem-solving routes: Verify apps/admin/src/app/admin/problem-solving/ is canonical

#### Verification

- [x] T027 [US1] Test admin dashboard loads on localhost:3001/admin/dashboard
- [x] T028 [US1] Test users management works on localhost:3001/admin/users
- [x] T029 [US1] Test logs viewing works on localhost:3001/admin/logs
- [x] T030 [US1] Test learning cards CRUD on localhost:3001/admin/learning-cards
- [x] T031 [US1] Test content management on localhost:3001/admin/content
- [x] T032 [US1] Test frontend tasks on localhost:3001/admin/frontend-tasks
- [x] T033 [US1] Test problem solving on localhost:3001/admin/problem-solving
- [x] T034 [US1] Test authentication works on all admin routes

**Checkpoint**: All admin functionality is working in admin app

---

## Phase 4: User Story 2 - Website App Has No Admin Routes (Priority: P1)

**Goal**: Website app has zero admin routes, clean codebase, reduced bundle size

**Independent Test**: Attempt to access any /admin/* route on localhost:3000 and verify 404 or redirect

### Implementation for User Story 2

#### Route Cleanup

- [x] T035 [US2] Delete duplicate content route: Remove apps/website/src/app/admin/content/
- [x] T036 [US2] Delete duplicate content-management: Remove apps/website/src/app/admin/content-management/
- [x] T037 [US2] Delete duplicate frontend-tasks: Remove apps/website/src/app/admin/frontend-tasks/
- [x] T038 [US2] Delete duplicate login route: Remove apps/website/src/app/admin/login/
- [x] T039 [US2] Delete duplicate problem-solving: Remove apps/website/src/app/admin/problem-solving/
- [x] T040 [US2] Delete learning cards route: Remove apps/website/src/app/admin/learning-cards/
- [x] T041 [US2] Delete logs route: Remove apps/website/src/app/admin/logs/
- [x] T042 [US2] Delete users route: Remove apps/website/src/app/admin/users/
- [x] T043 [US2] Delete questions route: Remove apps/website/src/app/admin/questions/
- [x] T044 [US2] Delete entire admin directory: Remove apps/website/src/app/admin/ (kept redirect page)

#### Navigation Cleanup

- [x] T045 [US2] Remove admin navigation from apps/website/src/app/layout.tsx
- [x] T046 [P] [US2] Search and remove any /admin links in website components
- [x] T047 [P] [US2] Remove admin-related conditional UI elements from website app

#### Optional Redirects (if requested)

- [x] T048 [US2] Add redirects in apps/website/next.config.js: /admin/* → admin app URLs
- [x] T049 [US2] Test redirects work from localhost:3000/admin/* to localhost:3001/admin/*

#### Verification

- [x] T050 [US2] Test localhost:3000/admin/dashboard returns 404 or redirects
- [x] T051 [US2] Test localhost:3000/admin/login returns 404 or redirects
- [x] T052 [US2] Test localhost:3000/admin/users returns 404 or redirects
- [x] T053 [US2] Test website app builds with no admin components in bundle
- [x] T054 [US2] Verify website app bundle size decreased by at least 10KB

**Checkpoint**: Website app has no admin routes

---

## Phase 5: User Story 3 - Builds Pass for Both Apps (Priority: P2)

**Goal**: Both admin and website apps build successfully for CI/CD

**Independent Test**: Run build commands for both apps - both must complete with exit code 0

### Implementation for User Story 3

#### Build Verification

- [ ] T055 [P] [US3] Run admin build: `pnpm nx run admin:build` (must succeed)
- [ ] T056 [P] [US3] Run website build: `pnpm nx run website:build` (must succeed)
- [ ] T057 [US3] Run monorepo build: `pnpm nx run-many --target=build --all` (must succeed)
- [ ] T058 [P] [US3] Run TypeScript check for admin: `pnpm nx run admin:type-check`
- [ ] T059 [P] [US3] Run TypeScript check for website: `pnpm nx run website:type-check`

#### Error Resolution

- [ ] T060 [US3] Fix any TypeScript errors in admin app
- [ ] T061 [US3] Fix any TypeScript errors in website app
- [ ] T062 [US3] Fix any import errors after route removal
- [ ] T063 [US3] Fix any missing dependency errors

#### CI/CD Updates

- [ ] T064 [P] [US3] Update CI workflow to build both apps
- [ ] T065 [P] [US3] Update deployment config for separate admin app (if needed)

**Checkpoint**: Both apps build successfully

---

## Phase 6: User Story 4 - No Functionality Loss After Migration (Priority: P2)

**Goal**: All existing admin functionality works exactly as before

**Independent Test**: Execute E2E test suite and manual smoke testing of each admin feature

### Implementation for User Story 4

#### Testing

- [ ] T066 [P] [US4] Run existing E2E tests: `pnpm nx run e2e:test`
- [ ] T067 [P] [US4] Run admin-specific tests if they exist
- [ ] T068 [P] [US4] Run unit tests for migrated components

#### Manual Smoke Testing

- [ ] T069 [US4] Test question creation and editing in admin app
- [ ] T070 [US4] Test user permission updates in admin app
- [ ] T071 [US4] Test learning card CRUD operations
- [ ] T072 [US4] Test log viewing and filtering
- [ ] T073 [US4] Test frontend task management
- [ ] T074 [US4] Test content management workflows
- [ ] T075 [US4] Test problem-solving features

#### Authentication & Authorization

- [ ] T076 [US4] Test admin login flow works
- [ ] T077 [US4] Test unauthorized access is blocked
- [ ] T078 [US4] Test session management works correctly
- [ ] T079 [US4] Test logout flow works

**Checkpoint**: All admin functionality preserved

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and documentation

- [ ] T080 [P] Update README.md with admin app instructions
- [ ] T081 [P] Update project documentation to reflect separation
- [ ] T082 [P] Mark ADMIN_APP_MIGRATION_STATUS.md as COMPLETED
- [ ] T083 [P] Update refactoring-plans/REFACTORING_MANIFEST.md
- [ ] T084 Run final SonarQube quality check
- [ ] T085 Run security scan on both apps
- [ ] T086 Create PR with all changes for review

---

## Dependencies

### User Story Completion Order
1. **Phase 1 & 2** (Setup/Foundation) → **MUST complete before any user stories**
2. **US1** (Admin Features) → Can start after Phase 2
3. **US2** (Website Cleanup) → **MUST wait for US1 completion** (don't delete before migration complete)
4. **US3** (Builds) → Can run after US1, in parallel with US2
5. **US4** (Testing) → **MUST wait for US1 and US2 completion**

### Parallel Execution Examples

**After Phase 2 completion:**
- T010, T011, T012 can run in parallel (different routes)
- T014, T015, T016, T017 can run in parallel (different API routes)
- T022, T023, T024, T025, T026 can run in parallel (independent comparisons)

**After US1 completion:**
- All US2 tasks can run in parallel (they're just deletions)
- T055, T056, T058, T059 can run in parallel (independent builds)

---

## Implementation Strategy

### MVP (Minimum Viable Product)
**Scope**: User Story 1 only
- Admin app has all functionality
- Website app still has duplicate routes
- **Value**: Admins can use dedicated app immediately

### Complete Migration
**Scope**: All user stories
- Admin app exclusive for admin features
- Website app clean of admin code
- **Value**: Clean architecture, reduced maintenance burden

---

## Total Task Count: 86 tasks

### By User Story:
- **Setup/Foundation**: 9 tasks (T001-T009)
- **US1** (Admin Features): 25 tasks (T010-T034)
- **US2** (Website Cleanup): 20 tasks (T035-T054)  
- **US3** (Builds): 11 tasks (T055-T065)
- **US4** (Testing): 14 tasks (T066-T079)
- **Polish**: 7 tasks (T080-T086)

### By Parallelization:
- **Sequential**: 48 tasks
- **Parallel**: 38 tasks
- **Estimated Time Savings**: ~35% when running parallel tasks

### Risk Mitigation:
- US2 tasks wait for US1 completion (no premature deletion)
- Build verification at multiple checkpoints
- Comprehensive testing before marking complete
- Backup created before any destructive operations