#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Delete Admin User Script
 *
 * Deletes an admin user from the admin_users table
 * Supports both production and test environments
 *
 * Usage:
 *   node scripts/delete-admin-user.js [--env=production|test] [--email=user@example.com]
 *
 * If --env is not specified, uses .env.local (production)
 * If --email is not specified, uses ADMIN_EMAIL from environment
 */

const { createClient } = require("@supabase/supabase-js");
const readline = require("readline");

// Determine environment
const envArg = process.argv.find((arg) => arg.startsWith("--env="));
const env = envArg ? envArg.split("=")[1] : "production";
const envFile = env === "test" ? ".env.test.local" : ".env.local";

// Load environment variables
require("dotenv").config({ path: envFile });

// Get email from command line or environment
const emailArg = process.argv.find((arg) => arg.startsWith("--email="));
const email = emailArg
  ? emailArg.split("=")[1]
  : process.env.ADMIN_EMAIL || process.env.TEST_ADMIN_EMAIL;

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`🗑️  Delete Admin User (${env.toUpperCase()} environment)\n`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    `Required in ${envFile}: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY`,
  );
  process.exit(1);
}

if (!email) {
  console.error("❌ Missing admin email");
  console.error(
    "   Provide via --email=user@example.com or set ADMIN_EMAIL in environment",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function deleteAdminUser() {
  try {
    console.log("📋 Configuration:");
    console.log(`   Environment: ${env}`);
    console.log(`   Database: ${supabaseUrl}`);
    console.log(`   Email: ${email}\n`);

    // Check if admin exists
    console.log("🔍 Checking if admin user exists...");
    const { data: adminData, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error checking for admin:", checkError.message);
      process.exit(1);
    }

    if (!adminData) {
      console.log("⚠️  Admin user NOT FOUND");
      console.log(`   Email: ${email}\n`);
      rl.close();
      return;
    }

    console.log("✅ Admin user found!\n");
    console.log("📋 User Details:");
    console.log(`   ID: ${adminData.id}`);
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Name: ${adminData.name || "N/A"}`);
    console.log(`   Role: ${adminData.role || "N/A"}\n`);

    // Safety confirmation
    const answer = await question(
      "⚠️  Are you sure you want to DELETE this admin user? (yes/no): ",
    );

    if (answer.toLowerCase() !== "yes") {
      console.log("\n❌ Deletion cancelled");
      rl.close();
      return;
    }

    // Delete the admin user
    console.log("\n🗑️  Deleting admin user...");
    const { error: deleteError } = await supabase
      .from("admin_users")
      .delete()
      .eq("email", email);

    if (deleteError) {
      console.error("❌ Error deleting admin user:", deleteError.message);
      process.exit(1);
    }

    console.log("✅ Admin user deleted successfully!\n");
    console.log(`   Email: ${email}`);
    console.log(`   Environment: ${env}\n`);
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    rl.close();
  }
}

deleteAdminUser();
