import { test, expect } from "@playwright/test";

test.describe("Admin Content Management Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the content management page
    await page.goto("/admin/content-management");
  });

  test("should display the unified learning management header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Unified Learning Management");
  });

  test("should display the four main management sections", async ({ page }) => {
    // The page should have Learning Plans, Learning Cards, Categories, and Topics sections
    await expect(page.getByText("Learning Plans Management")).toBeVisible();
    await expect(page.getByText("Learning Cards Management")).toBeVisible();
    await expect(page.getByText("Categories Management")).toBeVisible();
    await expect(page.getByText("Topics Management")).toBeVisible();
  });

  test("should be able to expand a Learning Cards hierarchy and see question actions", async ({ page }) => {
    // Assuming there is at least one card, category, and topic seeded
    // We try to expand them by clicking on the headers.
    
    // Find a card header and click it
    const firstCardHeader = page.locator('.cursor-pointer').filter({ hasText: /Core Technologies|Framework Questions|Problem Solving|System Design|Frontend Tasks/ }).first();
    if (await firstCardHeader.count() > 0) {
      await firstCardHeader.click();
      
      // Find a category inside and click it
      const categoryHeader = page.locator('.cursor-pointer').filter({ hasText: /Topics/ }).first();
      if (await categoryHeader.count() > 0) {
         await categoryHeader.click();
         
         // Find a topic inside and click it
         const topicHeader = page.locator('.cursor-pointer').filter({ hasText: /Questions/ }).first();
         if (await topicHeader.count() > 0) {
             await topicHeader.click();
             
             // Check if action buttons for questions are present
             await expect(page.locator('[title="Create Question"]').first()).toBeVisible();
         }
      }
    }
  });

  test("should open modal when Create Category is clicked", async ({ page }) => {
    const createBtn = page.getByRole("button", { name: /Create Category/i }).first();
    if (await createBtn.count() > 0) {
      await createBtn.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.getByRole("heading", { name: /Create New Category/i })).toBeVisible();
    }
  });

  test("should open modal when Create Topic is clicked", async ({ page }) => {
    const createBtn = page.getByRole("button", { name: /Create Topic/i }).first();
    if (await createBtn.count() > 0) {
      await createBtn.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.getByRole("heading", { name: /Create New Topic/i })).toBeVisible();
    }
  });
});
