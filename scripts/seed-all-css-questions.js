import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-css-01-20.js',
  'seed-css-21-40.js',
  'seed-css-16-80.js',
  'seed-css-41-60.js',
  'seed-css-81-100.js',
];

async function seedAllCSSQuestions() {
  console.log('🚀 Starting full CSS questions seeding process...');

  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`\nExecuting: node ${scriptPath}`);
    try {
      const { stdout, stderr } = await execa('node', [scriptPath], {
        stdio: 'inherit',
      });
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      console.log(`✅ Successfully completed ${script}`);
    } catch (error) {
      console.error(`❌ Error executing ${script}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n🎉 All CSS questions seeding completed successfully!');
}

seedAllCSSQuestions().catch(console.error);
