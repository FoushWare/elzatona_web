#!/usr/bin/env node

// Test script for API endpoints performance
const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const req = http.get(`http://localhost:3001${path}`, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        try {
          const jsonData = JSON.parse(data);
          resolve({
            success: jsonData.success,
            dataLength: jsonData.data ? jsonData.data.length : 0,
            responseTime,
            pagination: jsonData.pagination,
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Invalid JSON response',
            responseTime,
          });
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testAPIEndpoints() {
  console.log('🧪 Testing API Endpoints Performance...\n');

  try {
    // Test 1: Basic questions list
    console.log('📋 Test 1: Basic questions list (page=1, pageSize=10)');
    const result1 = await makeRequest(
      '/api/questions/unified?page=1&pageSize=10'
    );
    console.log(`   ✅ Success: ${result1.success}`);
    console.log(`   📊 Data Length: ${result1.dataLength} questions`);
    console.log(`   ⏱️  Response Time: ${result1.responseTime}ms`);
    if (result1.pagination) {
      console.log(
        `   📄 Pagination: Page ${result1.pagination.page}/${result1.pagination.totalPages} (${result1.pagination.totalCount} total)`
      );
    }
    console.log('');

    // Test 2: Larger page size
    console.log('📋 Test 2: Larger page size (page=1, pageSize=50)');
    const result2 = await makeRequest(
      '/api/questions/unified?page=1&pageSize=50'
    );
    console.log(`   ✅ Success: ${result2.success}`);
    console.log(`   📊 Data Length: ${result2.dataLength} questions`);
    console.log(`   ⏱️  Response Time: ${result2.responseTime}ms`);
    console.log('');

    // Test 3: Filter by difficulty
    console.log('📋 Test 3: Filter by difficulty (difficulty=beginner)');
    const result3 = await makeRequest(
      '/api/questions/unified?difficulty=beginner&pageSize=20'
    );
    console.log(`   ✅ Success: ${result3.success}`);
    console.log(`   📊 Data Length: ${result3.dataLength} questions`);
    console.log(`   ⏱️  Response Time: ${result3.responseTime}ms`);
    console.log('');

    // Test 4: Filter by category
    console.log('📋 Test 4: Filter by category (category=React)');
    const result4 = await makeRequest(
      '/api/questions/unified?category=React&pageSize=20'
    );
    console.log(`   ✅ Success: ${result4.success}`);
    console.log(`   📊 Data Length: ${result4.dataLength} questions`);
    console.log(`   ⏱️  Response Time: ${result4.responseTime}ms`);
    console.log('');

    // Performance summary
    const avgResponseTime =
      (result1.responseTime +
        result2.responseTime +
        result3.responseTime +
        result4.responseTime) /
      4;
    console.log('📈 Performance Summary:');
    console.log(
      `   ⏱️  Average Response Time: ${avgResponseTime.toFixed(0)}ms`
    );
    console.log(
      `   📊 Total Questions Tested: ${result1.dataLength + result2.dataLength + result3.dataLength + result4.dataLength}`
    );

    if (avgResponseTime < 1000) {
      console.log('   ✅ Performance: EXCELLENT (< 1s)');
    } else if (avgResponseTime < 3000) {
      console.log('   ⚠️  Performance: GOOD (1-3s)');
    } else {
      console.log('   ❌ Performance: NEEDS IMPROVEMENT (> 3s)');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIEndpoints();
