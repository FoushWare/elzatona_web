#!/bin/bash
# Script to remove GitGuardian API key from git history using git-filter-repo

set -e

echo "🔒 Removing GitGuardian API Key from Git History"
echo "================================================="
echo ""

# The secret to remove
SECRET_KEY="f4f6560EaBc8Bde0eaF493Db3F04987dfF1cEBdddfAbED0e0bF4dc18AcFFAcB26867ba0"

# Replacement (environment variable reference)
REPLACEMENT="GITGUARDIAN_API_KEY"

# File to process
TARGET_FILE="scripts/resolve-gitguardian-via-dashboard.sh"

echo "📋 Configuration:"
echo "  Secret: ${SECRET_KEY:0:20}... (truncated for security)"
echo "  Replacement: $REPLACEMENT"
echo "  Target file: $TARGET_FILE"
echo ""

# Create replacement rules file
REPLACE_FILE=$(mktemp)
echo "$SECRET_KEY==>$REPLACEMENT" > "$REPLACE_FILE"

echo "🚀 Running git-filter-repo..."
echo "   This will rewrite history for file: $TARGET_FILE"
echo ""

# Run git-filter-repo
python3 -m git_filter_repo \
  --replace-text "$REPLACE_FILE" \
  --path "$TARGET_FILE" \
  --force

# Cleanup
rm -f "$REPLACE_FILE"

echo ""
echo "✅ git-filter-repo completed!"
echo ""
echo "⚠️  Note: Remote has been removed for safety"
echo "   You'll need to restore it:"
echo "   git remote add origin git@github.com:FoushWare/elzatona_web.git"
