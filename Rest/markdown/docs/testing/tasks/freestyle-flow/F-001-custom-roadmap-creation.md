# Task: Custom Roadmap Creation

## Time Estimation

### Manual Testing
- **Estimated Time**: 45-60 minutes
- **Breakdown**:
  - Navigate and authenticate: 2 minutes
  - Test card selection: 5-7 minutes
  - Test category selection: 5-7 minutes
  - Test topic selection: 5-7 minutes
  - Test question selection (3-5 or all): 10-15 minutes
  - Test plan configuration: 5-7 minutes
  - Test plan saving: 3-5 minutes
  - Test validation scenarios: 10-12 minutes
- **Complexity**: High
- **Dependencies**: Authentication, API endpoints, test data (cards, categories, topics, questions)

### Automated Testing
- **Estimated Time**: 15-25 minutes (first run), 2-4 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-7 minutes
  - Integration tests setup and execution: 6-10 minutes (includes API mocking)
  - E2E tests execution: 4-8 minutes (full flow with multiple selections)
- **Complexity**: High
- **Dependencies**: API mocks, test data fixtures, authentication setup

### Total Time
- **Manual Only**: 45-60 minutes
- **Automated Only**: 15-25 minutes (first run), 2-4 minutes (subsequent)
- **Both Manual + Automated**: 60-85 minutes (first run), 47-64 minutes (subsequent)

---

## Overview
Test the complete custom roadmap creation flow including card selection, category selection, topic selection, question selection, and plan saving.

## Manual Testing Steps

1. **Navigate to custom roadmap page**
   - Sign in as authenticated user
   - Go to `http://localhost:3000/custom-roadmap`
   - Verify page loads

2. **Test card selection**
   - Verify learning cards are displayed (Core Tech, Framework, etc.)
   - Click on a card to expand
   - Verify categories within card are shown
   - Select multiple cards

3. **Test category selection**
   - Expand a card
   - Verify categories are listed (HTML, CSS, JavaScript, React, etc.)
   - Select a category
   - Verify topics within category are shown

4. **Test topic selection**
   - Expand a category
   - Verify topics are listed
   - Select a topic
   - Verify questions within topic are shown

5. **Test question selection**
   - For each topic, verify questions are displayed
   - Test "Select 3-5 questions" option
   - Test "Select all questions" option
   - Verify question count updates

6. **Test plan configuration**
   - Set plan name
   - Set plan description
   - Set duration (1-N days)
   - Verify total questions calculated
   - Verify daily questions distribution

7. **Test plan saving**
   - Click "Save Plan"
   - Verify plan saved successfully
   - Verify redirect to `/my-plans`
   - Verify plan appears in saved plans

8. **Test validation**
   - Try to save without selecting any questions
   - Verify error message
   - Try to save without plan name
   - Verify error message

## Automated Tests

### Unit Tests

- **F-UT-001**: Test custom roadmap page renders
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Authentication check works
    - Unauthenticated users redirected
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-002**: Test card selection renders
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Cards visible
    - Card expansion works
    - Categories shown on expand
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-003**: Test category selection
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Categories visible within cards
    - Category selection updates state
    - Topics shown on category select
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-004**: Test topic selection
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Topics visible within categories
    - Topic selection updates state
    - Questions shown on topic select
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-005**: Test question selection (3-5 or all)
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Questions visible within topics
    - "Select 3-5" option works
    - "Select all" option works
    - Question count updates correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-006**: Test plan configuration form
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Plan name input works
    - Description input works
    - Duration selector works
    - Total questions calculated
    - Daily questions calculated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-UT-007**: Test form validation
  - **File**: `apps/website/src/app/custom-roadmap/page.test.tsx`
  - **Assertions**:
    - Error shown if no questions selected
    - Error shown if no plan name
    - Error shown if invalid duration
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **F-IT-001**: Test cards fetched from API
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - API called on mount
    - Cards data loaded
    - Error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-002**: Test categories fetched for selected card
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - API called when card selected
    - Categories loaded
    - Loading state shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-003**: Test topics fetched for selected category
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - API called when category selected
    - Topics loaded
    - Questions count shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-004**: Test questions fetched for selected topic
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - API called when topic selected
    - Questions loaded
    - Question details shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-005**: Test plan save API call
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - Save API called with correct data
    - Plan data formatted correctly
    - Success response handled
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-IT-006**: Test navigation after save
  - **File**: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`
  - **Assertions**:
    - Router.push called with `/my-plans`
    - Navigation occurs after successful save
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **F-E2E-001**: Complete custom roadmap creation flow
  - **File**: `tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts`
  - **Steps**:
    1. Sign in as authenticated user
    2. Navigate to `/custom-roadmap`
    3. Select a learning card
    4. Select a category within card
    5. Select a topic within category
    6. Select 3-5 questions from topic
    7. Set plan name and duration
    8. Click "Save Plan"
    9. Verify redirect to `/my-plans`
    10. Verify plan appears in saved plans
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-002**: Custom roadmap with multiple categories
  - **File**: `tests/e2e/freestyle-flow/custom-roadmap-multiple-categories.spec.ts`
  - **Steps**:
    1. Sign in
    2. Navigate to `/custom-roadmap`
    3. Select multiple cards
    4. Select categories from different cards
    5. Select topics from different categories
    6. Select questions from multiple topics
    7. Configure and save plan
    8. Verify all selections saved correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **F-E2E-003**: Custom roadmap validation
  - **File**: `tests/e2e/freestyle-flow/custom-roadmap-validation.spec.ts`
  - **Steps**:
    1. Sign in
    2. Navigate to `/custom-roadmap`
    3. Try to save without selecting questions
    4. Verify error message
    5. Select questions but no plan name
    6. Verify error message
    7. Complete form correctly
    8. Verify save succeeds
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- custom-roadmap/page.test.tsx

# Run integration tests
npm run test:integration -- custom-roadmap/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- custom-roadmap-*.spec.ts
```

## Notes

- All tests can run in parallel
- Requires authentication setup
- Tests API integration with backend
- No dependencies on other tests

