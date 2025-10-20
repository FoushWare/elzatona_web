// v1.0 - Seed all remaining question types to Firebase
// Run with: npx tsx src/scripts/seed-all-remaining-questions.ts

import { initializeApp } from 'firebase/app';

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

const db = getFirestore(app);

// ==========================================
// Question Interface
// ==========================================

interface Question {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath: string;
  topic: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy?: string;
  tags: string[];
  explanation?: string;
  points: number;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
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
// Question Type Configuration
// ==========================================

const questionTypes = [
  {
    name: 'HTML',
    directory: 'HTML',
    category: 'HTML',
    subcategory: 'HTML Basics',
    learningPath: 'HTML Developer Path',
    topic: 'HTML Basics',
    tags: ['html'],
    source: 'html-json',
  },
  {
    name: 'System Design',
    directory: 'system_design',
    category: 'System Design',
    subcategory: 'System Design Basics',
    learningPath: 'System Design Path',
    topic: 'System Design Basics',
    tags: ['system-design'],
    source: 'system-design-json',
  },
  {
    name: 'Design Patterns',
    directory: 'design_patterns',
    category: 'Design Patterns',
    subcategory: 'Design Patterns Basics',
    learningPath: 'Design Patterns Path',
    topic: 'Design Patterns Basics',
    tags: ['design-patterns'],
    source: 'design-patterns-json',
  },
  {
    name: 'Performance Patterns',
    directory: 'performance_patterns',
    category: 'Performance Patterns',
    subcategory: 'Performance Patterns Basics',
    learningPath: 'Performance Patterns Path',
    topic: 'Performance Patterns Basics',
    tags: ['performance-patterns'],
    source: 'performance-patterns-json',
  },
  {
    name: 'Rendering Patterns',
    directory: 'rendering_patterns',
    category: 'Rendering Patterns',
    subcategory: 'Rendering Patterns Basics',
    learningPath: 'Rendering Patterns Path',
    topic: 'Rendering Patterns Basics',
    tags: ['rendering-patterns'],
    source: 'rendering-patterns-json',
  },
];

// ==========================================
// Load Questions from JSON Files
// ==========================================

function loadQuestionsFromDirectory(
  config: (typeof questionTypes)[0]
): Question[] {
  const questions: Question[] = [];
  const questionDir = path.join(
    process.cwd(),
    'data',
    'json',
    config.directory
  );

  // Check if directory exists
  if (!fs.existsSync(questionDir)) {
    console.log(`⚠️  ${config.name} directory not found: ${questionDir}`);
    return questions;
  }

  // Get all JSON files
  const files = fs
    .readdirSync(questionDir)
    .filter(file => file.endsWith('.json'));

  console.log(`📁 Found ${files.length} ${config.name} JSON files`);

  for (const file of files) {
    try {
      const filePath = path.join(questionDir, file);
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

function transformQuestion(
  question: any,
  config: (typeof questionTypes)[0]
): Question {
  const now = new Date().toISOString();

  // Normalize the question data
  const transformedQuestion: Question = {
    id:
      question.id ||
      `${config.name.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: question.title || 'Untitled Question',
    content: question.content || '',
    type: question.type || 'multiple-choice',
    category: question.category || config.category,
    subcategory: question.subcategory || config.subcategory,
    difficulty: question.difficulty || 'intermediate',
    learningPath: question.learningPath || config.learningPath,
    topic: question.topic || config.topic,
    is_active: question.isActive !== undefined ? question.isActive : true,
    created_at: question.createdAt || now,
    updated_at: question.updatedAt || now,
    createdBy: question.createdBy || 'system',
    updatedBy: question.updatedBy || 'system',
    tags: Array.isArray(question.tags) ? question.tags : config.tags,
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
        explanation: option.explanation || '',
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

async function seedQuestionsForType(config: (typeof questionTypes)[0]) {
  console.log(`🌱 Starting ${config.name} questions seeding...`);

  // Load questions from JSON files
  const rawQuestions = loadQuestionsFromDirectory(config);
  console.log(`📊 Loaded ${rawQuestions.length} raw ${config.name} questions`);

  if (rawQuestions.length === 0) {
    console.log(`⚠️  No ${config.name} questions found to seed`);
    return { successCount: 0, skipCount: 0, errorCount: 0 };
  }

  // Transform questions
  const questions = rawQuestions.map(q => transformQuestion(q, config));
  console.log(`🔄 Transformed ${questions.length} ${config.name} questions`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const question of questions) {
    try {
      // Check if question already exists
      const existingQuery = query(
        supabase.from('questions'),
        where('id', question.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        // Add to questions collection
        await addDoc(supabase.from('questions'), question);

        // Also add to unifiedQuestions collection for compatibility
        await addDoc(supabase.from('unifiedQuestions'), {
          ...question,
          type: 'unified',
          source: config.source,
        });

        successCount++;
        console.log(`✅ Added ${config.name} question: ${question.title}`);
      } else {
        skipCount++;
        console.log(
          `⏭️  ${config.name} question already exists: ${question.title}`
        );
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding ${config.name} question ${question.title}:`,
        error
      );
    }
  }

  console.log(`🎉 ${config.name} questions seeding completed!`);
  console.log(`📊 ${config.name} Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${questions.length}`);

  return { successCount, skipCount, errorCount };
}

async function seedAllRemainingQuestions() {
  console.log('🚀 Starting all remaining questions seeding process...');

  let totalSuccess = 0;
  let totalSkip = 0;
  let totalError = 0;

  for (const config of questionTypes) {
    console.log(`\n📚 Processing ${config.name} questions...`);
    const result = await seedQuestionsForType(config);
    totalSuccess += result.successCount;
    totalSkip += result.skipCount;
    totalError += result.errorCount;
  }

  console.log('\n🎉 All remaining questions seeding completed!');
  console.log('📊 Overall Summary:');
  console.log(`   - Successfully added: ${totalSuccess}`);
  console.log(`   - Skipped (already exist): ${totalSkip}`);
  console.log(`   - Errors: ${totalError}`);
  console.log(`   - Total processed: ${totalSuccess + totalSkip + totalError}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting all remaining questions seeding process...');

  try {
    await seedAllRemainingQuestions();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
