import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import questionsData from '../data/json/html/html-04.json' with { type: 'json' };

const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedQuestions() {
  console.log('🌱 Seeding HTML questions (html-04.json)...');

  try {
    const batch = writeBatch(db);
    const questionsCollection = collection(db, 'questions');

    for (const question of questionsData) {
      const docRef = doc(questionsCollection, question.id);
      batch.set(docRef, question);
    }

    await batch.commit();
    console.log(
      `✅ Successfully seeded ${questionsData.length} HTML questions from html-04.json.`
    );
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    throw error;
  }
}

seedQuestions().catch(console.error);
