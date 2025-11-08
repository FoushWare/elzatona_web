// Test hybrid Firebase helper
import { HybridFirestoreHelper, COLLECTIONS } from '../lib/firebase-hybrid';

async function testHybridFirebase() {
  try {
    console.log('Testing hybrid Firebase helper...');

    // Try to list documents
    const result = await HybridFirestoreHelper.listDocuments(
      COLLECTIONS.FRONTEND_TASKS,
      { limit: 5 }
    );

    console.log('✅ Hybrid Firebase helper is working!');
    console.log(`Found ${result.data.length} tasks`);
    console.log(
      'Tasks:',
      result.data.map(task => ({ id: task.id, title: task.title }))
    );
  } catch (error) {
    console.error('❌ Hybrid Firebase helper error:', error);
  }
}

testHybridFirebase().catch(console.error);
