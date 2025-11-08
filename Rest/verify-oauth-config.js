#!/usr/bin/env node

/**
 * Verify OAuth Provider Configuration
 *
 * This script checks the current OAuth provider configuration in Supabase
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
          resolve({
            status: res.statusCode,
            data: parsed,
            headers: res.headers,
          });
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

async function getAuthConfig() {
  console.log('📋 Fetching current auth configuration...\n');

  try {
    const response = await makeRequest(
      'GET',
      `/v1/projects/${PROJECT_REF}/config/auth`
    );

    if (response.status === 200) {
      console.log('✅ Auth configuration retrieved:\n');
      console.log(JSON.stringify(response.data, null, 2));

      // Check OAuth providers
      console.log('\n🔍 OAuth Provider Status:');
      console.log(
        'Google:',
        response.data.external_google_enabled ? '✅ Enabled' : '❌ Disabled'
      );
      console.log(
        'GitHub:',
        response.data.external_github_enabled ? '✅ Enabled' : '❌ Disabled'
      );

      return response.data;
    } else {
      console.error('❌ Failed to get auth config:', response.status);
      console.error('Response:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting auth config:', error.message);
    return null;
  }
}

getAuthConfig().catch(error => {
  console.error('❌ Script failed:', error.message);
  process.exit(1);
});
