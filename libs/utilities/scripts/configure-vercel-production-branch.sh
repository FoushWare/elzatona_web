#!/bin/bash

# Script to configure Vercel production branch to 'main'
# Usage: ./scripts/configure-vercel-production-branch.sh

set -e

echo "🔧 Configuring Vercel Production Branch"
echo "========================================"
echo ""

# Check if .vercel/project.json exists
if [ ! -f .vercel/project.json ]; then
    echo "❌ Project not linked to Vercel"
    echo "   Run 'vercel link' first to link this project"
    exit 1
fi

# Extract project info
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
ORG_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Could not find Project ID in .vercel/project.json"
    exit 1
fi

echo "📋 Project Information:"
echo "  Project ID: $PROJECT_ID"
echo "  Org ID: $ORG_ID"
echo ""

# Check for Vercel token
if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  VERCEL_TOKEN not set in environment"
    echo ""
    echo "To get your Vercel token:"
    echo "  1. Go to: https://vercel.com/account/tokens"
    echo "  2. Create a new token"
    echo "  3. Export it: export VERCEL_TOKEN=your_token_here"
    echo ""
    echo "Or run this script with:"
    echo "  VERCEL_TOKEN=your_token ./scripts/configure-vercel-production-branch.sh"
    exit 1
fi

echo "🔧 Updating production branch to 'main'..."
echo ""

# Update production branch via Vercel API
RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH \
    "https://api.vercel.com/v9/projects/$PROJECT_ID" \
    -H "Authorization: Bearer $VERCEL_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"git":{"productionBranch":"main"}}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Successfully configured production branch to 'main'"
    echo ""
    echo "📋 Next steps:"
    echo "  - Next deployment from 'main' branch will be marked as 'Production'"
    echo "  - View in dashboard: https://vercel.com/dashboard"
else
    echo "❌ Failed to update production branch"
    echo "   HTTP Code: $HTTP_CODE"
    echo "   Response: $BODY"
    exit 1
fi
