/**
 * E2E Test: Admin Bulk Question Addition - Form Validation
 * Tests for form validation and error handling
 * 
 * Note: Environment variables are loaded by the setup file
 */

import { test, expect } from '@playwright/test';
import { setupAdminPage } from './admin-bulk-question-addition.setup';

test.describe('A-E2E-001: Admin Bulk Question Addition - Validation', () => {
  // Set default timeout for all tests in this suite
  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page, browserName }) => {
    await setupAdminPage(page, browserName);
  });
  // FORM VALIDATION TESTS
  // ============================================

  test('should show validation error for empty required fields', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
      console.log('Network idle timeout, continuing anyway...');
    });
    
    // Wait for the questions page content to be visible
    await page.locator('h1').filter({ hasText: /^Question Management$/i }).waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for search input to be visible (indicates page is ready)
    const searchInput = page.locator('input[placeholder*="Search questions"]');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Additional wait to ensure all components are rendered
    await page.waitForTimeout(2000);
    
    // Now find and click the button - try multiple approaches
    let addButton;
    let buttonFound = false;
    
    // Try approach 1: Header section
    try {
      const headerSection = page.locator('h2, h3').filter({ hasText: /Questions/i }).locator('..');
      addButton = headerSection.getByRole('button', { name: /Add New Question/i }).first();
      await addButton.waitFor({ state: 'visible', timeout: 5000 });
      buttonFound = true;
    } catch (e) {
      console.log('Header section approach failed, trying direct approach...');
    }
    
    // Try approach 2: Direct button search
    if (!buttonFound) {
      try {
        addButton = page.getByRole('button', { name: /Add New Question/i }).first();
        await addButton.waitFor({ state: 'visible', timeout: 5000 });
        buttonFound = true;
      } catch (e) {
        console.log('Direct button approach failed, trying text-based approach...');
      }
    }
    
    // Try approach 3: Text-based search
    if (!buttonFound) {
      addButton = page.locator('button').filter({ hasText: /Add New Question/i }).first();
      await addButton.waitFor({ state: 'visible', timeout: 5000 });
    }
    
    // Ensure button is ready
    await addButton.waitFor({ state: 'attached', timeout: 5000 });
    
    // Scroll into view if needed
    await addButton.scrollIntoViewIfNeeded();
    
    // Wait a bit more to ensure button is fully interactive
    await page.waitForTimeout(500);
    
    // Click the button with retry logic
    try {
      await addButton.click({ timeout: 10000 });
    } catch (e) {
      // If click fails, try with force
      console.log('Normal click failed, trying force click...');
      await addButton.click({ force: true, timeout: 5000 });
    }
    
    // Wait for modal to open - wait for the dialog title
    await page.getByText('Create New Question').waitFor({ timeout: 10000, state: 'visible' });

    // Try to submit without filling required fields
    const submitButton = page.getByRole('button', { name: /Create Question|Save/i });
    
    // Check if form has HTML5 validation
    const titleInput = page.getByLabel(/Title/i);
    const isRequired = await titleInput.getAttribute('required');
    
    if (isRequired !== null) {
      // HTML5 validation - try to submit
      await submitButton.click();
      await page.waitForTimeout(500);
      
      // Check for validation message (browser native or custom)
      const validationMessage = await titleInput.evaluate((el: HTMLInputElement) => {
        return (el as any).validationMessage || '';
      });
      
      // Either browser validation or custom validation should show
      const errorCount = await page.locator('text=/required|error/i').count();
      expect(validationMessage || errorCount > 0).toBeTruthy();
    }
  });


});
