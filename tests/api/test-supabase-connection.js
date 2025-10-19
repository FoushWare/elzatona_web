#!/usr/bin/env node

/**
 * Test Supabase MCP Connection
 * This script tests if the Supabase MCP is working properly
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🧪 Testing Supabase Connection...\n');

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('learning_plans')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ Tables do not exist yet.');
        console.log(
          '📝 Please create the schema first using supabase-schema.sql'
        );
        return false;
      } else {
        console.log(`❌ Connection error: ${error.message}`);
        return false;
      }
    }

    console.log('✅ Supabase connection successful!');
    console.log(`📊 Found ${data?.length || 0} learning plans`);

    // Test RLS status
    const { data: rlsTest, error: rlsError } = await supabase
      .from('learning_plans')
      .select('*')
      .limit(1);

    if (rlsError && rlsError.code === '42501') {
      console.log('🔒 RLS is enabled (this is normal)');
    } else if (rlsError) {
      console.log(`⚠️  RLS test error: ${rlsError.message}`);
    } else {
      console.log('🔓 RLS appears to be disabled');
    }

    return true;
  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
    return false;
  }
}

testConnection();
