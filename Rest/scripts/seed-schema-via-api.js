#!/usr/bin/env node

/**
 * Seed Database Schema via Supabase REST API
 * 
 * This script attempts to execute the SQL schema using Supabase REST API
 * 
 * Usage:
 *   node Rest/scripts/seed-schema-via-api.js
 */

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
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function seedSchema() {
  try {
    console.log('🌱 Attempting to seed database schema via API...\n');
    console.log(`📊 Project: ${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown'}\n`);

    // Read the SQL schema file
    const schemaPath = resolve(projectRoot, 'Rest/scripts/test-database-schema.sql');
    const sql = readFileSync(schemaPath, 'utf-8');

    // Try to execute via Supabase REST API
    // Note: Supabase doesn't expose a direct SQL execution endpoint via REST API
    // DDL operations must be done via SQL Editor or Management API
    
    console.log('⚠️  Supabase REST API does not support direct SQL execution.');
    console.log('   DDL operations (CREATE TABLE, etc.) must be run in SQL Editor.\n');
    
    console.log('📝 Manual Steps Required:\n');
    console.log('1️⃣  Open SQL Editor:');
    console.log(`   https://supabase.com/dashboard/project/${supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1]}/sql/new\n`);
    console.log('2️⃣  Copy the entire SQL file:');
    console.log(`   cat ${schemaPath}\n`);
    console.log('3️⃣  Paste into SQL Editor and click "Run"\n');
    console.log('4️⃣  After tables are created, run:');
    console.log(`   ADMIN_EMAIL=elzatonafoushware@gmail.com ADMIN_PASSWORD='ZatonaFoushware$12' node Rest/scripts/create-test-admin.js\n`);

    // Show the SQL file location
    console.log('📁 SQL File Location:');
    console.log(`   ${schemaPath}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedSchema();


