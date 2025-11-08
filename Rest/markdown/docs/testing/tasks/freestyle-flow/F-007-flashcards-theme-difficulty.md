# Task: Flashcards Theme and Difficulty Filtering

## Time Estimation

### Manual Testing
- **Estimated Time**: 30-40 minutes
- **Breakdown**:
  - Navigate to flashcards page: 2 minutes
  - Test theme/section filter: 8-10 minutes
  - Test difficulty filter: 8-10 minutes
  - Test combined filters: 5-7 minutes
  - Test filter reset: 2-3 minutes
  - Test filter persistence: 3-5 minutes
  - Test empty filter results: 2-3 minutes
- **Complexity**: Medium
- **Dependencies**: Flashcards with different sections/themes and difficulty levels

### Automated Testing
- **Estimated Time**: 10-15 minutes (first run), 2-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 3-5 minutes
  - Integration tests setup and execution: 4-6 minutes (includes filter logic)
  - E2E tests execution: 3-4 minutes
- **Complexity**: Medium
- **Dependencies**: Test flashcard data with various sections and difficulties

### Total Time
- **Manual Only**: 30-40 minutes
- **Automated Only**: 10-15 minutes (first run), 2-3 minutes (subsequent)
- **Both Manual + Automated**: 40-55 minutes (first run), 32-43 minutes (subsequent)

---

## Overview
Test the flashcards filtering functionality by theme (section) and difficulty level, including filter combinations, reset, and persistence.

## Manual Testing Steps

1. **Navigate to flashcards page**
   - Go to `http://localhost:3000/flashcards`
   - Verify page loads
   - Verify flashcards list displayed

2. **Test theme/section filter**
   - Verify filter dropdown visible
   - Click on section/theme filter
   - Verify all available sections listed (e.g., HTML, CSS, JavaScript, React)
   - Select a specific section (e.g., "JavaScript")
   - Verify only flashcards from that section displayed
   - Verify flashcard count updates
   - Select "All" option
   - Verify all flashcards shown again

3. **Test difficulty filter**
   - Verify difficulty filter dropdown visible
   - Click on difficulty filter
   - Verify all available difficulties listed (e.g., easy, medium, hard)
   - Select a specific difficulty (e.g., "medium")
   - Verify only flashcards with that difficulty displayed
   - Verify flashcard count updates
   - Select "All" option
   - Verify all flashcards shown again

4. **Test combined filters (theme + difficulty)**
   - Select a specific section (e.g., "JavaScript")
   - Select a specific difficulty (e.g., "hard")
   - Verify only flashcards matching both filters displayed
   - Verify flashcard count reflects combined filter
   - Change section while keeping difficulty
   - Verify filter updates correctly
   - Change difficulty while keeping section
   - Verify filter updates correctly

5. **Test filter reset**
   - Apply both filters (section and difficulty)
   - Click "Reset Filters" or set both to "All"
   - Verify all flashcards shown
   - Verify filter dropdowns reset to "All"

6. **Test filter persistence**
   - Apply filters
   - Refresh page
   - Verify filters maintained (if implemented)
   - OR verify filters reset to default (if not persisted)

7. **Test empty filter results**
   - Select a section that has no flashcards
   - Verify "No flashcards" message displayed
   - Verify helpful message shown
   - Reset filters
   - Verify flashcards appear again

8. **Test filter with practice modes**
   - Apply section filter
   - Start flip mode
   - Verify only filtered flashcards in practice
   - Apply difficulty filter
   - Start quiz mode
   - Verify only filtered flashcards in quiz
   - Verify filter affects practice session

9. **Test filter with flashcard operations**
   - Apply filters
   - Add new flashcard (should appear if matches filter)
   - Remove flashcard (should disappear from filtered list)
   - Verify filter updates correctly

## Automated Tests

### Unit Tests

- **F-UT-013**: Test flashcards page renders with filters
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Section filter dropdown visible
    - Difficulty filter dropdown visible
    - Filter options populated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-014**: Test section filter dropdown
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - All sections listed
    - "All" option present
    - Filter value updates on change
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-015**: Test difficulty filter dropdown
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - All difficulties listed
    - "All" option present
    - Filter value updates on change
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-016**: Test filter state management
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Filter state updates correctly
    - Combined filters work
    - Filter reset works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-017**: Test filtered flashcard list
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Only matching flashcards displayed
    - Count updates correctly
    - Empty state shown when no matches
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-012**: Test section filter functionality
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Filtering by section works
    - Correct flashcards shown
    - Filter persists during session
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-013**: Test difficulty filter functionality
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Filtering by difficulty works
    - Correct flashcards shown
    - Filter persists during session
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-014**: Test combined filters
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Both filters applied together
    - Only matching flashcards shown
    - Filter updates when either filter changes
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-015**: Test filter with practice modes
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Filters applied to flip mode
    - Filters applied to quiz mode
    - Practice session uses filtered cards
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-016**: Test filter reset
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Reset clears all filters
    - All flashcards shown after reset
    - Filter state returns to default
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-007**: Complete theme filtering flow
  - **File**: `tests/e2e/freestyle-flow/flashcards-theme-filter.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Verify all flashcards shown
    3. Select a specific section/theme
    4. Verify only that section's flashcards shown
    5. Start flip practice mode
    6. Verify only filtered flashcards in practice
    7. Reset filter
    8. Verify all flashcards shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-008**: Complete difficulty filtering flow
  - **File**: `tests/e2e/freestyle-flow/flashcards-difficulty-filter.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Select a specific difficulty level
    3. Verify only that difficulty's flashcards shown
    4. Start quiz practice mode
    5. Verify only filtered flashcards in quiz
    6. Change difficulty
    7. Verify filter updates
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-009**: Combined theme and difficulty filtering
  - **File**: `tests/e2e/freestyle-flow/flashcards-combined-filters.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Select section "JavaScript"
    3. Select difficulty "hard"
    4. Verify only matching flashcards shown
    5. Change section to "React"
    6. Verify filter updates (still showing hard difficulty)
    7. Change difficulty to "easy"
    8. Verify filter updates (still showing React section)
    9. Reset both filters
    10. Verify all flashcards shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-010**: Empty filter results handling
  - **File**: `tests/e2e/freestyle-flow/flashcards-empty-filter.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Select section with no flashcards (if possible)
    3. Verify empty state message
    4. Select difficulty with no flashcards
    5. Verify empty state message
    6. Reset filters
    7. Verify flashcards appear
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- flashcards/page.test.tsx

# Run integration tests
npm run test:integration -- flashcards/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- flashcards-*-filter.spec.ts
```

## Notes

- All tests can run in parallel
- Requires flashcards with different sections and difficulties
- Tests filter logic and UI interactions
- No dependencies on other tests

