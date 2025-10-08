#!/usr/bin/env node

/**
 * Admin Login Test Runner
 *
 * Runs all admin login related tests to ensure functionality is working correctly.
 * This script can be used in CI/CD pipelines or for local testing.
 */

const { execSync } = require('child_process');
const path = require('path');

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

for (const testFile of testFiles) {
  try {
    console.log(`📋 Running ${testFile}...`);

    const result = execSync(`npx jest ${testFile} --verbose`, {
      encoding: 'utf8',
      stdio: 'pipe',
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

if (failedTests === 0) {
  console.log(
    '\n🎉 All admin login tests passed! The admin authentication system is working correctly.'
  );
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the output above.');
  process.exit(1);
}
