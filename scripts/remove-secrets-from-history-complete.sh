#!/bin/bash
# Complete script to remove secrets from git history
# Uses git-filter-repo to safely remove secrets from all commits

set -e

echo "🔒 Git History Secret Removal (Complete)"
echo "========================================="
echo ""
echo "⚠️  WARNING: This will rewrite git history!"
echo "⚠️  Make sure you have:"
echo "   1. ✅ Rotated ALL exposed keys"
echo "   2. ✅ Updated all .env files"
echo "   3. ✅ Updated GitHub Secrets"
echo "   4. ✅ Created a backup branch"
echo "   5. ✅ Notified team members"
echo ""

read -p "Have you completed all steps above? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Aborted. Please complete all steps first."
    echo ""
    echo "See GIT_HISTORY_REMEDIATION.md for detailed instructions."
    exit 1
fi

# Check if git-filter-repo is installed
if ! python3 -c "import git_filter_repo" 2>/dev/null; then
    echo "📦 Installing git-filter-repo..."
    python3 -m pip install --user git-filter-repo
    echo "✅ git-filter-repo installed"
    echo ""
fi

# Create backup branch
BACKUP_BRANCH="backup-before-history-cleanup-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup branch: $BACKUP_BRANCH"
git branch "$BACKUP_BRANCH" || true
echo "✅ Backup created"
echo ""

# Create replacements file
REPLACEMENTS_FILE=$(mktemp)
echo "📝 Creating replacements file..."

# Add common secret patterns
cat > "$REPLACEMENTS_FILE" << 'EOF'
# Supabase Service Role Keys (replace with placeholder)
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeWNpbWxzYXR3ZnF4dGZwcmxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIzNzc4NCwiZXhwIjoyMDc4ODEzNzg0fQ==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnlsdHNtY2l2bXFmbG94cG1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyODc1MywiZXhwIjoyMDc4ODA0NzUzfQ==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

# Google API Keys (replace with placeholder)
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>YOUR_GOOGLE_API_KEY_HERE

# GitHub Tokens (replace with placeholder)
gho_==>YOUR_GITHUB_TOKEN_HERE
ghp_==>YOUR_GITHUB_TOKEN_HERE

# OpenAI Keys (replace with placeholder)
sk-proj-==>YOUR_OPENAI_API_KEY_HERE

# Sentry Tokens (replace with placeholder)
sntryu_==>YOUR_SENTRY_TOKEN_HERE
EOF

echo "✅ Replacements file created: $REPLACEMENTS_FILE"
echo ""
echo "📋 Replacements to apply:"
cat "$REPLACEMENTS_FILE" | grep -v "^#" | grep -v "^$" | head -10
echo "   ... (see file for complete list)"
echo ""

read -p "Continue with history rewrite? (yes/no): " proceed

if [ "$proceed" != "yes" ]; then
    echo "❌ Aborted"
    rm -f "$REPLACEMENTS_FILE"
    exit 1
fi

echo ""
echo "🔄 Rewriting git history..."
echo "   This may take several minutes..."
echo ""

# Apply replacements using git-filter-repo
python3 -m git_filter_repo --replace-text "$REPLACEMENTS_FILE" || {
    echo "❌ Error: git-filter-repo failed"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Make sure git-filter-repo is installed: python3 -m pip install --user git-filter-repo"
    echo "   2. Check if you have uncommitted changes: git status"
    echo "   3. Try on a test branch first"
    rm -f "$REPLACEMENTS_FILE"
    exit 1
}

# Clean up
rm -f "$REPLACEMENTS_FILE"

echo ""
echo "✅ History rewrite complete!"
echo ""

# Verify removal
echo "🔍 Verifying secrets are removed..."
REMAINING=$(git log --all -p | grep -iE "AIzaSy|YOUR_SUPABASE_KEY_HERE|gho_|ghp_|sk-proj-|sntryu_" | head -5 || true)

if [ -z "$REMAINING" ]; then
    echo "✅ No secrets found in history!"
else
    echo "⚠️  Warning: Some secrets may still exist:"
    echo "$REMAINING" | head -3
    echo ""
    echo "💡 You may need to add more patterns to the replacements file"
fi

echo ""
echo "📊 Next Steps:"
echo "   1. Review the changes: git log --oneline -10"
echo "   2. Verify no secrets remain: ./scripts/scan-git-history-for-secrets.sh"
echo "   3. Force push to remote: git push origin --force --all"
echo "   4. Notify team members to reset their local repos"
echo ""
echo "⚠️  IMPORTANT: Before force pushing, make sure:"
echo "   - All keys have been rotated"
echo "   - All .env files are updated"
echo "   - All GitHub Secrets are updated"
echo "   - Team members are notified"
echo ""
echo "💡 Backup branch: $BACKUP_BRANCH"
echo "   You can restore from backup if needed: git checkout $BACKUP_BRANCH"

