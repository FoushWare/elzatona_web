import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations on home page', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on learning paths page', async ({
    page,
  }) => {
    await page.goto('/learning-paths');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on admin page', async ({
    page,
  }) => {
    // Mock admin authentication
    await page.evaluate(() => {
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem(
        'admin-user',
        JSON.stringify({
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        })
      );
    });

    await page.goto('/admin/content/questions');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/learning-paths');

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(h => h.evaluate(el => parseInt(el.tagName.charAt(1))))
    );

    // Check that headings follow proper hierarchy
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i]).toBeLessThanOrEqual(headingLevels[i - 1] + 1);
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Check that all form inputs have labels
    const inputs = await page.locator('input, textarea, select').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const label = await page.locator(`label[for="${id}"]`).count();

      expect(id && (label > 0 || ariaLabel || ariaLabelledBy)).toBeTruthy();
    }
  });

  test('should have proper button accessibility', async ({ page }) => {
    await page.goto('/learning-paths');

    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');

      expect(text || ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('should have proper link accessibility', async ({ page }) => {
    await page.goto('/learning-paths');

    const links = await page.locator('a').all();

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const href = await link.getAttribute('href');

      expect(text || ariaLabel).toBeTruthy();
      expect(href).toBeTruthy();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/learning-paths');

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that focus is visible
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Check for proper ARIA attributes on interactive elements
    const interactiveElements = await page
      .locator('[role="button"], [role="link"], [role="tab"], [role="dialog"]')
      .all();

    for (const element of interactiveElements) {
      const role = await element.getAttribute('role');
      const ariaLabel = await element.getAttribute('aria-label');
      const ariaLabelledBy = await element.getAttribute('aria-labelledby');

      expect(role).toBeTruthy();
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('should have proper table accessibility', async ({ page }) => {
    await page.goto('/admin/content/questions');

    const tables = await page.locator('table').all();

    for (const table of tables) {
      const caption = await table.locator('caption').count();
      const headers = await table.locator('th').count();

      expect(caption > 0 || headers > 0).toBeTruthy();
    }
  });

  test('should have proper form validation', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click Add Question button
    await page.click('button:has-text("Add Question")');

    // Try to submit empty form
    await page.click('button:has-text("Create Question")');

    // Check for validation messages
    const validationMessages = await page
      .locator('[role="alert"], .error-message, [aria-invalid="true"]')
      .count();
    expect(validationMessages).toBeGreaterThan(0);
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Open modal
    await page.click('button:has-text("Add Question")');

    // Check that focus is trapped in modal
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.locator(':focus');
    const modal = await page.locator('[role="dialog"]');

    expect(await modal.contains(focusedElement)).toBeTruthy();
  });

  test('should have proper screen reader support', async ({ page }) => {
    await page.goto('/learning-paths');

    // Check for screen reader only text
    const srOnlyElements = await page
      .locator('.sr-only, .visually-hidden')
      .count();
    expect(srOnlyElements).toBeGreaterThan(0);

    // Check for proper landmark roles
    const landmarks = await page
      .locator(
        '[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]'
      )
      .count();
    expect(landmarks).toBeGreaterThan(0);
  });

  test('should have proper error handling', async ({ page }) => {
    // Mock API error
    await page.route('**/api/learning-paths**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
        }),
      });
    });

    await page.goto('/learning-paths');

    // Check for error message
    const errorMessage = await page
      .locator('[role="alert"], .error-message')
      .textContent();
    expect(errorMessage).toContain('Error');
  });

  test('should have proper loading states', async ({ page }) => {
    await page.goto('/learning-paths');

    // Check for loading indicators
    const loadingIndicators = await page
      .locator('[aria-busy="true"], .loading, [role="status"]')
      .count();
    expect(loadingIndicators).toBeGreaterThan(0);
  });

  test('should have proper skip links', async ({ page }) => {
    await page.goto('/learning-paths');

    // Check for skip links
    const skipLinks = await page
      .locator('a[href="#main"], a[href="#content"]')
      .count();
    expect(skipLinks).toBeGreaterThan(0);
  });

  test('should have proper language attributes', async ({ page }) => {
    await page.goto('/learning-paths');

    // Check for lang attribute
    const html = await page.locator('html');
    const lang = await html.getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/learning-paths');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });

  test('should have proper table headers', async ({ page }) => {
    await page.goto('/admin/content/questions');

    const tables = await page.locator('table').all();

    for (const table of tables) {
      const headers = await table.locator('th').all();

      for (const header of headers) {
        const scope = await header.getAttribute('scope');
        const id = await header.getAttribute('id');

        expect(scope || id).toBeTruthy();
      }
    }
  });

  test('should have proper form field associations', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Click Add Question button
    await page.click('button:has-text("Add Question")');

    const formFields = await page.locator('input, textarea, select').all();

    for (const field of formFields) {
      const id = await field.getAttribute('id');
      const ariaDescribedBy = await field.getAttribute('aria-describedby');
      const ariaLabelledBy = await field.getAttribute('aria-labelledby');

      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        const describedBy = await page.locator(`#${ariaDescribedBy}`).count();
        const labelledBy = await page.locator(`#${ariaLabelledBy}`).count();

        expect(label > 0 || describedBy > 0 || labelledBy > 0).toBeTruthy();
      }
    }
  });
});
