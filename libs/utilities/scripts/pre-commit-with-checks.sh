#!/bin/bash
# Pre-commit hook with comprehensive code quality checks and auto-fix
# Provides helpful feedback and can auto-fix many issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Log file
LOG_FILE=".code-quality-check.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔍 Pre-Commit Code Quality Checks"
echo "════════════════════════════════════════════════════════════════"
echo "📅 Started: $TIMESTAMP"
echo ""

# Track failures
FAILED_CHECKS=()
PASSED_CHECKS=()
AUTO_FIXED=()

# Function to auto-fix and re-stage
auto_fix_and_restage() {
  local name=$1
  local fix_command=$2
  
  echo -e "${CYAN}🔧 Attempting to auto-fix $name...${NC}"
  
  if eval "$fix_command" >> "$LOG_FILE" 2>&1; then
    echo -e "${GREEN}✅ Auto-fixed $name${NC}"
    
    # Re-stage fixed files
    git add -u >> "$LOG_FILE" 2>&1 || true
    
    AUTO_FIXED+=("$name")
    return 0
  else
    echo -e "${YELLOW}⚠️  Could not auto-fix $name${NC}"
    return 1
  fi
}

# Function to run a check and provide feedback
run_check() {
  local name=$1
  local command=$2
  local fix_command=$3
  local auto_fix=$4
  
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
    
    # Try auto-fix if available
    if [ "$auto_fix" = "true" ] && [ -n "$fix_command" ]; then
      echo ""
      if auto_fix_and_restage "$name" "$fix_command"; then
        # Re-run check after auto-fix
        if eval "$command" >> "$LOG_FILE" 2>&1; then
          echo -e "${GREEN}✅ $name now passes after auto-fix${NC}"
          PASSED_CHECKS+=("$name")
          return 0
        fi
      fi
    fi
    
    FAILED_CHECKS+=("$name")
    
    if [ -n "$fix_command" ]; then
      echo -e "${YELLOW}💡 To fix manually: $fix_command${NC}"
    fi
    
    return 1
  fi
}

# Step 1: Prettier (formatting) - Auto-fix enabled
echo "STEP 1: Prettier Formatting Check"
if ! run_check "Prettier" "npx prettier --check . --ignore-path .prettierignore" "npm run format" "true"; then
  echo ""
  echo -e "${YELLOW}💡 Some formatting issues couldn't be auto-fixed${NC}"
  echo -e "${YELLOW}💡 Run 'npm run format' to fix remaining issues${NC}"
fi

# Step 2: ESLint (code quality) - Auto-fix enabled
echo ""
echo "STEP 2: ESLint Code Quality Check"
if ! run_check "ESLint" "npm run lint" "npm run lint:fix" "true"; then
  echo ""
  echo -e "${YELLOW}💡 Some ESLint issues couldn't be auto-fixed${NC}"
  echo -e "${YELLOW}💡 Run 'npm run lint:fix' to fix remaining issues${NC}"
  echo -e "${YELLOW}💡 Or check the log file: $LOG_FILE${NC}"
fi

# Step 3: TypeScript (type checking) - No auto-fix
echo ""
echo "STEP 3: TypeScript Type Checking"
if ! run_check "TypeScript" "npm run type-check" "" "false"; then
  echo ""
  echo -e "${YELLOW}💡 Fix TypeScript errors in the files listed above${NC}"
  echo -e "${YELLOW}💡 Check the log file for details: $LOG_FILE${NC}"
fi

# Summary
echo ""
echo "════════════════════════════════════════════════════════════════"
if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
  echo -e "${GREEN}✅ All Pre-Commit Checks Passed!${NC}"
  echo "════════════════════════════════════════════════════════════════"
  
  if [ ${#AUTO_FIXED[@]} -gt 0 ]; then
    echo ""
    echo -e "${CYAN}🔧 Auto-fixed checks:${NC}"
    for check in "${AUTO_FIXED[@]}"; do
      echo -e "  ${CYAN}✅ $check${NC}"
    done
    echo ""
    echo -e "${YELLOW}💡 Fixed files have been re-staged. Review changes with:${NC}"
    echo "   git diff --cached"
  fi
  
  echo ""
  echo "🎉 Your code is ready to commit!"
  exit 0
else
  echo -e "${RED}❌ Pre-Commit Checks Failed${NC}"
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
  
  if [ ${#AUTO_FIXED[@]} -gt 0 ]; then
    echo ""
    echo -e "${CYAN}Auto-fixed checks:${NC}"
    for check in "${AUTO_FIXED[@]}"; do
      echo -e "  ${CYAN}🔧 $check${NC}"
    done
  fi
  
  echo ""
  echo "════════════════════════════════════════════════════════════════"
  echo -e "${YELLOW}📄 Full details saved to: $LOG_FILE${NC}"
  echo ""
  echo -e "${BLUE}💡 Quick Fix Commands:${NC}"
  echo "   npm run format      # Fix formatting"
  echo "   npm run lint:fix    # Fix ESLint issues"
  echo "   npm run type-check # See TypeScript errors"
  echo ""
  echo -e "${BLUE}💡 View log file:${NC}"
  echo "   cat $LOG_FILE"
  echo "   less $LOG_FILE"
  echo ""
  echo -e "${BLUE}💡 Interactive fix helper:${NC}"
  echo "   npm run fix:issues  # Run interactive fix helper"
  echo ""
  echo -e "${YELLOW}⚠️  Commit blocked. Please fix the issues above.${NC}"
  echo -e "${YELLOW}💡 Many issues can be auto-fixed - try running the commands above${NC}"
  echo ""
  exit 1
fi
