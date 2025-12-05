#!/bin/bash
# Cleanup Playwright test videos after successful test runs
# Removes videos from test-results/ and playwright-report/ directories

set -e

echo "🧹 Cleaning up Playwright test videos..."

# Clean up videos from test-results directory
if [ -d "test-results" ]; then
  VIDEO_COUNT=$(find test-results -name "*.webm" -o -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$VIDEO_COUNT" -gt 0 ]; then
    echo "   📹 Found $VIDEO_COUNT video(s) in test-results/"
    find test-results -name "*.webm" -o -name "*.mp4" | xargs rm -f 2>/dev/null || true
    echo "   ✅ Removed videos from test-results/"
  else
    echo "   ℹ️  No videos found in test-results/"
  fi
else
  echo "   ℹ️  test-results/ directory not found"
fi

# Clean up videos from playwright-report directory
if [ -d "playwright-report" ]; then
  # Check for videos in data subdirectory (where Playwright stores them)
  if [ -d "playwright-report/data" ]; then
    VIDEO_COUNT=$(find playwright-report/data -name "*.webm" -o -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$VIDEO_COUNT" -gt 0 ]; then
      echo "   📹 Found $VIDEO_COUNT video(s) in playwright-report/data/"
      find playwright-report/data -name "*.webm" -o -name "*.mp4" | xargs rm -f 2>/dev/null || true
      echo "   ✅ Removed videos from playwright-report/data/"
    else
      echo "   ℹ️  No videos found in playwright-report/data/"
    fi
  fi
  
  # Also check root of playwright-report
  VIDEO_COUNT=$(find playwright-report -maxdepth 1 -name "*.webm" -o -name "*.mp4" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$VIDEO_COUNT" -gt 0 ]; then
    echo "   📹 Found $VIDEO_COUNT video(s) in playwright-report/"
    find playwright-report -maxdepth 1 -name "*.webm" -o -name "*.mp4" | xargs rm -f 2>/dev/null || true
    echo "   ✅ Removed videos from playwright-report/"
  fi
else
  echo "   ℹ️  playwright-report/ directory not found"
fi

echo "✅ Playwright video cleanup complete!"
echo ""

