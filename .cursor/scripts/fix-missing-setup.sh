#!/bin/bash

# Fix Missing Setup - Set up GitHub secrets and install git hooks

set -e

echo "🔧 Fixing Missing Setup"
echo "======================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Set up GitHub Secrets
echo -e "${GREEN}Step 1: Setting up GitHub Actions Secrets${NC}"
echo "----------------------------------------"

if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    exit 1
fi

# Required secrets for GitHub Actions
REQUIRED_SECRETS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "JWT_SECRET"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
    "GITHUB_CLIENT_ID"
    "GITHUB_CLIENT_SECRET"
    "NEXT_PUBLIC_FIREBASE_API_KEY"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    "NEXT_PUBLIC_FIREBASE_APP_ID"
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
)

COUNT=0
SKIPPED=0

while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Remove quotes
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Check if this is a required secret
    if [[ " ${REQUIRED_SECRETS[@]} " =~ " ${key} " ]]; then
        # Skip placeholders
        if [[ "$value" == *"your-"* ]] || [[ "$value" == *"placeholder"* ]] || [[ -z "$value" ]]; then
            echo -e "${YELLOW}⚠️  Skipping $key (placeholder)${NC}"
            SKIPPED=$((SKIPPED + 1))
            continue
        fi
        
        # Check if already exists
        if gh secret list 2>/dev/null | grep -q "^$key"; then
            echo -e "${YELLOW}⚠️  $key already exists (skipping)${NC}"
            continue
        fi
        
        # Set the secret
        echo -e "${GREEN}Setting: $key${NC}"
        echo "$value" | gh secret set "$key" 2>&1 | grep -v "secret" || true
        COUNT=$((COUNT + 1))
    fi
done < .env.local

echo ""
echo -e "${GREEN}✅ GitHub secrets: $COUNT set, $SKIPPED skipped${NC}"
echo ""

# Step 2: Install Git Hooks
echo -e "${GREEN}Step 2: Installing Git Hooks${NC}"
echo "----------------------------------------"

if [ ! -d ".git/hooks" ]; then
    mkdir -p .git/hooks
fi

if [ -f ".cursor/scripts/pre-commit-secrets-check.sh" ]; then
    cp .cursor/scripts/pre-commit-secrets-check.sh .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
else
    echo -e "${RED}❌ Pre-commit script not found${NC}"
fi

echo ""
echo "======================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Verify with:"
echo "  gh secret list"
echo "  ls -la .git/hooks/pre-commit"

