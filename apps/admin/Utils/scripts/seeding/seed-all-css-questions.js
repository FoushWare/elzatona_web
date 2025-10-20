import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-css-1.js',
  'seed-css-21-40.js',
  'seed-css-41-60.js',
  'seed-css-16-80.js',
  'seed-css-81-100.js',
];

async function runAllScripts() {
  console.log('🚀 Starting CSS questions seeding process...');
  console.log(`📁 Running ${scripts.length} seeding scripts...`);

  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`\n🔄 Running ${script}...`);

    try {
      await execa('node', [scriptPath], {
        cwd: __dirname,
        stdio: 'inherit',
      });
      console.log(`✅ ${script} completed successfully`);
    } catch (error) {
      console.error(`❌ ${script} failed:`, error.message);
      throw error;
    }
  }

  console.log('\n🎉 All CSS seeding scripts completed successfully!');
  console.log('📊 CSS questions have been seeded to Firebase');
}

runAllScripts().catch(error => {
  console.error('💥 CSS seeding process failed:', error);
  process.exit(1);
});
