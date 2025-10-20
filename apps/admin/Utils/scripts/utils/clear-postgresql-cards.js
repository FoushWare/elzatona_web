#!/usr/bin/env node

/**
 * Clear PostgreSQL Learning Cards
 * Removes all learning cards from PostgreSQL database
 */

import 'dotenv/config';

console.log('🗑️ Clearing PostgreSQL Learning Cards...\n');

const API_BASE_URL = 'http://localhost:3000';

async function clearAllCards() {
  try {
    console.log('🗑️ Fetching all learning cards...');

    // Get all cards
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success && data.data) {
      console.log(`Found ${data.data.length} cards to delete`);

      let deletedCount = 0;
      let errorCount = 0;

      for (const card of data.data) {
        try {
          console.log(`🗑️ Deleting card: ${card.title} (${card.id})`);

          const deleteResponse = await fetch(
            `${API_BASE_URL}/api/cards/${card.id}`,
            {
              method: 'DELETE',
            }
          );

          if (deleteResponse.ok) {
            deletedCount++;
            console.log(`✅ Deleted: ${card.title}`);
          } else {
            const error = await deleteResponse.text();
            console.log(`❌ Failed to delete ${card.title}: ${error}`);
            errorCount++;
          }
        } catch (error) {
          console.log(`❌ Error deleting ${card.title}: ${error.message}`);
          errorCount++;
        }
      }

      console.log('\n📊 Clearing Summary:');
      console.log(`✅ Cards deleted: ${deletedCount}`);
      console.log(`❌ Errors: ${errorCount}`);

      return { deletedCount, errorCount };
    } else {
      console.log('No cards found to delete');
      return { deletedCount: 0, errorCount: 0 };
    }
  } catch (error) {
    console.log(`❌ Error clearing cards: ${error.message}`);
    return { deletedCount: 0, errorCount: 1 };
  }
}

async function verifyClearing() {
  console.log('\n🧪 Verifying Cards Clearing...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`);
    const data = await response.json();

    if (data.success) {
      console.log(`🎯 Learning cards remaining: ${data.data?.length || 0}`);

      if (data.data && data.data.length > 0) {
        console.log('Remaining cards:');
        data.data.forEach((card, index) => {
          console.log(`  ${index + 1}. ${card.title} (${card.type})`);
        });
      } else {
        console.log('✅ All cards cleared successfully!');
      }
    } else {
      console.log('❌ Failed to verify clearing');
    }
  } catch (error) {
    console.log(`❌ Error verifying clearing: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('🗑️ PostgreSQL Learning Cards Clearing Plan:');
    console.log('1. Fetch all existing learning cards');
    console.log('2. Delete each card individually');
    console.log('3. Verify all cards are cleared\n');

    // Step 1: Clear all cards
    const result = await clearAllCards();

    // Step 2: Verify
    await verifyClearing();

    console.log('\n🎉 PostgreSQL Learning Cards Clearing Complete!');
    console.log(`🗑️ Cards deleted: ${result.deletedCount}`);

    if (result.errorCount === 0) {
      console.log('✅ Perfect! No errors during clearing.');
    } else {
      console.log(`⚠️ ${result.errorCount} errors occurred during clearing.`);
    }

    console.log('\n🚀 Ready for fresh learning cards seeding!');
  } catch (error) {
    console.error('❌ Error during cards clearing:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
