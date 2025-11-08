# Comprehensive Test Plan

## Overview

This document serves as the master test plan for the Elzatona Web application. It covers all testing strategies (Unit, Integration, E2E) for both **Guided** and **Freestyle** learning flows.

**Important Notes:**
- This file is built incrementally - tests are added as features are developed
- Each test is broken down into the smallest possible units
- Tests are organized by flow type (Guided vs Freestyle) and test level (Unit, Integration, E2E)
- When working on features/bugs, update this file accordingly
- When creating new features, add corresponding test plans here

---

## Table of Contents

1. [Test Strategy](#test-strategy)
2. [Guided Flow Tests](#guided-flow-tests)
3. [Freestyle Flow Tests](#freestyle-flow-tests)
4. [Shared Components Tests](#shared-components-tests)
5. [Testing Rules for Development](#testing-rules-for-development)
6. [Test Maintenance Guidelines](#test-maintenance-guidelines)

---

## Test Strategy

### Test Levels

1. **Unit Tests**: Test individual functions, components, and utilities in isolation
2. **Integration Tests**: Test interactions between components, API calls, and state management
3. **E2E Tests**: Test complete user flows from start to finish

### Test Organization

- Tests are organized by **Flow Type** (Guided/Freestyle)
- Each flow is broken down into **Pages/Features**
- Each page/feature has **Unit**, **Integration**, and **E2E** test sections
- Tests are numbered for easy reference and tracking

### Test Status Tracking

- ✅ **Implemented**: Test is written and passing
- ⏳ **Pending**: Test is planned but not yet implemented
- 🔄 **In Progress**: Test is being developed
- ❌ **Failing**: Test exists but is currently failing
- ⏸️ **Skipped**: Test is temporarily skipped

---

## Guided Flow Tests

### Overview
The Guided Flow provides structured learning paths with predefined plans and progress tracking.

### Flow Entry Points

#### 1. Homepage (`/`)
**Status**: ⏳ Pending

##### Unit Tests
- **G-UT-001**: Test homepage renders correctly
  - Status: ⏳ Pending
  - Description: Verify homepage component renders without errors
  - Assertions: Component mounts, no console errors

- **G-UT-002**: Test "Get Started" button exists and is clickable
  - Status: ⏳ Pending
  - Description: Verify CTA button is present and functional
  - Assertions: Button visible, onClick handler attached

- **G-UT-003**: Test navigation links render correctly
  - Status: ⏳ Pending
  - Description: Verify all navigation links are present
  - Assertions: Links visible, correct hrefs

##### Integration Tests
- **G-IT-001**: Test "Get Started" button navigates to `/get-started`
  - Status: ⏳ Pending
  - Description: Verify navigation works correctly
  - Assertions: Router.push called with `/get-started`

- **G-IT-002**: Test user authentication state affects homepage display
  - Status: ⏳ Pending
  - Description: Verify logged-in users see different content
  - Assertions: Conditional rendering based on auth state

##### E2E Tests
- **G-E2E-001**: Complete flow from homepage to guided learning
  - Status: ⏳ Pending
  - Description: User clicks "Get Started" → selects "I need guidance" → signs in → reaches guided learning
  - Steps:
    1. Navigate to homepage
    2. Click "Get Started" button
    3. Verify redirect to `/get-started`
    4. Select "I need guidance" option
    5. Complete sign-in flow
    6. Verify redirect to guided learning page

#### 2. Get Started Page (`/get-started`)
**Status**: ⏳ Pending

##### Unit Tests
- **G-UT-004**: Test "I need guidance" option renders
  - Status: ⏳ Pending
  - Description: Verify guided learning option is displayed
  - Assertions: Option visible, text correct

- **G-UT-005**: Test "Browse practice questions" option renders
  - Status: ⏳ Pending
  - Description: Verify freestyle option is displayed
  - Assertions: Option visible, text correct

- **G-UT-006**: Test sign-in popup appears when "I need guidance" is clicked
  - Status: ⏳ Pending
  - Description: Verify authentication modal opens
  - Assertions: Modal visible, form elements present

- **G-UT-007**: Test sign-in form validation
  - Status: ⏳ Pending
  - Description: Verify email/password validation works
  - Assertions: Error messages show for invalid input

##### Integration Tests
- **G-IT-003**: Test successful sign-in redirects correctly
  - Status: ⏳ Pending
  - Description: After sign-in, user stays on get-started page
  - Assertions: No redirect, page state updated

- **G-IT-004**: Test "I need guidance" navigates to guided learning after auth
  - Status: ⏳ Pending
  - Description: Authenticated user selecting guidance goes to guided learning
  - Assertions: Router.push called with `/features/guided-learning`

- **G-IT-005**: Test "Browse practice questions" navigates to browse page
  - Status: ⏳ Pending
  - Description: User selecting browse option goes to practice selection
  - Assertions: Router.push called with `/browse-practice-questions`

##### E2E Tests
- **G-E2E-002**: Complete guided flow entry (unauthenticated user)
  - Status: ⏳ Pending
  - Description: New user selects guidance, signs up, reaches guided learning
  - Steps:
    1. Navigate to `/get-started`
    2. Click "I need guidance"
    3. Sign-up form appears
    4. Complete sign-up
    5. Verify redirect to `/features/guided-learning`

- **G-E2E-003**: Complete guided flow entry (authenticated user)
  - Status: ⏳ Pending
  - Description: Logged-in user selects guidance, immediately reaches guided learning
  - Steps:
    1. Sign in as existing user
    2. Navigate to `/get-started`
    3. Click "I need guidance"
    4. Verify immediate redirect to `/features/guided-learning` (no popup)

#### 3. Guided Learning Plans Page (`/features/guided-learning`)
**Status**: ⏳ Pending

##### Unit Tests
- **G-UT-008**: Test plans list renders correctly
  - Status: ⏳ Pending
  - Description: Verify plan cards are displayed
  - Assertions: Cards visible, correct count

- **G-UT-009**: Test plan card displays plan name
  - Status: ⏳ Pending
  - Description: Verify each card shows plan title
  - Assertions: Text content matches plan data

- **G-UT-010**: Test plan card displays duration (1-7 days)
  - Status: ⏳ Pending
  - Description: Verify duration is shown correctly
  - Assertions: Duration text visible, format correct

- **G-UT-011**: Test plan card displays question count
  - Status: ⏳ Pending
  - Description: Verify number of questions is shown
  - Assertions: Count visible, accurate

- **G-UT-012**: Test loading state displays while fetching plans
  - Status: ⏳ Pending
  - Description: Verify loading indicator shows
  - Assertions: Spinner/skeleton visible

- **G-UT-013**: Test error state displays on fetch failure
  - Status: ⏳ Pending
  - Description: Verify error message shows
  - Assertions: Error message visible, retry button present

##### Integration Tests
- **G-IT-006**: Test plans are fetched from Firebase on mount
  - Status: ⏳ Pending
  - Description: Verify API call is made
  - Assertions: Fetch called, correct endpoint

- **G-IT-007**: Test plan selection navigates to plan details
  - Status: ⏳ Pending
  - Description: Clicking plan card navigates to plan page
  - Assertions: Router.push called with `/features/guided-learning/[planId]`

- **G-IT-008**: Test user progress is loaded and displayed
  - Status: ⏳ Pending
  - Description: Verify progress indicators show on plan cards
  - Assertions: Progress data fetched, displayed correctly

- **G-IT-009**: Test authentication required to view plans
  - Status: ⏳ Pending
  - Description: Unauthenticated users are redirected
  - Assertions: Redirect to sign-in if not authenticated

##### E2E Tests
- **G-E2E-004**: Complete plan selection flow
  - Status: ⏳ Pending
  - Description: User views plans, selects one, reaches plan details
  - Steps:
    1. Navigate to `/features/guided-learning`
    2. Wait for plans to load
    3. Verify all plans (1-7 days) are displayed
    4. Click on a plan card
    5. Verify navigation to plan details page

- **G-E2E-005**: Plan loading and error handling
  - Status: ⏳ Pending
  - Description: Test loading states and error scenarios
  - Steps:
    1. Navigate to page
    2. Verify loading indicator appears
    3. Verify plans load successfully
    4. Simulate network error
    5. Verify error message appears
    6. Click retry
    7. Verify plans load again

#### 4. Individual Plan Page (`/features/guided-learning/[planId]`)
**Status**: ⏳ Pending

##### Unit Tests
- **G-UT-014**: Test plan details header renders
  - Status: ⏳ Pending
  - Description: Verify plan name and metadata display
  - Assertions: Header visible, correct data

- **G-UT-015**: Test plan sections list renders
  - Status: ⏳ Pending
  - Description: Verify all sections are displayed
  - Assertions: Sections visible, correct count

- **G-UT-016**: Test section card displays section name
  - Status: ⏳ Pending
  - Description: Verify section titles are shown
  - Assertions: Text content matches section data

- **G-UT-017**: Test section card displays question count
  - Status: ⏳ Pending
  - Description: Verify number of questions per section
  - Assertions: Count visible, accurate

- **G-UT-018**: Test progress indicator on section card
  - Status: ⏳ Pending
  - Description: Verify completion status is shown
  - Assertions: Progress bar/indicator visible

- **G-UT-019**: Test "Start" button on section card
  - Status: ⏳ Pending
  - Description: Verify action button is present
  - Assertions: Button visible, enabled

##### Integration Tests
- **G-IT-010**: Test plan details fetched from Firebase
  - Status: ⏳ Pending
  - Description: Verify API call for plan data
  - Assertions: Fetch called with correct planId

- **G-IT-011**: Test section selection navigates to cards page
  - Status: ⏳ Pending
  - Description: Clicking section navigates to card view
  - Assertions: Router.push called with `/features/guided-learning/[planId]/cards?sectionId=X`

- **G-IT-012**: Test user progress loaded and displayed
  - Status: ⏳ Pending
  - Description: Verify progress data is fetched and shown
  - Assertions: Progress API called, data displayed

- **G-IT-013**: Test questions fetched for each section
  - Status: ⏳ Pending
  - Description: Verify questions are loaded dynamically
  - Assertions: Questions API called per section

##### E2E Tests
- **G-E2E-006**: Complete section selection flow
  - Status: ⏳ Pending
  - Description: User views plan, selects section, starts practice
  - Steps:
    1. Navigate to plan details page
    2. Wait for plan data to load
    3. Verify all sections are displayed
    4. Click "Start" on a section
    5. Verify navigation to cards page

- **G-E2E-007**: Progress tracking in plan view
  - Status: ⏳ Pending
  - Description: Verify progress updates reflect in plan view
  - Steps:
    1. Complete some questions in a section
    2. Navigate back to plan details
    3. Verify progress indicators updated
    4. Verify completed sections marked

#### 5. Guided Learning Cards Page (`/features/guided-learning/[planId]/cards`)
**Status**: ⏳ Pending

##### Unit Tests
- **G-UT-020**: Test question card renders
  - Status: ⏳ Pending
  - Description: Verify question card component displays
  - Assertions: Card visible, question text shown

- **G-UT-021**: Test answer options render
  - Status: ⏳ Pending
  - Description: Verify multiple choice options display
  - Assertions: Options visible, correct count

- **G-UT-022**: Test "Show Answer" button
  - Status: ⏳ Pending
  - Description: Verify answer reveal button works
  - Assertions: Button visible, toggles answer display

- **G-UT-023**: Test "Next" button
  - Status: ⏳ Pending
  - Description: Verify navigation to next question
  - Assertions: Button visible, enabled after answer

- **G-UT-024**: Test progress indicator
  - Status: ⏳ Pending
  - Description: Verify question progress (e.g., "3/10")
  - Assertions: Progress text visible, accurate

- **G-UT-025**: Test card flip animation
  - Status: ⏳ Pending
  - Description: Verify card flip on answer reveal
  - Assertions: Animation triggers, smooth transition

##### Integration Tests
- **G-IT-014**: Test questions loaded for selected section
  - Status: ⏳ Pending
  - Description: Verify questions API called with sectionId
  - Assertions: API called, correct parameters

- **G-IT-015**: Test answer selection updates state
  - Status: ⏳ Pending
  - Description: Verify selected answer stored
  - Assertions: State updated, UI reflects selection

- **G-IT-016**: Test progress saved to backend
  - Status: ⏳ Pending
  - Description: Verify progress API called after each question
  - Assertions: API called, data persisted

- **G-IT-017**: Test navigation to next question
  - Status: ⏳ Pending
  - Description: Verify question index updates
  - Assertions: State updated, new question displayed

- **G-IT-018**: Test completion triggers celebration/redirect
  - Status: ⏳ Pending
  - Description: Verify completion flow when all questions done
  - Assertions: Completion message shown, navigation occurs

##### E2E Tests
- **G-E2E-008**: Complete question answering flow
  - Status: ⏳ Pending
  - Description: User answers all questions in a section
  - Steps:
    1. Navigate to cards page for a section
    2. Answer first question
    3. Click "Next"
    4. Repeat for all questions
    5. Verify completion message
    6. Verify progress updated

- **G-E2E-009**: Answer reveal and learning flow
  - Status: ⏳ Pending
  - Description: User reveals answers and learns
  - Steps:
    1. View question
    2. Click "Show Answer"
    3. Verify answer displayed
    4. Verify explanation shown (if available)
    5. Mark as learned
    6. Move to next question

- **G-E2E-010**: Progress persistence across sessions
  - Status: ⏳ Pending
  - Description: Verify progress saved and restored
  - Steps:
    1. Answer 5 questions
    2. Refresh page
    3. Verify progress restored
    4. Continue from question 6

---

## Freestyle Flow Tests

### Overview
The Freestyle Flow allows users to practice questions without a structured plan.

### Custom Roadmap Flow

The custom roadmap flow is a key part of the freestyle learning experience. Users can create personalized learning paths by selecting cards, categories, topics, and specific questions.

**Task Files:**
- [F-001: Custom Roadmap Creation](../tasks/freestyle-flow/F-001-custom-roadmap-creation.md)
- [F-002: My Plans Page](../tasks/freestyle-flow/F-002-my-plans-page.md)

**Key Features Tested:**
- Card selection (Core Tech, Framework, etc.)
- Category selection (HTML, CSS, JavaScript, React, etc.)
- Topic selection within categories
- Question selection (3-5 or all per topic)
- Plan configuration (name, description, duration)
- Plan saving and management
- Plan editing and deletion

---

## Shared Components Tests

### Overview
Components and utilities used across both flows.

---

## Testing Rules for Development

### When Working on Features

1. **Before Starting Development:**
   - Review relevant test sections in this document
   - Identify which tests need to be updated
   - Plan new tests if adding new functionality

2. **During Development:**
   - Update test plans as you discover edge cases
   - Mark tests as "In Progress" when actively working on them
   - Document any test requirements that emerge

3. **After Feature Completion:**
   - Update test status to "Implemented"
   - Add any missing test scenarios discovered during development
   - Ensure all related tests are passing

### When Working on Bugs

1. **Before Fixing:**
   - Identify which test should have caught this bug
   - Add a test case that reproduces the bug (if missing)
   - Mark as "In Progress"

2. **After Fixing:**
   - Update the test to verify the fix
   - Mark as "Implemented"
   - Add regression test if applicable

### When Creating New Features

1. **Planning Phase:**
   - Add a new section to this document for the feature
   - Break down into Unit, Integration, and E2E tests
   - Estimate test complexity and dependencies

2. **Development Phase:**
   - Write tests alongside code (TDD approach recommended)
   - Update this document as tests are implemented
   - Mark status appropriately

---

## Test Maintenance Guidelines

### Regular Maintenance

- Review this document weekly during active development
- Update test statuses as tests are implemented
- Remove obsolete tests when features are deprecated
- Archive completed test sections for reference

### When Tests Fail

1. Identify the root cause
2. Update this document with findings
3. Fix the test or the code (whichever is incorrect)
4. Update status accordingly

### Incremental Updates

- **Always append** to this file rather than rewriting
- Use clear section headers for easy navigation
- Add timestamps for major updates
- Keep a changelog at the end of the document

---

## Changelog

### 2024-11-09
- Initial test plan structure created
- Set up organization framework for Guided and Freestyle flows
- Established testing rules and maintenance guidelines
- Created task-based test structure in `tasks/` directory
- Added custom roadmap flow tests (F-001, F-002)
- Added admin bulk question addition tests (A-001)
- Set up parallel test execution infrastructure
- Added GitHub Actions workflow for parallel test execution
- Updated package.json with parallel test scripts

---

**Last Updated**: 2024-11-09
**Status**: 🟡 Initial Structure - Ready for Incremental Updates

