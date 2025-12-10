#!/bin/bash
# Script to clean secrets from git history using git-filter-repo
# ⚠️ WARNING: This rewrites git history - use with caution!
# ⚠️ Only run this AFTER rotating all exposed secrets

set -e

echo "🔒 Git History Secret Cleanup Script"
echo "====================================="
echo ""
echo "⚠️  CRITICAL WARNINGS:"
echo "   1. This will REWRITE git history"
echo "   2. You MUST rotate all exposed secrets FIRST"
echo "   3. All team members must reset their local repos after this"
echo "   4. This requires force push (git push --force)"
echo ""
echo "📋 Prerequisites:"
echo "   ✅ All secrets have been rotated"
echo "   ✅ All .env files updated"
echo "   ✅ GitHub Secrets updated"
echo "   ✅ Team members notified"
echo "   ✅ Backup branch created"
echo ""

read -p "Have you completed ALL prerequisites? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Aborted. Please complete all prerequisites first."
    echo ""
    echo "See docs/GIT_HISTORY_REMEDIATION.md for detailed instructions."
    exit 1
fi

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null && ! python3 -c "import git_filter_repo" 2>/dev/null; then
    echo "📦 Installing git-filter-repo..."
    python3 -m pip install --user git-filter-repo || {
        echo "❌ Failed to install git-filter-repo"
        echo "   Install manually: python3 -m pip install --user git-filter-repo"
        exit 1
    }
    echo "✅ git-filter-repo installed"
    echo ""
fi

# Create backup branch
BACKUP_BRANCH="backup-before-secret-cleanup-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup branch: $BACKUP_BRANCH"
git branch "$BACKUP_BRANCH" || {
    echo "⚠️  Warning: Could not create backup branch (may already exist)"
}
echo "✅ Backup branch ready"
echo ""

# Create replacements file
REPLACEMENTS_FILE=$(mktemp)
echo "📝 Creating replacements file..."

cat > "$REPLACEMENTS_FILE" << 'EOF'
# ⚠️ WARNING: Replace placeholders below with your ACTUAL secrets before running
# ⚠️ This file should NOT be committed with real secrets!
# Format: actual_secret==>replacement_placeholder

# Example format (replace with your actual secrets):
# EXAMPLE_SUPABASE_SERVICE_ROLE_JWT_TOKEN==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
# EXAMPLE_GOOGLE_API_KEY==>YOUR_GOOGLE_API_KEY_HERE
# EXAMPLE_SUPABASE_ANON_JWT_TOKEN==>YOUR_SUPABASE_ANON_KEY_HERE
#
# Note: The above are placeholders. Replace with your actual exposed secrets.
# Format: actual_secret==>replacement_placeholder

# ⚠️ Add your actual secrets here (one per line):
# YOUR_ACTUAL_SECRET_1==>YOUR_PLACEHOLDER_HERE
# YOUR_ACTUAL_SECRET_2==>YOUR_PLACEHOLDER_HERE
EOF

echo "✅ Replacements file created: $REPLACEMENTS_FILE"
echo ""
echo "📝 Next steps:"
echo "   1. Edit the replacements file: $REPLACEMENTS_FILE"
echo "   2. Replace placeholders with your ACTUAL secrets"
echo "   3. Run this script again to apply the replacements"
echo ""
echo "⚠️  The replacements file contains placeholders only."
echo "   You must add your actual secrets before running git-filter-repo."
echo ""
echo "💡 To find secrets in history, run:"
echo "   git log --all -p -S \"YOUR_SECRET_PATTERN\" --oneline"
echo ""
echo "📚 See docs/GIT_HISTORY_REMEDIATION.md for detailed instructions."
echo ""

# Ask if user wants to proceed with actual cleanup
read -p "Have you edited the replacements file with actual secrets? (yes/no): " proceed

if [ "$proceed" != "yes" ]; then
    echo "ℹ️  Script paused. Edit $REPLACEMENTS_FILE and run again when ready."
    echo "   The file will be preserved for you to edit."
    exit 0
fi

# Verify replacements file has actual secrets (not just placeholders)
if grep -q "YOUR_ACTUAL_\|YOUR_PLACEHOLDER" "$REPLACEMENTS_FILE"; then
    echo "⚠️  Warning: Replacements file still contains placeholders!"
    echo "   Please replace them with actual secrets before proceeding."
    read -p "Continue anyway? (yes/no): " force
    if [ "$force" != "yes" ]; then
        echo "❌ Aborted. Please edit the replacements file first."
        exit 1
    fi
fi

echo ""
echo "🔄 Starting git history rewrite..."
echo "   This may take several minutes..."
echo ""

# Apply replacements using git-filter-repo
if python3 -m git_filter_repo --replace-text "$REPLACEMENTS_FILE" --force 2>&1; then
    echo ""
    echo "✅ History rewrite complete!"
    echo ""
    
    # Verify removal
    echo "🔍 Verifying secrets are removed..."
    REMAINING=$(GIT_PAGER=cat git log --all -p --no-pager -100 2>/dev/null | grep -iE "AIzaSy|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9|gho_|ghp_|sk-proj-|sntryu_" | head -5 || true)
    
    if [ -z "$REMAINING" ]; then
        echo "✅ No secrets found in recent history!"
    else
        echo "⚠️  Warning: Some secrets may still exist:"
        echo "$REMAINING" | head -3
        echo ""
        echo "💡 You may need to add more patterns to the replacements file"
    fi
    
    echo ""
    echo "📊 Next Steps:"
    echo "   1. Review the changes: git log --oneline -10"
    echo "   2. Verify no secrets remain: git log --all -p | grep -iE 'AIzaSy|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'"
    echo "   3. Force push to remote: git push origin --force --all"
    echo "   4. Notify team members to reset their local repos"
    echo ""
    echo "⚠️  IMPORTANT: Before force pushing, make sure:"
    echo "   - All keys have been rotated"
    echo "   - All .env files are updated"
    echo "   - All GitHub Secrets are updated"
    echo "   - Team members are notified"
    echo ""
else
    echo ""
    echo "❌ Error: git-filter-repo failed"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Make sure git-filter-repo is installed: python3 -m pip install --user git-filter-repo"
    echo "   2. Check if you have uncommitted changes: git status"
    echo "   3. Try on a test branch first"
    rm -f "$REPLACEMENTS_FILE"
    exit 1
fi

# Clean up
rm -f "$REPLACEMENTS_FILE"

echo "✅ Script complete!"
echo ""
echo "📝 Remember to:"
echo "   1. Force push: git push origin --force --all"
echo "   2. Notify team members"
echo "   3. Update all environment files with new rotated keys"
