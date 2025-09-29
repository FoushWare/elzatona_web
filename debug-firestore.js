const fetch = require('node-fetch');

async function debugFirestore() {
  try {
    console.log('🔍 Debugging Firestore collections...');
    
    // Check if there are multiple API endpoints that might be serving different data
    console.log('\n1. Checking different API endpoints...');
    
    // Check the main plans endpoint
    const plansResponse = await fetch('http://localhost:3000/api/guided-learning/plans');
    const plansData = await plansResponse.json();
    console.log('Main plans endpoint - count:', plansData.plans.length);
    
    // Check if there's a learning-plan-templates endpoint
    try {
      const templatesResponse = await fetch('http://localhost:3000/api/learning-plan-templates');
      const templatesData = await templatesResponse.json();
      console.log('Learning plan templates endpoint - count:', templatesData.templates?.length || 'No templates field');
    } catch (e) {
      console.log('Learning plan templates endpoint - not found');
    }
    
    // Check if there are any other endpoints
    try {
      const adminResponse = await fetch('http://localhost:3000/api/admin/guided-learning');
      const adminData = await adminResponse.json();
      console.log('Admin guided learning endpoint - count:', adminData.plans?.length || 'No plans field');
    } catch (e) {
      console.log('Admin guided learning endpoint - not found');
    }
    
    // Let's also check if there are any query parameters that might affect the results
    console.log('\n2. Checking with different query parameters...');
    
    const plansWithSections = await fetch('http://localhost:3000/api/guided-learning/plans?getSections=true');
    const sectionsData = await plansWithSections.json();
    console.log('Plans with getSections=true - count:', sectionsData.data?.length || 'No data field');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugFirestore();

