#!/usr/bin/env node

/**
 * Clean and Restructure Cards System
 * Creates exactly 5 cards: Core Technologies, Framework Questions, Problem Solving, System Design, Frontend Tasks
 */

import 'dotenv/config';

console.log('🎯 Restructuring Cards System...\n');

const API_BASE_URL = 'http://localhost:3000';

// Define the 5 specific cards you want
const TARGET_CARDS = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description:
      'Fundamental web technologies including HTML, CSS, JavaScript, and core programming concepts',
    color: '#3B82F6', // Blue
    icon: '💻',
    order_index: 1,
  },
  {
    title: 'Framework Questions',
    type: 'framework-questions',
    description:
      'React, Next.js, Vue, Angular and modern framework concepts, patterns, and best practices',
    color: '#10B981', // Green
    icon: '⚛️',
    order_index: 2,
  },
  {
    title: 'Problem Solving',
    type: 'problem-solving',
    description:
      'Algorithmic thinking, data structures, coding challenges, and problem-solving patterns',
    color: '#F59E0B', // Amber
    icon: '🧩',
    order_index: 3,
  },
  {
    title: 'System Design',
    type: 'system-design',
    description:
      'Large-scale system architecture, design patterns, scalability, and distributed systems',
    color: '#8B5CF6', // Purple
    icon: '🏗️',
    order_index: 4,
  },
  {
    title: 'Frontend Tasks',
    type: 'frontend-tasks',
    description:
      'Practical frontend development tasks, implementations, UI/UX challenges, and real-world projects',
    color: '#EF4444', // Red
    icon: '🎨',
    order_index: 5,
  },
];

async function clearAllCards() {
  console.log('🗑️ Clearing all existing cards...');

  try {
    // Get all existing cards
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} existing cards to remove`);

      // Delete each card
      for (const card of data.data) {
        try {
          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/cards/${card.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            console.log(`✅ Deleted: ${card.title}`);
          } else {
            console.log(`❌ Failed to delete: ${card.title}`);
          }
        } catch (error) {
          console.log(`❌ Error deleting ${card.title}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log(`❌ Error fetching cards: ${error.message}`);
  }
}

async function createTargetCards() {
  console.log('\n🎯 Creating target cards...');

  let successCount = 0;
  let errorCount = 0;

  for (const card of TARGET_CARDS) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created: ${card.title} (${card.type})`);
        successCount++;
      } else {
        const error = await response.text();
        console.log(`❌ Failed: ${card.title} - ${error}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ Error creating ${card.title}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Creation Summary:`);
  console.log(`✅ Successfully created: ${successCount} cards`);
  console.log(`❌ Failed to create: ${errorCount} cards`);

  return successCount;
}

async function verifyCards() {
  console.log('\n🧪 Verifying cards...');

  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`✅ Found ${data.data.length} cards in database`);

      console.log('\n📋 Current Cards:');
      data.data.forEach((card, index) => {
        console.log(`${index + 1}. ${card.title}`);
        console.log(`   Type: ${card.type}`);
        console.log(`   Description: ${card.description}`);
        console.log(`   Order: ${card.order_index || 'N/A'}`);
        console.log('');
      });

      // Check if we have exactly the 5 target cards
      const targetTitles = TARGET_CARDS.map(c => c.title);
      const currentTitles = data.data.map(c => c.title);

      const missingCards = targetTitles.filter(
        title => !currentTitles.includes(title)
      );
      const extraCards = currentTitles.filter(
        title => !targetTitles.includes(title)
      );

      if (missingCards.length === 0 && extraCards.length === 0) {
        console.log(
          '🎉 Perfect! All 5 target cards are present and no extra cards.'
        );
      } else {
        if (missingCards.length > 0) {
          console.log(`❌ Missing cards: ${missingCards.join(', ')}`);
        }
        if (extraCards.length > 0) {
          console.log(`⚠️ Extra cards: ${extraCards.join(', ')}`);
        }
      }
    } else {
      console.log('❌ Failed to fetch cards for verification');
    }
  } catch (error) {
    console.log(`❌ Error verifying cards: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('🎯 Cards Restructuring Plan:');
    console.log('1. Clear all existing cards');
    console.log('2. Create exactly 5 target cards');
    console.log('3. Verify the result\n');

    // Step 1: Clear existing cards
    await clearAllCards();

    // Step 2: Create target cards
    const createdCount = await createTargetCards();

    // Step 3: Verify
    await verifyCards();

    console.log('\n🎉 Cards restructuring complete!');
    console.log('🎯 You now have exactly 5 cards:');
    TARGET_CARDS.forEach((card, index) => {
      console.log(`   ${index + 1}. ${card.title} (${card.type})`);
    });

    console.log('\n🔗 Test your cards:');
    console.log(`   Cards API: ${API_BASE_URL}/api/cards`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content-management`);
  } catch (error) {
    console.error('❌ Error during cards restructuring:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
