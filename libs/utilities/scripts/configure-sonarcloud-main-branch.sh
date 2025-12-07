#!/bin/bash
# Configure SonarCloud main branch via API
# This script helps configure the main branch in SonarCloud project settings
# Repository: https://github.com/FoushWare/elzatona_web

set -e

PROJECT_KEY="FoushWare_elzatona_web"
ORGANIZATION="foushware"
MAIN_BRANCH="main"
REPO_URL="https://github.com/FoushWare/elzatona_web"

echo "🔧 SonarCloud Main Branch Configuration Helper"
echo "   Repository: $REPO_URL"
echo "   Project Key: $PROJECT_KEY"
echo "   Organization: $ORGANIZATION"
echo "   Main Branch: $MAIN_BRANCH"
echo ""

# Check if SONAR_TOKEN is set (optional - only needed for API verification)
if [ -z "$SONAR_TOKEN" ]; then
  echo "ℹ️  Note: SONAR_TOKEN not set (optional for this script)"
  echo "   Get your token from: https://sonarcloud.io/account/security"
  echo ""
fi

echo "📋 Step-by-Step Instructions:"
echo ""
echo "1️⃣  Go to SonarCloud Project Settings:"
echo "   👉 https://sonarcloud.io/project/settings?project=${PROJECT_KEY}"
echo ""
echo "2️⃣  Navigate to Branches:"
echo "   - Click on 'General Settings' (left sidebar)"
echo "   - Click on 'Branches'"
echo ""
echo "3️⃣  Set Main Branch:"
echo "   - Find the 'Main Branch' setting"
echo "   - Set it to: ${MAIN_BRANCH}"
echo "   - Click 'Save' or 'Update'"
echo ""
echo "4️⃣  Verify Configuration:"
echo "   - Go to: https://sonarcloud.io/project/overview?id=${PROJECT_KEY}"
echo "   - The warning about main branch should disappear after next analysis"
echo ""

# Optional: Try to verify project exists via API if token is available
if [ -n "$SONAR_TOKEN" ]; then
  echo "🔍 Verifying project status via API..."
  if command -v jq &> /dev/null; then
    BRANCH_INFO=$(curl -s -u "${SONAR_TOKEN}:" \
      "https://sonarcloud.io/api/project_branches/list?project=${PROJECT_KEY}" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$BRANCH_INFO" ]; then
      echo "✅ Project found in SonarCloud"
      echo "$BRANCH_INFO" | jq '.' 2>/dev/null || echo "$BRANCH_INFO"
    else
      echo "⚠️  Could not verify project (check PROJECT_KEY and SONAR_TOKEN)"
    fi
  else
    echo "ℹ️  Install 'jq' for better API response formatting"
    curl -s -u "${SONAR_TOKEN}:" \
      "https://sonarcloud.io/api/project_branches/list?project=${PROJECT_KEY}" || true
  fi
  echo ""
fi

echo "📚 Additional Resources:"
echo "   - Project Overview: https://sonarcloud.io/project/overview?id=${PROJECT_KEY}"
echo "   - Project Settings: https://sonarcloud.io/project/settings?project=${PROJECT_KEY}"
echo "   - GitHub Repository: $REPO_URL"
echo ""
echo "✅ After configuring, the next workflow run will:"
echo "   - Complete successfully (not cancel early)"
echo "   - Recognize main branch correctly"
echo "   - Show analysis results properly"
