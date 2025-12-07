# Complete Environment Switching Guide

**Two Simple Rules:**

1. **All tests automatically use TEST** ✅
2. **Switch dev server with one command** ✅

## 🎯 Quick Reference

### Tests (Always TEST - Automatic)

```bash
npm run test:unit          # ✅ Always uses TEST
npm run test:integration   # ✅ Always uses TEST
npm run test:e2e           # ✅ Always uses TEST
```

**No action needed** - tests are automatically forced to use TEST environment.

### Development Server (Manual Switch)

```bash
# TEST environment
npm run dev:test

# PRODUCTION environment
npm run dev:prod
# or
npm run dev  # Default is production

# DEVELOPMENT environment
npm run dev:dev
```

### Or Use the Set Script

```bash
# Switch to TEST
node scripts/set-env.js test

# Switch to PRODUCTION
node scripts/set-env.js production

# Switch to DEVELOPMENT
node scripts/set-env.js dev

# Check current
node scripts/set-env.js
```

## 📋 How It Works

### 1. Tests Always Use TEST

All test configurations **force** `APP_ENV=test`:

- **Unit/Integration Tests** (`jest.setup.js`):

  ```javascript
  process.env.APP_ENV = "test"; // FORCED
  process.env.NEXT_PUBLIC_APP_ENV = "test";
  process.env.NODE_ENV = "test";
  ```

- **E2E Tests** (`playwright.config.ts` + `global-setup.ts`):

  ```typescript
  process.env.APP_ENV = "test"; // FORCED
  process.env.NEXT_PUBLIC_APP_ENV = "test";
  process.env.NODE_ENV = "test";
  ```

- **Test Scripts** (`package.json`):
  ```json
  "test": "APP_ENV=test ...",
  "test:e2e": "APP_ENV=test ..."
  ```

**Result**: Tests **always** use TEST environment, no matter what.

### 2. Dev Server Manual Switch

The dev server respects the `APP_ENV` variable:

- **`npm run dev:test`** → Sets `APP_ENV=test` → Uses test database
- **`npm run dev:prod`** → Sets `APP_ENV=production` → Uses production database
- **`npm run dev:dev`** → Sets `APP_ENV=development` → Uses development settings
- **`npm run dev`** → Defaults to `APP_ENV=production`

## 🔄 Switching Methods

### Method 1: Use npm Scripts (Recommended)

```bash
# TEST
npm run dev:test

# PRODUCTION
npm run dev:prod

# DEVELOPMENT
npm run dev:dev
```

### Method 2: Use Set Script

```bash
# Switch and update .env files
node scripts/set-env.js test
node scripts/set-env.js production
node scripts/set-env.js dev
```

### Method 3: Set Environment Variable

```bash
# At runtime
APP_ENV=test npm run dev
APP_ENV=production npm run dev
APP_ENV=development npm run dev
```

## 📊 Environment Detection

The system detects environment in this priority:

1. **`APP_ENV`** (Highest Priority) ← **Use this!**
2. `NEXT_PUBLIC_APP_ENV`
3. `NODE_ENV`
4. Supabase URL (fallback)

## 💻 In Code (APIs)

All APIs use the centralized config:

```typescript
import { getApiConfig } from "@/lib/utils/api-config";

const config = getApiConfig();
// Returns environment-specific config automatically
```

## 🧪 Test Configuration

### Unit/Integration Tests

**File**: `apps/website/jest.setup.js`

```javascript
// FORCES TEST ENVIRONMENT
process.env.APP_ENV = "test";
process.env.NEXT_PUBLIC_APP_ENV = "test";
process.env.NODE_ENV = "test";
```

### E2E Tests

**Files**:

- `playwright.config.ts`
- `tests/e2e/global-setup.ts`

```typescript
// FORCES TEST ENVIRONMENT
process.env.APP_ENV = "test";
process.env.NEXT_PUBLIC_APP_ENV = "test";
process.env.NODE_ENV = "test";
```

## 🚀 Development Server Configuration

**File**: `package.json`

```json
{
  "dev": "APP_ENV=production ...", // Default: PRODUCTION
  "dev:test": "APP_ENV=test ...", // TEST
  "dev:prod": "APP_ENV=production ...", // PRODUCTION
  "dev:dev": "APP_ENV=development ..." // DEVELOPMENT
}
```

## 📝 Environment Files

- **`.env.test.local`**: TEST environment (for tests)
- **`.env.local`**: PRODUCTION/DEVELOPMENT environment (for dev server)

Both files should have:

```bash
APP_ENV=test        # In .env.test.local
APP_ENV=production  # In .env.local (or development)
```

## ✅ Verification

### Check Current Environment

```bash
# Quick check
node scripts/check-env.js

# Or use set script
node scripts/set-env.js
```

### In Code

```typescript
import { getEnvironment, isTestEnvironment } from "@/lib/utils/environment";

console.log(getEnvironment()); // 'test' | 'production' | 'development'
console.log(isTestEnvironment()); // true | false
```

## 🎯 Summary

| Task              | Command                         | Environment | Automatic? |
| ----------------- | ------------------------------- | ----------- | ---------- |
| Run tests         | `npm run test:*`                | TEST        | ✅ Yes     |
| Dev server (test) | `npm run dev:test`              | TEST        | Manual     |
| Dev server (prod) | `npm run dev:prod`              | PRODUCTION  | Manual     |
| Dev server (dev)  | `npm run dev:dev`               | DEVELOPMENT | Manual     |
| Switch env        | `node scripts/set-env.js <env>` | Any         | Manual     |

## ⚠️ Important Notes

1. **Tests are protected**: They **always** use TEST, even if you set `APP_ENV=production`
2. **Dev server is flexible**: You can switch between TEST, PRODUCTION, and DEVELOPMENT
3. **One variable**: Just `APP_ENV` controls everything
4. **One import**: `getApiConfig()` provides all environment-specific config

## 📚 Related Files

- **API Config**: `apps/website/src/lib/utils/api-config.ts`
- **Environment Utility**: `apps/website/src/lib/utils/environment.ts`
- **Set Script**: `scripts/set-env.js`
- **Check Script**: `scripts/check-env.js`
