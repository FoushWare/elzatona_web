#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Test Admin Login
 *
 * Tests the admin login API endpoint directly
 */

require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Get credentials from environment (no hardcoded secrets)
const adminEmail = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

console.log("🧪 Testing Admin Login\n");

if (!adminEmail || !adminPassword) {
  console.error("❌ Missing admin credentials in .env.local");
  console.error("Required: ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)");
  console.error("Required: ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)");
  process.exit(1);
}

console.log("📋 Environment Configuration:");
console.log(`   Supabase URL: ${supabaseUrl}`);
console.log(`   Has Service Key: ${supabaseServiceKey ? "✅ Yes" : "❌ No"}`);
console.log(`   Email: ${adminEmail}`);
console.log(`   Password: ${"*".repeat(adminPassword.length)}\n`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

// Test database connection and password
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testLogin() {
  try {
    console.log("🔍 Step 1: Checking if admin user exists...");
    const { data: adminData, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (checkError) {
      if (checkError.code === "PGRST116") {
        console.log("❌ Admin user NOT FOUND in database");
        console.log(`   Database: ${supabaseUrl}`);
        console.log(`   Email: ${adminEmail}\n`);
        return;
      } else {
        console.error("❌ Error:", checkError.message);
        if (checkError.message.includes("Invalid API key")) {
          console.error(
            "   The service role key is incorrect for this database\n",
          );
        }
        return;
      }
    }

    if (!adminData) {
      console.log("❌ Admin user not found");
      return;
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
      console.log("❌ No password hash found!");
      return;
    }

    console.log("🔍 Step 2: Testing password comparison...");
    const isValid = await bcrypt.compare(
      adminPassword,
      adminData.password_hash,
    );

    if (isValid) {
      console.log("✅ Password is CORRECT!\n");
      console.log("🔍 Step 3: Checking why API might fail...\n");

      if (!adminData.is_active) {
        console.log("❌ User is NOT ACTIVE - this will cause login to fail");
        console.log("   The API checks is_active before allowing login\n");
      } else {
        console.log("✅ User is active");
        console.log("✅ Password hash is correct");
        console.log("✅ Everything looks good!\n");
        console.log("💡 If API still fails, check:");
        console.log(
          "   1. Dev server has been restarted after .env.local update",
        );
        console.log("   2. JWT_SECRET is set correctly in .env.local");
        console.log("   3. Server logs for any errors");
        console.log("   4. Browser console for client-side errors\n");
      }
    } else {
      console.log("❌ Password is INCORRECT!");
      console.log(
        "   The password hash does not match the provided password\n",
      );
      console.log("💡 Solution: Update the password hash");
      console.log("   Run: node scripts/update-admin-password-hash.js\n");
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
  }
}

testLogin();
