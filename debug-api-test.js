const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy, where, doc, getDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvJ8Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

async function testAPI() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Test the exact same query that the API uses
    console.log('📋 Testing API query (same as firestoreService.getLearningPlanTemplates)...');
    const plansRef = collection(db, 'learningPlanTemplates');
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const plans = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log('Total plans found:', plans.length);
    console.log('Plan IDs:', plans.map(p => p.id));
    
    const apiPlan = plans.find(p => p.id === 'api-integration');
    if (apiPlan) {
      console.log('⚠️ api-integration plan found in API query!');
      console.log('Plan name:', apiPlan.name);
      console.log('Plan data:', JSON.stringify(apiPlan, null, 2));
    } else {
      console.log('✅ api-integration plan not found in API query');
    }
    
    // Also test the GuidedLearningService query
    console.log('\n📋 Testing GuidedLearningService query...');
    const guidedQuery = query(
      collection(db, 'learningPlanTemplates'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const guidedSnapshot = await getDocs(guidedQuery);
    const guidedPlans = guidedSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log('Total guided plans found:', guidedPlans.length);
    console.log('Guided plan IDs:', guidedPlans.map(p => p.id));
    
    const guidedApiPlan = guidedPlans.find(p => p.id === 'api-integration');
    if (guidedApiPlan) {
      console.log('⚠️ api-integration plan found in guided query!');
      console.log('Plan name:', guidedApiPlan.name);
    } else {
      console.log('✅ api-integration plan not found in guided query');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAPI();
