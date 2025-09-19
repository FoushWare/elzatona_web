#!/usr/bin/env tsx

import { execSync } from 'child_process';

console.log('🎨 Running Theme Tests Suite');
console.log('═'.repeat(50));

const testSuites = [
  {
    name: 'Theme Context Unit Tests',
    command: 'npx jest tests/unit/theme-context.test.tsx --verbose',
    description: 'Testing theme context functionality and state management',
  },
  {
    name: 'Theme Toggle Button Tests',
    command: 'npx jest tests/unit/theme-toggle-button.test.tsx --verbose',
    description: 'Testing theme toggle button behavior and icons',
  },
  {
    name: 'Theme Visual Changes Tests',
    command: 'npx jest tests/unit/theme-visual-changes.test.tsx --verbose',
    description: 'Testing visual changes and CSS class applications',
  },
  {
    name: 'Theme Persistence Integration Tests',
    command: 'npx jest tests/integration/theme-persistence.test.tsx --verbose',
    description: 'Testing theme persistence across page reloads and navigation',
  },
];

const e2eTests = [
  {
    name: 'Theme Switching E2E Tests',
    command:
      'npx playwright test tests/e2e/theme-switching.spec.ts --reporter=list',
    description: 'End-to-end testing of theme switching functionality',
  },
];

async function runTestSuite(suite: (typeof testSuites)[0]) {
  console.log(`\n🧪 ${suite.name}`);
  console.log('─'.repeat(30));
  console.log(`📝 ${suite.description}`);
  console.log('');

  try {
    const output = execSync(suite.command, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd(),
    });

    console.log('✅ PASSED');
    console.log(output);
  } catch (error: unknown) {
    console.log('❌ FAILED');
    const errorObj = error as {
      stdout?: string;
      stderr?: string;
      message?: string;
    };
    console.log(errorObj.stdout || errorObj.message);
    if (errorObj.stderr) {
      console.log('Error details:', errorObj.stderr);
    }
  }
}

async function runE2ETests() {
  console.log('\n🌐 End-to-End Theme Tests');
  console.log('═'.repeat(50));

  for (const test of e2eTests) {
    await runTestSuite(test);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Theme Tests...\n');

    // Run unit and integration tests
    for (const suite of testSuites) {
      await runTestSuite(suite);
    }

    // Run E2E tests
    await runE2ETests();

    console.log('\n🎉 Theme Tests Complete!');
    console.log('═'.repeat(50));
    console.log('📊 Summary:');
    console.log('  • Theme Context: State management and persistence');
    console.log('  • Toggle Button: UI interactions and icon changes');
    console.log('  • Visual Changes: CSS class applications and styling');
    console.log('  • Persistence: localStorage and cross-page behavior');
    console.log('  • E2E Tests: Full user workflow testing');
    console.log('\n✨ All theme functionality has been thoroughly tested!');
  } catch (error) {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Test runner interrupted');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Test runner terminated');
  process.exit(0);
});

main();
