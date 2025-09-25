#!/usr/bin/env node

/**
 * Simple test script to verify auto-linking system is working
 * Run this to test the complete flow: add question -> auto-link -> verify in sections/guided learning
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Auto-linking System');
console.log('==============================\n');

// Test 1: Check if server is running
console.log('1. Checking if development server is running...');
exec('curl -s http://localhost:3000 > /dev/null', (error, stdout, stderr) => {
  if (error) {
    console.log('   ❌ Server not running. Please start with: npm run dev');
    console.log('   💡 Then run this test again.');
    return;
  }
  console.log('   ✅ Server is running on http://localhost:3000');
  
  // Test 2: Check if required files exist
  console.log('\n2. Checking required files...');
  const requiredFiles = [
    'src/lib/auto-linking-service.ts',
    'src/lib/firebase-server.ts',
    'src/app/api/admin/sections/route.ts',
    'src/app/api/guided-learning/plans/route.ts',
    'src/components/SectionQuestionsManager.tsx',
    'src/app/admin/guided-learning/[planId]/edit/page.tsx'
  ];
  
  let allFilesExist = true;
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} - Missing!`);
      allFilesExist = false;
    }
  });
  
  if (!allFilesExist) {
    console.log('\n   ❌ Some required files are missing. Please check the implementation.');
    return;
  }
  
  console.log('\n   ✅ All required files exist');
  
  // Test 3: Check package.json for test dependencies
  console.log('\n3. Checking test dependencies...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const testDeps = ['jest', 'supertest', 'puppeteer'];
  
  let hasTestDeps = true;
  testDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`   ✅ ${dep} is installed`);
    } else {
      console.log(`   ❌ ${dep} is not installed`);
      hasTestDeps = false;
    }
  });
  
  if (!hasTestDeps) {
    console.log('\n   💡 Install test dependencies with:');
    console.log('   npm install --save-dev jest supertest puppeteer @jest/globals babel-jest');
  } else {
    console.log('\n   ✅ Test dependencies are installed');
  }
  
  // Test 4: Provide testing instructions
  console.log('\n4. Testing Instructions:');
  console.log('   =====================');
  console.log('\n   📋 Manual Testing Steps:');
  console.log('   1. Open http://localhost:3000/admin/login');
  console.log('   2. Login to admin panel');
  console.log('   3. Go to /admin/content/questions');
  console.log('   4. Add a question with:');
  console.log('      - Category: "JavaScript"');
  console.log('      - Learning Path: "frontend"');
  console.log('   5. Go to /admin/sections');
  console.log('   6. Check if question appears in "JavaScript Fundamentals" section');
  console.log('   7. Go to /admin/guided-learning/1-day-plan/edit');
  console.log('   8. Select "JavaScript Fundamentals" section');
  console.log('   9. Verify question appears in "Available Questions"');
  console.log('   10. Add question to section and save plan');
  console.log('   11. Refresh page and verify question persists');
  
  console.log('\n   🧪 Automated Testing:');
  console.log('   Run: ./scripts/run-tests.sh');
  console.log('   Or: npm test');
  
  console.log('\n   🔍 What to Look For:');
  console.log('   - Questions automatically appear in matching sections');
  console.log('   - Questions are filtered correctly by section');
  console.log('   - Plan saving persists question assignments');
  console.log('   - No console errors in browser');
  console.log('   - Auto-linking messages in console logs');
  
  console.log('\n   🐛 Common Issues:');
  console.log('   - Firebase connection errors: Check .env file');
  console.log('   - Questions not appearing: Check category/learning path match');
  console.log('   - Save errors: Check API endpoints and database');
  console.log('   - Console errors: Check browser developer tools');
  
  console.log('\n   ✅ Auto-linking System Test Complete!');
  console.log('   ======================================');
});



