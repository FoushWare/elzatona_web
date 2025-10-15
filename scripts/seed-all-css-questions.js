import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedingScripts = [
  'seed-css-1.js',
  'seed-css-21-40.js',
  'seed-css-41-60.js',
  'seed-css-16-80.js',
  'seed-css-81-100.js',
];

async function runSeedingScripts() {
  console.log('🚀 Starting CSS questions seeding process...');
  console.log(`📁 Found ${seedingScripts.length} seeding scripts to run`);

  let successCount = 0;
  let errorCount = 0;

  for (const script of seedingScripts) {
    try {
      console.log(`\n🔄 Running ${script}...`);
      const scriptPath = path.join(__dirname, script);

      await execa('node', [scriptPath], {
        stdio: 'inherit',
        cwd: __dirname,
      });

      console.log(`✅ ${script} completed successfully`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${script} failed:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📁 Total scripts: ${seedingScripts.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All CSS questions seeded successfully!');
  } else {
    console.log('\n⚠️  Some scripts failed. Please check the errors above.');
    process.exit(1);
  }
}

runSeedingScripts().catch(error => {
  console.error('💥 Master seeding script failed:', error);
  process.exit(1);
});
