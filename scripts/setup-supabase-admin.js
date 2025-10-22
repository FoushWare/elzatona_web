#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

console.log('🛡️ Supabase Admin Account Setup\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setupAdminAccount() {
  try {
    console.log('📋 Admin Account Details:');
    const adminEmail = 'admin@elzatona.com';
    const adminPassword = 'ElzatonaAdmin2024!';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   Role: ${adminRole}\n`);

    // Step 1: Create user in Supabase Auth
    console.log('🔄 Creating user in Supabase Auth...');

    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          name: adminName,
          role: adminRole,
        },
      });

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message);

      // If user already exists, try to get the existing user
      if (authError.message.includes('already registered')) {
        console.log(
          '⚠️  User already exists in auth, proceeding with admin table setup...'
        );

        // Get existing user
        const { data: existingUser, error: getUserError } =
          await supabase.auth.admin.getUserByEmail(adminEmail);

        if (getUserError) {
          console.error(
            '❌ Error getting existing user:',
            getUserError.message
          );
          return;
        }

        console.log('✅ Found existing auth user:', existingUser.user?.id);
      } else {
        return;
      }
    } else {
      console.log('✅ Auth user created successfully:', authData.user?.id);
    }

    // Step 2: Create admin record in admins table
    console.log('🔄 Creating admin record in admins table...');

    const userId =
      authData?.user?.id ||
      (await supabase.auth.admin.getUserByEmail(adminEmail)).data.user?.id;

    if (!userId) {
      console.error('❌ Could not get user ID');
      return;
    }

    // Check if admin record already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      console.log('⚠️  Admin record already exists, updating...');

      const { error: updateError } = await supabase
        .from('admins')
        .update({
          name: adminName,
          role: adminRole,
          updated_at: new Date().toISOString(),
        })
        .eq('email', adminEmail);

      if (updateError) {
        console.error('❌ Error updating admin record:', updateError.message);
        return;
      }

      console.log('✅ Admin record updated successfully');
    } else {
      // Create new admin record
      const { error: insertError } = await supabase.from('admins').insert({
        id: userId,
        email: adminEmail,
        name: adminName,
        role: adminRole,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('❌ Error creating admin record:', insertError.message);
        return;
      }

      console.log('✅ Admin record created successfully');
    }

    console.log('\n🎯 Admin account setup complete!');
    console.log('You can now login at:');
    console.log('   URL: http://localhost:3001/admin/login');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);
  } catch (error) {
    console.error('❌ Error setting up admin account:', error.message);
  }
}

// Run the setup
setupAdminAccount();
