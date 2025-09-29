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

// Mapping of current learning path IDs to correct database IDs
const learningPathIdMapping = {
  'javascript-deep-dive': 'javascript-deep-dive',
  'frontend-basics': 'frontend-basics',
  'react-mastery': 'react-mastery',
  'JavaScript Deep Dive': 'javascript-deep-dive',
  'Frontend Fundamentals': 'frontend-basics',
  'React Mastery': 'react-mastery'
};

async function fixLearningPathIds() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Fetching all questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);
    
    console.log(`Found ${snapshot.docs.length} questions`);
    
    let updatedCount = 0;
    
    for (const questionDoc of snapshot.docs) {
      const questionData = questionDoc.data();
      const questionId = questionDoc.id;
      const currentLearningPath = questionData.learningPath;
      
      // Get the correct learning path ID
      const correctLearningPathId = learningPathIdMapping[currentLearningPath];
      
      if (correctLearningPathId && correctLearningPathId !== currentLearningPath) {
        // Update the question with the correct learning path ID
        await updateDoc(doc(db, 'unifiedQuestions', questionId), {
          learningPath: correctLearningPathId,
          updatedAt: new Date().toISOString()
        });
        
        console.log(`✅ Updated ${questionData.title} (${currentLearningPath}) → ${correctLearningPathId}`);
        updatedCount++;
      } else if (correctLearningPathId === currentLearningPath) {
        console.log(`⏭️  Skipping ${questionData.title} - already has correct ID: ${currentLearningPath}`);
      } else {
        console.log(`⚠️  No mapping found for learning path: ${currentLearningPath} (${questionData.title})`);
      }
    }
    
    console.log(`\n🎉 Fix completed!`);
    console.log(`📊 Updated: ${updatedCount} questions`);
    
  } catch (error) {
    console.error('❌ Error fixing learning path IDs:', error);
  }
}

fixLearningPathIds();

