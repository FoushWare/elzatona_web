import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndClearQuestions() {
  console.log('🔍 Checking current questions in Firebase...\n');

  try {
    // Check unifiedQuestions collection
    const unifiedQuestionsRef = collection(db, 'unifiedQuestions');
    const unifiedQuestionsSnapshot = await getDocs(unifiedQuestionsRef);
    const unifiedQuestions = unifiedQuestionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(
      `📚 unifiedQuestions collection: ${unifiedQuestions.length} documents`
    );
    if (unifiedQuestions.length > 0) {
      console.log('Sample documents:');
      unifiedQuestions.slice(0, 3).forEach((q, i) => {
        console.log(`  ${i + 1}. ID: ${q.id}, Title: ${q.title || 'No title'}`);
      });
    }

    // Check questions collection (legacy)
    const questionsRef = collection(db, 'questions');
    const questionsSnapshot = await getDocs(questionsRef);
    const questions = questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(
      `\n📝 questions collection (legacy): ${questions.length} documents`
    );
    if (questions.length > 0) {
      console.log('Sample documents:');
      questions.slice(0, 3).forEach((q, i) => {
        console.log(`  ${i + 1}. ID: ${q.id}, Title: ${q.title || 'No title'}`);
      });
    }

    const totalQuestions = unifiedQuestions.length + questions.length;
    console.log(`\n📊 Total questions found: ${totalQuestions}`);

    if (totalQuestions > 0) {
      console.log('\n🗑️  Clearing all questions...');

      // Delete from unifiedQuestions
      if (unifiedQuestions.length > 0) {
        console.log(
          `Deleting ${unifiedQuestions.length} documents from unifiedQuestions...`
        );
        for (const question of unifiedQuestions) {
          await deleteDoc(doc(db, 'unifiedQuestions', question.id));
        }
        console.log('✅ unifiedQuestions cleared');
      }

      // Delete from questions (legacy)
      if (questions.length > 0) {
        console.log(`Deleting ${questions.length} documents from questions...`);
        for (const question of questions) {
          await deleteDoc(doc(db, 'questions', question.id));
        }
        console.log('✅ questions cleared');
      }

      console.log('\n🎉 All questions cleared successfully!');
      console.log('📝 You can now add new batches of questions.');
    } else {
      console.log('\n✨ No questions found. Database is already clean.');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkAndClearQuestions();
