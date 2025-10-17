import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-rendering-patterns-rendering.ts',
  'seed-rendering-patterns-rendering-2.ts',
  'seed-rendering-patterns-rendering-4.ts',
  'seed-rendering-patterns-rendering-5.ts',
  'seed-rendering-patterns-render-6.ts',
  'seed-rendering-patterns-render-7.ts',
  'seed-rendering-patterns-rendering-8.ts',
  'seed-rendering-patterns-rendering-9.ts',
  'seed-rendering-patterns-rendering-10.ts',
  'seed-rendering-patterns-island-archeticure.ts',
];

async function seedAllRenderingPatternsQuestions() {
  console.log(
    '🚀 Starting full Rendering Patterns questions seeding process...'
  );

  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`\nExecuting: npx ts-node ${scriptPath}`);
    try {
      const { stdout, stderr } = await execa('npx', ['ts-node', scriptPath], {
        stdio: 'inherit', // Pipe stdout/stderr to parent process
      });
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      console.log(`✅ Successfully completed ${script}`);
    } catch (error: any) {
      console.error(`❌ Error executing ${script}:`, error.message);
      process.exit(1); // Exit on first error
    }
  }

  console.log(
    '\n🎉 All Rendering Patterns questions seeding completed successfully!'
  );
}

seedAllRenderingPatternsQuestions().catch(console.error);
