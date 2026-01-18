import type { Config } from "jest";

const config: Config = {
  displayName: "database",
  preset: "../../tests/config/jest.preset.js",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Performance optimizations for 8GB RAM Mac M2
  maxWorkers: process.env.JEST_MAX_WORKERS
    ? Number.parseInt(process.env.JEST_MAX_WORKERS, 10)
    : 1, // Default to 1 worker for 8GB RAM
  workerIdleMemoryLimit: "512MB", // Kill workers that exceed this memory
  cache: process.env.JEST_NO_CACHE !== "true",
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/database",
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/dist/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/**/index.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "integration.test.ts"],
  testEnvironment: "node",
};

export default config;
