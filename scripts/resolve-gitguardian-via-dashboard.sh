#!/bin/bash
# Script to help resolve GitGuardian incidents via dashboard

echo "🔒 GitGuardian Incident Resolution Helper"
echo "=========================================="
echo ""

# Load API key from environment or .env.local
if [ -z "$GITGUARDIAN_API_KEY" ]; then
  if [ -f .env.local ]; then
    export $(grep GITGUARDIAN_API_KEY .env.local | xargs)
  fi
fi

# Note: This script doesn't require the API key - it's just for dashboard access
# If you need to use the API, set GITGUARDIAN_API_KEY environment variable

INCIDENT_IDS=(
  "23145079"
  "23145081"
  "23144948"
  "23145090"
  "23145091"
  "23145093"
  "23144949"
  "23145096"
)

echo "📋 Incident IDs to resolve:"
for id in "${INCIDENT_IDS[@]}"; do
  echo "  - $id"
done
echo ""

echo "🌐 Opening GitGuardian dashboard..."
if command -v open &> /dev/null; then
  open "https://dashboard.gitguardian.com/workspace/incidents"
elif command -v xdg-open &> /dev/null; then
  xdg-open "https://dashboard.gitguardian.com/workspace/incidents"
else
  echo "Please open: https://dashboard.gitguardian.com/workspace/incidents"
fi

echo ""
echo "📝 Instructions:"
echo "  1. Log in to GitGuardian dashboard"
echo "  2. Navigate to 'Incidents' section"
echo "  3. Filter by PR #163 or search for each incident ID"
echo "  4. For each incident, click 'Resolve' or 'Mark as Resolved'"
echo "  5. Add comment: 'Secret removed from current files. Rotated.'"
echo ""
echo "🔗 Direct links to incidents (if available):"
for id in "${INCIDENT_IDS[@]}"; do
  echo "  https://dashboard.gitguardian.com/workspace/incidents/$id"
done
echo ""
echo "✅ After resolving all incidents, the GitGuardian check will pass!"
