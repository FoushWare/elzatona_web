#!/usr/bin/env node

/**
 * Universal Questions Seeding Script
 * Seeds questions to either Firebase or PostgreSQL based on your choice
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

console.log('🌱 Universal Questions Seeding Script\n');

// Configuration
const QUESTIONS_FILE = 'apps/admin/network/data/json/React/1-25QA.json';
const API_BASE_URL = 'http://localhost:3000';

// Database types
const DATABASE_TYPES = {
  FIREBASE: 'firebase',
  POSTGRESQL: 'postgresql',
  BOTH: 'both',
};

// Get command line arguments
const args = process.argv.slice(2);
const databaseType = args[0] || 'firebase'; // Default to Firebase

console.log(`🎯 Target Database: ${databaseType.toUpperCase()}\n`);

// Firebase transformation (existing format)
function transformQuestionForFirebase(question) {
  return {
    title: question.title,
    content: question.content,
    type: question.type,
    category: question.category,
    difficulty: question.difficulty,
    learningPath: question.learningPath || 'react-fundamentals',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: question.tags || [question.category],
    answer: question.answer,
    explanation: question.explanation,
    hints: question.hints || [],
    timeLimit: question.timeLimit || 300, // 5 minutes default
    points: question.points || 10,
    options: question.options,
    sampleAnswers: question.sampleAnswers,
    metadata: {
      source: '1-25QA.json',
      version: '1.0',
      references: question.references || [],
    },
  };
}

// PostgreSQL transformation
function transformQuestionForPostgreSQL(question) {
  return {
    question_text: question.title || question.content,
    explanation: question.explanation || question.sampleAnswer || '',
    topic_id: null, // Will be set based on category mapping
    difficulty: mapDifficulty(question.difficulty),
    question_type: mapQuestionType(question.type),
    options: question.options ? JSON.stringify(question.options) : null,
    correct_answer: question.answer || question.correctAnswer || null,
    tags: question.tags
      ? JSON.stringify(question.tags)
      : JSON.stringify([question.category]),
    is_active: true,
  };
}

function mapDifficulty(difficulty) {
  const mapping = {
    beginner: 'easy',
    intermediate: 'medium',
    advanced: 'hard',
  };
  return mapping[difficulty?.toLowerCase()] || 'medium';
}

function mapQuestionType(type) {
  const mapping = {
    'multiple-choice': 'multiple_choice',
    'open-ended': 'open_ended',
    'true-false': 'true_false',
    code: 'code',
  };
  return mapping[type] || 'multiple_choice';
}

async function seedToFirebase(questions) {
  console.log('🔥 Seeding to Firebase...');

  const response = await fetch(`${API_BASE_URL}/api/questions/unified`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questions: questions,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Firebase API request failed: ${response.status} - ${errorText}`
    );
  }

  const result = await response.json();
  console.log('✅ Firebase seeding successful!');
  return result;
}

async function seedToPostgreSQL(questions) {
  console.log('🐘 Seeding to PostgreSQL...');

  const response = await fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questions: questions,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `PostgreSQL API request failed: ${response.status} - ${errorText}`
    );
  }

  const result = await response.json();
  console.log('✅ PostgreSQL seeding successful!');
  return result;
}

async function testDatabase(databaseType) {
  console.log(`\n🧪 Testing ${databaseType} database...`);

  let testUrl;
  if (databaseType === DATABASE_TYPES.FIREBASE) {
    testUrl = `${API_BASE_URL}/api/questions/unified?page=1&pageSize=5`;
  } else {
    testUrl = `${API_BASE_URL}/api/questions?limit=5`;
  }

  const response = await fetch(testUrl);

  if (response.ok) {
    const data = await response.json();
    const questions = data.data || data; // Handle different response formats
    console.log(`✅ Found ${questions.length} questions in ${databaseType}`);

    if (questions.length > 0) {
      console.log(`📝 Sample ${databaseType} question:`);
      const sample = questions[0];
      console.log(`   Title: ${sample.title || sample.question}`);
      console.log(`   Difficulty: ${sample.difficulty}`);
      console.log(`   Type: ${sample.type || sample.question_type}`);
    }
  } else {
    console.log(`❌ Failed to test ${databaseType} database`);
  }
}

async function main() {
  try {
    // Read questions file
    console.log('📖 Reading questions file...');
    const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'));
    console.log(`✅ Found ${questionsData.length} React questions\n`);

    // Display sample questions
    console.log('📋 Sample questions:');
    questionsData.slice(0, 2).forEach((q, index) => {
      console.log(`${index + 1}. ${q.title}`);
      console.log(`   Category: ${q.category} | Difficulty: ${q.difficulty}`);
      console.log(`   Type: ${q.type} | Points: ${q.points || 'N/A'}`);
      console.log('');
    });

    // Transform questions based on target database
    let transformedQuestions;
    if (databaseType === DATABASE_TYPES.POSTGRESQL) {
      transformedQuestions = questionsData.map(transformQuestionForPostgreSQL);
      console.log('🔄 Transformed for PostgreSQL schema');
    } else {
      transformedQuestions = questionsData.map(transformQuestionForFirebase);
      console.log('🔄 Transformed for Firebase schema');
    }

    // Seed to selected database(s)
    if (databaseType === DATABASE_TYPES.BOTH) {
      await seedToFirebase(questionsData.map(transformQuestionForFirebase));
      await seedToPostgreSQL(questionsData.map(transformQuestionForPostgreSQL));
    } else if (databaseType === DATABASE_TYPES.FIREBASE) {
      await seedToFirebase(transformedQuestions);
    } else if (databaseType === DATABASE_TYPES.POSTGRESQL) {
      await seedToPostgreSQL(transformedQuestions);
    } else {
      throw new Error(`Invalid database type: ${databaseType}`);
    }

    // Test the seeded data
    if (databaseType === DATABASE_TYPES.BOTH) {
      await testDatabase(DATABASE_TYPES.FIREBASE);
      await testDatabase(DATABASE_TYPES.POSTGRESQL);
    } else {
      await testDatabase(databaseType);
    }

    console.log('\n🎉 Seeding Complete!');
    console.log('🎯 Available endpoints:');
    console.log(`   Firebase Questions: ${API_BASE_URL}/api/questions/unified`);
    console.log(`   PostgreSQL Questions: ${API_BASE_URL}/api/questions`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content/questions`);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Show usage information
if (args.includes('--help') || args.includes('-h')) {
  console.log('📖 Usage:');
  console.log('  node scripts/seed-universal-questions.js [database-type]');
  console.log('');
  console.log('🎯 Database Types:');
  console.log('  firebase     - Seed to Firebase Firestore (default)');
  console.log('  postgresql   - Seed to PostgreSQL (Supabase)');
  console.log('  both         - Seed to both databases');
  console.log('');
  console.log('📝 Examples:');
  console.log('  node scripts/seed-universal-questions.js firebase');
  console.log('  node scripts/seed-universal-questions.js postgresql');
  console.log('  node scripts/seed-universal-questions.js both');
  process.exit(0);
}

// Run the main function
main();
