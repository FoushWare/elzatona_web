#!/usr/bin/env node

/**
 * Content Management Test Runner
 * 
 * Runs all content management tests in the correct order
 */

const { execSync } = require('child_process');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

console.log('🧪 Content Management Test Runner');
console.log('==================================');
console.log(`Base URL: ${BASE_URL}`);
console.log('');

// Test configuration
const testSuites = [
  {
    name: 'Unit Tests - Content Linking Logic',
    command: 'jest tests/unit/content-linking.test.ts --verbose',
    description: 'Tests core content linking logic and validation'
  },
  {
    name: 'API Tests - Content Management Endpoints',
    command: 'jest tests/api/content-management-api.test.ts --verbose',
    description: 'Tests all API endpoints for content management'
  },
  {
    name: 'Integration Tests - Content Management Flow',
    command: 'jest tests/integration/content-management-flow.test.ts --verbose',
    description: 'Tests complete content management workflow'
  },
  {
    name: 'E2E Tests - Content Management UI Flow',
    command: 'playwright test tests/e2e/content-management-e2e.test.ts --reporter=list',
    description: 'Tests complete user journey through the UI'
  }
];

// Helper function to run a test suite
function runTestSuite(suite) {
  console.log(`\n🚀 Running: ${suite.name}`);
  console.log(`📝 Description: ${suite.description}`);
  console.log('─'.repeat(50));
  
  try {
    const startTime = Date.now();
    execSync(suite.command, { 
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env, TEST_BASE_URL: BASE_URL }
    });
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ ${suite.name} completed successfully in ${duration}s`);
    return true;
  } catch (error) {
    console.error(`❌ ${suite.name} failed:`);
    console.error(error.message);
    return false;
  }
}

// Helper function to check if server is running
function checkServerRunning() {
  try {
    const response = execSync(`curl -s -o /dev/null -w "%{http_code}" ${BASE_URL}`, { encoding: 'utf8' });
    return response.trim() === '200';
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔍 Checking if development server is running...');
  
  if (!checkServerRunning()) {
    console.error('❌ Development server is not running!');
    console.error('Please start the server with: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Development server is running');
  
  // Run test suites
  const results = [];
  
  for (const suite of testSuites) {
    const success = runTestSuite(suite);
    results.push({ suite: suite.name, success });
    
    if (!success) {
      console.log('\n⚠️  Test suite failed. Continuing with remaining tests...');
    }
  }
  
  // Summary
  console.log('\n📊 Test Results Summary');
  console.log('=======================');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.suite}`);
  });
  
  console.log(`\nTotal: ${results.length} test suites`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed. Please check the output above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed successfully!');
    process.exit(0);
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Run the tests
main().catch(error => {
  console.error('❌ Test runner failed:', error);
  process.exit(1);
});
