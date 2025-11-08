#!/bin/bash

# Complete Setup Script - Installs CLIs, Authenticates, and Sets Up Secrets
# This script guides you through the entire process

set -e

echo "🚀 Complete Secrets Setup Guide"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Check/Install GitHub CLI
echo -e "${BLUE}Step 1: GitHub CLI${NC}"
echo "-------------------"

if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI is installed${NC}"
    GH_VERSION=$(gh --version | head -1)
    echo "   $GH_VERSION"
else
    echo -e "${YELLOW}⚠️  GitHub CLI not found${NC}"
    echo ""
    echo "Installing GitHub CLI..."
    echo ""
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "Installing via Homebrew..."
            brew install gh
        else
            echo -e "${RED}❌ Homebrew not found${NC}"
            echo "Install Homebrew first: https://brew.sh"
            echo "Or install GitHub CLI manually: https://cli.github.com/"
            exit 1
        fi
    else
        echo -e "${RED}❌ Automatic installation not supported on this OS${NC}"
        echo "Please install manually: https://cli.github.com/"
        exit 1
    fi
fi

# Check GitHub authentication
echo ""
if gh auth status &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI is authenticated${NC}"
    gh auth status 2>&1 | grep -E "Logged in|as" | head -2
else
    echo -e "${YELLOW}⚠️  GitHub CLI not authenticated${NC}"
    echo ""
    echo "Please authenticate:"
    echo "  gh auth login"
    echo ""
    read -p "Press Enter after you've authenticated, or Ctrl+C to exit..."
    if ! gh auth status &> /dev/null; then
        echo -e "${RED}❌ Still not authenticated. Please run: gh auth login${NC}"
        exit 1
    fi
fi

echo ""
echo "================================"
echo ""

# Step 2: Check/Install Vercel CLI
echo -e "${BLUE}Step 2: Vercel CLI${NC}"
echo "----------------"

if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI is installed${NC}"
    VERCEL_VERSION=$(vercel --version 2>&1 | head -1)
    echo "   $VERCEL_VERSION"
else
    echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
    echo ""
    echo "Installing Vercel CLI..."
    echo ""
    
    if command -v npm &> /dev/null; then
        echo "Installing via npm..."
        npm install -g vercel
    elif command -v brew &> /dev/null && [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Installing via Homebrew..."
        brew install vercel-cli
    else
        echo -e "${RED}❌ npm or Homebrew not found${NC}"
        echo "Please install manually:"
        echo "  npm install -g vercel"
        echo "  # or"
        echo "  brew install vercel-cli"
        exit 1
    fi
fi

# Check Vercel authentication
echo ""
if vercel whoami &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI is authenticated${NC}"
    vercel whoami 2>&1 | head -1
else
    echo -e "${YELLOW}⚠️  Vercel CLI not authenticated${NC}"
    echo ""
    echo "Please authenticate:"
    echo "  vercel login"
    echo ""
    read -p "Press Enter after you've authenticated, or Ctrl+C to exit..."
    if ! vercel whoami &> /dev/null; then
        echo -e "${RED}❌ Still not authenticated. Please run: vercel login${NC}"
        exit 1
    fi
fi

echo ""
echo "================================"
echo ""

# Step 3: Check .env.local
echo -e "${BLUE}Step 3: Environment File${NC}"
echo "----------------------"

if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local file not found${NC}"
    echo ""
    echo "You need to create .env.local with your secrets."
    echo ""
    echo "Options:"
    echo "  1. Copy from env.example: cp env.example .env.local"
    echo "  2. Create manually with your actual secrets"
    echo ""
    echo "Required secrets:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    echo "  - JWT_SECRET"
    echo "  - NEXTAUTH_SECRET"
    echo "  - And others (see .cursor/SECRETS_SETUP_GUIDE.md)"
    echo ""
    read -p "Press Enter after creating .env.local, or Ctrl+C to exit..."
    
    if [ ! -f ".env.local" ]; then
        echo -e "${RED}❌ .env.local still not found. Please create it first.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ .env.local found${NC}"

# Check if it has placeholder values
PLACEHOLDER_COUNT=$(grep -c "your-.*-here\|placeholder\|change-in-production" .env.local 2>/dev/null || echo "0")
if [ "$PLACEHOLDER_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $PLACEHOLDER_COUNT placeholder values in .env.local${NC}"
    echo "   Make sure to replace placeholders with actual secrets before proceeding."
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please update .env.local with actual secrets and run again."
        exit 0
    fi
fi

echo ""
echo "================================"
echo ""

# Step 4: Set up secrets
echo -e "${BLUE}Step 4: Setting Up Secrets${NC}"
echo "------------------------"
echo ""

read -p "Set up GitHub Actions secrets? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    echo "Setting up GitHub Actions secrets..."
    bash .cursor/scripts/setup-secrets-from-env.sh 2>&1 | grep -E "Processing|✅|⚠️|Summary" || true
fi

echo ""
read -p "Set up Vercel environment variables? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    echo "Setting up Vercel environment variables..."
    # The setup-secrets-from-env.sh handles both, but we can run vercel separately if needed
    echo "Note: Vercel setup is included in the automated script above."
fi

echo ""
echo "================================"
echo ""

# Step 5: Verify
echo -e "${BLUE}Step 5: Verification${NC}"
echo "----------------"
echo ""

echo "Checking GitHub secrets..."
if gh secret list &> /dev/null; then
    SECRET_COUNT=$(gh secret list 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${GREEN}✅ Found $SECRET_COUNT GitHub secrets${NC}"
    echo ""
    echo "Current secrets:"
    gh secret list 2>/dev/null | head -10
else
    echo -e "${YELLOW}⚠️  Could not list GitHub secrets${NC}"
fi

echo ""
echo "Checking Vercel environment variables..."
if vercel env ls production &> /dev/null; then
    ENV_COUNT=$(vercel env ls production 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${GREEN}✅ Found $ENV_COUNT Vercel production variables${NC}"
else
    echo -e "${YELLOW}⚠️  Could not list Vercel variables${NC}"
fi

echo ""
echo "================================"
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Verify secrets: gh secret list"
echo "  2. Verify Vercel: vercel env ls production"
echo "  3. Test workflows: Push a commit to trigger CI/CD"
echo "  4. Rotate keys if exposed: See .cursor/KEY_ROTATION_GUIDE.md"
echo ""

