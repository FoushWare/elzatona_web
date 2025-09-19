#!/usr/bin/env tsx

/**
 * Admin Test Runner
 *
 * This script runs all admin-related tests to ensure the admin functionality
 * works correctly and prevents the issues we encountered with git hooks,
 * routing, and authentication.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const testFiles = [
  'tests/unit/admin-auth.test.ts',
  'tests/unit/admin-login-page.test.tsx',
  'tests/unit/admin-layout.test.tsx',
  'tests/integration/admin-auth-flow.test.ts',
  'tests/integration/admin-routing-stability.test.ts',
  'tests/e2e/admin-login-flow.spec.ts',
];

const testTypes = {
  unit: 'tests/unit/admin-*.test.{ts,tsx}',
  integration: 'tests/integration/admin-*.test.{ts,tsx}',
  e2e: 'tests/e2e/admin-*.spec.ts',
  all: 'tests/**/admin-*.{test,spec}.{ts,tsx}',
};

function runTests(testType: keyof typeof testTypes, verbose = false) {
  const pattern = testTypes[testType];
  const command = `npx jest ${pattern} ${verbose ? '--verbose' : ''} --passWithNoTests`;

  console.log(`🧪 Running ${testType} tests for admin functionality...`);
  console.log(`📝 Command: ${command}`);
  console.log('─'.repeat(50));

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log(`✅ ${testType} tests passed!`);
    return true;
  } catch {
    console.error(`❌ ${testType} tests failed!`);
    return false;
  }
}

function runE2ETests(verbose = false) {
  const command = `npx playwright test tests/e2e/admin-login-flow.spec.ts ${verbose ? '--reporter=list' : ''}`;

  console.log('🎭 Running E2E tests for admin login flow...');
  console.log(`📝 Command: ${command}`);
  console.log('─'.repeat(50));

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ E2E tests passed!');
    return true;
  } catch {
    console.error('❌ E2E tests failed!');
    return false;
  }
}

function checkTestFiles() {
  console.log('🔍 Checking test files...');

  const missingFiles = testFiles.filter(file => !existsSync(file));

  if (missingFiles.length > 0) {
    console.warn('⚠️  Missing test files:');
    missingFiles.forEach(file => console.warn(`   - ${file}`));
    return false;
  }

  console.log('✅ All test files exist!');
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const testType = (args[0] as keyof typeof testTypes) || 'all';
  const verbose = args.includes('--verbose') || args.includes('-v');

  console.log('🚀 Admin Test Runner');
  console.log('═'.repeat(50));

  // Check if test files exist
  if (!checkTestFiles()) {
    console.log('\n❌ Some test files are missing. Please create them first.');
    process.exit(1);
  }

  let allPassed = true;

  if (testType === 'all') {
    // Run all test types
    const testTypes = ['unit', 'integration', 'e2e'] as const;

    for (const type of testTypes) {
      console.log(`\n📋 Running ${type} tests...`);
      const passed =
        type === 'e2e' ? runE2ETests(verbose) : runTests(type, verbose);
      allPassed = allPassed && passed;

      if (!passed) {
        console.log(`\n❌ ${type} tests failed. Stopping execution.`);
        break;
      }
    }
  } else if (testType === 'e2e') {
    allPassed = runE2ETests(verbose);
  } else {
    allPassed = runTests(testType, verbose);
  }

  console.log('\n' + '═'.repeat(50));

  if (allPassed) {
    console.log('🎉 All admin tests passed!');
    console.log('✅ Admin functionality is working correctly.');
    console.log('🛡️  Protected against routing and authentication issues.');
  } else {
    console.log('💥 Some admin tests failed!');
    console.log('🔧 Please fix the failing tests before proceeding.');
    process.exit(1);
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Admin Test Runner

Usage: tsx tests/run-admin-tests.ts [test-type] [options]

Test Types:
  unit         Run unit tests only
  integration  Run integration tests only  
  e2e          Run E2E tests only
  all          Run all tests (default)

Options:
  --verbose, -v    Show verbose output
  --help, -h       Show this help message

Examples:
  tsx tests/run-admin-tests.ts                    # Run all tests
  tsx tests/run-admin-tests.ts unit               # Run unit tests only
  tsx tests/run-admin-tests.ts e2e --verbose      # Run E2E tests with verbose output

Test Files:
${testFiles.map(file => `  - ${file}`).join('\n')}
`);
  process.exit(0);
}

main();
