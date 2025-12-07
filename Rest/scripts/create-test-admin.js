#!/usr/bin/env node

/**
 * Create Test Admin User Script
 *
 * Creates a test admin user in the admin_users table
 *
 * Usage:
 *   node Rest/scripts/create-test-admin.js
 *
 * Environment Variables Required (from .env.test.local):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - ADMIN_EMAIL
 *   - ADMIN_PASSWORD
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

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || 'test-admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'test-admin-password-123';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error(
    'Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
  console.error('Please set these in .env.test.local');
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error('❌ Missing admin credentials');
  console.error('Required: ADMIN_EMAIL, ADMIN_PASSWORD');
  console.error('Please set these in .env.test.local');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createTestAdmin() {
  try {
    console.log('🔐 Creating test admin user...\n');
    console.log(`📊 Supabase URL: ${supabaseUrl.substring(0, 30)}...`);
    console.log(`📧 Admin Email: ${adminEmail}\n`);

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
      console.error('   3. Click "Run" to execute');
      console.error('   4. Then run this script again\n');
      process.exit(1);
    }

    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error(
        '❌ Error checking for existing admin:',
        checkError.message
      );
      process.exit(1);
    }

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Updating password...');

      // Hash the new password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

      // Update password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', adminEmail);

      if (updateError) {
        console.error('❌ Error updating admin password:', updateError.message);
        process.exit(1);
      }

      console.log('✅ Admin password updated successfully!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`👤 Role: ${existingAdmin.role}`);
    } else {
      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

      // Create admin user
      const { data: adminData, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: adminEmail,
          password_hash: passwordHash,
          name: 'Test Admin User',
          role: 'super_admin',
          is_active: true,
          permissions: {
            can_manage_users: true,
            can_manage_content: true,
            can_view_analytics: true,
            can_manage_settings: true,
          },
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error creating admin user:', insertError.message);
        console.error(
          '💡 Make sure the admin_users table exists. Run the SQL schema first.'
        );
        process.exit(1);
      }

      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`👤 Role: super_admin`);
      console.log(`🆔 Admin ID: ${adminData.id}`);
    }

    console.log('\n🎉 Test admin user is ready!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n🔗 Login at: http://localhost:3000/admin/login');
    console.log('\n🚀 You can now run tests:');
    console.log('   npm run test:unit');
    console.log('   npm run test:integration');
    console.log('   npm run test:e2e\n');
  } catch (error) {
    console.error('❌ Error creating test admin:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
createTestAdmin();
