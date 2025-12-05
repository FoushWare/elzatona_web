#!/bin/bash
# Fix hardcoded secrets in files identified by GitHub secret scanning
# This script actually fixes the code, not just marks alerts as resolved

set -e

echo "🔒 Fix Hardcoded Secrets from GitHub Alerts"
echo "============================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is not installed"
  echo "   Install: brew install gh (macOS) or visit https://cli.github.com/"
  exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ Not authenticated with GitHub CLI"
  echo "   Run: gh auth login"
  exit 1
fi

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"
echo ""

# Fetch open alerts
echo "🔍 Fetching secret scanning alerts..."
ALERTS=$(gh api repos/$REPO/secret-scanning/alerts \
  --paginate \
  --jq '[.[] | select(.state == "open")]')

TOTAL=$(echo "$ALERTS" | jq 'length')
echo "📊 Found $TOTAL open alerts"
echo ""

if [ "$TOTAL" -eq 0 ]; then
  echo "✅ No open alerts to fix"
  exit 0
fi

# Extract unique file paths
echo "📋 Files with secrets:"
FILES=$(echo "$ALERTS" | jq -r '[.[] | .first_location_detected.path] | unique | .[]')
echo "$FILES" | while read -r filepath; do
  echo "   📄 $filepath"
done
echo ""

# Ask for confirmation
read -p "⚠️  This will modify files to remove hardcoded secrets. Continue? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Cancelled"
  exit 0
fi

echo ""
echo "🔧 Fixing secrets in files..."
echo ""

FIXED_COUNT=0
SKIPPED_COUNT=0

# Function to fix a file
fix_file() {
  local filepath="$1"
  
  if [ ! -f "$filepath" ]; then
    echo "⏭️  Skipping: $filepath (file not found - may be in git history only)"
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
    return
  fi
  
  echo "🔍 Processing: $filepath"
  
  # Backup original
  cp "$filepath" "$filepath.bak"
  
  # Determine file type and fix accordingly
  case "$filepath" in
    *.js|*.mjs|*.ts|*.tsx|*.jsx)
      echo "   📝 JavaScript/TypeScript - replacing with process.env"
      
      # Replace Supabase service keys
      sed -i.bak2 's/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^"'"'"' ]*/process.env.SUPABASE_SERVICE_ROLE_KEY || "YOUR_SERVICE_ROLE_KEY_HERE"/g' "$filepath" 2>/dev/null || true
      
      # Replace Google API keys
      sed -i.bak2 's/AIzaSy[^"'"'"' ]*/process.env.GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY_HERE"/g' "$filepath" 2>/dev/null || true
      
      # Replace GitHub tokens
      sed -i.bak2 's/gho_[^"'"'"' ]*/process.env.GITHUB_TOKEN || "YOUR_GITHUB_TOKEN_HERE"/g' "$filepath" 2>/dev/null || true
      
      # Replace OpenAI keys
      sed -i.bak2 's/sk-proj-[^"'"'"' ]*/process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY_HERE"/g' "$filepath" 2>/dev/null || true
      
      # Replace Sentry tokens
      sed -i.bak2 's/sntryu_[^"'"'"' ]*/process.env.SENTRY_AUTH_TOKEN || "YOUR_SENTRY_TOKEN_HERE"/g' "$filepath" 2>/dev/null || true
      
      # Replace Google OAuth secrets
      sed -i.bak2 's/GOCSPX-[^"'"'"' ]*/process.env.GOOGLE_OAUTH_CLIENT_SECRET || "YOUR_GOOGLE_OAUTH_SECRET_HERE"/g' "$filepath" 2>/dev/null || true
      ;;
    
    *.md|*.txt|*.sh|*.yml|*.yaml|*.json)
      echo "   📝 Documentation/Config - replacing with placeholders"
      
      # Replace with placeholders
      sed -i.bak2 's/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^"'"'"' ]*/YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE/g' "$filepath" 2>/dev/null || true
      sed -i.bak2 's/AIzaSy[^"'"'"' ]*/YOUR_GOOGLE_API_KEY_HERE/g' "$filepath" 2>/dev/null || true
      sed -i.bak2 's/gho_[^"'"'"' ]*/YOUR_GITHUB_TOKEN_HERE/g' "$filepath" 2>/dev/null || true
      sed -i.bak2 's/sk-proj-[^"'"'"' ]*/YOUR_OPENAI_API_KEY_HERE/g' "$filepath" 2>/dev/null || true
      sed -i.bak2 's/sntryu_[^"'"'"' ]*/YOUR_SENTRY_TOKEN_HERE/g' "$filepath" 2>/dev/null || true
      sed -i.bak2 's/GOCSPX-[^"'"'"' ]*/YOUR_GOOGLE_OAUTH_SECRET_HERE/g' "$filepath" 2>/dev/null || true
      ;;
    
    *)
      echo "   ⏭️  Unknown file type - skipping"
      mv "$filepath.bak" "$filepath"
      rm -f "$filepath.bak2"
      SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
      return
      ;;
  esac
  
  # Check if file changed
  if ! diff -q "$filepath.bak" "$filepath" > /dev/null 2>&1; then
    echo "   ✅ Fixed: $filepath"
    FIXED_COUNT=$((FIXED_COUNT + 1))
    rm -f "$filepath.bak" "$filepath.bak2"
  else
    echo "   ⏭️  No changes (may be in git history only)"
    mv "$filepath.bak" "$filepath"
    rm -f "$filepath.bak2"
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
  fi
}

# Process each file
echo "$FILES" | while read -r filepath; do
  fix_file "$filepath"
  echo ""
done

echo "============================================"
echo "📊 Fix Summary:"
echo "   ✅ Fixed: $FIXED_COUNT files"
echo "   ⏭️  Skipped: $SKIPPED_COUNT files"
echo ""

if [ "$FIXED_COUNT" -gt 0 ]; then
  echo "✅ Files have been fixed!"
  echo ""
  echo "📝 Next steps:"
  echo "   1. Review the changes: git diff"
  echo "   2. Commit the fixes: git add . && git commit -m 'security: Remove hardcoded secrets'"
  echo "   3. Push changes: git push"
  echo "   4. Resolve alerts: ./scripts/resolve-secret-scanning-alerts.sh"
  echo ""
else
  echo "ℹ️  No files were modified."
  echo "   This may mean:"
  echo "   - Secrets are only in git history (not in current files)"
  echo "   - Files have already been fixed"
  echo "   - Files are in .gitignore or not tracked"
  echo ""
  echo "   To remove secrets from git history, see: scripts/remove-secrets-from-history.sh"
fi

