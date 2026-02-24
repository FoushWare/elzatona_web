# Feature: Learning Paths

## Overview

Learning Paths are curated, sequential collections of topics and resources that guide a developer through a full subject area (e.g., "JavaScript Fundamentals", "React Deep Dive"). Unlike custom roadmaps, these are pre-built by admins and ensure a consistent progression for all learners.

---

## User Flow

1. User navigates to `/learning-paths`.
2. A catalog of available paths is shown with title, description, estimated time, and difficulty.
3. User selects a path and sees its full outline: stages, topics, and questions.
4. User enrols in the path (saves progress to their profile).
5. User works through stages sequentially; each stage unlocks after the previous is marked complete.
6. Progress bar updates as stages are completed.
7. User earns a completion badge on finishing the entire path.

---

## Key Files

| File                                       | Purpose                              |
| ------------------------------------------ | ------------------------------------ |
| `apps/website/src/app/learning-paths/`     | Learning paths pages                 |
| `apps/website/src/app/api/learning-paths/` | API routes for paths                 |
| `libs/shared-data/`                        | Shared data layer for learning paths |
| `libs/hooks/`                              | `usePlans` and related hooks         |
| `libs/types/`                              | `LearningPath`, `Stage` types        |

---

## API Endpoints

| Method | Route                            | Description                            |
| ------ | -------------------------------- | -------------------------------------- |
| `GET`  | `/api/learning-paths`            | List all available paths               |
| `GET`  | `/api/learning-paths/[id]`       | Get a specific path with stages        |
| `POST` | `/api/learning-paths/[id]/enrol` | Enrol user in a path                   |
| `GET`  | `/api/learning-paths/progress`   | Get user's enrolled paths and progress |
| `POST` | `/api/learning-paths/progress`   | Update stage completion                |

Full Swagger docs: `http://localhost:3000/api-docs` → Learning Paths section.

---

## Test Scenarios

### Happy Path

1. **Path catalog loads** — `/learning-paths` lists all paths with metadata.
2. **Path detail view** — Clicking a path shows full outline and stage list.
3. **Enrol in path** — Enrol button registers the path on the user's profile.
4. **Stage completion** — Completing a stage unlocks the next one.
5. **Resume path** — Revisiting a path shows current progress and the next unlocked stage.
6. **Path completion** — Completing all stages shows a completion screen.

### Edge Cases

7. **Already enrolled** — Visiting a path already enrolled in shows progress, not a re-enrol button.
8. **Empty path** — A path with no stages shows an appropriate empty state.
9. **Locked stage access** — Trying to jump to a locked stage is blocked with a message.
10. **Multiple active paths** — User can enrol in more than one path simultaneously.

### Error States

11. **Path not found** — Invalid ID shows 404 page.
12. **Enrol API failure** — Shows error toast; path is not marked as enrolled.
13. **Unauthenticated access** — Redirected to `/auth/login`.
