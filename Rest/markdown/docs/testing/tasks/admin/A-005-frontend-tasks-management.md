# Task: Admin Frontend Tasks Management

## Time Estimation

### Manual Testing
- **Estimated Time**: 40-55 minutes
- **Breakdown**:
  - Navigate and verify access: 2 minutes
  - Test frontend tasks list display: 5-7 minutes
  - Test create frontend task: 10-12 minutes
  - Test edit frontend task: 8-10 minutes
  - Test delete frontend task: 3-5 minutes
  - Test task details view: 5-7 minutes
  - Test task validation: 5-7 minutes
  - Test search/filter: 2-5 minutes
- **Complexity**: High
- **Dependencies**: Admin authentication, API endpoints, test task data

### Automated Testing
- **Estimated Time**: 15-25 minutes (first run), 3-5 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-8 minutes
  - Integration tests setup and execution: 6-12 minutes (includes API mocking)
  - E2E tests execution: 4-5 minutes
- **Complexity**: High
- **Dependencies**: API mocks, test task data, authentication setup

### Total Time
- **Manual Only**: 40-55 minutes
- **Automated Only**: 15-25 minutes (first run), 3-5 minutes (subsequent)
- **Both Manual + Automated**: 55-80 minutes (first run), 43-60 minutes (subsequent)

---

## Overview
Test the admin frontend tasks management page including CRUD operations, task details, validation, and search/filter functionality.

## Manual Testing Steps

1. **Navigate to frontend tasks page**
   - Login as admin
   - Navigate to `/admin/frontend-tasks`
   - Verify page loads
   - Verify tasks list displayed

2. **Test tasks list display**
   - Verify all tasks are listed
   - Verify task titles displayed
   - Verify task descriptions displayed
   - Verify difficulty levels shown
   - Verify task status indicators
   - Verify pagination (if applicable)

3. **Test create frontend task**
   - Click "Add New Task" or "Create Task"
   - Fill in task form:
     - Title (required)
     - Description (required)
     - Difficulty level
     - Instructions
     - Starter code
     - Test cases
     - Solution code
   - Save task
   - Verify task appears in list
   - Verify task details correct

4. **Test edit frontend task**
   - Click edit on existing task
   - Modify task fields
   - Save changes
   - Verify task updated in list
   - Verify changes reflected

5. **Test delete frontend task**
   - Click delete on task
   - Confirm deletion
   - Verify task removed from list
   - Verify cannot access deleted task

6. **Test task details view**
   - Click on task to view details
   - Verify all task information displayed
   - Verify code editor visible (if applicable)
   - Verify test cases shown
   - Verify solution visible (if admin)

7. **Test task validation**
   - Try to create task without title
   - Verify validation error
   - Try to create task without description
   - Verify validation error
   - Test invalid data formats
   - Verify error messages clear

8. **Test search/filter**
   - Enter search term
   - Verify filtered results
   - Test filter by difficulty
   - Test filter by status
   - Clear filters
   - Verify all tasks shown

## Automated Tests

### Unit Tests

- **A-UT-023**: Test frontend tasks page renders
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Tasks list visible
    - Create button visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-024**: Test task list displays
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Tasks rendered in list
    - Task titles visible
    - Task descriptions visible
    - Difficulty levels shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-025**: Test create task form
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Form fields visible
    - Required fields marked
    - Submit button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-026**: Test edit task form
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Form pre-filled with task data
    - Fields editable
    - Save button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-027**: Test task validation
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Required field validation works
    - Error messages shown
    - Submit disabled if invalid
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-024**: Test tasks API calls
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - List API called on mount
    - Create API called with correct data
    - Update API called with correct data
    - Delete API called with correct ID
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-025**: Test task creation flow
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - Form submission triggers API call
    - Success response handled
    - Task added to list
    - Error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-026**: Test task update flow
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - Update API called
    - Task data updated
    - List refreshed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-027**: Test task deletion flow
  - **File**: `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - Delete API called
    - Task removed from list
    - Confirmation handled
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-015**: Complete frontend task CRUD flow
  - **File**: `tests/e2e/admin/frontend-tasks-crud.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to frontend tasks
    3. Create a new task
    4. Verify task appears
    5. Edit the task
    6. Verify changes saved
    7. Delete the task
    8. Verify task removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-016**: Frontend task search and filter
  - **File**: `tests/e2e/admin/frontend-tasks-search.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to frontend tasks
    3. Enter search term
    4. Verify filtered results
    5. Apply difficulty filter
    6. Clear filters
    7. Verify all tasks shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- admin/frontend-tasks/page.test.tsx

# Run integration tests
npm run test:integration -- admin/frontend-tasks/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- frontend-tasks-*.spec.ts
```

## Notes

- All tests can run in parallel
- Requires admin authentication
- Tests code editor integration (if applicable)
- No dependencies on other tests

