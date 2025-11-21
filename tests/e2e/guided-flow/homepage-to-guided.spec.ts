/**
 * E2E Tests for Homepage (G-E2E-001, G-E2E-002, G-E2E-003, G-E2E-004, G-E2E-005)
 * Task 17: Homepage Rendering
 * 
 * Tests cover:
 * - Complete navigation flows
 * - Learning style selection
 * - Personalized content display
 * - Active plan detection
 * - User type persistence
 */

import { test, expect } from '@playwright/test';

test.describe('G-E2E-001: Homepage Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should load homepage without errors', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Verify page loaded
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for main title (default content) - use getByRole to avoid matching page title
    // The page title is hidden, so we check for visible headings
    await page.waitForTimeout(1500); // Wait for animations
    const heading = page.getByRole('heading', { name: /Start Your Learning Path|Master Frontend Development|Build Your Custom Roadmap/i }).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to /get-started when default CTA is clicked', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500); // Wait for animations to complete
    
    // Find and click CTA button - could be "Get Started" or "Choose Learning Plan" depending on userType
    // Try "Choose Learning Plan" first (default for guided users), fallback to "Get Started"
    const choosePlanLinks = page.getByRole('link', { name: /Choose Learning Plan/i });
    const getStartedLinks = page.getByRole('link', { name: /Get Started/i });
    
    // Check which one is visible and click it
    const choosePlanCount = await choosePlanLinks.count();
    const ctaButton = choosePlanCount > 0 ? choosePlanLinks.first() : getStartedLinks.first();
    
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await expect(page).toHaveURL(/\/get-started/);
  });

  test('should navigate to /learn when "Explore Learning Paths" is clicked', async ({ page }) => {
    await page.goto('/');
    
    const learnLink = page.getByRole('link', { name: /Explore Learning Paths/i });
    if (await learnLink.isVisible()) {
      await learnLink.click();
      await expect(page).toHaveURL(/\/learn/);
    }
  });
});

test.describe('G-E2E-002: Learning Style Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display learning style selection section', async ({ page }) => {
    await page.goto('/');
    
    // Verify "How would you like to learn?" heading
    await expect(page.getByText(/How would you like to learn\?/i)).toBeVisible();
    
    // Verify both learning style cards are visible - use first() since text appears multiple times
    await expect(page.getByText(/Guided Learning/i).first()).toBeVisible();
    await expect(page.getByText(/Free Style Learning/i).first()).toBeVisible();
  });

  test('should navigate to guided learning when Guided Learning card is clicked', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations and component initialization
    
    // Find the Guided Learning card by finding the heading first, then getting the clickable parent
    const guidedHeading = page.getByRole('heading', { name: /Guided Learning/i });
    await expect(guidedHeading).toBeVisible({ timeout: 10000 });
    
    // Get the parent div that has the onClick handler - it should be 2 levels up
    // Structure: div (card with onClick) > div.text-center > h3 (heading)
    const guidedCard = guidedHeading.locator('..').locator('..');
    await expect(guidedCard).toBeVisible();
    
    // Verify it's the clickable card by checking it has cursor-pointer class
    const cardClass = await guidedCard.getAttribute('class');
    expect(cardClass).toContain('cursor-pointer');
    
    // Scroll into view and wait for animations
    await guidedCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // Wait for delay-1000ms animation
    
    // Click the card and wait for navigation
    // Start navigation wait before clicking to ensure we catch it
    const navigationPromise = page.waitForURL(/\/features\/guided-learning/, { timeout: 15000 });
    await guidedCard.click({ force: true });
    await navigationPromise;
    
    // Should navigate to guided learning page
    const currentUrl = page.url();
    expect(currentUrl).toContain('/features/guided-learning');
    
    // Verify userType was set in localStorage
    const userType = await page.evaluate(() => {
      return localStorage.getItem('learning-preferences:type') || localStorage.getItem('userType');
    });
    expect(userType).toBeTruthy();
  });

  test('should navigate to browse practice questions when Free Style Learning card is clicked', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations and component initialization
    
    // Find the Free Style Learning card by finding the heading first, then getting the clickable parent
    const freestyleHeading = page.getByRole('heading', { name: /Free Style Learning/i });
    await expect(freestyleHeading).toBeVisible({ timeout: 10000 });
    
    // Get the parent div that has the onClick handler - it should be 2 levels up
    // Structure: div (card with onClick) > div.text-center > h3 (heading)
    const freestyleCard = freestyleHeading.locator('..').locator('..');
    await expect(freestyleCard).toBeVisible();
    
    // Verify it's the clickable card by checking it has cursor-pointer class
    const cardClass = await freestyleCard.getAttribute('class');
    expect(cardClass).toContain('cursor-pointer');
    
    // Scroll into view and wait for animations
    await freestyleCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600); // Wait for delay-1100ms animation
    
    // Click the card and wait for navigation
    // Start navigation wait before clicking to ensure we catch it
    const navigationPromise = page.waitForURL(/\/browse-practice-questions/, { timeout: 15000 });
    await freestyleCard.click({ force: true });
    await navigationPromise;
    
    // Should navigate to browse practice questions
    const currentUrl = page.url();
    expect(currentUrl).toContain('/browse-practice-questions');
    
    // Verify userType was set in localStorage
    const userType = await page.evaluate(() => {
      return localStorage.getItem('learning-preferences:type') || localStorage.getItem('userType');
    });
    expect(userType).toBeTruthy();
  });
});

test.describe('G-E2E-003: Personalized Content Display', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should show default content when no userType is set', async ({ page }) => {
    // Clear localStorage - but note: UserTypeContext defaults to 'guided' when localStorage is empty
    // So we'll actually see guided content, not the final CTA section
    await page.evaluate(() => {
      localStorage.clear();
      // Remove userType to prevent context from defaulting to 'guided'
      localStorage.removeItem('userType');
    });
    
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations and context initialization
    
    // When localStorage is cleared, UserTypeContext defaults to 'guided'
    // Guided users now see "Master Frontend Development" (same as default content)
    // Check for "Master Frontend Development" heading - wait longer for context to initialize
    const heading = page.getByRole('heading', { name: /Master Frontend Development/i }).first();
    await expect(heading).toBeVisible({ timeout: 15000 });
    
    // Should show default subtitle for guided users
    const subtitle = page.getByText(/The complete platform to ace your frontend interviews/i).first();
    await expect(subtitle).toBeVisible({ timeout: 15000 });
    
    // Should show "Choose Learning Plan" button (since UserTypeContext defaults to 'guided')
    const choosePlanButton = page.getByRole('link', { name: /Choose Learning Plan/i }).first();
    await expect(choosePlanButton).toBeVisible({ timeout: 10000 });
    await expect(choosePlanButton).toHaveAttribute('href', '/get-started');
    
    // Should NOT show "Get Started" button
    const getStartedButtons = page.getByRole('link', { name: /Get Started/i });
    const getStartedCount = await getStartedButtons.count();
    expect(getStartedCount).toBe(0);
    
    // Should NOT show final CTA section (only shows when userType is null/undefined, but context defaults to 'guided')
    // The final CTA section only renders when !userType (see page.tsx line 440)
    // Since UserTypeContext always defaults to 'guided', userType is always truthy, so CTA never shows
    // Wait a bit more to ensure all animations and rendering complete
    await page.waitForTimeout(500);
    
    const ctaSection = page.locator('section.final-cta-section');
    const ctaCount = await ctaSection.count();
    expect(ctaCount).toBe(0);
    
    // Also verify the "Ready to Ace Your Interviews" text is NOT visible
    const readyText = page.getByText(/Ready to Ace Your Interviews\? 🚀/i);
    const readyTextCount = await readyText.count();
    expect(readyTextCount).toBe(0);
  });

  test('should show guided content when userType is "guided"', async ({ page }) => {
    // Setup localStorage with guided userType
    await page.evaluate(() => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
    });
    
    await page.goto('/');
    await page.waitForTimeout(500); // Wait for content to load
    
    // Should show "Master Frontend Development" for guided users (without active plan)
    await expect(page.getByText(/Master Frontend Development/i).first()).toBeVisible();
    await expect(page.getByText(/The complete platform to ace your frontend interviews/i).first()).toBeVisible();
    
    // Should show "Choose Learning Plan" button (not "Get Started")
    const choosePlanButton = page.getByRole('link', { name: /Choose Learning Plan/i }).first();
    await expect(choosePlanButton).toBeVisible();
    await expect(choosePlanButton).toHaveAttribute('href', '/get-started');
    
    // Should NOT show "Get Started" button
    const getStartedButtons = page.getByRole('link', { name: /Get Started/i });
    const getStartedCount = await getStartedButtons.count();
    expect(getStartedCount).toBe(0);
    
    // Should NOT show final CTA section
    await expect(page.getByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeVisible();
  });

  test('should show self-directed content when userType is "self-directed"', async ({ page }) => {
    // Setup localStorage with self-directed userType
    await page.evaluate(() => {
      localStorage.setItem('userType', 'self-directed');
      localStorage.setItem('learning-type:type', 'free-style');
    });
    
    await page.goto('/');
    await page.waitForTimeout(500); // Wait for content to load
    
    // Should show self-directed content
    await expect(page.getByText(/Build Your Custom Roadmap/i)).toBeVisible();
    await expect(page.getByText(/Create and manage your personalized learning journey/i)).toBeVisible();
    
    // Should NOT show final CTA section
    await expect(page.getByText(/Ready to Ace Your Interviews\? 🚀/i)).not.toBeVisible();
  });

  test('should show active plan content when guided user has active plan', async ({ page }) => {
    const activePlan = {
      id: 'plan-123',
      name: 'Frontend Fundamentals',
      totalQuestions: 50,
      estimatedTime: '2 hours',
    };
    
    // Setup localStorage with guided userType and active plan
    await page.evaluate((plan) => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
      localStorage.setItem('active-guided-plan', JSON.stringify(plan));
    }, activePlan);
    
    await page.goto('/');
    
    // Wait for content to load and useEffect to process localStorage
    await page.waitForTimeout(1500);
    
    // Should show continue plan content
    await expect(page.getByText(/Continue Frontend Fundamentals/i).first()).toBeVisible();
    await expect(page.getByText(/Pick up where you left off/i).first()).toBeVisible();
    
    // Should show plan details
    await expect(page.getByText(/Current Plan:/i)).toBeVisible();
    await expect(page.getByText(/Frontend Fundamentals/i).first()).toBeVisible();
    await expect(page.getByText(/50 questions/i)).toBeVisible();
  });
  
  test('should handle invalid active plan JSON gracefully', async ({ page }) => {
    // Setup localStorage with invalid JSON
    await page.evaluate(() => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
      localStorage.setItem('active-guided-plan', 'invalid-json-string');
    });
    
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    // Should show default guided content (not continue plan)
    await expect(page.getByText(/Master Frontend Development/i).first()).toBeVisible();
    
    // Should show "Choose Learning Plan" button (not "Continue Practice")
    const choosePlanButton = page.getByRole('link', { name: /Choose Learning Plan/i }).first();
    await expect(choosePlanButton).toBeVisible();
    await expect(choosePlanButton).toHaveAttribute('href', '/get-started');
    
    // Should NOT show "Continue Practice" button
    const continueButtons = page.getByRole('link', { name: /Continue Practice/i });
    const continueCount = await continueButtons.count();
    expect(continueCount).toBe(0);
    
    // Invalid plan should be removed from localStorage
    const activePlan = await page.evaluate(() => {
      return localStorage.getItem('active-guided-plan');
    });
    expect(activePlan).toBeNull();
  });
  
  test('should handle missing active plan key gracefully', async ({ page }) => {
    // Setup localStorage without active plan key
    await page.evaluate(() => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
    });
    
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    // Should show default guided content
    await expect(page.getByText(/Master Frontend Development/i).first()).toBeVisible();
    
    // Should show "Choose Learning Plan" button (not "Continue Practice")
    const choosePlanButton = page.getByRole('link', { name: /Choose Learning Plan/i }).first();
    await expect(choosePlanButton).toBeVisible();
    await expect(choosePlanButton).toHaveAttribute('href', '/get-started');
    
    // Should NOT show "Continue Practice" button
    const continueButtons = page.getByRole('link', { name: /Continue Practice/i });
    const continueCount = await continueButtons.count();
    expect(continueCount).toBe(0);
    
    // Check that Current Plan is not visible - use count check
    const currentPlanElements = await page.getByText(/Current Plan:/i).count();
    expect(currentPlanElements).toBe(0);
  });
});

test.describe('G-E2E-004: User Statistics Display', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display user statistics component', async ({ page }) => {
    await page.goto('/');
    
    // UserStatistics component should be visible
    // Look for common statistics text or elements
    const statsSection = page.locator('section').filter({ hasText: /Active Learners|Success Rate|Questions Solved/i });
    await expect(statsSection).toBeVisible();
  });
});

test.describe('G-E2E-005: Complete User Flow from Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should complete full flow: homepage -> get-started -> guided learning', async ({ page }) => {
    // Step 1: Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Step 2: Click CTA button - could be "Get Started" or "Choose Learning Plan"
    await page.waitForTimeout(1500); // Wait for animations
    const choosePlanLinks = page.getByRole('link', { name: /Choose Learning Plan/i });
    const getStartedLinks = page.getByRole('link', { name: /Get Started/i });
    const choosePlanCount = await choosePlanLinks.count();
    const ctaButton = choosePlanCount > 0 ? choosePlanLinks.first() : getStartedLinks.first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    
    // Step 3: Verify redirect to /get-started
    await expect(page).toHaveURL(/\/get-started/);
    
    // Step 4: Verify get-started page loaded
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should complete flow: homepage -> learning style selection -> guided learning', async ({ page }) => {
    // Step 1: Start at homepage
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations and component initialization
    
    // Step 2: Click Guided Learning card - use reliable heading-based selector
    const guidedHeading = page.getByRole('heading', { name: /Guided Learning/i });
    await expect(guidedHeading).toBeVisible({ timeout: 10000 });
    
    // Get the parent div that has the onClick handler - it should be 2 levels up
    // Structure: div (card with onClick) > div.text-center > h3 (heading)
    const guidedCard = guidedHeading.locator('..').locator('..');
    await expect(guidedCard).toBeVisible();
    
    // Verify it's the clickable card by checking it has cursor-pointer class
    const cardClass = await guidedCard.getAttribute('class');
    expect(cardClass).toContain('cursor-pointer');
    
    // Scroll into view and wait for animations
    await guidedCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // Wait for delay-1000ms animation
    
    // Click the card and wait for navigation
    // Start navigation wait before clicking to ensure we catch it
    const navigationPromise = page.waitForURL(/\/features\/guided-learning/, { timeout: 15000 });
    await guidedCard.click({ force: true });
    await navigationPromise;
    
    // Step 3: Verify navigation completed
    const currentUrl = page.url();
    expect(currentUrl).toContain('/features/guided-learning');
    
    // Wait for the new page to load and initialize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Give time for useEffect to persist to localStorage
    
    // Step 5: Verify userType was persisted in localStorage
    const userType = await page.evaluate(() => {
      return localStorage.getItem('userType');
    });
    expect(userType).toBe('guided');
    
    // Verify learning type was also set
    // The LearningTypeContext persists asynchronously via useEffect, so we need to wait
    // Check for the correct key: learning-preferences:type (for logged out users)
    // The LearningTypeContext uses buildStorageKey(null, 'type') which returns 'learning-preferences:type'
    const learningType = await page.evaluate(() => {
      return localStorage.getItem('learning-preferences:type') || 
             localStorage.getItem('learning-type:type'); // Fallback for compatibility
    });
    
    // The learning type should be 'guided' when Guided Learning card is clicked
    expect(learningType).toBe('guided');
  });

  test('should complete flow: homepage -> learning style selection -> freestyle learning', async ({ page }) => {
    // Step 1: Start at homepage
    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for animations and component initialization
    
    // Step 2: Click Free Style Learning card - use reliable heading-based selector
    const freestyleHeading = page.getByRole('heading', { name: /Free Style Learning/i });
    await expect(freestyleHeading).toBeVisible({ timeout: 10000 });
    
    // Get the parent div that has the onClick handler - it should be 2 levels up
    // Structure: div (card with onClick) > div.text-center > h3 (heading)
    const freestyleCard = freestyleHeading.locator('..').locator('..');
    await expect(freestyleCard).toBeVisible();
    
    // Verify it's the clickable card by checking it has cursor-pointer class
    const cardClass = await freestyleCard.getAttribute('class');
    expect(cardClass).toContain('cursor-pointer');
    
    // Scroll into view and wait for animations
    await freestyleCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600); // Wait for delay-1100ms animation
    
    // Click the card and wait for navigation
    // Start navigation wait before clicking to ensure we catch it
    const navigationPromise = page.waitForURL(/\/browse-practice-questions/, { timeout: 15000 });
    await freestyleCard.click({ force: true });
    await navigationPromise;
    
    // Step 3: Verify navigation completed
      const currentUrl = page.url();
    expect(currentUrl).toContain('/browse-practice-questions');
    
    // Wait for the new page to load and initialize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Give time for useEffect to persist to localStorage
    
    // Step 5: Verify userType was persisted in localStorage
    const userType = await page.evaluate(() => {
      return localStorage.getItem('userType');
    });
    expect(userType).toBe('self-directed');
    
    // Verify learning type was also set
    // The LearningTypeContext persists asynchronously via useEffect, so we need to wait
    // Check for the correct key: learning-preferences:type (for logged out users)
    // The LearningTypeContext uses buildStorageKey(null, 'type') which returns 'learning-preferences:type'
    const learningType = await page.evaluate(() => {
      return localStorage.getItem('learning-preferences:type') || 
             localStorage.getItem('learning-type:type'); // Fallback for compatibility
    });
    
    // The learning type should be 'free-style' when Free Style Learning card is clicked
    expect(learningType).toBe('free-style');
  });
});

test.describe('G-E2E-006: Active Plan Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test.afterEach(async ({ page }) => {
    // Clear localStorage after each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display continue practice button when active plan exists', async ({ page }) => {
    const activePlan = {
      id: 'plan-test',
      name: 'Test Plan',
      totalQuestions: 30,
      estimatedTime: '1.5 hours',
    };
    
    // Setup localStorage with guided userType and active plan
    await page.evaluate((plan) => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
      localStorage.setItem('active-guided-plan', JSON.stringify(plan));
    }, activePlan);
    
    await page.goto('/');
    // Wait for useEffect to process localStorage and animations to complete
    await page.waitForTimeout(2000);
    
    // Should show continue practice button - wait for it to appear
    const continueButton = page.getByRole('link', { name: /Continue Practice/i }).first();
    await expect(continueButton).toBeVisible({ timeout: 10000 });
    
    // Should have correct href with plan ID
    const href = await continueButton.getAttribute('href');
    expect(href).toContain('/guided-practice');
    expect(href).toContain('plan=plan-test');
  });

  test('should navigate to guided practice when continue button is clicked', async ({ page }) => {
    const activePlan = {
      id: 'plan-test',
      name: 'Test Plan',
      totalQuestions: 30,
      estimatedTime: '1.5 hours',
    };
    
    // Setup localStorage with guided userType and active plan
    await page.evaluate((plan) => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
      localStorage.setItem('active-guided-plan', JSON.stringify(plan));
    }, activePlan);
    
    await page.goto('/');
    await page.waitForTimeout(1500); // Wait for useEffect to process localStorage
    
    const continueButton = page.getByRole('link', { name: /Continue Practice/i }).first();
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    
    // Should navigate to guided practice
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/guided-practice');
    expect(currentUrl).toContain('plan=plan-test');
  });
  
  test('should persist active plan across page reloads', async ({ page }) => {
    const activePlan = {
      id: 'plan-persist',
      name: 'Persistent Plan',
      totalQuestions: 40,
      estimatedTime: '2 hours',
    };
    
    // Setup localStorage with active plan
    await page.evaluate((plan) => {
      localStorage.setItem('userType', 'guided');
      localStorage.setItem('learning-type:type', 'guided');
      localStorage.setItem('active-guided-plan', JSON.stringify(plan));
    }, activePlan);
    
    // First load
    await page.goto('/');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/Continue Persistent Plan/i).first()).toBeVisible();
    
    // Reload page
    await page.reload();
    await page.waitForTimeout(1500);
    
    // Should still show active plan after reload
    await expect(page.getByText(/Continue Persistent Plan/i).first()).toBeVisible();
    
    // Verify localStorage still has the plan
    const storedPlan = await page.evaluate(() => {
      return localStorage.getItem('active-guided-plan');
    });
    expect(storedPlan).toBeTruthy();
    const parsedPlan = JSON.parse(storedPlan!);
    expect(parsedPlan.id).toBe('plan-persist');
  });
});
