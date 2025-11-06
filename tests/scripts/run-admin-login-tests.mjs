#!/usr/bin/env node

/**
 * Admin Login Test Runner
 *
 * Runs all admin login related tests to ensure functionality is working correctly.
 * This script can be used in CI/CD pipelines or for local testing.
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Running Admin Login Tests...\n');

const testFiles = [
  'tests/admin/admin-login-api.test.ts',
  'tests/admin/admin-login-ui.test.tsx',
  'tests/admin/admin-auth-integration.test.ts',
  'tests/admin/admin-dashboard-redirection.test.tsx',
  'tests/admin/navbar-switching-fix.test.tsx',
];

let passedTests = 0;
let failedTests = 0;
const results = [];

// Change to website directory for Next.js Jest config
const websiteDir = path.resolve(__dirname, '../../apps/website');
const originalCwd = process.cwd();

// Change to website directory before running tests
process.chdir(websiteDir);

for (const testFile of testFiles) {
  try {
    console.log(`📋 Running ${testFile}...`);

    // Use absolute path from root for test files
    const testFilePath = path.resolve(originalCwd, testFile);
    // Use absolute path so Jest can find it regardless of cwd
    const result = execSync(`npx jest ${testFilePath} --verbose`, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: websiteDir,
    });

    console.log(`✅ ${testFile} - PASSED`);
    passedTests++;
    results.push({ file: testFile, status: 'PASSED', output: result });
  } catch (error) {
    console.log(`❌ ${testFile} - FAILED`);
    failedTests++;
    results.push({
      file: testFile,
      status: 'FAILED',
      output: error.stdout || error.message,
    });
  }
}

console.log('\n📊 Test Results Summary:');
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📈 Total: ${testFiles.length}`);

if (failedTests > 0) {
  console.log('\n🔍 Failed Test Details:');
  results
    .filter(result => result.status === 'FAILED')
    .forEach(result => {
      console.log(`\n❌ ${result.file}:`);
      console.log(result.output);
    });
}

// Restore original directory
process.chdir(originalCwd);

if (failedTests === 0) {
  console.log(
    '\n🎉 All admin login tests passed! The admin authentication system is working correctly.'
  );
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the output above.');
  process.chdir(originalCwd);
  process.exit(1);
}
