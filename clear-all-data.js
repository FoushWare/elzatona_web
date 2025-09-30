const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'greatfrontendhub'
});

const db = admin.firestore();

async function clearAllData() {
  console.log('🧹 Starting complete data cleanup...');
  
  try {
    // Collections to clear
    const collections = [
      'unifiedQuestions',
      'topics', 
      'categories',
      'learningPaths',
      'guidedLearningPlans',
      'sections',
      'sectors',
      'flashcards',
      'userProgress',
      'userAchievements',
      'auditLogs'
    ];

    for (const collectionName of collections) {
      console.log(`\n🗑️  Clearing collection: ${collectionName}`);
      
      try {
        const snapshot = await db.collection(collectionName).get();
        const batch = db.batch();
        
        let count = 0;
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          count++;
        });
        
        if (count > 0) {
          await batch.commit();
          console.log(`   ✅ Deleted ${count} documents from ${collectionName}`);
        } else {
          console.log(`   ℹ️  No documents found in ${collectionName}`);
        }
      } catch (error) {
        console.log(`   ❌ Error clearing ${collectionName}:`, error.message);
      }
    }

    console.log('\n🎉 Data cleanup completed successfully!');
    console.log('📝 All collections have been cleared and are ready for manual data entry.');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    process.exit(0);
  }
}

// Run the cleanup
clearAllData();
