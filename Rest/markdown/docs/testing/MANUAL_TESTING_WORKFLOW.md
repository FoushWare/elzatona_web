# Manual Testing Workflow Guide

**Date**: 2025-01-27  
**Purpose**: Quick reference for manual testing  
**Status**: ✅ All integration tests passing (21/21 suites, 88/88 tests)

---

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Create .env.local with credentials
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password
```

### 2. Start Dev Server
```bash
npm run dev
# Server runs at http://localhost:3000
```

### 3. Testing Order (Important!)
1. **Task 2: Admin Login** ⭐ START HERE
2. **Task 3: Admin Dashboard** (expect 0 questions initially)
3. **Task 1: Add Questions** (populate database)
4. Continue with remaining tasks

---

## 📋 Essential Test Flows

### Task 2: Admin Login ⭐ START HERE

**Why First?** Must be logged in for all admin features.

**Quick Test:**
1. Navigate to `http://localhost:3000/admin/login`
2. Enter credentials from `.env.local`:
   - Email: `ADMIN_EMAIL`
   - Password: `ADMIN_PASSWORD`
3. Click "Sign In"
4. ✅ Should redirect to `/admin/dashboard`

**Verify:**
- [x] Login form loads
- [x] Valid credentials work
- [x] Invalid credentials show error
- [x] Redirects to dashboard after login

**Run Tests:**
```bash
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
```

---

### Task 3: Admin Dashboard

**Quick Test:**
1. After login, verify dashboard loads
2. Check stats cards (may show 0 - this is correct for empty database)
3. Test navigation menu
4. Test theme toggle

**Verify:**
- [x] Dashboard loads completely
- [x] Stats cards visible (0 is expected initially)
- [x] Admin menu works
- [x] Theme toggle works
- [x] Navigation links work

**Run Tests:**
```bash
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
```

---

### Task 1: Admin Question Management

**Quick Test:**
1. Navigate to `/admin/content/questions`
2. Click "Add New Question"
3. Fill form:
   - Title: "What is HTML?"
   - Type: "Multiple choice"
   - Category: "HTML"
   - Topic: "Basics"
   - Difficulty: "Beginner"
   - Add 2-3 options, mark one as correct
4. Click "Create Question"
5. ✅ Verify question appears in list
6. ✅ Verify stats update (0 → 1)

**Verify:**
- [x] Empty state shows initially (expected)
- [x] Create modal opens
- [x] Form validation works
- [x] Question created successfully
- [x] Question appears in list
- [x] Stats cards update

**Bulk Upload Test:**
1. Click "Bulk Upload"
2. Upload JSON file with questions
3. ✅ Verify questions imported
4. ✅ Verify stats update

**Run Tests:**
```bash
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:e2e:admin:questions
```

---

### Task G-006: Guided Practice Page

**Quick Test:**
1. Navigate to `/guided-practice?plan={planId}`
2. Verify page loads without authentication
3. Answer first question
4. ✅ Verify explanation appears
5. ✅ Verify resources section appears (if question has resources)
6. Click "Next Question"
7. Refresh page (F5)
8. ✅ Verify resumes at same question (not from beginning)

**Verify:**
- [x] Page loads without login
- [x] Questions display correctly
- [x] Answer selection works
- [x] Explanation appears after answer
- [x] Resources section appears (if available)
- [x] Progress saved to localStorage
- [x] Page resume works after refresh

**Resources Testing:**
- [x] Resources section appears after explanation
- [x] Video resources show Video icon
- [x] Course resources show GraduationCap icon
- [x] Article resources show FileText icon
- [x] Resources open in new tab
- [x] Resources NOT shown for code questions
- [x] Resources NOT shown if question has no resources

**Run Tests:**
```bash
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

---

## 🧪 Automated Test Execution Guide

### Run All Tests for Each Task

#### Task 2: Admin Login - Complete Test Suite

```bash
# 1. Unit Tests
echo "🧪 Running Unit Tests for Admin Login..."
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# 2. Integration Tests
echo "🔗 Running Integration Tests for Admin Login..."
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# 3. E2E Tests
echo "🌐 Running E2E Tests for Admin Login..."
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# 4. Navbar Unit Tests (if exists)
echo "🧪 Running Navbar Unit Tests..."
npm run test:unit -- libs/shared-components/src/lib/auth/AdminLoginNavbar.test.tsx 2>/dev/null || echo "Navbar unit tests not found"

# 5. Navbar Integration Tests (if exists)
echo "🔗 Running Navbar Integration Tests..."
npm run test:integration -- libs/shared-components/src/lib/auth/AdminLoginNavbar.integration.test.tsx 2>/dev/null || echo "Navbar integration tests not found"
```

**Expected Results:**
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass (9 tests)
- ✅ No console errors

**Issues to Detect:**
- ❌ Login form doesn't render
- ❌ Form validation fails
- ❌ API calls fail
- ❌ Redirect doesn't work
- ❌ Error handling doesn't work

---

#### Task 3: Admin Dashboard - Complete Test Suite

```bash
# 1. Unit Tests
echo "🧪 Running Unit Tests for Admin Dashboard..."
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx

# 2. Integration Tests
echo "🔗 Running Integration Tests for Admin Dashboard..."
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx

# 3. E2E Tests
echo "🌐 Running E2E Tests for Admin Dashboard..."
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# 4. Navbar Unit Tests
echo "🧪 Running Admin Navbar Unit Tests..."
npm run test:unit -- libs/shared-components/src/lib/components/admin/AdminNavbar.test.tsx 2>/dev/null || echo "Admin navbar unit tests not found"

# 5. Navbar Integration Tests
echo "🔗 Running Admin Navbar Integration Tests..."
npm run test:integration -- libs/shared-components/src/lib/components/admin/AdminNavbar.integration.test.tsx 2>/dev/null || echo "Admin navbar integration tests not found"
```

**Expected Results:**
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass (9 tests including 4 theme toggle tests)
- ✅ Stats cards display correctly
- ✅ Theme toggle works

**Issues to Detect:**
- ❌ Dashboard doesn't load
- ❌ Stats cards show incorrect data
- ❌ Navigation menu doesn't work
- ❌ Theme toggle fails
- ❌ API calls fail

---

#### Task 1: Admin Question Management - Complete Test Suite

```bash
# 1. Unit Tests
echo "🧪 Running Unit Tests for Question Management..."
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx

# 2. Integration Tests
echo "🔗 Running Integration Tests for Question Management..."
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx

# 3. E2E Tests (All split test files)
echo "🌐 Running E2E Tests for Question Management..."
echo "  → Basic page loading tests..."
npm run test:e2e:admin:questions:basic 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.basic.spec.ts

echo "  → CRUD operations tests..."
npm run test:e2e:admin:questions:crud 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.crud.spec.ts

echo "  → Search functionality tests..."
npm run test:e2e:admin:questions:search 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.search.spec.ts

echo "  → Pagination tests..."
npm run test:e2e:admin:questions:pagination 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.pagination.spec.ts

echo "  → Bulk operations tests..."
npm run test:e2e:admin:questions:bulk 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.bulk.spec.ts

echo "  → Stats cards tests..."
npm run test:e2e:admin:questions:stats 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.stats.spec.ts

echo "  → Form validation tests..."
npm run test:e2e:admin:questions:validation 2>/dev/null || npm run test:e2e:headed -- tests/e2e/admin/admin-questions-page.validation.spec.ts

# Or run all at once:
# npm run test:e2e:admin:questions
```

**Expected Results:**
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E test suites pass
- ✅ CRUD operations work
- ✅ Search works
- ✅ Pagination works
- ✅ Bulk upload works
- ✅ Stats update correctly

**Issues to Detect:**
- ❌ Questions don't load
- ❌ Create form doesn't work
- ❌ Edit/Delete fails
- ❌ Search doesn't filter
- ❌ Pagination breaks
- ❌ Bulk upload fails
- ❌ Stats show wrong counts

---

#### Task G-006: Guided Practice Page - Complete Test Suite

```bash
# 1. Unit Tests
echo "🧪 Running Unit Tests for Guided Practice..."
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx

# 2. Integration Tests
echo "🔗 Running Integration Tests for Guided Practice..."
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx

# 3. E2E Tests
echo "🌐 Running E2E Tests for Guided Practice..."
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

**Expected Results:**
- ✅ All unit tests pass (including G-UT-030 for resources)
- ✅ All integration tests pass (including G-IT-022 for resources)
- ✅ All E2E tests pass (including G-E2E-017 for resources)
- ✅ localStorage persistence works
- ✅ Resources display correctly
- ✅ Page resume works after refresh

**Issues to Detect:**
- ❌ Page doesn't load without auth
- ❌ Questions don't display
- ❌ Answer selection fails
- ❌ Explanation doesn't appear
- ❌ Resources section doesn't show
- ❌ localStorage doesn't persist
- ❌ Page doesn't resume after refresh

---

### 🚀 Master Test Execution Script

**Option 1: Use the Automated Script (Recommended)**

```bash
# Run the complete test suite script
./scripts/run-all-tests.sh

# Or with full output (see all test details):
bash scripts/run-all-tests.sh
```

**Option 2: Run Tests Manually (For Debugging)**

```bash
# Task 2: Admin Login
echo "📋 Task 2: Admin Login"
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Task 3: Admin Dashboard
echo "📋 Task 3: Admin Dashboard"
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# Task 1: Question Management
echo "📋 Task 1: Question Management"
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:e2e:admin:questions

# Task G-006: Guided Practice
echo "📋 Task G-006: Guided Practice"
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

**Option 3: Run Individual Test Types**

```bash
# Run only unit tests for all tasks
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx

# Run only integration tests for all tasks
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx

# Run only E2E tests for all tasks
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
npm run test:e2e:admin:questions
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

---

### 📊 Test Execution Checklist

**Before Running Tests:**
- [ ] `.env.local` file exists with credentials
- [ ] Dev server is running (for E2E tests) OR E2E will start it automatically
- [ ] Database is accessible
- [ ] No other processes using port 3000

**During Test Execution:**
- [ ] Watch for test failures
- [ ] Note any error messages
- [ ] Check console output for warnings
- [ ] Monitor test execution time

**After Test Execution:**
- [ ] Review test results summary
- [ ] Check failed tests
- [ ] Verify error messages are clear
- [ ] Document any issues found

---

### 🔍 Issue Detection Guide

#### Common Test Failure Patterns

**1. Unit Test Failures:**
```bash
# Run with verbose output to see details
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --verbose

# Check for:
- Component rendering errors
- Prop validation errors
- State management issues
- Hook dependency warnings
```

**2. Integration Test Failures:**
```bash
# Run with verbose output
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx --verbose

# Check for:
- API call failures
- State synchronization issues
- Component interaction problems
- Context provider issues
```

**3. E2E Test Failures:**
```bash
# Run in headed mode to see what's happening
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Check for:
- Page load timeouts
- Element not found errors
- Navigation failures
- Form submission issues
- Network request failures
```

#### Debugging Failed Tests

**1. Check Test Output:**
- Look for error stack traces
- Check which specific test failed
- Review error messages

**2. Run Single Test:**
```bash
# Run only the failing test
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx -t "test name"
```

**3. Check Environment:**
```bash
# Verify environment variables
cat .env.local | grep ADMIN

# Verify dev server
curl http://localhost:3000
```

**4. Check Test Files:**
```bash
# Verify test files exist
ls -la apps/website/src/app/admin/login/page.test.tsx
ls -la apps/website/src/app/admin/login/page.integration.test.tsx
ls -la tests/e2e/admin/admin-login.spec.ts
```

---

### 📈 Test Results Summary

**After running all tests, you should see:**

```
✅ Task 2: Admin Login
   - Unit Tests: X/X passing
   - Integration Tests: X/X passing
   - E2E Tests: 9/9 passing

✅ Task 3: Admin Dashboard
   - Unit Tests: X/X passing
   - Integration Tests: X/X passing
   - E2E Tests: 9/9 passing

✅ Task 1: Question Management
   - Unit Tests: X/X passing
   - Integration Tests: X/X passing
   - E2E Tests: X/X passing (all suites)

✅ Task G-006: Guided Practice
   - Unit Tests: X/X passing
   - Integration Tests: X/X passing
   - E2E Tests: X/X passing
```

**If tests fail:**
1. Note which task failed
2. Note which test type failed (unit/integration/E2E)
3. Note the specific test that failed
4. Review error message
5. Check troubleshooting section below

---

## 🔍 Common Test Checks

### For Any Feature:
- [X] Page loads without errors
- [X] No console errors (check DevTools)
- [X] API calls succeed (check Network tab)
- [X] UI elements visible and clickable
- [X] Form validation works
- [X] Error messages display correctly
- [X] Loading states appear
- [X] Theme toggle works
- [X] Responsive design works (mobile/tablet/desktop)

### Browser DevTools:
- **Console Tab**: Check for errors (red text)
- **Network Tab**: Verify API calls succeed (200 status)
- **Application Tab**: Check localStorage if feature uses it

---

## 🎯 Quick Test Commands

### Unit Tests (Task-Specific)
```bash
# Example: Test login page
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# ⚠️ DO NOT run all unit tests at once - too many!
# ✅ DO run task-specific tests
```

### Integration Tests (Task-Specific)
```bash
# Example: Test login integration
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# Or run all (takes longer):
npm run test:integration
```

### E2E Tests (Task-Specific)
```bash
# Example: Test login E2E
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Note: Dev server automatically started by Playwright
```

---

## ✅ Success Criteria

### Automated Tests
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass

### Manual Testing
- ✅ Feature works as expected
- ✅ No console errors
- ✅ API calls succeed
- ✅ UI is responsive
- ✅ Edge cases handled

### Both Match
- ✅ Automated tests match manual behavior
- ✅ Ready for production

---

## 🚨 Troubleshooting

### Tests Fail but Manual Works
- Check environment variables (`.env.local`)
- Check browser console for errors
- Verify API endpoints accessible
- Check Network tab for failed requests

### Manual Works but Tests Fail
- Update test mocks to match real API
- Fix test setup
- Update test expectations

### Both Fail
- Fix the code
- Re-run tests
- Re-test manually

---

## 📚 Additional Resources

- **Full Test Plan**: `Rest/markdown/docs/testing/COMPREHENSIVE_TEST_PLAN.md`
- **Test Environment Setup**: `Rest/markdown/docs/testing/TEST_ENVIRONMENT_SETUP.md`
- **Task Details**: `Rest/markdown/docs/testing/tasks/`
- **8GB RAM Config**: `Rest/markdown/docs/testing/8GB_RAM_TEST_CONFIG.md`

---

## 📝 Quick Reference: Test Files by Task

### Admin Tasks
- **Login**: `apps/website/src/app/admin/login/page.test.tsx`
- **Dashboard**: `apps/website/src/app/admin/dashboard/page.test.tsx`
- **Questions**: `apps/website/src/app/admin/content/questions/page.test.tsx`

### Guided Flow
- **Homepage**: `apps/website/src/app/page.test.tsx`
- **Get Started**: `apps/website/src/app/get-started/page.test.tsx`
- **Guided Practice**: `apps/website/src/app/guided-practice/page.test.tsx`

### Freestyle Flow
- **Browse Questions**: `apps/website/src/app/browse-practice-questions/page.test.tsx`
- **Flashcards**: `apps/website/src/app/flashcards/page.test.tsx`

---

---

## ⚡ Quick Test Commands Reference

### Run All Tests (Automated Scripts)

```bash
# Quick mode (summary only)
./scripts/run-all-tests.sh

# Verbose mode (see all output)
./scripts/run-all-tests-verbose.sh
```

### Run Tests by Task

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

**Task 1: Question Management**
```bash
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:e2e:admin:questions
```

**Task G-006: Guided Practice**
```bash
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

### Run Tests by Type

**All Unit Tests:**
```bash
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx
```

**All Integration Tests:**
```bash
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx
```

**All E2E Tests:**
```bash
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
npm run test:e2e:admin:questions
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

---

**Last Updated**: 2025-01-27  
**Optimized for**: Quick manual testing workflow  
**Credentials**: Use environment variables from `.env.local` (never hardcode)  
**Test Scripts**: `./scripts/run-all-tests.sh` (quick) | `./scripts/run-all-tests-verbose.sh` (verbose)
