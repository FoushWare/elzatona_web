#!/usr/bin/env node

/**
 * Test Small Records - Step by Step
 * Creates small test records to verify our logic step by step
 */

import 'dotenv/config';

console.log('🧪 Testing Small Records - Step by Step...\n');

const API_BASE_URL = 'http://localhost:3000';

// Test data
const TEST_CATEGORY = {
  name: 'Test Category',
  description: 'A test category for verification',
  slug: 'test-category',
  color: '#3B82F6',
  icon: '🧪',
  order_index: 1,
};

const TEST_TOPICS = [
  {
    name: 'Test Topic 1',
    description: 'First test topic',
    slug: 'test-topic-1',
    order_index: 1,
  },
  {
    name: 'Test Topic 2',
    description: 'Second test topic',
    slug: 'test-topic-2',
    order_index: 2,
  },
];

const TEST_CARD = {
  title: 'Test Card',
  type: 'test-card',
  description: 'A test learning card',
  color: '#10B981',
  icon: '🧪',
  order_index: 1,
};

const TEST_QUESTIONS = [
  {
    question: 'What is 2 + 2?',
    explanation: 'Basic arithmetic: 2 + 2 = 4',
    difficulty: 'easy',
    type: 'multiple_choice',
    options: JSON.stringify([
      { id: 'a', text: '3', isCorrect: false },
      { id: 'b', text: '4', isCorrect: true },
      { id: 'c', text: '5', isCorrect: false },
      { id: 'd', text: '6', isCorrect: false },
    ]),
    correct_answer: 'b',
    tags: JSON.stringify(['math', 'arithmetic']),
  },
  {
    question: 'What is the capital of France?',
    explanation: 'Paris is the capital and largest city of France.',
    difficulty: 'easy',
    type: 'multiple_choice',
    options: JSON.stringify([
      { id: 'a', text: 'London', isCorrect: false },
      { id: 'b', text: 'Berlin', isCorrect: false },
      { id: 'c', text: 'Paris', isCorrect: true },
      { id: 'd', text: 'Madrid', isCorrect: false },
    ]),
    correct_answer: 'c',
    tags: JSON.stringify(['geography', 'capitals']),
  },
];

async function testStep(stepName, testFunction) {
  console.log(`\n🧪 ${stepName}...`);
  try {
    const result = await testFunction();
    if (result.success) {
      console.log(`✅ ${stepName} - SUCCESS`);
      return result;
    } else {
      console.log(`❌ ${stepName} - FAILED: ${result.error}`);
      return result;
    }
  } catch (error) {
    console.log(`❌ ${stepName} - ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testCreateCategory() {
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TEST_CATEGORY),
  });

  const data = await response.json();

  if (data.success) {
    console.log(
      `  📁 Created category: ${data.data.name} (ID: ${data.data.id})`
    );
    return { success: true, data: data.data };
  } else {
    return { success: false, error: data.error };
  }
}

async function testCreateTopics(categoryId) {
  const results = [];

  for (const topicData of TEST_TOPICS) {
    const topicPayload = { ...topicData, categoryId };

    const response = await fetch(`${API_BASE_URL}/api/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicPayload),
    });

    const data = await response.json();

    if (data.success) {
      console.log(
        `  📝 Created topic: ${data.data.name} (ID: ${data.data.id})`
      );
      results.push({ success: true, data: data.data });
    } else {
      console.log(`  ❌ Failed to create topic: ${data.error}`);
      results.push({ success: false, error: data.error });
    }
  }

  const successCount = results.filter(r => r.success).length;
  return { success: successCount > 0, results, successCount };
}

async function testCreateCard() {
  const response = await fetch(`${API_BASE_URL}/api/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TEST_CARD),
  });

  const data = await response.json();

  if (data.success) {
    console.log(`  🎯 Created card: ${data.data.title} (ID: ${data.data.id})`);
    return { success: true, data: data.data };
  } else {
    return { success: false, error: data.error };
  }
}

async function testCreateQuestions(topicId) {
  const results = [];

  for (const questionData of TEST_QUESTIONS) {
    const questionPayload = { ...questionData, topicId };

    const response = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionPayload),
    });

    const data = await response.json();

    if (data.success) {
      console.log(
        `  ❓ Created question: ${data.data.question?.substring(0, 30)}... (ID: ${data.data.id})`
      );
      results.push({ success: true, data: data.data });
    } else {
      console.log(`  ❌ Failed to create question: ${data.error}`);
      results.push({ success: false, error: data.error });
    }
  }

  const successCount = results.filter(r => r.success).length;
  return { success: successCount > 0, results, successCount };
}

async function testVerifyData() {
  console.log('\n🔍 Verifying all test data...');

  // Check categories
  const categoriesResponse = await fetch(`${API_BASE_URL}/api/categories`);
  const categoriesData = await categoriesResponse.json();
  console.log(`  📁 Categories: ${categoriesData.data?.length || 0}`);

  // Check topics
  const topicsResponse = await fetch(`${API_BASE_URL}/api/topics`);
  const topicsData = await topicsResponse.json();
  console.log(`  📝 Topics: ${topicsData.data?.length || 0}`);

  // Check cards
  const cardsResponse = await fetch(`${API_BASE_URL}/api/cards`);
  const cardsData = await cardsResponse.json();
  console.log(`  🎯 Cards: ${cardsData.data?.length || 0}`);

  // Check questions
  const questionsResponse = await fetch(`${API_BASE_URL}/api/questions`);
  const questionsData = await questionsResponse.json();
  console.log(`  ❓ Questions: ${questionsData.data?.length || 0}`);

  return { success: true };
}

async function main() {
  try {
    console.log('🧪 Small Records Testing Plan:');
    console.log('1. Create 1 test category');
    console.log('2. Create 2 test topics for that category');
    console.log('3. Create 1 test card');
    console.log('4. Create 2 test questions');
    console.log('5. Verify all data\n');

    let categoryId = null;
    let topicId = null;

    // Step 1: Create test category
    const categoryResult = await testStep(
      'Creating Test Category',
      testCreateCategory
    );
    if (!categoryResult.success) {
      console.log('\n❌ Stopping tests due to category creation failure');
      return;
    }
    categoryId = categoryResult.data.id;

    // Step 2: Create test topics
    const topicsResult = await testStep('Creating Test Topics', () =>
      testCreateTopics(categoryId)
    );
    if (!topicsResult.success) {
      console.log('\n❌ Stopping tests due to topics creation failure');
      return;
    }
    topicId = topicsResult.results[0].data.id; // Use first topic for questions

    // Step 3: Create test card
    const cardResult = await testStep('Creating Test Card', testCreateCard);
    if (!cardResult.success) {
      console.log('\n⚠️ Card creation failed, but continuing...');
    }

    // Step 4: Create test questions
    const questionsResult = await testStep('Creating Test Questions', () =>
      testCreateQuestions(topicId)
    );
    if (!questionsResult.success) {
      console.log('\n⚠️ Questions creation failed, but continuing...');
    }

    // Step 5: Verify all data
    await testStep('Verifying All Data', testVerifyData);

    console.log('\n🎉 Small Records Testing Complete!');
    console.log('\n📊 Summary:');
    console.log(
      `✅ Category created: ${categoryResult.success ? 'Yes' : 'No'}`
    );
    console.log(`✅ Topics created: ${topicsResult.successCount}/2`);
    console.log(`✅ Card created: ${cardResult.success ? 'Yes' : 'No'}`);
    console.log(`✅ Questions created: ${questionsResult.successCount}/2`);

    console.log('\n🔗 Test your data:');
    console.log(`   Categories: ${API_BASE_URL}/api/categories`);
    console.log(`   Topics: ${API_BASE_URL}/api/topics`);
    console.log(`   Cards: ${API_BASE_URL}/api/cards`);
    console.log(`   Questions: ${API_BASE_URL}/api/questions`);
  } catch (error) {
    console.error('❌ Error during small records testing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
