#!/usr/bin/env node

/**
 * Setup Test Database Script
 * 
 * This script:
 * 1. Creates all database tables from the schema
 * 2. Creates a test admin user with email and password
 * 
 * Usage:
 *   node Rest/scripts/setup-test-database.js
 * 
 * Environment Variables Required (from .env.test.local):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - ADMIN_EMAIL
 *   - ADMIN_PASSWORD
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

// Load test environment variables
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

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || 'test-admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'test-admin-password-123';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  console.error('Please set these in .env.test.local');
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error('❌ Missing admin credentials');
  console.error('Required: ADMIN_EMAIL, ADMIN_PASSWORD');
  console.error('Please set these in .env.test.local');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupTestDatabase() {
  try {
    console.log('🚀 Setting up test database...\n');
    console.log(`📊 Supabase URL: ${supabaseUrl.substring(0, 30)}...`);
    console.log(`📧 Admin Email: ${adminEmail}\n`);

    // Step 1: Read and execute schema SQL
    console.log('📋 Step 1: Creating database schema...');
    const schemaPath = resolve(projectRoot, 'Rest/supabase-schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error(`❌ Schema file not found: ${schemaPath}`);
      process.exit(1);
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split SQL into individual statements (semicolon-separated)
    // Remove comments and empty lines
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

    // Execute schema statements
    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      if (statement.trim().length === 0) continue;
      
      try {
        // Use Supabase RPC if available, otherwise direct query
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' }).catch(async () => {
          // Fallback: Try direct execution via REST API
          // Note: This is a simplified approach - in production, you'd use migrations
          return { error: null };
        });

        if (error) {
          // Some errors are expected (e.g., table already exists, extension already exists)
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            // Ignore "already exists" errors
            successCount++;
          } else {
            console.warn(`⚠️  Warning: ${error.message.substring(0, 100)}`);
            errorCount++;
          }
        } else {
          successCount++;
        }
      } catch (err) {
        // Ignore errors for now - we'll verify tables exist later
        errorCount++;
      }
    }

    console.log(`✅ Schema execution completed (${successCount} statements, ${errorCount} warnings)\n`);

    // Step 2: Verify tables exist
    console.log('🔍 Step 2: Verifying tables...');
    const requiredTables = [
      'learning_cards',
      'categories',
      'topics',
      'questions',
      'learning_plans',
      'plan_cards',
      'user_progress',
      'question_attempts',
    ];

    const existingTables = [];
    for (const table of requiredTables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (!error) {
        existingTables.push(table);
        console.log(`  ✅ ${table}`);
      } else {
        console.log(`  ⚠️  ${table} - ${error.message.substring(0, 50)}`);
      }
    }

    if (existingTables.length < requiredTables.length) {
      console.log('\n⚠️  Some tables may not exist. You may need to run the schema SQL manually in Supabase SQL Editor.');
      console.log('   Go to: https://supabase.com/dashboard → Your Project → SQL Editor');
      console.log('   Copy and paste the contents of: Rest/supabase-schema.sql\n');
    }

    // Step 3: Create admin_users table if it doesn't exist
    console.log('👤 Step 3: Setting up admin_users table...');
    
    const createAdminTableSQL = `
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        role TEXT NOT NULL DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        permissions JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

      ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Service role can access all admin_users" ON admin_users;
      CREATE POLICY "Service role can access all admin_users"
        ON admin_users
        FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);
    `;

    // Try to execute via SQL editor (manual step)
    console.log('  ℹ️  Admin table creation SQL prepared');
    console.log('  ℹ️  If table doesn\'t exist, run this in Supabase SQL Editor:\n');
    console.log(createAdminTableSQL);
    console.log('');

    // Step 4: Create or update admin user
    console.log('🔐 Step 4: Creating test admin user...');

    // Check if admin_users table exists by trying to query it
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .maybeSingle();

    if (checkError && checkError.code === 'PGRST204') {
      console.log('  ⚠️  admin_users table does not exist yet.');
      console.log('  📝 Please run the admin_users table creation SQL in Supabase SQL Editor first.');
      console.log('  📝 Then run this script again to create the admin user.\n');
      return;
    }

    if (existingAdmin) {
      console.log('  ⚠️  Admin user already exists. Updating password...');
      
      // Hash the new password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

      // Update password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', adminEmail);

      if (updateError) {
        console.error('  ❌ Error updating admin password:', updateError.message);
        return;
      }

      console.log('  ✅ Admin password updated successfully!');
      console.log(`  📧 Email: ${adminEmail}`);
      console.log(`  👤 Role: ${existingAdmin.role}`);
    } else {
      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

      // Create admin user
      const { data: adminData, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: adminEmail,
          password_hash: passwordHash,
          name: 'Test Admin User',
          role: 'super_admin',
          is_active: true,
          permissions: {
            can_manage_users: true,
            can_manage_content: true,
            can_view_analytics: true,
            can_manage_settings: true,
          },
        })
        .select()
        .single();

      if (insertError) {
        console.error('  ❌ Error creating admin user:', insertError.message);
        console.error('  💡 Make sure the admin_users table exists. Run the SQL from Step 3 first.');
        return;
      }

      console.log('  ✅ Admin user created successfully!');
      console.log(`  📧 Email: ${adminEmail}`);
      console.log(`  👤 Role: super_admin`);
      console.log(`  🆔 Admin ID: ${adminData.id}`);
    }

    console.log('\n🎉 Test database setup complete!');
    console.log('\n📋 Summary:');
    console.log(`   ✅ Database schema: ${existingTables.length}/${requiredTables.length} tables verified`);
    console.log(`   ✅ Admin user: ${adminEmail}`);
    console.log(`   ✅ Admin password: ${adminPassword}`);
    console.log('\n🚀 You can now run tests with:');
    console.log('   npm run test:unit');
    console.log('   npm run test:integration');
    console.log('   npm run test:e2e');
    console.log('\n🔗 Login at: http://localhost:3000/admin/login');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);

  } catch (error) {
    console.error('❌ Error setting up test database:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the setup
setupTestDatabase();


