import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearGuidedLearningPlans() {
  console.log('🗑️  Clearing existing guided learning plans...');

  try {
    // Get all guided learning plans
    const q = query(collection(db, 'guidedLearningPlans'));
    const querySnapshot = await getDocs(q);

    let deletedCount = 0;
    for (const docSnapshot of querySnapshot.docs) {
      await deleteDoc(doc(db, 'guidedLearningPlans', docSnapshot.id));
      deletedCount++;
      console.log(`✅ Deleted plan: ${docSnapshot.data().name}`);
    }

    console.log(
      `🎉 Successfully deleted ${deletedCount} guided learning plans`
    );
  } catch (error) {
    console.error('❌ Error clearing guided learning plans:', error);
  }
}

// Run the clearing process
clearGuidedLearningPlans()
  .then(() => {
    console.log('✅ Guided learning plans clearing completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Guided learning plans clearing failed:', error);
    process.exit(1);
  });
