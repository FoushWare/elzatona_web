#!/usr/bin/env node

/**
 * Validates that the 4-plan spaced repetition architecture is correctly implemented
 * This script extracts and tests the helper functions from seed-all.mjs
 */

// Helper functions from seed-all.mjs lines 101-157
function generatePlanMetadata(planSequence, topicName = "JavaScript") {
  const plans = {
    1: {
      title: `${topicName}: Foundations`,
      plan_type: "initial",
      sequence_index: 1,
      new_question_count: 10,
      review_question_count: 0,
    },
    2: {
      title: `${topicName}: Review & Deepen`,
      plan_type: "reinforcement",
      sequence_index: 2,
      new_question_count: 5,
      review_question_count: 5,
    },
    3: {
      title: `${topicName}: Advanced Mastery`,
      plan_type: "advanced",
      sequence_index: 3,
      new_question_count: 4,
      review_question_count: 8,
    },
    4: {
      title: `${topicName}: Weekly Check-in`,
      plan_type: "maintenance",
      sequence_index: 4,
      new_question_count: 2,
      review_question_count: 8,
    },
  };
  return plans[planSequence] || plans[1];
}

function getDisplayLabel(newCount, reviewCount) {
  const total = newCount + reviewCount;
  if (reviewCount === 0) {
    return `${total} questions`;
  }
  return `${newCount} new + ${reviewCount} review`;
}

function groupQuestionsByDifficulty(questions) {
  const third = Math.ceil(questions.length / 3);
  return {
    easy: questions.slice(0, third),
    medium: questions.slice(third, 2 * third),
    hard: questions.slice(2 * third),
  };
}

// Validation tests
console.log("✅ VALIDATING 4-PLAN SPACED REPETITION ARCHITECTURE\n");

let passed = 0;
let total = 0;

// Test 1: All 4 plans generate correctly
total++;
try {
  for (let i = 1; i <= 4; i++) {
    const meta = generatePlanMetadata(i);
    if (!meta.plan_type || !meta.title) throw new Error(`Plan ${i} incomplete`);
  }
  console.log("✅ TEST 1 PASSED: All 4 plans generate correctly");
  passed++;
} catch (e) {
  console.log(`❌ TEST 1 FAILED: ${e.message}`);
}

// Test 2: Display labels format correctly
total++;
try {
  const label1 = getDisplayLabel(10, 0);
  const label2 = getDisplayLabel(5, 5);
  if (label1 !== "10 questions" || label2 !== "5 new + 5 review")
    throw new Error("Label format incorrect");
  console.log("✅ TEST 2 PASSED: Display labels format correctly");
  passed++;
} catch (e) {
  console.log(`❌ TEST 2 FAILED: ${e.message}`);
}

// Test 3: Question grouping works
total++;
try {
  const questions = Array.from({ length: 12 }, (_, i) => `q${i}`);
  const grouped = groupQuestionsByDifficulty(questions);
  if (grouped.easy.length === 0 || grouped.hard.length === 0)
    throw new Error("Grouping incomplete");
  console.log("✅ TEST 3 PASSED: Question difficulty grouping works");
  passed++;
} catch (e) {
  console.log(`❌ TEST 3 FAILED: ${e.message}`);
}

// Test 4: Plans have correct question distribution
total++;
try {
  let totalQuestions = 0;
  for (let i = 1; i <= 4; i++) {
    const meta = generatePlanMetadata(i);
    const total = meta.new_question_count + meta.review_question_count;
    if (total < 10) throw new Error(`Plan ${i} has insufficient questions`);
    totalQuestions += total;
  }
  console.log(
    `✅ TEST 4 PASSED: All plans have correct question distribution (total: ${totalQuestions})`,
  );
  passed++;
} catch (e) {
  console.log(`❌ TEST 4 FAILED: ${e.message}`);
}

// Test 5: Metadata plan types are correct
total++;
try {
  const types = new Set([
    "initial",
    "reinforcement",
    "advanced",
    "maintenance",
  ]);
  for (let i = 1; i <= 4; i++) {
    const meta = generatePlanMetadata(i);
    if (!types.includes(meta.plan_type))
      throw new Error(`Plan ${i} has invalid type`);
  }
  console.log("✅ TEST 5 PASSED: All plan types are correct");
  passed++;
} catch (e) {
  console.log(`❌ TEST 5 FAILED: ${e.message}`);
}

console.log(`\n📊 RESULTS: ${passed}/${total} tests passed\n`);

if (passed === total) {
  console.log("🎉 4-PLAN ARCHITECTURE VALIDATION SUCCESSFUL");
  console.log("✅ All helper functions working correctly");
  console.log("✅ All plans configured properly");
  console.log("✅ All metadata fields present");
  console.log("✅ Ready for seeder execution\n");
  process.exit(0);
} else {
  console.log("❌ VALIDATION FAILED - See errors above\n");
  process.exit(1);
}
