#!/usr/bin/env node

/**
 * Seed Database Schema Directly via Supabase Client
 * 
 * This script uses the Supabase client with service role key
 * to execute SQL directly in your test database.
 * 
 * Usage:
 *   node Rest/scripts/seed-schema-direct.js
 */

const { createClient } = require('@supabase/supabase-js');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { config } = require('dotenv');

// Load environment variables from .env.test.local
const projectRoot = process.cwd();
const envFiles = [
  resolve(projectRoot, '.env.test.local'),
  resolve(projectRoot, '.env.test'),
  resolve(projectRoot, '.env.local'),
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
  console.error('Please ensure .env.test.local is configured correctly');
  process.exit(1);
}

// Create Supabase client with service role key (has full database access)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedSchema() {
  try {
    console.log('🌱 Seeding database schema via Supabase client...\n');
    console.log(`📊 Project: ${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown'}\n`);

    // Read the SQL schema file
    const schemaPath = resolve(projectRoot, 'Rest/scripts/test-database-schema.sql');
    const sql = readFileSync(schemaPath, 'utf-8');

    // Split SQL into statements (semicolon-separated)
    // Remove comments and empty lines
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        const trimmed = s.trim();
        return trimmed.length > 0 
          && !trimmed.startsWith('--') 
          && !trimmed.startsWith('/*')
          && trimmed !== 'SELECT';
      });

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Execute each statement using Supabase REST API
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip very short statements (likely empty or just whitespace)
      if (!statement || statement.length < 10) continue;

      try {
        // Use Supabase REST API to execute SQL
        // Note: Supabase doesn't support direct SQL execution via JS client
        // We need to use the Management API or SQL Editor
        // For now, we'll use the REST API with rpc call
        
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({ sql_query: statement }),
        });

        if (!response.ok) {
          // DDL statements (CREATE TABLE, etc.) can't be executed via REST API
          // They need to be run in SQL Editor
          if (statement.match(/^(CREATE|ALTER|DROP|INSERT)/i)) {
            console.log(`⚠️  Statement ${i + 1}: DDL statement - needs manual execution`);
            errorCount++;
            continue;
          }
          
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        successCount++;
        if ((i + 1) % 10 === 0) {
          console.log(`✅ Processed ${i + 1}/${statements.length} statements...`);
        }
      } catch (err) {
        // DDL statements (CREATE TABLE, etc.) can't be executed via REST API
        if (statement.match(/^(CREATE|ALTER|DROP|INSERT)/i)) {
          console.log(`⚠️  Statement ${i + 1}: DDL statement - needs manual execution`);
          errorCount++;
        } else {
          console.error(`❌ Error executing statement ${i + 1}:`, err.message);
          errors.push({ statement: i + 1, error: err.message });
          errorCount++;
        }
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ⚠️  DDL/Manual: ${errorCount}`);
    
    if (errors.length > 0) {
      console.log(`\n❌ Errors:`);
      errors.forEach(({ statement, error }) => {
        console.log(`   Statement ${statement}: ${error}`);
      });
    }

    console.log(`\n⚠️  IMPORTANT: DDL statements (CREATE TABLE, ALTER TABLE, etc.) must be run in Supabase SQL Editor!`);
    console.log(`\n📝 Next Steps:`);
    console.log(`   1. Go to: https://supabase.com/dashboard/project/${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1]}/sql/new`);
    console.log(`   2. Copy and paste the entire contents of: Rest/scripts/test-database-schema.sql`);
    console.log(`   3. Click "Run"`);
    console.log(`   4. Then run: node Rest/scripts/create-test-admin.js`);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
seedSchema();


