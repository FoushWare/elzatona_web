# Implementation Plan: Frontend Task Detail

**Branch**: `004-frontend-task-detail` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-frontend-task-detail/spec.md`

## Summary

Implement a reusable, testable, and accessible frontend task detail page for authoring and running coding tasks. The page will display task metadata (title, difficulty, author, tags, estimated time), provide a multi-file code editor with run/reset/solution actions, and follow Atomic Design patterns. Components will be developed in `libs/common-ui` and consumed by the website app at `/frontend-tasks/[id]`.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+, Next.js 15+ (App Router)  
**Primary Dependencies**: React, Next.js, Monaco Editor (or CodeMirror), Tailwind CSS, @elzatona/common-ui, @elzatona/types  
**Storage**: Supabase (PostgreSQL) via @elzatona/database repository pattern  
**Testing**: Vitest for unit tests, React Testing Library for component tests, Playwright for E2E  
**Target Platform**: Web (modern browsers - Chrome, Firefox, Safari, Edge)  
**Project Type**: Web (Nx Monorepo)  
**Performance Goals**: Initial page render < 1s with backend response < 200ms  
**Constraints**: No `any` types, WCAG AA accessibility compliance, < 500KB JS bundle for the page  
**Scale/Scope**: Single page feature, 8-12 new components, integration with existing FrontendTask type

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Spec-Driven**: Feature has a detailed spec in `specs/004-frontend-task-detail/spec.md`
- [x] **Testable**: Plan includes unit testing strategy with ≥ 90% coverage target for component logic
- [x] **Strict Types**: No `any` types planned; strict mode enabled; using `FrontendTask` from `@elzatona/types`
- [x] **Security**: User inputs sanitized before execution; no eval(); no secrets in frontend
- [x] **Predictable**: 5 functional requirements mapped to implementation tasks via stable keys

## Project Structure

### Documentation (this feature)

```text
specs/004-frontend-task-detail/
├── plan.md              # This file
├── research.md          # Phase 0 output - technology decisions
├── data-model.md        # Phase 1 output - data entities
├── quickstart.md        # Phase 1 output - developer guide
├── contracts/           # Phase 1 output - API contracts
│   └── frontend-tasks-api.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
# Nx Monorepo Structure
apps/
├── website/
│   ├── src/
│   │   ├── app/
│   │   │   └── frontend-tasks/
│   │   │       └── [id]/
│   │   │           └── page.tsx        # Main page component
│   │   └── components/
│   │       └── frontend-tasks/
│   │           └── TaskDetailPage.tsx  # Page organism
│   └── project.json
libs/
├── common-ui/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── atoms/
│   │   │   │   ├── DifficultyBadge.tsx
│   │   │   │   └── TagChip.tsx
│   │   │   ├── molecules/
│   │   │   │   ├── TaskMetadata.tsx
│   │   │   │   ├── TaskDescription.tsx
│   │   │   │   └── FileTab.tsx
│   │   │   └── organisms/
│   │   │       ├── TaskSidebar.tsx
│   │   │       ├── CodeEditor.tsx
│   │   │       └── ConsoleOutput.tsx
│   │   └── index.ts                   # Exports all components
│   └── project.json
├── types/
│   └── src/
│       └── frontend-task.ts           # FrontendTask type (extend if needed)
└── database/
    └── src/
        └── repositories/
            └── FrontendTaskRepository.ts  # API integration
```

**Structure Decision**: Following existing Nx monorepo patterns. New UI components go in `libs/common-ui` following Atomic Design. The page route lives in `apps/website` under `/frontend-tasks/[id]`. Reusing existing repository pattern from `libs/database` for API calls.

## Complexity Tracking

> No constitution violations identified. All requirements map to standard patterns.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       | N/A        | N/A                                  |

## Phase 0 Output

See [research.md](./research.md) for technology decisions and alternatives evaluated.

## Phase 1 Output

- [data-model.md](./data-model.md) - Entity definitions and validation rules
- [contracts/frontend-tasks-api.yaml](./contracts/frontend-tasks-api.yaml) - OpenAPI specification
- [quickstart.md](./quickstart.md) - Developer implementation guide

## Requirement Traceability

| Requirement Key                              | User Story | Components Affected                            |
| -------------------------------------------- | ---------- | ---------------------------------------------- |
| requirement:user-can-view-task               | US1        | TaskMetadata, DifficultyBadge, TaskDescription |
| requirement:user-can-browse-files            | US2        | TaskSidebar, FileTab                           |
| requirement:user-can-edit-code               | US2        | CodeEditor                                     |
| requirement:user-can-run-reset-and-view-solution | US3    | ActionBar, ConsoleOutput, SolutionPanel        |
| requirement:ui-accessibility                 | US1-3      | All components (ARIA, keyboard nav, contrast)  |
| requirement:export-surface                   | All        | libs/common-ui/src/index.ts                    |
