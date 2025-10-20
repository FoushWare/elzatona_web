#!/usr/bin/env node

/**
 * Verify and Clean Cards System
 * Ensures we have exactly the 5 target cards in Firebase and clears PostgreSQL duplicates
 */

import 'dotenv/config';

console.log('🎯 Verifying Cards System...\n');

const API_BASE_URL = 'http://localhost:3000';

// Define the 5 specific cards you want
const TARGET_CARDS = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description:
      'Fundamental web technologies including HTML, CSS, JavaScript, and core programming concepts',
    color: '#3B82F6',
    icon: '💻',
    order_index: 1,
  },
  {
    title: 'Framework Questions',
    type: 'framework-questions',
    description:
      'React, Next.js, Vue, Angular and modern framework concepts, patterns, and best practices',
    color: '#10B981',
    icon: '⚛️',
    order_index: 2,
  },
  {
    title: 'Problem Solving',
    type: 'problem-solving',
    description:
      'Algorithmic thinking, data structures, coding challenges, and problem-solving patterns',
    color: '#F59E0B',
    icon: '🧩',
    order_index: 3,
  },
  {
    title: 'System Design',
    type: 'system-design',
    description:
      'Large-scale system architecture, design patterns, scalability, and distributed systems',
    color: '#8B5CF6',
    icon: '🏗️',
    order_index: 4,
  },
  {
    title: 'Frontend Tasks',
    type: 'frontend-tasks',
    description:
      'Practical frontend development tasks, implementations, UI/UX challenges, and real-world projects',
    color: '#EF4444',
    icon: '🎨',
    order_index: 5,
  },
];

async function checkFirebaseCards() {
  console.log('🔥 Checking Firebase Cards...');

  try {
    const response = await fetch(`${API_BASE_URL}/api/cards?source=firebase`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`✅ Found ${data.data.length} cards in Firebase`);

      console.log('\n📋 Firebase Cards:');
      data.data.forEach((card, index) => {
        console.log(`${index + 1}. ${card.title}`);
        console.log(`   Type: ${card.type}`);
        console.log(`   Description: ${card.description}`);
        console.log(`   Order: ${card.order_index || card.order || 'N/A'}`);
        console.log('');
      });

      return data.data;
    } else {
      console.log('❌ Failed to fetch Firebase cards');
      return [];
    }
  } catch (error) {
    console.log(`❌ Error fetching Firebase cards: ${error.message}`);
    return [];
  }
}

async function checkPostgreSQLCards() {
  console.log('\n🐘 Checking PostgreSQL Cards...');

  try {
    const response = await fetch(`${API_BASE_URL}/api/cards?source=postgresql`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`⚠️ Found ${data.data.length} cards in PostgreSQL`);

      if (data.data.length > 5) {
        console.log('❌ PostgreSQL has too many cards - needs cleanup');
        return data.data;
      } else {
        console.log('✅ PostgreSQL cards look good');
        return data.data;
      }
    } else {
      console.log('❌ Failed to fetch PostgreSQL cards');
      return [];
    }
  } catch (error) {
    console.log(`❌ Error fetching PostgreSQL cards: ${error.message}`);
    return [];
  }
}

async function clearPostgreSQLCards() {
  console.log('\n🗑️ Clearing PostgreSQL Cards...');

  try {
    // Get all PostgreSQL cards
    const response = await fetch(`${API_BASE_URL}/api/cards?source=postgresql`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} PostgreSQL cards to remove`);

      // Delete each card
      for (const card of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/cards/${card.id}?source=postgresql`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            console.log(`✅ Deleted PostgreSQL card: ${card.title}`);
          } else {
            console.log(`❌ Failed to delete PostgreSQL card: ${card.title}`);
          }
        } catch (error) {
          console.log(
            `❌ Error deleting PostgreSQL card ${card.title}: ${error.message}`
          );
        }
      }
    }
  } catch (error) {
    console.log(
      `❌ Error fetching PostgreSQL cards for deletion: ${error.message}`
    );
  }
}

async function createPostgreSQLCards() {
  console.log('\n🎯 Creating PostgreSQL Cards...');

  let successCount = 0;
  let errorCount = 0;

  for (const card of TARGET_CARDS) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cards?source=postgresql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(card),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created PostgreSQL card: ${card.title}`);
        successCount++;
      } else {
        const error = await response.text();
        console.log(`❌ Failed PostgreSQL card: ${card.title} - ${error}`);
        errorCount++;
      }
    } catch (error) {
      console.log(
        `❌ Error creating PostgreSQL card ${card.title}: ${error.message}`
      );
      errorCount++;
    }
  }

  console.log(`\n📊 PostgreSQL Creation Summary:`);
  console.log(`✅ Successfully created: ${successCount} cards`);
  console.log(`❌ Failed to create: ${errorCount} cards`);

  return successCount;
}

async function main() {
  try {
    console.log('🎯 Cards System Verification Plan:');
    console.log('1. Check Firebase cards (should be correct)');
    console.log('2. Check PostgreSQL cards (may need cleanup)');
    console.log('3. Clean PostgreSQL if needed');
    console.log('4. Create correct PostgreSQL cards');
    console.log('5. Verify final result\n');

    // Step 1: Check Firebase cards
    const firebaseCards = await checkFirebaseCards();

    // Step 2: Check PostgreSQL cards
    const postgresCards = await checkPostgreSQLCards();

    // Step 3: Clean PostgreSQL if needed
    if (postgresCards.length > 5) {
      await clearPostgreSQLCards();
    }

    // Step 4: Create correct PostgreSQL cards
    if (postgresCards.length !== 5) {
      await createPostgreSQLCards();
    }

    // Step 5: Final verification
    console.log('\n🧪 Final Verification...');
    const finalFirebaseCards = await checkFirebaseCards();
    const finalPostgresCards = await checkPostgreSQLCards();

    console.log('\n🎉 Cards System Verification Complete!');
    console.log(`🔥 Firebase: ${finalFirebaseCards.length} cards`);
    console.log(`🐘 PostgreSQL: ${finalPostgresCards.length} cards`);

    if (finalFirebaseCards.length === 5 && finalPostgresCards.length === 5) {
      console.log('✅ Perfect! Both databases have exactly 5 cards.');
    } else {
      console.log("⚠️ Card counts don't match target (5 cards each).");
    }

    console.log('\n🔗 Test your cards:');
    console.log(`   Firebase Cards: ${API_BASE_URL}/api/cards?source=firebase`);
    console.log(
      `   PostgreSQL Cards: ${API_BASE_URL}/api/cards?source=postgresql`
    );
    console.log(`   All Cards: ${API_BASE_URL}/api/cards`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content-management`);
  } catch (error) {
    console.error('❌ Error during cards verification:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
