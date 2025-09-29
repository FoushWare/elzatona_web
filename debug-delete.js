const fetch = require('node-fetch');

async function debugDelete() {
  try {
    console.log('🔍 Testing delete functionality...');
    
    // First, get the list of plans
    console.log('\n1. Getting list of plans...');
    const listResponse = await fetch('http://localhost:3000/api/guided-learning/plans');
    const listData = await listResponse.json();
    console.log('Plans count:', listData.plans.length);
    
    const apiPlan = listData.plans.find(p => p.id === 'api-integration');
    if (apiPlan) {
      console.log('❌ api-integration plan found in list:', apiPlan.name);
    } else {
      console.log('✅ api-integration plan NOT found in list');
    }
    
    // Try to get the individual plan
    console.log('\n2. Getting individual plan...');
    const individualResponse = await fetch('http://localhost:3000/api/guided-learning/plans/api-integration');
    const individualData = await individualResponse.json();
    console.log('Individual plan response:', individualData);
    
    // Try to delete the plan
    console.log('\n3. Attempting to delete plan...');
    const deleteResponse = await fetch('http://localhost:3000/api/guided-learning/plans?id=api-integration', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const deleteData = await deleteResponse.json();
    console.log('Delete response:', deleteData);
    
    // Check the list again
    console.log('\n4. Getting list of plans after delete...');
    const listResponse2 = await fetch('http://localhost:3000/api/guided-learning/plans');
    const listData2 = await listResponse2.json();
    console.log('Plans count after delete:', listData2.plans.length);
    
    const apiPlan2 = listData2.plans.find(p => p.id === 'api-integration');
    if (apiPlan2) {
      console.log('❌ api-integration plan still found in list:', apiPlan2.name);
    } else {
      console.log('✅ api-integration plan NOT found in list after delete');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugDelete();

