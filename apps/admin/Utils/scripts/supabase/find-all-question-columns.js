#!/usr/bin/env node

/**
 * Find All Question Column Names
 * Tests different variations to find all correct column names
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

async function testMinimalQuestion() {
  console.log('🧪 Testing minimal question with only required fields...\n');

  // Start with just the title (we know this exists)
  const minimalData = {
    title: 'Test question?',
  };

  try {
    const { data, error } = await supabase
      .from('questions')
      .insert(minimalData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Minimal insert failed: ${error.message}`);
      return null;
    }

    console.log('✅ Minimal insert successful!');
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

async function testWithAdditionalFields() {
  console.log('\n🧪 Testing with additional fields...\n');

  const testData = {
    title: 'Test question?',
    explanation: 'Test explanation',
    difficulty: 'easy',
    is_active: true,
  };

  try {
    const { data, error } = await supabase
      .from('questions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.log(`❌ Additional fields insert failed: ${error.message}`);
      return null;
    }

    console.log('✅ Additional fields insert successful!');
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

async function testWithTypeVariations() {
  console.log('\n🧪 Testing type field variations...\n');

  const baseData = {
    title: 'Test question?',
    explanation: 'Test explanation',
    difficulty: 'easy',
    is_active: true,
  };

  const typeVariations = [
    'type',
    'question_type',
    'questionType',
    'questionType',
    'kind',
    'category',
    'format',
  ];

  for (const typeField of typeVariations) {
    console.log(`🧪 Testing ${typeField} field...`);

    try {
      const testData = {
        ...baseData,
        [typeField]: 'multiple_choice',
      };

      const { data, error } = await supabase
        .from('questions')
        .insert(testData)
        .select()
        .single();

      if (error) {
        console.log(`  ❌ ${typeField}: ${error.message}`);
      } else {
        console.log(`  ✅ ${typeField}: SUCCESS!`);
        console.log(`  📋 Columns: ${Object.keys(data).join(', ')}`);

        // Clean up
        await supabase.from('questions').delete().eq('id', data.id);
        console.log(`  🗑️ Cleaned up test record`);

        return { field: typeField, data };
      }
    } catch (error) {
      console.log(`  ❌ ${typeField}: ${error.message}`);
    }
  }

  return null;
}

async function main() {
  console.log('🔍 Finding All Question Column Names...\n');

  const minimalResult = await testMinimalQuestion();
  if (!minimalResult) {
    console.log('❌ Could not create minimal question');
    return;
  }

  const additionalResult = await testWithAdditionalFields();
  if (!additionalResult) {
    console.log('❌ Could not create question with additional fields');
    return;
  }

  const typeResult = await testWithTypeVariations();

  console.log('\n📊 Results Summary:');
  console.log('✅ Minimal question: SUCCESS');
  console.log('✅ Additional fields: SUCCESS');
  console.log(`✅ Type field: ${typeResult ? 'SUCCESS' : 'FAILED'}`);

  if (typeResult) {
    console.log(`\n🎉 Found correct type field: ${typeResult.field}`);
  }

  console.log('\n📋 Complete schema discovered:');
  Object.keys(additionalResult).forEach(col => {
    console.log(
      `  - ${col}: ${typeof additionalResult[col]} (${additionalResult[col]})`
    );
  });
}

main();
