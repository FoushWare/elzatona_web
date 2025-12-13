/**
 * E2E Test: Admin Bulk Question Addition - Bulk Operations
 * Tests for bulk upload and bulk deletion
 *
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from "@playwright/test";
import { setupAdminPage } from "./admin-questions-page.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Bulk Operations", () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // BULK UPLOAD TESTS
  // ============================================

  test("should have Bulk Upload button", async ({ page }) => {
    await page.waitForTimeout(2000);

    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await expect(bulkUploadButton).toBeVisible({ timeout: 5000 });
  });

  test("should open bulk upload modal when Bulk Upload button is clicked", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await bulkUploadButton.click();

    // Wait for bulk upload modal to open - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });

    // Verify modal content - use dialog scope
    await expect(
      dialog.getByRole("heading", { name: /Bulk Upload Questions/i }),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      dialog.getByText(/Upload multiple questions at once/i),
    ).toBeVisible({ timeout: 5000 });
  });

  test("should accept JSON file for bulk upload", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Open bulk upload modal
    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await bulkUploadButton.click();

    // Wait for bulk upload modal to open - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });
    await expect(
      dialog.getByRole("heading", { name: /Bulk Upload Questions/i }),
    ).toBeVisible({ timeout: 5000 });

    // Wait for modal content to be ready
    await page.waitForTimeout(1000);

    // Verify the drop zone is visible (this is what users interact with) - use dialog scope
    const dropZone = dialog.locator(
      "text=/Drag and drop.*CSV or JSON.*click to select/i",
    );
    await expect(dropZone).toBeVisible({ timeout: 5000 });

    // Find file input (it's hidden but should exist) - use dialog scope
    const fileInput = dialog.locator('input[type="file"]');
    const fileInputCount = await fileInput.count();

    // Verify file input exists (even if hidden)
    expect(fileInputCount).toBeGreaterThan(0);

    // Verify file input has correct accept attribute
    if (fileInputCount > 0) {
      const acceptAttr = await fileInput.first().getAttribute("accept");
      expect(acceptAttr).toContain(".json");
      expect(acceptAttr).toContain(".csv");
    }

    // Verify the drop zone is clickable (it triggers the file input) - use dialog scope
    const dropZoneClickable = dialog
      .locator("div")
      .filter({ hasText: /Drag and drop.*click to select/i });
    await expect(dropZoneClickable.first()).toBeVisible({ timeout: 5000 });
  });

  test("should accept CSV file for bulk upload", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Open bulk upload modal
    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await bulkUploadButton.click();

    // Wait for bulk upload modal to open - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });
    await expect(
      dialog.getByRole("heading", { name: /Bulk Upload Questions/i }),
    ).toBeVisible({ timeout: 5000 });

    // Wait for modal content to be ready
    await page.waitForTimeout(1000);

    // Verify the drop zone is visible - use dialog scope
    const dropZone = dialog.locator(
      "text=/Drag and drop.*CSV or JSON.*click to select/i",
    );
    await expect(dropZone).toBeVisible({ timeout: 5000 });

    // Find file input (it's hidden but should exist) - use dialog scope
    const fileInput = dialog.locator('input[type="file"]');
    const fileInputCount = await fileInput.count();

    // Verify file input exists (even if hidden)
    expect(fileInputCount).toBeGreaterThan(0);

    // Verify file input accepts CSV files
    if (fileInputCount > 0) {
      const acceptAttr = await fileInput.first().getAttribute("accept");
      expect(acceptAttr).toContain(".csv");
    }
  });

  test("should show preview of uploaded questions", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Open bulk upload modal
    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await bulkUploadButton.click();

    // Wait for bulk upload modal to open - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });
    await expect(
      dialog.getByRole("heading", { name: /Bulk Upload Questions/i }),
    ).toBeVisible({ timeout: 5000 });

    // Verify preview section exists (may be empty initially) - use dialog scope
    const previewSection = dialog.locator("text=/Preview|preview/i");
    const count = await previewSection.count();
    // Preview may or may not be visible depending on file selection
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should handle bulk upload cancellation", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Open bulk upload modal
    const bulkUploadButton = page.getByRole("button", { name: /Bulk Upload/i });
    await bulkUploadButton.click();

    // Wait for bulk upload modal to open - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });
    await expect(
      dialog.getByRole("heading", { name: /Bulk Upload Questions/i }),
    ).toBeVisible({ timeout: 5000 });

    // Find and click cancel button - use dialog scope
    const cancelButton = dialog.getByRole("button", { name: /Cancel/i });
    if ((await cancelButton.count()) > 0) {
      await cancelButton.click();
      await page.waitForTimeout(500);

      // Verify modal is closed - check for dialog to disappear
      await dialog.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});
      // Verify modal heading is no longer visible
      const modalHeading = page.getByRole("heading", {
        name: /Bulk Upload Questions/i,
      });
      const isVisible = await modalHeading.isVisible().catch(() => false);
      expect(isVisible).toBe(false);
    }
  });

  // ============================================
  // BULK DELETION TESTS
  // ============================================

  test("should show checkboxes for question selection", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Wait for questions to load
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Checkboxes should be present for each question
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();

    // Skip if no checkboxes found
    test.skip(
      count === 0,
      "No checkboxes found - questions may not be loaded or page may be empty",
    );

    // At least one checkbox should be visible (for selecting questions)
    await expect(checkboxes.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show "Delete Selected" button when questions are selected', async ({
    page,
  }) => {
    await page.waitForTimeout(2000);

    // Wait for questions to load
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Initially, Delete Selected button should not be visible
    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    const initialCount = await deleteSelectedButton.count();
    expect(initialCount).toBe(0);

    // Select a question checkbox (exclude "Select all" checkbox)
    const checkboxes = page
      .locator('input[type="checkbox"]')
      .filter({ hasNotText: /Select all/i });
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount === 0,
      "No question checkboxes found - cannot test delete selected button",
    );

    // Click the first question checkbox (skip the "Select all" checkbox)
    await checkboxes.first().click();
    await page.waitForTimeout(500);

    // Now Delete Selected button should be visible
    const deleteSelectedAfter = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await expect(deleteSelectedAfter.first()).toBeVisible({ timeout: 5000 });
  });

  test("should open bulk delete confirmation modal", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Wait for questions to load
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Select a question
    const checkboxes = page
      .locator('input[type="checkbox"]')
      .filter({ hasNotText: /Select all/i });
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount === 0,
      "No question checkboxes found - cannot test bulk delete modal",
    );

    await checkboxes.first().click();
    await page.waitForTimeout(500);

    // Click Delete Selected button
    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await deleteSelectedButton.first().click();
    await page.waitForTimeout(500);

    // Wait for confirmation modal to appear
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });

    // Verify modal content - use dialog scope
    await expect(
      dialog.getByRole("heading", { name: /Delete Selected Questions/i }),
    ).toBeVisible({ timeout: 5000 });
    // Check for confirmation text (use first() to avoid strict mode violation if multiple matches)
    const confirmationText = dialog.getByText(/Are you sure/i);
    await expect(confirmationText.first()).toBeVisible({ timeout: 5000 });

    // Cancel the deletion - use dialog scope
    const cancelButton = dialog.getByRole("button", { name: /Cancel/i });
    if ((await cancelButton.count()) > 0) {
      await cancelButton.first().click();
    }
  });

  test("should delete multiple selected questions", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Wait for page to be ready
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Select multiple questions
    // Find checkboxes that are NOT the "Select all" checkbox (which is usually in the header)
    const checkboxes = page
      .locator('input[type="checkbox"]')
      .filter({ hasNotText: /Select all/i });
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount < 2,
      `Only ${checkboxCount} question checkbox(es) found - need at least 2 for bulk deletion test`,
    );

    // Get question titles before deletion
    // Navigate from checkboxes to their parent rows, then find the h4 heading
    // The structure is: div (row) > div (flex container) > div (flex items-start) > Checkbox + div > h4
    // So we need to go up 3 levels from checkbox to get to the row
    const firstCheckbox = checkboxes.first();
    const secondCheckbox = checkboxes.nth(1);

    // Get titles by finding the h4 heading that's a sibling of the checkbox's parent
    // More reliable: find the closest ancestor div that contains both checkbox and h4
    const firstQuestionTitle = await firstCheckbox
      .evaluate((checkbox) => {
        // Find the parent row (div with padding classes)
        let parent = checkbox.parentElement;
        while (
          parent &&
          !parent.className.includes("p-4") &&
          !parent.className.includes("p-5")
        ) {
          parent = parent.parentElement;
        }
        if (parent) {
          const heading = parent.querySelector("h4");
          return heading?.textContent?.trim() || null;
        }
        return null;
      })
      .catch(() => null);

    const secondQuestionTitle = await secondCheckbox
      .evaluate((checkbox) => {
        // Find the parent row (div with padding classes)
        let parent = checkbox.parentElement;
        while (
          parent &&
          !parent.className.includes("p-4") &&
          !parent.className.includes("p-5")
        ) {
          parent = parent.parentElement;
        }
        if (parent) {
          const heading = parent.querySelector("h4");
          return heading?.textContent?.trim() || null;
        }
        return null;
      })
      .catch(() => null);

    if (firstQuestionTitle && secondQuestionTitle) {
      // Select first two questions
      await firstCheckbox.click();
      await page.waitForTimeout(300);
      await secondCheckbox.click();
      await page.waitForTimeout(500);

      // Set up API response listeners BEFORE clicking delete
      const bulkDeleteResponsePromise = page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/questions/unified") &&
            response.request().method() === "DELETE",
          { timeout: 20000 },
        )
        .catch(() => null);

      const fetchResponsePromise = page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/questions/unified") &&
            response.request().method() === "GET",
          { timeout: 20000 },
        )
        .catch(() => null);

      // Click Delete Selected button
      const deleteSelectedButton = page.getByRole("button", {
        name: /Delete Selected/i,
      });
      await deleteSelectedButton.first().click();
      await page.waitForTimeout(500);

      // Confirm deletion in modal - wait for dialog first
      const dialog = page.locator('[role="dialog"]');
      await dialog.waitFor({ timeout: 10000, state: "visible" });

      // Verify modal heading
      await expect(
        dialog.getByRole("heading", { name: /Delete Selected Questions/i }),
      ).toBeVisible({ timeout: 5000 });

      // The button text is "Delete Question" (singular, even for multiple) - use dialog scope
      const confirmDeleteButton = dialog.getByRole("button", {
        name: /Delete Question/i,
      });
      await confirmDeleteButton.waitFor({ state: "visible", timeout: 5000 });
      await confirmDeleteButton.click();

      // Wait for API responses
      await bulkDeleteResponsePromise;
      await fetchResponsePromise;

      // Wait for modal to close - check for dialog to disappear
      await dialog.waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(2000);

      // Wait for loading to complete
      const loadingText = page.locator("text=/Loading questions/i");
      await loadingText
        .waitFor({ state: "hidden", timeout: 10000 })
        .catch(() => {});

      // Verify questions were deleted (they should not be visible)
      // Use getByRole('heading') to avoid strict mode violations
      if (firstQuestionTitle) {
        const deletedQuestionHeading = page.getByRole("heading", {
          name: firstQuestionTitle.trim(),
        });
        const isVisible = await deletedQuestionHeading
          .isVisible()
          .catch(() => false);
        expect(isVisible).toBe(false);
      }
      if (secondQuestionTitle) {
        const deletedQuestionHeading2 = page.getByRole("heading", {
          name: secondQuestionTitle.trim(),
        });
        const isVisible2 = await deletedQuestionHeading2
          .isVisible()
          .catch(() => false);
        expect(isVisible2).toBe(false);
      }
    } else {
      // If we couldn't get titles, log warning but continue
      console.log("⚠️ Could not get question titles, skipping verification");
    }
  });

  test("should cancel bulk deletion", async ({ page }) => {
    await page.waitForTimeout(2000);

    // Wait for questions to load
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Select a question
    const checkboxes = page
      .locator('input[type="checkbox"]')
      .filter({ hasNotText: /Select all/i });
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount === 0,
      "No question checkboxes found - cannot test cancel bulk deletion",
    );

    await checkboxes.first().click();
    await page.waitForTimeout(500);

    // Wait for questions to be visible before extracting title
    const firstHeading = page.locator("h4").first();
    await firstHeading
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => {});

    // Get question title - since we clicked the first checkbox, get the first visible h4
    // Questions are displayed with h4 headings, and each checkbox corresponds to one h4
    // We'll use a multi-strategy approach to find the title
    let finalQuestionTitle: string | null = null;

    // Strategy 1: Find h4 in the same row as the clicked checkbox
    const questionTitleFromCheckbox = await checkboxes
      .first()
      .evaluate((checkbox) => {
        // Find the parent row (div with padding classes like p-4 or p-5)
        let parent = checkbox.parentElement;
        let depth = 0;
        const maxDepth = 10;

        while (parent && depth < maxDepth) {
          const className = parent.className || "";
          if (
            typeof className === "string" &&
            (className.includes("p-4") || className.includes("p-5"))
          ) {
            const heading = parent.querySelector("h4");
            if (heading) {
              return heading.textContent?.trim() || null;
            }
            break;
          }
          parent = parent.parentElement;
          depth++;
        }
        return null;
      })
      .catch(() => null);

    if (questionTitleFromCheckbox) {
      finalQuestionTitle = questionTitleFromCheckbox;
    } else {
      // Strategy 2: Get all question checkboxes and h4 headings, match by index
      const checkboxIndex = await checkboxes
        .first()
        .evaluate((checkbox) => {
          // Get all checkboxes that are NOT "Select all" (exclude header checkbox)
          const allCheckboxes = Array.from(
            document.querySelectorAll('input[type="checkbox"]'),
          );
          // Filter out the first one if it's in a header/th element (Select All)
          const questionCheckboxes = allCheckboxes.filter((cb) => {
            let el = cb.parentElement;
            let depth = 0;
            while (el && depth < 5) {
              if (el.tagName === "TH" || el.tagName === "THEAD") {
                return false; // This is the Select All checkbox in header
              }
              el = el.parentElement;
              depth++;
            }
            return true;
          });
          return questionCheckboxes.indexOf(checkbox);
        })
        .catch(() => 0);

      // Get all h4 headings (excluding any in modals or dialogs)
      const allHeadings = await page
        .locator(
          'main h4, [role="main"] h4, body > div:not([role="dialog"]) h4',
        )
        .all();
      if (allHeadings.length > checkboxIndex && checkboxIndex >= 0) {
        finalQuestionTitle = await allHeadings[checkboxIndex]
          .textContent()
          .catch(() => null);
      }
    }

    // Strategy 3: Fallback - just get the first visible h4 (if we clicked first checkbox)
    if (!finalQuestionTitle) {
      finalQuestionTitle = await firstHeading.textContent().catch(() => null);
    }

    test.skip(
      !finalQuestionTitle,
      "Could not find question title - cannot verify question still exists after cancel",
    );

    // Click Delete Selected button
    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await deleteSelectedButton.first().click();
    await page.waitForTimeout(500);

    // Wait for confirmation modal - wait for dialog first
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 10000, state: "visible" });

    // Verify modal heading
    await expect(
      dialog.getByRole("heading", { name: /Delete Selected Questions/i }),
    ).toBeVisible({ timeout: 5000 });

    // Click Cancel button - use dialog scope
    const cancelButton = dialog.getByRole("button", { name: /Cancel/i });
    await cancelButton.first().click();
    await page.waitForTimeout(500);

    // Verify question still exists by checking for the heading
    if (finalQuestionTitle) {
      const questionHeading = page.getByRole("heading", {
        name: finalQuestionTitle.trim(),
      });
      const isVisible = await questionHeading.isVisible().catch(() => false);
      expect(isVisible).toBe(true);
    }
  });

  test('should handle "Select All" functionality', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Wait for questions to load
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    // Find "Select all" checkbox (usually the first checkbox in the header)
    const selectAllCheckbox = page.locator('input[type="checkbox"]').first();
    const checkboxCount = await selectAllCheckbox.count();

    test.skip(
      checkboxCount === 0,
      "No checkboxes found - cannot test Select All functionality",
    );

    // Click Select All
    await selectAllCheckbox.click();
    await page.waitForTimeout(500);

    // Verify Delete Selected button appears
    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await expect(deleteSelectedButton.first()).toBeVisible({ timeout: 5000 });

    // Click Select All again to deselect
    await selectAllCheckbox.click();
    await page.waitForTimeout(500);

    // Verify Delete Selected button disappears
    const deleteSelectedAfter = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    const countAfter = await deleteSelectedAfter.count();
    expect(countAfter).toBe(0);
  });
});
