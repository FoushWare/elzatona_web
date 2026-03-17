# Feature: Admin - Content Questions

## Overview

The Admin Content Questions page at /admin/content/questions is the operational page for creating, editing, searching, filtering, and deleting unified questions used across the platform.

## User Flow

1. Admin opens /admin/content/questions.
2. Page loads stats, category counts, filters, and paginated list.
3. Admin searches by keyword and filters by category/topic.
4. Admin creates or edits a question from the modal form.
5. Admin deletes a question with confirmation.
6. Admin navigates pages without duplicate or looping fetches.

## Key Files

| File                                                                       | Purpose                                     |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| apps/admin/src/app/admin/content/questions/page.tsx                        | Questions admin page UI                     |
| apps/admin/src/app/admin/content/questions/hooks/useQuestionsManagement.ts | Page state and data fetching                |
| apps/admin/src/app/api/questions/unified/route.ts                          | Unified questions list/create API           |
| apps/admin/src/app/api/questions/unified/[id]/route.ts                     | Update/delete API                           |
| apps/admin/src/app/api/categories/question-counts/route.ts                 | Category question counts for overview cards |

## API Endpoints

| Method | Route                           | Purpose                          |
| ------ | ------------------------------- | -------------------------------- |
| GET    | /api/questions/unified          | List with pagination and filters |
| POST   | /api/questions/unified          | Create question                  |
| PUT    | /api/questions/unified/[id]     | Update question                  |
| DELETE | /api/questions/unified/[id]     | Delete question                  |
| GET    | /api/categories/question-counts | Category counts                  |

## Test Scenarios

1. Questions list loads with non-zero totalCount when records exist.
2. Category counts endpoint returns correct counts per category.
3. Search and filter update visible results and pagination count.
4. Opening create modal and submitting valid payload creates a new row.
5. Editing an existing question updates values in list and modal view.
6. Deleting a question removes it and decrements totalCount.
7. Pagination changes page once per user action (no looped network calls).
8. API failure shows error state without white screen.
