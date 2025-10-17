import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs'; // Added fs import
import questionsData from '../data/json/system_design/questions-system-design.json' with { type: 'json' };

dotenv.config();

// Read service account from file directly
const serviceAccount = JSON.parse(
  fs.readFileSync('firebase-service-account.json', 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedQuestions() {
  console.log(
    '🌱 Seeding System Design questions (questions-system-design.json)...'
  );
  const batch = db.batch();
  const questionsCollection = db.collection('questions');

  for (const question of questionsData) {
    const docRef = questionsCollection.doc(question.id);
    batch.set(docRef, question);
  }

  await batch.commit();
  console.log(
    `✅ Successfully seeded ${questionsData.length} System Design questions from questions-system-design.json.`
  );
}

seedQuestions().catch(console.error);
