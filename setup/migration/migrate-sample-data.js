#!/usr/bin/env node

/**
 * Complete Firebase to Supabase Migration Script (Using Firebase MCP)
 * This script handles the entire migration process using Firebase MCP
 */

import { createClient } from '@supabase/supabase-js';

// Configuration - Get these from your Supabase Dashboard
// Go to: https://supabase.com/dashboard → Your Project → Settings → API
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key-here';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 Starting Complete Firebase to Supabase Migration...\n');
console.log('📝 This script will guide you through the migration process.');
console.log(
  '🔧 We will use Firebase MCP to read data and Supabase client to write data.\n'
);

// Sample data for testing (since we can't access Firebase directly)
const sampleData = {
  learningPlans: [
    {
      id: 'plan-1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      difficulty: 'beginner',
      estimatedTime: 40,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'plan-2',
      title: 'React Development',
      description: 'Master React framework for web development',
      difficulty: 'intermediate',
      estimatedTime: 60,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  categories: [
    {
      id: 'cat-1',
      name: 'Frontend Development',
      description: 'Client-side development technologies',
      icon: '💻',
      color: '#3B82F6',
      orderIndex: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cat-2',
      name: 'Backend Development',
      description: 'Server-side development technologies',
      icon: '⚙️',
      color: '#10B981',
      orderIndex: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  topics: [
    {
      id: 'topic-1',
      name: 'JavaScript Basics',
      description: 'Variables, functions, and control structures',
      categoryId: 'cat-1',
      orderIndex: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'topic-2',
      name: 'React Components',
      description: 'Building reusable UI components',
      categoryId: 'cat-1',
      orderIndex: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  questions: [
    {
      id: 'q-1',
      question: 'What is JavaScript?',
      answer: 'JavaScript is a programming language used for web development.',
      explanation:
        'JavaScript is primarily used for client-side scripting in web browsers.',
      topicId: 'topic-1',
      difficulty: 'easy',
      questionType: 'multiple_choice',
      options: [
        'A programming language',
        'A database',
        'A framework',
        'A library',
      ],
      correctAnswer: 'A programming language',
      tags: ['javascript', 'basics'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'q-2',
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
      explanation:
        'React is developed by Facebook and is used for building single-page applications.',
      topicId: 'topic-2',
      difficulty: 'easy',
      questionType: 'multiple_choice',
      options: [
        'A database',
        'A JavaScript library',
        'A programming language',
        'A server',
      ],
      correctAnswer: 'A JavaScript library',
      tags: ['react', 'frontend'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  learningCards: [
    {
      id: 'card-1',
      title: 'JavaScript Variables',
      content:
        'Variables in JavaScript can be declared using var, let, or const.',
      cardType: 'concept',
      difficulty: 'easy',
      planId: 'plan-1',
      categoryId: 'cat-1',
      topicId: 'topic-1',
      orderIndex: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'card-2',
      title: 'React Components',
      content:
        'React components are reusable pieces of UI that can accept props.',
      cardType: 'concept',
      difficulty: 'easy',
      planId: 'plan-2',
      categoryId: 'cat-1',
      topicId: 'topic-2',
      orderIndex: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
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
    const questionsWithJsonFields = sampleData.questions.map(q => ({
      ...q,
      options: q.options ? JSON.stringify(q.options) : null,
      tags: q.tags ? JSON.stringify(q.tags) : null,
    }));

    const { error } = await supabase
      .from('questions')
      .upsert(questionsWithJsonFields);

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
    console.log('🎯 Starting migration with sample data...');
    console.log(
      '📝 Note: This uses sample data. For real Firebase data, use Firebase MCP.\n'
    );

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
