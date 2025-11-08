# Task ID: F-008
# Title: Flashcards Practice Modes (List, Flip, Quiz)
# Status: pending
# Dependencies: 
# Priority: high
# Description: Test the three practice modes (List, Flip, Quiz) for flashcards including mode switching, card navigation, shuffle, and progress tracking.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 40-50 minutes
- **Breakdown**:
  - Navigate to flashcards page: 2 minutes
  - Test list mode: 5-7 minutes
  - Test flip mode: 12-15 minutes
  - Test quiz mode: 12-15 minutes
  - Test mode switching: 3-5 minutes
  - Test navigation between cards: 3-5 minutes
  - Test shuffle functionality: 2-3 minutes
- **Complexity**: Medium-High
- **Dependencies**: Flashcards data, practice modes implementation

### Automated Testing
- **Estimated Time**: 15-20 minutes (first run), 3-4 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-7 minutes
  - Integration tests setup and execution: 6-9 minutes (includes mode switching)
  - E2E tests execution: 4-4 minutes
- **Complexity**: Medium-High
- **Dependencies**: Test flashcard data, practice mode components

### Total Time
- **Manual Only**: 40-50 minutes
- **Automated Only**: 15-20 minutes (first run), 3-4 minutes (subsequent)
- **Both Manual + Automated**: 55-70 minutes (first run), 43-54 minutes (subsequent)

---

## Overview
Test the three practice modes (List, Flip, Quiz) for flashcards including mode switching, card navigation, shuffle, and progress tracking.

## Manual Testing Steps

1. **Navigate to flashcards page**
   - Go to `http://localhost:3000/flashcards`
   - Verify page loads
   - Verify default list mode displayed

2. **Test List Mode**
   - Verify all flashcards listed
   - Verify flashcard details shown (question, section, difficulty)
   - Test scroll through list
   - Test remove flashcard from list
   - Verify list updates after removal
   - Test add flashcard to list
   - Verify new flashcard appears

3. **Test Flip Mode**
   - Click "Start Flip Practice" or similar button
   - Verify flip mode activated
   - Verify card shows question side
   - Click card to flip
   - Verify answer side shown
   - Verify flip animation works
   - Test next card button
   - Verify moves to next card
   - Test previous card button
   - Verify moves to previous card
   - Test shuffle button
   - Verify cards reordered
   - Test back to list button
   - Verify returns to list mode

4. **Test Quiz Mode**
   - Click "Start Quiz Practice" or similar button
   - Verify quiz mode activated
   - Verify question displayed
   - Verify multiple choice options shown
   - Select an answer
   - Verify answer feedback shown
   - Verify correct/incorrect indicator
   - Verify explanation shown (if available)
   - Test next question button
   - Verify moves to next question
   - Test progress tracking
   - Verify correct answers count
   - Verify total questions count
   - Complete quiz session
   - Verify results summary shown

5. **Test Mode Switching**
   - Start in list mode
   - Switch to flip mode
   - Verify mode changes
   - Switch to quiz mode
   - Verify mode changes
   - Switch back to list mode
   - Verify mode changes
   - Verify filters maintained across modes

6. **Test Card Navigation**
   - In flip/quiz mode, test next button
   - Verify moves forward through cards
   - Test previous button
   - Verify moves backward
   - Test navigation at first card
   - Verify previous button disabled/hidden
   - Test navigation at last card
   - Verify next button disabled/hidden
   - Verify card counter updates (e.g., "Card 3 of 10")

7. **Test Shuffle Functionality**
   - Start practice mode with multiple cards
   - Note card order
   - Click shuffle button
   - Verify cards reordered
   - Verify same cards present (just reordered)
   - Verify current index resets to 0

8. **Test Progress Tracking**
   - Start quiz mode
   - Answer questions correctly/incorrectly
   - Verify correct answers count updates
   - Verify progress indicator updates
   - Complete session
   - Verify final score displayed
   - Verify accuracy percentage shown

# Test Strategy:

## Automated Tests

### Unit Tests

- **F-UT-018**: Test practice mode state management
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Default mode is "list"
    - Mode state updates correctly
    - Mode switching works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-019**: Test list mode rendering
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - List view renders
    - All flashcards displayed
    - Remove button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-020**: Test flip mode rendering
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Card renders
    - Question side shown initially
    - Flip button/action present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-021**: Test quiz mode rendering
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Question displayed
    - Answer options shown
    - Submit/select functionality works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-022**: Test card navigation
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Next button works
    - Previous button works
    - Card index updates
    - Navigation buttons disabled at boundaries
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-023**: Test shuffle functionality
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Shuffle reorders cards
    - Same cards present
    - Index resets
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-024**: Test progress tracking
  - **File**: `apps/website/src/app/flashcards/page.test.tsx`
  - **Assertions**:
    - Correct answers count updates
    - Progress indicator updates
    - Final score calculated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-017**: Test mode switching flow
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Mode changes correctly
    - Cards filtered for new mode
    - State preserved appropriately
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-018**: Test flip mode card interaction
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Card flips on click
    - Answer fetched and displayed
    - Navigation works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-019**: Test quiz mode answer selection
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - Answer selection works
    - Correct/incorrect feedback shown
    - Explanation displayed
    - Progress updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-020**: Test question details API call
  - **File**: `apps/website/src/app/flashcards/page.integration.test.tsx`
  - **Assertions**:
    - API called when needed
    - Question details loaded
    - Error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-011**: Complete flip mode practice session
  - **File**: `tests/e2e/freestyle-flow/flashcards-flip-mode.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Start flip practice mode
    3. View question on card
    4. Click to flip card
    5. Verify answer shown
    6. Navigate to next card
    7. Repeat for multiple cards
    8. Shuffle cards
    9. Return to list mode
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-012**: Complete quiz mode practice session
  - **File**: `tests/e2e/freestyle-flow/flashcards-quiz-mode.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Start quiz practice mode
    3. Answer first question
    4. Verify feedback shown
    5. Move to next question
    6. Answer multiple questions
    7. Verify progress tracking
    8. Complete quiz
    9. Verify results summary
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-013**: Mode switching and navigation
  - **File**: `tests/e2e/freestyle-flow/flashcards-mode-switching.spec.ts`
  - **Steps**:
    1. Navigate to flashcards page
    2. Start in list mode
    3. Switch to flip mode
    4. Practice a few cards
    5. Switch to quiz mode
    6. Answer a few questions
    7. Switch back to list mode
    8. Verify all modes work correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
