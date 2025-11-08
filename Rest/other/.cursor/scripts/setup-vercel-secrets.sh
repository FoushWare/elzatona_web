#!/bin/bash

# Setup Vercel Environment Variables
# This script adds required environment variables to Vercel project

set -e

echo "🚀 Setting up Vercel Environment Variables"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed${NC}"
    echo ""
    echo "Install it with:"
    echo "  npm install -g vercel"
    echo "  # or"
    echo "  brew install vercel-cli  # macOS"
    echo ""
    echo "Then login:"
    echo "  vercel login"
    exit 1
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo "Run: vercel login"
    exit 1
fi

# Get project info
PROJECT_NAME=$(cat vercel.json 2>/dev/null | grep -o '"name": "[^"]*' | cut -d'"' -f4 || echo "")
if [ -z "$PROJECT_NAME" ]; then
    echo -e "${YELLOW}⚠️  Could not determine project name from vercel.json${NC}"
    read -p "Enter Vercel project name (or press Enter to use current directory): " PROJECT_NAME
fi

echo -e "${GREEN}✅ Using project: ${PROJECT_NAME:-$(basename $(pwd))}${NC}"
echo ""

# Required environment variables
declare -A ENV_VARS=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="Supabase project URL"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="Supabase anonymous key"
    ["SUPABASE_SERVICE_ROLE_KEY"]="Supabase service role key (CRITICAL - server-side only)"
    ["JWT_SECRET"]="JWT secret for authentication"
    ["NEXTAUTH_SECRET"]="NextAuth.js secret"
    ["NEXTAUTH_URL"]="NextAuth.js URL (production URL)"
    ["GOOGLE_CLIENT_ID"]="Google OAuth client ID"
    ["GOOGLE_CLIENT_SECRET"]="Google OAuth client secret"
    ["GITHUB_CLIENT_ID"]="GitHub OAuth client ID"
    ["GITHUB_CLIENT_SECRET"]="GitHub OAuth client secret"
    ["NEXT_PUBLIC_FIREBASE_API_KEY"]="Firebase API key (public)"
    ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"]="Firebase auth domain (public)"
    ["NEXT_PUBLIC_FIREBASE_PROJECT_ID"]="Firebase project ID (public)"
    ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"]="Firebase storage bucket (public)"
    ["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"]="Firebase messaging sender ID (public)"
    ["NEXT_PUBLIC_FIREBASE_APP_ID"]="Firebase app ID (public)"
    ["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"]="Firebase measurement ID (public)"
)

# Function to check if env var exists
env_exists() {
    local env_name=$1
    local env_type=${2:-production}  # production, preview, or development
    
    vercel env ls "$env_type" 2>/dev/null | grep -q "^$env_name" || return 1
}

# Function to set environment variable
set_env_var() {
    local env_name=$1
    local env_value=$2
    local env_type=${3:-production}  # production, preview, or development
    
    # Determine if it's a system/env var or secret
    # Secrets (sensitive) should use --scope
    local is_secret=0
    if [[ "$env_name" == *"SECRET"* ]] || [[ "$env_name" == *"KEY"* ]] || [[ "$env_name" == *"CLIENT_SECRET"* ]]; then
        is_secret=1
    fi
    
    echo -e "${BLUE}Setting $env_name for $env_type environment...${NC}"
    
    if [ $is_secret -eq 1 ]; then
        # Use vercel env add for secrets (interactive)
        echo "$env_value" | vercel env add "$env_name" "$env_type" --yes 2>/dev/null || {
            # If it exists, remove and re-add
            vercel env rm "$env_name" "$env_type" --yes 2>/dev/null || true
            echo "$env_value" | vercel env add "$env_name" "$env_type" --yes
        }
    else
        # Use vercel env add for regular env vars
        echo "$env_value" | vercel env add "$env_name" "$env_type" --yes 2>/dev/null || {
            vercel env rm "$env_name" "$env_type" --yes 2>/dev/null || true
            echo "$env_value" | vercel env add "$env_name" "$env_type" --yes
        }
    fi
    
    echo -e "${GREEN}✅ Set $env_name for $env_type${NC}"
}

# Interactive mode
echo "Choose setup mode:"
echo "1) Interactive (prompt for each variable)"
echo "2) From .env.local file"
echo "3) List existing environment variables"
echo "4) Set for all environments (production, preview, development)"
read -p "Enter choice (1-4): " -n 1 -r
echo
echo

case $REPLY in
    1)
        echo "Select environment:"
        echo "1) Production"
        echo "2) Preview"
        echo "3) Development"
        read -p "Enter choice (1-3): " -n 1 -r
        echo
        echo
        
        case $REPLY in
            1) ENV_TYPE="production" ;;
            2) ENV_TYPE="preview" ;;
            3) ENV_TYPE="development" ;;
            *) ENV_TYPE="production" ;;
        esac
        
        echo "Interactive mode for $ENV_TYPE environment:"
        echo "For each variable, enter the value or press Enter to skip"
        echo ""
        
        for env_name in "${!ENV_VARS[@]}"; do
            description="${ENV_VARS[$env_name]}"
            echo -e "${YELLOW}Variable: $env_name${NC}"
            echo "  Description: $description"
            
            if env_exists "$env_name" "$ENV_TYPE"; then
                echo -e "  ${GREEN}Already exists${NC}"
                read -p "  Update? (y/N): " -n 1 -r
                echo
                if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                    continue
                fi
            fi
            
            read -sp "  Enter value (hidden for secrets): " env_value
            echo
            
            if [ -n "$env_value" ]; then
                set_env_var "$env_name" "$env_value" "$ENV_TYPE"
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
        
        echo "Select environment:"
        echo "1) Production"
        echo "2) Preview"
        echo "3) Development"
        echo "4) All environments"
        read -p "Enter choice (1-4): " -n 1 -r
        echo
        echo
        
        case $REPLY in
            1) ENV_TYPES=("production") ;;
            2) ENV_TYPES=("preview") ;;
            3) ENV_TYPES=("development") ;;
            4) ENV_TYPES=("production" "preview" "development") ;;
            *) ENV_TYPES=("production") ;;
        esac
        
        echo "Reading from .env.local..."
        echo ""
        
        # Read .env.local and set env vars
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # Skip comments and empty lines
            [[ "$key" =~ ^#.*$ ]] && continue
            [[ -z "$key" ]] && continue
            
            # Remove quotes from value
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
            
            # Check if this is a variable we care about
            if [[ -n "${ENV_VARS[$key]}" ]]; then
                if [ -n "$value" ] && [ "$value" != "your-*-here" ] && [ "$value" != "your-*-key-here" ]; then
                    for env_type in "${ENV_TYPES[@]}"; do
                        set_env_var "$key" "$value" "$env_type"
                    done
                else
                    echo -e "${YELLOW}⚠️  Skipping $key (placeholder value)${NC}"
                fi
            fi
        done < .env.local
        ;;
    3)
        echo "Select environment:"
        echo "1) Production"
        echo "2) Preview"
        echo "3) Development"
        read -p "Enter choice (1-3): " -n 1 -r
        echo
        echo
        
        case $REPLY in
            1) ENV_TYPE="production" ;;
            2) ENV_TYPE="preview" ;;
            3) ENV_TYPE="development" ;;
            *) ENV_TYPE="production" ;;
        esac
        
        echo "Existing environment variables for $ENV_TYPE:"
        echo ""
        vercel env ls "$ENV_TYPE"
        ;;
    4)
        echo "Setting for all environments from .env.local..."
        if [ ! -f ".env.local" ]; then
            echo -e "${RED}❌ .env.local file not found${NC}"
            exit 1
        fi
        
        ENV_TYPES=("production" "preview" "development")
        
        while IFS='=' read -r key value || [ -n "$key" ]; do
            [[ "$key" =~ ^#.*$ ]] && continue
            [[ -z "$key" ]] && continue
            
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
            
            if [[ -n "${ENV_VARS[$key]}" ]]; then
                if [ -n "$value" ] && [ "$value" != "your-*-here" ] && [ "$value" != "your-*-key-here" ]; then
                    for env_type in "${ENV_TYPES[@]}"; do
                        set_env_var "$key" "$value" "$env_type"
                    done
                fi
            fi
        done < .env.local
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "==========================================="
echo -e "${GREEN}✅ Vercel environment variables setup complete!${NC}"
echo ""
echo "Verify with:"
echo "  vercel env ls production"
echo "  vercel env ls preview"
echo "  vercel env ls development"
echo ""
echo "Note: After setting variables, you may need to redeploy:"
echo "  vercel --prod"

