#!/bin/bash

# Setup git-secrets to prevent future secret commits

echo "🔒 Setting up git-secrets for secret prevention..."
echo "=============================================="
echo ""

# Check if git-secrets is installed
if ! command -v git-secrets &> /dev/null; then
    echo "❌ git-secrets is not installed"
    echo ""
    echo "📦 Installation:"
    echo "   macOS: brew install git-secrets"
    echo "   Linux: See https://github.com/awslabs/git-secrets"
    echo "   Or: pip install git-secrets"
    echo ""
    exit 1
fi

echo "✅ git-secrets is installed"
echo ""

# Install git-secrets hooks
echo "📝 Installing git-secrets hooks..."
git secrets --install
echo "✅ Hooks installed"
echo ""

# Add patterns for common secrets
echo "🔍 Adding secret patterns..."
git secrets --add 'AIzaSy[A-Za-z0-9_-]{35}'
git secrets --add 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
git secrets --add 'BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ'
git secrets --add 'hpnewqkvpnthpohvxcmq'
git secrets --add 'fir-demo-project-adffb'
git secrets --add 'elzatona-super-secret-jwt-key-2024-production-ready'
git secrets --add 'elzatona-nextauth-secret-2024-production-ready'
echo "✅ Patterns added"
echo ""

# Add AWS patterns (if needed)
git secrets --register-aws 2>/dev/null || echo "⚠️  AWS patterns not registered (optional)"

echo ""
echo "=============================================="
echo "✅ git-secrets setup complete!"
echo ""
echo "📋 What this does:"
echo "   - Prevents committing secrets to git"
echo "   - Scans files before commit"
echo "   - Blocks commits containing secret patterns"
echo ""
echo "🧪 Test it:"
echo "   Try to commit a file with 'AIzaSy...' - it will be blocked"
echo ""

