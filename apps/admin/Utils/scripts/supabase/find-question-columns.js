#!/usr/bin/env node

/**
 * Find Questions Table Column Names
 * Tests different column names to find the correct schema
 */

import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testQuestionColumnNames() {
  console.log('🔍 Testing different question column names...\n');

  const testData = {
    explanation: 'Test explanation',
    topic_id: 'd8739a66-8edd-482b-bf93-181ab41837f2', // Use existing topic ID
    difficulty: 'easy',
    question_type: 'multiple_choice',
    correct_answer: 'a',
    is_active: true,
  };

  const columnVariations = [
    'question',
    'question_text',
    'content',
    'text',
    'title',
    'prompt',
    'query',
  ];

  for (const columnName of columnVariations) {
    console.log(`🧪 Testing column: ${columnName}`);

    try {
      const testPayload = {
        ...testData,
        [columnName]: 'Test question?',
      };

      const { data, error } = await supabase
        .from('questions')
        .insert(testPayload)
        .select()
        .single();

      if (error) {
        console.log(`  ❌ ${columnName}: ${error.message}`);
      } else {
        console.log(`  ✅ ${columnName}: SUCCESS! (ID: ${data.id})`);

        // Clean up
        await supabase.from('questions').delete().eq('id', data.id);
        console.log(`  🗑️ Cleaned up test record`);

        return columnName; // Found the correct column name
      }
    } catch (error) {
      console.log(`  ❌ ${columnName}: ${error.message}`);
    }
  }

  return null;
}

async function testAllQuestionFields() {
  console.log('\n🔍 Testing all possible question fields...\n');

  const allPossibleFields = {
    question: 'Test question?',
    question_text: 'Test question?',
    content: 'Test question?',
    text: 'Test question?',
    title: 'Test question?',
    prompt: 'Test question?',
    query: 'Test question?',
    explanation: 'Test explanation',
    topic_id: 'd8739a66-8edd-482b-bf93-181ab41837f2',
    difficulty: 'easy',
    question_type: 'multiple_choice',
    correct_answer: 'a',
    is_active: true,
  };

  try {
    const { data, error } = await supabase
      .from('questions')
      .insert(allPossibleFields)
      .select()
      .single();

    if (error) {
      console.log(`❌ All fields test failed: ${error.message}`);
    } else {
      console.log(`✅ All fields test SUCCESS! (ID: ${data.id})`);
      console.log('📋 Actual columns in questions table:');
      Object.keys(data).forEach(col => {
        console.log(`  - ${col}: ${typeof data[col]} (${data[col]})`);
      });

      // Clean up
      await supabase.from('questions').delete().eq('id', data.id);
      console.log('🗑️ Cleaned up test record');
    }
  } catch (error) {
    console.log(`❌ All fields test error: ${error.message}`);
  }
}

async function main() {
  console.log('🔍 Questions Table Column Name Finder...\n');

  // Test individual column names
  const correctColumn = await testQuestionColumnNames();

  if (correctColumn) {
    console.log(`\n🎉 Found correct column name: ${correctColumn}`);
  } else {
    console.log('\n⚠️ Individual tests failed, trying all fields...');
    await testAllQuestionFields();
  }

  console.log('\n🎉 Column name finding complete!');
}

main();
