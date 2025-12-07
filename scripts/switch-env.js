#!/usr/bin/env node
/**
 * Environment Switcher Script
 *
 * Helps switch between TEST and PRODUCTION environments
 *
 * Usage:
 *   node scripts/switch-env.js test      # Switch to test
 *   node scripts/switch-env.js production  # Switch to production
 *   node scripts/switch-env.js          # Show current and options
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const envTestLocal = path.join(projectRoot, ".env.test.local");
const envLocal = path.join(projectRoot, ".env.local");

function showCurrentEnv() {
  const { config } = require("dotenv");

  // Load in priority order
  config({ path: envTestLocal, override: false });
  config({ path: envLocal, override: false });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  let currentEnv = "unknown";
  if (supabaseUrl.includes("vopfdukvdhnmzzjkxpnj")) {
    currentEnv = "TEST";
  } else if (supabaseUrl.includes("hpnewqkvpnthpohvxcmq")) {
    currentEnv = "PRODUCTION";
  }

  console.log(`📊 Current Environment: ${currentEnv}`);
  return currentEnv;
}

function switchToTest() {
  console.log("🔄 Switching to TEST environment...\n");

  if (!fs.existsSync(envTestLocal)) {
    console.error("❌ .env.test.local not found!");
    console.error("   Please create it first from Rest/env.test.example");
    process.exit(1);
  }

  // Check if .env.test.local has test project
  const testEnvContent = fs.readFileSync(envTestLocal, "utf-8");
  if (!testEnvContent.includes("vopfdukvdhnmzzjkxpnj")) {
    console.error("❌ .env.test.local does not contain test project URL");
    console.error("   Expected: vopfdukvdhnmzzjkxpnj");
    process.exit(1);
  }

  console.log("✅ Test environment is active");
  console.log("   File: .env.test.local (highest priority)");
  console.log("   Project: vopfdukvdhnmzzjkxpnj");
  console.log("");
  console.log("💡 To use test environment:");
  console.log("   - Tests automatically use .env.test.local");
  console.log("   - For dev server, set: NEXT_PUBLIC_APP_ENV=test");
  console.log("   - Or temporarily rename: mv .env.local .env.local.backup");
}

function switchToProduction() {
  console.log("🔄 Switching to PRODUCTION environment...\n");

  if (!fs.existsSync(envLocal)) {
    console.error("❌ .env.local not found!");
    process.exit(1);
  }

  // Check if .env.local has production project
  const prodEnvContent = fs.readFileSync(envLocal, "utf-8");
  if (!prodEnvContent.includes("hpnewqkvpnthpohvxcmq")) {
    console.error("❌ .env.local does not contain production project URL");
    console.error("   Expected: hpnewqkvpnthpohvxcmq");
    process.exit(1);
  }

  console.log("✅ Production environment is active");
  console.log("   File: .env.local");
  console.log("   Project: hpnewqkvpnthpohvxcmq");
  console.log("");
  console.log("💡 To use production environment:");
  console.log("   - Dev server uses .env.local by default");
  console.log("   - Ensure .env.test.local is not loaded first");
  console.log("   - Or set: NEXT_PUBLIC_APP_ENV=production");
}

const command = process.argv[2]?.toLowerCase();

if (
  !command ||
  command === "help" ||
  command === "--help" ||
  command === "-h"
) {
  console.log("🔄 Environment Switcher");
  console.log("=====================\n");

  showCurrentEnv();
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/switch-env.js test        # Switch to TEST");
  console.log(
    "  node scripts/switch-env.js production  # Switch to PRODUCTION",
  );
  console.log("  node scripts/switch-env.js             # Show current\n");

  console.log("📋 How Environment Priority Works:");
  console.log("   1. .env.test.local (TEST - Highest Priority)");
  console.log("   2. .env.test (TEST)");
  console.log("   3. .env.local (PRODUCTION)");
  console.log("   4. .env (Default)\n");

  console.log("💡 Methods to Switch:");
  console.log("");
  console.log("Method 1: Rename files (temporary)");
  console.log("   Test:    mv .env.local .env.local.backup");
  console.log("   Prod:    mv .env.local.backup .env.local");
  console.log("");
  console.log("Method 2: Set environment variable");
  console.log("   Test:    NEXT_PUBLIC_APP_ENV=test npm run dev");
  console.log("   Prod:    NEXT_PUBLIC_APP_ENV=production npm run dev");
  console.log("");
  console.log("Method 3: Use different commands");
  console.log("   Test:    npm run test (uses .env.test.local)");
  console.log("   Prod:    npm run dev (uses .env.local)");
  console.log("");
} else if (command === "test") {
  switchToTest();
} else if (command === "production" || command === "prod") {
  switchToProduction();
} else {
  console.error(`❌ Unknown command: ${command}`);
  console.error("   Use: test, production, or help");
  process.exit(1);
}
