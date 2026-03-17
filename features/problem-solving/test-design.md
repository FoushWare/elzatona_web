# Test Design: Problem Solving (User + Admin)

## Unit Tests

1. Type filter keeps only problem records.
2. Submission payload validator handles empty and malformed data.
3. Admin edit form maps metadata fields correctly.

## Integration Tests

1. /problem-solving list/detail pages load seeded records.
2. /admin/problem-solving list renders and supports CRUD actions.
3. Updating a problem in admin reflects on user-facing detail page.

## E2E Tests

1. Admin creates a new problem on /admin/problem-solving.
2. User sees same problem on /problem-solving.
3. User submits solution and receives deterministic feedback.
