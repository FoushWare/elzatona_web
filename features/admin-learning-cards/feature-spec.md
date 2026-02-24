# Feature: Admin – Learning Cards

## Overview

The Learning Cards admin section allows administrators to manage the flashcard content used in the website's Flashcards feature. Admins can create, categorize, edit, and delete learning cards, as well as manage the categories and topics that organise them.

---

## User Flow

1. Admin navigates to `/admin/learning-cards`.
2. Admin sees a table of all learning cards with columns: ID, title, category, topic, and actions.
3. Admin can search and filter cards by category or topic.
4. Admin clicks **"New Card"** to open the card creation modal.
5. Admin fills in: front (question/term), back (answer/explanation), category, topic.
6. Admin saves — card appears in the list.
7. Admin can **Edit** any card via the edit icon (opens modal with pre-filled data).
8. Admin can **Delete** a card (confirmation dialog before deletion).

---

## Key Files

| File                                               | Purpose                                     |
| -------------------------------------------------- | ------------------------------------------- |
| `apps/admin/src/app/admin/learning-cards/`         | Learning cards admin pages                  |
| `apps/admin/src/app/admin/learning-cards/page.tsx` | Main listing page                           |
| `libs/hooks/`                                      | `useLearningCards` hook for CRUD operations |
| `libs/common-ui/`                                  | `CardFormModal`, `DeleteConfirmationModal`  |
| `libs/types/`                                      | `LearningCard` type definition              |

---

## API Endpoints (Admin)

| Method                | Route                      | Description             |
| --------------------- | -------------------------- | ----------------------- |
| `GET`                 | `/api/learning-cards`      | List all learning cards |
| `POST`                | `/api/learning-cards`      | Create a new card       |
| `PUT`                 | `/api/learning-cards/[id]` | Update a card           |
| `DELETE`              | `/api/learning-cards/[id]` | Delete a card           |
| `GET/POST/PUT/DELETE` | `/api/categories`          | Category CRUD (shared)  |
| `GET/POST/PUT/DELETE` | `/api/topics`              | Topic CRUD (shared)     |

Full Swagger docs: `http://localhost:3001/api-docs` → Learning Cards section.

---

## Test Scenarios

### Happy Path

1. **Card list loads** — Table renders with all cards, category/topic columns, and action buttons.
2. **Create card** — New card modal opens; valid data submitted successfully adds row to table.
3. **Edit card** — Clicking edit opens modal with pre-filled data; saving persists changes.
4. **Delete card** — Clicking delete shows confirmation; confirming removes card from list.
5. **Category filter** — Filtering by category shows only cards in that category.
6. **Search** — Searching by front-text or title narrows results.

### Edge Cases

7. **Create with empty front or back** — Form validation blocks submission.
8. **Assign category before save** — Saving without selecting a category shows a validation error.
9. **Long text in front/back** — Card form handles and saves long content without layout break.
10. **Rapid create + delete** — Creating and immediately deleting doesn't leave orphaned state.

### Error States

11. **Create API fails** — Error toast shown; modal stays open with data intact.
12. **Delete API fails** — Confirmation dialog stays open; card remains in list.
13. **Non-admin access** — Returns 403 or redirects to admin login.
