import execa from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-security-sec-01.ts',
  'seed-security-sec-02.ts',
  'seed-security-sec-03.ts',
  'seed-security-sec-04.ts',
  'seed-security-sec-05.ts',
  'seed-security-sec-06.ts',
  'seed-security-sec-07.ts',
  'seed-security-sec-08.ts',
  'seed-security-sec-09.ts',
  'seed-security-sec-10.ts',
  'seed-security-sec-11.ts',
];

async function seedAllSecurityQuestions() {
  console.log('🚀 Starting full Security questions seeding process...');

  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`\nExecuting: npx ts-node ${scriptPath}`);
    try {
      const { stdout, stderr } = await execa('npx', ['ts-node', scriptPath], {
        stdio: 'inherit',
      });
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      console.log(`✅ Successfully completed ${script}`);
    } catch (error: any) {
      console.error(`❌ Error executing ${script}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n🎉 All Security questions seeding completed successfully!');
}

seedAllSecurityQuestions().catch(console.error);
