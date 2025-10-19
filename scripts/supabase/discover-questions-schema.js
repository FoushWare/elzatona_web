#!/usr/bin/env node

/**
 * Get Questions Table Schema
 * Uses a different approach to discover the actual schema
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

async function getQuestionsSchema() {
  console.log('🔍 Getting questions table schema...\n');

  try {
    // Try to select all columns
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (error) {
      console.log(`❌ Error selecting from questions: ${error.message}`);
      return;
    }

    if (data && data.length > 0) {
      console.log('✅ Questions table schema:');
      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        const value = data[0][col];
        console.log(`  - ${col}: ${typeof value} (${value})`);
      });
    } else {
      console.log(
        '📋 Questions table is empty, trying to insert minimal data...'
      );

      // Try the most basic insert possible
      const basicData = {
        id: '00000000-0000-0000-0000-000000000000', // Dummy UUID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: insertData, error: insertError } = await supabase
        .from('questions')
        .insert(basicData)
        .select()
        .single();

      if (insertError) {
        console.log(`❌ Basic insert failed: ${insertError.message}`);

        // Try with even more basic data
        const minimalData = {};
        const { data: minimalInsertData, error: minimalError } = await supabase
          .from('questions')
          .insert(minimalData)
          .select()
          .single();

        if (minimalError) {
          console.log(`❌ Minimal insert failed: ${minimalError.message}`);
        } else {
          console.log('✅ Minimal insert successful!');
          console.log('📋 Columns:');
          Object.keys(minimalInsertData).forEach(col => {
            console.log(
              `  - ${col}: ${typeof minimalInsertData[col]} (${minimalInsertData[col]})`
            );
          });

          // Clean up
          await supabase
            .from('questions')
            .delete()
            .eq('id', minimalInsertData.id);
        }
      } else {
        console.log('✅ Basic insert successful!');
        console.log('📋 Columns:');
        Object.keys(insertData).forEach(col => {
          console.log(
            `  - ${col}: ${typeof insertData[col]} (${insertData[col]})`
          );
        });

        // Clean up
        await supabase.from('questions').delete().eq('id', insertData.id);
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function testMinimalQuestionInsert() {
  console.log('\n🧪 Testing minimal question insert...\n');

  // Try with just the most basic fields that might exist
  const testData = {
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
      console.log(`❌ Minimal insert failed: ${error.message}`);
    } else {
      console.log('✅ Minimal insert successful!');
      console.log('📋 Actual columns:');
      Object.keys(data).forEach(col => {
        console.log(`  - ${col}: ${typeof data[col]} (${data[col]})`);
      });

      // Clean up
      await supabase.from('questions').delete().eq('id', data.id);
      console.log('🗑️ Cleaned up test record');
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('🔍 Questions Table Schema Discovery...\n');

  await getQuestionsSchema();
  await testMinimalQuestionInsert();

  console.log('\n🎉 Schema discovery complete!');
}

main();
