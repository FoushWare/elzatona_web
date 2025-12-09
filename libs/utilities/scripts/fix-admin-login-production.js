#!/usr/bin/env node
/**
 * Fix Admin Login for Production Environment
 *
 * This script:
 * 1. Checks current .env.local configuration
 * 2. Updates .env.local with production Supabase credentials
 * 3. Creates/updates admin user in production database
 *
 * Usage:
 *   node scripts/fix-admin-login-production.js
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

// Production Supabase credentials
// ⚠️ WARNING: Never hardcode API keys. Always use environment variables.
// ⚠️ This script should read from environment variables or prompt the user
const PRODUCTION_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const PRODUCTION_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!PRODUCTION_SUPABASE_URL || !PRODUCTION_SERVICE_ROLE_KEY) {
  console.error("❌ Error: Missing required environment variables:");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  console.error("\n💡 Please set these in your .env.local file");
  process.exit(1);
}

// Admin credentials
// ⚠️ WARNING: Never hardcode passwords. Always use environment variables or prompt the user.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ Error: Missing required environment variables:");
  console.error("   - ADMIN_EMAIL");
  console.error("   - ADMIN_PASSWORD");
  console.error("\n💡 Please set these in your .env.local file");
  process.exit(1);
}

const envLocalPath = path.join(process.cwd(), ".env.local");

async function fixAdminLogin() {
  try {
    console.log("🔧 Fixing Admin Login for Production Environment\n");

    // Step 1: Read current .env.local
    console.log("📋 Step 1: Reading current .env.local...");
    let content = "";
    if (fs.existsSync(envLocalPath)) {
      content = fs.readFileSync(envLocalPath, "utf8");
      console.log("✅ Found .env.local\n");
    } else {
      console.log("📝 Creating new .env.local\n");
    }

    // Step 2: Update .env.local with production credentials
    console.log(
      "📋 Step 2: Updating .env.local with production credentials...",
    );
    const lines = content.split("\n");
    const updatedLines = [];
    const updatedKeys = new Set();

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines and comments (keep them)
      if (!trimmed || trimmed.startsWith("#")) {
        updatedLines.push(line);
        continue;
      }

      const match = trimmed.match(/^([^=]+)=(.+)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, "");

        // Update production Supabase URL
        if (key === "NEXT_PUBLIC_SUPABASE_URL") {
          if (value.includes("kiycimlsatwfqxtfprlr")) {
            console.log(`   🔧 Updating ${key}: TEST → PRODUCTION`);
            updatedLines.push(`${key}=${PRODUCTION_SUPABASE_URL}`);
            updatedKeys.add(key);
            continue;
          }
        }

        // Update service role key if it's for test project
        if (key === "SUPABASE_SERVICE_ROLE_KEY") {
          try {
            const parts = value.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                Buffer.from(parts[1], "base64").toString(),
              );
              if (payload.ref === "kiycimlsatwfqxtfprlr") {
                console.log(`   🔧 Updating ${key}: TEST → PRODUCTION`);
                updatedLines.push(`${key}=${PRODUCTION_SERVICE_ROLE_KEY}`);
                updatedKeys.add(key);
                continue;
              }
            }
          } catch (e) {
            // Keep existing if can't parse
          }
        }

        // Update ADMIN_EMAIL
        if (key === "ADMIN_EMAIL" || key === "ADMAIN_EMAIL") {
          console.log(
            `   🔧 Updating ${key === "ADMAIN_EMAIL" ? "ADMAIN_EMAIL (typo)" : "ADMIN_EMAIL"}: ${value || "not set"} → ${ADMIN_EMAIL}`,
          );
          updatedLines.push(`ADMIN_EMAIL=${ADMIN_EMAIL}`);
          updatedKeys.add("ADMIN_EMAIL");
          continue;
        }

        // Keep other lines as-is
        updatedLines.push(line);
      } else {
        updatedLines.push(line);
      }
    }

    // Add missing keys
    if (!updatedKeys.has("NEXT_PUBLIC_SUPABASE_URL")) {
      console.log("   ➕ Adding NEXT_PUBLIC_SUPABASE_URL");
      updatedLines.push(`NEXT_PUBLIC_SUPABASE_URL=${PRODUCTION_SUPABASE_URL}`);
    }
    if (!updatedKeys.has("SUPABASE_SERVICE_ROLE_KEY")) {
      console.log("   ➕ Adding SUPABASE_SERVICE_ROLE_KEY");
      updatedLines.push(
        `SUPABASE_SERVICE_ROLE_KEY=${PRODUCTION_SERVICE_ROLE_KEY}`,
      );
    }
    if (!updatedKeys.has("ADMIN_EMAIL")) {
      console.log("   ➕ Adding ADMIN_EMAIL");
      updatedLines.push(`ADMIN_EMAIL=${ADMIN_EMAIL}`);
    }
    if (!updatedKeys.has("ADMIN_PASSWORD")) {
      console.log("   ➕ Adding ADMIN_PASSWORD");
      updatedLines.push(`ADMIN_PASSWORD=${ADMIN_PASSWORD}`);
    }
    if (!content.includes("BCRYPT_SALT_ROUNDS")) {
      console.log("   ➕ Adding BCRYPT_SALT_ROUNDS");
      updatedLines.push(`BCRYPT_SALT_ROUNDS=10`);
    }
    if (!content.includes("ADMIN_OWNER_EMAIL")) {
      console.log("   ➕ Adding ADMIN_OWNER_EMAIL");
      updatedLines.push(`ADMIN_OWNER_EMAIL=${ADMIN_EMAIL}`);
    }

    // Write updated .env.local
    const updatedContent = updatedLines.join("\n");
    fs.writeFileSync(envLocalPath, updatedContent, "utf8");
    console.log("✅ .env.local updated!\n");

    // Step 3: Create/update admin user in production database
    console.log(
      "📋 Step 3: Creating/updating admin user in production database...",
    );
    const supabase = createClient(
      PRODUCTION_SUPABASE_URL,
      PRODUCTION_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // Check if admin exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", ADMIN_EMAIL)
      .single();

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    if (existingAdmin) {
      console.log("   ⚠️  Admin user exists. Updating password hash...");
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("email", ADMIN_EMAIL);

      if (updateError) {
        console.error("   ❌ Error updating admin:", updateError.message);
        process.exit(1);
      }
      console.log("   ✅ Admin user updated!\n");
    } else {
      console.log("   ➕ Creating new admin user...");
      const { data: newAdmin, error: insertError } = await supabase
        .from("admin_users")
        .insert({
          email: ADMIN_EMAIL,
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
        console.error("   ❌ Error creating admin:", insertError.message);
        process.exit(1);
      }
      console.log("   ✅ Admin user created!\n");
    }

    // Verify password hash
    console.log("📋 Step 4: Verifying password hash...");
    const { data: verifyAdmin } = await supabase
      .from("admin_users")
      .select("password_hash")
      .eq("email", ADMIN_EMAIL)
      .single();

    if (verifyAdmin && verifyAdmin.password_hash) {
      const isValid = await bcrypt.compare(
        ADMIN_PASSWORD,
        verifyAdmin.password_hash,
      );
      if (isValid) {
        console.log("   ✅ Password hash verified!\n");
      } else {
        console.error("   ❌ Password hash verification failed!");
        process.exit(1);
      }
    }

    console.log("🎉 All done! Admin login should work now.\n");
    console.log("📋 Summary:");
    console.log(`   ✅ .env.local updated with production credentials`);
    console.log(`   ✅ Admin user created/updated in production database`);
    console.log(`   ✅ Password hash verified`);
    console.log("\n💡 Next steps:");
    console.log("   1. Restart your dev server: npm run dev");
    console.log("   2. Try logging in at: http://localhost:3000/admin/login");
    console.log(`   Email: ${ADMIN_EMAIL}`);
    // ⚠️ SECURITY: Never log passwords in production
    // Only show password in development/test environments
    if (process.env.NODE_ENV !== 'production' && (process.env.APP_ENV === 'test' || process.env.APP_ENV === 'development')) {
      console.log(`   Password: ${ADMIN_PASSWORD}\n`);
    } else {
      console.log(`   Password: [__REDACTED_SECRET__ - Check .env.local]\n`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixAdminLogin();
