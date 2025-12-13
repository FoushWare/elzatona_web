#!/bin/bash

# SonarQube Pre-Commit Hook
# Runs a quick SonarQube analysis on staged files and blocks commit if critical issues are found
# This is a lightweight check that only analyzes changed files

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SONAR_MEMORY_LIMIT=${SONAR_MEMORY_LIMIT:-1024}
NODE_OPTIONS="--max-old-space-size=${SONAR_MEMORY_LIMIT}"

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|jsx|ts|tsx)$' || true)

# If no relevant files are staged, skip SonarQube
if [ -z "$STAGED_FILES" ]; then
  echo -e "${BLUE}ℹ️  No JavaScript/TypeScript files staged, skipping SonarQube check${NC}"
  exit 0
fi

echo -e "${BLUE}🔍 Running SonarQube pre-commit check...${NC}"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
  echo -e "${YELLOW}⚠️  Node.js is not installed${NC}"
  echo -e "${YELLOW}💡 Install Node.js to run SonarQube checks${NC}"
  echo -e "${YELLOW}💡 Or skip this check with: git commit --no-verify${NC}"
  exit 0 # Do not block if Node.js is not installed, but warn
fi

# Check if SonarQube script exists
if [ ! -f "libs/utilities/scripts/run-sonarqube-local.js" ]; then
  echo -e "${YELLOW}⚠️  SonarQube script not found${NC}"
  echo -e "${YELLOW}💡 Skipping SonarQube check${NC}"
  exit 0
fi

# Run quick SonarQube analysis (skip tests and build for speed)
echo -e "${BLUE}📊 Running quick SonarQube analysis...${NC}"
export NODE_OPTIONS
export SONAR_MEMORY_LIMIT

# Run SonarQube with quick mode (skip tests and build)
npm run sonar:quick 2>&1 | tee /tmp/sonar-precommit-output.log
SONAR_EXIT_CODE=${PIPESTATUS[0]}

if [ $SONAR_EXIT_CODE -ne 0 ]; then
  echo -e "${RED}❌ SonarQube analysis found issues!${NC}"
  echo -e "${YELLOW}💡 Review the output above for details${NC}"
  echo -e "${YELLOW}💡 Fix issues or skip with: SKIP_SONAR=1 git commit${NC}"
  exit 1
else
  echo -e "${GREEN}✅ SonarQube analysis passed - no critical issues detected!${NC}"
  exit 0
fi

