#!/bin/bash
# Configure SonarCloud main branch via API
# This script sets the main branch in SonarCloud project settings

set -e

PROJECT_KEY="FoushWare_GreatFrontendHub"
ORGANIZATION="foushware"
MAIN_BRANCH="main"

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
  echo "❌ Error: SONAR_TOKEN environment variable is not set"
  echo "   Get your token from: https://sonarcloud.io/account/security"
  exit 1
fi

echo "🔧 Configuring main branch in SonarCloud..."
echo "   Project: $PROJECT_KEY"
echo "   Organization: $ORGANIZATION"
echo "   Main Branch: $MAIN_BRANCH"
echo ""

# Note: SonarCloud API doesn't have a direct endpoint to set main branch
# The main branch is typically set via UI or automatically detected
# However, we can verify the project exists and check its status

echo "📋 Checking project status..."
curl -s -u "${SONAR_TOKEN}:" \
  "https://sonarcloud.io/api/project_branches/list?project=${PROJECT_KEY}" \
  | jq '.' || echo "⚠️  Could not fetch branch information"

echo ""
echo "✅ To configure main branch:"
echo "   1. Go to: https://sonarcloud.io/project/settings?project=${PROJECT_KEY}"
echo "   2. Navigate to: General Settings → Branches"
echo "   3. Set Main Branch to: ${MAIN_BRANCH}"
echo "   4. Save changes"
echo ""
echo "   Or use the SonarCloud UI directly:"
echo "   https://sonarcloud.io/project/overview?id=${PROJECT_KEY}"
