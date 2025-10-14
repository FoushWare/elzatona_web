#!/usr/bin/env ts-node

/**
 * Master React Questions Seeding Script
 * This script runs all React question seeding scripts in sequence
 */

import { clearQuestions } from './clear-questions';
import { seedReactQuestions1To25 } from './seed-react-1-25';
import { seedReactQuestions26To50 } from './seed-react-26-50';
import { seedReactQuestions51To75 } from './seed-react-51-75';
import { seedReactQuestions76To100 } from './seed-react-76-100';
import { seedReactQuestions101To151 } from './seed-react-101-151';
import { seedReactQuestions152To200 } from './seed-react-152-200';
import { seedReactQuestions201To251 } from './seed-react-201-251';
import { seedReactQuestions252To306 } from './seed-react-252-306';

async function seedAllReactQuestions() {
  try {
    console.log('🚀 Starting complete React questions seeding process...');
    console.log('='.repeat(60));

    // Step 1: Clear existing questions
    console.log('📋 Step 1: Clearing existing questions...');
    await clearQuestions();
    console.log('✅ Questions cleared successfully\n');

    // Step 2: Seed questions 1-25
    console.log('📋 Step 2: Seeding React questions 1-25...');
    await seedReactQuestions1To25();
    console.log('✅ Questions 1-25 seeded successfully\n');

    // Step 3: Seed questions 26-50
    console.log('📋 Step 3: Seeding React questions 26-50...');
    await seedReactQuestions26To50();
    console.log('✅ Questions 26-50 seeded successfully\n');

    // Step 4: Seed questions 51-75
    console.log('📋 Step 4: Seeding React questions 51-75...');
    await seedReactQuestions51To75();
    console.log('✅ Questions 51-75 seeded successfully\n');

    // Step 5: Seed questions 76-100
    console.log('📋 Step 5: Seeding React questions 76-100...');
    await seedReactQuestions76To100();
    console.log('✅ Questions 76-100 seeded successfully\n');

    // Step 6: Seed questions 101-151
    console.log('📋 Step 6: Seeding React questions 101-151...');
    await seedReactQuestions101To151();
    console.log('✅ Questions 101-151 seeded successfully\n');

    // Step 7: Seed questions 152-200
    console.log('📋 Step 7: Seeding React questions 152-200...');
    await seedReactQuestions152To200();
    console.log('✅ Questions 152-200 seeded successfully\n');

    // Step 8: Seed questions 201-251
    console.log('📋 Step 8: Seeding React questions 201-251...');
    await seedReactQuestions201To251();
    console.log('✅ Questions 201-251 seeded successfully\n');

    // Step 9: Seed questions 252-306
    console.log('📋 Step 9: Seeding React questions 252-306...');
    await seedReactQuestions252To306();
    console.log('✅ Questions 252-306 seeded successfully\n');

    console.log('='.repeat(60));
    console.log('🎉 ALL REACT QUESTIONS SEEDED SUCCESSFULLY!');
    console.log('📊 Total Questions Seeded: ~306 React Questions');
    console.log(
      '🏷️  All questions assigned to: framework-questions learning card'
    );
    console.log('✨ Process completed successfully!');
  } catch (error) {
    console.error('💥 Error in master seeding process:', error);
    process.exit(1);
  }
}

// Run the master script
if (require.main === module) {
  seedAllReactQuestions()
    .then(() => {
      console.log('🏁 Master seeding script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Master seeding script failed:', error);
      process.exit(1);
    });
}

export { seedAllReactQuestions };
