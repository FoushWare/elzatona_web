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

async function checkGuidedLearningPlans() {
  try {
    console.log('🔍 Checking guided learning plans...');

    const plansSnapshot = await getDocs(supabase.from('guidedLearningPlans'));
    console.log(`📋 Found ${plansSnapshot.length} guided learning plans:`);

    plansSnapshot.forEach(doc => {
      const data = doc;
      console.log(`   - ID: ${doc.id}`);
      console.log(`   - Name: ${data.name}`);
      console.log(`   - Duration: ${data.duration} days`);
      console.log(`   - Has cards: ${data.cards ? 'Yes' : 'No'}`);
      console.log(`   - Has sections: ${data.sections ? 'Yes' : 'No'}`);
      console.log('   ---');
    });
  } catch (error) {
    console.error('❌ Error checking guided learning plans:', error);
  }
}

async function main() {
  await checkGuidedLearningPlans();
}

main();
