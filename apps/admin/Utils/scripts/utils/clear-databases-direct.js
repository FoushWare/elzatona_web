#!/usr/bin/env node

/**
 * Direct Database Clearing Script
 * Uses Firebase MCP and direct API calls to clear databases
 */

import 'dotenv/config';

console.log('🗑️ Direct Database Clearing Script\n');

const API_BASE_URL = 'http://localhost:3000';

async function clearFirebaseQuestions() {
  console.log('🔥 Clearing Firebase Questions...');

  try {
    // Get all questions
    const response = await fetch(
      `${API_BASE_URL}/api/questions/unified?page=1&pageSize=1000`
    );
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} questions to delete`);

      let deletedCount = 0;
      for (const question of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/questions/unified/${question.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
            console.log(
              `✅ Deleted question: ${question.title.substring(0, 50)}...`
            );
          }
        } catch (error) {
          console.log(`❌ Error deleting question: ${error.message}`);
        }
      }

      console.log(`✅ Deleted ${deletedCount} questions from Firebase`);
    } else {
      console.log('No questions found in Firebase');
    }
  } catch (error) {
    console.log(`❌ Error clearing Firebase questions: ${error.message}`);
  }
}

async function clearFirebaseCards() {
  console.log('\n🔥 Clearing Firebase Cards...');

  try {
    // Get all cards
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} cards to delete`);

      let deletedCount = 0;
      for (const card of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/cards/${card.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
            console.log(`✅ Deleted card: ${card.title}`);
          }
        } catch (error) {
          console.log(`❌ Error deleting card: ${error.message}`);
        }
      }

      console.log(`✅ Deleted ${deletedCount} cards from Firebase`);
    } else {
      console.log('No cards found in Firebase');
    }
  } catch (error) {
    console.log(`❌ Error clearing Firebase cards: ${error.message}`);
  }
}

async function clearPostgreSQLQuestions() {
  console.log('\n🐘 Clearing PostgreSQL Questions...');

  try {
    // Get all questions
    const response = await fetch(`${API_BASE_URL}/api/questions?limit=1000`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} questions to delete`);

      let deletedCount = 0;
      for (const question of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/questions/${question.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
            console.log(
              `✅ Deleted PostgreSQL question: ${question.question?.substring(0, 50) || question.title?.substring(0, 50)}...`
            );
          }
        } catch (error) {
          console.log(
            `❌ Error deleting PostgreSQL question: ${error.message}`
          );
        }
      }

      console.log(`✅ Deleted ${deletedCount} questions from PostgreSQL`);
    } else {
      console.log('No questions found in PostgreSQL');
    }
  } catch (error) {
    console.log(`❌ Error clearing PostgreSQL questions: ${error.message}`);
  }
}

async function clearPostgreSQLCards() {
  console.log('\n🐘 Clearing PostgreSQL Cards...');

  try {
    // Get all cards
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} cards to delete`);

      let deletedCount = 0;
      for (const card of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/cards/${card.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
            console.log(`✅ Deleted PostgreSQL card: ${card.title}`);
          }
        } catch (error) {
          console.log(`❌ Error deleting PostgreSQL card: ${error.message}`);
        }
      }

      console.log(`✅ Deleted ${deletedCount} cards from PostgreSQL`);
    } else {
      console.log('No cards found in PostgreSQL');
    }
  } catch (error) {
    console.log(`❌ Error clearing PostgreSQL cards: ${error.message}`);
  }
}

async function verifyClearing() {
  console.log('\n🧪 Verifying Database Clearing...\n');

  // Check Firebase Questions
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/questions/unified?page=1&pageSize=5`
    );
    const data = await response.json();
    console.log(`🔥 Firebase Questions: ${data.data?.length || 0} remaining`);
  } catch (error) {
    console.log(`🔥 Firebase Questions: Error checking - ${error.message}`);
  }

  // Check Firebase Cards
  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();
    console.log(`🔥 Firebase Cards: ${data.data?.length || 0} remaining`);
  } catch (error) {
    console.log(`🔥 Firebase Cards: Error checking - ${error.message}`);
  }

  // Check PostgreSQL Questions
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions?limit=5`);
    const data = await response.json();
    console.log(`🐘 PostgreSQL Questions: ${data.data?.length || 0} remaining`);
  } catch (error) {
    console.log(`🐘 PostgreSQL Questions: Error checking - ${error.message}`);
  }

  // Check PostgreSQL Cards
  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();
    console.log(`🐘 PostgreSQL Cards: ${data.data?.length || 0} remaining`);
  } catch (error) {
    console.log(`🐘 PostgreSQL Cards: Error checking - ${error.message}`);
  }
}

async function main() {
  try {
    console.log('🗑️ Direct Database Clearing Plan:');
    console.log('1. Clear Firebase Questions');
    console.log('2. Clear Firebase Cards');
    console.log('3. Clear PostgreSQL Questions');
    console.log('4. Clear PostgreSQL Cards');
    console.log('5. Verify all data is cleared\n');

    // Step 1: Clear Firebase Questions
    await clearFirebaseQuestions();

    // Step 2: Clear Firebase Cards
    await clearFirebaseCards();

    // Step 3: Clear PostgreSQL Questions
    await clearPostgreSQLQuestions();

    // Step 4: Clear PostgreSQL Cards
    await clearPostgreSQLCards();

    // Step 5: Verify
    await verifyClearing();

    console.log('\n🎉 Database Clearing Complete!');
    console.log('\n🚀 Ready for Fresh Seeding!');
    console.log('Next steps:');
    console.log('1. Seed categories and topics');
    console.log('2. Seed the 5 learning cards');
    console.log('3. Seed questions for each category');
    console.log('4. Seed learning plans');
    console.log('5. Verify complete system');
  } catch (error) {
    console.error('❌ Error during database clearing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
