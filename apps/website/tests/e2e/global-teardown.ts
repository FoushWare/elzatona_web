/**
 * Global teardown for Playwright E2E tests.
 * Runs once after all test workers complete.
 */

async function globalTeardown() {
  // Keep teardown lightweight and deterministic for CI stability.
  console.log("🧹 Running global teardown...");
}

export default globalTeardown;
