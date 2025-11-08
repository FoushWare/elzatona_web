#!/usr/bin/env node

/**
 * Simple test to check if the content management page loads properly
 */

const puppeteer = require('puppeteer');

async function testPageLoading() {
  console.log('🧪 Testing content management page loading...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Listen for console messages
    page.on('console', msg => {
      console.log('📝 Console:', msg.text());
    });

    // Listen for page errors
    page.on('pageerror', error => {
      console.error('❌ Page Error:', error.message);
    });

    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });

    console.log('📄 Navigating to content management page...');
    await page.goto('http://localhost:3000/admin/content-management', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit for the page to load
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(5000);

    // Check if we can find the main container
    const container = await page.$('.container');
    if (container) {
      console.log('✅ Main container found');
    } else {
      console.log('❌ Main container not found');
    }

    // Check for loading spinner
    const loadingSpinner = await page.$('.animate-spin');
    if (loadingSpinner) {
      console.log('⏳ Loading spinner still present');
    } else {
      console.log('✅ Loading spinner gone');
    }

    // Check for stats cards
    const statsCards = await page.$$(
      '.grid.grid-cols-2.md\\:grid-cols-5 .text-2xl.font-bold'
    );
    console.log(`📊 Found ${statsCards.length} stats cards`);

    // Get the actual stats values
    const statsValues = [];
    for (let i = 0; i < statsCards.length; i++) {
      const value = await page.evaluate(el => el.textContent, statsCards[i]);
      statsValues.push(value);
    }
    console.log('📊 Stats values:', statsValues);

    // Check for cards section
    const cardsSection = await page.$('h2:has-text("Learning Cards")');
    if (cardsSection) {
      console.log('✅ Cards section found');
    } else {
      console.log('❌ Cards section not found');
    }

    // Check for plans section
    const plansSection = await page.$('h2:has-text("Learning Plans")');
    if (plansSection) {
      console.log('✅ Plans section found');
    } else {
      console.log('❌ Plans section not found');
    }

    // Take a screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({
      path: 'content-management-test.png',
      fullPage: true,
    });

    console.log(
      '\n✅ Test completed! Screenshot saved as content-management-test.png'
    );
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testPageLoading().catch(console.error);
