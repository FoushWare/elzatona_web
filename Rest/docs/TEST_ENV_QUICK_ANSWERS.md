# Test Environment - Quick Answers

## Your Questions Answered

### 1. Do tests depend on `.env.test.local`?

**Answer: YES** - Tests automatically detect and use `.env.test.local` when available.

**How it works:**

- Tests automatically detect if running in test or production
- Priority: `.env.test.local` > `.env.test` > `.env.local`
- In CI: Uses GitHub Secrets (no file needed)

**What you need to do:**

- Create `.env.test.local` with test credentials (for local testing)
- Add GitHub Secrets (for CI/GitHub Actions)

---

### 2. Do we need to feed GitHub Actions with secrets?

**Answer: YES** - GitHub Actions needs secrets for test credentials.

**Required GitHub Secrets:**

| Secret Name                      | Purpose                   | Example                                   |
| -------------------------------- | ------------------------- | ----------------------------------------- |
| `ADMIN_EMAIL`                    | Admin email for tests     | `test-admin@example.com`                  |
| `ADMIN_PASSWORD`                 | Admin password for tests  | `test-password-123`                       |
| `TEST_SUPABASE_URL`              | Test Supabase project URL | `https://xxx.supabase.co`                 |
| `TEST_SUPABASE_ANON_KEY`         | Test Supabase anon key    | `eyJhbGc...`                              |
| `TEST_SUPABASE_SERVICE_ROLE_KEY` | Test Supabase service key | `eyJhbGc...`                              |
| `JWT_SECRET`                     | JWT secret for admin auth | (generate with `openssl rand -base64 32`) |

**How to add:**

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with name and value
4. Save

**See:** [GITHUB_ACTIONS_TEST_ENV_SETUP.md](./GITHUB_ACTIONS_TEST_ENV_SETUP.md) for detailed instructions

---

### 3. Do we need to use production or test env with GitHub Actions?

**Answer: TEST ENVIRONMENT** - Always use test environment in GitHub Actions.

**Why?**

- ✅ Tests should never touch production data
- ✅ Tests need isolated environment
- ✅ Tests can be run safely on every push
- ✅ Tests don't affect real users

**What the workflow does:**

```yaml
env:
  APP_ENV: 'test' # Forces test environment
  NEXT_PUBLIC_APP_ENV: 'test' # Next.js test mode
  NODE_ENV: 'test' # Node.js test mode
  # Uses TEST Supabase credentials (not production)
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
```

**What to use:**

- ✅ Test Supabase project credentials
- ✅ Test admin credentials
- ✅ Test database

**What NOT to use:**

- ❌ Production Supabase credentials
- ❌ Production admin credentials
- ❌ Production database

---

## Quick Setup

### For Local Testing

1. **Create `.env.test.local`** in project root:

```bash
APP_ENV=test
NEXT_PUBLIC_APP_ENV=test

# Test Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-test-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-test-service-role-key

# Test admin credentials
ADMIN_EMAIL=test-admin@example.com
ADMIN_PASSWORD=test-password-123

# JWT secret
JWT_SECRET=your-jwt-secret
```

2. **Run tests** - they automatically use test environment:

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```

### For GitHub Actions

1. **Add GitHub Secrets** (see list above)
2. **Workflow automatically uses test environment**
3. **No additional configuration needed**

---

## How It Works

### Automatic Detection

The system automatically:

1. **Detects environment** - Test vs Production
2. **Loads config** - From `.env.test.local` (local) or GitHub Secrets (CI)
3. **Uses test environment** - Always in CI, configurable locally
4. **Validates credentials** - Ensures required variables exist

### Code Example

```typescript
// In test files - automatic detection
import {
  loadTestEnvironment,
  getAdminCredentials,
} from '@/lib/utils/test-env-loader';

// Automatically detects and loads environment
loadTestEnvironment();

// Get credentials (works in local and CI)
const { email, password } = getAdminCredentials();
```

---

## Summary

| Question                               | Answer                                |
| -------------------------------------- | ------------------------------------- |
| **Tests depend on `.env.test.local`?** | ✅ YES - Automatically detected       |
| **Need GitHub Secrets?**               | ✅ YES - Required for CI              |
| **Use test or production in CI?**      | ✅ TEST - Always use test environment |

**Key Points:**

- ✅ Tests automatically detect environment
- ✅ Local: Uses `.env.test.local`
- ✅ CI: Uses GitHub Secrets
- ✅ Always uses TEST environment in CI
- ✅ Never uses production in CI

---

## Next Steps

1. **Create `.env.test.local`** for local testing
2. **Add GitHub Secrets** for CI (see [GITHUB_ACTIONS_TEST_ENV_SETUP.md](./GITHUB_ACTIONS_TEST_ENV_SETUP.md))
3. **Run tests** - they'll automatically use the right environment

**Documentation:**

- [GITHUB_ACTIONS_TEST_ENV_SETUP.md](./GITHUB_ACTIONS_TEST_ENV_SETUP.md) - Complete GitHub Actions setup
- [TEST_ENVIRONMENT_DETECTION.md](./TEST_ENVIRONMENT_DETECTION.md) - How environment detection works
