/**
 * E2E Test: Admin Login - Basic Page Loading
 * Tests basic page loading and form element display
 *
 * Note: Environment variables are loaded by test-env-loader
 */

import "../test-env-loader";
import { test, expect } from "@playwright/test";
import { setupLoginPage } from "./admin-login.setup";

test.describe("A-E2E-002: Admin Login - Basic", () => {
  test.beforeEach(async ({ page }) => {
    await setupLoginPage(page);
  });

  test("should load admin login page", async ({ page }) => {
    // Verify URL
    await expect(page).toHaveURL(/.*admin\/login.*/);

    // Verify page title - target the specific h1 in the form section (not navbar)
    const heading = page.getByRole("heading", { name: /Admin Login/i });
    await expect(heading).toBeVisible();

    // Verify subtitle
    await expect(page.getByText(/Access the admin dashboard/i)).toBeVisible();
  });

  test("should display all login form elements", async ({ page }) => {
    // Email input
    const emailInput = page.getByLabel(/Email Address/i);
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required");

    // Password input
    const passwordInput = page.getByLabel(/Password/i);
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute("required");

    // Submit button
    const submitButton = page.getByRole("button", { name: /Sign In/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveAttribute("type", "submit");

    // Back to Home link
    const homeLink = page.getByRole("link", { name: /Back to Home/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
  });
});
