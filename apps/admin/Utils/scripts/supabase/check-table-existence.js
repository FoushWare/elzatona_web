#!/usr/bin/env node

/**
 * List All Supabase Tables
 * Checks what tables actually exist in the database
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

async function testTableExists(tableName) {
  try {
    const { data, error } = await supabase.from(tableName).select('*').limit(1);

    if (error) {
      return { exists: false, error: error.message };
    }

    return { exists: true, data: data };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

async function main() {
  console.log('🔍 Checking what tables exist in Supabase...\n');

  const possibleTables = [
    'questions',
    'question',
    'quiz_questions',
    'learning_questions',
    'content',
    'posts',
    'items',
    'categories',
    'topics',
    'learning_cards',
    'cards',
    'learning_plans',
    'plans',
  ];

  console.log('📋 Testing table existence:');

  for (const tableName of possibleTables) {
    const result = await testTableExists(tableName);

    if (result.exists) {
      console.log(`✅ ${tableName}: EXISTS`);
      if (result.data && result.data.length > 0) {
        console.log(`   Columns: ${Object.keys(result.data[0]).join(', ')}`);
      }
    } else {
      console.log(`❌ ${tableName}: ${result.error}`);
    }
  }

  console.log('\n🎉 Table existence check complete!');
}

main();
