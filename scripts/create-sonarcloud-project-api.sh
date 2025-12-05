#!/bin/bash
# Create SonarCloud project via API
# Repository: https://github.com/FoushWare/elzatona_web

set -e

PROJECT_KEY="FoushWare_elzatona_web"
ORGANIZATION="foushware"
PROJECT_NAME="elzatona_web"
REPO_URL="https://github.com/FoushWare/elzatona_web"

echo "🔧 Creating SonarCloud Project via API"
echo "   Project Key: $PROJECT_KEY"
echo "   Organization: $ORGANIZATION"
echo "   Project Name: $PROJECT_NAME"
echo "   Repository: $REPO_URL"
echo ""

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
  echo "❌ Error: SONAR_TOKEN environment variable is not set"
  echo ""
  echo "📋 To get your token:"
  echo "   1. Go to: https://sonarcloud.io/account/security"
  echo "   2. Generate a new token"
  echo "   3. Copy the token"
  echo "   4. Set it as environment variable:"
  echo "      export SONAR_TOKEN=your_token_here"
  echo "   5. Run this script again"
  echo ""
  exit 1
fi

echo "📋 Attempting to create project via SonarCloud API..."
echo ""

# Try to create project via API
RESPONSE=$(curl -s -w "\n%{http_code}" -u "${SONAR_TOKEN}:" \
  -X POST "https://sonarcloud.io/api/projects/create" \
  -d "project=${PROJECT_KEY}" \
  -d "name=${PROJECT_NAME}" \
  -d "organization=${ORGANIZATION}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ Project created successfully!"
  echo ""
  echo "📋 Next steps:"
  echo "   1. Go to: https://sonarcloud.io/project/overview?id=${PROJECT_KEY}"
  echo "   2. Configure main branch:"
  echo "      - Go to: https://sonarcloud.io/project/settings?project=${PROJECT_KEY}"
  echo "      - Navigate to: General Settings → Branches"
  echo "      - Set Main Branch to: main"
  echo "      - Save changes"
  echo ""
elif [ "$HTTP_CODE" = "400" ]; then
  echo "⚠️  Project might already exist or invalid parameters"
  echo "   Check: https://sonarcloud.io/project/overview?id=${PROJECT_KEY}"
  echo ""
elif [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "403" ]; then
  echo "❌ Authentication failed"
  echo "   Check your SONAR_TOKEN and permissions"
  echo ""
else
  echo "⚠️  Unexpected response. The project might need to be created via GitHub integration."
  echo ""
  echo "📋 Alternative: Create via GitHub Integration"
  echo "   1. Go to: https://sonarcloud.io/projects"
  echo "   2. Click 'Import from GitHub' or 'Analyze new project'"
  echo "   3. Authorize SonarCloud to access your GitHub repositories"
  echo "   4. Select: FoushWare/elzatona_web"
  echo ""
fi
