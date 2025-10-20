#!/usr/bin/env node

/**
 * Clear All Supabase Tables
 * Removes all records from categories, topics, cards, and questions tables
 */

import 'dotenv/config';

console.log('🗑️ Clearing All Supabase Tables...\n');

const API_BASE_URL = 'http://localhost:3000';

async function clearTable(tableName, apiEndpoint) {
  try {
    console.log(`🗑️ Clearing ${tableName}...`);

    // Get all records
    const response = await fetch(`${API_BASE_URL}${apiEndpoint}`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`  Found ${data.data.length} ${tableName} to delete`);

      let deletedCount = 0;
      let errorCount = 0;

      for (const record of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}${apiEndpoint}/${record.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
          } else {
            const error = await deleteResponse.text();
            console.log(`  ❌ Failed to delete ${record.id}: ${error}`);
            errorCount++;
          }
        } catch (error) {
          console.log(`  ❌ Error deleting ${record.id}: ${error.message}`);
          errorCount++;
        }
      }

      console.log(`  ✅ Deleted: ${deletedCount}, Errors: ${errorCount}`);
      return { deletedCount, errorCount };
    } else {
      console.log(`  No ${tableName} found to delete`);
      return { deletedCount: 0, errorCount: 0 };
    }
  } catch (error) {
    console.log(`❌ Error clearing ${tableName}: ${error.message}`);
    return { deletedCount: 0, errorCount: 1 };
  }
}

async function clearAllTables() {
  console.log('🗑️ Starting Complete Table Clearing...\n');

  const tables = [
    { name: 'questions', endpoint: '/api/questions' },
    { name: 'cards', endpoint: '/api/cards' },
    { name: 'topics', endpoint: '/api/topics' },
    { name: 'categories', endpoint: '/api/categories' },
  ];

  let totalDeleted = 0;
  let totalErrors = 0;

  // Clear in reverse dependency order (questions -> cards -> topics -> categories)
  for (const table of tables) {
    const result = await clearTable(table.name, table.endpoint);
    totalDeleted += result.deletedCount;
    totalErrors += result.errors;
    console.log(''); // Empty line for readability
  }

  console.log('📊 Complete Clearing Summary:');
  console.log(`✅ Total records deleted: ${totalDeleted}`);
  console.log(`❌ Total errors: ${totalErrors}`);

  return { totalDeleted, totalErrors };
}

async function verifyAllCleared() {
  console.log('\n🧪 Verifying All Tables Are Cleared...\n');

  const tables = [
    { name: 'categories', endpoint: '/api/categories' },
    { name: 'topics', endpoint: '/api/topics' },
    { name: 'cards', endpoint: '/api/cards' },
    { name: 'questions', endpoint: '/api/questions' },
  ];

  let allCleared = true;

  for (const table of tables) {
    try {
      const response = await fetch(`${API_BASE_URL}${table.endpoint}`);
      const data = await response.json();

      if (data.success) {
        const count = data.data?.length || 0;
        console.log(`📊 ${table.name}: ${count} records`);

        if (count > 0) {
          allCleared = false;
          console.log(`  ⚠️ ${table.name} still has ${count} records`);
        } else {
          console.log(`  ✅ ${table.name} is empty`);
        }
      } else {
        console.log(`❌ Failed to verify ${table.name}`);
        allCleared = false;
      }
    } catch (error) {
      console.log(`❌ Error verifying ${table.name}: ${error.message}`);
      allCleared = false;
    }
  }

  if (allCleared) {
    console.log('\n🎉 All tables are completely cleared!');
  } else {
    console.log('\n⚠️ Some tables still have records or verification failed.');
  }

  return allCleared;
}

async function main() {
  try {
    console.log('🗑️ Complete Supabase Table Clearing Plan:');
    console.log('1. Clear questions table');
    console.log('2. Clear cards table');
    console.log('3. Clear topics table');
    console.log('4. Clear categories table');
    console.log('5. Verify all tables are empty\n');

    // Step 1: Clear all tables
    const result = await clearAllTables();

    // Step 2: Verify
    const allCleared = await verifyAllCleared();

    console.log('\n🎉 Supabase Table Clearing Complete!');
    console.log(`🗑️ Records deleted: ${result.totalDeleted}`);

    if (result.totalErrors === 0 && allCleared) {
      console.log('✅ Perfect! All tables cleared successfully.');
      console.log('\n🚀 Ready for fresh seeding with small test records!');
    } else {
      console.log(`⚠️ ${result.totalErrors} errors occurred during clearing.`);
      if (!allCleared) {
        console.log('⚠️ Some tables may still have records.');
      }
    }

    console.log('\n📋 Next steps:');
    console.log('1. Create small test categories');
    console.log('2. Create small test topics');
    console.log('3. Create small test cards');
    console.log('4. Create small test questions');
    console.log('5. Test each step individually');
  } catch (error) {
    console.error('❌ Error during table clearing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
