#!/usr/bin/env node

/**
 * Test script to verify that the content management page loads all data directly
 * without requiring "Load Data" buttons
 */

const puppeteer = require('puppeteer');

async function testDirectLoading() {
  console.log('🧪 Testing direct data loading on content management page...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });

    // Navigate to the content management page
    console.log('📄 Navigating to content management page...');
    await page.goto('http://localhost:3000/admin/content-management', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for the page to load completely
    console.log('⏳ Waiting for page to load...');
    await page.waitForSelector('.container', { timeout: 10000 });

    // Check if loading spinner is gone
    console.log('🔍 Checking for loading spinner...');
    const loadingSpinner = await page.$('.animate-spin');
    if (loadingSpinner) {
      console.log(
        '❌ Loading spinner still present - page may still be loading'
      );
    } else {
      console.log('✅ Loading spinner gone - page loaded');
    }

    // Check for stats cards
    console.log('📊 Checking for stats cards...');
    const statsCards = await page.$$(
      '.grid.grid-cols-2.md\\:grid-cols-5 .text-2xl.font-bold'
    );
    console.log(`Found ${statsCards.length} stats cards`);

    // Get the actual stats values
    const statsValues = [];
    for (let i = 0; i < statsCards.length; i++) {
      const value = await page.evaluate(el => el.textContent, statsCards[i]);
      statsValues.push(value);
    }
    console.log('Stats values:', statsValues);

    // Check for "Load Data" buttons (should not exist)
    console.log('🔍 Checking for "Load Data" buttons...');
    const loadDataButtons = await page.$$('button:has-text("Load")');
    console.log(`Found ${loadDataButtons.length} "Load" buttons`);

    // Check for cards section
    console.log('🎴 Checking for cards section...');
    const cardsSection = await page.$('h2:has-text("Learning Cards")');
    if (cardsSection) {
      console.log('✅ Cards section found');

      // Check if cards are displayed (not just placeholder)
      const cards = await page.$$('.space-y-4 > div');
      console.log(`Found ${cards.length} card elements`);

      if (cards.length > 0) {
        console.log('✅ Cards are displayed directly');
      } else {
        console.log('❌ No cards displayed');
      }
    } else {
      console.log('❌ Cards section not found');
    }

    // Check for plans section
    console.log('📋 Checking for plans section...');
    const plansSection = await page.$('h2:has-text("Learning Plans")');
    if (plansSection) {
      console.log('✅ Plans section found');

      // Check if plans are displayed (not just placeholder)
      const plans = await page.$$('.space-y-4 > div');
      console.log(`Found ${plans.length} plan elements`);

      if (plans.length > 0) {
        console.log('✅ Plans are displayed directly');
      } else {
        console.log('❌ No plans displayed');
      }
    } else {
      console.log('❌ Plans section not found');
    }

    // Check for placeholder messages (should not exist)
    console.log('🔍 Checking for placeholder messages...');
    const placeholderMessages = await page.$$('p:has-text("Click")');
    console.log(`Found ${placeholderMessages.length} placeholder messages`);

    if (placeholderMessages.length === 0) {
      console.log('✅ No placeholder messages found - data loads directly');
    } else {
      console.log('❌ Placeholder messages still present');
    }

    // Take a screenshot for verification
    console.log('📸 Taking screenshot...');
    await page.screenshot({
      path: 'content-management-direct-loading.png',
      fullPage: true,
    });

    console.log(
      '\n✅ Test completed! Screenshot saved as content-management-direct-loading.png'
    );
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testDirectLoading().catch(console.error);
