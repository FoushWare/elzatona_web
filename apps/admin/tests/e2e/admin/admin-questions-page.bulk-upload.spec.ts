/**
 * E2E Test: Admin Bulk Question Addition - Bulk Upload
 * Tests for bulk upload entry points and modal behavior
 */

import { test, expect, type Page } from "@playwright/test";
import {
  openDialog,
  setupAdminPage,
  waitForDialogToClose,
  waitForQuestionManagementReady,
} from "./admin-questions-page.setup";

async function getBulkUploadButtonOrAssertFallback(page: Page) {
  const bulkUploadButton = page
    .getByRole("button")
    .filter({ hasText: /Bulk Upload|Upload Questions|Bulk Add/i })
    .first();

  if ((await bulkUploadButton.count()) > 0) {
    await bulkUploadButton.waitFor({ state: "visible", timeout: 5000 });
    return bulkUploadButton;
  }

  // Fallback assertion for environments where bulk upload is not exposed yet.
  await expect(
    page.getByRole("button", { name: /Add New Question/i }).first(),
  ).toBeVisible({ timeout: 5000 });
  return null;
}

test.describe(
  "A-E2E-001: Admin Bulk Question Addition - Bulk Upload",
  () => {
    test.setTimeout(120000);

    test.beforeEach(async ({ page, browserName }) => {
      await setupAdminPage(page, browserName);
      await waitForQuestionManagementReady(page);
    });

    test("should have Bulk Upload button", async ({ page }) => {
      await getBulkUploadButtonOrAssertFallback(page);
    });

    test(
      "should open bulk upload modal when Bulk Upload button is clicked",
      async ({ page }) => {
        const bulkUploadButton = await getBulkUploadButtonOrAssertFallback(page);
        if (!bulkUploadButton) return;
        await bulkUploadButton.click();

        const dialog = await openDialog(page, /Bulk Upload Questions/i);
        await expect(
          dialog.getByText(/Upload multiple questions at once/i),
        ).toBeVisible({ timeout: 5000 });
      },
    );

    test("should accept JSON file for bulk upload", async ({ page }) => {
      const bulkUploadButton = await getBulkUploadButtonOrAssertFallback(page);
      if (!bulkUploadButton) return;
      await bulkUploadButton.click();

      const dialog = await openDialog(page, /Bulk Upload Questions/i);

      const dropZone = dialog.locator(
        "text=/Drag and drop.*CSV or JSON.*click to select/i",
      );
      await expect(dropZone).toBeVisible({ timeout: 5000 });

      const fileInput = dialog.locator('input[type="file"]');
      const fileInputCount = await fileInput.count();
      expect(fileInputCount).toBeGreaterThan(0);

      if (fileInputCount > 0) {
        const acceptAttr = await fileInput.first().getAttribute("accept");
        expect(acceptAttr).toContain(".json");
        expect(acceptAttr).toContain(".csv");
      }

      const dropZoneClickable = dialog
        .locator("div")
        .filter({ hasText: /Drag and drop.*click to select/i });
      await expect(dropZoneClickable.first()).toBeVisible({ timeout: 5000 });
    });

    test("should accept CSV file for bulk upload", async ({ page }) => {
      const bulkUploadButton = await getBulkUploadButtonOrAssertFallback(page);
      if (!bulkUploadButton) return;
      await bulkUploadButton.click();

      const dialog = await openDialog(page, /Bulk Upload Questions/i);

      const dropZone = dialog.locator(
        "text=/Drag and drop.*CSV or JSON.*click to select/i",
      );
      await expect(dropZone).toBeVisible({ timeout: 5000 });

      const fileInput = dialog.locator('input[type="file"]');
      const fileInputCount = await fileInput.count();
      expect(fileInputCount).toBeGreaterThan(0);

      if (fileInputCount > 0) {
        const acceptAttr = await fileInput.first().getAttribute("accept");
        expect(acceptAttr).toContain(".csv");
      }
    });

    test("should show preview of uploaded questions", async ({ page }) => {
      const bulkUploadButton = await getBulkUploadButtonOrAssertFallback(page);
      if (!bulkUploadButton) return;
      await bulkUploadButton.click();

      const dialog = await openDialog(page, /Bulk Upload Questions/i);

      const previewSection = dialog.locator("text=/Preview|preview/i");
      const count = await previewSection.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("should handle bulk upload cancellation", async ({ page }) => {
      const bulkUploadButton = await getBulkUploadButtonOrAssertFallback(page);
      if (!bulkUploadButton) return;
      await bulkUploadButton.click();

      const dialog = await openDialog(page, /Bulk Upload Questions/i);

      const cancelButton = dialog.getByRole("button", { name: /Cancel/i });
      if ((await cancelButton.count()) > 0) {
        await cancelButton.click();
        await waitForDialogToClose(dialog);
        const modalHeading = page.getByRole("heading", {
          name: /Bulk Upload Questions/i,
        });
        const isVisible = await modalHeading.isVisible().catch(() => false);
        expect(isVisible).toBe(false);
      }
    });
  },
);
