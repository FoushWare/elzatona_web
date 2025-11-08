# Task ID: F-004
# Title: Learning Paths Practice
# Status: pending
# Dependencies: 
# Priority: high
# Description: Test the Learning Paths page which displays available learning paths (categories → topics → questions) for practice, including search, filtering, and path selection.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 40-50 minutes
- **Breakdown**:
  - Navigate to page: 2 minutes
  - Test page rendering: 5-7 minutes
  - Test learning paths display: 8-10 minutes
  - Test search functionality: 5-7 minutes
  - Test filtering: 5-7 minutes
  - Test path selection: 5-7 minutes
  - Test navigation to path details: 5-7 minutes
  - Test responsive design: 3-5 minutes
- **Complexity**: Medium-High
- **Dependencies**: Learning paths data from API

### Automated Testing
- **Estimated Time**: 15-22 minutes (first run), 3-4 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-8 minutes
  - Integration tests setup and execution: 7-11 minutes (includes API mocking)
  - E2E tests execution: 3-3 minutes
- **Complexity**: Medium-High
- **Dependencies**: API mocks, test data

### Total Time
- **Manual Only**: 40-50 minutes
- **Automated Only**: 15-22 minutes (first run), 3-4 minutes (subsequent)
- **Both Manual + Automated**: 55-72 minutes (first run), 43-54 minutes (subsequent)

---

## Overview
Test the Learning Paths page which displays available learning paths (categories → topics → questions) for practice, including search, filtering, and path selection.

## Manual Testing Steps

1. **Navigate to learning paths page**
   - Go to `http://localhost:3000/learning-paths`
   - Verify page loads correctly
   - Verify page title and header displayed

2. **Test page rendering**
   - Verify learning paths displayed
   - Verify categories visible
   - Verify topics visible under categories
   - Verify question counts displayed
   - Verify loading state (if applicable)

3. **Test learning paths display**
   - Verify paths organized by category
   - Verify each path shows:
     - Name
     - Description
     - Question count
     - Topics count
   - Verify paths fetched from API
   - Verify empty state (if no paths)

4. **Test search functionality**
   - Enter search term in search box
   - Verify results filter in real-time
   - Verify search works across:
     - Path names
     - Descriptions
     - Topics
   - Clear search
   - Verify all paths shown again

5. **Test filtering**
   - Test category filter (if available)
   - Test difficulty filter (if available)
   - Test combined filters
   - Verify filter updates results
   - Reset filters
   - Verify all paths shown

6. **Test path selection**
   - Click on a learning path
   - Verify path details shown
   - Verify topics expanded
   - Verify questions listed
   - Verify "Start" or "Practice" button visible

7. **Test navigation to path details**
   - Click "Start" or "Practice" button
   - Verify navigation to path practice page
   - Verify correct path ID in URL
   - Verify path data loaded

8. **Test view modes**
   - Test grid view (if available)
   - Test list view (if available)
   - Verify view mode toggle works
   - Verify layout changes correctly

9. **Test responsive design**
   - Test on mobile viewport
   - Verify cards stack correctly
   - Test on tablet viewport
   - Verify layout adapts
   - Test on desktop viewport
   - Verify optimal layout

10. **Test error handling**
    - Simulate API error
    - Verify error message displayed
    - Verify retry option (if available)
    - Verify graceful degradation

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-034**: Test page renders correctly
  - **File**: `apps/website/src/app/learning-paths/page.test.tsx`
  - **Assertions**:
    - Page component renders
    - Loading state shown initially
    - No console errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-035**: Test learning paths list rendering
  - **File**: `apps/website/src/app/learning-paths/page.test.tsx`
  - **Assertions**:
    - Paths rendered correctly
    - Categories organized
    - Topics displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-036**: Test search input
  - **File**: `apps/website/src/app/learning-paths/page.test.tsx`
  - **Assertions**:
    - Search input renders
    - Value updates on change
    - Filter function called
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-037**: Test filter functionality
  - **File**: `apps/website/src/app/learning-paths/page.test.tsx`
  - **Assertions**:
    - Filters render
    - Filter state updates
    - Results filtered correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-029**: Test API data fetching
  - **File**: `apps/website/src/app/learning-paths/page.integration.test.tsx`
  - **Assertions**:
    - API called on mount
    - Data loaded correctly
    - Paths displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-030**: Test search functionality
  - **File**: `apps/website/src/app/learning-paths/page.integration.test.tsx`
  - **Assertions**:
    - Search filters paths
    - Results update in real-time
    - Search clears correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-031**: Test path selection
  - **File**: `apps/website/src/app/learning-paths/page.integration.test.tsx`
  - **Assertions**:
    - Clicking path shows details
    - Navigation to practice page works
    - Correct path ID passed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-032**: Test error handling
  - **File**: `apps/website/src/app/learning-paths/page.integration.test.tsx`
  - **Assertions**:
    - Error state displayed
    - Error message shown
    - Retry works (if available)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-018**: Complete learning paths flow
  - **File**: `tests/e2e/freestyle-flow/learning-paths.spec.ts`
  - **Steps**:
    1. Navigate to learning paths page
    2. Verify paths loaded
    3. Search for a path
    4. Verify results filtered
    5. Click on a path
    6. Verify path details shown
    7. Click "Start" button
    8. Verify navigation to practice page
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-019**: Learning paths search and filter
  - **File**: `tests/e2e/freestyle-flow/learning-paths-search.spec.ts`
  - **Steps**:
    1. Navigate to learning paths page
    2. Enter search term
    3. Verify results update
    4. Apply filter
    5. Verify combined search and filter work
    6. Clear filters
    7. Verify all paths shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
