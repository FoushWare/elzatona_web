# 🔐 Admin Login & Social Media Login Setup Guide

## Current Status

### ✅ **Admin Login System - FULLY IMPLEMENTED**

- Complete admin authentication with JWT tokens
- Admin dashboard and protected routes
- Admin user management system
- Session management and security features

### ✅ **Social Media Login System - FULLY IMPLEMENTED**

- Google OAuth integration
- GitHub OAuth integration
- Firebase Auth with social providers
- NextAuth.js configuration
- Social login UI components

## 🚀 Setup Instructions

### 1. **Create Environment Configuration**

Create a `.env.local` file in your project root with these variables:

```bash
# Admin Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@elzatona.com
INITIAL_ADMIN_PASSWORD=ElzatonaAdmin2024!
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Firebase Configuration (Your existing Firebase project)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-demo-project-adffb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-demo-project-adffb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-demo-project-adffb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76366138630
NEXT_PUBLIC_FIREBASE_APP_ID=1:76366138630:web:0f3381c2f5a62e0401e287
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XZ5VKFGG4Y

# Supabase Configuration (Your existing Supabase project)
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Security Configuration
BCRYPT_SALT_ROUNDS=12
ADMIN_SESSION_TIMEOUT=86400000
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000

# Database Configuration
ADMIN_COLLECTION_NAME=admins

# Feature Flags
ALLOW_ADMIN_CREATION=true
REQUIRE_EMAIL_VERIFICATION=false
ENABLE_AUDIT_LOGGING=true
```

### 2. **Google OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

### 3. **GitHub OAuth Setup**

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: "Elzatona Web"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

### 4. **Firebase Auth Setup**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fir-demo-project-adffb`
3. Go to "Authentication" → "Sign-in method"
4. Enable these providers:
   - Email/Password
   - Google
   - GitHub
5. Configure OAuth redirect URIs for each provider

### 5. **Initialize Admin Account**

Run this command to create the initial admin account:

```bash
npm run init-admin
```

Or manually call the admin initialization API:

```bash
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elzatona.com",
    "password": "ElzatonaAdmin2024!",
    "name": "Super Admin",
    "role": "super_admin"
  }'
```

## 🎯 **Access Points**

### **Admin Login**

- **URL**: `http://localhost:3000/admin/login`
- **Credentials**: Use the admin email/password from your `.env.local`
- **Features**:
  - Admin dashboard
  - User management
  - Learning cards management
  - System settings

### **User Social Login**

- **URL**: `http://localhost:3000/auth`
- **Providers**: Google, GitHub, Email/Password
- **Features**:
  - Social authentication
  - User profile management
  - Learning progress tracking

### **Social Login Popup**

- Available on any page via the sign-in button
- Supports Google and GitHub OAuth
- Integrates with Firebase Auth

## 🔧 **Testing**

### **Test Admin Login**

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/admin/login`
3. Use your admin credentials
4. Verify access to admin dashboard

### **Test Social Login**

1. Go to `http://localhost:3000/auth`
2. Click "Sign in with Google" or "Sign in with GitHub"
3. Complete OAuth flow
4. Verify user is logged in

## 📋 **Current Features**

### **Admin System**

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Session management
- ✅ Role-based access control
- ✅ Admin dashboard
- ✅ User management
- ✅ Learning cards management
- ✅ Security features (timeout, lockout)

### **Social Login System**

- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Email/Password authentication
- ✅ Firebase Auth integration
- ✅ NextAuth.js support
- ✅ Social login UI components
- ✅ User profile management
- ✅ Session persistence

## 🚨 **Important Notes**

1. **Environment Variables**: Make sure to set strong, unique secrets for production
2. **OAuth Redirects**: Update redirect URIs for production domains
3. **Firebase Rules**: Configure Firestore security rules for admin and user data
4. **Supabase RLS**: Ensure Row Level Security policies are properly configured
5. **HTTPS**: Use HTTPS in production for OAuth callbacks

## 🎉 **Ready to Use!**

Both admin login and social media login systems are fully implemented and ready to use. Just configure the environment variables and OAuth providers as described above!
