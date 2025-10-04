/**
 * Cleanup Firebase Collections Script
 * 
 * This script cleans up duplicate admin collections and standardizes on "admins" collection.
 * 
 * Usage: node tools/scripts/cleanup-firebase-collections.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc, writeBatch } = require('firebase/firestore');

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

async function cleanupFirebaseCollections() {
  console.log('🧹 Cleaning up Firebase Collections...\n');

  try {
    // Collections to clean up (keep only "admins")
    const collectionsToDelete = [
      'admin_credentials',
      'admincredentials', 
      'admin_credeials',
      'admincredeials'
    ];

    for (const collectionName of collectionsToDelete) {
      try {
        console.log(`🗑️  Checking collection "${collectionName}"...`);
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        if (querySnapshot.size > 0) {
          console.log(`   Found ${querySnapshot.size} documents to delete`);
          
          // Use batch to delete all documents
          const batch = writeBatch(db);
          querySnapshot.forEach((docSnapshot) => {
            batch.delete(doc(db, collectionName, docSnapshot.id));
          });
          
          await batch.commit();
          console.log(`   ✅ Deleted ${querySnapshot.size} documents from "${collectionName}"`);
        } else {
          console.log(`   📭 Collection "${collectionName}" is already empty`);
        }
      } catch (error) {
        console.log(`   ❌ Error cleaning collection "${collectionName}": ${error.message}`);
      }
    }

    console.log('\n📊 Final Status:');
    
    // Check what's left in admins collection
    const adminsRef = collection(db, 'admins');
    const adminsSnapshot = await getDocs(adminsRef);
    
    console.log(`✅ "admins" collection: ${adminsSnapshot.size} documents`);
    
    if (adminsSnapshot.size > 0) {
      console.log('\n👥 Current Admin Users:');
      adminsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`   - ${data.email} (${data.role}) - ID: ${doc.id}`);
      });
    }

    console.log('\n🎉 Cleanup Complete!');
    console.log('✅ Now using only "admins" collection for admin data');
    console.log('✅ Duplicate collections have been removed');

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

cleanupFirebaseCollections();
