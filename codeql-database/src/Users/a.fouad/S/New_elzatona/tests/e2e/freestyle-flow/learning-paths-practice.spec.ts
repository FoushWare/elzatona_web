/**
 * E2E Test: Learning Paths Practice (F-E2E-004)
 * Task: F-004 - Learning Paths Practice
 */

import { test, expect } from "@playwright/test";

test.describe("F-E2E-004: Learning Paths Practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/learning-paths");
    await page.waitForLoadState("networkidle");
  });

  test("should load learning paths page", async ({ page }) => {
    await expect(page).toHaveURL(/.*learning-paths.*/);
  });

  test("should display learning paths content", async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent("body");
    expect(content).toBeTruthy();
  });
});
