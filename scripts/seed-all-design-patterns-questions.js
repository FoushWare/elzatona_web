import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-design-patterns-observer-pattern.js',
  'seed-design-patterns-singleton-pattern.js',
  'seed-design-patterns-factory-pattern.js',
  'seed-design-patterns-strategy-pattern.js',
  'seed-design-patterns-decorator-pattern.js',
  'seed-design-patterns-command-pattern.js',
  'seed-design-patterns-adapter-pattern.js',
  'seed-design-patterns-facade-pattern.js',
  'seed-design-patterns-proxy-pattern.js',
  'seed-design-patterns-builder-pattern.js',
  'seed-design-patterns-template-method-pattern.js',
  'seed-design-patterns-state-pattern.js',
  'seed-design-patterns-chain-of-responsibility-pattern.js',
  'seed-design-patterns-memento-pattern.js',
  'seed-design-patterns-visitor-pattern.js',
  'seed-design-patterns-flyweight-pattern.js',
  'seed-design-patterns-bridge-pattern.js',
  'seed-design-patterns-composite-pattern.js',
  'seed-design-patterns-iterator-pattern.js',
  'seed-design-patterns-prototype-pattern.js',
  'seed-design-patterns-abstract-factory-pattern.js',
  'seed-design-patterns-interpreter-pattern.js',
  'seed-design-patterns-mediator-pattern.js',
];

async function seedAllDesignPatternsQuestions() {
  console.log('🚀 Starting full Design Patterns questions seeding process...');

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

  console.log(
    '\n🎉 All Design Patterns questions seeding completed successfully!'
  );
}

seedAllDesignPatternsQuestions().catch(console.error);
