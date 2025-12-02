#!/usr/bin/env bash

###############################################################################
# GitHub Secrets Setup Script for Test Environment
# 
# This script helps you add all required GitHub Secrets for test environment
# using the GitHub CLI (gh).
#
# Prerequisites:
#   1. GitHub CLI installed: brew install gh (or see https://cli.github.com/)
#   2. Authenticated with GitHub: gh auth login
#   3. .env.test.local file exists with test credentials
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Repository info
REPO_OWNER="FoushWare"
REPO_NAME="GreatFrontendHub"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔐 GitHub Secrets Setup for TEST Environment"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  IMPORTANT: This script adds TEST environment secrets"
echo "   GitHub Actions will use TEST database, NOT production"
echo ""
echo "Repository: ${REPO_OWNER}/${REPO_NAME}"
echo "Source: .env.test.local (TEST credentials)"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo ""
    echo "Install it with:"
    echo "  brew install gh"
    echo ""
    echo "Or visit: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub${NC}"
    echo ""
    echo "Authenticate with:"
    echo "  gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI is installed and authenticated${NC}"
echo ""

# Check if .env.test.local exists
ENV_FILE=".env.test.local"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}⚠️  .env.test.local not found${NC}"
    echo ""
    echo -e "${BLUE}📝 Creating template file...${NC}"
    echo ""
    cat > "$ENV_FILE" << 'EOF'
# ⚠️  TEST Environment Configuration
# This file contains TEST credentials (NOT production)
# GitHub Actions will use these TEST secrets

APP_ENV=test
NEXT_PUBLIC_APP_ENV=test

# ⚠️  TEST Supabase Credentials (from your TEST project)
# Get these from: Supabase Dashboard → TEST Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-test-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-test-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-test-service-role-key

# ⚠️  TEST Admin Credentials (for TEST database)
# Use test admin account credentials, NOT production
ADMIN_EMAIL=test-admin@example.com
ADMIN_PASSWORD=test-password-123

# JWT Secret (generate with: openssl rand -base64 32)
# Can be any secure random string
JWT_SECRET=your-jwt-secret-here
EOF
    echo -e "${GREEN}✅ Created $ENV_FILE template${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT:${NC}"
    echo -e "${YELLOW}   1. Edit $ENV_FILE with your TEST credentials${NC}"
    echo -e "${YELLOW}   2. Use TEST Supabase project (NOT production)${NC}"
    echo -e "${YELLOW}   3. Use TEST admin account (NOT production)${NC}"
    echo ""
    echo -e "${YELLOW}Then run this script again.${NC}"
    exit 1
fi

# Function to read value from .env file
read_env_value() {
    local key=$1
    grep "^${key}=" "$ENV_FILE" | cut -d '=' -f2- | sed 's/^"//;s/"$//' | xargs
}

# Function to add secret if not empty
add_secret() {
    local secret_name=$1
    local secret_value=$2
    local description=$3
    
    if [ -z "$secret_value" ]; then
        echo -e "${YELLOW}⚠️  Skipping ${secret_name} (not found in $ENV_FILE)${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📝 Adding secret: ${secret_name}${NC}"
    echo "$secret_value" | gh secret set "$secret_name" --repo "${REPO_OWNER}/${REPO_NAME}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Added ${secret_name}${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to add ${secret_name}${NC}"
        return 1
    fi
}

# Read values from .env.test.local
echo "📖 Reading values from $ENV_FILE..."
echo ""

ADMIN_EMAIL=$(read_env_value "ADMIN_EMAIL")
ADMIN_PASSWORD=$(read_env_value "ADMIN_PASSWORD")
TEST_SUPABASE_URL=$(read_env_value "NEXT_PUBLIC_SUPABASE_URL")
TEST_SUPABASE_ANON_KEY=$(read_env_value "NEXT_PUBLIC_SUPABASE_ANON_KEY")
TEST_SUPABASE_SERVICE_ROLE_KEY=$(read_env_value "SUPABASE_SERVICE_ROLE_KEY")
JWT_SECRET=$(read_env_value "JWT_SECRET")

# Check if JWT_SECRET needs to be generated
if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your-jwt-secret-here" ]; then
    echo -e "${YELLOW}⚠️  JWT_SECRET not set or using placeholder${NC}"
    echo ""
    echo "Options:"
    echo "  1. Generate a new secure JWT_SECRET automatically (recommended)"
    echo "  2. Skip JWT_SECRET (you can add it manually later)"
    echo ""
    read -p "Generate a new JWT_SECRET? (Y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]] || [ -z "$REPLY" ]; then
        JWT_SECRET=$(openssl rand -base64 32)
        echo -e "${GREEN}✅ Generated JWT_SECRET${NC}"
        echo ""
        echo -e "${BLUE}💡 Tip: Add this to your $ENV_FILE for future use:${NC}"
        echo "  JWT_SECRET=$JWT_SECRET"
        echo ""
        echo "The script will add this to GitHub Secrets now."
        echo "You can add it to $ENV_FILE later if needed."
        echo ""
    else
        echo -e "${YELLOW}⚠️  Skipping JWT_SECRET - you can add it manually later${NC}"
        echo ""
        JWT_SECRET=""
    fi
fi

# Summary
echo "════════════════════════════════════════════════════════════════"
echo "📋 Secrets to Add:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  ADMIN_EMAIL: ${ADMIN_EMAIL:+✅ Set} ${ADMIN_EMAIL:-❌ Not set}"
echo "  ADMIN_PASSWORD: ${ADMIN_PASSWORD:+✅ Set} ${ADMIN_PASSWORD:-❌ Not set}"
echo "  TEST_SUPABASE_URL: ${TEST_SUPABASE_URL:+✅ Set} ${TEST_SUPABASE_URL:-❌ Not set}"
echo "  TEST_SUPABASE_ANON_KEY: ${TEST_SUPABASE_ANON_KEY:+✅ Set} ${TEST_SUPABASE_ANON_KEY:-❌ Not set}"
echo "  TEST_SUPABASE_SERVICE_ROLE_KEY: ${TEST_SUPABASE_SERVICE_ROLE_KEY:+✅ Set} ${TEST_SUPABASE_SERVICE_ROLE_KEY:-❌ Not set}"
echo "  JWT_SECRET: ${JWT_SECRET:+✅ Set (will be generated)} ${JWT_SECRET:-❌ Not set (will skip)}"
echo ""

# Count how many secrets we have
AVAILABLE_COUNT=0
[ -n "$ADMIN_EMAIL" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))
[ -n "$ADMIN_PASSWORD" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))
[ -n "$TEST_SUPABASE_URL" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))
[ -n "$TEST_SUPABASE_ANON_KEY" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))
[ -n "$TEST_SUPABASE_SERVICE_ROLE_KEY" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))
[ -n "$JWT_SECRET" ] && AVAILABLE_COUNT=$((AVAILABLE_COUNT + 1))

if [ $AVAILABLE_COUNT -eq 0 ]; then
    echo -e "${RED}❌ No secrets found in $ENV_FILE${NC}"
    echo ""
    echo "Please add your test credentials to $ENV_FILE and run the script again."
    exit 1
fi

echo -e "${GREEN}Found ${AVAILABLE_COUNT} secret(s) to add${NC}"
echo ""

# Confirm before proceeding
read -p "Add these secrets to GitHub? (Y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🚀 Adding Secrets..."
echo "════════════════════════════════════════════════════════════════"
echo ""

# Add secrets
SUCCESS_COUNT=0
TOTAL_COUNT=0

# Admin credentials
if [ -n "$ADMIN_EMAIL" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "ADMIN_EMAIL" "$ADMIN_EMAIL" "Admin email for test environment"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

if [ -n "$ADMIN_PASSWORD" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "ADMIN_PASSWORD" "$ADMIN_PASSWORD" "Admin password for test environment"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

# Supabase test environment
if [ -n "$TEST_SUPABASE_URL" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "TEST_SUPABASE_URL" "$TEST_SUPABASE_URL" "Test Supabase project URL"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

if [ -n "$TEST_SUPABASE_ANON_KEY" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "TEST_SUPABASE_ANON_KEY" "$TEST_SUPABASE_ANON_KEY" "Test Supabase anonymous key"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

if [ -n "$TEST_SUPABASE_SERVICE_ROLE_KEY" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "TEST_SUPABASE_SERVICE_ROLE_KEY" "$TEST_SUPABASE_SERVICE_ROLE_KEY" "Test Supabase service role key"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

# JWT Secret
if [ -n "$JWT_SECRET" ]; then
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    if add_secret "JWT_SECRET" "$JWT_SECRET" "JWT secret for admin authentication"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "📊 Summary"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  Added: ${SUCCESS_COUNT}/${TOTAL_COUNT} secrets"
echo ""

if [ $SUCCESS_COUNT -eq $TOTAL_COUNT ]; then
    echo -e "${GREEN}✅ All TEST secrets added successfully!${NC}"
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo "✅ Setup Complete!"
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "Your GitHub Actions workflow will now:"
    echo "  ✅ Use TEST environment (APP_ENV=test)"
    echo "  ✅ Use TEST Supabase database"
    echo "  ✅ Use TEST admin credentials"
    echo "  ✅ Never touch production data"
    echo ""
    echo "Next steps:"
    echo "  1. Push to GitHub to trigger the workflow"
    echo "  2. Check GitHub Actions to verify tests run with TEST environment"
    echo "  3. Verify tests use test database (check logs)"
    echo ""
    echo -e "${BLUE}💡 To verify secrets were added:${NC}"
    echo "   gh secret list --repo ${REPO_OWNER}/${REPO_NAME}"
    echo ""
else
    echo -e "${YELLOW}⚠️  Some secrets were not added${NC}"
    echo ""
    echo "Please check:"
    echo "  1. All TEST values are set in $ENV_FILE"
    echo "  2. You have permission to add secrets to the repository"
    echo "  3. GitHub CLI is properly authenticated"
    echo ""
    echo -e "${YELLOW}⚠️  Remember: Use TEST credentials, NOT production!${NC}"
    echo ""
fi

