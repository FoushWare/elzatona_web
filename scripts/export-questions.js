/**
 * Export all questions from Supabase to local JSON files
 * This script will be called with question data from MCP
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'Rest', 'questions-vo2');
const QUESTIONS_PER_FILE = 100;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function saveQuestionsToFiles(questions) {
  console.log(`📦 Processing ${questions.length} questions...`);
  
  // Split questions into batches
  const batches = [];
  for (let i = 0; i < questions.length; i += QUESTIONS_PER_FILE) {
    batches.push(questions.slice(i, i + QUESTIONS_PER_FILE));
  }
  
  // Save each batch to a file
  batches.forEach((batch, index) => {
    const fileNumber = String(index + 1).padStart(3, '0');
    const filename = `questions-batch-${fileNumber}.json`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(batch, null, 2), 'utf8');
    console.log(`✅ Saved ${batch.length} questions to ${filename}`);
  });
  
  console.log(`\n✨ Exported ${questions.length} questions to ${batches.length} files in ${OUTPUT_DIR}`);
}

// Export the function for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { saveQuestionsToFiles };
}

