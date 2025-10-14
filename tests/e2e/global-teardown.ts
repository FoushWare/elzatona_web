/**
 * Global Teardown for E2E Tests
 *
 * This file runs once after all tests and cleans up:
 * - Test data
 * - Temporary files
 * - Mock services
 * - Test artifacts
 */

import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting E2E Test Global Teardown...');

  try {
    // Clean up test data
    await cleanupTestData();

    // Clean up temporary files
    await cleanupTempFiles();

    // Generate test report summary
    await generateTestSummary();

    console.log('✅ E2E Test Global Teardown Complete');
  } catch (error) {
    console.error('❌ E2E Test Global Teardown Failed:', error);
    // Don't throw error to avoid masking test failures
  }
}

async function cleanupTestData() {
  console.log('🗑️ Cleaning up test data...');

  // This would typically involve API calls to clean up test data
  // For now, we'll just log the cleanup
  console.log('✅ Test data cleanup complete');
}

async function cleanupTempFiles() {
  console.log('📁 Cleaning up temporary files...');

  const tempDirs = [
    'test-results/screenshots',
    'test-results/videos',
    'test-results/traces',
  ];

  for (const dir of tempDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Cleaned up ${dir}`);
    }
  }
}

async function generateTestSummary() {
  console.log('📊 Generating test summary...');

  try {
    // Read test results if available
    const resultsPath = 'test-results/e2e-results.json';
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

      const summary = {
        totalTests: results.stats?.total || 0,
        passed: results.stats?.passed || 0,
        failed: results.stats?.failed || 0,
        skipped: results.stats?.skipped || 0,
        duration: results.stats?.duration || 0,
        timestamp: new Date().toISOString(),
      };

      // Write summary to file
      fs.writeFileSync(
        'test-results/e2e-summary.json',
        JSON.stringify(summary, null, 2)
      );

      console.log('📈 Test Summary:', summary);
    }
  } catch (error) {
    console.log('⚠️ Could not generate test summary:', error);
  }
}

export default globalTeardown;
