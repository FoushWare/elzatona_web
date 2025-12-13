#!/bin/bash

# Run CodeQL and SonarQube locally, then fix issues automatically
# Usage: ./libs/utilities/scripts/run-codeql-sonar-fix.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Running CodeQL and SonarQube Analysis${NC}"
echo -e "${BLUE}==========================================${NC}"
echo ""

# Step 1: Run CodeQL
echo -e "${BLUE}📦 Step 1: Running CodeQL analysis...${NC}"
if npm run codeql 2>&1 | tee /tmp/codeql-output.log; then
  echo -e "${GREEN}✅ CodeQL analysis completed${NC}"
else
  echo -e "${YELLOW}⚠️  CodeQL analysis had issues, but continuing...${NC}"
fi

# Check if results file exists
if [ -f "codeql-results.sarif" ]; then
  echo -e "${GREEN}✅ CodeQL results file found: codeql-results.sarif${NC}"
  
  # Try to parse and fix issues
  echo -e "${BLUE}🔧 Attempting to auto-fix CodeQL issues...${NC}"
  if npm run codeql:fix 2>&1 | tee /tmp/codeql-fix-output.log; then
    echo -e "${GREEN}✅ CodeQL auto-fix completed${NC}"
  else
    echo -e "${YELLOW}⚠️  CodeQL auto-fix had issues${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  CodeQL results file not found${NC}"
fi

echo ""
echo -e "${BLUE}📊 Step 2: Running SonarQube analysis...${NC}"

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
  echo -e "${YELLOW}⚠️  SONAR_TOKEN not set, skipping SonarQube analysis${NC}"
  echo -e "${YELLOW}💡 Set it with: export SONAR_TOKEN=your_token${NC}"
  echo -e "${YELLOW}💡 Or add to .env.local: SONAR_TOKEN=your_token${NC}"
else
  if npm run sonar:quick 2>&1 | tee /tmp/sonar-output.log; then
    echo -e "${GREEN}✅ SonarQube analysis completed${NC}"
  else
    echo -e "${YELLOW}⚠️  SonarQube analysis had issues${NC}"
  fi
fi

echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "${BLUE}===========${NC}"
echo ""

# Show CodeQL results if available
if [ -f "codeql-results.sarif" ]; then
  echo -e "${GREEN}✅ CodeQL results: codeql-results.sarif${NC}"
  echo -e "${YELLOW}💡 View results: code codeql-results.sarif (with SARIF extension)${NC}"
fi

# Show SonarQube results if available
if [ -f "/tmp/sonar-output.log" ]; then
  echo -e "${GREEN}✅ SonarQube log: /tmp/sonar-output.log${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Next steps:${NC}"
echo "1. Review CodeQL results in codeql-results.sarif"
echo "2. Review SonarQube output in /tmp/sonar-output.log"
echo "3. Fix any remaining issues manually"
echo "4. Run 'npm run codeql:fix' to attempt auto-fixes"
echo ""
echo -e "${GREEN}✅ Analysis complete!${NC}"

