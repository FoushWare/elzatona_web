# Feature: Dashboard

## Overview

The Dashboard is the user's home base after login. It provides a visual overview of their progress across all active learning paths, recent activity, upcoming items, and key statistics (streak, completion rate, total questions answered).

---

## User Flow

1. User logs in and is redirected to `/dashboard`.
2. Dashboard displays:
   - **Progress cards** for each enrolled Learning Path/Custom Roadmap.
   - **Recent activity** feed (last answered questions, completed sections).
   - **Stats summary** (total questions, streak, accuracy rate).
   - **Quick actions** (continue last session, start free-style).
3. User clicks a progress card to jump directly into that path/roadmap.
4. User clicks a quick action to start or resume practice.

---

## Key Files

| File                                  | Purpose                                     |
| ------------------------------------- | ------------------------------------------- |
| `apps/website/src/app/dashboard/`     | Dashboard pages                             |
| `apps/website/src/app/api/progress/`  | API routes for progress data                |
| `apps/admin/src/app/admin/dashboard/` | Admin dashboard (separate, for admin stats) |
| `libs/hooks/`                         | Data fetching hooks for progress/stats      |
| `libs/types/`                         | Progress, stats type definitions            |

---

## API Endpoints

| Method | Route                       | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| `GET`  | `/api/progress`             | Get user's overall progress across all paths |
| `GET`  | `/api/progress/[id]`        | Get progress for a specific path/roadmap     |
| `GET`  | `/api/questions/statistics` | Get user's question answer statistics        |

Full Swagger docs: `http://localhost:3000/api-docs` → Progress section.

---

## Test Scenarios

### Happy Path

1. **Dashboard loads** — All sections render: progress cards, recent activity, stats.
2. **Progress card correct** — Progress percentage matches completed vs. total questions.
3. **Continue session** — "Continue" button navigates to the correct next question.
4. **Recent activity** — Shows the last N questions/sections interacted with.
5. **Stats accuracy** — Streak count, total answered, and accuracy rate reflect real data.
6. **Empty state (new user)** — New user with no activity sees a welcoming "Get started" state.

### Edge Cases

7. **User with many paths** — Dashboard handles 10+ active paths without layout breaking.
8. **100% completed path** — Path is shown as completed; "Continue" is replaced with "Review".
9. **Zero questions answered** — Stats show zeros without NaN or undefined rendering.
10. **Stale data** — Dashboard re-fetches on focus/visit to keep progress up to date.

### Error States

11. **Progress API fails** — Graceful error state per card; others still load independently.
12. **Partial data** — If stats fail but progress loads, the stats section shows an error inset (not the whole page).
13. **Unauthenticated access** — Redirected to `/auth/login`.
