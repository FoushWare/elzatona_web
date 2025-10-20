#!/usr/bin/env node

/**
 * Check Supabase Table Schemas
 * Inspects the actual table schemas to understand column names
 */

import 'dotenv/config';

// Import Supabase client directly
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

async function inspectTableSchema(tableName) {
  console.log(`\n🔍 Inspecting ${tableName} table schema...`);

  try {
    // Try to get one record to see the actual structure
    const { data, error } = await supabase.from(tableName).select('*').limit(1);

    if (error) {
      console.log(`  ❌ Error: ${error.message}`);
      return;
    }

    if (data && data.length > 0) {
      console.log(`  📋 Columns found:`);
      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        console.log(`    - ${col}: ${typeof data[0][col]} (${data[0][col]})`);
      });
    } else {
      console.log(
        `  📋 Table is empty, trying to insert minimal data to see schema...`
      );

      // Try minimal insert to see what columns are expected
      const minimalData = getMinimalDataForTable(tableName);
      if (minimalData) {
        const { data: insertData, error: insertError } = await supabase
          .from(tableName)
          .insert(minimalData)
          .select()
          .single();

        if (insertError) {
          console.log(`  ❌ Insert error: ${insertError.message}`);
        } else {
          console.log(`  ✅ Insert successful! Columns:`);
          const columns = Object.keys(insertData);
          columns.forEach(col => {
            console.log(
              `    - ${col}: ${typeof insertData[col]} (${insertData[col]})`
            );
          });

          // Clean up
          await supabase.from(tableName).delete().eq('id', insertData.id);
        }
      }
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
}

function getMinimalDataForTable(tableName) {
  switch (tableName) {
    case 'categories':
      return {
        name: 'Schema Test Category',
        description: 'Test',
        slug: 'schema-test-' + Date.now(),
        card_type: 'test',
        color: '#3B82F6',
        icon: '🧪',
        order_index: 1,
        is_active: true,
      };
    case 'topics':
      return {
        name: 'Schema Test Topic',
        description: 'Test',
        slug: 'schema-test-' + Date.now(),
        category_id: 'a97a56a1-a7dd-4c97-b180-ed936c58d32d', // Use existing category ID
        order_index: 1,
        is_active: true,
      };
    case 'learning_cards':
      return {
        title: 'Schema Test Card',
        type: 'core-technologies', // Use valid type
        description: 'Test',
        color: '#3B82F6',
        icon: '🧪',
        order_index: 1,
        is_active: true,
      };
    case 'questions':
      return {
        question: 'Schema test question?', // Try 'question' instead of 'question_text'
        explanation: 'Test',
        topic_id: 'd8739a66-8edd-482b-bf93-181ab41837f2', // Use existing topic ID
        difficulty: 'easy',
        question_type: 'multiple_choice',
        correct_answer: 'a',
        is_active: true,
      };
    default:
      return null;
  }
}

async function main() {
  console.log('🔍 Supabase Table Schema Inspector...\n');

  const tables = ['categories', 'topics', 'learning_cards', 'questions'];

  for (const table of tables) {
    await inspectTableSchema(table);
  }

  console.log('\n🎉 Schema inspection complete!');
}

main();
