/**
 * Shared Setup and Utilities for Admin Bulk Question Addition E2E Tests
 * This file contains the beforeEach hook and helper functions used across all test files
 */

// Load test-specific environment variables (runs in worker process)
// Priority: .env.test.local > .env.test > .env.local (fallback)
import { config } from 'dotenv';
import { resolve } from 'path';
import { Page } from '@playwright/test';
import { existsSync } from 'fs';

const projectRoot = process.cwd();

// Load environment files in REVERSE priority order (lowest to highest)
// This ensures higher priority files override lower priority ones
const envFiles = [
  { path: resolve(projectRoot, '.env.local'), priority: 1 },       // Lowest priority - fallback
  { path: resolve(projectRoot, '.env.test'), priority: 2 },         // Medium priority - test defaults
  { path: resolve(projectRoot, '.env.test.local'), priority: 3 },  // Highest priority - test overrides
];

// Load in order (lowest to highest priority) with override: false
// This means later files will override earlier ones if they exist
for (const envFile of envFiles) {
  try {
    if (existsSync(envFile.path)) {
      config({ path: envFile.path, override: false });
      console.log(`[Config] ✅ Loaded: ${envFile.path.split('/').pop()}`);
    }
  } catch (error) {
    // File doesn't exist or can't be read, that's okay
    console.log(`[Config] ⚠️  Could not load: ${envFile.path.split('/').pop()}`);
  }
}

// Now explicitly load .env.test.local with override: true to ensure it takes precedence
// This is a safety measure to ensure test-specific overrides always win
try {
  const testLocalPath = resolve(projectRoot, '.env.test.local');
  if (existsSync(testLocalPath)) {
    config({ path: testLocalPath, override: true });
    console.log(`[Config] ✅ Override loaded: .env.test.local (highest priority)`);
  }
} catch (error) {
  // File doesn't exist, that's okay - tests can use .env.test or .env.local
  console.log(`[Config] ⚠️  .env.test.local not found, using fallback env files`);
}

// Map existing env vars to ADMIN_EMAIL/ADMIN_PASSWORD if they don't exist
// Priority: ADMIN_EMAIL > ADMAIN_EMAIL (typo fallback) > INITIAL_ADMIN_EMAIL > TEST_ADMIN_EMAIL
if (!process.env.ADMIN_EMAIL) {
  process.env.ADMIN_EMAIL = process.env.ADMAIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL || process.env.TEST_ADMIN_EMAIL || '';
}
if (!process.env.ADMIN_PASSWORD) {
  process.env.ADMIN_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD || '';
}

// Trim whitespace from environment variables (important for .env.local files)
if (process.env.ADMIN_EMAIL) {
  process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL.trim();
}
if (process.env.ADMIN_PASSWORD) {
  process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD.trim();
}

// Module-level variables to share state across tests
export const createdQuestionTitles: string[] = [];
export const testPrefix = `E2E-${Date.now()}`;

/**
 * Helper function to create a question
 */
export async function createQuestion(page: Page, title: string): Promise<void> {
  // Wait for page to be ready
  await page.waitForTimeout(1000);
  
  // Wait for the questions page content to be visible
  await page.locator('h1, h2, h3').filter({ hasText: /^Question Management$/i }).waitFor({ state: 'visible', timeout: 10000 });
  
  // Click "Add New Question" button - use a more robust selector
  const addButton = page.getByRole('button', { name: /Add New Question/i }).first();
  
  // Wait for button to be visible and attached
  await addButton.waitFor({ state: 'visible', timeout: 10000 });
  await addButton.waitFor({ state: 'attached', timeout: 5000 });
  
  // Check if button is enabled and wait for it to be enabled if needed
  const isDisabled = await addButton.isDisabled().catch(() => false);
  if (isDisabled) {
    // Wait for button to become enabled by polling
    let attempts = 0;
    while (attempts < 10 && await addButton.isDisabled().catch(() => true)) {
      await page.waitForTimeout(500);
      attempts++;
    }
  }
  
  await addButton.click();

  // Wait for modal to open
  await page.getByText('Create New Question').waitFor({ timeout: 10000, state: 'visible' });
  await page.waitForTimeout(1000);

  // Fill in the form
  const titleInput = page.getByLabel(/Title/i);
  await titleInput.waitFor({ state: 'visible', timeout: 5000 });
  await titleInput.fill(title);

  // Select Category
  const categoryLabel = page.getByText(/Category/i);
  if (await categoryLabel.count() > 0) {
    await page.waitForTimeout(500);
    const categorySelect = page.locator('label').filter({ hasText: /Category/i }).locator('..').locator('button').first();
    if (await categorySelect.count() > 0) {
      await categorySelect.click();
      await page.waitForTimeout(500);
      // Wait for enabled options to appear (filter out disabled ones)
      await page.waitForSelector('[role="option"]:not([data-disabled]):not([aria-disabled="true"])', { timeout: 10000 });
      const categoryOption = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])').first();
      if (await categoryOption.count() > 0) {
        await categoryOption.waitFor({ state: 'visible', timeout: 5000 });
        await categoryOption.click();
        await page.waitForTimeout(500);
      } else {
        console.log('⚠️ No enabled category options found, skipping category selection');
      }
    }
  }

  // Select Type (default is multiple-choice, but ensure it's set)
  const typeLabel = page.getByText(/Type/i);
  if (await typeLabel.count() > 0) {
    await page.waitForTimeout(300);
    const typeSelect = page.locator('label').filter({ hasText: /Type/i }).locator('..').locator('button').first();
    if (await typeSelect.count() > 0) {
      await typeSelect.click();
      await page.waitForTimeout(500);
      // Wait for enabled options to appear
      await page.waitForSelector('[role="option"]:not([data-disabled]):not([aria-disabled="true"])', { timeout: 10000 });
      const multipleChoiceOption = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])').filter({ hasText: /multiple-choice/i }).first();
      if (await multipleChoiceOption.count() > 0) {
        await multipleChoiceOption.waitFor({ state: 'visible', timeout: 5000 });
        await multipleChoiceOption.click();
        await page.waitForTimeout(500);
      } else {
        const firstOption = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])').first();
        if (await firstOption.count() > 0) {
          await firstOption.waitFor({ state: 'visible', timeout: 5000 });
          await firstOption.click();
          await page.waitForTimeout(500);
        }
      }
    }
  }

  // Select Difficulty
  const difficultyLabel = page.getByText(/Difficulty/i);
  if (await difficultyLabel.count() > 0) {
    await page.waitForTimeout(300);
    const difficultySelect = page.locator('label').filter({ hasText: /Difficulty/i }).locator('..').locator('button').first();
    if (await difficultySelect.count() > 0) {
      await difficultySelect.click();
      await page.waitForTimeout(500);
      // Wait for enabled options to appear
      await page.waitForSelector('[role="option"]:not([data-disabled]):not([aria-disabled="true"])', { timeout: 10000 });
      const beginnerOption = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])').filter({ hasText: /beginner/i }).first();
      if (await beginnerOption.count() > 0) {
        await beginnerOption.waitFor({ state: 'visible', timeout: 5000 });
        await beginnerOption.click();
        await page.waitForTimeout(500);
      } else {
        const firstOption = page.locator('[role="option"]:not([data-disabled]):not([aria-disabled="true"])').first();
        if (await firstOption.count() > 0) {
          await firstOption.waitFor({ state: 'visible', timeout: 5000 });
          await firstOption.click();
          await page.waitForTimeout(500);
        }
      }
    }
  }

  // Add an option for multiple-choice
  const addOptionButton = page.getByRole('button', { name: /Add Option/i });
  if (await addOptionButton.count() > 0) {
    await addOptionButton.click();
    await page.waitForTimeout(500);
    await page.waitForSelector('input[placeholder*="Option"], input[placeholder*="option"]', { timeout: 5000 });
    const optionInputs = page.locator('input[placeholder*="Option"], input[placeholder*="option"]');
    if (await optionInputs.count() > 0) {
      await optionInputs.first().fill('Option A');
      await page.waitForTimeout(300);
      const optionContainer = optionInputs.first().locator('..').locator('..');
      const correctCheckbox = optionContainer.locator('input[type="checkbox"]').first();
      if (await correctCheckbox.count() > 0) {
        await correctCheckbox.check();
        await page.waitForTimeout(200);
      }
    }
  }

  // Set up response listener BEFORE clicking submit
  const createResponsePromise = page.waitForResponse(
    response => response.url().includes('/api/questions/unified') && response.request().method() === 'POST',
    { timeout: 20000 }
  ).catch((error) => {
    console.log('⚠️ Create API response timeout or error:', error);
    return null;
  });

  // Submit the form
  const submitButton = page.getByRole('button', { name: /Create Question/i });
  if (await submitButton.count() > 0) {
    await submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await submitButton.click();
    console.log('✅ Clicked Create Question button');
  } else {
    const saveButton = page.getByRole('button', { name: /Save/i });
    await saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await saveButton.click();
    console.log('✅ Clicked Save button');
  }

  // Wait for API response with timeout
  try {
    const createResponse = await createResponsePromise;
    if (createResponse) {
      const responseData = await createResponse.json();
      console.log('✅ Question creation API response received:', responseData.success ? 'Success' : 'Failed');
      if (!responseData.success) {
        console.error('❌ Question creation failed:', responseData);
      }
    }
  } catch (error) {
    console.log('⚠️ Could not get create API response, continuing...');
  }

  // Wait for modal to close - check if modal is still visible
  const modalTitle = page.getByText('Create New Question');
  try {
    // Wait for modal to disappear (with timeout)
    await modalTitle.waitFor({ state: 'hidden', timeout: 10000 });
    console.log('✅ Modal closed');
  } catch (error) {
    console.log('⚠️ Modal did not close automatically, trying to close it...');
    // Try to close modal manually if it's still open
    const closeButton = page.getByRole('button', { name: /Close|Cancel/i });
    if (await closeButton.count() > 0) {
      await closeButton.first().click();
      await page.waitForTimeout(500);
    }
    // Also try pressing Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // Wait for page header to be visible (indicates we're back on the questions page)
  try {
    await page.locator('h1').filter({ hasText: /^Question Management$/i }).waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Back on questions page');
  } catch (error) {
    console.log('⚠️ Page header not found, but continuing...');
    // Fallback: just wait a bit and continue
    await page.waitForTimeout(2000);
  }

  // Wait for any loading states to complete
  const loadingText = page.locator('text=/Loading questions/i');
  await loadingText.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
    console.log('Loading text not found or already hidden');
  });

  await page.waitForTimeout(1000);
  console.log('✅ Question creation helper completed');
}

/**
 * Helper function to bulk delete questions by titles
 */
export async function bulkDeleteQuestions(page: Page, titles: string[]): Promise<void> {
  if (titles.length === 0) return;

  // Clear any search filters first
  const searchInput = page.locator('input[placeholder*="Search questions"]');
  if (await searchInput.count() > 0) {
    await searchInput.clear();
    await page.waitForTimeout(1000);
  }

  // Navigate to page 1 to ensure we can find all questions
  const page1Button = page.getByRole('button').filter({ hasText: /^1$|Page 1/i });
  if (await page1Button.count() > 0 && !(await page1Button.first().isDisabled())) {
    await page1Button.first().click();
    await page.waitForTimeout(2000);
  }

  // Select all questions that match our test prefix
  const selectAllCheckbox = page.locator('input[type="checkbox"]').first();
  if (await selectAllCheckbox.count() > 0) {
    // First, unselect all to start fresh
    const isChecked = await selectAllCheckbox.isChecked();
    if (isChecked) {
      await selectAllCheckbox.click();
      await page.waitForTimeout(500);
    }

    // Select questions one by one that match our test prefix
    let selectedCount = 0;
    for (const title of titles) {
      const questionLocator = page.getByText(title, { exact: false });
      if (await questionLocator.count() > 0) {
        const questionRow = questionLocator.first().locator('..').locator('..');
        const checkbox = questionRow.locator('input[type="checkbox"]').first();
        if (await checkbox.count() > 0) {
          await checkbox.check();
          selectedCount++;
          await page.waitForTimeout(200);
        }
      }
    }

    // If we selected any questions, delete them
    if (selectedCount > 0) {
      const deleteSelectedButton = page.getByRole('button', { name: /Delete Selected/i });
      if (await deleteSelectedButton.count() > 0) {
        await deleteSelectedButton.click();
        await page.waitForTimeout(500);

        // Confirm deletion - wait for dialog first
        const dialog = page.locator('[role="dialog"]');
        await dialog.waitFor({ timeout: 10000, state: 'visible' });
        
        // Verify modal heading
        await page.locator('[role="dialog"]').getByRole('heading', { name: /Delete Selected Questions/i }).waitFor({ timeout: 5000 });
        
        // The button text is "Delete Question" (singular, even for multiple) - use dialog scope
        const confirmDeleteButton = dialog.getByRole('button', { name: /Delete Question/i });
        if (await confirmDeleteButton.count() > 0) {
          await confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
          await confirmDeleteButton.click();
          
          // Wait for API responses
          await page.waitForResponse(
            response => response.url().includes('/api/questions/unified') && response.request().method() === 'DELETE',
            { timeout: 20000 }
          ).catch(() => null);
          
          await page.waitForResponse(
            response => response.url().includes('/api/questions/unified') && response.request().method() === 'GET',
            { timeout: 20000 }
          ).catch(() => null);
          
          // Wait for modal to close - check for dialog to disappear
          await dialog.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
          await page.waitForTimeout(2000);
        }
      }
    }
  }
}

/**
 * Wait for the dev server to be ready before attempting navigation
 * This ensures the server is running before tests try to access it
 */
async function waitForServerReady(page: Page, maxRetries = 10, retryDelay = 1000): Promise<void> {
  const baseURL = 'http://localhost:3000';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Try to fetch the root page to check if server is ready
      const response = await page.request.get(baseURL, { timeout: 2000 });
      if (response.status() < 500) {
        // Server is responding (even if 404, it means server is up)
        console.log(`✅ Server is ready (attempt ${attempt}/${maxRetries})`);
        return;
      }
    } catch (error: any) {
      // Server not ready yet
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting for server to be ready (attempt ${attempt}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        throw new Error(
          `Dev server is not ready after ${maxRetries} attempts. ` +
          `Please ensure the dev server is running at ${baseURL} or check Playwright's webServer configuration. ` +
          `Error: ${error.message}`
        );
      }
    }
  }
}

export async function setupAdminPage(page: Page, browserName: string): Promise<void> {
  // Debug: Log which env files were loaded and what credentials we have
  console.log(`[Config] 🔍 Checking credentials...`);
  const emailStatus = process.env.ADMIN_EMAIL 
    ? `✅ Set (${process.env.ADMIN_EMAIL.substring(0, 10)}...)` 
    : '❌ Not set';
  const passwordLength = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.length : 0;
  const passwordStatus = process.env.ADMIN_PASSWORD 
    ? `✅ Set (${'*'.repeat(Math.min(passwordLength, 10))}...)` 
    : '❌ Not set';
  console.log(`[Config] ADMIN_EMAIL: ${emailStatus}`);
  console.log(`[Config] ADMIN_PASSWORD: ${passwordStatus}`);
  
  // Fail if credentials are not provided
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    const errorMsg = [
      'ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set.',
      '',
      'Expected location: .env.test.local (highest priority)',
      'Fallback locations: .env.test, .env.local',
      '',
      'Current values:',
      `  ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || '(not set)'}`,
      `  ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? '(set)' : '(not set)'}`,
      '',
      'Please ensure .env.test.local exists in the project root with:',
      '  ADMIN_EMAIL=your-test-email@example.com',
      '  ADMIN_PASSWORD=your-test-password',
    ].join('\n');
    throw new Error(errorMsg);
  }
  
  const adminEmail = process.env.ADMIN_EMAIL!.trim();
  const adminPassword = process.env.ADMIN_PASSWORD!.trim();
  
  // Additional validation
  if (!adminEmail || adminEmail.length === 0) {
    throw new Error('ADMIN_EMAIL is set but empty. Please check .env.test.local');
  }
  if (!adminPassword || adminPassword.length === 0) {
    throw new Error('ADMIN_PASSWORD is set but empty. Please check .env.test.local');
  }
  
  // Wait for server to be ready before attempting navigation
  await waitForServerReady(page);
  
  // Check if we're running in Edge browser
  const isEdge = process.env.PLAYWRIGHT_PROJECT === 'msedge' || 
                 (await page.evaluate(() => navigator.userAgent)).includes('Edg/');
  
  // Log browser name for debugging
  console.log(`🌐 Running test in browser: ${browserName}${isEdge ? ' (Edge)' : ''}`);
  
  // Login as admin first
  await page.goto('/admin/login', { 
    waitUntil: isEdge ? 'networkidle' : 'domcontentloaded',
    timeout: isEdge ? 30000 : 20000 
  });
  
  // Wait for login form to be ready - check for heading first
  await page.getByRole('heading', { name: /Admin Login/i }).waitFor({ timeout: 15000 });
  
  // Wait for the form to be fully rendered (not in loading state)
  // The login page shows a loading spinner when isLoading is true
  // Wait for the form inputs to appear, which means loading is complete
  await page.waitForSelector('input[type="email"]', { state: 'visible', timeout: 15000 });
  await page.waitForSelector('input[type="password"]', { state: 'visible', timeout: 15000 });
  
  await page.waitForTimeout(isEdge ? 1000 : 500);
  
  // Fill in login form - use more specific selectors
  const emailInput = page.getByLabel(/Email Address/i);
  const passwordInput = page.getByLabel(/Password/i);
  
  // Wait for inputs to be visible and enabled
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  
  // Additional check: ensure inputs are not disabled
  const emailDisabled = await emailInput.isDisabled().catch(() => true);
  const passwordDisabled = await passwordInput.isDisabled().catch(() => true);
  
  if (emailDisabled || passwordDisabled) {
    throw new Error(`Login form inputs are disabled. Email disabled: ${emailDisabled}, Password disabled: ${passwordDisabled}`);
  }
  
  // Clear inputs first to ensure clean state
  await emailInput.focus();
  await emailInput.clear();
  await passwordInput.focus();
  await passwordInput.clear();
  await page.waitForTimeout(isEdge ? 400 : 200);
  
  // Fill inputs
  await emailInput.fill(adminEmail);
  await page.waitForTimeout(isEdge ? 200 : 100);
  await passwordInput.fill(adminPassword);
  await page.waitForTimeout(isEdge ? 500 : 300);
  
  // Verify inputs are filled
  const emailValue = await emailInput.inputValue();
  const passwordValue = await passwordInput.inputValue();
  console.log('📝 Form filled - Email:', emailValue ? '***' : 'empty', 'Password:', passwordValue ? '***' : 'empty');
  
  // Set up navigation listener BEFORE submitting
  const navigationPromise = page.waitForURL(/.*admin\/(dashboard|content).*/, { timeout: 20000 }).catch((e) => {
    console.log('⚠️ Navigation timeout or page closed:', e.message);
    return null;
  });
  
  // Wait for the specific admin auth API response
  let apiResponse: any = null;
  const responseHandler = (response: any) => {
    const url = response.url();
    if (url.includes('/api/admin/auth') && response.request().method() === 'POST') {
      console.log('✅ Login API response detected:', response.status());
      apiResponse = response;
    }
  };
  page.on('response', responseHandler);
  
  // Also set up a promise-based wait for the response
  const responsePromise = page.waitForResponse(
    response => {
      const url = response.url();
      return url.includes('/api/admin/auth') && response.request().method() === 'POST';
    },
    { timeout: 30000 }
  ).catch(() => {
    return apiResponse;
  });
  
  // Get the form element and submit it directly
  const form = page.locator('form').first();
  await form.waitFor({ state: 'visible', timeout: 5000 });
  
  // Also get the sign in button for fallback
  const signInButton = page.getByRole('button', { name: /Sign In|Login|Log In/i });
  await signInButton.waitFor({ state: 'visible', timeout: 5000 });
  
  // Verify button is not disabled
  const isDisabled = await signInButton.isDisabled();
  if (isDisabled) {
    console.log('⚠️ Sign in button is disabled, waiting for it to be enabled...');
    let enabledAttempts = 0;
    while (enabledAttempts < 10 && await signInButton.isDisabled().catch(() => true)) {
      await page.waitForTimeout(500);
      enabledAttempts++;
    }
  }
  
  // Submit the form
  console.log('📤 Submitting login form...');
  
  // React forms handle submission via onSubmit, so clicking the button is the correct approach
  await signInButton.waitFor({ state: 'visible', timeout: 5000 });
  
  // Check button state one more time
  const buttonTextBefore = await signInButton.textContent();
  const isDisabledBefore = await signInButton.isDisabled();
  console.log('🔘 Button state before click - Text:', buttonTextBefore, 'Disabled:', isDisabledBefore);
  
  if (isDisabledBefore) {
    let enabledAttempts = 0;
    while (enabledAttempts < 20 && await signInButton.isDisabled().catch(() => true)) {
      await page.waitForTimeout(500);
      enabledAttempts++;
    }
    if (await signInButton.isDisabled().catch(() => true)) {
      console.log('⚠️ Button remained disabled, attempting click anyway...');
    }
  }
  
  // Verify inputs are still filled before submitting
  const emailValueBeforeSubmit = await emailInput.inputValue();
  const passwordValueBeforeSubmit = await passwordInput.inputValue();
  console.log('📋 Values before submit - Email:', emailValueBeforeSubmit ? '***' : 'empty', 'Password:', passwordValueBeforeSubmit ? '***' : 'empty');
  
  if (!emailValueBeforeSubmit || !passwordValueBeforeSubmit) {
    throw new Error(`Form values are empty before submission. Email: ${!!emailValueBeforeSubmit}, Password: ${!!passwordValueBeforeSubmit}`);
  }
  
  // Trigger form submit
  let formSubmitted = false;
  try {
    console.log('📤 Attempting form submit via requestSubmit()...');
    
    const emailCheck = await emailInput.inputValue();
    const passwordCheck = await passwordInput.inputValue();
    if (!emailCheck || !passwordCheck) {
      console.log('⚠️ Inputs cleared before submit, refilling...');
      await emailInput.fill(adminEmail);
      await passwordInput.fill(adminPassword);
      await page.waitForTimeout(300);
    }
    
    await form.evaluate((formElement: HTMLFormElement) => {
      formElement.requestSubmit();
    });
    console.log('✅ Form submit event triggered via requestSubmit()');
    formSubmitted = true;
  } catch (e) {
    console.log('⚠️ requestSubmit() failed, trying button click...');
    try {
      if (isEdge) {
        await signInButton.scrollIntoViewIfNeeded();
        await signInButton.focus();
        await page.waitForTimeout(200);
      }
      await signInButton.click({ timeout: 5000 });
      console.log('✅ Sign in button clicked');
      formSubmitted = true;
    } catch (e2) {
      console.log('⚠️ Button click failed, trying Enter key...');
      if (isEdge) {
        await passwordInput.focus();
        await page.waitForTimeout(200);
      }
      await passwordInput.press('Enter');
      console.log('✅ Enter key pressed');
      formSubmitted = true;
    }
  }
  
  if (!formSubmitted) {
    throw new Error('Failed to submit login form - all submission methods failed');
  }
  
  // Wait for API response or navigation (navigation indicates successful login)
  console.log('⏳ Waiting for login API response or navigation...');
  
  let response = apiResponse;
  
  // Wait for either API response or navigation to dashboard
  const waitForResponseOrNavigation = Promise.race([
    responsePromise.catch(() => null),
    navigationPromise.catch(() => null),
    // Also wait a bit to see if navigation happens
    new Promise(resolve => setTimeout(() => resolve('timeout'), 5000))
  ]);
  
  const result = await waitForResponseOrNavigation;
  
  // If we got a response from the promise, use it
  if (!response && result && typeof result !== 'string') {
    response = result;
  }
  
  // Check if navigation happened (indicates successful login even without API response)
  let currentURL: string | null = null;
  if (!page.isClosed()) {
    try {
      currentURL = page.url();
    } catch (e) {
      // Page might be navigating or closed
      currentURL = null;
    }
  }
  const navigatedToDashboard = currentURL && (
    currentURL.includes('/admin/dashboard') || 
    currentURL.includes('/admin/content')
  );
  
  if (navigatedToDashboard && !response) {
    console.log('✅ Navigation to dashboard detected - login likely succeeded (API response not captured)');
    // Continue without response - navigation indicates success
  } else if (!response && !navigatedToDashboard) {
    // Log all network requests for debugging
    if (!page.isClosed()) {
      try {
        const allRequests: string[] = [];
        page.on('request', (request) => {
          const url = request.url();
          if (url.includes('/api/')) {
            allRequests.push(`${request.method()} ${url}`);
          }
        });
        
        // Wait a bit more to capture any delayed requests
        await page.waitForTimeout(2000);
        
        console.log('📡 Network requests detected:', allRequests.length > 0 ? allRequests.join(', ') : 'none');
        
        // Try one final wait for the response
        try {
          response = await page.waitForResponse(
            response => {
              const url = response.url();
              return url.includes('/api/admin/auth') && response.request().method() === 'POST';
            },
            { timeout: 5000 }
          );
          console.log('✅ API response detected on final attempt');
        } catch (e) {
          // Still no response
        }
      } catch (e) {
        // Page might be closed
      }
    }
    
    // Remove listeners
    if (!page.isClosed()) {
      page.off('response', responseHandler);
    }
    
    // If still no response and no navigation, throw error
    if (!response && !navigatedToDashboard) {
      const errorDetails = [
        `Login failed - no API response detected and no navigation occurred.`,
        ``,
        `Possible causes:`,
        `1. Form submission did not trigger API call`,
        `2. Network issue preventing API call`,
        `3. Dev server is not responding or not ready`,
        `4. API endpoint changed or form handler changed`,
        ``,
        `Troubleshooting:`,
        `- Check if dev server is running: npm run dev:light:test`,
        `- Check server logs for errors`,
        `- Verify ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local`,
        `- Check browser console for JavaScript errors`,
        `- Verify the login form is submitting correctly`,
      ].join('\n');
      
      throw new Error(errorDetails);
    }
  }
  
  // Remove listeners
  if (!page.isClosed()) {
    page.off('response', responseHandler);
  }
  
  // If we have navigation but no response, that's okay - continue
  if (navigatedToDashboard && !response) {
    console.log('⚠️ Continuing with navigation-based login verification');
    // Skip API response validation since navigation indicates success
    // We'll verify the URL later in the function
  } else if (response) {
    // API response was received, check if login was successful
    try {
      const responseData = await response.json();
      console.log('📡 Login API response:', JSON.stringify(responseData, null, 2));
      if (!responseData.success) {
        const errorMsg = responseData.error || 'Unknown error';
        if (errorMsg.includes('Invalid email or password')) {
          throw new Error(
            `Login failed: ${errorMsg}\n\n` +
            `Test credentials (${adminEmail}) do not exist in the database.\n` +
            `Check ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local`
          );
        }
        throw new Error(`Login API failed: ${errorMsg}. Check ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local`);
      }
      console.log('✅ Login API call successful, waiting for navigation...');
    } catch (e: any) {
      console.log('⚠️ Error parsing login response:', e.message);
      await page.waitForTimeout(1000);
      const errorBox = page.locator('.bg-red-50, .bg-red-900\\/20');
      const errorBoxCount = await errorBox.count();
      if (errorBoxCount > 0) {
        const errorText = await errorBox.first().textContent();
        throw new Error(`Login failed: ${errorText}. Check ADMIN_EMAIL and ADMIN_PASSWORD in .env.test.local`);
      }
      throw e;
    }
  }
  
  // Now wait for navigation (if not already navigated)
  if (!navigatedToDashboard) {
    try {
      await navigationPromise;
      console.log('✅ Navigation to admin page successful');
    } catch (navError: any) {
      let currentURL = '';
      try {
        if (!page.isClosed()) {
          currentURL = page.url();
          if (currentURL.includes('/admin/dashboard') || currentURL.includes('/admin/content')) {
            console.log('✅ Navigation succeeded (verified by URL check)');
          } else {
            console.log('⚠️ Navigation failed. Current URL:', currentURL);
          }
        }
      } catch (urlError) {
        console.log('⚠️ Could not check URL (page might be navigating)');
      }
      
      if (currentURL && !currentURL.includes('/admin/dashboard') && !currentURL.includes('/admin/content')) {
        if (currentURL.includes('/admin/login')) {
          throw new Error(
            `Login API succeeded but navigation failed - still on login page.\n` +
            `This may indicate:\n` +
            `1. Redirect logic is not working after successful login\n` +
            `2. Client-side navigation is blocked\n` +
            `3. Session/token storage issue`
          );
        }
        throw new Error(`Navigation failed: ${navError.message}`);
      }
    }
  } else {
    console.log('✅ Already navigated to dashboard (skipping navigation wait)');
  }
  
  // Verify we're on an admin page
  let currentURLAfterLogin = '';
  let urlRetryCount = 0;
  const maxUrlRetries = 5;
  
  while (urlRetryCount < maxUrlRetries) {
    if (!page.isClosed()) {
      try {
        currentURLAfterLogin = page.url();
        break;
      } catch (e) {
        urlRetryCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
    } else {
      urlRetryCount++;
      await new Promise(resolve => setTimeout(resolve, 500));
      continue;
    }
  }
  
  if (!currentURLAfterLogin && page.isClosed()) {
    throw new Error('Page was closed after successful login and could not recover.');
  }
  
  if (!currentURLAfterLogin) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!page.isClosed()) {
      try {
        currentURLAfterLogin = page.url();
      } catch (e) {
        // Still can't get URL
      }
    }
  }
  
  console.log('Current URL after login:', currentURLAfterLogin || '(could not determine - page might be navigating)');
  
  // Check if page navigated to an error page
  if (currentURLAfterLogin && (
      currentURLAfterLogin.startsWith('chrome-error://') || 
      currentURLAfterLogin.startsWith('chrome://') ||
      currentURLAfterLogin.includes('error') ||
      currentURLAfterLogin === 'about:blank')) {
    throw new Error(`Page navigated to error page: ${currentURLAfterLogin}. Dev server may have crashed.`);
  }
  
  // Navigate to questions page if not already there
  if (currentURLAfterLogin.includes('/admin/content/questions')) {
    console.log('Already on questions page, skipping dashboard navigation');
  } else {
    if (!currentURLAfterLogin.startsWith('chrome-error://') && 
        !currentURLAfterLogin.startsWith('chrome://') &&
        !currentURLAfterLogin.includes('error')) {
      await page.waitForURL(/.*admin\/(dashboard|content).*/, { timeout: 15000 });
    }
    
    // Navigate to questions page
    if (currentURLAfterLogin.includes('/admin/dashboard')) {
      console.log('Navigating to questions page...');
      try {
        await page.goto('/admin/content/questions', { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch (navError: any) {
        // Check if error is connection refused (server not ready)
        if (navError.message.includes('ERR_CONNECTION_REFUSED') || navError.message.includes('net::ERR_CONNECTION_REFUSED')) {
          throw new Error(
            `Dev server is not running or not ready. ` +
            `Please ensure:\n` +
            `1. The dev server is running at http://localhost:3000\n` +
            `2. Playwright's webServer configuration is working correctly\n` +
            `3. Try running: npm run dev:light:test\n` +
            `Original error: ${navError.message}`
          );
        }
        
        if (!page.isClosed()) {
          const currentURL = page.url();
          if (currentURL.includes('/admin/content/questions')) {
            console.log('✅ Already on questions page (navigation may have succeeded)');
          } else {
            console.log('⚠️ First navigation attempt failed, retrying...');
            await page.goto('/admin/content/questions', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch((retryError: any) => {
              throw new Error(
                `Failed to navigate to questions page after retry. ` +
                `Original error: ${navError.message}. ` +
                `Retry error: ${retryError.message}`
              );
            });
          }
        } else {
          throw new Error(`Page was closed during navigation to questions page: ${navError.message}`);
        }
      }
    }
  }
  
  // Wait for page to be ready
  if (page.isClosed()) {
    throw new Error('Page was closed before waiting for network idle');
  }
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch (e) {
    if (page.isClosed()) {
      throw new Error('Page was closed during network idle wait');
    }
    console.log('Network idle timeout in beforeEach, waiting 2 seconds...');
    try {
      await page.waitForTimeout(2000);
    } catch (timeoutError) {
      if (page.isClosed()) {
        throw new Error('Page was closed during timeout wait');
      }
    }
  }
  
  // Verify we're on the questions page
  let questionsPageURL = '';
  let urlCheckRetries = 0;
  const maxUrlCheckRetries = 5;
  
  while (urlCheckRetries < maxUrlCheckRetries) {
    if (page.isClosed()) {
      throw new Error('Page was closed before verifying questions page URL');
    }
    
    try {
      questionsPageURL = page.url();
      if (questionsPageURL.includes('/admin/content/questions')) {
        break;
      }
    } catch (e) {
      // Page might still be navigating
    }
    
    urlCheckRetries++;
    if (urlCheckRetries < maxUrlCheckRetries) {
      await page.waitForTimeout(500);
    }
  }
  
  console.log('Current URL after navigation:', questionsPageURL || '(could not determine)');
  
  if (questionsPageURL && !questionsPageURL.includes('/admin/content/questions')) {
    throw new Error(`Failed to navigate to questions page. Current URL: ${questionsPageURL}`);
  }
  
  if (!questionsPageURL && !page.isClosed()) {
    await page.waitForTimeout(1000);
    try {
      questionsPageURL = page.url();
      if (questionsPageURL && !questionsPageURL.includes('/admin/content/questions')) {
        throw new Error(`Failed to navigate to questions page. Current URL: ${questionsPageURL}`);
      }
    } catch (e) {
      console.log('⚠️ Could not verify questions page URL, but continuing...');
    }
  }
  
  // Wait for the page content to be visible
  try {
    await page.locator('h1').filter({ hasText: /^Question Management$/i }).waitFor({ state: 'visible', timeout: 15000 });
    console.log('Questions page header found');
  } catch (e) {
    console.log('Page header not found, trying alternative selectors...');
    const searchInput = page.locator('input[placeholder*="Search questions"]');
    const searchCount = await searchInput.count();
    if (searchCount > 0) {
      await searchInput.waitFor({ state: 'visible', timeout: 10000 });
      console.log('Search input found, page is ready');
    } else {
      await page.waitForSelector('body', { timeout: 10000 });
      console.log('Page body found, continuing...');
    }
  }
  
  // Additional wait to ensure all components are loaded
  if (page.isClosed()) {
    throw new Error('Page was closed before completing beforeEach');
  }
  try {
    await page.waitForTimeout(1000);
  } catch (timeoutError) {
    if (page.isClosed()) {
      throw new Error('Page was closed during final wait');
    }
  }
  console.log('beforeEach completed - questions page should be ready');
}

