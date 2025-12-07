#!/usr/bin/env node
/**
 * Fix Admin User in Production Database
 *
 * This script helps you check and fix the admin user in PRODUCTION database
 *
 * Usage:
 *   PRODUCTION_URL=<url> PRODUCTION_KEY=<key> node scripts/fix-admin-production.js
 *
 * Or set in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=<production-url>
 *   SUPABASE_SERVICE_ROLE_KEY=<production-key>
 */

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

// Get production credentials from environment or command line
// Get credentials from environment (no hardcoded secrets)
const supabaseUrl =
  process.env.PRODUCTION_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.PRODUCTION_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

console.log("🔧 Fixing Admin User in PRODUCTION Database\n");

if (!supabaseServiceKey) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY");
  console.error("\n💡 Options:");
  console.error("   1. Set PRODUCTION_KEY environment variable");
  console.error(
    "   2. Update .env.local with production SUPABASE_SERVICE_ROLE_KEY",
  );
  console.error(
    "   3. Pass as: PRODUCTION_KEY=<key> node scripts/fix-admin-production.js",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function fixAdminUser() {
  try {
    console.log("📋 Configuration:");
    console.log(`   Database: ${supabaseUrl}`);
    console.log(`   Email: ${adminEmail}\n`);

    // Check if admin user exists
    console.log("🔍 Checking if admin user exists...");
    const { data: adminData, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error querying database:", checkError.message);
      if (
        checkError.code === "PGRST301" ||
        checkError.message.includes("Invalid API key")
      ) {
        console.error(
          "\n💡 The service role key might be incorrect for this Supabase project",
        );
        console.error(
          "   Please verify the SUPABASE_SERVICE_ROLE_KEY matches the project",
        );
      }
      process.exit(1);
    }

    // Hash password using salt rounds from environment variable
    // This must match BCRYPT_SALT_ROUNDS used in apps/website/src/app/api/admin/auth/route.ts
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    if (adminData) {
      console.log("✅ Admin user FOUND!\n");
      console.log("📋 Current Details:");
      console.log(`   ID: ${adminData.id}`);
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Name: ${adminData.name || "N/A"}`);
      console.log(`   Role: ${adminData.role || "N/A"}`);
      console.log(`   Active: ${adminData.is_active ? "✅ YES" : "❌ NO"}\n`);

      // Check password
      const isValidPassword = await bcrypt.compare(
        adminPassword,
        adminData.password_hash,
      );

      if (isValidPassword && adminData.is_active) {
        console.log("✅ Password is correct and user is active!");
        console.log("🎉 Admin user should be able to login!\n");
        return;
      }

      // Update password and ensure active
      console.log("🔄 Updating admin user...");
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("email", adminEmail);

      if (updateError) {
        console.error("❌ Error updating admin:", updateError.message);
        process.exit(1);
      }

      console.log("✅ Admin user updated successfully!");
      console.log("   ✅ Password hash updated");
      console.log("   ✅ User activated\n");
    } else {
      console.log("⚠️  Admin user NOT FOUND\n");
      console.log("🆕 Creating new admin user...");

      const { data: newAdmin, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: adminEmail,
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
        console.error("❌ Error creating admin:", insertError.message);
        console.error("   Details:", insertError.details);
        process.exit(1);
      }

      console.log("✅ Admin user created successfully!");
      console.log(`   ID: ${newAdmin.id}\n`);
    }

    console.log("🎉 Admin user is ready for login!");
    console.log("🔗 Login at: http://localhost:3000/admin/login");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixAdminUser();
