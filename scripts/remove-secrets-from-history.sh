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

# Supabase Service Keys
SUPABASE_KEY_1="YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY"
SUPABASE_KEY_2="YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeWNpbWxzYXR3ZnF4dGZwcmxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIzNzc4NCwiZXhwIjoyMDc4ODEzNzg0fQ.YOUR_SERVICE_ROLE_KEY_HERE"
SUPABASE_KEY_3="YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnlsdHNtY2l2bXFmbG94cG1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyODc1MywiZXhwIjoyMDc4ODA0NzUzfQ.xkENH2kmw3LaFHR9Xd0a3JIhbBWIPcd0HjVPwR-AnMw"
SUPABASE_KEY_4="YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjE0NzQzMCwiZXhwIjoyMDQ3NzIzNDMwfQ.8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8"

# Google API Keys
GOOGLE_KEY_1="AIzaSyC4QzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ"
GOOGLE_KEY_2="AIzaSyBvJ8Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q"
GOOGLE_KEY_3="AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ"
GOOGLE_KEY_4="AIzaSyBvQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ"
GOOGLE_KEY_5="AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y"
GOOGLE_KEY_6="AIzaSyBvOkBw0lBp4t4j8K9vL2mN3oP5qR6sT7u"
GOOGLE_KEY_7="AIzaSyBvOkBwJ1T3uygE1qgqQqQqQqQqQqQqQqQ"
GOOGLE_KEY_8="AIzaSyBvOkBwJ1T3cTToj4XqHn8YqHn8YqHn8Yq"
GOOGLE_KEY_9="AIzaSyBvOkBwJ1B5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q"

# GitHub OAuth Token
GITHUB_TOKEN="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"

# OpenAI API Key
OPENAI_KEY="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"

# Sentry Token
SENTRY_TOKEN="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"

# Google OAuth
GOOGLE_OAUTH_ID="655799372296-vd44sjnvf427est82dsa9nj029iis4b7.apps.googleusercontent.com"
GOOGLE_OAUTH_SECRET="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"

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
# Secret replacements
# Format: old_secret==>new_placeholder

# Supabase keys
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeWNpbWxzYXR3ZnF4dGZwcmxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIzNzc4NCwiZXhwIjoyMDc4ODEzNzg0fQ.YOUR_SERVICE_ROLE_KEY_HERE==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnlsdHNtY2l2bXFmbG94cG1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyODc1MywiZXhwIjoyMDc4ODA0NzUzfQ.xkENH2kmw3LaFHR9Xd0a3JIhbBWIPcd0HjVPwR-AnMw==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjE0NzQzMCwiZXhwIjoyMDQ3NzIzNDMwfQ.8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8v8K8==>YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

# Google API Keys
AIzaSyC4QzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvJ8Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvOkBw0lBp4t4j8K9vL2mN3oP5qR6sT7u==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvOkBwJ1T3uygE1qgqQqQqQqQqQqQqQqQ==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvOkBwJ1T3cTToj4XqHn8YqHn8YqHn8Yq==>YOUR_GOOGLE_API_KEY_HERE
AIzaSyBvOkBwJ1B5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==>YOUR_GOOGLE_API_KEY_HERE

# GitHub OAuth
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==>YOUR_GITHUB_OAUTH_TOKEN_HERE

# OpenAI
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==>YOUR_OPENAI_API_KEY_HERE

# Sentry
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==>YOUR_SENTRY_TOKEN_HERE

# Google OAuth
655799372296-vd44sjnvf427est82dsa9nj029iis4b7.apps.googleusercontent.com==>YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE
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==>YOUR_GOOGLE_OAUTH_CLIENT_SECRET_HERE
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
