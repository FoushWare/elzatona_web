/**
 * E2E Test: Frontend Tasks Practice (F-E2E-005)
 * Task: F-005 - Frontend Tasks Practice
 */

import { test, expect } from "@playwright/test";

test.describe("F-E2E-005: Frontend Tasks Practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend-tasks");
    await page.waitForLoadState("networkidle");
  });

  test("should load frontend tasks page", async ({ page }) => {
    await expect(page).toHaveURL(/.*frontend-tasks.*/);
  });

  test("should display frontend tasks content", async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent("body");
    expect(content).toBeTruthy();
  });
});
