#!/usr/bin/env node

/**
 * Performance Testing Script for Unified Admin Page
 * Tests Core Web Vitals optimizations and lazy loading
 */

const puppeteer = require('puppeteer');

async function testPerformanceOptimizations() {
  console.log('🚀 Testing Performance Optimizations for Unified Admin Page\n');

  const browser = await puppeteer.launch({
    headless: false, // Set to true for CI/CD
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Enable performance monitoring
    await page.setCacheEnabled(false); // Disable cache for accurate measurements
    await page.setViewport({ width: 1920, height: 1080 });

    // Start performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performanceMetrics = {
        navigationStart: 0,
        domContentLoaded: 0,
        loadComplete: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        apiCalls: [],
        componentLoads: [],
      };

      // Track API calls
      const originalFetch = window.fetch;
      window.fetch = function (...args) {
        const startTime = performance.now();
        window.performanceMetrics.apiCalls.push({
          url: args[0],
          startTime,
        });

        return originalFetch.apply(this, args).then(response => {
          const endTime = performance.now();
          const call = window.performanceMetrics.apiCalls.find(
            c => c.url === args[0] && c.startTime === startTime
          );
          if (call) {
            call.endTime = endTime;
            call.duration = endTime - startTime;
            call.status = response.status;
          }
          return response;
        });
      };

      // Track component loads
      const originalCreateElement = document.createElement;
      document.createElement = function (tagName) {
        const element = originalCreateElement.call(this, tagName);
        if (
          tagName.toLowerCase() === 'div' &&
          element.className.includes('animate-pulse')
        ) {
          window.performanceMetrics.componentLoads.push({
            type: 'loading-skeleton',
            timestamp: performance.now(),
          });
        }
        return element;
      };
    });

    console.log('📊 Testing Initial Page Load Performance...');

    // Navigate to the page and measure performance
    const startTime = Date.now();
    await page.goto('http://localhost:3000/admin/categories-topics', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const navigationTime = Date.now() - startTime;
    console.log(`✅ Page loaded in ${navigationTime}ms`);

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');

      return {
        navigationStart: navigation.startTime,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.startTime,
        loadComplete: navigation.loadEventEnd - navigation.startTime,
        firstPaint:
          paintEntries.find(entry => entry.name === 'first-paint')?.startTime ||
          0,
        firstContentfulPaint:
          paintEntries.find(entry => entry.name === 'first-contentful-paint')
            ?.startTime || 0,
        apiCalls: window.performanceMetrics?.apiCalls || [],
        componentLoads: window.performanceMetrics?.componentLoads || [],
      };
    });

    console.log('\n📈 Performance Metrics:');
    console.log(
      `  DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms`
    );
    console.log(`  Load Complete: ${metrics.loadComplete.toFixed(2)}ms`);
    console.log(`  First Paint: ${metrics.firstPaint.toFixed(2)}ms`);
    console.log(
      `  First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms`
    );

    // Analyze API calls
    console.log('\n🌐 API Call Analysis:');
    const initialApiCalls = metrics.apiCalls.filter(
      call =>
        call.url.includes('/api/cards') ||
        call.url.includes('/api/plans') ||
        call.url.includes('/api/categories') ||
        call.url.includes('/api/topics') ||
        call.url.includes('/api/questions')
    );

    console.log(`  Initial API calls: ${initialApiCalls.length}`);
    initialApiCalls.forEach(call => {
      console.log(
        `    ${call.url}: ${call.duration?.toFixed(2)}ms (${call.status})`
      );
    });

    // Test lazy loading
    console.log('\n🔄 Testing Lazy Loading...');

    // Wait for stats to be visible
    await page
      .waitForSelector('[data-testid="stats-cards"]', { timeout: 5000 })
      .catch(() => {
        console.log(
          '  ⚠️  Stats cards not found, checking for alternative selectors...'
        );
      });

    // Check if "Load Cards Data" button exists (indicating lazy loading)
    const loadCardsButton = await page.$('button:has-text("Load Cards Data")');
    if (loadCardsButton) {
      console.log(
        '  ✅ Lazy loading detected - "Load Cards Data" button found'
      );

      // Click the button and measure loading time
      const loadStartTime = performance.now();
      await loadCardsButton.click();

      // Wait for cards to load
      await page.waitForSelector('.space-y-4', { timeout: 10000 });
      const loadEndTime = performance.now();

      console.log(
        `  ✅ Cards loaded in ${(loadEndTime - loadStartTime).toFixed(2)}ms`
      );
    } else {
      console.log(
        '  ⚠️  Lazy loading not detected - cards may be loaded immediately'
      );
    }

    // Test search performance
    console.log('\n🔍 Testing Search Performance...');
    const searchInput = await page.$('input[placeholder*="Search"]');
    if (searchInput) {
      const searchStartTime = performance.now();
      await searchInput.type('React');

      // Wait for debounced search
      await page.waitForTimeout(500);
      const searchEndTime = performance.now();

      console.log(
        `  ✅ Search completed in ${(searchEndTime - searchStartTime).toFixed(2)}ms`
      );
    }

    // Test Core Web Vitals
    console.log('\n⚡ Testing Core Web Vitals...');

    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    // Measure First Input Delay (FID)
    const fid = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            resolve(entries[0].processingStart - entries[0].startTime);
          }
        }).observe({ entryTypes: ['first-input'] });

        // Trigger a click to measure FID
        setTimeout(() => {
          document.body.click();
        }, 1000);

        // Fallback timeout
        setTimeout(() => resolve(0), 3000);
      });
    });

    // Measure Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });

        // Fallback timeout
        setTimeout(() => resolve(clsValue), 5000);
      });
    });

    console.log(`  Largest Contentful Paint (LCP): ${lcp.toFixed(2)}ms`);
    console.log(`  First Input Delay (FID): ${fid.toFixed(2)}ms`);
    console.log(`  Cumulative Layout Shift (CLS): ${cls.toFixed(4)}`);

    // Performance recommendations
    console.log('\n📋 Performance Recommendations:');

    if (metrics.firstContentfulPaint > 2500) {
      console.log('  ⚠️  FCP is slow (>2.5s). Consider:');
      console.log('    - Further code splitting');
      console.log('    - Preloading critical resources');
      console.log('    - Optimizing images and fonts');
    } else {
      console.log('  ✅ FCP is good (<2.5s)');
    }

    if (lcp > 4000) {
      console.log('  ⚠️  LCP is slow (>4s). Consider:');
      console.log('    - Lazy loading images');
      console.log('    - Optimizing server response times');
      console.log('    - Reducing render-blocking resources');
    } else {
      console.log('  ✅ LCP is good (<4s)');
    }

    if (fid > 300) {
      console.log('  ⚠️  FID is slow (>300ms). Consider:');
      console.log('    - Reducing JavaScript execution time');
      console.log('    - Code splitting and lazy loading');
      console.log('    - Optimizing third-party scripts');
    } else {
      console.log('  ✅ FID is good (<300ms)');
    }

    if (cls > 0.25) {
      console.log('  ⚠️  CLS is high (>0.25). Consider:');
      console.log('    - Setting size attributes on images');
      console.log('    - Avoiding dynamically injected content');
      console.log('    - Using CSS transforms instead of layout properties');
    } else {
      console.log('  ✅ CLS is good (<0.25)');
    }

    // Test bundle size impact
    console.log('\n📦 Bundle Size Analysis:');
    const bundleSize = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const stylesheets = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
      );

      return {
        scripts: scripts.length,
        stylesheets: stylesheets.length,
        totalResources: scripts.length + stylesheets.length,
      };
    });

    console.log(`  Scripts: ${bundleSize.scripts}`);
    console.log(`  Stylesheets: ${bundleSize.stylesheets}`);
    console.log(`  Total Resources: ${bundleSize.totalResources}`);

    if (bundleSize.totalResources > 20) {
      console.log('  ⚠️  High number of resources. Consider:');
      console.log('    - Bundling and minification');
      console.log('    - Resource consolidation');
      console.log('    - CDN optimization');
    } else {
      console.log('  ✅ Resource count is reasonable');
    }

    console.log('\n✅ Performance testing completed!');
  } catch (error) {
    console.error('❌ Error during performance testing:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
if (require.main === module) {
  testPerformanceOptimizations().catch(console.error);
}

module.exports = { testPerformanceOptimizations };
