# Pre-Commit Test Execution

## Overview

Tests now run automatically on every commit to catch issues early. The pre-commit hook is configured to run tests before allowing commits to proceed.

## Current Configuration

**Default Hook**: `pre-commit-with-tests`
- ✅ Prettier formatting
- ✅ ESLint linting
- ✅ Unit tests
- ✅ Integration tests
- ⏭️ E2E tests (skipped - too slow for pre-commit)

## Available Hook Modes

### 1. Fast Mode with Tests (Recommended for daily use)
```bash
npm run pre-commit:fast-tests
```
- ✅ Prettier formatting
- ✅ ESLint linting (warnings allowed)
- ✅ Unit tests only (fast)
- ⏭️ Integration tests skipped
- ⏭️ E2E tests skipped

**Best for**: Quick commits, frequent development

### 2. Full Mode with Tests (Current default)
```bash
npm run pre-commit:with-tests
```
- ✅ Prettier formatting
- ✅ ESLint linting (strict)
- ✅ Unit tests
- ✅ Integration tests
- ⏭️ E2E tests skipped

**Best for**: Before pushing to remote, important commits

### 3. Fast Mode (No Tests)
```bash
npm run pre-commit:fast
```
- ✅ Prettier formatting
- ✅ ESLint linting
- ⏭️ All tests skipped

**Best for**: Formatting-only commits, documentation updates

### 4. Full Mode (Includes E2E)
```bash
npm run pre-commit:full
```
- ✅ Prettier formatting
- ✅ ESLint linting
- ✅ Unit tests
- ✅ Integration tests
- ✅ E2E tests (slow!)

**Best for**: Before major releases, final checks

## How It Works

1. **On Commit**: When you run `git commit`, the pre-commit hook automatically runs
2. **Test Execution**: Tests run in parallel using `--maxWorkers=50%`
3. **Failure Handling**: If tests fail, the commit is blocked
4. **Success**: If all checks pass, the commit proceeds

## What Happens When Tests Fail?

If tests fail during pre-commit:

```
❌ PRE-COMMIT HOOK FAILED - UNIT TESTS FAILED!
💡 Please fix failing tests before committing
```

**Options:**
1. Fix the failing tests
2. Run tests manually: `npm run test:unit`
3. Skip the hook (not recommended): `git commit --no-verify`

## Test Execution Details

### Unit Tests
- Runs all unit tests
- Uses `--maxWorkers=50%` for parallel execution
- Uses `--passWithNoTests` to allow commits if no tests exist yet

### Integration Tests
- Runs all integration tests
- Uses `--maxWorkers=50%` for parallel execution
- Uses `--passWithNoTests` to allow commits if no tests exist yet

### E2E Tests
- **Skipped in pre-commit** (too slow)
- Run manually: `npm run test:e2e`
- Run in CI/CD: GitHub Actions handles E2E tests

## Switching Hook Modes

To switch between different pre-commit modes:

```bash
# Switch to fast mode with tests (recommended)
npm run pre-commit:fast-tests

# Switch to full mode with tests (current default)
npm run pre-commit:with-tests

# Switch to fast mode (no tests)
npm run pre-commit:fast

# Switch to full mode (includes E2E - slow!)
npm run pre-commit:full
```

## Troubleshooting

### Tests are too slow
- Switch to fast mode: `npm run pre-commit:fast-tests`
- Only runs unit tests (much faster)

### Tests fail but code is correct
- Run tests manually to see full output: `npm run test:unit`
- Check if test setup is correct
- Verify environment variables are set

### Want to skip tests for this commit
```bash
git commit --no-verify -m "your message"
```
⚠️ **Warning**: Only use this if absolutely necessary. Tests exist to catch bugs early!

### Hook not running
```bash
# Reinstall the hook
npm run pre-commit:with-tests

# Or manually
cp Rest/other/.husky/pre-commit-with-tests .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Best Practices

1. **Use fast-tests mode for daily development**
   - Quick feedback
   - Catches most issues
   - Doesn't slow down workflow

2. **Use with-tests mode before pushing**
   - More thorough
   - Catches integration issues
   - Better for shared branches

3. **Run E2E tests manually before releases**
   - Too slow for pre-commit
   - Run: `npm run test:e2e`
   - Or let CI/CD handle it

4. **Fix failing tests immediately**
   - Don't skip the hook
   - Tests catch bugs early
   - Saves time in the long run

## File Locations

- Hook files: `Rest/other/.husky/`
- Active hook: `.git/hooks/pre-commit`
- Test config: `jest.config.js`
- Test scripts: `package.json`

## Related Documentation

- [Comprehensive Test Plan](./COMPREHENSIVE_TEST_PLAN.md)
- [Test Tasks](./tasks/README.md)
- [GitHub Actions Tests](../.github/workflows/tests-parallel.yml)

