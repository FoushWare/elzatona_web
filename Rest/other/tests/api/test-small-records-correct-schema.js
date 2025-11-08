#!/usr/bin/env node

/**
 * Test Small Records with Correct Schema
 * Creates 1 category, 2 topics, 1 card, 2 questions with correct schema
 */

import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createTestCategory() {
  console.log('📁 Creating test category...');

  const categoryData = {
    name: 'Test Category',
    slug: 'test-category-' + Date.now(),
    description: 'A test category for development',
    card_type: 'core-technologies',
    icon: '🧪',
    color: '#FF6B6B',
    order_index: 1,
    is_active: true,
  };

  try {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;

    console.log(`✅ Category created: ${data.name} (${data.id})`);
    return data;
  } catch (error) {
    console.error(`❌ Category creation failed: ${error.message}`);
    return null;
  }
}

async function createTestTopics(categoryId) {
  console.log('📚 Creating test topics...');

  const topics = [
    {
      name: 'Test Topic 1',
      slug: 'test-topic-1-' + Date.now(),
      description: 'First test topic',
      category_id: categoryId,
      order_index: 1,
      is_active: true,
    },
    {
      name: 'Test Topic 2',
      slug: 'test-topic-2-' + Date.now(),
      description: 'Second test topic',
      category_id: categoryId,
      order_index: 2,
      is_active: true,
    },
  ];

  const createdTopics = [];

  for (const topicData of topics) {
    try {
      const { data, error } = await supabase
        .from('topics')
        .insert(topicData)
        .select()
        .single();

      if (error) throw error;

      console.log(`✅ Topic created: ${data.name} (${data.id})`);
      createdTopics.push(data);
    } catch (error) {
      console.error(`❌ Topic creation failed: ${error.message}`);
    }
  }

  return createdTopics;
}

async function createTestCard() {
  console.log('🎴 Creating test card...');

  const cardData = {
    title: 'Test Learning Card',
    type: 'core-technologies',
    description: 'A test learning card for development',
    color: '#4ECDC4',
    icon: '🧪',
    order_index: 1,
    is_active: true,
  };

  try {
    const { data, error } = await supabase
      .from('learning_cards')
      .insert(cardData)
      .select()
      .single();

    if (error) throw error;

    console.log(`✅ Card created: ${data.title} (${data.id})`);
    return data;
  } catch (error) {
    console.error(`❌ Card creation failed: ${error.message}`);
    return null;
  }
}

async function createTestQuestions(topicId, cardId) {
  console.log('❓ Creating test questions...');

  const questions = [
    {
      title: 'What is React?',
      content: 'What is React and what is it used for?',
      type: 'multiple-choice',
      difficulty: 'beginner',
      points: 1,
      options: JSON.stringify([
        'A library',
        'A framework',
        'A language',
        'A database',
      ]),
      correct_answer: JSON.stringify('A library'),
      explanation:
        'React is a JavaScript library for building user interfaces.',
      tags: JSON.stringify(['react', 'frontend', 'javascript']),
      category_id: null, // We'll set this later if needed
      learning_card_id: cardId,
      is_active: true,
    },
    {
      title: 'What is JSX?',
      content: 'What does JSX stand for and what is its purpose?',
      type: 'multiple-choice',
      difficulty: 'beginner',
      points: 1,
      options: JSON.stringify([
        'JavaScript XML',
        'JavaScript Extension',
        'Java Syntax XML',
        'JavaScript Syntax',
      ]),
      correct_answer: JSON.stringify('JavaScript XML'),
      explanation:
        'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript.',
      tags: JSON.stringify(['react', 'jsx', 'frontend']),
      category_id: null,
      learning_card_id: cardId,
      is_active: true,
    },
  ];

  const createdQuestions = [];

  for (const questionData of questions) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert(questionData)
        .select()
        .single();

      if (error) throw error;

      console.log(`✅ Question created: ${data.title} (${data.id})`);
      createdQuestions.push(data);
    } catch (error) {
      console.error(`❌ Question creation failed: ${error.message}`);
    }
  }

  return createdQuestions;
}

async function verifyRecords() {
  console.log('\n🔍 Verifying all records...');

  const tables = ['categories', 'topics', 'learning_cards', 'questions'];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) throw error;

      console.log(`📊 ${table}: ${count} records`);
    } catch (error) {
      console.error(`❌ Error checking ${table}: ${error.message}`);
    }
  }
}

async function main() {
  console.log('🧪 Testing Small Records with Correct Schema...\n');

  // Step 1: Create category
  const category = await createTestCategory();
  if (!category) {
    console.log('❌ Cannot proceed without category');
    return;
  }

  // Step 2: Create topics
  const topics = await createTestTopics(category.id);
  if (topics.length === 0) {
    console.log('❌ Cannot proceed without topics');
    return;
  }

  // Step 3: Create card
  const card = await createTestCard();
  if (!card) {
    console.log('❌ Cannot proceed without card');
    return;
  }

  // Step 4: Create questions
  const questions = await createTestQuestions(topics[0].id, card.id);

  // Step 5: Verify all records
  await verifyRecords();

  console.log('\n🎉 Test Records Creation Complete!');
  console.log(
    `✅ Created: 1 category, ${topics.length} topics, 1 card, ${questions.length} questions`
  );
}

main();
