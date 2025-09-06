import { test, expect } from '@playwright/test';

test.describe('Dashboard Flow E2E Tests', () => {
  test.describe('Unauthenticated User Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to dashboard without authentication
      await page.goto('/dashboard');
    });

    test('should render welcome page for unauthenticated users', async ({
      page,
    }) => {
      // Check main heading
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();

      // Check description
      await expect(
        page.getByText(
          /Your comprehensive platform for mastering frontend development/
        )
      ).toBeVisible();

      // Check CTA buttons
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeVisible();
    });

    test('should display feature cards', async ({ page }) => {
      // Check feature cards
      await expect(page.getByText('Practice Questions')).toBeVisible();
      await expect(page.getByText('Learning Paths')).toBeVisible();
      await expect(page.getByText('Gamified Progress')).toBeVisible();

      // Check feature descriptions
      await expect(
        page.getByText(
          /Access 500\+ carefully curated frontend interview questions/
        )
      ).toBeVisible();
      await expect(
        page.getByText(
          /Follow structured learning paths designed by industry experts/
        )
      ).toBeVisible();
      await expect(
        page.getByText(/Earn badges, track streaks, and compete with others/)
      ).toBeVisible();
    });

    test('should toggle statistics visibility', async ({ page }) => {
      // Initially statistics should be hidden
      await expect(page.getByText('500+')).not.toBeVisible();

      // Click to show statistics
      await page.getByRole('button', { name: /show statistics/i }).click();

      // Statistics should be visible
      await expect(page.getByText('500+')).toBeVisible();
      await expect(page.getByText('25+')).toBeVisible();
      await expect(page.getByText('100+')).toBeVisible();
      await expect(page.getByText('24/7')).toBeVisible();

      // Check statistics labels
      await expect(page.getByText('Practice Questions')).toBeVisible();
      await expect(page.getByText('Learning Paths')).toBeVisible();
      await expect(page.getByText('Coding Challenges')).toBeVisible();
      await expect(page.getByText('AI Support')).toBeVisible();

      // Click to hide statistics
      await page.getByRole('button', { name: /hide statistics/i }).click();

      // Statistics should be hidden again
      await expect(page.getByText('500+')).not.toBeVisible();
    });

    test('should navigate to auth page from sign in button', async ({
      page,
    }) => {
      await page
        .getByRole('link', { name: /sign in & start learning/i })
        .click();

      // Should navigate to auth page
      await expect(page).toHaveURL('/auth');
      await expect(page.getByText('Welcome Back!')).toBeVisible();
    });

    test('should navigate to learning paths from start learning button', async ({
      page,
    }) => {
      await page.getByRole('link', { name: /start learning/i }).click();

      // Should navigate to learning paths page
      await expect(page).toHaveURL('/learning-paths');
    });
  });

  test.describe('Authenticated User Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authenticated state
      await page.addInitScript(() => {
        // Mock Firebase Auth state
        window.localStorage.setItem(
          'firebase:authUser',
          JSON.stringify({
            uid: 'test-uid',
            email: 'test@example.com',
            displayName: 'Test User',
          })
        );
      });

      // Navigate to dashboard
      await page.goto('/dashboard');
    });

    test('should render enhanced dashboard for authenticated users', async ({
      page,
    }) => {
      // Should show enhanced dashboard instead of welcome page
      await expect(
        page.getByText('Welcome to Frontend KodDev')
      ).not.toBeVisible();

      // Should show enhanced dashboard content
      await expect(page.getByTestId('enhanced-dashboard')).toBeVisible();
    });

    test('should display user progress data', async ({ page }) => {
      // Mock user progress data
      await page.addInitScript(() => {
        // Mock user progress
        window.localStorage.setItem(
          'userProgress',
          JSON.stringify({
            questionsCompleted: 24,
            challengesCompleted: 12,
            totalScore: 850,
            streak: 7,
            badges: ['Quick Learner', 'Problem Solver'],
            achievements: ['First Question', 'Week Streak'],
          })
        );
      });

      await page.reload();

      // Check progress display
      await expect(page.getByText('24')).toBeVisible(); // questionsCompleted
      await expect(page.getByText('12')).toBeVisible(); // challengesCompleted
      await expect(page.getByText('850')).toBeVisible(); // totalScore
      await expect(page.getByText('7')).toBeVisible(); // streak
    });

    test('should display quick action cards', async ({ page }) => {
      // Check quick action cards
      await expect(page.getByText('Quick Actions')).toBeVisible();
      await expect(page.getByText('Practice Questions')).toBeVisible();
      await expect(page.getByText('Learning Paths')).toBeVisible();
      await expect(page.getByText('Coding Challenges')).toBeVisible();
      await expect(page.getByText('Progress Analytics')).toBeVisible();
    });

    test('should navigate to quick action links', async ({ page }) => {
      // Test navigation to practice questions
      await page.getByRole('link', { name: /practice questions/i }).click();
      await expect(page).toHaveURL('/practice/fundamentals');

      // Go back to dashboard
      await page.goto('/dashboard');

      // Test navigation to learning paths
      await page.getByRole('link', { name: /learning paths/i }).click();
      await expect(page).toHaveURL('/learning-paths');

      // Go back to dashboard
      await page.goto('/dashboard');

      // Test navigation to coding challenges
      await page.getByRole('link', { name: /coding challenges/i }).click();
      await expect(page).toHaveURL('/coding');

      // Go back to dashboard
      await page.goto('/dashboard');

      // Test navigation to progress analytics
      await page.getByRole('link', { name: /progress analytics/i }).click();
      await expect(page).toHaveURL('/progress');
    });

    test('should display recent activities', async ({ page }) => {
      // Check recent activities section
      await expect(page.getByText('Recent Activities')).toBeVisible();

      // Check activity items
      await expect(page.getByText('Completed CSS Grid question')).toBeVisible();
      await expect(page.getByText('2 hours ago')).toBeVisible();
      await expect(page.getByText('+10')).toBeVisible();

      await expect(
        page.getByText('Solved React Hooks challenge')
      ).toBeVisible();
      await expect(page.getByText('1 day ago')).toBeVisible();
      await expect(page.getByText('+25')).toBeVisible();
    });

    test('should display recommendations', async ({ page }) => {
      // Check recommendations section
      await expect(page.getByText('Recommended for You')).toBeVisible();

      // Check recommendation items
      await expect(page.getByText('React Hooks Deep Dive')).toBeVisible();
      await expect(
        page.getByText('Master useState, useEffect, and custom hooks')
      ).toBeVisible();
      await expect(page.getByText('Intermediate')).toBeVisible();
      await expect(page.getByText('2-3 hours')).toBeVisible();

      await expect(page.getByText('CSS Grid Mastery')).toBeVisible();
      await expect(
        page.getByText('Learn advanced CSS Grid layouts and techniques')
      ).toBeVisible();
      await expect(page.getByText('Advanced')).toBeVisible();
      await expect(page.getByText('3-4 hours')).toBeVisible();
    });

    test('should navigate to recommendation links', async ({ page }) => {
      // Test navigation to React Hooks recommendation
      await page.getByRole('link', { name: /react hooks deep dive/i }).click();
      await expect(page).toHaveURL('/learning-paths/react-hooks');

      // Go back to dashboard
      await page.goto('/dashboard');

      // Test navigation to CSS Grid recommendation
      await page.getByRole('link', { name: /css grid mastery/i }).click();
      await expect(page).toHaveURL('/learning-paths/css-grid');
    });

    test('should handle sign out', async ({ page }) => {
      // Click sign out button
      await page.getByRole('button', { name: /sign out/i }).click();

      // Should redirect to home page or show unauthenticated state
      // This depends on the implementation
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Loading States', () => {
    test('should show loading state while checking authentication', async ({
      page,
    }) => {
      // Mock slow authentication check
      await page.route('**/auth/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.continue();
      });

      await page.goto('/dashboard');

      // Should show loading state
      await expect(page.getByText('Loading dashboard...')).toBeVisible();
    });

    test('should show loading state while fetching progress data', async ({
      page,
    }) => {
      // Mock authenticated state
      await page.addInitScript(() => {
        window.localStorage.setItem(
          'firebase:authUser',
          JSON.stringify({
            uid: 'test-uid',
            email: 'test@example.com',
            displayName: 'Test User',
          })
        );
      });

      // Mock slow progress data fetch
      await page.route('**/progress/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.continue();
      });

      await page.goto('/dashboard');

      // Should show loading state
      await expect(page.getByText('Loading your progress...')).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle progress loading errors', async ({ page }) => {
      // Mock authenticated state
      await page.addInitScript(() => {
        window.localStorage.setItem(
          'firebase:authUser',
          JSON.stringify({
            uid: 'test-uid',
            email: 'test@example.com',
            displayName: 'Test User',
          })
        );
      });

      // Mock progress data fetch failure
      await page.route('**/progress/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to load progress data' }),
        });
      });

      await page.goto('/dashboard');

      // Should show error message
      await expect(
        page.getByText('Failed to load progress data')
      ).toBeVisible();
      await expect(page.getByRole('button', { name: /retry/i })).toBeVisible();
    });

    test('should retry progress loading on error', async ({ page }) => {
      // Mock authenticated state
      await page.addInitScript(() => {
        window.localStorage.setItem(
          'firebase:authUser',
          JSON.stringify({
            uid: 'test-uid',
            email: 'test@example.com',
            displayName: 'Test User',
          })
        );
      });

      let retryCount = 0;
      await page.route('**/progress/**', route => {
        retryCount++;
        if (retryCount === 1) {
          // First request fails
          route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Failed to load progress data' }),
          });
        } else {
          // Retry succeeds
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              questionsCompleted: 24,
              challengesCompleted: 12,
              totalScore: 850,
              streak: 7,
            }),
          });
        }
      });

      await page.goto('/dashboard');

      // Should show error message
      await expect(
        page.getByText('Failed to load progress data')
      ).toBeVisible();

      // Click retry button
      await page.getByRole('button', { name: /retry/i }).click();

      // Should load progress data successfully
      await expect(page.getByText('24')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should render correctly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/dashboard');

      // Check that main elements are still visible
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeVisible();
    });

    test('should render correctly on tablet devices', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      await page.goto('/dashboard');

      // Check that main elements are still visible
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeVisible();
    });

    test('should render correctly on desktop devices', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      await page.goto('/dashboard');

      // Check that main elements are still visible
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/dashboard');

      // Check main heading
      const mainHeading = page.getByRole('heading', { level: 1 });
      await expect(mainHeading).toHaveText('Welcome to Frontend KodDev');

      // Check section headings
      const sectionHeadings = page.getByRole('heading', { level: 3 });
      await expect(sectionHeadings.first()).toBeVisible();
    });

    test('should have proper button and link roles', async ({ page }) => {
      await page.goto('/dashboard');

      // Check that all interactive elements have proper roles
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /show statistics/i })
      ).toBeVisible();
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/dashboard');

      // Test tab navigation
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: /sign in & start learning/i })
      ).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('link', { name: /start learning/i })
      ).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: /show statistics/i })
      ).toBeFocused();
    });

    test('should have proper alt text for images', async ({ page }) => {
      await page.goto('/dashboard');

      // Check that images have proper alt text
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
  });

  test.describe('Performance', () => {
    test('should load dashboard within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/dashboard');

      // Wait for main content to load
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();

      const loadTime = Date.now() - startTime;

      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle rapid navigation gracefully', async ({ page }) => {
      await page.goto('/dashboard');

      // Rapidly navigate between pages
      await page.getByRole('link', { name: /start learning/i }).click();
      await page.goBack();
      await page
        .getByRole('link', { name: /sign in & start learning/i })
        .click();
      await page.goBack();

      // Should still be functional
      await expect(page.getByText('Welcome to Frontend KodDev')).toBeVisible();
    });
  });
});
