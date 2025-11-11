const { execSync } = require('child_process');
const path = require('path');

/**
 * Master seeder script that runs all seeders in order
 * Seeders are run sequentially to maintain dependencies:
 * 1. Learning Cards (no dependencies)
 * 2. Categories (depends on Learning Cards)
 * 3. Topics (depends on Categories)
 * 4. Questions (depends on Topics, Categories, Learning Cards)
 */

const seeders = [
  '01-seed-learning-cards.js',
  '02-seed-categories.js',
  '03-seed-topics.js',
  '04-seed-questions.js'
];

console.log('🚀 Starting database seeding process...\n');
console.log('📋 Seeders to run:');
seeders.forEach((seeder, index) => {
  console.log(`  ${index + 1}. ${seeder}`);
});
console.log('');

let successCount = 0;
let errorCount = 0;

seeders.forEach((seeder, index) => {
  const seederPath = path.join(__dirname, seeder);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`[${index + 1}/${seeders.length}] Running ${seeder}...`);
  console.log('='.repeat(60));
  
  try {
    execSync(`node "${seederPath}"`, { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    successCount++;
    console.log(`✅ ${seeder} completed successfully\n`);
  } catch (error) {
    errorCount++;
    console.error(`❌ ${seeder} failed\n`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 Seeding Summary:');
console.log('='.repeat(60));
console.log(`  ✅ Successful: ${successCount}/${seeders.length}`);
console.log(`  ❌ Failed: ${errorCount}/${seeders.length}`);

if (errorCount === 0) {
  console.log('\n🎉 All seeders completed successfully!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some seeders failed. Please check the errors above.');
  process.exit(1);
}

