// Test Firebase Admin SDK connection
import { AdminFirestoreHelper, COLLECTIONS } from '../lib/firebase-admin';

async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase Admin SDK connection...');

    // Try to list documents
    const result = await AdminFirestoreHelper.listDocuments(
      COLLECTIONS.FRONTEND_TASKS,
      { limit: 5 }
    );

    console.log('✅ Firebase Admin SDK is working!');
    console.log(`Found ${result.data.length} tasks`);
    console.log(
      'Tasks:',
      result.data.map(task => ({ id: task.id, title: task.title }))
    );
  } catch (error) {
    console.error('❌ Firebase Admin SDK error:', error);
  }
}

testFirebaseConnection().catch(console.error);
