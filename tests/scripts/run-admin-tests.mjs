#!/usr/bin/env node

/**
 * Comprehensive Admin Test Runner
 *
 * Runs all admin tests with proper configuration and reporting
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Running Comprehensive Admin Test Suite...\n');

const testConfig = {
  // Test files to run
  testFiles: [
    'tests/admin/admin-login-api.test.ts',
    'tests/admin/admin-login-ui.test.tsx',
    'tests/admin/admin-auth-integration.test.ts',
    'tests/admin/admin-dashboard-redirection.test.tsx',
    'tests/admin/navbar-switching-fix.test.tsx',
    'tests/admin/content-management-api.test.ts',
    'tests/admin/frontend-problem-solving-api.test.ts',
    'tests/admin/admin-ui-components.test.tsx',
    'tests/admin/admin-integration.test.tsx',
  ],

  // Test categories
  categories: {
    'Authentication Tests': [
      'tests/admin/admin-login-api.test.ts',
      'tests/admin/admin-login-ui.test.tsx',
      'tests/admin/admin-auth-integration.test.ts',
    ],
    'Navigation Tests': [
      'tests/admin/admin-dashboard-redirection.test.tsx',
      'tests/admin/navbar-switching-fix.test.tsx',
    ],
    'API Tests': [
      'tests/admin/content-management-api.test.ts',
      'tests/admin/frontend-problem-solving-api.test.ts',
    ],
    'UI Component Tests': ['tests/admin/admin-ui-components.test.tsx'],
    'Integration Tests': ['tests/admin/admin-integration.test.tsx'],
  },
};

function runTests() {
  try {
    console.log('📋 Test Categories:');
    Object.entries(testConfig.categories).forEach(([category, files]) => {
      console.log(`  ✅ ${category}: ${files.length} test file(s)`);
    });
    console.log('');

    // Run all tests
    console.log('🚀 Running all admin tests...\n');

    const jestCommand = [
      'npx jest',
      '--config=jest.config.js',
      '--setupFilesAfterEnv=jest.setup.js',
      '--testPathPattern=tests/admin/',
      '--verbose',
      '--coverage',
      '--coverageDirectory=coverage/admin',
      '--coverageReporters=text,html,lcov',
      '--passWithNoTests',
    ].join(' ');

    execSync(jestCommand, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    console.log('\n✅ All admin tests completed successfully!');

    // Generate test report
    generateTestReport();
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

function generateTestReport() {
  console.log('\n📊 Generating Test Report...');

  const report = {
    timestamp: new Date().toISOString(),
    testCategories: testConfig.categories,
    totalTestFiles: testConfig.testFiles.length,
    coverage: {
      directory: 'coverage/admin',
      reports: ['text', 'html', 'lcov'],
    },
    nextSteps: [
      'Review test coverage report in coverage/admin/index.html',
      'Check for any failing tests and fix issues',
      'Add new tests for any missing functionality',
      'Update tests when adding new features',
    ],
  };

  console.log('\n📈 Test Report Summary:');
  console.log(`  📅 Timestamp: ${report.timestamp}`);
  console.log(`  📁 Total Test Files: ${report.totalTestFiles}`);
  console.log(`  📊 Coverage Report: ${report.coverage.directory}/index.html`);

  console.log('\n🎯 Next Steps:');
  report.nextSteps.forEach((step, index) => {
    console.log(`  ${index + 1}. ${step}`);
  });
}

function runSpecificCategory(category) {
  const files = testConfig.categories[category];
  if (!files) {
    console.error(`❌ Category "${category}" not found. Available categories:`);
    Object.keys(testConfig.categories).forEach(cat => {
      console.log(`  - ${cat}`);
    });
    process.exit(1);
  }

  console.log(`🎯 Running tests for category: ${category}`);
  console.log(`📁 Test files: ${files.join(', ')}\n`);

  try {
    const jestCommand = [
      'npx jest',
      '--config=jest.config.js',
      '--setupFilesAfterEnv=jest.setup.js',
      files.join(' '),
      '--verbose',
    ].join(' ');

    execSync(jestCommand, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    console.log(`\n✅ ${category} tests completed successfully!`);
  } catch (error) {
    console.error(`\n❌ ${category} tests failed:`, error.message);
    process.exit(1);
  }
}

function runWatchMode() {
  console.log('👀 Starting watch mode for admin tests...\n');

  try {
    const jestCommand = [
      'npx jest',
      '--config=jest.config.js',
      '--setupFilesAfterEnv=jest.setup.js',
      '--testPathPattern=tests/admin/',
      '--watch',
      '--verbose',
    ].join(' ');

    execSync(jestCommand, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error('\n❌ Watch mode failed:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'all':
  case undefined:
    runTests();
    break;
  case 'category':
    const category = args[1];
    if (!category) {
      console.error('❌ Please specify a category name');
      console.log(
        'Available categories:',
        Object.keys(testConfig.categories).join(', ')
      );
      process.exit(1);
    }
    runSpecificCategory(category);
    break;
  case 'watch':
    runWatchMode();
    break;
  case 'help':
    console.log(`
🧪 Admin Test Runner

Usage:
  node scripts/run-admin-tests.mjs [command] [options]

Commands:
  all, (none)     Run all admin tests with coverage
  category <name> Run tests for specific category
  watch          Run tests in watch mode
  help           Show this help message

Categories:
${Object.keys(testConfig.categories)
  .map(cat => `  - ${cat}`)
  .join('\n')}

Examples:
  node scripts/run-admin-tests.mjs
  node scripts/run-admin-tests.mjs category "Authentication Tests"
  node scripts/run-admin-tests.mjs watch
    `);
    break;
  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log(
      'Run "node scripts/run-admin-tests.mjs help" for usage information'
    );
    process.exit(1);
}
