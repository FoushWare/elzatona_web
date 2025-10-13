#!/usr/bin/env node

/**
 * Clear All Questions from Database
 */

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
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearAllQuestions() {
  console.log('🗑️ Clearing all questions from database...\n');

  try {
    // Get all questions
    const questionsRef = collection(db, 'unifiedQuestions');
    const querySnapshot = await getDocs(questionsRef);

    if (querySnapshot.empty) {
      console.log(
        '✅ No questions found in database. Database is already clean.'
      );
      return;
    }

    console.log(`📊 Found ${querySnapshot.size} questions to delete`);

    // Delete all questions
    const deletePromises = [];
    querySnapshot.forEach(docSnapshot => {
      console.log(`   - Deleting: ${docSnapshot.id}`);
      deletePromises.push(
        deleteDoc(doc(db, 'unifiedQuestions', docSnapshot.id))
      );
    });

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    console.log(`\n✅ Successfully deleted ${querySnapshot.size} questions`);
    console.log(
      '🗃️ Database is now clean and ready for fresh question seeding'
    );

    // Verify deletion
    const verifySnapshot = await getDocs(questionsRef);
    if (verifySnapshot.empty) {
      console.log('✅ Verification: No questions remaining in database');
    } else {
      console.log(`⚠️ Warning: ${verifySnapshot.size} questions still remain`);
    }
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
  }
}

clearAllQuestions();
