# Feature: Custom Roadmap

## Overview

Custom Roadmap lets users build their own personalized study plan by selecting topics, ordering them, and setting goals. Unlike pre-built Learning Paths, this is fully user-controlled. It helps users with specific interview prep needs or non-standard learning goals.

---

## User Flow

1. User navigates to `/custom-roadmap`.
2. User clicks "Create New Roadmap".
3. User gives the roadmap a name and optional description.
4. User browses available topics (grouped by category) and adds them to the roadmap.
5. User drags/reorders the topics to define sequence.
6. User saves the roadmap — it appears on their dashboard.
7. User can open and edit an existing roadmap at any time.
8. User can delete a roadmap they no longer need.

---

## Key Files

| File                                      | Purpose                           |
| ----------------------------------------- | --------------------------------- |
| `apps/website/src/app/custom-roadmap/`    | Custom roadmap pages              |
| `apps/website/src/app/my-plans/`          | User's saved plans list           |
| `apps/website/src/app/categories-topics/` | Browse available topics to add    |
| `apps/website/src/app/api/`               | API routes for roadmap CRUD       |
| `libs/hooks/`                             | `usePlans` and related hooks      |
| `libs/types/`                             | `CustomRoadmap`, `UserPlan` types |

---

## API Endpoints

| Method   | Route                    | Description                         |
| -------- | ------------------------ | ----------------------------------- |
| `GET`    | `/api/my-plans`          | Get user's custom roadmaps          |
| `POST`   | `/api/my-plans`          | Create a new roadmap                |
| `PUT`    | `/api/my-plans/[id]`     | Update an existing roadmap          |
| `DELETE` | `/api/my-plans/[id]`     | Delete a roadmap                    |
| `GET`    | `/api/categories-topics` | Browse categories and topics to add |

---

## Test Scenarios

### Happy Path

1. **Create roadmap** — User fills in name and saves; roadmap appears in their list.
2. **Add topics** — Browsing topics and adding them updates the roadmap preview.
3. **Reorder topics** — Drag-and-drop reorders topics and saves the new order.
4. **Edit roadmap** — Opening an existing roadmap shows current topics; changes save correctly.
5. **Delete roadmap** — Deleting prompts confirmation; roadmap is removed from the list.

### Edge Cases

6. **Empty roadmap name** — Save is blocked with a validation error.
7. **Duplicate topic** — Adding the same topic twice is either prevented or deduplicated.
8. **No topics added** — Saving a roadmap with no topics is allowed (shows empty state when opened).
9. **Max topics limit** — If a limit exists, UI prevents adding beyond it.
10. **Undo reorder** — Browser back button or explicit undo doesn't corrupt order.

### Error States

11. **Create API fails** — Toast error shown; roadmap not added to list.
12. **Delete API fails** — Confirmation dialog stays open; item not removed from UI prematurely.
13. **Unauthenticated access** — Redirected to `/auth/login`.
