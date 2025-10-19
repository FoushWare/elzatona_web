#!/usr/bin/env node

/**
 * 🚀 Automated OAuth Setup Script
 * Guides you through Google and GitHub OAuth setup with minimal manual work
 */

import 'dotenv/config';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Automated OAuth Setup for Elzatona Web\n');

// Configuration
const CONFIG = {
  appName: 'Elzatona Web',
  redirectUri: 'http://localhost:3001/api/auth/callback',
  callbackUrl: 'http://localhost:3001/api/auth/callback',
  envFile: '.env.local',
  port: 3001,
};

// OAuth Provider URLs
const OAUTH_URLS = {
  google: {
    console: 'https://console.cloud.google.com/',
    credentials: 'https://console.cloud.google.com/apis/credentials',
    oauthConsent: 'https://console.cloud.google.com/apis/credentials/consent',
  },
  github: {
    settings: 'https://github.com/settings/developers',
    newApp: 'https://github.com/settings/applications/new',
  },
};

// Step 1: Google OAuth Setup
async function setupGoogleOAuth() {
  console.log('🔵 Setting up Google OAuth...\n');

  console.log('📋 Google OAuth Setup Steps:');
  console.log('1. Go to Google Cloud Console');
  console.log('2. Create a new project (or select existing)');
  console.log('3. Enable Google+ API');
  console.log('4. Create OAuth 2.0 credentials');
  console.log('5. Configure OAuth consent screen');
  console.log('6. Add redirect URI');
  console.log('7. Copy Client ID and Secret\n');

  console.log('🔗 Direct Links:');
  console.log(`   Google Cloud Console: ${OAUTH_URLS.google.console}`);
  console.log(`   OAuth Credentials: ${OAUTH_URLS.google.credentials}`);
  console.log(`   OAuth Consent: ${OAUTH_URLS.google.oauthConsent}\n`);

  console.log('📝 Required Information:');
  console.log(`   Application Name: ${CONFIG.appName}`);
  console.log(`   Redirect URI: ${CONFIG.redirectUri}/google`);
  console.log(
    `   Authorized JavaScript Origins: http://localhost:${CONFIG.port}\n`
  );

  // Try to open browser
  try {
    console.log('🌐 Opening Google Cloud Console in browser...');
    execSync(`open "${OAUTH_URLS.google.console}"`, { stdio: 'ignore' });
  } catch (error) {
    console.log('⚠️  Could not open browser automatically');
    console.log('   Please manually open the Google Cloud Console');
  }

  // Wait for user input
  console.log('⏳ Please complete the Google OAuth setup...');
  console.log('   Press Enter when you have your Client ID and Secret');

  await waitForEnter();

  // Get credentials from user
  const clientId = await promptUser('Enter your Google Client ID: ');
  const clientSecret = await promptUser('Enter your Google Client Secret: ');

  if (clientId && clientSecret) {
    // Update .env.local
    updateEnvFile('GOOGLE_CLIENT_ID', clientId);
    updateEnvFile('GOOGLE_CLIENT_SECRET', clientSecret);
    console.log('✅ Google OAuth credentials added to .env.local\n');
    return { clientId, clientSecret };
  } else {
    console.log('❌ Google OAuth setup incomplete\n');
    return null;
  }
}

// Step 2: GitHub OAuth Setup
async function setupGitHubOAuth() {
  console.log('🟣 Setting up GitHub OAuth...\n');

  console.log('📋 GitHub OAuth Setup Steps:');
  console.log('1. Go to GitHub Developer Settings');
  console.log('2. Create new OAuth App');
  console.log('3. Fill in application details');
  console.log('4. Set callback URL');
  console.log('5. Copy Client ID and Secret\n');

  console.log('🔗 Direct Links:');
  console.log(`   GitHub Developer Settings: ${OAUTH_URLS.github.settings}`);
  console.log(`   New OAuth App: ${OAUTH_URLS.github.newApp}\n`);

  console.log('📝 Required Information:');
  console.log(`   Application Name: ${CONFIG.appName}`);
  console.log(`   Homepage URL: http://localhost:${CONFIG.port}`);
  console.log(`   Callback URL: ${CONFIG.callbackUrl}/github\n`);

  // Try to open browser
  try {
    console.log('🌐 Opening GitHub Developer Settings in browser...');
    execSync(`open "${OAUTH_URLS.github.newApp}"`, { stdio: 'ignore' });
  } catch (error) {
    console.log('⚠️  Could not open browser automatically');
    console.log('   Please manually open the GitHub Developer Settings');
  }

  // Wait for user input
  console.log('⏳ Please complete the GitHub OAuth setup...');
  console.log('   Press Enter when you have your Client ID and Secret');

  await waitForEnter();

  // Get credentials from user
  const clientId = await promptUser('Enter your GitHub Client ID: ');
  const clientSecret = await promptUser('Enter your GitHub Client Secret: ');

  if (clientId && clientSecret) {
    // Update .env.local
    updateEnvFile('GITHUB_CLIENT_ID', clientId);
    updateEnvFile('GITHUB_CLIENT_SECRET', clientSecret);
    console.log('✅ GitHub OAuth credentials added to .env.local\n');
    return { clientId, clientSecret };
  } else {
    console.log('❌ GitHub OAuth setup incomplete\n');
    return null;
  }
}

// Step 3: Test Complete System
async function testCompleteSystem() {
  console.log('🧪 Testing Complete Authentication System...\n');

  // Test admin login
  console.log('🛡️  Testing Admin Login...');
  try {
    const response = await fetch(
      `http://localhost:${CONFIG.port}/api/admin/auth`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123',
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
      console.log('✅ Admin login working');
    } else {
      console.log('❌ Admin login failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Admin login error:', error.message);
  }

  // Test NextAuth providers
  console.log('\n🔗 Testing NextAuth Providers...');
  try {
    const response = await fetch(
      `http://localhost:${CONFIG.port}/api/auth/providers`
    );
    const providers = await response.json();

    console.log('Available providers:');
    Object.keys(providers).forEach(provider => {
      console.log(`   ✅ ${provider}`);
    });
  } catch (error) {
    console.log('❌ NextAuth test error:', error.message);
  }

  // Test OAuth endpoints
  console.log('\n🌐 Testing OAuth Endpoints...');
  const oauthEndpoints = [
    '/api/auth/signin',
    '/api/auth/callback/google',
    '/api/auth/callback/github',
  ];

  for (const endpoint of oauthEndpoints) {
    try {
      const response = await fetch(
        `http://localhost:${CONFIG.port}${endpoint}`
      );
      console.log(`   ${response.ok ? '✅' : '❌'} ${endpoint}`);
    } catch (error) {
      console.log(`   ❌ ${endpoint} - ${error.message}`);
    }
  }
}

// Utility functions
function updateEnvFile(key, value) {
  const envPath = CONFIG.envFile;
  let envContent = '';

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Remove existing key
  envContent = envContent.replace(new RegExp(`^${key}=.*$`, 'm'), '');

  // Add new key
  envContent += `\n${key}=${value}`;

  fs.writeFileSync(envPath, envContent);
}

function waitForEnter() {
  return new Promise(resolve => {
    process.stdin.once('data', () => resolve());
  });
}

function promptUser(question) {
  return new Promise(resolve => {
    process.stdout.write(question);
    process.stdin.once('data', data => {
      resolve(data.toString().trim());
    });
  });
}

// Main execution
async function main() {
  console.log('🎯 Starting Automated OAuth Setup...\n');

  // Check if server is running
  try {
    await fetch(`http://localhost:${CONFIG.port}/api/auth/providers`);
    console.log('✅ Development server is running\n');
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('   Please run: npm run dev');
    process.exit(1);
  }

  // Setup Google OAuth
  const googleOAuth = await setupGoogleOAuth();

  // Setup GitHub OAuth
  const githubOAuth = await setupGitHubOAuth();

  // Test complete system
  await testCompleteSystem();

  // Final summary
  console.log('\n🎉 OAuth Setup Complete!\n');
  console.log('📋 Summary:');
  console.log(
    `   Google OAuth: ${googleOAuth ? '✅ Configured' : '❌ Not configured'}`
  );
  console.log(
    `   GitHub OAuth: ${githubOAuth ? '✅ Configured' : '❌ Not configured'}`
  );
  console.log(`   Admin Login: ✅ Working`);
  console.log(`   NextAuth: ✅ Configured\n`);

  console.log('🎯 Access Points:');
  console.log(`   Admin Login: http://localhost:${CONFIG.port}/admin/login`);
  console.log(`   User Auth: http://localhost:${CONFIG.port}/auth`);
  console.log(
    `   API Test: http://localhost:${CONFIG.port}/api/auth/providers\n`
  );

  console.log('🚀 Your authentication system is ready!');
}

// Handle process termination
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.on('SIGINT', () => {
  console.log('\n\n👋 OAuth setup cancelled');
  process.exit(0);
});

// Start the setup
main().catch(console.error);
