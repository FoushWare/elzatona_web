const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');

// Use the same config as the app
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

async function testWithAppConfig() {
  try {
    console.log('🔥 Initializing Firebase with app config...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📋 Using project ID:', db.app.options.projectId);
    
    // Test the exact same query that the API uses
    console.log('📋 Testing API query...');
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
      console.log('⚠️ api-integration plan found!');
      console.log('Plan name:', apiPlan.name);
      console.log('Plan created at:', apiPlan.createdAt);
    } else {
      console.log('✅ api-integration plan not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testWithAppConfig();

