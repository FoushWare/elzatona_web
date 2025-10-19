#!/usr/bin/env node

/**
 * Seed React Questions to PostgreSQL (Supabase)
 * Imports React questions into the PostgreSQL database with proper relational structure
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding React Questions to PostgreSQL (Supabase)...\n');

// Configuration
const QUESTIONS_FILE = 'data/json/React/1-25QA.json';
const API_BASE_URL = 'http://localhost:3000';

// PostgreSQL/Supabase schema mapping
function transformQuestionForPostgreSQL(question) {
  return {
    question: question.title || question.content,
    explanation: question.explanation || question.sampleAnswer || '',
    topicId: null, // Will be set based on category mapping
    difficulty: mapDifficulty(question.difficulty),
    type: mapQuestionType(question.type),
    options: question.options || null,
    answer: question.answer || question.correctAnswer || null,
    tags: question.tags || [question.category],
    isActive: true,
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

async function seedQuestionsToPostgreSQL() {
  try {
    // Read the questions file
    console.log('📖 Reading questions file...');
    const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'));
    console.log(`✅ Found ${questionsData.length} React questions\n`);

    // Display first few questions for verification
    console.log('📋 Sample questions:');
    questionsData.slice(0, 3).forEach((q, index) => {
      console.log(`${index + 1}. ${q.title}`);
      console.log(`   Category: ${q.category} | Difficulty: ${q.difficulty}`);
      console.log(`   Type: ${q.type} | Points: ${q.points || 'N/A'}`);
      console.log('');
    });

    // Transform questions for PostgreSQL
    console.log('🔄 Transforming questions for PostgreSQL schema...');
    const postgresQuestions = questionsData.map(transformQuestionForPostgreSQL);

    console.log('📊 PostgreSQL Schema Mapping:');
    console.log('   Firebase/JSON → PostgreSQL API');
    console.log('   title → question');
    console.log('   difficulty → difficulty (mapped)');
    console.log('   type → type (mapped)');
    console.log('   options → options');
    console.log('   answer → answer');
    console.log('   tags → tags');
    console.log('   isActive → isActive\n');

    // Seed questions via PostgreSQL API
    console.log('🌱 Seeding questions to PostgreSQL database...');

    let successCount = 0;
    let errorCount = 0;

    for (const question of postgresQuestions) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Seeded: ${question.question.substring(0, 50)}...`);
          successCount++;
        } else {
          const error = await response.text();
          console.log(
            `❌ Failed: ${question.question.substring(0, 50)}... - ${error}`
          );
          errorCount++;
        }
      } catch (error) {
        console.log(
          `❌ Error seeding ${question.question.substring(0, 50)}...: ${error.message}`
        );
        errorCount++;
      }
    }

    console.log(`\n📊 Seeding Summary:`);
    console.log(`✅ Successfully seeded: ${successCount} questions`);
    console.log(`❌ Failed to seed: ${errorCount} questions`);
    console.log(`📝 Total processed: ${postgresQuestions.length} questions\n`);

    if (successCount === 0) {
      throw new Error('No questions were seeded successfully');
    }

    // Test the seeded questions
    console.log('\n🧪 Testing seeded questions...');
    const testResponse = await fetch(`${API_BASE_URL}/api/questions?limit=5`);

    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log(`✅ Found ${testData.length} questions in PostgreSQL`);

      if (testData.length > 0) {
        console.log('\n📝 Sample PostgreSQL Questions:');
        testData.slice(0, 3).forEach((question, index) => {
          console.log(`${index + 1}. ${question.question}`);
          console.log(`   Difficulty: ${question.difficulty}`);
          console.log(`   Type: ${question.type}`);
          console.log(`   Active: ${question.isActive}`);
          console.log('');
        });
      }
    }

    console.log('\n🎉 PostgreSQL Seeding Complete!');
    console.log('🎯 You can now test:');
    console.log(`   PostgreSQL Questions API: ${API_BASE_URL}/api/questions`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content/questions`);
    console.log(`   Supabase Dashboard: Check your Supabase project`);
  } catch (error) {
    console.error('❌ Error seeding questions to PostgreSQL:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the seeding
seedQuestionsToPostgreSQL();
