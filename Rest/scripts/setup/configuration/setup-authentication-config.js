#!/usr/bin/env node

/**
 * Authentication Configuration Setup Script
 * This script helps you configure the authentication systems
 */

import fs from 'fs';
import path from 'path';

console.log('🔐 Authentication Configuration Setup\n');

// Configuration template
const envTemplate = `# Admin Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=your-secure-admin-password
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-change-in-production
NEXTAUTH_URL=http://localhost:3001

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Firebase Configuration (Get from Firebase Console)
# Go to: https://console.firebase.google.com/
# Select your project → Project Settings → General → Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Supabase Configuration (Get from Supabase Dashboard)
# Go to: https://supabase.com/dashboard → Your Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

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
ENABLE_AUDIT_LOGGING=true`;

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists');
  console.log('📋 Current .env.local contents:');
  console.log('=====================================');
  console.log(fs.readFileSync(envPath, 'utf8'));
  console.log('=====================================\n');
} else {
  console.log('📝 Creating .env.local file...');
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env.local created successfully!\n');
}

console.log('🚀 Next Steps to Complete Configuration:\n');

console.log('1. 🔧 GOOGLE OAUTH SETUP:');
console.log('   • Go to: https://console.cloud.google.com/');
console.log('   • Create OAuth 2.0 credentials');
console.log(
  '   • Add redirect URI: http://localhost:3001/api/auth/callback/google'
);
console.log('   • Copy Client ID and Secret to .env.local\n');

console.log('2. 🐙 GITHUB OAUTH SETUP:');
console.log('   • Go to: https://github.com/settings/developers');
console.log('   • Create new OAuth App');
console.log(
  '   • Set callback URL: http://localhost:3001/api/auth/callback/github'
);
console.log('   • Copy Client ID and Secret to .env.local\n');

console.log('3. 🔑 SUPABASE SERVICE ROLE KEY:');
console.log('   • Go to: https://supabase.com/dashboard');
console.log('   • Select your project');
console.log('   • Go to Settings → API');
console.log('   • Copy the "service_role" key');
console.log('   • Add it to SUPABASE_SERVICE_ROLE_KEY in .env.local\n');

console.log('4. 🛡️ INITIALIZE ADMIN ACCOUNT:');
console.log('   • Run: node setup-admin-account.js');
console.log('   • Or manually call the API (see below)\n');

console.log('5. 🧪 TEST THE SYSTEMS:');
console.log('   • Admin Login: http://localhost:3001/admin/login');
console.log('   • User Auth: http://localhost:3001/auth');
console.log('   • Run: node test-authentication-systems.js\n');

console.log('📋 Manual Admin Initialization (if needed):');
console.log('curl -X POST http://localhost:3001/api/admin/init \\');
console.log('  -H "Content-Type: application/json" \\');
console.log("  -d '{");
console.log('    "email": "admin@example.com",');
console.log('    "password": "your-secure-admin-password",');
console.log('    "name": "Super Admin",');
console.log('    "role": "super_admin"');
console.log("  }'\n");

console.log(
  '🎉 Once configured, both admin login and social media login will be fully functional!'
);
