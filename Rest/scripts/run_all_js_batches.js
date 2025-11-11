const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Runs all JavaScript question batch scripts sequentially
 */

const scriptsDir = path.join(__dirname);
const totalBatches = 49; // Based on 146 questions / 3 per batch

console.log('🚀 Running all JavaScript question batch scripts...\n');

let successCount = 0;
let failCount = 0;

for (let i = 1; i <= totalBatches; i++) {
  const scriptPath = path.join(scriptsDir, `add_js_questions_batch${i}.js`);
  
  if (!fs.existsSync(scriptPath)) {
    console.log(`⚠️  Batch ${i} script not found, skipping...`);
    failCount++;
    continue;
  }
  
  try {
    console.log(`📝 Running batch ${i}...`);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit', cwd: __dirname });
    successCount++;
    console.log(`✅ Batch ${i} completed\n`);
  } catch (error) {
    console.error(`❌ Batch ${i} failed:`, error.message);
    failCount++;
    // Continue with next batch
  }
}

console.log('\n📊 Summary:');
console.log(`   ✅ Successful: ${successCount}`);
console.log(`   ❌ Failed: ${failCount}`);
console.log(`   📝 Total batches: ${totalBatches}`);


