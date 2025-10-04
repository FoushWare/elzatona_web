/**
 * Verify Firebase Cleanup Script
 * 
 * This script verifies that Firebase collections are clean and properly organized.
 * 
 * Usage: node tools/scripts/verify-firebase-cleanup.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function verifyFirebaseCleanup() {
  console.log('🔍 Verifying Firebase Cleanup...\n');

  try {
    // Check for any remaining duplicate collections
    const collectionsToCheck = [
      'admins',
      'admin_credentials', 
      'admincredentials',
      'admin_credeials',
      'admincredeials'
    ];

    let hasDuplicates = false;

    for (const collectionName of collectionsToCheck) {
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        if (collectionName === 'admins') {
          console.log(`✅ "${collectionName}": ${querySnapshot.size} documents (MAIN COLLECTION)`);
          
          if (querySnapshot.size > 0) {
            console.log('   👥 Admin Users:');
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log(`      - ${data.email} (${data.role}) - ID: ${doc.id}`);
            });
          }
        } else if (querySnapshot.size > 0) {
          console.log(`❌ "${collectionName}": ${querySnapshot.size} documents (SHOULD BE EMPTY)`);
          hasDuplicates = true;
        } else {
          console.log(`✅ "${collectionName}": Empty (GOOD)`);
        }
      } catch (error) {
        console.log(`⚠️  "${collectionName}": Error checking - ${error.message}`);
      }
    }

    console.log('\n📊 Cleanup Status:');
    if (hasDuplicates) {
      console.log('❌ Some duplicate collections still exist');
      console.log('💡 Run: node tools/scripts/cleanup-firebase-collections.js');
    } else {
      console.log('✅ All duplicate collections have been cleaned up');
      console.log('✅ Only "admins" collection contains admin data');
    }

    console.log('\n🎯 Current Admin Users:');
    const adminsRef = collection(db, 'admins');
    const adminsSnapshot = await getDocs(adminsRef);
    
    if (adminsSnapshot.size === 0) {
      console.log('⚠️  No admin users found!');
      console.log('💡 Run: node tools/scripts/create-admin-new-email.js');
    } else {
      console.log(`✅ Found ${adminsSnapshot.size} admin user(s)`);
    }

    console.log('\n🔗 Admin Panel: http://localhost:3001/admin/login');
    console.log('📧 Working Credentials: admin@elzatona.com / admin123456');

  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  }
}

verifyFirebaseCleanup();
