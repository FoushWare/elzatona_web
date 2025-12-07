# Task ID: G-002

# Title: Get Started Page

# Status: pending

# Dependencies:

# Priority: medium

# Description: Test the get-started page flow selection and authentication integration.

# Details:

## Time Estimation

### Manual Testing

- **Estimated Time**: 20-30 minutes
- **Breakdown**:
  - Navigate to page and verify: 2 minutes
  - Check flow options: 2 minutes
  - Test "I need guidance" (unauthenticated): 5-7 minutes (includes sign-up)
  - Test "I need guidance" (authenticated): 3-4 minutes
  - Test "Browse practice questions": 2 minutes
  - Test form validation: 6-10 minutes (multiple validation scenarios)
- **Complexity**: Medium
- **Dependencies**: Authentication system, test user accounts

### Automated Testing

- **Estimated Time**: 8-12 minutes (first run), 1-2 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 3-4 minutes
  - Integration tests setup and execution: 3-4 minutes (includes auth mocking)
  - E2E tests execution: 2-4 minutes (includes sign-up flow)
- **Complexity**: Medium
- **Dependencies**: Authentication mocks, test data setup

### Total Time

- **Manual Only**: 20-30 minutes
- **Automated Only**: 8-12 minutes (first run), 1-2 minutes (subsequent)
- **Both Manual + Automated**: 28-42 minutes (first run), 21-32 minutes (subsequent)

## Manual Testing Steps

1. **Navigate to get-started page**
   - Go to `http://localhost:3000/get-started`
   - Verify page loads

2. **Check flow options**
   - Verify "I need guidance" option is visible
   - Verify "Browse practice questions" option is visible

3. **Test "I need guidance (unauthenticated)"**
   - Click "I need guidance"
   - Verify sign-in popup appears
   - Complete sign-up form
   - Verify redirect to guided learning after sign-up

4. **Test "I need guidance (authenticated)"**
   - Sign in as existing user
   - Navigate to `/get-started`
   - Click "I need guidance"
   - Verify immediate redirect (no popup)

5. **Test "Browse practice questions"**
   - Click "Browse practice questions"
   - Verify redirect to `/browse-practice-questions`

6. **Test form validation**
   - Click "I need guidance" without filling form
   - Verify validation errors appear
   - Test invalid email format
   - Test weak password

## Test Execution Commands

```bash
# Run unit tests
npm run test:unit -- get-started/page.test.tsx

# Run integration tests
npm run test:integration -- get-started/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- get-started-*.spec.ts
```

## Notes

- All tests can run in parallel
- Authentication tests require mock auth setup
- No dependencies on other tests

# Test Strategy:

## Unit Tests

- **G-UT-004**: Test "I need guidance" option renders
  - **File**: `apps/website/src/app/get-started/page.test.tsx`
  - **Assertions**:
    - Option visible
    - Text content correct
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-005**: Test "Browse practice questions" option renders
  - **File**: `apps/website/src/app/get-started/page.test.tsx`
  - **Assertions**:
    - Option visible
    - Text content correct
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-006**: Test sign-in popup appears when "I need guidance" is clicked
  - **File**: `apps/website/src/app/get-started/page.test.tsx`
  - **Assertions**:
    - Modal visible
    - Form elements present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-007**: Test sign-in form validation
  - **File**: `apps/website/src/app/get-started/page.test.tsx`
  - **Assertions**:
    - Error messages show for invalid email
    - Error messages show for weak password
    - Error messages show for empty fields
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Integration Tests

- **G-IT-003**: Test successful sign-in redirects correctly
  - **File**: `apps/website/src/app/get-started/page.integration.test.tsx`
  - **Assertions**:
    - No redirect after sign-in
    - Page state updated
    - User authenticated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-004**: Test "I need guidance" navigates to guided learning after auth
  - **File**: `apps/website/src/app/get-started/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with `/features/guided-learning`
    - Navigation occurs
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-005**: Test "Browse practice questions" navigates to browse page
  - **File**: `apps/website/src/app/get-started/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with `/browse-practice-questions`
    - Navigation occurs
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## E2E Tests

- **G-E2E-002**: Complete guided flow entry (unauthenticated user)
  - **File**: `tests/e2e/guided-flow/get-started-unauthenticated.spec.ts`
  - **Steps**:
    1. Navigate to `/get-started`
    2. Click "I need guidance"
    3. Sign-up form appears
    4. Complete sign-up
    5. Verify redirect to `/features/guided-learning`
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-003**: Complete guided flow entry (authenticated user)
  - **File**: `tests/e2e/guided-flow/get-started-authenticated.spec.ts`
  - **Steps**:
    1. Sign in as existing user
    2. Navigate to `/get-started`
    3. Click "I need guidance"
    4. Verify immediate redirect to `/features/guided-learning` (no popup)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
