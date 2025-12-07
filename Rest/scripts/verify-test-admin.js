#!/usr/bin/env node
/**
 * Verify Test Admin User Setup
 *
 * Verifies that:
 * 1. .env.test.local is configured correctly
 * 2. Admin user exists in the test database
 * 3. Password hash is correct (bcrypt)
 * 4. Admin user can authenticate
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const { resolve } = require('path');

// Load test environment variables
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, '.env.test.local'),
  resolve(projectRoot, '.env.test'),
  resolve(projectRoot, '.env.local'),
];

for (const envFile of envFiles) {
  try {
    config({ path: envFile, override: false });
  } catch (error) {
    // File doesn't exist, that's okay
  }
}

// Get configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

console.log('🔍 Verifying Test Admin Setup...\n');

// Check environment variables
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL not found in .env.test.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.test.local');
  console.error('\n📝 To get the service role key:');
  console.error('   1. Go to: https://supabase.com/dashboard');
  console.error(
    `   2. Select project: ${supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'your-test-project'}`
  );
  console.error('   3. Go to: Settings → API');
  console.error('   4. Scroll to "Project API keys"');
  console.error('   5. Click 👁️ next to "service_role"');
  console.error('   6. Copy the key and add it to .env.test.local\n');
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error(
    '❌ ADMIN_EMAIL or ADMIN_PASSWORD not found in .env.test.local'
  );
  process.exit(1);
}

console.log('✅ Environment variables loaded:');
console.log(`   📊 Supabase URL: ${supabaseUrl.substring(0, 40)}...`);
console.log(`   📧 Admin Email: ${adminEmail}`);
console.log(
  `   🔑 Service Role Key: ${supabaseServiceKey.substring(0, 20)}...\n`
);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function verifyAdmin() {
  try {
    // Check if admin_users table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);

    if (
      tableError &&
      (tableError.code === 'PGRST116' || tableError.code === '42P01')
    ) {
      console.error('❌ admin_users table does not exist!');
      console.error('\n📝 Please run the SQL schema first:');
      console.error(
        '   1. Go to: https://supabase.com/dashboard → Your Test Project → SQL Editor'
      );
      console.error(
        '   2. Copy and paste the contents of: Rest/scripts/test-database-schema.sql'
      );
      console.error('   3. Click "Run" to execute\n');
      process.exit(1);
    }

    // Check if admin exists
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .maybeSingle();

    if (adminError) {
      console.error('❌ Error checking admin user:', adminError.message);
      process.exit(1);
    }

    if (!adminData) {
      console.error('❌ Admin user not found!');
      console.error(`   Email: ${adminEmail}`);
      console.error('\n📝 To create the admin user:');
      console.error('   node Rest/scripts/create-test-admin.js\n');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log(`   📧 Email: ${adminData.email}`);
    console.log(`   👤 Role: ${adminData.role}`);
    console.log(`   ✅ Active: ${adminData.is_active ? 'Yes' : 'No'}`);
    console.log(`   🆔 ID: ${adminData.id}\n`);

    // Verify password hash
    if (!adminData.password_hash) {
      console.error('❌ Admin user has no password_hash!');
      process.exit(1);
    }

    const isValidHash =
      adminData.password_hash.startsWith('$2b$') ||
      adminData.password_hash.startsWith('$2a$');
    if (!isValidHash) {
      console.error('❌ Password hash is not bcrypt format!');
      console.error(`   Hash: ${adminData.password_hash.substring(0, 20)}...`);
      console.error('\n📝 The password must be hashed with bcrypt.');
      console.error('   Run: node Rest/scripts/create-test-admin.js\n');
      process.exit(1);
    }

    // Test password verification
    const passwordMatch = await bcrypt.compare(
      adminPassword,
      adminData.password_hash
    );
    if (!passwordMatch) {
      console.error('❌ Password verification failed!');
      console.error(
        '   The password in .env.test.local does not match the stored hash.'
      );
      console.error('\n📝 To fix:');
      console.error(
        '   1. Verify ADMIN_PASSWORD in .env.test.local is correct'
      );
      console.error(
        '   2. Or update the admin password: node Rest/scripts/create-test-admin.js\n'
      );
      process.exit(1);
    }

    console.log('✅ Password hash verified (bcrypt)');
    console.log('✅ Password matches stored hash\n');

    console.log('🎉 All checks passed! Test admin is ready.\n');
    console.log('📋 Login Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n🔗 Test Login: http://localhost:3000/admin/login');
    console.log('\n🚀 You can now run E2E tests:');
    console.log('   npm run test:e2e\n');
  } catch (error) {
    console.error('❌ Error verifying admin:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run verification
verifyAdmin();
