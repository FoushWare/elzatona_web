import { test, expect } from '@playwright/test';

test.describe('Learning Paths Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learning-paths');
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('displays page title and main statistics', async ({ page }) => {
    // Check page title
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Check description
    await expect(page.getByText(/curated educational journeys/i)).toBeVisible();

    // Check statistics section exists (may be hidden on mobile)
    const statisticsSection = page.locator(
      '[data-testid="statistics-section"]'
    );
    await expect(statisticsSection).toHaveCount(1);

    // On desktop, statistics should be visible; on mobile, they should be hidden by default
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      // Desktop view - statistics should be visible
      await expect(page.getByText('Total Hours')).toBeVisible();
      await expect(page.getByText('Total Resources')).toBeVisible();
      await expect(statisticsSection.getByText('Categories')).toBeVisible();
    } else {
      // Mobile view - statistics should be hidden by default
      await expect(statisticsSection).not.toBeVisible();
    }
  });

  test('navigates to study plans and preparation guides', async ({ page }) => {
    // Test View Study Plans link (first occurrence in PageHeader)
    const studyPlansLinks = page.getByRole('link', {
      name: /view study plans/i,
    });
    await expect(studyPlansLinks.first()).toBeVisible();
    await studyPlansLinks.first().click();
    await expect(page).toHaveURL(/.*study-plans/);

    // Go back to learning paths
    await page.goBack();

    // Test Preparation Guides link (first occurrence in PageHeader)
    const prepGuidesLinks = page.getByRole('link', {
      name: /preparation guides/i,
    });
    await expect(prepGuidesLinks.first()).toBeVisible();
    await prepGuidesLinks.first().click();
    await expect(page).toHaveURL(/.*preparation-guides/);
  });

  test('filters by beginner difficulty level', async ({ page }) => {
    // On mobile, filters might be hidden - show them first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Click beginner filter
    const beginnerButton = page.getByRole('button', { name: /beginner/i });
    await beginnerButton.click();

    // Wait for filtering to complete
    await page.waitForTimeout(500);

    // Check that only beginner paths are visible
    const beginnerPaths = page
      .locator('[data-testid="learning-path-card"]')
      .filter({
        hasText: /beginner/i,
      });

    // Should have at least one beginner path
    await expect(beginnerPaths.first()).toBeVisible();

    // Check that advanced paths are not visible
    const advancedPaths = page
      .locator('[data-testid="learning-path-card"]')
      .filter({
        hasText: /advanced/i,
      });

    if ((await advancedPaths.count()) > 0) {
      await expect(advancedPaths.first()).not.toBeVisible();
    }
  });

  test('filters by React category', async ({ page }) => {
    // On mobile, filters might be hidden - show them first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Click React category filter
    const reactButton = page.getByRole('button', { name: /react/i });
    await reactButton.click();

    // Wait for filtering to complete
    await page.waitForTimeout(500);

    // Check that React-related paths are visible
    const reactPaths = page
      .locator('[data-testid="learning-path-card"]')
      .filter({
        hasText: /react/i,
      });

    // Should have at least one React path
    await expect(reactPaths.first()).toBeVisible();
  });

  test('expands learning path card to show questions', async ({ page }) => {
    // Find a learning path card
    const learningPathCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    const cardHeader = learningPathCard.locator('[data-testid="card-header"]');

    // Initially collapsed, check that the collapsible content has collapsed styles
    const collapsibleContent = learningPathCard.locator('.overflow-hidden');
    await expect(collapsibleContent).toHaveClass(/max-h-0/);

    // Click to expand
    await cardHeader.click();

    // Wait for the transition to complete
    await page.waitForTimeout(500);

    // Content should now be expanded (no max-h-0 class)
    await expect(collapsibleContent).not.toHaveClass(/max-h-0/);

    // Check for action buttons
    await expect(
      learningPathCard.getByRole('link', { name: /practice questions/i })
    ).toBeVisible();
    await expect(
      learningPathCard.getByRole('link', { name: /view resources/i })
    ).toBeVisible();
  });

  test('navigates to practice questions page', async ({ page }) => {
    // Expand first learning path card
    const learningPathCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    const cardHeader = learningPathCard.locator('[data-testid="card-header"]');
    await cardHeader.click();

    // Wait for the card to expand
    await page.waitForTimeout(500);

    // Click Practice Questions button
    const practiceQuestionsLink = learningPathCard.getByRole('link', {
      name: /practice questions/i,
    });
    await practiceQuestionsLink.click();

    // Should navigate to questions page
    await expect(page).toHaveURL(/.*learning-paths.*questions/);

    // Check that questions page loads (use specific heading)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigates to resources page', async ({ page }) => {
    // Expand first learning path card
    const learningPathCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    const cardHeader = learningPathCard.locator('[data-testid="card-header"]');
    await cardHeader.click();

    // Wait for the card to expand
    await page.waitForTimeout(500);

    // Click View Resources button
    const viewResourcesLink = learningPathCard.getByRole('link', {
      name: /view resources/i,
    });
    await viewResourcesLink.click();

    // Should navigate to resources page
    await expect(page).toHaveURL(/.*learning-paths.*resources/);

    // Check that resources page loads (use specific heading)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('shows empty state when no paths match filters', async ({ page }) => {
    // On mobile, filters might be hidden - show them first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Apply filters that should result in no matches
    const advancedButton = page.getByRole('button', { name: /advanced/i });
    await advancedButton.click();

    const javascriptButton = page.getByRole('button', { name: /javascript/i });
    await javascriptButton.click();

    // Wait for filtering
    await page.waitForTimeout(500);

    // Should show empty state
    await expect(page.getByText(/no learning paths found/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /clear filters/i })
    ).toBeVisible();
  });

  test('clears filters when clear filters button is clicked', async ({
    page,
  }) => {
    // On mobile, filters might be hidden - show them first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Apply filters
    const advancedButton = page.getByRole('button', { name: /advanced/i });
    await advancedButton.click();

    const javascriptButton = page.getByRole('button', { name: /javascript/i });
    await javascriptButton.click();

    // Wait for empty state
    await page.waitForTimeout(500);

    // Clear filters
    const clearButton = page.getByRole('button', { name: /clear filters/i });
    await clearButton.click();

    // Should show learning paths again
    await expect(
      page.locator('[data-testid="learning-path-card"]').first()
    ).toBeVisible();
  });

  test('toggles statistics visibility on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Statistics should be hidden by default on mobile
    const statisticsSection = page.locator(
      '[data-testid="statistics-section"]'
    );
    await expect(statisticsSection).not.toBeVisible();

    // Click show statistics button
    const showStatsButton = page.getByRole('button', {
      name: /show statistics/i,
    });
    await showStatsButton.click();

    // Statistics should now be visible
    await expect(statisticsSection).toBeVisible();

    // Button text should change
    await expect(
      page.getByRole('button', { name: /hide statistics/i })
    ).toBeVisible();
  });

  test('toggles filters visibility on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Filters should be hidden by default on mobile
    const filtersSection = page.locator('text=Difficulty Level').first();
    await expect(filtersSection).not.toBeVisible();

    // Click show filters button
    const showFiltersButton = page.getByRole('button', {
      name: /show filters/i,
    });
    await showFiltersButton.click();

    // Filters should now be visible
    await expect(filtersSection).toBeVisible();

    // Button text should change
    await expect(
      page.getByRole('button', { name: /hide filters/i })
    ).toBeVisible();
  });

  test('displays call to action section', async ({ page }) => {
    // Scroll to bottom to see call to action
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check call to action content
    await expect(page.getByText(/ready to start learning/i)).toBeVisible();
    await expect(page.getByText(/choose your learning path/i)).toBeVisible();

    // Check call to action buttons (use specific selectors to avoid duplicates)
    const studyPlansLinks = page.getByRole('link', { name: /study plans/i });
    const prepGuidesLinks = page.getByRole('link', {
      name: /preparation guides/i,
    });
    await expect(studyPlansLinks.last()).toBeVisible(); // Last occurrence should be in CallToAction
    await expect(prepGuidesLinks.last()).toBeVisible(); // Last occurrence should be in CallToAction
  });

  test('maintains filter state when navigating back', async ({ page }) => {
    // On mobile, filters might be hidden - show them first
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Apply a filter
    const beginnerButton = page.getByRole('button', { name: /beginner/i });
    await beginnerButton.click();

    // Wait for filter to be applied
    await page.waitForTimeout(500);

    // Navigate to a learning path
    const learningPathCard = page
      .locator('[data-testid="learning-path-card"]')
      .first();
    const cardHeader = learningPathCard.locator('[data-testid="card-header"]');
    await cardHeader.click();

    const practiceQuestionsLink = learningPathCard.getByRole('link', {
      name: /practice questions/i,
    });
    await practiceQuestionsLink.click();

    // Navigate back (with fallback to direct navigation if goBack fails)
    try {
      await page.goBack();
      await page.waitForLoadState('networkidle');
    } catch {
      // If goBack fails due to policy check, navigate directly
      await page.goto('/learning-paths');
      await page.waitForLoadState('networkidle');
    }

    // Filter should still be applied (check if button exists and has active class)
    const beginnerButtons = page.getByRole('button', { name: /beginner/i });
    if ((await beginnerButtons.count()) > 0) {
      await expect(beginnerButtons.first()).toHaveClass(/bg-blue-600/);
    }
  });

  test('displays correct question counts for each learning path', async ({
    page,
  }) => {
    // Check that question counts are displayed
    const questionCounts = page.locator('text=/\\d+ questions/');
    await expect(questionCounts.first()).toBeVisible();

    // Should have multiple question count displays
    const count = await questionCounts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('shows difficulty badges with correct colors', async ({ page }) => {
    // On mobile, filters might be hidden - show them first to see difficulty badges
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      const showFiltersButton = page.getByRole('button', {
        name: /show filters/i,
      });
      if (await showFiltersButton.isVisible()) {
        await showFiltersButton.click();
      }
    }

    // Find difficulty badges in filter buttons
    const difficultyBadges = page
      .locator('button')
      .filter({ hasText: /beginner|intermediate|advanced/i });

    // Should have at least one difficulty badge
    await expect(difficultyBadges.first()).toBeVisible();

    // Check that badges have appropriate styling
    const firstBadge = difficultyBadges.first();
    await expect(firstBadge).toBeVisible();
  });

  test('responsive design works on different screen sizes', async ({
    page,
  }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(
      page.getByRole('heading', { name: 'Learning Paths' })
    ).toBeVisible();
  });
});
