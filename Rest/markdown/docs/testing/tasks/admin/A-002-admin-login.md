# Task: Admin Login

## Time Estimation

### Manual Testing
- **Estimated Time**: 15-20 minutes
- **Breakdown**:
  - Navigate to login page: 1 minute
  - Test login form rendering: 2 minutes
  - Test successful login: 3-4 minutes
  - Test invalid credentials: 2-3 minutes
  - Test form validation: 3-4 minutes
  - Test redirect after login: 2-3 minutes
  - Test session persistence: 2-3 minutes
- **Complexity**: Low-Medium
- **Dependencies**: Admin credentials, authentication system

### Automated Testing
- **Estimated Time**: 6-10 minutes (first run), 1-2 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 2-3 minutes
  - Integration tests setup and execution: 2-4 minutes (includes auth mocking)
  - E2E tests execution: 2-3 minutes
- **Complexity**: Medium
- **Dependencies**: Authentication mocks, test admin credentials

### Total Time
- **Manual Only**: 15-20 minutes
- **Automated Only**: 6-10 minutes (first run), 1-2 minutes (subsequent)
- **Both Manual + Automated**: 21-30 minutes (first run), 16-22 minutes (subsequent)

---

## Overview
Test the admin login flow including authentication, form validation, error handling, and redirect functionality.

## Manual Testing Steps

1. **Navigate to admin login page**
   - Go to `http://localhost:3000/admin/login`
   - Verify page loads correctly
   - Verify login form is visible

2. **Test login form rendering**
   - Verify email input field is present
   - Verify password input field is present
   - Verify "Sign In" button is present
   - Verify "Back to Home" link is present

3. **Test form validation**
   - Try to submit empty form
   - Verify error messages appear
   - Test invalid email format
   - Test weak password
   - Verify validation messages are clear

4. **Test successful login**
   - Enter valid admin credentials
   - Click "Sign In" button
   - Verify loading state shows
   - Verify redirect to `/admin/dashboard`
   - Verify admin session is created

5. **Test invalid credentials**
   - Enter invalid email
   - Enter invalid password
   - Click "Sign In"
   - Verify error message appears
   - Verify no redirect occurs
   - Verify form remains on login page

6. **Test session persistence**
   - Login successfully
   - Close browser tab
   - Open new tab and navigate to `/admin/dashboard`
   - Verify still authenticated (no redirect to login)
   - Verify can access admin pages

7. **Test logout and re-login**
   - Logout from admin
   - Navigate to `/admin/dashboard`
   - Verify redirect to login page
   - Login again
   - Verify successful authentication

## Automated Tests

### Unit Tests

- **A-UT-006**: Test admin login page renders
  - **File**: `apps/website/src/app/admin/login/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Login form visible
    - Email input present
    - Password input present
    - Submit button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-007**: Test form inputs handle changes
  - **File**: `apps/website/src/app/admin/login/page.test.tsx`
  - **Assertions**:
    - Email input updates on change
    - Password input updates on change
    - State updates correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-008**: Test form validation
  - **File**: `apps/website/src/app/admin/login/page.test.tsx`
  - **Assertions**:
    - Error shown for empty email
    - Error shown for invalid email format
    - Error shown for empty password
    - Error shown for weak password
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-009**: Test loading state
  - **File**: `apps/website/src/app/admin/login/page.test.tsx`
  - **Assertions**:
    - Loading state shows during submission
    - Submit button disabled during loading
    - Form inputs disabled during loading
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-010**: Test error message display
  - **File**: `apps/website/src/app/admin/login/page.test.tsx`
  - **Assertions**:
    - Error message visible on login failure
    - Error message text is clear
    - Error message dismissible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-010**: Test login API call
  - **File**: `apps/website/src/app/admin/login/page.integration.test.tsx`
  - **Assertions**:
    - Login API called with correct credentials
    - Success response handled
    - Error response handled
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-011**: Test successful login flow
  - **File**: `apps/website/src/app/admin/login/page.integration.test.tsx`
  - **Assertions**:
    - Login function called
    - Session created
    - Router.replace called with `/admin/dashboard`
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-012**: Test failed login flow
  - **File**: `apps/website/src/app/admin/login/page.integration.test.tsx`
  - **Assertions**:
    - Error state set
    - Error message displayed
    - No redirect occurs
    - Form remains on login page
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-013**: Test authentication state check
  - **File**: `apps/website/src/app/admin/login/page.integration.test.tsx`
  - **Assertions**:
    - Already authenticated users redirected
    - Loading state shown during auth check
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-007**: Complete admin login flow
  - **File**: `tests/e2e/admin/admin-login.spec.ts`
  - **Steps**:
    1. Navigate to `/admin/login`
    2. Enter valid admin credentials
    3. Click "Sign In"
    4. Verify redirect to `/admin/dashboard`
    5. Verify admin session active
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-008**: Admin login with invalid credentials
  - **File**: `tests/e2e/admin/admin-login-invalid.spec.ts`
  - **Steps**:
    1. Navigate to `/admin/login`
    2. Enter invalid credentials
    3. Click "Sign In"
    4. Verify error message appears
    5. Verify no redirect
    6. Verify can retry login
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-009**: Admin session persistence
  - **File**: `tests/e2e/admin/admin-session-persistence.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Close browser
    3. Reopen and navigate to `/admin/dashboard`
    4. Verify still authenticated
    5. Verify can access admin pages
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- admin/login/page.test.tsx

# Run integration tests
npm run test:integration -- admin/login/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- admin-login*.spec.ts
```

## Notes

- All tests can run in parallel
- Requires admin credentials for E2E tests
- Tests authentication integration
- No dependencies on other tests

