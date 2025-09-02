#!/bin/bash

echo "🔍 Checking build before push..."

# Run the build
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Safe to push."
    exit 0
else
    echo "❌ Build failed! Fix issues before pushing."
    echo ""
    echo "Common fixes:"
    echo "1. Check for invalid CSS classes (border-3, etc.)"
    echo "2. Verify all imports are correct"
    echo "3. Check for undefined components"
    echo "4. Ensure all required props are provided"
    echo ""
    exit 1
fi
