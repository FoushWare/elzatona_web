# Manual Testing Workflow Guide

**Date**: 2025-11-09  
**Purpose**: Step-by-step guide for manual testing while running automated tests

---

## 🎯 Overview

This guide shows you how to test features manually while running automated tests in parallel. This allows you to:
- Compare automated test results with actual user experience
- Catch issues that automated tests might miss
- Verify edge cases in real browser environment
- Ensure tests match actual behavior

---

## 🚀 Setup for Combined Testing

### Terminal Setup (Recommended)

**Terminal 1: Development Server**
```bash
# Start the dev server
npm run dev

# Server will be available at http://localhost:3000
# Keep this terminal open
```

**Terminal 2: Unit Tests (Watch Mode)**
```bash
# Run unit tests in watch mode
npm run test:unit -- --watch

# Tests will re-run automatically when you save files
# Keep this terminal visible to see test results
```

**Terminal 3: Integration Tests (Optional)**
```bash
# Run integration tests when needed
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
```

**Terminal 4: E2E Tests (When Needed)**
```bash
# Run E2E tests in headed mode to watch
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
```

**Browser: Manual Testing**
- Open `http://localhost:3000`
- Test features manually
- Compare with automated test results

---

## 📋 Manual Testing Workflow for Each Task

### Task 1: Admin Bulk Question Addition

#### Step 1: Run Automated Tests
```bash
# Terminal 2: Unit tests
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx --watch

# Terminal 3: Integration tests
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx

# Terminal 4: E2E tests (watch it run)
npm run test:e2e:headed -- tests/e2e/admin/admin-bulk-question-addition.spec.ts --slowMo=1000
```

#### Step 2: Manual Testing
1. **Open Browser**: `http://localhost:3000/admin/login`
2. **Login**: Use admin credentials
3. **Navigate**: Go to `/admin/content/questions`
4. **Test Features**:
   - ✅ Verify page loads
   - ✅ Check question list displays
   - ✅ Test search functionality
   - ✅ Test pagination
   - ✅ Test "Add New Question" button
   - ✅ Test bulk upload (if implemented)
   - ✅ Test edit/delete operations
5. **Check Console**: Look for errors in browser DevTools
6. **Check Network Tab**: Verify API calls match test expectations

#### Step 3: Compare Results
- ✅ Automated tests pass
- ✅ Manual testing works
- ✅ Both match → Feature is working

---

### Task 2: Admin Login

#### Step 1: Run Automated Tests
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --watch

# Integration tests
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# E2E tests (watch it)
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts --slowMo=2000
```

#### Step 2: Manual Testing
1. **Open Browser**: `http://localhost:3000/admin/login`
2. **Test Valid Login**:
   - Enter: `afouadsoftwareengineer@gmail.com`
   - Password: `ZatonaFoushware$8888`
   - Click "Sign In"
   - ✅ Should redirect to `/admin/dashboard`
3. **Test Invalid Login**:
   - Enter wrong credentials
   - ✅ Should show error message
4. **Test Form Validation**:
   - Leave email empty → Submit
   - ✅ Should show validation error
   - Enter invalid email format
   - ✅ Should show validation error
5. **Check Network Tab**: Verify API calls
6. **Check Console**: No errors should appear

#### Step 3: Compare Results
- Automated: Tests pass for valid/invalid login
- Manual: Same behavior observed
- ✅ Both match

---

### Task 3: Admin Dashboard

#### Step 1: Run Automated Tests
```bash
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
```

#### Step 2: Manual Testing
1. **Login** as admin
2. **Navigate** to `/admin/dashboard`
3. **Verify**:
   - ✅ Dashboard loads
   - ✅ Statistics display correctly
   - ✅ Menu items are clickable
   - ✅ Quick actions work
   - ✅ Refresh button works
4. **Check** all navigation links

---

### Task 17: Homepage

#### Step 1: Run Automated Tests
```bash
npm run test:unit -- apps/website/src/app/page.test.tsx
npm run test:integration -- apps/website/src/app/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/homepage-to-guided.spec.ts
```

#### Step 2: Manual Testing
1. **Open**: `http://localhost:3000`
2. **Verify**:
   - ✅ Page loads
   - ✅ "Get Started" button visible
   - ✅ Navigation links work
   - ✅ Click "Get Started"
   - ✅ Redirects to `/get-started`

---

### Task 8: Custom Roadmap Creation

#### Step 1: Run Automated Tests
```bash
npm run test:unit -- apps/website/src/app/custom-roadmap/page.test.tsx
npm run test:integration -- apps/website/src/app/custom-roadmap/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts --slowMo=2000
```

#### Step 2: Manual Testing
1. **Navigate**: `http://localhost:3000/custom-roadmap`
2. **Test Plan Creation**:
   - Enter plan name
   - Enter description
   - Select cards
   - Select categories
   - Select topics
   - Select questions
   - Click "Save Plan"
3. **Verify**:
   - ✅ Plan is saved
   - ✅ Plan appears in `/my-plans`
   - ✅ Check localStorage: `localStorage.getItem('userPlans')`

---

### Task 14-16: Flashcards

#### Step 1: Run Automated Tests
```bash
npm run test:unit -- apps/website/src/app/flashcards/page.test.tsx
npm run test:integration -- apps/website/src/app/flashcards/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/flashcards.spec.ts
```

#### Step 2: Manual Testing
1. **Navigate**: `http://localhost:3000/flashcards`
2. **Test Theme Filter**:
   - Select "HTML" → ✅ Only HTML flashcards show
   - Select "CSS" → ✅ Only CSS flashcards show
3. **Test Difficulty Filter**:
   - Select "Easy" → ✅ Only easy flashcards show
   - Select "Hard" → ✅ Only hard flashcards show
4. **Test Practice Modes**:
   - **List Mode**: ✅ All flashcards visible
   - **Flip Mode**: ✅ Click to flip cards
   - **Quiz Mode**: ✅ Answer questions
5. **Test CRUD**:
   - Create new flashcard
   - Edit existing flashcard
   - Delete flashcard

---

## 🔄 Recommended Testing Sequence

### For Each Task:

1. **Read the Test Task File**
   ```bash
   # Example: Read task details
   cat Rest/markdown/docs/testing/tasks/admin/A-002-admin-login.md
   ```

2. **Run Automated Tests First**
   ```bash
   # Establish baseline
   npm run test:unit -- [test-file]
   npm run test:integration -- [test-file]
   npm run test:e2e:headed -- [test-file]
   ```

3. **Test Manually**
   - Follow the same steps as automated tests
   - Verify same results
   - Check edge cases

4. **Compare Results**
   - If both pass → ✅ Feature works
   - If automated passes but manual fails → Check environment/config
   - If manual passes but automated fails → Update tests
   - If both fail → Fix the code

5. **Document Findings**
   - Note any differences
   - Update tests if needed
   - Fix bugs found

---

## 🎯 Quick Reference: Commands for Each Task

### Admin Tasks

**Task 1: Bulk Question Addition**
```bash
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-bulk-question-addition.spec.ts
```

**Task 2: Admin Login**
```bash
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
```

**Task 3: Admin Dashboard**
```bash
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
```

**Task 4: Content Management**
```bash
npm run test:unit -- apps/website/src/app/admin/content-management/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/content-management/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-content-management.spec.ts
```

**Task 5: Frontend Tasks**
```bash
npm run test:unit -- apps/website/src/app/admin/frontend-tasks/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-frontend-tasks.spec.ts
```

**Task 6: Problem Solving**
```bash
npm run test:unit -- apps/website/src/app/admin/problem-solving/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/problem-solving/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-problem-solving.spec.ts
```

**Task 7: User Management**
```bash
npm run test:unit -- apps/website/src/app/admin/users/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/users/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-user-management.spec.ts
```

### Guided Flow Tasks

**Task 17: Homepage**
```bash
npm run test:unit -- apps/website/src/app/page.test.tsx
npm run test:integration -- apps/website/src/app/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/homepage-to-guided.spec.ts
```

**Task 18: Get Started**
```bash
npm run test:unit -- apps/website/src/app/get-started/page.test.tsx
npm run test:integration -- apps/website/src/app/get-started/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-unauthenticated.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-authenticated.spec.ts
```

### Freestyle Flow Tasks

**Task 8: Custom Roadmap**
```bash
npm run test:unit -- apps/website/src/app/custom-roadmap/page.test.tsx
npm run test:integration -- apps/website/src/app/custom-roadmap/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts
```

**Task 9: My Plans**
```bash
npm run test:unit -- apps/website/src/app/my-plans/page.test.tsx
npm run test:integration -- apps/website/src/app/my-plans/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/my-plans.spec.ts
```

**Task 10: Browse Practice Questions**
```bash
npm run test:unit -- apps/website/src/app/browse-practice-questions/page.test.tsx
npm run test:integration -- apps/website/src/app/browse-practice-questions/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/browse-practice-questions.spec.ts
```

**Task 11: Learning Paths**
```bash
npm run test:unit -- apps/website/src/app/learning-paths/page.test.tsx
npm run test:integration -- apps/website/src/app/learning-paths/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/learning-paths-practice.spec.ts
```

**Task 12: Frontend Tasks**
```bash
npm run test:unit -- apps/website/src/app/frontend-tasks/page.test.tsx
npm run test:integration -- apps/website/src/app/frontend-tasks/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/frontend-tasks-practice.spec.ts
```

**Task 13: Problem Solving**
```bash
npm run test:unit -- apps/website/src/app/problem-solving/page.test.tsx
npm run test:integration -- apps/website/src/app/problem-solving/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/problem-solving-practice.spec.ts
```

**Task 14-16: Flashcards**
```bash
npm run test:unit -- apps/website/src/app/flashcards/page.test.tsx
npm run test:integration -- apps/website/src/app/flashcards/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/flashcards.spec.ts
```

### Shared Components

**Task 19: Navigation**
```bash
npm run test:unit -- libs/shared-components/src/lib/common/Navigation.test.tsx
npm run test:integration -- libs/shared-components/src/lib/common/Navigation.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/shared-components/navigation.spec.ts
```

**Task 20: Question Card**
```bash
npm run test:unit -- apps/website/src/components/QuestionDisplay.test.tsx
npm run test:integration -- apps/website/src/components/QuestionDisplay.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/shared-components/question-card.spec.ts
```

**Task 21: Progress Tracker**
```bash
npm run test:unit -- libs/shared-components/src/lib/common/ProgressTracker.test.tsx
npm run test:integration -- libs/shared-components/src/lib/common/ProgressTracker.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/shared-components/progress-tracker.spec.ts
```

---

## 📝 Manual Testing Checklist

### For Each Feature:

- [ ] **Page Loads**: Does the page render without errors?
- [ ] **UI Elements**: Are all buttons, inputs, links visible?
- [ ] **Interactions**: Do clicks, inputs, form submissions work?
- [ ] **Navigation**: Do links and redirects work correctly?
- [ ] **API Calls**: Do API calls succeed? (Check Network tab)
- [ ] **Error Handling**: Do errors display correctly?
- [ ] **Loading States**: Do loading indicators show?
- [ ] **Empty States**: What happens with no data?
- [ ] **Edge Cases**: Test with invalid inputs, network errors
- [ ] **Console Errors**: Are there any JavaScript errors?

---

## 🔍 Browser DevTools Tips

### Network Tab
- Filter by "XHR" to see API calls
- Check request/response payloads
- Verify status codes (200, 400, 500, etc.)
- Check timing (slow requests?)

### Console Tab
- Look for errors (red text)
- Check warnings (yellow text)
- Verify console.log outputs
- Check for React warnings

### Application Tab
- Check localStorage: `Application > Local Storage`
- Check sessionStorage: `Application > Session Storage`
- Verify cookies if used

### Elements Tab
- Inspect component structure
- Check CSS classes
- Verify data attributes
- Check accessibility attributes

---

## ✅ Success Criteria

### Automated Tests Pass
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass

### Manual Testing Passes
- ✅ Feature works as expected
- ✅ No console errors
- ✅ API calls succeed
- ✅ UI is responsive
- ✅ Edge cases handled

### Both Match
- ✅ Automated tests match manual behavior
- ✅ No discrepancies
- ✅ Ready for production

---

## 🚨 When Tests Don't Match

### Automated Passes, Manual Fails
**Possible Causes:**
- Environment differences
- Missing environment variables
- Browser-specific issues
- Network issues

**Solution:**
1. Check environment variables
2. Check browser console for errors
3. Verify API endpoints are accessible
4. Check Network tab for failed requests

### Manual Passes, Automated Fails
**Possible Causes:**
- Tests are outdated
- Mocks don't match real API
- Test setup issues

**Solution:**
1. Update test mocks to match real API
2. Fix test setup
3. Update test expectations

### Both Fail
**Solution:**
1. Fix the code
2. Re-run tests
3. Re-test manually
4. Verify both pass

---

## 📚 Additional Resources

- **Test Execution Guide**: `Rest/markdown/docs/testing/TEST_EXECUTION_GUIDE.md`
- **Test Plan**: `Rest/markdown/docs/testing/COMPREHENSIVE_TEST_PLAN.md`
- **Edge Cases**: `Rest/markdown/docs/testing/EDGE_CASES_AND_ERROR_HANDLING.md`
- **Task Details**: `Rest/markdown/docs/testing/tasks/`

---

**Last Updated**: 2025-11-09  
**Status**: Complete Guide  
**Ready for**: Manual and automated testing workflow

