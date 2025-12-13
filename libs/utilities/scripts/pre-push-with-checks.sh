#!/bin/bash
# Pre-push hook with comprehensive code quality checks
# Provides helpful feedback to fix issues before pushing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log file
LOG_FILE=".code-quality-check.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔍 Pre-Push Code Quality Checks"
echo "════════════════════════════════════════════════════════════════"
echo "📅 Started: $TIMESTAMP"
echo ""

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Track failures
FAILED_CHECKS=()
PASSED_CHECKS=()

# Function to run a check and provide feedback
run_check() {
  local name=$1
  local command=$2
  local fix_command=$3
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📋 Checking: $name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  
  if eval "$command" >> "$LOG_FILE" 2>&1; then
    echo -e "${GREEN}✅ $name passed${NC}"
    PASSED_CHECKS+=("$name")
    return 0
  else
    echo -e "${RED}❌ $name failed${NC}"
    FAILED_CHECKS+=("$name")
    
    if [ -n "$fix_command" ]; then
      echo -e "${YELLOW}💡 To fix: $fix_command${NC}"
    fi
    
    return 1
  fi
}

# Step 1: Prettier (formatting)
echo "STEP 1: Prettier Formatting Check"
if ! run_check "Prettier" "npx prettier --check . --ignore-path .prettierignore" "npm run format"; then
  echo ""
  echo -e "${YELLOW}💡 Quick fix: Run 'npm run format' to auto-fix formatting issues${NC}"
fi

# Step 2: ESLint (code quality)
echo ""
echo "STEP 2: ESLint Code Quality Check"
if ! run_check "ESLint" "npm run lint" "npm run lint:fix"; then
  echo ""
  echo -e "${YELLOW}💡 Quick fix: Run 'npm run lint:fix' to auto-fix many ESLint issues${NC}"
  echo -e "${YELLOW}💡 Or check the log file: $LOG_FILE${NC}"
fi

# Step 3: TypeScript (type checking)
echo ""
echo "STEP 3: TypeScript Type Checking"
if ! run_check "TypeScript" "npm run type-check" ""; then
  echo ""
  echo -e "${YELLOW}💡 Fix TypeScript errors in the files listed above${NC}"
  echo -e "${YELLOW}💡 Check the log file for details: $LOG_FILE${NC}"
fi

# Step 4: Build check (optional, can be skipped)
if [ "$SKIP_BUILD_CHECK" != "true" ]; then
  echo ""
  echo "STEP 4: Build Check"
  if ! run_check "Build" "npm run build" ""; then
    echo ""
    echo -e "${YELLOW}💡 Fix build errors before pushing${NC}"
    echo -e "${YELLOW}💡 Or skip with: SKIP_BUILD_CHECK=true git push${NC}"
  fi
else
  echo ""
  echo "STEP 4: Build Check (Skipped)"
fi

# Step 5: SonarQube (optional, only if token is set)
if [ -n "$SONAR_TOKEN" ] && [ "$SKIP_SONAR_CHECK" != "true" ]; then
  echo ""
  echo "STEP 5: SonarQube Analysis (Quick)"
  if ! run_check "SonarQube" "npm run sonar:quick" ""; then
    echo ""
    echo -e "${YELLOW}💡 SonarQube found issues. Check the log or run: npm run sonar${NC}"
    echo -e "${YELLOW}💡 Or skip with: SKIP_SONAR_CHECK=true git push${NC}"
  fi
else
  echo ""
  if [ -z "$SONAR_TOKEN" ]; then
    echo "STEP 5: SonarQube Analysis (Skipped - no SONAR_TOKEN)"
    echo "   💡 Set SONAR_TOKEN in .env.local to enable"
  else
    echo "STEP 5: SonarQube Analysis (Skipped)"
  fi
fi

# Summary
echo ""
echo "════════════════════════════════════════════════════════════════"
if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
  echo -e "${GREEN}✅ All Pre-Push Checks Passed!${NC}"
  echo "════════════════════════════════════════════════════════════════"
  echo ""
  echo "🎉 Your code is ready to push!"
  exit 0
else
  echo -e "${RED}❌ Pre-Push Checks Failed${NC}"
  echo "════════════════════════════════════════════════════════════════"
  echo ""
  echo -e "${RED}Failed checks:${NC}"
  for check in "${FAILED_CHECKS[@]}"; do
    echo -e "  ${RED}❌ $check${NC}"
  done
  echo ""
  echo -e "${GREEN}Passed checks:${NC}"
  for check in "${PASSED_CHECKS[@]}"; do
    echo -e "  ${GREEN}✅ $check${NC}"
  done
  echo ""
  echo "════════════════════════════════════════════════════════════════"
  echo -e "${YELLOW}📄 Full details saved to: $LOG_FILE${NC}"
  echo ""
  echo -e "${BLUE}💡 Quick Fix Commands:${NC}"
  echo "   npm run format      # Fix formatting"
  echo "   npm run lint:fix    # Fix ESLint issues"
  echo "   npm run type-check # See TypeScript errors"
  echo "   npm run build      # Test build"
  echo ""
  echo -e "${BLUE}💡 View log file:${NC}"
  echo "   cat $LOG_FILE"
  echo "   less $LOG_FILE"
  echo ""
  echo -e "${YELLOW}⚠️  Push blocked. Please fix the issues above.${NC}"
  echo -e "${YELLOW}💡 To skip checks (not recommended): SKIP_BUILD_CHECK=true SKIP_SONAR_CHECK=true git push --no-verify${NC}"
  echo ""
  exit 1
fi



