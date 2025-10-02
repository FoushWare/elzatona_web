import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load home page within performance budget', async ({ page }) => {
    // Start performance measurement
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstContentfulPaint:
          performance.getEntriesByName('first-contentful-paint')[0]
            ?.startTime || 0,
        largestContentfulPaint:
          performance.getEntriesByName('largest-contentful-paint')[0]
            ?.startTime || 0,
        cumulativeLayoutShift: performance
          .getEntriesByName('layout-shift')
          .reduce((sum, entry) => sum + (entry as any).value, 0),
        firstInputDelay:
          performance.getEntriesByName('first-input')[0]?.processingStart -
            performance.getEntriesByName('first-input')[0]?.startTime || 0,
      };
    });

    // Performance assertions
    expect(performanceMetrics.loadTime).toBeLessThan(3000); // 3 seconds
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1500); // 1.5 seconds
    expect(performanceMetrics.largestContentfulPaint).toBeLessThan(2500); // 2.5 seconds
    expect(performanceMetrics.cumulativeLayoutShift).toBeLessThan(0.1); // Good CLS score
  });

  test('should load learning paths page efficiently', async ({ page }) => {
    await page.goto('/learning-paths');
    await page.waitForLoadState('networkidle');

    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstContentfulPaint:
          performance.getEntriesByName('first-contentful-paint')[0]
            ?.startTime || 0,
      };
    });

    expect(performanceMetrics.loadTime).toBeLessThan(4000); // 4 seconds
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2500); // 2.5 seconds
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2000); // 2 seconds
  });

  test('should handle large question datasets efficiently', async ({
    page,
  }) => {
    // Mock large dataset
    await page.route('**/api/questions/unified**', route => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `question-${i}`,
        title: `Question ${i}`,
        content: `Content for question ${i}`,
        type: 'single',
        options: ['A', 'B', 'C', 'D'],
        correctAnswers: ['A'],
        explanation: `Explanation for question ${i}`,
        category: 'Test',
        difficulty: 'easy',
        learningPath: 'test-basics',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: largeDataset,
          pagination: {
            page: 1,
            pageSize: 10,
            totalCount: 1000,
            totalPages: 100,
            hasNext: true,
            hasPrev: false,
          },
        }),
      });
    });

    const startTime = Date.now();
    await page.goto('/admin/content/questions');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();

    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(5000); // 5 seconds for large dataset
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const vitals: any = {};

          entries.forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime;
            } else if (entry.entryType === 'first-input') {
              vitals.fid = entry.processingStart - entry.startTime;
            } else if (entry.entryType === 'layout-shift') {
              vitals.cls = (entry as any).value;
            }
          });

          resolve(vitals);
        });

        observer.observe({
          entryTypes: [
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
          ],
        });

        // Resolve after 5 seconds
        setTimeout(() => resolve({}), 5000);
      });
    });

    // Core Web Vitals thresholds
    expect((vitals as any).lcp).toBeLessThan(2500); // Good LCP
    expect((vitals as any).fid).toBeLessThan(100); // Good FID
    expect((vitals as any).cls).toBeLessThan(0.1); // Good CLS
  });

  test('should handle concurrent API requests efficiently', async ({
    page,
  }) => {
    const startTime = Date.now();

    // Make multiple concurrent requests
    const promises = [
      page.goto('/learning-paths'),
      page.goto('/admin/content/questions'),
      page.goto('/features/practice'),
    ];

    await Promise.all(promises);
    const endTime = Date.now();

    const totalTime = endTime - startTime;
    expect(totalTime).toBeLessThan(10000); // 10 seconds for all pages
  });

  test('should have optimized bundle size', async ({ page }) => {
    await page.goto('/');

    // Get resource sizes
    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter((r: any) => r.name.includes('.js'));
      const cssResources = resources.filter((r: any) =>
        r.name.includes('.css')
      );

      return {
        totalJSSize: jsResources.reduce(
          (sum, r: any) => sum + r.transferSize,
          0
        ),
        totalCSSSize: cssResources.reduce(
          (sum, r: any) => sum + r.transferSize,
          0
        ),
        jsCount: jsResources.length,
        cssCount: cssResources.length,
      };
    });

    // Bundle size assertions
    expect(resourceSizes.totalJSSize).toBeLessThan(1000000); // 1MB
    expect(resourceSizes.totalCSSSize).toBeLessThan(200000); // 200KB
    expect(resourceSizes.jsCount).toBeLessThan(20); // Reasonable number of JS files
  });

  test('should handle memory efficiently', async ({ page }) => {
    await page.goto('/admin/content/questions');

    // Get memory usage
    const memoryUsage = await page.evaluate(() => {
      return (performance as any).memory
        ? {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
          }
        : null;
    });

    if (memoryUsage) {
      const memoryUsagePercent =
        (memoryUsage.usedJSHeapSize / memoryUsage.jsHeapSizeLimit) * 100;
      expect(memoryUsagePercent).toBeLessThan(50); // Less than 50% of heap limit
    }
  });

  test('should have fast search performance', async ({ page }) => {
    await page.goto('/admin/content/questions');

    const startTime = Date.now();

    // Perform search
    await page.fill('input[placeholder="Search questions..."]', 'React');
    await page.click('button:has-text("Search")');

    await page.waitForSelector('[data-testid="questions-table"]');
    const endTime = Date.now();

    const searchTime = endTime - startTime;
    expect(searchTime).toBeLessThan(2000); // 2 seconds for search
  });

  test('should handle pagination efficiently', async ({ page }) => {
    await page.goto('/admin/content/questions');

    const startTime = Date.now();

    // Navigate through pages
    await page.click('button:has-text("Next")');
    await page.waitForSelector('[data-testid="questions-table"]');

    await page.click('button:has-text("Previous")');
    await page.waitForSelector('[data-testid="questions-table"]');

    const endTime = Date.now();

    const paginationTime = endTime - startTime;
    expect(paginationTime).toBeLessThan(3000); // 3 seconds for pagination
  });

  test('should have efficient image loading', async ({ page }) => {
    await page.goto('/');

    // Check image loading performance
    const imageMetrics = await page.evaluate(() => {
      const images = performance
        .getEntriesByType('resource')
        .filter(
          (r: any) =>
            r.name.includes('.jpg') ||
            r.name.includes('.png') ||
            r.name.includes('.webp')
        );

      return {
        imageCount: images.length,
        averageLoadTime:
          images.reduce((sum, r: any) => sum + r.duration, 0) / images.length,
        totalImageSize: images.reduce((sum, r: any) => sum + r.transferSize, 0),
      };
    });

    expect(imageMetrics.averageLoadTime).toBeLessThan(1000); // 1 second average
    expect(imageMetrics.totalImageSize).toBeLessThan(500000); // 500KB total
  });
});
