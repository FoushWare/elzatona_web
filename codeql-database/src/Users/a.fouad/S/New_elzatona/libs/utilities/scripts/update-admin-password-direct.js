#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Update Admin Password Hash (Direct Credentials)
 *
 * This version allows you to specify Supabase credentials directly
 *
 * Usage:
 *   SUPABASE_URL=<url> SUPABASE_KEY=<key> node scripts/update-admin-password-direct.js
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

// Get credentials from environment (command line takes precedence)
// No hardcoded secrets - all must come from environment
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

console.log("🔐 Updating Admin Password Hash (Direct Mode)\n");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials");
  console.error("\n💡 Usage:");
  console.error(
    "   SUPABASE_URL=<url> SUPABASE_KEY=<key> ADMIN_EMAIL=<email> ADMIN_PASSWORD=<password> node scripts/update-admin-password-direct.js",
  );
  console.error("\nOr set in .env.local:");
  console.error("   NEXT_PUBLIC_SUPABASE_URL=<url>");
  console.error("   SUPABASE_SERVICE_ROLE_KEY=<key>");
  console.error("   ADMIN_EMAIL=<email>");
  console.error("   ADMIN_PASSWORD=<password>\n");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("❌ Missing admin credentials");
  console.error("Required: ADMIN_EMAIL and ADMIN_PASSWORD");
  console.error("Set via environment variables or .env.local\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function updatePasswordHash() {
  try {
    console.log("📋 Configuration:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${"*".repeat(adminPassword.length)}`);
    console.log(`   Database: ${supabaseUrl}\n`);

    // Check if admin exists
    console.log("🔍 Checking if admin user exists...");
    const { data: adminData, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (checkError) {
      if (checkError.code === "PGRST116") {
        console.log("❌ Admin user NOT FOUND");
        console.log(`   Email: ${adminEmail}\n`);
        console.log("💡 The admin user does not exist in this database.");
        console.log("   Please verify:");
        console.log("   1. You are using the correct Supabase project");
        console.log("   2. The admin user exists in that database");
        console.log("   3. The email address is correct\n");
      } else {
        console.error("❌ Error:", checkError.message);
        if (checkError.message.includes("Invalid API key")) {
          console.error(
            "\n💡 The SUPABASE_KEY is incorrect for this Supabase project",
          );
          console.error(
            "   Please verify the service role key matches the project\n",
          );
        } else if (
          checkError.message.includes("relation") ||
          checkError.message.includes("does not exist")
        ) {
          console.error(
            "\n💡 The admin_users table might not exist in this database",
          );
          console.error("   Please create the table first\n");
        }
      }
      process.exit(1);
    }

    if (!adminData) {
      console.log("❌ Admin user not found");
      process.exit(1);
    }

    console.log("✅ Admin user found!\n");
    console.log("📋 Current Details:");
    console.log(`   ID: ${adminData.id}`);
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Name: ${adminData.name || "N/A"}`);
    console.log(`   Role: ${adminData.role || "N/A"}`);
    console.log(`   Active: ${adminData.is_active ? "✅" : "❌"}`);

    if (adminData.password_hash) {
      console.log(
        `   Has password_hash: ✅ (${adminData.password_hash.length} chars)`,
      );
    } else {
      console.log(`   Has password_hash: ❌ (missing)\n`);
    }

    // Create new password hash using salt rounds from environment variable
    // This must match BCRYPT_SALT_ROUNDS used in apps/website/src/app/api/admin/auth/route.ts
    console.log("\n🔄 Creating new password hash...");
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const newPasswordHash = await bcrypt.hash(adminPassword, saltRounds);

    console.log("✅ New password hash created");
    console.log(`   Hash length: ${newPasswordHash.length} characters`);

    // Verify the hash works
    console.log("🧪 Verifying new hash...");
    const isValid = await bcrypt.compare(adminPassword, newPasswordHash);
    if (!isValid) {
      console.error("❌ ERROR: New hash verification failed!");
      process.exit(1);
    }
    console.log("✅ Hash verification passed!\n");

    // Update the password hash in database
    console.log("💾 Updating password hash in database...");
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_hash: newPasswordHash,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq("email", adminEmail);

    if (updateError) {
      console.error("❌ Error updating password hash:", updateError.message);
      console.error("   Details:", updateError.details);
      process.exit(1);
    }

    console.log("✅ Password hash updated successfully!\n");

    // Verify the update
    console.log("🔍 Verifying update...");
    const { data: updatedAdmin, error: verifyError } = await supabase
      .from("admin_users")
      .select("password_hash, is_active")
      .eq("email", adminEmail)
      .single();

    if (verifyError) {
      console.error(
        "⚠️  Warning: Could not verify update:",
        verifyError.message,
      );
    } else {
      const passwordMatches = await bcrypt.compare(
        adminPassword,
        updatedAdmin.password_hash,
      );
      if (passwordMatches) {
        console.log("✅ Password comparison works with updated hash!");
      } else {
        console.log("❌ Password comparison failed!");
      }
    }

    console.log("\n🎉 Password hash update complete!");
    console.log("✅ Admin user is ready for login");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Active: ✅\n`);
    console.log("🔗 Try logging in at: http://localhost:3000/admin/login\n");
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

updatePasswordHash();
