const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Mapping of categories to learning paths
const categoryToLearningPath = {
  'JavaScript (Core)': 'javascript-deep-dive',
  'JavaScript Fundamentals': 'javascript-deep-dive',
  'React': 'react-mastery',
  'React.js (Core)': 'react-mastery',
  'CSS & Styling': 'css-mastery',
  'CSS Fundamentals': 'css-mastery',
  'HTML & Web Fundamentals': 'frontend-basics',
  'HTML Fundamentals': 'frontend-basics',
  'Frontend Development': 'frontend-basics',
  'TypeScript': 'typescript-essentials',
  'Testing': 'testing-strategies',
  'Performance': 'performance-optimization',
  'Security': 'security-essentials',
  'System Design': 'frontend-system-design',
  'Build Tools': 'build-tools-devops',
  'API Integration': 'api-integration',
  'AI Tools': 'ai-tools-frontend'
};

async function fixLearningPaths() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Fetching all questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);
    
    console.log(`Found ${snapshot.docs.length} questions`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const questionDoc of snapshot.docs) {
      const questionData = questionDoc.data();
      const questionId = questionDoc.id;
      
      // Skip if learningPath is already set
      if (questionData.learningPath && questionData.learningPath !== null) {
        console.log(`⏭️  Skipping ${questionData.title} - already has learningPath: ${questionData.learningPath}`);
        skippedCount++;
        continue;
      }
      
      // Determine learning path based on category
      const category = questionData.category;
      const learningPath = categoryToLearningPath[category];
      
      if (!learningPath) {
        console.log(`⚠️  No learning path mapping for category: ${category} (${questionData.title})`);
        // Default to frontend-basics for unmapped categories
        const defaultLearningPath = 'frontend-basics';
        await updateDoc(doc(db, 'unifiedQuestions', questionId), {
          learningPath: defaultLearningPath,
          updatedAt: new Date().toISOString()
        });
        console.log(`✅ Updated ${questionData.title} to ${defaultLearningPath} (default)`);
        updatedCount++;
        continue;
      }
      
      // Update the question with the correct learning path
      await updateDoc(doc(db, 'unifiedQuestions', questionId), {
        learningPath: learningPath,
        updatedAt: new Date().toISOString()
      });
      
      console.log(`✅ Updated ${questionData.title} (${category}) → ${learningPath}`);
      updatedCount++;
    }
    
    console.log(`\n🎉 Fix completed!`);
    console.log(`📊 Updated: ${updatedCount} questions`);
    console.log(`⏭️  Skipped: ${skippedCount} questions`);
    
  } catch (error) {
    console.error('❌ Error fixing learning paths:', error);
  }
}

fixLearningPaths();

