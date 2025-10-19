#!/usr/bin/env node

/**
 * Find Correct Difficulty Values with Correct Type
 * Tests different difficulty values with the correct type
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

async function testDifficultyValues() {
  console.log('🧪 Testing difficulty values with correct type...\n');

  const baseData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    type: 'multiple-choice',
    is_active: true,
  };

  const difficultyValues = [
    'easy',
    'medium',
    'hard',
    'beginner',
    'intermediate',
    'advanced',
    'basic',
    'simple',
    'complex',
    '1',
    '2',
    '3',
    'low',
    'high',
    'normal',
    'EASY',
    'MEDIUM',
    'HARD',
    'Easy',
    'Medium',
    'Hard',
  ];

  for (const difficulty of difficultyValues) {
    console.log(`🧪 Testing difficulty: "${difficulty}"`);

    try {
      const testData = {
        ...baseData,
        difficulty: difficulty,
      };

      const { data, error } = await supabase
        .from('questions')
        .insert(testData)
        .select()
        .single();

      if (error) {
        console.log(`  ❌ "${difficulty}": ${error.message}`);
      } else {
        console.log(`  ✅ "${difficulty}": SUCCESS!`);
        console.log(`  📋 Columns: ${Object.keys(data).join(', ')}`);

        // Clean up
        await supabase.from('questions').delete().eq('id', data.id);
        console.log(`  🗑️ Cleaned up test record`);

        return { difficulty, data };
      }
    } catch (error) {
      console.log(`  ❌ "${difficulty}": ${error.message}`);
    }
  }

  return null;
}

async function testWithoutDifficulty() {
  console.log('\n🧪 Testing without difficulty field...\n');

  const testData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    type: 'multiple-choice',
    is_active: true,
  };

  try {
    console.log('📝 Inserting question without difficulty field...');
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      return null;
    }

    console.log('✅ Insert without difficulty field successful!');
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
  console.log('🔍 Finding Correct Difficulty Values with Correct Type...\n');

  const difficultyResult = await testDifficultyValues();
  const noDifficultyResult = await testWithoutDifficulty();

  console.log('\n📊 Results Summary:');
  console.log(
    `✅ Difficulty field: ${difficultyResult ? 'SUCCESS' : 'FAILED'}`
  );
  console.log(
    `✅ Without difficulty field: ${noDifficultyResult ? 'SUCCESS' : 'FAILED'}`
  );

  if (difficultyResult) {
    console.log(
      `\n🎉 Found correct difficulty value: "${difficultyResult.difficulty}"`
    );
  }

  if (noDifficultyResult) {
    console.log('\n📋 Complete schema discovered:');
    Object.keys(noDifficultyResult).forEach(col => {
      console.log(
        `  - ${col}: ${typeof noDifficultyResult[col]} (${noDifficultyResult[col]})`
      );
    });
  }
}

main();
