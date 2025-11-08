# 🚀 Quick Setup Guide - Get Missing Environment Variables

## 📋 **What You Need to Get:**

Based on your current setup, you need these 7 missing environment variables:

1. `SUPABASE_SERVICE_ROLE_KEY`
2. `NEXTAUTH_SECRET`
3. `NEXTAUTH_URL`
4. `GOOGLE_CLIENT_ID`
5. `GOOGLE_CLIENT_SECRET`
6. `GITHUB_CLIENT_ID`
7. `GITHUB_CLIENT_SECRET`

---

## 🔑 **Step 1: Get Supabase Service Role Key**

### **Direct Link:** https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq

### **Steps:**

1. Click the link above
2. Click **"Settings"** in the left sidebar
3. Click **"API"** in the settings menu
4. Scroll down to **"Project API keys"**
5. Copy the **"service_role"** key (not the anon key)
6. Add to `.env.local`: `SUPABASE_SERVICE_ROLE_KEY=your-actual-key-here`

---

## 🔧 **Step 2: Get Google OAuth Credentials**

### **Direct Link:** https://console.cloud.google.com/

### **Steps:**

1. Click the link above
2. Create a new project or select existing one
3. Go to **"APIs & Services"** → **"Credentials"**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
5. Configure OAuth consent screen if prompted
6. Set application type to **"Web application"**
7. Add authorized redirect URI: `http://localhost:3001/api/auth/callback/google`
8. Copy **Client ID** and **Client Secret**
9. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-actual-client-id
   GOOGLE_CLIENT_SECRET=your-actual-client-secret
   ```

---

## 🐙 **Step 3: Get GitHub OAuth Credentials**

### **Direct Link:** https://github.com/settings/developers

### **Steps:**

1. Click the link above
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: "Elzatona Web"
   - **Homepage URL**: `http://localhost:3001`
   - **Authorization callback URL**: `http://localhost:3001/api/auth/callback/github`
4. Click **"Register application"**
5. Copy **Client ID** (visible immediately)
6. Click **"Generate a new client secret"** and copy it
7. Add to `.env.local`:
   ```
   GITHUB_CLIENT_ID=your-actual-client-id
   GITHUB_CLIENT_SECRET=your-actual-client-secret
   ```

---

## ⚙️ **Step 4: Add Missing NextAuth Variables**

Add these to your `.env.local` file:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001
```

---

## 📝 **Step 5: Complete .env.local File**

Your complete `.env.local` should look like this:

```bash
# Supabase Configuration
# Supabase Configuration (Get from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-actual-github-client-id
GITHUB_CLIENT_SECRET=your-actual-github-client-secret

# Admin Configuration (already in your file)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=your-secure-admin-password
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# Firebase Configuration (already in your file)
# Firebase Configuration (Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-demo-project-adffb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-demo-project-adffb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-demo-project-adffb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76366138630
NEXT_PUBLIC_FIREBASE_APP_ID=1:76366138630:web:0f3381c2f5a62e0401e287
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XZ5VKFGG4Y

# Security Configuration (already in your file)
BCRYPT_SALT_ROUNDS=12
ADMIN_SESSION_TIMEOUT=86400000
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
ADMIN_COLLECTION_NAME=admins
ALLOW_ADMIN_CREATION=true
REQUIRE_EMAIL_VERIFICATION=false
ENABLE_AUDIT_LOGGING=true
```

---

## 🧪 **Step 6: Test Everything**

After updating `.env.local`:

1. **Restart your server:**

   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test admin login:**
   - Go to: http://localhost:3001/admin/login
   - Try: `admin@example.com` / `your-secure-admin-password`

3. **Test social login:**
   - Go to: http://localhost:3001/auth
   - Try Google and GitHub login

4. **Run test script:**
   ```bash
   node test-auth-systems.js
   ```

---

## 🎯 **Quick Links:**

- **Supabase Dashboard**: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq
- **Google Cloud Console**: https://console.cloud.google.com/
- **GitHub Developer Settings**: https://github.com/settings/developers
- **Admin Login**: http://localhost:3001/admin/login
- **User Auth**: http://localhost:3001/auth

---

## ⚡ **Expected Results:**

After completing these steps:

- ✅ Admin login will work
- ✅ Google OAuth will work
- ✅ GitHub OAuth will work
- ✅ NextAuth warnings will disappear
- ✅ All authentication systems will be fully functional

**Total time needed: ~15-20 minutes** 🚀
