#!/usr/bin/env node

/**
 * Seed Learning Cards
 * Creates the 5 main learning cards for the system
 */

import 'dotenv/config';

console.log('🎯 Seeding Learning Cards...\n');

const API_BASE_URL = 'http://localhost:3000';

// Define the 5 learning cards
const LEARNING_CARDS = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description:
      'Fundamental web technologies including HTML, CSS, JavaScript, and core programming concepts',
    color: '#3B82F6',
    icon: '💻',
    order_index: 1,
    isActive: true,
  },
  {
    title: 'Framework Questions',
    type: 'framework-questions',
    description:
      'React, Next.js, Vue, Angular and modern framework concepts, patterns, and best practices',
    color: '#10B981',
    icon: '⚛️',
    order_index: 2,
    isActive: true,
  },
  {
    title: 'Problem Solving',
    type: 'problem-solving',
    description:
      'Algorithmic thinking, data structures, coding challenges, and problem-solving patterns',
    color: '#F59E0B',
    icon: '🧩',
    order_index: 3,
    isActive: true,
  },
  {
    title: 'System Design',
    type: 'system-design',
    description:
      'Large-scale system architecture, design patterns, scalability, and distributed systems',
    color: '#8B5CF6',
    icon: '🏗️',
    order_index: 4,
    isActive: true,
  },
  {
    title: 'Frontend Tasks',
    type: 'frontend-tasks',
    description:
      'Practical frontend development tasks, implementations, UI/UX challenges, and real-world projects',
    color: '#EF4444',
    icon: '🎨',
    order_index: 5,
    isActive: true,
  },
];

async function createLearningCard(cardData) {
  try {
    console.log(`🎯 Creating learning card: ${cardData.title}`);

    const response = await fetch(`${API_BASE_URL}/api/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `✅ Created learning card: ${cardData.title} (ID: ${result.data?.id || 'unknown'})`
      );
      return result.data?.id;
    } else {
      const error = await response.text();
      console.log(
        `❌ Failed to create learning card ${cardData.title}: ${error}`
      );
      return null;
    }
  } catch (error) {
    console.log(
      `❌ Error creating learning card ${cardData.title}: ${error.message}`
    );
    return null;
  }
}

async function seedLearningCards() {
  console.log('🎯 Starting Learning Cards Seeding...\n');

  let cardsCreated = 0;
  let errors = 0;

  for (const cardData of LEARNING_CARDS) {
    try {
      const cardId = await createLearningCard(cardData);

      if (cardId) {
        cardsCreated++;
      } else {
        errors++;
      }

      console.log(''); // Empty line for readability
    } catch (error) {
      console.log(
        `❌ Error processing learning card ${cardData.title}: ${error.message}`
      );
      errors++;
    }
  }

  console.log('📊 Learning Cards Seeding Summary:');
  console.log(`✅ Cards created: ${cardsCreated}`);
  console.log(`❌ Errors: ${errors}`);

  return { cardsCreated, errors };
}

async function verifySeeding() {
  console.log('\n🧪 Verifying Learning Cards...\n');

  try {
    // Check learning cards
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success) {
      console.log(`🎯 Learning cards found: ${data.data?.length || 0}`);
      data.data?.forEach((card, index) => {
        console.log(`  ${index + 1}. ${card.title} (${card.type})`);
        console.log(`     Description: ${card.description}`);
        console.log(`     Order: ${card.order_index || 'N/A'}`);
        console.log(`     Active: ${card.isActive ? 'Yes' : 'No'}`);
        console.log('');
      });
    } else {
      console.log('❌ Failed to fetch learning cards');
    }
  } catch (error) {
    console.log(`❌ Error verifying learning cards: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('🎯 Learning Cards Seeding Plan:');
    console.log('1. Create 5 learning cards');
    console.log('2. Verify the seeding results\n');

    // Step 1: Seed learning cards
    const result = await seedLearningCards();

    // Step 2: Verify
    await verifySeeding();

    console.log('\n🎉 Learning Cards Seeding Complete!');
    console.log(`🎯 Cards created: ${result.cardsCreated}/5`);

    if (result.errors === 0) {
      console.log('✅ Perfect! No errors during seeding.');
    } else {
      console.log(`⚠️ ${result.errors} errors occurred during seeding.`);
    }

    console.log('\n🔗 Test your learning cards:');
    console.log(`   Cards API: ${API_BASE_URL}/api/cards`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content-management`);

    console.log('\n🚀 Next step: Seed questions for each card category');
  } catch (error) {
    console.error('❌ Error during learning cards seeding:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
