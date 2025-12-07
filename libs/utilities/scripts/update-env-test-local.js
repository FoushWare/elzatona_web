#!/usr/bin/env node
/**
 * Update .env.test.local with Encryption Settings
 *
 * Adds BCRYPT_SALT_ROUNDS and ADMIN_OWNER_EMAIL to .env.test.local
 */

const fs = require("fs");
const path = require("path");

const envTestLocalPath = path.join(process.cwd(), ".env.test.local");

// Test environment encryption settings
const updates = {
  BCRYPT_SALT_ROUNDS: "10",
  ADMIN_OWNER_EMAIL:
    process.env.ADMIN_EMAIL ||
    process.env.TEST_ADMIN_EMAIL ||
    "admin@example.com",
};

console.log("🔧 Updating .env.test.local with encryption settings...\n");

try {
  // Read existing .env.test.local
  let content = "";
  if (fs.existsSync(envTestLocalPath)) {
    content = fs.readFileSync(envTestLocalPath, "utf8");
    console.log("✅ Found existing .env.test.local file\n");
  } else {
    console.log("📝 Creating new .env.test.local file\n");
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

      // Update if key is in our updates list
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

  // Add encryption settings documentation comment if not present
  const hasEncryptionComment =
    content.includes("# Encryption Settings") || content.includes("# BCRYPT");
  if (!hasEncryptionComment) {
    // Find a good place to insert
    let insertIndex = 0;
    for (let i = 0; i < updatedLines.length; i++) {
      if (
        updatedLines[i].includes("ADMIN_EMAIL") ||
        updatedLines[i].includes("TEST_ADMIN_EMAIL")
      ) {
        insertIndex = i;
        break;
      }
    }
    const encryptionComment = [
      "",
      "# ============================================",
      "# Encryption & Security Settings (TEST)",
      "# ============================================",
      "# BCRYPT_SALT_ROUNDS: Number of salt rounds for password hashing",
      "#   - Used in: apps/website/src/app/api/admin/auth/route.ts",
      "#   - Function: bcrypt.hash(password, BCRYPT_SALT_ROUNDS)",
      "#   - Validation: bcrypt.compare(password, password_hash)",
      "#   - Default: 10 (must match production)",
      "#",
      "# ADMIN_OWNER_EMAIL: Owner email for protected admin creation API",
      "#   - Used in: apps/website/src/app/api/admin/create/route.ts",
      "#   - Only this email (as super_admin) can create new admin users",
      "# ============================================",
    ];
    updatedLines.splice(insertIndex, 0, ...encryptionComment);
    console.log("   ➕ Added encryption settings documentation");
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
  fs.writeFileSync(envTestLocalPath, updatedContent, "utf8");

  console.log("\n✅ .env.test.local updated successfully!");
  console.log("\n📋 Updated/Added:");
  console.log("   ✅ BCRYPT_SALT_ROUNDS (encryption setting)");
  console.log("   ✅ ADMIN_OWNER_EMAIL (for API protection)\n");
} catch (error) {
  console.error("❌ Error updating .env.test.local:", error.message);
  console.error("\n💡 You can manually add to .env.test.local:");
  console.error("   BCRYPT_SALT_ROUNDS=10");
  console.error("   ADMIN_OWNER_EMAIL=<your-test-admin-email>");
  process.exit(1);
}
