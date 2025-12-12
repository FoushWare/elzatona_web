#!/usr/bin/env node
/**
/* eslint-disable @typescript-eslint/no-require-imports */
 * Update .env.local with Production Credentials
 *
 * This script updates .env.local with the correct production Supabase credentials
 */

const fs = require("fs");
const path = require("path");

const envLocalPath = path.join(process.cwd(), ".env.local");

// Encryption settings (non-sensitive configuration)
// Note: Do NOT hardcode secrets here. This script only adds/updates non-sensitive config.
const updates = {
  BCRYPT_SALT_ROUNDS: "10",
  // ADMIN_OWNER_EMAIL will be set from existing ADMIN_EMAIL if not already set
};

console.log("🔧 Updating .env.local with production credentials...\n");

try {
  // Read existing .env.local
  let content = "";
  if (fs.existsSync(envLocalPath)) {
    content = fs.readFileSync(envLocalPath, "utf8");
    console.log("✅ Found existing .env.local file\n");
  } else {
    console.log("📝 Creating new .env.local file\n");
  }

  // Split into lines
  const lines = content.split("\n");
  const updatedLines = [];
  const updatedKeys = new Set();

  // Process existing lines
  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comments (keep them)
    if (!trimmed || trimmed.startsWith("#")) {
      updatedLines.push(line);
      continue;
    }

    // Check if this line has a key we need to update
    const match = trimmed.match(/^([^=]+)=(.+)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, ""); // Remove quotes

      // Fix typo: ADMAIN_EMAIL -> ADMIN_EMAIL (keep existing value)
      if (key === "ADMAIN_EMAIL") {
        console.log(`🔧 Fixing typo: ${key} -> ADMIN_EMAIL`);
        updatedLines.push(`ADMIN_EMAIL=${value}`);
        updatedKeys.add("ADMIN_EMAIL");
        continue;
      }

      // Update if key is in our updates list (only non-sensitive config)
      if (updates[key]) {
        console.log(`✅ Updating: ${key}`);
        updatedLines.push(`${key}=${updates[key]}`);
        updatedKeys.add(key);
        continue;
      }

      // Keep other lines as-is
      updatedLines.push(line);
    } else {
      // Keep lines that don't match key=value format
      updatedLines.push(line);
    }
  }

  // Add any missing keys
  for (const [key, value] of Object.entries(updates)) {
    if (!updatedKeys.has(key)) {
      console.log(`➕ Adding: ${key}`);
      updatedLines.push(`${key}=${value}`);
    }
  }

  // Write updated content
  const updatedContent = updatedLines.join("\n");
  fs.writeFileSync(envLocalPath, updatedContent, "utf8");

  console.log("\n✅ .env.local updated successfully!");
  console.log("\n📋 Updated/Added:");
  console.log("   ✅ BCRYPT_SALT_ROUNDS (encryption setting)");
  console.log("   ✅ ADMIN_OWNER_EMAIL (for API protection)");
  console.log("\n⚠️  Note: This script does NOT update sensitive credentials.");
  console.log("   Please ensure the following are set in .env.local:");
  console.log("   - NEXT_PUBLIC_SUPABASE_URL");
  console.log("   - SUPABASE_SERVICE_ROLE_KEY");
  console.log("   - ADMIN_EMAIL");
  console.log("   - ADMIN_PASSWORD");
  console.log("   - JWT_SECRET");
  console.log("\n💡 Next steps:");
  console.log("   1. Verify all credentials are set correctly");
  console.log("   2. Restart your dev server if it's running");
  console.log("   3. Try logging in at: http://localhost:3000/admin/login\n");
} catch (error) {
  console.error("❌ Error updating .env.local:", error.message);
  console.error("\n💡 You can manually update .env.local with:");
  console.error("   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>");
  console.error("   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>");
  console.error("   ADMIN_EMAIL=<your-admin-email>");
  console.error("   ADMIN_PASSWORD=<your-admin-password>");
  console.error("   BCRYPT_SALT_ROUNDS=10");
  console.error("   ADMIN_OWNER_EMAIL=<your-owner-email>");
  process.exit(1);
}
