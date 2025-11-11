const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Run all rendering pattern batch scripts to add questions
 */

const batchesDir = path.join(__dirname, 'rendering-patterns-batches');
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.endsWith('.js'))
  .sort(); // Sort to run in order

console.log(`🚀 Running ${batches.length} batch scripts...\n`);

let successCount = 0;
let errorCount = 0;

batches.forEach((batchFile, index) => {
  const batchPath = path.join(batchesDir, batchFile);
  try {
    process.stdout.write(`[${index + 1}/${batches.length}] ${batchFile}... `);
    execSync(`node "${batchPath}"`, { stdio: 'pipe', cwd: __dirname });
    process.stdout.write('✅\n');
    successCount++;
  } catch (error) {
    process.stdout.write('❌\n');
    console.error(`  Error: ${error.message}`);
    errorCount++;
  }
  
  // Show progress every 10 batches
  if ((index + 1) % 10 === 0) {
    console.log(`\n📊 Progress: ${index + 1}/${batches.length} batches (${successCount} success, ${errorCount} errors)\n`);
  }
});

// Verify final count
const questionsFile = path.join(__dirname, '../final-questions-v01/rendering-patterns-questions.json');
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


