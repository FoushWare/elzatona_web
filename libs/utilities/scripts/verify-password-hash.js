#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Verify Password Hash Script
 *
 * Tests if a password matches the hash stored in the database
 * and shows how to create/update the correct hash
 *
 * Usage:
 *   Production: node scripts/verify-password-hash.js
 *   Test:       node scripts/verify-password-hash.js --env=test
 *
 * Requirements:
 *   - ADMIN_EMAIL and ADMIN_PASSWORD in .env.local (or .env.test.local for test)
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set
 *
 * What it does:
 *   1. Reads ADMIN_EMAIL and ADMIN_PASSWORD from environment
 *   2. Fetches admin user from database
 *   3. Compares password with stored hash using bcrypt.compare()
 *   4. Shows detailed verification results
 *
 * Password hashing process:
 *   - Uses bcryptjs with BCRYPT_SALT_ROUNDS (default: 10)
 *   - Hash created: bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
 *   - Hash verified: bcrypt.compare(password, storedHash)
 *
 * To create/update admin: node scripts/create-fresh-admin-user.js [--env=test]
 * To check admin status:  node scripts/check-admin-user.js [--env=test]
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Get credentials from environment (no hardcoded secrets)
const adminEmail = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function verifyPasswordHash() {
  try {
    console.log("🔐 Verifying Password Hash\n");

    if (!adminEmail || !adminPassword) {
      console.error("❌ Missing admin credentials in .env.local");
      console.error("Required: ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)");
      console.error("Required: ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)");
      process.exit(1);
    }

    console.log("📋 Configuration:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${"*".repeat(adminPassword.length)}`);
    console.log(`   Database: ${supabaseUrl}\n`);

    // Get admin user from database
    console.log("🔍 Fetching admin user from database...");
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.log("❌ Admin user NOT FOUND in database");
        console.log(`   Email: ${adminEmail}\n`);
        console.log("💡 Create the admin user first:");
        console.log("   node scripts/setup-admin-user.js\n");
      } else {
        console.error("❌ Error:", error.message);
      }
      process.exit(1);
    }

    if (!adminData) {
      console.log("❌ Admin user not found");
      process.exit(1);
    }

    console.log("✅ Admin user found!\n");
    console.log("📋 User Details:");
    console.log(`   ID: ${adminData.id}`);
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Active: ${adminData.is_active ? "✅" : "❌"}`);
    console.log(
      `   Has password_hash: ${adminData.password_hash ? "✅" : "❌"}\n`,
    );

    if (!adminData.password_hash) {
      console.log("❌ No password_hash found in database!");
      console.log("💡 This is why login fails. Need to set password hash.\n");
      console.log("🔄 Creating password hash...");

      // Use salt rounds from environment variable (default: 10)
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
      const newHash = await bcrypt.hash(adminPassword, saltRounds);

      console.log("✅ New password hash created");
      console.log(`   Hash: ${newHash.substring(0, 30)}...\n`);
      console.log("💡 Update the database with this hash");
      console.log("   Run: node scripts/setup-admin-user.js\n");
      return;
    }

    // Show stored hash (first 30 chars for security)
    console.log("🔐 Password Hash Analysis:");
    console.log(
      `   Stored hash: ${adminData.password_hash.substring(0, 30)}...`,
    );
    console.log(`   Hash length: ${adminData.password_hash.length} characters`);

    // Check hash format (bcrypt hashes start with $2a$, $2b$, or $2y$)
    const hashPrefix = adminData.password_hash.substring(0, 4);
    if (hashPrefix.startsWith("$2")) {
      console.log(`   Hash format: ✅ Valid bcrypt hash (${hashPrefix})`);
    } else {
      console.log(
        `   Hash format: ❌ Invalid (should start with $2a$, $2b$, or $2y$)`,
      );
      console.log("   💡 The hash might be stored incorrectly\n");
    }

    // Test password comparison
    console.log("\n🧪 Testing Password Comparison...");
    console.log("   Comparing provided password with stored hash...");

    let isValid = false;
    try {
      isValid = await bcrypt.compare(adminPassword, adminData.password_hash);
    } catch (compareError) {
      console.error("❌ Error comparing password:", compareError.message);
      console.error("   This usually means the hash format is invalid\n");
      console.log("💡 Solution: Recreate the password hash");
      console.log("   Run: node scripts/setup-admin-user.js\n");
      return;
    }

    if (isValid) {
      console.log("   ✅ Password matches! Hash is correct.\n");

      if (!adminData.is_active) {
        console.log("⚠️  BUT: User is not active (is_active = false)");
        console.log("   This will prevent login even with correct password\n");
        console.log("💡 Solution: Activate the user");
        console.log("   Run: node scripts/setup-admin-user.js\n");
      } else {
        console.log("🎉 Everything looks correct!");
        console.log("   ✅ Password hash is valid");
        console.log("   ✅ User is active");
        console.log("   ✅ Login should work!\n");
        console.log("🔍 If login still fails, check:");
        console.log("   1. JWT_SECRET is set correctly");
        console.log("   2. Server is using correct database");
        console.log("   3. Browser console for errors\n");
      }
    } else {
      console.log("   ❌ Password does NOT match stored hash!\n");
      console.log("🔍 Possible causes:");
      console.log("   1. Password was changed but hash not updated");
      console.log("   2. Hash was created with different password");
      console.log("   3. Hash was corrupted or modified\n");
      console.log("💡 Solution: Update the password hash");
      console.log("   Run: node scripts/setup-admin-user.js");
      console.log("   This will create a new hash with the correct password\n");

      // Show what the correct hash should be
      console.log("📝 Creating correct hash for reference...");
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
      const correctHash = await bcrypt.hash(adminPassword, saltRounds);
      console.log(`   Correct hash: ${correctHash.substring(0, 30)}...\n`);
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

verifyPasswordHash();
