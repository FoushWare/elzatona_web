#!/bin/bash
# Secret scanning for pre-push hook
# Scans changed files for hardcoded secrets

set -e

# Skip if SKIP_SECRET_SCAN is set
if [ "$SKIP_SECRET_SCAN" = "true" ]; then
  echo "   ⏭️  Secret scanning skipped (SKIP_SECRET_SCAN=true)"
  exit 0
fi

echo "🔒 STEP 7: Running secret scanning on changed files..."
echo "   📝 Checking for hardcoded secrets..."
echo ""

# Patterns to detect secrets
PATTERNS=(
  "YOUR_SUPABASE_KEY_HERE"  # JWT tokens (Supabase, etc.)
  "AI""zaSy[0-9A-Za-z_-]{35}"               # Google API Keys
  "gho_[A-Za-z0-9]{36}"                   # GitHub OAuth Tokens
  "ghp_[A-Za-z0-9]{36}"                    # GitHub Personal Access Tokens
  "sk-proj-[A-Za-z0-9]{48,}"               # OpenAI API keys
  "sntryu_[A-Za-z0-9]{64,}"                # Sentry tokens
  "GO""CSPX-[A-Za-z0-9_-]{40}"               # Google OAuth secrets
  "AKIA[0-9A-Z]{16}"                       # AWS Access Keys
  "sk_live_[A-Za-z0-9]{32,}"               # Stripe live keys
  "sk_test_[A-Za-z0-9]{32,}"               # Stripe test keys
)

# Get changed files (files that will be pushed)
REMOTE="${1:-origin}"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE_BRANCH="$REMOTE/$BRANCH"

# Check if remote branch exists
if git rev-parse --verify "$REMOTE_BRANCH" >/dev/null 2>&1; then
  CHANGED_FILES=$(git diff --name-only "$REMOTE_BRANCH"..HEAD 2>/dev/null || true)
else
  # If remote branch doesn't exist, check all files in current commit
  CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || git ls-files || true)
fi

if [ -z "$CHANGED_FILES" ]; then
  echo "   ℹ️  No changed files to scan"
  echo "   ✅ Secret scanning skipped"
  exit 0
fi

FOUND_SECRETS=0
SECRET_FILES=()

# Check each changed file
for file in $CHANGED_FILES; do
  # Skip if file doesn't exist
  [ ! -f "$file" ] && continue
  
  # Skip binary files
  if file "$file" | grep -qE "(binary|executable|image|archive)" 2>/dev/null; then
    continue
  fi
  
  # Skip certain directories/files
  [[ "$file" == *".cursor"* ]] && continue
  [[ "$file" == *".git"* ]] && continue
  [[ "$file" == *"node_modules"* ]] && continue
  [[ "$file" == *".next"* ]] && continue
  [[ "$file" == *"SECURITY_AUDIT"* ]] && continue
  [[ "$file" == *"GIT_HISTORY"* ]] && continue
  [[ "$file" == *".snap"* ]] && continue
  [[ "$file" == *"coverage"* ]] && continue
  
  # Check for secrets
  for pattern in "${PATTERNS[@]}"; do
    if grep -qE "$pattern" "$file" 2>/dev/null; then
      if [ $FOUND_SECRETS -eq 0 ]; then
        echo "   ❌ Potential secrets detected!"
        echo ""
      fi
      echo "   🚨 Secret found in: $file"
      echo "      Pattern: $pattern"
      SECRET_FILES+=("$file")
      FOUND_SECRETS=1
      break
    fi
  done
done

if [ $FOUND_SECRETS -eq 1 ]; then
  echo ""
  echo "   ⚠️  SECRETS DETECTED IN CHANGED FILES!"
  echo ""
  echo "   💡 To fix:"
  echo "      1. Remove hardcoded secrets from files"
  echo "      2. Use environment variables instead"
  echo "      3. Run: ./scripts/fix-secrets-from-alerts.sh"
  echo ""
  echo "   💡 To skip (NOT recommended):"
  echo "      SKIP_SECRET_SCAN=true git push"
  echo ""
  echo "════════════════════════════════════════════════════════════════"
  echo "❌ PRE-PUSH HOOK FAILED - SECRETS DETECTED!"
  echo "════════════════════════════════════════════════════════════════"
  echo ""
  exit 1
fi

echo "   ✅ No secrets detected in changed files"
exit 0

