#!/usr/bin/env node
/**
 * Check if Service Role Key matches the Supabase project
 * 
 * This script verifies that SUPABASE_SERVICE_ROLE_KEY in .env.test.local
 * matches the project specified in NEXT_PUBLIC_SUPABASE_URL
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env.test.local
const projectRoot = process.cwd();
const envTestLocal = resolve(projectRoot, '.env.test.local');

config({ path: envTestLocal });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables in .env.test.local');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Extract project reference from URL
const projectRef = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1];

console.log('🔍 Checking Service Role Key...\n');
console.log(`📊 Supabase URL: ${supabaseUrl.substring(0, 40)}...`);
console.log(`🆔 Project Reference: ${projectRef}`);
console.log(`🔑 Service Role Key: ${serviceRoleKey.substring(0, 20)}...\n`);

// Wrap async code in async function
(async () => {
  try {
    // Decode JWT to check project reference
    const jwtParts = serviceRoleKey.split('.');
    if (jwtParts.length !== 3) {
      console.error('❌ Invalid JWT format');
      process.exit(1);
    }
    
    const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64').toString());
    const keyProjectRef = payload.ref;
    const keyRole = payload.role;
    
    console.log('📋 JWT Payload:');
    console.log(`   Project Ref: ${keyProjectRef}`);
    console.log(`   Role: ${keyRole}\n`);
    
    if (keyRole !== 'service_role') {
      console.error('❌ This is not a service_role key!');
      console.error('   Please get the service_role key from Supabase dashboard.');
      process.exit(1);
    }
    
    if (keyProjectRef !== projectRef) {
      console.error('❌ KEY MISMATCH!');
      console.error(`   URL project: ${projectRef}`);
      console.error(`   Key project: ${keyProjectRef}`);
      console.error('\n📝 To fix:');
      console.error(`   1. Go to: https://supabase.com/dashboard/project/${projectRef}/settings/api`);
      console.error('   2. Get the service_role key');
      console.error('   3. Update SUPABASE_SERVICE_ROLE_KEY in .env.test.local\n');
      process.exit(1);
    }
    
    console.log('✅ Service Role Key matches the project!\n');
    
    // Try to connect and verify
    console.log('🔌 Testing connection...');
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    
    // Try a simple query to verify the key works
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('⚠️  admin_users table does not exist');
        console.log('   Run the schema SQL first: Rest/scripts/test-database-schema.sql\n');
      } else if (error.message.includes('Invalid API key') || error.code === 'PGRST301') {
        console.error('❌ Invalid API key - key does not have access to this project');
        console.error('   Error:', error.message);
        process.exit(1);
      } else {
        console.error('❌ Database error:', error.message);
        process.exit(1);
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('✅ Service Role Key is valid and working\n');
    }
  } catch (error) {
    console.error('❌ Error checking key:', error.message);
    process.exit(1);
  }
})();
