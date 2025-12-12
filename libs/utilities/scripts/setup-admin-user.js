#!/usr/bin/env node
/**
/* eslint-disable @typescript-eslint/no-require-imports */
 * Setup Admin User Script
 *
 * Creates or updates an admin user in the admin_users table
 * Uses environment variables from .env.local
 *
 * Usage:
 *   node scripts/setup-admin-user.js
 *
 * Required environment variables:
 *   - ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)
 *   - ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

// Determine environment from command line or default to production
const envArg = process.argv.find((arg) => arg.startsWith("--env="));
const env = envArg ? envArg.split("=")[1] : "production";
const envFile = env === "test" ? ".env.test.local" : ".env.local";

// Load environment variables
require("dotenv").config({ path: envFile });

// Get salt rounds from environment (default: 10)
// This must match BCRYPT_SALT_ROUNDS used in apps/website/src/app/api/admin/auth/route.ts
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  console.error("Please check your .env.local file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupAdminUser() {
  try {
    console.log("🔐 Setting up admin user...\n");

    // Get admin credentials from environment
    // Priority: ADMIN_EMAIL > INITIAL_ADMIN_EMAIL
    const email = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
    const password =
      process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("❌ Missing admin credentials in environment variables");
      console.error("Required: ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)");
      console.error("Required: ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)");
      console.error("\n💡 Please set these in your .env.local file:");
      console.error("   ADMIN_EMAIL=your-email@example.com");
      console.error("   ADMIN_PASSWORD=your-password");
      process.exit(1);
    }

    console.log("📋 Admin Credentials:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${"*".repeat(password.length)}`);
    console.log(`   Supabase: ${supabaseUrl.substring(0, 40)}...\n`);

    // Check if admin already exists
    console.log("🔍 Checking if admin user exists...");
    const { data: existingAdmin, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned (expected if user doesn't exist)
      console.error(
        "❌ Error checking for existing admin:",
        checkError.message,
      );
      console.error(
        "💡 Make sure the admin_users table exists in your Supabase database",
      );
      process.exit(1);
    }

    // Hash password using salt rounds from environment variable
    // This must match the salt rounds used in the auth API route
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (existingAdmin) {
      console.log(
        "⚠️  Admin user already exists. Updating password and ensuring active status...\n",
      );

      // Update password and ensure active
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);

      if (updateError) {
        console.error("❌ Error updating admin password:", updateError.message);
        process.exit(1);
      }

      console.log("✅ Admin password updated successfully!");
      console.log(`   📧 Email: ${email}`);
      console.log(`   👤 Role: ${existingAdmin.role || "super_admin"}`);
      console.log(`   🆔 Admin ID: ${existingAdmin.id}`);
    } else {
      console.log("🆕 Creating new admin user...\n");

      // Create admin user
      const { data: adminData, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: email,
          password_hash: passwordHash,
          name: "Admin User",
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
        console.error(
          "💡 Make sure the admin_users table exists in your Supabase database",
        );
        console.error("   Check the table schema and required fields");
        process.exit(1);
      }

      console.log("✅ Admin user created successfully!");
      console.log(`   📧 Email: ${email}`);
      console.log(`   👤 Role: super_admin`);
      console.log(`   🆔 Admin ID: ${adminData.id}`);
    }

    console.log("\n🎉 Admin user is ready for login!");
    console.log("🔗 Login at: http://localhost:3000/admin/login");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the setup
setupAdminUser();
