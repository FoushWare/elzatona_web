# Feature: Free-Style Practice

## Overview

Free-Style Practice is an unstructured question practice mode. Users can browse and answer questions without committing to a plan or learning path. It is ideal for warm-up sessions, mixed-topic revision, or ad hoc exploration.

---

## User Flow

1. User navigates to `/free-style` or `/free-style-practice`.
2. User optionally applies filters (category, topic, difficulty).
3. A question is displayed with multiple-choice or open-ended input.
4. User submits their answer.
5. Correct/incorrect feedback is shown with an explanation.
6. User clicks "Next" to continue to the next question.
7. Session continues until the user stops or runs out of questions.
8. A lightweight session summary is shown if the user exits.

---

## Key Files

| File                                              | Purpose                                 |
| ------------------------------------------------- | --------------------------------------- |
| `apps/website/src/app/free-style/`                | Free-style practice pages               |
| `apps/website/src/app/free-style-practice/`       | Practice session variant                |
| `apps/website/src/app/browse-practice-questions/` | Browse/filter questions before starting |
| `apps/website/src/app/api/questions/`             | Fetch questions for the session         |
| `libs/shared-data/`                               | Shared question data layer              |

---

## API Endpoints

| Method | Route                       | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| `GET`  | `/api/questions`            | Fetch questions (supports filter params) |
| `POST` | `/api/questions/validate`   | Validate a submitted answer              |
| `GET`  | `/api/questions/statistics` | User's historical answer stats           |

Full Swagger docs: `http://localhost:3000/api-docs` → Questions section.

---

## Test Scenarios

### Happy Path

1. **Session starts** — Navigating to free-style shows a question immediately.
2. **Correct answer** — Submitting a correct answer shows green feedback and explanation.
3. **Wrong answer** — Submitting an incorrect answer shows red feedback and the correct answer.
4. **Next question** — "Next" button loads the next question without page reload.
5. **Filter by category** — Selecting a category filters the question pool.
6. **Filter by difficulty** — Selecting difficulty narrows the question set.

### Edge Cases

7. **No questions match filter** — Empty state message is shown, not an error.
8. **All questions answered** — Graceful end-of-deck state with option to restart or change filters.
9. **Same question not shown twice** — Within a session, questions are not repeated (if pool allows).
10. **Rapid answer submission** — Clicking submit multiple times doesn't submit multiple answers.

### Error States

11. **Question load fails** — Error state shown with retry option.
12. **Validation API fails** — Graceful error; UI does not freeze or crash.
13. **Unauthenticated access** — Redirected to `/auth/login`.
