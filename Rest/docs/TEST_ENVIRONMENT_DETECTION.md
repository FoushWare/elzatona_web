# Test Environment Detection Guide

## Overview

Tests automatically detect whether they're running in **test** or **production** environment and load the appropriate configuration.

## How It Works

### Automatic Detection

The test environment loader (`apps/website/src/lib/utils/test-env-loader.ts`) automatically:

1. **Detects environment** using `getEnvironment()` utility
2. **Loads appropriate config files** based on environment
3. **Uses GitHub Secrets in CI** (no file loading needed)
4. **Normalizes credentials** (handles fallbacks and trimming)

### Priority Order

#### Local Development (Non-CI)

1. **Test Environment** (`APP_ENV=test` or `NODE_ENV=test`):
   - `.env.test.local` (highest priority - local overrides)
   - `.env.test` (test defaults)
   - `.env.local` (fallback)

2. **Production Environment**:
   - `.env.local` (production config)
   - `.env` (defaults)

#### CI/GitHub Actions

- **Environment variables from GitHub Secrets** (no file loading)
- Automatically detected via `CI=true` or `GITHUB_ACTIONS=true`
- Always uses **test environment** (`APP_ENV=test`)

---

## Usage in Test Files

### Before (Manual Loading)

```typescript
// ❌ Old way - manual loading
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local'), override: true });

// Manual credential normalization
if (!process.env.ADMIN_EMAIL) {
  process.env.ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || '';
}
```

### After (Automatic Detection)

```typescript
// ✅ New way - automatic detection
import { loadTestEnvironment, getAdminCredentials } from '@/lib/utils/test-env-loader';

// Automatically detects environment and loads config
loadTestEnvironment();

// Get credentials with validation
const { email, password } = getAdminCredentials();
```

---

## Environment Variables

### Required Variables

| Variable | Test Environment | Production Environment | CI/GitHub Actions |
|----------|-----------------|----------------------|-------------------|
| `ADMIN_EMAIL` | `.env.test.local` | `.env.local` | GitHub Secret |
| `ADMIN_PASSWORD` | `.env.test.local` | `.env.local` | GitHub Secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Test project URL | Production URL | GitHub Secret |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Test anon key | Production anon key | GitHub Secret |
| `SUPABASE_SERVICE_ROLE_KEY` | Test service key | Production service key | GitHub Secret |
| `JWT_SECRET` | Test JWT secret | Production JWT secret | GitHub Secret |

### Fallback Priority

For `ADMIN_EMAIL` and `ADMIN_PASSWORD`:
1. `ADMIN_EMAIL` / `ADMIN_PASSWORD` (primary)
2. `ADMAIN_EMAIL` (typo fallback)
3. `INITIAL_ADMIN_EMAIL` / `INITIAL_ADMIN_PASSWORD`
4. `TEST_ADMIN_EMAIL` / `TEST_ADMIN_PASSWORD`

---

## Local Testing

### Setup Test Environment

1. **Create `.env.test.local`** in project root:
```bash
# Test environment configuration
APP_ENV=test
NEXT_PUBLIC_APP_ENV=test

# Test Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-test-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-test-service-role-key

# Test admin credentials
ADMIN_EMAIL=test-admin@example.com
ADMIN_PASSWORD=test-password-123

# JWT secret
JWT_SECRET=test-jwt-secret-key
```

2. **Run tests** - they automatically use test environment:
```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Verify Environment

```typescript
import { loadTestEnvironment } from '@/lib/utils/test-env-loader';

const { environment, isCI, loadedFiles } = loadTestEnvironment();
console.log('Environment:', environment); // 'test' | 'production' | 'development'
console.log('Is CI:', isCI); // true | false
console.log('Loaded files:', loadedFiles); // Array of loaded .env files
```

---

## CI/GitHub Actions

### Automatic Detection

The workflow automatically:
1. Sets `APP_ENV=test` - Forces test environment
2. Sets `CI=true` - Detects CI environment
3. Uses GitHub Secrets - No file loading needed

### Required GitHub Secrets

See [GITHUB_ACTIONS_TEST_ENV_SETUP.md](./GITHUB_ACTIONS_TEST_ENV_SETUP.md) for complete setup.

**Quick list:**
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `TEST_SUPABASE_URL`
- `TEST_SUPABASE_ANON_KEY`
- `TEST_SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

---

## Migration Guide

### Updating Existing Test Files

**Step 1**: Replace manual loading with automatic detection

```typescript
// Remove this:
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local'), override: true);

// Add this:
import { loadTestEnvironment, getAdminCredentials } from '@/lib/utils/test-env-loader';
loadTestEnvironment();
```

**Step 2**: Replace manual credential access

```typescript
// Remove this:
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Add this:
let ADMIN_EMAIL = '';
let ADMIN_PASSWORD = '';
try {
  const credentials = getAdminCredentials();
  ADMIN_EMAIL = credentials.email;
  ADMIN_PASSWORD = credentials.password;
} catch (error) {
  console.warn('Admin credentials not found:', error);
}
```

---

## Benefits

### ✅ Automatic Environment Detection
- No manual configuration needed
- Works in local and CI
- Handles test vs production automatically

### ✅ Secure Credential Handling
- Uses GitHub Secrets in CI
- Never commits secrets
- Validates credentials exist

### ✅ Consistent Behavior
- Same code works locally and in CI
- Automatic fallbacks
- Clear error messages

### ✅ Easy Migration
- Simple import and function call
- Backward compatible
- No breaking changes

---

## Troubleshooting

### "ADMIN_EMAIL not found" Error

**Local:**
- Create `.env.test.local` with `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Verify file is in project root
- Check file has no syntax errors

**CI:**
- Add `ADMIN_EMAIL` and `ADMIN_PASSWORD` as GitHub Secrets
- Verify secrets are spelled correctly
- Check workflow uses `${{ secrets.ADMIN_EMAIL }}`

### Tests Use Wrong Environment

**Check:**
1. `APP_ENV` is set correctly
2. `.env.test.local` exists (for local)
3. GitHub Secrets are set (for CI)
4. Environment detection is working

**Debug:**
```typescript
import { loadTestEnvironment } from '@/lib/utils/test-env-loader';
const { environment, isCI, loadedFiles } = loadTestEnvironment();
console.log('Environment:', environment);
console.log('Is CI:', isCI);
console.log('Loaded files:', loadedFiles);
```

### Credentials Not Loading

**Check:**
1. File exists and is readable
2. Variables are spelled correctly
3. No extra spaces or quotes
4. File is in project root

**Test:**
```bash
# Check if file is loaded
DEBUG_TEST_ENV=true npm run test:unit
```

---

## Summary

✅ **Automatic detection** - No manual configuration  
✅ **Works everywhere** - Local and CI  
✅ **Secure** - Uses GitHub Secrets in CI  
✅ **Easy to use** - Simple import and function call  
✅ **Backward compatible** - Existing tests still work  

Just import and use - the environment is detected automatically! 🚀

