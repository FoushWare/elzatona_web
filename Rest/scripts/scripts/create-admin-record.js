#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🛡️ Creating Admin Record\n');

// Supabase configuration
const supabaseUrl = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createAdminRecord() {
  try {
    console.log('🔄 Creating admin record...');

    const adminEmail = 'admin@elzatona.com';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    // Get existing user
    const { data: users, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }

    const user = users.users.find(u => u.email === adminEmail);
    if (!user) {
      console.error('❌ Could not find existing user');
      return;
    }

    console.log('✅ Found existing auth user:', user.id);

    // Check if admin record already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      console.log('✅ Admin record already exists');
    } else {
      // Create admin record
      const { error: insertError } = await supabase.from('admins').insert({
        id: user.id,
        email: adminEmail,
        name: adminName,
        role: adminRole,
      });

      if (insertError) {
        console.error('❌ Error creating admin record:', insertError.message);
        console.log(
          '📝 Please make sure the admins table exists in your Supabase database.'
        );
        console.log('   Run this SQL in your Supabase SQL Editor:');
        console.log(`
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role can manage admins" ON admins FOR ALL USING (
  auth.role() = 'service_role'
);
        `);
        return;
      }

      console.log('✅ Admin record created successfully');
    }

    console.log('\n🎯 Admin setup complete!');
    console.log('You can now login at:');
    console.log('   URL: http://localhost:3001/admin/login');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: [Set in INITIAL_ADMIN_PASSWORD env variable]\n`);
  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
  }
}

// Run the setup
createAdminRecord();
