# GitHub Actions Test Environment Setup

## Overview

GitHub Actions runs tests in a **TEST environment** (not production) to ensure:
- Tests don't affect production data
- Tests use a separate test database
- Tests are isolated and safe to run automatically

## Required GitHub Secrets

Add these secrets to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

### 1. Admin Credentials (Required for Admin Login Tests)

| Secret Name | Description | Example |
|------------|-------------|---------|
| `ADMIN_EMAIL` | Admin email for test environment | `test-admin@example.com` |
| `ADMIN_PASSWORD` | Admin password for test environment | `test-password-123` |

**⚠️ Important**: Use **test environment credentials**, NOT production credentials!

### 2. Supabase Test Environment (Required)

| Secret Name | Description | Where to Find |
|------------|-------------|---------------|
| `TEST_SUPABASE_URL` | Test Supabase project URL | Supabase Dashboard → Test Project → Settings → API |
| `TEST_SUPABASE_ANON_KEY` | Test Supabase anonymous key | Supabase Dashboard → Test Project → Settings → API |
| `TEST_SUPABASE_SERVICE_ROLE_KEY` | Test Supabase service role key | Supabase Dashboard → Test Project → Settings → API |

**⚠️ Important**: Use your **test Supabase project** credentials, NOT production!

### 3. JWT Secret (Required for Admin Auth)

| Secret Name | Description | Example |
|------------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT token generation | Generate a secure random string |

**How to generate:**
```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

### 4. SonarQube Token (Already Configured)

| Secret Name | Description | Status |
|------------|-------------|--------|
| `SONAR_TOKEN` | SonarCloud authentication token | ✅ Already configured |

---

## How to Add Secrets

### Option 1: Automated Setup (Recommended) 🚀

**Quick setup using script:**

```bash
npm run setup:github-test-secrets
```

This script will:
- ✅ Read values from `.env.test.local`
- ✅ Add all secrets automatically
- ✅ Generate JWT_SECRET if needed
- ✅ Show summary of what was added

**Prerequisites:**
- GitHub CLI installed: `brew install gh`
- Authenticated: `gh auth login`
- `.env.test.local` file exists with test credentials

See [GITHUB_SECRETS_AUTOMATED_SETUP.md](./GITHUB_SECRETS_AUTOMATED_SETUP.md) for details.

### Option 2: Manual Setup

#### Step 1: Go to Repository Settings

1. Navigate to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)

#### Step 2: Add Each Secret

1. Click **New repository secret**
2. Enter the **Name** (e.g., `ADMIN_EMAIL`)
3. Enter the **Value** (e.g., your test admin email)
4. Click **Add secret**
5. Repeat for all required secrets

#### Step 3: Verify Secrets

After adding all secrets, you should have:

```
✅ ADMIN_EMAIL
✅ ADMIN_PASSWORD
✅ TEST_SUPABASE_URL
✅ TEST_SUPABASE_ANON_KEY
✅ TEST_SUPABASE_SERVICE_ROLE_KEY
✅ JWT_SECRET
✅ SONAR_TOKEN (already exists)
```

**Or verify via CLI:**
```bash
gh secret list --repo FoushWare/GreatFrontendHub
```

---

## Environment Detection

The workflow automatically:

1. **Sets `APP_ENV=test`** - Forces test environment
2. **Sets `NODE_ENV=test`** - Node.js test mode
3. **Uses GitHub Secrets** - Loads credentials from secrets
4. **Detects CI** - Automatically uses test environment

### How It Works

```yaml
env:
  # Force test environment
  APP_ENV: 'test'
  NEXT_PUBLIC_APP_ENV: 'test'
  NODE_ENV: 'test'
  # Admin credentials (from GitHub Secrets)
  ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
  ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
  # Supabase test environment
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
  # ... etc
```

---

## Test vs Production

### ✅ Use TEST Environment in GitHub Actions

**Why?**
- Tests should never touch production data
- Tests need isolated environment
- Tests can be run safely on every push
- Tests don't affect real users

**What to use:**
- Test Supabase project credentials
- Test admin credentials
- Test database

### ❌ Do NOT Use Production in GitHub Actions

**Why not?**
- Risk of affecting real users
- Risk of modifying production data
- Security concerns
- Rate limiting issues

---

## Quick Setup Checklist

- [ ] Add `ADMIN_EMAIL` secret (test admin email)
- [ ] Add `ADMIN_PASSWORD` secret (test admin password)
- [ ] Add `TEST_SUPABASE_URL` secret (test Supabase URL)
- [ ] Add `TEST_SUPABASE_ANON_KEY` secret (test Supabase anon key)
- [ ] Add `TEST_SUPABASE_SERVICE_ROLE_KEY` secret (test Supabase service role key)
- [ ] Add `JWT_SECRET` secret (generate secure random string)
- [ ] Verify `SONAR_TOKEN` exists (already configured)
- [ ] Run workflow to test

---

## Troubleshooting

### Tests Fail with "ADMIN_EMAIL not found"

**Solution**: Add `ADMIN_EMAIL` and `ADMIN_PASSWORD` as GitHub Secrets

### Tests Fail with "Supabase connection error"

**Solution**: 
1. Verify `TEST_SUPABASE_URL` is correct
2. Verify `TEST_SUPABASE_ANON_KEY` is correct
3. Ensure you're using **test project** credentials, not production

### Tests Use Production Database

**Solution**: 
1. Verify `APP_ENV=test` is set in workflow
2. Verify test Supabase credentials are used
3. Check environment detection in test files

### Build Fails

**Solution**: 
1. Verify all required secrets are added
2. Check workflow logs for missing environment variables
3. Ensure test environment variables are set correctly

---

## Security Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use test credentials** - Never use production credentials in CI
3. **Rotate secrets regularly** - Update secrets periodically
4. **Limit secret access** - Only add secrets needed for tests
5. **Review secret usage** - Audit which secrets are actually used

---

## Example: Complete Secret Setup

```bash
# 1. Get test Supabase credentials from Supabase Dashboard
# Test Project → Settings → API

# 2. Get test admin credentials from your .env.test.local
# (Use the same credentials you use locally for tests)

# 3. Generate JWT secret
openssl rand -base64 32

# 4. Add all secrets to GitHub:
# - ADMIN_EMAIL: test-admin@example.com
# - ADMIN_PASSWORD: your-test-password
# - TEST_SUPABASE_URL: https://your-test-project.supabase.co
# - TEST_SUPABASE_ANON_KEY: your-test-anon-key
# - TEST_SUPABASE_SERVICE_ROLE_KEY: your-test-service-role-key
# - JWT_SECRET: (generated secure string)
```

---

## Summary

✅ **Use TEST environment** in GitHub Actions  
✅ **Add required secrets** for test credentials  
✅ **Never use production** credentials in CI  
✅ **Tests are isolated** and safe to run automatically  

The workflow automatically detects CI environment and uses test configuration. Just add the secrets and you're good to go! 🚀

