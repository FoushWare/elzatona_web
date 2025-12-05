#!/bin/bash
# Remove all hardcoded secrets from repository files
# Replaces them with environment variable references or placeholders

set -e

echo "🔒 Removing Hardcoded Secrets from Repository"
echo ""

# Function to replace secrets in a file
replace_secrets() {
  local file="$1"
  
  if [ ! -f "$file" ]; then
    return
  fi
  
  echo "   Processing: $file"
  
  # Replace Supabase service role keys with env var
  sed -i '' 's/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^"'"'"']*/process.env.SUPABASE_SERVICE_ROLE_KEY || "YOUR_SERVICE_ROLE_KEY_HERE"/g' "$file" 2>/dev/null || true
  
  # Replace Google API keys with env var
  sed -i '' 's/AIzaSy[^"'"'"' ]*/process.env.GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY_HERE"/g' "$file" 2>/dev/null || true
  
  # Replace GitHub tokens with env var
  sed -i '' 's/gho_[^"'"'"' ]*/process.env.GITHUB_TOKEN || "YOUR_GITHUB_TOKEN_HERE"/g' "$file" 2>/dev/null || true
  
  # Replace OpenAI keys with env var
  sed -i '' 's/sk-proj-[^"'"'"' ]*/process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY_HERE"/g' "$file" 2>/dev/null || true
  
  # Replace Sentry tokens with env var
  sed -i '' 's/sntryu_[^"'"'"' ]*/process.env.SENTRY_AUTH_TOKEN || "YOUR_SENTRY_TOKEN_HERE"/g' "$file" 2>/dev/null || true
  
  # Replace Google OAuth secrets with env var
  sed -i '' 's/GOCSPX-[^"'"'"' ]*/process.env.GOOGLE_OAUTH_CLIENT_SECRET || "YOUR_GOOGLE_OAUTH_SECRET_HERE"/g' "$file" 2>/dev/null || true
}

# Process source files
echo "📝 Processing source files..."
find scripts -type f \( -name "*.js" -o -name "*.mjs" -o -name "*.ts" \) ! -path "*/node_modules/*" -exec bash -c 'replace_secrets "$0"' {} \;

# Process Rest/scripts (legacy files)
echo "📝 Processing Rest/scripts files..."
find Rest/scripts -type f \( -name "*.js" -o -name "*.mjs" -o -name "*.ts" \) ! -path "*/node_modules/*" -exec bash -c 'replace_secrets "$0"' {} \;

echo ""
echo "✅ Secret removal complete!"
echo ""
echo "⚠️  Note: Review files manually to ensure replacements are correct"
echo "   Some files may need manual adjustment"
