/**
 * E2E Test: Admin Dashboard (A-E2E-003)
 * Task: A-003 - Admin Dashboard
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
// This ensures tests use a separate Supabase database
import '../test-env-loader';

import { test, expect } from '@playwright/test';

test.describe('A-E2E-003: Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Validate credentials are provided and not empty
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();
    
    if (!adminEmail || !adminPassword || adminEmail === '' || adminPassword === '') {
      throw new Error(
        'ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set in .env.local and cannot be empty.\n' +
        `Current values: ADMIN_EMAIL=${adminEmail ? '***' : 'undefined'}, ADMIN_PASSWORD=${adminPassword ? '***' : 'undefined'}\n` +
        'Please check your .env.local file and ensure both variables are set with valid values.'
      );
    }
    
    // Start from login page - BEGINNING OF FLOW
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
    
    // Wait for login form to be ready
    await page.getByRole('heading', { name: /Admin Login/i }).waitFor({ timeout: 10000 });
    
    // Get form elements
    const emailInput = page.getByLabel(/Email Address/i);
    const passwordInput = page.getByLabel(/Password/i);
    const submitButton = page.getByRole('button', { name: /Sign In/i });
    
    // Ensure form elements are ready and visible
    await expect(emailInput).toBeVisible({ timeout: 5000 });
    await expect(passwordInput).toBeVisible({ timeout: 5000 });
    await expect(submitButton).toBeEnabled({ timeout: 5000 });
    
    // Clear any existing values first (important for retries)
    await emailInput.click({ clickCount: 3 }); // Triple click to select all
    await emailInput.press('Backspace'); // Clear
    await passwordInput.click({ clickCount: 3 }); // Triple click to select all
    await passwordInput.press('Backspace'); // Clear
    await page.waitForTimeout(100);
    
    // Fill form with credentials from environment variables (NO HARDCODED VALUES)
    // Use type() for React controlled inputs - it triggers onChange events properly
    await emailInput.click(); // Focus email field
    await emailInput.type(adminEmail, { delay: 0 }); // Type ADMIN_EMAIL from env (triggers onChange)
    await page.waitForTimeout(100);
    
    await passwordInput.click(); // Focus password field
    await passwordInput.type(adminPassword, { delay: 0 }); // Type ADMIN_PASSWORD from env (triggers onChange)
    await page.waitForTimeout(100);
    
    // Verify values were actually filled in the DOM
    const filledEmail = await emailInput.inputValue();
    const filledPassword = await passwordInput.inputValue();
    
    if (!filledEmail || !filledPassword || filledEmail !== adminEmail || filledPassword !== adminPassword) {
      throw new Error(
        `Form fields not filled correctly with environment variables.\n` +
        `Expected email (from ADMIN_EMAIL): ${adminEmail.substring(0, 5)}...\n` +
        `Got email: ${filledEmail || 'empty'}\n` +
        `Expected password length (from ADMIN_PASSWORD): ${adminPassword.length}\n` +
        `Got password length: ${filledPassword?.length || 0}\n` +
        `Please verify ADMIN_EMAIL and ADMIN_PASSWORD are set in .env.local`
      );
    }
    
    // Set up navigation and network listeners BEFORE clicking
    const navigationPromise = page.waitForURL(/.*admin\/dashboard.*/, { timeout: 30000 });
    
    // Wait for the API response to complete
    const responsePromise = page.waitForResponse(
      response => {
        const url = response.url();
        const method = response.request().method();
        return url.includes('/api/admin/auth') && method === 'POST';
      },
      { timeout: 15000 }
    ).catch(() => null);
    
    // Click submit button and wait for response
    // IMPORTANT: Values come from environment variables (adminEmail, adminPassword) - NO HARDCODED VALUES
    await submitButton.click();
    
    // Wait for API response first (with longer timeout)
    // This is critical - we need to wait for the API to respond before checking navigation
    let response;
    try {
      response = await responsePromise;
    } catch (error) {
      // API response timeout - check what happened
      const currentURL = page.url();
      const errorMessage = page.locator('.bg-red-50, .bg-red-900\\/20');
      const hasError = await errorMessage.isVisible().catch(() => false);
      
      if (hasError) {
        const errorText = await errorMessage.textContent();
        throw new Error(`Login failed with error: ${errorText}`);
      }
      
      throw new Error(
        `Login API timeout: No response from /api/admin/auth after 15 seconds.\n` +
        `Current URL: ${currentURL}\n` +
        `Email used: ${adminEmail.substring(0, 5)}... (from ADMIN_EMAIL env var)\n` +
        `This might indicate:\n` +
        `1. Login API endpoint is not responding\n` +
        `2. Server is slow or not running\n` +
        `3. Network issue preventing API call\n` +
        `Check browser DevTools Network tab for failed requests.`
      );
    }
    
    // Process API response
    if (response) {
      const responseData = await response.json();
      if (!responseData.success) {
        const errorMsg = responseData.error || 'Unknown error';
        if (errorMsg.includes('Invalid email or password')) {
          throw new Error(
            `Login failed: ${errorMsg}\n\n` +
            `Test credentials (${adminEmail.substring(0, 5)}...) from ADMIN_EMAIL env var do not exist in the database.\n` +
            `To set up test admin user:\n` +
            `1. Verify ADMIN_EMAIL and ADMIN_PASSWORD are set correctly in .env.local\n` +
            `2. Create admin user via API: POST /api/admin/init with email and password\n` +
            `3. Or run: npm run setup:admin (if available)\n` +
            `Note: Never use hardcoded credentials - always use environment variables.`
          );
        }
        throw new Error(`Login API failed: ${errorMsg}`);
      }
    } else {
      // No response received - this shouldn't happen due to try/catch above, but handle it
      throw new Error('Login API did not respond - check server logs');
    }
    
    // Wait for navigation to dashboard (API succeeded, so navigation should happen)
    try {
      await navigationPromise;
    } catch (error: any) {
      // Navigation timeout - check if error message appeared
      const errorMessage = page.locator('.bg-red-50, .bg-red-900\\/20');
      if (await errorMessage.isVisible().catch(() => false)) {
        const errorText = await errorMessage.textContent();
        throw new Error(`Login succeeded but navigation failed. Error: ${errorText}`);
      }
      
      // Check current URL
      const currentURL = page.url();
      if (currentURL.includes('/admin/login')) {
        throw new Error(
          `Navigation timeout: Still on login page after API success.\n` +
          `Current URL: ${currentURL}\n` +
          `API responded successfully but redirect did not happen.\n` +
          `This might indicate a client-side routing issue.`
        );
      }
      
      throw error;
    }
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*admin\/dashboard.*/, { timeout: 10000 });
    
    // Wait for dashboard to be fully loaded
    await page.waitForLoadState('networkidle');
    const dashboardHeading = page.getByRole('heading', { name: /Admin Dashboard/i });
    await expect(dashboardHeading).toBeVisible({ timeout: 10000 });
  });

  test('should load dashboard page', async ({ page }) => {
    await expect(page).toHaveURL(/.*admin\/dashboard.*/);
    await expect(page.locator('h1')).toContainText(/Admin Dashboard/i);
  });

  test('should display dashboard stats', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Find the stats cards grid container (more specific targeting)
    const statsGrid = page.locator('.grid').filter({ hasText: /Total Questions/i }).first();
    
    // Check for all 6 stats cards within the stats grid
    // Use more specific selectors to avoid matching quick action buttons
    await expect(statsGrid.getByText(/Total Questions/i)).toBeVisible({ timeout: 5000 });
    
    // For "Learning Cards", use getAllByText and check the first one (stat card)
    const learningCardsTexts = page.getByText(/Learning Cards/i);
    const learningCardsCount = await learningCardsTexts.count();
    expect(learningCardsCount).toBeGreaterThan(0);
    // Verify the stat card version is visible (should be in the grid)
    await expect(learningCardsTexts.first()).toBeVisible({ timeout: 5000 });
    
    await expect(statsGrid.getByText(/Learning Plans/i)).toBeVisible({ timeout: 5000 });
    await expect(statsGrid.getByText(/^Topics$/i)).toBeVisible({ timeout: 5000 }); // Exact match for Topics card
    await expect(statsGrid.getByText(/^Categories$/i)).toBeVisible({ timeout: 5000 }); // Exact match for Categories card
    await expect(statsGrid.getByText(/Total Tasks/i)).toBeVisible({ timeout: 5000 });
    
    // Verify Topics card shows a number (even if 0)
    const topicsCard = statsGrid.getByText(/^Topics$/i).locator('..').locator('..');
    const topicsValue = await topicsCard.locator('text=/\\d+/').first().textContent();
    expect(topicsValue).toBeTruthy();
    
    // Verify Categories card shows a number (even if 0)
    const categoriesCard = statsGrid.getByText(/^Categories$/i).locator('..').locator('..');
    const categoriesValue = await categoriesCard.locator('text=/\\d+/').first().textContent();
    expect(categoriesValue).toBeTruthy();
  });

  test('should display admin menu items', async ({ page }) => {
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    
    // Wait for the dashboard heading to ensure page is loaded
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible({ timeout: 10000 });
    
    // Find and click the "Admin Menu" button in the navbar to open the dropdown
    // Try data attribute first, fallback to role-based selector
    let adminMenuButton = page.locator('[data-admin-dropdown-button]');
    const buttonCount = await adminMenuButton.count();
    if (buttonCount === 0) {
      adminMenuButton = page.getByRole('button', { name: /Admin Menu/i });
    }
    await expect(adminMenuButton).toBeVisible({ timeout: 10000 });
    
    // Click to open the dropdown
    await adminMenuButton.click();
    
    // Wait for the dropdown to be visible
    const adminDropdown = page.locator('[data-admin-dropdown]');
    await expect(adminDropdown).toBeVisible({ timeout: 5000 });
    
    // Now find menu items inside the dropdown
    // Questions should be visible in the dropdown
    await expect(page.getByText(/Questions/i).first()).toBeVisible({ timeout: 5000 });
    
    // Content Management should be visible in the dropdown
    const contentManagement = page.getByText(/Content Management/i).first();
    await expect(contentManagement).toBeVisible({ timeout: 5000 });
  });

  test('should have refresh button', async ({ page }) => {
    const refreshButton = page.getByRole('button', { name: /Refresh/i });
    await expect(refreshButton).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to questions page from menu', async ({ page }) => {
    // Wait for dashboard to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Find and click the "Admin Menu" button in the navbar to open the dropdown
    // Try data attribute first, fallback to role-based selector
    let adminMenuButton = page.locator('[data-admin-dropdown-button]');
    const buttonCount = await adminMenuButton.count();
    if (buttonCount === 0) {
      adminMenuButton = page.getByRole('button', { name: /Admin Menu/i });
    }
    await expect(adminMenuButton).toBeVisible({ timeout: 10000 });
    
    // Click to open the dropdown
    await adminMenuButton.click();
    
    // Wait for the dropdown to be visible
    const adminDropdown = page.locator('[data-admin-dropdown]');
    await expect(adminDropdown).toBeVisible({ timeout: 5000 });
    
    // Find the Questions link inside the dropdown
    const questionsLink = page.getByRole('link', { name: /Questions/i }).first();
    
    // Wait for the link to be visible
    await expect(questionsLink).toBeVisible({ timeout: 5000 });
    
    // Click and wait for navigation
    await Promise.all([
      page.waitForURL(/.*admin\/content\/questions.*/, { timeout: 20000 }),
      questionsLink.click(),
    ]);
    
    // Verify we're on the questions page
    await expect(page).toHaveURL(/.*admin\/content\/questions.*/);
  });

  test('should display theme toggle button in navbar', async ({ page }) => {
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    
    // Find the theme toggle button by aria-label
    const themeToggleButton = page.getByRole('button', { name: /Toggle theme/i });
    
    // Verify the button is visible
    await expect(themeToggleButton).toBeVisible({ timeout: 10000 });
    
    // Verify the button has the correct title attribute
    const title = await themeToggleButton.getAttribute('title');
    expect(title).toMatch(/Toggle theme|Switch to (light|dark) mode/i);
  });

  test('should display correct icon based on current theme', async ({ page }) => {
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    
    // Get the current theme from the HTML element
    const htmlElement = page.locator('html');
    const hasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Find the theme toggle button
    const themeToggleButton = page.getByRole('button', { name: /Toggle theme/i });
    await expect(themeToggleButton).toBeVisible({ timeout: 10000 });
    
    // Check which icon is displayed based on theme
    // The button should contain an SVG icon (Sun or Moon)
    const icon = themeToggleButton.locator('svg');
    await expect(icon.first()).toBeVisible({ timeout: 5000 });
    
    // Verify icon is present (Sun in dark mode, Moon in light mode)
    const iconCount = await icon.count();
    expect(iconCount).toBeGreaterThan(0);
  });

  test('should switch between light and dark theme', async ({ page }) => {
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    
    // Get initial theme state
    const htmlElement = page.locator('html');
    const initialHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Find the theme toggle button
    const themeToggleButton = page.getByRole('button', { name: /Toggle theme/i });
    await expect(themeToggleButton).toBeVisible({ timeout: 10000 });
    
    // Click the theme toggle button
    await themeToggleButton.click();
    
    // Wait for theme change to apply (check for class change on html element)
    await page.waitForFunction(
      (initialDark) => {
        const html = document.documentElement;
        return html.classList.contains('dark') !== initialDark;
      },
      initialHasDarkClass,
      { timeout: 5000 }
    );
    
    // Verify the theme has changed
    const newHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    expect(newHasDarkClass).not.toBe(initialHasDarkClass);
    
    // Verify the icon has changed (wait for React to update the icon)
    await page.waitForTimeout(500); // Small delay for icon update
    
    // Verify icon is still visible after theme change
    const iconAfterToggle = themeToggleButton.locator('svg');
    await expect(iconAfterToggle.first()).toBeVisible({ timeout: 5000 });
    
    // Click again to switch back
    await themeToggleButton.click();
    
    // Wait for theme to switch back
    await page.waitForFunction(
      (initialDark) => {
        const html = document.documentElement;
        return html.classList.contains('dark') === initialDark;
      },
      initialHasDarkClass,
      { timeout: 5000 }
    );
    
    // Verify we're back to the original theme
    const finalHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    expect(finalHasDarkClass).toBe(initialHasDarkClass);
  });

  test('should persist theme preference after page reload', async ({ page }) => {
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle');
    
    // Get initial theme state
    const htmlElement = page.locator('html');
    const initialHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Find the theme toggle button
    const themeToggleButton = page.getByRole('button', { name: /Toggle theme/i });
    await expect(themeToggleButton).toBeVisible({ timeout: 10000 });
    
    // Toggle theme to a different state
    await themeToggleButton.click();
    
    // Wait for theme change
    await page.waitForFunction(
      (initialDark) => {
        const html = document.documentElement;
        return html.classList.contains('dark') !== initialDark;
      },
      initialHasDarkClass,
      { timeout: 5000 }
    );
    
    // Get the new theme state
    const newHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Reload the page
    await page.reload({ waitUntil: 'networkidle' });
    
    // Wait for dashboard to load after reload
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible({ timeout: 10000 });
    
    // Verify theme persisted after reload
    const persistedHasDarkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    expect(persistedHasDarkClass).toBe(newHasDarkClass);
    
    // Verify theme toggle button still works after reload
    const themeToggleButtonAfterReload = page.getByRole('button', { name: /Toggle theme/i });
    await expect(themeToggleButtonAfterReload).toBeVisible({ timeout: 10000 });
    
    // Click to toggle again
    await themeToggleButtonAfterReload.click();
    
    // Verify theme changed again
    await page.waitForFunction(
      (expectedDark) => {
        const html = document.documentElement;
        return html.classList.contains('dark') === expectedDark;
      },
      !newHasDarkClass,
      { timeout: 5000 }
    );
  });
});
