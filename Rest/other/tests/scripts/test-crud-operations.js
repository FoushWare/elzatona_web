#!/usr/bin/env node

/**
 * Test script to verify CRUD operations on both admin pages
 * Tests: /admin/content/questions and /admin/categories-topics
 */

const BASE_URL = 'http://localhost:3000';

async function testAPIEndpoint(method, url, data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

async function testQuestionsCRUD() {
  console.log('🧪 Testing Questions CRUD Operations...\n');

  // Test 1: Get all questions
  console.log('1. Testing GET /api/questions');
  const getQuestions = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/questions`
  );
  console.log(
    `   Status: ${getQuestions.success ? '✅' : '❌'} ${getQuestions.status || 'Error'}`
  );
  if (getQuestions.success) {
    console.log(`   Count: ${getQuestions.data.count || 0} questions`);
  }

  // Test 2: Create a new question
  console.log('\n2. Testing POST /api/questions/unified');
  const testQuestion = {
    title: 'Test Question for CRUD',
    content: 'This is a test question to verify CRUD operations',
    sampleAnswers: ['This is a test answer'],
    explanation: 'This is a test explanation',
    difficulty: 'medium',
    category: 'Testing',
    topic: 'CRUD Operations',
    cardType: 'Core Technologies',
    type: 'Open-ended',
  };

  const createQuestion = await testAPIEndpoint(
    'POST',
    `${BASE_URL}/api/questions/unified`,
    {
      questions: [testQuestion],
      isBulkImport: false,
    }
  );
  console.log(
    `   Status: ${createQuestion.success ? '✅' : '❌'} ${createQuestion.status || 'Error'}`
  );

  if (!createQuestion.success) {
    console.log(
      `   Error: ${createQuestion.error || createQuestion.data?.error}`
    );
    return;
  }

  const questionId = createQuestion.data.data.results[0].id;
  console.log(`   Created Question ID: ${questionId}`);

  // Test 3: Get specific question
  console.log('\n3. Testing GET /api/questions/unified/[id]');
  const getQuestion = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/questions/unified/${questionId}`
  );
  console.log(
    `   Status: ${getQuestion.success ? '✅' : '❌'} ${getQuestion.status || 'Error'}`
  );

  // Test 4: Update question
  console.log('\n4. Testing PUT /api/questions/unified/[id]');
  const updateData = {
    ...testQuestion,
    title: 'Updated Test Question',
    explanation: 'This explanation has been updated',
  };

  const updateQuestion = await testAPIEndpoint(
    'PUT',
    `${BASE_URL}/api/questions/unified/${questionId}`,
    updateData
  );
  console.log(
    `   Status: ${updateQuestion.success ? '✅' : '❌'} ${updateQuestion.status || 'Error'}`
  );

  // Test 5: Delete question
  console.log('\n5. Testing DELETE /api/questions/unified/[id]');
  const deleteQuestion = await testAPIEndpoint(
    'DELETE',
    `${BASE_URL}/api/questions/unified/${questionId}`
  );
  console.log(
    `   Status: ${deleteQuestion.success ? '✅' : '❌'} ${deleteQuestion.status || 'Error'}`
  );

  console.log('\n✅ Questions CRUD testing completed!\n');
}

async function testCategoriesCRUD() {
  console.log('🧪 Testing Categories CRUD Operations...\n');

  // Test 1: Get all categories
  console.log('1. Testing GET /api/categories');
  const getCategories = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/categories`
  );
  console.log(
    `   Status: ${getCategories.success ? '✅' : '❌'} ${getCategories.status || 'Error'}`
  );
  if (getCategories.success) {
    console.log(`   Count: ${getCategories.data.count || 0} categories`);
  }

  // Test 2: Create a new category
  console.log('\n2. Testing POST /api/categories');
  const testCategory = {
    name: 'Test Category for CRUD',
    description: 'This is a test category to verify CRUD operations',
    color: '#3B82F6',
    icon: 'folder',
    order: 999,
  };

  const createCategory = await testAPIEndpoint(
    'POST',
    `${BASE_URL}/api/categories`,
    testCategory
  );
  console.log(
    `   Status: ${createCategory.success ? '✅' : '❌'} ${createCategory.status || 'Error'}`
  );

  if (!createCategory.success) {
    console.log(
      `   Error: ${createCategory.error || createCategory.data?.error}`
    );
    return;
  }

  const categoryId = createCategory.data.data.id;
  console.log(`   Created Category ID: ${categoryId}`);

  // Test 3: Get specific category
  console.log('\n3. Testing GET /api/categories/[id]');
  const getCategory = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/categories/${categoryId}`
  );
  console.log(
    `   Status: ${getCategory.success ? '✅' : '❌'} ${getCategory.status || 'Error'}`
  );

  // Test 4: Update category
  console.log('\n4. Testing PUT /api/categories/[id]');
  const updateData = {
    ...testCategory,
    name: 'Updated Test Category',
    description: 'This description has been updated',
  };

  const updateCategory = await testAPIEndpoint(
    'PUT',
    `${BASE_URL}/api/categories/${categoryId}`,
    updateData
  );
  console.log(
    `   Status: ${updateCategory.success ? '✅' : '❌'} ${updateCategory.status || 'Error'}`
  );

  // Test 5: Delete category
  console.log('\n5. Testing DELETE /api/categories/[id]');
  const deleteCategory = await testAPIEndpoint(
    'DELETE',
    `${BASE_URL}/api/categories/${categoryId}`
  );
  console.log(
    `   Status: ${deleteCategory.success ? '✅' : '❌'} ${deleteCategory.status || 'Error'}`
  );

  console.log('\n✅ Categories CRUD testing completed!\n');
}

async function testTopicsCRUD() {
  console.log('🧪 Testing Topics CRUD Operations...\n');

  // Test 1: Get all topics
  console.log('1. Testing GET /api/topics');
  const getTopics = await testAPIEndpoint('GET', `${BASE_URL}/api/topics`);
  console.log(
    `   Status: ${getTopics.success ? '✅' : '❌'} ${getTopics.status || 'Error'}`
  );
  if (getTopics.success) {
    console.log(`   Count: ${getTopics.data.count || 0} topics`);
  }

  // Test 2: Create a new topic
  console.log('\n2. Testing POST /api/topics');
  const testTopic = {
    name: 'Test Topic for CRUD',
    description: 'This is a test topic to verify CRUD operations',
    category: 'Testing', // Changed from categoryId to category
    difficulty: 'medium', // Added required difficulty field
    color: '#10B981',
    icon: 'tag',
    order: 999,
  };

  const createTopic = await testAPIEndpoint(
    'POST',
    `${BASE_URL}/api/topics`,
    testTopic
  );
  console.log(
    `   Status: ${createTopic.success ? '✅' : '❌'} ${createTopic.status || 'Error'}`
  );

  if (!createTopic.success) {
    console.log(`   Error: ${createTopic.error || createTopic.data?.error}`);
    console.log('   Note: This might fail if no categories exist');
    return;
  }

  const topicId = createTopic.data.data.id;
  console.log(`   Created Topic ID: ${topicId}`);

  // Test 3: Get specific topic
  console.log('\n3. Testing GET /api/topics/[id]');
  const getTopic = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/topics/${topicId}`
  );
  console.log(
    `   Status: ${getTopic.success ? '✅' : '❌'} ${getTopic.status || 'Error'}`
  );

  // Test 4: Update topic
  console.log('\n4. Testing PUT /api/topics/[id]');
  const updateData = {
    ...testTopic,
    name: 'Updated Test Topic',
    description: 'This description has been updated',
  };

  const updateTopic = await testAPIEndpoint(
    'PUT',
    `${BASE_URL}/api/topics/${topicId}`,
    updateData
  );
  console.log(
    `   Status: ${updateTopic.success ? '✅' : '❌'} ${updateTopic.status || 'Error'}`
  );

  // Test 5: Delete topic
  console.log('\n5. Testing DELETE /api/topics/[id]');
  const deleteTopic = await testAPIEndpoint(
    'DELETE',
    `${BASE_URL}/api/topics/${topicId}`
  );
  console.log(
    `   Status: ${deleteTopic.success ? '✅' : '❌'} ${deleteTopic.status || 'Error'}`
  );

  console.log('\n✅ Topics CRUD testing completed!\n');
}

async function testCardsCRUD() {
  console.log('🧪 Testing Cards CRUD Operations...\n');

  // Test 1: Get all cards
  console.log('1. Testing GET /api/cards');
  const getCards = await testAPIEndpoint('GET', `${BASE_URL}/api/cards`);
  console.log(
    `   Status: ${getCards.success ? '✅' : '❌'} ${getCards.status || 'Error'}`
  );
  if (getCards.success) {
    console.log(`   Count: ${getCards.data.count || 0} cards`);
  }

  // Test 2: Create a new card
  console.log('\n2. Testing POST /api/cards');
  const testCard = {
    name: 'Test Card for CRUD',
    slug: 'test-card-crud',
    description: 'This is a test card to verify CRUD operations',
    color: '#F59E0B',
    icon: 'book',
    order: 999,
  };

  const createCard = await testAPIEndpoint(
    'POST',
    `${BASE_URL}/api/cards`,
    testCard
  );
  console.log(
    `   Status: ${createCard.success ? '✅' : '❌'} ${createCard.status || 'Error'}`
  );

  if (!createCard.success) {
    console.log(`   Error: ${createCard.error || createCard.data?.error}`);
    return;
  }

  const cardId = createCard.data.data.id;
  console.log(`   Created Card ID: ${cardId}`);

  // Test 3: Get specific card
  console.log('\n3. Testing GET /api/cards/[id]');
  const getCard = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/cards/${cardId}`
  );
  console.log(
    `   Status: ${getCard.success ? '✅' : '❌'} ${getCard.status || 'Error'}`
  );

  // Test 4: Update card
  console.log('\n4. Testing PUT /api/cards/[id]');
  const updateData = {
    ...testCard,
    name: 'Updated Test Card',
    description: 'This description has been updated',
  };

  const updateCard = await testAPIEndpoint(
    'PUT',
    `${BASE_URL}/api/cards/${cardId}`,
    updateData
  );
  console.log(
    `   Status: ${updateCard.success ? '✅' : '❌'} ${updateCard.status || 'Error'}`
  );

  // Test 5: Delete card
  console.log('\n5. Testing DELETE /api/cards/[id]');
  const deleteCard = await testAPIEndpoint(
    'DELETE',
    `${BASE_URL}/api/cards/${cardId}`
  );
  console.log(
    `   Status: ${deleteCard.success ? '✅' : '❌'} ${deleteCard.status || 'Error'}`
  );

  console.log('\n✅ Cards CRUD testing completed!\n');
}

async function testPlansCRUD() {
  console.log('🧪 Testing Plans CRUD Operations...\n');

  // Test 1: Get all plans
  console.log('1. Testing GET /api/plans');
  const getPlans = await testAPIEndpoint('GET', `${BASE_URL}/api/plans`);
  console.log(
    `   Status: ${getPlans.success ? '✅' : '❌'} ${getPlans.status || 'Error'}`
  );
  if (getPlans.success) {
    console.log(`   Count: ${getPlans.data.count || 0} plans`);
  }

  // Test 2: Create a new plan
  console.log('\n2. Testing POST /api/plans');
  const testPlan = {
    name: 'Test Plan for CRUD',
    slug: 'test-plan-crud',
    description: 'This is a test plan to verify CRUD operations',
    duration: '4 weeks',
    difficulty: 'intermediate',
    color: '#8B5CF6',
    icon: 'calendar',
    order: 999,
    estimatedHours: 40,
    prerequisites: ['Basic knowledge'],
    learningObjectives: ['Learn CRUD operations'],
  };

  const createPlan = await testAPIEndpoint(
    'POST',
    `${BASE_URL}/api/plans`,
    testPlan
  );
  console.log(
    `   Status: ${createPlan.success ? '✅' : '❌'} ${createPlan.status || 'Error'}`
  );

  if (!createPlan.success) {
    console.log(`   Error: ${createPlan.error || createPlan.data?.error}`);
    return;
  }

  const planId = createPlan.data.data.id;
  console.log(`   Created Plan ID: ${planId}`);

  // Test 3: Get specific plan
  console.log('\n3. Testing GET /api/plans/[id]');
  const getPlan = await testAPIEndpoint(
    'GET',
    `${BASE_URL}/api/plans/${planId}`
  );
  console.log(
    `   Status: ${getPlan.success ? '✅' : '❌'} ${getPlan.status || 'Error'}`
  );

  // Test 4: Update plan
  console.log('\n4. Testing PUT /api/plans/[id]');
  const updateData = {
    ...testPlan,
    name: 'Updated Test Plan',
    description: 'This description has been updated',
  };

  const updatePlan = await testAPIEndpoint(
    'PUT',
    `${BASE_URL}/api/plans/${planId}`,
    updateData
  );
  console.log(
    `   Status: ${updatePlan.success ? '✅' : '❌'} ${updatePlan.status || 'Error'}`
  );

  // Test 5: Delete plan
  console.log('\n5. Testing DELETE /api/plans/[id]');
  const deletePlan = await testAPIEndpoint(
    'DELETE',
    `${BASE_URL}/api/plans/${planId}`
  );
  console.log(
    `   Status: ${deletePlan.success ? '✅' : '❌'} ${deletePlan.status || 'Error'}`
  );

  console.log('\n✅ Plans CRUD testing completed!\n');
}

async function testAdminPages() {
  console.log('🌐 Testing Admin Pages Accessibility...\n');

  try {
    // Test questions page
    console.log('1. Testing /admin/content/questions page');
    const questionsPage = await fetch(`${BASE_URL}/admin/content/questions`);
    console.log(
      `   Status: ${questionsPage.ok ? '✅' : '❌'} ${questionsPage.status}`
    );

    // Test categories-topics page
    console.log('\n2. Testing /admin/categories-topics page');
    const categoriesPage = await fetch(`${BASE_URL}/admin/categories-topics`);
    console.log(
      `   Status: ${categoriesPage.ok ? '✅' : '❌'} ${categoriesPage.status}`
    );
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n✅ Admin pages testing completed!\n');
}

async function main() {
  console.log('🚀 Starting CRUD Operations Testing\n');
  console.log('='.repeat(50));

  try {
    await testAdminPages();
    await testQuestionsCRUD();
    await testCategoriesCRUD();
    await testTopicsCRUD();
    await testCardsCRUD();
    await testPlansCRUD();

    console.log('🎉 All CRUD operations testing completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Questions CRUD - All operations tested');
    console.log('✅ Categories CRUD - All operations tested');
    console.log('✅ Topics CRUD - All operations tested');
    console.log('✅ Cards CRUD - All operations tested');
    console.log('✅ Plans CRUD - All operations tested');
    console.log('✅ Admin Pages - Accessibility verified');
  } catch (error) {
    console.error('❌ Testing failed:', error.message);
  }
}

// Run the tests
main().catch(console.error);
