# Task ID: S-002

# Title: Question Card Component

# Status: pending

# Dependencies:

# Priority: medium

# Description: Test the Question Card component used to display questions across the application, including question text, answer options, interactions, and different question types.

# Details:

## Time Estimation

### Manual Testing

- **Estimated Time**: 25-35 minutes
- **Breakdown**:
  - Test component rendering: 3-5 minutes
  - Test question display: 5-7 minutes
  - Test answer options: 5-7 minutes
  - Test interactions: 5-7 minutes
  - Test different question types: 4-6 minutes
  - Test responsive design: 3-3 minutes
- **Complexity**: Medium
- **Dependencies**: Question data, answer handling

### Automated Testing

- **Estimated Time**: 12-18 minutes (first run), 2-3 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-8 minutes
  - Integration tests setup and execution: 5-8 minutes
  - E2E tests execution: 2-2 minutes
- **Complexity**: Medium
- **Dependencies**: Question data mocks

### Total Time

- **Manual Only**: 25-35 minutes
- **Automated Only**: 12-18 minutes (first run), 2-3 minutes (subsequent)
- **Both Manual + Automated**: 37-53 minutes (first run), 27-38 minutes (subsequent)

---

## Overview

Test the Question Card component used to display questions across the application, including question text, answer options, interactions, and different question types.

## Manual Testing Steps

1. **Test component rendering**
   - Verify question card renders
   - Verify question text displayed
   - Verify answer options displayed (if applicable)
   - Verify question metadata (difficulty, category) shown
   - Verify question number/ID shown

2. **Test question display**
   - Verify question text formatted correctly
   - Verify code blocks rendered (if applicable)
   - Verify images rendered (if applicable)
   - Verify markdown formatted correctly
   - Verify long questions truncated/scrollable

3. **Test answer options (multiple choice)**
   - Verify all options displayed
   - Verify options clickable
   - Click on an option
   - Verify option selected
   - Verify other options disabled (if single choice)
   - Verify multiple selections (if multiple choice)

4. **Test answer submission**
   - Select an answer
   - Click submit button
   - Verify answer submitted
   - Verify feedback shown (correct/incorrect)
   - Verify explanation shown (if applicable)
   - Verify next button enabled

5. **Test different question types**
   - Test multiple choice
   - Test true/false
   - Test code completion (if applicable)
   - Test fill-in-the-blank (if applicable)
   - Verify each type renders correctly

6. **Test interactions**
   - Test hover states
   - Test focus states
   - Test disabled states
   - Test loading states
   - Test error states

7. **Test responsive design**
   - Test on mobile viewport
   - Verify card adapts
   - Test on tablet viewport
   - Verify layout correct
   - Test on desktop viewport
   - Verify optimal layout

8. **Test accessibility**
   - Test keyboard navigation
   - Test screen reader compatibility
   - Test ARIA labels
   - Test focus management

# Test Strategy:

## Automated Tests

### Unit Tests

- **S-UT-005**: Test component renders
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.test.tsx`
  - **Assertions**:
    - Component renders
    - Question text displayed
    - Answer options rendered
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-UT-006**: Test question text display
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.test.tsx`
  - **Assertions**:
    - Question text formatted
    - Markdown rendered
    - Code blocks rendered (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-UT-007**: Test answer options
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.test.tsx`
  - **Assertions**:
    - Options rendered
    - Options clickable
    - Selection state updates
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-UT-008**: Test answer submission
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.test.tsx`
  - **Assertions**:
    - Submit handler called
    - Feedback shown
    - Explanation displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-UT-009**: Test different question types
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.test.tsx`
  - **Assertions**:
    - Multiple choice renders
    - True/false renders
    - Other types render correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **S-IT-004**: Test answer selection flow
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.integration.test.tsx`
  - **Assertions**:
    - Answer selected
    - State updates
    - Submit works
    - Feedback shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-IT-005**: Test question data handling
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.integration.test.tsx`
  - **Assertions**:
    - Question data loaded
    - Options populated
    - Metadata displayed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **S-IT-006**: Test callback handlers
  - **File**: `libs/shared-components/src/lib/common/QuestionCard.integration.test.tsx`
  - **Assertions**:
    - onAnswer callback called
    - onNext callback called
    - onSkip callback called (if applicable)
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **S-E2E-002**: Complete question card interaction
  - **File**: `tests/e2e/shared-components/question-card.spec.ts`
  - **Steps**:
    1. Render question card
    2. Verify question displayed
    3. Select an answer
    4. Submit answer
    5. Verify feedback shown
    6. Click next
    7. Verify next question loaded
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes
