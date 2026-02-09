# Tasks: Learning Cards Admin

**Input**: Implementation plan from `.github/plans/admin-learning-cards/plan.md`
**Prerequisites**: plan.md (required), spec.md (required)

## Phase 1: Setup & Infrastructure

- [ ] T001 Create page directory: `apps/admin/src/app/admin/learning-cards`
- [ ] T002 Create hooks directory: `apps/admin/src/app/admin/learning-cards/hooks`
- [ ] T003 Ensure all types are imported correctly from `@elzatona/types`

## Phase 2: Data Hook Implementation

- [ ] T004 Implement `useLearningCards` hook for data fetching
- [ ] T005 Add hierarchy expansion logic (Cards -> Categories -> Topics)
- [ ] T006 Implement mutation handlers (Create, Update, Delete) for Cards
- [ ] T007 Implement mutation handlers for Categories and Topics

## Phase 3: Page Implementation

- [ ] T008 Implement `LearningCardsPage` shell and layout
- [ ] T009 Integrate `LearningCardsManager` with `useLearningCards` data
- [ ] T010 Implement `CardFormModal` for creating/editing cards
- [ ] T011 Implement delete confirmation dialogs

## Phase 4: Verification & Polish

- [ ] T012 Run type-check and address any strict mode violations
- [ ] T013 Run linting and formatting
- [ ] T014 Perform manual CRUD verification on all levels
- [ ] T015 Verify navigation from Admin Dashboard
