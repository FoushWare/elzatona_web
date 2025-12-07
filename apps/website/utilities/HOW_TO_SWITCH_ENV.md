# How to Switch Between Test and Production Environments

Complete guide on switching between TEST and PRODUCTION environments.

## 🚀 Quick Methods

### Method 1: Use the Switch Script

```bash
# Check current environment
node scripts/switch-env.js

# Switch to TEST
node scripts/switch-env.js test

# Switch to PRODUCTION
node scripts/switch-env.js production
```

### Method 2: Set Environment Variable (Recommended)

```bash
# Run dev server with TEST environment
NEXT_PUBLIC_APP_ENV=test npm run dev

# Run dev server with PRODUCTION environment
NEXT_PUBLIC_APP_ENV=production npm run dev
# or just
npm run dev  # Uses .env.local by default
```

### Method 3: Temporarily Rename Files

```bash
# Switch to TEST (hide production env)
mv .env.local .env.local.backup

# Switch to PRODUCTION (restore production env)
mv .env.local.backup .env.local
```

## 📋 How Environment Priority Works

The environment is determined by which `.env` file is loaded **first** (priority order):

1. **`.env.test.local`** (Highest Priority) → TEST
2. **`.env.test`** → TEST
3. **`.env.local`** → PRODUCTION
4. **`.env`** → Default

**Important**: If `.env.test.local` exists, it will **always** be loaded first, making TEST the active environment.

## 🔄 Switching Scenarios

### Scenario 1: Running Tests (Always TEST)

Tests automatically use the test environment:

```bash
# Unit tests - uses .env.test.local
npm run test:unit

# Integration tests - uses .env.test.local
npm run test:integration

# E2E tests - uses .env.test.local
npm run test:e2e
```

**No action needed** - tests always use test environment.

### Scenario 2: Development Server (Choose Environment)

#### Option A: Use TEST Environment

```bash
# Method 1: Set environment variable
NEXT_PUBLIC_APP_ENV=test npm run dev

# Method 2: Temporarily hide production env
mv .env.local .env.local.backup
npm run dev
# Restore later: mv .env.local.backup .env.local
```

#### Option B: Use PRODUCTION Environment (Default)

```bash
# Just run normally - uses .env.local
npm run dev

# Or explicitly set
NEXT_PUBLIC_APP_ENV=production npm run dev
```

### Scenario 3: API Routes (Automatic Detection)

API routes automatically detect the environment using the utility:

```typescript
import { isTestEnvironment, getEnvironment } from "@/lib/utils/environment";

// Automatically detects based on loaded .env files
const env = getEnvironment(); // 'test' | 'production'
```

**No action needed** - APIs detect environment automatically.

## 💻 In Code

### Check Current Environment

```typescript
import {
  getEnvironment,
  isTestEnvironment,
  isProductionEnvironment,
} from "@/lib/utils/environment";

// Get current environment
const env = getEnvironment(); // 'test' | 'production' | 'development'

// Quick checks
if (isTestEnvironment()) {
  // Test-specific logic
}

if (isProductionEnvironment()) {
  // Production-specific logic
}
```

### Force Environment (for specific operations)

```typescript
import { assertEnvironment } from "@/lib/utils/environment";

// Ensure we're in test before dangerous operation
assertEnvironment("test", "This should only run in test");
```

## 📁 File Structure

```
.env.test.local    ← TEST environment (highest priority)
.env.test          ← TEST environment (fallback)
.env.local         ← PRODUCTION environment
.env               ← Default environment
```

## 🔧 Common Tasks

### Task 1: Run Dev Server with Test Database

```bash
# Option 1: Set environment variable
NEXT_PUBLIC_APP_ENV=test npm run dev

# Option 2: Temporarily rename
mv .env.local .env.local.backup
npm run dev
# Don't forget to restore: mv .env.local.backup .env.local
```

### Task 2: Run Tests (Always Test)

```bash
# Tests automatically use .env.test.local
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Task 3: Switch Back to Production

```bash
# If you renamed files, restore:
mv .env.local.backup .env.local

# Or just run normally (uses .env.local)
npm run dev
```

## ⚠️ Important Notes

1. **Tests Always Use Test**: Jest and Playwright load `.env.test.local` first
2. **Dev Server Defaults to Production**: Uses `.env.local` unless you set `NEXT_PUBLIC_APP_ENV=test`
3. **File Priority**: `.env.test.local` takes precedence over `.env.local`
4. **Don't Delete Files**: Just rename or set environment variables

## 🎯 Quick Reference

| Task              | Command                                 | Environment        |
| ----------------- | --------------------------------------- | ------------------ |
| Run tests         | `npm run test:*`                        | TEST (automatic)   |
| Dev server (test) | `NEXT_PUBLIC_APP_ENV=test npm run dev`  | TEST               |
| Dev server (prod) | `npm run dev`                           | PRODUCTION         |
| Check current     | `node scripts/check-env.js`             | Shows current      |
| Switch to test    | `node scripts/switch-env.js test`       | Shows instructions |
| Switch to prod    | `node scripts/switch-env.js production` | Shows instructions |

## 🔍 Verify Current Environment

```bash
# Quick check
node scripts/check-env.js

# Or in code
import { getEnvironment } from '@/lib/utils/environment';
console.log(getEnvironment()); // 'test' | 'production'
```

## 📚 Related Files

- **Switch Script**: `scripts/switch-env.js`
- **Check Script**: `scripts/check-env.js`
- **Environment Utility**: `apps/website/src/lib/utils/environment.ts`
- **Documentation**: `apps/website/src/lib/utils/HOW_TO_CHECK_ENV.md`
