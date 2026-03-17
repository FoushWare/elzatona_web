# TDD: Problem Solving (User + Admin)

## Architecture

- User route: /problem-solving and detail pages.
- Admin route: /admin/problem-solving for CRUD of problem records.
- Shared backend uses unified questions endpoints with type discriminator.

## Data Model Expectations

- Problem records stored as unified questions with type = problem.
- Problem-specific fields (examples, constraints, starter code) stored in metadata.

## Technical Acceptance

1. Admin CRUD updates are visible on user pages.
2. Type filter isolates problem records from other question families.
3. Error handling surfaces API failures without blank-screen states.
