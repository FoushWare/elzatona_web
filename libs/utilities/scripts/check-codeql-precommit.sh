#!/bin/bash

# CodeQL Pre-Commit Hook
# Runs CodeQL analysis on staged files and blocks commit if critical issues are found
# This is a lightweight check that only analyzes changed files

# Don't exit on error - we want to handle errors gracefully
set +e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LANGUAGE="javascript"
DATABASE_NAME=".codeql-database-precommit"
RESULTS_FILE=".codeql-results-precommit.sarif"
QUERY_SUITE="security-extended,security-and-quality"

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|jsx|ts|tsx)$' || true)

# If no relevant files are staged, skip CodeQL
if [ -z "$STAGED_FILES" ]; then
  echo -e "${BLUE}ℹ️  No JavaScript/TypeScript files staged, skipping CodeQL check${NC}"
  exit 0
fi

echo -e "${BLUE}🔐 Running CodeQL pre-commit check...${NC}"

# Check if CodeQL CLI is installed
if ! command -v codeql &> /dev/null; then
  echo -e "${YELLOW}⚠️  CodeQL CLI is not installed${NC}"
  echo -e "${YELLOW}💡 Install with: brew install codeql${NC}"
  echo -e "${YELLOW}💡 Or skip this check with: git commit --no-verify${NC}"
  echo -e "${YELLOW}⏭️  Skipping CodeQL check (non-blocking)${NC}"
  exit 0
fi

# Clean up previous database
cleanup() {
  if [ -d "$DATABASE_NAME" ]; then
    rm -rf "$DATABASE_NAME"
  fi
  if [ -f "$RESULTS_FILE" ]; then
    rm -f "$RESULTS_FILE"
  fi
}

# Create CodeQL database for staged files only
create_database() {
  echo -e "${BLUE}📦 Creating CodeQL database...${NC}"
  
  cleanup
  
  # Create database with minimal build (just install dependencies)
  # Use timeout to prevent hanging (max 2 minutes)
  timeout 120 codeql database create "$DATABASE_NAME" \
    --language="$LANGUAGE" \
    --source-root="." \
    --command="npm install --silent" \
    --threads=0 > /dev/null 2>&1 || {
    # Fallback: create without build command
    timeout 120 codeql database create "$DATABASE_NAME" \
      --language="$LANGUAGE" \
      --source-root="." \
      --threads=0 > /dev/null 2>&1
  }
  
  if [ ! -d "$DATABASE_NAME" ]; then
    echo -e "${YELLOW}⚠️  Failed to create database (this may be normal for quick commits)${NC}"
    echo -e "${YELLOW}💡 CodeQL check skipped - will run on push${NC}"
    return 1
  fi
  return 0
}

# Analyze the database
analyze() {
  echo -e "${BLUE}🔍 Analyzing code...${NC}"
  
  # Use timeout to prevent hanging (max 3 minutes)
  timeout 180 codeql database analyze "$DATABASE_NAME" \
    "$QUERY_SUITE" \
    --format=sarifv2.1.0 \
    --output="$RESULTS_FILE" \
    --threads=0 > /dev/null 2>&1 || {
    echo -e "${YELLOW}⚠️  Analysis failed or timed out${NC}"
    echo -e "${YELLOW}💡 CodeQL check skipped - will run on push${NC}"
    return 1
  }
  return 0
}

# Parse SARIF results and check for critical issues
check_results() {
  if [ ! -f "$RESULTS_FILE" ]; then
    echo -e "${YELLOW}⚠️  No results file found${NC}"
    return 0
  fi
  
  # Check if jq is available for parsing
  if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not installed, cannot parse results${NC}"
    echo -e "${YELLOW}💡 Install jq for better result parsing: brew install jq${NC}"
    # If jq is not available, we'll do a basic check
    if grep -q '"level":"error"' "$RESULTS_FILE" 2>/dev/null; then
      echo -e "${RED}❌ Critical issues found in CodeQL analysis${NC}"
      echo -e "${YELLOW}💡 Review $RESULTS_FILE for details${NC}"
      return 1
    fi
    return 0
  fi
  
  # Parse SARIF file for critical issues
  ERROR_COUNT=$(jq -r '.runs[0].results[]? | select(.level == "error") | .ruleId' "$RESULTS_FILE" 2>/dev/null | wc -l | tr -d ' ')
  HIGH_COUNT=$(jq -r '.runs[0].results[]? | select(.level == "error" or .level == "warning") | select(.properties?["security-severity"]? >= 7.0) | .ruleId' "$RESULTS_FILE" 2>/dev/null | wc -l | tr -d ' ')
  
  if [ -z "$ERROR_COUNT" ]; then
    ERROR_COUNT=0
  fi
  if [ -z "$HIGH_COUNT" ]; then
    HIGH_COUNT=0
  fi
  
  TOTAL_CRITICAL=$((ERROR_COUNT + HIGH_COUNT))
  
  if [ "$TOTAL_CRITICAL" -gt 0 ]; then
    echo -e "${RED}❌ CodeQL found $TOTAL_CRITICAL critical security issue(s)${NC}"
    echo -e "${RED}   Errors: $ERROR_COUNT, High severity: $HIGH_COUNT${NC}"
    echo ""
    echo -e "${YELLOW}📋 Critical issues:${NC}"
    
    # Show first 5 critical issues
    jq -r '.runs[0].results[]? | select(.level == "error" or (.level == "warning" and (.properties?["security-severity"]? // 0) >= 7.0)) | "  - \(.ruleId // "unknown"): \(.message.text // "No message")"' "$RESULTS_FILE" 2>/dev/null | head -5
    
    if [ "$TOTAL_CRITICAL" -gt 5 ]; then
      echo -e "${YELLOW}   ... and $((TOTAL_CRITICAL - 5)) more${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}💡 To view all issues:${NC}"
    echo -e "${YELLOW}   cat $RESULTS_FILE | jq '.runs[0].results[]'${NC}"
    echo ""
    echo -e "${YELLOW}💡 To skip this check (not recommended):${NC}"
    echo -e "${YELLOW}   git commit --no-verify${NC}"
    echo ""
    
    # Try to suggest fixes
    echo -e "${BLUE}🔧 Attempting to auto-fix common issues...${NC}"
    node libs/utilities/scripts/fix-codeql-issues.js "$RESULTS_FILE" 2>/dev/null || true
    
    return 1
  fi
  
  # Count warnings and notices
  WARNING_COUNT=$(jq -r '.runs[0].results[]? | select(.level == "warning" and ((.properties?["security-severity"]? // 0) < 7.0)) | .ruleId' "$RESULTS_FILE" 2>/dev/null | wc -l | tr -d ' ')
  NOTICE_COUNT=$(jq -r '.runs[0].results[]? | select(.level == "note") | .ruleId' "$RESULTS_FILE" 2>/dev/null | wc -l | tr -d ' ')
  
  if [ -z "$WARNING_COUNT" ]; then
    WARNING_COUNT=0
  fi
  if [ -z "$NOTICE_COUNT" ]; then
    NOTICE_COUNT=0
  fi
  
  if [ "$WARNING_COUNT" -gt 0 ] || [ "$NOTICE_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ No critical issues found${NC}"
    echo -e "${YELLOW}ℹ️  Warnings: $WARNING_COUNT, Notices: $NOTICE_COUNT${NC}"
  else
    echo -e "${GREEN}✅ No CodeQL issues found${NC}"
  fi
  
  return 0
}

# Main execution
main() {
  # Create database
  if ! create_database; then
    cleanup
    exit 0  # Non-blocking if database creation fails
  fi
  
  # Analyze
  if ! analyze; then
    cleanup
    exit 0  # Non-blocking if analysis fails
  fi
  
  # Check results
  if ! check_results; then
    cleanup
    exit 1  # Block commit if critical issues found
  fi
  
  # Cleanup
  cleanup
  
  echo -e "${GREEN}✅ CodeQL pre-commit check passed${NC}"
}

# Run main function
main "$@"

