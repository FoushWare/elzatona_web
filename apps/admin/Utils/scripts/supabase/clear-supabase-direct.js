#!/usr/bin/env node

/**
 * Direct Supabase Table Clearing
 * Uses Supabase service role key to directly clear tables
 */

import 'dotenv/config';

console.log('🗑️ Direct Supabase Table Clearing...\n');

// Import Supabase client directly
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function clearTableDirect(tableName) {
  try {
    console.log(`🗑️ Clearing ${tableName} table directly...`);

    // Get count first
    const { count, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.log(
        `  ❌ Error getting count for ${tableName}: ${countError.message}`
      );
      return { deletedCount: 0, errorCount: 1 };
    }

    console.log(`  Found ${count || 0} records in ${tableName}`);

    if (count === 0) {
      console.log(`  ✅ ${tableName} is already empty`);
      return { deletedCount: 0, errorCount: 0 };
    }

    // Delete all records
    const { error } = await supabase
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (error) {
      console.log(`  ❌ Error deleting from ${tableName}: ${error.message}`);
      return { deletedCount: 0, errorCount: 1 };
    }

    console.log(
      `  ✅ Successfully cleared ${tableName} (${count} records deleted)`
    );
    return { deletedCount: count || 0, errorCount: 0 };
  } catch (error) {
    console.log(`❌ Error clearing ${tableName}: ${error.message}`);
    return { deletedCount: 0, errorCount: 1 };
  }
}

async function clearAllTablesDirect() {
  console.log('🗑️ Starting Direct Supabase Table Clearing...\n');

  // Clear in reverse dependency order
  const tables = ['questions', 'learning_cards', 'topics', 'categories'];

  let totalDeleted = 0;
  let totalErrors = 0;

  for (const table of tables) {
    const result = await clearTableDirect(table);
    totalDeleted += result.deletedCount;
    totalErrors += result.errors;
    console.log(''); // Empty line for readability
  }

  console.log('📊 Direct Clearing Summary:');
  console.log(`✅ Total records deleted: ${totalDeleted}`);
  console.log(`❌ Total errors: ${totalErrors}`);

  return { totalDeleted, totalErrors };
}

async function verifyAllClearedDirect() {
  console.log('\n🧪 Verifying All Tables Are Cleared (Direct)...\n');

  const tables = ['categories', 'topics', 'learning_cards', 'questions'];

  let allCleared = true;

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ Error verifying ${table}: ${error.message}`);
        allCleared = false;
      } else {
        const recordCount = count || 0;
        console.log(`📊 ${table}: ${recordCount} records`);

        if (recordCount > 0) {
          allCleared = false;
          console.log(`  ⚠️ ${table} still has ${recordCount} records`);
        } else {
          console.log(`  ✅ ${table} is empty`);
        }
      }
    } catch (error) {
      console.log(`❌ Error verifying ${table}: ${error.message}`);
      allCleared = false;
    }
  }

  if (allCleared) {
    console.log('\n🎉 All Supabase tables are completely cleared!');
  } else {
    console.log('\n⚠️ Some tables still have records or verification failed.');
  }

  return allCleared;
}

async function main() {
  try {
    console.log('🗑️ Direct Supabase Table Clearing Plan:');
    console.log('1. Connect directly to Supabase with service role key');
    console.log('2. Clear questions table');
    console.log('3. Clear learning_cards table');
    console.log('4. Clear topics table');
    console.log('5. Clear categories table');
    console.log('6. Verify all tables are empty\n');

    // Step 1: Clear all tables directly
    const result = await clearAllTablesDirect();

    // Step 2: Verify
    const allCleared = await verifyAllClearedDirect();

    console.log('\n🎉 Direct Supabase Table Clearing Complete!');
    console.log(`🗑️ Records deleted: ${result.totalDeleted}`);

    if (result.totalErrors === 0 && allCleared) {
      console.log('✅ Perfect! All Supabase tables cleared successfully.');
      console.log('\n🚀 Ready for fresh seeding with small test records!');
    } else {
      console.log(`⚠️ ${result.totalErrors} errors occurred during clearing.`);
      if (!allCleared) {
        console.log('⚠️ Some tables may still have records.');
      }
    }

    console.log('\n📋 Next steps:');
    console.log('1. Create 1 test category');
    console.log('2. Create 2 test topics for that category');
    console.log('3. Create 1 test card');
    console.log('4. Create 2 test questions');
    console.log('5. Test each step individually');
  } catch (error) {
    console.error('❌ Error during direct table clearing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
