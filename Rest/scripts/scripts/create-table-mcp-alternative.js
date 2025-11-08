#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Creating Questions Table via Supabase REST API\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createQuestionsTable() {
  console.log('🔄 Creating questions table...\n');

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS questions (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      content TEXT NOT NULL,
      type VARCHAR(50) CHECK (type IN ('open-ended', 'multiple-choice', 'true-false', 'code-completion', 'debugging')),
      category VARCHAR(100),
      subcategory VARCHAR(100),
      topic VARCHAR(100),
      difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
      learning_card_id VARCHAR(50),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_by VARCHAR(100) DEFAULT 'system',
      updated_by VARCHAR(100) DEFAULT 'system',
      tags TEXT[],
      explanation TEXT,
      points INTEGER DEFAULT 1,
      time_limit INTEGER DEFAULT 120,
      sample_answers TEXT[],
      options JSONB,
      correct_answer TEXT,
      hints TEXT[],
      related_links TEXT[]
    );

    ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

    CREATE POLICY IF NOT EXISTS "Service role can manage questions" ON questions FOR ALL USING (
      auth.role() = 'service_role'
    );

    CREATE POLICY IF NOT EXISTS "Public can read questions" ON questions FOR SELECT USING (true);
  `;

  try {
    // Method 1: Try using Supabase client's RPC
    console.log('🔄 Method 1: Trying Supabase client RPC...');
    const { error: rpcError } = await supabase.rpc('exec', {
      sql: createTableSQL,
    });

    if (!rpcError) {
      console.log('✅ Questions table created successfully via RPC!');
      return true;
    }

    console.log('⚠️  RPC failed:', rpcError.message);

    // Method 2: Try direct REST API call
    console.log('🔄 Method 2: Trying direct REST API...');
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        apikey: supabaseServiceRoleKey,
      },
      body: JSON.stringify({ sql: createTableSQL }),
    });

    if (response.ok) {
      console.log('✅ Questions table created successfully via REST API!');
      return true;
    } else {
      const errorText = await response.text();
      console.log('⚠️  REST API failed:', errorText);
    }

    // Method 3: Try using the SQL Editor endpoint
    console.log('🔄 Method 3: Trying SQL Editor endpoint...');
    const sqlResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        apikey: supabaseServiceRoleKey,
      },
      body: JSON.stringify({ query: createTableSQL }),
    });

    if (sqlResponse.ok) {
      console.log('✅ Questions table created successfully via SQL endpoint!');
      return true;
    } else {
      const errorText = await sqlResponse.text();
      console.log('⚠️  SQL endpoint failed:', errorText);
    }

    // Method 4: Try using the management API
    console.log('🔄 Method 4: Trying Management API...');
    const mgmtResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        apikey: supabaseServiceRoleKey,
      },
      body: JSON.stringify({ sql: createTableSQL }),
    });

    if (mgmtResponse.ok) {
      console.log(
        '✅ Questions table created successfully via Management API!'
      );
      return true;
    } else {
      const errorText = await mgmtResponse.text();
      console.log('⚠️  Management API failed:', errorText);
    }

    console.log('\n❌ All programmatic methods failed.');
    console.log('📝 Please create the table manually in Supabase SQL Editor');
    return false;
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('📝 Please create the table manually in Supabase SQL Editor');
    return false;
  }
}

async function verifyTableExists() {
  console.log('🔄 Verifying table exists...\n');

  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        console.log('❌ Questions table does not exist');
        return false;
      } else {
        console.log('⚠️  Error checking table:', error.message);
        return false;
      }
    }

    console.log('✅ Questions table exists and is accessible!');
    return true;
  } catch (error) {
    console.error('❌ Error verifying table:', error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Starting Questions Table Creation...\n');

    // First check if table already exists
    const tableExists = await verifyTableExists();
    if (tableExists) {
      console.log('✅ Questions table already exists!');
      console.log('\n🎯 Next step: Run the seeding script');
      console.log('   node scripts/seed-questions-data-only.js');
      return;
    }

    // Try to create the table
    const tableCreated = await createQuestionsTable();

    if (tableCreated) {
      console.log('\n🎉 Questions table created successfully!');
      console.log('\n🎯 Next step: Run the seeding script');
      console.log('   node scripts/seed-questions-data-only.js');
    } else {
      console.log('\n📋 Manual Steps Required:');
      console.log('   1. Go to your Supabase Dashboard');
      console.log('   2. Navigate to SQL Editor');
      console.log(
        '   3. Copy and paste the SQL from scripts/create-questions-table.js'
      );
      console.log('   4. Click "Run" to execute');
      console.log('   5. Then run: node scripts/seed-questions-data-only.js');
    }
  } catch (error) {
    console.error('❌ Process failed:', error.message);
  }
}

// Run the process
main();
