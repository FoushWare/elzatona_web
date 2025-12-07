# Task ID: F-002

# Title: My Plans Page

# Status: pending

# Dependencies:

# Priority: high

# Description: Test the "My Plans" page where users can view, edit, start, and delete their custom plans.

# Details:

## Time Estimation

### Manual Testing

- **Estimated Time**: 25-35 minutes
- **Breakdown**:
  - Navigate and authenticate: 2 minutes
  - Test empty state: 2-3 minutes
  - Test plan list display: 5-7 minutes
  - Test plan actions (Start, Edit, Delete): 10-15 minutes
  - Test plan progress tracking: 6-8 minutes
- **Complexity**: Medium-High
- **Dependencies**: Authentication, existing custom plans, progress data

### Automated Testing

- **Estimated Time**: 10-15 minutes (first run), 1.5-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 3-4 minutes
  - Integration tests setup and execution: 4-6 minutes (includes API mocking)
  - E2E tests execution: 3-5 minutes (includes plan creation and actions)
- **Complexity**: Medium-High
- **Dependencies**: API mocks, test plan data, authentication setup

### Total Time

- **Manual Only**: 25-35 minutes
- **Automated Only**: 10-15 minutes (first run), 1.5-3 minutes (subsequent)
- **Both Manual + Automated**: 35-50 minutes (first run), 26.5-38 minutes (subsequent)

---

## Overview

Test the "My Plans" page where users can view, edit, start, and delete their custom plans.

## Manual Testing Steps

1. **Navigate to my plans page**
   - Sign in as authenticated user
   - Go to `http://localhost:3000/my-plans`
   - Verify page loads

2. **Test empty state**
   - If no plans exist, verify empty state message
   - Verify "Create Plan" button/link present

3. **Test plan list display**
   - If plans exist, verify all plans are displayed
   - Verify plan name shown
   - Verify plan description shown
   - Verify duration shown
   - Verify total questions shown
   - Verify progress (if applicable)

4. **Test plan actions**
   - Click "Start" on a plan
   - Verify navigation to practice page
   - Click "Edit" on a plan
   - Verify navigation to custom roadmap with plan data
   - Click "Delete" on a plan
   - Verify confirmation dialog
   - Confirm deletion
   - Verify plan removed from list

5. **Test plan progress**
   - Start a plan
   - Complete some questions
   - Return to my plans
   - Verify progress updated
   - Verify current day shown
   - Verify completion percentage

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-008**: Test my plans page renders
  - **File**: `apps/website/src/app/my-plans/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Authentication check works
    - Unauthenticated users redirected
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-009**: Test empty state displays
  - **File**: `apps/website/src/app/my-plans/page.test.tsx`
  - **Assertions**:
    - Empty state message visible
    - "Create Plan" link present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-010**: Test plan card renders
  - **File**: `apps/website/src/app/my-plans/page.test.tsx`
  - **Assertions**:
    - Plan name visible
    - Plan description visible
    - Duration visible
    - Total questions visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-011**: Test plan action buttons
  - **File**: `apps/website/src/app/my-plans/page.test.tsx`
  - **Assertions**:
    - "Start" button visible
    - "Edit" button visible
    - "Delete" button visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-012**: Test progress indicator
  - **File**: `apps/website/src/app/my-plans/page.test.tsx`
  - **Assertions**:
    - Progress bar visible (if plan started)
    - Completion percentage shown
    - Current day shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-007**: Test plans fetched from API
  - **File**: `apps/website/src/app/my-plans/page.integration.test.tsx`
  - **Assertions**:
    - API called on mount
    - Plans data loaded
    - Error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-008**: Test "Start" button navigation
  - **File**: `apps/website/src/app/my-plans/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with correct plan ID
    - Navigation occurs
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-009**: Test "Edit" button navigation
  - **File**: `apps/website/src/app/my-plans/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with `/custom-roadmap?planId=X`
    - Plan data passed to edit page
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-010**: Test plan deletion API call
  - **File**: `apps/website/src/app/my-plans/page.integration.test.tsx`
  - **Assertions**:
    - Delete API called with plan ID
    - Success response handled
    - Plan removed from list
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-011**: Test progress data fetched
  - **File**: `apps/website/src/app/my-plans/page.integration.test.tsx`
  - **Assertions**:
    - Progress API called for active plans
    - Progress data displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-004**: Complete my plans page flow
  - **File**: `tests/e2e/freestyle-flow/my-plans-page.spec.ts`
  - **Steps**:
    1. Sign in
    2. Create a custom plan
    3. Navigate to `/my-plans`
    4. Verify plan appears in list
    5. Click "Start" on plan
    6. Verify navigation to practice page
    7. Return to my plans
    8. Verify progress updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-005**: Plan editing flow
  - **File**: `tests/e2e/freestyle-flow/my-plans-edit.spec.ts`
  - **Steps**:
    1. Sign in
    2. Navigate to `/my-plans`
    3. Click "Edit" on a plan
    4. Verify plan data loaded in custom roadmap
    5. Modify plan selections
    6. Save changes
    7. Verify plan updated in my plans
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-006**: Plan deletion flow
  - **File**: `tests/e2e/freestyle-flow/my-plans-delete.spec.ts`
  - **Steps**:
    1. Sign in
    2. Navigate to `/my-plans`
    3. Click "Delete" on a plan
    4. Verify confirmation dialog
    5. Confirm deletion
    6. Verify plan removed
    7. Verify success message
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
