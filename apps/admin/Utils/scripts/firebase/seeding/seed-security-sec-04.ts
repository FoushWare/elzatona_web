import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import questionsData from '../data/json/security/sec-04.json' with { type: 'json' };

dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedQuestions() {
  console.log('🌱 Seeding Security questions (sec-04.json)...');
  const batch = db.batch();
  const questionsCollection = db.collection('questions');

  for (const question of questionsData) {
    const docRef = questionsCollection.doc(question.id);
    batch.set(docRef, question);
  }

  await batch.commit();
  console.log(
    `✅ Successfully seeded ${questionsData.length} Security questions from sec-04.json.`
  );
}

seedQuestions().catch(console.error);
