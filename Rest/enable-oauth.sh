#!/bin/bash

# Enable OAuth Providers in Supabase
# This script reads credentials from .env.local and enables OAuth providers

set -e

echo "🔧 OAuth Provider Setup Script"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "❌ .env.local file not found!"
  exit 1
fi

# Load environment variables from .env.local
export $(grep -v '^#' .env.local | grep -E "(GOOGLE_|GITHUB_|SUPABASE_)" | xargs)

# Check if SUPABASE_ACCESS_TOKEN is set
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "⚠️  SUPABASE_ACCESS_TOKEN not found in .env.local"
  echo ""
  echo "To enable OAuth via API, you need a Supabase Access Token:"
  echo "1. Go to: https://supabase.com/dashboard/account/tokens"
  echo "2. Click 'Generate new token'"
  echo "3. Add it to .env.local as: SUPABASE_ACCESS_TOKEN=your_token_here"
  echo ""
  echo "Alternatively, you can enable OAuth manually in the Supabase dashboard:"
  echo "👉 https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/auth/providers"
  echo ""
  echo "Manual setup steps:"
  echo "1. Open the link above"
  echo "2. Enable 'Google' provider and enter:"
  echo "   - Client ID: $GOOGLE_CLIENT_ID"
  echo "   - Client Secret: $GOOGLE_CLIENT_SECRET"
  echo "3. Enable 'GitHub' provider and enter:"
  echo "   - Client ID: $GITHUB_CLIENT_ID"
  echo "   - Client Secret: $GITHUB_CLIENT_SECRET"
  echo ""
  exit 1
fi

# Check if OAuth credentials are set
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
  echo "❌ Google OAuth credentials not found in .env.local"
  exit 1
fi

if [ -z "$GITHUB_CLIENT_ID" ] || [ -z "$GITHUB_CLIENT_SECRET" ]; then
  echo "❌ GitHub OAuth credentials not found in .env.local"
  exit 1
fi

echo "✅ All credentials found!"
echo ""
echo "🚀 Running OAuth setup script..."
echo ""

# Run the Node.js setup script
node setup-oauth-providers.js

