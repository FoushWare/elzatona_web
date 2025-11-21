#!/usr/bin/env node

/**
 * Check Current Supabase Project
 * 
 * Verifies which Supabase project is currently being used
 * based on environment variables and configuration
 */

const { config } = require('dotenv');
const { resolve } = require('path');

// Load environment variables
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, '.env.test.local'),
  resolve(projectRoot, '.env.test'),
  resolve(projectRoot, '.env.local'),
];

console.log('\n🔍 Checking Current Supabase Project Configuration\n');
console.log('=' .repeat(60));

// Load environment files
const loadedFiles = [];
for (const envFile of envFiles) {
  try {
    const result = config({ path: envFile, override: false });
    if (!result.error) {
      loadedFiles.push(envFile);
    }
  } catch (error) {
    // File doesn't exist, that's okay
  }
}

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const appEnv = process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || 'not set';
const nodeEnv = process.env.NODE_ENV || 'not set';

// Extract project reference from URL
const urlProjectRef = supabaseUrl ? supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] : null;

// Decode service role key to get project reference
let keyProjectRef = null;
let keyRole = null;
if (serviceRoleKey) {
  try {
    const jwtParts = serviceRoleKey.split('.');
    if (jwtParts.length === 3) {
      const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64').toString());
      keyProjectRef = payload.ref;
      keyRole = payload.role;
    }
  } catch (error) {
    // Invalid JWT
  }
}

// Project mappings
const projects = {
  'kiycimlsatwfqxtfprlr': {
    name: 'zatona-web-testing',
    type: 'TEST',
    emoji: '🧪'
  },
  'hpnewqkvpnthpohvxcmq': {
    name: 'zatona-web',
    type: 'PRODUCTION',
    emoji: '🚀'
  },
  'slfyltsmcivmqfloxpmq': {
    name: 'zatona-web-testing (old)',
    type: 'TEST (OLD)',
    emoji: '⚠️'
  },
  'vopfdukvdhnmzzjkxpnj': {
    name: 'zatona-web-testing (old)',
    type: 'TEST (OLD)',
    emoji: '⚠️'
  }
};

// Display results
console.log('\n📋 Environment Configuration:');
console.log(`   APP_ENV: ${appEnv}`);
console.log(`   NODE_ENV: ${nodeEnv}`);
console.log(`   Loaded files: ${loadedFiles.length > 0 ? loadedFiles.map(f => f.split('/').pop()).join(', ') : 'none'}`);

console.log('\n🌐 Supabase URL Configuration:');
if (supabaseUrl) {
  const urlProject = projects[urlProjectRef] || { name: 'unknown', type: 'UNKNOWN', emoji: '❓' };
  console.log(`   URL: ${supabaseUrl}`);
  console.log(`   Project Ref: ${urlProjectRef || 'not found'}`);
  console.log(`   Project Name: ${urlProject.emoji} ${urlProject.name}`);
  console.log(`   Project Type: ${urlProject.type}`);
} else {
  console.log('   ❌ NEXT_PUBLIC_SUPABASE_URL not set');
}

console.log('\n🔑 Service Role Key Configuration:');
if (serviceRoleKey) {
  const keyProject = projects[keyProjectRef] || { name: 'unknown', type: 'UNKNOWN', emoji: '❓' };
  console.log(`   Key Project Ref: ${keyProjectRef || 'not found'}`);
  console.log(`   Key Project Name: ${keyProject.emoji} ${keyProject.name}`);
  console.log(`   Key Project Type: ${keyProject.type}`);
  console.log(`   Key Role: ${keyRole || 'unknown'}`);
} else {
  console.log('   ❌ SUPABASE_SERVICE_ROLE_KEY not set');
}

console.log('\n✅ Verification:');
if (urlProjectRef && keyProjectRef) {
  if (urlProjectRef === keyProjectRef) {
    console.log('   ✅ URL and Service Role Key match!');
    const project = projects[urlProjectRef];
    if (project) {
      console.log(`   ${project.emoji} Currently using: ${project.name} (${project.type})`);
    }
  } else {
    console.log('   ❌ MISMATCH: URL and Service Role Key point to different projects!');
    console.log(`      URL points to: ${urlProjectRef} (${projects[urlProjectRef]?.name || 'unknown'})`);
    console.log(`      Key points to: ${keyProjectRef} (${projects[keyProjectRef]?.name || 'unknown'})`);
  }
} else {
  console.log('   ⚠️  Cannot verify - missing URL or Service Role Key');
}

// Check if running in test mode
console.log('\n🧪 Test Mode Check:');
if (appEnv === 'test' || nodeEnv === 'test') {
  console.log('   ✅ Running in TEST mode');
  if (urlProjectRef === 'kiycimlsatwfqxtfprlr') {
    console.log('   ✅ Correct test project (zatona-web-testing)');
  } else {
    console.log('   ⚠️  Warning: Not using zatona-web-testing project');
    console.log('   Expected: kiycimlsatwfqxtfprlr (zatona-web-testing)');
    console.log(`   Actual: ${urlProjectRef || 'not set'}`);
  }
} else {
  console.log('   ⚠️  Not explicitly in TEST mode');
  console.log('   Set APP_ENV=test in .env.test.local for test mode');
}

console.log('\n' + '='.repeat(60));
console.log('');

// Summary
if (urlProjectRef === 'kiycimlsatwfqxtfprlr' && keyProjectRef === 'kiycimlsatwfqxtfprlr' && (appEnv === 'test' || nodeEnv === 'test')) {
  console.log('✅ All checks passed! Using zatona-web-testing (TEST) project correctly.');
  process.exit(0);
} else if (urlProjectRef === 'hpnewqkvpnthpohvxcmq' && keyProjectRef === 'hpnewqkvpnthpohvxcmq') {
  console.log('⚠️  Using PRODUCTION project (zatona-web). Make sure this is intentional!');
  process.exit(0);
} else {
  console.log('❌ Configuration mismatch detected. Please check your .env.test.local file.');
  process.exit(1);
}

