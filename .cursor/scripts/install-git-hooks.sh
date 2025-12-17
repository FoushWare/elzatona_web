#!/bin/bash

# Install Git Hooks
# This script installs pre-commit hooks to prevent secret commits

set -e

echo "🔧 Installing Git Hooks"
echo "======================"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Install pre-commit hook
if [ -f ".cursor/scripts/pre-commit-secrets-check.sh" ]; then
    cp .cursor/scripts/pre-commit-secrets-check.sh .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "✅ Installed pre-commit hook"
else
    echo "⚠️  Pre-commit script not found"
fi

# Also set up git-secrets if available
if command -v git-secrets &> /dev/null; then
    echo ""
    echo "Setting up git-secrets..."
    
    # Register common patterns
    git-secrets --register-aws || true
    git-secrets --add 'AIzaSy[A-Za-z0-9_-]{35}' || true  # Firebase
    git-secrets --add 'YOUR_SUPABASE_KEY_HERE' || true  # JWT
    git-secrets --add 'sk_live_[A-Za-z0-9]{32,}' || true  # Stripe
    git-secrets --add 'sk_test_[A-Za-z0-9]{32,}' || true  # Stripe test
    
    echo "✅ git-secrets configured"
else
    echo "ℹ️  git-secrets not installed (optional)"
    echo "   Install: brew install git-secrets"
    echo "   Or run: bash .cursor/scripts/setup-git-secrets.sh"
fi

echo ""
echo "✅ Git hooks installed successfully!"
echo ""
echo "The pre-commit hook will now check for secrets before each commit."
echo "To bypass (not recommended): git commit --no-verify"

