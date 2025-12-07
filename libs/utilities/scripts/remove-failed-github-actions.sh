#!/bin/bash
# Remove failed GitHub Actions workflow runs
# Repository: https://github.com/FoushWare/elzatona_web

set -e

REPO="FoushWare/elzatona_web"
MAX_RUNS=100  # Check last 100 runs

echo "🧹 Removing Failed GitHub Actions Runs"
echo "   Repository: $REPO"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ Error: GitHub CLI (gh) is not installed"
  echo "   Install it: https://cli.github.com/"
  exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ Error: Not authenticated with GitHub CLI"
  echo "   Run: gh auth login"
  exit 1
fi

echo "📋 Fetching failed workflow runs..."
echo ""

# Get failed runs
FAILED_RUNS=$(gh run list --repo "$REPO" --limit "$MAX_RUNS" --json databaseId,status,conclusion,workflowName,createdAt --jq '.[] | select(.conclusion == "failure" or .conclusion == "cancelled") | "\(.databaseId)|\(.workflowName)|\(.status)|\(.conclusion)|\(.createdAt)"')

if [ -z "$FAILED_RUNS" ]; then
  echo "✅ No failed runs found in the last $MAX_RUNS runs"
  exit 0
fi

# Count failed runs
FAILED_COUNT=$(echo "$FAILED_RUNS" | wc -l | tr -d ' ')
echo "⚠️  Found $FAILED_COUNT failed/cancelled runs"
echo ""

# Show failed runs
echo "📋 Failed Runs:"
echo "$FAILED_RUNS" | while IFS='|' read -r id name status conclusion created; do
  echo "   - ID: $id | $name | $status | $conclusion | $created"
done
echo ""

# Ask for confirmation
read -p "❓ Delete all failed runs? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Cancelled"
  exit 0
fi

# Delete failed runs
DELETED=0
FAILED=0

echo "$FAILED_RUNS" | while IFS='|' read -r id name status conclusion created; do
  echo "🗑️  Deleting run $id ($name)..."
  if gh run delete "$id" --repo "$REPO" 2>/dev/null; then
    echo "   ✅ Deleted"
    DELETED=$((DELETED + 1))
  else
    echo "   ❌ Failed to delete"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "✅ Cleanup complete!"
echo "   Deleted: $DELETED"
echo "   Failed: $FAILED"
