#!/usr/bin/env node

/**
 * Database Switching Demo
 *
 * This script demonstrates how the database abstraction allows
 * switching between Firebase and Supabase at runtime.
 */

import { DatabaseServiceFactory } from './libs/database/src/lib/DatabaseContext';

// Mock environment variables for demonstration
const scenarios = [
  {
    name: 'Firebase Configuration',
    env: {
      NEXT_PUBLIC_USE_FIREBASE: 'true',
      NEXT_PUBLIC_FIREBASE_API_KEY: 'demo-firebase-key',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-project',
    },
  },
  {
    name: 'Supabase Configuration',
    env: {
      NEXT_PUBLIC_USE_FIREBASE: 'false',
      NEXT_PUBLIC_SUPABASE_URL: 'https://demo.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'demo-supabase-key',
    },
  },
  {
    name: 'Default Configuration (Supabase)',
    env: {
      // NEXT_PUBLIC_USE_FIREBASE not set
      NEXT_PUBLIC_SUPABASE_URL: 'https://demo.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'demo-supabase-key',
    },
  },
];

console.log('🔄 Database Switching Demo\n');

scenarios.forEach((scenario, index) => {
  console.log(`📋 Scenario ${index + 1}: ${scenario.name}`);
  console.log('Environment variables:');
  Object.entries(scenario.env).forEach(([key, value]) => {
    console.log(`  ${key}=${value}`);
  });

  // Set environment variables
  Object.assign(process.env, scenario.env);

  try {
    // Create database service
    const service = DatabaseServiceFactory.create();

    console.log('✅ Database service created successfully');
    console.log(`   Service type: ${service.constructor.name}`);
    console.log(
      `   Available methods: ${Object.getOwnPropertyNames(
        Object.getPrototypeOf(service)
      )
        .filter(
          name =>
            name !== 'constructor' &&
            typeof service[name as keyof typeof service] === 'function'
        )
        .join(', ')}`
    );
  } catch (error) {
    console.log(`❌ Error creating database service: ${error}`);
  }

  console.log(''); // Empty line for readability
});

console.log('🎯 Key Benefits:');
console.log('  • Single interface for multiple database providers');
console.log('  • Runtime switching via environment variables');
console.log('  • Consistent API across Firebase and Supabase');
console.log('  • Easy testing with mock implementations');
console.log('  • Future-proof for additional database providers');

console.log('\n📚 Usage in React Components:');
console.log(`
import { useDatabase } from 'database';

function MyComponent() {
  const db = useDatabase();
  
  const handleSave = async () => {
    const result = await db.add('users', { name: 'John' });
    if (result.error) {
      console.error('Error:', result.error);
    } else {
      console.log('Success:', result.data);
    }
  };
  
  return <button onClick={handleSave}>Save User</button>;
}
`);

console.log('\n🔧 Configuration:');
console.log(`
# .env.local
NEXT_PUBLIC_USE_FIREBASE=false
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
`);

export {};
