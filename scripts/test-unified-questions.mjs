#!/usr/bin/env node

/**
 * Test Script: Verify unified questions system
 * Simple test to check if questions were created successfully
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testUnifiedQuestions() {
  console.log('🧪 Testing unified questions system...');
  
  try {
    // Test 1: Get all questions (simple query)
    console.log('📝 Test 1: Getting all questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const simpleQuery = query(questionsRef, limit(5));
    const questionsSnapshot = await getDocs(simpleQuery);
    
    console.log(`✅ Found ${questionsSnapshot.size} questions`);
    
    if (questionsSnapshot.size > 0) {
      console.log('📋 Sample questions:');
      questionsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${data.title} (${data.category}, ${data.difficulty})`);
      });
    }
    
    // Test 2: Get learning paths
    console.log('\n📚 Test 2: Getting learning paths...');
    const pathsRef = collection(db, 'learningPaths');
    const pathsSnapshot = await getDocs(pathsRef);
    
    console.log(`✅ Found ${pathsSnapshot.size} learning paths`);
    
    if (pathsSnapshot.size > 0) {
      console.log('📋 Learning paths:');
      pathsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${data.name} (${data.questionCount} questions)`);
      });
    }
    
    // Test 3: Count questions by category
    console.log('\n📊 Test 3: Counting questions by category...');
    const allQuestionsSnapshot = await getDocs(questionsRef);
    const categoryCount = {};
    
    allQuestionsSnapshot.forEach((doc) => {
      const data = doc.data();
      categoryCount[data.category] = (categoryCount[data.category] || 0) + 1;
    });
    
    console.log('📋 Questions by category:');
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`);
    });
    
    console.log('\n✅ All tests passed! Unified questions system is working.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testUnifiedQuestions();
