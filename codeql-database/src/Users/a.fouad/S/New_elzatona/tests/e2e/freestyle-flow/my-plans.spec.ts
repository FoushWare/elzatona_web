/**
 * E2E Test: My Plans Page (F-E2E-002)
 * Task: F-002 - My Plans Page
 */

import { test, expect } from "@playwright/test";

test.describe("F-E2E-002: My Plans Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-plans");
    await page.waitForLoadState("networkidle");
  });

  test("should load my plans page", async ({ page }) => {
    await expect(page).toHaveURL(/.*my-plans.*/);
  });
});
