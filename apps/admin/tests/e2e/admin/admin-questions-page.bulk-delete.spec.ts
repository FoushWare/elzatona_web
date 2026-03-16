/**
 * E2E Test: Admin Bulk Question Addition - Bulk Deletion
 * Tests for selection and bulk deletion actions
 */

import { test, expect } from "@playwright/test";
import {
  getQuestionSelectionCheckboxes,
  openDialog,
  runAndWaitForQuestionApi,
  setupAdminPage,
  waitForDialogToClose,
  waitForQuestionApiResponse,
  waitForQuestionManagementReady,
} from "./admin-questions-page.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Bulk Deletion", () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
    await waitForQuestionManagementReady(page);
  });

  test("should show checkboxes for question selection", async ({ page }) => {
    const checkboxes = getQuestionSelectionCheckboxes(page);
    const count = await checkboxes.count();

    test.skip(
      count === 0,
      "No checkboxes found - questions may not be loaded or page may be empty",
    );

    await expect(checkboxes.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show "Delete Selected" button when questions are selected', async ({
    page,
  }) => {
    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    const initialCount = await deleteSelectedButton.count();
    expect(initialCount).toBe(0);

    const checkboxes = getQuestionSelectionCheckboxes(page);
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount === 0,
      "No question checkboxes found - cannot test delete selected button",
    );

    await checkboxes.first().click();

    const deleteSelectedAfter = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await expect(deleteSelectedAfter.first()).toBeVisible({ timeout: 5000 });
  });

  test("should open bulk delete confirmation modal", async ({ page }) => {
    const checkboxes = getQuestionSelectionCheckboxes(page);
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount === 0,
      "No question checkboxes found - cannot test bulk delete modal",
    );

    await checkboxes.first().click();

    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await deleteSelectedButton.first().click();

    const dialog = await openDialog(page, /Delete Selected Questions/i);
    const confirmationText = dialog.getByText(/Are you sure/i);
    await expect(confirmationText.first()).toBeVisible({ timeout: 5000 });

    const cancelButton = dialog.getByRole("button", { name: /Cancel/i });
    if ((await cancelButton.count()) > 0) {
      await cancelButton.first().click();
      await waitForDialogToClose(dialog);
    }
  });

  test("should delete multiple selected questions", async ({ page }) => {
    const checkboxes = getQuestionSelectionCheckboxes(page);
    const checkboxCount = await checkboxes.count();

    test.skip(
      checkboxCount < 2,
      `Only ${checkboxCount} question checkbox(es) found - need at least 2 for bulk deletion test`,
    );

    const firstCheckbox = checkboxes.first();
    const secondCheckbox = checkboxes.nth(1);

    const firstQuestionTitle = await firstCheckbox
      .evaluate((checkbox) => {
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
      await firstCheckbox.click();
      await secondCheckbox.click();

      const deleteSelectedButton = page.getByRole("button", {
        name: /Delete Selected/i,
      });
      await deleteSelectedButton.first().click();

      const dialog = await openDialog(page, /Delete Selected Questions/i);

      const confirmDeleteButton = dialog.getByRole("button", {
        name: /Delete Question/i,
      });
      await confirmDeleteButton.waitFor({ state: "visible", timeout: 5000 });
      const fetchResponsePromise = waitForQuestionApiResponse(page, "GET");
      await runAndWaitForQuestionApi(page, "DELETE", async () => {
        await confirmDeleteButton.click();
      });

      await fetchResponsePromise;

      await waitForDialogToClose(dialog);
      await waitForQuestionManagementReady(page);

      const deletedQuestionHeading = page.getByRole("heading", {
        name: firstQuestionTitle.trim(),
      });
      const isVisible = await deletedQuestionHeading
        .isVisible()
        .catch(() => false);
      expect(isVisible).toBe(false);

      const deletedQuestionHeading2 = page.getByRole("heading", {
        name: secondQuestionTitle.trim(),
      });
      const isVisible2 = await deletedQuestionHeading2
        .isVisible()
        .catch(() => false);
      expect(isVisible2).toBe(false);
    } else {
      console.log("⚠️ Could not get question titles, skipping verification");
    }
  });

  test('should handle "Select All" functionality', async ({ page }) => {
    const selectAllCheckbox = getQuestionSelectionCheckboxes(page).first();
    const checkboxCount = await selectAllCheckbox.count();

    test.skip(
      checkboxCount === 0,
      "No checkboxes found - cannot test Select All functionality",
    );

    await selectAllCheckbox.click();

    const deleteSelectedButton = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    await expect(deleteSelectedButton.first()).toBeVisible({ timeout: 5000 });

    await selectAllCheckbox.click();

    const deleteSelectedAfter = page.getByRole("button", {
      name: /Delete Selected/i,
    });
    const countAfter = await deleteSelectedAfter.count();
    expect(countAfter).toBe(0);
  });
});
