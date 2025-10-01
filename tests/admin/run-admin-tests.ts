import { execSync } from 'child_process';
import path from 'path';

const runCommand = (command: string, description: string) => {
  console.log(`\n--- ${description} ---`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} PASSED`);
  } catch (error) {
    console.error(`❌ ${description} FAILED`);
    process.exit(1);
  }
};

const main = async () => {
  console.log('🚀 Running comprehensive admin tests...');

  // Ensure Next.js server is running for E2E tests
  console.log('\n--- Checking if Next.js server is running ---');
  try {
    execSync(
      'curl -s http://localhost:3000/admin/login | grep -q "Admin Login"',
      { stdio: 'ignore' }
    );
    console.log('✅ Next.js server is running.');
  } catch (error) {
    console.log(
      '⚠️ Next.js server not detected. Starting it in the background...'
    );
    // Start Next.js server in the background
    execSync('npm run dev > /dev/null 2>&1 &', { stdio: 'ignore' });
    // Give it some time to start
    await new Promise(resolve => setTimeout(resolve, 10000));
    try {
      execSync(
        'curl -s http://localhost:3000/admin/login | grep -q "Admin Login"',
        { stdio: 'ignore' }
      );
      console.log('✅ Next.js server started successfully.');
    } catch (startError) {
      console.error(
        '❌ Failed to start Next.js server. Please start it manually with `npm run dev`.'
      );
      process.exit(1);
    }
  }

  // Run Core Unit Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/components')} --verbose`,
    'Running Core Unit Tests for Admin Components'
  );

  // Run Advanced Unit Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/components/AdminNavbar.advanced.test.tsx')} ${path.join(__dirname, 'unit/components/AdminDashboard.test.tsx')} ${path.join(__dirname, 'unit/components/AdminLoginPage.advanced.test.tsx')} ${path.join(__dirname, 'unit/components/AdminLayout.advanced.test.tsx')} ${path.join(__dirname, 'unit/components/AdminPage.advanced.test.tsx')} --verbose`,
    'Running Advanced Component Tests'
  );

  // Run Advanced Hook Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/hooks/useAdminAuth.advanced.test.tsx')} --verbose`,
    'Running Advanced Hook Tests'
  );

  // Run Advanced Topic Component Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/components/TopicManager.advanced.test.tsx')} ${path.join(__dirname, 'unit/components/TopicSelector.advanced.test.tsx')} --verbose`,
    'Running Advanced Topic Component Tests'
  );

  // Run Performance Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/performance')} --verbose`,
    'Running Performance Tests'
  );

  // Run Accessibility Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/accessibility')} --verbose`,
    'Running Accessibility Tests'
  );

  // Run Edge Case Tests
  runCommand(
    `jest ${path.join(__dirname, 'unit/edge-cases')} --verbose`,
    'Running Edge Case Tests'
  );

  // Run Integration Tests
  runCommand(
    `jest ${path.join(__dirname, 'integration')} --verbose`,
    'Running Integration Tests for Admin Components'
  );

  // Run API Tests
  runCommand(
    `jest ${path.join(__dirname, 'api')} --verbose`,
    'Running API Tests for Admin Endpoints'
  );

  // Run E2E Tests
  runCommand(
    `playwright test ${path.join(__dirname, 'e2e')} --reporter=list`,
    'Running E2E Tests for Admin Workflows'
  );

  console.log('\n🎉 All admin tests passed!');
  process.exit(0);
};

main();
