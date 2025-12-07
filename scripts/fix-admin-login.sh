#!/bin/bash
# Fix Admin Login - Switch to Production Database

echo "🔧 Fixing Admin Login Configuration"
echo ""
echo "This script will help you switch to the correct database."
echo ""

# Check current configuration
CURRENT_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local 2>/dev/null | cut -d'=' -f2 | tr -d '"' | tr -d "'")

if [[ "$CURRENT_URL" == *"kiycimlsatwfqxtfprlr"* ]]; then
  echo "📋 Current: TEST database"
  echo "   URL: $CURRENT_URL"
  echo ""
  echo "⚠️  You're using production credentials but connecting to TEST database"
  echo ""
  read -p "Do you want to switch to PRODUCTION database? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 To switch to production, update .env.local with:"
    echo "   NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co"
    echo "   SUPABASE_SERVICE_ROLE_KEY=<your-production-service-role-key>"
    echo ""
    echo "Then run: node scripts/setup-admin-user.js"
    echo ""
  else
    echo ""
    echo "📝 To use TEST database, update package.json dev script:"
    echo "   Change: APP_ENV=production"
    echo "   To:     APP_ENV=test"
    echo ""
    echo "Then run: node scripts/setup-admin-user.js"
    echo ""
  fi
elif [[ "$CURRENT_URL" == *"hpnewqkvpnthpohvxcmq"* ]]; then
  echo "📋 Current: PRODUCTION database"
  echo "   URL: $CURRENT_URL"
  echo ""
  echo "✅ Configuration looks correct for production"
  echo ""
  echo "🔍 Next: Check if admin user exists and password is correct"
  echo "   Run: node scripts/check-admin-user.js"
  echo ""
else
  echo "⚠️  Could not determine database from .env.local"
  echo "   Please check your NEXT_PUBLIC_SUPABASE_URL"
fi

