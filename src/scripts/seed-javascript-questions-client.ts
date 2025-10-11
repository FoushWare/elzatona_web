import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import fs from 'fs';

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
const auth = getAuth(app);

async function seedJavaScriptQuestions() {
  console.log(
    '🚀 Starting JavaScript questions seeding with Firebase Client SDK...'
  );

  try {
    // Sign in anonymously
    console.log('🔐 Signing in anonymously...');
    await signInAnonymously(auth);
    console.log('✅ Successfully signed in anonymously');

    // Read the prepared questions
    const questionsData = fs.readFileSync(
      'src/scripts/javascript-questions-for-firebase.json',
      'utf-8'
    );
    const questions = JSON.parse(questionsData);

    console.log(`📊 Found ${questions.length} JavaScript questions to seed`);

    let added = 0;
    let skipped = 0;

    for (const question of questions) {
      try {
        // Check if question already exists
        const q = query(
          collection(db, 'unifiedQuestions'),
          where('id', '==', question.id)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          console.log(`⏭️  Question already exists: ${question.title}`);
          skipped++;
          continue;
        }

        // Add question to Firebase
        await addDoc(collection(db, 'unifiedQuestions'), question);
        console.log(`✅ Added: ${question.title}`);
        added++;

        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error adding question ${question.title}:`, error);
      }
    }

    console.log('\n🎉 JavaScript questions seeding completed!');
    console.log('📊 Summary:');
    console.log(`   - Successfully added: ${added}`);
    console.log(`   - Skipped (already exist): ${skipped}`);
    console.log(`   - Total processed: ${questions.length}`);
  } catch (error) {
    console.error('❌ Error seeding JavaScript questions:', error);
  }
}

// Run the seeding process
seedJavaScriptQuestions()
  .then(() => {
    console.log('✅ JavaScript questions seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ JavaScript questions seeding failed:', error);
    process.exit(1);
  });
