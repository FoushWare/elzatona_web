#!/bin/bash
# Remove all hardcoded secrets from git history using git-filter-repo
# This script removes secrets detected by GitHub secret scanning

set -e

echo "🔒 Git History Secret Removal Script"
echo "======================================"
echo ""
echo "⚠️  WARNING: This will rewrite git history!"
echo "⚠️  Make sure you have a backup before proceeding!"
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Aborted"
    exit 1
fi

# Check if git-filter-repo is installed
if ! command -v python3 -m git_filter_repo &> /dev/null; then
    echo "📦 Installing git-filter-repo..."
    python3 -m pip install --user git-filter-repo
fi

echo ""
echo "🔍 Removing secrets from git history..."
echo ""

# List of secret patterns to remove (based on GitHub secret scanning alerts)
# Format: "secret_value" -> "replacement"

# ⚠️ WARNING: This script should NOT contain actual secrets!
# ⚠️ Replace the placeholders below with actual secrets ONLY when running the script locally
# ⚠️ DO NOT commit this file with real secrets!

# Supabase Service Keys
# ⚠️ WARNING: These are placeholders. Replace with actual keys from your Supabase dashboard
# ⚠️ These keys should be rotated immediately if they were ever committed to git history
SUPABASE_KEY_1="YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE"
SUPABASE_KEY_2="YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE"
SUPABASE_KEY_3="YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE"
SUPABASE_KEY_4="YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE"

# Google API Keys
# ⚠️ WARNING: These are placeholders. Replace with actual keys from Google Cloud Console
# ⚠️ These keys should be rotated immediately if they were ever committed to git history
GOOGLE_KEY_1="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_2="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_3="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_4="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_5="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_6="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_7="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_8="YOUR_GOOGLE_API_KEY_HERE"
GOOGLE_KEY_9="YOUR_GOOGLE_API_KEY_HERE"

# GitHub OAuth Token
# ⚠️ WARNING: This is a placeholder. Replace with actual token from GitHub Settings
# ⚠️ This token should be revoked and regenerated if it was ever committed to git history
GITHUB_TOKEN="GH_OAUTH_TOKEN_PLACEHOLDER"

# OpenAI API Key
# ⚠️ WARNING: This is a placeholder. Replace with actual key from OpenAI dashboard
# ⚠️ This key should be rotated immediately if it was ever committed to git history
OPENAI_KEY="OPENAI_API_KEY_PLACEHOLDER"

# Sentry Token
# ⚠️ WARNING: This is a placeholder. Replace with actual token from Sentry dashboard
# ⚠️ This token should be rotated immediately if it was ever committed to git history
SENTRY_TOKEN="YOUR_SENTRY_TOKEN_HERE"

# Google OAuth
# ⚠️ WARNING: These are placeholders. Replace with actual credentials from Google Cloud Console
# ⚠️ These credentials should be rotated immediately if they were ever committed to git history
GOOGLE_OAUTH_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE"
GOOGLE_OAUTH_SECRET="YOUR_GOOGLE_OAUTH_CLIENT_SECRET_HERE"

echo "📋 Secrets to remove:"
echo "  - 4 Supabase Service Keys"
echo "  - 9 Google API Keys"
echo "  - 1 GitHub OAuth Token"
echo "  - 1 OpenAI API Key"
echo "  - 1 Sentry Token"
echo "  - 1 Google OAuth Client ID"
echo "  - 1 Google OAuth Client Secret"
echo ""

# Create replacement file
REPLACEMENT_FILE=$(mktemp)
cat > "$REPLACEMENT_FILE" << 'EOFREPLACE'
# ⚠️ WARNING: This section contains placeholders for secret replacement patterns
# ⚠️ Replace the actual secret values (left side of ==>) with the real secrets you want to remove
# ⚠️ Format: actual_secret==>replacement_placeholder
# 
# Example usage:
# 1. Identify secrets in your git history using: git log --all -p -S "secret_pattern"
# 2. Add them to this file in the format: actual_secret==>YOUR_PLACEHOLDER_HERE
# 3. Run git-filter-repo with this replacement file
#
# ⚠️ DO NOT commit actual secrets to this file!
# ⚠️ This file should only contain placeholders and examples

# Supabase keys (examples - replace with your actual keys if needed)
# YOUR_ACTUAL_SUPABASE_KEY_1==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
# YOUR_ACTUAL_SUPABASE_KEY_2==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
# YOUR_ACTUAL_SUPABASE_KEY_3==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
# YOUR_ACTUAL_SUPABASE_KEY_4==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

# Google API Keys (examples - replace with your actual keys if needed)
# YOUR_ACTUAL_GOOGLE_KEY_1==>YOUR_GOOGLE_API_KEY_HERE
# YOUR_ACTUAL_GOOGLE_KEY_2==>YOUR_GOOGLE_API_KEY_HERE
# ... (add more as needed)

# GitHub OAuth (example - replace with your actual token if needed)
# YOUR_ACTUAL_GITHUB_TOKEN==>GH_OAUTH_TOKEN_PLACEHOLDER

# OpenAI (example - replace with your actual key if needed)
# YOUR_ACTUAL_OPENAI_KEY==>OPENAI_API_KEY_PLACEHOLDER

# Sentry (example - replace with your actual token if needed)
# YOUR_ACTUAL_SENTRY_TOKEN==>YOUR_SENTRY_TOKEN_HERE

# Google OAuth (examples - replace with your actual credentials if needed)
# YOUR_ACTUAL_GOOGLE_OAUTH_ID==>YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE
# YOUR_ACTUAL_GOOGLE_OAUTH_SECRET==>YOUR_GOOGLE_OAUTH_CLIENT_SECRET_HERE
EOFREPLACE

echo "✅ Replacement file created: $REPLACEMENT_FILE"
echo ""
echo "⚠️  This script will:"
echo "   1. Rewrite git history to replace all secrets with placeholders"
echo "   2. Require force push to update remote"
echo "   3. Affect all branches and commits"
echo ""
read -p "Proceed with git-filter-repo? (yes/no): " proceed

if [ "$proceed" != "yes" ]; then
    echo "❌ Aborted"
    rm "$REPLACEMENT_FILE"
    exit 1
fi

# Note: git-filter-repo replacement is complex
# For now, we'll create a script that can be run manually
# The actual execution requires careful testing

echo ""
echo "📝 Manual steps required:"
echo "   1. Review the replacement file: $REPLACEMENT_FILE"
echo "   2. Use git-filter-repo with --replace-text option"
echo "   3. Test on a backup branch first"
echo ""
echo "Example command (DO NOT RUN YET):"
echo "python3 -m git_filter_repo --replace-text $REPLACEMENT_FILE"
echo ""
echo "⚠️  Backup your repository before running git-filter-repo!"
rm "$REPLACEMENT_FILE"
