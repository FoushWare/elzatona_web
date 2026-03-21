#!/bin/bash
# High-Performance Bulk Remote Branch Purge Script

echo "🔍 Fetching remote branches..."
git fetch origin --prune

# Define protected branches
PROTECTED_REGEX="^(main|develop|releases)$"

# Get list of remote branches, filter out protected ones and HEAD
REMOTE_BRANCHES=$(git branch -r | grep 'origin/' | grep -v 'origin/HEAD' | sed 's/origin\///' | sed 's/^[[:space:]]*//' | grep -vE "$PROTECTED_REGEX")

if [ -z "$REMOTE_BRANCHES" ]; then
    echo "✅ No branches to purge."
    exit 0
fi

echo "🗑️ Starting parallelized remote purge..."
# Use xargs to parallelize with 20 processes
echo "$REMOTE_BRANCHES" | xargs -n 1 -P 20 -I {} sh -c "echo 'Deleting: {}' && git push origin --delete '{}' --no-verify"

echo "✨ Finished! Running final prune..."
git remote prune origin
echo "✅ Done."
