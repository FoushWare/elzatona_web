#!/usr/bin/env node
/**
/* eslint-disable @typescript-eslint/no-require-imports */
 * Update Admin Password Hash
 *
 * This script updates the password hash for an existing admin user
 * It creates a new bcrypt hash with the correct password and updates the database
 *
 * Usage:
 *   node scripts/update-admin-password-hash.js
 *
 * Or with custom credentials:
 *   ADMIN_EMAIL=<email> ADMIN_PASSWORD=<password> node scripts/update-admin-password-hash.js
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

// Get credentials from environment (no hardcoded secrets)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

console.log("🔐 Updating Admin Password Hash\n");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  console.error("Please set these in your .env.local file");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("❌ Missing admin credentials");
  console.error("Required: ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)");
  console.error("Required: ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)");
  console.error("Please set these in your .env.local file");
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
        console.log("💡 Create the admin user first:");
        console.log("   node scripts/setup-admin-user.js\n");
      } else {
        console.error("❌ Error:", checkError.message);
        if (checkError.message.includes("Invalid API key")) {
          console.error(
            "\n💡 The SUPABASE_SERVICE_ROLE_KEY might be incorrect",
          );
          console.error("   Please verify it matches the Supabase project\n");
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
    console.log(`   Active: ${adminData.is_active ? "✅" : "❌"}`);

    if (adminData.password_hash) {
      console.log(
        `   Has password_hash: ✅ (${adminData.password_hash.length} chars)`,
      );
      console.log(
        `   Hash preview: ${adminData.password_hash.substring(0, 30)}...\n`,
      );
    } else {
      console.log(`   Has password_hash: ❌ (missing)\n`);
    }

    // Create new password hash using salt rounds from environment variable
    // This must match BCRYPT_SALT_ROUNDS used in apps/website/src/app/api/admin/auth/route.ts
    console.log("🔄 Creating new password hash...");
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const newPasswordHash = await bcrypt.hash(adminPassword, saltRounds);

    console.log("✅ New password hash created");
    console.log(`   Hash: ${newPasswordHash.substring(0, 30)}...`);
    console.log(`   Length: ${newPasswordHash.length} characters\n`);

    // Verify the hash works before updating
    console.log("🧪 Verifying new hash...");
    const isValid = await bcrypt.compare(adminPassword, newPasswordHash);
    if (!isValid) {
      console.error("❌ ERROR: New hash verification failed!");
      console.error("   This should never happen. Something is wrong.");
      process.exit(1);
    }
    console.log("✅ Hash verification passed!\n");

    // Update the password hash in database
    console.log("💾 Updating password hash in database...");
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_hash: newPasswordHash,
        is_active: true, // Also ensure user is active
        updated_at: new Date().toISOString(),
      })
      .eq("email", adminEmail);

    if (updateError) {
      console.error("❌ Error updating password hash:", updateError.message);
      console.error("   Details:", updateError.details);
      process.exit(1);
    }

    console.log("✅ Password hash updated successfully!\n");

    // Verify the update worked
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
      const hashMatches = updatedAdmin.password_hash === newPasswordHash;
      if (hashMatches) {
        console.log("✅ Hash matches in database!");
      } else {
        console.log("⚠️  Warning: Hash in database does not match what we set");
      }

      // Test password comparison with updated hash
      const passwordMatches = await bcrypt.compare(
        adminPassword,
        updatedAdmin.password_hash,
      );
      if (passwordMatches) {
        console.log("✅ Password comparison works with updated hash!");
      } else {
        console.log("❌ Password comparison failed with updated hash!");
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
