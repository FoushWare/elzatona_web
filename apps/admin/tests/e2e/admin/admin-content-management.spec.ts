import { test, expect } from "@playwright/test";
import { setupAdminMocks } from "../support/mocks";

test.describe("Admin Content Management Page", () => {
  test.beforeEach(async ({ page }) => {
    // Set up E2E mocks
    await setupAdminMocks(page);

    // Navigate to the content management page
    await page.goto("/admin/content-management");
  });

  test("should display the unified learning management header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Unified Learning Management");
  });

  test("should display the four main management sections", async ({ page }) => {
    // The page should have Learning Plans, Learning Cards, Categories, and Topics sections
    await expect(page.getByText(/Learning Plans/)).toBeVisible();
    await expect(page.getByText(/Learning Cards/)).toBeVisible();
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

  test("should open QuestionFormModal when Create Question is clicked", async ({ page }) => {
    // Expand a topic first to see the Create Question button
    const firstCardHeader = page.locator('.cursor-pointer').filter({ hasText: /Core Technologies|Framework Questions|Problem Solving|System Design|Frontend Tasks/ }).first();
    if (await firstCardHeader.count() > 0) {
      await firstCardHeader.click();
      const categoryHeader = page.locator('.cursor-pointer').filter({ hasText: /Topics/ }).first();
      if (await categoryHeader.count() > 0) {
        await categoryHeader.click();
        const createQuestionBtn = page.locator('[title="Create Question"]').first();
        if (await createQuestionBtn.count() > 0) {
          await createQuestionBtn.click();
          await expect(page.getByRole("dialog")).toBeVisible();
          await expect(page.getByRole("heading", { name: /Create New Question/i })).toBeVisible();
        }
      }
    }
  });

  test("should open CardFormModal when Create Card is clicked", async ({ page }) => {
    const createCardBtn = page.getByRole("button", { name: /Create Learning Card/i }).first();
    if (await createCardBtn.count() > 0) {
      await createCardBtn.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expect(page.getByRole("heading", { name: /Create Learning Card/i })).toBeVisible();
    }
  });

  test("should open TopicQuestionsModal from a plan and show spacing from navbar", async ({ page }) => {
    // Listen for debug logs
    page.on("console", (msg) => {
      if (msg.text().includes("[DEBUG]")) {
        console.log(`[Browser DEBUG] ${msg.text()}`);
      }
    });

    // 1. Expand a plan
    const planHeader = page.locator('.cursor-pointer').filter({ hasText: /Foundation/ }).first();
    await planHeader.click();
    // Wait for plan content to expand
    await expect(page.getByText(/Plan Structure/i)).toBeVisible();

    // Scope to the plan structure area to avoid hitting cards in the top section
    const planStructure = page.locator('div:has(> h4:has-text("Plan Structure"))');

    // 2. Expand card in plan
    const cardHeader = planStructure.locator('.cursor-pointer').filter({ hasText: /Core Technologies/ }).first();
    await cardHeader.scrollIntoViewIfNeeded();
    await cardHeader.click();
    
    // Wait for card categories to appear inside plan structure
    await expect(planStructure.getByText(/HTML Basics/i)).toBeVisible();

    // 3. Expand category in plan
    const categoryHeader = planStructure.locator('.cursor-pointer').filter({ hasText: /HTML Basics/ }).first();
    await categoryHeader.click();
    
    // Wait for 'Add Existing Questions' button (inside topic node)
    const addQuestionsBtn = planStructure.getByRole("button", { name: /Add Existing Questions/i }).first();
    await expect(addQuestionsBtn).toBeVisible();

    // 4. Click 'Add Existing Questions'
    await addQuestionsBtn.click();

    // 5. Verify modal is visible
    // Use a more specific locator to avoid collision with Next.js error overlay
    const modal = page.locator('[role="dialog"]').filter({ hasText: /Add Questions to Plan/i });
    
    // Check if there's an error overlay instead
    const errorOverlay = page.locator('[role="dialog"]').filter({ hasText: /Console Error|Runtime Error/i });
    if (await errorOverlay.isVisible()) {
      const errorText = await errorOverlay.innerText();
      throw new Error(`Next.js runtime error detected in E2E:\n${errorText}`);
    }

    await expect(modal).toBeVisible({ timeout: 15000 });
    
    // 6. Verify spacing from top (navbar)
    // The Dialog wrapper (role="dialog" in our custom impl) should have pt-20
    await expect(modal).toHaveClass(/pt-20/);

    // 7. Verify questions are listed and can be toggled
    const checkbox = modal.getByTestId("question-checkbox-q-1");
    await expect(checkbox).toBeVisible();
    
    // Test Select All
    const selectAllBtn = modal.getByRole('button', { name: /Select All/i });
    await selectAllBtn.click();
    
    // Verify it checked via state indicator (most robust reflection of React state)
    await expect(modal.getByText("1 of 1 selected")).toBeVisible();

    // Test Deselect All
    const deselectAllBtn = modal.getByRole('button', { name: /Deselect All/i });
    await deselectAllBtn.click();
    
    // Verify it unchecked
    await expect(modal.getByText("0 of 1 selected")).toBeVisible();
  });
});
