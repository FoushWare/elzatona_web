#!/usr/bin/env node

/**
 * Comprehensive Supabase Testing Script
 *
 * This script tests the schema creation and basic operations
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

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...');
  console.log('==================================');
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Project Ref: ${supabaseUrl.split('//')[1].split('.')[0]}`);

  try {
    // Test basic connection
    const { data: _data, error } = await supabase
      .from('_supabase_migrations')
      .select('*')
      .limit(1);

    if (error) {
      console.log(
        '⚠️ Connection test failed (expected for new projects):',
        error.message
      );
    } else {
      console.log('✅ Connection successful!');
    }

    return true;
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    return false;
  }
}

async function verifySchema() {
  console.log('\n🔍 Verifying Schema Creation...');
  console.log('================================');

  let allTablesExist = true;
  const tableResults = {};

  for (const tableName of expectedTables) {
    try {
      console.log(`\n🔍 Checking table: ${tableName}`);

      // Try to query the table
      const { data: _data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Table ${tableName}: ${error.message}`);
        allTablesExist = false;
        tableResults[tableName] = false;
      } else {
        console.log(`✅ Table ${tableName}: Exists and accessible`);
        tableResults[tableName] = true;
      }
    } catch (err) {
      console.log(`❌ Table ${tableName}: ${err.message}`);
      allTablesExist = false;
      tableResults[tableName] = false;
    }
  }

  return { allTablesExist, tableResults };
}

async function testBasicOperations() {
  console.log('\n🧪 Testing Basic Operations...');
  console.log('===============================');

  const testResults = {
    insert: false,
    select: false,
    update: false,
    delete: false,
  };

  try {
    // Test 1: Insert a learning card
    console.log('\n🔍 Testing INSERT operation...');
    const { data: insertData, error: insertError } = await supabase
      .from('learning_cards')
      .insert({
        title: 'Test Card',
        type: 'core-technologies',
        description: 'Test description for schema verification',
      })
      .select();

    if (insertError) {
      console.log(`❌ INSERT test failed: ${insertError.message}`);
    } else {
      console.log(`✅ INSERT test passed: ${insertData[0].id}`);
      testResults.insert = true;

      const testCardId = insertData[0].id;

      // Test 2: Select the inserted card
      console.log('\n🔍 Testing SELECT operation...');
      const { data: selectData, error: selectError } = await supabase
        .from('learning_cards')
        .select('*')
        .eq('id', testCardId);

      if (selectError) {
        console.log(`❌ SELECT test failed: ${selectError.message}`);
      } else {
        console.log(
          `✅ SELECT test passed: Found ${selectData.length} record(s)`
        );
        testResults.select = true;
      }

      // Test 3: Update the card
      console.log('\n🔍 Testing UPDATE operation...');
      const { data: updateData, error: updateError } = await supabase
        .from('learning_cards')
        .update({ description: 'Updated test description' })
        .eq('id', testCardId)
        .select();

      if (updateError) {
        console.log(`❌ UPDATE test failed: ${updateError.message}`);
      } else {
        console.log(`✅ UPDATE test passed: ${updateData[0].id}`);
        testResults.update = true;
      }

      // Test 4: Delete the test card
      console.log('\n🔍 Testing DELETE operation...');
      const { error: deleteError } = await supabase
        .from('learning_cards')
        .delete()
        .eq('id', testCardId);

      if (deleteError) {
        console.log(`❌ DELETE test failed: ${deleteError.message}`);
      } else {
        console.log(`✅ DELETE test passed: Test card deleted`);
        testResults.delete = true;
      }
    }
  } catch (err) {
    console.log(`❌ Operation test failed: ${err.message}`);
  }

  return testResults;
}

async function testRelationships() {
  console.log('\n🔗 Testing Table Relationships...');
  console.log('===================================');

  const relationshipTests = {
    learning_cards_to_categories: false,
    categories_to_topics: false,
    topics_to_questions: false,
    learning_plans_to_plan_cards: false,
  };

  try {
    // Test learning_cards → categories relationship
    console.log('\n🔍 Testing learning_cards → categories relationship...');
    const { data: _cardData, error: cardError } = await supabase
      .from('learning_cards')
      .select(
        `
        id,
        title,
        categories (
          id,
          name,
          learning_card_id
        )
      `
      )
      .limit(1);

    if (cardError) {
      console.log(
        `❌ Cards → Categories relationship test failed: ${cardError.message}`
      );
    } else {
      console.log(`✅ Cards → Categories relationship test passed`);
      relationshipTests.learning_cards_to_categories = true;
    }

    // Test categories → topics relationship
    console.log('\n🔍 Testing categories → topics relationship...');
    const { data: _categoryData, error: categoryError } = await supabase
      .from('categories')
      .select(
        `
        id,
        name,
        topics (
          id,
          name,
          category_id
        )
      `
      )
      .limit(1);

    if (categoryError) {
      console.log(
        `❌ Categories → Topics relationship test failed: ${categoryError.message}`
      );
    } else {
      console.log(`✅ Categories → Topics relationship test passed`);
      relationshipTests.categories_to_topics = true;
    }

    // Test topics → questions relationship
    console.log('\n🔍 Testing topics → questions relationship...');
    const { data: _topicData, error: topicError } = await supabase
      .from('topics')
      .select(
        `
        id,
        name,
        questions (
          id,
          title,
          topic_id
        )
      `
      )
      .limit(1);

    if (topicError) {
      console.log(
        `❌ Topics → Questions relationship test failed: ${topicError.message}`
      );
    } else {
      console.log(`✅ Topics → Questions relationship test passed`);
      relationshipTests.topics_to_questions = true;
    }

    // Test learning_plans → plan_cards relationship
    console.log('\n🔍 Testing learning_plans → plan_cards relationship...');
    const { data: _planData, error: planError } = await supabase
      .from('learning_plans')
      .select(
        `
        id,
        name,
        plan_cards (
          id,
          plan_id,
          card_id
        )
      `
      )
      .limit(1);

    if (planError) {
      console.log(
        `❌ Plans → Plan Cards relationship test failed: ${planError.message}`
      );
    } else {
      console.log(`✅ Plans → Plan Cards relationship test passed`);
      relationshipTests.learning_plans_to_plan_cards = true;
    }
  } catch (err) {
    console.log(`❌ Relationship test failed: ${err.message}`);
  }

  return relationshipTests;
}

async function generateReport(
  schemaResults,
  operationResults,
  relationshipResults
) {
  console.log('\n📊 Comprehensive Test Report');
  console.log('=============================');

  // Schema verification
  console.log('\n🗄️ Schema Verification:');
  console.log(
    `✅ Tables Created: ${Object.values(schemaResults.tableResults).filter(Boolean).length}/8`
  );

  // Basic operations
  console.log('\n⚡ Basic Operations:');
  console.log(`✅ INSERT: ${operationResults.insert ? 'PASS' : 'FAIL'}`);
  console.log(`✅ SELECT: ${operationResults.select ? 'PASS' : 'FAIL'}`);
  console.log(`✅ UPDATE: ${operationResults.update ? 'PASS' : 'FAIL'}`);
  console.log(`✅ DELETE: ${operationResults.delete ? 'PASS' : 'FAIL'}`);

  // Relationships
  console.log('\n🔗 Table Relationships:');
  console.log(
    `✅ Cards → Categories: ${relationshipResults.learning_cards_to_categories ? 'PASS' : 'FAIL'}`
  );
  console.log(
    `✅ Categories → Topics: ${relationshipResults.categories_to_topics ? 'PASS' : 'FAIL'}`
  );
  console.log(
    `✅ Topics → Questions: ${relationshipResults.topics_to_questions ? 'PASS' : 'FAIL'}`
  );
  console.log(
    `✅ Plans → Plan Cards: ${relationshipResults.learning_plans_to_plan_cards ? 'PASS' : 'FAIL'}`
  );

  // Overall status
  const allTestsPassed =
    schemaResults.allTablesExist &&
    Object.values(operationResults).every(Boolean) &&
    Object.values(relationshipResults).every(Boolean);

  console.log('\n🎯 Overall Status:');
  if (allTestsPassed) {
    console.log('🎉 ALL TESTS PASSED! Schema is ready for data migration.');
    console.log('\n🚀 Next Steps:');
    console.log('1. Run: node scripts/migrate-firebase-to-supabase.js');
    console.log('2. Update API endpoints to use Supabase');
    console.log('3. Test the new relational structure');
  } else {
    console.log('⚠️ Some tests failed. Please check the schema creation.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify all tables were created in Supabase dashboard');
    console.log('2. Check for any error messages in SQL Editor');
    console.log('3. Ensure proper permissions on the project');
  }
}

async function main() {
  try {
    console.log('🚀 Supabase Comprehensive Testing');
    console.log('==================================');

    // Test connection
    const connectionOk = await testConnection();
    if (!connectionOk) {
      console.log(
        '❌ Connection failed. Please check your Supabase credentials.'
      );
      return;
    }

    // Verify schema
    const schemaResults = await verifySchema();

    // Test basic operations
    const operationResults = await testBasicOperations();

    // Test relationships
    const relationshipResults = await testRelationships();

    // Generate report
    await generateReport(schemaResults, operationResults, relationshipResults);
  } catch (error) {
    console.error('❌ Testing failed:', error);
  }
}

main();
