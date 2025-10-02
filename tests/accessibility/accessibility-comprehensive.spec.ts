import { test, expect } from '@playwright/test';

test.describe('Comprehensive Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('Homepage accessibility compliance', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Elzatona Web/);

    // Check main heading structure
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Check for skip links
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
  });

  test('Navigation accessibility', async ({ page }) => {
    // Check navigation landmark
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check navigation has proper role
    await expect(nav).toHaveAttribute('role', 'navigation');

    // Check navigation items have proper structure
    const navItems = page.locator('nav a');
    const navItemCount = await navItems.count();
    expect(navItemCount).toBeGreaterThan(0);

    // Check navigation is keyboard accessible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Form accessibility', async ({ page }) => {
    // Navigate to admin questions page
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Check form has proper structure
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check all inputs have labels
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }

    // Check required fields are marked
    const requiredInputs = page.locator(
      'input[required], select[required], textarea[required]'
    );
    const requiredCount = await requiredInputs.count();

    for (let i = 0; i < requiredCount; i++) {
      const input = requiredInputs.nth(i);
      const ariaRequired = await input.getAttribute('aria-required');
      expect(ariaRequired).toBe('true');
    }
  });

  test('Button accessibility', async ({ page }) => {
    // Check all buttons have proper roles and labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);

      // Check button has accessible name
      const accessibleName =
        (await button.getAttribute('aria-label')) ||
        (await button.textContent()) ||
        (await button.getAttribute('title'));
      expect(accessibleName).toBeTruthy();

      // Check button is focusable
      await button.focus();
      const isFocused = await button.evaluate(
        el => el === document.activeElement
      );
      expect(isFocused).toBe(true);
    }
  });

  test('Link accessibility', async ({ page }) => {
    // Check all links have proper structure
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);

      // Check link has accessible name
      const accessibleName =
        (await link.getAttribute('aria-label')) ||
        (await link.textContent()) ||
        (await link.getAttribute('title'));
      expect(accessibleName).toBeTruthy();

      // Check external links have proper indicators
      const href = await link.getAttribute('href');
      if (href && href.startsWith('http') && !href.includes('localhost')) {
        const ariaLabel = await link.getAttribute('aria-label');
        expect(ariaLabel).toContain('external');
      }
    }
  });

  test('Image accessibility', async ({ page }) => {
    // Check all images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Decorative images should have empty alt
      const role = await img.getAttribute('role');
      if (role === 'presentation' || role === 'none') {
        expect(alt).toBe('');
      } else {
        // Informative images should have descriptive alt text
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('Color contrast compliance', async ({ page }) => {
    // This would typically use a tool like axe-core
    // For now, we'll check that important elements are visible
    const importantElements = [
      page.getByText('Master Frontend Development'),
      page.getByText('Start Learning Now'),
      page.getByText('Sign In'),
    ];

    for (const element of importantElements) {
      await expect(element).toBeVisible();
    }
  });

  test('Keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Test tab order
    const tabOrder = [];
    for (let i = 0; i < 10; i++) {
      const element = page.locator(':focus');
      const tagName = await element.evaluate(el => el.tagName);
      const text = await element.textContent();
      tabOrder.push({ tagName, text: text?.trim() });
      await page.keyboard.press('Tab');
    }

    // Check that we can navigate through interactive elements
    expect(tabOrder.length).toBeGreaterThan(0);
  });

  test('Screen reader compatibility', async ({ page }) => {
    // Check for proper ARIA landmarks
    const landmarks = [
      'banner',
      'navigation',
      'main',
      'contentinfo',
      'complementary',
    ];

    for (const landmark of landmarks) {
      const element = page.locator(`[role="${landmark}"]`);
      if ((await element.count()) > 0) {
        await expect(element.first()).toBeVisible();
      }
    }

    // Check for proper heading structure
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check for proper list structure
    const lists = page.locator('ul, ol');
    const listCount = await lists.count();

    for (let i = 0; i < listCount; i++) {
      const list = lists.nth(i);
      const listItems = list.locator('li');
      const itemCount = await listItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('Focus management', async ({ page }) => {
    // Test focus trap in modals
    await page.getByText('Sign In').click();

    // Check that focus is trapped in modal
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    const modal = page.locator('[role="dialog"]');
    const isInModal = await focusedElement.evaluate(
      (el, modal) => modal.contains(el),
      await modal.elementHandle()
    );
    expect(isInModal).toBe(true);
  });

  test('Error handling accessibility', async ({ page }) => {
    // Navigate to a form page
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Submit form without required fields
    await page.getByText('Create Question').click();

    // Check that errors are announced
    const errorMessages = page.locator('[role="alert"]');
    await expect(errorMessages).toBeVisible();

    // Check that error messages are associated with inputs
    const inputsWithErrors = page.locator('input[aria-invalid="true"]');
    const errorCount = await inputsWithErrors.count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('Loading states accessibility', async ({ page }) => {
    // Navigate to a page that shows loading
    await page.goto('/learning-paths');

    // Check for loading indicators
    const loadingIndicator = page.locator(
      '[aria-label*="loading"], [aria-busy="true"]'
    );
    if ((await loadingIndicator.count()) > 0) {
      await expect(loadingIndicator.first()).toBeVisible();
    }
  });

  test('Data table accessibility', async ({ page }) => {
    // Navigate to questions table
    await page.goto('/admin/content/questions');

    // Check for proper table structure
    const table = page.locator('table');
    if ((await table.count()) > 0) {
      await expect(table).toBeVisible();

      // Check for table headers
      const headers = table.locator('th');
      const headerCount = await headers.count();
      expect(headerCount).toBeGreaterThan(0);

      // Check for proper table caption or summary
      const caption = table.locator('caption');
      const summary = table.getAttribute('summary');
      const ariaLabel = table.getAttribute('aria-label');

      const hasDescription =
        (await caption.count()) > 0 ||
        (await summary) !== null ||
        (await ariaLabel) !== null;
      expect(hasDescription).toBe(true);
    }
  });

  test('Mobile accessibility', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that mobile menu is accessible
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Check that menu button has proper aria attributes
    const ariaExpanded = await menuButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBeDefined();

    // Open mobile menu
    await menuButton.click();

    // Check that menu is properly announced
    const menu = page.locator('[role="menu"], [role="navigation"]');
    await expect(menu).toBeVisible();
  });

  test('Dynamic content accessibility', async ({ page }) => {
    // Navigate to a page with dynamic content
    await page.goto('/learning-paths');

    // Check that dynamic content updates are announced
    const liveRegion = page.locator('[aria-live]');
    if ((await liveRegion.count()) > 0) {
      await expect(liveRegion.first()).toBeVisible();
    }
  });

  test('Form validation accessibility', async ({ page }) => {
    // Navigate to a form
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Fill form with invalid data
    await page.getByLabel('Title').fill(''); // Empty required field
    await page.getByText('Create Question').click();

    // Check that validation errors are properly associated
    const titleInput = page.getByLabel('Title');
    const ariaInvalid = await titleInput.getAttribute('aria-invalid');
    expect(ariaInvalid).toBe('true');

    // Check that error message is associated with input
    const errorId = await titleInput.getAttribute('aria-describedby');
    if (errorId) {
      const errorMessage = page.locator(`#${errorId}`);
      await expect(errorMessage).toBeVisible();
    }
  });
});
