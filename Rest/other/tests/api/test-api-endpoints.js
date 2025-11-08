#!/usr/bin/env node

/**
 * Test API Endpoints
 */

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test cards API
    console.log('🃏 Testing /api/cards...');
    const cardsResponse = await fetch(`${API_BASE}/cards`);
    const cardsData = await cardsResponse.text();
    console.log(`Status: ${cardsResponse.status}`);
    console.log(`Response: ${cardsData}`);
    console.log('');

    // Test categories API
    console.log('📁 Testing /api/categories...');
    const categoriesResponse = await fetch(`${API_BASE}/categories`);
    const categoriesData = await categoriesResponse.text();
    console.log(`Status: ${categoriesResponse.status}`);
    console.log(`Response: ${categoriesData}`);
    console.log('');

    // Test topics API
    console.log('📝 Testing /api/topics...');
    const topicsResponse = await fetch(`${API_BASE}/topics`);
    const topicsData = await topicsResponse.text();
    console.log(`Status: ${topicsResponse.status}`);
    console.log(`Response: ${topicsData}`);
    console.log('');

    // Test questions API
    console.log('❓ Testing /api/questions...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.text();
    console.log(`Status: ${questionsResponse.status}`);
    console.log(`Response: ${questionsData}`);
    console.log('');
  } catch (error) {
    console.log(`❌ API test failed: ${error.message}`);
  }
}

testAPI();
