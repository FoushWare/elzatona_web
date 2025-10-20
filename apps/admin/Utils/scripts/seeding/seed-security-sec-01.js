import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const serviceAccount = JSON.parse(
  fs.readFileSync('firebase-service-account.json', 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedQuestions() {
  console.log('🌱 Seeding Security questions (sec-01.json)...');

  // Read JSON file directly
  const fileContent = fs.readFileSync(
    'apps/admin/network/data/json/security/sec-01.json',
    'utf8'
  );
  const questionsData = JSON.parse(fileContent);

  const batch = db.batch();
  const questionsCollection = db.collection('questions');

  for (const question of questionsData) {
    const docRef = questionsCollection.doc(question.id);
    batch.set(docRef, question);
  }

  await batch.commit();
  console.log(
    `✅ Successfully seeded ${questionsData.length} Security questions from sec-01.json.`
  );
}

seedQuestions().catch(console.error);
