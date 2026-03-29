// Force trigger formatting fix for CI
import { test as setup, expect } from "@playwright/test";
import { resolve, dirname } from "path";
import fs from "fs";
import { setupAdminMocks } from "./support/mocks";

const authFile = resolve(__dirname, "../.auth/admin.json");

setup("authenticate as admin", async ({ page }) => {
  // Set up E2E mocks to bypass real Supabase/API calls
  await setupAdminMocks(page);

  console.log("🔐 Starting admin authentication setup...");

  const email = process.env.ADMIN_EMAIL || "test-admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "test-password-here";

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

  // Listen for console logs from the page
  page.on("console", (msg) => console.log(`[Browser] ${msg.text()}`));
  page.on("pageerror", (err) => console.error(`[Browser Error] ${err.message}`));

  await emailInput.fill(email);
  await passwordInput.fill(password);

  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // Check for error toast or message if navigation doesn't happen quickly
  const errorAlert = page.locator('.sonner-toast, [role="alert"], :text("Invalid"), :text("failed")').first();
  
  // Wait for either navigation or an error message
  const navigationPromise = page.waitForURL(/.*\/admin\/dashboard/, { timeout: 15000 }).catch(() => null);
  const errorPromise = errorAlert.waitFor({ state: "visible", timeout: 15000 }).catch(() => null);

  const result = await Promise.race([navigationPromise, errorPromise]);

  // Clean up existing auth file if it exists
  if (fs.existsSync(authFile)) {
    console.log("💾 Cleaning up existing auth file...");
    fs.unlinkSync(authFile);
  }

  // Wait for navigation to dashboard or check for error
  console.log("⏳ Waiting for dashboard navigation...");
  // Use a more flexible URL match to handle trailing slashes or query params
  await page.waitForURL(/.*\/admin\/dashboard/, { timeout: 30000 });

  // Verify we are indeed on the dashboard
  await expect(page).toHaveURL(/.*\/admin\/dashboard/);

  // Ensure the directory exists
  const authDir = dirname(authFile); // Changed 'path.dirname' to 'dirname'
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save the state
  await page.context().storageState({ path: authFile });
  console.log(`💾 Auth state saved to: ${authFile}`);
});
