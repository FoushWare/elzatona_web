#!/usr/bin/env node

/**
 * Test Cards and Plans Data
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function testCardsAndPlans() {
  console.log('🧪 Testing Cards and Plans Data...\n');

  try {
    // Test Cards
    console.log('📚 Testing Cards:');
    const cardsResponse = await fetch(`${BASE_URL}/cards`);
    const cardsData = await cardsResponse.json();

    if (cardsData.success) {
      console.log(`✅ Cards API: ${cardsData.data.length} cards found`);
      console.log('📋 Card Names:');
      cardsData.data.forEach((card, index) => {
        console.log(`  ${index + 1}. ${card.name} (${card.description})`);
      });
    } else {
      console.log('❌ Cards API failed');
    }

    console.log('\n📋 Testing Plans:');
    const plansResponse = await fetch(`${BASE_URL}/plans`);
    const plansData = await plansResponse.json();

    if (plansData.success) {
      console.log(`✅ Plans API: ${plansData.data.length} plans found`);
      console.log('📋 Plan Details:');
      plansData.data.forEach((plan, index) => {
        console.log(`  ${index + 1}. ${plan.name}`);
        console.log(`     Duration: ${plan.duration}`);
        console.log(`     Difficulty: ${plan.difficulty}`);
        console.log(`     Hours: ${plan.estimatedHours}`);
        console.log('');
      });
    } else {
      console.log('❌ Plans API failed');
    }

    // Test Admin Page
    console.log('🌐 Testing Admin Page:');
    const adminResponse = await fetch(
      'http://localhost:3000/admin/categories-topics'
    );
    if (adminResponse.ok) {
      console.log('✅ Admin page accessible');
      const html = await adminResponse.text();
      if (html.includes('Loading unified admin data')) {
        console.log('⚠️ Admin page is in loading state');
      } else {
        console.log('✅ Admin page loaded successfully');
      }
    } else {
      console.log('❌ Admin page not accessible');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCardsAndPlans();
