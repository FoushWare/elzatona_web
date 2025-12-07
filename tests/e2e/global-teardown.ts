/**
 * Global teardown for Playwright E2E tests
 * Runs once after all tests
 * Automatically cleans up test videos after successful runs to save space
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

async function globalTeardown() {
  console.log("🧹 Running global teardown...");

  // Clean up Playwright videos after successful test runs
  // Videos are only kept for failed tests (retain-on-failure)
  // This saves significant disk space (videos can be 22GB+)
  const cleanupScript = join(
    process.cwd(),
    "scripts",
    "cleanup-playwright-videos.sh",
  );

  if (existsSync(cleanupScript)) {
    try {
      console.log("📹 Cleaning up test videos...");
      execSync(`bash ${cleanupScript}`, { stdio: "inherit" });
      console.log("✅ Video cleanup complete");
    } catch (error) {
      // Don't fail teardown if cleanup fails
      console.warn("⚠️  Video cleanup failed (non-critical):", error);
    }
  } else {
    console.log("ℹ️  Cleanup script not found, skipping video cleanup");
  }

  // Add any other global teardown logic here
  // For example: clean up test data, close connections, etc.
}

export default globalTeardown;
