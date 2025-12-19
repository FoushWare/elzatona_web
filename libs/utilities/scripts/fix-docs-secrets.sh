#!/bin/bash
# Replace hardcoded secrets in documentation files with placeholders

set -e

echo "📝 Replacing secrets in documentation files with placeholders..."

# Function to replace secrets with placeholders
replace_in_file() {
  local file="$1"
  if [ ! -f "$file" ]; then
    return
  fi

  # Replace Supabase keys
  sed -i '' 's/YOUR_SUPABASE_KEY_HERE/YOUR_SUPABASE_KEY_HERE/g' "$file" 2>/dev/null || true
  
  # Replace Google API keys
  sed -i '' 's/AIzaSy[^"'"'"' ]*/YOUR_GOOGLE_API_KEY_HERE/g' "$file" 2>/dev/null || true
  
  # Replace GitHub tokens
  sed -i '' 's/gho_[^"'"'"' ]*/YOUR_GITHUB_TOKEN_HERE/g' "$file" 2>/dev/null || true
  
  # Replace OpenAI keys
  sed -i '' 's/sk-proj-[^"'"'"' ]*/YOUR_OPENAI_API_KEY_HERE/g' "$file" 2>/dev/null || true
  
  # Replace Sentry tokens
  sed -i '' 's/sntryu_[^"'"'"' ]*/SENTRY_TOKEN_PLACEHOLDER/g' "$file" 2>/dev/null || true
  
  # Replace Google OAuth secrets
  sed -i '' 's/GO'"'"'"'CSPX-[^"'"'"' ]*/YOUR_GOOGLE_OAUTH_SECRET_HERE/g' "$file" 2>/dev/null || true
}

# Process documentation files
find Rest/markdown -type f \( -name "*.md" -o -name "*.yaml" \) | while read file; do
  if grep -q "YOUR_SUPABASE_KEY_HERE\|AIzaSy\|gho_\|sk-proj-\|sntryu_\|GO""CSPX-" "$file" 2>/dev/null; then
    echo "   Processing: $file"
    replace_in_file "$file"
  fi
done

echo ""
echo "✅ Documentation files updated!"
