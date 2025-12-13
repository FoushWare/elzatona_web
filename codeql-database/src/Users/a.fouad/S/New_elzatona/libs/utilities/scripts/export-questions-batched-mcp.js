/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Export questions from Supabase database to local JSON files in batches
 * Uses MCP Supabase tools to fetch questions
 *
 * Usage: node scripts/export-questions-batched-mcp.js [batchSize] [startBatch]
 *
 * Example:
 *   node scripts/export-questions-batched-mcp.js 50 1  // Export 50 questions per batch, start from batch 1
 */

const fs = require("fs");
const path = require("path");

// Configuration
const PROJECT_ID = "kiycimlsatwfqxtfprlr"; // zatona-web-testing
const OUTPUT_DIR = path.join(__dirname, "..", "Rest", "questions-vo2");
const DEFAULT_BATCH_SIZE = 50;
const MAX_QUESTIONS = 2596; // Total questions in database

// Get command line arguments
const batchSize = parseInt(process.argv[2]) || DEFAULT_BATCH_SIZE;
const startBatch = parseInt(process.argv[3]) || 1;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created directory: ${OUTPUT_DIR}`);
}

/**
 * Note: This script is designed to work with MCP Supabase tools
 * In a real implementation, you would use the MCP server to execute SQL queries
 *
 * For now, this is a template that shows the structure.
 * You'll need to integrate with your MCP Supabase connection.
 */
async function fetchQuestionsBatch(offset, limit) {
  const query = `
    SELECT 
      q.id,
      q.title,
      q.content,
      q.type,
      q.difficulty,
      q.explanation,
      q.options,
      q.resources,
      q.points,
      q.is_active as "isActive",
      q.created_at as "createdAt",
      q.updated_at as "updatedAt"
    FROM questions q
    ORDER BY q.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `;

  // TODO: Replace with actual MCP Supabase call
  // const result = await mcp_supabase_execute_sql({
  //   project_id: PROJECT_ID,
  //   query: query
  // });

  console.log(`📝 Query for batch: OFFSET ${offset}, LIMIT ${limit}`);
  return null; // Placeholder
}

async function saveBatchToFile(batchNumber, questions) {
  const filename = `questions-batch-${String(batchNumber).padStart(3, "0")}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);

  const jsonContent = JSON.stringify(questions, null, 2);
  fs.writeFileSync(filepath, jsonContent, "utf8");

  console.log(
    `✅ Saved batch ${batchNumber}: ${questions.length} questions → ${filename}`,
  );
  return filepath;
}

async function exportQuestions() {
  console.log(`\n🚀 Starting question export...`);
  console.log(`📊 Configuration:`);
  console.log(`   - Batch size: ${batchSize} questions per file`);
  console.log(`   - Starting from batch: ${startBatch}`);
  console.log(`   - Output directory: ${OUTPUT_DIR}\n`);

  const totalBatches = Math.ceil(MAX_QUESTIONS / batchSize);
  let currentBatch = startBatch;
  let totalExported = 0;

  while (currentBatch <= totalBatches) {
    const offset = (currentBatch - 1) * batchSize;
    const limit = batchSize;

    console.log(`\n📦 Processing batch ${currentBatch}/${totalBatches}...`);
    console.log(
      `   Fetching questions ${offset + 1} to ${Math.min(offset + limit, MAX_QUESTIONS)}...`,
    );

    try {
      // Fetch questions for this batch
      const questions = await fetchQuestionsBatch(offset, limit);

      if (!questions || questions.length === 0) {
        console.log(`⚠️  No more questions found. Stopping export.`);
        break;
      }

      // Save to file
      await saveBatchToFile(currentBatch, questions);

      totalExported += questions.length;
      console.log(
        `   ✅ Exported ${questions.length} questions (Total: ${totalExported}/${MAX_QUESTIONS})`,
      );

      // If we got fewer questions than the batch size, we've reached the end
      if (questions.length < batchSize) {
        console.log(`\n✅ Reached end of questions. Export complete!`);
        break;
      }

      currentBatch++;

      // Add a small delay to avoid overwhelming the database
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(
        `❌ Error processing batch ${currentBatch}:`,
        error.message,
      );
      console.error(`   Skipping to next batch...\n`);
      currentBatch++;
      continue;
    }
  }

  console.log(`\n🎉 Export complete!`);
  console.log(`   Total questions exported: ${totalExported}`);
  console.log(`   Total batches created: ${currentBatch - startBatch}`);
  console.log(`   Files saved to: ${OUTPUT_DIR}\n`);
}

// Run the export
if (require.main === module) {
  exportQuestions().catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { exportQuestions, fetchQuestionsBatch, saveBatchToFile };
