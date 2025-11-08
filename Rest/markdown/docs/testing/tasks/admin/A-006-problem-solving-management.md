# Task ID: A-006
# Title: Admin Problem Solving Management
# Status: pending
# Dependencies: 
# Priority: high
# Description: Test the admin problem solving management page including CRUD operations, test cases management, and validation.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 40-55 minutes
- **Breakdown**:
  - Navigate and verify access: 2 minutes
  - Test problem list display: 5-7 minutes
  - Test create problem: 10-12 minutes
  - Test edit problem: 8-10 minutes
  - Test delete problem: 3-5 minutes
  - Test problem details view: 5-7 minutes
  - Test test cases management: 5-7 minutes
  - Test validation: 5-7 minutes
- **Complexity**: High
- **Dependencies**: Admin authentication, API endpoints, test problem data

### Automated Testing
- **Estimated Time**: 15-25 minutes (first run), 3-5 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-8 minutes
  - Integration tests setup and execution: 6-12 minutes (includes API mocking)
  - E2E tests execution: 4-5 minutes
- **Complexity**: High
- **Dependencies**: API mocks, test problem data, authentication setup

### Total Time
- **Manual Only**: 40-55 minutes
- **Automated Only**: 15-25 minutes (first run), 3-5 minutes (subsequent)
- **Both Manual + Automated**: 55-80 minutes (first run), 43-60 minutes (subsequent)

---

## Overview
Test the admin problem solving management page including CRUD operations, test cases management, and validation.

## Manual Testing Steps

1. **Navigate to problem solving page**
   - Login as admin
   - Navigate to `/admin/problem-solving`
   - Verify page loads
   - Verify problems list displayed

2. **Test problems list display**
   - Verify all problems listed
   - Verify problem titles displayed
   - Verify difficulty levels shown
   - Verify problem categories shown
   - Verify test cases count displayed

3. **Test create problem**
   - Click "Add New Problem"
   - Fill in problem form:
     - Title (required)
     - Description (required)
     - Difficulty level
     - Category
     - Constraints
     - Examples
   - Add test cases
   - Save problem
   - Verify problem appears in list

4. **Test edit problem**
   - Click edit on existing problem
   - Modify problem fields
   - Add/remove test cases
   - Save changes
   - Verify problem updated

5. **Test delete problem**
   - Click delete on problem
   - Confirm deletion
   - Verify problem removed

6. **Test test cases management**
   - Create problem with test cases
   - Verify test cases saved
   - Edit test cases
   - Add new test case
   - Remove test case
   - Verify test cases updated

7. **Test validation**
   - Try to create problem without title
   - Verify validation error
   - Try to create problem without test cases
   - Verify validation error
   - Test invalid data formats

# Test Strategy:

## Automated Tests

### Unit Tests

- **A-UT-028**: Test problem solving page renders
  - **File**: `apps/website/src/app/admin/problem-solving/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Problems list visible
    - Create button visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-029**: Test problem list displays
  - **File**: `apps/website/src/app/admin/problem-solving/page.test.tsx`
  - **Assertions**:
    - Problems rendered in list
    - Problem details visible
    - Test cases count shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-030**: Test create problem form
  - **File**: `apps/website/src/app/admin/problem-solving/page.test.tsx`
  - **Assertions**:
    - Form fields visible
    - Test cases section visible
    - Submit button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-031**: Test test cases management UI
  - **File**: `apps/website/src/app/admin/problem-solving/page.test.tsx`
  - **Assertions**:
    - Add test case button works
    - Remove test case button works
    - Test case inputs editable
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-028**: Test problems API calls
  - **File**: `apps/website/src/app/admin/problem-solving/page.integration.test.tsx`
  - **Assertions**:
    - List API called on mount
    - Create API called with correct data
    - Update API called with correct data
    - Delete API called with correct ID
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-029**: Test problem creation with test cases
  - **File**: `apps/website/src/app/admin/problem-solving/page.integration.test.tsx`
  - **Assertions**:
    - Problem created with test cases
    - Test cases saved correctly
    - Data formatted correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-017**: Complete problem solving CRUD flow
  - **File**: `tests/e2e/admin/problem-solving-crud.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to problem solving
    3. Create a new problem with test cases
    4. Verify problem appears
    5. Edit the problem
    6. Add/remove test cases
    7. Delete the problem
    8. Verify problem removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
