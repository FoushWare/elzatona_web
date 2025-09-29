const fetch = require('node-fetch');

async function testDeleteSpecific() {
  try {
    console.log('🔍 Testing delete of api-integration plan specifically...');
    
    // First, get the list of plans
    console.log('\n1. Getting list of plans...');
    const listResponse = await fetch('http://localhost:3000/api/guided-learning/plans');
    const listData = await listResponse.json();
    console.log('Plans count:', listData.plans.length);
    
    const apiPlan = listData.plans.find(p => p.id === 'api-integration');
    if (apiPlan) {
      console.log('❌ api-integration plan found in list:', apiPlan.name);
      console.log('Plan details:', {
        id: apiPlan.id,
        name: apiPlan.name,
        createdAt: apiPlan.createdAt,
        updatedAt: apiPlan.updatedAt
      });
    } else {
      console.log('✅ api-integration plan NOT found in list');
    }
    
    // Try to get the individual plan
    console.log('\n2. Getting individual plan...');
    const individualResponse = await fetch('http://localhost:3000/api/guided-learning/plans/api-integration');
    const individualData = await individualResponse.json();
    console.log('Individual plan response:', individualData);
    
    // Try to delete the plan multiple times
    console.log('\n3. Attempting to delete plan multiple times...');
    for (let i = 1; i <= 3; i++) {
      console.log(`\nAttempt ${i}:`);
      const deleteResponse = await fetch('http://localhost:3000/api/guided-learning/plans?id=api-integration', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const deleteData = await deleteResponse.json();
      console.log('Delete response:', deleteData);
      
      // Check the list after each delete
      const listResponse2 = await fetch('http://localhost:3000/api/guided-learning/plans');
      const listData2 = await listResponse2.json();
      const apiPlan2 = listData2.plans.find(p => p.id === 'api-integration');
      if (apiPlan2) {
        console.log('❌ Plan still exists after delete attempt', i);
      } else {
        console.log('✅ Plan deleted successfully on attempt', i);
        break;
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testDeleteSpecific();

