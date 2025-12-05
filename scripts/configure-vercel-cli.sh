#!/bin/bash

# Script to configure Vercel using CLI
# Usage: ./scripts/configure-vercel-cli.sh

set -e

echo "🔧 Configuring Vercel via CLI"
echo "============================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found"
    echo "   Install it: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found: $(vercel --version)"
echo ""

# Check if project is linked
if [ ! -f .vercel/project.json ]; then
    echo "⚠️  Project not linked to Vercel"
    echo "   Running 'vercel link'..."
    echo ""
    vercel link
    echo ""
fi

echo "📋 Current Vercel Configuration:"
if [ -f .vercel/project.json ]; then
    cat .vercel/project.json | jq '.' 2>/dev/null || cat .vercel/project.json
fi

echo ""
echo "💡 To set production branch:"
echo "  1. Go to Vercel Dashboard: https://vercel.com/dashboard"
echo "  2. Select your project"
echo "  3. Settings → Git → Production Branch → Select 'main'"
echo ""
echo "   OR use the API script:"
echo "   ./scripts/configure-vercel-production-branch.sh"
