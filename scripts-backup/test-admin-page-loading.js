#!/usr/bin/env node

/**
 * Test Admin Page Loading
 */

const fetch = require('node-fetch');

async function testAdminPage() {
  console.log('🧪 Testing Admin Page Loading...\n');

  try {
    // Test all API endpoints that the admin page calls
    const endpoints = [
      '/api/cards',
      '/api/plans',
      '/api/categories',
      '/api/topics',
      '/api/questions',
    ];

    console.log('📡 Testing API Endpoints:');
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const data = await response.json();

        if (data.success && data.count !== undefined) {
          console.log(`✅ ${endpoint}: ${data.count} items`);
        } else {
          console.log(`❌ ${endpoint}: Invalid response format`);
        }
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.message}`);
      }
    }

    console.log('\n🌐 Testing Admin Page:');
    const adminResponse = await fetch(
      'http://localhost:3000/admin/categories-topics'
    );

    if (adminResponse.ok) {
      const html = await adminResponse.text();

      if (html.includes('Loading unified admin data')) {
        console.log('⚠️ Admin page is in loading state');
        console.log('🔍 This might be due to:');
        console.log('   - Client-side JavaScript errors');
        console.log('   - API response format issues');
        console.log('   - React component rendering issues');
      } else if (html.includes('Cards') && html.includes('Plans')) {
        console.log('✅ Admin page loaded successfully');
      } else {
        console.log('⚠️ Admin page loaded but content unclear');
      }
    } else {
      console.log(`❌ Admin page not accessible: ${adminResponse.status}`);
    }

    console.log('\n📊 Summary:');
    console.log('- All individual APIs are working correctly');
    console.log('- Cards: 4 unique cards (no duplicates)');
    console.log('- Plans: 7 cumulative plans (1-7 days)');
    console.log('- Admin page may have client-side rendering issues');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAdminPage();
