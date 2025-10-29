# Complete OAuth Setup Guide

This guide will help you set up Google and GitHub OAuth authentication for your Supabase project using the Management API.

## Prerequisites

1. **Supabase Access Token**: Get from https://supabase.com/dashboard/account/tokens
2. **Google OAuth Credentials**: From Google Cloud Console
3. **GitHub OAuth Credentials**: From GitHub Developer Settings

## Step 1: Get Supabase Access Token

1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Give it a name (e.g., "OAuth Setup")
4. Copy the token

## Step 2: Set Up Google OAuth

### 2.1 Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Enter project name: "Elzatona OAuth"
4. Click "Create"

### 2.2 Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 2.3 Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set **Authorized redirect URIs** to:
   ```
   https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback
   ```
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 3: Set Up GitHub OAuth

### 3.1 Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: "Elzatona Web"
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**:
     ```
     https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback
     ```
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Access Token (for Management API)
SUPABASE_ACCESS_TOKEN=your_access_token_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

## Step 5: Run the Setup Script

```bash
# Make the script executable
chmod +x setup-oauth-providers.js

# Run the setup script
node setup-oauth-providers.js
```

## Step 6: Test OAuth Login

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/auth
3. Click "Sign in with Google" or "Sign in with GitHub"
4. Complete the OAuth flow
5. You should be redirected back to your app

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Make sure the callback URL in your OAuth app matches exactly:
   - `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback`

2. **"Client ID not found"**
   - Double-check your environment variables
   - Make sure you copied the correct Client ID

3. **"Access token invalid"**
   - Regenerate your Supabase access token
   - Make sure it has the correct permissions

### Verification Steps

1. **Check Supabase Dashboard**:
   - Go to https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq
   - Navigate to Authentication → Providers
   - Verify Google and GitHub are enabled

2. **Check Console Logs**:
   - Open browser dev tools
   - Look for any error messages during OAuth flow

3. **Test Both Providers**:
   - Try logging in with Google
   - Try logging in with GitHub
   - Both should work independently

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your OAuth secrets secure
- Use different OAuth apps for development and production
- Regularly rotate your access tokens

## Next Steps

After OAuth is working:

1. **Test Progress Sync**: Login and verify that localStorage progress syncs to the database
2. **Test User Experience**: Ensure smooth login/logout flow
3. **Add Error Handling**: Handle OAuth failures gracefully
4. **Production Setup**: Create production OAuth apps with production URLs

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure OAuth apps are configured with the correct callback URLs
4. Check Supabase project logs for authentication errors
