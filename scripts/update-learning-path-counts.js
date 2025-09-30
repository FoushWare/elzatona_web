const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

async function updateLearningPathCounts() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📚 Fetching all questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const questionsSnapshot = await getDocs(questionsRef);
    const questions = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${questions.length} questions`);

    // Count questions by learning path
    const questionCountsByPath = {};
    questions.forEach(question => {
      if (question.learningPath && question.learningPath !== 'null') {
        questionCountsByPath[question.learningPath] = (questionCountsByPath[question.learningPath] || 0) + 1;
      }
    });

    console.log('📊 Question counts by learning path:', questionCountsByPath);

    console.log('📚 Fetching all learning paths...');
    const learningPathsRef = collection(db, 'learningPaths');
    const learningPathsSnapshot = await getDocs(learningPathsRef);
    const learningPaths = learningPathsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Found ${learningPaths.length} learning paths`);

    let updatedCount = 0;

    for (const learningPath of learningPaths) {
      const actualQuestionCount = questionCountsByPath[learningPath.id] || 0;
      const currentQuestionCount = learningPath.questionCount || 0;

      if (actualQuestionCount !== currentQuestionCount) {
        const learningPathRef = doc(db, 'learningPaths', learningPath.id);
        await updateDoc(learningPathRef, {
          questionCount: actualQuestionCount,
          updatedAt: new Date().toISOString(),
        });
        console.log(
          `✅ Updated ${learningPath.name} (${learningPath.id}): ${currentQuestionCount} → ${actualQuestionCount} questions`
        );
        updatedCount++;
      } else {
        console.log(
          `⏭️  Skipping ${learningPath.name} (${learningPath.id}): already has correct count (${actualQuestionCount})`
        );
      }
    }

    console.log('\n🎉 Update completed!');
    console.log(`📊 Updated: ${updatedCount} learning paths`);
  } catch (error) {
    console.error('Error updating learning path counts:', error);
  }
}

updateLearningPathCounts();

