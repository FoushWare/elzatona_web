# Frontend Task Detail — Specification

## Overview / Context
Implement a reusable, testable, and accessible frontend task detail page for authoring and running coding tasks. The page displays task metadata and description, provides a code editor with multiple files, and offers run/reset/solution actions. This feature will live at `/frontend-tasks/[id]` and use shared UI primitives in `libs/common-ui` and the `FrontendTask` type in `libs/types`.

## Goals
- Present task information clearly (title, author, difficulty, tags, estimated time).
- Provide an in-browser editable code area with per-file editing, run/reset, and solution reveal.
- Keep components small (atoms/molecules/organisms) and testable with TypeScript strict typing.

## Functional Requirements
Each requirement has a stable key for traceability.

- requirement:user-can-view-task
  - The user can fetch and view a `FrontendTask` by ID, including title, difficulty, estimatedTime, author, tags, and description. (API: GET `/api/frontend-tasks/:id`)

- requirement:user-can-browse-files
  - The user can see a file list for the task and select a file; selecting a file loads its content into the editor.

- requirement:user-can-edit-code
  - The user can edit file contents in the browser; edits are kept in component state until persisted by an explicit action.

- requirement:user-can-run-reset-and-view-solution
  - The user can run the task (simulated or real runner), reset code to initial state, and toggle a solution view for reference.

- requirement:ui-accessibility
  - All interactive elements must be keyboard operable, have ARIA attributes where applicable, and meet WCAG AA contrast for badges/labels.

- requirement:export-surface
  - All new components must be exported from `libs/common-ui/src/index.ts` so other apps can consume them.

## Non-Functional Requirements
- nfr:performance
  - Initial page render should be < 1s on a reasonably modern dev machine network if backend responds within 200ms.
- nfr:typesafety
  - No `any` in new code; TypeScript `strict` must be preserved; `FrontendTask` type from `libs/types` must be used for API and UI models.
- nfr:quality-gates
  - Unit test coverage target: 90% for logic inside new components; SonarQube quality gate must pass before merge.
- nfr:security
  - No secrets or unsafe eval; user inputs sanitized before any execution environment.

## User Stories & Acceptance Criteria

- US1 — View Task Metadata
  - As a user, I want to view the task title and metadata so I can decide whether to attempt it.
  - Acceptance:
    - Fetching `/api/frontend-tasks/:id` returns 200 and a `FrontendTask` JSON object.
    - UI shows title, difficulty (via `DifficultyBadge`), estimated time (human readable), author name, company (if present), category, and tags.
    - If metadata is missing, show sensible defaults and an inline help tooltip.

- US2 — Edit Files In-Browser
  - As a user, I want to open files, edit code, and switch files without losing state.
  - Acceptance:
    - Clicking a filename loads its content into the editor area.
    - Edits are preserved when switching between files until the user hits `Reset`.
    - The editor displays line numbers and a monospace font; changes trigger an `onChange` callback with `{ fileId, content }`.

- US3 — Run / Reset / Show Solution
  - As a user, I want to execute the task (or a simulated runner), reset to starter code, and reveal a solution.
  - Acceptance:
    - `Run` triggers an action that returns a result payload shown in a console area.
    - `Reset` restores the file contents to the initial provided versions.
    - `Show Solution` toggles a read-only solution view; it does not overwrite user edits unless the user explicitly accepts.

## Data Model (example)
Use the `FrontendTask` shape in `libs/types`; if missing fields are required, extend the type with backward-compatible optional fields.

Example shape (for clarity):
```
FrontendTask {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTimeMinutes?: number;
  author: { id: string; name: string; company?: string };
  category?: string;
  tags: string[];
  files: Array<{ id: string; path: string; language?: string; content: string; starterContent?: string; solutionContent?: string }>;
  description: string;
}
```

## Edge Cases
- Missing `files` array: show a helpful message and disable editor controls.
- Large file content (>100KB): warn and prevent editing in the browser; provide a download link.
- Network failure fetching task: show retry CTA and a user-friendly error message.

## API Contract
- GET `/api/frontend-tasks/:id` -> 200 `{ success: true, data: FrontendTask }` or 404/4xx error object.
- No mutation endpoints are required for MVP; persistence is out-of-scope for initial iteration.

## Testing & Quality Gates
- Add unit tests for `DifficultyBadge`, `TaskMetadata`, `TaskDescription` logic and `TaskSidebar` interactions.
- Add an integration test verifying page fetch and render of key metadata.
- Run `npm run format`, `npm run lint`, `npm run type-check`, `npm run test`, and `npm run build` in CI.

## Implementation Notes / References
- Follow Atomic Design (Atoms → Molecules → Organisms) and keep files short (refer to `tasks.md` line limits).
- Reference implementation examples in `implementation-guide.md` (co-located in this feature directory).
- Export all components via `libs/common-ui/src/index.ts`.

## Traceability
- Link functional requirements to tasks in `tasks.md` using the stable keys above (e.g., `requirement:user-can-view-task` → `T006/T007/T010/T012`).

---

For any changes to the spec, update this file and rerun `/speckit.analyze` to validate coverage and constitution alignment.
