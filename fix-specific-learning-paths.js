const { initializeApp } = require('firebase/app');
const {
  getFirestore,
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

// Learning paths that should have questions and their correct counts
const learningPathUpdates = [
  { id: 'frontend-basics', questionCount: 5 },
  { id: 'javascript-deep-dive', questionCount: 5 },
  { id: 'react-mastery', questionCount: 5 },
  { id: 'css-mastery', questionCount: 2 },
  { id: 'typescript-essentials', questionCount: 2 },
  { id: 'performance-optimization', questionCount: 2 },
  { id: 'security-essentials', questionCount: 2 },
  { id: 'testing-strategies', questionCount: 2 }
];

async function fixSpecificLearningPaths() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Updating specific learning paths...');

    for (const update of learningPathUpdates) {
      try {
        const pathRef = doc(db, 'learningPaths', update.id);
        await updateDoc(pathRef, {
          questionCount: update.questionCount,
          updatedAt: new Date().toISOString()
        });
        console.log(`✅ Updated ${update.id}: ${update.questionCount} questions`);
      } catch (error) {
        console.error(`❌ Failed to update ${update.id}:`, error.message);
      }
    }

    console.log('\n🎉 Update completed!');

  } catch (error) {
    console.error('Error updating learning paths:', error);
  }
}

fixSpecificLearningPaths();

