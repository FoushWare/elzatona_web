# Task ID: G-006
# Title: Guided Practice Page (Not Logged In - localStorage Dependent)
# Status: pending
# Dependencies: G-002, G-003
# Priority: high
# Description: Test the guided practice page flow when user is not logged in, relying on localStorage for progress tracking, question navigation, and state persistence.

# Details:

## Time Estimation

### Manual Testing
- **Estimated Time**: 30-45 minutes
- **Breakdown**:
  - Navigate to page and verify: 3 minutes
  - Test localStorage initialization: 5 minutes
  - Test question navigation: 8-10 minutes
  - Test progress saving: 5-7 minutes
  - Test browser refresh/resume: 5-7 minutes
  - Test answer selection and scoring: 5-7 minutes
  - Test completion flow: 3-5 minutes
- **Complexity**: High
- **Dependencies**: Test plan data, localStorage access

### Automated Testing
- **Estimated Time**: 15-20 minutes (first run), 3-5 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-6 minutes
  - Integration tests setup and execution: 5-7 minutes (includes localStorage mocking)
  - E2E tests execution: 5-7 minutes (includes localStorage operations)
- **Complexity**: High
- **Dependencies**: localStorage mocks, test plan data, question data

### Total Time
- **Manual Only**: 30-45 minutes
- **Automated Only**: 15-20 minutes (first run), 3-5 minutes (subsequent)
- **Both Manual + Automated**: 45-65 minutes (first run), 33-50 minutes (subsequent)

## Manual Testing Steps

1. **Navigate to guided practice page (not logged in)**
   - Clear localStorage: `localStorage.clear()`
   - Navigate to `/guided-practice?plan={planId}`
   - Verify page loads without requiring authentication
   - Verify loading state appears initially

2. **Test localStorage initialization**
   - Open browser DevTools → Application → Local Storage
   - Verify key `guided-practice-progress-{planId}` is created
   - Verify progress structure contains:
     - `planId`
     - `completedQuestions: []`
     - `completedTopics: []`
     - `completedCategories: []`
     - `completedCards: []`
     - `correctAnswers: []`
     - `currentPosition: { cardIndex, categoryIndex, topicIndex, questionIndex }`
     - `lastUpdated: ISO string`

3. **Test first question display**
   - Verify first question loads correctly
   - Verify question title, content, and options are displayed
   - Verify code blocks render in CodeEditor (if applicable)
   - Verify current position is saved to localStorage

4. **Test answer selection**
   - Select an answer option
   - Verify explanation appears
   - Verify question is marked as completed in localStorage
   - Verify `completedQuestions` array includes question ID
   - If answer is correct, verify `correctAnswers` includes question ID
   - If answer is wrong, verify flashcard is added to localStorage

5. **Test progress to next question**
   - Click "Next Question" button
   - Verify next question loads
   - Verify `currentPosition` in localStorage is updated
   - Verify `lastUpdated` timestamp is updated

6. **Test browser refresh/resume**
   - Answer a question and proceed to next
   - Note the current question ID
   - Refresh the browser (F5 or Cmd+R)
   - Verify page resumes at the same question (not from beginning)
   - Verify progress is preserved in localStorage
   - Verify `currentPosition` matches the question before refresh

7. **Test navigation with filters (cardId, categoryId)**
   - Navigate to `/guided-practice?plan={planId}&card={cardId}`
   - Verify only questions from specified card are shown
   - Navigate to `/guided-practice?plan={planId}&category={categoryId}`
   - Verify only questions from specified category are shown
   - Verify progress is saved separately per plan

8. **Test completion flow**
   - Complete all questions in a plan
   - Verify completion screen appears
   - Verify final score is calculated correctly
   - Verify `completed-guided-plans` array in localStorage includes planId
   - Verify `plan-grades` object in localStorage includes planId with percentage

9. **Test localStorage error handling**
   - Disable localStorage (DevTools → Application → Local Storage → Clear)
   - Try to navigate to practice page
   - Verify graceful error handling
   - Verify user can still use the page (with limited functionality)

10. **Test multiple plans progress**
    - Start practice on Plan A
    - Answer a few questions
    - Navigate to Plan B
    - Verify Plan A progress is preserved
    - Verify Plan B has separate progress
    - Switch back to Plan A
    - Verify Plan A progress is restored

## Test Execution Commands

```bash
# Run unit tests
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx

# Run integration tests
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

## Notes

- All tests can run in parallel
- localStorage tests require proper mocking/clearing between tests
- Progress is plan-specific (key: `guided-practice-progress-{planId}`)
- Tests should verify localStorage operations work without authentication
- Browser refresh should resume from saved position

# Test Strategy:

## Unit Tests

- **G-UT-020**: Test progress initialization function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - `initializeProgress()` returns correct structure
    - Progress includes all required fields
    - `currentPosition` defaults to all zeros
    - Arrays are empty initially
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-021**: Test localStorage save/load progress functions
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - `saveProgress()` saves to localStorage with correct key
    - `loadProgress()` retrieves from localStorage
    - `loadProgress()` returns null if no progress exists
    - Progress is JSON serialized/deserialized correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-022**: Test getProgressKey function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Returns correct key format: `guided-practice-progress-{planId}`
    - Handles null/undefined planId gracefully
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-023**: Test markQuestionCompleted function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Adds question ID to `completedQuestions` array
    - Prevents duplicate entries
    - Updates `lastUpdated` timestamp
    - Initializes progress if it doesn't exist
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-024**: Test findFirstQuestion function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Finds first question with options in plan
    - Respects cardId filter if provided
    - Respects categoryId filter if provided
    - Updates currentPosition in localStorage
    - Handles empty plan gracefully
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-025**: Test resumeFromProgress function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Resumes from saved position if question not completed
    - Skips completed questions
    - Falls back to findNextIncompleteQuestion if position invalid
    - Updates currentPosition in localStorage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-026**: Test findNextIncompleteQuestion function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Finds next incomplete question in sequence
    - Skips completed questions
    - Respects cardId/categoryId filters
    - Updates currentPosition in localStorage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-027**: Test proceedToNext function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Moves to next question in same topic
    - Moves to next topic if no more questions in current topic
    - Moves to next category if no more topics
    - Moves to next card if no more categories
    - Updates currentPosition in localStorage
    - Shows completion screen when all questions done
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-028**: Test handleAnswerSelect function
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Marks question as completed
    - Adds to correctAnswers if answer is correct
    - Adds to flashcards if answer is wrong
    - Updates progress in localStorage
    - Shows explanation
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-UT-029**: Test localStorage error handling
  - **File**: `apps/website/src/app/guided-practice/page.test.tsx`
  - **Assertions**:
    - Handles localStorage quota exceeded gracefully
    - Handles localStorage disabled gracefully
    - Handles invalid JSON in localStorage gracefully
    - Falls back to default state on errors
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Integration Tests

- **G-IT-015**: Test plan data fetch and progress initialization
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - Fetches plan data from API
    - Initializes progress in localStorage if none exists
    - Loads existing progress from localStorage if available
    - Merges database progress with localStorage (if logged in)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-016**: Test question navigation with localStorage persistence
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - First question loads correctly
    - Progress saved to localStorage after question load
    - Next question navigation updates localStorage
    - Position persists across component re-renders
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-017**: Test answer selection and progress tracking
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - Answer selection updates progress
    - Correct answers tracked in localStorage
    - Wrong answers add to flashcards
    - Progress synced to localStorage immediately
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-018**: Test browser refresh resume functionality
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - Component mounts with saved progress
    - Resumes from correct question position
    - Preserves completed questions list
    - Preserves correct answers count
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-019**: Test multiple plans progress isolation
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - Plan A progress stored separately from Plan B
    - Switching plans loads correct progress
    - Progress keys are plan-specific
    - No cross-contamination between plans
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-020**: Test completion flow and score calculation
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - Completion screen appears when all questions done
    - Score calculated correctly from localStorage
    - Completed plan saved to localStorage
    - Plan grade saved to localStorage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-IT-021**: Test filter parameters (cardId, categoryId)
  - **File**: `apps/website/src/app/guided-practice/page.integration.test.tsx`
  - **Assertions**:
    - cardId filter restricts questions to specific card
    - categoryId filter restricts questions to specific category
    - Progress respects filters
    - Resume respects filters
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## E2E Tests

- **G-E2E-010**: Complete practice flow without authentication (localStorage only)
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Clear localStorage
    2. Navigate to `/guided-practice?plan={planId}` (not logged in)
    3. Verify page loads
    4. Verify first question appears
    5. Verify progress initialized in localStorage
    6. Select an answer
    7. Verify explanation appears
    8. Verify progress updated in localStorage
    9. Click "Next Question"
    10. Verify next question loads
    11. Verify position updated in localStorage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-011**: Test browser refresh resume (localStorage persistence)
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Navigate to practice page
    2. Answer first question
    3. Proceed to second question
    4. Note question ID
    5. Refresh browser
    6. Verify page resumes at second question (not first)
    7. Verify progress preserved
    8. Verify completed questions list preserved
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-012**: Test multiple plans progress isolation
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Start practice on Plan A
    2. Answer 2 questions
    3. Navigate to Plan B
    4. Answer 1 question
    5. Navigate back to Plan A
    6. Verify Plan A progress preserved (2 questions completed)
    7. Verify Plan B progress preserved (1 question completed)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-013**: Test completion flow and score calculation
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Navigate to practice page with small plan
    2. Answer all questions (mix of correct/incorrect)
    3. Verify completion screen appears
    4. Verify score calculated correctly
    5. Verify completed plan saved to localStorage
    6. Verify plan grade saved to localStorage
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-014**: Test filter parameters (cardId, categoryId)
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Navigate with cardId filter: `/guided-practice?plan={planId}&card={cardId}`
    2. Verify only questions from specified card appear
    3. Navigate with categoryId filter: `/guided-practice?plan={planId}&category={categoryId}`
    4. Verify only questions from specified category appear
    5. Verify progress respects filters
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-015**: Test localStorage error scenarios
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Disable localStorage (via DevTools)
    2. Navigate to practice page
    3. Verify graceful error handling
    4. Verify page still functions (with limited features)
    5. Re-enable localStorage
    6. Verify normal functionality restored
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **G-E2E-016**: Test code editor rendering for code questions
  - **File**: `tests/e2e/guided-flow/guided-practice-localStorage.spec.ts`
  - **Steps**:
    1. Navigate to practice page
    2. Find question with code block
    3. Verify code renders in CodeEditor component
    4. Verify code has proper indentation
    5. Verify code is formatted correctly
    6. Verify no duplicate code/text content
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

