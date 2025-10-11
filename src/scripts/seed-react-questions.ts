// v1.0 - Seed React questions to Firebase
// Run with: npx tsx src/scripts/seed-react-questions.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// Question Interface
// ==========================================

interface ReactQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath: string;
  topic: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  tags: string[];
  explanation?: string;
  points: number;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  sampleAnswers?: string[];
  hints?: string[];
  codeTemplate?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
}

// ==========================================
// Load React Questions from JSON Files
// ==========================================

function loadReactQuestions(): ReactQuestion[] {
  const questions: ReactQuestion[] = [];
  const reactDir = path.join(process.cwd(), 'data', 'json', 'React');

  // Get all React JSON files
  const files = fs.readdirSync(reactDir).filter(file => file.endsWith('.json'));

  console.log(`📁 Found ${files.length} React JSON files`);

  for (const file of files) {
    try {
      const filePath = path.join(reactDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const fileQuestions = JSON.parse(fileContent);

      if (Array.isArray(fileQuestions)) {
        questions.push(...fileQuestions);
        console.log(`✅ Loaded ${fileQuestions.length} questions from ${file}`);
      } else {
        console.log(`⚠️  Skipped ${file} - not an array`);
      }
    } catch (error) {
      console.error(`❌ Error loading ${file}:`, error);
    }
  }

  return questions;
}

// ==========================================
// Transform and Normalize Questions
// ==========================================

function transformQuestion(question: any): ReactQuestion {
  const now = new Date().toISOString();

  // Normalize the question data
  const transformedQuestion: ReactQuestion = {
    id:
      question.id ||
      `react-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: question.title || 'Untitled Question',
    content: question.content || '',
    type: question.type || 'open-ended',
    category: question.category || 'React',
    subcategory: question.subcategory || 'React Basics',
    difficulty: question.difficulty || 'beginner',
    learningPath: question.learningPath || 'React Developer Path',
    topic: question.topic || 'React Basics',
    isActive: question.isActive !== undefined ? question.isActive : true,
    createdAt: question.createdAt || now,
    updatedAt: question.updatedAt || now,
    createdBy: question.createdBy || 'system',
    updatedBy: question.updatedBy || 'system',
    tags: Array.isArray(question.tags) ? question.tags : ['react'],
    explanation: question.explanation || '',
    points: question.points || 1,
  };

  // Handle options for multiple-choice questions
  if (question.options && Array.isArray(question.options)) {
    transformedQuestion.options = question.options.map(
      (option: any, index: number) => ({
        id: option.id || `opt-${index}`,
        text: option.text || option.label || '',
        isCorrect: option.isCorrect || false,
      })
    );
  }

  // Handle sample answers
  if (question.sampleAnswers && Array.isArray(question.sampleAnswers)) {
    transformedQuestion.sampleAnswers = question.sampleAnswers;
  }

  // Handle hints
  if (question.hints && Array.isArray(question.hints)) {
    transformedQuestion.hints = question.hints;
  }

  // Handle code template
  if (question.codeTemplate) {
    transformedQuestion.codeTemplate = question.codeTemplate;
  }

  // Handle test cases
  if (question.testCases && Array.isArray(question.testCases)) {
    transformedQuestion.testCases = question.testCases.map((testCase: any) => ({
      input: testCase.input || '',
      expectedOutput: testCase.expectedOutput || testCase.output || '',
      explanation: testCase.explanation || '',
    }));
  }

  return transformedQuestion;
}

// ==========================================
// Seeding Functions
// ==========================================

async function seedReactQuestions() {
  console.log('🌱 Starting React questions seeding...');

  // Load questions from JSON files
  const rawQuestions = loadReactQuestions();
  console.log(`📊 Loaded ${rawQuestions.length} raw questions`);

  // Transform questions
  const questions = rawQuestions.map(transformQuestion);
  console.log(`🔄 Transformed ${questions.length} questions`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const question of questions) {
    try {
      // Check if question already exists
      const existingQuery = query(
        collection(db, 'questions'),
        where('id', '==', question.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        // Add to questions collection
        await addDoc(collection(db, 'questions'), question);

        // Also add to unifiedQuestions collection for compatibility
        await addDoc(collection(db, 'unifiedQuestions'), {
          ...question,
          type: 'unified',
          source: 'react-json',
        });

        successCount++;
        console.log(`✅ Added question: ${question.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Question already exists: ${question.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error adding question ${question.title}:`, error);
    }
  }

  console.log('🎉 React questions seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${questions.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting React questions seeding process...');

  try {
    await seedReactQuestions();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
