#!/usr/bin/env node

/**
 * Find Topic Relationship Column
 * Tests different variations for the topic relationship field
 */

import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.process.env.SUPABASE_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testTopicFieldVariations() {
  console.log('🧪 Testing topic field variations...\n');

  const baseData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    difficulty: 'easy',
    type: 'multiple_choice',
    is_active: true,
  };

  const topicFieldVariations = [
    'topic_id',
    'topicId',
    'topic',
    'category_id',
    'categoryId',
    'category',
    'subject_id',
    'subjectId',
    'subject',
    'learning_card_id',
    'learningCardId',
    'learningCard',
    'card_id',
    'cardId',
    'card',
  ];

  for (const topicField of topicFieldVariations) {
    console.log(`🧪 Testing ${topicField} field...`);

    try {
      const testData = {
        ...baseData,
        [topicField]: 'd8739a66-8edd-482b-bf93-181ab41837f2', // Use existing topic ID
      };

      const { data, error } = await supabase
        .from('questions')
        .insert(testData)
        .select()
        .single();

      if (error) {
        console.log(`  ❌ ${topicField}: ${error.message}`);
      } else {
        console.log(`  ✅ ${topicField}: SUCCESS!`);
        console.log(`  📋 Columns: ${Object.keys(data).join(', ')}`);

        // Clean up
        await supabase.from('questions').delete().eq('id', data.id);
        console.log(`  🗑️ Cleaned up test record`);

        return { field: topicField, data };
      }
    } catch (error) {
      console.log(`  ❌ ${topicField}: ${error.message}`);
    }
  }

  return null;
}

async function testWithoutTopicField() {
  console.log('\n🧪 Testing without topic field...\n');

  const testData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    difficulty: 'easy',
    type: 'multiple_choice',
    is_active: true,
  };

  try {
    console.log('📝 Inserting question without topic field...');
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      return null;
    }

    console.log('✅ Insert without topic field successful!');
    console.log('📋 Columns:');
    Object.keys(data).forEach(col => {
      console.log(`  - ${col}: ${typeof data[col]} (${data[col]})`);
    });

    // Clean up
    await supabase.from('questions').delete().eq('id', data.id);
    console.log('🗑️ Cleaned up test record');

    return data;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Finding Topic Relationship Column...\n');

  const topicResult = await testTopicFieldVariations();
  const noTopicResult = await testWithoutTopicField();

  console.log('\n📊 Results Summary:');
  console.log(`✅ Topic field: ${topicResult ? 'SUCCESS' : 'FAILED'}`);
  console.log(
    `✅ Without topic field: ${noTopicResult ? 'SUCCESS' : 'FAILED'}`
  );

  if (topicResult) {
    console.log(`\n🎉 Found correct topic field: ${topicResult.field}`);
  }

  if (noTopicResult) {
    console.log('\n📋 Complete schema discovered:');
    Object.keys(noTopicResult).forEach(col => {
      console.log(
        `  - ${col}: ${typeof noTopicResult[col]} (${noTopicResult[col]})`
      );
    });
  }
}

main();
