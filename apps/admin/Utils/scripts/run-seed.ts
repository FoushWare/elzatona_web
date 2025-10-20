#!/usr/bin/env ts-node

// v1.0 - Script runner for seeding frontend tasks

import { seedFrontendTasks } from './seed-frontend-tasks';

async function main() {
  console.log('🚀 Starting frontend tasks seeding process...');

  try {
    await seedFrontendTasks();
    console.log('✅ Seeding process completed successfully!');
    console.log(
      '📝 You can now test the CRUD functionality in the admin panel.'
    );
    console.log(
      '🌐 Visit http://localhost:3002/admin/frontend-tasks to see the tasks.'
    );
  } catch (error) {
    console.error('❌ Seeding process failed:', error);
    process.exit(1);
  }
}

main();
