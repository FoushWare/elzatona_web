#!/bin/bash

# Complete Test Suite Execution Script
# Run all automated tests for each task in the manual testing workflow

set -e  # Exit on error

echo "🧪 Starting Complete Test Suite Execution..."
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
TOTAL_TASKS=0
PASSED_TASKS=0
FAILED_TASKS=0

# Function to run tests and track results
run_test_suite() {
    local task_name=$1
    local unit_test=$2
    local integration_test=$3
    local e2e_test=$4
    
    TOTAL_TASKS=$((TOTAL_TASKS + 1))
    
    echo ""
    echo "📋 $task_name"
    echo "----------------------"
    
    local task_passed=true
    
    # Unit Tests
    if [ -n "$unit_test" ]; then
        echo "🧪 Running Unit Tests..."
        if npm run test:unit -- "$unit_test" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Unit Tests: PASSED${NC}"
        else
            echo -e "${RED}❌ Unit Tests: FAILED${NC}"
            task_passed=false
        fi
    fi
    
    # Integration Tests
    if [ -n "$integration_test" ]; then
        echo "🔗 Running Integration Tests..."
        if npm run test:integration -- "$integration_test" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Integration Tests: PASSED${NC}"
        else
            echo -e "${RED}❌ Integration Tests: FAILED${NC}"
            task_passed=false
        fi
    fi
    
    # E2E Tests
    if [ -n "$e2e_test" ]; then
        echo "🌐 Running E2E Tests..."
        if npm run test:e2e:headed -- "$e2e_test" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ E2E Tests: PASSED${NC}"
        else
            echo -e "${RED}❌ E2E Tests: FAILED${NC}"
            task_passed=false
        fi
    fi
    
    if [ "$task_passed" = true ]; then
        PASSED_TASKS=$((PASSED_TASKS + 1))
        echo -e "${GREEN}✅ $task_name: ALL TESTS PASSED${NC}"
    else
        FAILED_TASKS=$((FAILED_TASKS + 1))
        echo -e "${RED}❌ $task_name: SOME TESTS FAILED${NC}"
    fi
}

# Task 2: Admin Login
run_test_suite \
    "Task 2: Admin Login" \
    "apps/website/src/app/admin/login/page.test.tsx" \
    "apps/website/src/app/admin/login/page.integration.test.tsx" \
    "tests/e2e/admin/admin-login.spec.ts"

# Task 3: Admin Dashboard
run_test_suite \
    "Task 3: Admin Dashboard" \
    "apps/website/src/app/admin/dashboard/page.test.tsx" \
    "apps/website/src/app/admin/dashboard/page.integration.test.tsx" \
    "tests/e2e/admin/admin-dashboard.spec.ts"

# Task 1: Question Management
echo ""
echo "📋 Task 1: Question Management"
echo "--------------------------------"
echo "🧪 Running Unit Tests..."
if npm run test:unit -- "apps/website/src/app/admin/content/questions/page.test.tsx" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Unit Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Unit Tests: FAILED${NC}"
fi

echo "🔗 Running Integration Tests..."
if npm run test:integration -- "apps/website/src/app/admin/content/questions/page.integration.test.tsx" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Integration Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Integration Tests: FAILED${NC}"
fi

echo "🌐 Running E2E Tests (all suites)..."
if npm run test:e2e:admin:questions > /dev/null 2>&1; then
    echo -e "${GREEN}✅ E2E Tests: PASSED${NC}"
else
    echo -e "${RED}❌ E2E Tests: FAILED${NC}"
fi

# Task G-006: Guided Practice
run_test_suite \
    "Task G-006: Guided Practice" \
    "apps/website/src/app/guided-practice/page.test.tsx" \
    "apps/website/src/app/guided-practice/page.integration.test.tsx" \
    "tests/e2e/guided-flow/guided-practice-localStorage.spec.ts"

# Summary
echo ""
echo "=========================================="
echo "📊 Test Execution Summary"
echo "=========================================="
echo "Total Tasks: $TOTAL_TASKS"
echo -e "${GREEN}Passed: $PASSED_TASKS${NC}"
echo -e "${RED}Failed: $FAILED_TASKS${NC}"
echo ""

if [ $FAILED_TASKS -eq 0 ]; then
    echo -e "${GREEN}✅ All Tests Passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some Tests Failed. Review output above.${NC}"
    exit 1
fi

