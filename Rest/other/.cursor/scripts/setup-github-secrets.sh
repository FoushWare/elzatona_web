#!/bin/bash

# Setup GitHub Actions Secrets
# This script adds required secrets to GitHub repository for CI/CD workflows

set -e

echo "🔐 Setting up GitHub Actions Secrets"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo ""
    echo "Install it with:"
    echo "  brew install gh  # macOS"
    echo "  # or visit: https://cli.github.com/"
    echo ""
    echo "Then authenticate:"
    echo "  gh auth login"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not authenticated with GitHub${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")
if [ -z "$REPO" ]; then
    echo -e "${RED}❌ Could not determine repository${NC}"
    echo "Make sure you're in a git repository and have access"
    exit 1
fi

echo -e "${GREEN}✅ Repository: $REPO${NC}"
echo ""

# Required secrets based on workflows
declare -A SECRETS=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="Supabase project URL"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="Supabase anonymous key"
    ["SUPABASE_SERVICE_ROLE_KEY"]="Supabase service role key (CRITICAL)"
    ["JWT_SECRET"]="JWT secret for authentication"
    ["NEXTAUTH_SECRET"]="NextAuth.js secret"
    ["NEXTAUTH_URL"]="NextAuth.js URL"
    ["GOOGLE_CLIENT_ID"]="Google OAuth client ID"
    ["GOOGLE_CLIENT_SECRET"]="Google OAuth client secret"
    ["GITHUB_CLIENT_ID"]="GitHub OAuth client ID"
    ["GITHUB_CLIENT_SECRET"]="GitHub OAuth client secret"
    ["NEXT_PUBLIC_FIREBASE_API_KEY"]="Firebase API key"
    ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"]="Firebase auth domain"
    ["NEXT_PUBLIC_FIREBASE_PROJECT_ID"]="Firebase project ID"
    ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"]="Firebase storage bucket"
    ["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"]="Firebase messaging sender ID"
    ["NEXT_PUBLIC_FIREBASE_APP_ID"]="Firebase app ID"
    ["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"]="Firebase measurement ID"
)

# Function to check if secret exists
secret_exists() {
    local secret_name=$1
    h secret list 2>/dev/null | grep -q "^$secret_name" || return 1
}

# Function to set secret
set_secret() {
    local secret_name=$1
    local secret_value=$2
    
    if secret_exists "$secret_name"; then
        echo -e "${YELLOW}⚠️  Secret $secret_name already exists${NC}"
        read -p "Update it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Skipping $secret_name"
            return 0
        fi
    fi
    
    echo "$secret_value" | gh secret set "$secret_name"
    echo -e "${GREEN}✅ Set secret: $secret_name${NC}"
}

# Interactive mode
echo "Choose setup mode:"
echo "1) Interactive (prompt for each secret)"
echo "2) From .env.local file"
echo "3) List existing secrets"
read -p "Enter choice (1-3): " -n 1 -r
echo
echo

case $REPLY in
    1)
        echo "Interactive mode:"
        echo "For each secret, enter the value or press Enter to skip"
        echo ""
        
        for secret_name in "${!SECRETS[@]}"; do
            description="${SECRETS[$secret_name]}"
            echo -e "${YELLOW}Secret: $secret_name${NC}"
            echo "  Description: $description"
            
            if secret_exists "$secret_name"; then
                echo -e "  ${GREEN}Already exists${NC}"
                read -p "  Update? (y/N): " -n 1 -r
                echo
                if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                    continue
                fi
            fi
            
            read -sp "  Enter value (hidden): " secret_value
            echo
            
            if [ -n "$secret_value" ]; then
                set_secret "$secret_name" "$secret_value"
            else
                echo "  Skipped"
            fi
            echo
        done
        ;;
    2)
        if [ ! -f ".env.local" ]; then
            echo -e "${RED}❌ .env.local file not found${NC}"
            exit 1
        fi
        
        echo "Reading from .env.local..."
        echo ""
        
        # Read .env.local and set secrets
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # Skip comments and empty lines
            [[ "$key" =~ ^#.*$ ]] && continue
            [[ -z "$key" ]] && continue
            
            # Remove quotes from value
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
            
            # Check if this is a secret we care about
            if [[ -n "${SECRETS[$key]}" ]]; then
                if [ -n "$value" ] && [ "$value" != "your-*-here" ] && [ "$value" != "your-*-key-here" ]; then
                    set_secret "$key" "$value"
                else
                    echo -e "${YELLOW}⚠️  Skipping $key (placeholder value)${NC}"
                fi
            fi
        done < .env.local
        ;;
    3)
        echo "Existing secrets:"
        echo ""
        gh secret list
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo -e "${GREEN}✅ GitHub Actions secrets setup complete!${NC}"
echo ""
echo "Verify secrets with:"
echo "  gh secret list"
echo ""
echo "Test workflows will now have access to these secrets."

