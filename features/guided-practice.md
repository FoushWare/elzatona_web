# Feature: Guided Practice

## Overview

Guided Practice provides structured, plan-based learning sessions for developers preparing for technical interviews. Users follow a pre-built or customized plan with defined sections and questions, progressing step-by-step with progress tracking.

---

## User Flow

1. User navigates to `/guided-practice`.
2. User selects an existing learning plan or is assigned one.
3. A plan overview is shown: sections, estimated time, progress percentage.
4. User clicks into a section and starts answering questions in sequence.
5. Each question can be answered, skipped, or flagged for review.
6. Progress is saved automatically after each answer.
7. User completes a section and sees a section summary screen.
8. User completes all sections and sees a full completion summary.

---

## Key Files

| File                                             | Purpose                                  |
| ------------------------------------------------ | ---------------------------------------- |
| `apps/website/src/app/guided-practice/`          | Main guided practice pages               |
| `apps/website/src/app/guided-practice-minimal/`  | Minimal/embedded guided practice variant |
| `apps/website/src/app/guided-practice-simple/`   | Simplified single-page variant           |
| `apps/website/src/app/features/guided-learning/` | Feature-specific UI components           |
| `apps/website/src/app/lib/`                      | Business logic & data-fetching hooks     |
| `apps/website/src/app/api/guided-learning/`      | API routes for guided learning data      |

---

## API Endpoints

| Method | Route                             | Description                          |
| ------ | --------------------------------- | ------------------------------------ |
| `GET`  | `/api/guided-learning/plans`      | Fetch all available plans            |
| `GET`  | `/api/guided-learning/plans/[id]` | Fetch a specific plan with sections  |
| `POST` | `/api/guided-learning/progress`   | Save user progress on a question     |
| `GET`  | `/api/guided-learning/progress`   | Get user's progress for current plan |

Full Swagger docs: `http://localhost:3000/api-docs` → Guided Learning section.

---

## Test Scenarios

### Happy Path

1. **Plan list loads** — `/guided-practice` displays a list of available plans with titles and progress.
2. **Enter a plan** — Clicking a plan navigates into it and shows all sections.
3. **Answer a question** — Selecting an answer marks the question as answered and saves progress.
4. **Section completion** — Answering all questions in a section shows the section summary.
5. **Resume mid-plan** — Revisiting a plan resumes from the last answered question.
6. **Full plan completion** — Completing all sections shows a completion summary with score.

### Edge Cases

7. **Empty plan** — A plan with no sections shows an empty state message (not a crash).
8. **Single-question section** — Section with one question completes immediately after one answer.
9. **Already-completed plan** — Shows read-only review mode, not an active session.
10. **Concurrent tab** — Opening the same plan in two tabs doesn't cause data drift (last write wins).

### Error States

11. **Failed progress save** — If the API call to save progress fails, a retry mechanism or error toast is shown.
12. **Plan not found** — Navigating to `/guided-practice/[invalid-id]` shows 404 page.
13. **Unauthenticated access** — Redirected to `/auth/login`.
