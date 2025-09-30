const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy, doc, deleteDoc, writeBatch } = require('firebase/firestore');

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

async function fixPlansIssue() {
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
      name: doc.data().name,
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
    
    // Delete unwanted plans using batch
    console.log('\n🗑️ Starting batch deletion process...');
    const batch = writeBatch(db);
    
    for (const plan of plansToDelete) {
      const planRef = doc(db, 'learningPlanTemplates', plan.id);
      batch.delete(planRef);
      console.log(`🗑️ Queued for deletion: ${plan.id}`);
    }
    
    // Execute batch deletion
    await batch.commit();
    console.log('✅ Batch deletion completed');
    
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
    
    // Check if we have all the day-based plans
    const missingDayPlans = plansToKeep.filter(planId => 
      !remainingPlans.some(plan => plan.id === planId)
    );
    
    if (missingDayPlans.length > 0) {
      console.log(`⚠️ Missing day-based plans: ${missingDayPlans.join(', ')}`);
    } else {
      console.log('✅ All day-based plans are present!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixPlansIssue();

