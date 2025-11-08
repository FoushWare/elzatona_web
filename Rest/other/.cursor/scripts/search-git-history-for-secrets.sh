#!/bin/bash

# Script to search git history for exposed secrets and API keys
# This helps identify commits that contain sensitive information

echo "🔍 Searching Git History for Exposed Secrets..."
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Patterns to search for
PATTERNS=(
  "AIzaSy"                    # Firebase API keys
  "YOUR_SUPABASE_KEY_HERE"  # JWT tokens (Supabase anon keys)
  "process.env.SUPABASE_SERVICE_ROLE_KEY"  # Specific service role key
  "hpnewqkvpnthpohvxcmq"     # Project-specific identifiers
  "fir-demo-project-adffb"   # Firebase project ID
  "elzatona-super-secret-jwt-key-2024-production-ready"  # Hardcoded JWT secrets
  "elzatona-nextauth-secret-2024-production-ready"  # Hardcoded NextAuth secrets
)

# Search for each pattern
for pattern in "${PATTERNS[@]}"; do
  echo -e "${YELLOW}Searching for: $pattern${NC}"
  echo "----------------------------------------"
  
  # Search in commit messages
  commits=$(git log --all --oneline --grep="$pattern" -i 2>/dev/null)
  if [ ! -z "$commits" ]; then
    echo -e "${RED}Found in commit messages:${NC}"
    echo "$commits"
    echo ""
  fi
  
  # Search in file contents across all commits
  files=$(git log --all --source --pretty=format:"%H" --name-only | xargs -I {} git grep -l "$pattern" {} 2>/dev/null | sort -u)
  if [ ! -z "$files" ]; then
    echo -e "${RED}Found in file contents:${NC}"
    echo "$files" | head -10
    echo ""
  fi
  
  # Search in diffs
  diff_results=$(git log --all -p -S "$pattern" --oneline 2>/dev/null | head -20)
  if [ ! -z "$diff_results" ]; then
    echo -e "${RED}Found in commit diffs:${NC}"
    echo "$diff_results"
    echo ""
  fi
  
  echo ""
done

echo ""
echo "=============================================="
echo -e "${GREEN}Search Complete${NC}"
echo ""
echo "⚠️  If secrets were found:"
echo "1. Rotate the exposed keys immediately"
echo "2. Consider using git-filter-repo to remove from history"
echo "3. Force push (⚠️ WARNING: This rewrites history)"
echo ""
echo "📚 Resources:"
echo "- git-filter-repo: https://github.com/newren/git-filter-repo"
echo "- BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/"

