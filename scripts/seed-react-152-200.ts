#!/usr/bin/env ts-node

/**
 * Seed React Questions 152-200
 * This script seeds React questions 152-200 from 152-200QA.json
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedReactQuestions152To200() {
  try {
    console.log('🌱 Starting to seed React questions 152-200...');

    // Read the questions file
    const questionsPath = path.join(
      __dirname,
      '../data/json/React/152-200QA.json'
    );
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

    console.log(
      `📚 Loaded ${questionsData.length} questions from 152-200QA.json`
    );

    // Get the questions collection reference
    const questionsRef = collection(db, 'questions');

    // Seed each question
    const seedPromises = questionsData.map(
      async (question: any, index: number) => {
        try {
          console.log(
            `📝 Seeding question ${index + 1}/${questionsData.length}: ${question.title}`
          );

          // Add the question to Firebase
          const docRef = await addDoc(questionsRef, {
            ...question,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log(`✅ Question ${index + 1} seeded with ID: ${docRef.id}`);
          return docRef.id;
        } catch (error) {
          console.error(`❌ Error seeding question ${index + 1}:`, error);
          throw error;
        }
      }
    );

    // Wait for all questions to be seeded
    const seededIds = await Promise.all(seedPromises);

    console.log(
      `🎉 Successfully seeded ${seededIds.length} React questions (152-200)`
    );
    console.log('✨ Script completed successfully');
  } catch (error) {
    console.error('💥 Error seeding React questions 152-200:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  seedReactQuestions152To200()
    .then(() => {
      console.log('🏁 Seeding script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Seeding script failed:', error);
      process.exit(1);
    });
}

export { seedReactQuestions152To200 };
