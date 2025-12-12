#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Diagnose Admin Login Issue
 *
 * Checks environment configuration and database connection
 */

require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

console.log("🔍 Admin Login Diagnosis\n");
console.log("📋 Environment Configuration:");
console.log(`   APP_ENV: ${process.env.APP_ENV || "not set"}`);
console.log(
  `   NEXT_PUBLIC_APP_ENV: ${process.env.NEXT_PUBLIC_APP_ENV || "not set"}`,
);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || "not set"}\n`);

console.log("📋 Supabase Configuration:");
if (supabaseUrl) {
  const projectRef =
    supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || "unknown";
  console.log(`   URL: ${supabaseUrl}`);
  console.log(`   Project: ${projectRef}`);

  // Detect environment from URL
  if (projectRef.includes("hpnewqkvpnthpohvxcmq")) {
    console.log(`   Environment: 🟢 PRODUCTION`);
  } else if (
    projectRef.includes("kiycimlsatwfqxtfprlr") ||
    projectRef.includes("slfyltsmcivmqfloxpmq") ||
    projectRef.includes("vopfdukvdhnmzzjkxpnj")
  ) {
    console.log(`   Environment: 🟡 TEST`);
  } else {
    console.log(`   Environment: ⚪ UNKNOWN`);
  }
} else {
  console.log("   ❌ NEXT_PUBLIC_SUPABASE_URL not set");
}

if (supabaseKey) {
  console.log(
    `   Service Key: ${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}`,
  );
} else {
  console.log("   ❌ SUPABASE_SERVICE_ROLE_KEY not set");
}

console.log("\n📋 Admin Credentials:");
const adminEmail =
  process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL || "not set";
const adminPassword =
  process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD || "not set";
console.log(`   Email: ${adminEmail}`);
console.log(
  `   Password: ${adminPassword !== "not set" ? "***" : "not set"}\n`,
);

// Check package.json dev script
const fs = require("fs");
const path = require("path");
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
  );
  const devScript = packageJson.scripts?.dev || "";
  const appEnvMatch = devScript.match(/APP_ENV=(\w+)/);
  const nextAppEnvMatch = devScript.match(/NEXT_PUBLIC_APP_ENV=(\w+)/);

  console.log("📋 Dev Script Configuration:");
  if (appEnvMatch) {
    console.log(`   APP_ENV in dev script: ${appEnvMatch[1]}`);
  }
  if (nextAppEnvMatch) {
    console.log(`   NEXT_PUBLIC_APP_ENV in dev script: ${nextAppEnvMatch[1]}`);
  }

  // Check for mismatch
  if (appEnvMatch && supabaseUrl) {
    const scriptEnv = appEnvMatch[1].toLowerCase();
    const isProdUrl = supabaseUrl.includes("hpnewqkvpnthpohvxcmq");
    const isTestUrl =
      supabaseUrl.includes("kiycimlsatwfqxtfprlr") ||
      supabaseUrl.includes("slfyltsmcivmqfloxpmq") ||
      supabaseUrl.includes("vopfdukvdhnmzzjkxpnj");

    console.log("\n⚠️  Environment Mismatch Check:");
    if (scriptEnv === "production" && isTestUrl) {
      console.log(
        "   ❌ MISMATCH: Dev script uses PRODUCTION but .env.local has TEST database",
      );
      console.log(
        "   💡 Fix: Either change dev script to APP_ENV=test OR update .env.local to production",
      );
    } else if (scriptEnv === "test" && isProdUrl) {
      console.log(
        "   ❌ MISMATCH: Dev script uses TEST but .env.local has PRODUCTION database",
      );
      console.log(
        "   💡 Fix: Either change dev script to APP_ENV=production OR update .env.local to test",
      );
    } else {
      console.log("   ✅ Environment matches database");
    }
  }
} catch (error) {
  console.log("   ⚠️  Could not read package.json");
}

console.log("\n💡 Next Steps:");
console.log(
  "   1. Verify Supabase URL matches the environment you want to use",
);
console.log("   2. Verify Service Role Key matches that Supabase project");
console.log(
  "   3. Run: node scripts/check-admin-user.js (after fixing credentials)",
);
console.log(
  "   4. If user exists but password wrong, run: node scripts/setup-admin-user.js",
);
