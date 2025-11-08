# Test Execution Guide - Manual and Automated Testing

**Date**: 2025-11-09  
**Purpose**: Complete guide for running unit, integration, and E2E tests while performing manual testing

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Integration Tests](#running-integration-tests)
4. [Running E2E Tests](#running-e2e-tests)
5. [Running Tests for Specific Tasks](#running-tests-for-specific-tasks)
6. [Manual Testing Workflow](#manual-testing-workflow)
7. [Combined Manual + Automated Testing](#combined-manual--automated-testing)
8. [Troubleshooting](#troubleshooting)
9. [Test Execution Examples](#test-execution-examples)

---

## 🚀 Quick Start

### Prerequisites
```bash
# Ensure dependencies are installed
npm install

# Ensure test databases/services are running (if needed)
# For Supabase: Check your .env file has correct credentials
```

### Basic Commands
```bash
# Run all unit tests
npm run test:unit

# Run all integration tests
npm run test:integration

# Run all E2E tests
npm run test:e2e

# Run all tests (unit + integration + E2E)
npm run test:all
```

---

## 🧪 Running Unit Tests

### What Unit Tests Cover
- Individual component rendering
- Component props and state
- User interactions (clicks, inputs)
- Conditional rendering
- Error handling at component level

### Basic Commands

#### Run All Unit Tests
```bash
# Run all unit tests (from project root)
npm run test:unit

# Run in watch mode (auto-rerun on file changes)
npm run test:unit -- --watch

# Run with coverage report
npm run test:unit -- --coverage

# Run from apps/website directory (alternative)
cd apps/website && npx jest --maxWorkers=50%
```

#### Run Specific Unit Test Files
```bash
# Run tests for a specific page/component (from project root)
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# Or run from apps/website directory
cd apps/website && npx jest src/app/admin/login/page.test.tsx

# Run tests matching a pattern
npm run test:unit -- --testNamePattern="Admin Login"

# Run tests in a specific directory
npm run test:unit -- apps/website/src/app/admin/

# Run tests for a specific category
npm run test:unit:admin
npm run test:unit:freestyle-flow
npm run test:unit:shared-components
```

#### Run Tests for Specific Tasks

**Task 1: Admin Bulk Question Addition**
```bash
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
```

**Task 2: Admin Login**
```bash
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
```

**Task 3: Admin Dashboard**
```bash
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
```

**Task 17: Homepage**
```bash
npm run test:unit -- apps/website/src/app/page.test.tsx
```

**Task 18: Get Started Page**
```bash
npm run test:unit -- apps/website/src/app/get-started/page.test.tsx
```

**Task 8: Custom Roadmap**
```bash
npm run test:unit -- apps/website/src/app/custom-roadmap/page.test.tsx
```

**Task 9: My Plans**
```bash
npm run test:unit -- apps/website/src/app/my-plans/page.test.tsx
```

**Task 10: Browse Practice Questions**
```bash
npm run test:unit -- apps/website/src/app/browse-practice-questions/page.test.tsx
```

**Task 11: Learning Paths**
```bash
npm run test:unit -- apps/website/src/app/learning-paths/page.test.tsx
```

**Task 12: Frontend Tasks**
```bash
npm run test:unit -- apps/website/src/app/frontend-tasks/page.test.tsx
```

**Task 13: Problem Solving**
```bash
npm run test:unit -- apps/website/src/app/problem-solving/page.test.tsx
```

**Task 14-16: Flashcards**
```bash
npm run test:unit -- apps/website/src/app/flashcards/page.test.tsx
```

**Shared Components:**
```bash
# Navigation
npm run test:unit -- libs/shared-components/src/lib/common/Navigation.test.tsx

# Question Card
npm run test:unit -- apps/website/src/components/QuestionDisplay.test.tsx

# Progress Tracker
npm run test:unit -- libs/shared-components/src/lib/common/ProgressTracker.test.tsx
```

### Unit Test Options

```bash
# Run with verbose output
npm run test:unit -- --verbose

# Run only tests that failed last time
npm run test:unit -- --onlyFailures

# Run tests in parallel (default)
npm run test:unit -- --maxWorkers=50%

# Run tests sequentially (for debugging)
npm run test:unit -- --runInBand

# Update snapshots (if using snapshot tests)
npm run test:unit -- --updateSnapshot
```

### Manual Testing While Running Unit Tests

**Workflow:**
1. **Start the dev server** in one terminal:
   ```bash
   npm run dev
   ```

2. **Run unit tests in watch mode** in another terminal:
   ```bash
   npm run test:unit -- --watch
   ```

3. **Test manually in browser**:
   - Open `http://localhost:3000`
   - Navigate to the feature you're testing
   - Interact with the component
   - Watch the terminal for test results

4. **Compare results**:
   - Manual: Check if the feature works as expected in browser
   - Automated: Check if tests pass in terminal

---

## 🔗 Running Integration Tests

### What Integration Tests Cover
- API calls and responses
- Component interactions with hooks
- State management across components
- Navigation flows
- Data fetching and caching

### Basic Commands

#### Run All Integration Tests
```bash
# Run all integration tests (from project root)
npm run test:integration

# Run in watch mode
npm run test:integration -- --watch

# Run with coverage
npm run test:integration -- --coverage

# Run from apps/website directory (alternative)
cd apps/website && npx jest --testPathPattern=integration --maxWorkers=50%
```

#### Run Specific Integration Test Files
```bash
# Run tests for a specific page (from project root)
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# Or run from apps/website directory
cd apps/website && npx jest src/app/admin/login/page.integration.test.tsx

# Run all admin integration tests
npm run test:integration -- apps/website/src/app/admin/

# Run tests for a specific category
npm run test:integration:admin
npm run test:integration:freestyle-flow
npm run test:integration:shared-components
```

#### Run Tests for Specific Tasks

**Task 1: Admin Bulk Question Addition**
```bash
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
```

**Task 2: Admin Login**
```bash
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
```

**Task 3: Admin Dashboard**
```bash
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
```

**Task 8: Custom Roadmap**
```bash
npm run test:integration -- apps/website/src/app/custom-roadmap/page.integration.test.tsx
```

**Task 9: My Plans**
```bash
npm run test:integration -- apps/website/src/app/my-plans/page.integration.test.tsx
```

### Integration Test Options

```bash
# Run with verbose output
npm run test:integration -- --verbose

# Run with API logging (if implemented)
npm run test:integration -- --verbose --logLevel=debug

# Run specific test suite
npm run test:integration -- --testNamePattern="API Integration"
```

### Manual Testing While Running Integration Tests

**Workflow:**
1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Run integration tests**:
   ```bash
   npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
   ```

3. **Test the same flow manually**:
   - Open browser to `http://localhost:3000/admin/login`
   - Try logging in with test credentials
   - Verify the API calls in Network tab (DevTools)
   - Compare with what the integration test expects

4. **Verify API responses**:
   - Check Network tab for actual API responses
   - Compare with mocked responses in tests
   - Verify error handling works the same way

---

## 🌐 Running E2E Tests

### What E2E Tests Cover
- Complete user flows from start to finish
- Real browser interactions
- Navigation between pages
- Form submissions
- Authentication flows
- Full feature workflows

### Prerequisites
```bash
# Install Playwright browsers (first time only)
npm run test:e2e:install
# Or: npx playwright install

# Or install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Basic Commands

#### Run All E2E Tests
```bash
# Run all E2E tests (starts dev server automatically)
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed
# Or: npm run test:e2e -- --headed

# Run in UI mode (interactive - recommended for debugging)
npm run test:e2e:ui
# Or: npm run test:e2e -- --ui

# Run in debug mode (step through tests)
npm run test:e2e:debug
# Or: npm run test:e2e -- --debug

# Run with specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
npm run test:e2e:mobile
```

#### Run Specific E2E Test Files
```bash
# Run tests for a specific feature
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts

# Run tests in a specific directory
npm run test:e2e -- tests/e2e/admin/

# Run tests matching a pattern
npm run test:e2e -- --grep "Admin Login"
```

#### Run Tests for Specific Tasks

**Task 1: Admin Bulk Question Addition**
```bash
npm run test:e2e -- tests/e2e/admin/admin-bulk-question-addition.spec.ts
```

**Task 2: Admin Login**
```bash
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts
```

**Task 3: Admin Dashboard**
```bash
npm run test:e2e -- tests/e2e/admin/admin-dashboard.spec.ts
```

**Task 17: Homepage**
```bash
npm run test:e2e -- tests/e2e/guided-flow/homepage-to-guided.spec.ts
```

**Task 18: Get Started**
```bash
npm run test:e2e -- tests/e2e/guided-flow/get-started-unauthenticated.spec.ts
npm run test:e2e -- tests/e2e/guided-flow/get-started-authenticated.spec.ts
```

**Task 8: Custom Roadmap**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts
```

**Task 9: My Plans**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/my-plans.spec.ts
```

**Task 10: Browse Practice Questions**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/browse-practice-questions.spec.ts
```

**Task 11: Learning Paths**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/learning-paths-practice.spec.ts
```

**Task 12: Frontend Tasks**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/frontend-tasks-practice.spec.ts
```

**Task 13: Problem Solving**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/problem-solving-practice.spec.ts
```

**Task 14-16: Flashcards**
```bash
npm run test:e2e -- tests/e2e/freestyle-flow/flashcards.spec.ts
```

**Shared Components:**
```bash
# Navigation
npm run test:e2e -- tests/e2e/shared-components/navigation.spec.ts

# Progress Tracker
npm run test:e2e -- tests/e2e/shared-components/progress-tracker.spec.ts

# Question Card
npm run test:e2e -- tests/e2e/shared-components/question-card.spec.ts
```

### E2E Test Options

```bash
# Run in debug mode (step through)
npm run test:e2e -- --debug

# Run with slow motion (see actions clearly)
npm run test:e2e -- --slowMo=1000

# Run with specific timeout
npm run test:e2e -- --timeout=60000

# Run in specific environment
npm run test:e2e -- --project=chromium --headed

# Generate test code from actions
npm run test:e2e -- --codegen
```

### Manual Testing While Running E2E Tests

**Workflow:**
1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Run E2E test in headed mode** (so you can watch):
   ```bash
   npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed
   ```

3. **Watch the automated test**:
   - See the browser open automatically
   - Watch it navigate and interact
   - Observe if it matches expected behavior

4. **Test the same flow manually**:
   - Open another browser window
   - Follow the same steps as the E2E test
   - Compare results

5. **Use slow motion** to see each step:
   ```bash
   npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed --slowMo=2000
   ```

---

## 🎯 Running Tests for Specific Tasks

### Complete Test Suite for One Task

**Example: Task 2 - Admin Login**

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run all tests for Admin Login
# Unit tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# E2E tests
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed
```

### Run All Tests for a Category

**All Admin Tests:**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/

# Integration tests
npm run test:integration -- apps/website/src/app/admin/

# E2E tests
npm run test:e2e -- tests/e2e/admin/
```

**All Freestyle Flow Tests:**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/custom-roadmap apps/website/src/app/my-plans apps/website/src/app/browse-practice-questions apps/website/src/app/learning-paths apps/website/src/app/frontend-tasks apps/website/src/app/problem-solving apps/website/src/app/flashcards

# E2E tests
npm run test:e2e -- tests/e2e/freestyle-flow/
```

---

## 👤 Manual Testing Workflow

### Step-by-Step Manual Testing Process

#### 1. **Prepare Environment**
```bash
# Start development server
npm run dev

# Server should be running on http://localhost:3000
```

#### 2. **Test Each Feature Manually**

**For Admin Features:**
1. Navigate to `/admin/login`
2. Test login with valid credentials
3. Test login with invalid credentials
4. Verify redirect after login
5. Test each admin page functionality

**For Guided Flow:**
1. Navigate to homepage (`/`)
2. Click "Get Started"
3. Select "I need guidance"
4. Complete sign-up/sign-in
5. Verify redirect to guided learning

**For Freestyle Flow:**
1. Navigate to `/custom-roadmap`
2. Create a custom roadmap
3. Test all steps in the creation process
4. Verify roadmap is saved
5. Navigate to `/my-plans` and verify it appears

#### 3. **Document Findings**
- Note any bugs or issues
- Compare with automated test expectations
- Update tests if behavior differs

---

## 🔄 Combined Manual + Automated Testing

### Recommended Workflow

#### Phase 1: Automated Tests First
```bash
# Run automated tests to establish baseline
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed
```

#### Phase 2: Manual Testing
1. Open browser: `http://localhost:3000/admin/login`
2. Test the same scenarios manually
3. Compare results with automated tests

#### Phase 3: Fix and Re-test
```bash
# If tests fail or manual testing reveals issues:
# 1. Fix the code
# 2. Re-run automated tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --watch

# 3. Re-test manually
# 4. Verify both pass
```

### Parallel Testing Setup

**Terminal 1: Dev Server**
```bash
npm run dev
```

**Terminal 2: Unit Tests (Watch Mode)**
```bash
npm run test:unit -- --watch
```

**Terminal 3: Integration Tests**
```bash
npm run test:integration -- --watch
```

**Terminal 4: Manual Testing**
- Open browser and test manually
- Watch terminal outputs for test results

---

## 🛠️ Troubleshooting

### Common Issues

#### Issue 1: Tests Not Finding Files
```bash
# Solution: Run from project root
cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
```

#### Issue 2: ESM Module Errors
```bash
# Solution: Check jest.config.js has correct transformIgnorePatterns
# Already configured, but if issues persist:
npm run test:unit -- --no-cache
```

#### Issue 3: E2E Tests Timeout
```bash
# Solution: Increase timeout
npm run test:e2e -- --timeout=60000

# Or check if dev server is running
npm run dev
```

#### Issue 4: Port Already in Use
```bash
# Solution: Kill existing process
lsof -ti:3000 | xargs kill -9
npm run dev
```

#### Issue 5: Tests Pass But Manual Testing Fails
- Check if mocks match real API responses
- Verify environment variables are set correctly
- Check browser console for errors
- Compare Network tab with test expectations

---

## 📝 Test Execution Examples

### Example 1: Testing Admin Login (Task 2)

**Step 1: Run Automated Tests**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --verbose

# Integration tests
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx --verbose

# E2E tests (watch it run)
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed --slowMo=1000
```

**Step 2: Manual Testing**
1. Open `http://localhost:3000/admin/login`
2. Enter email: `afouadsoftwareengineer@gmail.com`
3. Enter password: `ZatonaFoushware$8888`
4. Click "Sign In"
5. Verify redirect to `/admin/dashboard`
6. Check browser console for errors
7. Check Network tab for API calls

**Step 3: Compare Results**
- ✅ Automated: Tests pass
- ✅ Manual: Login works, redirects correctly
- ✅ Both match: Feature is working correctly

### Example 2: Testing Custom Roadmap (Task 8)

**Step 1: Run Automated Tests**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/custom-roadmap/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/custom-roadmap/page.integration.test.tsx

# E2E tests
npm run test:e2e -- tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts --headed
```

**Step 2: Manual Testing**
1. Open `http://localhost:3000/custom-roadmap`
2. Fill in plan name: "My Test Plan"
3. Fill in description: "Test description"
4. Select cards, categories, topics
5. Select questions
6. Click "Save Plan"
7. Verify plan appears in `/my-plans`

**Step 3: Verify localStorage**
```javascript
// In browser console
JSON.parse(localStorage.getItem('userPlans'))
```

### Example 3: Testing Flashcards (Tasks 14-16)

**Step 1: Run Automated Tests**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/flashcards/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/flashcards/page.integration.test.tsx

# E2E tests
npm run test:e2e -- tests/e2e/freestyle-flow/flashcards.spec.ts --headed
```

**Step 2: Manual Testing**
1. Open `http://localhost:3000/flashcards`
2. Test theme filter (HTML, CSS, JS, React)
3. Test difficulty filter (Easy, Medium, Hard)
4. Test practice modes:
   - List mode: View all flashcards
   - Flip mode: Click to flip cards
   - Quiz mode: Answer questions
5. Test CRUD operations:
   - Create new flashcard
   - Edit existing flashcard
   - Delete flashcard

---

## 🎯 Quick Reference Commands

### Run All Tests for One Task
```bash
# Replace TASK_NAME with actual task
TASK_NAME="admin-login"

# Unit
npm run test:unit -- apps/website/src/app/${TASK_NAME}/page.test.tsx

# Integration
npm run test:integration -- apps/website/src/app/${TASK_NAME}/page.integration.test.tsx

# E2E
npm run test:e2e -- tests/e2e/${TASK_NAME}/${TASK_NAME}.spec.ts --headed
```

### Run Tests in Watch Mode
```bash
# Unit tests watch
npm run test:unit -- --watch

# Integration tests watch
npm run test:integration -- --watch
```

### Run Tests with Coverage
```bash
# Unit tests coverage
npm run test:unit -- --coverage

# Integration tests coverage
npm run test:integration -- --coverage
```

### Run Tests in Debug Mode
```bash
# E2E debug mode
npm run test:e2e -- --debug tests/e2e/admin/admin-login.spec.ts
```

---

## 📊 Test Results Interpretation

### Understanding Test Output

#### Unit Test Output
```
PASS apps/website/src/app/admin/login/page.test.tsx
  A-UT-006: Admin Login Page Renders
    ✓ should render without errors
    ✓ should render login form
  A-UT-007: Form Inputs Handle Changes
    ✓ should update email input on change
```

#### Integration Test Output
```
PASS apps/website/src/app/admin/login/page.integration.test.tsx
  A-IT-010: Login API Integration
    ✓ should call login API with correct credentials
    ✓ should handle login errors
```

#### E2E Test Output
```
Running 6 tests using 1 worker

  ✓ tests/e2e/admin/admin-login.spec.ts:5:5 A-E2E-002: Admin Login Flow (15s)
    ✓ should load login page
    ✓ should display login form
    ✓ should login successfully
```

### What to Look For

✅ **Passing Tests**: All assertions pass, no errors  
❌ **Failing Tests**: Check error messages, fix code or tests  
⚠️ **Warnings**: Usually non-critical, but review  
⏱️ **Slow Tests**: May indicate performance issues

---

## 🔍 Debugging Failed Tests

### Unit Test Debugging
```bash
# Run specific test with verbose output
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --verbose

# Run in debug mode (Node.js debugger)
node --inspect-brk node_modules/.bin/jest apps/website/src/app/admin/login/page.test.tsx
```

### Integration Test Debugging
```bash
# Check API mocks
# Review test file: apps/website/src/app/admin/login/page.integration.test.tsx
# Verify mock responses match real API responses
```

### E2E Test Debugging
```bash
# Run with headed mode and slow motion
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --headed --slowMo=2000

# Use Playwright Inspector
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --debug

# Generate trace file
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts --trace on
```

---

## ✅ Best Practices

### 1. **Run Tests Before Manual Testing**
- Establish baseline with automated tests
- Fix any obvious failures first
- Then test manually to verify

### 2. **Use Watch Mode During Development**
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tests in watch mode
npm run test:unit -- --watch
```

### 3. **Test One Feature at a Time**
- Focus on one task/feature
- Run all three test types for that feature
- Test manually for that feature
- Move to next feature

### 4. **Compare Results**
- Automated tests show expected behavior
- Manual testing shows actual user experience
- Both should match

### 5. **Document Differences**
- If manual testing reveals different behavior
- Update tests to match actual behavior
- Or fix code to match test expectations

---

## 📚 Additional Resources

### Test Files Location
- **Unit Tests**: `apps/website/src/app/{path}/page.test.tsx`
- **Integration Tests**: `apps/website/src/app/{path}/page.integration.test.tsx`
- **E2E Tests**: `tests/e2e/{category}/{name}.spec.ts`

### Test Reports
- **Test Reports**: `Rest/markdown/docs/testing/tasks/{category}/`
- **Task Details**: See individual task files in `Rest/markdown/docs/testing/tasks/`

### Documentation
- **Test Plan**: `Rest/markdown/docs/testing/COMPREHENSIVE_TEST_PLAN.md`
- **Edge Cases**: `Rest/markdown/docs/testing/EDGE_CASES_AND_ERROR_HANDLING.md`
- **This Guide**: `Rest/markdown/docs/testing/TEST_EXECUTION_GUIDE.md`

---

## 🎯 Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Install Playwright browsers: `npx playwright install`
- [ ] Start dev server: `npm run dev`
- [ ] Run unit tests: `npm run test:unit`
- [ ] Run integration tests: `npm run test:integration`
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Test manually in browser
- [ ] Compare results
- [ ] Fix any issues
- [ ] Re-run tests

---

**Last Updated**: 2025-11-09  
**Status**: Complete Guide  
**Ready for**: Test execution and manual testing

