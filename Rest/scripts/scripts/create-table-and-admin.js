#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🛡️ Creating Admins Table via SQL\n');

// Supabase configuration
const supabaseUrl = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createAdminsTable() {
  try {
    console.log('🔄 Creating admins table using SQL...');

    // SQL to create the admins table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Enable RLS
      ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
      
      -- Create policy for service role to manage admins
      CREATE POLICY IF NOT EXISTS "Service role can manage admins" ON admins FOR ALL USING (
        auth.role() = 'service_role'
      );
      
      -- Create policy for admins to read admins
      CREATE POLICY IF NOT EXISTS "Admins can read admins" ON admins FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        EXISTS (SELECT 1 FROM admins WHERE id = auth.uid())
      );
    `;

    // Try to execute the SQL using the Supabase client
    const { error } = await supabase.rpc('exec', { sql: createTableSQL });

    if (error) {
      console.log(
        '⚠️  Direct SQL execution failed, trying alternative approach...'
      );

      // Try using the REST API directly
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          apikey: supabaseServiceRoleKey,
        },
        body: JSON.stringify({ sql: createTableSQL }),
      });

      if (!response.ok) {
        console.log('⚠️  REST API approach also failed');
        console.log(
          '📝 Please create the admins table manually in your Supabase dashboard:'
        );
        console.log('   1. Go to your Supabase project dashboard');
        console.log('   2. Navigate to SQL Editor');
        console.log('   3. Run this SQL:');
        console.log(createTableSQL);
        console.log(
          '\n   Then run this script again to create the admin user.'
        );
        return;
      }

      console.log('✅ Table created via REST API');
    } else {
      console.log('✅ Table created successfully');
    }

    // Now create the admin user
    console.log('🔄 Creating admin user...');

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@elzatona.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    if (!adminPassword) {
      console.error('❌ Missing INITIAL_ADMIN_PASSWORD in environment variables');
      console.error('Please set INITIAL_ADMIN_PASSWORD in your .env.local file');
      return;
    }

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
        return;
      }

      console.log('✅ Admin record created successfully');
    }

    console.log('\n🎯 Admin setup complete!');
    console.log('You can now login at:');
    console.log('   URL: http://localhost:3001/admin/login');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);
  } catch (error) {
    console.error('❌ Error setting up admin:', error.message);
  }
}

// Run the setup
createAdminsTable();
