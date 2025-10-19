# 🔐 Complete Authentication Configuration Guide

## Current Status ✅

**Both admin login and social media login systems are FULLY IMPLEMENTED!**

You have:

- ✅ Complete admin authentication system
- ✅ Social media login (Google, GitHub)
- ✅ Firebase Auth integration
- ✅ NextAuth.js configuration
- ✅ Admin dashboard and protected routes

## 🚀 Step-by-Step Configuration

### Step 1: Update Environment Variables

Your `.env.local` file exists but needs some updates. Add these missing variables:

```bash
# Add these to your existing .env.local file:

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Supabase Service Role Key (Get from Supabase Dashboard)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 2: Set Up OAuth Applications

#### Google OAuth Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

#### GitHub OAuth Setup:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: "Elzatona Web"
   - Homepage URL: `http://localhost:3001`
   - Authorization callback URL: `http://localhost:3001/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

### Step 3: Get Supabase Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq)
2. Go to Settings → API
3. Copy the "service_role" key (not the anon key)
4. Add it to `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### Step 4: Test Admin Login

You have several admin accounts in Firebase. Try these credentials:

**Option 1:**

- Email: `admin@example.com`
- Password: `your-secure-admin-password`

**Option 2:**

- Email: `afouadsoftwareengineer@gmail.com`
- Password: (use the password you set when creating this account)

**Option 3: Create a new admin account:**

```bash
# Run this command to create a new admin
curl -X POST http://localhost:3001/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elzatona.com",
    "password": "ElzatonaAdmin2024!"
  }'
```

### Step 5: Test Social Login

1. Go to `http://localhost:3001/auth`
2. Click "Sign in with Google" or "Sign in with GitHub"
3. Complete OAuth flow

## 🎯 Access Points

### Admin Login:

- **URL**: `http://localhost:3001/admin/login`
- **Features**: Admin dashboard, user management, learning cards management

### User Social Login:

- **URL**: `http://localhost:3001/auth`
- **Providers**: Google, GitHub, Email/Password

### Social Login Popup:

- Available on any page via sign-in button

## 🧪 Testing Commands

### Test Admin Login:

```bash
curl -X POST http://localhost:3001/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-secure-admin-password"}'
```

### Test User Auth:

```bash
curl -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123", "name": "Test User"}'
```

### Test NextAuth Providers:

```bash
curl http://localhost:3001/api/auth/providers
```

## 🔧 Troubleshooting

### Admin Login Issues:

1. Check if admin account exists in Firebase
2. Verify password hash is correct
3. Ensure admin account is active (`isActive: true`)

### Social Login Issues:

1. Verify OAuth credentials are correct
2. Check redirect URIs match exactly
3. Ensure Firebase Auth providers are enabled

### Environment Variables:

1. Restart your development server after updating `.env.local`
2. Check that all required variables are set
3. Verify no typos in variable names

## 📋 Current Admin Accounts in Firebase

Based on the Firebase data, you have these admin accounts:

1. **admin@example.com** (super_admin) - Has password hash
2. **afouadsoftwareengineer@gmail.com** (super_admin) - Has password hash
3. **admin@elzatona.com** (admin) - Missing password hash
4. **admin1759589260859@elzatona.com** (admin) - Has password hash
5. **admin1759589499088@elzatona.com** (admin) - Has password hash

## 🎉 Ready to Use!

Once you complete the OAuth setup and get the service role key, both systems will be fully functional:

- ✅ Admin login with JWT authentication
- ✅ Social media login with Google and GitHub
- ✅ User profile management
- ✅ Session management
- ✅ Protected routes

**Everything is already built and working - you just need to configure the OAuth providers!**
