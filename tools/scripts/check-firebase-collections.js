/**
 * Check Firebase Collections Script
 * 
 * This script checks what collections exist in Firebase and helps clean up duplicates.
 * 
 * Usage: node tools/scripts/check-firebase-collections.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkFirebaseCollections() {
  console.log('🔍 Checking Firebase Collections...\n');

  try {
    // Check for admin-related collections
    const collectionsToCheck = [
      'admins',
      'admin_credentials', 
      'admincredentials',
      'admin_credeials', // Note: this might be a typo
      'admincredeials'
    ];

    for (const collectionName of collectionsToCheck) {
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        if (querySnapshot.size > 0) {
          console.log(`📁 Collection "${collectionName}": ${querySnapshot.size} documents`);
          
          querySnapshot.forEach((doc) => {
            console.log(`   - Document ID: ${doc.id}`);
            console.log(`   - Data:`, doc.data());
            console.log('');
          });
        } else {
          console.log(`📁 Collection "${collectionName}": Empty or doesn't exist`);
        }
      } catch (error) {
        console.log(`❌ Error checking collection "${collectionName}": ${error.message}`);
      }
    }

    console.log('\n🎯 Recommendations:');
    console.log('1. Use only "admins" collection for admin user data');
    console.log('2. Delete duplicate collections like "admin_credentials", "admincredentials", etc.');
    console.log('3. Keep the standard "admins" collection with proper structure');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFirebaseCollections();
