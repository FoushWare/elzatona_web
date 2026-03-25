import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');

const args = process.argv.slice(2);
const isAll = args.includes('all');
const isWatch = args.includes('watch');

async function runTests() {
    console.log('🚀 Starting admin test runner...');

    // Ensure environment is set to test
    process.env.APP_ENV = 'test';
    process.env.NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_APP_ENV = 'test';

    // Determine which tests to run
    let testCommand = 'npx';
    let testArgs = ['vitest', 'run', 'apps/admin'];

    if (isWatch) {
        testArgs = ['vitest', 'apps/admin'];
    }

    // If specific category is requested
    const categoryIndex = args.indexOf('category');
    if (categoryIndex !== -1 && args[categoryIndex + 1]) {
        const category = args[categoryIndex + 1];
        console.log(`📂 Filtering by category: ${category}`);
        testArgs.push('-t', category);
    }

    console.log(`💻 Executing: ${testCommand} ${testArgs.join(' ')}`);

    const child = spawn(testCommand, testArgs, {
        stdio: 'inherit',
        cwd: rootDir,
        env: {
            ...process.env,
            FORCE_COLOR: 'true'
        }
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            console.error(`❌ Tests failed with exit code ${code}`);
        } else {
            console.log('✅ Tests completed successfully.');
        }
        process.exit(code || 0);
    });
}

runTests().catch(err => {
    console.error('❌ Runner failed:', err);
    process.exit(1);
});
