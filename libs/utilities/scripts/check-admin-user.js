#!/usr/bin/env node
/**
 * Check Admin User Script
 *
 * Checks if admin user exists and verifies password
 *
 * Usage:
 *   Production: node scripts/check-admin-user.js
 *   Test:       node scripts/check-admin-user.js --env=test
 *
 * Requirements:
 *   - ADMIN_EMAIL and ADMIN_PASSWORD in .env.local (or .env.test.local for test)
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set
 *
 * What it checks:
 *   - Admin user exists in database
 *   - User is active (is_active = true)
 *   - Password hash is valid (bcrypt.compare)
 *
 * To create/update admin: node scripts/create-fresh-admin-user.js [--env=test]
 * To verify password:      node scripts/verify-password-hash.js [--env=test]
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

// Get Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function checkAdminUser() {
  try {
    // Get admin credentials from environment (no hardcoded secrets)
    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
    const adminPassword =
      process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ Missing admin credentials in .env.local");
      console.error("Required: ADMIN_EMAIL (or INITIAL_ADMIN_EMAIL)");
      console.error("Required: ADMIN_PASSWORD (or INITIAL_ADMIN_PASSWORD)");
      process.exit(1);
    }

    const email = adminEmail;
    const password = adminPassword;

    console.log("🔍 Checking admin user...\n");
    console.log("📋 Configuration:");
    console.log(`   Supabase URL: ${supabaseUrl}`);
    console.log(`   Email: ${email}\n`);

    // Check if admin user exists
    console.log("🔍 Querying admin_users table...");
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.log("❌ Admin user NOT FOUND in database");
        console.log(`   Email: ${email}`);
        console.log(
          "\n💡 Solution: Run `node scripts/setup-admin-user.js` to create the admin user",
        );
      } else {
        console.error("❌ Error querying database:", error.message);
        console.error("   Code:", error.code);
        console.error("   Details:", error.details);
      }
      process.exit(1);
    }

    if (!adminData) {
      console.log("❌ Admin user NOT FOUND");
      console.log(
        "\n💡 Solution: Run `node scripts/setup-admin-user.js` to create the admin user",
      );
      process.exit(1);
    }

    console.log("✅ Admin user FOUND!\n");
    console.log("📋 User Details:");
    console.log(`   ID: ${adminData.id}`);
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Name: ${adminData.name || "N/A"}`);
    console.log(`   Role: ${adminData.role || "N/A"}`);
    console.log(`   Active: ${adminData.is_active ? "✅ YES" : "❌ NO"}`);
    console.log(`   Created: ${adminData.created_at || "N/A"}`);
    console.log(`   Updated: ${adminData.updated_at || "N/A"}\n`);

    // Check if user is active
    if (!adminData.is_active) {
      console.log("⚠️  WARNING: Admin user is NOT ACTIVE");
      console.log("   This will prevent login even with correct password\n");
    }

    // Check password hash
    if (adminData.password_hash) {
      console.log("🔐 Testing password...");
      const isValid = await bcrypt.compare(password, adminData.password_hash);

      if (isValid) {
        console.log("✅ Password is CORRECT\n");
        console.log("🎉 Admin user is ready for login!");
        if (!adminData.is_active) {
          console.log("\n⚠️  BUT: User is inactive. Need to activate first.");
        }
      } else {
        console.log("❌ Password is INCORRECT");
        console.log(
          "   The password hash in database does not match the provided password\n",
        );
        console.log("💡 Solution: Update the password hash");
        console.log("   Run: node scripts/setup-admin-user.js");
        console.log("   (This will update the password hash)");
      }
    } else {
      console.log("⚠️  WARNING: No password_hash found in database");
      console.log("   This will prevent login\n");
      console.log(
        "💡 Solution: Run `node scripts/setup-admin-user.js` to set password",
      );
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

checkAdminUser();
