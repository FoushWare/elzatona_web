const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const batchesDir = path.join(__dirname, 'all-category-batches');
const categories = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Next.js',
  'Design Patterns',
  'Performance Patterns',
  'Rendering Patterns',
  'Security',
];

console.log('🚀 Running all question batches...\n');

let totalSuccess = 0;
let totalErrors = 0;

categories.forEach(category => {
  const categoryDir = path.join(
    batchesDir,
    category.toLowerCase().replace(/\s+/g, '-')
  );
  if (!fs.existsSync(categoryDir)) {
    console.log(`⚠️  No batches found for ${category}`);
    return;
  }

  const batches = fs
    .readdirSync(categoryDir)
    .filter(f => f.endsWith('.js'))
    .sort();

  console.log(`\n📦 ${category}: ${batches.length} batches`);

  batches.forEach((batchFile, index) => {
    const batchPath = path.join(categoryDir, batchFile);
    try {
      process.stdout.write(
        `  [${index + 1}/${batches.length}] ${batchFile}... `
      );
      execSync(`node "${batchPath}"`, { stdio: 'pipe', cwd: __dirname });
      process.stdout.write('✅\n');
      totalSuccess++;
    } catch (error) {
      process.stdout.write('❌\n');
      totalErrors++;
    }
  });
});

console.log(
  `\n\n📊 Summary: ${totalSuccess} successful, ${totalErrors} errors`
);
