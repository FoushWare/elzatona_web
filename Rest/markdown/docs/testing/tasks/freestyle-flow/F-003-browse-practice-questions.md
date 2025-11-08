# Task ID: F-003
# Title: Browse Practice Questions Page
# Status: pending
# Dependencies: 
# Priority: medium
# Description: Test the Browse Practice Questions page which serves as the main entry point for freestyle learning, offering three practice options: Interview Questions, Frontend Tasks, and Problem Solving.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 30-40 minutes
- **Breakdown**:
  - Navigate to page: 2 minutes
  - Test page rendering: 3-5 minutes
  - Test practice options: 8-10 minutes
  - Test statistics display: 3-5 minutes
  - Test custom roadmap link: 3-5 minutes
  - Test navigation flows: 8-10 minutes
  - Test responsive design: 3-5 minutes
- **Complexity**: Medium
- **Dependencies**: None

### Automated Testing
- **Estimated Time**: 12-18 minutes (first run), 2-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 4-6 minutes
  - Integration tests setup and execution: 5-9 minutes
  - E2E tests execution: 3-3 minutes
- **Complexity**: Medium
- **Dependencies**: Test data, API mocks

### Total Time
- **Manual Only**: 30-40 minutes
- **Automated Only**: 12-18 minutes (first run), 2-3 minutes (subsequent)
- **Both Manual + Automated**: 42-58 minutes (first run), 32-43 minutes (subsequent)

---

## Overview
Test the Browse Practice Questions page which serves as the main entry point for freestyle learning, offering three practice options: Interview Questions, Frontend Tasks, and Problem Solving.

## Manual Testing Steps

1. **Navigate to browse practice questions page**
   - Go to `http://localhost:3000/browse-practice-questions`
   - Verify page loads correctly
   - Verify page title and header displayed

2. **Test page rendering**
   - Verify all three practice options visible:
     - Practice Interview Questions
     - Practice Frontend Tasks
     - Practice Problem Solving
   - Verify each option has description
   - Verify icons/images displayed correctly
   - Verify statistics section visible (if present)

3. **Test Practice Interview Questions option**
   - Click on "Practice Interview Questions" card/button
   - Verify navigation to `/learning-paths`
   - Verify correct page loaded

4. **Test Practice Frontend Tasks option**
   - Click on "Practice Frontend Tasks" card/button
   - Verify navigation to `/frontend-tasks`
   - Verify correct page loaded

5. **Test Practice Problem Solving option**
   - Click on "Practice Problem Solving" card/button
   - Verify navigation to `/problem-solving`
   - Verify correct page loaded

6. **Test statistics display**
   - Verify statistics cards visible (if present)
   - Verify numbers displayed correctly
   - Verify statistics update (if dynamic)

7. **Test custom roadmap link**
   - Verify "Create Custom Roadmap" button/link visible
   - Click on custom roadmap link
   - Verify navigation to `/custom-roadmap` (if authenticated)
   - Verify sign-in prompt (if not authenticated)

8. **Test responsive design**
   - Test on mobile viewport
   - Verify cards stack vertically
   - Verify text readable
   - Test on tablet viewport
   - Verify layout adapts correctly
   - Test on desktop viewport
   - Verify optimal layout

9. **Test navigation flows**
   - Navigate from homepage
   - Navigate from get-started page
   - Verify back navigation works
   - Verify browser back button works

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-031**: Test page renders correctly
  - **File**: `apps/website/src/app/browse-practice-questions/page.test.tsx`
  - **Assertions**:
    - Page component renders
    - All three practice options visible
    - No console errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-032**: Test practice option cards
  - **File**: `apps/website/src/app/browse-practice-questions/page.test.tsx`
  - **Assertions**:
    - Three cards rendered
    - Each card has title and description
    - Click handlers attached
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-033**: Test statistics display
  - **File**: `apps/website/src/app/browse-practice-questions/page.test.tsx`
  - **Assertions**:
    - Statistics cards render
    - Numbers displayed correctly
    - Formatting correct
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-025**: Test navigation to learning paths
  - **File**: `apps/website/src/app/browse-practice-questions/page.integration.test.tsx`
  - **Assertions**:
    - Clicking Interview Questions navigates correctly
    - Router.push called with correct path
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-026**: Test navigation to frontend tasks
  - **File**: `apps/website/src/app/browse-practice-questions/page.integration.test.tsx`
  - **Assertions**:
    - Clicking Frontend Tasks navigates correctly
    - Router.push called with correct path
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-027**: Test navigation to problem solving
  - **File**: `apps/website/src/app/browse-practice-questions/page.integration.test.tsx`
  - **Assertions**:
    - Clicking Problem Solving navigates correctly
    - Router.push called with correct path
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-028**: Test custom roadmap navigation
  - **File**: `apps/website/src/app/browse-practice-questions/page.integration.test.tsx`
  - **Assertions**:
    - Authenticated users navigate to custom roadmap
    - Unauthenticated users see sign-in prompt
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-017**: Complete browse practice questions flow
  - **File**: `tests/e2e/freestyle-flow/browse-practice-questions.spec.ts`
  - **Steps**:
    1. Navigate to browse practice questions page
    2. Verify all options visible
    3. Click Interview Questions
    4. Verify navigation to learning paths
    5. Navigate back
    6. Click Frontend Tasks
    7. Verify navigation to frontend tasks
    8. Navigate back
    9. Click Problem Solving
    10. Verify navigation to problem solving
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
