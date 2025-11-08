#!/bin/bash

# Setup All Secrets - GitHub Actions + Vercel
# This script orchestrates setting up secrets for both GitHub Actions and Vercel

set -e

echo "🔐 Setting up All Secrets (GitHub Actions + Vercel)"
echo "==================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check prerequisites
MISSING_DEPS=()

if ! command -v gh &> /dev/null; then
    MISSING_DEPS+=("gh (GitHub CLI)")
fi

if ! command -v vercel &> /dev/null; then
    MISSING_DEPS+=("vercel (Vercel CLI)")
fi

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo -e "${RED}❌ Missing dependencies:${NC}"
    for dep in "${MISSING_DEPS[@]}"; do
        echo "  - $dep"
    done
    echo ""
    echo "Install missing dependencies and run again."
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found${NC}"
    echo "Create it first with your secrets, then run this script again."
    exit 1
fi

echo "This script will:"
echo "  1. Set up GitHub Actions secrets"
echo "  2. Set up Vercel environment variables"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "=========================================="
echo -e "${BLUE}Step 1: GitHub Actions Secrets${NC}"
echo "=========================================="
echo ""

# Run GitHub secrets setup
if bash .cursor/scripts/setup-github-secrets.sh --from-env 2>/dev/null; then
    echo -e "${GREEN}✅ GitHub Actions secrets configured${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub Actions setup had issues (may need manual setup)${NC}"
    echo "Run manually: bash .cursor/scripts/setup-github-secrets.sh"
fi

echo ""
echo "=========================================="
echo -e "${BLUE}Step 2: Vercel Environment Variables${NC}"
echo "=========================================="
echo ""

# Run Vercel secrets setup
if bash .cursor/scripts/setup-vercel-secrets.sh --from-env 2>/dev/null; then
    echo -e "${GREEN}✅ Vercel environment variables configured${NC}"
else
    echo -e "${YELLOW}⚠️  Vercel setup had issues (may need manual setup)${NC}"
    echo "Run manually: bash .cursor/scripts/setup-vercel-secrets.sh"
fi

echo ""
echo "==================================================="
echo -e "${GREEN}✅ All secrets setup complete!${NC}"
echo "==================================================="
echo ""
echo "Next steps:"
echo "  1. Verify GitHub secrets: gh secret list"
echo "  2. Verify Vercel env vars: vercel env ls production"
echo "  3. Test workflows/deployments"
echo ""

