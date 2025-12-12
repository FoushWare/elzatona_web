#!/usr/bin/env node
/**
 * Add Helpful Comments to Environment Files
 *
 * Adds comments explaining how to create and check admin user credentials
 * WITHOUT hardcoding any secrets
 *
 * Usage:
 *   node scripts/add-env-comments.js [--env=production|test]
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

// Determine environment
const envArg = process.argv.find((arg) => arg.startsWith("--env="));
const env = envArg ? envArg.split("=")[1] : "production";
const envFile = env === "test" ? ".env.test.local" : ".env.local";

const envFilePath = path.join(process.cwd(), envFile);

// Comments to add (no hardcoded secrets)
const comments = {
  ADMIN_EMAIL: `
# ============================================
# Admin User Credentials
# ============================================
# 
# To create/update admin user:
#   1. Set ADMIN_EMAIL and ADMIN_PASSWORD below
#   2. Run: node scripts/create-fresh-admin-user.js${env === "test" ? " --env=test" : ""}
#   3. This will create bcrypt hash and save to database
#
# To check admin user status:
#   Run: node scripts/check-admin-user.js${env === "test" ? " --env=test" : ""}
#
# To verify password hash:
#   Run: node scripts/verify-password-hash.js${env === "test" ? " --env=test" : ""}
#
# Password hashing:
#   - Uses bcryptjs with BCRYPT_SALT_ROUNDS (default: 10)
#   - Hash stored in admin_users.password_hash column
#   - Login compares password with hash using bcrypt.compare()
#
# Troubleshooting:
#   - If login fails: Run check-admin-user.js to verify user exists
#   - If password wrong: Run create-fresh-admin-user.js to update hash
#   - Restart dev server after changing env variables
#`,

  ADMIN_PASSWORD: `
# Admin password (plain text, used to create bcrypt hash)
# Never commit this file to Git (it's in .gitignore)
# Password is hashed using BCRYPT_SALT_ROUNDS before storing in database
`,

  BCRYPT_SALT_ROUNDS: `
# ============================================
# Password Encryption Settings
# ============================================
# Salt rounds for bcrypt password hashing
# Higher = more secure but slower (default: 10)
# Used when creating password hash: bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
# Used when verifying: bcrypt.compare(password, storedHash)
`,

  JWT_SECRET: `
# ============================================
# JWT Token Configuration
# ============================================
# Secret key for signing JWT tokens
# Must be set (not using default/fallback)
# Used in: apps/website/src/app/api/admin/auth/route.ts
# Change this in production!
`,

  ADMIN_OWNER_EMAIL: `
# ============================================
# Owner Email (API Protection)
# ============================================
# Email of the owner/super_admin
# Used to protect /api/admin/create endpoint
# Only this email can create regular admin users
# Must match ADMIN_EMAIL for owner account
`,
};

console.log(`📝 Adding comments to ${envFile}...\n`);

try {
  // Read existing file
  let content = "";
  if (fs.existsSync(envFilePath)) {
    content = fs.readFileSync(envFilePath, "utf8");
  } else {
    console.error(`❌ File not found: ${envFile}`);
    process.exit(1);
  }

  const lines = content.split("\n");
  const updatedLines = [];
  let lastCommentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this is a key we need to add comments for
    const match = trimmed.match(/^([^=#]+)=(.+)$/);
    if (match) {
      const key = match[1].trim();

      if (comments[key] && lastCommentKey !== key) {
        // Add comment before this key
        updatedLines.push(comments[key].trim());
        lastCommentKey = key;
      }
    }

    // Keep the original line
    updatedLines.push(line);
  }

  // SECURITY: Final check right before write to prevent race condition
  let currentStats;
  try {
    currentStats = fs.statSync(envFilePath);
    if (originalStats && currentStats.mtime.getTime() !== originalStats.mtime.getTime()) {
      console.warn("⚠️  File was modified during processing. Retrying...");
      // Re-read file and retry
      return addCommentsToEnvFile(envFile);
    }
  } catch (_statError) {
    // If stat fails, skip write to be safe
    console.warn("⚠️  Could not verify file state. Skipping write.");
    return;
  }
  
  const updatedContent = updatedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedContent, "utf8");

  console.log(`✅ Comments added to ${envFile}!`);
  console.log(`\n📋 Added comments for:`);
  Object.keys(comments).forEach((key) => {
    if (content.includes(`${key}=`)) {
      console.log(`   ✅ ${key}`);
    }
  });
  console.log(`\n💡 Comments explain:`);
  console.log(`   - How to create/update admin user`);
  console.log(`   - How to check admin status`);
  console.log(`   - How password hashing works`);
  console.log(`   - Troubleshooting steps`);
  console.log(`\n⚠️  No secrets were hardcoded - only instructions`);
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
