import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    // Use jsdom globally for browser-like tests
    environment: "jsdom",
    setupFiles: ["./tests/utils/test-db-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov", "html"],
      reportsDirectory: "./coverage",
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./apps/website/src"),
      ui: path.resolve(__dirname, "./libs/ui/src/index.ts"),
      auth: path.resolve(__dirname, "./libs/auth/src/index.ts"),
      database: path.resolve(__dirname, "./libs/database/src/index.ts"),
      "@elzatona/utilities": path.resolve(
        __dirname,
        "./libs/utilities/src/index.ts",
      ),
      "@elzatona/common-ui": path.resolve(
        __dirname,
        "./libs/common-ui/src/index.ts",
      ),
      "@elzatona/contexts": path.resolve(
        __dirname,
        "./libs/contexts/src/index.ts",
      ),
      "@elzatona/hooks": path.resolve(__dirname, "./libs/hooks/src/index.ts"),
      "@elzatona/shared-atoms": path.resolve(
        __dirname,
        "./libs/shared-atoms/src/index.ts",
      ),
      "@elzatona/types": path.resolve(__dirname, "./libs/types/src/index.ts"),
    },
  },
});

// To convert Jest tests to Vitest:
// - Replace jest.fn() with vi.fn()
// - Replace jest.spyOn() with vi.spyOn()
// - Use vi.mock() for mocking modules
// - Use expect(...).toBeCalled() => expect(...).toHaveBeenCalled()
// See https://vitest.dev/guide/migration.html for more.

// For backend-only (Node) tests, add this to the top of the test file:
//   // @vitest-environment node
