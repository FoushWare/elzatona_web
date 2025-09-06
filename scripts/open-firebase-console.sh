#!/bin/bash

echo "🔧 Opening Firebase Console to add authorized domain..."
echo ""
echo "📋 Follow these steps:"
echo "1. Select project: fir-demo-project-adffb"
echo "2. Go to: Authentication → Settings"
echo "3. Find: 'Authorized domains' section"
echo "4. Click: 'Add domain'"
echo "5. Enter: great-frontend-hub.vercel.app"
echo "6. Click: 'Add'"
echo ""
echo "🌐 Opening Firebase Console..."

# Open Firebase Console in default browser
if command -v open >/dev/null 2>&1; then
    # macOS
    open "https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/settings"
elif command -v xdg-open >/dev/null 2>&1; then
    # Linux
    xdg-open "https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/settings"
elif command -v start >/dev/null 2>&1; then
    # Windows
    start "https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/settings"
else
    echo "❌ Could not open browser automatically."
    echo "Please manually open: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/settings"
fi

echo ""
echo "✅ After adding the domain, test authentication at:"
echo "🔗 https://great-frontend-hub.vercel.app/auth"
