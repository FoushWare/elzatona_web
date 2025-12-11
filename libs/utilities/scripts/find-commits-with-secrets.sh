#!/bin/bash
# Script to find commits containing secrets in git history
# This helps identify which commits need to be cleaned

set -e

echo "🔍 Finding Commits with Secrets in Git History"
echo "================================================"
echo ""

# Patterns to search for
PATTERNS=(
    "AIzaSy[A-Za-z0-9_-]{35}"  # Firebase API keys
    "YOUR_SUPABASE_KEY_HERE"  # JWT tokens (Supabase)
    "gho_[A-Za-z0-9]{36,}"  # GitHub tokens
    "ghp_[A-Za-z0-9]{36,}"  # GitHub personal access tokens
    "sk-proj-[A-Za-z0-9]{48,}"  # OpenAI keys
    "sntryu_[A-Za-z0-9_-]{40,}"  # Sentry tokens
    "GOCSPX-[A-Za-z0-9_-]{40,}"  # Google OAuth secrets
)

OUTPUT_FILE="commits-with-secrets-$(date +%Y%m%d-%H%M%S).txt"

echo "📝 Searching git history for secret patterns..."
echo "   Results will be saved to: $OUTPUT_FILE"
echo ""

> "$OUTPUT_FILE"

for pattern in "${PATTERNS[@]}"; do
    echo "🔍 Searching for pattern: $pattern"
    echo "----------------------------------------" | tee -a "$OUTPUT_FILE"
    echo "Pattern: $pattern" | tee -a "$OUTPUT_FILE"
    echo "" | tee -a "$OUTPUT_FILE"
    
    # Search in commit diffs
    commits=$(git log --all -p -S "$pattern" --oneline 2>/dev/null | head -50 || true)
    
    if [ ! -z "$commits" ]; then
        echo "Found commits:" | tee -a "$OUTPUT_FILE"
        echo "$commits" | tee -a "$OUTPUT_FILE"
        echo "" | tee -a "$OUTPUT_FILE"
    else
        echo "No commits found for this pattern" | tee -a "$OUTPUT_FILE"
        echo "" | tee -a "$OUTPUT_FILE"
    fi
done

echo ""
echo "✅ Search complete!"
echo "📄 Results saved to: $OUTPUT_FILE"
echo ""
echo "💡 Next steps:"
echo "   1. Review the commits in $OUTPUT_FILE"
echo "   2. Rotate all exposed secrets"
echo "   3. Use libs/utilities/scripts/clean-git-history-secrets.sh to remove secrets"
echo "   4. Force push after cleanup (git push origin --force --all)"
echo ""
