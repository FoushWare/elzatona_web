// Script to clear all questions from unifiedQuestions collection
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBvOkBwJ1T3uygE1qgqQqQqQqQqQqQqQqQ',
  authDomain: 'elzatona-web.firebaseapp.com',
  projectId: 'elzatona-web',
  storageBucket: 'elzatona-web.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456789',
};

async function clearAllQuestions() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log(
      '📋 Fetching all questions from unifiedQuestions collection...'
    );
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);

    console.log(`📊 Found ${snapshot.size} questions to delete`);

    if (snapshot.size === 0) {
      console.log('✅ No questions found. Collection is already empty.');
      return;
    }

    console.log('🗑️  Deleting questions...');
    const deletePromises = [];

    snapshot.forEach(docSnapshot => {
      deletePromises.push(
        deleteDoc(doc(db, 'unifiedQuestions', docSnapshot.id))
      );
    });

    await Promise.all(deletePromises);

    console.log(
      `✅ Successfully deleted ${snapshot.size} questions from unifiedQuestions collection`
    );
    console.log('🎉 All questions have been flushed!');
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    process.exit(1);
  }
}

// Run the script
clearAllQuestions()
  .then(() => {
    console.log('🏁 Script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
