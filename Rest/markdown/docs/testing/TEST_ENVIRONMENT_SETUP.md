# Test Environment Setup Guide

This guide explains how to set up separate Supabase databases for unit, integration, and E2E tests to avoid affecting your main development/production database.

## Overview

The test suite now supports separate environment configurations:

- **Unit Tests**: Use `.env.test.local` or `.env.test` (mocked by default)
- **Integration Tests**: Use `.env.test.local` or `.env.test` (can use real test database)
- **E2E Tests**: Use `.env.test.local` or `.env.test` (requires real test database)

## Priority Order

Environment variables are loaded in the following priority order:

1. `.env.test.local` (highest priority - for local test overrides)
2. `.env.test` (test-specific defaults)
3. `.env.local` (fallback to dev - for backwards compatibility)

## Setup Steps

### 1. Create a Separate Supabase Project for Testing

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project specifically for testing (e.g., "Elzatona Test")
3. Note down the project URL and API keys

### 2. Set Up Test Database Schema

Run your database migrations on the test project to match your main database schema:

```bash
# If you have migration scripts, run them against the test database
# Or manually copy the schema from your main database
```

### 3. Create Test Environment Files

#### Option A: Create `.env.test.local` (Recommended)

Create `.env.test.local` in the project root:

```bash
cp Rest/env.test.example .env.test.local
```

Then edit `.env.test.local` with your test database credentials:

```env
# Test Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-test-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_test_service_role_key

# Test Admin Credentials
ADMIN_EMAIL=test-admin@example.com
ADMIN_PASSWORD=test-admin-password-123
INITIAL_ADMIN_EMAIL=test-admin@example.com
INITIAL_ADMIN_PASSWORD=test-admin-password-123

# Test Settings
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-nextauth-secret
NODE_ENV=test
NEXT_PUBLIC_APP_ENV=test
```

#### Option B: Create `.env.test` (Shared Defaults)

If you want to commit test defaults (without secrets), create `.env.test`:

```bash
cp Rest/env.test.example .env.test
```

**Note**: `.env.test.local` takes priority over `.env.test`, so you can commit `.env.test` with placeholder values and override with `.env.test.local` locally.

### 4. Verify Test Environment

Run tests with debug logging to verify the correct environment is being used:

```bash
DEBUG_TEST_ENV=true npm run test:unit
DEBUG_TEST_ENV=true npm run test:integration
DEBUG_TEST_ENV=true npm run test:e2e
```

You should see logs indicating which environment files were loaded and which Supabase URL is being used.

## File Structure

```
project-root/
├── .env.local              # Main development environment (fallback)
├── .env.test               # Test defaults (can be committed)
├── .env.test.local         # Test overrides (never commit - in .gitignore)
├── Rest/
│   └── env.test.example    # Template for test environment
└── tests/
    └── e2e/
        └── test-env-loader.ts  # Test environment loader utility
```

## How It Works

### Unit Tests (`jest.setup.js`)

- Loads `.env.test.local` → `.env.test` → `.env.local`
- Uses test-specific Supabase credentials if available
- Falls back to safe defaults if no test env is found

### Integration Tests

- Same as unit tests
- Can use real test database or mocked services
- Configured via `jest.setup.js`

### E2E Tests (`playwright.config.ts` + `global-setup.ts`)

- Loads test environment in `playwright.config.ts` (before workers spawn)
- Also loads in `global-setup.ts` for additional setup
- Each test file can also import `test-env-loader` for worker process access
- Uses test database for all E2E operations

## Benefits

1. **Database Isolation**: Tests don't affect your main database
2. **Data Safety**: Can safely create/delete test data without worry
3. **Parallel Testing**: Multiple developers can run tests simultaneously
4. **CI/CD Ready**: Easy to configure different test databases per environment
5. **Backwards Compatible**: Falls back to `.env.local` if test env not found

## Troubleshooting

### Tests Still Using Main Database

**Problem**: Tests are using your main Supabase database instead of test database.

**Solution**:

1. Verify `.env.test.local` exists and has correct test database URL
2. Check that `NEXT_PUBLIC_SUPABASE_URL` in `.env.test.local` points to your test project
3. Run with `DEBUG_TEST_ENV=true` to see which files are loaded
4. Ensure `.env.test.local` is not being overridden by system environment variables

### Missing Test Database Credentials

**Problem**: Tests fail because test database credentials are missing.

**Solution**:

1. Create `.env.test.local` from `Rest/env.test.example`
2. Fill in your test Supabase project credentials
3. Verify the test project exists and is accessible

### Environment Variables Not Loading

**Problem**: Test environment variables aren't being loaded.

**Solution**:

1. Check file paths - ensure `.env.test.local` is in the project root
2. Verify file permissions
3. Check for syntax errors in `.env.test.local` (no spaces around `=`)
4. Use `DEBUG_TEST_ENV=true` to see what's being loaded

## Best Practices

1. **Never commit `.env.test.local`** - It's in `.gitignore` for security
2. **Use different admin credentials** for tests vs. development
3. **Reset test database** between test runs if needed (via migrations or scripts)
4. **Document test database setup** in your team's onboarding docs
5. **Use test-specific data** that can be safely created/deleted

## Migration from Old Setup

If you're currently using `.env.local` for tests:

1. Create `.env.test.local` with test database credentials
2. Keep `.env.local` for development (it will be used as fallback)
3. Tests will automatically use `.env.test.local` when available
4. No code changes needed - the environment loader handles it automatically

## Example: Setting Up Test Database

```bash
# 1. Create test Supabase project (via dashboard)
# 2. Copy schema from main database
# 3. Create .env.test.local
cat > .env.test.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://test-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=test_anon_key
SUPABASE_SERVICE_ROLE_KEY=test_service_role_key
ADMIN_EMAIL=test@example.com
ADMIN_PASSWORD=test123
EOF

# 4. Verify it works
DEBUG_TEST_ENV=true npm run test:unit
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Jest Environment Variables](https://jestjs.io/docs/environment-variables)
- [Playwright Environment Variables](https://playwright.dev/docs/test-use-options#use-environment-variables)
