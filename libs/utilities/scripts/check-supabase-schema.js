#!/usr/bin/env node
/**
 * Check Supabase schema for API-related issues
 * This script validates that the database schema matches expected TypeScript types
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Expected schema for questions table (based on UnifiedQuestion type)
const EXPECTED_QUESTION_FIELDS = [
  "id",
  "title",
  "content",
  "code",
  "type",
  "difficulty",
  "points",
  "options",
  "correct_answer",
  "explanation",
  "test_cases",
  "hints",
  "tags",
  "stats",
  "metadata",
  "resources",
  "category_id",
  "learning_card_id",
  "topic_id",
  "time_limit",
  "code_template",
  "examples",
  "constraints",
  "language",
  "is_active",
  "created_at",
  "updated_at",
];

async function checkSchema() {
  console.log("");
  console.log(
    "════════════════════════════════════════════════════════════════",
  );
  console.log("🔍 Checking Supabase Schema...");
  console.log(
    "════════════════════════════════════════════════════════════════",
  );
  console.log("");

  try {
    // Get questions table schema
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .limit(1);

    if (questionsError) {
      console.error("❌ Error fetching questions:", questionsError.message);
      return false;
    }

    if (questions && questions.length > 0) {
      const actualFields = Object.keys(questions[0]);
      const missingFields = EXPECTED_QUESTION_FIELDS.filter(
        (field) => !actualFields.includes(field),
      );
      const extraFields = actualFields.filter(
        (field) => !EXPECTED_QUESTION_FIELDS.includes(field),
      );

      console.log("📊 Questions Table Schema Check:");
      console.log(
        `   ✅ Found ${actualFields.length} fields in questions table`,
      );

      if (missingFields.length > 0) {
        console.log(
          `   ⚠️  Missing expected fields: ${missingFields.join(", ")}`,
        );
        console.log(
          "   💡 These fields may need to be added to the database schema",
        );
      } else {
        console.log("   ✅ All expected fields are present");
      }

      if (extraFields.length > 0) {
        console.log(`   ℹ️  Extra fields found: ${extraFields.join(", ")}`);
        console.log(
          "   💡 These fields are in the database but not in the TypeScript type",
        );
      }

      // Check critical fields
      const criticalFields = ["topic_id", "category_id", "learning_card_id"];
      const missingCritical = criticalFields.filter(
        (field) => !actualFields.includes(field),
      );

      if (missingCritical.length > 0) {
        console.log("");
        console.log(
          "   ❌ Missing critical fields:",
          missingCritical.join(", "),
        );
        console.log(
          "   💡 These fields are required for the application to work correctly",
        );
        return false;
      } else {
        console.log(
          "   ✅ All critical fields (topic_id, category_id, learning_card_id) are present",
        );
      }
    } else {
      console.log("   ⚠️  No questions found in database (table may be empty)");
    }

    // Check topics table
    const { data: topics, error: topicsError } = await supabase
      .from("topics")
      .select("id, name, slug")
      .limit(1);

    if (topicsError) {
      console.log("");
      console.log("   ⚠️  Could not check topics table:", topicsError.message);
    } else {
      console.log("");
      console.log("   ✅ Topics table is accessible");
    }

    // Check categories table
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .limit(1);

    if (categoriesError) {
      console.log("");
      console.log(
        "   ⚠️  Could not check categories table:",
        categoriesError.message,
      );
    } else {
      console.log("");
      console.log("   ✅ Categories table is accessible");
    }

    console.log("");
    console.log(
      "════════════════════════════════════════════════════════════════",
    );
    console.log("✅ Supabase Schema Check Completed!");
    console.log(
      "════════════════════════════════════════════════════════════════",
    );
    console.log("");

    return true;
  } catch (error) {
    console.error("");
    console.error("❌ Error checking schema:", error.message);
    console.error("");
    return false;
  }
}

// Run check
checkSchema()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });
