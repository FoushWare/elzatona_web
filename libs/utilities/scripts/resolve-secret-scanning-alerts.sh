#!/bin/bash
# Script to resolve GitHub secret scanning alerts
# Usage: ./scripts/resolve-secret-scanning-alerts.sh [resolution] [comment] [secret_type]

set -e

RESOLUTION="${1:-revoked}"
COMMENT="${2:-Automatically resolved - secret has been rotated and removed from codebase}"
SECRET_TYPE="${3:-}"

echo "🔍 GitHub Secret Scanning Alert Resolver"
echo "=========================================="
echo ""
echo "Resolution: $RESOLUTION"
echo "Comment: $COMMENT"
[ -n "$SECRET_TYPE" ] && echo "Filter by type: $SECRET_TYPE" || echo "Filter: All types"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is not installed"
  echo "   Install: brew install gh (macOS) or visit https://cli.github.com/"
  exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ Not authenticated with GitHub CLI"
  echo "   Run: gh auth login"
  exit 1
fi

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"
echo ""

# Fetch open alerts
echo "🔍 Fetching open secret scanning alerts..."
ALERTS=$(gh api repos/$REPO/secret-scanning/alerts \
  --paginate \
  --jq '[.[] | select(.state == "open")]')

TOTAL=$(echo "$ALERTS" | jq 'length')
echo "📊 Found $TOTAL open alerts"
echo ""

if [ "$TOTAL" -eq 0 ]; then
  echo "✅ No open alerts to resolve"
  exit 0
fi

# Filter by secret type if specified
if [ -n "$SECRET_TYPE" ]; then
  ALERTS=$(echo "$ALERTS" | jq "[.[] | select(.secret_type == \"$SECRET_TYPE\")]")
  FILTERED=$(echo "$ALERTS" | jq 'length')
  echo "🔍 Filtered to $FILTERED alerts of type: $SECRET_TYPE"
  echo ""
fi

# Show summary by type
echo "📋 Alert Summary by Type:"
echo "$ALERTS" | jq -r 'group_by(.secret_type) | .[] | "   - \(.[0].secret_type): \(length) alerts"' || true
echo ""

# Ask for confirmation
read -p "⚠️  Do you want to resolve these alerts? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Cancelled"
  exit 0
fi

echo ""
echo "🔧 Resolving alerts..."
echo ""

RESOLVED=0
FAILED=0
FAILED_ALERTS=()

# Resolve each alert
echo "$ALERTS" | jq -c '.[]' | while read -r alert; do
  ALERT_NUMBER=$(echo "$alert" | jq -r '.number')
  SECRET_TYPE_NAME=$(echo "$alert" | jq -r '.secret_type')
  PATH=$(echo "$alert" | jq -r '.first_location_detected.path')
  LINE=$(echo "$alert" | jq -r '.first_location_detected.start_line')
  
  echo "🔧 Resolving alert #$ALERT_NUMBER..."
  echo "   Type: $SECRET_TYPE_NAME"
  echo "   Location: $PATH:$LINE"
  
  # Prepare resolution payload
  PAYLOAD=$(jq -n \
    --arg resolution "$RESOLUTION" \
    --arg comment "$COMMENT" \
    '{
      state: "resolved",
      resolution: $resolution,
      resolution_comment: $comment
    }')
  
  # Resolve the alert
  if gh api \
    repos/$REPO/secret-scanning/alerts/$ALERT_NUMBER \
    --method PATCH \
    --input - <<< "$PAYLOAD" 2>&1; then
    echo "   ✅ Resolved"
    RESOLVED=$((RESOLVED + 1))
  else
    echo "   ❌ Failed"
    FAILED=$((FAILED + 1))
    FAILED_ALERTS+=("$ALERT_NUMBER")
  fi
  echo ""
done

echo "=========================================="
echo "📊 Resolution Summary:"
echo "   ✅ Resolved: $RESOLVED"
echo "   ❌ Failed: $FAILED"
echo ""

if [ "$FAILED" -gt 0 ]; then
  echo "⚠️  Failed alerts: ${FAILED_ALERTS[*]}"
  echo "   These may require manual resolution or different permissions"
  echo ""
fi

echo "🔗 View alerts: https://github.com/$REPO/security/secret-scanning"
echo ""

if [ "$FAILED" -eq 0 ]; then
  echo "✅ All alerts resolved successfully!"
  exit 0
else
  echo "⚠️  Some alerts failed to resolve"
  exit 1
fi

