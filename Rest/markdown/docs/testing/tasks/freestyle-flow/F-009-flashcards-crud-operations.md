# Task ID: F-009
# Title: Flashcards CRUD Operations
# Status: pending
# Dependencies: 
# Priority: medium
# Description: Test the CRUD (Create, Read, Update, Delete) operations for flashcards including adding, viewing, removing, and persistence.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 25-35 minutes
- **Breakdown**:
  - Navigate to flashcards page: 2 minutes
  - Test add flashcard: 8-10 minutes
  - Test view flashcard: 3-5 minutes
  - Test remove flashcard: 3-5 minutes
  - Test flashcard persistence: 3-5 minutes
  - Test duplicate prevention: 2-3 minutes
  - Test bulk operations: 4-5 minutes
- **Complexity**: Medium
- **Dependencies**: Questions API, localStorage/backend storage

### Automated Testing
- **Estimated Time**: 12-18 minutes (first run), 2-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 4-6 minutes
  - Integration tests setup and execution: 5-9 minutes (includes API mocking)
  - E2E tests execution: 3-3 minutes
- **Complexity**: Medium
- **Dependencies**: API mocks, localStorage mocks, test data

### Total Time
- **Manual Only**: 25-35 minutes
- **Automated Only**: 12-18 minutes (first run), 2-3 minutes (subsequent)
- **Both Manual + Automated**: 37-53 minutes (first run), 27-38 minutes (subsequent)

---

## Overview
Test the CRUD (Create, Read, Update, Delete) operations for flashcards including adding, viewing, removing, and persistence.

## Manual Testing Steps

1. **Navigate to flashcards page**
   - Go to `http://localhost:3000/flashcards`
   - Verify page loads
   - Verify existing flashcards displayed (if any)

2. **Test Add Flashcard**
   - Navigate to a question page
   - Click "Add to Flashcards" button
   - Verify flashcard added
   - Navigate to flashcards page
   - Verify new flashcard appears in list
   - Verify flashcard details correct (question, section, difficulty)

3. **Test Add Flashcard from Multiple Sources**
   - Add flashcard from question page
   - Add flashcard from practice session (wrong answer)
   - Add flashcard from bookmark
   - Verify all appear in flashcards list
   - Verify source tracked correctly

4. **Test View Flashcard**
   - Click on flashcard in list
   - Verify flashcard details shown
   - Verify question displayed
   - Verify section/difficulty shown
   - Verify can view in practice modes

5. **Test Remove Flashcard**
   - Click remove/delete button on flashcard
   - Verify confirmation (if applicable)
   - Confirm removal
   - Verify flashcard removed from list
   - Verify flashcard count decreases
   - Verify removed from practice modes

6. **Test Flashcard Persistence**
   - Add a flashcard
   - Refresh page
   - Verify flashcard still present
   - Close browser
   - Reopen and navigate to flashcards
   - Verify flashcard persisted

7. **Test Duplicate Prevention**
   - Add same question as flashcard twice
   - Verify only one instance added
   - Verify duplicate prevented message (if shown)
   - Verify flashcard count correct

8. **Test Bulk Operations**
   - Select multiple flashcards (if bulk select available)
   - Click bulk delete
   - Confirm deletion
   - Verify all selected flashcards removed
   - Verify count updated

9. **Test Flashcard Storage**
   - Add flashcards
   - Verify stored in localStorage or backend
   - Check storage directly (if accessible)
   - Verify data structure correct

10. **Test Flashcard Loading**
    - Clear localStorage (if using localStorage)
    - Refresh page
    - Verify empty state shown
    - Add flashcards
    - Verify loaded correctly

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-025**: Test add flashcard function
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - addFlashcard function works
    - Flashcard added to list
    - Duplicate prevention works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-026**: Test remove flashcard function
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - removeFlashcard function works
    - Flashcard removed from list
    - List updated correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-027**: Test load flashcards function
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - loadFlashcards reads from storage
    - Returns correct data structure
    - Handles empty storage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-028**: Test save flashcards function
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - saveFlashcards writes to storage
    - Data persisted correctly
    - Handles storage errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-029**: Test isInFlashcards function
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - Returns true if flashcard exists
    - Returns false if not exists
    - Works correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-030**: Test duplicate prevention
  - **File**: `apps/website/src/lib/flashcards.test.ts`
  - **Assertions**:
    - Adding duplicate prevented
    - Only one instance exists
    - List count correct
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-021**: Test add flashcard API call
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - API called with correct data
    - Flashcard created successfully
    - List updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-022**: Test remove flashcard API call
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - API called with correct ID
    - Flashcard deleted successfully
    - List updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-023**: Test flashcard persistence
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Flashcards loaded on mount
    - Data persisted correctly
    - Refresh maintains data
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-024**: Test flashcard list updates
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - List updates after add
    - List updates after remove
    - Count updates correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-014**: Complete flashcard CRUD flow
  - **File**: `tests/e2e/freestyle-flow/flashcards-crud.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Add a flashcard from question page
    3. Verify flashcard appears
    4. View flashcard details
    5. Remove flashcard
    6. Verify flashcard removed
    7. Add multiple flashcards
    8. Verify all appear
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-015**: Flashcard persistence
  - **File**: `tests/e2e/freestyle-flow/flashcards-persistence.spec.ts`
  - **Steps**:
    1. Add flashcards
    2. Refresh page
    3. Verify flashcards persist
    4. Close browser
    5. Reopen and navigate to flashcards
    6. Verify flashcards still present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-016**: Duplicate prevention
  - **File**: `tests/e2e/freestyle-flow/flashcards-duplicate-prevention.spec.ts`
  - **Steps**:
    1. Add a flashcard
    2. Try to add same question again
    3. Verify duplicate prevented
    4. Verify only one instance exists
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
