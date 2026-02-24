# Feature: Problem Solving

## Overview

Problem Solving provides algorithmic and data-structure challenges similar to LeetCode-style questions. Users read a problem statement, write or select a solution, and receive automated evaluation. This feature targets backend/algorithmic interview preparation.

---

## User Flow

1. User navigates to `/problem-solving`.
2. A list of problems is shown with difficulty, tags, and completion status.
3. User selects a problem.
4. Problem detail page shows: description, constraints, examples, and an answer input.
5. User submits a solution.
6. The system evaluates the submission and returns pass/fail with feedback.
7. User can view submitted solutions and compare with reference answers.

---

## Key Files

| File                                        | Purpose                                                   |
| ------------------------------------------- | --------------------------------------------------------- |
| `apps/website/src/app/problem-solving/`     | Problem-solving pages                                     |
| `apps/website/src/app/api/questions/`       | Shared question API (problem-solving uses `type=problem`) |
| `apps/admin/src/app/admin/problem-solving/` | Admin UI to create/edit problems                          |
| `libs/shared-data/`                         | Shared data layer                                         |
| `libs/types/`                               | `UnifiedQuestion`, problem-solving-specific types         |

---

## API Endpoints

| Method | Route                         | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| `GET`  | `/api/questions?type=problem` | List problem-solving questions |
| `GET`  | `/api/questions/[id]`         | Get a specific problem         |
| `POST` | `/api/questions/validate`     | Submit and evaluate a solution |

Full Swagger docs: `http://localhost:3000/api-docs` → Questions section.

---

## Test Scenarios

### Happy Path

1. **Problem list loads** — Shows all problems with difficulty badges and completion indicators.
2. **Problem detail opens** — Clicking a problem opens the full problem page with description and input.
3. **Correct submission** — Submitting the right answer shows a success state.
4. **Wrong submission** — Submitting the wrong answer shows failure with hints or correct answer.
5. **Previously solved** — Solved problems are marked in the list; user can still re-submit.
6. **Filter by difficulty** — List filters to easy/medium/hard correctly.
7. **Filter by tag** — Tag filter narrows the problem list.

### Edge Cases

8. **Empty answer submission** — Submit is blocked or returns a validation error.
9. **Very long answer** — Handled gracefully; no server error on extremely long inputs.
10. **No problems in category** — Empty state shown (not a crash or blank page).

### Error States

11. **Validation API fails** — Error toast shown; previous submission state retained.
12. **Problem not found** — Invalid ID shows 404 page.
13. **Unauthenticated access** — Redirected to `/auth/login`.
