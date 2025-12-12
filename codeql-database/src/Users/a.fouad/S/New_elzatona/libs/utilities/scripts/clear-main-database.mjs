#!/usr/bin/env node

/**
 * Clear tables in zatona-web (main database) before seeding
 *
 * This script truncates all tables that will be populated by the seeding script.
 * It handles foreign key constraints by deleting in the correct order.
 *
 * Usage: node scripts/clear-main-database.mjs
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, "..", ".env.local") });
const MAIN_KEY_FROM_LOCAL = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase project IDs (verified via MCP)
const MAIN_PROJECT_ID = "hpnewqkvpnthpohvxcmq"; // zatona-web
const MAIN_PROJECT_URL = "https://hpnewqkvpnthpohvxcmq.supabase.co";

// Get main database URL and key
const MAIN_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes(MAIN_PROJECT_ID)
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : MAIN_PROJECT_URL;
const MAIN_KEY = MAIN_KEY_FROM_LOCAL;

if (!MAIN_KEY) {
  console.error("❌ Error: Missing SUPABASE_SERVICE_ROLE_KEY");
  console.error("Please set SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const mainClient = createClient(MAIN_URL, MAIN_KEY);

/**
 * Clear all tables in the correct order (respecting foreign key constraints)
 */
async function clearTables() {
  console.log("🗑️  Clearing tables in zatona-web (main database)...\n");
  console.log(`   Database: ${MAIN_PROJECT_ID}`);
  console.log(`   URL: ${MAIN_URL}\n`);

  // Tables to clear in order (respecting foreign key dependencies)
  // Delete child tables first, then parent tables
  const tables = [
    "plan_questions", // References questions, learning_plans, topics
    "plan_cards", // References learning_plans, learning_cards
    "card_categories", // References learning_cards, categories
    "questions", // References categories, topics, learning_cards
    "learning_plans", // Standalone (but referenced by plan_questions, plan_cards)
  ];

  let totalDeleted = 0;

  // Use RPC or direct SQL for more reliable deletion
  // First, try to get counts
  const counts = {};
  for (const table of tables) {
    try {
      const { count } = await mainClient
        .from(table)
        .select("*", { count: "exact", head: true });
      counts[table] = count || 0;
    } catch (_error) {
      counts[table] = 0;
    }
  }

  // Delete in batches using the client
  for (const table of tables) {
    try {
      const beforeCount = counts[table];

      if (beforeCount === 0) {
        console.log(`   ⏭️  Skipped ${table}: already empty`);
        continue;
      }

      // Delete all rows by selecting all IDs and deleting them
      // This is more reliable than using conditions
      let deleted = 0;
      const batchSize = 1000;
      let hasMore = true;
      let offset = 0;

      while (hasMore) {
        const { data: rows, error: fetchError } = await mainClient
          .from(table)
          .select("id")
          .range(offset, offset + batchSize - 1);

        if (fetchError) {
          console.error(`❌ Error fetching ${table}:`, fetchError.message);
          throw fetchError;
        }

        if (!rows || rows.length === 0) {
          hasMore = false;
          break;
        }

        // Delete this batch
        const ids = rows.map((r) => r.id);
        const { error: deleteError } = await mainClient
          .from(table)
          .delete()
          .in("id", ids);

        if (deleteError) {
          console.error(
            `❌ Error deleting from ${table}:`,
            deleteError.message,
          );
          throw deleteError;
        }

        deleted += rows.length;
        offset += batchSize;

        if (rows.length < batchSize) {
          hasMore = false;
        }
      }

      totalDeleted += deleted;
      console.log(`   ✅ Cleared ${table}: ${deleted} rows deleted`);
    } catch (error) {
      console.error(`❌ Failed to clear ${table}:`, error.message);
      throw error;
    }
  }

  console.log(
    `\n✅ Successfully cleared all tables (${totalDeleted} total rows deleted)\n`,
  );

  // Verify tables are empty
  console.log("🔍 Verifying tables are empty...\n");
  for (const table of tables) {
    const { count } = await mainClient
      .from(table)
      .select("*", { count: "exact", head: true });
    console.log(`   ${table}: ${count || 0} rows`);
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    // Test connection first
    console.log("🔌 Testing database connection...\n");
    const { error: testError } = await mainClient
      .from("categories")
      .select("id")
      .limit(1);

    if (testError) {
      console.error("❌ Database connection failed:", testError.message);
      process.exit(1);
    }
    console.log("✅ Database connection successful\n");

    // Clear tables
    await clearTables();

    console.log("✅ Database cleared successfully!");
    console.log("   You can now run: npm run seed:testing-to-main\n");
  } catch (error) {
    console.error("❌ Error during database clearing:", error);
    process.exit(1);
  }
}

// Run the script
main();
