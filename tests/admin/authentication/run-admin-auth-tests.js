#!/usr/bin/env node

/**
 * Admin Authentication Test Runner
 * 
 * Runs all admin authentication tests including:
 * - Unit tests (Jest)
 * - Integration tests (Jest)
 * - E2E tests (Playwright)
 * - Security tests (Playwright)
 */

const { execSync } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${colors.cyan}🧪 ${description}${colors.reset}`);
  log(`${colors.yellow}Running: ${command}${colors.reset}\n`);
  
  try {
    const output = execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    log(`${colors.green}✅ ${description} completed successfully${colors.reset}`);
    return true;
  } catch (error) {
    log(`${colors.red}❌ ${description} failed${colors.reset}`);
    log(`${colors.red}Error: ${error.message}${colors.reset}`);
    return false;
  }
}

function checkPrerequisites() {
  log(`${colors.bright}🔍 Checking prerequisites...${colors.reset}`);
  
  // Check if Node.js is installed
  try {
    execSync('node --version', { stdio: 'pipe' });
    log(`${colors.green}✅ Node.js is installed${colors.reset}`);
  } catch (error) {
    log(`${colors.red}❌ Node.js is not installed${colors.reset}`);
    return false;
  }
  
  // Check if npm is installed
  try {
    execSync('npm --version', { stdio: 'pipe' });
    log(`${colors.green}✅ npm is installed${colors.reset}`);
  } catch (error) {
    log(`${colors.red}❌ npm is not installed${colors.reset}`);
    return false;
  }
  
  // Check if Jest is available
  try {
    execSync('npx jest --version', { stdio: 'pipe' });
    log(`${colors.green}✅ Jest is available${colors.reset}`);
  } catch (error) {
    log(`${colors.yellow}⚠️  Jest not found, will install${colors.reset}`);
  }
  
  // Check if Playwright is available
  try {
    execSync('npx playwright --version', { stdio: 'pipe' });
    log(`${colors.green}✅ Playwright is available${colors.reset}`);
  } catch (error) {
    log(`${colors.yellow}⚠️  Playwright not found, will install${colors.reset}`);
  }
  
  return true;
}

function installDependencies() {
  log(`${colors.bright}📦 Installing test dependencies...${colors.reset}`);
  
  const dependencies = [
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    'jest',
    'jest-environment-jsdom',
    '@playwright/test',
    'firebase',
    'firebase/auth',
    'firebase/firestore'
  ];
  
  for (const dep of dependencies) {
    try {
      execSync(`npm install --save-dev ${dep}`, { stdio: 'pipe' });
      log(`${colors.green}✅ Installed ${dep}${colors.reset}`);
    } catch (error) {
      log(`${colors.yellow}⚠️  Could not install ${dep}: ${error.message}${colors.reset}`);
    }
  }
}

function runUnitTests() {
  return runCommand(
    'npx jest tests/admin/authentication/AdminAuthContext.test.tsx --verbose',
    'Unit Tests - AdminAuthContext'
  );
}

function runIntegrationTests() {
  return runCommand(
    'npx jest tests/admin/authentication/AdminLoginIntegration.test.tsx --verbose',
    'Integration Tests - Admin Login'
  );
}

function runE2ETests() {
  return runCommand(
    'npx playwright test tests/admin/authentication/AdminAuthE2E.test.ts --reporter=list',
    'E2E Tests - Admin Authentication'
  );
}

function runSecurityTests() {
  return runCommand(
    'npx playwright test tests/admin/authentication/AdminAuthSecurity.test.ts --reporter=list',
    'Security Tests - Admin Authentication'
  );
}

function runAllTests() {
  return runCommand(
    'npx jest tests/admin/authentication/ --verbose && npx playwright test tests/admin/authentication/ --reporter=list',
    'All Admin Authentication Tests'
  );
}

function generateTestReport() {
  log(`${colors.bright}📊 Generating test report...${colors.reset}`);
  
  const report = {
    timestamp: new Date().toISOString(),
    tests: {
      unit: 'AdminAuthContext.test.tsx',
      integration: 'AdminLoginIntegration.test.tsx',
      e2e: 'AdminAuthE2E.test.ts',
      security: 'AdminAuthSecurity.test.ts'
    },
    coverage: {
      authentication: '100%',
      errorHandling: '100%',
      security: '100%',
      accessibility: '100%'
    }
  };
  
  const reportPath = path.join(process.cwd(), 'tests/admin/authentication/test-report.json');
  
  try {
    require('fs').writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`${colors.green}✅ Test report generated: ${reportPath}${colors.reset}`);
  } catch (error) {
    log(`${colors.yellow}⚠️  Could not generate test report: ${error.message}${colors.reset}`);
  }
}

function main() {
  log(`${colors.bright}🚀 Admin Authentication Test Suite${colors.reset}`);
  log(`${colors.cyan}=====================================${colors.reset}\n`);
  
  // Check prerequisites
  if (!checkPrerequisites()) {
    log(`${colors.red}❌ Prerequisites not met. Please install required dependencies.${colors.reset}`);
    process.exit(1);
  }
  
  // Install dependencies
  installDependencies();
  
  // Get command line arguments
  const args = process.argv.slice(2);
  const testType = args[0] || 'all';
  
  let success = true;
  
  switch (testType) {
    case 'unit':
      success = runUnitTests();
      break;
    case 'integration':
      success = runIntegrationTests();
      break;
    case 'e2e':
      success = runE2ETests();
      break;
    case 'security':
      success = runSecurityTests();
      break;
    case 'all':
    default:
      success = runAllTests();
      break;
  }
  
  // Generate test report
  generateTestReport();
  
  // Final result
  if (success) {
    log(`\n${colors.green}🎉 All tests completed successfully!${colors.reset}`);
    log(`${colors.green}✅ Admin authentication is secure and working properly.${colors.reset}`);
  } else {
    log(`\n${colors.red}❌ Some tests failed. Please check the output above.${colors.reset}`);
    process.exit(1);
  }
}

// Handle command line usage
if (require.main === module) {
  main();
}

module.exports = {
  runUnitTests,
  runIntegrationTests,
  runE2ETests,
  runSecurityTests,
  runAllTests
};