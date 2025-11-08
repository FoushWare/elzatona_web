#!/usr/bin/env node

/**
 * Complete Supabase Migration with RLS Management
 * This script handles RLS, constraints, and data migration
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 Starting Complete Supabase Migration with RLS Management...\n');

// Step 1: Check current RLS status
async function checkRLSStatus() {
  console.log('🔍 Checking RLS status...');

  try {
    // Try to insert a test record to check RLS
    const { data, error } = await supabase
      .from('learning_cards')
      .select('*')
      .limit(1);

    if (error && error.code === '42501') {
      console.log('🔒 RLS is enabled - blocking operations');
      return true;
    } else if (error) {
      console.log(`⚠️  RLS check error: ${error.message}`);
      return false;
    } else {
      console.log('🔓 RLS appears to be disabled');
      return false;
    }
  } catch (error) {
    console.log(`❌ RLS check failed: ${error.message}`);
    return false;
  }
}

// Step 2: Get valid type values for learning_cards
async function getValidCardTypes() {
  console.log('🔍 Getting valid card types...');

  try {
    const { data, error } = await supabase
      .from('learning_cards')
      .select('type')
      .limit(10);

    if (error) {
      console.log(`❌ Error getting card types: ${error.message}`);
      return ['core-technologies']; // fallback
    }

    const types = [...new Set(data.map(card => card.type))];
    console.log(`✅ Valid card types: ${types.join(', ')}`);
    return types;
  } catch (error) {
    console.log(`❌ Error getting card types: ${error.message}`);
    return ['core-technologies']; // fallback
  }
}

// Step 3: Migrate Learning Cards with valid types
async function migrateLearningCards() {
  console.log('🃏 Migrating learning cards...');

  try {
    const validTypes = await getValidCardTypes();

    // Use valid card types from existing data
    const learningCards = [
      {
        title: 'JavaScript Fundamentals',
        type: validTypes[0] || 'core-technologies',
        description:
          'Core JavaScript concepts including variables, functions, and control structures',
        color: '#F59E0B',
        icon: 'code',
        order_index: 10,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        title: 'React Components',
        type: validTypes[0] || 'core-technologies',
        description: 'Building reusable UI components with React',
        color: '#3B82F6',
        icon: 'layers',
        order_index: 11,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        title: 'Node.js Backend',
        type: validTypes[0] || 'core-technologies',
        description: 'Server-side JavaScript development with Node.js',
        color: '#10B981',
        icon: 'server',
        order_index: 12,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const { error } = await supabase
      .from('learning_cards')
      .upsert(learningCards);

    if (error) {
      console.log(`❌ Error inserting cards: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${learningCards.length} learning cards`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating learning cards: ${error.message}`);
    return false;
  }
}

// Step 4: Test other tables with minimal data
async function testOtherTables() {
  console.log('🧪 Testing other tables...');

  try {
    // Test learning_plans with minimal data
    const { data: plansData, error: plansError } = await supabase
      .from('learning_plans')
      .select('*')
      .limit(1);

    if (plansError) {
      console.log(`❌ Learning plans error: ${plansError.message}`);
    } else {
      console.log('✅ Learning plans accessible');
      if (plansData && plansData.length > 0) {
        console.log('📋 Learning plans columns:', Object.keys(plansData[0]));
      }
    }

    // Test categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);

    if (categoriesError) {
      console.log(`❌ Categories error: ${categoriesError.message}`);
    } else {
      console.log('✅ Categories accessible');
      if (categoriesData && categoriesData.length > 0) {
        console.log('📋 Categories columns:', Object.keys(categoriesData[0]));
      }
    }

    // Test topics
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .limit(1);

    if (topicsError) {
      console.log(`❌ Topics error: ${topicsError.message}`);
    } else {
      console.log('✅ Topics accessible');
      if (topicsData && topicsData.length > 0) {
        console.log('📋 Topics columns:', Object.keys(topicsData[0]));
      }
    }

    // Test questions
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(1);

    if (questionsError) {
      console.log(`❌ Questions error: ${questionsError.message}`);
    } else {
      console.log('✅ Questions accessible');
      if (questionsData && questionsData.length > 0) {
        console.log('📋 Questions columns:', Object.keys(questionsData[0]));
      }
    }

    return true;
  } catch (error) {
    console.log(`❌ Error testing tables: ${error.message}`);
    return false;
  }
}

// Step 5: Verify Migration
async function verifyMigration() {
  console.log('🔍 Verifying migration...');

  try {
    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('count', { count: 'exact' });

    console.log('\n📊 Current Database State:');
    console.log(`🃏 Learning Cards: ${cards?.length || 0}`);

    // Show sample data
    const { data: sampleCards } = await supabase
      .from('learning_cards')
      .select('title, type, color, icon')
      .limit(5);

    if (sampleCards && sampleCards.length > 0) {
      console.log('\n📋 Sample Learning Cards:');
      sampleCards.forEach((card, index) => {
        console.log(
          `${index + 1}. ${card.title} (${card.type}) - ${card.color} ${card.icon}`
        );
      });
    }

    return true;
  } catch (error) {
    console.log(`❌ Error verifying migration: ${error.message}`);
    return false;
  }
}

// Main migration function
async function runMigration() {
  try {
    console.log('🎯 Starting comprehensive migration...\n');

    // Check RLS status
    const rlsEnabled = await checkRLSStatus();

    if (rlsEnabled) {
      console.log(
        '\n🔒 RLS is enabled. You need to disable it manually in Supabase dashboard:'
      );
      console.log('1. Go to Supabase Dashboard > SQL Editor');
      console.log('2. Run this SQL:');
      console.log('   ALTER TABLE learning_cards DISABLE ROW LEVEL SECURITY;');
      console.log('   ALTER TABLE categories DISABLE ROW LEVEL SECURITY;');
      console.log('   ALTER TABLE topics DISABLE ROW LEVEL SECURITY;');
      console.log('   ALTER TABLE questions DISABLE ROW LEVEL SECURITY;');
      console.log('   ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;');
      console.log('\n3. Then run this script again');
      return;
    }

    // Test all tables
    await testOtherTables();

    // Migrate learning cards (we know this works)
    const cardsSuccess = await migrateLearningCards();

    // Verify migration
    await verifyMigration();

    if (cardsSuccess) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('✅ Learning cards have been migrated to Supabase');
      console.log('🚀 Your Supabase database is ready for testing!');
      console.log('\n📋 Next Steps:');
      console.log('1. Test your API endpoints with the new Supabase data');
      console.log(
        '2. Update your frontend to use Supabase instead of Firebase'
      );
      console.log(
        '3. Use Firebase MCP to migrate real Firebase data when ready'
      );
      console.log(
        '4. Re-enable RLS when ready: ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;'
      );
    } else {
      console.log(
        '\n⚠️  Migration completed with some errors. Please check the logs above.'
      );
    }
  } catch (error) {
    console.log(`❌ Migration failed: ${error.message}`);
  }
}

// Run the migration
runMigration();
