#!/usr/bin/env bash
set -euo pipefail

DEEP=0
if [[ "${1:-}" == "--deep" ]]; then
  DEEP=1
fi

echo "Cleaning build caches and generated artifacts..."

# Common caches/artifacts
rm -rf .turbo
rm -rf .nx/cache
rm -rf node_modules/.cache
rm -rf apps/website/.next
rm -rf apps/admin/.next
rm -rf dist
rm -rf build

if [[ "$DEEP" -eq 1 ]]; then
  echo "Running deep cleanup..."
  rm -rf coverage
  rm -rf test-results
  rm -rf playwright-report
  rm -rf .eslintcache
fi

echo "Cleanup complete."
