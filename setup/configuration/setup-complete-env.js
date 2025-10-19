#!/usr/bin/env node

/**
 * Complete Environment Configuration Script
 * This script helps you set up all missing environment variables
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 Complete Environment Configuration Setup\n');

// Complete environment template
const completeEnvTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# NextAuth Configuration
NEXTAUTH_SECRET=elzatona-nextauth-secret-2024-production-ready
NEXTAUTH_URL=http://localhost:3001

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# GitHub OAuth (Get from GitHub Developer Settings)
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# Admin Configuration
JWT_SECRET=elzatona-super-secret-jwt-key-2024-production-ready
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@elzatona.com
INITIAL_ADMIN_PASSWORD=ElzatonaAdmin2024!
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# Firebase Configuration (Your existing Firebase project)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-demo-project-adffb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-demo-project-adffb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-demo-project-adffb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76366138630
NEXT_PUBLIC_FIREBASE_APP_ID=1:76366138630:web:0f3381c2f5a62e0401e287
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XZ5VKFGG4Y

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

// Check current .env.local
const envPath = path.join(process.cwd(), '.env.local');

console.log('📋 Current .env.local Status:');
console.log('=====================================');

if (fs.existsSync(envPath)) {
  const currentEnv = fs.readFileSync(envPath, 'utf8');
  console.log('✅ .env.local exists');

  // Check for missing variables
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
  ];

  let missingVars = [];
  requiredVars.forEach(varName => {
    if (!currentEnv.includes(varName + '=')) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.log('❌ Missing variables:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
  } else {
    console.log('✅ All required variables present');
  }
} else {
  console.log('❌ .env.local does not exist');
}

console.log('\n🚀 Next Steps to Complete Setup:\n');

console.log('1. 🔑 GET SUPABASE SERVICE ROLE KEY:');
console.log(
  '   • Go to: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq'
);
console.log('   • Go to Settings → API');
console.log('   • Copy the "service_role" key');
console.log('   • Replace "your-service-role-key-here" in .env.local\n');

console.log('2. 🔧 SET UP GOOGLE OAUTH:');
console.log('   • Go to: https://console.cloud.google.com/');
console.log('   • Create OAuth 2.0 credentials');
console.log(
  '   • Add redirect URI: http://localhost:3001/api/auth/callback/google'
);
console.log('   • Copy Client ID and Secret');
console.log(
  '   • Replace "your-google-client-id-here" and "your-google-client-secret-here"\n'
);

console.log('3. 🐙 SET UP GITHUB OAUTH:');
console.log('   • Go to: https://github.com/settings/developers');
console.log('   • Create new OAuth App');
console.log(
  '   • Set callback URL: http://localhost:3001/api/auth/callback/github'
);
console.log('   • Copy Client ID and Secret');
console.log(
  '   • Replace "your-github-client-id-here" and "your-github-client-secret-here"\n'
);

console.log('4. 🛡️ TEST ADMIN LOGIN:');
console.log(
  '   • Try existing admin: admin@example.com / your-secure-admin-password'
);
console.log('   • Or create new admin with the script\n');

console.log('5. 🧪 TEST SOCIAL LOGIN:');
console.log('   • Go to: http://localhost:3001/auth');
console.log('   • Try Google and GitHub login\n');

console.log('📋 Complete .env.local Template:');
console.log('=====================================');
console.log(completeEnvTemplate);
console.log('=====================================\n');

console.log('💡 After updating .env.local:');
console.log('   1. Restart your development server (Ctrl+C, then npm run dev)');
console.log('   2. Test admin login: http://localhost:3001/admin/login');
console.log('   3. Test social login: http://localhost:3001/auth');
console.log('   4. Run: node test-auth-systems.js');
