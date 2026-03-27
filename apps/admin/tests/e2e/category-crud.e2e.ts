import { test, expect } from "@playwright/test";

// Example E2E test for CRUD flow: Category

test.describe("Category CRUD E2E", () => {
  test("should create, read, update, and delete a category", async ({
    page,
  }) => {
    // Login step (if required)
    // await page.goto('/login');
    // await page.fill('input[name=email]', 'admin@example.com');
    // await page.fill('input[name=password]', 'password');
    // await page.click('button[type=submit]');

    // Go to categories admin page
    await page.goto("/admin/categories");

    // Create
    await page.click("button#create-category");
    await page.fill("input[name=name]", "E2E Test Category");
    await page.click("button[type=submit]");
    await expect(page.locator("text=E2E Test Category")).toBeVisible();

    // Update
    await page.click('button[aria-label="Edit E2E Test Category"]');
    await page.fill("input[name=name]", "E2E Test Category Updated");
    await page.click("button[type=submit]");
    await expect(page.locator("text=E2E Test Category Updated")).toBeVisible();

    // Delete
    await page.click('button[aria-label="Delete E2E Test Category Updated"]');
    await page.click("button.confirm");
    await expect(
      page.locator("text=E2E Test Category Updated"),
    ).not.toBeVisible();
  });
});
