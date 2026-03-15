// Force trigger formatting fix for CI
import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../.auth/admin.json");

setup("authenticate as admin", async ({ page }) => {
  console.log("🔐 Starting admin authentication setup...");

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set for E2E tests. " +
        "Please check your GitHub Secrets or .env.test.local file.",
    );
  }

  // Use the admin login page
  console.log("🌐 Navigating to /admin/login...");
  await page.goto("/admin/login", { waitUntil: "networkidle" });

  // Handle the initial "Loading..." state of the Admin Auth Provider
  console.log("⏳ Waiting for login form to be ready...");
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');

  // Wait for inputs to be visible (handles the spinner state)
  await emailInput.waitFor({ state: "visible", timeout: 15000 });
  await passwordInput.waitFor({ state: "visible", timeout: 15000 });

  console.log(`🔐 Attempting login for: ${email.substring(0, 10)}...`);

  await emailInput.fill(email);
  await passwordInput.fill(password);

  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // Wait for navigation to dashboard
  console.log("⏳ Waiting for dashboard navigation...");
  // Use a more flexible URL match to handle trailing slashes or query params
  await page.waitForURL(/.*\/admin\/dashboard/, { timeout: 30000 });

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
