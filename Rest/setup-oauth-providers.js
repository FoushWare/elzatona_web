#!/usr/bin/env node

/**
 * Setup OAuth Providers for Supabase
 *
 * This script configures Google and GitHub OAuth providers using the Supabase Management API.
 *
 * Prerequisites:
 * 1. Get your Supabase Access Token from: https://supabase.com/dashboard/account/tokens
 * 2. Set SUPABASE_ACCESS_TOKEN environment variable
 * 3. Get OAuth credentials from Google Cloud Console and GitHub Developer Settings
 */

const https = require('https');

const PROJECT_REF = 'hpnewqkvpnthpohvxcmq';
const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

if (!SUPABASE_ACCESS_TOKEN) {
  console.error('❌ SUPABASE_ACCESS_TOKEN environment variable is required');
  console.error(
    'Get your token from: https://supabase.com/dashboard/account/tokens'
  );
  process.exit(1);
}

// OAuth provider configurations
// Based on Supabase Management API documentation
const buildOAuthConfig = () => {
  const config = {};

  // Google OAuth configuration
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    config.external_google_enabled = true;
    config.external_google_client_id = process.env.GOOGLE_CLIENT_ID;
    config.external_google_secret = process.env.GOOGLE_CLIENT_SECRET;
  }

  // GitHub OAuth configuration
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    config.external_github_enabled = true;
    config.external_github_client_id = process.env.GITHUB_CLIENT_ID;
    config.external_github_secret = process.env.GITHUB_CLIENT_SECRET;
  }

  return config;
};

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = https.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = responseData ? JSON.parse(responseData) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function getCurrentAuthConfig() {
  console.log('📋 Getting current auth configuration...');

  try {
    const response = await makeRequest(
      'GET',
      `/v1/projects/${PROJECT_REF}/config/auth`
    );

    if (response.status === 200) {
      console.log('✅ Current auth config retrieved');
      return response.data;
    } else {
      console.error(
        '❌ Failed to get auth config:',
        response.status,
        response.data
      );
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting auth config:', error.message);
    return null;
  }
}

async function updateAuthConfig(config) {
  console.log('🔄 Updating auth configuration...');

  try {
    const response = await makeRequest(
      'PATCH',
      `/v1/projects/${PROJECT_REF}/config/auth`,
      config
    );

    if (response.status === 200) {
      console.log('✅ Auth configuration updated successfully');
      return true;
    } else {
      console.error(
        '❌ Failed to update auth config:',
        response.status,
        response.data
      );
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating auth config:', error.message);
    return false;
  }
}

async function setupOAuthProviders() {
  console.log(
    '🚀 Setting up OAuth providers for Supabase project:',
    PROJECT_REF
  );
  console.log('');

  // Check for required environment variables
  const missingVars = [];
  if (!process.env.GOOGLE_CLIENT_ID) missingVars.push('GOOGLE_CLIENT_ID');
  if (!process.env.GOOGLE_CLIENT_SECRET)
    missingVars.push('GOOGLE_CLIENT_SECRET');
  if (!process.env.GITHUB_CLIENT_ID) missingVars.push('GITHUB_CLIENT_ID');
  if (!process.env.GITHUB_CLIENT_SECRET)
    missingVars.push('GITHUB_CLIENT_SECRET');

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('');
    console.error('Please set these variables before running the script.');
    console.error('');
    console.error('For Google OAuth:');
    console.error('1. Go to https://console.cloud.google.com/');
    console.error('2. Create/select a project');
    console.error('3. Enable Google+ API');
    console.error('4. Create OAuth 2.0 credentials');
    console.error(
      '5. Set authorized redirect URI to: https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback'
    );
    console.error('');
    console.error('For GitHub OAuth:');
    console.error('1. Go to https://github.com/settings/developers');
    console.error('2. Create a new OAuth App');
    console.error(
      '3. Set Authorization callback URL to: https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback'
    );
    process.exit(1);
  }

  // Get current config
  const currentConfig = await getCurrentAuthConfig();
  if (!currentConfig) {
    console.error('❌ Could not retrieve current auth configuration');
    process.exit(1);
  }

  // Build OAuth configuration
  const oauthConfig = buildOAuthConfig();

  console.log('📝 OAuth providers to configure:');
  if (oauthConfig.external_google_enabled) {
    console.log('   ✅ Google OAuth');
  }
  if (oauthConfig.external_github_enabled) {
    console.log('   ✅ GitHub OAuth');
  }
  console.log('');

  // Merge with current config - only update OAuth-related fields
  const updatedConfig = {
    ...currentConfig,
    ...oauthConfig,
  };

  console.log('📋 Configuration to send:');
  console.log(JSON.stringify(updatedConfig, null, 2));
  console.log('');

  // Update the configuration
  const success = await updateAuthConfig(updatedConfig);

  if (success) {
    console.log('');
    console.log('🎉 OAuth providers configured successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Test Google OAuth login');
    console.log('2. Test GitHub OAuth login');
    console.log('3. Verify redirect URLs in your OAuth apps match:');
    console.log('   https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback');
  } else {
    console.error('❌ Failed to configure OAuth providers');
    process.exit(1);
  }
}

// Run the setup
setupOAuthProviders().catch(error => {
  console.error('❌ Script failed:', error.message);
  process.exit(1);
});
