#!/bin/bash

# Pre-commit hook to check for exposed secrets
# Install: cp .cursor/scripts/pre-commit-secrets-check.sh .git/hooks/pre-commit

set -e

echo "🔍 Checking for exposed secrets before commit..."

# Patterns to check for
PATTERNS=(
    "AIzaSy[A-Za-z0-9_-]{35}"  # Firebase API Key
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"  # JWT tokens
    "sk_live_[A-Za-z0-9]{32,}"  # Stripe live keys
    "sk_test_[A-Za-z0-9]{32,}"  # Stripe test keys
    "AKIA[0-9A-Z]{16}"  # AWS Access Key ID
    "ghp_[A-Za-z0-9]{36}"  # GitHub Personal Access Token
    "gho_[A-Za-z0-9]{36}"  # GitHub OAuth Token
    "ghu_[A-Za-z0-9]{36}"  # GitHub User-to-Server Token
    "ghs_[A-Za-z0-9]{36}"  # GitHub Server-to-Server Token
    "ghr_[A-Za-z0-9]{76}"  # GitHub Refresh Token
)

# Files to check (staged files)
FILES=$(git diff --cached --name-only --diff-filter=ACM)

FOUND_SECRETS=0

for file in $FILES; do
    # Skip if file doesn't exist or is binary
    [ ! -f "$file" ] && continue
    file "$file" | grep -q "text" || continue
    
    # Skip certain files/directories
    [[ "$file" == *".cursor"* ]] && continue
    [[ "$file" == *".git"* ]] && continue
    [[ "$file" == *"node_modules"* ]] && continue
    [[ "$file" == *".next"* ]] && continue
    [[ "$file" == *"SECURITY_AUDIT"* ]] && continue
    [[ "$file" == *"GIT_HISTORY"* ]] && continue
    
    for pattern in "${PATTERNS[@]}"; do
        if grep -qE "$pattern" "$file" 2>/dev/null; then
            echo "❌ Potential secret found in: $file"
            echo "   Pattern: $pattern"
            echo ""
            echo "If this is a false positive, you can:"
            echo "  1. Add the file to .gitignore"
            echo "  2. Use environment variables instead"
            echo "  3. Skip this check: git commit --no-verify"
            echo ""
            FOUND_SECRETS=1
        fi
    done
done

if [ $FOUND_SECRETS -eq 1 ]; then
    echo "🚨 SECRETS DETECTED! Commit blocked."
    echo ""
    echo "Please remove secrets before committing."
    exit 1
fi

echo "✅ No secrets detected. Proceeding with commit."
exit 0

