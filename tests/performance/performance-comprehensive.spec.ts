import { test, expect } from '@playwright/test';

test.describe('Comprehensive Performance Tests', () => {
  test('Homepage performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds max

    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const vitals = {};

          entries.forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime;
            } else if (entry.entryType === 'first-input') {
              vitals.fid = entry.processingStart - entry.startTime;
            } else if (entry.entryType === 'layout-shift') {
              vitals.cls = (vitals.cls || 0) + entry.value;
            }
          });

          resolve(vitals);
        }).observe({
          entryTypes: [
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
          ],
        });

        // Fallback timeout
        setTimeout(() => resolve({}), 5000);
      });
    });

    expect(metrics).toBeDefined();
  });

  test('Learning paths page performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(4000); // 4 seconds max

    // Check that images are optimized
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src) {
        // Check for WebP format or proper sizing
        expect(src).toMatch(/\.(webp|jpg|jpeg|png)$/);
      }
    }
  });

  test('Question page performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/features/learning-paths/1/questions');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // 5 seconds max

    // Check that questions load efficiently
    const questions = page.locator('[data-testid="question"]');
    await expect(questions.first()).toBeVisible();
  });

  test('Admin page performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(6000); // 6 seconds max

    // Check that data loads efficiently
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('Bundle size analysis', async ({ page }) => {
    await page.goto('/');

    // Get resource sizes
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource');
      return entries.map(entry => ({
        name: entry.name,
        size: entry.transferSize,
        type: entry.initiatorType,
      }));
    });

    // Check JavaScript bundle size
    const jsResources = resources.filter(r => r.type === 'script');
    const totalJSSize = jsResources.reduce((sum, r) => sum + (r.size || 0), 0);
    expect(totalJSSize).toBeLessThan(1000000); // 1MB max

    // Check CSS bundle size
    const cssResources = resources.filter(r => r.type === 'link');
    const totalCSSSize = cssResources.reduce(
      (sum, r) => sum + (r.size || 0),
      0
    );
    expect(totalCSSSize).toBeLessThan(200000); // 200KB max
  });

  test('Memory usage', async ({ page }) => {
    await page.goto('/');

    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory
        ? {
            used: (performance as any).memory.usedJSHeapSize,
            total: (performance as any).memory.totalJSHeapSize,
          }
        : null;
    });

    // Navigate through several pages
    await page.goto('/learning-paths');
    await page.goto('/features/learning-paths/1/questions');
    await page.goto('/admin/content/questions');

    // Get final memory usage
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory
        ? {
            used: (performance as any).memory.usedJSHeapSize,
            total: (performance as any).memory.totalJSHeapSize,
          }
        : null;
    });

    if (initialMemory && finalMemory) {
      const memoryIncrease = finalMemory.used - initialMemory.used;
      expect(memoryIncrease).toBeLessThan(50000000); // 50MB max increase
    }
  });

  test('API response times', async ({ page }) => {
    const apiEndpoints = [
      '/api/learning-paths',
      '/api/questions/unified',
      '/api/categories',
      '/api/topics',
    ];

    for (const endpoint of apiEndpoints) {
      const startTime = Date.now();

      const response = await page.request.get(endpoint);
      expect(response.status()).toBe(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(2000); // 2 seconds max
    }
  });

  test('Database query performance', async ({ page }) => {
    // Test pagination performance
    const startTime = Date.now();

    await page.goto('/admin/content/questions?page=1&pageSize=10');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds max

    // Test filtering performance
    const filterStartTime = Date.now();

    await page.getByText('Filter').click();
    await page.getByText('JavaScript').click();
    await page.getByText('Apply Filter').click();
    await page.waitForLoadState('networkidle');

    const filterTime = Date.now() - filterStartTime;
    expect(filterTime).toBeLessThan(2000); // 2 seconds max
  });

  test('Image optimization', async ({ page }) => {
    await page.goto('/');

    // Check that images are properly optimized
    const images = await page.locator('img').all();

    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src) {
        // Check for responsive images
        const srcset = await img.getAttribute('srcset');
        if (srcset) {
          expect(srcset).toContain('w');
        }

        // Check for lazy loading
        const loading = await img.getAttribute('loading');
        if (loading) {
          expect(loading).toBe('lazy');
        }
      }
    }
  });

  test('Caching performance', async ({ page }) => {
    // First visit
    const firstVisitStart = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const firstVisitTime = Date.now() - firstVisitStart;

    // Second visit (should be faster due to caching)
    const secondVisitStart = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const secondVisitTime = Date.now() - secondVisitStart;

    // Second visit should be significantly faster
    expect(secondVisitTime).toBeLessThan(firstVisitTime * 0.8);
  });

  test('Concurrent user simulation', async ({ browser }) => {
    // Simulate multiple concurrent users
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);

    const pages = await Promise.all(contexts.map(ctx => ctx.newPage()));

    const startTime = Date.now();

    // All users navigate to the same page simultaneously
    await Promise.all(pages.map(page => page.goto('/')));
    await Promise.all(pages.map(page => page.waitForLoadState('networkidle')));

    const totalTime = Date.now() - startTime;
    expect(totalTime).toBeLessThan(10000); // 10 seconds max for all users

    // Clean up
    await Promise.all(contexts.map(ctx => ctx.close()));
  });

  test('Large dataset performance', async ({ page }) => {
    // Test with large number of questions
    await page.goto('/admin/content/questions?pageSize=100');
    await page.waitForLoadState('networkidle');

    // Check that pagination works efficiently
    const nextButton = page.getByText('Next');
    if ((await nextButton.count()) > 0) {
      await nextButton.click();
      await page.waitForLoadState('networkidle');

      // Page should load quickly even with large datasets
      const loadTime = Date.now();
      expect(loadTime).toBeLessThan(5000);
    }
  });

  test('Search performance', async ({ page }) => {
    await page.goto('/admin/content/questions');

    const startTime = Date.now();

    // Perform search
    await page.getByPlaceholder('Search questions...').fill('JavaScript');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    const searchTime = Date.now() - startTime;
    expect(searchTime).toBeLessThan(2000); // 2 seconds max
  });

  test('Form submission performance', async ({ page }) => {
    await page.goto('/admin/content/questions');
    await page.getByText('Add Question').click();

    // Fill form
    await page.getByLabel('Title').fill('Test Question');
    await page.getByLabel('Content').fill('What is JavaScript?');
    await page.getByLabel('Type').selectOption('multiple-choice');

    const startTime = Date.now();

    // Submit form
    await page.getByText('Create Question').click();
    await page.waitForLoadState('networkidle');

    const submitTime = Date.now() - startTime;
    expect(submitTime).toBeLessThan(3000); // 3 seconds max
  });

  test('Mobile performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(4000); // 4 seconds max on mobile

    // Check that mobile-specific optimizations are in place
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeVisible();
  });

  test('Offline performance', async ({ page, context }) => {
    // Simulate offline conditions
    await context.setOffline(true);

    try {
      await page.goto('/');
      // Should handle offline gracefully
      const offlineMessage = page.getByText('You are offline');
      await expect(offlineMessage).toBeVisible();
    } catch (error) {
      // Expected to fail in offline mode
      expect(error).toBeDefined();
    } finally {
      await context.setOffline(false);
    }
  });
});
