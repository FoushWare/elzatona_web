# TDD: Frontend Tasks (User + Admin)

## Architecture

- User routes under /frontend-tasks consume frontend-task question records.
- Admin page /admin/frontend-tasks manages same dataset.
- Question type discriminator is used to isolate frontend-task records.

## Data Model Expectations

- Unified question payload includes type = frontend-task.
- Test cases and starter code are stored in metadata fields.
- API supports list, create, update, and delete operations.

## Technical Acceptance

1. User and admin pages can read the same seeded records.
2. Empty states render gracefully when no data is seeded.
3. Type filtering prevents cross-feature data leakage.
