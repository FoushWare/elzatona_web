# Task ID: F-005
# Title: Frontend Tasks Practice
# Status: pending
# Dependencies: 
# Priority: high
# Description: Test the Frontend Tasks practice page which displays coding challenges/tasks for frontend development practice, including search, filtering, task selection, and code editor functionality.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 45-60 minutes
- **Breakdown**:
  - Navigate to page: 2 minutes
  - Test page rendering: 5-7 minutes
  - Test tasks display: 8-10 minutes
  - Test search functionality: 5-7 minutes
  - Test filtering (difficulty, category): 8-10 minutes
  - Test view modes (grid/list): 3-5 minutes
  - Test task selection: 5-7 minutes
  - Test task details: 5-7 minutes
  - Test code editor (if applicable): 4-6 minutes
- **Complexity**: High
- **Dependencies**: Frontend tasks data from API

### Automated Testing
- **Estimated Time**: 18-25 minutes (first run), 3-5 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 6-9 minutes
  - Integration tests setup and execution: 9-13 minutes (includes API mocking)
  - E2E tests execution: 3-3 minutes
- **Complexity**: High
- **Dependencies**: API mocks, test data, code editor mocks

### Total Time
- **Manual Only**: 45-60 minutes
- **Automated Only**: 18-25 minutes (first run), 3-5 minutes (subsequent)
- **Both Manual + Automated**: 63-85 minutes (first run), 48-65 minutes (subsequent)

---

## Overview
Test the Frontend Tasks practice page which displays coding challenges/tasks for frontend development practice, including search, filtering, task selection, and code editor functionality.

## Manual Testing Steps

1. **Navigate to frontend tasks page**
   - Go to `http://localhost:3000/frontend-tasks`
   - Verify page loads correctly
   - Verify page title and header displayed

2. **Test page rendering**
   - Verify tasks displayed
   - Verify task cards visible
   - Verify loading state (if applicable)
   - Verify empty state (if no tasks)

3. **Test tasks display**
   - Verify each task shows:
     - Title
     - Description
     - Category
     - Difficulty level
     - Estimated time
     - Tags
   - Verify tasks fetched from API
   - Verify pagination (if applicable)

4. **Test search functionality**
   - Enter search term in search box
   - Verify results filter in real-time
   - Verify search works across:
     - Task titles
     - Descriptions
     - Tags
   - Clear search
   - Verify all tasks shown again

5. **Test difficulty filter**
   - Select "Easy" difficulty
   - Verify only easy tasks shown
   - Select "Medium" difficulty
   - Verify only medium tasks shown
   - Select "Hard" difficulty
   - Verify only hard tasks shown
   - Select "All"
   - Verify all tasks shown

6. **Test category filter**
   - Select a category (e.g., "React")
   - Verify only tasks in that category shown
   - Select another category
   - Verify filter updates
   - Select "All"
   - Verify all tasks shown

7. **Test combined filters**
   - Apply difficulty filter
   - Apply category filter
   - Apply search term
   - Verify all filters work together
   - Clear one filter
   - Verify remaining filters still work

8. **Test view modes**
   - Test grid view
   - Verify cards in grid layout
   - Test list view
   - Verify tasks in list layout
   - Toggle between views
   - Verify view preference persists (if applicable)

9. **Test task selection**
   - Click on a task card
   - Verify task details page opens
   - Verify correct task ID in URL
   - Verify task data loaded correctly

10. **Test task details**
    - Verify task title and description
    - Verify requirements shown
    - Verify hints available (if applicable)
    - Verify starter code provided
    - Verify test cases shown (if applicable)
    - Verify solution hidden initially

11. **Test code editor (if applicable)**
    - Verify code editor renders
    - Verify starter code loaded
    - Test code editing
    - Test syntax highlighting
    - Test code execution (if applicable)
    - Test code submission

12. **Test responsive design**
    - Test on mobile viewport
    - Verify cards stack correctly
    - Test on tablet viewport
    - Verify layout adapts
    - Test on desktop viewport
    - Verify optimal layout

13. **Test error handling**
    - Simulate API error
    - Verify error message displayed
    - Verify retry option (if available)
    - Verify graceful degradation

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-038**: Test page renders correctly
  - **File**: `apps/website/src/app/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Page component renders
    - Loading state shown initially
    - No console errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-039**: Test tasks list rendering
  - **File**: `apps/website/src/app/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Tasks rendered correctly
    - Task cards show all required info
    - Empty state shown when no tasks
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-040**: Test search input
  - **File**: `apps/website/src/app/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Search input renders
    - Value updates on change
    - Filter function called
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-041**: Test filter functionality
  - **File**: `apps/website/src/app/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - Difficulty filter works
    - Category filter works
    - Combined filters work
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-042**: Test view mode toggle
  - **File**: `apps/website/src/app/frontend-tasks/page.test.tsx`
  - **Assertions**:
    - View mode state updates
    - Layout changes correctly
    - Preference persists (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-033**: Test API data fetching
  - **File**: `apps/website/src/app/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - API called on mount
    - Data loaded correctly
    - Tasks displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-034**: Test search and filtering
  - **File**: `apps/website/src/app/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - Search filters tasks
    - Difficulty filter works
    - Category filter works
    - Combined filters work
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-035**: Test task selection
  - **File**: `apps/website/src/app/frontend-tasks/page.integration.test.tsx`
  - **Assertions**:
    - Clicking task navigates correctly
    - Task details loaded
    - Correct task ID in URL
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-036**: Test task details page
  - **File**: `apps/website/src/app/frontend-tasks/[taskId]/page.integration.test.tsx`
  - **Assertions**:
    - Task details rendered
    - Requirements shown
    - Starter code loaded
    - Code editor renders (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-020**: Complete frontend tasks flow
  - **File**: `tests/e2e/freestyle-flow/frontend-tasks.spec.ts`
  - **Steps**:
    1. Navigate to frontend tasks page
    2. Verify tasks loaded
    3. Search for a task
    4. Apply difficulty filter
    5. Click on a task
    6. Verify task details shown
    7. Verify code editor (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-021**: Frontend tasks search and filter
  - **File**: `tests/e2e/freestyle-flow/frontend-tasks-filters.spec.ts`
  - **Steps**:
    1. Navigate to frontend tasks page
    2. Enter search term
    3. Apply difficulty filter
    4. Apply category filter
    5. Verify combined filters work
    6. Toggle view mode
    7. Verify view changes
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
