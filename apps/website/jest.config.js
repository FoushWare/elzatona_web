const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@elzatona/shared-contexts$':
      '<rootDir>/src/test-utils/mocks/shared-contexts.ts',
    '^@elzatona/shared-components$':
      '<rootDir>/../../libs/shared-components/src/index.ts',
  },
  // Include tests from root tests directory
  testMatch: [
    '<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/../../tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  // Allow tests outside the app directory
  roots: ['<rootDir>', '<rootDir>/../../tests'],
  // Transform ESM modules - allow nuqs and other ESM packages
  transformIgnorePatterns: [
    'node_modules/(?!(nuqs|@supabase|@tanstack|@react-hook-form|lucide-react|@radix-ui)/)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
