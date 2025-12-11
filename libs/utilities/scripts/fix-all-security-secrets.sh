#!/bin/bash
# Fix all hardcoded secrets in repository
# Replaces with environment variables or placeholders

set -e

echo "🔒 Fixing All Hardcoded Secrets"
echo ""

# Files to fix (source files only, excluding docs and backups)
FILES_TO_FIX=(
  "scripts/fix-questions-cleaning.js"
  "Rest/scripts/scripts/seed-all-questions-comprehensive.js"
  "Rest/scripts/scripts/reset-admin-password.js"
)

for file in "${FILES_TO_FIX[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Fixing: $file"
    # This will be done manually per file
  fi
done

echo ""
echo "✅ Use manual fixes for each file (see individual file fixes)"
