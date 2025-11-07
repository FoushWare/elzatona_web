#!/bin/bash

# Script to run tests in batches optimized for GitHub Actions
# Many small batches that can run in parallel to avoid timeout issues
# GitHub Actions free tier: 20 min/job, Pro: 60 min/job

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Allow running a specific batch via BATCH_NUM environment variable
RUN_SINGLE_BATCH=${BATCH_NUM:-}

log() {
    echo -e "${CYAN}[$(date +'%H:%M:%S')]${NC} $1"
}

step_header() {
    echo -e "\n${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${BLUE}$1${NC}"
    echo -e "${MAGENTA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Many small batches - optimized for GitHub Actions (each should complete in < 5 minutes)
declare -a BATCHES=(
    # Batch 1-4: Website component tests (split into smaller chunks)
    "apps/website/src/__tests__/navbar-simple.test.tsx"
    "apps/website/src/__tests__/flashcards-utils.test.ts"
    "apps/website/src/__tests__/cart-utils.test.ts"
    "apps/website/src/__tests__/learning-type-context.test.tsx"
    
    # Batch 5: Library unit tests
    "libs/database/src/lib/__tests__/database-switching.test.ts"
    
    # Batch 6-9: Admin API tests (split into individual tests)
    "tests/admin/admin-login-api.test.ts"
    "tests/admin/admin-auth-integration.test.ts"
    "tests/admin/content-management-api.test.ts"
    "tests/admin/frontend-problem-solving-api.test.ts"
    
    # Batch 10-13: Admin UI component tests (split into individual tests)
    "tests/admin/admin-login-page.test.tsx"
    "tests/admin/admin-login-ui.test.tsx"
    "tests/admin/admin-ui-components.test.tsx"
    "tests/admin/admin-dashboard-redirection.test.tsx"
    
    # Batch 14-16: Admin integration tests (split into individual tests)
    "tests/admin/admin-login-integration.test.tsx"
    "tests/admin/admin-integration.test.tsx"
    "tests/admin/navbar-switching-fix.test.tsx"
    
    # Batch 17-18: Unit tests
    "tests/unit/learning-type-context.test.tsx"
    "tests/simple.test.js"
)

BATCH_NAMES=(
    "Navbar Simple Test"
    "Flashcards Utils Test"
    "Cart Utils Test"
    "Learning Type Context Test"
    "Database Switching Test"
    "Admin Login API Test"
    "Admin Auth Integration Test"
    "Content Management API Test"
    "Frontend Problem Solving API Test"
    "Admin Login Page Test"
    "Admin Login UI Test"
    "Admin UI Components Test"
    "Admin Dashboard Redirection Test"
    "Admin Login Integration Test"
    "Admin Integration Test"
    "Navbar Switching Fix Test"
    "Learning Type Context Unit Test"
    "Simple Test"
)

TOTAL_BATCHES=${#BATCHES[@]}
FAILED_BATCHES=()
PASSED_BATCHES=()

# If BATCH_NUM is set, run only that batch (for GitHub Actions matrix strategy)
if [ -n "$RUN_SINGLE_BATCH" ]; then
    if [ "$RUN_SINGLE_BATCH" -lt 1 ] || [ "$RUN_SINGLE_BATCH" -gt "$TOTAL_BATCHES" ]; then
        log "${RED}Error: BATCH_NUM must be between 1 and ${TOTAL_BATCHES}${NC}"
        exit 1
    fi
    BATCH_INDEX=$((RUN_SINGLE_BATCH - 1))
    BATCHES=("${BATCHES[$BATCH_INDEX]}")
    BATCH_NAMES=("${BATCH_NAMES[$BATCH_INDEX]}")
    TOTAL_BATCHES=1
    log "${BLUE}Running single batch: ${BATCH_NAMES[0]}${NC}\n"
fi

step_header "🧪 Running Tests in Batches (${TOTAL_BATCHES} batches)"

for i in "${!BATCHES[@]}"; do
    BATCH_NUM=$((i + 1))
    BATCH_NAME="${BATCH_NAMES[$i]}"
    BATCH_TESTS="${BATCHES[$i]}"
    
    # If running single batch, use the provided BATCH_NUM
    if [ -n "$RUN_SINGLE_BATCH" ]; then
        BATCH_NUM=$RUN_SINGLE_BATCH
    fi
    
    step_header "Batch ${BATCH_NUM}/${TOTAL_BATCHES}: ${BATCH_NAME}"
    log "Tests in this batch:"
    echo "$BATCH_TESTS" | tr '|' '\n' | while read test; do
        log "  - $test"
    done
    log ""
    
    BATCH_START=$(date +%s)
    
    # Convert pipe-separated to space-separated for jest
    TEST_ARGS=$(echo "$BATCH_TESTS" | tr '|' ' ')
    
    # Run tests from website directory where jest.config.js is properly configured
    log "Running: cd apps/website && npx jest $TEST_ARGS"
    
    # Capture both stdout and stderr, and exit code
    (cd apps/website && npx jest $TEST_ARGS --passWithNoTests 2>&1) | tee /tmp/batch-${BATCH_NUM}-output.log
    JEST_EXIT_CODE=${PIPESTATUS[0]}
    
    BATCH_END=$(date +%s)
    BATCH_DURATION=$((BATCH_END - BATCH_START))
    
    # Check if tests actually passed by looking for "Test Suites:" in output
    if [ $JEST_EXIT_CODE -eq 0 ] && ! grep -q "Test Suites:.*failed" /tmp/batch-${BATCH_NUM}-output.log; then
        log "${GREEN}✅ Batch ${BATCH_NUM} passed! (took ${BATCH_DURATION}s)${NC}"
        PASSED_BATCHES+=("${BATCH_NUM}")
    else
        log "${RED}❌ Batch ${BATCH_NUM} failed! (took ${BATCH_DURATION}s)${NC}"
        log "${YELLOW}Error output (last 30 lines):${NC}"
        tail -30 /tmp/batch-${BATCH_NUM}-output.log
        FAILED_BATCHES+=("${BATCH_NUM}:${BATCH_NAME}")
        
        log "\n${YELLOW}⚠️  Please fix issues in this batch before continuing...${NC}"
    fi
    
    log ""
done

# Summary
step_header "📊 Test Batch Summary"
log "Total batches: ${TOTAL_BATCHES}"
log "${GREEN}Passed: ${#PASSED_BATCHES[@]}${NC}"
log "${RED}Failed: ${#FAILED_BATCHES[@]}${NC}"

if [ ${#FAILED_BATCHES[@]} -gt 0 ]; then
    log "\n${RED}Failed batches:${NC}"
    for failed in "${FAILED_BATCHES[@]}"; do
        log "  - Batch ${failed}"
    done
    exit 1
else
    log "\n${GREEN}🎉 All test batches passed!${NC}"
    exit 0
fi
