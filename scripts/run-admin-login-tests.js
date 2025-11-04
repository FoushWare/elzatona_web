#!/usr/bin/env node

/**
 * Admin Login Test Runner
 *
 * Runs all admin login tests including:
 * - Unit tests
 * - Integration tests
 * - E2E tests
 */

const { execSync } = require('child_process');
const path = require('path');

const testFiles = [
  'tests/admin/admin-login-page.test.tsx',
  'tests/admin/admin-login-integration.test.tsx',
  'tests/e2e/admin-login.spec.ts',
];

const testTypes = {
  unit: 'tests/admin/admin-login-page.test.tsx',
  integration: 'tests/admin/admin-login-integration.test.tsx',
  e2e: 'tests/e2e/admin-login.spec.ts',
  all: testFiles,
};

function runTests(type = 'all') {
  console.log(`🧪 Running Admin Login Tests: ${type.toUpperCase()}`);
  console.log('='.repeat(50));

  try {
    if (type === 'all') {
      // Run all test types
      console.log('\n📋 Running Unit Tests...');
      runJestTest(testTypes.unit);

      console.log('\n🔗 Running Integration Tests...');
      runJestTest(testTypes.integration);

      console.log('\n🌐 Running E2E Tests...');
      runPlaywrightTest(testTypes.e2e);
    } else if (type === 'e2e') {
      runPlaywrightTest(testTypes.e2e);
    } else if (testTypes[type]) {
      runJestTest(testTypes[type]);
    } else {
      console.error(`❌ Unknown test type: ${type}`);
      console.log('Available types: unit, integration, e2e, all');
      process.exit(1);
    }

    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

function runJestTest(testFile) {
  try {
    const command = `npx jest ${testFile} --verbose --coverage`;
    console.log(`Running: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    throw new Error(`Jest test failed: ${error.message}`);
  }
}

function runPlaywrightTest(testFile) {
  try {
    const command = `npx playwright test ${testFile} --headed`;
    console.log(`Running: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    throw new Error(`Playwright test failed: ${error.message}`);
  }
}

function showHelp() {
  console.log(`
🧪 Admin Login Test Runner

Usage: node run-admin-login-tests.js [type]

Types:
  unit        Run unit tests only
  integration Run integration tests only  
  e2e         Run E2E tests only
  all         Run all tests (default)

Examples:
  node run-admin-login-tests.js
  node run-admin-login-tests.js unit
  node run-admin-login-tests.js e2e

Test Files:
  ${testFiles.join('\n  ')}

Prerequisites:
  - Jest configured for React testing
  - Playwright installed and configured
  - Admin server running on localhost:3001
  - Supabase configured with test credentials
`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const testType = args[0] || 'all';

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Run tests
runTests(testType);
