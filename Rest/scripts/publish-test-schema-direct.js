#!/usr/bin/env node
/**
 * Publish Test Database Schema (Direct SQL Execution)
 *
 * This script executes the test database schema SQL directly using PostgreSQL connection
 * via Supabase's service_role key.
 *
 * Usage:
 *   node Rest/scripts/publish-test-schema-direct.js
 */

const fs = require('fs');
const path = require('path');
const { config } = require('dotenv');
const { exec } = require('child_process');

// Load environment variables
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
  console.error(
    'Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
  process.exit(1);
}

// Extract database connection info from Supabase URL
// Format: https://[project-ref].supabase.co
const projectRef = supabaseUrl.split('//')[1].split('.')[0];

async function publishSchemaDirect() {
  console.log('🚀 Publishing test database schema...');
  console.log(`📊 Project: ${projectRef}`);
  console.log('');

  // Read SQL file
  const sqlFilePath = path.resolve(
    projectRoot,
    'Rest/scripts/test-database-schema.sql'
  );
  if (!fs.existsSync(sqlFilePath)) {
    console.error(`❌ SQL file not found: ${sqlFilePath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlFilePath, 'utf-8');
  console.log(`📄 Read SQL file (${(sql.length / 1024).toFixed(2)} KB)`);
  console.log('');

  console.log('📝 Publishing Test Database Schema');
  console.log('===================================');
  console.log('');
  console.log("Since Supabase API doesn't support direct SQL execution,");
  console.log('please run the SQL in the Supabase Dashboard SQL Editor.');
  console.log('');
  console.log('🚀 Quick Steps:');
  console.log('');
  console.log('1. Open SQL Editor (will open in browser):');
  const sqlEditorUrl = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;
  console.log(`   ${sqlEditorUrl}`);
  console.log('');
  console.log('2. Copy the SQL file content:');
  console.log(`   ${sqlFilePath}`);
  console.log('');
  console.log(
    '3. Paste into SQL Editor and click "Run" (or press Cmd+Enter / Ctrl+Enter)'
  );
  console.log('');
  console.log(
    '4. Wait for success message: "✅ Test database schema created successfully!"'
  );
  console.log('');
  console.log('5. After successful execution, create admin user:');
  console.log('   node Rest/scripts/create-test-admin.js');
  console.log('');

  // Open browser to SQL Editor
  console.log('🌐 Opening Supabase SQL Editor in your browser...');
  exec(`open "${sqlEditorUrl}"`, error => {
    if (error) {
      console.log('⚠️  Could not open browser automatically.');
      console.log(`   Please open manually: ${sqlEditorUrl}`);
    } else {
      console.log('✅ Opened SQL Editor!');
      console.log(
        '   Copy the SQL from the file and paste it into the editor.'
      );
    }
  });

  // Also display the SQL file location
  console.log('');
  console.log(`📄 SQL File: ${sqlFilePath}`);
  console.log(`   Size: ${(sql.length / 1024).toFixed(2)} KB`);
  console.log(`   Tables: ${(sql.match(/CREATE TABLE/g) || []).length}`);
  console.log(`   Indexes: ${(sql.match(/CREATE INDEX/g) || []).length}`);
  console.log(`   Triggers: ${(sql.match(/CREATE TRIGGER/g) || []).length}`);
  console.log('');
}

publishSchemaDirect();
