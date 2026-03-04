/**
 * Global teardown for Playwright E2E tests
 * Runs once after all tests have completed
 */
async function globalTeardown() {
    console.log("🧹 Running global teardown...");
    // Add any global cleanup logic here
    // For example: cleanup test data, close connections, etc.
}

export default globalTeardown;
