#!/usr/bin/env tsx

import { execSync } from 'child_process';
import path from 'path';

console.log('🧪 Running Admin Authentication Tests...\n');

const testSuites = [
  {
    name: 'Unit Tests - useAdminAuth Hook',
    command: 'npx jest tests/unit/useAdminAuth.test.tsx --verbose',
    description: 'Testing authentication hook functionality'
  },
  {
    name: 'Integration Tests - Authentication Components',
    command: 'npx jest tests/integration/admin-auth-integration.test.tsx --verbose',
    description: 'Testing component integration and navigation'
  },
  {
    name: 'E2E Tests - Complete Authentication Flow',
    command: 'npx playwright test tests/e2e/admin-auth-complete-flow.spec.ts --reporter=list',
    description: 'Testing end-to-end authentication scenarios'
  }
];

let allPassed = true;

for (const suite of testSuites) {
  console.log(`\n📋 ${suite.name}`);
  console.log(`📝 ${suite.description}`);
  console.log('─'.repeat(60));
  
  try {
    execSync(suite.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`✅ ${suite.name} - PASSED\n`);
  } catch (error) {
    console.log(`❌ ${suite.name} - FAILED\n`);
    allPassed = false;
  }
}

console.log('─'.repeat(60));
if (allPassed) {
  console.log('🎉 All authentication tests passed!');
  console.log('🔒 Admin authentication flow is working correctly.');
  console.log('🚫 No infinite redirect loops detected.');
} else {
  console.log('⚠️  Some tests failed. Please review the output above.');
  process.exit(1);
}


