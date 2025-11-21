#!/usr/bin/env node
/**
 * Quick Environment Check Script
 * 
 * Run this to see which environment is currently active
 * 
 * Usage: node scripts/check-env.js
 */

const { config } = require('dotenv');
const { resolve } = require('path');
const fs = require('fs');

// Load environment variables in priority order
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, '.env.test.local'),
  resolve(projectRoot, '.env.test'),
  resolve(projectRoot, '.env.dev.local'),  // Development environment
  resolve(projectRoot, '.env.local'),
  resolve(projectRoot, '.env'),
];

const loadedFiles = [];
for (const envFile of envFiles) {
  try {
    if (fs.existsSync(envFile)) {
      config({ path: envFile, override: false });
      loadedFiles.push(envFile);
    }
  } catch (error) {
    // Ignore
  }
}

console.log('🔍 Active Environment Check');
console.log('==========================\n');

// Check Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

let environment = 'unknown';
let projectRef = 'unknown';

if (supabaseUrl.includes('vopfdukvdhnmzzjkxpnj')) {
  environment = 'TEST';
  projectRef = 'vopfdukvdhnmzzjkxpnj';
} else if (supabaseUrl.includes('hpnewqkvpnthpohvxcmq')) {
  environment = 'PRODUCTION';
  projectRef = 'hpnewqkvpnthpohvxcmq';
}

// Check explicit environment variables
const nodeEnv = process.env.NODE_ENV;
const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

console.log('📊 Current Environment:');
console.log(`   Status: ${environment === 'TEST' ? '🧪 TEST' : environment === 'PRODUCTION' ? '🚀 PRODUCTION' : '⚠️  UNKNOWN'}`);
console.log(`   Environment: ${environment}`);
console.log(`   Project: ${projectRef}`);
console.log('');

console.log('⚙️  Environment Variables:');
console.log(`   NODE_ENV: ${nodeEnv || 'not set'}`);
console.log(`   NEXT_PUBLIC_APP_ENV: ${appEnv || 'not set'}`);
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? supabaseUrl.substring(0, 50) + '...' : 'not set'}`);
console.log('');

console.log('📁 Environment Files Loaded:');
if (loadedFiles.length > 0) {
  loadedFiles.forEach((file) => {
    const fileName = file.split('/').pop();
    const isTest = file.includes('.test');
    const isLocal = file.includes('.local');
    const priority = isTest && isLocal ? '1️⃣  (Highest Priority)' :
                     isTest ? '2️⃣ ' :
                     isLocal ? '3️⃣ ' : '4️⃣ ';
    const envType = isTest ? 'TEST' : isLocal ? 'PRODUCTION' : 'DEFAULT';
    console.log(`   ${priority} ${fileName} (${envType})`);
  });
} else {
  console.log('   ⚠️  No environment files found');
}
console.log('');

console.log('📋 Summary:');
if (environment === 'TEST') {
  console.log('   🧪 You are in TEST environment');
  console.log('   📊 Using test database: vopfdukvdhnmzzjkxpnj');
  console.log('   ✅ All API calls will use the test database');
  console.log('   ✅ Tests will use this environment');
} else if (environment === 'PRODUCTION') {
  console.log('   🚀 You are in PRODUCTION environment');
  console.log('   📊 Using production database: hpnewqkvpnthpohvxcmq');
  console.log('   ⚠️  All API calls will use the production database');
  console.log('   ⚠️  Be careful with operations!');
} else {
  console.log('   ⚠️  Environment could not be determined');
  console.log('   📝 Check your .env files');
}
console.log('');

// Show how to use in code
console.log('💡 How to Check in Code:');
console.log('   import { isTestEnvironment, getEnvironment } from "@/lib/utils/environment";');
console.log('   const env = getEnvironment(); // "test" | "production" | "development"');
console.log('   if (isTestEnvironment()) { /* test logic */ }');
console.log('');

