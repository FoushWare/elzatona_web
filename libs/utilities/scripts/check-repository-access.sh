#!/bin/bash
# Script to check GitHub repository access and security settings
# Repository: https://github.com/FoushWare/elzatona_web

set -e

REPO_OWNER="FoushWare"
REPO_NAME="elzatona_web"
REPO_FULL="${REPO_OWNER}/${REPO_NAME}"

echo "🔍 GitHub Repository Access & Security Check"
echo "   Repository: ${REPO_FULL}"
echo "   URL: https://github.com/${REPO_FULL}"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is not installed"
  echo "   Install: brew install gh (macOS) or visit: https://cli.github.com/"
  echo ""
  echo "📋 Manual Check Instructions:"
  echo "   1. Go to: https://github.com/${REPO_FULL}/settings/access"
  echo "   2. Review all collaborators and their roles"
  echo "   3. Remove any Admin roles except yourself"
  echo ""
  echo "   4. Go to: https://github.com/${REPO_FULL}/settings/security_analysis"
  echo "   5. Check visibility settings for:"
  echo "      - Secret scanning alerts"
  echo "      - Dependabot alerts"
  echo "      - Code scanning alerts"
  exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
  echo "⚠️  GitHub CLI is not authenticated"
  echo "   Run: gh auth login"
  echo ""
  echo "📋 Manual Check Instructions:"
  echo "   1. Go to: https://github.com/${REPO_FULL}/settings/access"
  echo "   2. Review all collaborators and their roles"
  echo "   3. Remove any Admin roles except yourself"
  echo ""
  echo "   4. Go to: https://github.com/${REPO_FULL}/settings/security_analysis"
  echo "   5. Check visibility settings for security alerts"
  exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Check repository visibility
echo "📊 Repository Information:"
REPO_INFO=$(gh repo view "${REPO_FULL}" --json visibility,isPrivate,owner,defaultBranch --jq '{
  visibility: .visibility,
  isPrivate: .isPrivate,
  owner: .owner.login,
  defaultBranch: .defaultBranch
}')

echo "$REPO_INFO" | jq -r '
  "   Visibility: " + .visibility,
  "   Private: " + (.isPrivate | tostring),
  "   Owner: " + .owner,
  "   Default Branch: " + .defaultBranch
'
echo ""

# Check collaborators
echo "👥 Collaborators:"
echo ""

COLLABORATORS=$(gh api "repos/${REPO_FULL}/collaborators" --jq '.[] | {
  login: .login,
  role: .role_name,
  permissions: .permissions
}')

if [ -z "$COLLABORATORS" ] || [ "$COLLABORATORS" = "[]" ]; then
  echo "   ✅ No collaborators found (only owner has access)"
  echo ""
else
  echo "$COLLABORATORS" | jq -r '.[] | 
    "   👤 " + .login + 
    " (Role: " + .role + 
    ", Admin: " + (.permissions.admin | tostring) + ")"
  '
  echo ""
  
  # Check for admins
  ADMIN_COUNT=$(echo "$COLLABORATORS" | jq '[.[] | select(.permissions.admin == true)] | length')
  
  if [ "$ADMIN_COUNT" -gt 0 ]; then
    echo "⚠️  WARNING: Found $ADMIN_COUNT collaborator(s) with Admin role:"
    echo "$COLLABORATORS" | jq -r '.[] | select(.permissions.admin == true) | 
      "   - " + .login + " (has full access including security settings)"
    '
    echo ""
    echo "💡 Recommendation: Remove Admin role from collaborators"
    echo "   Go to: https://github.com/${REPO_FULL}/settings/access"
    echo ""
  else
    echo "✅ No collaborators with Admin role (only owner has admin access)"
    echo ""
  fi
fi

# Check security settings
echo "🔒 Security Alert Visibility:"
echo ""
echo "📋 To check security alert visibility settings:"
echo "   👉 https://github.com/${REPO_FULL}/settings/security_analysis"
echo ""
echo "   Expected settings:"
echo "   ✅ Secret scanning: Restricted to admins (default)"
echo "   ✅ Dependabot alerts: Check if restricted to admins"
echo "   ✅ Code scanning alerts: Check if restricted to admins"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════════"
echo "📊 Summary:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "✅ Repository access check completed"
echo ""
echo "📝 Action Items:"
echo "   1. Review collaborators: https://github.com/${REPO_FULL}/settings/access"
echo "   2. Remove unnecessary Admin roles"
echo "   3. Check security alerts: https://github.com/${REPO_FULL}/settings/security_analysis"
echo "   4. Verify alert visibility is restricted to admins"
echo ""

