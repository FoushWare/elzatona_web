#!/bin/bash

# Setup secrets from .env.local automatically
# This script reads .env.local and sets up secrets without prompts

set -e

echo "🔐 Setting up secrets from .env.local"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local file not found${NC}"
    echo "Create .env.local with your secrets first."
    exit 1
fi

# Check GitHub CLI
if command -v gh &> /dev/null && gh auth status &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI authenticated${NC}"
    GITHUB_READY=1
else
    echo -e "${YELLOW}⚠️  GitHub CLI not ready (install: brew install gh && gh auth login)${NC}"
    GITHUB_READY=0
fi

# Check Vercel CLI
if command -v vercel &> /dev/null && vercel whoami &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI authenticated${NC}"
    VERCEL_READY=1
else
    echo -e "${YELLOW}⚠️  Vercel CLI not ready (install: npm install -g vercel && vercel login)${NC}"
    VERCEL_READY=0
fi

echo ""

# Secrets to set up (from workflows analysis)
declare -A SECRETS_MAP=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="GitHub,Vercel"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="GitHub,Vercel"
    ["SUPABASE_SERVICE_ROLE_KEY"]="GitHub,Vercel"
    ["JWT_SECRET"]="GitHub,Vercel"
    ["NEXTAUTH_SECRET"]="GitHub,Vercel"
    ["NEXTAUTH_URL"]="GitHub,Vercel"
    ["GOOGLE_CLIENT_ID"]="GitHub,Vercel"
    ["GOOGLE_CLIENT_SECRET"]="GitHub,Vercel"
    ["GITHUB_CLIENT_ID"]="GitHub,Vercel"
    ["GITHUB_CLIENT_SECRET"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_API_KEY"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_PROJECT_ID"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_APP_ID"]="GitHub,Vercel"
    ["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"]="GitHub,Vercel"
)

# Function to check if value is a placeholder
is_placeholder() {
    local value=$1
    [[ "$value" == *"your-"* ]] || \
    [[ "$value" == *"placeholder"* ]] || \
    [[ "$value" == *"change-in-production"* ]] || \
    [[ -z "$value" ]]
}

# Function to set GitHub secret
set_github_secret() {
    local key=$1
    local value=$2
    
    if secret_exists_github "$key"; then
        echo -e "${YELLOW}  ⚠️  $key already exists in GitHub (skipping)${NC}"
        return 0
    fi
    
    echo "$value" | gh secret set "$key" 2>&1 | grep -v "secret" || true
    echo -e "${GREEN}  ✅ Set GitHub secret: $key${NC}"
}

# Function to check if GitHub secret exists
secret_exists_github() {
    gh secret list 2>/dev/null | grep -q "^$1" || return 1
}

# Function to set Vercel env var
set_vercel_env() {
    local key=$1
    local value=$2
    local env_type=${3:-production}
    
    echo "$value" | vercel env add "$key" "$env_type" --yes 2>&1 | grep -v "secret\|Created" || true
    echo -e "${GREEN}  ✅ Set Vercel $env_type: $key${NC}"
}

# Read .env.local and set secrets
echo "Reading .env.local..."
echo ""

GITHUB_COUNT=0
VERCEL_COUNT=0
SKIPPED_COUNT=0

while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Remove quotes from value
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Check if this is a secret we care about
    if [[ -n "${SECRETS_MAP[$key]}" ]]; then
        # Skip placeholders
        if is_placeholder "$value"; then
            echo -e "${YELLOW}⚠️  Skipping $key (placeholder value)${NC}"
            SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
            continue
        fi
        
        echo -e "${GREEN}Processing: $key${NC}"
        
        # Set GitHub secret if ready
        if [ $GITHUB_READY -eq 1 ] && [[ "${SECRETS_MAP[$key]}" == *"GitHub"* ]]; then
            set_github_secret "$key" "$value"
            GITHUB_COUNT=$((GITHUB_COUNT + 1))
        fi
        
        # Set Vercel env vars if ready
        if [ $VERCEL_READY -eq 1 ] && [[ "${SECRETS_MAP[$key]}" == *"Vercel"* ]]; then
            # Set for all environments
            for env in production preview development; do
                set_vercel_env "$key" "$value" "$env"
            done
            VERCEL_COUNT=$((VERCEL_COUNT + 1))
        fi
        
        echo ""
    fi
done < .env.local

echo "======================================"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Summary:"
echo "  GitHub secrets set: $GITHUB_COUNT"
echo "  Vercel env vars set: $VERCEL_COUNT"
echo "  Skipped (placeholders): $SKIPPED_COUNT"
echo ""

if [ $GITHUB_READY -eq 0 ] || [ $VERCEL_READY -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Some services not ready. Install and authenticate:${NC}"
    [ $GITHUB_READY -eq 0 ] && echo "  - GitHub: brew install gh && gh auth login"
    [ $VERCEL_READY -eq 0 ] && echo "  - Vercel: npm install -g vercel && vercel login"
    echo ""
    echo "Then run this script again."
fi

