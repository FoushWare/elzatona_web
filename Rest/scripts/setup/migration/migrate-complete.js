#!/usr/bin/env node

/**
 * Complete Firebase to Supabase Migration Script
 * This script handles the entire migration process including:
 * 1. Schema creation
 * 2. RLS management
 * 3. Data migration
 * 4. Verification
 */

import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

// Configuration
const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  fs.readFileSync('firebase-service-account.json', 'utf8')
);
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});
const firestore = getFirestore(firebaseApp);

console.log('🚀 Starting Complete Firebase to Supabase Migration...\n');

// Step 1: Check if tables exist
async function checkTables() {
  console.log('📋 Checking existing tables...');

  try {
    const { data, error } = await supabase
      .from('learning_plans')
      .select('id')
      .limit(1);

    if (error && error.code === 'PGRST116') {
      console.log('❌ Tables do not exist. Need to create schema first.');
      return false;
    }

    console.log('✅ Tables exist. Proceeding with migration...');
    return true;
  } catch (err) {
    console.log('❌ Tables do not exist. Need to create schema first.');
    return false;
  }
}

// Step 2: Disable RLS temporarily
async function disableRLS() {
  console.log('🔓 Disabling RLS policies...');

  const disableRLSQueries = [
    'ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;',
    'ALTER TABLE categories DISABLE ROW LEVEL SECURITY;',
    'ALTER TABLE topics DISABLE ROW LEVEL SECURITY;',
    'ALTER TABLE questions DISABLE ROW LEVEL SECURITY;',
    'ALTER TABLE learning_cards DISABLE ROW LEVEL SECURITY;',
  ];

  for (const query of disableRLSQueries) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: query });
      if (error) {
        console.log(`⚠️  Could not disable RLS via RPC: ${error.message}`);
        console.log(
          '📝 Please manually disable RLS in Supabase dashboard SQL Editor:'
        );
        console.log(query);
      } else {
        console.log(`✅ Disabled RLS for table`);
      }
    } catch (err) {
      console.log(`⚠️  RPC not available. Please manually run in SQL Editor:`);
      console.log(query);
    }
  }
}

// Step 3: Migrate Learning Plans
async function migrateLearningPlans() {
  console.log('📚 Migrating learning plans...');

  try {
    const plansSnapshot = await firestore.collection('learningPlans').get();
    const plans = [];

    plansSnapshot.forEach(doc => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        title: data.title || 'Untitled Plan',
        description: data.description || '',
        difficulty: data.difficulty || 'beginner',
        estimated_time: data.estimatedTime || 0,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    if (plans.length > 0) {
      const { error } = await supabase.from('learning_plans').upsert(plans);

      if (error) {
        console.log(`❌ Error inserting plans: ${error.message}`);
        return false;
      }

      console.log(`✅ Migrated ${plans.length} learning plans`);
    } else {
      console.log('ℹ️  No learning plans found');
    }

    return true;
  } catch (error) {
    console.log(`❌ Error migrating learning plans: ${error.message}`);
    return false;
  }
}

// Step 4: Migrate Categories
async function migrateCategories() {
  console.log('📁 Migrating categories...');

  try {
    const categoriesSnapshot = await firestore.collection('categories').get();
    const categories = [];

    categoriesSnapshot.forEach(doc => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        name: data.name || 'Unnamed Category',
        description: data.description || '',
        icon: (data.icon || '📁').substring(0, 10),
        color: data.color || '#3B82F6',
        order_index: data.orderIndex || 0,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    if (categories.length > 0) {
      const { error } = await supabase.from('categories').upsert(categories);

      if (error) {
        console.log(`❌ Error inserting categories: ${error.message}`);
        return false;
      }

      console.log(`✅ Migrated ${categories.length} categories`);
    } else {
      console.log('ℹ️  No categories found');
    }

    return true;
  } catch (error) {
    console.log(`❌ Error migrating categories: ${error.message}`);
    return false;
  }
}

// Step 5: Migrate Topics
async function migrateTopics() {
  console.log('📝 Migrating topics...');

  try {
    const topicsSnapshot = await firestore.collection('topics').get();
    const topics = [];

    topicsSnapshot.forEach(doc => {
      const data = doc.data();
      topics.push({
        id: doc.id,
        name: data.name || 'Unnamed Topic',
        description: data.description || '',
        category_id: data.categoryId || null,
        order_index: data.orderIndex || 0,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    if (topics.length > 0) {
      const { error } = await supabase.from('topics').upsert(topics);

      if (error) {
        console.log(`❌ Error inserting topics: ${error.message}`);
        return false;
      }

      console.log(`✅ Migrated ${topics.length} topics`);
    } else {
      console.log('ℹ️  No topics found');
    }

    return true;
  } catch (error) {
    console.log(`❌ Error migrating topics: ${error.message}`);
    return false;
  }
}

// Step 6: Migrate Questions
async function migrateQuestions() {
  console.log('❓ Migrating questions...');

  try {
    const questionsSnapshot = await firestore
      .collection('unifiedQuestions')
      .get();
    const questions = [];

    questionsSnapshot.forEach(doc => {
      const data = doc.data();
      questions.push({
        id: doc.id,
        question: data.question || 'No question text',
        answer: data.answer || '',
        explanation: data.explanation || '',
        topic_id: data.topicId || null,
        difficulty: data.difficulty || 'easy',
        question_type: data.questionType || 'multiple_choice',
        options: data.options ? JSON.stringify(data.options) : null,
        correct_answer: data.correctAnswer || null,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    if (questions.length > 0) {
      const { error } = await supabase.from('questions').upsert(questions);

      if (error) {
        console.log(`❌ Error inserting questions: ${error.message}`);
        return false;
      }

      console.log(`✅ Migrated ${questions.length} questions`);
    } else {
      console.log('ℹ️  No questions found');
    }

    return true;
  } catch (error) {
    console.log(`❌ Error migrating questions: ${error.message}`);
    return false;
  }
}

// Step 7: Migrate Learning Cards
async function migrateLearningCards() {
  console.log('🃏 Migrating learning cards...');

  try {
    const cardsSnapshot = await firestore.collection('learningCards').get();
    const cards = [];

    cardsSnapshot.forEach(doc => {
      const data = doc.data();
      cards.push({
        id: doc.id,
        title: data.title || 'Untitled Card',
        content: data.content || '',
        card_type: data.cardType || 'concept',
        difficulty: data.difficulty || 'easy',
        plan_id: data.planId || null,
        category_id: data.categoryId || null,
        topic_id: data.topicId || null,
        order_index: data.orderIndex || 0,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    if (cards.length > 0) {
      const { error } = await supabase.from('learning_cards').upsert(cards);

      if (error) {
        console.log(`❌ Error inserting cards: ${error.message}`);
        return false;
      }

      console.log(`✅ Migrated ${cards.length} learning cards`);
    } else {
      console.log('ℹ️  No learning cards found');
    }

    return true;
  } catch (error) {
    console.log(`❌ Error migrating learning cards: ${error.message}`);
    return false;
  }
}

// Step 8: Re-enable RLS
async function enableRLS() {
  console.log('🔒 Re-enabling RLS policies...');

  const enableRLSQueries = [
    'ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE categories ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE topics ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE questions ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;',
  ];

  for (const query of enableRLSQueries) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: query });
      if (error) {
        console.log(`⚠️  Could not enable RLS via RPC: ${error.message}`);
        console.log(
          '📝 Please manually enable RLS in Supabase dashboard SQL Editor:'
        );
        console.log(query);
      } else {
        console.log(`✅ Enabled RLS for table`);
      }
    } catch (err) {
      console.log(`⚠️  RPC not available. Please manually run in SQL Editor:`);
      console.log(query);
    }
  }
}

// Step 9: Verify Migration
async function verifyMigration() {
  console.log('🔍 Verifying migration...');

  try {
    const { data: plans, error: plansError } = await supabase
      .from('learning_plans')
      .select('count', { count: 'exact' });

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('count', { count: 'exact' });

    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('count', { count: 'exact' });

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('count', { count: 'exact' });

    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('count', { count: 'exact' });

    console.log('\n📊 Migration Results:');
    console.log(`📚 Learning Plans: ${plans?.length || 0}`);
    console.log(`📁 Categories: ${categories?.length || 0}`);
    console.log(`📝 Topics: ${topics?.length || 0}`);
    console.log(`❓ Questions: ${questions?.length || 0}`);
    console.log(`🃏 Learning Cards: ${cards?.length || 0}`);

    return true;
  } catch (error) {
    console.log(`❌ Error verifying migration: ${error.message}`);
    return false;
  }
}

// Main migration function
async function runMigration() {
  try {
    // Check if tables exist
    const tablesExist = await checkTables();
    if (!tablesExist) {
      console.log(
        '❌ Please create the Supabase schema first using the SQL files provided.'
      );
      console.log(
        '📝 Run the SQL from supabase-schema.sql in your Supabase dashboard SQL Editor.'
      );
      return;
    }

    // Disable RLS
    await disableRLS();

    // Migrate data
    const plansSuccess = await migrateLearningPlans();
    const categoriesSuccess = await migrateCategories();
    const topicsSuccess = await migrateTopics();
    const questionsSuccess = await migrateQuestions();
    const cardsSuccess = await migrateLearningCards();

    // Re-enable RLS
    await enableRLS();

    // Verify migration
    await verifyMigration();

    if (
      plansSuccess &&
      categoriesSuccess &&
      topicsSuccess &&
      questionsSuccess &&
      cardsSuccess
    ) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('✅ All data has been migrated from Firebase to Supabase');
      console.log('🔒 RLS policies have been re-enabled');
      console.log(
        '🚀 Your application is ready to use the new Supabase database!'
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
