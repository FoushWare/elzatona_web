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
JWT_SECRET=elzatona-super-secret-jwt-key-2024-production-ready
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@elzatona.com
INITIAL_ADMIN_PASSWORD=ElzatonaAdmin2024!
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

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
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s
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
console.log(
  '   • Go to: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq'
);
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
console.log('    "email": "admin@elzatona.com",');
console.log('    "password": "ElzatonaAdmin2024!",');
console.log('    "name": "Super Admin",');
console.log('    "role": "super_admin"');
console.log("  }'\n");

console.log(
  '🎉 Once configured, both admin login and social media login will be fully functional!'
);
