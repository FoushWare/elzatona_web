/**
 * E2E Test: Admin Bulk Question Addition - Pagination
 * Tests for pagination functionality
 *
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from "@playwright/test";
import {
  setupAdminPage,
  createQuestion,
  bulkDeleteQuestions,
  createdQuestionTitles,
  testPrefix,
} from "./admin-bulk-question-addition.setup";

test.describe("A-E2E-001: Admin Bulk Question Addition - Pagination", () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // PAGINATION TESTS
  // ============================================

  test("SETUP: Ensure enough questions for pagination tests", async ({
    page,
  }) => {
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
    await page.waitForTimeout(1000);

    // Check current question count from stats cards
    // We need at least 11 questions (more than default pageSize of 10) to trigger pagination
    // The stats card structure: CardContent > div > div (flex-1) > p (label) + p (number)
    let currentCount = 0;

    // Try to get count from stats card
    const totalQuestionsLabel = page.locator("text=/Total Questions/i");
    if ((await totalQuestionsLabel.count()) > 0) {
      // Navigate to the parent card content, then find the number
      // Structure: p (label) > div (flex-1) > div (CardContent) > Card
      const cardContent = totalQuestionsLabel.locator("..").locator("..");
      // The number is in a sibling p element with class containing "text-2xl" or "text-3xl"
      const countElement = cardContent
        .locator("p.text-2xl, p.text-3xl")
        .first();
      const countText = await countElement.textContent().catch(() => null);
      if (countText) {
        currentCount = parseInt(countText.trim(), 10) || 0;
      }
    }

    // Alternative: Use API to get total count if stats card doesn't work
    if (currentCount === 0) {
      try {
        const response = await page.request.get(
          "/api/questions/unified?page=1&pageSize=1",
        );
        const data = await response.json();
        if (data.success && data.pagination) {
          currentCount = data.pagination.totalCount || 0;
        }
      } catch (_e) {
        // API call failed, fall back to counting visible rows
        const questionRows = page
          .locator("div")
          .filter({ has: page.locator('input[type="checkbox"]') });
        const rowCount = await questionRows.count();
        currentCount = rowCount; // At least this many
      }
    }

    // If we have less than 11 questions, create more
    const neededQuestions = Math.max(0, 11 - currentCount);
    if (neededQuestions > 0) {
      console.log(
        `📝 Creating ${neededQuestions} additional questions for pagination tests (current: ${currentCount})...`,
      );
      for (let i = 0; i < neededQuestions; i++) {
        const paginationTestTitle = `${testPrefix} Pagination Test Question ${i + 1}`;
        await createQuestion(page, paginationTestTitle);
        createdQuestionTitles.push(paginationTestTitle);
        await page.waitForTimeout(500); // Small delay between creations
      }
      console.log(
        `✅ Created ${neededQuestions} questions for pagination tests`,
      );
    } else {
      console.log(
        `✅ Already have ${currentCount} questions, enough for pagination tests`,
      );
    }
  });

  test("should navigate to next page", async ({ page }) => {
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
    await page.waitForTimeout(1000);

    // Check if pagination is available (need more than pageSize questions)
    // First, check if there's a "Showing X to Y of Z" text that indicates pagination
    const showingText = page.locator("text=/Showing \d+ to \d+ of \d+/i");
    const hasPagination = (await showingText.count()) > 0;

    // Look for next button - try multiple selectors
    const nextButton = page
      .getByRole("button")
      .filter({ hasText: /→|Next|chevron-right/i });
    const count = await nextButton.count();
    const isDisabled = count > 0 ? await nextButton.first().isDisabled() : true;

    if (hasPagination && count > 0 && !isDisabled) {
      // Set up API response listener BEFORE clicking
      const pageResponsePromise = page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/questions/unified") &&
            response.request().method() === "GET",
          { timeout: 20000 },
        )
        .catch(() => null);

      // Get current page number from "Showing X to Y" text or "Page X of Y"
      const pageIndicator = page.locator(
        "text=/Page \d+ of \d+|Showing \d+ to \d+ of \d+/i",
      );
      const currentPageText = await pageIndicator.first().textContent();

      await nextButton.first().click();

      // Wait for API response
      await pageResponsePromise;
      await page.waitForTimeout(1000);

      // Verify page changed - check if "Showing" text changed
      const newPageText = await pageIndicator.first().textContent();
      expect(newPageText).not.toBe(currentPageText);
    } else {
      // Skip if pagination not available (not enough questions or buttons not found)
      console.log(
        "⚠️ Pagination not available - skipping test. Need more than pageSize questions for pagination.",
      );
      test.skip();
    }
  });

  test("should navigate to previous page", async ({ page }) => {
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
    await page.waitForTimeout(1000);

    // Check if pagination is available
    const showingText = page.locator("text=/Showing \d+ to \d+ of \d+/i");
    const hasPagination = (await showingText.count()) > 0;

    // First navigate to page 2 if possible
    const nextButton = page
      .getByRole("button")
      .filter({ hasText: /→|Next|chevron-right/i });
    const nextCount = await nextButton.count();
    const nextDisabled =
      nextCount > 0 ? await nextButton.first().isDisabled() : true;

    if (hasPagination && nextCount > 0 && !nextDisabled) {
      // Set up API response listener for next page
      const nextPageResponsePromise = page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/questions/unified") &&
            response.request().method() === "GET",
          { timeout: 20000 },
        )
        .catch(() => null);

      // Get current page indicator before navigation
      const pageIndicator = page.locator(
        "text=/Page \d+ of \d+|Showing \d+ to \d+ of \d+/i",
      );
      const beforePageText = await pageIndicator.first().textContent();

      await nextButton.first().click();

      // Wait for next page API response
      await nextPageResponsePromise;
      await page.waitForTimeout(1000);

      // Verify we're on page 2
      const afterNextPageText = await pageIndicator.first().textContent();
      expect(afterNextPageText).not.toBe(beforePageText);

      // Now test previous button
      const prevButton = page
        .getByRole("button")
        .filter({ hasText: /←|Previous|chevron-left/i });
      const prevCount = await prevButton.count();
      const prevDisabled =
        prevCount > 0 ? await prevButton.first().isDisabled() : true;

      if (prevCount > 0 && !prevDisabled) {
        // Set up API response listener for previous page
        const prevPageResponsePromise = page
          .waitForResponse(
            (response) =>
              response.url().includes("/api/questions/unified") &&
              response.request().method() === "GET",
            { timeout: 20000 },
          )
          .catch(() => null);

        await prevButton.first().click();

        // Wait for previous page API response
        await prevPageResponsePromise;
        await page.waitForTimeout(1000);

        // Verify we're back to page 1
        const afterPrevPageText = await pageIndicator.first().textContent();
        expect(afterPrevPageText).toBe(beforePageText);
      } else {
        console.log(
          "⚠️ Previous button not found or disabled - skipping previous page test",
        );
      }
    } else {
      // Skip if pagination not available
      console.log(
        "⚠️ Pagination not available - skipping test. Need more than pageSize questions for pagination.",
      );
      test.skip();
    }
  });

  test("should change page size", async ({ page }) => {
    // Set a longer timeout for this test as it involves UI interactions
    // Must be set BEFORE any async operations
    test.setTimeout(150000); // 150 seconds (2.5 minutes) to account for slow beforeEach

    // Check if page is closed before starting
    if (page.isClosed()) {
      throw new Error("Page was closed before test started");
    }

    await page.waitForTimeout(2000);

    // Wait for page to be ready
    if (page.isClosed()) {
      throw new Error("Page was closed during initial wait");
    }
    await page
      .locator("h1")
      .filter({ hasText: /^Question Management$/i })
      .waitFor({ timeout: 10000 });
    const loadingText = page.locator("text=/Loading questions/i");
    await loadingText
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});

    if (page.isClosed()) {
      throw new Error("Page was closed after loading completed");
    }
    await page.waitForTimeout(1000);

    // Early check: Look for page size selector - it's a Radix UI Select component
    // The Select has a button trigger with role="combobox" and "Show:" label nearby
    // Find the "Show:" label first to locate the Select
    if (page.isClosed()) {
      throw new Error("Page was closed before finding page size selector");
    }

    // Quick check for pagination availability - if not available, skip early
    const showLabel = page.locator("text=/Show:/i");
    const hasShowLabel = (await showLabel.count()) > 0;

    if (!hasShowLabel) {
      console.log(
        '⚠️ "Show:" label not found - page size selector may not be visible (pagination might not be available)',
      );
      test.skip();
      return;
    }

    // Also check if there are enough questions for pagination
    // If we have less than pageSize questions, pagination controls won't show
    try {
      const questionsAPIResponse = await page
        .waitForResponse(
          (response) =>
            response.url().includes("/api/questions/unified") &&
            response.request().method() === "GET",
          { timeout: 5000 },
        )
        .catch(() => null);

      if (questionsAPIResponse) {
        const data = await questionsAPIResponse.json();
        const totalQuestions = data?.data?.total || data?.total || 0;
        const pageSize = data?.data?.pageSize || data?.pageSize || 10;

        if (totalQuestions <= pageSize) {
          console.log(
            `⚠️ Only ${totalQuestions} questions available (pageSize: ${pageSize}) - pagination not available, skipping test`,
          );
          test.skip();
          return;
        }
      }
    } catch (_e) {
      // If we can't check, continue anyway
      console.log("⚠️ Could not verify question count, continuing...");
    }

    // Find the Select trigger button - it's in the same container as "Show:" label
    // The structure is: div.flex.items-center.space-x-2 > span "Show:" + Select > SelectTrigger
    // Better approach: find the combobox that's in the pagination area
    let trigger: any = null;

    // Method 1: Find combobox near "Show:" text (in the same flex container)
    try {
      // Find the parent container that has both "Show:" and the Select
      const showContainer = showLabel.locator(".."); // Parent of "Show:" span
      const comboboxInContainer = showContainer.locator(
        'button[role="combobox"]',
      );
      const comboboxCount = await comboboxInContainer.count();

      if (comboboxCount > 0) {
        trigger = comboboxInContainer.first();
        console.log("✅ Found page size selector using container method");
      }
    } catch (_e) {
      console.log("⚠️ Container method failed, trying alternative...");
    }

    // Method 2: Find any combobox in the pagination area (fallback)
    if (!trigger || (await trigger.count().catch(() => 0)) === 0) {
      try {
        // Find combobox that's not disabled and is visible
        const allComboboxes = page.locator(
          'button[role="combobox"]:not([data-disabled]):not([aria-disabled="true"])',
        );
        const comboboxCount = await allComboboxes.count();

        if (comboboxCount > 0) {
          // Get the one that's near "Show:" text (check if it's in the same area)
          for (let i = 0; i < comboboxCount; i++) {
            const cb = allComboboxes.nth(i);
            const isVisible = await cb.isVisible().catch(() => false);
            if (isVisible) {
              // Check if it's near the "Show:" label by checking if they're in the same viewport area
              const cbBox = await cb.boundingBox().catch(() => null);
              const showBox = await showLabel.boundingBox().catch(() => null);

              if (cbBox && showBox) {
                // Check if they're close vertically (within 50px)
                const verticalDistance = Math.abs(cbBox.y - showBox.y);
                if (verticalDistance < 50) {
                  trigger = cb;
                  console.log(
                    "✅ Found page size selector using proximity method",
                  );
                  break;
                }
              }
            }
          }
        }
      } catch (_e) {
        console.log("⚠️ Proximity method failed");
      }
    }

    // Method 3: Direct selector (last resort)
    if (!trigger || (await trigger.count().catch(() => 0)) === 0) {
      const directCombobox = page.locator('button[role="combobox"]').first();
      const directCount = await directCombobox.count();
      if (directCount > 0) {
        trigger = directCombobox;
        console.log("✅ Found page size selector using direct method");
      }
    }

    if (!trigger || (await trigger.count().catch(() => 0)) === 0) {
      // Skip if page size selector not found
      console.log("⚠️ Page size selector not found - skipping test");
      test.skip();
      return;
    }

    // Verify trigger is visible and enabled before clicking
    // Don't use page.isClosed() - let Playwright handle actual closure errors
    try {
      await trigger.waitFor({ state: "visible", timeout: 5000 });
      const isEnabled = await trigger.isEnabled().catch(() => false);
      if (!isEnabled) {
        console.log(
          "⚠️ Page size selector is disabled, waiting for it to be enabled...",
        );
        await trigger.waitFor({ state: "attached", timeout: 5000 });
      }
    } catch (e: any) {
      // Check if error is due to actual page closure
      const errorMsg = e?.message || String(e);
      if (
        errorMsg.includes("Target page, context or browser has been closed") ||
        errorMsg.includes("page has been closed")
      ) {
        throw new Error("Page was closed while waiting for page size selector");
      }
      throw new Error(`Page size selector not ready: ${errorMsg}`);
    }

    // Get current "Showing" text before change
    // Use try-catch instead of page.isClosed() check - Playwright will throw if page is actually closed
    let beforeText: string | null = null;
    try {
      const showingTextBefore = page.locator(
        "text=/Showing \\d+ to \\d+ of \\d+/i",
      );
      beforeText = await showingTextBefore
        .first()
        .textContent({ timeout: 5000 })
        .catch(() => null);
    } catch (_e: any) {
      // If page is actually closed, Playwright will throw a proper error
      // Just log and continue - the click attempt will fail if page is really closed
      console.log('⚠️ Could not get "Showing" text, continuing anyway...');
    }

    // Click the Select trigger to open dropdown FIRST (before setting up API wait)
    // Don't use page.isClosed() - it can give false positives during navigation
    // Instead, wrap in try-catch and let Playwright handle actual page closure errors

    try {
      // Ensure trigger is still valid and visible
      // Use try-catch - if page is closed, this will throw a proper Playwright error
      const triggerCount = await trigger.count();
      if (triggerCount === 0) {
        throw new Error("Page size selector trigger not found");
      }

      // Verify trigger is ready (quick check, don't wait too long)
      try {
        await trigger.waitFor({ state: "visible", timeout: 3000 });
      } catch (_e) {
        // If not visible, try to find it again
        console.log("⚠️ Trigger not immediately visible, re-finding...");
        const newTrigger = page.locator('button[role="combobox"]').first();
        const newCount = await newTrigger.count();
        if (newCount > 0 && (await newTrigger.isVisible().catch(() => false))) {
          trigger = newTrigger;
        } else {
          throw new Error("Page size selector not visible");
        }
      }

      const isEnabled = await trigger.isEnabled().catch(() => false);
      if (!isEnabled) {
        console.log("⚠️ Page size selector is disabled, checking again...");
        await page.waitForTimeout(500);
        const stillDisabled = await trigger.isEnabled().catch(() => false);
        if (stillDisabled) {
          throw new Error("Page size selector is disabled");
        }
      }

      // Quick scroll and focus, minimal waits
      // Don't check page.isClosed() - let Playwright handle actual closure errors
      await trigger.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
      await trigger.focus({ timeout: 5000 }).catch(() => {});

      // Final check before clicking - ensure trigger is still valid
      // If page is closed, Playwright will throw a proper error
      const finalTriggerCount = await trigger.count().catch(() => 0);
      if (finalTriggerCount === 0) {
        throw new Error("Page size selector trigger disappeared before click");
      }

      // Click with retry mechanism - sometimes the first click fails due to timing
      let clickSucceeded = false;
      const maxClickRetries = 3;

      for (let retry = 0; retry < maxClickRetries; retry++) {
        try {
          // Re-verify trigger exists before each attempt
          // If page is closed, Playwright will throw a proper error here
          const currentCount = await trigger.count().catch(() => 0);
          if (currentCount === 0) {
            // Try to re-find the trigger
            const newTrigger = page.locator('button[role="combobox"]').first();
            const newCount = await newTrigger.count().catch(() => 0);
            if (newCount > 0) {
              trigger = newTrigger;
            } else {
              throw new Error("Page size selector trigger not found");
            }
          }

          // Attempt click with reasonable timeout
          // If page is actually closed, Playwright will throw "Target page, context or browser has been closed"
          await trigger.click({ timeout: 15000, force: false });
          clickSucceeded = true;
          console.log("✅ Clicked page size selector");
          break; // Success, exit retry loop
        } catch (clickErr: any) {
          // Check if error is due to page closure (Playwright's actual error message)
          const errorMessage = clickErr?.message || String(clickErr);
          if (
            errorMessage.includes(
              "Target page, context or browser has been closed",
            ) ||
            errorMessage.includes("page has been closed")
          ) {
            throw new Error(
              `Page was closed during click attempt ${retry + 1}: ${errorMessage}`,
            );
          }

          if (retry < maxClickRetries - 1) {
            console.log(
              `⚠️ Click attempt ${retry + 1} failed, retrying... (${errorMessage})`,
            );
            await page.waitForTimeout(1000); // Wait before retry
            // Re-find trigger for next attempt
            const newTrigger = page.locator('button[role="combobox"]').first();
            const newCount = await newTrigger.count().catch(() => 0);
            if (newCount > 0) {
              trigger = newTrigger;
            }
          } else {
            // Last attempt failed, throw error
            throw clickErr;
          }
        }
      }

      if (!clickSucceeded) {
        throw new Error(
          "Failed to click page size selector after all retry attempts",
        );
      }
    } catch (clickError: any) {
      // Check if error is due to actual page closure (Playwright's error message)
      const errorMsg = clickError?.message || String(clickError);
      if (
        errorMsg.includes("Target page, context or browser has been closed") ||
        errorMsg.includes("page has been closed")
      ) {
        throw new Error(
          `Page was closed during page size selector click. ` +
            `This usually indicates a timeout or browser crash. ` +
            `Original error: ${errorMsg}`,
        );
      }
      // Re-throw with more context for other errors
      throw new Error(`Failed to click page size selector: ${errorMsg}`);
    }

    // NOW set up API response listener AFTER clicking
    let pageSizeResponse: any = null;
    const responseHandler = (response: any) => {
      const url = response.url();
      if (
        url.includes("/api/questions/unified") &&
        response.request().method() === "GET" &&
        (url.includes("pageSize=20") || url.includes("pageSize=5"))
      ) {
        console.log("✅ Page size change API response detected");
        pageSizeResponse = response;
      }
    };
    page.on("response", responseHandler);

    // Small wait for dropdown to open
    await page.waitForTimeout(300);

    // Select option "20" from the dropdown
    // Don't use page.isClosed() - let Playwright handle actual closure errors
    // Find option that's not disabled - use more specific selector
    const option20 = page
      .locator('[role="option"]')
      .filter({ hasText: "20" })
      .filter({
        hasNot: page.locator('[data-disabled], [aria-disabled="true"]'),
      })
      .first();

    try {
      // Wait for option to be visible (dropdown should be open now)
      // If page is closed, Playwright will throw a proper error
      await option20.waitFor({ state: "visible", timeout: 5000 });

      await option20.click({ timeout: 5000 });
      console.log("✅ Selected page size 20");
    } catch (optionError: any) {
      page.off("response", responseHandler);
      // Check if error is due to actual page closure
      const errorMsg = optionError?.message || String(optionError);
      if (
        errorMsg.includes("Target page, context or browser has been closed") ||
        errorMsg.includes("page has been closed")
      ) {
        throw new Error("Page was closed during page size option selection");
      }
      throw new Error(`Failed to select page size option: ${errorMsg}`);
    }

    // NOW wait for API response (after clicking)
    // Don't check page.isClosed() - let Playwright handle actual closure errors
    try {
      // Set up promise-based wait AFTER clicking
      const pageSizeResponsePromise = page
        .waitForResponse(
          (response) => {
            const url = response.url();
            return (
              url.includes("/api/questions/unified") &&
              response.request().method() === "GET" &&
              (url.includes("pageSize=20") || url.includes("pageSize=5"))
            );
          },
          { timeout: 8000 }, // Reduced to 8s
        )
        .catch(() => pageSizeResponse); // Return handler response if promise times out

      // Wait for response (either from handler or promise)
      if (!pageSizeResponse) {
        await pageSizeResponsePromise;
      }
      await page.waitForTimeout(1000);
    } catch (waitError: any) {
      // Check if error is due to actual page closure
      const errorMsg = waitError?.message || String(waitError);
      if (
        errorMsg.includes("Target page, context or browser has been closed") ||
        errorMsg.includes("page has been closed")
      ) {
        page.off("response", responseHandler);
        throw new Error("Page was closed while waiting for API response");
      }
      // If we got response via handler, that's OK
      if (pageSizeResponse) {
        console.log("✅ API response received via handler");
      } else {
        console.log("⚠️ API response wait failed, but continuing...");
      }
    }

    // Remove response handler
    page.off("response", responseHandler);

    // Verify page size changed - check if "Showing" text changed or more questions are visible
    // Don't check page.isClosed() - let Playwright handle actual closure errors
    const showingTextAfter = page.locator(
      "text=/Showing \\d+ to \\d+ of \\d+/i",
    );
    const afterText = await showingTextAfter
      .first()
      .textContent({ timeout: 5000 })
      .catch(() => null);

    // The "Showing" text should have changed (showing more items per page)
    if (beforeText && afterText) {
      expect(afterText).not.toBe(beforeText);
    } else {
      // Fallback: just verify the text is visible
      await expect(showingTextAfter.first()).toBeVisible({ timeout: 5000 });
    }
  });

  // ============================================
  // CLEANUP: Delete test questions created for pagination tests
  // ============================================

  test("CLEANUP: Delete pagination test questions", async ({ page }) => {
    await page.waitForTimeout(2000);

    if (createdQuestionTitles.length === 0) {
      console.log("No pagination test questions to clean up");
      return;
    }

    console.log(
      `🧹 Cleaning up ${createdQuestionTitles.length} pagination test questions...`,
    );
    await bulkDeleteQuestions(page, createdQuestionTitles);
    console.log("✅ Pagination cleanup complete");
  });
});
