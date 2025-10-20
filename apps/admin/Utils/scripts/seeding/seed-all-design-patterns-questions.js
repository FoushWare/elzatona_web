import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-design-patterns-common-pattern.js',
  'seed-design-patterns-factory-pattern.js',
  'seed-design-patterns-singleton-pattern.js',
];

async function runAllScripts() {
  console.log('🚀 Starting Design Patterns questions seeding process...');
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

  console.log(
    '\n🎉 All Design Patterns seeding scripts completed successfully!'
  );
  console.log('📊 Design Patterns questions have been seeded to Firebase');
}

runAllScripts().catch(error => {
  console.error('💥 Design Patterns seeding process failed:', error);
  process.exit(1);
});
