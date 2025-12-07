# 🧪 Test Admin Login Locally - Quick Reference

## Commands to Test `/admin/login` Before SonarQube

### 📋 Test Files Included

**Unit Tests:**

- `apps/website/src/app/admin/login/page.test.tsx`

**Integration Tests:**

- `apps/website/src/app/admin/login/page.integration.test.tsx`

**E2E Tests:**

- `tests/e2e/admin/admin-login.spec.ts`
- `tests/e2e/admin/admin-login.basic.spec.ts`
- `tests/e2e/admin/admin-login.validation.spec.ts`
- `tests/e2e/admin/admin-login.flow.spec.ts`

---

## 🚀 Quick Commands

### 1. Run All Admin Login Tests (Recommended)

```bash
# Run unit + integration + E2E tests
npm run test:admin-login
```

### 2. Run Unit Tests Only

```bash
# Using Jest directly
npx jest apps/website/src/app/admin/login/page.test.tsx --config=apps/website/jest.config.js

# Or using npm script
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
```

### 3. Run Integration Tests Only

```bash
# Using Jest directly
npx jest apps/website/src/app/admin/login/page.integration.test.tsx --config=apps/website/jest.config.js

# Or using npm script
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
```

### 4. Run E2E Tests Only

```bash
# Run all admin login E2E tests
npm run test:e2e:admin:login:split

# Or run specific E2E test files
npm run test:e2e:admin:login:basic
npm run test:e2e:admin:login:validation
npm run test:e2e:admin:login:flow

# Or using Playwright directly
npx playwright test tests/e2e/admin/admin-login*.spec.ts --workers=1
```

### 5. Run with Coverage (For SonarQube)

```bash
# Run unit tests with coverage
npx jest apps/website/src/app/admin/login/page.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage

# Run integration tests with coverage
npx jest apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage

# Or use the npm script
npm run test:admin-login:coverage
```

### 6. Run in Watch Mode (Development)

```bash
# Watch unit tests
npx jest apps/website/src/app/admin/login/page.test.tsx \
  --config=apps/website/jest.config.js \
  --watch

# Watch integration tests
npx jest apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js \
  --watch
```

---

## 📊 Complete Test Suite (All Types)

### Option 1: Run All Tests Sequentially

```bash
# 1. Unit tests
npx jest apps/website/src/app/admin/login/page.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage

# 2. Integration tests
npx jest apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage

# 3. E2E tests
npx playwright test tests/e2e/admin/admin-login*.spec.ts --workers=1
```

### Option 2: Use NPM Scripts

```bash
# Run all admin login tests (if script exists)
npm run test:admin-login

# Or run individually
npm run test:unit -- apps/website/src/app/admin/login/page.test.tsx
npm run test:integration -- apps/website/src/app/admin/login/page.integration.test.tsx
npm run test:e2e:admin:login:split
```

---

## 🎯 Pre-SonarQube Checklist

Before running SonarQube, verify all tests pass:

```bash
# ✅ Step 1: Run unit tests
npx jest apps/website/src/app/admin/login/page.test.tsx \
  --config=apps/website/jest.config.js

# ✅ Step 2: Run integration tests
npx jest apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js

# ✅ Step 3: Run E2E tests
npm run test:e2e:admin:login:split

# ✅ Step 4: Run with coverage (for SonarQube)
npx jest apps/website/src/app/admin/login/page.test.tsx \
  apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage

# ✅ Step 5: Verify coverage file exists
ls -lh coverage/lcov.info
```

---

## 🔧 Troubleshooting

### Tests Fail with "Cannot find module"

```bash
# Clear Jest cache
npx jest --clearCache

# Reinstall dependencies
npm ci
```

### E2E Tests Fail

```bash
# Install Playwright browsers
npm run test:e2e:install

# Check environment variables
cat .env.test.local | grep ADMIN
```

### Memory Issues

```bash
# Run with limited memory
NODE_OPTIONS=--max-old-space-size=768 \
JEST_MAX_WORKERS=1 \
npx jest apps/website/src/app/admin/login/page.test.tsx \
  --config=apps/website/jest.config.js \
  --maxWorkers=1
```

---

## 📝 Quick Reference

| Test Type       | Command                                                                                                    | Coverage                            |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Unit**        | `npx jest apps/website/src/app/admin/login/page.test.tsx --config=apps/website/jest.config.js`             | Add `--coverage`                    |
| **Integration** | `npx jest apps/website/src/app/admin/login/page.integration.test.tsx --config=apps/website/jest.config.js` | Add `--coverage`                    |
| **E2E**         | `npm run test:e2e:admin:login:split`                                                                       | N/A                                 |
| **All**         | `npm run test:admin-login`                                                                                 | `npm run test:admin-login:coverage` |

---

## 🎯 Before SonarQube

Run this complete command to test everything with coverage:

```bash
# Run all admin login tests with coverage
npx jest \
  apps/website/src/app/admin/login/page.test.tsx \
  apps/website/src/app/admin/login/page.integration.test.tsx \
  --config=apps/website/jest.config.js \
  --coverage \
  --coverageReporters=lcov \
  --coverageDirectory=coverage \
  --maxWorkers=1

# Then run E2E tests
npm run test:e2e:admin:login:split

# Verify coverage file for SonarQube
ls -lh coverage/lcov.info
```

---

**Note**: SonarQube will automatically run these tests in GitHub Actions, but it's recommended to run them locally first to catch issues early.
