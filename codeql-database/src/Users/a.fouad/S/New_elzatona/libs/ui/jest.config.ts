import type { Config } from "jest";

const config: Config = {
  displayName: "ui",
  preset: "../../tests/config/jest.preset.js",
  // Performance optimizations for 8GB RAM Mac M2
  maxWorkers: process.env.JEST_MAX_WORKERS
    ? parseInt(process.env.JEST_MAX_WORKERS)
    : 1, // Default to 1 worker for 8GB RAM
  workerIdleMemoryLimit: "512MB", // Kill workers that exceed this memory
  cache: process.env.JEST_NO_CACHE !== "true",
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/ui",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
};

export default config;
