# Task: Problem Solving Practice

## Time Estimation

### Manual Testing
- **Estimated Time**: 45-60 minutes
- **Breakdown**:
  - Navigate to page: 2 minutes
  - Test page rendering: 5-7 minutes
  - Test problems display: 8-10 minutes
  - Test search functionality: 5-7 minutes
  - Test filtering (category, difficulty): 8-10 minutes
  - Test view modes (grid/list): 3-5 minutes
  - Test problem selection: 5-7 minutes
  - Test problem details: 5-7 minutes
  - Test code editor (if applicable): 4-6 minutes
- **Complexity**: High
- **Dependencies**: Problem solving tasks data from API

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
Test the Problem Solving practice page which displays algorithm and logic problems for practice, including search, filtering, problem selection, and code editor functionality.

## Manual Testing Steps

1. **Navigate to problem solving page**
   - Go to `http://localhost:3000/problem-solving`
   - Verify page loads correctly
   - Verify page title and header displayed

2. **Test page rendering**
   - Verify problems displayed
   - Verify problem cards visible
   - Verify loading state (if applicable)
   - Verify empty state (if no problems)

3. **Test problems display**
   - Verify each problem shows:
     - Title
     - Description
     - Category (Arrays, Strings, Trees, etc.)
     - Difficulty level (Easy, Medium, Hard)
     - Tags
   - Verify problems fetched from API
   - Verify pagination (if applicable)

4. **Test search functionality**
   - Enter search term in search box
   - Verify results filter in real-time
   - Verify search works across:
     - Problem titles
     - Descriptions
     - Tags
   - Clear search
   - Verify all problems shown again

5. **Test category filter**
   - Select a category (e.g., "Arrays")
   - Verify only problems in that category shown
   - Select another category
   - Verify filter updates
   - Select "All"
   - Verify all problems shown

6. **Test difficulty filter**
   - Select "Easy" difficulty
   - Verify only easy problems shown
   - Select "Medium" difficulty
   - Verify only medium problems shown
   - Select "Hard" difficulty
   - Verify only hard problems shown
   - Select "All"
   - Verify all problems shown

7. **Test combined filters**
   - Apply category filter
   - Apply difficulty filter
   - Apply search term
   - Verify all filters work together
   - Clear one filter
   - Verify remaining filters still work

8. **Test view modes**
   - Test grid view
   - Verify cards in grid layout
   - Test list view
   - Verify problems in list layout
   - Toggle between views
   - Verify view preference persists (if applicable)

9. **Test problem selection**
   - Click on a problem card
   - Verify problem details page opens
   - Verify correct problem ID in URL
   - Verify problem data loaded correctly

10. **Test problem details**
    - Verify problem title and description
    - Verify constraints shown
    - Verify examples provided
    - Verify expected output shown
    - Verify hints available (if applicable)
    - Verify starter code provided
    - Verify test cases shown (if applicable)
    - Verify solution hidden initially

11. **Test code editor (if applicable)**
    - Verify code editor renders
    - Verify starter code loaded
    - Test code editing
    - Test syntax highlighting
    - Test code execution
    - Test code submission
    - Verify test results displayed

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

## Automated Tests

### Unit Tests

- **F-UT-043**: Test page renders correctly
  - **File**: `apps/website/src/app/problem-solving/page.test.tsx`
  - **Assertions**:
    - Page component renders
    - Loading state shown initially
    - No console errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-044**: Test problems list rendering
  - **File**: `apps/website/src/app/problem-solving/page.test.tsx`
  - **Assertions**:
    - Problems rendered correctly
    - Problem cards show all required info
    - Empty state shown when no problems
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-045**: Test search input
  - **File**: `apps/website/src/app/problem-solving/page.test.tsx`
  - **Assertions**:
    - Search input renders
    - Value updates on change
    - Filter function called
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-046**: Test filter functionality
  - **File**: `apps/website/src/app/problem-solving/page.test.tsx`
  - **Assertions**:
    - Category filter works
    - Difficulty filter works
    - Combined filters work
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-047**: Test view mode toggle
  - **File**: `apps/website/src/app/problem-solving/page.test.tsx`
  - **Assertions**:
    - View mode state updates
    - Layout changes correctly
    - Preference persists (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-037**: Test API data fetching
  - **File**: `apps/website/src/app/problem-solving/page.integration.test.tsx`
  - **Assertions**:
    - API called on mount
    - Data loaded correctly
    - Problems displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-038**: Test search and filtering
  - **File**: `apps/website/src/app/problem-solving/page.integration.test.tsx`
  - **Assertions**:
    - Search filters problems
    - Category filter works
    - Difficulty filter works
    - Combined filters work
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-039**: Test problem selection
  - **File**: `apps/website/src/app/problem-solving/page.integration.test.tsx`
  - **Assertions**:
    - Clicking problem navigates correctly
    - Problem details loaded
    - Correct problem ID in URL
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-040**: Test problem details page
  - **File**: `apps/website/src/app/problem-solving/[problemId]/page.integration.test.tsx`
  - **Assertions**:
    - Problem details rendered
    - Examples shown
    - Constraints shown
    - Code editor renders (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-022**: Complete problem solving flow
  - **File**: `tests/e2e/freestyle-flow/problem-solving.spec.ts`
  - **Steps**:
    1. Navigate to problem solving page
    2. Verify problems loaded
    3. Search for a problem
    4. Apply category filter
    5. Apply difficulty filter
    6. Click on a problem
    7. Verify problem details shown
    8. Verify code editor (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-023**: Problem solving search and filter
  - **File**: `tests/e2e/freestyle-flow/problem-solving-filters.spec.ts`
  - **Steps**:
    1. Navigate to problem solving page
    2. Enter search term
    3. Apply category filter
    4. Apply difficulty filter
    5. Verify combined filters work
    6. Toggle view mode
    7. Verify view changes
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- problem-solving/page.test.tsx

# Run integration tests
npm run test:integration -- problem-solving/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- problem-solving*.spec.ts
```

## Notes

- All tests can run in parallel
- Tests API integration
- Tests code editor functionality
- No dependencies on other tests

