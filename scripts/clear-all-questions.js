const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
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

async function clearAllQuestions() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Fetching all questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);
    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${questions.length} questions to delete`);

    let deletedCount = 0;

    for (const question of questions) {
      const questionRef = doc(db, 'unifiedQuestions', question.id);
      await deleteDoc(questionRef);
      console.log(`✅ Deleted: ${question.title}`);
      deletedCount++;
    }

    console.log('\n🎉 Clear completed!');
    console.log(`📊 Deleted: ${deletedCount} questions`);
  } catch (error) {
    console.error('Error clearing questions:', error);
  }
}

clearAllQuestions();

