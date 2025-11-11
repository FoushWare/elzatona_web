const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Run all Next.js batch scripts to add questions
 */

const batchesDir = path.join(__dirname, 'nextjs-batches');
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.endsWith('.js'))
  .sort(); // Sort to run in order

console.log(`🚀 Running ${batches.length} batch scripts...\n`);

batches.forEach((batchFile, index) => {
  const batchPath = path.join(batchesDir, batchFile);
  try {
    console.log(`[${index + 1}/${batches.length}] Running ${batchFile}...`);
    execSync(`node "${batchPath}"`, { stdio: 'inherit', cwd: __dirname });
  } catch (error) {
    console.error(`❌ Error running ${batchFile}:`, error.message);
  }
});

// Verify final count
const questionsFile = path.join(__dirname, '../final-questions-v01/nextjs-questions.json');
if (fs.existsSync(questionsFile)) {
  const questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
  console.log(`\n✅ All batches completed!`);
  console.log(`📝 Total questions: ${questions.length}`);
  
  // Show breakdown by topic
  const topics = {};
  questions.forEach(q => {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
  });
  
  console.log('\n📊 Questions by topic:');
  Object.entries(topics).sort().forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count} questions`);
  });
}


