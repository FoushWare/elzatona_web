# Test Optimization for 8GB RAM Mac M2

## Overview

This document outlines the optimizations made to test scripts for systems with limited memory (8GB RAM Mac M2).

## Key Optimizations

### 1. Memory Limits

- **Reduced Node.js heap size**: `--max-old-space-size=768` (down from 1024MB)
- **Worker memory limit**: `workerIdleMemoryLimit: '512MB'` - Kills workers that exceed this
- **Sequential mode**: `--runInBand` for very low memory situations (512MB heap)

### 2. Worker Configuration

- **Default workers**: Reduced from 2 to **1 worker** for all test scripts
- **Rationale**: Single worker uses less memory and prevents OOM errors on 8GB systems
- **Configurable**: Can override with `JEST_MAX_WORKERS` environment variable

### 3. Cache Management

- **Default**: Cache enabled for faster subsequent runs
- **Fast mode**: `--no-cache` flag available via `test:*:fast` scripts
- **Trade-off**: Fast mode is slower on first run but uses less memory

### 4. Silent Mode

- All test scripts use `--silent` flag to reduce console output
- Faster execution and less memory for logging

## Available Test Scripts

### Standard Tests (with cache)

```bash
npm run test:unit              # All unit tests (1 worker, 768MB)
npm run test:integration       # All integration tests
npm run test:admin-navbar      # Admin navbar tests
npm run test:questions         # Questions page tests
```

### Fast Tests (no cache, faster but uses more memory)

```bash
npm run test:unit:fast         # Unit tests without cache
npm run test:admin-navbar:fast # Admin navbar without cache
npm run test:questions:fast    # Questions without cache
```

### Sequential Tests (lowest memory, slowest)

```bash
npm run test:unit:sequential  # Runs tests one at a time (512MB heap)
```

### Watch Mode

```bash
npm run test:admin-navbar:watch  # Watch mode for development
```

## Performance Comparison

| Mode       | Workers | Heap Size | Cache | Speed         | Memory Usage |
| ---------- | ------- | --------- | ----- | ------------- | ------------ |
| Standard   | 1       | 768MB     | Yes   | Fast (2-3s)   | Low          |
| Fast       | 1       | 768MB     | No    | Medium (2-4s) | Medium       |
| Sequential | 1       | 512MB     | Yes   | Slow (5-10s)  | Very Low     |

## Environment Variables

You can customize test behavior with environment variables:

```bash
# Set worker count
JEST_MAX_WORKERS=1 npm run test:unit

# Disable cache
JEST_NO_CACHE=true npm run test:unit

# Run sequentially (lowest memory)
JEST_RUN_IN_BAND=true npm run test:unit

# Log heap usage (for debugging)
JEST_LOG_HEAP=true npm run test:unit
```

## Recommendations for 8GB RAM

1. **Use standard scripts** for daily development (cached, fast)
2. **Use fast scripts** when you need fresh runs without cache
3. **Use sequential mode** only if you encounter OOM errors
4. **Close other apps** when running full test suites
5. **Run tests in batches** by category rather than all at once

## Example Usage

```bash
# Quick test run (recommended)
npm run test:admin-navbar

# Fast test without cache
npm run test:admin-navbar:fast

# If you get OOM errors, use sequential
npm run test:unit:sequential
```

## Memory Monitoring

To check memory usage during tests:

```bash
JEST_LOG_HEAP=true npm run test:unit
```

This will log heap usage for each worker, helping identify memory leaks.
