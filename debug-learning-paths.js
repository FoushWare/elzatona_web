const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

async function debugLearningPaths() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Fetching learning paths...');
    const learningPathsRef = collection(db, 'learningPaths');
    const snapshot = await getDocs(learningPathsRef);
    const learningPaths = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${learningPaths.length} learning paths`);
    
    // Check specific learning paths that should have questions
    const targetPaths = ['frontend-basics', 'javascript-deep-dive', 'react-mastery', 'css-mastery', 'typescript-essentials'];
    
    for (const pathId of targetPaths) {
      const path = learningPaths.find(p => p.id === pathId);
      if (path) {
        console.log(`\n📋 ${path.name} (${pathId}):`);
        console.log(`  Current questionCount: ${path.questionCount}`);
        console.log(`  Full data:`, JSON.stringify(path, null, 2));
      } else {
        console.log(`\n❌ Learning path not found: ${pathId}`);
      }
    }

  } catch (error) {
    console.error('Error debugging learning paths:', error);
  }
}

debugLearningPaths();

