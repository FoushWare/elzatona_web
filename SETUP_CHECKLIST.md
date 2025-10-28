# Setup Checklist for OAuth Authentication

Follow these steps to enable Google and GitHub OAuth login in your application.

## 📋 Pre-requisites

- [ ] You have a Supabase account
- [ ] You have a Supabase project created
- [ ] You have `@supabase/supabase-js` installed (already installed)

## 🔧 Step 1: Create .env.local File

Create a `.env.local` file in the project root with the following content:

```env
# Supabase Configuration - Get these from your Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**To get SUPABASE_SERVICE_ROLE_KEY:**

1. Go to https://supabase.com/dashboard
2. Select your project (hpnewqkvpnthpohvxcmq)
3. Go to Settings → API
4. Copy the **service_role key**
5. Paste it in `.env.local`

## 🔐 Step 2: Configure Google OAuth

### In Google Cloud Console:

- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create a new project or select existing one
- [ ] Enable Google+ API
- [ ] Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
- [ ] Set application type to **Web application**
- [ ] Add authorized redirect URI: `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback`
- [ ] Copy the **Client ID** and **Client Secret**

### In Supabase:

- [ ] Go to your Supabase project dashboard
- [ ] Navigate to **Authentication** → **Providers**
- [ ] Find **Google** in the list
- [ ] Click **Enable**
- [ ] Enter your **Client ID** from Google Cloud Console
- [ ] Enter your **Client Secret** from Google Cloud Console
- [ ] Click **Save**

## 🐙 Step 3: Configure GitHub OAuth

### In GitHub:

- [ ] Go to [GitHub Developer Settings](https://github.com/settings/developers)
- [ ] Click **New OAuth App**
- [ ] Fill in:
  - **Application name**: Your app name
  - **Homepage URL**: Your app URL (e.g., http://localhost:3000)
  - **Authorization callback URL**: `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback`
- [ ] Click **Register application**
- [ ] Copy the **Client ID**
- [ ] Click **Generate a new client secret**
- [ ] Copy the **Client Secret**

### In Supabase:

- [ ] Go to your Supabase project dashboard
- [ ] Navigate to **Authentication** → **Providers**
- [ ] Find **GitHub** in the list
- [ ] Click **Enable**
- [ ] Enter your **Client ID** from GitHub
- [ ] Enter your **Client Secret** from GitHub
- [ ] Click **Save**

## 🚀 Step 4: Start Your Development Server

```bash
npm run dev
```

## ✅ Step 5: Test the Implementation

- [ ] Navigate to `http://localhost:3000/auth`
- [ ] Click "Continue with Google"
  - [ ] Verify redirect to Google login
  - [ ] Complete login
  - [ ] Verify redirect back to app
- [ ] Click "Continue with GitHub"
  - [ ] Verify redirect to GitHub login
  - [ ] Complete login
  - [ ] Verify redirect back to app

## 🔍 Troubleshooting

### Error: "Authentication service not available"

**Solution:**

1. Check that `.env.local` exists in the project root
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Restart your development server

### Error: OAuth provider not configured

**Solution:**

1. Go to Supabase dashboard
2. Navigate to **Authentication** → **Providers**
3. Verify the provider (Google/GitHub) is enabled
4. Verify the Client ID and Client Secret are correct

### OAuth redirect errors

**Solution:**

1. Ensure callback URL in OAuth app settings matches:
   ```
   https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback
   ```
2. Verify the URL in Supabase matches your OAuth app settings

## 📊 What's Already Implemented

✅ Supabase client initialization with anonymous key
✅ Google OAuth button and handler
✅ GitHub OAuth button and handler
✅ OAuth callback page for handling redirects
✅ Session management
✅ Progress sync after login
✅ Auto-sync from localStorage to database
✅ Error handling with descriptive messages

## 📝 Files Modified

- `apps/website/src/app/auth/page.tsx` - Auth page with OAuth buttons
- `apps/website/src/app/auth/callback/page.tsx` - OAuth callback handler
- `apps/website/src/app/guided-practice/page.tsx` - Progress sync integration
- `apps/website/src/app/api/progress/guided-learning/sync/route.ts` - Sync API
- `apps/website/src/app/api/progress/guided-learning/load/route.ts` - Load API

## 🎉 Next Steps After Setup

Once OAuth is configured:

1. Users can sign in with Google or GitHub
2. LocalStorage progress will automatically sync to database
3. Progress is preserved across sessions
4. Users can reset their progress from the plan details page

For detailed information, see [OATH_SETUP.md](./OATH_SETUP.md).
