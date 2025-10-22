#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🛡️ Complete Admin Setup\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setupCompleteAdmin() {
  try {
    console.log('🔄 Step 1: Creating admins table...');

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

    // Try to execute the SQL using Supabase client
    const { error: sqlError } = await supabase.rpc('exec', {
      sql: createTableSQL,
    });

    if (sqlError) {
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

    console.log('\n🔄 Step 2: Creating admin user in Supabase Auth...');

    const adminEmail = 'afouadsoftwareengineer@gmail.com';
    const adminPassword = 'ZatonaFoushware$8888';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    // Check if user already exists
    const { data: existingUsers, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }

    const existingUser = existingUsers.users.find(u => u.email === adminEmail);

    if (existingUser) {
      console.log('✅ Admin user already exists in auth:', existingUser.id);

      // Check if admin record already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', adminEmail)
        .single();

      if (existingAdmin) {
        console.log('✅ Admin record already exists');
        console.log('\n🎯 Admin setup complete!');
        console.log('You can now login at:');
        console.log('   URL: http://localhost:3001/admin/login');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}\n`);
        return;
      } else {
        // Create admin record for existing user
        const { error: insertError } = await supabase.from('admins').insert({
          id: existingUser.id,
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

      console.log('✅ Auth user created successfully:', authData.user?.id);

      // Create admin record
      const { error: insertError } = await supabase.from('admins').insert({
        id: authData.user.id,
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
setupCompleteAdmin();
