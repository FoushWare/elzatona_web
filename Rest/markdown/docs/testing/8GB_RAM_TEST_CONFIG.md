# Test Configuration for 8GB RAM Mac

## Overview

All test configurations have been optimized for systems with 8GB RAM (Mac M2). This document outlines the optimizations applied.

## Key Optimizations Applied

### 1. Jest Configuration

All Jest configs now include:

- **maxWorkers: 1** - Single worker to prevent memory overload
- **workerIdleMemoryLimit: '512MB'** - Kills workers exceeding memory limit
- **Memory limit: 768MB** - Node.js heap size limit for test processes
- **Cache enabled** - Faster subsequent runs (can be disabled with `JEST_NO_CACHE=true`)

### 2. Playwright Configuration

- **workers: 1** - Single worker for all E2E tests
- **fullyParallel: false** - Tests run sequentially
- **video: 'off'** - Disabled to save memory (can enable per-test if needed)
- **Memory limit: 1536MB** - Node.js heap size for Playwright processes
- **Dev server: light mode** - Uses `dev:light` (1.5GB limit) instead of standard dev

### 3. Test Scripts

All test scripts in `package.json` now include:

- `NODE_OPTIONS=--max-old-space-size=768` for Jest tests
- `NODE_OPTIONS=--max-old-space-size=1536` for Playwright tests
- `JEST_MAX_WORKERS=1` environment variable
- `--maxWorkers=1` or `--workers=1` flags

## Updated Configurations

### Jest Configs Updated:

- ✅ `apps/website/jest.config.js`
- ✅ `apps/admin/jest.config.js`
- ✅ `jest.config.js` (root)
- ✅ `libs/utils/jest.config.ts`
- ✅ `libs/auth/jest.config.ts`
- ✅ `libs/database/jest.config.ts`
- ✅ `libs/ui/jest.config.ts`

### Playwright Config Updated:

- ✅ `playwright.config.ts`

### Package.json Scripts Updated:

- ✅ All `test:*` scripts
- ✅ All `test:e2e:*` scripts
- ✅ All `test:unit:*` scripts
- ✅ All `test:integration:*` scripts

## Memory Limits Summary

| Test Type        | Node Heap Size | Workers     | Use Case            |
| ---------------- | -------------- | ----------- | ------------------- |
| Jest Unit        | 768MB          | 1           | Unit tests          |
| Jest Integration | 768MB          | 1           | Integration tests   |
| Jest Sequential  | 512MB          | 1 (in-band) | Low memory fallback |
| Playwright E2E   | 1536MB         | 1           | End-to-end tests    |
| Dev Server (E2E) | 1536MB         | N/A         | Light mode for E2E  |

## Environment Variables

You can override defaults with environment variables:

```bash
# Use more workers (if you have more RAM)
JEST_MAX_WORKERS=2 npm run test:unit

# Disable cache (uses less memory, slower)
JEST_NO_CACHE=true npm run test:unit

# Run sequentially (lowest memory)
JEST_RUN_IN_BAND=true npm run test:unit

# Log heap usage (for debugging)
JEST_LOG_HEAP=true npm run test:unit
```

## Recommendations

1. **Run tests selectively** - Don't run all tests at once
2. **Close other apps** - Free up memory before running tests
3. **Use watch mode sparingly** - Only when actively developing tests
4. **Run E2E tests separately** - They use more memory
5. **Use sequential mode** - If you encounter OOM errors

## Troubleshooting

### Out of Memory Errors

If you still get OOM errors:

1. **Use sequential mode:**

   ```bash
   npm run test:unit:sequential
   ```

2. **Disable cache:**

   ```bash
   JEST_NO_CACHE=true npm run test:unit
   ```

3. **Close other applications:**
   - Close browser tabs
   - Close IDEs/editors not in use
   - Quit other Node processes

4. **Check memory usage:**
   ```bash
   npm run dev:memory-check
   ```

### Slow Test Execution

Tests will be slower with 1 worker, but this is necessary for 8GB RAM systems. To speed up:

1. **Run specific test suites** instead of all tests
2. **Use watch mode** for faster feedback during development
3. **Enable cache** (default) for faster subsequent runs

## Performance Comparison

| Configuration       | Workers     | Memory   | Speed  | Stability      |
| ------------------- | ----------- | -------- | ------ | -------------- |
| **Optimized (8GB)** | 1           | Low      | Medium | ✅ Stable      |
| Standard            | 2-4         | High     | Fast   | ⚠️ May OOM     |
| Sequential          | 1 (in-band) | Very Low | Slow   | ✅ Most Stable |

## Summary

All test configurations are now optimized for 8GB RAM systems:

- ✅ Single worker for all test types
- ✅ Memory limits on all test processes
- ✅ Sequential E2E tests
- ✅ Light mode dev server for E2E
- ✅ Configurable via environment variables

These changes ensure tests run reliably on 8GB RAM Mac systems without out-of-memory errors.
