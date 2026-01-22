# Tasks: Database Abstraction Layer - Full Migration

**Input**: Design documents from `refactoring-plans/specs/database-abstraction.spec.md`
**Prerequisites**: spec.md ✅, DATABASE_ABSTRACTION_FULL_MIGRATION_PLAN.md ✅

**Tests**: Tests are included based on constitution requirement (≥90% coverage for logic)

**Organization**: Tasks grouped by entity type to enable independent implementation

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story/entity this task belongs to (CAT=Category, TOP=Topic, SEC=Section, FLC=Flashcard, PRG=Progress)
- Include exact file paths in descriptions

## Path Conventions

- **Repository Interfaces**: `libs/database/src/repositories/interfaces/`
- **PostgreSQL Adapters**: `libs/database/src/adapters/postgresql/`
- **Website API Routes**: `apps/website/src/app/lib/network/routes/`
- **Admin API Routes**: `apps/admin/src/app/api/admin/`
- **Services**: `apps/website/src/app/lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing infrastructure and prepare for new entities

- [ ] T001 Verify existing repository infrastructure in libs/database/src/repositories/
- [ ] T002 [P] Verify RepositoryFactory has DATABASE_TYPE env support in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T003 [P] Verify PostgreSQLConfig exports in libs/database/src/adapters/postgresql/index.ts

**Checkpoint**: Infrastructure verified - ready for new entity implementation

---

## Phase 2: Foundational (New Repository Interfaces)

**Purpose**: Create all new repository interfaces - MUST complete before adapters

**⚠️ CRITICAL**: No adapter work can begin until all interfaces are defined

### Core Interfaces

- [ ] T004 [P] Create ICategoryRepository interface in libs/database/src/repositories/interfaces/ICategoryRepository.ts
- [ ] T005 [P] Create ITopicRepository interface in libs/database/src/repositories/interfaces/ITopicRepository.ts
- [ ] T006 [P] Create ISectionRepository interface in libs/database/src/repositories/interfaces/ISectionRepository.ts
- [ ] T007 [P] Create IFlashcardRepository interface in libs/database/src/repositories/interfaces/IFlashcardRepository.ts
- [ ] T008 [P] Create IProgressRepository interface in libs/database/src/repositories/interfaces/IProgressRepository.ts
- [ ] T009 Update interfaces index export in libs/database/src/repositories/interfaces/index.ts

**Checkpoint**: All interfaces defined - adapter implementation can begin

---

## Phase 3: User Story 1 - Category Repository (Priority: P1) 🎯 MVP

**Goal**: Enable database-agnostic category operations

**Independent Test**: `curl localhost:3000/api/categories` returns data via repository

### Implementation for Category Repository

- [ ] T010 [P] [CAT] Create PostgreSQLCategoryRepository adapter in libs/database/src/adapters/postgresql/PostgreSQLCategoryRepository.ts
- [ ] T011 [CAT] Add getCategoryRepository() to RepositoryFactory in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T012 [CAT] Export PostgreSQLCategoryRepository in libs/database/src/adapters/postgresql/index.ts
- [ ] T013 [CAT] Migrate website categories route in apps/website/src/app/lib/network/routes/categories/route.ts
- [ ] T014 [CAT] Migrate website categories [id] route in apps/website/src/app/lib/network/routes/categories/[id]/route.ts
- [ ] T015 [CAT] Migrate admin categories route in apps/website/src/app/lib/network/routes/admin/categories/route.ts

**Checkpoint**: Category operations work via repository pattern

---

## Phase 4: User Story 2 - Topic Repository (Priority: P1)

**Goal**: Enable database-agnostic topic operations

**Independent Test**: `curl localhost:3000/api/topics` returns data via repository

### Implementation for Topic Repository

- [ ] T016 [P] [TOP] Create PostgreSQLTopicRepository adapter in libs/database/src/adapters/postgresql/PostgreSQLTopicRepository.ts
- [ ] T017 [TOP] Add getTopicRepository() to RepositoryFactory in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T018 [TOP] Export PostgreSQLTopicRepository in libs/database/src/adapters/postgresql/index.ts
- [ ] T019 [TOP] Migrate website topics route in apps/website/src/app/lib/network/routes/topics/[id]/route.ts
- [ ] T020 [TOP] Migrate admin topics route in apps/website/src/app/lib/network/routes/admin/topics/route.ts
- [ ] T021 [TOP] Migrate admin topics [id] route in apps/website/src/app/lib/network/routes/admin/topics/[topicId]/route.ts
- [ ] T022 [TOP] Migrate admin topics initialize route in apps/website/src/app/lib/network/routes/admin/topics/initialize/route.ts

**Checkpoint**: Topic operations work via repository pattern

---

## Phase 5: User Story 3 - Section Repository (Priority: P2)

**Goal**: Enable database-agnostic section operations

**Independent Test**: `curl localhost:3000/api/sections` returns data via repository

### Implementation for Section Repository

- [ ] T023 [P] [SEC] Create PostgreSQLSectionRepository adapter in libs/database/src/adapters/postgresql/PostgreSQLSectionRepository.ts
- [ ] T024 [SEC] Add getSectionRepository() to RepositoryFactory in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T025 [SEC] Export PostgreSQLSectionRepository in libs/database/src/adapters/postgresql/index.ts
- [ ] T026 [SEC] Migrate website sections route in apps/website/src/app/lib/network/routes/sections/route.ts
- [ ] T027 [SEC] Migrate guided-learning sections route in apps/website/src/app/lib/network/routes/guided-learning/plans/[planId]/sections/route.ts
- [ ] T028 [SEC] Migrate guided-learning section [id] route in apps/website/src/app/lib/network/routes/guided-learning/plans/[planId]/sections/[sectionId]/route.ts

**Checkpoint**: Section operations work via repository pattern

---

## Phase 6: User Story 4 - Flashcard Repository (Priority: P2)

**Goal**: Enable database-agnostic flashcard operations

**Independent Test**: `curl localhost:3000/api/flashcards?user_id=xxx` returns data via repository

### Implementation for Flashcard Repository

- [ ] T029 [P] [FLC] Create PostgreSQLFlashcardRepository adapter in libs/database/src/adapters/postgresql/PostgreSQLFlashcardRepository.ts
- [ ] T030 [FLC] Add getFlashcardRepository() to RepositoryFactory in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T031 [FLC] Export PostgreSQLFlashcardRepository in libs/database/src/adapters/postgresql/index.ts
- [ ] T032 [FLC] Migrate website flashcards route in apps/website/src/app/lib/network/routes/flashcards/route.ts
- [ ] T033 [FLC] Migrate website flashcards [id] route in apps/website/src/app/lib/network/routes/flashcards/[id]/route.ts
- [ ] T034 [FLC] Migrate supabase-flashcards.ts service in apps/website/src/app/lib/supabase-flashcards.ts

**Checkpoint**: Flashcard operations work via repository pattern

---

## Phase 7: User Story 5 - Progress Repository (Priority: P2)

**Goal**: Enable database-agnostic progress tracking

**Independent Test**: `curl localhost:3000/api/progress/get?user_id=xxx` returns data via repository

### Implementation for Progress Repository

- [ ] T035 [P] [PRG] Create PostgreSQLProgressRepository adapter in libs/database/src/adapters/postgresql/PostgreSQLProgressRepository.ts
- [ ] T036 [PRG] Add getProgressRepository() to RepositoryFactory in libs/database/src/repositories/RepositoryFactory.ts
- [ ] T037 [PRG] Export PostgreSQLProgressRepository in libs/database/src/adapters/postgresql/index.ts
- [ ] T038 [PRG] Migrate progress save route in apps/website/src/app/lib/network/routes/progress/save/route.ts
- [ ] T039 [PRG] Migrate progress get route in apps/website/src/app/lib/network/routes/progress/get/route.ts
- [ ] T040 [PRG] Migrate free-style sync route in apps/website/src/app/lib/network/routes/progress/free-style/sync/route.ts
- [ ] T041 [PRG] Migrate guided-learning sync route in apps/website/src/app/lib/network/routes/progress/guided-learning/sync/route.ts
- [ ] T042 [PRG] Migrate guided-learning load route in apps/website/src/app/lib/network/routes/progress/guided-learning/load/route.ts
- [ ] T043 [PRG] Migrate supabase-progress.ts service in apps/website/src/app/lib/supabase-progress.ts

**Checkpoint**: Progress tracking works via repository pattern

---

## Phase 8: Questions & Plans Route Migration (Priority: P1)

**Goal**: Migrate remaining high-traffic routes to repository pattern

### Implementation for Questions Routes

- [ ] T044 [P] Migrate unified questions route in apps/website/src/app/lib/network/routes/questions/unified/route.ts
- [ ] T045 [P] Migrate unified questions [id] route in apps/website/src/app/lib/network/routes/questions/unified/[id]/route.ts
- [ ] T046 [P] Migrate questions by-topic route in apps/website/src/app/lib/network/routes/questions/by-topic/[topicId]/route.ts
- [ ] T047 [P] Migrate questions by-learning-path route in apps/website/src/app/lib/network/routes/questions/by-learning-path/[learningPath]/route.ts
- [ ] T048 [P] Migrate questions [id] route in apps/website/src/app/lib/network/routes/questions/[id]/route.ts
- [ ] T049 [P] Migrate questions add route in apps/website/src/app/lib/network/routes/questions/add/route.ts
- [ ] T050 [P] Migrate questions count route in apps/website/src/app/lib/network/routes/questions/count/route.ts
- [ ] T051 [P] Migrate questions stats route in apps/website/src/app/lib/network/routes/questions/stats/route.ts

### Implementation for Plans Routes

- [ ] T052 [P] Migrate plans route in apps/website/src/app/lib/network/routes/plans/route.ts
- [ ] T053 [P] Migrate plans [id] route in apps/website/src/app/lib/network/routes/plans/[id]/route.ts
- [ ] T054 [P] Migrate plans categories route in apps/website/src/app/lib/network/routes/plans/[id]/categories/route.ts
- [ ] T055 [P] Migrate plans topics route in apps/website/src/app/lib/network/routes/plans/[id]/topics/route.ts
- [ ] T056 [P] Migrate plans questions route in apps/website/src/app/lib/network/routes/plans/[id]/questions/route.ts

**Checkpoint**: All high-traffic routes migrated

---

## Phase 9: Cards & Learning Paths Migration (Priority: P2)

**Goal**: Migrate cards and learning paths routes

### Implementation for Cards Routes

- [ ] T057 [P] Migrate cards route in apps/website/src/app/lib/network/routes/cards/route.ts
- [ ] T058 [P] Migrate cards [id] route in apps/website/src/app/lib/network/routes/cards/[id]/route.ts
- [ ] T059 [P] Migrate cards categories route in apps/website/src/app/lib/network/routes/cards/[id]/categories/route.ts
- [ ] T060 [P] Migrate admin learning-cards route in apps/website/src/app/lib/network/routes/admin/learning-cards/route.ts
- [ ] T061 [P] Migrate admin learning-cards [id] route in apps/website/src/app/lib/network/routes/admin/learning-cards/[id]/route.ts

### Implementation for Learning Paths Routes

- [ ] T062 [P] Migrate learning-paths route in apps/website/src/app/lib/network/routes/learning-paths/route.ts
- [ ] T063 [P] Migrate learning-paths [id] route in apps/website/src/app/lib/network/routes/learning-paths/[id]/route.ts
- [ ] T064 [P] Migrate guided-learning plans route in apps/website/src/app/lib/network/routes/guided-learning/plans/route.ts
- [ ] T065 [P] Migrate guided-learning plans [id] route in apps/website/src/app/lib/network/routes/guided-learning/plans/[planId]/route.ts

**Checkpoint**: Cards and learning paths migrated

---

## Phase 10: Admin Routes Migration (Priority: P2)

**Goal**: Migrate remaining admin routes

- [ ] T066 [P] Migrate admin stats route in apps/website/src/app/lib/network/routes/admin/stats/route.ts
- [ ] T067 [P] Migrate admin create route in apps/website/src/app/lib/network/routes/admin/create/route.ts
- [ ] T068 [P] Migrate admin auth route in apps/website/src/app/lib/network/routes/admin/auth/route.ts
- [ ] T069 [P] Migrate admin clear-questions route in apps/website/src/app/lib/network/routes/admin/clear-questions/route.ts
- [ ] T070 [P] Migrate admin create-missing-plans route in apps/website/src/app/lib/network/routes/admin/create-missing-plans/route.ts
- [ ] T071 [P] Migrate admin update-learning-paths route in apps/website/src/app/lib/network/routes/admin/update-learning-paths/route.ts
- [ ] T072 [P] Migrate admin plan-questions route in apps/website/src/app/lib/network/routes/admin/plan-questions/route.ts
- [ ] T073 [P] Migrate admin frontend-tasks route in apps/website/src/app/lib/network/routes/admin/frontend-tasks/route.ts
- [ ] T074 [P] Migrate admin problem-solving route in apps/website/src/app/lib/network/routes/admin/problem-solving/route.ts
- [ ] T075 [P] Migrate admin problem-solving [id] route in apps/website/src/app/lib/network/routes/admin/problem-solving/[id]/route.ts

**Checkpoint**: All admin routes migrated

---

## Phase 11: Services Migration (Priority: P3)

**Goal**: Migrate shared service files to use repository pattern

- [ ] T076 [P] Migrate supabase-questions.ts in apps/website/src/app/lib/supabase-questions.ts
- [ ] T077 [P] Migrate unified-question-schema.ts in apps/website/src/app/lib/unified-question-schema.ts
- [ ] T078 [P] Migrate admin-auth.ts in apps/website/src/app/lib/admin-auth.ts
- [ ] T079 [P] Migrate user-auth.ts in apps/website/src/app/lib/user-auth.ts
- [ ] T080 [P] Migrate content-versioning-service.ts in apps/website/src/app/lib/content-versioning-service.ts
- [ ] T081 [P] Migrate bulk-operations-service.ts in apps/website/src/app/lib/bulk-operations-service.ts
- [ ] T082 [P] Migrate auto-linking-service.ts in apps/website/src/app/lib/auto-linking-service.ts
- [ ] T083 [P] Migrate learning-cards-service.ts in apps/website/src/app/lib/learning-cards-service.ts
- [ ] T084 [P] Migrate plan-questions-service.ts in apps/website/src/app/lib/plan-questions-service.ts
- [ ] T085 [P] Migrate error-logging-service.ts in apps/website/src/app/lib/error-logging-service.ts

**Checkpoint**: All services migrated

---

## Phase 12: User Routes & Dashboard Migration (Priority: P3)

**Goal**: Migrate user-specific and dashboard routes

- [ ] T086 [P] Migrate user learning-plans route in apps/website/src/app/lib/network/routes/user/learning-plans/route.ts
- [ ] T087 [P] Migrate user preferences route in apps/website/src/app/lib/network/routes/user/preferences/route.ts
- [ ] T088 [P] Migrate dashboard stats route in apps/website/src/app/lib/network/routes/dashboard/stats/route.ts

**Checkpoint**: User and dashboard routes migrated

---

## Phase 13: Hooks & Components Migration (Priority: P3)

**Goal**: Migrate hooks and components with direct Supabase usage

- [ ] T089 Migrate useLearningCards hook in apps/admin/src/app/admin/learning-cards/hooks/useLearningCards.ts
- [ ] T090 [P] Migrate LearningTypeContext in apps/website/src/context/LearningTypeContext.tsx
- [ ] T091 [P] Migrate EnhancedDashboard component in libs/common-ui/src/common/EnhancedDashboard.tsx
- [ ] T092 [P] Migrate problem-solving page in apps/website/src/app/problem-solving/page.tsx
- [ ] T093 [P] Migrate problem-solving [id] page in apps/website/src/app/problem-solving/[id]/page.tsx

**Checkpoint**: All hooks and components migrated

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and verification

- [ ] T094 Remove legacy get-supabase-client.ts in apps/website/src/app/lib/get-supabase-client.ts
- [ ] T095 Remove legacy supabase-client.ts in apps/website/src/app/lib/supabase-client.ts
- [ ] T096 Remove legacy supabase.ts in apps/website/src/app/lib/supabase.ts
- [ ] T097 Remove legacy admin supabase-client.ts in apps/admin/src/lib/supabase-client.ts
- [ ] T098 [P] Update package.json to remove direct Supabase deps from apps
- [ ] T099 [P] Run TypeScript check: npx tsc --noEmit
- [ ] T100 [P] Run ESLint check: npx eslint . --max-warnings=0
- [ ] T101 Run full test suite to verify no regressions
- [ ] T102 Update documentation in docs/DATABASE_ABSTRACTION_IMPLEMENTATION.md
- [ ] T103 Create PR from feature/database-abstraction-layer to develop

**Checkpoint**: Migration complete, all quality gates pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - verify existing infrastructure
- **Phase 2 (Interfaces)**: Depends on Phase 1 - BLOCKS all adapter phases
- **Phases 3-7 (Entity Repos)**: Depend on Phase 2, can run in parallel
- **Phases 8-12 (Route Migration)**: Depend on entity repos being complete
- **Phase 13 (Hooks/Components)**: Depend on repositories being available
- **Phase 14 (Cleanup)**: Depends on ALL other phases complete

### Entity Repository Dependencies

- **Category (Phase 3)**: Can start immediately after Phase 2
- **Topic (Phase 4)**: Can start immediately after Phase 2
- **Section (Phase 5)**: Can start immediately after Phase 2
- **Flashcard (Phase 6)**: Can start immediately after Phase 2
- **Progress (Phase 7)**: Can start immediately after Phase 2

### Parallel Opportunities Per Phase

```bash
# Phase 2: All interface files in parallel
T004, T005, T006, T007, T008

# Phase 3-7: Adapter creation can happen in parallel across entities
T010 (CAT), T016 (TOP), T023 (SEC), T029 (FLC), T035 (PRG)

# Phase 8: All question routes in parallel
T044, T045, T046, T047, T048, T049, T050, T051

# Phase 9-12: All routes marked [P] can run in parallel
```

---

## Implementation Strategy

### MVP First (Phases 1-4)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: All interfaces
3. Complete Phase 3: Category Repository
4. Complete Phase 4: Topic Repository
5. **STOP and VALIDATE**: Test categories and topics work
6. Deploy/demo basic functionality

### Incremental Delivery

1. Interfaces + Category + Topic → Basic entity support
2. Add Section + Flashcard + Progress → Full entity coverage
3. Migrate high-traffic routes → Core functionality migrated
4. Migrate remaining routes → Complete migration
5. Cleanup legacy files → Clean codebase

### Parallel Team Strategy

With 3 developers after Phase 2:

- Developer A: Category + Topic repos (Phases 3-4)
- Developer B: Section + Flashcard repos (Phases 5-6)
- Developer C: Progress repo + Question routes (Phases 7-8)

---

## Summary

| Phase     | Tasks         | Focus            | Estimated Time |
| --------- | ------------- | ---------------- | -------------- |
| 1         | T001-T003     | Setup            | 30 min         |
| 2         | T004-T009     | Interfaces       | 1.5 hours      |
| 3         | T010-T015     | Category         | 2 hours        |
| 4         | T016-T022     | Topic            | 2 hours        |
| 5         | T023-T028     | Section          | 1.5 hours      |
| 6         | T029-T034     | Flashcard        | 1.5 hours      |
| 7         | T035-T043     | Progress         | 2.5 hours      |
| 8         | T044-T056     | Questions/Plans  | 3 hours        |
| 9         | T057-T065     | Cards/Paths      | 2 hours        |
| 10        | T066-T075     | Admin            | 2.5 hours      |
| 11        | T076-T085     | Services         | 2.5 hours      |
| 12        | T086-T088     | User/Dashboard   | 1 hour         |
| 13        | T089-T093     | Hooks/Components | 1.5 hours      |
| 14        | T094-T103     | Polish           | 2 hours        |
| **Total** | **103 tasks** |                  | **~25 hours**  |

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] labels: CAT=Category, TOP=Topic, SEC=Section, FLC=Flashcard, PRG=Progress
- Each entity repository can be completed and tested independently
- Commit after each phase completion
- Run `npx tsc --noEmit` after each adapter to verify compilation
- Test API routes with curl after migration
