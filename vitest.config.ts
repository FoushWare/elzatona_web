import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // Use jsdom globally for browser-like tests
    environment: 'jsdom',
    setupFiles: ['./tests/utils/test-db-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov', 'html'],
      reportsDirectory: './coverage',
      exclude: ['**/node_modules/**', '**/dist/**'],
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
