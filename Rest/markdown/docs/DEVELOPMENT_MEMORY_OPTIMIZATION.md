# Development Memory Optimization Guide

## Overview

This guide helps developers optimize memory usage during development, especially on systems with limited RAM (8GB or less). Node.js and Next.js can be memory-intensive, and this document provides strategies to keep your system responsive.

## Problem

- Node.js default heap can use 1.5-2GB+ on 64-bit systems
- Next.js dev server with hot reloading is memory-intensive
- Jest tests can spawn many worker processes
- System swap usage causes slowdowns and hangs

## Solution

We've implemented several optimizations to reduce memory usage:

### 1. Node.js Memory Limits

All development scripts now include memory limits via `NODE_OPTIONS`:

- **Standard dev mode**: `--max-old-space-size=2048` (2GB limit)
- **Light dev mode**: `--max-old-space-size=1536` (1.5GB limit)
- **Test scripts**: `--max-old-space-size=1024` (1GB limit)

### 2. Development Scripts

#### Available Commands

```bash
# Standard development (2GB memory limit)
npm run dev

# Light mode for lower memory usage (1.5GB limit)
npm run dev:light

# Turbopack mode (more memory-efficient, 2GB limit)
npm run dev:turbo

# Admin panel (2GB memory limit)
npm run dev:admin

# Check current memory usage
npm run dev:memory-check
```

#### When to Use Each Mode

- **`npm run dev`**: Default mode, good for most development
- **`npm run dev:light`**: Use when system is slow or swap is high
- **`npm run dev:turbo`**: Recommended for faster builds and lower memory usage
- **`npm run dev:memory-check`**: Monitor memory usage anytime

### 3. Test Scripts

All test scripts now use:
- Fixed worker count: `--maxWorkers=2` (instead of 50% of CPU cores)
- Memory limit: `--max-old-space-size=1024` (1GB per worker)

This prevents Jest from spawning too many processes that consume memory.

### 4. Next.js Configuration

We've optimized `next.config.ts` for memory efficiency:

- **Turbopack enabled**: More memory-efficient than Webpack
- **Reduced webpack cache**: Limits memory footprint in development
- **Optimized bundle splitting**: Only in production builds

### 5. Jest Configuration

Updated `jest.config.js`:
- Fixed `maxWorkers` to 2 (instead of percentage-based)
- Applies to both CI and local development

## Best Practices

### During Development

1. **Use Light Mode When Needed**
   ```bash
   npm run dev:light
   ```
   Use this if you notice system slowdowns or high swap usage.

2. **Prefer Turbopack**
   ```bash
   npm run dev:turbo
   ```
   Turbopack is faster and more memory-efficient than Webpack.

3. **Monitor Memory Usage**
   ```bash
   npm run dev:memory-check
   ```
   Run this periodically to check if Node processes are using too much memory.

4. **Close Unnecessary Applications**
   - Close browser tabs you're not using
   - Close other development tools (IDEs, terminals)
   - Quit applications you're not actively using

5. **Restart Dev Server Periodically**
   - If memory usage keeps growing, restart the dev server
   - Memory leaks in development can accumulate over time

### When Running Tests

1. **Run Tests Selectively**
   ```bash
   # Run only unit tests
   npm run test:unit
   
   # Run only specific test suite
   npm run test:unit:admin
   ```

2. **Avoid Running All Tests at Once**
   - Tests are configured with 2 workers max
   - Still, running all tests can use significant memory
   - Run tests in smaller batches when possible

3. **Use Watch Mode Sparingly**
   - Watch mode keeps processes running
   - Use it only when actively developing tests

### System-Level Optimizations

1. **Check Swap Usage**
   ```bash
   # macOS
   sysctl vm.swapusage
   
   # If swap usage is high (>500MB), consider:
   # - Using dev:light mode
   # - Closing other applications
   # - Restarting the dev server
   ```

2. **Monitor System Memory**
   ```bash
   # macOS Activity Monitor
   open -a "Activity Monitor"
   
   # Or use the memory check script
   npm run dev:memory-check
   ```

3. **Free Up Memory**
   - Restart your Mac if memory pressure is consistently high
   - Close unused applications
   - Clear browser cache and close tabs
   - Restart development tools

## Troubleshooting

### System is Still Slow

1. Check current memory usage:
   ```bash
   npm run dev:memory-check
   ```

2. Switch to light mode:
   ```bash
   npm run dev:light
   ```

3. Close other applications and browser tabs

4. Restart the dev server:
   - Stop current server (Ctrl+C)
   - Run `npm run dev:light` again

5. If still slow, restart your Mac to clear system memory

### High Swap Usage

If swap usage is consistently high (>500MB):

1. Use `npm run dev:light` instead of `npm run dev`
2. Close other applications
3. Restart the dev server
4. Consider upgrading RAM if this is a persistent issue

### Node Process Using Too Much Memory

1. Check which processes are using memory:
   ```bash
   npm run dev:memory-check
   ```

2. Kill specific processes if needed:
   ```bash
   # Find process ID
   ps aux | grep node
   
   # Kill specific process (replace PID)
   kill -9 <PID>
   ```

3. Restart the dev server

### Tests Failing Due to Memory

1. Reduce test concurrency:
   ```bash
   # Tests already use maxWorkers=2, but you can run in band:
   JEST_RUN_IN_BAND=true npm run test:unit
   ```

2. Run tests in smaller batches:
   ```bash
   npm run test:unit:admin
   npm run test:unit:shared-components
   # etc.
   ```

## Memory Limits Reference

| Script | Memory Limit | Workers | Use Case |
|--------|-------------|---------|----------|
| `dev` | 2GB | N/A | Standard development |
| `dev:light` | 1.5GB | N/A | Low memory systems |
| `dev:turbo` | 2GB | N/A | Faster builds (recommended) |
| `test:unit` | 1GB | 2 | Unit tests |
| `test:integration` | 1GB | 2 | Integration tests |

## Additional Resources

- [Node.js Memory Management](https://nodejs.org/en/docs/guides/simple-profiling/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Jest Performance](https://jestjs.io/docs/troubleshooting#performance)

## Summary

The key optimizations implemented:

1. ✅ Node.js memory limits on all dev/test scripts
2. ✅ Fixed Jest worker count (2 instead of 50% of cores)
3. ✅ Turbopack enabled for more efficient builds
4. ✅ Memory-efficient webpack configuration
5. ✅ Memory monitoring script
6. ✅ Light mode for constrained systems

These changes should significantly reduce memory usage and prevent system slowdowns during development.









