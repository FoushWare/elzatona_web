# Manual Testing Workflow Guide

**Date**: 2025-01-27  
**Purpose**: Step-by-step guide for manual testing while running automated tests  
**Status**: ✅ All integration tests passing (21/21 test suites, 88/88 tests)

## 📊 Testing Progress Tracker

### Overall Status
- [ ] All unit tests passing
- [ ] All integration tests passing (21/21 suites, 88/88 tests)
- [ ] All E2E tests passing
- [ ] Manual testing completed for all tasks
- [ ] Documentation updated

### Test Environment Setup
- [ ] **Test Database Setup** (Recommended):
  - [ ] `.env.test.local` file created with test database credentials (see `Rest/markdown/docs/testing/TEST_ENVIRONMENT_SETUP.md`)
  - [ ] Separate Supabase test project created
  - [ ] Test database schema seeded (all 17 tables from production)
  - [ ] Test admin user created (see admin credentials below)
  - [ ] Test database schema matches main database
- [ ] **Development Environment** (Fallback):
  - [ ] `.env.local` file created with credentials (used as fallback if `.env.test.local` not found)
  - [ ] `ADMIN_EMAIL` configured
  - [ ] `ADMIN_PASSWORD` configured
  - [ ] `TEST_INVALID_EMAIL` configured (for error testing)
  - [ ] `TEST_INVALID_PASSWORD` configured (for error testing)
- [ ] **Environment Variable** (New):
  - [ ] `APP_ENV=test` set in `.env.test.local` (simplest way to switch environments)
  - [ ] See `apps/website/src/lib/utils/ENV_SWITCH_GUIDE.md` for environment switching
- [ ] Dev server running successfully
- [ ] All test commands working

**Note**: Tests now use separate environment files to avoid affecting the main database:
- **Priority**: `.env.test.local` > `.env.test` > `.env.local` (fallback)
- **Environment Detection**: Uses `APP_ENV` variable (test/production/development)
- **Test Project**: zatona-web-testing (kiycimlsatwfqxtfprlr) - fully seeded and ready
- **Admin User**: Created in test database (see credentials in `.env.test.local`)
- See `Rest/markdown/docs/testing/TEST_ENVIRONMENT_SETUP.md` for detailed setup instructions

### Task Completion Status (21 Tasks Total)

**⚠️ IMPORTANT: Starting with Empty Database**
- The database currently has **NO questions** - this is the starting state
- Follow tasks in the order listed below for proper workflow
- Task 2 (Login) must be completed before Task 1 (Question Addition)

#### Phase 1: Setup & Authentication (Must Complete First)
- [ ] **Task 2**: Admin Login ⭐ **START HERE** - Required before all admin tasks
- [ ] **Task 3**: Admin Dashboard - Verify dashboard works with empty database

#### Phase 2: Content Creation (After Login & Dashboard Verified)
- [ ] **Task 1**: Admin Bulk Question Addition ⭐ **Add First Questions Here**
  - Start with single question addition
  - Then test bulk upload
  - Database will be empty initially - expect "0 questions" in stats
- [ ] **Task 4**: Content Management - Manage cards, plans, categories, topics

#### Phase 3: Additional Admin Features
- [ ] **Task 5**: Frontend Tasks Management
- [ ] **Task 6**: Problem Solving Management
- [ ] **Task 7**: User Management

#### Guided Flow Tasks (3 tasks)
- [ ] **Task 17**: Homepage
- [ ] **Task 18**: Get Started
- [ ] **Task 18b**: Guided Learning Page (comprehensive tests)

#### Freestyle Flow Tasks (6 tasks)
- [ ] **Task 8**: Custom Roadmap Creation
- [ ] **Task 9**: My Plans
- [ ] **Task 10**: Browse Practice Questions
- [ ] **Task 11**: Learning Paths
- [ ] **Task 12**: Frontend Tasks
- [ ] **Task 13**: Problem Solving
- [ ] **Task 14-16**: Flashcards

#### Shared Components (3 tasks)
- [ ] **Task 19**: Navigation
- [ ] **Task 20**: Question Card
- [ ] **Task 21**: Progress Tracker

### Test Type Completion

#### Unit Tests
- [ ] All unit tests written
- [ ] All unit tests passing
- [ ] Snapshots updated

#### Integration Tests
- [ ] All integration tests written
- [ ] All integration tests passing (21/21 suites, 88/88 tests)
- [ ] API mocks updated

#### E2E Tests
- [ ] All E2E tests written
- [ ] All E2E tests passing
- [ ] Test scenarios cover all flows
- [ ] Theme toggle tests complete (4 tests)
- [ ] Admin dashboard tests complete (9 tests)

---

## 🎯 Overview

This guide shows you how to test features manually while running automated tests in parallel. This allows you to:
- Compare automated test results with actual user experience
- Catch issues that automated tests might miss
- Verify edge cases in real browser environment
- Ensure tests match actual behavior

**⚠️ IMPORTANT: Starting State - Empty Database**
- **The database currently has NO questions** - this is the starting state
- Stats cards will show **0** for questions initially - this is **correct and expected**
- Follow tasks in the order specified below for proper workflow
- Task 2 (Login) must be completed before Task 1 (Question Addition)

**📋 Recommended Testing Order:**
1. **Task 2: Admin Login** ⭐ START HERE - Required for all admin features
2. **Task 3: Admin Dashboard** - Verify dashboard works with empty database (expect 0 counts)
3. **Task 1: Admin Bulk Question Addition** - Add first questions to populate database
4. Continue with remaining tasks

**⚠️ Testing Best Practice:**
- **Run tests per-task, not all at once** - Each task section shows its specific test commands
- **Unit Tests**: Always run task-specific unit tests (e.g., `npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx`)
- **Integration Tests**: Run task-specific when possible, or all if needed for verification
- **E2E Tests**: Always run task-specific E2E tests
- **DO NOT run**: `npm run test:unit -- --watch` (runs ALL unit tests - too many for 8GB RAM!)

**📦 E2E Test Structure (Task 1 - Admin Questions Page):**
- **Split Test Files**: The large E2E test file has been split into focused test files for easier debugging:
  - `admin-questions-page.basic.spec.ts` - Basic page loading
  - `admin-questions-page.crud.spec.ts` - CRUD operations
  - `admin-questions-page.search.spec.ts` - Search functionality
  - `admin-questions-page.pagination.spec.ts` - Pagination
  - `admin-questions-page.bulk.spec.ts` - Bulk operations
  - `admin-questions-page.stats.spec.ts` - Stats cards
  - `admin-questions-page.validation.spec.ts` - Form validation
- **Run all split tests**: `npm run test:e2e:admin:questions`
- **Run specific suite**: `npm run test:e2e:admin:questions:basic` (or crud, search, etc.)
- **Benefits**: Easier debugging, faster development, better organization, reduced serial mode issues
- See `tests/e2e/admin/README-SPLIT-TESTS.md` for details

**Note**: All test configurations have been optimized for 8GB RAM systems. See `Rest/markdown/docs/testing/8GB_RAM_TEST_CONFIG.md` for details.

---

## 🚀 Quick Start Guide (Empty Database)

**Starting Point:** Database has **NO questions** - this is expected!

### Step-by-Step Testing Flow:

1. **Setup Environment** (One-time):
   ```bash
   # Option 1: Test Environment (Recommended for tests)
   # Create .env.test.local file with test database credentials
   cp Rest/env.test.example .env.test.local
   # Edit .env.test.local and set:
   # - APP_ENV=test
   # - Test Supabase project URL and keys
   # - Test admin credentials
   
   # Option 2: Development Environment (Fallback)
   # Create .env.local file with dev database credentials
   ADMIN_EMAIL=your-admin-email@example.com
   ADMIN_PASSWORD=your-admin-password
   ```
   
   **✅ Test Database Ready:**
   - Test project: zatona-web-testing (fully seeded)
   - Admin user: Created and ready (check `.env.test.local` for credentials)
   - Schema: All 17 tables from production

2. **Start Development Server** (Optional):
   ```bash
   # Option A: Start manually (if you want to test in browser while running tests)
   npm run dev:light
   # Server runs at http://localhost:3000
   
   # Option B: Let E2E tests start it automatically (recommended)
   # E2E tests will automatically start the dev server via Playwright's webServer config
   # No need to run this manually - just run the E2E tests!
   ```
   
   **Note**: 
   - **Unit/Integration tests**: Don't need a dev server (run in Jest)
   - **E2E tests**: Dev server is automatically started by Playwright
   - If you already have a server running, Playwright will reuse it

3. **Follow This Testing Order**:
   - ✅ **Task 2: Admin Login** - Login first (required for all admin features)
   - ✅ **Task 3: Admin Dashboard** - Verify dashboard works (expect 0 questions in stats)
   - ✅ **Task 1: Admin Bulk Question Addition** - Add your first questions
   - ✅ Continue with remaining tasks

4. **What to Expect**:
   - Stats cards showing **0** is **correct** - database is empty
   - Empty state messages are **expected**, not errors
   - After adding questions, stats will update automatically

---

## 🔐 Environment Variables Setup

**Important**: Tests now use separate environment files to avoid affecting the main database!

### Test Environment Priority

Tests load environment variables in this order:
1. **`.env.test.local`** (highest priority - for test database)
2. **`.env.test`** (test defaults - can be committed)
3. **`.env.local`** (fallback to dev environment)

### Quick Setup

1. **For Test Isolation** (Recommended):
   ```bash
   # Create .env.test.local with test database credentials
   cp Rest/env.test.example .env.test.local
   # Edit .env.test.local with your test Supabase project credentials
   # IMPORTANT: Set APP_ENV=test in .env.test.local
   ```

2. **For Development** (Fallback):
   ```bash
   # Create .env.local with dev database credentials (used as fallback)
   ADMIN_EMAIL=your-admin-email@example.com
   ADMIN_PASSWORD=your-admin-password
   ```

3. **Environment Switching** (New):
   - Set `APP_ENV=test` in `.env.test.local` for test environment
   - Set `APP_ENV=production` in `.env.local` for production environment
   - Set `APP_ENV=development` in `.env.dev.local` for development environment
   - See `apps/website/src/lib/utils/ENV_SWITCH_GUIDE.md` for details

**See `Rest/markdown/docs/testing/TEST_ENVIRONMENT_SETUP.md` for complete setup guide.**

**✅ Test Database Status:**
- **Test Project**: zatona-web-testing (kiycimlsatwfqxtfprlr)
- **Schema**: All 17 tables seeded from production schema
- **Admin User**: Created and ready (credentials in `.env.test.local`)
- **Status**: Ready for testing

### Why Separate Test Environment?

- ✅ Tests don't affect your main database
- ✅ Safe to create/delete test data
- ✅ Multiple developers can run tests simultaneously
- ✅ CI/CD can use different test databases
- ✅ Backwards compatible (falls back to `.env.local` if test env not found)

### Required Environment Variables

**For Test Environment** (`.env.test.local`):
```bash
# Environment Type (NEW - simplest way to switch)
APP_ENV=test

# Test Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-test-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_test_service_role_key

# Test Admin Credentials (for E2E tests)
ADMIN_EMAIL=test-admin@example.com
ADMIN_PASSWORD=test-admin-password-123
INITIAL_ADMIN_EMAIL=test-admin@example.com
INITIAL_ADMIN_PASSWORD=test-admin-password-123

# Invalid Test Credentials (for testing error handling)
TEST_INVALID_EMAIL=invalid@test.com
TEST_INVALID_PASSWORD=invalid-password

# Test Settings
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-nextauth-secret
NODE_ENV=test
NEXT_PUBLIC_APP_ENV=test
```

**For Development Environment** (`.env.local` - fallback):
```bash
# Admin Test Credentials (for E2E tests)
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password

# Invalid Test Credentials (for testing error handling)
TEST_INVALID_EMAIL=invalid@test.com
TEST_INVALID_PASSWORD=invalid-password

# Fallback Credentials (optional - used if ADMIN_EMAIL/ADMIN_PASSWORD not set)
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=admin-password
TEST_ADMIN_EMAIL=test@example.com
TEST_ADMIN_PASSWORD=test-password
```

**Note**: 
- **Test Environment**: Use `.env.test.local` with `APP_ENV=test` for all tests
- **Environment Priority**: `.env.test.local` > `.env.test` > `.env.local` (fallback)
- Tests will automatically use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the appropriate file
- If not set, tests will fall back to `INITIAL_ADMIN_EMAIL`/`INITIAL_ADMIN_PASSWORD` or `TEST_ADMIN_EMAIL`/`TEST_ADMIN_PASSWORD`
- Tests will fail with clear error messages if no credentials are provided
- Never commit `.env.test.local` or `.env.local` to version control
- **Test Database**: zatona-web-testing project is seeded and ready (admin user created)

---

## 🚀 Setup for Combined Testing

### Terminal Setup (Recommended)

**⚠️ IMPORTANT: Dev Server Requirements**

- **Unit Tests**: ❌ **NO dev server needed** - Run in Jest/Node.js environment
- **Integration Tests**: ❌ **NO dev server needed** - Run in Jest/Node.js environment  
- **E2E Tests**: ✅ **Dev server automatically started** by Playwright (or reuse existing)

**Terminal 1: Development Server** (Optional - Only if you want to manually test in browser)
```bash
# Start the dev server (optimized for 8GB RAM)
npm run dev

# Or use light mode for lower memory usage
npm run dev:light

# Server will be available at http://localhost:3000
# Keep this terminal open
# 
# Note: E2E tests will automatically start their own dev server if this isn't running
# Playwright config has webServer that runs: npm run dev:light
# If you already have a server running, Playwright will reuse it (reuseExistingServer: true)
```

**Terminal 2: Unit Tests (Task-Specific - Watch Mode)**
```bash
# ⚠️ IMPORTANT: Run unit tests for SPECIFIC TASKS, not all tests at once
# Each task section below shows its specific unit test command
# Example for Task 2 (Login):
# npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --watch

# Tests will re-run automatically when you save files
# Keep this terminal visible to see test results
# Note: Uses 1 worker and 768MB memory limit for stability
# 
# ⚠️ DO NOT run: npm run test:unit -- --watch (runs ALL tests - too many!)
# ✅ DO run: npm run test:unit -- [specific-test-file] --watch (runs one task's tests)
```

**Terminal 3: Integration Tests (Task-Specific)**
```bash
# ⚠️ IMPORTANT: Run integration tests for SPECIFIC TASKS when possible
# Each task section below shows its specific integration test command
# Example for Task 2 (Login):
# npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# For a specific task:
npm run test:integration -- [task-specific-test-file]

# ⚠️ Only run all integration tests if you need to verify everything:
# npm run test:integration (runs all 21/21 suites, 88/88 tests - takes longer)
```

**Terminal 4: E2E Tests (When Needed)**
```bash
# Run E2E tests in headed mode to watch (optimized for 8GB RAM)
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Note: 
# - ✅ Dev server is AUTOMATICALLY started by Playwright (no need to run npm run dev:light manually)
# - ✅ If you already have a dev server running, Playwright will reuse it
# - Uses 1 worker and 1536MB memory limit
# - Dev server runs in light mode automatically (via webServer config)
# - Only runs in Chrome (Chromium) for faster execution (9 tests instead of 45)
# - Tests include: page load, form validation, error handling, successful login, redirects, loading states, navbar tests
# - Test timeout increased to 60 seconds for reliable E2E execution
# - Credentials loaded from .env.test.local: ADMIN_EMAIL and ADMIN_PASSWORD (or INITIAL_ADMIN_EMAIL/INITIAL_ADMIN_PASSWORD as fallback)
# - Invalid test credentials: TEST_INVALID_EMAIL and TEST_INVALID_PASSWORD from .env.test.local
# - To enable slow motion, add `slowMo: 2000` to playwright.config.ts use section
# - To test other browsers, uncomment them in playwright.config.ts projects array
```

**Browser: Manual Testing**
- Open `http://localhost:3000`
- Test features manually
- Compare with automated test results

### ⚡ Performance Tips for 8GB RAM Systems

**Memory Management:**
- Close other applications before running tests
- Run tests selectively (one suite at a time) rather than all at once
- Use `--watch` mode sparingly to save memory
- If tests fail with OOM errors, use sequential mode:
  ```bash
  npm run test:unit:sequential
  ```

**Test Execution:**
- Integration tests are optimized and all passing ✅
- Unit tests run with 1 worker (slower but stable)
- E2E tests run sequentially (1 worker) to prevent memory issues
- Dev server automatically uses light mode for E2E tests

**E2E Slow Motion (Optional):**
To add slow motion to E2E tests for easier observation, edit `playwright.config.ts`:
```typescript
use: {
  baseURL: 'http://localhost:3000',
  slowMo: 2000, // Add 2 second delay between actions (in milliseconds)
  // ... other options
}
```
Note: Playwright doesn't support `--slow-mo` CLI flag. Configure it in the config file.

**Quick Status Check:**
```bash
# Check integration test status (should show all passing)
npm run test:integration 2>&1 | tail -3

# Expected output:
# Test Suites: 21 passed, 21 total
# Tests:       88 passed, 88 total
```

---

## 📋 Manual Testing Workflow for Each Task

**⚠️ Testing Order (Important):**
1. **Task 2: Admin Login** - Must complete first (authentication required)
2. **Task 3: Admin Dashboard** - Verify dashboard works with empty database
3. **Task 1: Admin Bulk Question Addition** - Add questions to empty database
4. Continue with remaining tasks

---

### Task 2: Admin Login ⭐ START HERE

**Why First?** You must be logged in to access all admin features. Complete this before any other admin tasks.

#### Step 1: Run Automated Tests
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx --watch

# Integration tests
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# E2E tests (watch it)
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
# Note: To add slow motion, configure slowMo in playwright.config.ts
```

**E2E Test Workflow for Admin Login:**
Each E2E test in `admin-login.spec.ts` follows this pattern:

1. **`beforeEach` Hook (Runs Before Each Test)**:
   - ✅ Navigates to `/admin/login`
   - ✅ Waits for login form to be ready (heading visible)
   - ✅ Waits for form elements to be interactive

2. **Each Individual Test Then**:
   - ✅ Performs specific test actions (form validation, login, error handling, etc.)
   - ✅ Verifies expected behavior
   - ✅ Some tests navigate to dashboard after successful login

**Manual Testing Equivalent:**
When manually testing, follow the same pattern:
1. Start at `/admin/login` for each test scenario
2. Perform the test action
3. Verify results

#### Step 2: Manual Testing 
1. **Open Browser**: `http://localhost:3000/admin/login`
2. **Test Navbar on Login Page**:
   - [x] Verify navbar is visible at the top
   - [X] Verify navbar has red background (`bg-red-600` in light mode, `bg-red-700` in dark mode)
   - [X] Verify "Admin Access Portal" heading is visible (on tablet+ screens)
   - [x] Verify "Secure Authentication Required" subtitle is visible (on tablet+ screens)
   - [x] Verify logo is visible and clickable (links to home)
   - [x] Verify theme toggle button works (switches between light/dark mode)
   - [x] Verify "Back to Site" button is visible and clickable
   - [x] Verify navbar text is readable (white text with proper contrast)
   - [x] Verify navbar is responsive (center title hidden on mobile)
3. **Test Valid Login**:
   - [x] Enter email from `ADMIN_EMAIL` environment variable (check `.env.local`)
   - [X] Enter password from `ADMIN_PASSWORD` environment variable (check `.env.local`)
   - [X] **Note**: Never use hardcoded credentials - always use environment variables
   - [X] Click "Sign In"
   - [X] Should redirect to `/admin/dashboard`
   - [X] Dashboard loads completely
4. **Test Invalid Login**:
   - [X] Enter wrong credentials (use `TEST_INVALID_EMAIL` and `TEST_INVALID_PASSWORD` from `.env.local`)
   - [X] Should show error message
   - [X] Error message is clear and helpful
5. **Test Form Validation**:
   - [X] Leave email empty → Submit
   - [X] Should show validation error
   - [X] Enter invalid email format
   - [X] Should show validation error
   - [X] Validation errors are clear and helpful
6. **Check Network Tab**: Verify API calls
   - [X] Login API call succeeds with valid credentials
   - [X] Login API call fails with invalid credentials
   - [X] Error responses are handled correctly
7. **Check Console**: No errors should appear
   - [X] No JavaScript errors
   - [X] No React warnings
   - [X] No console errors

#### Step 3: Compare Results
- [X] Automated: Tests pass for valid/invalid login
- [X] Manual: Same behavior observed
- [X] Both match → Feature is working

---


### Task 3: Admin Dashboard

**Why Second?** Verify the dashboard works correctly before adding content. The database is empty, so expect "0" counts in stats.

#### Step 1: Run Automated Tests
```bash
# Unit tests
- [X] npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx

# Integration tests
- [X] npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx

# E2E tests (watch it)
- [X] npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
```

**E2E Test Workflow for Admin Dashboard:**
Each E2E test in `admin-dashboard.spec.ts` follows this pattern:

1. **`beforeEach` Hook (Runs Before Each Test)**:
   - ✅ Navigates to `/admin/login`
   - ✅ Waits for login form to be ready
   - ✅ Fills email from `ADMIN_EMAIL` environment variable
   - ✅ Fills password from `ADMIN_PASSWORD` environment variable
   - ✅ Clicks "Sign In" button
   - ✅ Waits for redirect to `/admin/dashboard` (timeout: 30 seconds)
   - ✅ Waits for dashboard to fully load (`networkidle` state)
   - ✅ Verifies dashboard heading is visible

2. **Each Individual Test Then**:
   - ✅ Assumes user is already logged in and on dashboard
   - ✅ Performs specific test actions (checking menu items, navigation, theme toggle, etc.)
   - ✅ Verifies expected behavior

**Complete E2E Test Coverage:**
The `admin-dashboard.spec.ts` file includes the following tests:
1. ✅ `should load dashboard page` - Verifies dashboard URL and heading
2. ✅ `should display dashboard stats` - Verifies statistics cards are displayed
3. ✅ `should display admin menu items` - Tests Admin Menu dropdown with all items (Questions, Content Management, etc.)
4. ✅ `should have refresh button` - Verifies refresh button is visible and functional
5. ✅ `should navigate to questions page from menu` - Tests navigation from Admin Menu dropdown to Questions page
6. ✅ `should display theme toggle button in navbar` - Verifies theme toggle button visibility and attributes
7. ✅ `should display correct icon based on current theme` - Verifies Sun/Moon icon display based on theme state
8. ✅ `should switch between light and dark theme` - Tests full theme toggle cycle (light ↔ dark) with icon updates
9. ✅ `should persist theme preference after page reload` - Tests theme persistence in localStorage across page reloads

**Manual Testing Equivalent:**
When manually testing, follow the same pattern:
1. Start at `/admin/login` for each test scenario
2. Login with credentials from `.env.local`
3. Wait for dashboard to load completely
4. Perform the test action
5. Verify results

#### Step 2: Manual Testing

**Important**: Each E2E test starts from login, so manually test the same way:

**📋 Quick Summary - How to Test Dashboard Features:**

**To test something in the dashboard, you MUST:**
1. **First**: Go to login page (`/admin/login`)
2. **Second**: Write/enter correct credentials (`ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local`)
3. **Third**: Navigate to dashboard (click "Sign In" and wait for redirect)
4. **Fourth**: Now test what you need to test in the dashboard

**⚠️ Expected State: Empty Database**
- Stats cards should show **0** for Total Questions, Categories, Topics, etc.
- This is expected and correct - database is empty
- After adding questions in Task 1, these numbers will update

**Step-by-Step Process for Testing Dashboard Features:**

1. **Step 1: Go to Login Page** (`http://localhost:3000/admin/login`):
   - [X] Open browser and navigate to `/admin/login`
   - [X] Verify login page loads correctly
   - [X] Get credentials from `.env.local`:
     - [X] Email: Check `ADMIN_EMAIL` variable (or `INITIAL_ADMIN_EMAIL` / `TEST_ADMIN_EMAIL` as fallback)
     - [X] Password: Check `ADMIN_PASSWORD` variable (or `INITIAL_ADMIN_PASSWORD` / `TEST_ADMIN_PASSWORD` as fallback)
   - [X] **Note**: Never use hardcoded credentials - always use environment variables

2. **Step 2: Enter Correct Credentials and Login**:
   - [X] Fill in email field with value from `ADMIN_EMAIL` (from `.env.local`)
   - [X] Fill in password field with value from `ADMIN_PASSWORD` (from `.env.local`)
   - [X] Click "Sign In" button
   - [X] Wait for redirect to `/admin/dashboard` (should happen automatically)
   - [X] Wait for dashboard to fully load:
     - [X] Look for "Admin Dashboard" heading
     - [X] Wait for all menu cards to appear
     - [X] Wait for stats to load (may show "0" or "..." initially - this is correct for empty database)
     - [X] Check Network tab - all API calls should complete

3. **Step 3: Navigate to Dashboard** (automatic after login):
   - [X] Verify URL changed to `/admin/dashboard`
   - [X] Verify dashboard page is fully loaded
   - [X] All content is visible (no loading spinners)

4. **Step 4: Now Test What You Need in Dashboard**:


   **Example: Testing Stats Cards (Empty Database State)**:
   - [x] **Total Questions**: Should show **0** (database is empty - this is correct)
   - [x] **Learning Cards**: May show **0** or actual count if cards exist
   - [x] **Learning Plans**: May show **0** or actual count if plans exist
   - [x] **Topics**: Should show **0** or actual count if topics exist (separate stat card with Tag icon)
   - [x] **Categories**: Should show **0** or actual count if categories exist (NEW - separate stat card with Folder icon)
   - [x] **Total Tasks**: Should show **0** (no tasks yet - sum of frontend tasks + problem solving tasks)
   - [X] Verify all 6 stats cards are visible and styled correctly in a 3-column grid layout (2 rows):
     - [X] Total Questions card (blue, Database icon)
     - [X] Learning Cards card (green, BookOpen icon)
     - [X] Learning Plans card (purple, Target icon)
     - [X] Topics card (indigo, Tag icon)
     - [X] Categories card (pink, Folder icon) ⭐ NEW
     - [X] Total Tasks card (orange, Zap icon)
   - [X] Verify stats cards display correctly even with zero values
   - [X] Verify Topics card shows correct count from API
   - [X] Verify Categories card shows correct count from API
   - [X] Verify grid layout is responsive (1 column on mobile, 2 columns on tablet, 3 columns on desktop)
   - [ ] **Note**: After adding questions in Task 1, these numbers will update

   **Example: Testing Navbar**
   - [X] Verify navbar is visible at the top
   - [X] Verify navbar has red background (`bg-red-600` in light mode, `bg-red-700` in dark mode)
   - [X] Verify logo is visible and clickable (links to home)
   - [X] Verify "Admin Menu" button is visible (on desktop screens)
   - [X] Verify theme toggle button works (see Theme Testing section below)
   - [X] Verify user menu is visible (when authenticated)
   - [X] Click "Admin Menu" button → Verify dropdown appears
   - [X] Verify dropdown contains all menu items (Dashboard, Questions, Content Management, etc.)
   - [X] Click a menu item → Verify navigation works
   - [X] Test mobile menu (on mobile viewport) → Verify hamburger menu works
   - [X] Verify navbar text is readable in both light and dark modes
   - [X] Verify navbar is responsive (menu button hidden on mobile, visible on desktop)

   **Example: Testing Theme Toggle (Comprehensive)**
   - [X] **Theme Toggle Button Visibility**:
     - [X] Navigate to dashboard
     - [X] Find theme toggle button by aria-label "Toggle theme"
     - [X] Verify button is visible in navbar
     - [X] Verify button has correct title attribute ("Toggle theme" or "Switch to light/dark mode")
   
   - [X] **Theme Toggle Icon Display**:
     - [X] Check current theme state (inspect `<html>` element for `dark` class)
     - [X] If dark mode: Verify Sun icon is displayed (to switch to light)
     - [X] If light mode: Verify Moon icon is displayed (to switch to dark)
     - [X] Verify SVG icon is visible inside the button
   
   - [X] **Theme Switching Functionality**:
     - [X] Get initial theme state (check `dark` class on `<html>`)
     - [X] Click theme toggle button
     - [X] Wait for theme change (check `dark` class changes)
     - [X] Verify theme has changed (light ↔ dark)
     - [X] Verify icon has updated (Sun ↔ Moon)
     - [X] Click again to switch back
     - [X] Verify theme returns to original state
     - [X] Verify icon returns to original state
   
   - [X] **Theme Persistence**:
     - [X] Change theme (light → dark or dark → light)
     - [X] Reload the page (F5 or Cmd+R)
     - [X] Verify theme persisted after reload (check `dark` class on `<html>`)
     - [X] Verify theme toggle button still works after reload
     - [X] Toggle theme again and verify it changes
     - [X] Check localStorage: `localStorage.getItem('theme')` should match current theme
   
   - [X] **Theme Visual Verification**:
     - [X] In light mode: Verify light colors, white backgrounds
     - [X] In dark mode: Verify dark colors, dark backgrounds
     - [X] Verify text is readable in both modes
     - [X] Verify all UI elements adapt to theme
     - [X] Verify navbar colors change appropriately
     - [X] Verify dashboard cards adapt to theme

   **Example: Testing Dashboard Features**
   - [x] Dashboard loads completely
   - [x] Statistics display correctly (may show 0 for questions - this is expected)
   - [x] Menu cards are visible and clickable
   - [x] Quick actions work (Add New Question, Manage Learning Cards, etc.)
   - [x] Refresh button works (click and verify stats reload)
   - [x] All navigation links work correctly

5. **After Testing**:
   - [x] Check browser console for any errors
   - [x] Check Network tab for failed API calls
   - [x] Verify all expected functionality works
   - [x] **Note**: Stats showing 0 is correct - database is empty

**🔄 Quick Reference - Dashboard Testing Workflow:**
```
To test ANYTHING in the dashboard, follow these steps:

1. Go to login page: http://localhost:3000/admin/login
2. Enter correct credentials:
   - Email: Use ADMIN_EMAIL from .env.local
   - Password: Use ADMIN_PASSWORD from .env.local
3. Click "Sign In" and wait for redirect to dashboard
4. Wait for dashboard to fully load (all content visible)
5. NOW test what you need to test in the dashboard
6. Remember: Stats showing 0 is correct - database is empty
```

**Important Notes:**
- [x] Always start from login page for each test scenario
- [x] Never use hardcoded credentials - always use environment variables
- [x] Wait for dashboard to fully load before testing
- [x] **Stats showing 0 is expected** - database is empty
- [x] This matches how E2E tests work (beforeEach hook does steps 1-3 automatically)

---



### Task 1: Admin Bulk Question Addition ⭐ ADD QUESTIONS HERE

**Why Third?** After verifying login and dashboard work, now add questions to the empty database. This task will populate the database for other tests.

#### Step 1: Run Automated Tests
```bash
# Terminal 2: Unit tests
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx --watch

# Terminal 3: Integration tests
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx

# Terminal 4: E2E tests (split into focused test files for easier debugging)
# Option A: Run all split tests together
npm run test:e2e:admin:questions

# Option B: Run specific test suites (recommended for focused testing)
npm run test:e2e:admin:questions:basic        # Basic page loading tests
npm run test:e2e:admin:questions:crud         # CRUD operations (create, read, update, delete)
npm run test:e2e:admin:questions:search       # Search functionality
npm run test:e2e:admin:questions:pagination   # Pagination controls
npm run test:e2e:admin:questions:bulk         # Bulk upload and delete operations
npm run test:e2e:admin:questions:stats        # Stats cards display
npm run test:e2e:admin:questions:validation   # Form validation

# Option C: Run original monolithic file (kept for reference)
npm run test:e2e:headed -- tests/e2e/admin/admin-bulk-question-addition.spec.ts

# Note: To add slow motion, configure slowMo in playwright.config.ts
# Note: Split tests use shared setup from admin-questions-page.setup.ts
# See tests/e2e/admin/README-SPLIT-TESTS.md for details
```

#### Step 2: Manual Testing - COMPREHENSIVE CHECKLIST

**🔐 Pre-Testing Setup:**
1. **Verify Environment Variables**:
   - [X] Check `.env.local` file exists
   - [X] Verify `ADMIN_EMAIL` is set (or `INITIAL_ADMIN_EMAIL` / `TEST_ADMIN_EMAIL` as fallback)
   - [X] Verify `ADMIN_PASSWORD` is set (or `INITIAL_ADMIN_PASSWORD` / `TEST_ADMIN_PASSWORD` as fallback)
   - [X] **Never use hardcoded credentials** - always use environment variables

2. **Login Flow**:
   - [X] Open browser: `http://localhost:3000/admin/login`
   - [X] Enter email from `ADMIN_EMAIL` environment variable
   - [X] Enter password from `ADMIN_PASSWORD` environment variable
   - [X] Click "Sign In"
   - [X] Wait for redirect to `/admin/dashboard`
   - [X] Verify dashboard loads completely

**📊 Page Load & Initial State:**
1. **Navigate to Questions Page**:
   - [X] Navigate to `/admin/content/questions`
   - [X] Wait for page to fully load (check Network tab - all requests complete)
   - [X] Verify page title: "Question Management" is visible

2. **Verify Stats Cards Display (Empty Database State)**:
   - [X] **Total Questions Card**: Should show **0** initially (database is empty - this is correct)
   - [X] **Categories Card**: May show **0** or actual count if categories exist
   - [X] **Active Questions Card**: Should show **0** (no questions yet)
   - [X] **Filtered Results Card**: Should show **0** (no questions to display)
   - [X] Verify all stats cards are visible and styled correctly
   - [X] Verify stats cards handle zero values gracefully (no errors, proper display)
   - [X] **After adding questions**: Verify stats update correctly (Total Questions increases, etc.)

3. **Verify Empty State (Expected - Database is Empty)**:
   - [X] After page loads, verify "No questions found" or empty state message appears
   - [X] Empty state message is clear and helpful (e.g., "No questions yet. Click 'Add New Question' to get started.")
   - [X] "Add New Question" button is visible and clickable
   - [X] Empty state is styled correctly and not an error

4. **Verify Loading State**:
   - [X] If questions are loading, spinner should appear
   - [X] Loading message "Loading questions..." should be visible
   - [X] After loading, empty state or questions list should appear

5. **Verify Error State** (if applicable):
   - [X] If API fails, error message should display
   - [X] "Retry" button should be visible and functional
   - [X] Error message is clear and helpful
   - [X] **Note**: Empty state is NOT an error - it's expected when database is empty

**🔍 Search Functionality:**
1. **Basic Search**:
   - [X] Search input field is visible with placeholder "Search questions by title, content, tags..."
   - [X] Type a search term (e.g., "HTML")
   - [X] Verify results filter in real-time (or after Enter key)
   - [X] Verify filtered results count updates in stats card
   - [X] Clear search (delete text)
   - [X] Verify all questions reappear

2. **Search Edge Cases** (With Empty Database):
   - [X] Search for any term → Verify "No questions found" message (expected - database is empty)
   - [X] Search with special characters → Verify no errors
   - [X] Search with very long string → Verify no performance issues
   - [X] **After adding questions**: Test search is case-insensitive (test "html" vs "HTML")
   - [X] **After adding questions**: Test search filters questions correctly

**📝 Add Single Question (CRUD - Create) - COMPREHENSIVE TESTING:**

**⚠️ This is your FIRST question - Database is empty!**
- This will be the first question in the database
- After creating, stats should update from 0 to 1
- This question will be used for testing View, Edit, and Delete operations

1. **Open Create Modal**:
   - [X] Navigate to `/admin/content/questions`
   - [X] Verify page shows empty state (no questions yet)
   - [X] Click "Add New Question" button (with Plus icon)
   - [X] Verify modal opens and is centered on screen
   - [X] Verify modal title: "Create New Question" is visible
   - [X] Verify close button (X icon) is visible in top-right corner
   - [X] Verify modal has proper backdrop (blurred background)
   - [X] Click outside modal → Verify modal closes (if click-outside-to-close enabled)
   - [X] Click close button (X) → Verify modal closes
   - [X] Re-open modal for testing

2. **Fill Question Form - Basic Fields**:
   - [X] **Title Field**:
     - [X] Enter question title (e.g., "What is HTML?")
     - [X] Verify field accepts input
     - [X] Try leaving empty → Verify validation error (if required)
     - [X] Try very long title → Verify field handles it correctly
     - [X] Try special characters → Verify no errors
   
   - [X] **Type Selection**:
     - [X] Click "Type" dropdown
     - [X] Verify dropdown opens and shows options: "Multiple choice", "Open-ended", "True-false", "Code"
     - [X] Select "Multiple choice" → Verify selection saved
     - [X] Change to "Open-ended" → Verify selection updates
     - [X] Verify dropdown closes after selection
   
   - [X] **Category Selection**:
     - [X] Click "Category" dropdown
     - [X] Verify dropdown opens and shows all categories from database (e.g., "HTML", "CSS", "JavaScript", "React", etc.)
     - [X] Verify dropdown is scrollable if many categories
     - [X] Select a category (e.g., "HTML")
     - [X] Verify selection is saved and displayed
     - [X] Verify dropdown closes after selection
   
   - [X] **Topic Selection** (Dynamic - depends on category):
     - [X] **Before selecting category**: Verify "Topic" dropdown is disabled with placeholder "Select category first"
     - [X] **After selecting category**: 
       - [X] Verify "Topic" dropdown becomes enabled
       - [X] Click "Topic" dropdown
       - [X] Verify dropdown shows only topics for selected category
       - [X] Verify topics are filtered correctly (e.g., if "HTML" selected, only HTML topics shown)
       - [X] Select a topic (e.g., "Basics")
       - [X] Verify selection is saved
       - [X] Change category → Verify topic is cleared and new topics appear
       - [X] Verify dropdown closes after selection
   
   - [X] **Difficulty Selection**:
     - [X] Click "Difficulty" dropdown
     - [X] Verify options: "Beginner", "Intermediate", "Advanced"
     - [X] Select "Intermediate" → Verify selection works
     - [X] Verify dropdown closes after selection
   
   - [X] **Learning Card Selection**:
     - [X] Click "Learning Card" dropdown
     - [X] Verify dropdown shows available learning cards from database
     - [X] Select a card (optional) → Verify selection saved
     - [X] Verify dropdown closes after selection
   
   - [X] **Points Field**:
     - [X] Enter points value (e.g., "15")
     - [X] Verify field accepts numeric input
     - [X] Try negative number → Verify validation (if applicable)
     - [X] Try non-numeric input → Verify validation error

3. **Fill Question Form - Options Section** (For Multiple Choice Questions):
   - [X] **Add Options**:
     - [X] Verify "Options" section is visible
     - [X] Verify "Add Option" button is visible
     - [X] Click "Add Option" button
     - [X] Verify first option input field appears
     - [X] Verify checkbox labeled "Is Correct" appears next to input
     - [X] Click "Add Option" again → Verify second option appears
     - [X] Add 3-4 options total
   
   - [X] **Fill Option Text**:
     - [X] For each option, enter text in the input field
     - [X] Example: Option 1: "HyperText Markup Language"
     - [X] Example: Option 2: "High-level Text Machine Language"
     - [X] Example: Option 3: "Home Tool Markup Language"
     - [X] Example: Option 4: "Hyperlink and Text Markup Language"
     - [X] Verify all inputs accept text
     - [X] Try leaving option text empty → Verify validation (if applicable)
   
   - [X] **Mark Correct Answer(s)**:
     - [X] For multiple-choice: Check "Is Correct" checkbox for ONE option
     - [X] Verify checkbox toggles correctly
     - [X] Verify label "Is Correct" is visible and clickable
     - [X] For multiple-select: Check "Is Correct" for MULTIPLE options
     - [X] Verify multiple correct answers can be selected (if question type supports it)
     - [X] Uncheck a checkbox → Verify it unchecks correctly
   
   - [X] **Remove Options**:
     - [X] Find "Delete" button (Trash icon) for an option
     - [X] Click delete button
     - [X] Verify option is removed
     - [X] Verify remaining options renumber correctly
     - [X] Try deleting all options → Verify "No options added" message appears
   
   - [X] **Options Validation**:
     - [X] Try submitting with no options → Verify validation error (if required for multiple-choice)
     - [X] Try submitting with no correct answer selected → Verify validation error
     - [X] Try submitting with all options empty → Verify validation error

4. **Fill Question Form - Explanation Section**:
   - [X] **Explanation Textarea**:
     - [X] Find "Explanation" textarea field
     - [X] Enter explanation text (e.g., "HTML stands for HyperText Markup Language...")
     - [X] Verify textarea accepts multi-line text
     - [X] Verify textarea is resizable (if enabled)
     - [X] Try leaving empty → Verify it's optional (no error)
     - [X] Try very long explanation → Verify field handles it

5. **Fill Question Form - Additional Fields**:
   - [X] **Is Active Checkbox**:
     - [X] Verify "Is Active" checkbox is visible
     - [X] Verify checkbox is checked by default
     - [X] Uncheck checkbox → Verify it unchecks
     - [X] Re-check checkbox → Verify it checks

6. **Submit Single Question**:
   - [X] **Before Submission**:
     - [X] Review all filled fields
     - [X] Verify all required fields are filled
     - [X] Verify at least one option has "Is Correct" checked (if multiple-choice)
   
   - [X] **Submit Process**:
     - [X] Click "Create Question" button
     - [X] Verify button shows loading state (if applicable)
     - [X] Verify form is disabled during submission
     - [X] Wait for API call to complete
   
   - [X] **Success Verification** (First Question in Database):
     - [X] Verify success message appears: "Question created successfully"
     - [X] Verify modal closes automatically
     - [X] Verify page reloads (or question appears in list without reload)
     - [X] Verify empty state disappears (if it was showing)
     - [X] Verify new question appears in the questions list
     - [X] Verify question displays with correct:
       - [X] Title
       - [X] Category badge
       - [X] Topic badge (if selected)
       - [X] Difficulty badge
       - [X] Type badge
     - [X] Verify stats cards update (Important - First Question):
       - [X] "Total Questions" count changes from **0 to 1** ✅
       - [X] "Active Questions" count changes from **0 to 1** ✅
       - [X] "Filtered Results" count updates to **1** ✅
     - [X] Click on the new question → Verify all details are correct
     - [X] **Note**: This is the first question - database is no longer empty!
   
   - [X] **Database Verification** (Optional - check via API or database):
     - [X] Verify question is saved in database
     - [X] Verify all fields are saved correctly
     - [X] Verify options are saved with correct `isCorrect` values
     - [X] Verify explanation is saved
     - [X] Verify category and topic relationships are correct

7. **Form Validation - Comprehensive Testing**:
   - [X] **Empty Form Submission**:
     - [X] Open create modal
     - [X] Leave all fields empty
     - [X] Click "Create Question"
     - [X] Verify validation errors appear for required fields
     - [X] Verify error messages are clear and helpful
   
   - [X] **Partial Form Submission**:
     - [X] Fill only title → Submit → Verify content/options required error
     - [X] Fill title and type → Submit → Verify category required error
     - [X] Fill all except options (for multiple-choice) → Submit → Verify options required
     - [X] Fill all except marking correct answer → Submit → Verify "select correct answer" error
   
   - [X] **Invalid Data Submission**:
     - [X] Try submitting with invalid category (if possible)
     - [X] Try submitting with invalid topic (if possible)
     - [X] Try submitting with invalid type
     - [X] Verify appropriate error messages for each case
   
   - [X] **Field-Specific Validation**:
     - [X] Title: Test max length (if limit exists)
     - [X] Points: Test negative numbers, decimals, very large numbers
     - [X] Options: Test minimum/maximum number of options (if limits exist)
     - [X] Explanation: Test max length (if limit exists)

8. **Modal Behavior Testing**:
   - [X] **Modal Interactions**:
     - [X] Open modal → Fill some fields → Click close (X) → Verify confirmation or data loss warning (if implemented)
     - [X] Open modal → Fill some fields → Click "Cancel" button → Verify modal closes
     - [X] Open modal → Fill all fields → Submit successfully → Verify modal closes
     - [X] Open modal → Submit with errors → Verify modal stays open
   
   - [X] **Modal Responsiveness**:
     - [X] Test modal on desktop viewport → Verify proper sizing
     - [X] Test modal on tablet viewport → Verify layout adapts
     - [X] Test modal on mobile viewport → Verify scrollable and usable
     - [X] Test modal with long content → Verify scrollable

9. **Dropdown Functionality Testing**:
   - [X] **Category Dropdown**:
     - [X] Verify dropdown opens when clicked
     - [X] Verify all categories from API are displayed
     - [X] Verify dropdown is searchable (if search enabled)
     - [X] Verify dropdown closes when clicking outside
     - [X] Verify dropdown closes after selection
     - [X] Test with many categories → Verify scrolling works
   
   - [X] **Topic Dropdown** (Dynamic):
     - [X] Select "HTML" category → Verify HTML topics appear
     - [X] Select "CSS" category → Verify CSS topics appear (HTML topics hidden)
     - [X] Change category → Verify topic is cleared
     - [X] Verify "No topics available" message if category has no topics
     - [X] Verify dropdown is disabled when no category selected
   
   - [X] **Type Dropdown**:
     - [X] Verify all question types are listed
     - [X] Verify selection works correctly
     - [X] Change type → Verify form adapts (if different types show different fields)
   
   - [X] **Learning Card Dropdown**:
     - [X] Verify all learning cards from API are displayed
     - [X] Verify selection works
     - [X] Verify optional selection (can be left empty)

10. **Options Management Testing**:
    - [X] **Add Multiple Options**:
      - [X] Add 2 options → Verify both appear
      - [X] Add 5 options → Verify all appear
      - [X] Add 10+ options → Verify scrolling works (if many options)
      - [X] Verify "Add Option" button always visible
    
    - [X] **Edit Options**:
      - [X] Add option → Enter text → Verify text saved
      - [X] Edit option text → Verify text updates
      - [X] Check "Is Correct" → Uncheck → Verify state changes
      - [X] Verify each option is independent
    
    - [X] **Delete Options**:
      - [X] Add 3 options → Delete middle one → Verify correct option deleted
      - [X] Delete all options → Verify "No options added" message
      - [X] Verify delete button is visible for each option
    
    - [X] **Options Validation**:
      - [X] Add option with empty text → Try submit → Verify validation
      - [X] Add options but don't mark any as correct → Try submit → Verify error
      - [X] Mark multiple as correct for multiple-choice → Verify behavior (should allow or show error)

**👁️ View Question (CRUD - Read):**
**⚠️ Note**: You need at least one question in the database to test this. If you just created your first question above, you can test this now.

1. **Open View Modal**:
   - [X] Find a question in the list (should have at least one question now)
   - [X] Click "View" button (Eye icon)
   - [X] Verify modal opens

2. **Verify Question Details Display**:
   - [X] **Title**: Question title is displayed correctly
   - [X] **Content**: Full question content is visible
   - [X] **Answer**: Answer/explanation is displayed (or "No answer provided" if empty)
   - [X] **Badges**: Category, difficulty, type badges are displayed
   - [X] **Metadata**: All question metadata is visible

3. **Close Modal**:
   - [X] Click "Close" button
   - [X] Verify modal closes
   - [X] Verify page state unchanged

**✏️ Edit Question (CRUD - Update):**
1. **Open Edit Modal**:
   - [X] Find a question in the list
   - [X] Click "Edit" button (Edit icon)
   - [X] Verify modal opens
   - [X] Verify modal title: "Edit Question"

2. **Verify Form Pre-filled**:
   - [X] Title field contains existing title
   - [X] Content field contains existing content
   - [X] Answer field contains existing answer
   - [X] Category dropdown shows current category
   - [X] Difficulty dropdown shows current difficulty
   - [X] All fields are pre-populated correctly

3. **Modify Question**:
   - [X] Change title to new value
   - [X] Change content to new value
   - [X] Change category to different category
   - [X] Change difficulty level
   - [X] Modify other fields as needed

4. **Save Changes**:
   - [X] Click "Save Changes" button
   - [X] Verify loading state (if applicable)
   - [X] Verify success message: "Question updated successfully"
   - [X] Verify modal closes
   - [X] Verify page reloads (or question updates in list)
   - [X] Verify updated question appears in list with new values
   - [X] Verify changes persist after page reload

**🗑️ Delete Question (CRUD - Delete):**
1. **Delete Single Question**:
   - [X] Find a question in the list
   - [X] Click "Delete" button (Trash icon)
   - [X] Verify confirmation dialog appears: "Are you sure you want to delete this question?"
   - [X] Click "Cancel" → Verify question NOT deleted
   - [X] Click "Delete" again → Click "OK" in confirmation
   - [X] Verify success message: "Question deleted successfully"
   - [X] Verify page reloads (or question disappears from list)
   - [X] Verify question no longer appears in list
   - [X] Verify stats cards update (Total Questions count decreases)

2. **Delete Edge Cases**:
   - [X] Try deleting last question → Verify appropriate handling
   - [X] Try deleting question that's in use → Verify appropriate error (if applicable)

**📄 Pagination:**
**⚠️ Note**: Pagination only appears when there are more questions than the page size. With an empty database or few questions, pagination may not appear.

1. **Pagination Controls** (After Adding Multiple Questions):
   - [ ] **With 0-10 questions**: Pagination may not appear (this is correct)
   - [ ] **With 11+ questions**: Pagination should appear
   - [ ] Verify "Showing X to Y of Z questions" text is correct
   - [ ] Verify "Page X of Y" indicator is visible

2. **Page Size Selection**:
   - [ ] Find "Show:" dropdown
   - [ ] Verify options: 5, 10, 20, 50, 100
   - [ ] Select "20" → Verify 20 questions per page
   - [ ] Select "50" → Verify 50 questions per page
   - [ ] Verify page count updates correctly

3. **Navigation**:
   - [ ] Click "Previous" button (←) → Verify goes to previous page
   - [ ] Verify "Previous" button disabled on page 1
   - [ ] Click "Next" button (→) → Verify goes to next page
   - [ ] Verify "Next" button disabled on last page
   - [ ] Navigate to middle page → Verify correct questions displayed
   - [ ] Verify URL updates (if applicable)

4. **Pagination Edge Cases**:
   - [ ] **With 0 questions**: Verify "No questions found" message (expected - database is empty)
   - [ ] **After adding questions**: Test with exactly 10 questions → Verify pagination appears correctly
   - [ ] **After adding questions**: Test pagination after creating new question → Verify correct page
   - [ ] **After adding questions**: Test pagination after deleting question → Verify correct page

**🏷️ Question Display & Badges:**
1. **Question List Items**:
   - [ ] Each question displays:
     - [ ] Title (large, bold)
     - [ ] Content preview (truncated with "line-clamp-2")
     - [ ] Action buttons (View, Edit, Delete)

2. **Badges Display**:
   - [ ] **Topic Badges**: Display topic names with "⭐" for primary topic
   - [ ] **Category Badges**: Display category names with "⭐" for primary category
   - [ ] **Card Badge**: Display learning card title (if associated)
   - [ ] **Difficulty Badge**: Display difficulty level (beginner/intermediate/advanced)
   - [ ] **Type Badge**: Display question type
   - [ ] Verify "No Topic" badge if no topic assigned
   - [ ] Verify "No Category" badge if no category assigned
   - [ ] Verify "No Card" badge if no card assigned

3. **Visual States**:
   - [ ] Hover over question item → Verify background color changes
   - [ ] Verify badges have correct colors:
     - [ ] Primary topic: Purple background
     - [ ] Primary category: Green background
     - [ ] Card: Blue background
     - [ ] Difficulty: Color-coded (beginner=default, intermediate=outline, advanced=destructive)

**🌓 Theme Testing:**
1. **Light/Dark Mode**:
   - [ ] Toggle theme using navbar theme toggle
   - [ ] Verify all elements adapt to theme:
     - [ ] Background colors change
     - [ ] Text colors change
     - [ ] Cards adapt to theme
     - [ ] Badges adapt to theme
     - [ ] Modals adapt to theme
   - [ ] Verify theme persists after page reload

**📡 Network & API Testing:**
1. **API Calls Verification** (Check Network Tab):
   - [ ] **GET `/api/questions/unified?page=X&pageSize=Y`**: Called on page load
     - [ ] Verify request succeeds (200 status)
     - [ ] Verify response contains `data` array
     - [ ] Verify response contains `pagination` object with `totalCount`
   - [ ] **GET `/api/cards`**: Called to fetch learning cards
     - [ ] Verify request succeeds
   - [ ] **POST `/api/questions/unified`**: Called when creating question
     - [ ] Verify request body contains question data
     - [ ] Verify response is successful
   - [ ] **PUT `/api/questions/unified/{id}`**: Called when updating question
     - [ ] Verify request body contains updated data
     - [ ] Verify response is successful
   - [ ] **DELETE `/api/questions/unified/{id}`**: Called when deleting question
     - [ ] Verify request succeeds
     - [ ] Verify question is removed from database

2. **Error Handling**:
   - [ ] Simulate network error (disable network in DevTools)
   - [ ] Try to create question → Verify error message displays
   - [ ] Try to update question → Verify error message displays
   - [ ] Try to delete question → Verify error message displays
   - [ ] Re-enable network → Verify operations work again

**🔍 Console & Error Checking:**
1. **Browser Console**:
   - [ ] Open DevTools Console tab
   - [ ] Verify no JavaScript errors (red text)
   - [ ] Verify no React warnings (yellow text)
   - [ ] Check for helpful console logs (if any)
   - [ ] Verify no 404 errors for assets

2. **Application Tab**:
   - [ ] Check localStorage (if theme preference stored)
   - [ ] Check sessionStorage (if any session data)
   - [ ] Verify no unexpected data stored

**📦 Bulk Upload Questions - COMPREHENSIVE TESTING:**

**⚠️ Recommended: Test Single Question First**
- It's recommended to test single question addition first (above)
- Then test bulk upload to add multiple questions at once
- Bulk upload is great for populating the database quickly

1. **Open Bulk Upload Modal**:
   - [ ] Navigate to `/admin/content/questions`
   - [ ] Look for "Bulk Upload" button (with Upload icon)
   - [ ] Click "Bulk Upload" button
   - [ ] Verify modal opens and is centered
   - [ ] Verify modal title: "Bulk Upload Questions"
   - [ ] Verify modal description explains CSV/JSON format
   - [ ] Verify close button (X icon) is visible
   - [ ] Verify modal has proper backdrop

2. **Bulk Upload Interface**:
   - [ ] **File Upload Area**:
     - [ ] Verify drag-and-drop area is visible
     - [ ] Verify "Click to select" or "Browse" button is visible
     - [ ] Verify file format requirements are displayed (CSV or JSON)
     - [ ] Verify file size limits are mentioned (if applicable)
   
   - [ ] **File Format Information**:
     - [ ] Verify instructions for CSV format are shown
     - [ ] Verify instructions for JSON format are shown
     - [ ] Verify example structure is provided (if available)
     - [ ] Verify required fields are listed

3. **Bulk Upload - JSON File Testing**:
   - [ ] **Prepare Valid JSON File**:
     - [ ] Create JSON file with array of questions
     - [ ] Include all required fields: `title`, `type`, `category`, `difficulty`
     - [ ] Include optional fields: `topic`, `explanation`, `options`, `points`, `hints`
     - [ ] Use structure matching `html-questions.json` format:
       ```json
       [
         {
           "title": "Question title",
           "type": "multiple-choice",
           "category": "HTML",
           "topic": "Basics",
           "difficulty": "intermediate",
           "options": [
             {
               "id": "o1",
               "text": "Option 1 text",
               "isCorrect": true
             }
           ],
           "explanation": "Explanation text",
           "points": 15
         }
       ]
       ```
   
   - [ ] **Upload Valid JSON File**:
     - [ ] Click "Browse" or drag JSON file to upload area
     - [ ] Verify file is selected and filename is displayed
     - [ ] Verify file icon appears next to filename
     - [ ] Click "Upload Questions" button
     - [ ] Verify loading state appears ("Uploading...")
     - [ ] Wait for upload to complete
   
   - [ ] **JSON Upload Success Verification**:
     - [ ] Verify success message appears (e.g., "Successfully imported X question(s)")
     - [ ] Verify modal shows summary:
       - [ ] Total questions processed
       - [ ] Successfully imported count
       - [ ] Failed count (if any)
     - [ ] Verify modal can be closed
     - [ ] Verify questions appear in the list
     - [ ] Verify stats cards update (Important):
       - [ ] **Total Questions** count increases by the number imported
       - [ ] If database was empty (0 questions), count should match imported count
       - [ ] If database had questions, count should increase correctly
     - [ ] Verify all imported questions have correct:
       - [ ] Titles
       - [ ] Categories
       - [ ] Topics (if provided)
       - [ ] Options with correct `isCorrect` values
       - [ ] Explanations (if provided)
   
   - [ ] **JSON Upload Preview** (if implemented):
     - [ ] After selecting file, verify preview shows first 3 questions
     - [ ] Verify preview displays:
       - [ ] Question title
       - [ ] Category badge
       - [ ] Topic badge
       - [ ] Options with checkboxes showing `isCorrect`
       - [ ] Explanation (if provided)
     - [ ] Verify preview is scrollable if many questions
     - [ ] Verify "Upload Questions" button is enabled after preview

4. **Bulk Upload - CSV File Testing**:
   - [ ] **Prepare Valid CSV File**:
     - [ ] Create CSV file with header row
     - [ ] Include columns: `title`, `type`, `category`, `difficulty`, `topic`, `explanation`, `options`
     - [ ] Add multiple question rows
     - [ ] Ensure proper CSV formatting (commas, quotes for text with commas)
   
   - [ ] **Upload Valid CSV File**:
     - [ ] Select CSV file
     - [ ] Verify file is recognized
     - [ ] Click "Upload Questions"
     - [ ] Verify file parsing
     - [ ] Verify questions imported successfully
   
   - [ ] **CSV Upload Verification**:
     - [ ] Verify success message
     - [ ] Verify questions appear in list
     - [ ] Verify all CSV data mapped correctly to question fields

5. **Bulk Upload - Error Handling & Validation**:
   - [ ] **Invalid File Format**:
     - [ ] Try uploading `.txt` file → Verify error: "Invalid file type. Please upload CSV or JSON file."
     - [ ] Try uploading `.pdf` file → Verify error message
     - [ ] Try uploading `.xlsx` file → Verify error message (unless supported)
     - [ ] Verify error message is clear and helpful
   
   - [ ] **Empty File**:
     - [ ] Create empty JSON file `[]` or empty CSV file
     - [ ] Upload empty file
     - [ ] Verify error: "No questions found in file."
   
   - [ ] **Invalid JSON Structure**:
     - [ ] Create JSON file with invalid syntax (missing brackets, commas)
     - [ ] Upload file → Verify parsing error message
     - [ ] Create JSON file that's not an array → Verify error
     - [ ] Create JSON file with wrong structure → Verify error
   
   - [ ] **Missing Required Fields**:
     - [ ] Create JSON with question missing `title` → Upload → Verify validation error
     - [ ] Create JSON with question missing `type` → Upload → Verify validation error
     - [ ] Create JSON with question missing `category` → Upload → Verify validation error
     - [ ] Create JSON with question missing `difficulty` → Upload → Verify validation error
     - [ ] Verify error messages specify which fields are missing
   
   - [ ] **Invalid Field Values**:
     - [ ] Create JSON with invalid `type` (e.g., "invalid-type") → Verify error
     - [ ] Create JSON with invalid `difficulty` (e.g., "expert") → Verify error
     - [ ] Create JSON with invalid `category` (non-existent category) → Verify error
     - [ ] Create JSON with invalid `topic` (topic not in selected category) → Verify error
   
   - [ ] **Options Validation**:
     - [ ] Create JSON with multiple-choice question but no `options` → Verify error
     - [ ] Create JSON with options but no `isCorrect: true` → Verify error
     - [ ] Create JSON with empty option text → Verify error
     - [ ] Create JSON with invalid option structure → Verify error

6. **Bulk Upload - Partial Success Handling**:
   - [ ] **Mixed Valid/Invalid Questions**:
     - [ ] Create JSON file with 10 questions:
       - [ ] 5 valid questions
       - [ ] 3 questions with missing required fields
       - [ ] 2 questions with invalid data
     - [ ] Upload file
     - [ ] Verify success message shows: "Successfully imported 5 question(s). 5 failed."
     - [ ] Verify error details are shown (which questions failed and why)
     - [ ] Verify only valid questions appear in list
     - [ ] Verify failed questions are NOT added to database
   
   - [ ] **Error Details Display**:
     - [ ] Verify error message lists failed questions
     - [ ] Verify error message explains why each failed
     - [ ] Verify error message is scrollable if many errors
     - [ ] Verify "Show more" or expandable error section (if implemented)

7. **Bulk Upload - Large File Testing**:
   - [ ] **Large JSON File**:
     - [ ] Create JSON file with 100+ questions
     - [ ] Upload file
     - [ ] Verify upload progress indicator (if implemented)
     - [ ] Verify all questions are processed
     - [ ] Verify performance is acceptable (no timeout)
     - [ ] Verify success message shows correct count
   
   - [ ] **Very Large File**:
     - [ ] Test with 500+ questions (if applicable)
     - [ ] Verify system handles large uploads
     - [ ] Verify no memory issues
     - [ ] Verify timeout handling (if file too large)

8. **Bulk Upload - Data Mapping Verification**:
   - [ ] **Field Mapping**:
     - [ ] Upload JSON with all fields
     - [ ] Verify each field maps correctly:
       - [ ] `title` → Question title
       - [ ] `type` → Question type
       - [ ] `category` → Category (matches database category name)
       - [ ] `topic` → Topic (matches database topic name for selected category)
       - [ ] `difficulty` → Difficulty level
       - [ ] `options` → Question options with `isCorrect` values
       - [ ] `explanation` → Question explanation
       - [ ] `points` → Question points
       - [ ] `hints` → Question hints (if supported)
       - [ ] `tags` → Question tags (if supported)
   
   - [ ] **CamelCase to snake_case Conversion**:
     - [ ] Upload JSON with camelCase fields (e.g., `isActive`, `learningCardId`)
     - [ ] Verify fields are converted to snake_case (e.g., `is_active`, `learning_card_id`)
     - [ ] Verify data is saved correctly in database
   
   - [ ] **Category/Topic Matching**:
     - [ ] Upload JSON with category "HTML" → Verify matches database category
     - [ ] Upload JSON with topic "Basics" under "HTML" → Verify matches database topic
     - [ ] Upload JSON with topic that doesn't exist → Verify error or graceful handling
     - [ ] Upload JSON with topic from wrong category → Verify error

9. **Bulk Upload - Network & API Testing**:
   - [ ] **API Call Verification** (Check Network Tab):
     - [ ] Upload file → Verify POST request to bulk import endpoint
     - [ ] Verify request includes file data
     - [ ] Verify request has correct Content-Type header
     - [ ] Verify response contains success/error information
     - [ ] Verify response includes counts (successful, failed)
   
   - [ ] **Error Handling**:
     - [ ] Simulate network error (disable network in DevTools)
     - [ ] Try to upload file → Verify error message displays
     - [ ] Verify error message is user-friendly
     - [ ] Re-enable network → Verify upload works again
   
   - [ ] **API Error Responses**:
     - [ ] Simulate 500 server error → Verify error message
     - [ ] Simulate 400 bad request → Verify validation error message
     - [ ] Simulate 413 payload too large → Verify file size error

10. **Bulk Upload - UI/UX Testing**:
    - [ ] **Loading States**:
      - [ ] During upload → Verify loading spinner/indicator
      - [ ] During upload → Verify "Uploading..." text
      - [ ] During upload → Verify upload button is disabled
      - [ ] During upload → Verify cancel button (if exists) is available
    
    - [ ] **Success States**:
      - [ ] After successful upload → Verify success message is prominent
      - [ ] After successful upload → Verify summary is displayed
      - [ ] After successful upload → Verify "Close" or "Done" button is available
      - [ ] After successful upload → Verify modal can be closed
    
    - [ ] **Error States**:
      - [ ] After failed upload → Verify error message is visible
      - [ ] After failed upload → Verify error details are shown
      - [ ] After failed upload → Verify "Try Again" or "Close" button is available
      - [ ] After failed upload → Verify user can select new file
    
    - [ ] **File Selection**:
      - [ ] Click "Browse" → Verify file picker opens
      - [ ] Select file → Verify filename appears
      - [ ] Change file selection → Verify new filename replaces old
      - [ ] Drag and drop file → Verify file is accepted
      - [ ] Drag and drop invalid file type → Verify error

11. **Bulk Upload - Comparison with Single Question**:
    - [ ] **Data Consistency**:
      - [ ] Create question via single form
      - [ ] Create same question via bulk upload
      - [ ] Verify both questions have identical data structure
      - [ ] Verify both questions appear identically in list
    
    - [ ] **Validation Consistency**:
      - [ ] Verify bulk upload uses same validation rules as single form
      - [ ] Verify error messages are consistent
      - [ ] Verify required fields are the same

12. **Bulk Upload - Edge Cases**:
    - [ ] **Duplicate Questions**:
      - [ ] Upload JSON with duplicate questions (same title)
      - [ ] Verify behavior (allowed, rejected, or deduplicated)
    
    - [ ] **Special Characters**:
      - [ ] Upload JSON with special characters in title/content
      - [ ] Verify special characters are handled correctly
      - [ ] Verify no encoding issues
    
    - [ ] **Unicode/Emoji**:
      - [ ] Upload JSON with emoji in title/content
      - [ ] Verify emoji are displayed correctly
    
    - [ ] **Very Long Text**:
      - [ ] Upload JSON with very long title (1000+ characters)
      - [ ] Upload JSON with very long explanation
      - [ ] Verify system handles long text correctly

13. **Bulk Upload - Final Verification**:
   - [ ] **After Successful Upload**:
     - [ ] Verify all imported questions are visible in list
     - [ ] Verify questions can be viewed (click View button)
     - [ ] **Note**: After successfully uploading questions, proceed to test bulk deletion below

**🗑️ Bulk Delete Questions - COMPREHENSIVE TESTING:**
**⚠️ Prerequisite**: You need at least 2-3 questions in the database to test bulk deletion. If you just uploaded questions via bulk upload, you can test this now.

1. **Bulk Selection Interface**:
   - [ ] **Checkboxes Visibility**:
     - [ ] Navigate to `/admin/content/questions`
     - [ ] Verify each question has a checkbox on the left side
     - [ ] Verify "Select all" checkbox is visible in the header (if questions exist)
     - [ ] Verify checkboxes are properly aligned and visible
   
   - [ ] **Selection States**:
     - [ ] Click a single checkbox → Verify question is highlighted/selected
     - [ ] Click "Select all" checkbox → Verify all visible questions are selected
     - [ ] Click "Select all" again → Verify all questions are deselected
     - [ ] Select 2 questions → Verify both are highlighted
     - [ ] Verify selected count is displayed (e.g., "2 selected")

2. **Delete Selected Button**:
   - [ ] **Button Visibility**:
     - [ ] Initially (no selection) → Verify "Delete Selected" button is NOT visible
     - [ ] Select 1 question → Verify "Delete Selected (1)" button appears
     - [ ] Select 2 questions → Verify "Delete Selected (2)" button appears
     - [ ] Select all questions → Verify "Delete Selected (X)" button shows correct count
     - [ ] Deselect all → Verify "Delete Selected" button disappears
   
   - [ ] **Button Styling**:
     - [ ] Verify button has red/destructive styling
     - [ ] Verify button has trash icon
     - [ ] Verify button is responsive (shows count on desktop, abbreviated on mobile)

3. **Bulk Delete Confirmation Modal**:
   - [ ] **Open Confirmation Modal**:
     - [ ] Select 2-3 questions
     - [ ] Click "Delete Selected" button
     - [ ] Verify confirmation modal opens
     - [ ] Verify modal title: "Delete Selected Questions"
     - [ ] Verify warning icon is displayed
     - [ ] Verify modal has proper backdrop
   
   - [ ] **Modal Content**:
     - [ ] Verify warning message: "Are you sure you want to delete X question(s)?"
     - [ ] Verify "This action cannot be undone" message
     - [ ] Verify preview of selected questions (up to 10 questions shown)
     - [ ] Verify question titles are displayed in preview
     - [ ] Verify question types and difficulty badges in preview
     - [ ] If more than 10 selected → Verify "... and X more questions" message
   
   - [ ] **Modal Actions**:
     - [ ] Verify "Cancel" button is visible
     - [ ] Verify "Delete X Question(s)" button is visible
     - [ ] Click "Cancel" → Verify modal closes, questions remain selected
     - [ ] Click outside modal → Verify modal closes (if implemented)
     - [ ] Press Escape key → Verify modal closes (if implemented)

4. **Bulk Delete Execution**:
   - [ ] **Single Question Deletion**:
     - [ ] Select 1 question
     - [ ] Click "Delete Selected"
     - [ ] Confirm deletion in modal
     - [ ] Verify loading state ("Deleting..." with spinner)
     - [ ] Wait for deletion to complete
     - [ ] Verify question is removed from list
     - [ ] Verify success toast notification appears
     - [ ] Verify page does NOT reload (dynamic update)
   
   - [ ] **Multiple Questions Deletion**:
     - [ ] Select 3-5 questions
     - [ ] Click "Delete Selected"
     - [ ] Confirm deletion in modal
     - [ ] Verify loading state
     - [ ] Wait for all deletions to complete
     - [ ] Verify all selected questions are removed from list
     - [ ] Verify success toast notification shows correct count
     - [ ] Verify page does NOT reload (dynamic update)
   
   - [ ] **Select All Deletion**:
     - [ ] Click "Select all" checkbox
     - [ ] Verify all visible questions are selected
     - [ ] Click "Delete Selected"
     - [ ] Confirm deletion in modal
     - [ ] Verify all questions are deleted
     - [ ] Verify "No questions found" message appears (if all deleted)
     - [ ] Verify page does NOT reload

5. **Bulk Delete - Partial Failure Handling**:
   - [ ] **Mixed Success/Failure** (if possible to simulate):
     - [ ] Select 3 questions
     - [ ] Attempt deletion (one might fail if already deleted)
     - [ ] Verify successful deletions are removed from list
     - [ ] Verify error toast notification for failed deletions
     - [ ] Verify error message shows which questions failed
     - [ ] Verify remaining questions are still visible

6. **Bulk Delete - Edge Cases**:
   - [ ] **Empty Selection**:
     - [ ] Try to click "Delete Selected" when nothing selected → Verify button is not visible
   
   - [ ] **Single Page Selection**:
     - [ ] Select all questions on current page
     - [ ] Delete them
     - [ ] Verify pagination updates correctly
     - [ ] Verify next page loads (if exists)
   
   - [ ] **Cross-Page Selection** (if implemented):
     - [ ] Select questions on page 1
     - [ ] Navigate to page 2
     - [ ] Verify selection is cleared (expected behavior)
     - [ ] Select questions on page 2
     - [ ] Delete them
     - [ ] Verify correct questions are deleted

7. **Bulk Delete - UI/UX Testing**:
   - [ ] **Visual Feedback**:
     - [ ] Verify selected questions have highlighted background
     - [ ] Verify selected questions have blue border (if implemented)
     - [ ] Verify selection count updates in real-time
     - [ ] Verify "Delete Selected" button count updates dynamically
   
   - [ ] **Loading States**:
     - [ ] During deletion → Verify "Deleting..." text
     - [ ] During deletion → Verify spinner/loading indicator
     - [ ] During deletion → Verify buttons are disabled
     - [ ] After deletion → Verify loading state clears
   
   - [ ] **Responsive Design**:
     - [ ] Test on desktop → Verify full "Delete Selected (X)" text
     - [ ] Test on tablet → Verify layout adapts
     - [ ] Test on mobile → Verify abbreviated text (e.g., "Delete (X)")
     - [ ] Verify checkboxes are touch-friendly on mobile

8. **Bulk Delete - Data Integrity**:
   - [ ] **After Deletion**:
     - [ ] Verify deleted questions are removed from database
     - [ ] Verify remaining questions are still accessible
     - [ ] Verify question count in stats updates correctly
     - [ ] Verify pagination recalculates correctly
     - [ ] Verify search still works on remaining questions
   
   - [ ] **Refresh Behavior**:
     - [ ] Delete questions
     - [ ] Refresh page manually (F5)
     - [ ] Verify deleted questions are still gone
     - [ ] Verify list loads correctly

9. **Bulk Delete - Comparison with Single Delete**:
   - [ ] **Consistency**:
     - [ ] Delete 1 question via bulk delete
     - [ ] Delete 1 question via single delete button
     - [ ] Verify both use same confirmation modal (or similar UX)
     - [ ] Verify both show same success notifications
     - [ ] Verify both update list without page reload

10. **Bulk Delete - Network & API Testing**:
    - [ ] **API Call Verification** (Check Network Tab):
      - [ ] Select 3 questions
      - [ ] Delete them
      - [ ] Verify 3 DELETE requests are sent (one per question)
      - [ ] Verify requests go to `/api/questions/unified/{id}`
      - [ ] Verify requests are sent in parallel (Promise.allSettled)
      - [ ] Verify refresh request is sent after deletion
   
    - [ ] **Error Handling**:
      - [ ] Simulate network error (disable network)
      - [ ] Attempt bulk delete
      - [ ] Verify error toast notification appears
      - [ ] Verify questions remain in list
      - [ ] Verify error message is user-friendly

11. **Bulk Delete - Final Verification**:
    - [ ] **Complete Workflow**:
      - [ ] Upload questions via bulk upload (if needed)
      - [ ] Select multiple questions
      - [ ] Delete them via bulk delete
      - [ ] Verify all operations complete successfully
      - [ ] Verify database state is correct
      - [ ] Verify UI state is correct
      - [ ] Verify no page reloads occurred
      - [ ] Verify questions can be edited (click Edit button)
      - [ ] Verify questions can be deleted (click Delete button)
      - [ ] Verify stats cards show correct total count
      - [ ] Verify search finds imported questions
      - [ ] Verify pagination works with new questions
    
    - [ ] **Database Verification** (Optional):
      - [ ] Check database directly → Verify all questions saved
      - [ ] Verify all fields are stored correctly
      - [ ] Verify relationships (category, topic) are correct
      - [ ] Verify options are stored with correct structure

2. **Bulk Delete** (if feature exists):
   - [ ] Select multiple questions (checkboxes)
   - [ ] Click "Delete Selected" button
   - [ ] Verify confirmation dialog
   - [ ] Confirm deletion
   - [ ] Verify all selected questions deleted

**🔄 Refresh & State Management:**
1. **Page Refresh**:
   - [ ] Make changes (create/edit/delete question)
   - [ ] Refresh page (F5 or Cmd+R)
   - [ ] Verify changes persist
   - [ ] Verify current page maintained (if applicable)

2. **Navigation Away and Back**:
   - [ ] Navigate to dashboard
   - [ ] Navigate back to questions page
   - [ ] Verify questions load correctly
   - [ ] Verify state is maintained

**📱 Responsive Design:**
1. **Mobile Viewport**:
   - [ ] Resize browser to mobile size (375px width)
   - [ ] Verify layout adapts
   - [ ] Verify buttons are clickable
   - [ ] Verify text is readable
   - [ ] Verify modals work on mobile

2. **Tablet Viewport**:
   - [ ] Resize to tablet size (768px width)
   - [ ] Verify layout adapts
   - [ ] Verify all features accessible

**🎯 Final Verification Checklist:**
- [ ] All CRUD operations work correctly
- [ ] Search functionality works
- [ ] Pagination works correctly
- [ ] Stats cards display accurate data
- [ ] All modals open/close correctly
- [ ] Form validation works
- [ ] Error handling works
- [ ] Theme toggle works
- [ ] Responsive design works
- [ ] No console errors
- [ ] All API calls succeed
- [ ] Performance is acceptable (no lag)

#### Step 3: Compare Results
- [ ] Automated tests pass
- [ ] Manual testing works
- [ ] Both match → Feature is working
- [ ] Document any discrepancies found

---


### Task 17: Homepage ⭐⭐⭐⭐⭐⭐

#### Step 1: Run Automated Tests
```bash
# Unit tests (G-UT-001 through G-UT-005, plus snapshots)
npm run test:unit -- apps/website/src/app/page.test.tsx

# Integration tests (G-IT-001 through G-IT-005)
npm run test:integration -- apps/website/src/app/page.integration.test.tsx

# E2E tests (G-E2E-001 through G-E2E-006)
npm run test:e2e:headed -- tests/e2e/guided-flow/homepage-to-guided.spec.ts

# Additional E2E tests (homepage-related flows)
npm run test:e2e:headed -- tests/e2e/guided-flow/complete-guided-flow.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-unauthenticated.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-authenticated.spec.ts
```

**E2E Test File Structure:**
- **`homepage-to-guided.spec.ts`**: Contains all 6 main homepage test suites (G-E2E-001 through G-E2E-006) covering basic navigation, learning style selection, personalized content, user statistics, complete user flows, and active plan integration.
- **`complete-guided-flow.spec.ts`**: Contains additional flow tests that start from the homepage and test complete user journeys through the guided learning flow, including loading transitions, selection feedback, and navigation persistence.
- **`get-started-*.spec.ts`**: Contains tests for the get-started page, which is part of the homepage flow but tested separately.

**Test Coverage Summary:**
- ✅ **Unit Tests**: 5 test suites covering rendering, personalized content, learning style cards, conditional rendering, and active plan detection. All tests now properly handle localStorage dependencies with helper functions (`setupLocalStorage`, `clearLocalStorage`) and test edge cases (invalid JSON, missing keys, empty strings). **Updated to reflect UserTypeContext defaulting to 'guided' for unauthenticated users.**
- ✅ **Integration Tests**: 5 test suites covering navigation flows, learning style selection, user type changes, active plan detection, and authentication state. Tests verify localStorage persistence and state changes during interactions. **Updated to reflect default 'guided' behavior and "Choose Learning Plan" button for unauthenticated users.**
- ✅ **E2E Tests**: Comprehensive coverage across 6 main test suites plus additional flow tests in `complete-guided-flow.spec.ts`. All tests include localStorage cleanup before and after each test, with robust error handling and comprehensive scenarios for invalid data handling and persistence across page reloads. **Updated to reflect that unauthenticated users default to 'guided' and see "Choose Learning Plan" button (not "Get Started").**

**Detailed E2E Test Coverage (`homepage-to-guided.spec.ts`):**

1. **G-E2E-001: Homepage Basic Navigation** (3 tests)
   - ✅ `should load homepage without errors` - Verifies homepage loads and displays heading
   - ✅ `should navigate to /get-started when default CTA is clicked` - Tests CTA button navigation (handles both "Get Started" and "Choose Learning Plan" buttons)
   - ✅ `should navigate to /learn when "Explore Learning Paths" is clicked` - Tests final CTA section navigation

2. **G-E2E-002: Learning Style Selection** (3 tests)
   - ✅ `should display learning style selection section` - Verifies "How would you like to learn?" section and both cards are visible
   - ✅ `should navigate to guided learning when Guided Learning card is clicked` - Tests Guided Learning card click, navigation to `/features/guided-learning`, and localStorage persistence (`userType` and `learning-preferences:type`)
   - ✅ `should navigate to browse practice questions when Free Style Learning card is clicked` - Tests Free Style Learning card click, navigation to `/browse-practice-questions`, and localStorage persistence

3. **G-E2E-003: Personalized Content Display** (6 tests)
   - ✅ `should show guided content when no userType is set (default for unauthenticated users)` - Tests default content when localStorage is cleared (note: UserTypeContext defaults to 'guided', so content shows "Master Frontend Development", "Choose Learning Plan" button, and final CTA section does NOT appear - this is the expected default behavior)
   - ✅ `should show guided content when userType is "guided" (default for unauthenticated users)` - Verifies guided content appears with "Master Frontend Development" title, default subtitle, and "Choose Learning Plan" button (not "Get Started"). This is the default state for unauthenticated users.
   - ✅ `should show self-directed content when userType is "self-directed"` - Verifies self-directed content appears with correct title and subtitle
   - ✅ `should show active plan content when guided user has active plan` - Tests "Continue [Plan Name]" content with plan details
   - ✅ `should handle invalid active plan JSON gracefully` - Tests error handling for invalid JSON, verifies data is removed from localStorage and default content appears
   - ✅ `should handle missing active plan key gracefully` - Tests behavior when active plan key doesn't exist

4. **G-E2E-004: User Statistics Display** (1 test)
   - ✅ `should display user statistics component` - Verifies UserStatistics component is visible with stats section

5. **G-E2E-005: Complete User Flow from Homepage** (3 tests)
   - ✅ `should complete full flow: homepage -> get-started -> guided learning` - Tests complete navigation flow from homepage through get-started page
   - ✅ `should complete flow: homepage -> learning style selection -> guided learning` - Tests Guided Learning card click flow with localStorage verification (`userType` = 'guided', `learning-preferences:type` = 'guided')
   - ✅ `should complete flow: homepage -> learning style selection -> freestyle learning` - Tests Free Style Learning card click flow with localStorage verification (`userType` = 'self-directed', `learning-preferences:type` = 'free-style')

6. **G-E2E-006: Active Plan Integration** (3 tests)
   - ✅ `should display continue practice button when active plan exists` - Verifies "Continue Practice" button appears with correct href containing plan ID
   - ✅ `should navigate to guided practice when continue button is clicked` - Tests navigation to `/guided-practice?plan=[plan-id]`
   - ✅ `should persist active plan across page reloads` - Tests active plan persistence after page reload

**Additional E2E Test Coverage (`complete-guided-flow.spec.ts` - Homepage-related tests):**

7. **G-E2E-004: Complete Guided Flow** (Additional homepage flow tests)
   - ✅ `should complete full flow from homepage to guided learning page` - Tests homepage → get-started → guided learning complete flow
   - ✅ `should show loading transition during navigation` - Tests loading transition appears when navigating from get-started
   - ✅ `should display selection feedback when option is clicked` - Tests visual feedback when learning style is selected
   - ✅ `should navigate to browse-practice-questions when self-directed is selected` - Tests self-directed navigation flow
   - ✅ `should persist user type selection across navigation` - Tests userType persistence when navigating back to homepage
   - ✅ `should handle rapid clicking on get-started options` - Tests rapid clicking behavior (should not cause issues)
   - ✅ `should display correct content for guided vs self-directed selection` - Tests both guided and self-directed paths in sequence

**⚠️ Important: localStorage Dependencies & Default Behavior**
The homepage depends on several localStorage keys to display personalized content:
- `userType` - 'guided' or 'self-directed' (set by UserTypeContext)
  - **DEFAULT**: UserTypeContext defaults to `'guided'` for unauthenticated users
  - This means unauthenticated users will ALWAYS see guided content by default
  - Final CTA section only appears when `userType` is explicitly `null` (rare)
- `active-guided-plan` - JSON string with plan data: `{id, name, totalQuestions, estimatedTime}`
- `learning-preferences:type` - 'guided' or 'free-style' (set by LearningTypeContext for logged-out users)
- `learning-type:type` - Alternative key used for compatibility (fallback in tests)

**Key Behavior for Unauthenticated Users:**
- **Default State**: `userType` = `'guided'` (UserTypeContext default)
- **CTA Button**: "Choose Learning Plan" (not "Get Started")
- **Final CTA Section**: Does NOT appear (only shows when `userType` is `null`)
- **Content**: "Master Frontend Development" with "Choose Learning Plan" button

**All automated tests now:**
- ✅ Set up localStorage before each test
- ✅ Clear localStorage after each test
- ✅ Test various localStorage combinations
- ✅ Handle edge cases (invalid JSON, missing keys, empty strings)
- ✅ Verify localStorage persistence across interactions
- ✅ **Reflect UserTypeContext defaulting to 'guided' for unauthenticated users**
- ✅ **Verify "Choose Learning Plan" button appears (not "Get Started") for guided users**
- ✅ **Verify final CTA section does NOT appear for unauthenticated users (default 'guided' state)**

#### Step 2: Manual Testing - COMPREHENSIVE CHECKLIST

**📋 Basic Homepage Display:**
1. **Open**: `http://localhost:3000`
2. **Verify Homepage Loads**:
   - [X] Page loads without errors
   - [X] No console errors
   - [X] Hero section displays correctly
   - [X] Animated background elements visible
   - [X] UserStatistics component displays (stats cards visible)
🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🚦🚦🚦🚦🚦🚦🫷🫷🫷🫷🫷🫷🫷🫷🫷🫸🫸🫸🫸🫸🫸 stop...

**🎯 Personalized Content Based on UserType:**
3. **Default Content for Unauthenticated Users (Most Common Case)**:
   - [X] **IMPORTANT**: UserTypeContext defaults to `'guided'` for unauthenticated users
   - [X] **This is the DEFAULT behavior** - unauthenticated users will ALWAYS see guided content
   - [X] When localStorage is cleared or empty, UserTypeContext automatically sets `userType` to `'guided'`
   - [X] **Expected Content (Default for Unauthenticated Users)**:
     - [X] Title: "Master Frontend Development" is visible
     - [X] Subtitle: "The complete platform to ace your frontend interviews" is visible
     - [X] CTA Button: "Choose Learning Plan" button visible and links to `/get-started`
     - [X] Final CTA Section: Should NOT be visible (only shows when `userType` is explicitly `null`, which is rare)
     - [X] User Type Specific Section: Guided learning section visible with indigo/purple gradient
   - [X] **Rare Case - userType is null** (requires explicit removal):
     - [X] To see final CTA section: Explicitly set `userType` to `null` (this is rare and not the default)
     - [X] If final CTA appears:
       - [X] Title: "Master Frontend Development" is visible
       - [X] Subtitle: "The complete platform to ace your frontend interviews" is visible
       - [X] CTA Button: "Get Started" button visible and links to `/get-started`
       - [X] Final CTA Section: "Ready to Ace Your Interviews? 🚀" section visible
       - [X] "Start Learning Now" button visible (links to `/get-started`)
       - [X] "Explore Learning Paths" button visible (links to `/learn`)

4. **Guided User Content (No Active Plan) - DEFAULT for Unauthenticated Users**:
   - [X] **This is the DEFAULT state** for unauthenticated users (UserTypeContext defaults to 'guided')
   - [X] **Clear localStorage first**: `localStorage.clear()` (to start fresh)
   - [X] **Note**: Even after clearing, UserTypeContext will default to `'guided'` automatically
   - [X] **Verify localStorage**: Check DevTools Application tab → `userType` should be `'guided'` (set automatically by UserTypeContext)
   - [X] Refresh page
   - [X] **Wait 1-2 seconds** for useEffect to process localStorage
   - [X] Title: "Master Frontend Development" is visible (appears in both hero and user type section)
   - [X] Subtitle: "The complete platform to ace your frontend interviews" is visible
   - [X] CTA Button: "Choose Learning Plan" button visible and links to `/get-started`
   - [X] **"Get Started" button should NOT appear** (only appears when `userType` is `null`)
   - [X] Final CTA Section: Should NOT be visible (only shows when `userType` is explicitly `null`)
   - [X] User Type Specific Section: Guided learning section visible with indigo/purple gradient
   - [X] **Verify localStorage persistence**: Reload page → Content should still be guided

5. **Guided User Content (With Active Plan)**:
   - [ ] **Clear localStorage first**: `localStorage.clear()` (to start fresh)
   - [ ] Set userType to "guided" in localStorage: `localStorage.setItem('userType', 'guided')`
   - [ ] Set active plan in localStorage:
     ```javascript
     localStorage.setItem('active-guided-plan', JSON.stringify({
       id: 'plan-123',
       name: 'Frontend Fundamentals',
       totalQuestions: 50,
       estimatedTime: '2 hours'
     }))
     ```
   - [ ] **Verify localStorage**: Check DevTools Application tab:
     - [ ] `userType` should be `'guided'`
     - [ ] `active-guided-plan` should contain valid JSON string
   - [ ] Refresh page
   - [ ] **Wait 1-2 seconds** for useEffect to process localStorage and update state
   - [ ] Title: "Continue Frontend Fundamentals" is visible (appears in both hero and final section)
   - [ ] Subtitle: "Pick up where you left off with your frontend fundamentals" is visible
   - [ ] CTA Button: "Continue Practice" button visible and links to `/guided-practice?plan=plan-123`
   - [ ] Plan Details: "Current Plan: Frontend Fundamentals" is visible
   - [ ] Plan Stats: "50 questions • 2 hours" is visible
   - [ ] User Type Specific Section: Green/emerald gradient (indicates active plan)
   - [ ] **Verify localStorage persistence**: Reload page → Plan content should still appear

6. **Self-Directed User Content**:
   - [ ] **Clear localStorage first**: `localStorage.clear()` (to start fresh)
   - [ ] Set userType to "self-directed" in localStorage: `localStorage.setItem('userType', 'self-directed')`
   - [ ] **Verify localStorage**: Check DevTools Application tab → `userType` should be `'self-directed'`
   - [ ] Refresh page
   - [ ] **Wait 1-2 seconds** for useEffect to process localStorage
   - [ ] Title: "Build Your Custom Roadmap" is visible
   - [ ] Subtitle: "Create and manage your personalized learning journey" is visible
   - [ ] CTA Button: "View My Roadmap" button visible and links to `/browse-practice-questions`
   - [ ] Final CTA Section: Should NOT be visible
   - [ ] User Type Specific Section: Purple/pink gradient section visible
   - [ ] **Verify localStorage persistence**: Reload page → Content should still be self-directed

**🎓 Learning Style Selection Cards:**
7. **"How would you like to learn?" Section**:
   - [ ] Heading "How would you like to learn?" is visible
   - [ ] Description text is visible: "Choose your learning style to get the most personalized experience."

8. **Guided Learning Card**:
   - [ ] Card is visible with indigo/purple gradient background
   - [ ] Compass icon is visible in the card
   - [ ] Title "Guided Learning" is visible
   - [ ] Description: "Follow structured learning paths designed by experts..." is visible
   - [ ] "Start Guided Learning" text with arrow icon is visible
   - [ ] Card is clickable
   - [ ] When userType is "guided": Card has highlighted border (ring-2 ring-indigo-400)

9. **Free Style Learning Card**:
   - [ ] Card is visible with green/emerald gradient background
   - [ ] Map icon is visible in the card
   - [ ] Title "Free Style Learning" is visible
   - [ ] Description: "Create your own learning roadmap and explore topics at your own pace..." is visible
   - [ ] "Start Free Style Learning" text with arrow icon is visible
   - [ ] Card is clickable
   - [ ] When userType is "self-directed": Card has highlighted border (ring-2 ring-green-400)

10. **Learning Style Card Interactions**:
    - [ ] **Before clicking**: Clear localStorage: `localStorage.clear()`
    - [ ] Click "Guided Learning" card
    - [ ] Wait 1-2 seconds for navigation
    - [ ] **Verify localStorage was set** (check in DevTools Application tab):
      - [ ] `localStorage.getItem('userType')` should return `'guided'`
      - [ ] `localStorage.getItem('learning-preferences:type')` should return `'guided'` (primary key for logged-out users)
      - [ ] `localStorage.getItem('learning-type:type')` may also be set (fallback/compatibility key)
    - [ ] Verify navigation to `/features/guided-learning` occurred
    - [ ] Go back to homepage
    - [ ] **Verify persistence**: Check that `userType` is still `'guided'` in localStorage
    - [ ] Verify guided content appears (title: "Master Frontend Development")
    - [ ] Click "Free Style Learning" card
    - [ ] Wait 1-2 seconds for navigation
    - [ ] **Verify localStorage was updated**:
      - [ ] `localStorage.getItem('userType')` should return `'self-directed'`
      - [ ] `localStorage.getItem('learning-preferences:type')` should return `'free-style'` (primary key for logged-out users)
      - [ ] `localStorage.getItem('learning-type:type')` may also be set (fallback/compatibility key)
    - [ ] Verify navigation to `/browse-practice-questions` occurred
    - [ ] Go back to homepage
    - [ ] **Verify persistence**: Check that `userType` is still `'self-directed'` in localStorage
    - [ ] Verify self-directed content appears (title: "Build Your Custom Roadmap")

**🔄 Navigation Flows:**
11. **Default CTA Navigation**:
    - [ ] Click "Get Started" button (when no userType)
   - [ ] Verify redirects to `/get-started`
    - [ ] Go back to homepage

12. **Guided User Navigation**:
    - [ ] Set userType to "guided" (no active plan)
    - [ ] Click "Choose Learning Plan" button
    - [ ] Verify redirects to `/get-started`
    - [ ] Go back to homepage
    - [ ] Set active plan in localStorage
    - [ ] Click "Continue Practice" button
    - [ ] Verify redirects to `/guided-practice?plan=plan-123` (with correct plan ID)

13. **Self-Directed User Navigation**:
    - [ ] Set userType to "self-directed"
    - [ ] Click "View My Roadmap" button
    - [ ] Verify redirects to `/browse-practice-questions`

14. **Final CTA Section Navigation** (only visible when userType is explicitly null - RARE CASE):
    - [ ] **Note**: This is a RARE case since UserTypeContext defaults to 'guided'
    - [ ] **To see final CTA**: You must explicitly set `userType` to `null` (not just clear localStorage)
    - [ ] Set userType to null: `localStorage.setItem('userType', 'null')` or use a custom script
    - [ ] **Alternative**: Use browser console to manually set `userType` to `null` in the context
    - [ ] Refresh page
    - [ ] Verify "Ready to Ace Your Interviews? 🚀" section is visible
    - [ ] Click "Start Learning Now" button
    - [ ] Verify redirects to `/get-started`
    - [ ] Go back to homepage
    - [ ] Click "Explore Learning Paths" button
    - [ ] Verify redirects to `/learn`
    - [ ] **Note**: After this, UserTypeContext will likely default back to 'guided' on next page load

**📊 User Statistics Display:**
15. **Statistics Component**:
    - [ ] UserStatistics component is visible
    - [ ] Stats cards display (Active Learners, Success Rate, Questions Solved, Avg. Study Time)
    - [ ] Stats are readable and properly formatted

**🎨 Animations and Visual Effects:**
16. **Page Animations**:
    - [ ] Title animates in on page load (fade in and slide up)
    - [ ] Subtitle animates in after title (with delay)
    - [ ] CTA button animates in after subtitle (with delay)
    - [ ] Stats section animates in last (with delay)
    - [ ] Learning style cards animate in (with staggered delays)
    - [ ] Sparkles, Zap, and Star icons animate around title (when animation completes)

17. **Background Elements**:
    - [ ] Floating particles are visible (animated dots)
    - [ ] Gradient orbs are visible (blurred circles)
    - [ ] Watermark image is visible (centered, semi-transparent)

**🌓 Theme Toggle:**
18. **Theme Functionality**:
    - [ ] Theme toggle button is visible in navbar
    - [ ] Click to toggle theme (light ↔ dark)
    - [ ] Verify all homepage elements adapt to theme:
      - [ ] Background gradients change
      - [ ] Text colors change
      - [ ] Card backgrounds adapt
      - [ ] All elements remain readable
    - [ ] Reload page → Verify theme persists

**📱 Responsive Design:**
19. **Mobile Viewport** (375px):
    - [ ] Resize browser to mobile size
    - [ ] Verify layout adapts correctly
    - [ ] Verify learning style cards stack vertically
    - [ ] Verify text is readable
    - [ ] Verify buttons are clickable
    - [ ] Verify animations still work

20. **Tablet Viewport** (768px):
    - [ ] Resize browser to tablet size
    - [ ] Verify layout adapts correctly
    - [ ] Verify cards display in grid (2 columns)
    - [ ] Verify all content is accessible

**🔍 Active Plan Detection & localStorage Testing:**
21. **Active Plan from localStorage**:
   - [ ] Set userType to "guided": `localStorage.setItem('userType', 'guided')`
   - [ ] Set active plan in localStorage:
     ```javascript
     localStorage.setItem('active-guided-plan', JSON.stringify({
       id: 'plan-123',
       name: 'Frontend Fundamentals',
       totalQuestions: 50,
       estimatedTime: '2 hours'
     }))
     ```
   - [ ] Refresh page
   - [ ] Wait 1-2 seconds for useEffect to process localStorage
   - [ ] Verify "Continue Frontend Fundamentals" title appears
   - [ ] Verify plan details section appears
   - [ ] Verify plan name, question count, and time are displayed correctly
   - [ ] Verify CTA button links to `/guided-practice?plan=plan-123`

22. **Invalid Plan Data Handling**:
   - [ ] Set userType to "guided": `localStorage.setItem('userType', 'guided')`
   - [ ] Set invalid JSON in localStorage: `localStorage.setItem('active-guided-plan', 'invalid-json')`
   - [ ] Refresh page
   - [ ] Wait 1-2 seconds for useEffect to process
   - [ ] Check browser console → Should see error logged: "Error parsing active plan:"
   - [ ] Verify invalid data is removed from localStorage: `localStorage.getItem('active-guided-plan')` should be `null`
   - [ ] Verify default guided content appears (not continue plan content)
   - [ ] Verify "Master Frontend Development" title appears (not "Continue...")

23. **Missing Active Plan Key**:
   - [ ] Set userType to "guided": `localStorage.setItem('userType', 'guided')`
   - [ ] Ensure `active-guided-plan` key does NOT exist: `localStorage.removeItem('active-guided-plan')`
   - [ ] Refresh page
   - [ ] Wait 1-2 seconds for useEffect to process
   - [ ] Verify default guided content appears (not continue plan content)
   - [ ] Verify "Master Frontend Development" title appears
   - [ ] Verify "Choose Learning Plan" button is visible

24. **Empty Active Plan String**:
   - [ ] Set userType to "guided": `localStorage.setItem('userType', 'guided')`
   - [ ] Set empty string: `localStorage.setItem('active-guided-plan', '')`
   - [ ] Refresh page
   - [ ] Wait 1-2 seconds for useEffect to process
   - [ ] Verify default guided content appears (empty string is treated as no plan)
   - [ ] Verify "Master Frontend Development" title appears

25. **Active Plan Persistence Across Reloads**:
   - [ ] Set userType to "guided": `localStorage.setItem('userType', 'guided')`
   - [ ] Set valid active plan in localStorage (see step 21)
   - [ ] Refresh page → Verify plan content appears
   - [ ] Reload page again (F5) → Verify plan content still appears
   - [ ] Verify localStorage still contains the plan: `localStorage.getItem('active-guided-plan')` should return valid JSON
   - [ ] Verify plan details persist correctly after multiple reloads

**🔄 User Type Changes & localStorage State Management:**
23. **Dynamic Content Updates**:
   - [ ] **Start fresh**: Clear localStorage: `localStorage.clear()`
   - [ ] **Default state (no userType)**: Refresh page → Verify guided content appears (UserTypeContext defaults to 'guided')
   - [ ] **Verify localStorage**: Check `localStorage.getItem('userType')` → Should be `'guided'` (set automatically by UserTypeContext)
   - [ ] **Set to guided explicitly**: `localStorage.setItem('userType', 'guided')` → Refresh → Verify content is guided
   - [ ] **Verify localStorage**: Check `localStorage.getItem('userType')` → Should be `'guided'`
   - [ ] **Set to self-directed**: `localStorage.setItem('userType', 'self-directed')` → Refresh → Verify content changes to self-directed
   - [ ] **Verify localStorage**: Check `localStorage.getItem('userType')` → Should be `'self-directed'`
   - [ ] **Clear userType**: `localStorage.removeItem('userType')` → Refresh → Verify content returns to guided (default)
   - [ ] **Verify localStorage**: Check `localStorage.getItem('userType')` → Should be `'guided'` (UserTypeContext sets it automatically)
   - [ ] **Note**: Final CTA section only appears when `userType` is explicitly `null` (rare case, not the default)
   - [ ] Verify final CTA section appears/disappears correctly based on userType state

**📡 Network & Console:**
24. **Check Network Tab**:
   - [ ] No failed API calls
   - [ ] All requests succeed (200 status)
   - [ ] No 404 errors for assets

25. **Check Console**:
   - [ ] No JavaScript errors
   - [ ] No React warnings
   - [ ] No console errors
   - [ ] Only expected logs (if any)
   - [ ] **Note**: If testing invalid JSON in localStorage, expect one error log: "Error parsing active plan:" (this is expected and handled gracefully)

26. **Check Application Tab (localStorage)**:
   - [ ] Open DevTools → Application tab → Local Storage → `http://localhost:3000`
   - [ ] **Verify keys exist** when set:
     - [ ] `userType` key exists when user type is selected
     - [ ] `active-guided-plan` key exists when active plan is set
     - [ ] `learning-preferences:type` key exists when learning style is selected (primary key for logged-out users)
     - [ ] `learning-type:type` key may also exist (fallback/compatibility key)
   - [ ] **Verify key values** are correct:
     - [ ] `userType` should be `'guided'` or `'self-directed'` (not `null` or empty)
     - [ ] `active-guided-plan` should be valid JSON string (not `'invalid-json'` or empty)
   - [ ] **Verify keys are removed** when cleared:
     - [ ] After `localStorage.clear()`, all keys should be gone
     - [ ] After invalid JSON error, `active-guided-plan` should be removed automatically

**💾 localStorage Management & Testing:**
26. **localStorage Keys Used by Homepage**:
   - [ ] **`userType`**: Stores user preference ('guided' or 'self-directed')
     - [ ] Set via: `localStorage.setItem('userType', 'guided')`
     - [ ] Read by: UserTypeContext on page load
     - [ ] Persists across page reloads
   - [ ] **`active-guided-plan`**: Stores active learning plan (JSON string)
     - [ ] Set via: `localStorage.setItem('active-guided-plan', JSON.stringify({...}))`
     - [ ] Read by: Homepage useEffect when userType is 'guided'
     - [ ] Format: `{id: string, name: string, totalQuestions: number, estimatedTime: string}`
     - [ ] Automatically removed if invalid JSON detected
   - [ ] **`learning-preferences:type`**: Stores learning type preference (set by LearningTypeContext for logged-out users)
     - [ ] Set via: Learning style card clicks
     - [ ] Used by: LearningTypeContext for learning mode selection
     - [ ] Primary key: `learning-preferences:type` (for logged-out users)
     - [ ] Fallback key: `learning-type:type` (for compatibility)

27. **localStorage Edge Cases Testing**:
   - [ ] **Test with corrupted data**:
     - [ ] Set `active-guided-plan` to `'invalid-json'`
     - [ ] Refresh page → Verify error logged, data removed, default content shown
   - [ ] **Test with missing keys**:
     - [ ] Clear all localStorage: `localStorage.clear()`
     - [ ] Refresh page → Verify default content appears
   - [ ] **Test with empty strings**:
     - [ ] Set `active-guided-plan` to `''`
     - [ ] Refresh page → Verify treated as no plan, default content shown
   - [ ] **Test with null values**:
     - [ ] Set `userType` to `null` (if possible)
     - [ ] Refresh page → Verify default content appears

28. **localStorage Persistence Testing**:
   - [ ] Set userType and active plan
   - [ ] Refresh page multiple times → Verify values persist
   - [ ] Close browser tab and reopen → Verify values still persist
   - [ ] Navigate away and back → Verify values persist
   - [ ] Clear localStorage → Verify content resets to default

**✅ Final Verification:**
29. **Complete User Flow Test with localStorage Verification**:
   - [ ] **Step 1**: Clear all localStorage: `localStorage.clear()`
   - [ ] **Step 2**: Navigate to homepage
   - [ ] **Step 3**: Verify guided content appears (UserTypeContext defaults to 'guided')
     - [ ] Title: "Master Frontend Development"
     - [ ] CTA Button: "Choose Learning Plan" (not "Get Started")
     - [ ] Final CTA Section: Should NOT be visible
   - [ ] **Step 4**: Verify localStorage was set automatically:
     - [ ] Check `localStorage.getItem('userType')` → Should be `'guided'` (set by UserTypeContext)
   - [ ] **Step 5**: Click "Guided Learning" card (should already be selected/highlighted)
   - [ ] **Step 6**: Verify localStorage was updated:
     - [ ] Check `localStorage.getItem('userType')` → Should be `'guided'`
     - [ ] Check `localStorage.getItem('learning-preferences:type')` → Should be `'guided'` (primary key)
     - [ ] Check `localStorage.getItem('learning-type:type')` → May also be `'guided'` (fallback key)
   - [ ] **Step 7**: Verify navigation to guided learning page occurred
   - [ ] **Step 8**: Go back to homepage
   - [ ] **Step 9**: Verify userType persisted (guided content should appear)
   - [ ] **Step 10**: Set active plan in localStorage (see step 21)
   - [ ] **Step 11**: Refresh page → Verify "Continue [Plan Name]" appears
   - [ ] **Step 12**: Click "Free Style Learning" card
   - [ ] **Step 13**: Verify localStorage was updated:
     - [ ] Check `localStorage.getItem('userType')` → Should be `'self-directed'`
     - [ ] Check `localStorage.getItem('learning-preferences:type')` → Should be `'free-style'` (primary key)
     - [ ] Check `localStorage.getItem('learning-type:type')` → May also be `'free-style'` (fallback key)
   - [ ] **Step 14**: Verify navigation to browse practice questions occurred
   - [ ] **Step 15**: Go back to homepage
   - [ ] **Step 16**: Verify userType updated (self-directed content should appear)
   - [ ] **Step 17**: Verify active plan was cleared (self-directed users don't use active plans)

#### Step 3: Compare Results
- [ ] Automated tests pass (all test suites)
- [ ] Manual testing matches automated test behavior
- [ ] Both match → Feature is working correctly
- [ ] Document any discrepancies found

---

### Task 8: Custom Roadmap Creation

#### Step 1: Run Automated Tests
```bash
npm run test:unit -- apps/website/src/app/custom-roadmap/page.test.tsx
npm run test:integration -- apps/website/src/app/custom-roadmap/page.integration.test.tsx
npm run test:e2e:headed -- tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts
# Note: To add slow motion, configure slowMo in playwright.config.ts
```

#### Step 2: Manual Testing
1. **Navigate**: `http://localhost:3000/custom-roadmap`
2. **Test Plan Creation**:
   - [ ] Enter plan name
   - [ ] Enter description
   - [ ] Select cards
   - [ ] Select categories
   - [ ] Select topics
   - [ ] Select questions
   - [ ] Click "Save Plan"
3. **Verify**:
   - [ ] Plan is saved
   - [ ] Plan appears in `/my-plans`
   - [ ] Check localStorage: `localStorage.getItem('userPlans')`

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
   - [ ] Select "HTML" → Only HTML flashcards show
   - [ ] Select "CSS" → Only CSS flashcards show
3. **Test Difficulty Filter**:
   - [ ] Select "Easy" → Only easy flashcards show
   - [ ] Select "Hard" → Only hard flashcards show
4. **Test Practice Modes**:
   - [ ] **List Mode**: All flashcards visible
   - [ ] **Flip Mode**: Click to flip cards
   - [ ] **Quiz Mode**: Answer questions
5. **Test CRUD**:
   - [ ] Create new flashcard
   - [ ] Edit existing flashcard
   - [ ] Delete flashcard

---

## 🔄 Recommended Testing Sequence

### For Each Task:

1. **Read the Test Task File**
   ```bash
   # Example: Read task details
   cat Rest/markdown/docs/testing/tasks/admin/A-002-admin-login.md
   ```

2. **Run Automated Tests First (Task-Specific)**
   ```bash
   # ⚠️ IMPORTANT: Run tests for THIS SPECIFIC TASK only, not all tests
   # Each task section below shows its specific test file paths
   # Example for Task 2 (Login):
   # npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
   # npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
   # npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
   
   # Establish baseline for THIS task only
   npm run test:unit -- [task-specific-test-file]
   npm run test:integration -- [task-specific-test-file]
   npm run test:e2e:headed -- [task-specific-test-file]
   
   # ⚠️ DO NOT run all tests at once - run each task's tests individually
   ```

3. **Test Manually**
   - Follow the same steps as automated tests
   - Verify same results
   - Check edge cases

4. **Compare Results**
   - [ ] If both pass → Feature works
   - [ ] If automated passes but manual fails → Check environment/config
   - [ ] If manual passes but automated fails → Update tests
   - [ ] If both fail → Fix the code

5. **Document Findings**
   - [ ] Note any differences
   - [ ] Update tests if needed
   - [ ] Fix bugs found

---

## 🎯 Quick Reference: Commands for Each Task

### Admin Tasks

**Task 1: Bulk Question Addition**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/content/questions/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/admin/content/questions/page.integration.test.tsx

# E2E tests (split into focused test files)
# Run all split tests together:
npm run test:e2e:admin:questions

# Or run specific test suites:
npm run test:e2e:admin:questions:basic        # Basic page loading
npm run test:e2e:admin:questions:crud         # CRUD operations
npm run test:e2e:admin:questions:search       # Search functionality
npm run test:e2e:admin:questions:pagination   # Pagination
npm run test:e2e:admin:questions:bulk         # Bulk operations
npm run test:e2e:admin:questions:stats        # Stats cards
npm run test:e2e:admin:questions:validation   # Form validation

# Original monolithic file (kept for reference):
# npm run test:e2e:headed -- tests/e2e/admin/admin-bulk-question-addition.spec.ts
```

**Task 2: Admin Login**
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# Navbar unit tests
npm run test:unit -- libs/shared-components/src/lib/auth/AdminLoginNavbar.test.tsx

# Navbar integration tests
npm run test:integration -- libs/shared-components/src/lib/auth/AdminLoginNavbar.integration.test.tsx

# E2E tests (includes navbar tests)
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Note: Tests use ADMIN_EMAIL and ADMIN_PASSWORD from .env.local
```

**Task 3: Admin Dashboard** ⭐ (See Phase 1 above)
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/admin/dashboard/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/admin/dashboard/page.integration.test.tsx

# Navbar unit tests
npm run test:unit -- libs/shared-components/src/lib/components/admin/AdminNavbar.test.tsx

# Navbar integration tests
npm run test:integration -- libs/shared-components/src/lib/components/admin/AdminNavbar.integration.test.tsx

# E2E tests (includes navbar tests)
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# Note: Tests use ADMIN_EMAIL and ADMIN_PASSWORD from .env.local
# Note: Dashboard will show 0 questions initially (empty database - this is correct)
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

#### Step 1: Run Automated Tests
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/get-started/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/get-started/page.integration.test.tsx

# E2E tests (multiple test files)
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-unauthenticated.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/get-started-authenticated.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/complete-guided-flow.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-learning-page.spec.ts
```

#### Step 2: Manual Testing
1. **Navigate**: `http://localhost:3000/get-started`
2. **Verify Page Loads**:
   - [ ] Page loads without errors
   - [ ] Heading "Choose Your Learning Style" is visible
   - [ ] Description text is visible
   - [ ] Both options are displayed
3. **Test "I need guidance" Option**:
   - [ ] Option card is visible
   - [ ] Card shows correct title and description
   - [ ] Click the card
   - [ ] Verify loading transition appears ("Loading your learning experience...")
   - [ ] Verify "Great choice!" feedback appears
   - [ ] Wait for navigation (1500ms delay)
   - [ ] Verify redirects to `/features/guided-learning`
4. **Test "I'm self-directed" Option**:
   - [ ] Option card is visible
   - [ ] Card shows correct title and description
   - [ ] Click the card
   - [ ] Verify loading transition appears
   - [ ] Verify feedback appears
   - [ ] Wait for navigation
   - [ ] Verify redirects to `/browse-practice-questions`
5. **Test Visual Feedback**:
   - [ ] Click an option
   - [ ] Verify card gets selected state (border-indigo-500)
   - [ ] Verify checkmark icon appears
   - [ ] Verify "Great choice!" message appears
6. **Test Theme Toggle**:
   - [ ] Theme toggle button is visible
   - [ ] Click to toggle theme
   - [ ] Verify theme changes
   - [ ] Verify page content adapts to theme
7. **Test Responsive Design**:
   - [ ] Test on mobile viewport
   - [ ] Verify cards stack vertically
   - [ ] Verify text is readable
   - [ ] Verify buttons are clickable

**Task 18b: Guided Learning Page**

#### Step 1: Run Automated Tests
```bash
# E2E tests
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-learning-page.spec.ts
npm run test:e2e:headed -- tests/e2e/guided-flow/complete-guided-flow.spec.ts
```

#### Step 2: Manual Testing
1. **Navigate**: `http://localhost:3000/features/guided-learning`
2. **Verify Page Loads**:
   - [ ] Page loads without errors
   - [ ] Heading "Choose Your Learning Journey" is visible
   - [ ] Description text is visible
   - [ ] Quick stats section is displayed
3. **Test Quick Stats**:
   - [ ] "Questions per Plan" stat is visible
   - [ ] "Days Available" stat is visible
   - [ ] "Success Rate" stat is visible
   - [ ] Stats display correct values
4. **Test Sign-in CTA (for unauthenticated users)**:
   - [ ] Sign-in banner is visible (if not authenticated)
   - [ ] Benefits are listed (Save progress, Track accuracy, Sync flashcards)
   - [ ] "Create free account" button is visible and clickable
5. **Test Learning Plans Display**:
   - [ ] Plans load correctly (may show loading state initially)
   - [ ] Plan cards are displayed
   - [ ] Each plan shows: name, duration, difficulty, questions count
   - [ ] Plans are clickable
6. **Test Plan Selection**:
   - [ ] Click on a plan card
   - [ ] Verify navigation to plan detail page (if implemented)
   - [ ] Or verify plan details modal appears
7. **Test Theme Toggle**:
   - [ ] Theme toggle button is visible
   - [ ] Click to toggle theme
   - [ ] Verify theme changes
   - [ ] Verify all content adapts to theme
8. **Test Responsive Design**:
   - [ ] Test on mobile viewport
   - [ ] Verify stats stack vertically
   - [ ] Verify plan cards stack properly
   - [ ] Verify text is readable

**Task G-006: Guided Practice Page (localStorage Dependent - Not Logged In)**

#### Step 1: Run Automated Tests
```bash
# Unit tests
npm run test:unit -- apps/website/src/app/guided-practice/page.test.tsx

# Integration tests
npm run test:integration -- apps/website/src/app/guided-practice/page.integration.test.tsx

# E2E tests
npm run test:e2e:headed -- tests/e2e/guided-flow/guided-practice-localStorage.spec.ts
```

#### Step 2: Manual Testing (Not Logged In - localStorage Only)
1. **Clear localStorage and Navigate**:
   - Open DevTools → Application → Local Storage → Clear all
   - Navigate to `/guided-practice?plan={planId}` (replace with actual planId)
   - Verify page loads without requiring authentication
   - Verify loading state appears initially

2. **Test localStorage Initialization**:
   - Open DevTools → Application → Local Storage
   - Verify key `guided-practice-progress-{planId}` is created
   - Click on the key to view its value
   - Verify JSON structure contains:
     - `planId`: matches the plan ID from URL
     - `completedQuestions`: empty array `[]`
     - `completedTopics`: empty array `[]`
     - `completedCategories`: empty array `[]`
     - `completedCards`: empty array `[]`
     - `correctAnswers`: empty array `[]`
     - `currentPosition`: object with `{ cardIndex: 0, categoryIndex: 0, topicIndex: 0, questionIndex: 0 }`
     - `lastUpdated`: ISO timestamp string

3. **Test First Question Display**:
   - Verify first question loads correctly
   - Verify question title is displayed
   - Verify question content is displayed
   - Verify answer options are displayed (if multiple choice)
   - Verify code blocks render in CodeEditor (if question has code)
   - Verify current position is saved to localStorage (check `currentPosition` in localStorage)

4. **Test Answer Selection**:
   - Select an answer option
   - Verify explanation appears below the question
   - Open localStorage and verify:
     - `completedQuestions` array includes the question ID
     - `lastUpdated` timestamp is updated
   - If answer is correct:
     - Verify `correctAnswers` array includes the question ID
   - If answer is wrong:
     - Verify flashcard is added to localStorage (check `flashcards` key)
     - Verify "Added to flashcards" message appears

5. **Test Progress to Next Question**:
   - Click "Next Question" button
   - Verify next question loads
   - Open localStorage and verify:
     - `currentPosition` is updated with new indices
     - `lastUpdated` timestamp is updated
     - Previous question ID remains in `completedQuestions`

6. **Test Browser Refresh/Resume (CRITICAL)**:
   - Answer first question
   - Proceed to second question
   - Note the current question ID or title
   - Refresh the browser (F5 or Cmd+R)
   - **VERIFY**: Page resumes at the same question (NOT from beginning)
   - **VERIFY**: Progress is preserved in localStorage
   - **VERIFY**: `currentPosition` matches the question before refresh
   - **VERIFY**: `completedQuestions` includes the first question ID

7. **Test Navigation with Filters**:
   - Navigate to `/guided-practice?plan={planId}&card={cardId}`
   - Verify only questions from specified card are shown
   - Verify progress is saved (check localStorage)
   - Navigate to `/guided-practice?plan={planId}&category={categoryId}`
   - Verify only questions from specified category are shown
   - Verify progress is saved separately per plan

8. **Test Multiple Plans Progress Isolation**:
   - Start practice on Plan A: `/guided-practice?plan={planAId}`
   - Answer 2 questions
   - Check localStorage: `guided-practice-progress-{planAId}` has 2 completed questions
   - Navigate to Plan B: `/guided-practice?plan={planBId}`
   - Answer 1 question
   - Check localStorage: `guided-practice-progress-{planBId}` has 1 completed question
   - Navigate back to Plan A
   - **VERIFY**: Plan A progress preserved (2 questions completed)
   - **VERIFY**: Plan B progress preserved (1 question completed)

9. **Test Completion Flow**:
   - Complete all questions in a plan (or use a small test plan)
   - Verify completion screen appears
   - Verify final score is calculated correctly
   - Open localStorage and verify:
     - `completed-guided-plans` array includes the planId
     - `plan-grades` object includes `{ planId: percentage }`
   - Verify score matches: `(correctAnswers.length / completedQuestions.length) * 100`

10. **Test localStorage Error Handling**:
    - Disable localStorage: DevTools → Application → Local Storage → Right-click → Clear
    - Try to navigate to practice page
    - Verify graceful error handling (no crashes)
    - Verify user can still use the page (with limited functionality)
    - Re-enable localStorage
    - Verify normal functionality restored

11. **Test Code Editor Rendering**:
    - Find a question with code block
    - Verify code renders in CodeEditor component (not as plain text)
    - Verify code has proper 2-space indentation
    - Verify code is formatted correctly
    - Verify no duplicate code/text content
    - Verify code syntax highlighting works

12. **Test Code Formatting**:
    - Verify code blocks have proper spacing
    - Verify code indentation is consistent (2 spaces)
    - Verify code operators (`<`, `>`, `=`, etc.) are preserved
    - Verify no malformed code artifacts (`esetTimeout`, `ereturn`, etc.)

13. **Test Learning Resources Display**:
    - Find a question with resources (videos, courses, or articles)
    - Answer the question to show the explanation
    - **Verify Resources Section Appears**:
      - [ ] Resources section appears after the explanation
      - [ ] Section has purple/pink/orange gradient background
      - [ ] "Learning Resources" heading is visible with BookOpen icon
      - [ ] Resources are displayed in a list format
    - **Verify Resource Types Display Correctly**:
      - [ ] **Video resources**: Show Video icon with red/pink gradient
      - [ ] **Course resources**: Show GraduationCap icon with blue/indigo gradient
      - [ ] **Article resources**: Show FileText icon with green/emerald gradient
      - [ ] Each resource shows correct type label (Video, Course, Article)
    - **Verify Resource Details**:
      - [ ] Resource title is displayed and clickable
      - [ ] Resource URL opens in new tab (target="_blank")
      - [ ] External link icon appears on hover
      - [ ] Description is shown (if provided)
      - [ ] Duration is shown (if provided) with Clock icon
      - [ ] Author is shown (if provided)
    - **Verify Resource Interactions**:
      - [ ] Click resource card → Opens URL in new tab
      - [ ] Hover over resource → Card scales up slightly and shows shadow
      - [ ] External link icon appears on hover
      - [ ] Resource cards are responsive (mobile/tablet/desktop)
    - **Verify Resources Not Shown When**:
      - [ ] Question has no resources → Resources section does NOT appear
      - [ ] Resources array is empty → Resources section does NOT appear
      - [ ] Resources is null → Resources section does NOT appear
      - [ ] Question is code type → Resources section does NOT appear (only shown for non-code questions)
      - [ ] Explanation is not shown → Resources section does NOT appear (only shown after explanation)
    - **Verify Multiple Resources**:
      - [ ] Multiple resources display in a vertical list
      - [ ] Each resource is properly spaced
      - [ ] All resources are clickable and functional
    - **Verify Theme Adaptation**:
      - [ ] Resources section adapts to light/dark theme
      - [ ] Resource cards have proper contrast in both themes
      - [ ] Text is readable in both themes
      - [ ] Icons are visible in both themes

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
- [ ] **Environment Variables**: Are credentials loaded from `.env.local`? (Never use hardcoded values)

### For Admin Navbar (Login Page):

- [ ] **Navbar Visibility**: Is navbar visible at the top?
- [ ] **Background Color**: Is navbar red (`bg-red-600` light mode, `bg-red-700` dark mode)?
- [ ] **Logo**: Is logo visible and clickable (links to home)?
- [ ] **Title**: Is "Admin Access Portal" visible on tablet+ screens?
- [ ] **Subtitle**: Is "Secure Authentication Required" visible on tablet+ screens?
- [ ] **Theme Toggle**: Does theme toggle button work correctly?
- [ ] **Back to Site**: Is "Back to Site" button visible and clickable?
- [ ] **Text Contrast**: Is text readable in both light and dark modes?
- [ ] **Responsive**: Is center title hidden on mobile screens?

### For Admin Navbar (Dashboard):

- [ ] **Navbar Visibility**: Is navbar visible at the top?
- [ ] **Background Color**: Is navbar red (`bg-red-600` light mode, `bg-red-700` dark mode)?
- [ ] **Logo**: Is logo visible and clickable (links to home)?
- [ ] **Admin Menu Button**: Is "Admin Menu" button visible on desktop?
- [ ] **Dropdown**: Does dropdown appear when clicking "Admin Menu"?
- [ ] **Menu Items**: Are all menu items visible in dropdown?
- [ ] **Navigation**: Do menu items navigate correctly?
- [ ] **Mobile Menu**: Does hamburger menu work on mobile?
- [ ] **Theme Toggle**: Does theme toggle button work correctly? (See Theme Testing Checklist below)
- [ ] **User Menu**: Is user menu visible when authenticated?
- [ ] **Text Contrast**: Is text readable in both light and dark modes?
- [ ] **Responsive**: Is menu button hidden on mobile, visible on desktop?

### Theme Toggle Testing Checklist (Comprehensive):

- [ ] **Button Visibility**:
  - [ ] Theme toggle button is visible in navbar
  - [ ] Button has aria-label "Toggle theme"
  - [ ] Button has title attribute ("Toggle theme" or "Switch to light/dark mode")

- [ ] **Icon Display**:
  - [ ] Button contains an SVG icon
  - [ ] Sun icon displayed in dark mode (to switch to light)
  - [ ] Moon icon displayed in light mode (to switch to dark)
  - [ ] Icon is visible and properly sized

- [ ] **Theme Switching**:
  - [ ] Click button switches theme (light ↔ dark)
  - [ ] HTML element gets/removes `dark` class correctly
  - [ ] Icon updates immediately after toggle
  - [ ] All UI elements adapt to new theme
  - [ ] Can toggle multiple times (light → dark → light → dark)
  - [ ] Theme state is consistent across page

- [ ] **Theme Persistence**:
  - [ ] Theme persists after page reload (F5)
  - [ ] Theme persists after browser restart
  - [ ] Theme persists after navigating away and back
  - [ ] localStorage contains theme preference (`localStorage.getItem('theme')`)
  - [ ] Theme loads correctly on initial page load

- [ ] **Visual Verification**:
  - [ ] Light mode: Light backgrounds, dark text, proper contrast
  - [ ] Dark mode: Dark backgrounds, light text, proper contrast
  - [ ] Navbar colors adapt correctly
  - [ ] Dashboard cards adapt correctly
  - [ ] All text is readable in both modes
  - [ ] No color conflicts or visibility issues

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

- **8GB RAM Test Configuration**: `Rest/markdown/docs/testing/8GB_RAM_TEST_CONFIG.md` - Detailed memory optimizations
- **Test Execution Guide**: `Rest/markdown/docs/testing/TEST_EXECUTION_GUIDE.md`
- **Test Plan**: `Rest/markdown/docs/testing/COMPREHENSIVE_TEST_PLAN.md`
- **Edge Cases**: `Rest/markdown/docs/testing/EDGE_CASES_AND_ERROR_HANDLING.md`
- **Task Details**: `Rest/markdown/docs/testing/tasks/`

---

## 🔧 Test Configuration Summary

### Current Test Status
- ✅ **Integration Tests**: 21/21 test suites passing, 88/88 tests passing
- ✅ **Unit Tests**: Optimized for 8GB RAM (1 worker, 768MB limit)
- ✅ **E2E Tests**: Optimized for 8GB RAM (1 worker, 1536MB limit)

### Memory Optimizations Applied
- Jest: Single worker, 768MB heap limit, 512MB worker idle limit
- Playwright: Single worker, 1536MB heap limit, sequential execution
- Dev Server: Light mode (1.5GB limit) for E2E tests
- All test scripts include memory limits in `package.json`

### Troubleshooting
If you encounter memory issues:
1. Use sequential mode: `npm run test:unit:sequential`
2. Disable cache: `JEST_NO_CACHE=true npm run test:unit`
3. Close other applications
4. Run tests selectively instead of all at once

---

## 🧪 Navbar Testing

### Admin Login Navbar Tests

**Unit Tests:**
```bash
npm run test:unit -- libs/shared-components/src/lib/auth/AdminLoginNavbar.test.tsx
```

**Integration Tests:**
```bash
npm run test:integration -- libs/shared-components/src/lib/auth/AdminLoginNavbar.integration.test.tsx
```

**E2E Tests (included in admin-login.spec.ts):**
```bash
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
```

**Manual Testing Checklist:**
- [ ] Navbar renders with red background
- [ ] Logo is visible and links to home
- [ ] "Admin Access Portal" title visible (tablet+)
- [ ] "Secure Authentication Required" subtitle visible (tablet+)
- [ ] Theme toggle button works
- [ ] "Back to Site" button works
- [ ] Text is readable in light mode
- [ ] Text is readable in dark mode
- [ ] Responsive: center title hidden on mobile

### Admin Dashboard Navbar Tests

**Unit Tests:**
```bash
npm run test:unit -- libs/shared-components/src/lib/components/admin/AdminNavbar.test.tsx
```

**Integration Tests:**
```bash
npm run test:integration -- libs/shared-components/src/lib/components/admin/AdminNavbar.integration.test.tsx
```

**E2E Tests (included in admin-dashboard.spec.ts):**
```bash
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts
```

**Manual Testing Checklist:**
- [ ] Navbar renders with red background
- [ ] Logo is visible and links to home
- [ ] "Admin Menu" button visible on desktop
- [ ] Dropdown opens when clicking "Admin Menu"
- [ ] All menu items visible in dropdown
- [ ] Menu items navigate correctly
- [ ] Mobile menu works (hamburger icon on mobile)
- [ ] Theme toggle button works
- [ ] Theme toggle switches between light/dark mode
- [ ] Theme persists after reload
- [ ] User menu visible when authenticated
- [ ] Text is readable in light mode
- [ ] Text is readable in dark mode
- [ ] Responsive: menu button hidden on mobile, visible on desktop
- [ ] All E2E tests pass (9 tests)
- [ ] Manual testing matches automated tests

---

---

## 🎯 Complete Test Coverage Summary

### Admin Dashboard - Full Test Coverage

**E2E Tests (9 tests total):**
1. [ ] **Page Load** - Dashboard loads correctly
2. [ ] **Statistics Display** - Stats cards render properly
3. [ ] **Admin Menu Dropdown** - Menu opens and displays all items
4. [ ] **Refresh Button** - Refresh functionality works
5. [ ] **Navigation** - Menu items navigate correctly
6. [ ] **Theme Toggle Button** - Button visible and accessible
7. [ ] **Theme Icon Display** - Correct icon shown (Sun/Moon)
8. [ ] **Theme Switching** - Full toggle cycle works (light ↔ dark)
9. [ ] **Theme Persistence** - Theme persists after reload

**Manual Testing Checklist:**
- [ ] Login flow works (from `/admin/login` to `/admin/dashboard`)
- [ ] Dashboard loads completely
- [ ] All statistics display correctly
- [ ] Admin Menu dropdown works
- [ ] All menu items visible and clickable
- [ ] Navigation to sub-pages works
- [ ] Refresh button updates stats
- [ ] Theme toggle button visible
- [ ] Theme switching works (light ↔ dark)
- [ ] Theme persists after reload
- [ ] All UI elements adapt to theme
- [ ] No console errors
- [ ] All API calls succeed

### Complete Flow Coverage

**From Login to Dashboard:**
1. [ ] Navigate to `/admin/login`
2. [ ] Enter credentials (from `.env.local`)
3. [ ] Submit form
4. [ ] Wait for redirect
5. [ ] Verify dashboard loads
6. [ ] Test all dashboard features
7. [ ] Test theme toggle
8. [ ] Test navigation
9. [ ] Verify persistence

**Theme Toggle Complete Flow:**
1. [ ] Button visible in navbar
2. [ ] Icon displays correctly (Sun/Moon)
3. [ ] Click toggles theme
4. [ ] UI adapts immediately
5. [ ] Icon updates
6. [ ] Reload persists theme
7. [ ] localStorage stores preference
8. [ ] Works across page navigation

**Admin Menu Complete Flow:**
1. [ ] Button visible on desktop
2. [ ] Click opens dropdown
3. [ ] All items visible
4. [ ] Click item navigates
5. [ ] Dropdown closes after navigation
6. [ ] Mobile menu works (hamburger)
7. [ ] Responsive behavior correct

---

**Last Updated**: 2025-01-27  
**Status**: Complete Guide - All integration tests passing ✅  
**Ready for**: Manual and automated testing workflow  
**Optimized for**: 8GB RAM Mac systems  
**Credentials**: Uses environment variables from `.env.local` (ADMIN_EMAIL, ADMIN_PASSWORD)  
**Test Coverage**: 9 E2E tests for Admin Dashboard (including 4 theme toggle tests) ✅

---

## 📝 File Organization Summary

### Key Changes Made:
1. **Reorganized Task Order** - Tasks now follow logical workflow:
   - Phase 1: Setup & Authentication (Task 2 → Task 3)
   - Phase 2: Content Creation (Task 1 - Add Questions)
   - Phase 3: Additional Features

2. **Empty Database State Documented**:
   - All sections updated to reflect starting with empty database
   - Stats cards showing **0** is now clearly marked as expected
   - Empty state messages clarified as expected, not errors

3. **Testing Order Clarified**:
   - Task 2 (Login) must be completed first
   - Task 3 (Dashboard) verified with empty database
   - Task 1 (Question Addition) populates the database

4. **Enhanced Documentation**:
   - Added Quick Start Guide section
   - Added warnings about empty database state
   - Updated all checklists to reflect empty → populated workflow

### Testing Workflow Summary:
```
1. Setup (.env.local) → 
2. Start Dev Server → 
3. Task 2: Login → 
4. Task 3: Dashboard (verify 0 counts) → 
5. Task 1: Add Questions (populate database) → 
6. Continue with remaining tasks
```

### Expected States:
- **Initial State**: 0 questions in database ✅
- **After Task 1**: Questions added, stats update ✅
- **Empty State Messages**: Expected, not errors ✅

---

## 🔄 What Needs to Be Updated in Automated Tests

Based on the comprehensive manual testing checklist above, here's what should be added/updated in automated tests:

### Task 1: Admin Bulk Question Addition - Test Updates Needed

#### E2E Tests (Split into focused test files)

**Test File Structure:**
- `admin-questions-page.basic.spec.ts` - Basic page loading tests
- `admin-questions-page.crud.spec.ts` - CRUD operations (create, read, update, delete)
- `admin-questions-page.search.spec.ts` - Search functionality
- `admin-questions-page.pagination.spec.ts` - Pagination controls
- `admin-questions-page.bulk.spec.ts` - Bulk upload and delete operations
- `admin-questions-page.stats.spec.ts` - Stats cards display
- `admin-questions-page.validation.spec.ts` - Form validation
- `admin-questions-page.setup.ts` - Shared setup and helper functions

**Original File (kept for reference):**
- `admin-bulk-question-addition.spec.ts` - Original monolithic file (3560+ lines)

**Note**: Files have been renamed from `admin-bulk-question-addition.*` to `admin-questions-page.*` to better reflect that they test the questions page.

**Benefits of Split Structure:**
- ✅ Easier debugging - smaller files make it easier to find and fix issues
- ✅ Faster development - run only the tests you need
- ✅ Better organization - related tests are grouped together
- ✅ Reduced serial mode issues - each file can run independently
- ✅ Shared setup - common beforeEach and helpers in one place
- ✅ No code duplication - environment setup centralized

**Current Coverage** (across all split files):
- ✅ Page loads (basic.spec.ts)
- ✅ Questions list displays (basic.spec.ts)
- ✅ Add New Question button exists (basic.spec.ts)
- ✅ Search functionality exists (search.spec.ts)
- ✅ Pagination controls exist (pagination.spec.ts)

**Missing Coverage** (Should be added):

1. **CRUD Operations**:
   - [ ] **Create Question Test**: 
     - Open create modal
     - Fill form with all fields
     - Submit and verify question created
     - Verify question appears in list
     - Verify stats update
   - [ ] **View Question Test**:
     - Click view button
     - Verify modal opens
     - Verify all question details displayed
     - Close modal
   - [ ] **Edit Question Test**:
     - Open edit modal
     - Verify form pre-filled
     - Modify fields
     - Save and verify updated
     - Verify changes persist
   - [ ] **Delete Question Test**:
     - Click delete button
     - Verify confirmation dialog
     - Cancel deletion → Verify question NOT deleted
     - Delete question → Verify removed from list
     - Verify stats update

2. **Search Functionality**:
   - [ ] Test search filters questions correctly
   - [ ] Test search with non-existent term → Verify "No questions found"
   - [ ] Test search is case-insensitive
   - [ ] Test clearing search restores all questions

3. **Pagination**:
   - [ ] Test pagination navigation (next/previous)
   - [ ] Test page size selection (5, 10, 20, 50, 100)
   - [ ] Test pagination buttons disabled on first/last page
   - [ ] Test pagination after creating question
   - [ ] Test pagination after deleting question

4. **Stats Cards**:
   - [ ] Verify Total Questions count is correct
   - [ ] Verify Categories count is correct
   - [ ] Verify Active Questions count is correct
   - [ ] Verify Filtered Results count updates with search

5. **Form Validation**:
   - [ ] Test submitting empty form → Verify validation errors
   - [ ] Test submitting with only title → Verify content required
   - [ ] Test all required fields validation

6. **Badges Display**:
   - [ ] Verify topic badges display correctly
   - [ ] Verify category badges display correctly
   - [ ] Verify difficulty badges display correctly
   - [ ] Verify "No Topic/Category/Card" badges for empty fields

7. **Theme Toggle**:
   - [ ] Test theme toggle on questions page
   - [ ] Verify all elements adapt to theme
   - [ ] Verify theme persists after reload

8. **Error Handling**:
   - [ ] Test API error handling (simulate 500 error)
   - [ ] Test network error handling
   - [ ] Verify error messages display correctly

9. **Responsive Design**:
   - [ ] Test mobile viewport (375px)
   - [ ] Test tablet viewport (768px)
   - [ ] Verify layout adapts correctly

10. **Bulk Operations**:
    - [ ] Test bulk upload CSV file
    - [ ] Test bulk upload JSON file
    - [ ] Test invalid file upload → Verify error
    - [ ] Test bulk delete with single selection
    - [ ] Test bulk delete with multiple selections
    - [ ] Test bulk delete with "Select All"
    - [ ] Test bulk delete confirmation modal
    - [ ] Test bulk delete cancellation
    - [ ] Verify bulk delete updates list without page reload

#### Integration Tests (`apps/website/src/app/admin/content/questions/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test form submission with all fields
- [ ] Test form validation errors
- [ ] Test API error responses
- [ ] Test pagination state changes
- [ ] Test search state changes
- [ ] Test stats calculation

#### Unit Tests (`apps/website/src/app/admin/content/questions/page.test.tsx`)

**Missing Coverage**:
- [ ] Test QuestionForm component rendering
- [ ] Test form field validation
- [ ] Test modal open/close
- [ ] Test badge rendering logic
- [ ] Test pagination calculations
- [ ] Test search filtering logic

### Task 2: Admin Login - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-login.spec.ts`)

**Current Coverage**: Basic login flow tests exist

**Missing Coverage**:
- [ ] **Navbar Testing**:
  - [ ] Verify navbar renders with red background
  - [ ] Verify logo is visible and clickable
  - [ ] Verify "Admin Access Portal" title visible (tablet+)
  - [ ] Verify "Secure Authentication Required" subtitle visible (tablet+)
  - [ ] Verify theme toggle button works
  - [ ] Verify "Back to Site" button works
  - [ ] Verify navbar responsive behavior
- [ ] **Form Validation Edge Cases**:
  - [ ] Test email format validation (invalid formats)
  - [ ] Test password length requirements (if any)
  - [ ] Test submitting form with only email
  - [ ] Test submitting form with only password
  - [ ] Test XSS attempts in form fields
- [ ] **Error Handling**:
  - [ ] Test with network offline → Verify error message
  - [ ] Test with API timeout → Verify timeout handling
  - [ ] Test with 500 server error → Verify error message
  - [ ] Test with 401 unauthorized → Verify error message
- [ ] **Session Management**:
  - [ ] Test login persistence after page reload
  - [ ] Test logout functionality
  - [ ] Test redirect after logout
- [ ] **Accessibility**:
  - [ ] Test keyboard navigation (Tab through form)
  - [ ] Test Enter key submits form
  - [ ] Test ARIA labels present
  - [ ] Test screen reader compatibility

#### Integration Tests (`apps/website/src/app/admin/login/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test form state management
- [ ] Test error state handling
- [ ] Test loading state during submission
- [ ] Test redirect after successful login

#### Unit Tests (`apps/website/src/app/admin/login/page.test.tsx`)

**Missing Coverage**:
- [ ] Test AdminLoginNavbar component rendering
- [ ] Test form field validation logic
- [ ] Test error message display
- [ ] Test loading state display

### Task 3: Admin Dashboard - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-dashboard.spec.ts`)

**Current Coverage**: 9 tests including theme toggle (good coverage)

**Missing Coverage**:
- [ ] **Stats Cards Detailed Testing**:
  - [ ] Verify each stat card displays correct data
  - [ ] Verify stats update after operations
  - [ ] Test stats with zero values
  - [ ] Test stats with large numbers
- [ ] **Menu Navigation**:
  - [ ] Test all menu items navigate correctly
  - [ ] Test menu closes after navigation
  - [ ] Test mobile menu (hamburger) functionality
- [ ] **Refresh Button**:
  - [ ] Test refresh updates stats
  - [ ] Test refresh loading state
  - [ ] Test refresh error handling
- [ ] **Quick Actions**:
  - [ ] Test "Add New Question" quick action
  - [ ] Test "Manage Learning Cards" quick action
  - [ ] Test all quick action buttons
- [ ] **Error States**:
  - [ ] Test dashboard with API errors
  - [ ] Test dashboard with no data
  - [ ] Test error recovery

#### Integration Tests (`apps/website/src/app/admin/dashboard/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test stats calculation logic
- [ ] Test menu state management
- [ ] Test refresh functionality
- [ ] Test error handling

### Task 4: Content Management - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-content-management.spec.ts`)

**Current Status**: Basic tests exist, but need expansion

**Missing Coverage**:

1. **Cards Management CRUD**:
   - [ ] **Create Card**: Fill form, submit, verify card created
   - [ ] **View Card**: Click view, verify details displayed
   - [ ] **Edit Card**: Modify fields, save, verify updated
   - [ ] **Delete Card**: Delete with confirmation, verify removed
   - [ ] **Card Validation**: Test required fields, invalid data

2. **Plans Management CRUD**:
   - [ ] **Create Plan**: Fill form, submit, verify plan created
   - [ ] **View Plan**: Click view, verify plan details
   - [ ] **Edit Plan**: Modify plan, save, verify updated
   - [ ] **Delete Plan**: Delete with confirmation, verify removed
   - [ ] **Plan Validation**: Test required fields, relationships

3. **Categories Management CRUD**:
   - [ ] **Create Category**: Add category, verify created
   - [ ] **View Category**: View category details
   - [ ] **Edit Category**: Modify category, verify updated
   - [ ] **Delete Category**: Delete category, verify removed
   - [ ] **Category Validation**: Test unique names, required fields

4. **Topics Management CRUD**:
   - [ ] **Create Topic**: Add topic under category, verify created
   - [ ] **View Topic**: View topic details
   - [ ] **Edit Topic**: Modify topic, verify updated
   - [ ] **Delete Topic**: Delete topic, verify removed
   - [ ] **Topic Validation**: Test category relationship, required fields

5. **Questions Management (within content management)**:
   - [ ] **Create Question**: Add question, verify created
   - [ ] **View Question**: View question details
   - [ ] **Edit Question**: Modify question, verify updated
   - [ ] **Delete Question**: Delete question, verify removed

6. **Bulk Operations** (if implemented):
   - [ ] Test bulk delete for each entity type
   - [ ] Test bulk update (if available)
   - [ ] Test bulk export (if available)
   - [ ] Test bulk import (if available)

7. **Stats Display**:
   - [ ] Verify total cards count
   - [ ] Verify total plans count
   - [ ] Verify total categories count
   - [ ] Verify total topics count
   - [ ] Verify total questions count
   - [ ] Verify stats update after CRUD operations

8. **Navigation Between Sections**:
   - [ ] Test switching between Cards/Plans/Categories/Topics tabs
   - [ ] Test navigation maintains state
   - [ ] Test breadcrumb navigation (if exists)

9. **Search & Filter**:
   - [ ] Test search within each entity type
   - [ ] Test filtering by category/topic
   - [ ] Test sorting options

#### Integration Tests (`apps/website/src/app/admin/content-management/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test CRUD API calls for each entity type
- [ ] Test form validation for all entity types
- [ ] Test stats calculation
- [ ] Test navigation state management
- [ ] Test error handling for each operation

#### Unit Tests (`apps/website/src/app/admin/content-management/page.test.tsx`)

**Missing Coverage**:
- [ ] Test each entity form component
- [ ] Test entity list rendering
- [ ] Test stats card components
- [ ] Test navigation tabs component
- [ ] Test search/filter logic

### Task 5: Frontend Tasks Management - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-frontend-tasks.spec.ts`)

**Current Status**: Basic tests exist, but need expansion

**Missing Coverage**:

1. **Complete CRUD Flow**:
   - [ ] **Create Task**: Fill all fields (title, description, difficulty, instructions, starter code, test cases, solution), submit, verify created
   - [ ] **View Task**: Click view, verify all task details displayed
   - [ ] **Edit Task**: Modify all fields, save, verify updated
   - [ ] **Delete Task**: Delete with confirmation, verify removed

2. **Task Details View**:
   - [ ] Verify all task fields displayed correctly
   - [ ] Verify code blocks formatted correctly
   - [ ] Verify test cases displayed
   - [ ] Verify solution code displayed (if visible to admin)

3. **Task Validation**:
   - [ ] Test required fields (title, description)
   - [ ] Test difficulty selection required
   - [ ] Test instructions field validation
   - [ ] Test starter code format validation
   - [ ] Test test cases format validation
   - [ ] Test solution code format validation

4. **Search/Filter Functionality**:
   - [ ] Test search by title
   - [ ] Test search by description
   - [ ] Test filter by difficulty level
   - [ ] Test filter by status (if exists)
   - [ ] Test combined search and filter
   - [ ] Test clearing filters

5. **Difficulty Level Filtering**:
   - [ ] Test filter by "beginner"
   - [ ] Test filter by "intermediate"
   - [ ] Test filter by "advanced"
   - [ ] Test "all difficulties" option

6. **Status Filtering** (if implemented):
   - [ ] Test filter by active/inactive
   - [ ] Test filter by published/draft
   - [ ] Test status indicators display

7. **Pagination** (if applicable):
   - [ ] Test pagination controls
   - [ ] Test page size selection
   - [ ] Test navigation between pages

8. **Bulk Operations** (if implemented):
   - [ ] Test bulk delete
   - [ ] Test bulk status change
   - [ ] Test bulk difficulty update

#### Integration Tests (`apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test CRUD API calls
- [ ] Test form validation logic
- [ ] Test search/filter API calls
- [ ] Test pagination API calls
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/admin/frontend-tasks/page.test.tsx`)

**Missing Coverage**:
- [ ] Test task form component
- [ ] Test task list component
- [ ] Test task details component
- [ ] Test filter components
- [ ] Test validation logic

### Task 6: Problem Solving Management - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-problem-solving.spec.ts`)

**Missing Coverage** (Similar to Task 5):
- [ ] Complete CRUD flow for problem-solving tasks
- [ ] Task details view
- [ ] Task validation (all fields)
- [ ] Search/filter functionality
- [ ] Difficulty level filtering
- [ ] Category/topic filtering
- [ ] Pagination (if applicable)
- [ ] Bulk operations (if implemented)

#### Integration Tests (`apps/website/src/app/admin/problem-solving/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test CRUD API calls
- [ ] Test form validation
- [ ] Test search/filter
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/admin/problem-solving/page.test.tsx`)

**Missing Coverage**:
- [ ] Test problem form component
- [ ] Test problem list component
- [ ] Test validation logic

### Task 7: User Management - Test Updates Needed

#### E2E Tests (`tests/e2e/admin/admin-user-management.spec.ts`)

**Missing Coverage**:

1. **User List Display**:
   - [ ] Verify user list loads
   - [ ] Verify user details displayed (email, name, role, status)
   - [ ] Verify pagination (if applicable)
   - [ ] Verify search functionality

2. **User CRUD Operations**:
   - [ ] **Create User**: Fill form, submit, verify user created
   - [ ] **View User**: Click view, verify user details
   - [ ] **Edit User**: Modify user details, save, verify updated
   - [ ] **Delete User**: Delete with confirmation, verify removed

3. **User Role Management**:
   - [ ] Test changing user role (admin/user)
   - [ ] Test role dropdown works
   - [ ] Test role changes persist

4. **User Status Management**:
   - [ ] Test activating/deactivating users
   - [ ] Test status indicators display
   - [ ] Test status changes persist

5. **Search & Filter**:
   - [ ] Test search by email
   - [ ] Test search by name
   - [ ] Test filter by role
   - [ ] Test filter by status

6. **User Validation**:
   - [ ] Test email format validation
   - [ ] Test required fields
   - [ ] Test duplicate email prevention

#### Integration Tests (`apps/website/src/app/admin/users/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test user CRUD API calls
- [ ] Test role management API calls
- [ ] Test status management API calls
- [ ] Test search/filter API calls
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/admin/users/page.test.tsx`)

**Missing Coverage**:
- [ ] Test user form component
- [ ] Test user list component
- [ ] Test role selector component
- [ ] Test validation logic

### Task 8: Custom Roadmap Creation - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/custom-roadmap-creation.spec.ts`)

**Missing Coverage**:

1. **Roadmap Creation Flow**:
   - [ ] Navigate to custom roadmap page
   - [ ] Fill plan name
   - [ ] Fill description
   - [ ] Select cards
   - [ ] Select categories
   - [ ] Select topics
   - [ ] Select questions
   - [ ] Click "Save Plan"
   - [ ] Verify plan saved
   - [ ] Verify redirect to `/my-plans`

2. **Form Validation**:
   - [ ] Test required fields (name)
   - [ ] Test name length limits
   - [ ] Test description length limits
   - [ ] Test at least one selection required (cards/categories/topics/questions)

3. **Selection Functionality**:
   - [ ] Test card selection (single/multiple)
   - [ ] Test category selection
   - [ ] Test topic selection
   - [ ] Test question selection
   - [ ] Test clearing selections
   - [ ] Test selection counts update

4. **Plan Persistence**:
   - [ ] Verify plan saved to localStorage
   - [ ] Verify plan appears in `/my-plans`
   - [ ] Verify plan persists after page reload

5. **Error Handling**:
   - [ ] Test saving with no selections → Verify error
   - [ ] Test network error → Verify error message
   - [ ] Test validation errors display

#### Integration Tests (`apps/website/src/app/custom-roadmap/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test form submission
- [ ] Test selection state management
- [ ] Test localStorage operations
- [ ] Test validation logic
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/custom-roadmap/page.test.tsx`)

**Missing Coverage**:
- [ ] Test roadmap form component
- [ ] Test selection components
- [ ] Test validation logic
- [ ] Test localStorage operations

### Task 9: My Plans - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/my-plans.spec.ts`)

**Missing Coverage**:

1. **Plans List Display**:
   - [ ] Verify plans load from localStorage
   - [ ] Verify plan cards display correctly
   - [ ] Verify plan details shown (name, description, item counts)
   - [ ] Verify empty state when no plans

2. **Plan Actions**:
   - [ ] **View Plan**: Click plan, verify details displayed
   - [ ] **Edit Plan**: Click edit, modify, save, verify updated
   - [ ] **Delete Plan**: Click delete, confirm, verify removed
   - [ ] **Start Plan**: Click start, verify navigation to practice

3. **Plan Details View**:
   - [ ] Verify all plan items displayed
   - [ ] Verify cards listed
   - [ ] Verify categories listed
   - [ ] Verify topics listed
   - [ ] Verify questions listed

4. **Plan Management**:
   - [ ] Test creating new plan from this page
   - [ ] Test editing existing plan
   - [ ] Test deleting plan with confirmation
   - [ ] Test plan persistence

#### Integration Tests (`apps/website/src/app/my-plans/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test localStorage read operations
- [ ] Test localStorage write operations
- [ ] Test plan CRUD operations
- [ ] Test plan display logic

#### Unit Tests (`apps/website/src/app/my-plans/page.test.tsx`)

**Missing Coverage**:
- [ ] Test plan list component
- [ ] Test plan card component
- [ ] Test plan details component
- [ ] Test localStorage operations

### Task 10: Browse Practice Questions - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/browse-practice-questions.spec.ts`)

**Missing Coverage**:

1. **Questions Display**:
   - [ ] Verify questions load
   - [ ] Verify question cards display correctly
   - [ ] Verify question details shown
   - [ ] Verify pagination (if applicable)

2. **Filtering**:
   - [ ] Test filter by category
   - [ ] Test filter by difficulty
   - [ ] Test filter by topic
   - [ ] Test combined filters
   - [ ] Test clearing filters

3. **Search**:
   - [ ] Test search by question title
   - [ ] Test search by content
   - [ ] Test search results update
   - [ ] Test clearing search

4. **Question Interaction**:
   - [ ] Click question → Verify details displayed
   - [ ] Test answer reveal
   - [ ] Test question navigation (next/previous)
   - [ ] Test marking question as complete

5. **Progress Tracking**:
   - [ ] Verify progress updates
   - [ ] Verify completed questions marked
   - [ ] Verify progress persists

#### Integration Tests (`apps/website/src/app/browse-practice-questions/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test questions API calls
- [ ] Test filter API calls
- [ ] Test search API calls
- [ ] Test progress tracking API calls
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/browse-practice-questions/page.test.tsx`)

**Missing Coverage**:
- [ ] Test question list component
- [ ] Test filter components
- [ ] Test search component
- [ ] Test progress tracking logic

### Task 11: Learning Paths - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/learning-paths-practice.spec.ts`)

**Missing Coverage**:

1. **Learning Paths Display**:
   - [ ] Verify learning paths load
   - [ ] Verify path cards display
   - [ ] Verify path details shown

2. **Path Selection**:
   - [ ] Click path → Verify path details
   - [ ] Test starting a path
   - [ ] Test path navigation

3. **Path Progress**:
   - [ ] Verify progress tracking
   - [ ] Verify completed steps marked
   - [ ] Verify progress persists

4. **Path Content**:
   - [ ] Verify path steps displayed
   - [ ] Verify step completion
   - [ ] Verify navigation between steps

#### Integration Tests (`apps/website/src/app/learning-paths/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test paths API calls
- [ ] Test path selection
- [ ] Test progress tracking
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/learning-paths/page.test.tsx`)

**Missing Coverage**:
- [ ] Test path list component
- [ ] Test path card component
- [ ] Test progress tracking component

### Task 12: Frontend Tasks (User-Facing) - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/frontend-tasks-practice.spec.ts`)

**Missing Coverage**:

1. **Tasks Display**:
   - [ ] Verify tasks load
   - [ ] Verify task cards display
   - [ ] Verify task details shown

2. **Task Practice**:
   - [ ] Select task → Verify task details
   - [ ] Test code editor (if exists)
   - [ ] Test submitting solution
   - [ ] Test viewing solution
   - [ ] Test test case execution

3. **Task Filtering**:
   - [ ] Test filter by difficulty
   - [ ] Test filter by category
   - [ ] Test search functionality

4. **Progress Tracking**:
   - [ ] Verify completed tasks marked
   - [ ] Verify progress updates
   - [ ] Verify progress persists

#### Integration Tests (`apps/website/src/app/frontend-tasks/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test tasks API calls
- [ ] Test solution submission
- [ ] Test test case execution
- [ ] Test progress tracking

#### Unit Tests (`apps/website/src/app/frontend-tasks/page.test.tsx`)

**Missing Coverage**:
- [ ] Test task list component
- [ ] Test task details component
- [ ] Test code editor component (if exists)
- [ ] Test solution submission logic

### Task 13: Problem Solving (User-Facing) - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/problem-solving-practice.spec.ts`)

**Missing Coverage** (Similar to Task 12):
- [ ] Tasks display
- [ ] Task practice flow
- [ ] Solution submission
- [ ] Test case execution
- [ ] Filtering and search
- [ ] Progress tracking

#### Integration Tests (`apps/website/src/app/problem-solving/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test tasks API calls
- [ ] Test solution submission
- [ ] Test progress tracking

#### Unit Tests (`apps/website/src/app/problem-solving/page.test.tsx`)

**Missing Coverage**:
- [ ] Test task components
- [ ] Test solution logic

### Task 14-16: Flashcards - Test Updates Needed

#### E2E Tests (`tests/e2e/freestyle-flow/flashcards.spec.ts`)

**Missing Coverage**:

1. **Flashcards Display**:
   - [ ] Verify flashcards load
   - [ ] Verify flashcard cards display
   - [ ] Verify flashcard content shown

2. **Theme Filter**:
   - [ ] Test filter by theme (HTML, CSS, JavaScript, etc.)
   - [ ] Test filter updates display
   - [ ] Test clearing filter

3. **Difficulty Filter**:
   - [ ] Test filter by difficulty (Easy, Medium, Hard)
   - [ ] Test filter updates display
   - [ ] Test combined theme + difficulty filter

4. **Practice Modes**:
   - [ ] **List Mode**: Verify all flashcards visible
   - [ ] **Flip Mode**: Click card → Verify flip animation, back side shown
   - [ ] **Quiz Mode**: Answer questions, verify scoring

5. **CRUD Operations**:
   - [ ] **Create**: Add new flashcard, verify created
   - [ ] **Read**: View flashcard details
   - [ ] **Update**: Edit flashcard, verify updated
   - [ ] **Delete**: Delete flashcard, verify removed

6. **Flashcard Interaction**:
   - [ ] Test flipping cards
   - [ ] Test marking as learned
   - [ ] Test navigation between cards
   - [ ] Test shuffle functionality (if exists)

#### Integration Tests (`apps/website/src/app/flashcards/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test flashcards API calls
- [ ] Test filter API calls
- [ ] Test CRUD API calls
- [ ] Test practice mode logic
- [ ] Test error handling

#### Unit Tests (`apps/website/src/app/flashcards/page.test.tsx`)

**Missing Coverage**:
- [ ] Test flashcard list component
- [ ] Test flashcard card component
- [ ] Test filter components
- [ ] Test practice mode components
- [ ] Test CRUD form components

### Task 17: Homepage - Test Coverage Complete ✅

#### E2E Tests (`tests/e2e/guided-flow/homepage-to-guided.spec.ts`)

**✅ Complete Coverage**:

1. **G-E2E-001: Homepage Basic Navigation** ✅
   - ✅ Verify homepage loads without errors
   - ✅ Verify navigation to `/get-started` when default CTA is clicked
   - ✅ Verify navigation to `/learn` when "Explore Learning Paths" is clicked

2. **G-E2E-002: Learning Style Selection** ✅
   - ✅ Verify learning style selection section displays
   - ✅ Verify Guided Learning card navigates to `/features/guided-learning`
   - ✅ Verify Free Style Learning card navigates to `/browse-practice-questions`
   - ✅ Verify userType persistence in localStorage

3. **G-E2E-003: Personalized Content Display** ✅
   - ✅ Verify default content when no userType is set
   - ✅ Verify guided content when userType is "guided"
   - ✅ Verify self-directed content when userType is "self-directed"
   - ✅ Verify active plan content when guided user has active plan

4. **G-E2E-004: User Statistics Display** ✅
   - ✅ Verify UserStatistics component is visible

5. **G-E2E-005: Complete User Flow from Homepage** ✅
   - ✅ Verify complete flow: homepage → get-started → guided learning
   - ✅ Verify complete flow: homepage → learning style selection → guided learning
   - ✅ Verify complete flow: homepage → learning style selection → freestyle learning

6. **G-E2E-006: Active Plan Integration** ✅
   - ✅ Verify continue practice button displays when active plan exists
   - ✅ Verify navigation to guided practice when continue button is clicked

#### Integration Tests (`apps/website/src/app/page.integration.test.tsx`)

**✅ Complete Coverage**:

1. **G-IT-001: Navigation Flows** ✅
   - ✅ Test all CTA buttons and links navigate correctly
   - ✅ Test navigation paths for all user types
   - ✅ Test active plan navigation

2. **G-IT-002: Learning Style Selection Interactions** ✅
   - ✅ Test Guided Learning card click sets userType and navigates
   - ✅ Test Free Style Learning card click sets userType and navigates

3. **G-IT-003: User Type Changes and Content Updates** ✅
   - ✅ Test content updates when userType changes
   - ✅ Test final CTA section visibility based on userType

4. **G-IT-004: Active Plan Detection and Display** ✅
   - ✅ Test active plan detection from localStorage
   - ✅ Test active plan display with plan details
   - ✅ Test default content when no active plan

5. **G-IT-005: Authentication State Integration** ✅
   - ✅ Test content display for authenticated/unauthenticated users
   - ✅ Test personalized content for different user types

#### Unit Tests (`apps/website/src/app/page.test.tsx`)

**✅ Complete Coverage**:

1. **G-UT-001: Homepage Renders Correctly** ✅
   - ✅ Test basic rendering without errors
   - ✅ Test all required elements render
   - ✅ Test learning style selection section renders

2. **G-UT-002: Personalized Content Based on UserType** ✅
   - ✅ Test default content (userType is null)
   - ✅ Test guided content (no active plan)
   - ✅ Test guided content (with active plan)
   - ✅ Test self-directed content

3. **G-UT-003: Learning Style Selection Cards** ✅
   - ✅ Test Guided Learning card renders with correct content
   - ✅ Test Free Style Learning card renders with correct content
   - ✅ Test card highlighting based on userType

4. **G-UT-004: Conditional Rendering Based on UserType** ✅
   - ✅ Test final CTA section visibility
   - ✅ Test user type specific content sections

5. **G-UT-005: Active Plan Detection** ✅
   - ✅ Test active plan detection from localStorage
   - ✅ Test invalid JSON handling
   - ✅ Test localStorage cleanup for invalid data
   - ✅ Test missing active plan key handling
   - ✅ Test empty active plan string handling
   - ✅ All tests use `setupLocalStorage()` and `clearLocalStorage()` helpers

6. **G-UT-SNAPSHOT: Homepage Snapshot Tests** ✅
   - ✅ Snapshot tests for all user states (unauthenticated, guided, self-directed, with active plan)
   - ✅ All snapshot tests properly set up localStorage before capturing
   - ✅ Timers advanced to 2000ms to ensure animations complete

**📊 Test Statistics:**
- **Unit Tests**: 5 test suites + snapshot tests (all with localStorage helpers)
- **Integration Tests**: 5 test suites (all verify localStorage persistence)
- **E2E Tests**: 6 test suites (all clear localStorage after each test)
- **Total Test Coverage**: Comprehensive coverage of all homepage features including localStorage dependencies

**🔧 localStorage Testing Improvements:**
- ✅ **Helper Functions**: `setupLocalStorage()` and `clearLocalStorage()` added to all test files
- ✅ **Edge Cases**: Tests cover invalid JSON, missing keys, empty strings
- ✅ **Persistence**: Tests verify localStorage values persist across interactions
- ✅ **Cleanup**: All tests clear localStorage after completion to prevent test pollution
- ✅ **E2E Tests**: Added `afterEach` hooks to clear localStorage after each test
- ✅ **New Test Cases**: Added tests for invalid JSON handling, missing keys, and persistence across reloads

### Task 18: Get Started - Test Updates Needed

#### E2E Tests (`tests/e2e/guided-flow/get-started-unauthenticated.spec.ts`, `get-started-authenticated.spec.ts`)

**Missing Coverage**:

1. **Page Display**:
   - [ ] Verify page loads
   - [ ] Verify "Choose Your Learning Style" heading visible
   - [ ] Verify both options displayed
   - [ ] Verify option cards styled correctly

2. **Option Selection**:
   - [ ] **"I need guidance" Option**:
     - [ ] Click card → Verify loading transition
     - [ ] Verify "Great choice!" feedback
     - [ ] Verify redirects to `/features/guided-learning`
   - [ ] **"I'm self-directed" Option**:
     - [ ] Click card → Verify loading transition
     - [ ] Verify feedback appears
     - [ ] Verify redirects to `/browse-practice-questions`

3. **Visual Feedback**:
   - [ ] Verify card selected state (border-indigo-500)
   - [ ] Verify checkmark icon appears
   - [ ] Verify "Great choice!" message appears
   - [ ] Verify loading state displays

4. **Theme Toggle**:
   - [ ] Test theme toggle on get-started page
   - [ ] Verify all elements adapt to theme

5. **Responsive Design**:
   - [ ] Test mobile viewport → Verify cards stack vertically
   - [ ] Test tablet viewport → Verify layout adapts

#### Integration Tests (`apps/website/src/app/get-started/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test option selection logic
- [ ] Test navigation logic
- [ ] Test loading state management
- [ ] Test user type persistence

#### Unit Tests (`apps/website/src/app/get-started/page.test.tsx`)

**Missing Coverage**:
- [ ] Test option card components
- [ ] Test selection logic
- [ ] Test navigation logic

### Task 18b: Guided Learning Page - Test Updates Needed

#### E2E Tests (`tests/e2e/guided-flow/guided-learning-page.spec.ts`)

**Missing Coverage**:

1. **Page Display**:
   - [ ] Verify page loads
   - [ ] Verify "Choose Your Learning Journey" heading visible
   - [ ] Verify quick stats section displayed
   - [ ] Verify learning plans load

2. **Quick Stats**:
   - [ ] Verify "Questions per Plan" stat displayed
   - [ ] Verify "Days Available" stat displayed
   - [ ] Verify "Success Rate" stat displayed
   - [ ] Verify stats show correct values

3. **Sign-in CTA** (for unauthenticated users):
   - [ ] Verify sign-in banner visible (if not authenticated)
   - [ ] Verify benefits listed
   - [ ] Verify "Create free account" button clickable
   - [ ] Test button navigation

4. **Learning Plans Display**:
   - [ ] Verify plans load (may show loading state initially)
   - [ ] Verify plan cards displayed
   - [ ] Verify each plan shows: name, duration, difficulty, questions count
   - [ ] Verify plans are clickable

5. **Plan Selection**:
   - [ ] Click plan card → Verify navigation or modal
   - [ ] Verify plan details displayed
   - [ ] Test starting a plan

6. **Theme Toggle**:
   - [ ] Test theme toggle on guided learning page
   - [ ] Verify all content adapts to theme

7. **Responsive Design**:
   - [ ] Test mobile viewport → Verify stats stack vertically
   - [ ] Test tablet viewport → Verify layout adapts

#### Integration Tests (`apps/website/src/app/features/guided-learning/page.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test plans API calls
- [ ] Test stats calculation
- [ ] Test plan selection logic
- [ ] Test authentication check

#### Unit Tests (`apps/website/src/app/features/guided-learning/page.test.tsx`)

**Missing Coverage**:
- [ ] Test plan list component
- [ ] Test plan card component
- [ ] Test stats component
- [ ] Test sign-in banner component

### Task 19: Navigation Component - Test Updates Needed

#### E2E Tests (`tests/e2e/shared-components/navigation.spec.ts`)

**Missing Coverage**:

1. **Navigation Rendering**:
   - [ ] Verify navbar renders on all pages
   - [ ] Verify logo visible and clickable
   - [ ] Verify navigation links displayed
   - [ ] Verify theme toggle button visible

2. **Navigation Links**:
   - [ ] Test each link navigates correctly
   - [ ] Test active link highlighting
   - [ ] Test mobile menu (hamburger) functionality

3. **Theme Toggle**:
   - [ ] Test theme toggle in navigation
   - [ ] Verify theme persists

4. **Responsive Behavior**:
   - [ ] Test mobile menu opens/closes
   - [ ] Test desktop menu displays
   - [ ] Test navigation adapts to viewport

#### Integration Tests (`libs/shared-components/src/lib/common/Navigation.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test navigation state management
- [ ] Test active link logic
- [ ] Test mobile menu state
- [ ] Test theme toggle integration

#### Unit Tests (`libs/shared-components/src/lib/common/Navigation.test.tsx`)

**Missing Coverage**:
- [ ] Test navigation component rendering
- [ ] Test link components
- [ ] Test mobile menu component
- [ ] Test theme toggle component

### Task 20: Question Card Component - Test Updates Needed

#### E2E Tests (`tests/e2e/shared-components/question-card.spec.ts`)

**Missing Coverage**:

1. **Question Card Display**:
   - [ ] Verify question card renders
   - [ ] Verify question title displayed
   - [ ] Verify question content displayed
   - [ ] Verify badges displayed (category, difficulty, type)

2. **Question Interaction**:
   - [ ] Click card → Verify details displayed
   - [ ] Test answer reveal
   - [ ] Test question actions (if any)

3. **Badges Display**:
   - [ ] Verify category badge displays
   - [ ] Verify difficulty badge displays
   - [ ] Verify type badge displays
   - [ ] Verify badge colors correct

4. **Theme Adaptation**:
   - [ ] Test card adapts to theme
   - [ ] Verify text readable in both themes

#### Integration Tests (`apps/website/src/components/QuestionDisplay.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test question card rendering
- [ ] Test interaction logic
- [ ] Test badge rendering logic

#### Unit Tests (`apps/website/src/components/QuestionDisplay.test.tsx`)

**Missing Coverage**:
- [ ] Test question card component
- [ ] Test badge components
- [ ] Test interaction handlers

### Task 21: Progress Tracker Component - Test Updates Needed

#### E2E Tests (`tests/e2e/shared-components/progress-tracker.spec.ts`)

**Missing Coverage**:

1. **Progress Display**:
   - [ ] Verify progress tracker renders
   - [ ] Verify progress bar displays
   - [ ] Verify percentage displayed correctly
   - [ ] Verify progress updates

2. **Progress Updates**:
   - [ ] Test progress increases
   - [ ] Test progress decreases
   - [ ] Test progress reaches 100%
   - [ ] Test progress animation (if exists)

3. **Visual States**:
   - [ ] Verify progress bar color changes
   - [ ] Verify progress bar fills correctly
   - [ ] Verify text updates

4. **Theme Adaptation**:
   - [ ] Test progress tracker adapts to theme
   - [ ] Verify colors readable in both themes

#### Integration Tests (`libs/shared-components/src/lib/common/ProgressTracker.integration.test.tsx`)

**Missing Coverage**:
- [ ] Test progress calculation logic
- [ ] Test progress updates
- [ ] Test animation logic

#### Unit Tests (`libs/shared-components/src/lib/common/ProgressTracker.test.tsx`)

**Missing Coverage**:
- [ ] Test progress tracker component
- [ ] Test progress bar component
- [ ] Test percentage display component

### General Test Improvements Needed

1. **Error Handling Tests**:
   - [ ] Add tests for all API error scenarios (400, 401, 403, 404, 500)
   - [ ] Add tests for network failures
   - [ ] Add tests for timeout scenarios

2. **Accessibility Tests**:
   - [ ] Add tests for keyboard navigation
   - [ ] Add tests for screen reader compatibility
   - [ ] Add tests for ARIA labels

3. **Performance Tests**:
   - [ ] Add tests for large datasets (1000+ questions)
   - [ ] Add tests for pagination performance
   - [ ] Add tests for search performance

4. **Cross-Browser Tests**:
   - [ ] Currently only Chrome is tested
   - [ ] Add Firefox tests
   - [ ] Add Safari tests (if on Mac)

5. **Snapshot Tests**:
   - [ ] Add snapshot tests for question list
   - [ ] Add snapshot tests for modals
   - [ ] Add snapshot tests for stats cards

### Recommended Test File Structure

```
tests/e2e/admin/
├── admin-questions-page.setup.ts (Shared setup)
│   ├── Environment variable loading
│   ├── setupAdminPage function
│   ├── createQuestion helper
│   └── bulkDeleteQuestions helper
├── admin-questions-page.basic.spec.ts ✅ (Basic page loading)
├── admin-questions-page.crud.spec.ts ✅ (CRUD operations)
├── admin-questions-page.search.spec.ts ✅ (Search functionality)
├── admin-questions-page.pagination.spec.ts ✅ (Pagination)
├── admin-questions-page.bulk.spec.ts ✅ (Bulk operations)
├── admin-questions-page.stats.spec.ts ✅ (Stats cards)
├── admin-questions-page.validation.spec.ts ✅ (Form validation)
├── admin-bulk-question-addition.spec.ts (Original - kept for reference)
├── admin-content-management.spec.ts (CREATE/EXPAND)
│   ├── Cards CRUD
│   ├── Plans CRUD
│   ├── Categories CRUD
│   ├── Topics CRUD
│   └── Bulk operations
└── admin-frontend-tasks.spec.ts (CREATE/EXPAND)
    ├── Tasks CRUD
    ├── Task details
    ├── Search/filter
    └── Validation
```

**Note:** The split test files are now the recommended way to run tests. Each file focuses on a specific aspect of the feature, making debugging and maintenance easier. See `tests/e2e/admin/README-SPLIT-TESTS.md` for details.

### Priority Order for Test Updates

1. **High Priority** (Critical functionality):
   - [ ] CRUD operations for all entities
   - [ ] Form validation
   - [ ] Error handling

2. **Medium Priority** (Important features):
   - [ ] Search & pagination
   - [ ] Stats display
   - [ ] Theme toggle

3. **Low Priority** (Nice to have):
   - [ ] Responsive design tests
   - [ ] Accessibility tests
   - [ ] Performance tests

---

## 📝 Quick Progress Update Guide

### How to Update Progress
1. **Check off completed items**: Replace `- [ ]` with `- [x]` when a task is done
   - Example: `- [x]` Task 3: Admin Dashboard (completed)
   - Example: `- [ ]` Task 4: Content Management (pending)
2. **Update task status**: Mark tasks as complete in the "Task Completion Status" section
3. **Update test type completion**: Check off test types as you finish each suite
4. **Document findings**: Add notes about issues or findings in comments

### Progress Tracking Tips
- ✅ **Use checkboxes** to track what's done: `- [x]` = done, `- [ ]` = pending
- ✅ **Update regularly** as you complete tests
- ✅ **Document issues** found during testing
- ✅ **Update test counts** if new tests are added
- ✅ **Track both automated and manual** testing completion

### Example Progress Update
```markdown
### Task Completion Status (21 Tasks Total)

#### Admin Tasks (7 tasks)
- [x] **Task 1**: Admin Bulk Question Addition ✅
- [x] **Task 2**: Admin Login ✅
- [x] **Task 3**: Admin Dashboard (9 E2E tests including 4 theme toggle tests) ✅
- [ ] **Task 4**: Content Management (in progress)
- [ ] **Task 5**: Frontend Tasks
```

### Quick Status Check Commands
```bash
# Check integration test status
npm run test:integration 2>&1 | tail -3

# Check E2E test status
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# Run all tests for a SPECIFIC task (not all tasks at once!)
# Example for Task 2 (Login):
# npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx && \
# npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx && \
# npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# ⚠️ DO NOT run: npm run test:unit && npm run test:integration && npm run test:e2e
# This runs ALL tests from ALL tasks - too many! Run each task's tests individually.
```

