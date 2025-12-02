#!/bin/bash
# Helper script to guide setting up GitHub Actions SonarQube secret
# v1.0

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔧 GitHub Actions SonarQube Secret Setup"
echo "════════════════════════════════════════════════════════════════"
echo ""

REPO_URL="https://github.com/FoushWare/GreatFrontendHub"
SECRETS_URL="${REPO_URL}/settings/secrets/actions"
TOKEN_URL="https://sonarcloud.io/account/security"

echo "📋 Required GitHub Secret:"
echo ""
echo "   Name:  SONAR_TOKEN"
echo "   Value: [Get from SonarCloud → My Account → Security]"
echo ""

echo "🔗 Direct Links:"
echo "   Add Secret: ${SECRETS_URL}"
echo "   Get Token:  ${TOKEN_URL}"
echo ""

echo "📝 Steps to Add Secret:"
echo ""
echo "   1. Get your SonarCloud token:"
echo "      - Go to: ${TOKEN_URL}"
echo "      - Click 'Generate Tokens' → Generate"
echo "      - Copy the token immediately (shown only once!)"
echo ""
echo "   2. Add to GitHub:"
echo "      - Open: ${SECRETS_URL}"
echo "      - Click 'New repository secret'"
echo "      - Name: SONAR_TOKEN"
echo "      - Value: [paste your token]"
echo "      - Click 'Add secret'"
echo ""

echo "✅ After Adding Secret:"
echo ""
echo "   - Push a commit to trigger the workflow"
echo "   - Or manually trigger: GitHub → Actions → Build"
echo "   - View results: https://sonarcloud.io/dashboard?id=FoushWare_GreatFrontendHub"
echo ""

echo "🔍 Verify Configuration:"
echo ""
echo "   Project Key: FoushWare_GreatFrontendHub ✅"
echo "   Organization: foushware ✅"
echo "   Token: [Set in GitHub Secrets] ✅"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "✅ Configuration files updated!"
echo "⏳ Action required: Add SONAR_TOKEN secret to GitHub"
echo "════════════════════════════════════════════════════════════════"
echo ""

