# Playwright Video Cleanup Guide

## 🎯 Overview

Playwright test videos are automatically cleaned up after successful test runs to save disk space. Videos are only kept for failed tests to help with debugging.

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

Videos are configured to only be retained on failure:

```typescript
video: 'retain-on-failure', // Record videos for failed tests only, auto-cleanup on success
```

**Video Options:**

- `'off'` - No videos recorded (saves most space, no debugging)
- `'on'` - Videos always recorded (uses most space)
- `'retain-on-failure'` - ✅ **RECOMMENDED** - Videos only kept for failed tests
- `'on-first-retry'` - Videos only on retries

### Automatic Cleanup

Videos are automatically cleaned up in multiple places:

1. **Global Teardown** (`tests/e2e/global-teardown.ts`)
   - Runs after all tests complete
   - Removes videos from successful test runs
   - Keeps videos for failed tests

2. **Pre-Push Hook** (`.git/hooks/pre-push`)
   - Runs before pushing to GitHub
   - Cleans up any remaining videos
   - Ensures no videos are pushed to GitHub

3. **Manual Cleanup Script** (`scripts/cleanup-playwright-videos.sh`)
   - Can be run manually: `npm run cleanup:playwright-videos`
   - Removes videos from `test-results/` and `playwright-report/` directories

## 📊 Space Savings

- **Before cleanup:** Videos can accumulate to 22GB+ (as seen in Rest/other/playwright-report/)
- **After cleanup:** Only failed test videos kept (~few MB typically)
- **Space saved:** ~22GB+ per test run

## 🚀 Usage

### Automatic (Recommended)

Videos are automatically cleaned up:

- ✅ After test runs (via global teardown)
- ✅ Before pushing to GitHub (via pre-push hook)

### Manual Cleanup

If you need to manually clean up videos:

```bash
npm run cleanup:playwright-videos
```

Or directly:

```bash
bash scripts/cleanup-playwright-videos.sh
```

## 📁 What Gets Cleaned

The cleanup script removes:

- `test-results/**/*.webm` - Video files from test results
- `test-results/**/*.mp4` - Video files (if any)
- `playwright-report/data/*.webm` - Videos in HTML reports
- `playwright-report/data/*.mp4` - Videos (if any)

**What's Kept:**

- ✅ Failed test videos (for debugging)
- ✅ Test result JSON/XML files
- ✅ Screenshots (on failure)
- ✅ HTML reports (without videos)

## 🔒 GitHub Protection

Videos are already in `.gitignore`:

- `playwright-report/`
- `test-results/` (except JSON/XML reports)

This ensures videos are never committed to GitHub, saving repository space.

## 💡 Best Practices

1. **Use `retain-on-failure`** - Best balance of debugging and space savings
2. **Run cleanup regularly** - Automatic cleanup handles this
3. **Check failed test videos** - Review videos before they're cleaned up
4. **Monitor disk space** - Use `du -sh playwright-report/` to check size

## 🛠️ Troubleshooting

### Videos Not Being Cleaned

1. Check if cleanup script exists: `ls scripts/cleanup-playwright-videos.sh`
2. Check script permissions: `chmod +x scripts/cleanup-playwright-videos.sh`
3. Run manually: `npm run cleanup:playwright-videos`

### Videos Still Taking Space

1. Check for videos: `find . -name "*.webm" -o -name "*.mp4" | head -10`
2. Check directory sizes: `du -sh test-results/ playwright-report/`
3. Run cleanup manually: `npm run cleanup:playwright-videos`

### Want to Keep All Videos

If you need to keep all videos (not recommended for space):

1. Change config: `video: 'on'` in `playwright.config.ts`
2. Remove cleanup from global teardown
3. Remove cleanup from pre-push hook

---

**Last Updated:** December 2024  
**Status:** Automatic video cleanup configured ✅
