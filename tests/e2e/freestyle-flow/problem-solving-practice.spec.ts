/**
 * E2E Test: Problem Solving Practice (F-E2E-006)
 * Task: F-006 - Problem Solving Practice
 */

import { test, expect } from "@playwright/test";

test.describe("F-E2E-006: Problem Solving Practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/problem-solving");
    await page.waitForLoadState("networkidle");
  });

  test("should load problem solving page", async ({ page }) => {
    await expect(page).toHaveURL(/.*problem-solving.*/);
  });

  test("should display problem solving content", async ({ page }) => {
    await page.waitForTimeout(2000);
    const content = await page.textContent("body");
    expect(content).toBeTruthy();
  });
});
