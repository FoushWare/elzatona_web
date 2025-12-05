# OAuth Setup Quick Reference

## ✅ What's Already Done

All the code is implemented and ready to use:

1. ✅ **Supabase Client Setup** - Using anonymous key for client-side authentication
2. ✅ **Google OAuth Button** - Implemented in auth page
3. ✅ **GitHub OAuth Button** - Implemented in auth page
4. ✅ **Callback Handler** - Handles OAuth redirects
5. ✅ **Progress Sync** - Automatically syncs localStorage to database after login
6. ✅ **Environment Variables** - Already configured in `.env.local`
7. ✅ **Package Installed** - `@supabase/supabase-js@2.76.1`

## 🚀 What You Need to Do

### Step 1: Configure OAuth Providers in Supabase

Go to your Supabase dashboard: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq

#### For Google OAuth:

1. Navigate to **Authentication** → **Providers**
2. Find **Google** in the provider list
3. Click **Enable**
4. Enter your Google Client ID and Client Secret (from Google Cloud Console)
5. Click **Save**

#### For GitHub OAuth:

1. Navigate to **Authentication** → **Providers**
2. Find **GitHub** in the provider list
3. Click **Enable**
4. Enter your GitHub Client ID and Client Secret (from GitHub Developer Settings)
5. Click **Save**

### Step 2: Test

Once OAuth providers are configured:

1. Navigate to `http://localhost:3000/auth`
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete the OAuth flow
4. You should be redirected back to the app

## 🔧 Environment Variables

Your `.env.local` file already has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_KEY_HERE
```

## 📚 Documentation

For detailed setup instructions:

- **OATH_SETUP.md** - Complete OAuth setup guide
- **SETUP_CHECKLIST.md** - Step-by-step checklist

## 🐛 Common Issues

### "Authentication service not available"

- Restart your development server
- Check that environment variables are loaded

### OAuth redirect errors

- Make sure callback URL in OAuth app settings matches: `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback`
- Verify provider is enabled in Supabase dashboard

## 🎉 What Happens After Login

1. User clicks Google/GitHub button
2. Redirected to OAuth provider
3. User authenticates
4. Redirected back to `/auth/callback`
5. Session is established
6. LocalStorage progress is synced to database
7. User is redirected to home page

## 📊 Progress Sync

The app automatically:

- Stores progress in localStorage when user is not logged in
- Syncs progress to database when user logs in
- Loads progress from database on mount
- Merges localStorage and database progress (uses most recent)

## 🔐 Security

- Uses Supabase's built-in authentication
- Anonymous key is safe for client-side use
- Service role key is only used server-side (never exposed to client)
- All progress data is stored securely in Supabase database
