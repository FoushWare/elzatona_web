#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Create Fresh Admin User Script
 *
 * Deletes existing admin user (if exists) and creates a fresh one
 * Supports both production and test environments
 *
 * Usage:
 *   Production: node scripts/create-fresh-admin-user.js
 *   Test:       node scripts/create-fresh-admin-user.js --env=test
 *
 * Requirements:
 *   - ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment file
 *   - BCRYPT_SALT_ROUNDS from environment (default: 10)
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set
 *
 * What it does:
 *   1. Reads credentials from .env.local (production) or .env.test.local (test)
 *   2. Deletes existing admin user (if exists)
 *   3. Creates bcrypt hash: bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
 *   4. Inserts new admin user with role='super_admin', is_active=true
 *
 * To check admin user: node scripts/check-admin-user.js [--env=test]
 * To verify password:  node scripts/verify-password-hash.js [--env=test]
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

// Determine environment
const envArg = process.argv.find((arg) => arg.startsWith("--env="));
const env = envArg ? envArg.split("=")[1] : "production";
const envFile = env === "test" ? ".env.test.local" : ".env.local";

// Load environment variables
require("dotenv").config({ path: envFile });

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Get admin credentials (test environment may use TEST_ADMIN_EMAIL)
const adminEmail =
  env === "test"
    ? process.env.TEST_ADMIN_EMAIL || process.env.ADMIN_EMAIL
    : process.env.ADMIN_EMAIL;
const adminPassword =
  env === "test"
    ? process.env.TEST_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD
    : process.env.ADMIN_PASSWORD;

// Get salt rounds from environment (default: 10)
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

console.log(`🆕 Create Fresh Admin User (${env.toUpperCase()} environment)\n`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    `Required in ${envFile}: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY`,
  );
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("❌ Missing admin credentials");
  console.error(
    `Required in ${envFile}: ${env === "test" ? "TEST_ADMIN_EMAIL or ADMIN_EMAIL" : "ADMIN_EMAIL"}, ${env === "test" ? "TEST_ADMIN_PASSWORD or ADMIN_PASSWORD" : "ADMIN_PASSWORD"}`,
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createFreshAdminUser() {
  try {
    console.log("📋 Configuration:");
    console.log(`   Environment: ${env}`);
    console.log(`   Database: ${supabaseUrl}`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Salt Rounds: ${saltRounds}\n`);

    // Step 1: Delete existing user if exists
    console.log("🔍 Step 1: Checking for existing admin user...");
    const { data: existingAdmin, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error(
        "❌ Error checking for existing admin:",
        checkError.message,
      );
      process.exit(1);
    }

    if (existingAdmin) {
      console.log("⚠️  Existing admin user found. Deleting...");
      const { error: deleteError } = await supabase
        .from("admin_users")
        .delete()
        .eq("email", adminEmail);

      if (deleteError) {
        console.error("❌ Error deleting existing admin:", deleteError.message);
        process.exit(1);
      }
      console.log("✅ Existing admin user deleted\n");
    } else {
      console.log("✅ No existing admin user found\n");
    }

    // Step 2: Create password hash
    console.log("🔐 Step 2: Creating password hash...");
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);
    console.log(`✅ Password hash created (salt rounds: ${saltRounds})\n`);

    // Step 3: Verify hash works
    console.log("🧪 Step 3: Verifying password hash...");
    const isValid = await bcrypt.compare(adminPassword, passwordHash);
    if (!isValid) {
      console.error("❌ ERROR: Password hash verification failed!");
      process.exit(1);
    }
    console.log("✅ Password hash verified\n");

    // Step 4: Create new admin user
    console.log("🆕 Step 4: Creating new admin user...");
    const { data: newAdmin, error: insertError } = await supabase
      .from("admin_users")
      .insert({
        email: adminEmail,
        password_hash: passwordHash,
        name: "Super Admin",
        role: "super_admin",
        is_active: true,
        permissions: {
          can_manage_users: true,
          can_manage_content: true,
          can_view_analytics: true,
          can_manage_settings: true,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Error creating admin user:", insertError.message);
      console.error("   Details:", insertError.details);
      process.exit(1);
    }

    console.log("✅ Admin user created successfully!\n");
    console.log("📋 User Details:");
    console.log(`   ID: ${newAdmin.id}`);
    console.log(`   Email: ${newAdmin.email}`);
    console.log(`   Name: ${newAdmin.name}`);
    console.log(`   Role: ${newAdmin.role}`);
    console.log(`   Active: ${newAdmin.is_active ? "✅" : "❌"}\n`);

    console.log("🎉 Fresh admin user is ready for login!");
    console.log(`🔗 Login at: http://localhost:3000/admin/login`);
    console.log(`   Email: ${adminEmail}`);
    // SECURITY: Do not log password in plain text
    console.log(`   Password: [__REDACTED_SECRET__ - check your environment variables or database]`);
    console.log(`   Environment: ${env}\n`);
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createFreshAdminUser();
