# E2E Testing Guide: Memory Optimization & Safari Setup

## Memory-Constrained Environment (8GB RAM)

### The Problem with next-server

**What is next-server?**

- `next-server` is NOT a required dependency for E2E testing
- Next.js has built-in development server via `next dev` (Turbopack)
- You do NOT need separate "next-server" for E2E tests

**Memory Usage Breakdown (8GB RAM):**

| Component             | Memory Used    | Notes                                |
| --------------------- | -------------- | ------------------------------------ |
| Supabase (local)      | ~400MB         | Test database instance               |
| Next.js admin app     | ~300-500MB     | Dev server with Turbopack            |
| Playwright engine     | ~400-600MB     | Safari/Chromium/Firefox              |
| Node.js (admin tests) | ~200-300MB     | Test runner                          |
| **Total**             | **~1.3-1.7GB** | Safe for 8GB RAM (≈ 20% utilization) |

### ✅ Solution: You CAN optimize for 8GB RAM

**This will NOT affect your work:**

1. **Local development** → Works as-is (no changes needed)
2. **CI/CD pipeline** → Uses memory-optimized test runners (already configured)
3. **Test reliability** → No impact (same test suite)

---

## E2E Testing with Playwright (Safari & Memory)

### Current Setup

Your project uses Playwright with these configurations:

```typescript
// apps/admin/tests/config/playwright.config.ts
{
  workers: 1,  // Sequential test execution (saves RAM)

  use: {
    maxRetries: 0,  // No retries in local
    timeout: 30000,
  },

  projects: [
    { name: 'chromium', ... },
    { name: 'firefox', ... },   // Optional
    // ADDING: { name: 'webkit', ... }  // Safari uses WebKit
  ]
}
```

---

## Setup: Safari for E2E Testing

### Prerequisites

✅ You're on **macOS** (required for Safari/WebKit)  
✅ Playwright supports WebKit (Safari's engine)  
✅ No additional tools needed (uses system WebKit)

### Step 1: Update Playwright Config

Edit [apps/admin/tests/config/playwright.config.ts](../../apps/admin/tests/config/playwright.config.ts):

```typescript
// BEFORE: Only Chromium
projects: [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
];

// AFTER: Add Safari (WebKit)
projects: [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
  {
    name: "safari",
    use: { ...devices["Desktop Safari"] },
  },
];
```

### Step 2: Install WebKit

```bash
# Install WebKit for Safari support (one-time only)
pnpm exec playwright install webkit

# Or install all browsers
pnpm exec playwright install --with-deps
```

### Step 3: Run Tests with Safari

```bash
# Run all tests in Safari only
pnpm exec playwright test --project=safari

# Run specific test in Safari
pnpm exec playwright test admin-bulk-question-addition.crud.spec.ts --project=safari

# Run in both Chrome and Safari
pnpm exec playwright test --project=chromium --project=safari
```

### Step 4: Create npm Scripts (Optional)

Add to [package.json](../../package.json):

```json
{
  "scripts": {
    "test:e2e:safari": "playwright test --config=apps/admin/tests/config/playwright.config.ts --project=safari",
    "test:e2e:chrome": "playwright test --config=apps/admin/tests/config/playwright.config.ts --project=chromium",
    "test:e2e:all": "playwright test --config=apps/admin/tests/config/playwright.config.ts"
  }
}
```

Then run:

```bash
pnpm test:e2e:safari
pnpm test:e2e:chrome
pnpm test:e2e:all
```

---

## Memory Optimization for E2E Tests (8GB RAM)

### Option A: Run Tests Sequentially (Recommended for 8GB)

```bash
# Run one worker at a time (minimal RAM usage)
pnpm exec playwright test --workers=1

# Expected RAM usage: ~600MB-800MB total
```

### Option B: Control Worker Count Dynamically

```bash
# Smart detection based on available RAM
# Uses 1 worker on 8GB, 4+ workers on 16GB+
pnpm exec playwright test --workers=$(node -e "console.log(Math.floor(require('os').totalmem()/1e9) - 4)")
```

### Option C: Environment Variable Control

Create `.env.test` or `.env.test.local`:

```env
# For 8GB RAM machines
PLAYWRIGHT_WORKERS=1
PLAYWRIGHT_TIMEOUT=45000
TERM_PROGRAM=Safari  # Hints to use Safari rendering
```

### Option D: Reduce Parallel Test Shards in CI

Your CI already uses `--workers=1` by design (see `nx.json`):

```json
{
  "taskRunnerOptions": {
    "default": {
      "runner": "nx",
      "options": {
        "parallel": 1 // ✅ Already optimized for RAM
      }
    }
  }
}
```

---

## When to Use Safari vs Chrome for Testing

| Use Case                    | Browser | Reason                                           |
| --------------------------- | ------- | ------------------------------------------------ |
| **Local development**       | Safari  | Lower memory footprint (~100MB less than Chrome) |
| **Quick validation**        | Safari  | Faster on macOS (native WebKit)                  |
| **Full compatibility test** | Chrome  | Catches browser-specific issues                  |
| **CI/CD pipeline**          | Chrome  | Better coverage in cloud                         |
| **Production testing**      | All     | Run all browsers before release                  |

---

## Important Caveats

### ⚠️ Safari & Playwright Differences

1. **Limited debugging tools** → No DevTools in Playwright Safari mode
2. **WebKit-specific rendering** → May catch different bugs than Chrome
3. **Audio/Video handling** → Different codec support
4. **Service Workers** → Limited support (test carefully)

### ⚠️ Testing Strategy

**DO:**

- Use Safari for macOS-specific UI testing
- Include Safari in pre-commit validation
- Test both browsers in CI/CD

**DON'T:**

- Replace Chrome tests entirely (Chrome covers more edge cases)
- Use Safari to catch browser-specific API support (that's what @supports CSS is for)
- Run all browsers locally on 8GB RAM (pick one per session)

---

## Monitoring Memory During Tests

### Monitor in Real-Time

```bash
# Open Activity Monitor (macOS) in separate terminal
open -a "Activity Monitor"

# Then run tests in another terminal
pnpm exec playwright test --project=safari --workers=1
```

### Programmatic Monitoring (Optional)

```bash
# Show memory usage before/after
node -e "console.log('Before:', Math.round(process.memoryUsage().heapUsed / 1024 / 1024), 'MB')"
pnpm exec playwright test --workers=1
node -e "console.log('After cleanup needed')"
```

---

## Troubleshooting

### "WebKit binary not found"

```bash
# Reinstall WebKit
pnpm exec playwright install webkit --with-deps
```

### Safari tests fail but Chrome passes

This usually means:

1. **Timing issue** → Add explicit `page.waitForLoadState('networkidle')`
2. **CSS rendering** → Use `-webkit-` prefixes for animations
3. **Event handling** → Safari is stricter about event delegation
4. **Form input** → Safari handles file inputs differently

### Memory still too high

```bash
# Option 1: Kill background processes
killall -9 node  # ⚠️ Be careful with this!

# Option 2: Use lightweight browser
# Safari uses ~150MB vs Chrome's ~300MB

# Option 3: Reduce test timeout
# Shorter tests = less memory accumulation
pnpm exec playwright test --timeout=15000  # 15s instead of 30s
```

---

## Next Steps

1. **Update Playwright config** to include Safari project
2. **Install WebKit** via `pnpm exec playwright install webkit`
3. **Run a sample test** in Safari: `pnpm exec playwright test --project=safari --workers=1`
4. **Monitor memory** using Activity Monitor during test runs
5. **Document results** (which tests pass/fail in Safari vs Chrome)

---

**Reference**:

- [Playwright Safari Support](https://playwright.dev/docs/browsers#safari)
- [Testing on Different Browsers](https://playwright.dev/docs/ci)
- [Memory Management for E2E Tests](https://playwright.dev/docs/api/class-browser#browser-creation-shared)

**Last Updated**: March 28, 2026
