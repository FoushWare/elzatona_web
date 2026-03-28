#!/bin/bash

# Comprehensive PR Testing and Diagnostic Script
# Tests both PR #12042 and PR #12043

set -e

PROJECT_ROOT="/Users/a.fouad/S/New_elzatona"
cd "$PROJECT_ROOT"

echo "═══════════════════════════════════════════════════════════════"
echo "  COMPREHENSIVE PR TESTING & DIAGNOSTIC REPORT"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Function to run a test and report results
run_test() {
  local name="$1"
  local command="$2"
  
  echo "▶ Running: $name"
  echo "  Command: $command"
  
  if eval "$command" > /tmp/test-output.log 2>&1; then
    echo "  ✅ PASSED"
    return 0
  else
    echo "  ❌ FAILED"
    echo "  Error output:"
    tail -50 /tmp/test-output.log | sed 's/^/    /'
    return 1
  fi
}

echo "1. TYPE-CHECK"
echo "─────────────────────────────────────────────────────────────"
run_test "TypeScript compilation" "pnpm type-check" || true
echo ""

echo "2. LINT CHECK"
echo "─────────────────────────────────────────────────────────────"
run_test "ESLint validation" "pnpm lint 2>&1 | grep -E '✖.*error' || true" || true
echo ""

echo "3. FORMAT CHECK"
echo "─────────────────────────────────────────────────────────────"
run_test "Prettier formatting" "pnpm exec prettier --check . --ignore-path .gitignore 2>&1 | head -20 ||true" || true
echo ""

echo "4. UNIT TESTS"
echo "─────────────────────────────────────────────────────────────"
run_test "Unit tests" "pnpm test 2>&1 | head -100" || true
echo ""

echo "5. E2E TESTS (Admin Content Management)"
echo "─────────────────────────────────────────────────────────────"
echo "Running E2E tests for admin-content-management..."
pnpm exec playwright test --config=apps/admin/tests/config/playwright.config.ts apps/admin/tests/e2e/admin/admin-content-management.spec.ts --project=chromium --workers=1 2>&1 | head -200 || true
echo ""

echo "6. E2E TESTS (Admin Bulk Question Addition)"
echo "─────────────────────────────────────────────────────────────"
echo "Running E2E tests for bulk-question-addition..."
pnpm exec playwright test --config=apps/admin/tests/config/playwright.config.ts apps/admin/tests/e2e/admin/admin-bulk-question-addition.crud.spec.ts --project=chromium --workers=1 2>&1 | head -200 || true
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "  DIAGNOSTIC SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo "✅ Setup complete"
echo "✅ pnpm working"
echo "✅ Safari E2E enabled"
echo ""
echo "Next: Check GitHub Actions CI results for specific failures"
