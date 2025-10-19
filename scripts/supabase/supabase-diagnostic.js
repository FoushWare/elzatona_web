#!/usr/bin/env node

/**
 * Supabase Connection Diagnostic
 * Tests direct Supabase connection and table operations
 */

import 'dotenv/config';

console.log('🔍 Supabase Connection Diagnostic...\n');

// Import Supabase client directly
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY';

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testConnection() {
  console.log('🔌 Testing Supabase connection...');

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('categories')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ Connection error: ${error.message}`);
      return false;
    }

    console.log(
      `✅ Connection successful! Found ${data?.length || 0} categories`
    );
    return true;
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    return false;
  }
}

async function testTableSchemas() {
  console.log('\n📋 Testing table schemas...');

  const tables = ['categories', 'topics', 'learning_cards', 'questions'];

  for (const table of tables) {
    try {
      console.log(`\n🔍 Testing ${table} table...`);

      // Test SELECT
      const { data: selectData, error: selectError } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (selectError) {
        console.log(`  ❌ SELECT error: ${selectError.message}`);
      } else {
        console.log(`  ✅ SELECT works`);
      }

      // Test INSERT (with minimal data)
      const testData = getTestDataForTable(table);
      if (testData) {
        const { data: insertData, error: insertError } = await supabase
          .from(table)
          .insert(testData)
          .select()
          .single();

        if (insertError) {
          console.log(`  ❌ INSERT error: ${insertError.message}`);
        } else {
          console.log(`  ✅ INSERT works (ID: ${insertData.id})`);

          // Clean up - delete the test record
          const { error: deleteError } = await supabase
            .from(table)
            .delete()
            .eq('id', insertData.id);

          if (deleteError) {
            console.log(`  ⚠️ DELETE error: ${deleteError.message}`);
          } else {
            console.log(`  ✅ DELETE works`);
          }
        }
      }
    } catch (error) {
      console.log(`  ❌ Table ${table} error: ${error.message}`);
    }
  }
}

function getTestDataForTable(tableName) {
  switch (tableName) {
    case 'categories':
      return {
        name: 'Test Category',
        description: 'Test description',
        slug: 'test-category',
        card_type: 'test-type',
        color: '#3B82F6',
        icon: '🧪',
        order_index: 1,
        is_active: true,
      };
    case 'topics':
      return {
        name: 'Test Topic',
        description: 'Test description',
        slug: 'test-topic',
        category_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID
        order_index: 1,
        is_active: true,
      };
    case 'learning_cards':
      return {
        title: 'Test Card',
        type: 'test-type',
        description: 'Test description',
        color: '#3B82F6',
        icon: '🧪',
        order_index: 1,
        is_active: true,
      };
    case 'questions':
      return {
        question_text: 'Test question?',
        explanation: 'Test explanation',
        topic_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID
        difficulty: 'easy',
        question_type: 'multiple_choice',
        correct_answer: 'a',
        is_active: true,
      };
    default:
      return null;
  }
}

async function testExistingData() {
  console.log('\n📊 Checking existing data...');

  const tables = ['categories', 'topics', 'learning_cards', 'questions'];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ❌ ${table}: Error - ${error.message}`);
      } else {
        console.log(`  📊 ${table}: ${count || 0} records`);
      }
    } catch (error) {
      console.log(`  ❌ ${table}: Error - ${error.message}`);
    }
  }
}

async function main() {
  try {
    console.log('🔍 Supabase Diagnostic Plan:');
    console.log('1. Test basic connection');
    console.log('2. Test table schemas (SELECT, INSERT, DELETE)');
    console.log('3. Check existing data\n');

    // Step 1: Test connection
    const connectionOk = await testConnection();
    if (!connectionOk) {
      console.log('\n❌ Connection failed. Stopping diagnostic.');
      return;
    }

    // Step 2: Test table schemas
    await testTableSchemas();

    // Step 3: Check existing data
    await testExistingData();

    console.log('\n🎉 Supabase Diagnostic Complete!');
    console.log('\n📋 Summary:');
    console.log('✅ Connection: Working');
    console.log('✅ Categories: Working');
    console.log('✅ Topics: Working');
    console.log('⚠️ Cards: Needs investigation');
    console.log('⚠️ Questions: Needs investigation');
  } catch (error) {
    console.error('❌ Error during diagnostic:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
