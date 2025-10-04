/**
 * Cleanup Duplicate Admin Entries Script
 * 
 * This script removes duplicate admin entries and keeps only the most recent/complete ones.
 * 
 * Usage: node tools/scripts/cleanup-duplicate-admins.js
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

async function cleanupDuplicateAdmins() {
  console.log('🧹 Cleaning up duplicate admin entries...\n');

  try {
    const adminsRef = collection(db, 'admins');
    const querySnapshot = await getDocs(adminsRef);
    
    // Group admins by email
    const adminsByEmail = {};
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      const email = data.email;
      
      if (!adminsByEmail[email]) {
        adminsByEmail[email] = [];
      }
      
      adminsByEmail[email].push({
        id: docSnapshot.id,
        data: data,
        docRef: docSnapshot.ref
      });
    });

    console.log('📊 Found admin entries by email:');
    Object.keys(adminsByEmail).forEach(email => {
      console.log(`   ${email}: ${adminsByEmail[email].length} entries`);
    });

    const batch = writeBatch(db);
    let deletedCount = 0;

    // Process each email group
    Object.keys(adminsByEmail).forEach(email => {
      const entries = adminsByEmail[email];
      
      if (entries.length > 1) {
        console.log(`\n🔍 Processing duplicates for: ${email}`);
        
        // Sort by creation date (keep the most recent)
        entries.sort((a, b) => {
          const aTime = a.data.createdAt?.seconds || 0;
          const bTime = b.data.createdAt?.seconds || 0;
          return bTime - aTime; // Most recent first
        });

        // Keep the first (most recent) entry, delete the rest
        const keepEntry = entries[0];
        const deleteEntries = entries.slice(1);

        console.log(`   ✅ Keeping: ${keepEntry.id} (created: ${new Date(keepEntry.data.createdAt?.seconds * 1000).toISOString()})`);
        
        deleteEntries.forEach(entry => {
          console.log(`   🗑️  Deleting: ${entry.id} (created: ${new Date(entry.data.createdAt?.seconds * 1000).toISOString()})`);
          batch.delete(entry.docRef);
          deletedCount++;
        });
      }
    });

    if (deletedCount > 0) {
      await batch.commit();
      console.log(`\n✅ Cleanup complete! Deleted ${deletedCount} duplicate entries.`);
    } else {
      console.log('\n✅ No duplicate entries found. All admins are unique.');
    }

    // Show final admin list
    console.log('\n👥 Final Admin List:');
    const finalSnapshot = await getDocs(adminsRef);
    finalSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`   - ${data.email} (${data.role}) - ID: ${doc.id}`);
    });

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

cleanupDuplicateAdmins();
