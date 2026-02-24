# Feature: Frontend Tasks

## Overview

Frontend Tasks are coding challenges that require writing or debugging HTML, CSS, and JavaScript/TypeScript code. Users are given a problem description and must produce a working implementation. Submissions can be run in-browser for live feedback.

---

## User Flow

1. User navigates to `/frontend-tasks`.
2. A list of challenges is shown with title, difficulty, and completion status.
3. User selects a challenge.
4. Challenge detail page shows: description, requirements, and a code editor or input area.
5. User writes their solution in the editor.
6. User clicks "Run" to execute the code and see the result.
7. User clicks "Submit" when satisfied; evaluation is performed.
8. Pass/fail status is shown with details on failed test cases.

---

## Key Files

| File                                       | Purpose                         |
| ------------------------------------------ | ------------------------------- |
| `apps/website/src/app/frontend-tasks/`     | Frontend tasks pages            |
| `apps/website/src/app/api/frontend-tasks/` | API routes for frontend tasks   |
| `apps/website/src/app/api/code-execution/` | Code compilation & test running |
| `apps/admin/src/app/admin/frontend-tasks/` | Admin UI to create/edit tasks   |
| `libs/types/`                              | Frontend task type definitions  |

---

## API Endpoints

| Method | Route                             | Description                    |
| ------ | --------------------------------- | ------------------------------ |
| `GET`  | `/api/frontend-tasks`             | List all frontend tasks        |
| `GET`  | `/api/frontend-tasks/[id]`        | Get a specific task            |
| `POST` | `/api/code-execution`             | Execute/test submitted code    |
| `POST` | `/api/frontend-tasks/[id]/submit` | Submit and record final answer |

Full Swagger docs: `http://localhost:3000/api-docs` → Frontend Tasks / Code Execution section.

---

## Test Scenarios

### Happy Path

1. **Task list loads** — `/frontend-tasks` lists all tasks with difficulty and status badges.
2. **Task detail opens** — Clicking a task shows the full description and code editor.
3. **Code runs** — "Run" executes the code and shows output or test results.
4. **Passing submission** — All test cases pass; task marked as complete in list.
5. **Partial pass** — Some test cases fail; feedback shows which ones and why.
6. **Already completed** — Completed tasks are marked with a checkmark in the list.

### Edge Cases

7. **Empty code submission** — Shows validation error; not sent to execution engine.
8. **Infinite loop in code** — Execution is time-limited; returns timeout error gracefully.
9. **Syntax error in code** — Execution engine returns parse error; UI shows readable message.
10. **Very large code input** — Handled within size limits; oversized input rejected with clear error.

### Error States

11. **Code execution service unavailable** — Error toast shown; code is not lost from editor.
12. **Task not found** — Invalid ID shows 404 page.
13. **Unauthenticated access** — Redirected to `/auth/login`.
