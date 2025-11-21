#!/bin/bash
# Complete Test Database Setup Script
# This script guides you through setting up the test database

echo "🚀 Test Database Complete Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.test.local exists
if [ ! -f .env.test.local ]; then
  echo -e "${RED}❌ .env.test.local not found!${NC}"
  echo "   Please create it first with your test database credentials"
  exit 1
fi

# Load environment variables
export $(cat .env.test.local | grep -v '^#' | xargs)

# Check if required variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo -e "${RED}❌ Missing required environment variables!${NC}"
  echo "   Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.test.local"
  exit 1
fi

PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | grep -oP 'https://\K[^.]+')
echo -e "${GREEN}✅ Environment variables loaded${NC}"
echo "   Project: $PROJECT_REF"
echo ""

# Admin credentials
ADMIN_EMAIL="elzatonafoushware@gmail.com"
ADMIN_PASSWORD="ZatonaFoushware\$12"

echo "📋 Setup Steps:"
echo ""
echo -e "${YELLOW}Step 1: Run SQL Schema in Supabase${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open SQL Editor:"
echo "   https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
echo ""
echo "2. Copy the entire contents of: Rest/scripts/test-database-schema.sql"
echo ""
echo "3. Paste into SQL Editor and click 'Run'"
echo ""
echo "4. Wait for success message: 'Success. No rows returned'"
echo ""
echo -e "${YELLOW}Press Enter after you've run the SQL schema...${NC}"
read -r

echo ""
echo -e "${YELLOW}Step 2: Create Admin Account${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Creating admin account..."
echo "   Email: $ADMIN_EMAIL"
echo ""

ADMIN_EMAIL=$ADMIN_EMAIL ADMIN_PASSWORD="$ADMIN_PASSWORD" node Rest/scripts/create-test-admin.js

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ Admin account created successfully!${NC}"
  echo ""
  echo "📋 Login Credentials:"
  echo "   Email: $ADMIN_EMAIL"
  echo "   Password: $ADMIN_PASSWORD"
  echo ""
  echo "🔗 Login at: http://localhost:3000/admin/login"
else
  echo ""
  echo -e "${RED}❌ Failed to create admin account${NC}"
  echo "   Make sure you ran the SQL schema first!"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ Test database setup complete!${NC}"


