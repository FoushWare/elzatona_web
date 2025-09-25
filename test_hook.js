// Test the useLearningPathStats hook
const testHook = async () => {
  try {
    console.log('🔄 Testing learning paths API...');
    
    // Test the learning paths API
    const pathsResponse = await fetch('http://localhost:3000/api/questions/learning-paths');
    const pathsData = await pathsResponse.json();
    
    console.log('📊 Learning paths response:', pathsData);
    
    if (pathsData.success) {
      console.log(`✅ Found ${pathsData.data.length} learning paths`);
      
      // Test a few question counts
      const testPaths = pathsData.data.slice(0, 3);
      
      for (const path of testPaths) {
        console.log(`📝 Testing ${path.id}...`);
        const questionsResponse = await fetch(`http://localhost:3000/api/questions/unified?learningPath=${path.id}&isActive=true`);
        const questionsData = await questionsResponse.json();
        const questionCount = questionsData.success ? questionsData.data.length : 0;
        console.log(`  ${path.id}: ${questionCount} questions`);
      }
    } else {
      console.error('❌ Failed to fetch learning paths:', pathsData.error);
    }
  } catch (error) {
    console.error('❌ Error testing hook:', error);
  }
};

testHook();
