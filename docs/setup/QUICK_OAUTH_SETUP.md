# 🚀 Quick OAuth Setup Guide

## 🔵 **Google OAuth Setup (5 minutes)**

### **Step 1: Go to Google Cloud Console**

- **URL**: https://console.cloud.google.com/
- **Action**: Create new project or select existing

### **Step 2: Enable Google+ API**

- **URL**: https://console.cloud.google.com/apis/library/plus.googleapis.com
- **Action**: Click "Enable"

### **Step 3: Configure OAuth Consent Screen**

- **URL**: https://console.cloud.google.com/apis/credentials/consent
- **Action**:
  - Choose "External" user type
  - Fill in app name: `Elzatona Web`
  - Add your email as developer contact
  - Save and continue

### **Step 4: Create OAuth 2.0 Credentials**

- **URL**: https://console.cloud.google.com/apis/credentials
- **Action**:
  - Click "Create Credentials" → "OAuth 2.0 Client IDs"
  - Application type: "Web application"
  - Name: `Elzatona Web`
  - Authorized JavaScript origins: `http://localhost:3001`
  - Authorized redirect URIs: `http://localhost:3001/api/auth/callback/google`
  - Click "Create"

### **Step 5: Copy Credentials**

- Copy the **Client ID** and **Client Secret**
- Add to `.env.local`:
  ```
  GOOGLE_CLIENT_ID=your-client-id-here
  GOOGLE_CLIENT_SECRET=your-client-secret-here
  ```

---

## 🟣 **GitHub OAuth Setup (3 minutes)**

### **Step 1: Go to GitHub Developer Settings**

- **URL**: https://github.com/settings/developers
- **Action**: Click "New OAuth App"

### **Step 2: Fill OAuth App Details**

- **Application name**: `Elzatona Web`
- **Homepage URL**: `http://localhost:3001`
- **Authorization callback URL**: `http://localhost:3001/api/auth/callback/github`
- **Click**: "Register application"

### **Step 3: Copy Credentials**

- Copy the **Client ID** and **Client Secret**
- Add to `.env.local`:
  ```
  GITHUB_CLIENT_ID=your-client-id-here
  GITHUB_CLIENT_SECRET=your-client-secret-here
  ```

---

## 🧪 **Test Your Setup**

After adding both OAuth credentials to `.env.local`:

```bash
# Test admin login
curl -X POST http://localhost:3001/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'

# Test OAuth providers
curl http://localhost:3001/api/auth/providers
```

---

## 🎯 **Access Points**

- **Admin Login**: http://localhost:3001/admin/login
- **User Auth**: http://localhost:3001/auth
- **Google OAuth**: http://localhost:3001/api/auth/signin/google
- **GitHub OAuth**: http://localhost:3001/api/auth/signin/github

---

## ✅ **Complete .env.local Template**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED
SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

# OAuth Providers (ADD THESE)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# Admin Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=admin123
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-demo-project-adffb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-demo-project-adffb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-demo-project-adffb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76366138630
NEXT_PUBLIC_FIREBASE_APP_ID=1:76366138630:web:0f3381c2f5a62e0401e287
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XZ5VKFGG4Y
```

---

## 🎉 **You're Almost Done!**

1. **Complete Google OAuth setup** (5 minutes)
2. **Complete GitHub OAuth setup** (3 minutes)
3. **Add credentials to `.env.local`**
4. **Test the system**

**Total time: ~8 minutes** 🚀
