/**
 * Export all questions from Supabase database to local JSON files
 * Splits questions into multiple files for easier review
 *
 * Usage: node scripts/export-questions-batched.js
 */

const fs = require("fs");
const path = require("path");

// Configuration
const OUTPUT_DIR = path.join(__dirname, "..", "Rest", "questions-vo2");
const QUESTIONS_PER_FILE = 100;

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created directory: ${OUTPUT_DIR}`);
}

// This script will be called with the questions data
// The actual fetching will be done via MCP and passed to this script

async function saveQuestionsToFiles(questions) {
  console.log(`📦 Processing ${questions.length} questions...`);

  // Split questions into batches
  const batches = [];
  for (let i = 0; i < questions.length; i += QUESTIONS_PER_FILE) {
    batches.push(questions.slice(i, i + QUESTIONS_PER_FILE));
  }

  console.log(`📝 Creating ${batches.length} files...`);

  // Save each batch to a file
  batches.forEach((batch, index) => {
    const fileNumber = String(index + 1).padStart(3, "0");
    const filename = `questions-batch-${fileNumber}.json`;
    const filepath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filepath, JSON.stringify(batch, null, 2), "utf8");

    console.log(`✅ Created ${filename} with ${batch.length} questions`);
  });

  console.log(
    `\n🎉 Export complete! ${batches.length} files created in ${OUTPUT_DIR}`,
  );
  console.log(`📊 Total questions exported: ${questions.length}`);
}

// If run directly, expect questions data from stdin or as argument
if (require.main === module) {
  // Check if questions are passed as command line argument (JSON string)
  if (process.argv[2]) {
    try {
      const questions = JSON.parse(process.argv[2]);
      saveQuestionsToFiles(questions);
    } catch (error) {
      console.error("❌ Error parsing questions:", error.message);
      process.exit(1);
    }
  } else {
    console.log("📝 Ready to receive questions data...");
    console.log(
      "💡 This script should be called with questions data as JSON string",
    );
  }
}

module.exports = { saveQuestionsToFiles, OUTPUT_DIR, QUESTIONS_PER_FILE };
