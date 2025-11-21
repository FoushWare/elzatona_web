#!/bin/bash
# Setup Test Database Script
# This script helps set up the test Supabase database

echo "🔧 Test Database Setup Script"
echo "=============================="
echo ""

# Check if .env.test.local exists
if [ ! -f .env.test.local ]; then
  echo "❌ .env.test.local not found!"
  echo "   Please create it first with your test database credentials"
  exit 1
fi

# Load environment variables
export $(cat .env.test.local | grep -v '^#' | xargs)

# Check if required variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ Missing required environment variables!"
  echo "   Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.test.local"
  exit 1
fi

echo "✅ Environment variables loaded"
echo "   Project: $(echo $NEXT_PUBLIC_SUPABASE_URL | grep -oP 'https://\K[^.]+')"
echo ""

# Prompt for admin credentials
read -p "Enter admin email (default: elzatonafoushware@gmail.com): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-elzatonafoushware@gmail.com}

read -sp "Enter admin password (default: ZatonaFoushware\$12): " ADMIN_PASSWORD
ADMIN_PASSWORD=${ADMIN_PASSWORD:-ZatonaFoushware$12}
echo ""

echo ""
echo "📋 Next Steps:"
echo "   1. Go to: https://supabase.com/dashboard/project/$(echo $NEXT_PUBLIC_SUPABASE_URL | grep -oP 'https://\K[^.]+')/sql/new"
echo "   2. Copy the contents of: Rest/scripts/test-database-schema.sql"
echo "   3. Paste into SQL Editor and click 'Run'"
echo "   4. After schema is created, run:"
echo "      ADMIN_EMAIL=$ADMIN_EMAIL ADMIN_PASSWORD='$ADMIN_PASSWORD' node Rest/scripts/create-test-admin.js"
echo ""
