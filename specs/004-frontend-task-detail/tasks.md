# Frontend Task Detail Page - Tasks

## Feature: Frontend Task Detail

**Route**: `/frontend-tasks/[id]`  
**Priority**: High  
**Phase**: 3 (Learning Features)

---

## Phase 1: Setup

 - [X] T001 Create feature branch `004-frontend-task-detail` from `develop`
- [X] T002 Create atoms directory if not exists at `libs/common-ui/src/atoms/`
- [X] T003 Create molecules directory if not exists at `libs/common-ui/src/molecules/`
- [X] T004 Create organisms directory if not exists at `libs/common-ui/src/organisms/`

## Phase 2: Foundational - Atoms (must complete before molecules)

- [X] T005 [P] Create DifficultyBadge atom in `libs/common-ui/src/atoms/DifficultyBadge.tsx`
  - Props: `difficulty: "easy" | "medium" | "hard"`, `className?: string`
  - Styles: green (easy), yellow (medium), red (hard)
  - Max 30 lines

## Phase 3: User Story 1 - Task Information Display

**Goal**: User can view task metadata and description  
**Test**: Navigate to `/frontend-tasks/[id]` and verify title, difficulty, time, author, tags display

- [X] T006 [US1] Create TaskMetadata molecule in `libs/common-ui/src/molecules/TaskMetadata.tsx`
  - Props: difficulty, estimatedTime, author, company?, category, tags
  - Uses: DifficultyBadge, Badge, Clock/User/Building2/Tag icons
  - Max 80 lines

- [X] T007 [US1] Create TaskDescription molecule in `libs/common-ui/src/molecules/TaskDescription.tsx`
  - Props: description, requirements, hints
  - Features: collapsible hints section, click-to-reveal individual hints
  - Uses: Card, CardContent, CardHeader, Button, Lightbulb/ChevronDown icons
  - Max 100 lines

## Phase 4: User Story 2 - Code Editing Experience

**Goal**: User can view and edit code files for the task  
**Test**: Select different files in sidebar, edit code, verify changes persist in state

- [X] T008 [US2] Create TaskSidebar organism in `libs/common-ui/src/organisms/TaskSidebar.tsx`
  - Props: files, activeFileId, onFileSelect, onRun, onReset, onShowSolution, isRunning?
  - Features: Run/Reset/Solution buttons, file explorer with icons
  - Max 150 lines

- [X] T009 [US2] Create TaskCodeEditor organism in `libs/common-ui/src/organisms/TaskCodeEditor.tsx`
  - Props: files, activeFileId, onFileChange
  - Features: file tab header, textarea editor (upgrade to Monaco later)
  - Max 150 lines

## Phase 5: User Story 3 - Complete Page Integration

**Goal**: User can access full task detail page with all features  
**Test**: Load page, verify all sections render, test run/reset/solution actions

- [X] T010 [US3] Export all new components in `libs/common-ui/src/index.ts`
  - Add: DifficultyBadge, TaskMetadata, TaskDescription, TaskSidebar, TaskCodeEditor

- [X] T011 [US3] Create API route in `apps/website/src/app/api/frontend-tasks/[id]/route.ts`
  - GET handler: fetch single task by ID from repository
  - Return: `{ success: true, data: FrontendTask }` or error

- [X] T012 [US3] Implement page in `apps/website/src/app/frontend-tasks/[id]/page.tsx`
  - State: task, files, activeFileId, isRunning, showSolution
  - Layout: 3-column grid (description | editor | sidebar)
  - Features: fetch task, file editing, reset, show solution
  - Max 200 lines

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T013 [P] Add loading skeleton states to page component
- [ ] T014 [P] Add error boundary and not-found handling
- [X] T015 [P] Verify dark mode support in all components
- [X] T016 [P] Add aria-labels and keyboard navigation to TaskSidebar
- [X] T017 Run `npm run format` on all new files
- [X] T018 Run `npm run lint` and fix any issues
- [X] T019 Run `npm run type-check` and fix any type errors
- [X] T020 Run `npm run build` to verify no build errors

## Phase 7: Testing (if requested)

- [ ] T021 [P] Create unit test for DifficultyBadge in `libs/common-ui/src/atoms/DifficultyBadge.test.tsx`
- [ ] T022 [P] Create unit test for TaskMetadata in `libs/common-ui/src/molecules/TaskMetadata.test.tsx`
- [ ] T023 [P] Create unit test for TaskDescription in `libs/common-ui/src/molecules/TaskDescription.test.tsx`
- [ ] T024 [P] Create unit test for TaskSidebar in `libs/common-ui/src/organisms/TaskSidebar.test.tsx`
- [ ] T025 [P] Create unit test for TaskCodeEditor in `libs/common-ui/src/organisms/TaskCodeEditor.test.tsx`
- [ ] T026 Create integration test for page data loading

---

## Dependencies

```
T001 → T002, T003, T004
T005 → T006
T006, T007 → T010
T008, T009 → T010
T010, T011 → T012
T012 → T013, T014, T015, T016
T017, T018, T019 → T020
```

## Parallel Execution Examples

**Batch 1** (after T001-T004):

- T005 (DifficultyBadge)

**Batch 2** (after T005):

- T006 (TaskMetadata) + T007 (TaskDescription) + T008 (TaskSidebar) + T009 (TaskCodeEditor)

**Batch 3** (after Batch 2):

- T010 (exports) + T011 (API route)

**Batch 4** (after Batch 3):

- T012 (page)

**Batch 5** (after T012):

- T013 + T014 + T015 + T016 (all parallel polish tasks)

---

## Implementation Strategy

1. **MVP Scope**: T001-T012 (core functionality)
2. **Polish**: T013-T020 (quality gates)
3. **Tests**: T021-T026 (optional, add if time permits)

## File Paths Summary

| Task | File Path                                               |
| ---- | ------------------------------------------------------- |
| T005 | `libs/common-ui/src/atoms/DifficultyBadge.tsx`          |
| T006 | `libs/common-ui/src/molecules/TaskMetadata.tsx`         |
| T007 | `libs/common-ui/src/molecules/TaskDescription.tsx`      |
| T008 | `libs/common-ui/src/organisms/TaskSidebar.tsx`          |
| T009 | `libs/common-ui/src/organisms/TaskCodeEditor.tsx`       |
| T010 | `libs/common-ui/src/index.ts`                           |
| T011 | `apps/website/src/app/api/frontend-tasks/[id]/route.ts` |
| T012 | `apps/website/src/app/frontend-tasks/[id]/page.tsx`     |

---

## Implementation Reference

See [implementation-guide.md](./implementation-guide.md) for complete code samples for each task.
