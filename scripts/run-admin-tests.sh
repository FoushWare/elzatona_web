#!/bin/bash

# Admin Test Runner Script
# This script runs all admin-related tests to ensure functionality

set -e

echo "🚀 Admin Test Runner"
echo "══════════════════════════════════════════════════"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if test files exist
echo "🔍 Checking test files..."
test_files=(
    "tests/unit/admin-auth.test.ts"
    "tests/unit/admin-login-page.test.tsx"
    "tests/unit/admin-layout.test.tsx"
    "tests/unit/admin-routing.test.tsx"
    "tests/integration/admin-auth-flow.test.ts"
    "tests/integration/admin-routing-stability.test.ts"
    "tests/e2e/admin-login-flow.spec.ts"
    "tests/e2e/admin-routing-flow.spec.ts"
)

missing_files=()
for file in "${test_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "⚠️  Missing test files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo "❌ Some test files are missing. Please create them first."
    exit 1
fi

echo "✅ All test files exist!"

# Parse arguments
test_type=${1:-"all"}
verbose=${2:-""}

echo ""
echo "📋 Running $test_type tests..."

# Function to run Jest tests
run_jest_tests() {
    local pattern=$1
    local description=$2
    
    echo "🧪 Running $description..."
    echo "──────────────────────────────"
    
    if [ "$verbose" = "--verbose" ] || [ "$verbose" = "-v" ]; then
        npx jest "$pattern" --verbose --passWithNoTests
    else
        npx jest "$pattern" --passWithNoTests
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ $description passed!"
        return 0
    else
        echo "❌ $description failed!"
        return 1
    fi
}

# Function to run Playwright tests
run_playwright_tests() {
    local spec_file=$1
    local description=$2
    
    echo "🎭 Running $description..."
    echo "──────────────────────────────"
    
    if [ "$verbose" = "--verbose" ] || [ "$verbose" = "-v" ]; then
        npx playwright test "$spec_file" --reporter=list
    else
        npx playwright test "$spec_file"
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ $description passed!"
        return 0
    else
        echo "❌ $description failed!"
        return 1
    fi
}

# Run tests based on type
all_passed=true

case $test_type in
    "unit")
        run_jest_tests "tests/unit/admin-*.test.{ts,tsx}" "Unit tests"
        all_passed=$?
        ;;
    "integration")
        run_jest_tests "tests/integration/admin-*.test.{ts,tsx}" "Integration tests"
        all_passed=$?
        ;;
    "e2e")
        run_playwright_tests "tests/e2e/admin-login-flow.spec.ts" "E2E tests"
        all_passed=$?
        ;;
    "all")
        # Run unit tests
        run_jest_tests "tests/unit/admin-*.test.{ts,tsx}" "Unit tests"
        unit_passed=$?
        
        # Run integration tests
        run_jest_tests "tests/integration/admin-*.test.{ts,tsx}" "Integration tests"
        integration_passed=$?
        
        # Run E2E tests
        run_playwright_tests "tests/e2e/admin-login-flow.spec.ts" "E2E tests"
        e2e_passed=$?
        
        if [ $unit_passed -eq 0 ] && [ $integration_passed -eq 0 ] && [ $e2e_passed -eq 0 ]; then
            all_passed=0
        else
            all_passed=1
        fi
        ;;
    *)
        echo "❌ Invalid test type: $test_type"
        echo "Valid types: unit, integration, e2e, all"
        exit 1
        ;;
esac

echo ""
echo "══════════════════════════════════════════════════"

if [ $all_passed -eq 0 ]; then
    echo "🎉 All admin tests passed!"
    echo "✅ Admin functionality is working correctly."
    echo "🛡️  Protected against routing and authentication issues."
else
    echo "💥 Some admin tests failed!"
    echo "🔧 Please fix the failing tests before proceeding."
    exit 1
fi
