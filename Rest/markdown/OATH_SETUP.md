# OAuth Setup Guide

This guide explains how to set up Google and GitHub OAuth authentication for the application.

## Prerequisites

1. **Supabase Project**: You need a Supabase project with OAuth providers configured
2. **Environment Variables**: Set up your `.env.local` file with the required keys

## Step 1: Get Supabase Credentials

### Get Project URL and Anon Key

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: Long JWT token starting with `eyJ...`

## Step 2: Configure OAuth Providers in Supabase

### Google OAuth Setup

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Find **Google** in the provider list
3. Click **Enable**
4. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
   - Set application type to **Web application**
   - Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret**
   - Enter them in Supabase Google provider settings

### GitHub OAuth Setup

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Find **GitHub** in the provider list
3. Click **Enable**
4. Configure GitHub OAuth:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click **New OAuth App**
   - Set **Application name**: Your app name
   - Set **Homepage URL**: Your app URL
   - Set **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy **Client ID** and generate **Client Secret**
   - Enter them in Supabase GitHub provider settings

## Step 3: Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Service Role Key

1. Go to your Supabase dashboard
2. Navigate to **Settings** → **API**
3. Copy the **service_role key** (keep this secret!)
4. Add it to your `.env.local` file

## Step 4: Test the Implementation

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth`

3. Test Google login:
   - Click "Continue with Google"
   - You should be redirected to Google login
   - After successful authentication, you'll be redirected back

4. Test GitHub login:
   - Click "Continue with GitHub"
   - You should be redirected to GitHub login
   - After successful authentication, you'll be redirected back

## Troubleshooting

### Error: "Authentication service not available"

This error appears when:

- Environment variables are not set correctly
- `.env.local` file doesn't exist
- Supabase anonymous key is missing or invalid

**Solution**:

1. Check that `.env.local` exists in the project root
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Restart your development server

### Error: "OAuth provider not configured"

This error means the OAuth provider hasn't been set up in Supabase.

**Solution**:

1. Go to Supabase dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable the provider (Google/GitHub)
4. Configure with Client ID and Client Secret

### Callback URL Issues

Make sure the callback URL in your OAuth app settings matches:

```
https://your-project-id.supabase.co/auth/v1/callback
```

## Security Notes

- **Never commit** `.env.local` to git
- The **service role key** has full database access - keep it secret
- The **anon key** is public but still protects your data with RLS policies
- Always test OAuth flows in production-like environments

## Production Setup

For production, you'll need to:

1. Update OAuth redirect URIs to include your production domain
2. Set up environment variables in your hosting platform:
   - Vercel: Add in **Settings** → **Environment Variables**
   - Netlify: Add in **Site settings** → **Build & deploy** → **Environment**
3. Update `NEXT_PUBLIC_APP_URL` to your production URL

## Current Implementation

The app now includes:

- ✅ Google OAuth authentication
- ✅ GitHub OAuth authentication
- ✅ Client-side Supabase integration
- ✅ Progress sync after login
- ✅ Automatic session management
- ✅ Error handling with descriptive messages

## Files Modified

- `apps/website/src/app/auth/page.tsx` - Main auth page with OAuth buttons
- `apps/website/src/app/auth/callback/page.tsx` - OAuth callback handler
- `apps/website/src/app/guided-practice/page.tsx` - Progress sync integration
