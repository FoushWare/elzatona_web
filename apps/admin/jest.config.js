const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Performance optimizations for 8GB RAM Mac M2
  maxWorkers: process.env.JEST_MAX_WORKERS
    ? parseInt(process.env.JEST_MAX_WORKERS)
    : 1, // Default to 1 worker for 8GB RAM
  workerIdleMemoryLimit: "512MB", // Kill workers that exceed this memory
  cache: process.env.JEST_NO_CACHE !== "true",
  cacheDirectory: "<rootDir>/.jest-cache",
  ...(process.env.JEST_RUN_IN_BAND === "true" ? { runInBand: true } : {}),
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: [
    "<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../pages/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../components/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/../../libs/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
