#!/bin/bash

# Script to switch between different pre-commit hook configurations

echo "🔧 Pre-commit Hook Configuration Switcher"
echo "=========================================="
echo ""

# Check if .husky directory exists
if [ ! -d ".husky" ]; then
    echo "❌ Error: .husky directory not found. Please run 'npm run prepare' first."
    exit 1
fi

# Display current configuration
echo "📋 Available configurations:"
echo "1. fast     - Linting + Build only (fastest)"
echo "2. standard - Linting + Unit/Integration tests + Build (recommended)"
echo "3. full     - Linting + All tests (including E2E) + Build (comprehensive)"
echo ""

# Get user choice
read -p "Select configuration (1-3): " choice

case $choice in
    1)
        echo "🚀 Switching to FAST configuration..."
        cp .husky/pre-commit-fast .husky/pre-commit
        echo "✅ Switched to FAST pre-commit checks"
        echo "   - Linting only"
        echo "   - Build check"
        echo "   - No tests (fastest)"
        ;;
    2)
        echo "🚀 Switching to STANDARD configuration..."
        cp .husky/pre-commit .husky/pre-commit
        echo "✅ Switched to STANDARD pre-commit checks"
        echo "   - Linting"
        echo "   - Unit & Integration tests"
        echo "   - Build check"
        ;;
    3)
        echo "🚀 Switching to FULL configuration..."
        cp .husky/pre-commit-full .husky/pre-commit
        echo "✅ Switched to FULL pre-commit checks"
        echo "   - Linting"
        echo "   - Unit & Integration tests"
        echo "   - E2E tests"
        echo "   - Build check"
        ;;
    *)
        echo "❌ Invalid choice. Please select 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🎯 Next commit will use the selected configuration."
echo "💡 You can run this script again anytime to switch configurations."
