#!/usr/bin/env node

// Quick verification script for Elzatona Web Application
// This script tests the current state of seeded data and admin functionality

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
} from 'firebase/firestore';

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

async function verifyData() {
  console.log('🔍 Verifying Elzatona Web Application Data...\n');

  try {
    // Check questions collection
    console.log('📚 Checking Questions Collection...');
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    const questionsCount = questionsSnapshot.size;
    console.log(`   Total Questions: ${questionsCount}`);

    // Count by category
    const categories = {};
    const learningCards = {};
    questionsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      categories[data.category] = (categories[data.category] || 0) + 1;
      learningCards[data.learningCardId] =
        (learningCards[data.learningCardId] || 0) + 1;
    });

    console.log('\n   Questions by Category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`     ${category}: ${count}`);
    });

    console.log('\n   Questions by Learning Card:');
    Object.entries(learningCards).forEach(([card, count]) => {
      console.log(`     ${card}: ${count}`);
    });

    // Check learning cards collection
    console.log('\n🎯 Checking Learning Cards Collection...');
    const cardsSnapshot = await getDocs(collection(db, 'learningCards'));
    console.log(`   Total Learning Cards: ${cardsSnapshot.size}`);
    cardsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`     ${data.id}: ${data.title}`);
    });

    // Check learning plans collection
    console.log('\n📋 Checking Learning Plans Collection...');
    const plansSnapshot = await getDocs(collection(db, 'learningPlans'));
    console.log(`   Total Learning Plans: ${plansSnapshot.size}`);
    plansSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`     ${data.id}: ${data.title} (${data.duration} days)`);
    });

    // Check categories collection
    console.log('\n📁 Checking Categories Collection...');
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    console.log(`   Total Categories: ${categoriesSnapshot.size}`);
    categoriesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`     ${data.id}: ${data.title}`);
    });

    // Check topics collection
    console.log('\n🏷️  Checking Topics Collection...');
    const topicsSnapshot = await getDocs(collection(db, 'topics'));
    console.log(`   Total Topics: ${topicsSnapshot.size}`);
    topicsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`     ${data.id}: ${data.title} (${data.categoryId})`);
    });

    // Summary
    console.log('\n📊 Summary:');
    console.log(`   ✅ Questions: ${questionsCount}`);
    console.log(`   ✅ Learning Cards: ${cardsSnapshot.size}`);
    console.log(`   ✅ Learning Plans: ${plansSnapshot.size}`);
    console.log(`   ✅ Categories: ${categoriesSnapshot.size}`);
    console.log(`   ✅ Topics: ${topicsSnapshot.size}`);

    // Expected counts
    const expectedQuestions = 786; // 306 React + 160 Rendering + 160 Security + 160 System Design
    const expectedCards = 4;
    const expectedPlans = 7;

    console.log('\n🎯 Verification Results:');
    console.log(
      `   Questions: ${questionsCount >= expectedQuestions ? '✅' : '❌'} (Expected: ${expectedQuestions}, Actual: ${questionsCount})`
    );
    console.log(
      `   Learning Cards: ${cardsSnapshot.size >= expectedCards ? '✅' : '❌'} (Expected: ${expectedCards}, Actual: ${cardsSnapshot.size})`
    );
    console.log(
      `   Learning Plans: ${plansSnapshot.size >= expectedPlans ? '✅' : '❌'} (Expected: ${expectedPlans}, Actual: ${plansSnapshot.size})`
    );

    if (
      questionsCount >= expectedQuestions &&
      cardsSnapshot.size >= expectedCards &&
      plansSnapshot.size >= expectedPlans
    ) {
      console.log('\n🎉 All data verification passed!');
      console.log('\n📋 Next Steps:');
      console.log(
        '   1. Test admin dashboard: http://localhost:3000/admin/dashboard'
      );
      console.log(
        '   2. Test content management: http://localhost:3000/admin/content-management'
      );
      console.log(
        '   3. Test questions page: http://localhost:3000/admin/content/questions'
      );
      console.log(
        '   4. Run comprehensive tests using COMPREHENSIVE_TESTING_GUIDE.md'
      );
    } else {
      console.log(
        '\n⚠️  Some data verification failed. Please check the seeding process.'
      );
    }
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

// Run verification
verifyData().catch(console.error);
