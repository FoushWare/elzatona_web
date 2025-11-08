#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🛡️ Creating Admins Table in Supabase\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createAdminsTable() {
  try {
    console.log('🔄 Creating admins table...');

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
      
      -- Create policy for admins to manage admins
      CREATE POLICY IF NOT EXISTS "Admins can manage admins" ON admins FOR ALL USING (
        auth.role() = 'authenticated' AND 
        EXISTS (SELECT 1 FROM admins WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
      );
      
      -- Create policy for service role to manage admins
      CREATE POLICY IF NOT EXISTS "Service role can manage admins" ON admins FOR ALL USING (
        auth.role() = 'service_role'
      );
      
      -- Create trigger for updated_at
      CREATE TRIGGER IF NOT EXISTS update_admins_updated_at 
        BEFORE UPDATE ON admins 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
    `;

    const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });

    if (error) {
      console.error('❌ Error creating admins table:', error.message);
      return;
    }

    console.log('✅ Admins table created successfully');

    // Now create the admin user
    console.log('🔄 Creating admin user...');

    const adminEmail = 'admin@elzatona.com';
    const adminPassword = 'ElzatonaAdmin2024!';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    // Create user in Supabase Auth
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

    console.log('✅ Auth user created:', authData.user?.id);

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
