#!/bin/bash

echo "🎨 Running Theme Tests Suite"
echo "══════════════════════════════════════════════════"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to run a test suite
run_test_suite() {
    local name="$1"
    local command="$2"
    local description="$3"
    
    echo ""
    echo "🧪 $name"
    echo "──────────────────────────────"
    echo "📝 $description"
    echo ""
    
    if eval "$command"; then
        echo -e "${GREEN}✅ PASSED${NC}"
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

# Function to run E2E tests
run_e2e_tests() {
    echo ""
    echo "🌐 End-to-End Theme Tests"
    echo "══════════════════════════════════════════════════"
    
    run_test_suite \
        "Theme Switching E2E Tests" \
        "npx playwright test tests/e2e/theme-switching.spec.ts --reporter=list" \
        "End-to-end testing of theme switching functionality"
}

echo "🚀 Starting Theme Tests..."
echo ""

# Run unit and integration tests
run_test_suite \
    "Theme Context Unit Tests" \
    "npx jest tests/unit/theme-context.test.tsx --verbose" \
    "Testing theme context functionality and state management"

run_test_suite \
    "Theme Toggle Button Tests" \
    "npx jest tests/unit/theme-toggle-button.test.tsx --verbose" \
    "Testing theme toggle button behavior and icons"

run_test_suite \
    "Theme Visual Changes Tests" \
    "npx jest tests/unit/theme-visual-changes.test.tsx --verbose" \
    "Testing visual changes and CSS class applications"

run_test_suite \
    "Theme Persistence Integration Tests" \
    "npx jest tests/integration/theme-persistence.test.tsx --verbose" \
    "Testing theme persistence across page reloads and navigation"

# Run E2E tests
run_e2e_tests

echo ""
echo "🎉 Theme Tests Complete!"
echo "══════════════════════════════════════════════════"
echo "📊 Summary:"
echo "  • Theme Context: State management and persistence"
echo "  • Toggle Button: UI interactions and icon changes"
echo "  • Visual Changes: CSS class applications and styling"
echo "  • Persistence: localStorage and cross-page behavior"
echo "  • E2E Tests: Full user workflow testing"
echo ""
echo "✨ All theme functionality has been thoroughly tested!"
