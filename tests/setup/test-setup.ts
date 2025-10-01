/**
 * Test Setup Configuration
 *
 * Global setup for all content management tests
 */

import { beforeAll, afterAll } from '@jest/globals';

// Test data cleanup
const testDataIds = {
  categories: new Set<string>(),
  topics: new Set<string>(),
  learningPaths: new Set<string>(),
  questions: new Set<string>(),
  plans: new Set<string>(),
};

// Global test setup
beforeAll(async () => {
  console.log('🚀 Starting Content Management Test Suite');

  // Set up test environment
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    writable: true,
  });
  process.env.TEST_BASE_URL =
    process.env.TEST_BASE_URL || 'http://localhost:3000';

  // Verify test environment
  if (!process.env.TEST_BASE_URL) {
    throw new Error('TEST_BASE_URL environment variable is required');
  }
});

// Global test cleanup
afterAll(async () => {
  console.log('🧹 Cleaning up test data...');

  const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

  // Cleanup all test data
  const cleanupPromises = [];

  // Delete all test questions
  for (const questionId of testDataIds.questions) {
    cleanupPromises.push(
      fetch(`${BASE_URL}/api/questions/unified/${questionId}`, {
        method: 'DELETE',
      }).catch(err =>
        console.warn(`Failed to delete question ${questionId}:`, err)
      )
    );
  }

  // Delete all test learning paths
  for (const pathId of testDataIds.learningPaths) {
    cleanupPromises.push(
      fetch(`${BASE_URL}/api/learning-paths/${pathId}`, {
        method: 'DELETE',
      }).catch(err =>
        console.warn(`Failed to delete learning path ${pathId}:`, err)
      )
    );
  }

  // Delete all test topics
  for (const topicId of testDataIds.topics) {
    cleanupPromises.push(
      fetch(`${BASE_URL}/api/topics/${topicId}`, { method: 'DELETE' }).catch(
        err => console.warn(`Failed to delete topic ${topicId}:`, err)
      )
    );
  }

  // Delete all test categories
  for (const categoryId of testDataIds.categories) {
    cleanupPromises.push(
      fetch(`${BASE_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
      }).catch(err =>
        console.warn(`Failed to delete category ${categoryId}:`, err)
      )
    );
  }

  // Delete all test plans
  for (const planId of testDataIds.plans) {
    cleanupPromises.push(
      fetch(`${BASE_URL}/api/guided-learning/plans/${planId}`, {
        method: 'DELETE',
      }).catch(err => console.warn(`Failed to delete plan ${planId}:`, err))
    );
  }

  await Promise.allSettled(cleanupPromises);
  console.log('✅ Test cleanup completed');
});

// Export test data tracking
export { testDataIds };
