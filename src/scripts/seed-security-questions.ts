// v1.0 - Security questions seeding script
// Run with: npx tsx src/scripts/seed-security-questions.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

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

interface SecurityQuestion {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  subcategory?: string;
  difficulty: string;
  topic: string;
  tags: string[];
  sampleAnswers: string[];
  createdAt: string;
  updatedAt: string;
}

async function seedSecurityQuestions() {
  console.log('🔒 Starting Security questions seeding...');

  const securityDir = path.join(process.cwd(), 'data/json/security');
  const files = fs
    .readdirSync(securityDir)
    .filter(file => file.endsWith('.json'));

  let totalQuestions = 0;
  let addedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(securityDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const questions: SecurityQuestion[] = JSON.parse(fileContent);

      console.log(
        `📄 Processing ${file} with ${questions.length} questions...`
      );
      totalQuestions += questions.length;

      for (const questionData of questions) {
        try {
          // Check if question already exists
          const existingQuery = query(
            collection(db, 'questions'),
            where('question', '==', questionData.title),
            where('category', '==', 'Security')
          );
          const existingSnapshot = await getDocs(existingQuery);

          if (existingSnapshot.empty) {
            const question = {
              question: questionData.title,
              answer:
                questionData.sampleAnswers &&
                questionData.sampleAnswers.length > 0
                  ? questionData.sampleAnswers[0]
                  : questionData.content,
              explanation: questionData.content,
              difficulty:
                questionData.difficulty === 'intermediate'
                  ? 'medium'
                  : questionData.difficulty === 'beginner'
                    ? 'easy'
                    : questionData.difficulty === 'advanced'
                      ? 'hard'
                      : 'medium',
              category: 'Security',
              topics: questionData.tags || ['security', 'web-security'],
              tags: questionData.tags || ['security', 'web-security'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              createdBy: 'seeding-script',
              updatedBy: 'seeding-script',
            };

            await addDoc(collection(db, 'questions'), question);
            addedCount++;
          } else {
            skippedCount++;
          }
        } catch (error) {
          console.error(
            `❌ Error processing question: ${questionData.title}`,
            error
          );
          errorCount++;
        }
      }

      console.log(`✅ Completed processing ${file}`);
    } catch (error) {
      console.error(`❌ Error processing file ${file}:`, error);
      errorCount++;
    }
  }

  console.log('🎉 Security questions seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Total questions processed: ${totalQuestions}`);
  console.log(`   - Successfully added: ${addedCount}`);
  console.log(`   - Skipped (already exist): ${skippedCount}`);
  console.log(`   - Errors: ${errorCount}`);
}

async function main() {
  console.log('🚀 Starting Security questions seeding process...');

  try {
    await seedSecurityQuestions();
    console.log('\\n🎉 Security questions seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during Security questions seeding:', error);
  }
}

main().catch(console.error);
