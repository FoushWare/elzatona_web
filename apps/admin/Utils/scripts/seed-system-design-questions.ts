import { initializeApp } from 'firebase/app';

import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBvOkBwv1YzF4x4x4x4x4x4x4x4x4x4x4x4x4',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'elzatona-web.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'elzatona-web',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'elzatona-web.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:123456789:web:abcdefghijklmnop',
};

// Initialize Firebase

const db = getFirestore(app);

interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'coding' | 'system-design' | 'open-ended';
  category: string;
  topic: string;
  learningPath: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy: string;
  tags: string[];
  explanation?: string;
  points?: number;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
  metadata?: {
    source?: string;
    version?: string;
  };
}

async function loadQuestionsFromFile(
  filePath: string
): Promise<UnifiedQuestion[]> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileContent);
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error(`❌ Error loading file ${filePath}:`, error);
    return [];
  }
}

async function questionExists(question_id: string): Promise<boolean> {
  try {
    const q = query(supabase.from('unifiedQuestions'), where('id', questionId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.length === 0;
  } catch (error) {
    console.error(`❌ Error checking if question exists:`, error);
    return false;
  }
}

async function seedSystemDesignQuestions() {
  console.log('🚀 Starting System Design questions seeding process...');

  const systemDesignDir = path.join(
    process.cwd(),
    'apps/admin/network/data/json/system_design'
  );
  const files = fs
    .readdirSync(systemDesignDir)
    .filter(file => file.endsWith('.json'));

  console.log(`📁 Found ${files.length} System Design question files`);

  let totalProcessed = 0;
  let totalAdded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = path.join(systemDesignDir, file);
    console.log(`\n📄 Processing file: ${file}`);

    const questions = await loadQuestionsFromFile(filePath);

    if (questions.length === 0) {
      console.log(`⚠️  No questions found in ${file}`);
      continue;
    }

    console.log(`📊 Found ${questions.length} questions in ${file}`);

    for (const question of questions) {
      totalProcessed++;

      try {
        // Check if question already exists
        const exists = await questionExists(question.id);

        if (exists) {
          console.log(`⏭️  Question already exists: ${question.title}`);
          totalSkipped++;
          continue;
        }

        // Add question to Firebase
        await addDoc(supabase.from('unifiedQuestions'), {
          ...question,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          createdBy: 'seeding-script',
          updatedBy: 'seeding-script',
        });

        console.log(`✅ Added question: ${question.title}`);
        totalAdded++;
      } catch (error) {
        console.error(`❌ Error adding question ${question.title}:`, error);
        totalErrors++;
      }
    }
  }

  console.log('\n🎉 System Design questions seeding completed!');
  console.log('📊 Summary:');
  console.log(`   - Successfully added: ${totalAdded}`);
  console.log(`   - Skipped (already exist): ${totalSkipped}`);
  console.log(`   - Errors: ${totalErrors}`);
  console.log(`   - Total processed: ${totalProcessed}`);
}

// Run the seeding process
seedSystemDesignQuestions()
  .then(() => {
    console.log(
      '✅ System Design questions seeding process completed successfully'
    );
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ System Design questions seeding process failed:', error);
    process.exit(1);
  });
