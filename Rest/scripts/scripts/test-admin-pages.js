#!/usr/bin/env node

/**
 * Admin Pages Test Script
 * Tests the admin application functionality
 */

const http = require('http');
const https = require('https');

const ADMIN_URL = 'http://localhost:3001';
const TIMEOUT = 5000;

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: [],
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: TIMEOUT }, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () =>
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        })
      );
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
  });
}

function addTest(name, passed, message = '') {
  results.tests.push({ name, passed, message });
  if (passed) {
    results.passed++;
    console.log(`✅ ${name}`);
  } else {
    results.failed++;
    console.log(`❌ ${name}: ${message}`);
  }
}

async function testAdminPages() {
  console.log('🧪 Testing Admin Pages...\n');

  try {
    // Test 1: Admin homepage loads
    console.log('📄 Testing admin homepage...');
    const response = await makeRequest(ADMIN_URL);

    addTest(
      'Admin homepage loads',
      response.statusCode === 200,
      `Expected 200, got ${response.statusCode}`
    );

    // Test 2: Check for authentication requirement or loading state
    addTest(
      'Shows authentication requirement or loading',
      response.body.includes('Admin Access Required') ||
        response.body.includes('Loading...'),
      'Page should show authentication requirement or loading state'
    );

    // Test 3: Check for login button or loading spinner
    addTest(
      'Has login button or loading state',
      response.body.includes('Login') ||
        response.body.includes('Loading...') ||
        response.body.includes('animate-spin'),
      'Page should have a login button or loading state'
    );

    // Test 4: Check for proper title
    addTest(
      'Has correct title',
      response.body.includes('Admin Dashboard - Elzatona'),
      'Page should have correct title'
    );

    // Test 5: Check for proper meta description
    addTest(
      'Has meta description',
      response.body.includes('Admin dashboard for managing Elzatona content'),
      'Page should have proper meta description'
    );

    // Test 6: Check for dashboard content when authenticated
    addTest(
      'Has dashboard structure',
      response.body.includes('Admin Dashboard') ||
        response.body.includes('Admin Access Required'),
      'Page should have proper dashboard structure'
    );
  } catch (error) {
    addTest('Admin server connectivity', false, error.message);
  }

  // Test 7: Check for proper HTML structure
  try {
    const response = await makeRequest(ADMIN_URL);
    addTest(
      'Valid HTML structure',
      response.body.includes('<!DOCTYPE html>') &&
        response.body.includes('</html>'),
      'Should have valid HTML structure'
    );
  } catch (error) {
    addTest('HTML structure validation', false, error.message);
  }

  // Test 8: Check for Next.js specific elements
  try {
    const response = await makeRequest(ADMIN_URL);
    addTest(
      'Next.js application',
      response.body.includes('_next') || response.body.includes('next'),
      'Should be a Next.js application'
    );
  } catch (error) {
    addTest('Next.js validation', false, error.message);
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(
    `📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`
  );

  if (results.failed === 0) {
    console.log('\n🎉 All admin page tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Check the details above.');
    process.exit(1);
  }
}

// Run tests
testAdminPages().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  process.exit(1);
});
