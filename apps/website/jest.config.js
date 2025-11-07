const nextJest = require('next/jest.js');
const path = require('path');

// Get the absolute path to the website directory
const websiteDir = path.resolve(__dirname);

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  // Use absolute path to ensure Next.js can find the app directory
  dir: websiteDir,
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Performance optimizations
  maxWorkers: process.env.CI ? '50%' : '25%', // Limit workers to reduce machine load
  cache: true, // Enable Jest cache for faster subsequent runs
  cacheDirectory: '<rootDir>/.jest-cache',
  // Run tests in sequence if SKIP_TESTS is not set and we want to reduce load
  ...(process.env.JEST_RUN_IN_BAND === 'true' ? { runInBand: true } : {}),
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@elzatona/shared-contexts$':
      '<rootDir>/src/test-utils/mocks/shared-contexts.ts',
    '^@elzatona/shared-components$':
      '<rootDir>/../../libs/shared-components/src/index.ts',
  },
  // Include tests from root tests directory, but exclude e2e tests (Playwright)
  // Note: testPathIgnorePatterns handles the exclusion, so we keep testMatch simple
  testMatch: [
    '<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/../../tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  // Exclude e2e tests - these should only be run by Playwright
  // Jest uses regex patterns, so we match any path containing e2e
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/tests/e2e/', // Exclude e2e directory
    '.*/e2e/.*', // Exclude any path with /e2e/ in it
    '.*\\.spec\\.ts$', // Exclude .spec.ts files (Playwright convention)
    '.*\\.spec\\.tsx$', // Exclude .spec.tsx files (Playwright convention)
    '.*/tests/e2e/.*', // More specific pattern for e2e tests
    '.*e2e.*', // Catch-all for any path containing "e2e"
  ],
  // Allow tests outside the app directory
  roots: ['<rootDir>', '<rootDir>/../../tests'],
  // Transform ESM modules - allow nuqs and other ESM packages
  // Need to include the full path for nuqs submodules
  transformIgnorePatterns: [
    'node_modules/(?!(nuqs|@supabase/supabase-js|@tanstack|@react-hook-form|lucide-react|@radix-ui)/)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
