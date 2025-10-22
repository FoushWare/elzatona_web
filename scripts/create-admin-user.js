#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🛡️ Creating Admin User in Supabase Auth\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createAdminUser() {
  try {
    const adminEmail = 'afouadsoftwareengineer@gmail.com';
    const adminPassword = 'ZatonaFoushware$8888';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    console.log('🔄 Creating admin user in Supabase Auth...');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   Role: ${adminRole}\n`);

    // Check if user already exists
    const { data: existingUsers, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }

    const existingUser = existingUsers.users.find(u => u.email === adminEmail);

    if (existingUser) {
      console.log('✅ Admin user already exists in auth:');
      console.log(`   User ID: ${existingUser.id}`);
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Created: ${existingUser.created_at}`);
      console.log(
        `   Email Confirmed: ${existingUser.email_confirmed_at ? 'Yes' : 'No'}\n`
      );

      console.log('📝 Next steps:');
      console.log('   1. Create the admins table using the SQL provided below');
      console.log('   2. Run the admin record creation script\n');
    } else {
      // Create new user
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
          user_metadata: {
            name: adminName,
            role: adminRole,
          },
        });

      if (authError) {
        console.error('❌ Error creating auth user:', authError.message);
        return;
      }

      console.log('✅ Admin user created successfully in Supabase Auth:');
      console.log(`   User ID: ${authData.user?.id}`);
      console.log(`   Email: ${authData.user?.email}`);
      console.log(`   Created: ${authData.user?.created_at}`);
      console.log(
        `   Email Confirmed: ${authData.user?.email_confirmed_at ? 'Yes' : 'No'}\n`
      );

      console.log('📝 Next steps:');
      console.log('   1. Create the admins table using the SQL provided below');
      console.log('   2. Run the admin record creation script\n');
    }

    console.log('📋 SQL to create the admins table:');
    console.log('   Copy and paste this into your Supabase SQL Editor:\n');
    console.log('```sql');
    console.log('CREATE TABLE IF NOT EXISTS admins (');
    console.log('  id UUID PRIMARY KEY,');
    console.log('  email VARCHAR(255) UNIQUE NOT NULL,');
    console.log('  name VARCHAR(255),');
    console.log(
      "  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),"
    );
    console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
    console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
    console.log(');');
    console.log('');
    console.log('-- Enable RLS');
    console.log('ALTER TABLE admins ENABLE ROW LEVEL SECURITY;');
    console.log('');
    console.log('-- Create policy for service role to manage admins');
    console.log(
      'CREATE POLICY IF NOT EXISTS "Service role can manage admins" ON admins FOR ALL USING ('
    );
    console.log("  auth.role() = 'service_role'");
    console.log(');');
    console.log('');
    console.log('-- Create policy for admins to read admins');
    console.log(
      'CREATE POLICY IF NOT EXISTS "Admins can read admins" ON admins FOR SELECT USING ('
    );
    console.log("  auth.role() = 'authenticated' AND ");
    console.log('  EXISTS (SELECT 1 FROM admins WHERE id = auth.uid())');
    console.log(');');
    console.log('```\n');

    console.log('🎯 After creating the table, run:');
    console.log('   node scripts/create-admin-record.js\n');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

// Run the setup
createAdminUser();
