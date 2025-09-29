const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, query, orderBy } = require('firebase/firestore');

// Initialize Firebase (you'll need to add your config)
const firebaseConfig = {
  // Add your Firebase config here
  projectId: "fir-demo-project-adffb",
  // ... other config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestoreDirect() {
  try {
    console.log('🔍 Testing Firestore directly...');
    
    // Get all documents from learningPlanTemplates collection
    console.log('\n1. Getting all documents from learningPlanTemplates...');
    const plansRef = collection(db, 'learningPlanTemplates');
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log('Total documents found:', querySnapshot.docs.length);
    
    const plans = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      createdAt: doc.data().createdAt
    }));
    
    console.log('Plan IDs:', plans.map(p => p.id));
    
    // Check specifically for api-integration
    const apiPlan = plans.find(p => p.id === 'api-integration');
    if (apiPlan) {
      console.log('❌ api-integration plan found in Firestore:', apiPlan.name);
    } else {
      console.log('✅ api-integration plan NOT found in Firestore');
    }
    
    // Try to get the specific document
    console.log('\n2. Trying to get api-integration document directly...');
    const planRef = doc(db, 'learningPlanTemplates', 'api-integration');
    const planSnap = await getDoc(planRef);
    
    if (planSnap.exists()) {
      console.log('❌ api-integration document exists:', planSnap.data().name);
    } else {
      console.log('✅ api-integration document does NOT exist');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testFirestoreDirect();

