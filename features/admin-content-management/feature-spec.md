# Feature: Admin – Content Management

## Overview

Content Management in the Admin panel allows administrators to create, update, and delete platform content: questions, categories, and topics. This is the primary tool for maintaining the question bank that powers all practice features across the website.

---

## User Flow

1. Admin logs in at `/admin/login` and is redirected to the admin dashboard.
2. Admin navigates to **Content Management** (`/admin/content-management`).
3. Admin sees a list of questions (with search, filter by category/topic/type).
4. Admin clicks **"New Question"** to open the creation form.
5. Admin fills in: title, type (MCQ/open), difficulty, category, topic, answer, explanation.
6. Admin saves — question appears in the list.
7. Admin can **Edit** any existing question (inline or modal form).
8. Admin can **Delete** a question (with confirmation prompt).
9. Admin manages **Categories** and **Topics** from a sub-section.

---

## Key Files

| File                                           | Purpose                                      |
| ---------------------------------------------- | -------------------------------------------- |
| `apps/admin/src/app/admin/content-management/` | Content management admin pages               |
| `apps/admin/src/app/admin/questions/`          | Questions sub-section                        |
| `apps/admin/src/app/api/`                      | Admin API routes                             |
| `libs/shared-data/`                            | Shared data layer                            |
| `libs/types/`                                  | `UnifiedQuestion`, `Category`, `Topic` types |

---

## API Endpoints (Admin)

| Method                | Route                 | Description                 |
| --------------------- | --------------------- | --------------------------- |
| `GET`                 | `/api/questions`      | List all questions          |
| `POST`                | `/api/questions`      | Create a new question       |
| `PUT`                 | `/api/questions/[id]` | Update an existing question |
| `DELETE`              | `/api/questions/[id]` | Delete a question           |
| `GET/POST/PUT/DELETE` | `/api/categories`     | Category CRUD               |
| `GET/POST/PUT/DELETE` | `/api/topics`         | Topic CRUD                  |

Full Swagger docs: `http://localhost:3001/api-docs` → Questions / Categories & Topics section.

---

## Test Scenarios

### Happy Path

1. **Question list loads** — Admin sees paginated list with search bar and filters.
2. **Create question** — Filling in all required fields and saving adds the question to the list.
3. **Edit question** — Opening an existing question populates the form; saving updates it.
4. **Delete question** — Confirmation dialog shown; confirmed delete removes it from the list.
5. **Search** — Searching by keyword filters the list in real time.
6. **Category creates and edits** — Category can be created, edited, and deleted without affecting existing questions.

### Edge Cases

7. **Create with missing required fields** — Form validation blocks submission with field-level errors.
8. **Delete category with linked questions** — System warns admin that questions will be orphaned or cascades deletion.
9. **Duplicate question title** — Warning or prevention of duplicate titles in the same topic.
10. **Bulk operations** — If bulk delete is supported, selecting multiple items and deleting works correctly.

### Error States

11. **Save fails** — Error toast shown; form stays open with entered data intact.
12. **Delete fails** — Confirmation dialog stays open; item remains in list.
13. **Non-admin access** — Returns 403 or redirects to admin login.

---

## Dashboard-Based Plan Generation

The **Create Plan** action in Admin Content Management now generates a spaced-repetition plan sequence directly from dashboard data, not from seeding scripts.

Behavior:

1. Creates 4 plans in order: Foundations, Review & Deepen, Advanced Mastery, Weekly Check-in.
2. Includes all learning cards in every generated plan.
3. Starts with low question load per card on Day 1 (1-2 new questions per card).
4. Gradually increases review intensity in later plans while still introducing some new questions.
5. Persists `plan_cards` and `plan_questions` links from current dashboard datasets.

Notes:

1. This supports fast seeded startup and long-term dashboard-driven plan management.
2. Existing plan detection prevents duplicate sequence creation when the 4-plan set already exists.
