#!/usr/bin/env node

/**
 * Seed React Questions from 1-25QA.json
 * Imports React questions into the database for testing
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding React Questions from 1-25QA.json...\n');

// Configuration
const QUESTIONS_FILE = 'data/json/React/1-25QA.json';
const API_BASE_URL = 'http://localhost:3000';

async function seedQuestions() {
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
      console.log(`   Type: ${q.type} | Points: ${q.points}`);
      console.log('');
    });

    // Seed questions via API (bulk import)
    console.log('🌱 Seeding questions to database...');

    try {
      const response = await fetch(`${API_BASE_URL}/api/questions/unified`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: questionsData,
          isBulkImport: true,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully seeded ${result.data.created} questions`);
        console.log(`❌ Failed to seed ${result.data.failed} questions`);

        if (result.data.errors && result.data.errors.length > 0) {
          console.log('\n📋 Errors:');
          result.data.errors.forEach((error, index) => {
            console.log(
              `${index + 1}. ${error.question.title}: ${error.error}`
            );
          });
        }
      } else {
        const error = await response.text();
        console.log(`❌ Failed to seed questions: ${error}`);
      }
    } catch (error) {
      console.log(`❌ Error seeding questions: ${error.message}`);
    }

    console.log('\n🎉 Questions seeding completed!');
    console.log('🎯 You can now test:');
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content/questions`);
    console.log(`   Questions API: ${API_BASE_URL}/api/questions/unified`);
    console.log(`   Learning Cards: ${API_BASE_URL}/learning/cards`);
  } catch (error) {
    console.error('❌ Error reading questions file:', error.message);
    console.log('\n💡 Make sure the file exists at:', QUESTIONS_FILE);
  }
}

// Run the seeding
seedQuestions();
