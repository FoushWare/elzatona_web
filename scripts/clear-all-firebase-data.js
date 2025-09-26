#!/usr/bin/env node

/**
 * Clear All Firebase Data Script
 * This script clears all data from Firebase collections to start fresh
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'fir-demo-project-adffb.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Collections to clear
const COLLECTIONS_TO_CLEAR = [
  'questions',           // Main questions collection
  'unifiedQuestions',    // Unified questions collection
  'learningPaths',       // Learning paths
  'sectors',            // Learning path sectors
  'learningPlans',      // Guided learning plans
  'sections',           // Learning sections
  'topics',             // Question topics
  'userProgress',       // User progress data
  'userPreferences',    // User preferences
  'flashcards',         // Flashcard data
  'audioFiles',         // Audio files metadata
  'questionAudioMappings', // Question-audio mappings
  'userAchievements',   // User achievements
  'learningSessions',   // Learning sessions
  'sectionProgress',    // Section progress
  'weeklyProgress',     // Weekly progress
  'monthlyProgress',    // Monthly progress
  'dailyGoals',         // Daily goals
  'badges',             // Badges
  'userAnalytics',      // User analytics
];

async function clearCollection(db, collectionName) {
  try {
    console.log(`🗑️  Clearing collection: ${collectionName}`);
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    if (snapshot.empty) {
      console.log(`   ✅ Collection ${collectionName} is already empty`);
      return { success: true, deleted: 0 };
    }

    const deletePromises = [];
    snapshot.forEach((docSnapshot) => {
      deletePromises.push(deleteDoc(doc(db, collectionName, docSnapshot.id)));
    });

    await Promise.all(deletePromises);
    console.log(`   ✅ Deleted ${snapshot.size} documents from ${collectionName}`);
    
    return { success: true, deleted: snapshot.size };
  } catch (error) {
    console.error(`   ❌ Error clearing collection ${collectionName}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function clearAllData() {
  try {
    console.log('🚀 Starting Firebase data clearing process...\n');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully\n');
    
    const results = [];
    
    // Clear each collection
    for (const collectionName of COLLECTIONS_TO_CLEAR) {
      const result = await clearCollection(db, collectionName);
      results.push({
        collection: collectionName,
        ...result
      });
    }
    
    // Summary
    console.log('\n📊 CLEARING SUMMARY:');
    console.log('==================');
    
    let totalDeleted = 0;
    let successCount = 0;
    let errorCount = 0;
    
    results.forEach(result => {
      if (result.success) {
        successCount++;
        totalDeleted += result.deleted;
        console.log(`✅ ${result.collection}: ${result.deleted} documents deleted`);
      } else {
        errorCount++;
        console.log(`❌ ${result.collection}: ${result.error}`);
      }
    });
    
    console.log('\n🎯 FINAL RESULTS:');
    console.log(`   Total collections processed: ${results.length}`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Failed: ${errorCount}`);
    console.log(`   Total documents deleted: ${totalDeleted}`);
    
    if (errorCount === 0) {
      console.log('\n🎉 All Firebase data cleared successfully!');
      console.log('   You can now start testing with fresh data.');
    } else {
      console.log('\n⚠️  Some collections failed to clear. Check the errors above.');
    }
    
  } catch (error) {
    console.error('💥 Fatal error during clearing process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  clearAllData()
    .then(() => {
      console.log('\n✨ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearAllData, clearCollection };
