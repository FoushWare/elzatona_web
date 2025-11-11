const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const categories = ["HTML","CSS","JavaScript","React","Next.js","Design Patterns","Performance Patterns","Rendering Patterns","Security"];
const batchesBaseDir = path.join(__dirname, 'comprehensive-batches');

console.log('🚀 Running comprehensive question batches...\n');

categories.forEach(category => {
  const categoryDir = path.join(batchesBaseDir, category.toLowerCase().replace(/\s+/g, '-'));
  if (!fs.existsSync(categoryDir)) {
    console.log(`⚠️  No batches found for ${category}`);
    return;
  }
  
  const batches = fs.readdirSync(categoryDir)
    .filter(f => f.endsWith('.js'))
    .sort();
  
  console.log(`\n📦 ${category}: Running ${batches.length} batches...`);
  
  batches.forEach((batchFile, index) => {
    const batchPath = path.join(categoryDir, batchFile);
    try {
      process.stdout.write(`  [${index + 1}/${batches.length}] ${batchFile}... `);
      execSync(`node "${batchPath}"`, { stdio: 'pipe', cwd: __dirname });
      process.stdout.write('✅\n');
    } catch (error) {
      process.stdout.write('❌\n');
      console.error(`    Error: ${error.message}`);
    }
  });
});

console.log('\n✅ All batches completed!\n');
