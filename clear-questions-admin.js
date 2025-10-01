// Script to clear all questions using Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'elzatona-web',
  });
}

const db = admin.firestore();

async function clearCollection(collectionName) {
  try {
    console.log(
      `📋 Fetching all documents from ${collectionName} collection...`
    );
    const snapshot = await db.collection(collectionName).get();

    console.log(`📊 Found ${snapshot.size} documents in ${collectionName}`);

    if (snapshot.size === 0) {
      console.log(`✅ ${collectionName} collection is already empty.`);
      return 0;
    }

    console.log(`🗑️  Deleting documents from ${collectionName}...`);

    // Use batch operations for better performance
    const batch = db.batch();
    let batchCount = 0;
    const batchSize = 500; // Firestore batch limit

    snapshot.forEach(docSnapshot => {
      batch.delete(docSnapshot.ref);
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
    console.log('🔥 Initializing Firebase Admin SDK...');
    console.log('🚀 Starting to clear all question collections...\n');

    // Clear unifiedQuestions collection
    const unifiedCount = await clearCollection('unifiedQuestions');
    console.log('');

    // Clear questions collection
    const questionsCount = await clearCollection('questions');
    console.log('');

    // Clear any other question-related collections
    const otherCollections = ['enhancedQuestions', 'customQuestions'];
    let otherCount = 0;

    for (const collectionName of otherCollections) {
      try {
        const count = await clearCollection(collectionName);
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
