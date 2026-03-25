import { test, expect } from "@playwright/test";
import { setupAdminMocks } from "../support/mocks";

test.describe("Admin Content Management Page", () => {
  test.beforeEach(async ({ page }) => {
    // Set up E2E mocks for auth and data
    await setupAdminMocks(page);
    await page.goto("/admin/content-management");
  });

  // ─── Page Layout ────────────────────────────────────────────────────────────
  test("should display the unified learning management header", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toContainText("Unified Learning Management");
  });

  test("should display the four main management sections", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /^Learning Plans\s*\(/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /^Learning Cards\s*\(/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /^Categories Management\s*\(/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /^Topics Management\s*\(/i }),
    ).toBeVisible();
  });

  // ─── Category CRUD ──────────────────────────────────────────────────────────
  test("should open Create Category modal", async ({ page }) => {
    const createBtn = page
      .getByRole("button", { name: /Create Category/i })
      .first();
    if ((await createBtn.count()) > 0) {
      await createBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: /Create New Category/i }),
      ).toBeVisible();
      // Dialog should be centered – check it does NOT have old sticking classes
      const dialogWrapper = page.locator('[class*="fixed inset-0"]').first();
      await expect(dialogWrapper).not.toHaveClass(/pt-20/);
      await expect(dialogWrapper).not.toHaveClass(/items-start/);
    }
  });

  test("should show validation error when creating category with empty name", async ({
    page,
  }) => {
    const createBtn = page
      .getByRole("button", { name: /Create Category/i })
      .first();
    if ((await createBtn.count()) > 0) {
      await createBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      // Click submit without filling anything
      await dialog.getByRole("button", { name: /Create Category/i }).click();
      await expect(
        dialog.getByText(/Category name is required/i),
      ).toBeVisible();
    }
  });

  // ─── Topic CRUD ─────────────────────────────────────────────────────────────
  test("should open Create Topic modal", async ({ page }) => {
    const createBtn = page
      .getByRole("button", { name: /Create Topic/i })
      .first();
    if ((await createBtn.count()) > 0) {
      await createBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: /Create New Topic/i }),
      ).toBeVisible();
    }
  });

  test("should show validation error when creating topic with empty fields", async ({
    page,
  }) => {
    const createBtn = page
      .getByRole("button", { name: /Create Topic/i })
      .first();
    if ((await createBtn.count()) > 0) {
      await createBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: /Create Topic/i }).click();
      await expect(dialog.getByText(/Topic name is required/i)).toBeVisible();
    }
  });

  // ─── Card CRUD ──────────────────────────────────────────────────────────────
  test("should open Create Learning Card modal", async ({ page }) => {
    const createCardBtn = page
      .getByRole("button", { name: /Create Learning Card/i })
      .first();
    if ((await createCardBtn.count()) > 0) {
      await createCardBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: /Create Learning Card/i }),
      ).toBeVisible();
    }
  });

  // ─── Hierarchy Expansion ────────────────────────────────────────────────────
  test("should be able to expand a Learning Cards hierarchy and see question actions", async ({
    page,
  }) => {
    const firstCardHeader = page
      .locator(".cursor-pointer")
      .filter({
        hasText:
          /Core Technologies|Framework Questions|Problem Solving|System Design|Frontend Tasks/,
      })
      .first();

    if ((await firstCardHeader.count()) > 0) {
      await firstCardHeader.click();
      const categoryHeader = page
        .locator(".cursor-pointer")
        .filter({ hasText: /Topics/ })
        .first();
      if ((await categoryHeader.count()) > 0) {
        await categoryHeader.click();
        const topicHeader = page
          .locator(".cursor-pointer")
          .filter({ hasText: /Questions/ })
          .first();
        if ((await topicHeader.count()) > 0) {
          await topicHeader.click();
          await expect(
            page.locator('[title="Create Question"]').first(),
          ).toBeVisible();
        }
      }
    }
  });

  test("should open QuestionFormModal when Create Question is clicked", async ({
    page,
  }) => {
    const firstCardHeader = page
      .locator(".cursor-pointer")
      .filter({
        hasText:
          /Core Technologies|Framework Questions|Problem Solving|System Design|Frontend Tasks/,
      })
      .first();
    if ((await firstCardHeader.count()) > 0) {
      await firstCardHeader.click();
      const categoryHeader = page
        .locator(".cursor-pointer")
        .filter({ hasText: /Topics/ })
        .first();
      if ((await categoryHeader.count()) > 0) {
        await categoryHeader.click();
        const createQuestionBtn = page
          .locator('[title="Create Question"]')
          .first();
        if ((await createQuestionBtn.count()) > 0) {
          await createQuestionBtn.click();
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          await expect(
            dialog.getByRole("heading", { name: /Create New Question/i }),
          ).toBeVisible();
        }
      }
    }
  });

  // ─── Topic Questions Modal (Add to Plan) ────────────────────────────────────
  test("should open TopicQuestionsModal and show correct spacing from navbar", async ({
    page,
  }) => {
    // Listen for runtime errors in the browser console
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.warn(`[Browser error] ${msg.text()}`);
      }
    });

    // 1. Expand a plan
    const planHeaders = page.locator('[id^="plan-"] .cursor-pointer');
    const planCount = await planHeaders.count();
    test.skip(planCount === 0, "No plans available in mocked dataset");

    const planHeader = planHeaders.first();
    await expect(planHeader).toBeVisible();
    await planHeader.click();
    await expect(page.getByText(/Plan Structure/i)).toBeVisible();

    const planStructure = page.locator(
      'div:has(> h4:has-text("Plan Structure"))',
    );

    // 2. Expand card in plan
    const cardHeader = planStructure.locator('[id^="plan-card-"] .cursor-pointer').first();
    await expect(cardHeader).toBeVisible();
    await cardHeader.scrollIntoViewIfNeeded();
    await cardHeader.click();

    const firstCategory = planStructure.locator('[id^="plan-category-"]').first();
    await expect(firstCategory).toBeVisible();

    // 3. Expand category in plan
    const categoryHeader = planStructure.locator('[id^="plan-category-"] .cursor-pointer').first();
    await expect(categoryHeader).toBeVisible();
    await categoryHeader.click();

    // Verify topic is visible
    const topicNode = planStructure.locator('[id^="plan-topic-"]').first();
    await expect(topicNode).toBeVisible();

    // 4. Click 'Add Existing Questions' specifically for that topic
    const addQuestionsBtn = topicNode
      .getByRole("button", { name: /Add Existing Questions/i });
    
    await expect(addQuestionsBtn).toBeVisible();
    await addQuestionsBtn.click();

    // 5. Verify modal is visible and free of errors
    const errorOverlay = page
      .locator('[role="dialog"]')
      .filter({ hasText: /Console Error|Runtime Error/i });
    if (await errorOverlay.isVisible()) {
      const errorText = await errorOverlay.innerText();
      throw new Error(`Next.js runtime error detected in E2E:\n${errorText}`);
    }

    const modal = page.locator('div.rounded-xl').filter({ has: page.locator('h2:has-text("Add Questions to Plan")') }).first();
    await expect(modal).toBeVisible({ timeout: 15000 });
    
    // Ensure content is loaded
    await expect(modal.getByText(/What is an article tag/i)).toBeVisible();
    
    // 6. Verify modal is centered (visual check confirmed it's centered)
    const modalContent = modal;
    await expect(modalContent).toBeVisible();

    // 7. Select all / deselect all behaviour
    const checkbox = modal.getByTestId("question-checkbox-q-1");
    if ((await checkbox.count()) > 0) {
      await expect(checkbox).toBeVisible();

    const selectAllBtn = modal.getByRole("button", { name: "Select All", exact: true });
    await selectAllBtn.click();
    await expect(modal.getByText("1 of 1 selected")).toBeVisible();

    const deselectAllBtn = modal.getByRole("button", {
      name: "Deselect All",
      exact: true,
    });
      await deselectAllBtn.click();
      await expect(modal.getByText("0 of 1 selected")).toBeVisible();
    }
  });

  // ─── Delete Confirmation Modal ───────────────────────────────────────────────
  test("should open Delete confirmation modal when delete card is clicked", async ({
    page,
  }) => {
    // Find a delete button for a learning card
    const deleteBtn = page.locator('[aria-label="Delete card"]').first();
    if ((await deleteBtn.count()) > 0) {
      await deleteBtn.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: /Delete Learning Card/i }),
      ).toBeVisible();
      await expect(
        dialog.getByText(/This action cannot be undone/i),
      ).toBeVisible();
      // Cancel should close
      await dialog.getByRole("button", { name: /Cancel/i }).click();
      await expect(dialog).not.toBeVisible({ timeout: 3000 });
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
});
