#!/usr/bin/env node
/**
 * Set Project Environment
 *
 * Manually switch the entire project between TEST, PRODUCTION, and DEVELOPMENT
 *
 * Usage:
 *   node scripts/set-env.js test        # Switch to TEST
 *   node scripts/set-env.js production  # Switch to PRODUCTION
 *   node scripts/set-env.js dev         # Switch to DEVELOPMENT
 *   node scripts/set-env.js             # Show current
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const envLocal = path.join(projectRoot, ".env.local");
const envTestLocal = path.join(projectRoot, ".env.test.local");
const envDevLocal = path.join(projectRoot, ".env.dev.local");

function updateEnvFile(filePath, envValue) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Update or add APP_ENV
  if (content.includes("APP_ENV=")) {
    // Replace existing APP_ENV
    content = content.replace(/^APP_ENV=.*$/m, `APP_ENV=${envValue}`);
  } else {
    // Add APP_ENV after the header
    const headerMatch = content.match(
      /(# ============================================\n# .*?\n# ============================================\n)/,
    );
    if (headerMatch) {
      content = content.replace(
        headerMatch[0],
        `${headerMatch[0]}\n# Environment Switch\nAPP_ENV=${envValue}\n`,
      );
    } else {
      // Add at the beginning
      content = `# Environment Switch\nAPP_ENV=${envValue}\n\n${content}`;
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
  return true;
}

function showCurrentEnv() {
  const { config } = require("dotenv");
  const fs = require("fs");

  // Load environment files in priority order
  config({ path: envTestLocal, override: false });
  config({ path: envDevLocal, override: false });
  config({ path: envLocal, override: false });

  const appEnv =
    process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || "not set";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  let detectedEnv = "unknown";
  if (supabaseUrl.includes("vopfdukvdhnmzzjkxpnj")) {
    detectedEnv =
      appEnv === "development" ? "TEST/DEV (using test database)" : "TEST";
  } else if (supabaseUrl.includes("hpnewqkvpnthpohvxcmq")) {
    detectedEnv = "PRODUCTION";
  }

  console.log("📊 Current Environment:");
  console.log(`   APP_ENV: ${appEnv}`);
  console.log(`   Detected: ${detectedEnv}`);
  console.log(
    `   Project: ${supabaseUrl ? supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || "unknown" : "not set"}`,
  );

  // Show which env file is being used
  const loadedFiles = [];
  if (fs.existsSync(envTestLocal)) loadedFiles.push(".env.test.local");
  if (fs.existsSync(envDevLocal)) loadedFiles.push(".env.dev.local");
  if (fs.existsSync(envLocal)) loadedFiles.push(".env.local");

  if (loadedFiles.length > 0) {
    console.log(`   Loaded files: ${loadedFiles.join(", ")}`);
  }
}

function setEnvironment(env) {
  const envLower = env.toLowerCase();

  if (
    !["test", "production", "prod", "development", "dev"].includes(envLower)
  ) {
    console.error(`❌ Invalid environment: ${env}`);
    console.error("   Valid options: test, production, dev");
    process.exit(1);
  }

  // Normalize
  let normalizedEnv = envLower;
  if (normalizedEnv === "prod") normalizedEnv = "production";
  if (normalizedEnv === "dev") normalizedEnv = "development";

  console.log(
    `🔄 Switching to ${normalizedEnv.toUpperCase()} environment...\n`,
  );

  // Update .env.local (for production)
  if (normalizedEnv === "production") {
    if (updateEnvFile(envLocal, normalizedEnv)) {
      console.log(`✅ Updated .env.local: APP_ENV=${normalizedEnv}`);
    }
  }

  // Update .env.test.local (for test)
  if (normalizedEnv === "test") {
    if (updateEnvFile(envTestLocal, normalizedEnv)) {
      console.log(`✅ Updated .env.test.local: APP_ENV=${normalizedEnv}`);
    }
  }

  // Update .env.dev.local (for development)
  if (normalizedEnv === "development") {
    // Create .env.dev.local if it doesn't exist
    if (!fs.existsSync(envDevLocal)) {
      console.log(
        "⚠️  .env.dev.local does not exist. Creating it with test database values...",
      );
      // Copy test values as template
      if (fs.existsSync(envTestLocal)) {
        const testContent = fs.readFileSync(envTestLocal, "utf-8");
        const devContent = testContent
          .replace(/APP_ENV=test/g, "APP_ENV=development")
          .replace(/NODE_ENV=test/g, "NODE_ENV=development")
          .replace(
            /NEXT_PUBLIC_APP_ENV=test/g,
            "NEXT_PUBLIC_APP_ENV=development",
          );
        fs.writeFileSync(envDevLocal, devContent, "utf-8");
        console.log(`✅ Created .env.dev.local with test database values`);
      }
    }
    if (updateEnvFile(envDevLocal, normalizedEnv)) {
      console.log(`✅ Updated .env.dev.local: APP_ENV=${normalizedEnv}`);
    }
  }

  console.log("");
  console.log("📋 Next Steps:");
  console.log(
    `   1. Restart your dev server: npm run dev:${normalizedEnv === "production" ? "prod" : normalizedEnv === "development" ? "dev" : "test"}`,
  );
  console.log("   2. Or use: APP_ENV=" + normalizedEnv + " npm run dev");
  console.log("");
  console.log("✅ Environment switched!");
}

const command = process.argv[2]?.toLowerCase();

if (
  !command ||
  command === "help" ||
  command === "--help" ||
  command === "-h"
) {
  console.log("🔄 Set Project Environment");
  console.log("==========================\n");

  showCurrentEnv();
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/set-env.js test        # Switch to TEST");
  console.log("  node scripts/set-env.js production  # Switch to PRODUCTION");
  console.log("  node scripts/set-env.js dev         # Switch to DEVELOPMENT");
  console.log("  node scripts/set-env.js            # Show current\n");

  console.log("📋 Available Commands:");
  console.log("   npm run dev:test    # Run dev server with TEST");
  console.log("   npm run dev:prod    # Run dev server with PRODUCTION");
  console.log("   npm run dev:dev     # Run dev server with DEVELOPMENT");
  console.log(
    "   npm run dev         # Run dev server (default: PRODUCTION)\n",
  );

  console.log("🧪 Tests (always use TEST automatically):");
  console.log("   npm run test:unit       # Unit tests");
  console.log("   npm run test:integration # Integration tests");
  console.log("   npm run test:e2e        # E2E tests\n");
} else {
  setEnvironment(command);
}
