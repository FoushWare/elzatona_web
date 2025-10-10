// Simple test script to verify CRUD operations
const testCRUD = async () => {
  const baseUrl = 'http://localhost:3002';

  console.log('🧪 Testing CRUD operations for problem-solving tasks...\n');

  // Test 1: GET - List all tasks
  console.log('1️⃣ Testing GET /api/admin/problem-solving');
  try {
    const response = await fetch(`${baseUrl}/api/admin/problem-solving`);
    const data = await response.json();
    console.log(`✅ GET: ${data.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   Total tasks: ${data.total || 0}`);
    console.log(`   Tasks returned: ${data.data?.length || 0}\n`);
  } catch (error) {
    console.log(`❌ GET: FAILED - ${error.message}\n`);
  }

  // Test 2: POST - Create a new task
  console.log('2️⃣ Testing POST /api/admin/problem-solving');
  try {
    const newTask = {
      title: 'Test CRUD Problem',
      description: 'Testing CRUD operations for problem-solving tasks',
      category: 'Array',
      difficulty: 'easy',
      functionName: 'testCrud',
      starterCode: 'function testCrud() { return true; }',
      solution: 'function testCrud() { return true; }',
      testCases: [
        {
          id: 't1',
          input: '[]',
          expectedOutput: 'true',
          description: 'Test case 1',
        },
      ],
      constraints: ['No constraints'],
      examples: ['Example 1'],
      tags: ['test', 'crud'],
    };

    const response = await fetch(`${baseUrl}/api/admin/problem-solving`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    const data = await response.json();
    console.log(`✅ POST: ${data.success ? 'SUCCESS' : 'FAILED'}`);
    if (data.success) {
      console.log(`   Created task ID: ${data.data?.id}\n`);
      return data.data.id; // Return ID for update/delete tests
    } else {
      console.log(`   Error: ${data.error}\n`);
    }
  } catch (error) {
    console.log(`❌ POST: FAILED - ${error.message}\n`);
  }

  return null;
};

// Run the test
testCRUD().then(taskId => {
  if (taskId) {
    console.log(`🎉 CRUD test completed! Task ID: ${taskId}`);
  } else {
    console.log('❌ CRUD test failed - no task created');
  }
});
