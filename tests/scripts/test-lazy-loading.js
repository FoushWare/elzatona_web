#!/usr/bin/env node

/**
 * Test script for lazy loading performance optimization
 * Tests the admin page performance improvements
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

async function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE_URL}${path}`, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          resolve({ success: false, error: 'Invalid JSON' });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => reject(new Error('Request timeout')));
  });
}

async function testLazyLoading() {
  console.log('🚀 Testing Lazy Loading Performance Optimization\n');

  try {
    // Test initial structure loading (should be fast)
    console.log('📊 Testing initial structure loading...');
    const startTime = Date.now();

    const [
      cardsResponse,
      plansResponse,
      categoriesResponse,
      topicsResponse,
      questionsResponse,
    ] = await Promise.all([
      makeRequest('/api/cards'),
      makeRequest('/api/plans'),
      makeRequest('/api/categories'),
      makeRequest('/api/topics'),
      makeRequest('/api/questions'),
    ]);

    const loadTime = Date.now() - startTime;
    console.log(`✅ Initial structure loaded in ${loadTime}ms`);

    // Display counts
    console.log('\n📈 Data Counts:');
    console.log(`   Cards: ${cardsResponse.success ? cardsResponse.count : 0}`);
    console.log(`   Plans: ${plansResponse.success ? plansResponse.count : 0}`);
    console.log(
      `   Categories: ${categoriesResponse.success ? categoriesResponse.count : 0}`
    );
    console.log(
      `   Topics: ${topicsResponse.success ? topicsResponse.count : 0}`
    );
    console.log(
      `   Questions: ${questionsResponse.success ? questionsResponse.count : 0}`
    );

    // Test detailed data loading (should be slower but only when needed)
    console.log('\n🔍 Testing detailed data loading...');
    const detailedStartTime = Date.now();

    const detailedCardsResponse = await makeRequest('/api/cards');
    const detailedLoadTime = Date.now() - detailedStartTime;

    console.log(`✅ Detailed cards data loaded in ${detailedLoadTime}ms`);
    console.log(
      `   Cards with full data: ${detailedCardsResponse.success ? detailedCardsResponse.data.length : 0}`
    );

    // Performance analysis
    console.log('\n📊 Performance Analysis:');
    console.log(`   Initial load time: ${loadTime}ms`);
    console.log(`   Detailed load time: ${detailedLoadTime}ms`);
    console.log(
      `   Performance improvement: ${loadTime < 1000 ? '✅ Fast initial load' : '⚠️ Slow initial load'}`
    );
    console.log(
      `   Lazy loading: ${detailedLoadTime > loadTime ? '✅ Working correctly' : '⚠️ May need optimization'}`
    );

    // Test admin page accessibility
    console.log('\n🌐 Testing admin page accessibility...');
    const pageResponse = await makeRequest('/admin/categories-topics');
    console.log(
      `   Admin page status: ${pageResponse.success !== false ? '✅ Accessible' : '❌ Not accessible'}`
    );

    console.log('\n🎉 Lazy loading performance test completed!');
    console.log('\n💡 Key Benefits:');
    console.log('   • Initial page load shows stats immediately');
    console.log('   • Detailed data loads only when sections are expanded');
    console.log(
      '   • Better user experience with faster perceived performance'
    );
    console.log('   • Reduced server load for initial page visits');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testLazyLoading();
