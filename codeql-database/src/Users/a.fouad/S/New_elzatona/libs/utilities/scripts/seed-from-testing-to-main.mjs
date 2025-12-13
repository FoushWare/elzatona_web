#!/usr/bin/env node

/**
 * Seed data from zatona-web-testing to zatona-web
 *
 * This script:
 * 1. Connects to both Supabase projects
 * 2. Exports data from testing database
 * 3. Maps foreign key IDs using slug/name matching
 * 4. Imports data into main database
 *
 * Usage: node scripts/seed-from-testing-to-main.mjs
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase project IDs (verified via MCP) - define first for validation
const TESTING_PROJECT_ID = "kiycimlsatwfqxtfprlr"; // zatona-web-testing
const MAIN_PROJECT_ID = "hpnewqkvpnthpohvxcmq"; // zatona-web

// Load environment variables from both files
// Load .env.local first (for main database credentials)
dotenv.config({ path: join(__dirname, "..", ".env.local") });
// Save the main database key before .env.test.local potentially overrides it
const MAIN_KEY_FROM_LOCAL = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Validate NEXT_PUBLIC_SUPABASE_URL from .env.local - only use if it's for the main project
// If it points to testing project or is wrong, ignore it and use verified URL
const MAIN_URL_FROM_LOCAL_RAW = process.env.NEXT_PUBLIC_SUPABASE_URL;
const MAIN_URL_FROM_LOCAL =
  MAIN_URL_FROM_LOCAL_RAW && MAIN_URL_FROM_LOCAL_RAW.includes(MAIN_PROJECT_ID)
    ? MAIN_URL_FROM_LOCAL_RAW
    : null; // Will use verified URL fallback

// Load .env.test.local second (will override matching variables)
// This allows .env.test.local to take precedence for testing credentials
dotenv.config({
  path: join(__dirname, "..", ".env.test.local"),
  override: true,
});

// Supabase project URLs (verified via MCP - these are the correct URLs)
const TESTING_PROJECT_URL = "https://kiycimlsatwfqxtfprlr.supabase.co";
const MAIN_PROJECT_URL = "https://hpnewqkvpnthpohvxcmq.supabase.co";

// Get Supabase URLs and keys
// Testing database:
//   1. Check for TESTING_SUPABASE_URL (explicit testing URL)
//   2. Fallback to NEXT_PUBLIC_SUPABASE_URL (which will be from .env.test.local if it exists there)
//   3. Fallback to verified testing project URL
const TESTING_URL =
  process.env.TESTING_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  TESTING_PROJECT_URL;

// Testing key:
//   1. Check for TESTING_SUPABASE_SERVICE_ROLE_KEY (explicit testing key)
//   2. If SUPABASE_SERVICE_ROLE_KEY changed after loading .env.test.local, use it as testing key
//   3. Otherwise, use null (will fail validation)
const SUPABASE_KEY_AFTER_TEST = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TESTING_KEY =
  process.env.TESTING_SUPABASE_SERVICE_ROLE_KEY ||
  (SUPABASE_KEY_AFTER_TEST !== MAIN_KEY_FROM_LOCAL
    ? SUPABASE_KEY_AFTER_TEST
    : null);

// Main database: Use the key and URL from .env.local (saved before .env.test.local override)
// Fallback to verified main project URL if not set in .env.local
const MAIN_URL = MAIN_URL_FROM_LOCAL || MAIN_PROJECT_URL;
const MAIN_KEY = MAIN_KEY_FROM_LOCAL;

// Debug: Log the URLs being used (for troubleshooting)
if (process.env.DEBUG_SEED) {
  console.log("\n🔍 Debug Info:");
  console.log(`   MAIN_URL_FROM_LOCAL: ${MAIN_URL_FROM_LOCAL || "undefined"}`);
  console.log(`   MAIN_URL: ${MAIN_URL}`);
  console.log(`   TESTING_URL: ${TESTING_URL}`);
  console.log(`   MAIN_KEY exists: ${!!MAIN_KEY}`);
  console.log(`   TESTING_KEY exists: ${!!TESTING_KEY}\n`);
}

// Validate environment variables
console.log("🔍 Checking environment variables...\n");
console.log("   Reading from:");
console.log("   - .env.local (for main database)");
console.log("   - .env.test.local (for testing database)\n");

if (!TESTING_KEY) {
  console.error("❌ Error: Missing TESTING_SUPABASE_SERVICE_ROLE_KEY");
  console.error("\n📝 Please add to .env.test.local (or .env.local):");
  console.error(
    "   TESTING_SUPABASE_SERVICE_ROLE_KEY=your_testing_service_role_key",
  );
  console.error(
    "\n🔗 Get it from: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api",
  );
  console.error(
    "   Steps: Dashboard → Settings → API → service_role key (click 👁️ to reveal)",
  );
  process.exit(1);
}

if (!MAIN_KEY) {
  console.error("❌ Error: Missing SUPABASE_SERVICE_ROLE_KEY");
  console.error("\n📝 Please add to .env.local:");
  console.error("   SUPABASE_SERVICE_ROLE_KEY=your_main_service_role_key");
  console.error(
    "\n🔗 Get it from: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api",
  );
  console.error(
    "   Steps: Dashboard → Settings → API → service_role key (click 👁️ to reveal)",
  );
  process.exit(1);
}

console.log("✅ Environment variables loaded");
console.log(`   Testing DB: ${TESTING_PROJECT_ID} (zatona-web-testing)`);
console.log(`   Main DB: ${MAIN_PROJECT_ID} (zatona-web)\n`);

// Create Supabase clients
// Log the URLs being used for debugging
console.log("\n🔗 Database URLs:");
console.log(`   Testing: ${TESTING_URL}`);
console.log(`   Main: ${MAIN_URL}`);
console.log(
  `   Main URL from .env.local: ${MAIN_URL_FROM_LOCAL || "not set (using fallback)"}\n`,
);

const testingClient = createClient(TESTING_URL, TESTING_KEY);
const mainClient = createClient(MAIN_URL, MAIN_KEY);

/**
 * Test database connections before starting
 */
async function testConnections() {
  console.log("🔌 Testing database connections...\n");

  // Test testing database connection
  try {
    const { data: _data, error } = await testingClient
      .from("categories")
      .select("id")
      .limit(1);

    if (error) {
      console.error("❌ Testing database connection failed:");
      console.error(`   URL: ${TESTING_URL}`);
      console.error(`   Error: ${error.message}`);
      if (error.hint) console.error(`   Hint: ${error.hint}`);
      throw new Error("Testing database connection failed");
    }
    console.log("✅ Testing database connection successful");
  } catch (error) {
    console.error("❌ Failed to connect to testing database");
    console.error(
      "   Please verify TESTING_SUPABASE_SERVICE_ROLE_KEY in .env.test.local",
    );
    throw error;
  }

  // Test main database connection
  try {
    const { data: _data, error } = await mainClient
      .from("categories")
      .select("id")
      .limit(1);

    if (error) {
      console.error("❌ Main database connection failed:");
      console.error(`   URL: ${MAIN_URL}`);
      console.error(`   Error: ${error.message}`);
      if (error.hint) console.error(`   Hint: ${error.hint}`);
      throw new Error("Main database connection failed");
    }
    console.log("✅ Main database connection successful\n");
  } catch (error) {
    console.error("❌ Failed to connect to main database");
    console.error(`   Expected URL: https://${MAIN_PROJECT_ID}.supabase.co`);
    console.error(`   Actual URL used: ${MAIN_URL}`);
    console.error(
      `   MAIN_URL_FROM_LOCAL was: ${MAIN_URL_FROM_LOCAL || "undefined"}`,
    );
    console.error("   Please verify SUPABASE_SERVICE_ROLE_KEY in .env.local");
    throw error;
  }
}

// ID mapping tables
const idMappings = {
  categories: new Map(),
  topics: new Map(),
  learningCards: new Map(),
  questions: new Map(),
  learningPlans: new Map(),
};

/**
 * Map categories by slug
 */
async function mapCategories() {
  console.log("📋 Mapping categories...");

  const { data: testingCats, error: testError } = await testingClient
    .from("categories")
    .select("id, slug, name");

  if (testError) throw testError;

  const { data: mainCats, error: mainError } = await mainClient
    .from("categories")
    .select("id, slug, name");

  if (mainError) throw mainError;

  for (const testCat of testingCats || []) {
    const mainCat = mainCats?.find((c) => c.slug === testCat.slug);
    if (mainCat) {
      idMappings.categories.set(testCat.id, mainCat.id);
      console.log(`  ✓ Mapped category: ${testCat.name} (${testCat.slug})`);
    } else {
      console.warn(
        `  ⚠️  Category not found in main: ${testCat.name} (${testCat.slug})`,
      );
    }
  }

  console.log(`✅ Mapped ${idMappings.categories.size} categories\n`);
}

/**
 * Map topics by slug
 */
async function mapTopics() {
  console.log("📚 Mapping topics...");

  const { data: testingTopics, error: testError } = await testingClient
    .from("topics")
    .select("id, slug, name");

  if (testError) throw testError;

  const { data: mainTopics, error: mainError } = await mainClient
    .from("topics")
    .select("id, slug, name");

  if (mainError) throw mainError;

  for (const testTopic of testingTopics || []) {
    const mainTopic = mainTopics?.find((t) => t.slug === testTopic.slug);
    if (mainTopic) {
      idMappings.topics.set(testTopic.id, mainTopic.id);
    } else {
      console.warn(
        `  ⚠️  Topic not found in main: ${testTopic.name} (${testTopic.slug})`,
      );
    }
  }

  console.log(`✅ Mapped ${idMappings.topics.size} topics\n`);
}

/**
 * Map learning cards by title
 */
async function mapLearningCards() {
  console.log("🃏 Mapping learning cards...");

  const { data: testingCards, error: testError } = await testingClient
    .from("learning_cards")
    .select("id, title");

  if (testError) throw testError;

  const { data: mainCards, error: mainError } = await mainClient
    .from("learning_cards")
    .select("id, title");

  if (mainError) throw mainError;

  for (const testCard of testingCards || []) {
    const mainCard = mainCards?.find((c) => c.title === testCard.title);
    if (mainCard) {
      idMappings.learningCards.set(testCard.id, mainCard.id);
      console.log(`  ✓ Mapped card: ${testCard.title}`);
    } else {
      console.warn(`  ⚠️  Card not found in main: ${testCard.title}`);
    }
  }

  console.log(`✅ Mapped ${idMappings.learningCards.size} learning cards\n`);
}

/**
 * Copy questions from testing to main
 */
async function copyQuestions() {
  console.log("❓ Copying questions...");

  // Fetch all questions from testing in batches
  const batchSize = 100;
  let offset = 0;
  let totalCopied = 0;
  let totalSkipped = 0;

  while (true) {
    const { data: questions, error } = await testingClient
      .from("questions")
      .select("*")
      .range(offset, offset + batchSize - 1);

    if (error) throw error;
    if (!questions || questions.length === 0) break;

    // Transform questions with mapped IDs
    const transformedQuestions = questions.map((q) => ({
      title: q.title,
      content: q.content,
      type: q.type,
      difficulty: q.difficulty,
      points: q.points,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      test_cases: q.test_cases,
      hints: q.hints,
      tags: q.tags,
      stats: q.stats,
      metadata: q.metadata,
      category_id: idMappings.categories.get(q.category_id) || null,
      learning_card_id:
        idMappings.learningCards.get(q.learning_card_id) || null,
      topic_id: idMappings.topics.get(q.topic_id) || null,
      is_active: q.is_active,
      created_at: q.created_at,
      updated_at: q.updated_at,
      time_limit: q.time_limit,
      code_template: q.code_template,
      examples: q.examples,
      constraints: q.constraints,
      language: q.language,
      resources: q.resources,
    }));

    // Insert into main database
    // Use insert instead of upsert since we're creating new records
    const { data: inserted, error: insertError } = await mainClient
      .from("questions")
      .insert(transformedQuestions)
      .select("id, title");

    if (insertError) {
      console.error(
        `  ❌ Error inserting batch ${offset}-${offset + questions.length}:`,
        insertError.message,
      );
      // Try inserting one by one to identify problematic records
      for (const q of transformedQuestions) {
        const { error: singleError } = await mainClient
          .from("questions")
          .insert(q)
          .select("id, title");

        if (singleError) {
          console.error(
            `    ❌ Failed to insert: ${q.title.substring(0, 50)}...`,
            singleError.message,
          );
          totalSkipped++;
        } else {
          totalCopied++;
        }
      }
    } else {
      totalCopied += inserted?.length || 0;
    }

    // Create ID mapping for inserted questions
    for (let i = 0; i < questions.length; i++) {
      const oldId = questions[i].id;
      const newQuestion = inserted?.find(
        (nq) => nq.title === questions[i].title,
      );
      if (newQuestion) {
        idMappings.questions.set(oldId, newQuestion.id);
      }
    }

    offset += batchSize;
    console.log(
      `  📦 Processed ${offset} questions (copied: ${totalCopied}, skipped: ${totalSkipped})`,
    );

    if (questions.length < batchSize) break;
  }

  console.log(`✅ Copied ${totalCopied} questions, skipped ${totalSkipped}\n`);
}

/**
 * Copy learning plans from testing to main
 */
async function copyLearningPlans() {
  console.log("📖 Copying learning plans...");

  const { data: plans, error } = await testingClient
    .from("learning_plans")
    .select("*");

  if (error) throw error;

  const transformedPlans =
    plans?.map((p) => ({
      name: p.name,
      description: p.description,
      difficulty: p.difficulty,
      estimated_duration: p.estimated_duration,
      is_public: p.is_public,
      is_active: p.is_active,
      created_at: p.created_at,
      updated_at: p.updated_at,
    })) || [];

  const { data: inserted, error: insertError } = await mainClient
    .from("learning_plans")
    .insert(transformedPlans)
    .select("id, name");

  if (insertError) throw insertError;

  // Create ID mapping
  for (let i = 0; i < plans.length; i++) {
    const oldId = plans[i].id;
    const newPlan = inserted?.find((np) => np.name === plans[i].name);
    if (newPlan) {
      idMappings.learningPlans.set(oldId, newPlan.id);
      console.log(`  ✓ Mapped plan: ${plans[i].name}`);
    }
  }

  console.log(`✅ Copied ${inserted?.length || 0} learning plans\n`);
}

/**
 * Copy plan_cards from testing to main
 */
async function copyPlanCards() {
  console.log("🔗 Copying plan_cards...");

  const { data: planCards, error } = await testingClient
    .from("plan_cards")
    .select("*");

  if (error) throw error;

  const transformedPlanCards =
    planCards
      ?.map((pc) => ({
        plan_id: idMappings.learningPlans.get(pc.plan_id),
        card_id: idMappings.learningCards.get(pc.card_id),
        order_index: pc.order_index,
        is_active: pc.is_active,
        created_at: pc.created_at,
        updated_at: pc.updated_at,
      }))
      .filter((pc) => pc.plan_id && pc.card_id) || [];

  if (transformedPlanCards.length === 0) {
    console.log(
      "  ⚠️  No plan_cards to copy (missing plan or card mappings)\n",
    );
    return;
  }

  const { data: _inserted, error: insertError } = await mainClient
    .from("plan_cards")
    .insert(transformedPlanCards)
    .select();

  if (insertError) throw insertError;

  console.log(`✅ Copied ${transformedPlanCards.length} plan_cards\n`);
}

/**
 * Copy plan_questions from testing to main
 */
async function copyPlanQuestions() {
  console.log("📝 Copying plan_questions...");

  const batchSize = 500;
  let offset = 0;
  let totalCopied = 0;

  while (true) {
    const { data: planQuestions, error } = await testingClient
      .from("plan_questions")
      .select("*")
      .range(offset, offset + batchSize - 1);

    if (error) throw error;
    if (!planQuestions || planQuestions.length === 0) break;

    const transformedPlanQuestions = planQuestions
      .map((pq) => ({
        plan_id: idMappings.learningPlans.get(pq.plan_id),
        question_id: idMappings.questions.get(pq.question_id),
        topic_id: idMappings.topics.get(pq.topic_id),
        order_index: pq.order_index,
        is_active: pq.is_active,
        created_at: pq.created_at,
        updated_at: pq.updated_at,
      }))
      .filter((pq) => pq.plan_id && pq.question_id && pq.topic_id);

    if (transformedPlanQuestions.length > 0) {
      const { error: insertError } = await mainClient
        .from("plan_questions")
        .insert(transformedPlanQuestions);

      if (insertError) {
        console.error(
          `  ❌ Error inserting batch ${offset}-${offset + planQuestions.length}:`,
          insertError.message,
        );
      } else {
        totalCopied += transformedPlanQuestions.length;
      }
    }

    offset += batchSize;
    console.log(
      `  📦 Processed ${offset} plan_questions (copied: ${totalCopied})`,
    );

    if (planQuestions.length < batchSize) break;
  }

  console.log(`✅ Copied ${totalCopied} plan_questions\n`);
}

/**
 * Copy card_categories from testing to main
 */
async function copyCardCategories() {
  console.log("🏷️  Copying card_categories...");

  const { data: cardCategories, error } = await testingClient
    .from("card_categories")
    .select("*");

  if (error) throw error;

  const transformedCardCategories =
    cardCategories
      ?.map((cc) => ({
        card_id: idMappings.learningCards.get(cc.card_id),
        category_id: idMappings.categories.get(cc.category_id),
        order_index: cc.order_index,
        is_primary: cc.is_primary,
        created_at: cc.created_at,
        updated_at: cc.updated_at,
      }))
      .filter((cc) => cc.card_id && cc.category_id) || [];

  if (transformedCardCategories.length === 0) {
    console.log(
      "  ⚠️  No card_categories to copy (missing card or category mappings)\n",
    );
    return;
  }

  const { data: _inserted, error: insertError } = await mainClient
    .from("card_categories")
    .insert(transformedCardCategories)
    .select();

  if (insertError) throw insertError;

  console.log(
    `✅ Copied ${transformedCardCategories.length} card_categories\n`,
  );
}

/**
 * Clear tables in main database before seeding
 */
async function clearMainDatabaseTables() {
  console.log("🗑️  Clearing tables in main database before seeding...\n");

  // Tables to clear in order (respecting foreign key dependencies)
  const tables = [
    "plan_questions", // References questions, learning_plans, topics
    "plan_cards", // References learning_plans, learning_cards
    "card_categories", // References learning_cards, categories
    "questions", // References categories, topics, learning_cards
    "learning_plans", // Standalone (but referenced by plan_questions, plan_cards)
  ];

  let totalDeleted = 0;

  // Get counts first
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

  // Delete in batches
  for (const table of tables) {
    try {
      const beforeCount = counts[table];

      if (beforeCount === 0) {
        console.log(`   ⏭️  Skipped ${table}: already empty`);
        continue;
      }

      let deleted = 0;
      const batchSize = 1000;
      let hasMore = true;
      let offset = 0;

      while (hasMore) {
        const { data: rows, error: fetchError } = await mainClient
          .from(table)
          .select("id")
          .range(offset, offset + batchSize - 1);

        if (fetchError) throw fetchError;

        if (!rows || rows.length === 0) {
          hasMore = false;
          break;
        }

        const ids = rows.map((r) => r.id);
        const { error: deleteError } = await mainClient
          .from(table)
          .delete()
          .in("id", ids);

        if (deleteError) throw deleteError;

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

  if (totalDeleted > 0) {
    console.log(
      `\n✅ Successfully cleared all tables (${totalDeleted} total rows deleted)\n`,
    );
  } else {
    console.log(`\n✅ All tables are already empty\n`);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log(
    "🚀 Starting data seeding from zatona-web-testing to zatona-web\n",
  );
  console.log(`📊 Testing DB: ${TESTING_PROJECT_ID}`);
  console.log(`📊 Main DB: ${MAIN_PROJECT_ID}\n`);

  try {
    // Step 0: Test connections
    await testConnections();

    // Step 0.5: Clear main database tables
    await clearMainDatabaseTables();

    // Step 1: Map existing entities
    await mapCategories();
    await mapTopics();
    await mapLearningCards();

    // Step 2: Copy data
    await copyQuestions();
    await copyLearningPlans();
    await copyPlanCards();
    await copyPlanQuestions();
    await copyCardCategories();

    console.log("✅ Data seeding completed successfully!");

    // Print summary
    const { count: questionCount } = await mainClient
      .from("questions")
      .select("*", { count: "exact", head: true });

    const { count: planCount } = await mainClient
      .from("learning_plans")
      .select("*", { count: "exact", head: true });

    const { count: planQuestionCount } = await mainClient
      .from("plan_questions")
      .select("*", { count: "exact", head: true });

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Questions in main DB: ${questionCount || 0}`);
    console.log(`   ✅ Learning Plans in main DB: ${planCount || 0}`);
    console.log(`   ✅ Plan Questions in main DB: ${planQuestionCount || 0}`);
    console.log(`\n   ID mappings created:`);
    console.log(`     - Categories: ${idMappings.categories.size}`);
    console.log(`     - Topics: ${idMappings.topics.size}`);
    console.log(`     - Learning Cards: ${idMappings.learningCards.size}`);
    console.log(`     - Questions: ${idMappings.questions.size}`);
    console.log(`     - Learning Plans: ${idMappings.learningPlans.size}`);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

// Run the script
main();
