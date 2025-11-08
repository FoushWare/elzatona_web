#!/bin/bash

# Verify which keys are exposed and need rotation

echo "🔍 Verifying Exposed Keys"
echo "========================"
echo ""

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

EXPOSED_KEYS=()

# Check for Firebase API key
if grep -r "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next 2>/dev/null | grep -v ".cursor" | grep -v "SECURITY_AUDIT" > /dev/null; then
    EXPOSED_KEYS+=("Firebase API Key: AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y")
fi

# Check for Supabase anon key
if grep -r "YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next 2>/dev/null | grep -v ".cursor" | grep -v "SECURITY_AUDIT" > /dev/null; then
    EXPOSED_KEYS+=("Supabase Anon Key")
fi

# Check for service role key
if grep -r "process.env.SUPABASE_SERVICE_ROLE_KEY" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next 2>/dev/null | grep -v ".cursor" | grep -v "SECURITY_AUDIT" > /dev/null; then
    EXPOSED_KEYS+=("Supabase Service Role Key: process.env.SUPABASE_SERVICE_ROLE_KEY ⚠️ CRITICAL")
fi

# Check for project identifiers
if grep -r "hpnewqkvpnthpohvxcmq" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next 2>/dev/null | grep -v ".cursor" | grep -v "SECURITY_AUDIT" | grep -v "GIT_HISTORY" > /dev/null; then
    EXPOSED_KEYS+=("Supabase Project Ref: hpnewqkvpnthpohvxcmq")
fi

if grep -r "fir-demo-project-adffb" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next 2>/dev/null | grep -v ".cursor" | grep -v "SECURITY_AUDIT" | grep -v "GIT_HISTORY" > /dev/null; then
    EXPOSED_KEYS+=("Firebase Project ID: fir-demo-project-adffb")
fi

echo "📋 Current Files Check:"
echo ""

if [ ${#EXPOSED_KEYS[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ No exposed keys found in current files${NC}"
    echo "   (All hardcoded keys have been removed)"
else
    echo -e "${RED}⚠️  Exposed keys found in current files:${NC}"
    for key in "${EXPOSED_KEYS[@]}"; do
        echo "   - $key"
    done
fi

echo ""
echo "=============================================="
echo "🔍 Git History Check:"
echo ""
echo "Run these commands to check git history:"
echo ""
echo "  git log --all -p -S \"AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y\" --oneline"
echo "  git log --all -p -S \"process.env.SUPABASE_SERVICE_ROLE_KEY\" --oneline"
echo "  git log --all -p -S \"YOUR_SUPABASE_KEY_HERE\" --oneline"
echo ""
echo "Or use the Python scanner:"
echo "  python3 .cursor/scripts/git-secrets-check.py"
echo ""

