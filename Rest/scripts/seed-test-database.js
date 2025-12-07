#!/usr/bin/env node

/**
 * Seed Test Database Schema
 *
 * This script uses the Supabase client to execute the SQL schema
 * directly in your test database.
 *
 * Usage:
 *   node Rest/scripts/seed-test-database.js
 *
 * Required Environment Variables (from .env.test.local):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { config } = require('dotenv');

// Load environment variables
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
  console.error(
    'Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
  console.error('Please set these in .env.test.local');
  process.exit(1);
}

// Create Supabase client with service role key (has full database access)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedDatabase() {
  try {
    console.log('🌱 Seeding test database schema...\n');
    console.log(
      `📊 Project: ${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown'}\n`
    );

    // Read the SQL schema file
    const schemaPath = resolve(
      projectRoot,
      'Rest/scripts/test-database-schema.sql'
    );
    const sql = readFileSync(schemaPath, 'utf-8');

    // Split SQL into individual statements (semicolon-separated)
    // Remove comments and empty lines
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    let successCount = 0;
    let errorCount = 0;

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip empty statements
      if (!statement || statement.length < 10) continue;

      try {
        // Use Supabase RPC to execute raw SQL
        // Note: Supabase doesn't have a direct SQL execution endpoint via JS client
        // We need to use the REST API or execute via SQL Editor
        // For now, we'll use the REST API approach

        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement,
        });

        if (error) {
          // If RPC doesn't exist, try direct REST API call
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: supabaseServiceKey,
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({ sql_query: statement }),
          });

          if (!response.ok) {
            // Try alternative: execute via PostgREST
            // Some statements might fail if they're DDL, that's okay
            console.log(
              `⚠️  Statement ${i + 1} may need manual execution (DDL statement)`
            );
            errorCount++;
            continue;
          }
        }

        successCount++;
        if ((i + 1) % 10 === 0) {
          console.log(
            `✅ Executed ${i + 1}/${statements.length} statements...`
          );
        }
      } catch (err) {
        // DDL statements (CREATE TABLE, etc.) can't be executed via REST API
        // They need to be run in SQL Editor
        if (statement.match(/^(CREATE|ALTER|DROP|INSERT)/i)) {
          console.log(
            `⚠️  Statement ${i + 1} is DDL - needs manual execution in SQL Editor`
          );
          errorCount++;
        } else {
          console.error(`❌ Error executing statement ${i + 1}:`, err.message);
          errorCount++;
        }
      }
    }

    console.log(`\n📊 Results:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ⚠️  DDL/Manual: ${errorCount}`);
    console.log(
      `\n⚠️  IMPORTANT: DDL statements (CREATE TABLE, etc.) must be run in Supabase SQL Editor!`
    );
    console.log(`\n📝 Next Steps:`);
    console.log(
      `   1. Go to: https://supabase.com/dashboard/project/${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1]}/sql/new`
    );
    console.log(
      `   2. Copy and paste the entire contents of: Rest/scripts/test-database-schema.sql`
    );
    console.log(`   3. Click "Run"`);
    console.log(
      `   4. Then run: ADMIN_EMAIL=elzatonafoushware@gmail.com ADMIN_PASSWORD='ZatonaFoushware$12' node Rest/scripts/create-test-admin.js`
    );
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
seedDatabase();
