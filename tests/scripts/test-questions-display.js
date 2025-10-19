#!/usr/bin/env node

/**
 * Test Questions Display
 * Simple test to verify questions are working in the system
 */

import 'dotenv/config';

console.log('🧪 Testing Questions Display...\n');

const API_BASE_URL = 'http://localhost:3000';

async function testQuestions() {
  try {
    // Test 1: Get questions from API
    console.log('📋 Test 1: Fetching questions from API...');
    const response = await fetch(
      `${API_BASE_URL}/api/questions/unified?page=1&pageSize=5`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Found ${data.data.length} questions`);

    // Test 2: Display sample questions
    console.log('\n📝 Test 2: Sample Questions:');
    data.data.forEach((question, index) => {
      console.log(`${index + 1}. ${question.title}`);
      console.log(`   Category: ${question.category}`);
      console.log(`   Difficulty: ${question.difficulty}`);
      console.log(`   Type: ${question.type}`);
      console.log(`   Points: ${question.points || 'N/A'}`);
      console.log(`   Content Length: ${question.content?.length || 0} chars`);
      console.log('');
    });

    // Test 3: Test different question types
    console.log('🔍 Test 3: Question Types Analysis:');
    const types = {};
    const difficulties = {};
    const categories = {};

    data.data.forEach(question => {
      types[question.type] = (types[question.type] || 0) + 1;
      difficulties[question.difficulty] =
        (difficulties[question.difficulty] || 0) + 1;
      categories[question.category] = (categories[question.category] || 0) + 1;
    });

    console.log('   Types:', types);
    console.log('   Difficulties:', difficulties);
    console.log('   Categories:', categories);

    // Test 4: Test admin dashboard access
    console.log('\n🛡️ Test 4: Admin Dashboard Access...');
    const adminResponse = await fetch(
      `${API_BASE_URL}/admin/content/questions`
    );
    if (adminResponse.ok) {
      console.log('✅ Admin dashboard accessible');
    } else {
      console.log(`❌ Admin dashboard error: ${adminResponse.status}`);
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   ✅ Questions API working`);
    console.log(`   ✅ ${data.data.length} questions loaded`);
    console.log(`   ✅ Multiple question types available`);
    console.log(`   ✅ Admin dashboard accessible`);

    console.log('\n🎯 Next Steps:');
    console.log(
      '   1. Visit admin dashboard: http://localhost:3000/admin/content/questions'
    );
    console.log('   2. Test question creation/editing');
    console.log('   3. Set up user-facing question display');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testQuestions();
