#!/usr/bin/env node

/**
 * Supabase Schema Verification Script
 *
 * This script verifies that all tables were created successfully
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const expectedTables = [
  'learning_cards',
  'categories',
  'topics',
  'questions',
  'learning_plans',
  'plan_cards',
  'user_progress',
  'question_attempts',
];

async function verifySchema() {
  console.log('🔍 Verifying Supabase Schema Creation...');
  console.log('=====================================');

  let allTablesExist = true;

  for (const tableName of expectedTables) {
    try {
      console.log(`\n🔍 Checking table: ${tableName}`);

      // Try to query the table (this will fail if table doesn't exist)
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Table ${tableName}: ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`✅ Table ${tableName}: Exists and accessible`);
      }
    } catch (err) {
      console.log(`❌ Table ${tableName}: ${err.message}`);
      allTablesExist = false;
    }
  }

  console.log('\n📊 Verification Summary:');
  console.log('========================');

  if (allTablesExist) {
    console.log('🎉 All tables created successfully!');
    console.log('\n✅ Schema verification passed');
    console.log('🚀 Ready to proceed with data migration');
    console.log('\nNext steps:');
    console.log('1. Run: node scripts/migrate-firebase-to-supabase.js');
    console.log('2. Update API endpoints to use Supabase');
    console.log('3. Test the new relational structure');
  } else {
    console.log('❌ Some tables are missing or inaccessible');
    console.log('\n⚠️ Please check:');
    console.log('1. Schema was executed completely in Supabase dashboard');
    console.log('2. No errors occurred during execution');
    console.log('3. You have proper permissions on the project');
    console.log('\n💡 Try running the schema again or check the Supabase logs');
  }
}

async function testBasicOperations() {
  if (!allTablesExist) return;

  console.log('\n🧪 Testing Basic Operations...');
  console.log('===============================');

  try {
    // Test inserting a learning card
    console.log('\n🔍 Testing learning_cards insert...');
    const { data: cardData, error: cardError } = await supabase
      .from('learning_cards')
      .insert({
        title: 'Test Card',
        type: 'core-technologies',
        description: 'Test description',
      })
      .select();

    if (cardError) {
      console.log(`❌ Insert test failed: ${cardError.message}`);
    } else {
      console.log(`✅ Insert test passed: ${cardData[0].id}`);

      // Clean up test data
      await supabase.from('learning_cards').delete().eq('id', cardData[0].id);
      console.log('🧹 Test data cleaned up');
    }
  } catch (err) {
    console.log(`❌ Operation test failed: ${err.message}`);
  }
}

async function main() {
  try {
    await verifySchema();
    await testBasicOperations();
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

main();
