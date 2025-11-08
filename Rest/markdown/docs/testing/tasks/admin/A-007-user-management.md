# Task ID: A-007
# Title: Admin User Management
# Status: pending
# Dependencies: 
# Priority: high
# Description: Test the admin user management page including user CRUD operations, role management, and user search/filter functionality.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 30-45 minutes
- **Breakdown**:
  - Navigate and verify access: 2 minutes
  - Test users list display: 5-7 minutes
  - Test create user: 8-10 minutes
  - Test edit user: 6-8 minutes
  - Test delete user: 3-5 minutes
  - Test user roles/permissions: 5-7 minutes
  - Test user search/filter: 3-5 minutes
- **Complexity**: Medium-High
- **Dependencies**: Admin authentication, API endpoints, user data

### Automated Testing
- **Estimated Time**: 12-20 minutes (first run), 2-4 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 4-6 minutes
  - Integration tests setup and execution: 5-10 minutes (includes API mocking)
  - E2E tests execution: 3-4 minutes
- **Complexity**: Medium-High
- **Dependencies**: API mocks, test user data, authentication setup

### Total Time
- **Manual Only**: 30-45 minutes
- **Automated Only**: 12-20 minutes (first run), 2-4 minutes (subsequent)
- **Both Manual + Automated**: 42-65 minutes (first run), 32-49 minutes (subsequent)

---

## Overview
Test the admin user management page including user CRUD operations, role management, and user search/filter functionality.

## Manual Testing Steps

1. **Navigate to user management page**
   - Login as admin
   - Navigate to `/admin/users`
   - Verify page loads
   - Verify users list displayed

2. **Test users list display**
   - Verify all users listed
   - Verify user emails displayed
   - Verify user roles displayed
   - Verify user status indicators
   - Verify creation dates shown

3. **Test create user**
   - Click "Add New User" or "Create User"
   - Fill in user form:
     - Email (required)
     - Password (required)
     - Role (admin/user)
     - Name (optional)
   - Save user
   - Verify user appears in list
   - Verify user can login

4. **Test edit user**
   - Click edit on existing user
   - Modify user fields (email, role, etc.)
   - Save changes
   - Verify user updated in list
   - Verify changes reflected

5. **Test delete user**
   - Click delete on user
   - Confirm deletion
   - Verify user removed from list
   - Verify user cannot login

6. **Test user roles/permissions**
   - Create user with "user" role
   - Verify user has limited access
   - Change role to "admin"
   - Verify user has admin access
   - Test role-based permissions

7. **Test user search/filter**
   - Enter search term (email/name)
   - Verify filtered results
   - Test filter by role
   - Test filter by status
   - Clear filters
   - Verify all users shown

8. **Test user status management**
   - Activate/deactivate user
   - Verify status updated
   - Verify inactive user cannot login
   - Verify active user can login

# Test Strategy:

## Automated Tests

### Unit Tests

- **A-UT-032**: Test user management page renders
  - **File**: `apps/website/src/app/admin/users/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Users list visible
    - Create button visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-033**: Test user list displays
  - **File**: `apps/website/src/app/admin/users/page.test.tsx`
  - **Assertions**:
    - Users rendered in list
    - User emails visible
    - User roles visible
    - Status indicators shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-034**: Test create user form
  - **File**: `apps/website/src/app/admin/users/page.test.tsx`
  - **Assertions**:
    - Form fields visible
    - Role selector present
    - Submit button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-035**: Test user validation
  - **File**: `apps/website/src/app/admin/users/page.test.tsx`
  - **Assertions**:
    - Email validation works
    - Password validation works
    - Required fields validated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-030**: Test users API calls
  - **File**: `apps/website/src/app/admin/users/page.integration.test.tsx`
  - **Assertions**:
    - List API called on mount
    - Create API called with correct data
    - Update API called with correct data
    - Delete API called with correct ID
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-031**: Test user creation flow
  - **File**: `apps/website/src/app/admin/users/page.integration.test.tsx`
  - **Assertions**:
    - User created successfully
    - Password hashed correctly
    - Role assigned correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-032**: Test user role update
  - **File**: `apps/website/src/app/admin/users/page.integration.test.tsx`
  - **Assertions**:
    - Role update API called
    - Permissions updated
    - User access changed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-018**: Complete user management CRUD flow
  - **File**: `tests/e2e/admin/user-management-crud.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to user management
    3. Create a new user
    4. Verify user appears
    5. Edit the user
    6. Change user role
    7. Delete the user
    8. Verify user removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-019**: User role and permissions
  - **File**: `tests/e2e/admin/user-roles-permissions.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Create user with "user" role
    3. Logout
    4. Login as new user
    5. Verify limited access
    6. Logout
    7. Login as admin
    8. Change user role to "admin"
    9. Logout
    10. Login as updated user
    11. Verify admin access
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
