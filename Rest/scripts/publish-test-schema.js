#!/usr/bin/env node
/**
 * Publish Test Database Schema
 * 
 * This script executes the test database schema SQL in your test Supabase project
 * using the service_role key for full database access.
 * 
 * Usage:
 *   node Rest/scripts/publish-test-schema.js
 * 
 * Requirements:
 *   - .env.test.local must contain:
 *     - NEXT_PUBLIC_SUPABASE_URL (test project URL)
 *     - SUPABASE_SERVICE_ROLE_KEY (test project service_role key)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { config } = require('dotenv');

// Load environment variables from .env.test.local
const projectRoot = process.cwd();
const envFiles = [
  path.resolve(projectRoot, '.env.test.local'),
  path.resolve(projectRoot, '.env.test'),
  path.resolve(projectRoot, '.env.local'),
];

for (const envFile of envFiles) {
  try {
    config({ path: envFile, override: false });
  } catch (error) {
    // File doesn't exist, that's okay
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nMake sure .env.test.local contains these values.');
  process.exit(1);
}

// Create Supabase client with service_role key (full database access)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function publishSchema() {
  try {
    console.log('🚀 Publishing test database schema...');
    console.log(`📊 Supabase URL: ${supabaseUrl.substring(0, 30)}...`);
    console.log('');

    // Read the SQL file
    const sqlFilePath = path.resolve(projectRoot, 'Rest/scripts/test-database-schema.sql');
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`❌ SQL file not found: ${sqlFilePath}`);
      process.exit(1);
    }

    const sql = fs.readFileSync(sqlFilePath, 'utf-8');
    console.log(`📄 Read SQL file: ${sqlFilePath}`);
    console.log(`   Size: ${(sql.length / 1024).toFixed(2)} KB`);
    console.log('');

    // Split SQL into statements (by semicolons, but handle multi-line statements)
    // We'll execute the entire SQL as one query since Supabase supports it
    console.log('⚙️  Executing SQL migration...');
    
    // Use Supabase's REST API to execute raw SQL
    // Note: Supabase doesn't have a direct SQL execution endpoint via JS client
    // We need to use the PostgREST API or execute via RPC
    // For now, we'll split into logical chunks and execute via RPC or direct SQL
    
    // Actually, the best approach is to use Supabase's SQL execution via the dashboard API
    // But that requires a different approach. Let's use the REST API directly.
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({ sql_query: sql }),
    });

    if (!response.ok) {
      // If RPC doesn't exist, we'll need to execute via direct SQL
      // Let's try a different approach - execute statements one by one
      console.log('⚠️  RPC method not available, trying direct SQL execution...');
      console.log('');
      console.log('📝 Since direct SQL execution via API is limited,');
      console.log('   please run the SQL manually in Supabase SQL Editor:');
      console.log('');
      console.log(`   1. Go to: https://supabase.com/dashboard/project/${supabaseUrl.split('//')[1].split('.')[0]}/sql/new`);
      console.log(`   2. Copy contents of: ${sqlFilePath}`);
      console.log('   3. Paste and click "Run"');
      console.log('');
      console.log('   Or use the Supabase CLI:');
      console.log(`   supabase db push --db-url "postgresql://postgres:[PASSWORD]@${supabaseUrl.split('//')[1].split('.')[0]}.supabase.co:5432/postgres" < ${sqlFilePath}`);
      return;
    }

    const result = await response.json();
    console.log('✅ Schema published successfully!');
    console.log('   Result:', result);
    
  } catch (error) {
    console.error('❌ Error publishing schema:', error.message);
    console.error('');
    console.error('💡 Alternative: Run the SQL manually in Supabase SQL Editor');
    console.error(`   File: ${path.resolve(projectRoot, 'Rest/scripts/test-database-schema.sql')}`);
    console.error(`   Dashboard: https://supabase.com/dashboard/project/${supabaseUrl.split('//')[1].split('.')[0]}/sql/new`);
    process.exit(1);
  }
}

// Alternative: Execute SQL statements via Supabase's PostgREST
// We'll need to split the SQL and execute via a custom RPC function
// For now, let's provide clear instructions

async function publishSchemaAlternative() {
  console.log('📋 Publishing Test Database Schema');
  console.log('================================');
  console.log('');
  console.log('Since Supabase API has limitations for direct SQL execution,');
  console.log('please run the SQL manually in the Supabase Dashboard:');
  console.log('');
  console.log('📝 Steps:');
  console.log('');
  console.log('1. Open Supabase SQL Editor:');
  const projectRef = supabaseUrl.split('//')[1].split('.')[0];
  console.log(`   https://supabase.com/dashboard/project/${projectRef}/sql/new`);
  console.log('');
  console.log('2. Copy the SQL file:');
  const sqlFilePath = path.resolve(projectRoot, 'Rest/scripts/test-database-schema.sql');
  console.log(`   ${sqlFilePath}`);
  console.log('');
  console.log('3. Paste into SQL Editor and click "Run"');
  console.log('');
  console.log('✅ After running the SQL, you can create the admin user with:');
  console.log('   node Rest/scripts/create-test-admin.js');
  console.log('');
  
  // Also try to read and display the SQL file location
  if (fs.existsSync(sqlFilePath)) {
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');
    console.log(`📄 SQL file found (${(sql.length / 1024).toFixed(2)} KB)`);
    console.log(`   Contains ${sql.split('CREATE TABLE').length - 1} CREATE TABLE statements`);
    console.log('');
  }
}

// Run the alternative method (provides instructions)
publishSchemaAlternative();


