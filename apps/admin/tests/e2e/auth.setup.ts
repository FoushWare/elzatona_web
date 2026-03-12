import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../.auth/admin.json");

setup("authenticate as admin", async ({ page }) => {
  console.log("🔐 Starting admin authentication setup...");

  // Use the admin login page
  // Note: baseURL should be set to the admin app URL (e.g., http://localhost:3001)
  await page.goto("/admin/login");

  const email = process.env.ADMIN_EMAIL;
  // Fallback to 'password' which matches our seeded hash in init-test-db.mjs
  const password = process.env.ADMIN_PASSWORD || "password";

  if (!email) {
    throw new Error("ADMIN_EMAIL must be set for E2E tests");
  }

  console.log(`🔐 Attempting login for: ${email.substring(0, 10)}...`);

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard
  console.log("⏳ Waiting for dashboard navigation...");
  await page.waitForURL("**/admin/dashboard", { timeout: 30000 });

  // Verify we are indeed on the dashboard
  await expect(page).toHaveURL(/.*\/admin\/dashboard/);
  console.log("✅ Successfully reached admin dashboard");

  // Ensure the directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save storage state to the file
  await page.context().storageState({ path: authFile });
  console.log(`💾 Auth state saved to: ${authFile}`);
});
