#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Firebase Admin Authentication System
 *
 * This script runs all tests with proper configuration and reporting
 */

import { execSync } from 'child_process';
import fs from 'fs';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command: string, description: string) {
  log(`\n${colors.cyan}Running: ${description}${colors.reset}`);
  log(`${colors.yellow}Command: ${command}${colors.reset}`);

  try {
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd(),
    });
    log(
      `${colors.green}✅ ${description} completed successfully${colors.reset}`
    );
    return { success: true, output };
  } catch (error) {
    log(`${colors.red}❌ ${description} failed${colors.reset}`);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    log(`${colors.red}Error: ${errorMessage}${colors.reset}`);
    return { success: false, error: errorMessage };
  }
}

function checkTestFiles() {
  log(`\n${colors.bright}${colors.blue}📋 Checking Test Files${colors.reset}`);

  const testDirectories = ['tests/unit', 'tests/integration', 'tests/fixtures'];

  const testFiles = [
    'tests/unit/admin-auth.test.ts',
    'tests/unit/section-service.test.ts',
    'tests/unit/audio-upload.test.ts',
    'tests/unit/backup-service.test.ts',
    'tests/unit/components/SectionManager.test.tsx',
    'tests/unit/components/QuestionCreator.test.tsx',
    'tests/integration/admin-auth-flow.test.ts',
    'tests/integration/section-management-flow.test.ts',
    'tests/integration/api-routes.test.ts',
    'tests/setup.ts',
    'jest.config.js',
    'jest.setup.js',
  ];

  let allFilesExist = true;

  testDirectories.forEach(dir => {
    if (fs.existsSync(dir)) {
      log(`${colors.green}✅ Directory exists: ${dir}${colors.reset}`);
    } else {
      log(`${colors.red}❌ Directory missing: ${dir}${colors.reset}`);
      allFilesExist = false;
    }
  });

  testFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log(`${colors.green}✅ Test file exists: ${file}${colors.reset}`);
    } else {
      log(`${colors.red}❌ Test file missing: ${file}${colors.reset}`);
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

function runTests() {
  log(
    `\n${colors.bright}${colors.magenta}🚀 Running Comprehensive Test Suite${colors.reset}`
  );

  const testCommands = [
    {
      command: 'npm run test:unit',
      description: 'Unit Tests',
    },
    {
      command: 'npm run test:integration',
      description: 'Integration Tests',
    },
    {
      command: 'npm run test:coverage',
      description: 'Coverage Report',
    },
    {
      command: 'npm run lint',
      description: 'Linting Check',
    },
  ];

  const results: Array<{
    description: string;
    success: boolean;
    output?: string;
    error?: string;
  }> = [];

  testCommands.forEach(({ command, description }) => {
    const result = runCommand(command, description);
    results.push({ description, ...result });
  });

  return results;
}

function generateTestReport(
  results: Array<{
    description: string;
    success: boolean;
    output?: string;
    error?: string;
  }>
) {
  log(`\n${colors.bright}${colors.blue}📊 Test Report Summary${colors.reset}`);

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const total = results.length;

  log(`\n${colors.bright}Results:${colors.reset}`);
  log(`${colors.green}✅ Successful: ${successful}/${total}${colors.reset}`);
  log(`${colors.red}❌ Failed: ${failed}/${total}${colors.reset}`);

  if (failed > 0) {
    log(`\n${colors.red}Failed Tests:${colors.reset}`);
    results
      .filter(r => !r.success)
      .forEach(r => {
        log(`${colors.red}  - ${r.description}${colors.reset}`);
      });
  }

  // Generate coverage summary if available
  const coverageFile = 'coverage/lcov-report/index.html';
  if (fs.existsSync(coverageFile)) {
    log(
      `\n${colors.green}📈 Coverage report generated: ${coverageFile}${colors.reset}`
    );
  }

  return { successful, failed, total };
}

function main() {
  log(
    `${colors.bright}${colors.cyan}🧪 Firebase Admin Authentication System - Test Runner${colors.reset}`
  );
  log(
    `${colors.cyan}================================================${colors.reset}`
  );

  // Check if we're in the right directory
  if (!fs.existsSync('package.json')) {
    log(
      `${colors.red}❌ Error: package.json not found. Please run this script from the project root.${colors.reset}`
    );
    process.exit(1);
  }

  // Check test files
  const filesExist = checkTestFiles();
  if (!filesExist) {
    log(
      `${colors.red}❌ Some test files are missing. Please ensure all tests are properly set up.${colors.reset}`
    );
    process.exit(1);
  }

  // Run tests
  const results = runTests();

  // Generate report
  const report = generateTestReport(results);

  // Final status
  if (report.failed === 0) {
    log(
      `\n${colors.bright}${colors.green}🎉 All tests passed successfully!${colors.reset}`
    );
    log(
      `${colors.green}The Firebase Admin Authentication System is ready for production.${colors.reset}`
    );
  } else {
    log(
      `\n${colors.bright}${colors.red}⚠️  Some tests failed. Please review the errors above.${colors.reset}`
    );
    process.exit(1);
  }
}

// Run the test suite
if (require.main === module) {
  main();
}

module.exports = {
  runTests,
  checkTestFiles,
  generateTestReport,
};
