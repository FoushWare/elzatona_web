#!/bin/bash

# Direct GitHub Secrets Setup - Simple and reliable

set -e

echo "🔐 Setting up GitHub Actions Secrets"
echo "===================================="
echo ""

if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub authenticated"
echo ""

# Secrets to set up
SECRETS=(
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

# Read .env.local and set secrets
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Remove quotes
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Check if this is a secret we need
    if [[ " ${SECRETS[@]} " =~ " ${key} " ]]; then
        # Skip placeholders
        if [[ "$value" == *"your-"* ]] || [[ "$value" == *"placeholder"* ]] || [[ -z "$value" ]]; then
            echo "⚠️  Skipping $key (placeholder)"
            continue
        fi
        
        # Check if already exists
        if gh secret list 2>/dev/null | grep -q "^$key"; then
            echo "⚠️  $key already exists"
            continue
        fi
        
        # Set the secret
        echo "Setting: $key"
        echo "$value" | gh secret set "$key" 2>&1 | grep -v "Setting\|secret" || true
        COUNT=$((COUNT + 1))
    fi
done < .env.local

echo ""
echo "✅ Set $COUNT GitHub secrets"
echo ""
echo "Verify with: gh secret list"

