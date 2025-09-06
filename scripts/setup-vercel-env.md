# 🔧 Firebase Environment Variables Setup for Vercel

## Quick Setup Guide

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Find your project: `GreatFrontendHub`
3. Click on the project

### Step 2: Add Environment Variables
1. Go to **Settings** tab
2. Click **Environment Variables** in the left sidebar
3. Add each variable one by one:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `fir-demo-project-adffb.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `fir-demo-project-adffb` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `fir-demo-project-adffb.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `76366138630` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:76366138630:web:0f3381c2f5a62e0401e287` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-XZ5VKFGG4Y` |

### Step 3: Configure Environment Scope
For each variable:
- ✅ **Production** (checked)
- ✅ **Preview** (checked) 
- ✅ **Development** (checked)

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

### Step 5: Test
1. Visit: https://great-frontend-hub-foushwares-projects.vercel.app/auth
2. Try Google Sign-In or GitHub Sign-In
3. Check browser console for any Firebase errors

## Alternative: Vercel CLI Method

If you prefer using the command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Enter: AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# Enter: fir-demo-project-adffb.firebaseapp.com

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
# Enter: fir-demo-project-adffb

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
# Enter: fir-demo-project-adffb.firebasestorage.app

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
# Enter: 76366138630

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
# Enter: 1:76366138630:web:0f3381c2f5a62e0401e287

vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
# Enter: G-XZ5VKFGG4Y

# Redeploy
vercel --prod
```

## Verification

After setup, you should see:
- ✅ No "Firebase not configured" warnings in browser console
- ✅ Authentication buttons work properly
- ✅ Users can sign in with Google/GitHub
- ✅ Dashboard is accessible after authentication

## Troubleshooting

If you still see Firebase errors:
1. Check that all environment variables are set correctly
2. Ensure the deployment completed successfully
3. Clear browser cache and try again
4. Check the Vercel deployment logs for any errors
