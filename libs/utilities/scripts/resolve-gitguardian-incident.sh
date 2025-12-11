#!/bin/bash
# Script to resolve GitGuardian incidents via API
# Usage: ./scripts/resolve-gitguardian-incident.sh <incident_id> [ignore_reason]

set -e

INCIDENT_ID="${1:-}"
IGNORE_REASON="${2:-false_positive}"

if [ -z "$INCIDENT_ID" ]; then
  echo "❌ Error: Incident ID is required"
  echo ""
  echo "Usage: ./scripts/resolve-gitguardian-incident.sh <incident_id> [ignore_reason]"
  echo ""
  echo "Example:"
  echo "  ./scripts/resolve-gitguardian-incident.sh 23156837 false_positive"
  echo ""
  echo "Ignore reasons:"
  echo "  - false_positive (default)"
  echo "  - test_credential"
  echo "  - revoked"
  echo "  - other"
  exit 1
fi

# Load API key from environment or .env.local
if [ -z "$GITGUARDIAN_API_KEY" ]; then
  if [ -f .env.local ]; then
    export $(grep GITGUARDIAN_API_KEY .env.local | xargs)
  fi
fi

if [ -z "$GITGUARDIAN_API_KEY" ]; then
  echo "❌ Error: GITGUARDIAN_API_KEY is not set"
  echo ""
  echo "Set it in one of these ways:"
  echo "  1. Export: export GITGUARDIAN_API_KEY=your_key"
  echo "  2. Add to .env.local: GITGUARDIAN_API_KEY=your_key"
  echo ""
  echo "Get your API key from: https://dashboard.gitguardian.com/workspace/settings/api-keys"
  exit 1
fi

echo "🔒 GitGuardian Incident Resolver"
echo "=================================="
echo ""
echo "Incident ID: $INCIDENT_ID"
echo "Ignore Reason: $IGNORE_REASON"
echo ""

# Prepare request payload
PAYLOAD=$(jq -n \
  --arg reason "$IGNORE_REASON" \
  '{
    ignore_reason: $reason
  }')

echo "🔧 Marking incident as false positive..."
echo ""

# Make API request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "https://api.gitguardian.com/v1/incidents/secrets/$INCIDENT_ID/ignore" \
  -H "Authorization: Token $GITGUARDIAN_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
  echo "✅ Incident #$INCIDENT_ID marked as false positive successfully!"
  echo ""
  echo "📋 Response:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  echo "🔗 View incident: https://dashboard.gitguardian.com/workspace/incidents/$INCIDENT_ID"
  exit 0
else
  echo "❌ Failed to resolve incident (HTTP $HTTP_CODE)"
  echo ""
  echo "Response:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  echo "💡 Troubleshooting:"
  echo "  1. Verify your API key is correct"
  echo "  2. Check that you have permission to resolve incidents"
  echo "  3. Verify the incident ID is correct"
  echo "  4. Try resolving manually: https://dashboard.gitguardian.com/workspace/incidents/$INCIDENT_ID"
  exit 1
fi
