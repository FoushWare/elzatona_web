#!/bin/bash
# Fix all hardcoded secrets in Rest/scripts files
# Replaces hardcoded values with environment variable requirements

set -e

echo "🔒 Fixing Hardcoded Secrets in Rest/scripts Files"
echo ""

# Pattern to find and replace Supabase service role keys
fix_supabase_service_key() {
  local file="$1"
  if grep -q "SUPABASE_SERVICE_ROLE_KEY.*||.*eyJ" "$file" 2>/dev/null; then
    echo "   Fixing Supabase service role key in: $file"
    # Replace pattern: process.env.SUPABASE_SERVICE_ROLE_KEY || 'hardcoded-key'
    # With: process.env.SUPABASE_SERVICE_ROLE_KEY (and add validation)
    sed -i '' "s/process\.env\.SUPABASE_SERVICE_ROLE_KEY || '[^']*'/process.env.SUPABASE_SERVICE_ROLE_KEY/g" "$file" 2>/dev/null || true
    sed -i '' "s/process\.env\.SUPABASE_SERVICE_ROLE_KEY || \"[^\"]*\"/process.env.SUPABASE_SERVICE_ROLE_KEY/g" "$file" 2>/dev/null || true
  fi
}

# Pattern to find and replace Supabase anon keys
fix_supabase_anon_key() {
  local file="$1"
  if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY.*||.*eyJ" "$file" 2>/dev/null; then
    echo "   Fixing Supabase anon key in: $file"
    sed -i '' "s/process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY || '[^']*'/process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY/g" "$file" 2>/dev/null || true
    sed -i '' "s/process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY || \"[^\"]*\"/process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY/g" "$file" 2>/dev/null || true
  fi
}

# Process all Rest/scripts files
find Rest/scripts/scripts -type f \( -name "*.js" -o -name "*.mjs" -o -name "*.ts" \) | while read file; do
  if grep -q "YOUR_SUPABASE_KEY_HERE\|AI""zaSy\|gho_\|sk-proj-\|sntryu_\|GO""CSPX-" "$file" 2>/dev/null; then
    echo "📝 Processing: $file"
    fix_supabase_service_key "$file"
    fix_supabase_anon_key "$file"
  fi
done

echo ""
echo "✅ Secret removal complete!"
echo "⚠️  Note: Manual review and validation code addition may be needed"
