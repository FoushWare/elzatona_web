const { initializeApp } = require('firebase/app');
const { getFirestore, doc, deleteDoc, collection, getDocs, query, orderBy } = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Plans to keep (day-based plans only)
const plansToKeep = [
  '1-day-plan',
  '2-day-plan', 
  '3-day-plan',
  '4-day-plan',
  '5-day-plan',
  '6-day-plan',
  '7-day-plan'
];

async function deleteUnwantedPlans() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📋 Getting all learning plan templates...');
    const plansRef = collection(db, 'learningPlanTemplates');
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const allPlans = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log(`📋 Found ${allPlans.length} plans total`);
    
    // Find plans to delete
    const plansToDelete = allPlans.filter(plan => !plansToKeep.includes(plan.id));
    
    console.log(`🗑️ Plans to delete: ${plansToDelete.length}`);
    plansToDelete.forEach(plan => {
      console.log(`  - ${plan.id}: ${plan.name}`);
    });
    
    console.log(`✅ Plans to keep: ${allPlans.length - plansToDelete.length}`);
    allPlans.filter(plan => plansToKeep.includes(plan.id)).forEach(plan => {
      console.log(`  - ${plan.id}: ${plan.name}`);
    });
    
    // Delete unwanted plans
    console.log('\n🗑️ Starting deletion process...');
    for (const plan of plansToDelete) {
      try {
        console.log(`🗑️ Deleting ${plan.id}...`);
        const planRef = doc(db, 'learningPlanTemplates', plan.id);
        await deleteDoc(planRef);
        console.log(`✅ Successfully deleted ${plan.id}`);
      } catch (error) {
        console.error(`❌ Failed to delete ${plan.id}:`, error.message);
      }
    }
    
    // Verify deletion
    console.log('\n📋 Verifying deletion...');
    const verifySnapshot = await getDocs(q);
    const remainingPlans = verifySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
    }));
    
    console.log(`📋 Remaining plans: ${remainingPlans.length}`);
    remainingPlans.forEach(plan => {
      console.log(`  - ${plan.id}: ${plan.name}`);
    });
    
    const stillUnwanted = remainingPlans.filter(plan => !plansToKeep.includes(plan.id));
    if (stillUnwanted.length > 0) {
      console.log(`⚠️ Still have ${stillUnwanted.length} unwanted plans:`);
      stillUnwanted.forEach(plan => {
        console.log(`  - ${plan.id}: ${plan.name}`);
      });
    } else {
      console.log('✅ All unwanted plans deleted successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

deleteUnwantedPlans();

