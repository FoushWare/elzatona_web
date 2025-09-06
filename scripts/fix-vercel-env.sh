#!/bin/bash

echo "🔧 Fixing Firebase environment variables in Vercel (removing newlines)..."

# Check if user is logged in to Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Logged in to Vercel as: $(vercel whoami)"

# Remove existing environment variables
echo "🗑️  Removing existing Firebase environment variables..."
vercel env rm NEXT_PUBLIC_FIREBASE_API_KEY production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_PROJECT_ID production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_APP_ID production --yes
vercel env rm NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production --yes

echo "📝 Adding clean Firebase environment variables (no newlines)..."

# Add environment variables without newlines using printf
printf "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y" | vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
printf "fir-demo-project-adffb.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
printf "fir-demo-project-adffb" | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
printf "fir-demo-project-adffb.firebasestorage.app" | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
printf "76366138630" | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
printf "1:76366138630:web:0f3381c2f5a62e0401e287" | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
printf "G-XZ5VKFGG4Y" | vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production

echo "✅ Environment variables updated successfully!"
echo "🚀 Redeploying application..."

# Redeploy to apply the changes
vercel --prod

echo "🎉 Firebase authentication should now work properly!"
echo "🔗 Test at: https://great-frontend-hub.vercel.app/auth"
