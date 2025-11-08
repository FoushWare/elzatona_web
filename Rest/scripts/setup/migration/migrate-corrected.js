#!/usr/bin/env node

/**
 * Corrected Firebase to Supabase Migration Script
 * This script uses the actual database schema
 */

import { createClient } from '@supabase/supabase-js';

// Configuration
const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 Starting Corrected Firebase to Supabase Migration...\n');

// Sample data matching the actual schema
const sampleData = {
  learningPlans: [
    {
      id: 'plan-1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      difficulty: 'beginner',
      estimated_time: 40,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'plan-2',
      title: 'React Development',
      description: 'Master React framework for web development',
      difficulty: 'intermediate',
      estimated_time: 60,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  categories: [
    {
      id: 'cat-1',
      name: 'Frontend Development',
      description: 'Client-side development technologies',
      icon: '💻',
      color: '#3B82F6',
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cat-2',
      name: 'Backend Development',
      description: 'Server-side development technologies',
      icon: '⚙️',
      color: '#10B981',
      order_index: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  topics: [
    {
      id: 'topic-1',
      name: 'JavaScript Basics',
      description: 'Variables, functions, and control structures',
      category_id: 'cat-1',
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'topic-2',
      name: 'React Components',
      description: 'Building reusable UI components',
      category_id: 'cat-1',
      order_index: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  questions: [
    {
      id: 'q-1',
      question: 'What is JavaScript?',
      explanation:
        'JavaScript is primarily used for client-side scripting in web browsers.',
      topic_id: 'topic-1',
      difficulty: 'easy',
      question_type: 'multiple_choice',
      options: JSON.stringify([
        'A programming language',
        'A database',
        'A framework',
        'A library',
      ]),
      correct_answer: 'A programming language',
      tags: JSON.stringify(['javascript', 'basics']),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'q-2',
      question: 'What is React?',
      explanation:
        'React is developed by Facebook and is used for building single-page applications.',
      topic_id: 'topic-2',
      difficulty: 'easy',
      question_type: 'multiple_choice',
      options: JSON.stringify([
        'A database',
        'A JavaScript library',
        'A programming language',
        'A server',
      ]),
      correct_answer: 'A JavaScript library',
      tags: JSON.stringify(['react', 'frontend']),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  learningCards: [
    {
      id: 'card-1',
      title: 'JavaScript Variables',
      type: 'concept',
      description:
        'Variables in JavaScript can be declared using var, let, or const.',
      color: '#3B82F6',
      icon: '📝',
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'card-2',
      title: 'React Components',
      type: 'concept',
      description:
        'React components are reusable pieces of UI that can accept props.',
      color: '#10B981',
      icon: '⚛️',
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

// Step 1: Migrate Learning Plans
async function migrateLearningPlans() {
  console.log('📚 Migrating learning plans...');

  try {
    const { error } = await supabase
      .from('learning_plans')
      .upsert(sampleData.learningPlans);

    if (error) {
      console.log(`❌ Error inserting plans: ${error.message}`);
      return false;
    }

    console.log(
      `✅ Migrated ${sampleData.learningPlans.length} learning plans`
    );
    return true;
  } catch (error) {
    console.log(`❌ Error migrating learning plans: ${error.message}`);
    return false;
  }
}

// Step 2: Migrate Categories
async function migrateCategories() {
  console.log('📁 Migrating categories...');

  try {
    const { error } = await supabase
      .from('categories')
      .upsert(sampleData.categories);

    if (error) {
      console.log(`❌ Error inserting categories: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${sampleData.categories.length} categories`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating categories: ${error.message}`);
    return false;
  }
}

// Step 3: Migrate Topics
async function migrateTopics() {
  console.log('📝 Migrating topics...');

  try {
    const { error } = await supabase.from('topics').upsert(sampleData.topics);

    if (error) {
      console.log(`❌ Error inserting topics: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${sampleData.topics.length} topics`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating topics: ${error.message}`);
    return false;
  }
}

// Step 4: Migrate Questions
async function migrateQuestions() {
  console.log('❓ Migrating questions...');

  try {
    const { error } = await supabase
      .from('questions')
      .upsert(sampleData.questions);

    if (error) {
      console.log(`❌ Error inserting questions: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${sampleData.questions.length} questions`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating questions: ${error.message}`);
    return false;
  }
}

// Step 5: Migrate Learning Cards
async function migrateLearningCards() {
  console.log('🃏 Migrating learning cards...');

  try {
    const { error } = await supabase
      .from('learning_cards')
      .upsert(sampleData.learningCards);

    if (error) {
      console.log(`❌ Error inserting cards: ${error.message}`);
      return false;
    }

    console.log(
      `✅ Migrated ${sampleData.learningCards.length} learning cards`
    );
    return true;
  } catch (error) {
    console.log(`❌ Error migrating learning cards: ${error.message}`);
    return false;
  }
}

// Step 6: Verify Migration
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
    console.log('🎯 Starting migration with corrected schema...\n');

    // Migrate data
    const plansSuccess = await migrateLearningPlans();
    const categoriesSuccess = await migrateCategories();
    const topicsSuccess = await migrateTopics();
    const questionsSuccess = await migrateQuestions();
    const cardsSuccess = await migrateLearningCards();

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
      console.log('✅ Sample data has been migrated to Supabase');
      console.log('🚀 Your Supabase database is ready for testing!');
      console.log('\n📋 Next Steps:');
      console.log('1. Test your API endpoints with the new Supabase data');
      console.log(
        '2. Update your frontend to use Supabase instead of Firebase'
      );
      console.log(
        '3. For real Firebase data migration, use Firebase MCP tools'
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
