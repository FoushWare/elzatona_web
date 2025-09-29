// Test script to check if questions are being loaded correctly
const testQuestionsLoading = async () => {
  try {
    console.log('🔍 Testing questions loading...');
    
    // Test the API directly
    const response = await fetch('http://localhost:3000/api/questions/unified?learningPath=react-mastery&isActive=true');
    const data = await response.json();
    
    console.log('✅ API Response:', {
      success: data.success,
      count: data.data?.length || 0,
      questions: data.data?.map(q => ({ id: q.id, title: q.title, learningPath: q.learningPath })) || []
    });
    
    // Test if the questions have the correct structure
    if (data.success && data.data && data.data.length > 0) {
      const firstQuestion = data.data[0];
      console.log('✅ First question structure:', {
        id: firstQuestion.id,
        title: firstQuestion.title,
        type: firstQuestion.type,
        learningPath: firstQuestion.learningPath,
        isActive: firstQuestion.isActive,
        hasContent: !!firstQuestion.content,
        hasAnswer: !!firstQuestion.answer,
        hasExplanation: !!firstQuestion.explanation
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing questions:', error);
  }
};

// Run the test
testQuestionsLoading();
