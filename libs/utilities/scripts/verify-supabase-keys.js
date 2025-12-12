#!/usr/bin/env node
/**
/* eslint-disable @typescript-eslint/no-require-imports */
 * Verify Supabase Keys Match Project
 *
 * Checks if Supabase URL and anon key match the same project
 *
 * Usage:
 *   node scripts/verify-supabase-keys.js [--env=production|test]
 */

require("dotenv").config({
  path: process.argv.includes("--env=test") ? ".env.test.local" : ".env.local",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Verifying Supabase Keys\n");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
  process.exit(1);
}

// Extract project ref from URL
const urlProjectRef =
  supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || "unknown";

// Decode JWT to get project ref from key
let keyProjectRef = "unknown";
try {
  const parts = supabaseAnonKey.split(".");
  if (parts.length === 3) {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    keyProjectRef = payload.ref || "unknown";
  }
} catch (e) {
  console.error("❌ Error decoding anon key:", e.message);
  process.exit(1);
}

console.log("📋 Configuration:");
console.log(`   Supabase URL: ${supabaseUrl}`);
console.log(`   Project from URL: ${urlProjectRef}`);
console.log(`   Project from Anon Key: ${keyProjectRef}`);
console.log("");

if (urlProjectRef === keyProjectRef) {
  console.log(
    "✅ Keys match! Anon key is correct for this Supabase project.\n",
  );
  process.exit(0);
} else {
  console.log("❌ MISMATCH! Anon key does not match Supabase URL project.\n");
  console.log("🔧 Fix:");
  console.log(`   URL points to: ${urlProjectRef}`);
  console.log(`   Anon key is for: ${keyProjectRef}`);
  console.log("");
  console.log("💡 Solution:");
  console.log("   1. Go to Supabase Dashboard:");
  if (urlProjectRef === "hpnewqkvpnthpohvxcmq") {
    console.log(
      "      https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api",
    );
    console.log('   2. Copy the "anon" key for production project');
  } else if (urlProjectRef === "kiycimlsatwfqxtfprlr") {
    console.log(
      "      https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api",
    );
    console.log('   2. Copy the "anon" key for test project');
  } else {
    console.log(
      `      https://supabase.com/dashboard/project/${urlProjectRef}/settings/api`,
    );
    console.log('   2. Copy the "anon" key for this project');
  }
  console.log(
    "   3. Update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (or .env.test.local)",
  );
  console.log("   4. Restart dev server\n");
  process.exit(1);
}
