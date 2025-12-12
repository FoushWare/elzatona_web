#!/usr/bin/env node
/**
/* eslint-disable @typescript-eslint/no-require-imports */
 * Fix Production Anon Key
 *
 * Updates NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to match production project
 *
 * Usage:
 *   node scripts/fix-production-anon-key.js <production-anon-key>
 *
 * Or run interactively:
 *   node scripts/fix-production-anon-key.js
 */

const fs = require("fs");
const path = require("path");

const envLocalPath = path.join(process.cwd(), ".env.local");

// Get anon key from command line or prompt
const anonKey = process.argv[2];

if (!anonKey) {
  console.log("❌ Production anon key required");
  console.log("");
  console.log("Usage:");
  console.log(
    "  node scripts/fix-production-anon-key.js <production-anon-key>",
  );
  console.log("");
  console.log("Get the anon key from:");
  console.log(
    "  https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api",
  );
  console.log("");
  console.log("Then run:");
  console.log("  node scripts/fix-production-anon-key.js <your-anon-key>");
  process.exit(1);
}

// Verify the key is for production project
try {
  const parts = anonKey.split(".");
  if (parts.length === 3) {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    const projectRef = payload.ref;

    if (projectRef !== "hpnewqkvpnthpohvxcmq") {
      console.error(
        `❌ Error: Anon key is for project "${projectRef}", not production "hpnewqkvpnthpohvxcmq"`,
      );
      console.error("   Please get the anon key for the production project");
      process.exit(1);
    }

    console.log(
      "✅ Verified: Anon key is for production project (hpnewqkvpnthpohvxcmq)",
    );
  }
} catch (e) {
  console.warn("⚠️  Could not verify anon key format, proceeding anyway...");
}

console.log("\n📝 Updating .env.local...\n");

try {
  // Read existing file
  let content = "";
  if (fs.existsSync(envLocalPath)) {
    content = fs.readFileSync(envLocalPath, "utf8");
  } else {
    console.error("❌ .env.local not found");
    process.exit(1);
  }

  const lines = content.split("\n");
  const updatedLines = [];
  let found = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check if this is the anon key line
    if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) {
      console.log(`   🔧 Updating: ${trimmed.substring(0, 50)}...`);
      updatedLines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`);
      found = true;
    } else {
      updatedLines.push(line);
    }
  }

  // Add if not found
  if (!found) {
    console.log("   ➕ Adding NEXT_PUBLIC_SUPABASE_ANON_KEY");
    updatedLines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`);
  }

  // Write updated content
  const updatedContent = updatedLines.join("\n");
  fs.writeFileSync(envLocalPath, updatedContent, "utf8");

  console.log("\n✅ .env.local updated with production anon key!");
  console.log("\n💡 Next steps:");
  console.log(
    '   1. Restart dev server: pkill -f "npm run dev" && npm run dev',
  );
  console.log("   2. Test: curl http://localhost:3000/api/plans");
  console.log("   3. Verify: node scripts/verify-supabase-keys.js\n");
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
