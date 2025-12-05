#!/bin/bash
# Find the correct SonarCloud project key for elzatona_web
# Since the project is already imported, we need to find its actual key

set -e

ORGANIZATION="foushware"
REPO_NAME="elzatona_web"

echo "🔍 Finding SonarCloud Project Key"
echo "   Organization: $ORGANIZATION"
echo "   Repository: $REPO_NAME"
echo ""

# Common project key formats
POSSIBLE_KEYS=(
  "${ORGANIZATION}_${REPO_NAME}"
  "foushware_elzatona_web"
  "FoushWare_elzatona_web"
  "foushware-elzatona-web"
  "FoushWare-elzatona-web"
)

echo "📋 Possible Project Keys:"
for key in "${POSSIBLE_KEYS[@]}"; do
  echo "   - $key"
done
echo ""

echo "🔗 Check these URLs to find the correct project key:"
echo ""
for key in "${POSSIBLE_KEYS[@]}"; do
  echo "   https://sonarcloud.io/project/overview?id=$key"
done
echo ""

echo "📋 Steps to find the correct key:"
echo "   1. Go to: https://sonarcloud.io/projects"
echo "   2. Click on 'elzatona_web' project"
echo "   3. Look at the URL - it will show the project key"
echo "      Example: .../project/overview?id=PROJECT_KEY"
echo "   4. Copy that PROJECT_KEY"
echo "   5. Update sonar-project.properties with the correct key"
echo ""

if [ -n "$SONAR_TOKEN" ]; then
  echo "🔍 Trying to list projects via API..."
  echo ""
  for key in "${POSSIBLE_KEYS[@]}"; do
    echo "Checking: $key"
    RESPONSE=$(curl -s -w "\n%{http_code}" -u "${SONAR_TOKEN}:" \
      "https://sonarcloud.io/api/projects/search?projects=${key}" 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    if [ "$HTTP_CODE" = "200" ]; then
      echo "✅ Found project: $key"
      echo "$RESPONSE" | sed '$d' | grep -o '"key":"[^"]*"' | head -1 || true
    fi
  done
else
  echo "ℹ️  Set SONAR_TOKEN to check via API:"
  echo "   export SONAR_TOKEN=your_token"
  echo "   Get token from: https://sonarcloud.io/account/security"
fi
