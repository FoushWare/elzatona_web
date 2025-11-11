const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const batchesDir = __dirname;
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.startsWith('batch') && f.endsWith('.js'))
  .sort((a, b) => parseInt(a.match(/\d+/)?.[0] || 0) - parseInt(b.match(/\d+/)?.[0] || 0));

console.log(`🚀 Running ${batches.length} system design question batches...\n`);

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
    errorCount++;
  }
  
  if ((index + 1) % 5 === 0) {
    console.log(`\n📊 Progress: ${index + 1}/${batches.length} batches\n`);
  }
});

console.log(`\n✅ All batches completed! ${successCount} success, ${errorCount} errors`);
