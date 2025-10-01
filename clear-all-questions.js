// Script to clear all questions from both collections
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
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

async function clearCollection(db, collectionName) {
  try {
    console.log(
      `📋 Fetching all documents from ${collectionName} collection...`
    );
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    console.log(`📊 Found ${snapshot.size} documents in ${collectionName}`);

    if (snapshot.size === 0) {
      console.log(`✅ ${collectionName} collection is already empty.`);
      return 0;
    }

    console.log(`🗑️  Deleting documents from ${collectionName}...`);

    // Use batch operations for better performance
    const batch = writeBatch(db);
    let batchCount = 0;
    const batchSize = 500; // Firestore batch limit

    snapshot.forEach(docSnapshot => {
      batch.delete(doc(db, collectionName, docSnapshot.id));
      batchCount++;

      // Commit batch when it reaches the limit
      if (batchCount >= batchSize) {
        batch.commit();
        batchCount = 0;
      }
    });

    // Commit any remaining documents
    if (batchCount > 0) {
      await batch.commit();
    }

    console.log(
      `✅ Successfully deleted ${snapshot.size} documents from ${collectionName}`
    );
    return snapshot.size;
  } catch (error) {
    console.error(`❌ Error clearing ${collectionName}:`, error);
    throw error;
  }
}

async function clearAllQuestions() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('🚀 Starting to clear all question collections...\n');

    // Clear unifiedQuestions collection
    const unifiedCount = await clearCollection(db, 'unifiedQuestions');
    console.log('');

    // Clear questions collection
    const questionsCount = await clearCollection(db, 'questions');
    console.log('');

    // Clear any other question-related collections
    const otherCollections = ['enhancedQuestions', 'customQuestions'];
    let otherCount = 0;

    for (const collectionName of otherCollections) {
      try {
        const count = await clearCollection(db, collectionName);
        otherCount += count;
        console.log('');
      } catch (error) {
        console.log(
          `⚠️  Could not clear ${collectionName} (may not exist): ${error.message}`
        );
      }
    }

    const totalDeleted = unifiedCount + questionsCount + otherCount;

    console.log('🎉 CLEARING COMPLETE!');
    console.log(`📊 Total documents deleted: ${totalDeleted}`);
    console.log(`   - unifiedQuestions: ${unifiedCount}`);
    console.log(`   - questions: ${questionsCount}`);
    console.log(`   - other collections: ${otherCount}`);
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
