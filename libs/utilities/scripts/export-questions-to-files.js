/**
 * Export all questions from Supabase database to local JSON files
 * Splits questions into multiple files for easier review
 */

const fs = require("fs");
const path = require("path");

// Configuration
const OUTPUT_DIR = path.join(__dirname, "..", "Rest", "questions-vo2");
const QUESTIONS_PER_FILE = 100; // Number of questions per file

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// This script will be run via MCP to fetch questions
// The actual fetching will be done through MCP Supabase

async function exportQuestions() {
  console.log("📦 Starting question export...");

  // The questions will be fetched via MCP and passed to this script
  // For now, we'll create the structure and the script will be called with data

  console.log(`✅ Output directory created: ${OUTPUT_DIR}`);
  console.log(`📝 Ready to export questions (${QUESTIONS_PER_FILE} per file)`);
}

// If run directly, just create the directory
if (require.main === module) {
  exportQuestions();
}

module.exports = { OUTPUT_DIR, QUESTIONS_PER_FILE };
