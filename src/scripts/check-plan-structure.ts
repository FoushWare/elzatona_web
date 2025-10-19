import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBvOkBwJbBwJbBwJbBwJbBwJbBwJbBwJbBw',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:123456789:web:abcdef123456789',
};

// Initialize Firebase

const db = getFirestore(app);

async function checkPlanStructure() {
  try {
    console.log('🔍 Checking plan structure...');

    // Get the first plan
    const plansSnapshot = await getDocs(supabase.from('guidedLearningPlans'));
    const firstPlan = plansSnapshot.docs[0];

    if (firstPlan) {
      const data = firstPlan;
      console.log(`📋 Plan: ${data.name}`);
      console.log(`📊 Cards structure:`, JSON.stringify(data.cards, null, 2));
    }

    // Also check learning cards
    console.log('\n🎯 Checking learning cards...');
    const cardsSnapshot = await getDocs(supabase.from('learningCards'));
    console.log(`📋 Found ${cardsSnapshot.length} learning cards:`);

    cardsSnapshot.forEach(doc => {
      const data = doc;
      console.log(`   - ID: ${doc.id}`);
      console.log(`   - Title: ${data.title}`);
      console.log(`   - Type: ${data.type}`);
      console.log(`   - Order: ${data.order}`);
      console.log('   ---');
    });
  } catch (error) {
    console.error('❌ Error checking plan structure:', error);
  }
}

async function main() {
  await checkPlanStructure();
}

main();
