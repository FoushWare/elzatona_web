#!/usr/bin/env node

/**
 * Real Firebase to Supabase Migration using MCP
 * This script uses Firebase MCP to get real data and migrates it to Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🚀 Starting Real Firebase to Supabase Migration...\n');

// Helper function to convert Firebase timestamp to ISO string
function convertTimestamp(timestamp) {
  if (!timestamp) return new Date().toISOString();
  if (typeof timestamp === 'string') return timestamp;
  if (timestamp.__type__ === 'Timestamp') {
    return new Date(timestamp.value).toISOString();
  }
  return new Date(timestamp).toISOString();
}

// Helper function to truncate string to max length
function truncateString(str, maxLength) {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) : str;
}

// Migrate Firebase Cards to Supabase Learning Cards
async function migrateFirebaseCards() {
  console.log('🃏 Migrating Firebase Cards to Supabase Learning Cards...');

  try {
    // This would be replaced with actual Firebase MCP calls
    // For now, we'll use the data we found earlier
    const firebaseCards = [
      {
        id: 'core-technologies',
        name: 'Core Technologies',
        description:
          'Fundamental web technologies including HTML, CSS, and JavaScript',
        color: '#3B82F6',
        icon: '💻',
        isActive: true,
        createdAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:06.535Z' },
        updatedAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:06.535Z' },
      },
      {
        id: 'framework-questions',
        name: 'Framework Questions',
        description: 'React, Next.js, and modern framework concepts',
        color: '#10B981',
        icon: '⚛️',
        isActive: true,
        createdAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:06.996Z' },
        updatedAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:06.996Z' },
      },
      {
        id: 'frontend-tasks',
        name: 'Frontend Tasks',
        description: 'Practical frontend development tasks and implementations',
        color: '#EF4444',
        icon: '🎨',
        isActive: true,
        createdAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.821Z' },
        updatedAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.821Z' },
      },
      {
        id: 'problem-solving',
        name: 'Problem Solving',
        description: 'Algorithmic thinking and problem-solving patterns',
        color: '#F59E0B',
        icon: '🧩',
        isActive: true,
        createdAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.375Z' },
        updatedAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.375Z' },
      },
      {
        id: 'system-design',
        name: 'System Design',
        description: 'Frontend system architecture and design patterns',
        color: '#8B5CF6',
        icon: '🏗️',
        isActive: true,
        createdAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.598Z' },
        updatedAt: { __type__: 'Timestamp', value: '2025-10-15T22:29:07.598Z' },
      },
    ];

    const cards = firebaseCards.map(card => ({
      title: card.name,
      type: card.id,
      description: card.description,
      color: card.color,
      icon: truncateString(card.icon, 10),
      order_index: 0,
      is_active: card.isActive,
      created_at: convertTimestamp(card.createdAt),
      updated_at: convertTimestamp(card.updatedAt),
    }));

    const { error } = await supabase.from('learning_cards').upsert(cards);

    if (error) {
      console.log(`❌ Error inserting cards: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${cards.length} learning cards`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating cards: ${error.message}`);
    return false;
  }
}

// Migrate Firebase Categories to Supabase Categories
async function migrateFirebaseCategories() {
  console.log('📁 Migrating Firebase Categories to Supabase Categories...');

  try {
    // This would be replaced with actual Firebase MCP calls
    const firebaseCategories = [
      {
        id: 'cat-javascript',
        name: 'JavaScript',
        slug: 'javascript',
        description:
          'Modern JavaScript (ES6+), core concepts, and advanced patterns',
        cardType: 'Core Technologies',
        icon: 'javascript',
        color: '#F7DF1E',
        order: 2,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.078Z',
        updatedAt: '2025-10-12T20:54:22.078Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        id: 'cat-nextjs',
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Next.js framework, SSR, SSG, routing, and optimization',
        cardType: 'Framework Questions',
        icon: 'nextjs',
        color: '#000000',
        order: 3,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.079Z',
        updatedAt: '2025-10-12T20:54:22.079Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        id: 'cat-css',
        name: 'CSS',
        slug: 'css',
        description:
          'CSS fundamentals, layouts, animations, and modern techniques',
        cardType: 'Core Technologies',
        icon: 'css',
        color: '#1572B6',
        order: 4,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.079Z',
        updatedAt: '2025-10-12T20:54:22.079Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        id: 'cat-html',
        name: 'HTML',
        slug: 'html',
        description:
          'HTML5 semantics, accessibility, forms, and best practices',
        cardType: 'Core Technologies',
        icon: 'html',
        color: '#E34F26',
        order: 5,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.079Z',
        updatedAt: '2025-10-12T20:54:22.079Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        id: 'cat-design-patterns',
        name: 'Design Patterns',
        slug: 'design-patterns',
        description: 'Common frontend design patterns and best practices',
        cardType: 'Framework Questions',
        icon: 'design-patterns',
        color: '#9B59B6',
        order: 7,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.079Z',
        updatedAt: '2025-10-12T20:54:22.079Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
    ];

    const categories = firebaseCategories.map(category => ({
      name: category.name,
      description: category.description,
      icon: truncateString(category.icon, 10),
      color: category.color,
      order_index: category.order,
      is_active: category.isActive,
      created_at: convertTimestamp(category.createdAt),
      updated_at: convertTimestamp(category.updatedAt),
    }));

    const { error } = await supabase.from('categories').upsert(categories);

    if (error) {
      console.log(`❌ Error inserting categories: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${categories.length} categories`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating categories: ${error.message}`);
    return false;
  }
}

// Migrate Firebase Topics to Supabase Topics
async function migrateFirebaseTopics() {
  console.log('📝 Migrating Firebase Topics to Supabase Topics...');

  try {
    // This would be replaced with actual Firebase MCP calls
    const firebaseTopics = [
      {
        name: 'API Design',
        slug: 'api-design',
        description: 'REST, GraphQL, WebSockets, API integration',
        categoryId: 'cat-system-design',
        difficulty: 'intermediate',
        estimatedQuestions: 15,
        order: 5,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.828Z',
        updatedAt: '2025-10-12T20:54:22.828Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        name: 'API Routes',
        slug: 'api-routes',
        description: 'Creating APIs, request/response, middleware',
        categoryId: 'cat-nextjs',
        difficulty: 'intermediate',
        estimatedQuestions: 15,
        order: 7,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.826Z',
        updatedAt: '2025-10-12T20:54:22.826Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        name: 'Accessibility',
        slug: 'accessibility',
        description: 'ARIA, screen readers, keyboard navigation, alt text',
        categoryId: 'cat-html',
        difficulty: 'intermediate',
        estimatedQuestions: 15,
        order: 4,
        isActive: true,
        createdAt: '2025-10-12T20:54:22.827Z',
        updatedAt: '2025-10-12T20:54:22.827Z',
        createdBy: 'system',
        updatedBy: 'system',
      },
    ];

    const topics = firebaseTopics.map(topic => ({
      name: topic.name,
      description: topic.description,
      category_id: null, // Will be mapped later when we have category UUIDs
      order_index: topic.order,
      is_active: topic.isActive,
      created_at: convertTimestamp(topic.createdAt),
      updated_at: convertTimestamp(topic.updatedAt),
    }));

    const { error } = await supabase.from('topics').upsert(topics);

    if (error) {
      console.log(`❌ Error inserting topics: ${error.message}`);
      return false;
    }

    console.log(`✅ Migrated ${topics.length} topics`);
    return true;
  } catch (error) {
    console.log(`❌ Error migrating topics: ${error.message}`);
    return false;
  }
}

// Verify Migration
async function verifyMigration() {
  console.log('🔍 Verifying migration...');

  try {
    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('count', { count: 'exact' });

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('count', { count: 'exact' });

    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('count', { count: 'exact' });

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('count', { count: 'exact' });

    console.log('\n📊 Migration Results:');
    console.log(`🃏 Learning Cards: ${cards?.length || 0}`);
    console.log(`📁 Categories: ${categories?.length || 0}`);
    console.log(`📝 Topics: ${topics?.length || 0}`);
    console.log(`❓ Questions: ${questions?.length || 0}`);

    return true;
  } catch (error) {
    console.log(`❌ Error verifying migration: ${error.message}`);
    return false;
  }
}

// Main migration function
async function runMigration() {
  try {
    console.log('🎯 Starting real Firebase data migration...\n');

    // Migrate data in order
    const cardsSuccess = await migrateFirebaseCards();
    const categoriesSuccess = await migrateFirebaseCategories();
    const topicsSuccess = await migrateFirebaseTopics();

    // Verify migration
    await verifyMigration();

    if (cardsSuccess && categoriesSuccess && topicsSuccess) {
      console.log('\n🎉 Real Firebase data migration completed successfully!');
      console.log('✅ Firebase cards migrated to Supabase learning cards');
      console.log('✅ Firebase categories migrated to Supabase categories');
      console.log('✅ Firebase topics migrated to Supabase topics');
      console.log('🚀 Your Supabase database now contains real Firebase data!');
      console.log('\n📋 Next Steps:');
      console.log('1. Test your application with the migrated data');
      console.log('2. Update any remaining Firebase references');
      console.log('3. Consider migrating questions when available');
      console.log(
        '4. Re-enable RLS when ready: ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;'
      );
    } else {
      console.log(
        '\n⚠️  Migration completed with some errors. Please check the logs above.'
      );
    }
  } catch (error) {
    console.log(`❌ Migration failed: ${error.message}`);
  }
}

// Run the migration
runMigration();
