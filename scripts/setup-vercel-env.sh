#!/bin/bash

echo "🔧 Setting up Firebase environment variables in Vercel..."

# Check if user is logged in to Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Logged in to Vercel as: $(vercel whoami)"

# Set environment variables
echo "📝 Adding environment variables..."

echo "Adding NEXT_PUBLIC_FIREBASE_API_KEY..."
echo "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y" | vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production

echo "Adding NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN..."
echo "fir-demo-project-adffb.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production

echo "Adding NEXT_PUBLIC_FIREBASE_PROJECT_ID..."
echo "fir-demo-project-adffb" | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production

echo "Adding NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET..."
echo "fir-demo-project-adffb.firebasestorage.app" | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production

echo "Adding NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID..."
echo "76366138630" | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production

echo "Adding NEXT_PUBLIC_FIREBASE_APP_ID..."
echo "1:76366138630:web:0f3381c2f5a62e0401e287" | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production

echo "Adding NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID..."
echo "G-XZ5VKFGG4Y" | vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production

echo "✅ All environment variables added successfully!"
echo "🚀 Now redeploying to production..."

# Redeploy to production
vercel --prod

echo "🎉 Setup complete! Your Firebase authentication should now work in production."
echo "🔗 Test it at: https://great-frontend-hub-foushwares-projects.vercel.app/auth"
