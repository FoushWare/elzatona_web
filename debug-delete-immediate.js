const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy, doc, getDoc, deleteDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvJ8Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

async function testImmediateDeletion() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    const planId = 'api-integration';
    
    // Check if plan exists before deletion
    console.log('📋 Checking if plan exists before deletion...');
    const planRef = doc(db, 'learningPlanTemplates', planId);
    const beforeSnap = await getDoc(planRef);
    console.log('Before deletion - Plan exists:', beforeSnap.exists());
    
    if (beforeSnap.exists()) {
      console.log('Plan name:', beforeSnap.data().name);
      console.log('Plan created at:', beforeSnap.data().createdAt);
    }
    
    // Delete the plan
    console.log('🗑️ Deleting plan...');
    await deleteDoc(planRef);
    console.log('✅ Delete operation completed');
    
    // Immediately check if plan exists after deletion
    console.log('📋 Immediately checking if plan exists after deletion...');
    const afterSnap = await getDoc(planRef);
    console.log('After deletion - Plan exists:', afterSnap.exists());
    
    // List all plans to see what's in the collection
    console.log('📋 Listing all plans in collection...');
    const plansRef = collection(db, 'learningPlanTemplates');
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log('Total plans found:', querySnapshot.docs.length);
    const planIds = querySnapshot.docs.map(doc => doc.id);
    console.log('Plan IDs:', planIds);
    
    const apiPlan = querySnapshot.docs.find(doc => doc.id === 'api-integration');
    if (apiPlan) {
      console.log('⚠️ api-integration plan still found in collection!');
      console.log('Plan name:', apiPlan.data().name);
      console.log('Plan created at:', apiPlan.data().createdAt);
    } else {
      console.log('✅ api-integration plan not found in collection');
    }
    
    // Wait a bit and check again
    console.log('\n⏳ Waiting 2 seconds and checking again...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const delayedSnap = await getDoc(planRef);
    console.log('After 2 seconds - Plan exists:', delayedSnap.exists());
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testImmediateDeletion();

