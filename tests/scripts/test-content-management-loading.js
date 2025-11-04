const puppeteer = require('puppeteer');

async function testContentManagementLoading() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  try {
    const page = await browser.newPage();

    // Enable console logging
    page.on('console', msg => {
      console.log('PAGE LOG:', msg.text());
    });

    console.log('Navigating to content management page...');
    await page.goto('http://localhost:3000/admin/content-management', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for the page to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check if loading spinner is gone
    const loadingSpinner = await page.$('[data-testid="loading-spinner"]');
    if (loadingSpinner) {
      console.log('❌ Loading spinner still present');
    } else {
      console.log('✅ Loading spinner gone');
    }

    // Check for cards section
    const cardsSection = await page.$('h2:has-text("Learning Cards")');
    if (cardsSection) {
      console.log('✅ Cards section found');

      // Check if cards are displayed
      const cards = await page.$$('[data-testid="card-item"]');
      console.log(`Found ${cards.length} cards`);

      if (cards.length > 0) {
        console.log('✅ Cards are displayed');
      } else {
        console.log('❌ No cards displayed');
      }
    } else {
      console.log('❌ Cards section not found');
    }

    // Check for plans section
    const plansSection = await page.$('h2:has-text("Learning Plans")');
    if (plansSection) {
      console.log('✅ Plans section found');

      // Check if plans are displayed
      const plans = await page.$$('[data-testid="plan-item"]');
      console.log(`Found ${plans.length} plans`);

      if (plans.length > 0) {
        console.log('✅ Plans are displayed');
      } else {
        console.log('❌ No plans displayed');
      }
    } else {
      console.log('❌ Plans section not found');
    }

    // Check stats cards
    const statsCards = await page.$$('[data-testid="stats-card"]');
    console.log(`Found ${statsCards.length} stats cards`);

    if (statsCards.length > 0) {
      console.log('✅ Stats cards are displayed');
    } else {
      console.log('❌ No stats cards displayed');
    }

    // Take a screenshot
    await page.screenshot({
      path: 'content-management-test.png',
      fullPage: true,
    });
    console.log('Screenshot saved as content-management-test.png');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testContentManagementLoading().catch(console.error);
