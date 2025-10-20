import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import { UnifiedQuestion } from '../src/lib/unified-question-schema';
import questionsData from '../data/json/rendering-patterns/render-6.json';

dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedQuestions() {
  console.log('🌱 Seeding Rendering Patterns questions (render-6.json)...');
  const batch = db.batch();
  const questionsCollection = db.collection('questions');

  for (const question of questionsData) {
    const docRef = questionsCollection.doc(question.id);
    batch.set(docRef, question);
  }

  await batch.commit();
  console.log(
    `✅ Successfully seeded ${questionsData.length} Rendering Patterns questions (render-6.json).`
  );
}

seedQuestions().catch(console.error);
