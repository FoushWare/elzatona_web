# Test Design: Frontend Tasks (User + Admin)

## Unit Tests

1. Filters return only questions where type is frontend-task.
2. Submission validator rejects empty/invalid code payload.
3. Admin table transformer maps unified question fields correctly.

## Integration Tests

1. /frontend-tasks list and detail routes render seeded tasks.
2. /admin/frontend-tasks renders empty state when no rows exist.
3. Admin create/update/delete updates data source and list rendering.

## E2E Tests

1. User can open task, run code, and submit.
2. Admin can open /admin/frontend-tasks and see task records.
3. Admin creates task and user can see it in frontend list.
