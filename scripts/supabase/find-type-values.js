#!/usr/bin/env node

/**
 * Find Correct Type Values
 * Tests different type values to find the correct ones
 */

import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testTypeValues() {
  console.log('🧪 Testing type values...\n');

  const baseData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    is_active: true,
  };

  const typeValues = [
    'multiple_choice',
    'single_choice',
    'multiple-choice',
    'single-choice',
    'choice',
    'text',
    'textarea',
    'short_answer',
    'long_answer',
    'boolean',
    'true_false',
    'open_ended',
    'coding',
    'practical',
    'theory',
    'mcq',
    'saq',
    'laq',
    'tf',
    'oe',
  ];

  for (const type of typeValues) {
    console.log(`🧪 Testing type: "${type}"`);

    try {
      const testData = {
        ...baseData,
        type: type,
      };

      const { data, error } = await supabase
        .from('questions')
        .insert(testData)
        .select()
        .single();

      if (error) {
        console.log(`  ❌ "${type}": ${error.message}`);
      } else {
        console.log(`  ✅ "${type}": SUCCESS!`);
        console.log(`  📋 Columns: ${Object.keys(data).join(', ')}`);

        // Clean up
        await supabase.from('questions').delete().eq('id', data.id);
        console.log(`  🗑️ Cleaned up test record`);

        return { type, data };
      }
    } catch (error) {
      console.log(`  ❌ "${type}": ${error.message}`);
    }
  }

  return null;
}

async function testWithoutType() {
  console.log('\n🧪 Testing without type field...\n');

  const testData = {
    title: 'Test question?',
    content: 'Test question?',
    explanation: 'Test explanation',
    is_active: true,
  };

  try {
    console.log('📝 Inserting question without type field...');
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      return null;
    }

    console.log('✅ Insert without type field successful!');
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
  console.log('🔍 Finding Correct Type Values...\n');

  const typeResult = await testTypeValues();
  const noTypeResult = await testWithoutType();

  console.log('\n📊 Results Summary:');
  console.log(`✅ Type field: ${typeResult ? 'SUCCESS' : 'FAILED'}`);
  console.log(`✅ Without type field: ${noTypeResult ? 'SUCCESS' : 'FAILED'}`);

  if (typeResult) {
    console.log(`\n🎉 Found correct type value: "${typeResult.type}"`);
  }

  if (noTypeResult) {
    console.log('\n📋 Complete schema discovered:');
    Object.keys(noTypeResult).forEach(col => {
      console.log(
        `  - ${col}: ${typeof noTypeResult[col]} (${noTypeResult[col]})`
      );
    });
  }
}

main();
