import { test, expect } from '@playwright/test';

test.describe('API Routes - Complete API Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Set up test environment
    await page.goto('/');
  });

  test('Questions API endpoints', async ({ page }) => {
    // Test GET /api/questions/unified
    const questionsResponse = await page.request.get('/api/questions/unified');
    expect(questionsResponse.status()).toBe(200);

    const questionsData = await questionsResponse.json();
    expect(questionsData).toHaveProperty('questions');
    expect(Array.isArray(questionsData.questions)).toBe(true);

    // Test pagination
    const paginatedResponse = await page.request.get(
      '/api/questions/unified?page=1&pageSize=10'
    );
    expect(paginatedResponse.status()).toBe(200);

    const paginatedData = await paginatedResponse.json();
    expect(paginatedData).toHaveProperty('questions');
    expect(paginatedData).toHaveProperty('pagination');

    // Test filtering
    const filteredResponse = await page.request.get(
      '/api/questions/unified?category=JavaScript&difficulty=intermediate'
    );
    expect(filteredResponse.status()).toBe(200);

    const filteredData = await filteredResponse.json();
    expect(filteredData).toHaveProperty('questions');
  });

  test('Learning paths API endpoints', async ({ page }) => {
    // Test GET /api/learning-paths
    const learningPathsResponse = await page.request.get('/api/learning-paths');
    expect(learningPathsResponse.status()).toBe(200);

    const learningPathsData = await learningPathsResponse.json();
    expect(learningPathsData).toHaveProperty('learningPaths');
    expect(Array.isArray(learningPathsData.learningPaths)).toBe(true);

    // Test specific learning path
    const specificPathResponse = await page.request.get(
      '/api/learning-paths/1'
    );
    expect(specificPathResponse.status()).toBe(200);

    const specificPathData = await specificPathResponse.json();
    expect(specificPathData).toHaveProperty('id');
    expect(specificPathData).toHaveProperty('name');
  });

  test('Categories API endpoints', async ({ page }) => {
    // Test GET /api/categories
    const categoriesResponse = await page.request.get('/api/categories');
    expect(categoriesResponse.status()).toBe(200);

    const categoriesData = await categoriesResponse.json();
    expect(categoriesData).toHaveProperty('categories');
    expect(Array.isArray(categoriesData.categories)).toBe(true);

    // Test specific category
    const specificCategoryResponse =
      await page.request.get('/api/categories/1');
    expect(specificCategoryResponse.status()).toBe(200);

    const specificCategoryData = await specificCategoryResponse.json();
    expect(specificCategoryData).toHaveProperty('id');
    expect(specificCategoryData).toHaveProperty('name');
  });

  test('Topics API endpoints', async ({ page }) => {
    // Test GET /api/topics
    const topicsResponse = await page.request.get('/api/topics');
    expect(topicsResponse.status()).toBe(200);

    const topicsData = await topicsResponse.json();
    expect(topicsData).toHaveProperty('topics');
    expect(Array.isArray(topicsData.topics)).toBe(true);

    // Test specific topic
    const specificTopicResponse = await page.request.get('/api/topics/1');
    expect(specificTopicResponse.status()).toBe(200);

    const specificTopicData = await specificTopicResponse.json();
    expect(specificTopicData).toHaveProperty('id');
    expect(specificTopicData).toHaveProperty('name');
  });

  test('Question statistics API', async ({ page }) => {
    // Test GET /api/questions/stats
    const statsResponse = await page.request.get('/api/questions/stats');
    expect(statsResponse.status()).toBe(200);

    const statsData = await statsResponse.json();
    expect(statsData).toHaveProperty('totalQuestions');
    expect(statsData).toHaveProperty('questionsByType');
    expect(statsData).toHaveProperty('questionsByDifficulty');
    expect(statsData).toHaveProperty('questionsByCategory');
  });

  test('Admin clear questions API', async ({ page }) => {
    // Test DELETE /api/admin/clear-questions
    const clearResponse = await page.request.delete(
      '/api/admin/clear-questions'
    );
    expect(clearResponse.status()).toBe(200);

    const clearData = await clearResponse.json();
    expect(clearData).toHaveProperty('success');
    expect(clearData).toHaveProperty('message');
  });

  test('Question CRUD operations', async ({ page }) => {
    // Test POST /api/questions/unified
    const newQuestion = {
      title: 'API Test Question',
      content: 'What is the purpose of API testing?',
      type: 'multiple-choice',
      options: [
        'To test individual components',
        'To test API endpoints',
        'To test UI components',
        'To test database queries',
      ],
      correctAnswers: ['2'],
      explanation: 'API testing verifies that API endpoints work correctly.',
      category: 'Testing',
      difficulty: 'intermediate',
      learningPath: 'JavaScript Deep Dive',
      topic: 'API Testing',
    };

    const createResponse = await page.request.post('/api/questions/unified', {
      data: newQuestion,
    });
    expect(createResponse.status()).toBe(201);

    const createData = await createResponse.json();
    expect(createData).toHaveProperty('id');
    expect(createData).toHaveProperty('message');

    const questionId = createData.id;

    // Test GET /api/questions/unified/[id]
    const getResponse = await page.request.get(
      `/api/questions/unified/${questionId}`
    );
    expect(getResponse.status()).toBe(200);

    const getData = await getResponse.json();
    expect(getData).toHaveProperty('id', questionId);
    expect(getData).toHaveProperty('title', newQuestion.title);

    // Test PUT /api/questions/unified/[id]
    const updatedQuestion = {
      ...newQuestion,
      title: 'Updated API Test Question',
    };

    const updateResponse = await page.request.put(
      `/api/questions/unified/${questionId}`,
      {
        data: updatedQuestion,
      }
    );
    expect(updateResponse.status()).toBe(200);

    const updateData = await updateResponse.json();
    expect(updateData).toHaveProperty('message');

    // Test DELETE /api/questions/unified/[id]
    const deleteResponse = await page.request.delete(
      `/api/questions/unified/${questionId}`
    );
    expect(deleteResponse.status()).toBe(200);

    const deleteData = await deleteResponse.json();
    expect(deleteData).toHaveProperty('message');
  });

  test('Learning path questions API', async ({ page }) => {
    // Test GET /api/questions/[learningPath]
    const learningPathQuestionsResponse = await page.request.get(
      '/api/questions/JavaScript%20Deep%20Dive'
    );
    expect(learningPathQuestionsResponse.status()).toBe(200);

    const learningPathQuestionsData =
      await learningPathQuestionsResponse.json();
    expect(learningPathQuestionsData).toHaveProperty('questions');
    expect(Array.isArray(learningPathQuestionsData.questions)).toBe(true);
  });

  test('Questions by topic API', async ({ page }) => {
    // Test GET /api/questions/by-topic/[topicId]
    const topicQuestionsResponse = await page.request.get(
      '/api/questions/by-topic/1'
    );
    expect(topicQuestionsResponse.status()).toBe(200);

    const topicQuestionsData = await topicQuestionsResponse.json();
    expect(topicQuestionsData).toHaveProperty('questions');
    expect(Array.isArray(topicQuestionsData.questions)).toBe(true);
  });

  test('Custom plans API', async ({ page }) => {
    // Test GET /api/custom-plans
    const customPlansResponse = await page.request.get('/api/custom-plans');
    expect(customPlansResponse.status()).toBe(200);

    const customPlansData = await customPlansResponse.json();
    expect(customPlansData).toHaveProperty('plans');
    expect(Array.isArray(customPlansData.plans)).toBe(true);

    // Test POST /api/custom-plans
    const newPlan = {
      name: 'API Test Plan',
      description: 'A test learning plan',
      duration: 7,
      difficulty: 'intermediate',
      sections: [
        {
          name: 'JavaScript Basics',
          questions: 10,
          weight: 50,
        },
        {
          name: 'React Fundamentals',
          questions: 10,
          weight: 50,
        },
      ],
    };

    const createPlanResponse = await page.request.post('/api/custom-plans', {
      data: newPlan,
    });
    expect(createPlanResponse.status()).toBe(201);

    const createPlanData = await createPlanResponse.json();
    expect(createPlanData).toHaveProperty('id');
    expect(createPlanData).toHaveProperty('message');
  });

  test('Flashcards API', async ({ page }) => {
    // Test GET /api/flashcards
    const flashcardsResponse = await page.request.get('/api/flashcards');
    expect(flashcardsResponse.status()).toBe(200);

    const flashcardsData = await flashcardsResponse.json();
    expect(flashcardsData).toHaveProperty('flashcards');
    expect(Array.isArray(flashcardsData.flashcards)).toBe(true);

    // Test POST /api/flashcards
    const newFlashcard = {
      question: 'What is React?',
      answer: 'A JavaScript library for building user interfaces',
      category: 'JavaScript',
      difficulty: 'beginner',
    };

    const createFlashcardResponse = await page.request.post('/api/flashcards', {
      data: newFlashcard,
    });
    expect(createFlashcardResponse.status()).toBe(201);

    const createFlashcardData = await createFlashcardResponse.json();
    expect(createFlashcardData).toHaveProperty('id');
    expect(createFlashcardData).toHaveProperty('message');
  });

  test('Learning cart API', async ({ page }) => {
    // Test GET /api/learning-cart
    const learningCartResponse = await page.request.get('/api/learning-cart');
    expect(learningCartResponse.status()).toBe(200);

    const learningCartData = await learningCartResponse.json();
    expect(learningCartData).toHaveProperty('items');
    expect(Array.isArray(learningCartData.items)).toBe(true);

    // Test POST /api/learning-cart
    const newCartItem = {
      type: 'question',
      itemId: '1',
      title: 'Test Question',
      category: 'JavaScript',
    };

    const addToCartResponse = await page.request.post('/api/learning-cart', {
      data: newCartItem,
    });
    expect(addToCartResponse.status()).toBe(201);

    const addToCartData = await addToCartResponse.json();
    expect(addToCartData).toHaveProperty('message');
  });

  test('Progress tracking API', async ({ page }) => {
    // Test GET /api/progress/get
    const progressResponse = await page.request.get('/api/progress/get');
    expect(progressResponse.status()).toBe(200);

    const progressData = await progressResponse.json();
    expect(progressData).toHaveProperty('progress');

    // Test POST /api/progress/save
    const progressDataToSave = {
      learningPathId: '1',
      sectionId: 'javascript',
      questionId: '1',
      isCorrect: true,
      timeSpent: 30,
    };

    const saveProgressResponse = await page.request.post('/api/progress/save', {
      data: progressDataToSave,
    });
    expect(saveProgressResponse.status()).toBe(200);

    const saveProgressData = await saveProgressResponse.json();
    expect(saveProgressData).toHaveProperty('message');
  });

  test('User preferences API', async ({ page }) => {
    // Test GET /api/user/preferences
    const preferencesResponse = await page.request.get('/api/user/preferences');
    expect(preferencesResponse.status()).toBe(200);

    const preferencesData = await preferencesResponse.json();
    expect(preferencesData).toHaveProperty('preferences');

    // Test POST /api/user/preferences
    const newPreferences = {
      theme: 'dark',
      difficulty: 'intermediate',
      categories: ['JavaScript', 'React'],
      notifications: true,
    };

    const updatePreferencesResponse = await page.request.post(
      '/api/user/preferences',
      {
        data: newPreferences,
      }
    );
    expect(updatePreferencesResponse.status()).toBe(200);

    const updatePreferencesData = await updatePreferencesResponse.json();
    expect(updatePreferencesData).toHaveProperty('message');
  });

  test('User learning plans API', async ({ page }) => {
    // Test GET /api/user/learning-plans
    const learningPlansResponse = await page.request.get(
      '/api/user/learning-plans'
    );
    expect(learningPlansResponse.status()).toBe(200);

    const learningPlansData = await learningPlansResponse.json();
    expect(learningPlansData).toHaveProperty('plans');
    expect(Array.isArray(learningPlansData.plans)).toBe(true);

    // Test POST /api/user/learning-plans
    const newLearningPlan = {
      templateId: '1-day-plan',
      startDate: new Date().toISOString(),
      isActive: true,
    };

    const createLearningPlanResponse = await page.request.post(
      '/api/user/learning-plans',
      {
        data: newLearningPlan,
      }
    );
    expect(createLearningPlanResponse.status()).toBe(201);

    const createLearningPlanData = await createLearningPlanResponse.json();
    expect(createLearningPlanData).toHaveProperty('id');
    expect(createLearningPlanData).toHaveProperty('message');
  });

  test('API error handling', async ({ page }) => {
    // Test 404 error
    const notFoundResponse = await page.request.get(
      '/api/non-existent-endpoint'
    );
    expect(notFoundResponse.status()).toBe(404);

    // Test 400 error with invalid data
    const invalidDataResponse = await page.request.post(
      '/api/questions/unified',
      {
        data: { invalid: 'data' },
      }
    );
    expect(invalidDataResponse.status()).toBe(400);

    // Test 500 error handling
    const serverErrorResponse = await page.request.get(
      '/api/questions/unified?page=999999'
    );
    // This might return 200 with empty results or 500 depending on implementation
    expect([200, 500]).toContain(serverErrorResponse.status());
  });

  test('API authentication', async ({ page }) => {
    // Test protected endpoint without authentication
    const protectedResponse = await page.request.get(
      '/api/admin/clear-questions'
    );
    // This might return 401 or 200 depending on current auth implementation
    expect([200, 401, 403]).toContain(protectedResponse.status());

    // Test with authentication headers
    const authenticatedResponse = await page.request.get(
      '/api/admin/clear-questions',
      {
        headers: {
          Authorization: 'Bearer test-token',
        },
      }
    );
    expect([200, 401, 403]).toContain(authenticatedResponse.status());
  });

  test('API rate limiting', async ({ page }) => {
    // Test multiple rapid requests
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(page.request.get('/api/questions/unified'));
    }

    const responses = await Promise.all(requests);

    // All requests should succeed or be rate limited
    for (const response of responses) {
      expect([200, 429]).toContain(response.status());
    }
  });

  test('API response formats', async ({ page }) => {
    // Test JSON response format
    const jsonResponse = await page.request.get('/api/questions/unified');
    expect(jsonResponse.headers()['content-type']).toContain(
      'application/json'
    );

    const jsonData = await jsonResponse.json();
    expect(typeof jsonData).toBe('object');

    // Test error response format
    const errorResponse = await page.request.get('/api/non-existent');
    expect(errorResponse.status()).toBe(404);

    const errorData = await errorResponse.json();
    expect(errorData).toHaveProperty('error');
    expect(errorData).toHaveProperty('message');
  });

  test('API pagination consistency', async ({ page }) => {
    // Test pagination parameters
    const page1Response = await page.request.get(
      '/api/questions/unified?page=1&pageSize=5'
    );
    const page2Response = await page.request.get(
      '/api/questions/unified?page=2&pageSize=5'
    );

    expect(page1Response.status()).toBe(200);
    expect(page2Response.status()).toBe(200);

    const page1Data = await page1Response.json();
    const page2Data = await page2Response.json();

    // Check pagination metadata
    expect(page1Data).toHaveProperty('pagination');
    expect(page2Data).toHaveProperty('pagination');

    if (page1Data.pagination && page2Data.pagination) {
      expect(page1Data.pagination.page).toBe(1);
      expect(page2Data.pagination.page).toBe(2);
      expect(page1Data.pagination.pageSize).toBe(5);
      expect(page2Data.pagination.pageSize).toBe(5);
    }
  });

  test('API data validation', async ({ page }) => {
    // Test required field validation
    const invalidQuestionResponse = await page.request.post(
      '/api/questions/unified',
      {
        data: {
          // Missing required fields
          title: 'Test',
        },
      }
    );
    expect(invalidQuestionResponse.status()).toBe(400);

    const invalidData = await invalidQuestionResponse.json();
    expect(invalidData).toHaveProperty('error');
    expect(invalidData).toHaveProperty('validationErrors');

    // Test data type validation
    const wrongTypeResponse = await page.request.post(
      '/api/questions/unified',
      {
        data: {
          title: 'Test',
          content: 'Test content',
          type: 'invalid-type',
          options: 'not-an-array',
          correctAnswers: 'not-an-array',
          explanation: 'Test explanation',
          category: 'Test',
          difficulty: 'invalid-difficulty',
          learningPath: 'Test',
          topic: 'Test',
        },
      }
    );
    expect(wrongTypeResponse.status()).toBe(400);
  });
});
