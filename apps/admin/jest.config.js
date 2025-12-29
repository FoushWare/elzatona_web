const nextJest = require("next/jest.js");
const path = require("path");

// Get the absolute path to the admin directory
const adminDir = path.resolve(__dirname);

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  // Use absolute path to ensure Next.js can find the app directory
  // Next.js will automatically detect src/app as the app directory
  dir: adminDir,
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Performance optimizations for 8GB RAM Mac M2
  maxWorkers: process.env.JEST_MAX_WORKERS
    ? Number.parseInt(process.env.JEST_MAX_WORKERS, 10)
    : 1, // Default to 1 worker for 8GB RAM
  workerIdleMemoryLimit: "512MB", // Kill workers that exceed this memory
  cache: process.env.JEST_NO_CACHE !== "true",
  cacheDirectory: "<rootDir>/.jest-cache",
  ...(process.env.JEST_RUN_IN_BAND === "true" ? { runInBand: true } : {}),
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@elzatona/contexts$": "<rootDir>/../../libs/contexts/src/index.ts",
    "^@elzatona/common-ui$": "<rootDir>/../../libs/common-ui/src/index.ts",
    "^@elzatona/hooks$": "<rootDir>/../../libs/hooks/src/index.ts",
    "^lucide-react$":
      "<rootDir>/../../libs/utilities/src/lib/test-utils/mocks/lucide-react.tsx",
    // Mock nuqs to avoid ESM issues in tests
    "^nuqs$": "<rootDir>/../../libs/utilities/src/lib/test-utils/mocks/nuqs.ts",
    // Mock shiki ESM module
    "^shiki$":
      "<rootDir>/../../libs/utilities/src/lib/test-utils/mocks/shiki.ts",
    // Mock refractor ESM module (used by react-syntax-highlighter)
    "^refractor$":
      "<rootDir>/../../libs/utilities/src/lib/test-utils/mocks/refractor.ts",
  },
  testMatch: [
    "<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../pages/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../components/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../../libs/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
