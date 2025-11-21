# Quick Reference - Test Execution Commands

**Date**: 2025-11-09  
**Purpose**: Quick reference for running tests while manual testing

---

## 🚀 Quick Start

### Terminal Setup (4 Terminals)

**Terminal 1: Dev Server**
```bash
npm run dev
# Server: http://localhost:3000
```

**Terminal 2: Unit Tests (Watch)**
```bash
npm run test:unit -- --watch
```

**Terminal 3: Integration Tests**
```bash
npm run test:integration -- [test-file]
```

**Terminal 4: E2E Tests (Headed)**
```bash
npm run test:e2e:headed -- [test-file]
```

**Browser: Manual Testing**
- Open: `http://localhost:3000`
- Test features manually
- Compare with automated results

---

## 📋 Commands by Test Type

### Unit Tests
```bash
# All unit tests
npm run test:unit

# Watch mode
npm run test:unit -- --watch

# Specific file
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx

# By category
npm run test:unit:admin
npm run test:unit:freestyle-flow
npm run test:unit:shared-components
```

### Integration Tests
```bash
# All integration tests
npm run test:integration

# Watch mode
npm run test:integration -- --watch

# Specific file
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx

# By category
npm run test:integration:admin
npm run test:integration:freestyle-flow
```

### E2E Tests
```bash
# All E2E tests
npm run test:e2e

# Headed mode (see browser)
npm run test:e2e:headed

# UI mode (interactive)
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Specific file
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# By category
npm run test:e2e:admin
npm run test:e2e:freestyle-flow
npm run test:e2e:guided-flow
```

---

## 🎯 Task-Specific Commands

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

### UI Components Library (New - Vitest)

**All UI Component Tests**
```bash
# Run all shared components tests
nx test shared-components

# Run in watch mode
nx test shared-components --watch

# Run with coverage
nx test shared-components --coverage
```

**Specific Component Tests**
```bash
# Button component
nx test shared-components -- button.test.tsx

# Input component
nx test shared-components -- input.test.tsx

# Select component
nx test shared-components -- select.test.tsx
```

**Storybook**
```bash
# Start Storybook (port 4400)
nx storybook shared-components

# Build Storybook
nx build-storybook shared-components
```

---

## 🔧 Useful Options

### Jest Options
```bash
# Watch mode
--watch

# Coverage
--coverage

# Verbose output
--verbose

# Run in band (sequential)
--runInBand

# Update snapshots
--updateSnapshot
```

### Playwright Options
```bash
# Headed mode (see browser)
--headed

# UI mode (interactive)
--ui

# Debug mode
--debug

# Slow motion (see actions)
# Note: Playwright doesn't support --slowMo CLI flag
# Configure slowMo in playwright.config.ts use section instead:
# use: { slowMo: 1000 }

# Specific browser
--project=chromium
```

---

## 📚 Full Guides

- **Test Execution Guide**: `TEST_EXECUTION_GUIDE.md`
- **Manual Testing Workflow**: `MANUAL_TESTING_WORKFLOW.md`
- **Comprehensive Test Plan**: `COMPREHENSIVE_TEST_PLAN.md`
- **Edge Cases**: `EDGE_CASES_AND_ERROR_HANDLING.md`

---

**Last Updated**: 2025-11-09  
**Quick Reference**: Keep this open while testing!

