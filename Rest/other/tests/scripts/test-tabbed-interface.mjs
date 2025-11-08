#!/usr/bin/env node

/**
 * Test script for Topics & Categories Tabbed Interface
 * Tests the new tabbed UI at /admin/categories-topics
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testTabbedInterface() {
  console.log('🧪 Testing Topics & Categories Tabbed Interface');
  console.log('================================================\n');

  try {
    // Test 1: Check if the page loads
    console.log('📡 **Test 1: Page Accessibility**');
    const response = await fetch(`${BASE_URL}/admin/categories-topics`);

    if (response.ok) {
      console.log('✅ Admin page: ACCESSIBLE');
      console.log(`   Status: ${response.status}`);

      const html = await response.text();

      // Check for tab elements
      if (html.includes('TabsList') || html.includes('TabsTrigger')) {
        console.log('✅ Tabbed interface: DETECTED');
        console.log('   Found TabsList/TabsTrigger components');
      } else {
        console.log('⚠️  Tabbed interface: NOT DETECTED');
        console.log('   TabsList/TabsTrigger components not found');
      }

      // Check for Categories and Topics tabs
      if (html.includes('Categories') && html.includes('Topics')) {
        console.log('✅ Tab labels: FOUND');
        console.log('   Found "Categories" and "Topics" tab labels');
      } else {
        console.log('⚠️  Tab labels: NOT FOUND');
        console.log('   "Categories" and "Topics" labels not found');
      }
    } else {
      console.log('❌ Admin page: NOT ACCESSIBLE');
      console.log(`   Status: ${response.status}`);
    }

    // Test 2: Check API endpoints
    console.log('\n📡 **Test 2: API Endpoints**');

    try {
      const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        console.log('✅ Categories API: SUCCESS');
        console.log(`   Found ${categoriesData.data?.length || 0} categories`);
      } else {
        console.log('❌ Categories API: FAILED');
        console.log(`   Status: ${categoriesResponse.status}`);
      }
    } catch (error) {
      console.log('❌ Categories API: ERROR');
      console.log(`   Error: ${error.message}`);
    }

    try {
      const topicsResponse = await fetch(`${BASE_URL}/api/topics`);
      if (topicsResponse.ok) {
        const topicsData = await topicsResponse.json();
        console.log('✅ Topics API: SUCCESS');
        console.log(`   Found ${topicsData.data?.length || 0} topics`);
      } else {
        console.log('❌ Topics API: FAILED');
        console.log(`   Status: ${topicsResponse.status}`);
      }
    } catch (error) {
      console.log('❌ Topics API: ERROR');
      console.log(`   Error: ${error.message}`);
    }

    console.log('\n================================================');
    console.log('🎉 Tabbed Interface Test Complete!\n');

    console.log('📋 **Summary:**');
    console.log('   • Admin page should be accessible');
    console.log('   • Tabbed interface should be implemented');
    console.log('   • Categories and Topics tabs should be visible');
    console.log('   • API endpoints should work for both');

    console.log('\n✨ **Next Steps:**');
    console.log(
      '   1. Open http://localhost:3000/admin/categories-topics in your browser'
    );
    console.log('   2. Verify two tabs are visible: "Categories" and "Topics"');
    console.log('   3. Test switching between tabs');
    console.log('   4. Test CRUD operations in each tab');
    console.log('   5. Verify data consistency between tabs');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testTabbedInterface().catch(console.error);
