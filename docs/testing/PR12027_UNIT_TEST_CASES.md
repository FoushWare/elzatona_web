# PR #12027 - Unit and Integration Test Cases

## Target Files

- `apps/admin/src/app/admin/users/page.test.tsx`
- `apps/admin/src/app/admin/dashboard/page.integration.test.tsx`
- `apps/admin/src/app/admin/content-management/page.integration.test.tsx`
- `apps/admin/src/app/admin/learning-cards/page.integration.test.tsx`

## Test Cases

### Admin Users Page

1. Renders page without errors for authenticated admin.
2. Shows access denied state for non-admin context.
3. Calls users API endpoint (`/api/users`) on mount.
4. Snapshot test for empty users state.
5. Snapshot test for populated users state.

### Admin Dashboard Page

1. Renders mocked dashboard component successfully.
2. Verifies initial dashboard UI presence.
3. Verifies refresh button interaction path remains functional.

### Admin Content Management Page

1. Renders stats section with expected stat values.
2. Renders search/filter controls.
3. Renders all management sections.
4. Shows loading state when hook returns loading.
5. Displays error message when hook returns error.
6. Invokes `setSearchTerm` when search input changes.
7. Invokes `setFilterCardType` when filter changes.
8. Renders modal components when open flags are true.

### Admin Learning Cards Page

1. Renders navbar, list container, and existing cards.
2. Renders card action controls (edit/delete/create).
3. Handles create flow and calls `createCard` with expected payload.
4. Handles edit flow and calls `updateCard` with expected payload.
5. Handles delete flow and calls `deleteCard` with expected ID.
6. Closes modals on cancel/close actions.
7. Shows loading indicator when loading state is active.
8. Displays error message when hook returns an error.

## Manual Execution Command

- `npm run test:admin`

## Acceptance Criteria

- No `jest is not defined` runtime errors.
- No `React is not defined` runtime errors in integration test mocks.
- No repository/network URL runtime errors from dashboard integration tests.
