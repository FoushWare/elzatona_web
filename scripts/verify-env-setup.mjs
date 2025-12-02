#!/usr/bin/env node

/**
 * Verify environment setup for data seeding
 * 
 * This script checks if all required environment variables are set
 * and verifies the Supabase project URLs match the actual projects.
 * 
 * Usage: node scripts/verify-env-setup.mjs
 */

import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });
const MAIN_KEY_FROM_LOCAL = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAIN_URL_FROM_LOCAL = process.env.NEXT_PUBLIC_SUPABASE_URL;

dotenv.config({ path: join(__dirname, '..', '.env.test.local'), override: true });

// Verified project information (from MCP)
const TESTING_PROJECT_ID = 'kiycimlsatwfqxtfprlr';
const MAIN_PROJECT_ID = 'hpnewqkvpnthpohvxcmq';
const TESTING_PROJECT_URL = 'https://kiycimlsatwfqxtfprlr.supabase.co';
const MAIN_PROJECT_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';

// Get keys
const TESTING_KEY = process.env.TESTING_SUPABASE_SERVICE_ROLE_KEY || 
                    (process.env.SUPABASE_SERVICE_ROLE_KEY !== MAIN_KEY_FROM_LOCAL ? process.env.SUPABASE_SERVICE_ROLE_KEY : null);
const MAIN_KEY = MAIN_KEY_FROM_LOCAL;

// Get URLs
const TESTING_URL = process.env.TESTING_SUPABASE_URL || 
                    process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    TESTING_PROJECT_URL;
const MAIN_URL = MAIN_URL_FROM_LOCAL || MAIN_PROJECT_URL;

console.log('🔍 Verifying Environment Setup for Data Seeding\n');
console.log('=' .repeat(60));

// Check Testing Database
console.log('\n📊 Testing Database (zatona-web-testing)');
console.log(`   Project ID: ${TESTING_PROJECT_ID}`);
console.log(`   Expected URL: ${TESTING_PROJECT_URL}`);
console.log(`   Actual URL: ${TESTING_URL}`);
console.log(`   URL Match: ${TESTING_URL === TESTING_PROJECT_URL ? '✅' : '⚠️'}`);
console.log(`   Service Role Key: ${TESTING_KEY ? '✅ Set' : '❌ Missing'}`);
if (TESTING_KEY) {
  console.log(`   Key Source: ${process.env.TESTING_SUPABASE_SERVICE_ROLE_KEY ? '.env.test.local (TESTING_SUPABASE_SERVICE_ROLE_KEY)' : '.env.test.local (SUPABASE_SERVICE_ROLE_KEY)'}`);
}

// Check Main Database
console.log('\n📊 Main Database (zatona-web)');
console.log(`   Project ID: ${MAIN_PROJECT_ID}`);
console.log(`   Expected URL: ${MAIN_PROJECT_URL}`);
console.log(`   Actual URL: ${MAIN_URL}`);
console.log(`   URL Match: ${MAIN_URL === MAIN_PROJECT_URL ? '✅' : '⚠️'}`);
console.log(`   Service Role Key: ${MAIN_KEY ? '✅ Set' : '❌ Missing'}`);
if (MAIN_KEY) {
  console.log(`   Key Source: .env.local (SUPABASE_SERVICE_ROLE_KEY)`);
}

// Test Connections
console.log('\n🔌 Testing Database Connections...\n');

let allGood = true;

// Test Testing Database
if (TESTING_KEY) {
  try {
    const testingClient = createClient(TESTING_URL, TESTING_KEY);
    const { error } = await testingClient.from('categories').select('id').limit(1);
    if (error) {
      console.log('❌ Testing database connection failed');
      console.log(`   Error: ${error.message}`);
      allGood = false;
    } else {
      console.log('✅ Testing database connection successful');
    }
  } catch (error) {
    console.log('❌ Testing database connection failed');
    console.log(`   Error: ${error.message}`);
    allGood = false;
  }
} else {
  console.log('⏭️  Skipping testing database connection (key missing)');
  allGood = false;
}

// Test Main Database
if (MAIN_KEY) {
  try {
    const mainClient = createClient(MAIN_URL, MAIN_KEY);
    const { error } = await mainClient.from('categories').select('id').limit(1);
    if (error) {
      console.log('❌ Main database connection failed');
      console.log(`   Error: ${error.message}`);
      allGood = false;
    } else {
      console.log('✅ Main database connection successful');
    }
  } catch (error) {
    console.log('❌ Main database connection failed');
    console.log(`   Error: ${error.message}`);
    allGood = false;
  }
} else {
  console.log('⏭️  Skipping main database connection (key missing)');
  allGood = false;
}

// Summary
console.log('\n' + '='.repeat(60));
if (allGood) {
  console.log('\n✅ All checks passed! Ready to run seeding script.');
  console.log('   Run: npm run seed:testing-to-main\n');
} else {
  console.log('\n❌ Some checks failed. Please fix the issues above.\n');
  console.log('📝 Required Environment Variables:');
  console.log('\n   In .env.local:');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY (for main database)');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL (optional, will use verified URL)');
  console.log('\n   In .env.test.local:');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY (for testing database)');
  console.log('   OR');
  console.log('   - TESTING_SUPABASE_SERVICE_ROLE_KEY (explicit testing key)');
  console.log('\n   Get service role keys from:');
  console.log(`   - Testing: https://supabase.com/dashboard/project/${TESTING_PROJECT_ID}/settings/api`);
  console.log(`   - Main: https://supabase.com/dashboard/project/${MAIN_PROJECT_ID}/settings/api\n`);
  process.exit(1);
}





