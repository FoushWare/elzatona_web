#!/bin/bash
# Secret scanning for pre-commit hook
# Scans staged files for hardcoded secrets

set -e

# Skip if SKIP_SECRET_SCAN is set
if [ "$SKIP_SECRET_SCAN" = "true" ]; then
  echo "   ⏭️  Secret scanning skipped (SKIP_SECRET_SCAN=true)"
  exit 0
fi

echo "🔒 STEP 6: Running secret scanning on staged files..."
echo "   📝 Checking for hardcoded secrets..."
echo ""

# Patterns to detect secrets
PATTERNS=(
  "YOUR_SUPABASE_KEY_HERE"  # JWT tokens (Supabase, etc.)
  "AIzaSy[A-Za-z0-9_-]{35}"                # Google API keys
  "gho_[A-Za-z0-9]{36}"                    # GitHub OAuth tokens
  "ghp_[A-Za-z0-9]{36}"                    # GitHub Personal Access Tokens
  "sk-proj-[A-Za-z0-9]{48,}"               # OpenAI API keys
  "sntryu_[A-Za-z0-9]{64,}"                # Sentry tokens
  "GOCSPX-[A-Za-z0-9_-]{40}"               # Google OAuth secrets
  "AKIA[0-9A-Z]{16}"                       # AWS Access Keys
  "sk_live_[A-Za-z0-9]{32,}"               # Stripe live keys
  "sk_test_[A-Za-z0-9]{32,}"               # Stripe test keys
)

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || true)

if [ -z "$STAGED_FILES" ]; then
  echo "   ℹ️  No staged files to scan"
  echo "   ✅ Secret scanning skipped"
  exit 0
fi

FOUND_SECRETS=0
SECRET_FILES=()

# Check each staged file
for file in $STAGED_FILES; do
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
  echo "   ⚠️  SECRETS DETECTED IN STAGED FILES!"
  echo ""
  echo "   💡 To fix:"
  echo "      1. Remove hardcoded secrets from files"
  echo "      2. Use environment variables instead"
  echo "      3. Run: ./scripts/fix-secrets-from-alerts.sh"
  echo ""
  echo "   💡 To skip (NOT recommended):"
  echo "      SKIP_SECRET_SCAN=true git commit -m 'message'"
  echo ""
  echo "════════════════════════════════════════════════════════════════"
  echo "❌ PRE-COMMIT HOOK FAILED - SECRETS DETECTED!"
  echo "════════════════════════════════════════════════════════════════"
  echo ""
  exit 1
fi

echo "   ✅ No secrets detected in staged files"
exit 0

