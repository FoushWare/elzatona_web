#!/usr/bin/env node
/**
 * Update .env.test.local to use the correct test project
 * where the admin user exists (zatona-web-testing - kiycimlsatwfqxtfprlr)
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../..');
const envTestLocalPath = path.join(projectRoot, '.env.test.local');

// Test project where admin user exists
const TEST_PROJECT_REF = 'kiycimlsatwfqxtfprlr';
const TEST_PROJECT_URL = `https://${TEST_PROJECT_REF}.supabase.co`;

// Admin credentials from .env.test.local (lines 18-19)
const ADMIN_EMAIL = 'elzatonafoushware@gmail.com';
const ADMIN_PASSWORD = 'ZatonaFoushware$12';

console.log('📝 Updating .env.test.local to use zatona-web-testing project...\n');

// Read current .env.test.local
let envContent = '';
if (fs.existsSync(envTestLocalPath)) {
  envContent = fs.readFileSync(envTestLocalPath, 'utf8');
} else {
  console.error('❌ .env.test.local not found!');
  console.log('💡 Creating new .env.test.local from template...');
  const templatePath = path.join(projectRoot, 'Rest/env.test.example');
  if (fs.existsSync(templatePath)) {
    envContent = fs.readFileSync(templatePath, 'utf8');
  } else {
    console.error('❌ Template file not found!');
    process.exit(1);
  }
}

// Update NEXT_PUBLIC_SUPABASE_URL
envContent = envContent.replace(
  /NEXT_PUBLIC_SUPABASE_URL=.*/,
  `NEXT_PUBLIC_SUPABASE_URL=${TEST_PROJECT_URL}`
);

// Update ADMIN_EMAIL and ADMIN_PASSWORD (lines 18-19)
envContent = envContent.replace(
  /ADMIN_EMAIL=.*/,
  `ADMIN_EMAIL=${ADMIN_EMAIL}`
);
envContent = envContent.replace(
  /ADMIN_PASSWORD=.*/,
  `ADMIN_PASSWORD=${ADMIN_PASSWORD}`
);

// Ensure APP_ENV=test is set
if (!envContent.includes('APP_ENV=test')) {
  envContent += '\n# Environment Type\nAPP_ENV=test\n';
}

// Write updated content
fs.writeFileSync(envTestLocalPath, envContent, 'utf8');

console.log('✅ Updated .env.test.local:');
console.log(`   - NEXT_PUBLIC_SUPABASE_URL=${TEST_PROJECT_URL}`);
console.log(`   - ADMIN_EMAIL=${ADMIN_EMAIL}`);
console.log(`   - ADMIN_PASSWORD=${ADMIN_PASSWORD.substring(0, 10)}...`);
console.log('\n⚠️  IMPORTANT: You need to update SUPABASE_SERVICE_ROLE_KEY manually!');
console.log(`   Get it from: https://supabase.com/dashboard/project/${TEST_PROJECT_REF}/settings/api`);
console.log('   Look for "service_role" key (click the eye icon to reveal)');
console.log('\n📋 Next steps:');
console.log('   1. Update SUPABASE_SERVICE_ROLE_KEY in .env.test.local');
console.log('   2. Update NEXT_PUBLIC_SUPABASE_ANON_KEY if needed');
console.log('   3. Run E2E tests: npm run test:e2e');


