#!/usr/bin/env node

/**
 * Complete Database Clearing Script
 * Clears all data from Firebase Firestore and PostgreSQL (Supabase)
 */

import 'dotenv/config';

console.log('🗑️ Complete Database Clearing Script\n');

const API_BASE_URL = 'http://localhost:3000';

// Collections to clear
const FIREBASE_COLLECTIONS = [
  'questions',
  'learningCards',
  'learningPlans',
  'categories',
  'topics',
  'frontendTasks',
  'problemSolvingTasks',
  'admins',
  'users',
  'userProgress',
  'analytics',
];

const POSTGRESQL_TABLES = [
  'questions',
  'learning_cards',
  'learning_plans',
  'categories',
  'topics',
  'frontend_tasks',
  'problem_solving_tasks',
  'users',
  'user_progress',
  'analytics',
];

async function clearFirebaseCollection(collectionName) {
  try {
    console.log(`🔥 Clearing Firebase collection: ${collectionName}`);

    // Get all documents in the collection
    const response = await fetch(`${API_BASE_URL}/api/admin/clear-collection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: collectionName,
        database: 'firebase',
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `✅ Cleared Firebase ${collectionName}: ${result.deletedCount || 'unknown'} documents`
      );
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to clear Firebase ${collectionName}: ${error}`);
      return false;
    }
  } catch (error) {
    console.log(
      `❌ Error clearing Firebase ${collectionName}: ${error.message}`
    );
    return false;
  }
}

async function clearPostgreSQLTable(tableName) {
  try {
    console.log(`🐘 Clearing PostgreSQL table: ${tableName}`);

    const response = await fetch(`${API_BASE_URL}/api/admin/clear-table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        table: tableName,
        database: 'postgresql',
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `✅ Cleared PostgreSQL ${tableName}: ${result.deletedCount || 'unknown'} rows`
      );
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to clear PostgreSQL ${tableName}: ${error}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error clearing PostgreSQL ${tableName}: ${error.message}`);
    return false;
  }
}

async function clearFirebaseCollections() {
  console.log('🔥 Clearing Firebase Firestore Collections...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const collection of FIREBASE_COLLECTIONS) {
    const success = await clearFirebaseCollection(collection);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  console.log(`\n📊 Firebase Clearing Summary:`);
  console.log(`✅ Successfully cleared: ${successCount} collections`);
  console.log(`❌ Failed to clear: ${errorCount} collections`);

  return successCount;
}

async function clearPostgreSQLTables() {
  console.log('\n🐘 Clearing PostgreSQL Tables...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const table of POSTGRESQL_TABLES) {
    const success = await clearPostgreSQLTable(table);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  console.log(`\n📊 PostgreSQL Clearing Summary:`);
  console.log(`✅ Successfully cleared: ${successCount} tables`);
  console.log(`❌ Failed to clear: ${errorCount} tables`);

  return successCount;
}

async function verifyClearing() {
  console.log('\n🧪 Verifying Database Clearing...\n');

  // Check Firebase
  console.log('🔥 Checking Firebase collections:');
  for (const collection of FIREBASE_COLLECTIONS) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/count-collection?collection=${collection}&database=firebase`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(`   ${collection}: ${data.count} documents`);
      } else {
        console.log(`   ${collection}: Error checking count`);
      }
    } catch (error) {
      console.log(`   ${collection}: Error - ${error.message}`);
    }
  }

  // Check PostgreSQL
  console.log('\n🐘 Checking PostgreSQL tables:');
  for (const table of POSTGRESQL_TABLES) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/count-table?table=${table}&database=postgresql`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(`   ${table}: ${data.count} rows`);
      } else {
        console.log(`   ${table}: Error checking count`);
      }
    } catch (error) {
      console.log(`   ${table}: Error - ${error.message}`);
    }
  }
}

async function main() {
  try {
    console.log('🗑️ Complete Database Clearing Plan:');
    console.log('1. Clear Firebase Firestore collections');
    console.log('2. Clear PostgreSQL tables');
    console.log('3. Verify all data is cleared');
    console.log('4. Ready for fresh seeding\n');

    // Step 1: Clear Firebase
    const firebaseCleared = await clearFirebaseCollections();

    // Step 2: Clear PostgreSQL
    const postgresCleared = await clearPostgreSQLTables();

    // Step 3: Verify
    await verifyClearing();

    console.log('\n🎉 Database Clearing Complete!');
    console.log(`🔥 Firebase: ${firebaseCleared} collections cleared`);
    console.log(`🐘 PostgreSQL: ${postgresCleared} tables cleared`);

    console.log('\n🚀 Ready for Fresh Seeding!');
    console.log('Next steps:');
    console.log('1. Seed categories and topics');
    console.log('2. Seed the 5 learning cards');
    console.log('3. Seed questions for each category');
    console.log('4. Seed learning plans');
    console.log('5. Verify complete system');
  } catch (error) {
    console.error('❌ Error during database clearing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
