# Task ID: A-003

# Title: Admin Dashboard

# Status: pending

# Dependencies:

# Priority: medium

# Description: Test the admin dashboard including stats display, navigation, quick actions, and system health monitoring.

# Details:

## Time Estimation

### Manual Testing

- **Estimated Time**: 25-35 minutes
- **Breakdown**:
  - Navigate and verify access: 2 minutes
  - Test dashboard stats display: 5-7 minutes
  - Test menu items navigation: 5-8 minutes
  - Test quick actions: 5-7 minutes
  - Test stats refresh: 3-4 minutes
  - Test system health indicators: 3-4 minutes
  - Test recent activity display: 2-3 minutes
- **Complexity**: Medium
- **Dependencies**: Admin authentication, API endpoints, test data

### Automated Testing

- **Estimated Time**: 10-15 minutes (first run), 2-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 4-5 minutes
  - Integration tests setup and execution: 4-6 minutes (includes API mocking)
  - E2E tests execution: 2-4 minutes
- **Complexity**: Medium
- **Dependencies**: API mocks, test stats data, authentication setup

### Total Time

- **Manual Only**: 25-35 minutes
- **Automated Only**: 10-15 minutes (first run), 2-3 minutes (subsequent)
- **Both Manual + Automated**: 35-50 minutes (first run), 27-38 minutes (subsequent)

---

## Overview

Test the admin dashboard including stats display, navigation, quick actions, and system health monitoring.

## Manual Testing Steps

1. **Navigate to admin dashboard**
   - Login as admin
   - Navigate to `/admin/dashboard`
   - Verify page loads
   - Verify admin is authenticated

2. **Test dashboard stats display**
   - Verify questions count displayed
   - Verify categories count displayed
   - Verify topics count displayed
   - Verify learning cards count displayed
   - Verify plans count displayed
   - Verify frontend tasks count displayed
   - Verify problem solving tasks count displayed
   - Verify total users count displayed

3. **Test menu items navigation**
   - Click "Questions" menu item
   - Verify navigation to `/admin/content/questions`
   - Return to dashboard
   - Click "Content Management" menu item
   - Verify navigation to `/admin/content-management`
   - Test all menu items (Frontend Tasks, Problem Solving, Users, etc.)

4. **Test quick actions**
   - Click "Add New Question" quick action
   - Verify navigation to questions page
   - Return to dashboard
   - Click "Manage Learning Cards" quick action
   - Verify navigation to content management
   - Test all quick actions

5. **Test stats refresh**
   - Click refresh button
   - Verify loading indicator shows
   - Verify stats update
   - Verify no errors occur

6. **Test system health indicators**
   - Verify database connection status
   - Verify API response time displayed
   - Verify error rate displayed
   - Verify uptime displayed

7. **Test recent activity display**
   - Verify recent activity list renders
   - Verify activity items show correct information
   - Verify timestamps are formatted correctly

8. **Test error handling**
   - Simulate API error (disconnect network)
   - Verify error message displays
   - Verify retry option available
   - Reconnect and verify stats load

# Test Strategy:

## Automated Tests

### Unit Tests

- **A-UT-011**: Test dashboard renders
  - **File**: `apps/website/src/app/admin/dashboard/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Dashboard header visible
    - Stats cards visible
    - Menu items visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-012**: Test stats cards display
  - **File**: `apps/website/src/app/admin/dashboard/page.test.tsx`
  - **Assertions**:
    - All stats cards render
    - Stats values displayed correctly
    - Loading state shown while fetching
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-013**: Test menu items render
  - **File**: `apps/website/src/app/admin/dashboard/page.test.tsx`
  - **Assertions**:
    - All menu items visible
    - Icons displayed correctly
    - Descriptions shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-014**: Test quick actions render
  - **File**: `apps/website/src/app/admin/dashboard/page.test.tsx`
  - **Assertions**:
    - Quick action cards visible
    - Action buttons clickable
    - Icons and descriptions shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-015**: Test refresh button
  - **File**: `apps/website/src/app/admin/dashboard/page.test.tsx`
  - **Assertions**:
    - Refresh button visible
    - Loading state on click
    - Refetch function called
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-014**: Test stats API call
  - **File**: `apps/website/src/app/admin/dashboard/page.integration.test.tsx`
  - **Assertions**:
    - Stats API called on mount
    - Stats data loaded correctly
    - Error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-015**: Test menu item navigation
  - **File**: `apps/website/src/app/admin/dashboard/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with correct paths
    - Navigation occurs on click
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-016**: Test quick action navigation
  - **File**: `apps/website/src/app/admin/dashboard/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with correct paths
    - Navigation occurs on click
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-017**: Test stats refresh
  - **File**: `apps/website/src/app/admin/dashboard/page.integration.test.tsx`
  - **Assertions**:
    - Refetch function called
    - Stats updated after refresh
    - Loading state managed correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-010**: Complete dashboard navigation flow
  - **File**: `tests/e2e/admin/admin-dashboard-navigation.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to dashboard
    3. Verify stats displayed
    4. Click each menu item
    5. Verify correct pages load
    6. Return to dashboard
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-011**: Dashboard stats refresh
  - **File**: `tests/e2e/admin/admin-dashboard-refresh.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to dashboard
    3. Note current stats
    4. Click refresh button
    5. Verify stats update
    6. Verify no errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
