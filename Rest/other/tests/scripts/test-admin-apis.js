// Test script to check if the admin page APIs are working
const testAPIs = async () => {
  console.log('🧪 Testing admin page APIs...');

  try {
    // Test categories API
    console.log('📋 Testing categories API...');
    const categoriesResponse = await fetch('/api/categories');
    const categoriesData = await categoriesResponse.json();
    console.log(
      'Categories API result:',
      categoriesData.success ? '✅ Success' : '❌ Failed'
    );
    console.log('Categories count:', categoriesData.count);

    // Test topics API
    console.log('📚 Testing topics API...');
    const topicsResponse = await fetch('/api/topics');
    const topicsData = await topicsResponse.json();
    console.log(
      'Topics API result:',
      topicsData.success ? '✅ Success' : '❌ Failed'
    );
    console.log('Topics count:', topicsData.count);

    // Test questions API
    console.log('❓ Testing questions API...');
    const questionsResponse = await fetch('/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(
      'Questions API result:',
      questionsData.success ? '✅ Success' : '❌ Failed'
    );
    console.log('Questions count:', questionsData.count);

    // Test questions by topic API
    console.log('🔍 Testing questions by topic API...');
    const questionsByTopicResponse = await fetch(
      '/api/questions/by-topic/react-basics'
    );
    const questionsByTopicData = await questionsByTopicResponse.json();
    console.log(
      'Questions by topic API result:',
      questionsByTopicData.success ? '✅ Success' : '❌ Failed'
    );
    console.log('Questions by topic count:', questionsByTopicData.count);

    console.log('🎉 All API tests completed!');
  } catch (error) {
    console.error('💥 Error testing APIs:', error);
  }
};

// Run the test
testAPIs();
