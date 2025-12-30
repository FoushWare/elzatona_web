const nextJest = require("next/jest.js");
const path = require("path");

// Get the absolute path to the admin directory
const adminDir = path.resolve(__dirname);

// CRITICAL: Configure Next.js to only use Pages Router
// This prevents Next.js from detecting both pages/ and app/ directories
// The admin app uses Pages Router exclusively, not App Router
//
// WORKAROUND: Next.js's find-pages-dir.js scans for both pages/ and app/ directories.
// Since we renamed src/app/ to src/layouts/, Next.js shouldn't detect it as an app directory.
// However, if Next.js is scanning parent directories, it might detect the website app's src/app/.
// The `dir` option restricts Next.js to only look at the admin directory.
//
// IMPORTANT: The `dir` option must be an absolute path to ensure Next.js only scans
// within the admin directory and doesn't detect app/ directories in sibling apps.
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  // Use absolute path to ensure Next.js can find the app directory
  // Next.js will automatically detect pages/ as the pages directory
  // Note: src/app/ is renamed to src/layouts/ to avoid Next.js detecting both pages/ and app/
  dir: adminDir,
  // Explicitly tell Next.js to only look for pages directory, not app directory
  // This prevents the "pages and app directories should be under the same folder" error
  // The dir option restricts Next.js to only scan within the admin directory
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // CRITICAL: Set rootDir to admin directory to prevent Next.js from scanning parent directories
  // This ensures Next.js only looks for pages/ in the admin app, not app/ directories elsewhere
  rootDir: adminDir,
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
    "^@elzatona/contexts$": "<rootDir>/__mocks__/AdminAuthContext.tsx",
    "^@elzatona/contexts/lib/AdminAuthContext$": "<rootDir>/__mocks__/AdminAuthContext.tsx",
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
