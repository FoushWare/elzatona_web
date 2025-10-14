#!/usr/bin/env ts-node

/**
 * Clear Questions from Firebase
 * This script removes all questions from the Firebase 'questions' collection
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearQuestions() {
  try {
    console.log('🔥 Starting to clear questions from Firebase...');

    // Get all questions from the collection
    const questionsRef = collection(db, 'questions');
    const snapshot = await getDocs(questionsRef);

    console.log(`📊 Found ${snapshot.size} questions to delete`);

    if (snapshot.size === 0) {
      console.log('✅ No questions found in the database');
      return;
    }

    // Delete each question
    const deletePromises = snapshot.docs.map(async docSnapshot => {
      const questionId = docSnapshot.id;
      const questionData = docSnapshot.data();
      console.log(
        `🗑️  Deleting question: ${questionId} - ${questionData.title}`
      );

      await deleteDoc(doc(db, 'questions', questionId));
      return questionId;
    });

    // Wait for all deletions to complete
    const deletedIds = await Promise.all(deletePromises);

    console.log(`✅ Successfully deleted ${deletedIds.length} questions`);
    console.log('🎉 Questions collection cleared!');
  } catch (error) {
    console.error('❌ Error clearing questions:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  clearQuestions()
    .then(() => {
      console.log('✨ Script completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

export { clearQuestions };
