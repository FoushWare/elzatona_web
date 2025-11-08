# GitHub Actions Test Batches Setup

This document explains how the test batching system works with GitHub Actions to avoid timeout issues.

## Problem

GitHub Actions has time limits:

- **Free tier**: 20 minutes per job
- **Pro tier**: 60 minutes per job
- **Team/Enterprise**: 360 minutes per job

Running all tests sequentially can easily exceed these limits, especially with 18+ test files.

## Solution

We've split tests into **18 small batches** that can run in **parallel**, each completing in < 5 minutes.

## Test Batches

### Batch Structure (18 batches total)

1. **Navbar Simple Test** - `apps/website/src/__tests__/navbar-simple.test.tsx`
2. **Flashcards Utils Test** - `apps/website/src/__tests__/flashcards-utils.test.ts`
3. **Cart Utils Test** - `apps/website/src/__tests__/cart-utils.test.ts`
4. **Learning Type Context Test** - `apps/website/src/__tests__/learning-type-context.test.tsx`
5. **Database Switching Test** - `libs/database/src/lib/__tests__/database-switching.test.ts`
6. **Admin Login API Test** - `tests/admin/admin-login-api.test.ts`
7. **Admin Auth Integration Test** - `tests/admin/admin-auth-integration.test.ts`
8. **Content Management API Test** - `tests/admin/content-management-api.test.ts`
9. **Frontend Problem Solving API Test** - `tests/admin/frontend-problem-solving-api.test.ts`
10. **Admin Login Page Test** - `tests/admin/admin-login-page.test.tsx`
11. **Admin Login UI Test** - `tests/admin/admin-login-ui.test.tsx`
12. **Admin UI Components Test** - `tests/admin/admin-ui-components.test.tsx`
13. **Admin Dashboard Redirection Test** - `tests/admin/admin-dashboard-redirection.test.tsx`
14. **Admin Login Integration Test** - `tests/admin/admin-login-integration.test.tsx`
15. **Admin Integration Test** - `tests/admin/admin-integration.test.tsx`
16. **Navbar Switching Fix Test** - `tests/admin/navbar-switching-fix.test.tsx`
17. **Learning Type Context Unit Test** - `tests/unit/learning-type-context.test.tsx`
18. **Simple Test** - `tests/simple.test.js`

## GitHub Actions Workflows

### 1. Parallel Execution (Recommended) - `.github/workflows/test-batches.yml`

Runs all 18 batches **in parallel** using a matrix strategy:

```yaml
strategy:
  matrix:
    batch_num: [1, 2, 3, ..., 18]
```

**Benefits:**

- All batches run simultaneously
- Total time: ~5-10 minutes (time of slowest batch)
- Fast feedback
- Uses more concurrent jobs (18 jobs)

**When to use:**

- Default for CI/CD
- When you have enough GitHub Actions minutes
- For fast feedback

### 2. Sequential Execution (Fallback) - `.github/workflows/test-batches-sequential.yml`

Runs all batches **one after another**:

**Benefits:**

- Uses only 1 job
- Saves GitHub Actions minutes
- Each batch completes in < 5 minutes
- Total time: ~15-30 minutes

**When to use:**

- When running low on GitHub Actions minutes
- For manual testing
- When parallel jobs are limited

### 3. Main CI Workflow - `.github/workflows/ci.yml`

Complete CI pipeline that includes:

- Lint check
- TypeScript check
- Build
- Test batches (parallel)
- Summary

## Running Tests Locally

### Run All Batches Sequentially

```bash
bash .cursor/run-tests-in-batches.sh
```

### Run a Specific Batch

```bash
BATCH_NUM=1 bash .cursor/run-tests-in-batches.sh
BATCH_NUM=5 bash .cursor/run-tests-in-batches.sh
```

### Run Multiple Specific Batches

```bash
for batch in 1 2 3; do
  BATCH_NUM=$batch bash .cursor/run-tests-in-batches.sh
done
```

## Time Estimates

### Parallel Execution (GitHub Actions)

- **Per batch**: 1-5 minutes
- **Total time**: ~5-10 minutes (all run simultaneously)
- **Concurrent jobs**: 18

### Sequential Execution

- **Per batch**: 1-5 minutes
- **Total time**: ~15-30 minutes (sum of all batches)
- **Concurrent jobs**: 1

## Configuration

### Environment Variables

Set these secrets in GitHub Actions:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Or they'll use test defaults.

### Timeout Settings

Each batch job has:

```yaml
timeout-minutes: 10
```

This ensures no single batch hangs indefinitely.

## Adding New Tests

When adding new test files:

1. Add the test file path to the `BATCHES` array in `.cursor/run-tests-in-batches.sh`
2. Add a descriptive name to `BATCH_NAMES`
3. Update the matrix in `.github/workflows/test-batches.yml` if needed
4. Keep batches small (< 5 minutes each)

## Monitoring

### Check Batch Status

In GitHub Actions, you'll see:

- Individual job for each batch (1-18)
- Summary job showing all results
- Artifacts with test output for each batch

### Viewing Results

1. Go to GitHub Actions tab
2. Click on the workflow run
3. See all 18 batch jobs running in parallel
4. Click any batch to see detailed output
5. Check the summary job for overall status

## Troubleshooting

### Batch Times Out

If a batch exceeds 10 minutes:

1. Check the batch output for slow tests
2. Consider splitting that batch further
3. Look for tests that might be hanging

### Batch Fails

1. Check the batch output log
2. Fix the failing test(s)
3. Re-run just that batch: `BATCH_NUM=X bash .cursor/run-tests-in-batches.sh`

### All Batches Fail

1. Check if it's a setup issue (dependencies, environment)
2. Verify environment variables are set
3. Check if it's a code issue affecting all tests

## Benefits

✅ **Avoids timeouts** - Each batch completes quickly  
✅ **Parallel execution** - Fast feedback (5-10 min vs 30+ min)  
✅ **Better isolation** - Failures in one batch don't block others  
✅ **Easier debugging** - Know exactly which batch/test failed  
✅ **Scalable** - Easy to add more batches as tests grow  
✅ **Flexible** - Can run sequentially if needed

## Best Practices

1. **Keep batches small** - Each should complete in < 5 minutes
2. **Group related tests** - Put similar tests in same batch
3. **Balance batch sizes** - Don't put all slow tests in one batch
4. **Test locally first** - Run batches locally before pushing
5. **Monitor regularly** - Check which batches are slowest
