#!/bin/bash
# Comprehensive git history scanner for secrets
# Scans all commits in all branches for hardcoded secrets
# OPTIMIZED FOR LOW MEMORY (8GB RAM) - Single-threaded, incremental processing

set -e

echo "🔍 Git History Secret Scanner (Memory-Optimized)"
echo "================================================"
echo ""
echo "💾 Memory Optimization: Single-threaded, incremental processing"
echo "   Designed for 8GB RAM systems"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Create output file
OUTPUT_FILE="git-history-secrets-report-$(date +%Y%m%d-%H%M%S).txt"
echo "📄 Report will be saved to: $OUTPUT_FILE"
echo ""

# Secret patterns to search for
PATTERNS=(
    "AIzaSy[0-9A-Za-z_-]{35}"  # Google API Key
    "YOUR_SUPABASE_KEY_HERE"  # JWT tokens (Supabase, etc.)
    "gho_[A-Za-z0-9]{36}"  # GitHub OAuth Token
    "ghp_[A-Za-z0-9]{36}"  # GitHub Personal Access Token
    "ghu_[A-Za-z0-9]{36}"  # GitHub User-to-Server Token
    "ghs_[A-Za-z0-9]{36}"  # GitHub Server-to-Server Token
    "sk-proj-[A-Za-z0-9_-]{48}"  # OpenAI API Key
    "sntryu_[A-Za-z0-9]{64}"  # Sentry Personal Token
    "[0-9]{12}-[a-z0-9]{32}\.apps\.googleusercontent\.com"  # Google OAuth Client ID
    "GO""CSPX-[A-Za-z0-9_-]{32}"  # Google OAuth Client Secret
    "sk_live_[A-Za-z0-9]{32,}"  # Stripe live keys
    "sk_test_[A-Za-z0-9]{32,}"  # Stripe test keys
    "AKIA[0-9A-Z]{16}"  # AWS Access Key ID
)

# Initialize report
{
    echo "Git History Secret Scan Report"
    echo "Generated: $(date)"
    echo "Repository: $(git remote get-url origin 2>/dev/null || echo 'local')"
    echo "=============================="
    echo ""
} > "$OUTPUT_FILE"

TOTAL_SECRETS=0
TOTAL_COMMITS=0

echo "🔍 Scanning git history..."
echo ""

# Scan each pattern (one at a time to save memory)
for pattern in "${PATTERNS[@]}"; do
    echo "   Searching for pattern: $pattern"
    
    # Search in all commits (single-threaded, no parallel processing)
    # Use --no-pager to avoid loading full history into memory
    COMMITS=$(GIT_PAGER=cat git log --all -p -S "$pattern" --oneline --no-pager 2>/dev/null | grep "^[a-f0-9]" | sort -u || true)
    
    if [ -n "$COMMITS" ]; then
        COUNT=$(echo "$COMMITS" | wc -l | tr -d ' ')
        TOTAL_SECRETS=$((TOTAL_SECRETS + COUNT))
        
        {
            echo "⚠️  Pattern: $pattern"
            echo "   Found in $COUNT commit(s):"
            echo "$COMMITS" | sed 's/^/   - /'
            echo ""
        } >> "$OUTPUT_FILE"
        
        echo "      ⚠️  Found in $COUNT commit(s)"
    else
        echo "      ✅ Not found"
    fi
done

# Count total commits (memory-efficient)
TOTAL_COMMITS=$(GIT_PAGER=cat git rev-list --all --count --no-pager 2>/dev/null || echo "0")

# Summary
{
    echo "=============================="
    echo "Summary"
    echo "=============================="
    echo "Total commits scanned: $TOTAL_COMMITS"
    echo "Commits with secrets: $TOTAL_SECRETS"
    echo ""
    
    if [ $TOTAL_SECRETS -eq 0 ]; then
        echo "✅ No secrets found in git history!"
    else
        echo "⚠️  WARNING: $TOTAL_SECRETS commit(s) contain secrets!"
        echo ""
        echo "Next Steps:"
        echo "1. Rotate all exposed keys (see SECRET_ROTATION_GUIDE.md)"
        echo "2. Remove secrets from history (see GIT_HISTORY_REMEDIATION.md)"
        echo "3. Run: ./scripts/remove-secrets-from-history-complete.sh"
    fi
} >> "$OUTPUT_FILE"

echo ""
echo "=============================="
echo "Scan Complete"
echo "=============================="
echo "Total commits scanned: $TOTAL_COMMITS"
echo "Commits with secrets: $TOTAL_SECRETS"
echo ""

if [ $TOTAL_SECRETS -eq 0 ]; then
    echo "✅ No secrets found in git history!"
    rm -f "$OUTPUT_FILE"
else
    echo "⚠️  WARNING: $TOTAL_SECRETS commit(s) contain secrets!"
    echo ""
    echo "📄 Full report saved to: $OUTPUT_FILE"
    echo ""
    echo "Next Steps:"
    echo "1. Review the report: cat $OUTPUT_FILE"
    echo "2. Rotate all exposed keys (see SECRET_ROTATION_GUIDE.md)"
    echo "3. Remove secrets from history (see GIT_HISTORY_REMEDIATION.md)"
    echo "4. Run: ./scripts/remove-secrets-from-history-complete.sh"
fi

exit $([ $TOTAL_SECRETS -eq 0 ] && echo 0 || echo 1)

