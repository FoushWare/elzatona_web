#!/usr/bin/env node

/**
 * Test Questions with Correct Schema
 * Tests questions creation with the correct column names
 */

import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testQuestionWithTitle() {
  console.log('🧪 Testing question creation with correct schema...\n');

  const testData = {
    title: 'What is 2 + 2?', // Use 'title' instead of 'question'
    explanation: 'Basic arithmetic: 2 + 2 = 4',
    topic_id: 'd8739a66-8edd-482b-bf93-181ab41837f2', // Use existing topic ID
    difficulty: 'easy',
    question_type: 'multiple_choice',
    correct_answer: 'b',
    is_active: true,
  };

  try {
    console.log('📝 Inserting test question...');
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      return false;
    }

    console.log('✅ Insert successful!');
    console.log('📋 Question data:');
    Object.keys(data).forEach(col => {
      console.log(`  - ${col}: ${typeof data[col]} (${data[col]})`);
    });

    // Clean up
    await supabase.from('questions').delete().eq('id', data.id);
    console.log('🗑️ Cleaned up test record');

    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function testQuestionWithOptions() {
  console.log('\n🧪 Testing question with options...\n');

  const testData = {
    title: 'What is the capital of France?',
    explanation: 'Paris is the capital and largest city of France.',
    topic_id: 'd8739a66-8edd-482b-bf93-181ab41837f2',
    difficulty: 'easy',
    question_type: 'multiple_choice',
    options: JSON.stringify([
      { id: 'a', text: 'London', isCorrect: false },
      { id: 'b', text: 'Berlin', isCorrect: false },
      { id: 'c', text: 'Paris', isCorrect: true },
      { id: 'd', text: 'Madrid', isCorrect: false },
    ]),
    correct_answer: 'c',
    is_active: true,
  };

  try {
    console.log('📝 Inserting question with options...');
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      return false;
    }

    console.log('✅ Insert with options successful!');
    console.log('📋 Question data:');
    Object.keys(data).forEach(col => {
      console.log(`  - ${col}: ${typeof data[col]} (${data[col]})`);
    });

    // Clean up
    await supabase.from('questions').delete().eq('id', data.id);
    console.log('🗑️ Cleaned up test record');

    return true;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🧪 Testing Questions with Correct Schema...\n');

  const basicTest = await testQuestionWithTitle();
  const optionsTest = await testQuestionWithOptions();

  console.log('\n📊 Test Results:');
  console.log(`✅ Basic question: ${basicTest ? 'SUCCESS' : 'FAILED'}`);
  console.log(
    `✅ Question with options: ${optionsTest ? 'SUCCESS' : 'FAILED'}`
  );

  if (basicTest && optionsTest) {
    console.log('\n🎉 Questions schema is working!');
    console.log('📋 Correct schema:');
    console.log('  - title: string (question text)');
    console.log('  - explanation: string');
    console.log('  - topic_id: string (UUID)');
    console.log('  - difficulty: string');
    console.log('  - question_type: string');
    console.log('  - options: string (JSON)');
    console.log('  - correct_answer: string');
    console.log('  - is_active: boolean');
  } else {
    console.log('\n⚠️ Some tests failed, need more investigation');
  }
}

main();
