#!/bin/bash

# Git Hooks Setup Script
# This script ensures all git hooks are properly configured and executable

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔧 SETTING UP GIT HOOKS..."
echo "════════════════════════════════════════════════════════════════"
echo ""

# Make all hook files executable
echo "📝 Making git hooks executable..."
chmod +x .husky/post-commit
chmod +x .husky/pre-push
chmod +x .husky/pre-commit
chmod +x .husky/pre-commit-fast
chmod +x .husky/pre-commit-full
chmod +x scripts/cleanup-build.sh

echo "   ✅ All hook files are now executable"

# Ensure Husky is properly installed
echo ""
echo "🔧 Ensuring Husky is properly configured..."
if npm list husky > /dev/null 2>&1; then
    echo "   ✅ Husky is installed"
else
    echo "   📦 Installing Husky..."
    npm install husky --save-dev
fi

# Run Husky prepare
echo ""
echo "🚀 Running Husky prepare..."
npm run prepare

echo ""
echo "📊 GIT HOOKS SETUP SUMMARY:"
echo "   ✅ All hook files are executable"
echo "   ✅ Husky is configured"
echo "   ✅ Git hooks are ready to use"
echo ""
echo "💡 Available hooks:"
echo "   - pre-commit: Runs linting before commit"
echo "   - pre-push: Cleans build files and validates before push"
echo "   - post-commit: Cleans build files and restarts dev server after commit"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ GIT HOOKS SETUP COMPLETED SUCCESSFULLY!"
echo "════════════════════════════════════════════════════════════════"
echo ""
