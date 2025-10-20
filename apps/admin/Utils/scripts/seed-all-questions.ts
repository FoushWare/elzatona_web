// v1.0 - Master seeding script for all question types
// Run with: npx tsx src/scripts/seed-all-questions.ts

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
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code' | 'mcq';
  category: string;
  subcategory?: string;
  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'easy'
    | 'medium'
    | 'hard';
  learningPath?: string;
  topic: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy?: string;
  tags: string[];
  explanation?: string;
  points?: number;
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
  answer?: string;
}

// ==========================================
// Question Type Configuration
// ==========================================

const questionTypes = [
  {
    name: 'React',
    directory: 'React',
    category: 'React',
    learningPath: 'React Developer Path',
    topic: 'React Basics',
    tags: ['react', 'frontend'],
  },
  {
    name: 'Next.js',
    directory: 'nextjs',
    category: 'Next.js',
    learningPath: 'Next.js Framework',
    topic: 'Next.js Basics',
    tags: ['nextjs', 'react', 'framework'],
  },
  {
    name: 'CSS',
    directory: 'css',
    category: 'CSS',
    learningPath: 'Modern CSS Mastery',
    topic: 'CSS Basics',
    tags: ['css', 'styling', 'frontend'],
  },
  {
    name: 'HTML',
    directory: 'html',
    category: 'HTML',
    learningPath: 'Frontend Fundamentals',
    topic: 'HTML Basics',
    tags: ['html', 'frontend', 'web'],
  },
  {
    name: 'JavaScript',
    directory: 'javasciprt', // Note: typo in directory name
    category: 'JavaScript',
    learningPath: 'JavaScript Mastery',
    topic: 'JavaScript Basics',
    tags: ['javascript', 'programming'],
  },
  {
    name: 'System Design',
    directory: 'system_design',
    category: 'System Design',
    learningPath: 'Frontend System Design',
    topic: 'Frontend Architecture',
    tags: ['system-design', 'architecture', 'frontend'],
  },
  {
    name: 'Design Patterns',
    directory: 'design-patterns',
    category: 'Design Patterns',
    learningPath: 'Frontend System Design',
    topic: 'Design Patterns',
    tags: ['design-patterns', 'javascript', 'architecture'],
  },
  {
    name: 'Performance Patterns',
    directory: 'performance-patterns',
    category: 'Performance',
    learningPath: 'Performance Optimization Specialist',
    topic: 'Performance Optimization',
    tags: ['performance', 'optimization', 'frontend'],
  },
  {
    name: 'Rendering Patterns',
    directory: 'rendering-patterns',
    category: 'Rendering Patterns',
    learningPath: 'Performance Optimization Specialist',
    topic: 'Rendering Patterns',
    tags: ['rendering', 'ssr', 'ssg', 'frontend'],
  },
];

// ==========================================
// Load Questions from JSON Files
// ==========================================

function loadQuestionsFromDirectory(directory: string): Question[] {
  const questions: Question[] = [];
  const fullPath = path.join(process.cwd(), 'data', 'json', directory);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${fullPath}`);
    return questions;
  }

  const files = fs.readdirSync(fullPath).filter(file => file.endsWith('.json'));

  for (const file of files) {
    try {
      const filePath = path.join(fullPath, file);
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

function transformQuestion(question: any, typeConfig: any): Question {
  const now = new Date().toISOString();

  // Normalize difficulty levels
  const normalizeDifficulty = (difficulty: string) => {
    const difficultyMap: { [key: string]: string } = {
      easy: 'beginner',
      medium: 'intermediate',
      hard: 'advanced',
      beginner: 'beginner',
      intermediate: 'intermediate',
      advanced: 'advanced',
    };
    return difficultyMap[difficulty] || 'beginner';
  };

  // Normalize question type
  const normalizeType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      mcq: 'multiple-choice',
      'multiple-choice': 'multiple-choice',
      'open-ended': 'open-ended',
      'true-false': 'true-false',
      code: 'code',
    };
    return typeMap[type] || 'open-ended';
  };

  const transformedQuestion: Question = {
    id:
      question.id ||
      `${typeConfig.name.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: question.title || 'Untitled Question',
    content: question.content || '',
    type: normalizeType(question.type) as any,
    category: question.category || typeConfig.category,
    subcategory: question.subcategory || typeConfig.topic,
    difficulty: normalizeDifficulty(question.difficulty) as any,
    learningPath: question.learningPath || typeConfig.learningPath,
    topic: question.topic || typeConfig.topic,
    is_active: question.isActive !== undefined ? question.isActive : true,
    created_at: question.createdAt || now,
    updated_at: question.updatedAt || now,
    createdBy: question.createdBy || 'system',
    updatedBy: question.updatedBy || 'system',
    tags: Array.isArray(question.tags) ? question.tags : typeConfig.tags,
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

  // Handle answer field (for mcq type)
  if (question.answer) {
    transformedQuestion.answer = question.answer;
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

async function seedQuestionsByType(typeConfig: any) {
  console.log(`🌱 Seeding ${typeConfig.name} questions...`);

  // Load questions from JSON files
  const rawQuestions = loadQuestionsFromDirectory(typeConfig.directory);
  console.log(
    `📊 Loaded ${rawQuestions.length} raw ${typeConfig.name} questions`
  );

  if (rawQuestions.length === 0) {
    console.log(`⏭️  No questions found for ${typeConfig.name}`);
    return { success: 0, skip: 0, error: 0 };
  }

  // Transform questions
  const questions = rawQuestions.map(q => transformQuestion(q, typeConfig));
  console.log(
    `🔄 Transformed ${questions.length} ${typeConfig.name} questions`
  );

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
          source: `${typeConfig.name.toLowerCase()}-json`,
        });

        successCount++;
        if (successCount % 50 === 0) {
          console.log(
            `✅ Added ${successCount} ${typeConfig.name} questions...`
          );
        }
      } else {
        skipCount++;
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding ${typeConfig.name} question ${question.title}:`,
        error
      );
    }
  }

  console.log(`🎉 ${typeConfig.name} questions seeding completed!`);
  console.log(`📊 ${typeConfig.name} Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${questions.length}`);

  return { success: successCount, skip: skipCount, error: errorCount };
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting comprehensive questions seeding process...');

  const totalStats = { success: 0, skip: 0, error: 0 };

  for (const typeConfig of questionTypes) {
    try {
      const stats = await seedQuestionsByType(typeConfig);
      totalStats.success += stats.success;
      totalStats.skip += stats.skip;
      totalStats.error += stats.error;

      // Add a small delay between types to avoid overwhelming Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error seeding ${typeConfig.name}:`, error);
    }
  }

  console.log('🎉 Comprehensive questions seeding completed!');
  console.log(`📊 Overall Summary:`);
  console.log(`   - Successfully added: ${totalStats.success}`);
  console.log(`   - Skipped (already exist): ${totalStats.skip}`);
  console.log(`   - Errors: ${totalStats.error}`);
  console.log(
    `   - Total processed: ${totalStats.success + totalStats.skip + totalStats.error}`
  );
}

main().catch(console.error);
