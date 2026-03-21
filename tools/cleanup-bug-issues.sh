#!/bin/bash

# Script to bulk close GitHub issues with the 'bugs' label
# Usage: ./tools/cleanup-bug-issues.sh [--delete] [--dry-run]

LABEL="bugs"
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
ACTION="close"
DRY_RUN=false

FORCE=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --delete) ACTION="delete" ;;
        --dry-run) DRY_RUN=true ;;
        --yes) FORCE=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

while true; do
echo "🔍 Fetching open issues with label '$LABEL' in $REPO..."

# Get issue numbers
ISSUES=$(gh issue list --label "$LABEL" --state open --limit 1000 --json number --jq '.[].number')
COUNT=$(echo "$ISSUES" | wc -w | tr -d ' ')

if [ "$COUNT" -eq 0 ]; then
    echo "✅ No more open issues found with label '$LABEL'."
    break
fi

echo "⚠️  Found $COUNT issues to $ACTION."

if [ "$DRY_RUN" = true ]; then
    echo "✨ Dry run: The following issue numbers would be ${ACTION}d:"
    echo "$ISSUES"
    exit 0
fi

if [ "$FORCE" = false ]; then
    read -p "Are you sure you want to $ACTION $COUNT issues? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Operation cancelled."
        exit 1
    fi
    FORCE=true # Don't ask again for next batches
fi

if [ "$ACTION" == "delete" ]; then
    echo "$ISSUES" | xargs -n 1 -P 5 -I {} sh -c "echo '🗑️ Deleting issue #{}...' && gh issue delete '{}' --confirm"
else
    # Closing without comment to avoid secondary rate limits
    echo "$ISSUES" | xargs -n 1 -P 5 -I {} sh -c "echo '🔒 Closing issue #{}...' && gh issue close '{}' --reason 'not planned'"
fi

echo "✅ Finished ${ACTION}ing batch of $COUNT issues."
done
