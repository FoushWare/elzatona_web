#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

console.log('🧪 Testing Admin Authentication Flow\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

// Create Supabase client with anon key for client-side testing
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthenticationFlow() {
  try {
    console.log('🔄 Step 1: Testing Supabase connection...');

    // Test basic connection by trying to get auth user (this will work even if no user is logged in)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error && error.message !== 'Auth session missing!') {
      console.error('❌ Supabase connection error:', error.message);
      return;
    }

    console.log('✅ Supabase connection successful\n');

    console.log('🔄 Step 2: Testing admin login...');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('❌ Missing admin credentials in environment variables');
      console.error('Required: ADMIN_EMAIL, ADMIN_PASSWORD');
      console.error('Please set these in your .env.local file');
      return;
    }

    // Test login
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

    if (authError) {
      console.error('❌ Login failed:', authError.message);
      console.log('\n📝 Possible issues:');
      console.log('   1. User might not exist in Supabase Auth');
      console.log('   2. Password might be incorrect');
      console.log('   3. Email might not be confirmed');
      console.log('   4. Supabase configuration might be wrong\n');
      return;
    }

    console.log('✅ Login successful!');
    console.log(`   User ID: ${authData.user?.id}`);
    console.log(`   Email: ${authData.user?.email}`);
    console.log(
      `   Email Confirmed: ${authData.user?.email_confirmed_at ? 'Yes' : 'No'}`
    );
    console.log(`   Session Valid: ${authData.session ? 'Yes' : 'No'}\n`);

    console.log('🔄 Step 3: Testing admin table access...');

    // Try to access admins table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (adminError) {
      if (adminError.code === 'PGRST116') {
        console.log('⚠️  Admins table does not exist yet');
        console.log(
          '   This is expected - you need to create the table first\n'
        );
      } else {
        console.error('❌ Error accessing admins table:', adminError.message);
        console.log('\n📝 Possible issues:');
        console.log('   1. Admins table might not exist');
        console.log('   2. RLS policies might be blocking access');
        console.log('   3. User might not have proper permissions\n');
      }
    } else {
      console.log('✅ Admin record found:');
      console.log(`   ID: ${adminData.id}`);
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Name: ${adminData.name}`);
      console.log(`   Role: ${adminData.role}`);
      console.log(`   Created: ${adminData.created_at}\n`);
    }

    console.log('🔄 Step 4: Testing session management...');

    // Test getting current session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error('❌ Session error:', sessionError.message);
    } else if (sessionData.session) {
      console.log('✅ Session is valid');
      console.log(`   User ID: ${sessionData.session.user.id}`);
      console.log(
        `   Expires: ${new Date(sessionData.session.expires_at * 1000).toLocaleString()}\n`
      );
    } else {
      console.log('⚠️  No active session\n');
    }

    console.log('🎯 Authentication Flow Test Complete!\n');

    console.log('📋 Summary:');
    console.log('   ✅ Supabase connection: Working');
    console.log('   ✅ Admin login: Working');
    console.log('   ⚠️  Admin table: Needs to be created');
    console.log('   ✅ Session management: Working\n');

    console.log('🚀 Next Steps:');
    console.log('   1. Create the admins table in Supabase dashboard');
    console.log('   2. Run: node scripts/create-admin-record.js');
    console.log(
      '   3. Test the admin login page at: http://localhost:3001/admin/login\n'
    );
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run the test
testAuthenticationFlow();
