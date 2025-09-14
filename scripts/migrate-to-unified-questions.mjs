#!/usr/bin/env node

/**
 * Migration Script: Move hardcoded questions to unified Firebase schema
 * This script migrates all hardcoded questions to the new unified system
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample questions from various sources
const sampleQuestions = [
  // CSS Questions
  {
    title: 'CSS Display Properties - Block Elements',
    content: 'Which of the following statements about display: block is true?',
    type: 'single',
    options: [
      { id: 'a', text: 'It takes only the width of its content.', isCorrect: false },
      { id: 'b', text: 'It always starts on a new line.', isCorrect: true },
      { id: 'c', text: 'Width and height cannot be set.', isCorrect: false },
      { id: 'd', text: 'It behaves like inline elements.', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'Block-level elements always start on a new line and take up the full width of their container. They can have width and height properties set, unlike inline elements.',
    category: 'CSS',
    difficulty: 'easy',
    tags: ['css', 'display', 'block'],
    learningPath: 'frontend-basics',
    points: 5,
    timeLimit: 30
  },
  {
    title: 'CSS Display Properties - Inline Elements',
    content: 'What happens when you apply display: inline to an element?',
    type: 'single',
    options: [
      { id: 'a', text: 'It takes the full width of its parent.', isCorrect: false },
      { id: 'b', text: 'It ignores width and height properties.', isCorrect: true },
      { id: 'c', text: 'It always starts on a new line.', isCorrect: false },
      { id: 'd', text: 'It behaves like a block element.', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'Inline elements ignore width and height properties and only take up as much space as their content requires. They flow with text and do not start on new lines.',
    category: 'CSS',
    difficulty: 'easy',
    tags: ['css', 'display', 'inline'],
    learningPath: 'frontend-basics',
    points: 5,
    timeLimit: 30
  },
  {
    title: 'CSS Flexbox - Flex Direction',
    content: 'What is the default flex-direction value in CSS Flexbox?',
    type: 'single',
    options: [
      { id: 'a', text: 'column', isCorrect: false },
      { id: 'b', text: 'row', isCorrect: true },
      { id: 'c', text: 'column-reverse', isCorrect: false },
      { id: 'd', text: 'row-reverse', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'The default flex-direction value is "row", which means flex items are laid out horizontally from left to right.',
    category: 'CSS',
    difficulty: 'easy',
    tags: ['css', 'flexbox', 'layout'],
    learningPath: 'advanced-css-mastery',
    points: 5,
    timeLimit: 30
  },

  // JavaScript Questions
  {
    title: 'JavaScript Variables - let vs var',
    content: 'What is the main difference between let and var in JavaScript?',
    type: 'single',
    options: [
      { id: 'a', text: 'let has block scope, var has function scope', isCorrect: true },
      { id: 'b', text: 'var has block scope, let has function scope', isCorrect: false },
      { id: 'c', text: 'There is no difference', isCorrect: false },
      { id: 'd', text: 'let is faster than var', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'The main difference is that let has block scope while var has function scope. This means let variables are only accessible within the block they are declared.',
    category: 'JavaScript',
    difficulty: 'medium',
    tags: ['javascript', 'variables', 'scope'],
    learningPath: 'javascript-deep-dive',
    points: 8,
    timeLimit: 45
  },
  {
    title: 'JavaScript Closures',
    content: 'What is a closure in JavaScript?',
    type: 'single',
    options: [
      { id: 'a', text: 'A function that has access to variables in its outer scope', isCorrect: true },
      { id: 'b', text: 'A way to close a function', isCorrect: false },
      { id: 'c', text: 'A type of loop', isCorrect: false },
      { id: 'd', text: 'A method to hide variables', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
    category: 'JavaScript',
    difficulty: 'hard',
    tags: ['javascript', 'closures', 'scope'],
    learningPath: 'javascript-deep-dive',
    points: 10,
    timeLimit: 60
  },
  {
    title: 'JavaScript Promises',
    content: 'What does the Promise.all() method do?',
    type: 'single',
    options: [
      { id: 'a', text: 'Returns a promise that resolves when all promises resolve', isCorrect: true },
      { id: 'b', text: 'Returns the first promise that resolves', isCorrect: false },
      { id: 'c', text: 'Returns all promises in an array', isCorrect: false },
      { id: 'd', text: 'Creates a new promise', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'Promise.all() returns a promise that resolves when all input promises resolve, or rejects if any input promise rejects.',
    category: 'JavaScript',
    difficulty: 'medium',
    tags: ['javascript', 'promises', 'async'],
    learningPath: 'javascript-deep-dive',
    points: 8,
    timeLimit: 45
  },

  // React Questions
  {
    title: 'React Hooks - useState',
    content: 'What does the useState hook return?',
    type: 'single',
    options: [
      { id: 'a', text: 'A state value and a setter function', isCorrect: true },
      { id: 'b', text: 'Just the state value', isCorrect: false },
      { id: 'c', text: 'Just the setter function', isCorrect: false },
      { id: 'd', text: 'An object with state and methods', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'useState returns an array with two elements: the current state value and a function to update that state.',
    category: 'React',
    difficulty: 'easy',
    tags: ['react', 'hooks', 'useState'],
    learningPath: 'react-mastery',
    points: 5,
    timeLimit: 30
  },
  {
    title: 'React Lifecycle - useEffect',
    content: 'When does the useEffect hook run?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'After every render', isCorrect: true },
      { id: 'b', text: 'Only on component mount', isCorrect: false },
      { id: 'c', text: 'Only when dependencies change', isCorrect: true },
      { id: 'd', text: 'Before component unmount', isCorrect: false }
    ],
    correctAnswers: ['a', 'c'],
    explanation: 'useEffect runs after every render by default, but you can control when it runs using the dependency array.',
    category: 'React',
    difficulty: 'medium',
    tags: ['react', 'hooks', 'useEffect'],
    learningPath: 'react-mastery',
    points: 8,
    timeLimit: 45
  },
  {
    title: 'React Performance - React.memo',
    content: 'What is the purpose of React.memo?',
    type: 'single',
    options: [
      { id: 'a', text: 'To memoize expensive calculations', isCorrect: false },
      { id: 'b', text: 'To prevent unnecessary re-renders', isCorrect: true },
      { id: 'c', text: 'To create memoized components', isCorrect: false },
      { id: 'd', text: 'To optimize bundle size', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the component.',
    category: 'React',
    difficulty: 'medium',
    tags: ['react', 'performance', 'optimization'],
    learningPath: 'react-mastery',
    points: 8,
    timeLimit: 45
  },

  // TypeScript Questions
  {
    title: 'TypeScript Types - Interfaces vs Types',
    content: 'What is the main difference between interfaces and types in TypeScript?',
    type: 'single',
    options: [
      { id: 'a', text: 'Interfaces can be extended, types cannot', isCorrect: false },
      { id: 'b', text: 'Interfaces are open for extension, types are closed', isCorrect: true },
      { id: 'c', text: 'Types are faster than interfaces', isCorrect: false },
      { id: 'd', text: 'There is no difference', isCorrect: false }
    ],
    correctAnswers: ['b'],
    explanation: 'Interfaces are open for extension (can be merged), while types are closed and cannot be extended.',
    category: 'TypeScript',
    difficulty: 'medium',
    tags: ['typescript', 'types', 'interfaces'],
    learningPath: 'typescript-essentials',
    points: 8,
    timeLimit: 45
  },
  {
    title: 'TypeScript Generics',
    content: 'What are generics in TypeScript used for?',
    type: 'single',
    options: [
      { id: 'a', text: 'To create reusable components with type safety', isCorrect: true },
      { id: 'b', text: 'To generate random types', isCorrect: false },
      { id: 'c', text: 'To create generic functions', isCorrect: false },
      { id: 'd', text: 'To make code more generic', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'Generics allow you to create reusable components that work with multiple types while maintaining type safety.',
    category: 'TypeScript',
    difficulty: 'hard',
    tags: ['typescript', 'generics', 'type-safety'],
    learningPath: 'typescript-essentials',
    points: 10,
    timeLimit: 60
  },

  // Testing Questions
  {
    title: 'Testing - Unit vs Integration',
    content: 'What is the main difference between unit tests and integration tests?',
    type: 'single',
    options: [
      { id: 'a', text: 'Unit tests test individual components, integration tests test interactions', isCorrect: true },
      { id: 'b', text: 'Unit tests are faster than integration tests', isCorrect: false },
      { id: 'c', text: 'Integration tests are more important', isCorrect: false },
      { id: 'd', text: 'There is no difference', isCorrect: false }
    ],
    correctAnswers: ['a'],
    explanation: 'Unit tests test individual components in isolation, while integration tests test how multiple components work together.',
    category: 'Testing',
    difficulty: 'medium',
    tags: ['testing', 'unit-tests', 'integration-tests'],
    learningPath: 'testing-strategies',
    points: 8,
    timeLimit: 45
  },

  // Performance Questions
  {
    title: 'Performance - Bundle Size Optimization',
    content: 'Which technique helps reduce JavaScript bundle size?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Code splitting', isCorrect: true },
      { id: 'b', text: 'Tree shaking', isCorrect: true },
      { id: 'c', text: 'Minification', isCorrect: true },
      { id: 'd', text: 'Adding more libraries', isCorrect: false }
    ],
    correctAnswers: ['a', 'b', 'c'],
    explanation: 'Code splitting, tree shaking, and minification are all techniques to reduce bundle size. Adding more libraries increases bundle size.',
    category: 'Performance',
    difficulty: 'medium',
    tags: ['performance', 'bundle-size', 'optimization'],
    learningPath: 'performance-optimization',
    points: 8,
    timeLimit: 45
  },

  // Security Questions
  {
    title: 'Security - XSS Prevention',
    content: 'How can you prevent XSS attacks in React?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Use dangerouslySetInnerHTML carefully', isCorrect: true },
      { id: 'b', text: 'Sanitize user input', isCorrect: true },
      { id: 'c', text: 'Use Content Security Policy', isCorrect: true },
      { id: 'd', text: 'Always trust user input', isCorrect: false }
    ],
    correctAnswers: ['a', 'b', 'c'],
    explanation: 'Preventing XSS involves careful use of dangerouslySetInnerHTML, sanitizing user input, and implementing CSP. Never trust user input.',
    category: 'Security',
    difficulty: 'hard',
    tags: ['security', 'xss', 'prevention'],
    learningPath: 'security-essentials',
    points: 10,
    timeLimit: 60
  }
];

async function migrateQuestions() {
  console.log('🚀 Starting migration to unified question system...');
  
  try {
    // Import the UnifiedQuestionService
    const { UnifiedQuestionService } = await import('../src/lib/unified-question-schema.ts');
    
    // Initialize default learning paths first
    console.log('📚 Initializing default learning paths...');
    await UnifiedQuestionService.initializeDefaultLearningPaths();
    
    // Migrate sample questions
    console.log('📝 Migrating sample questions...');
    const results = await UnifiedQuestionService.bulkImportQuestions(sampleQuestions);
    
    console.log('✅ Migration completed!');
    console.log(`📊 Results: ${results.success} successful, ${results.failed} failed`);
    
    if (results.errors.length > 0) {
      console.log('❌ Errors:');
      results.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    // Get statistics
    console.log('📈 Getting migration statistics...');
    const stats = await UnifiedQuestionService.getQuestionStats();
    console.log('📊 Question Statistics:');
    console.log(`  Total Questions: ${stats.totalQuestions}`);
    console.log(`  Active Questions: ${stats.activeQuestions}`);
    console.log(`  Incomplete Questions: ${stats.incompleteQuestions}`);
    console.log(`  Average Points: ${stats.averagePoints.toFixed(2)}`);
    
    console.log('📋 Questions by Category:');
    Object.entries(stats.questionsByCategory).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
    console.log('📋 Questions by Learning Path:');
    Object.entries(stats.questionsByLearningPath).forEach(([path, count]) => {
      console.log(`  ${path}: ${count}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateQuestions();
