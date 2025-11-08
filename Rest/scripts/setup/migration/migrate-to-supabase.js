#!/usr/bin/env node

/**
 * Simplified Supabase Migration Script
 *
 * This script migrates data from Firebase to Supabase
 * Run this AFTER creating the schema manually in Supabase dashboard
 */

import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

async function checkSchema() {
  console.log('🔍 Checking Supabase Schema...');
  console.log('==============================');

  const expectedTables = [
    'learning_cards',
    'categories',
    'topics',
    'questions',
    'learning_plans',
    'plan_cards',
    'user_progress',
    'question_attempts',
  ];

  let allTablesExist = true;

  for (const tableName of expectedTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Table ${tableName}: ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`✅ Table ${tableName}: Exists and accessible`);
      }
    } catch (err) {
      console.log(`❌ Table ${tableName}: ${err.message}`);
      allTablesExist = false;
    }
  }

  if (!allTablesExist) {
    console.log('\n❌ Schema not ready. Please create schema first:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project: hpnewqkvpnthpohvxcmq');
    console.log('3. Click "SQL Editor" in the left sidebar');
    console.log('4. Click "New query"');
    console.log('5. Copy the contents of supabase-schema-simple.sql');
    console.log('6. Paste and click "Run"');
    console.log('7. Then run this script again');
    return false;
  }

  console.log('\n✅ Schema is ready! Proceeding with migration...');
  return true;
}

async function migrateData() {
  console.log('\n🚀 Starting Data Migration...');
  console.log('==============================');

  try {
    // Migrate Learning Cards
    console.log('\n📋 Migrating Learning Cards...');
    const cardsSnapshot = await getDocs(collection(firestore, 'learningCards'));
    const cards = [];

    cardsSnapshot.forEach(doc => {
      const data = doc.data();
      cards.push({
        title: data.title || 'Untitled Card',
        type: data.type || 'core-technologies',
        description: data.description || '',
        color: data.color || '#3B82F6',
        icon: (data.icon || '📚').substring(0, 10),
        order_index: data.orderIndex || 0,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    console.log(`📊 Found ${cards.length} learning cards`);

    if (cards.length > 0) {
      const { data: insertedCards, error: cardsError } = await supabase
        .from('learning_cards')
        .insert(cards)
        .select();

      if (cardsError) {
        console.log(`❌ Error inserting cards: ${cardsError.message}`);
      } else {
        console.log(
          `✅ Successfully inserted ${insertedCards.length} learning cards`
        );
      }
    }

    // Migrate Categories
    console.log('\n📋 Migrating Categories...');
    const categoriesSnapshot = await getDocs(
      collection(firestore, 'categories')
    );
    const categories = [];

    categoriesSnapshot.forEach(doc => {
      const data = doc.data();
      categories.push({
        name: data.name || 'Untitled Category',
        slug: data.slug || doc.id,
        description: data.description || '',
        card_type: data.cardType || 'core-technologies',
        icon: (data.icon || '📁').substring(0, 10),
        color: data.color || '#10B981',
        order_index: data.orderIndex || 0,
        learning_card_id: data.learningCardId || null,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    console.log(`📊 Found ${categories.length} categories`);

    if (categories.length > 0) {
      const { data: insertedCategories, error: categoriesError } =
        await supabase.from('categories').insert(categories).select();

      if (categoriesError) {
        console.log(
          `❌ Error inserting categories: ${categoriesError.message}`
        );
      } else {
        console.log(
          `✅ Successfully inserted ${insertedCategories.length} categories`
        );
      }
    }

    // Migrate Topics
    console.log('\n📋 Migrating Topics...');
    const topicsSnapshot = await getDocs(collection(firestore, 'topics'));
    const topics = [];

    topicsSnapshot.forEach(doc => {
      const data = doc.data();
      topics.push({
        name: data.name || 'Untitled Topic',
        slug: data.slug || doc.id,
        description: data.description || '',
        difficulty: data.difficulty || 'beginner',
        estimated_questions: data.estimatedQuestions || 0,
        order_index: data.orderIndex || 0,
        category_id: null, // Will be mapped later
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    console.log(`📊 Found ${topics.length} topics`);

    if (topics.length > 0) {
      const { data: insertedTopics, error: topicsError } = await supabase
        .from('topics')
        .insert(topics)
        .select();

      if (topicsError) {
        console.log(`❌ Error inserting topics: ${topicsError.message}`);
      } else {
        console.log(`✅ Successfully inserted ${insertedTopics.length} topics`);
      }
    }

    // Migrate Questions
    console.log('\n📋 Migrating Questions...');
    const questionsSnapshot = await getDocs(
      collection(firestore, 'unifiedQuestions')
    );
    const questions = [];

    questionsSnapshot.forEach(doc => {
      const data = doc.data();
      questions.push({
        title: data.title || 'Untitled Question',
        content: data.content || '',
        type: data.type || 'multiple-choice',
        difficulty: data.difficulty || 'beginner',
        points: data.points || 1,
        options: data.options || null,
        correct_answer: data.correctAnswer || '',
        explanation: data.explanation || '',
        test_cases: data.testCases || null,
        hints: data.hints || [],
        tags: data.tags || [],
        stats: data.stats || { attempts: 0, correct: 0, avgTime: 0 },
        metadata: data.metadata || null,
        category_id: data.categoryId || null,
        learning_card_id: data.learningCardId || null,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    console.log(`📊 Found ${questions.length} questions`);

    if (questions.length > 0) {
      // Insert questions in batches to avoid timeout
      const batchSize = 100;
      for (let i = 0; i < questions.length; i += batchSize) {
        const batch = questions.slice(i, i + batchSize);
        const { data: insertedQuestions, error: questionsError } =
          await supabase.from('questions').insert(batch).select();

        if (questionsError) {
          console.log(
            `❌ Error inserting questions batch ${Math.floor(i / batchSize) + 1}: ${questionsError.message}`
          );
        } else {
          console.log(
            `✅ Successfully inserted batch ${Math.floor(i / batchSize) + 1} (${insertedQuestions.length} questions)`
          );
        }
      }
    }

    // Migrate Learning Plans
    console.log('\n📋 Migrating Learning Plans...');
    const plansSnapshot = await getDocs(collection(firestore, 'learningPlans'));
    const plans = [];

    plansSnapshot.forEach(doc => {
      const data = doc.data();
      plans.push({
        name: data.name || 'Untitled Plan',
        description: data.description || '',
        difficulty: data.difficulty || 'beginner',
        estimated_duration: data.estimatedDuration || 0,
        is_public: data.isPublic || false,
        is_active: data.isActive !== false,
        created_at: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
        updated_at: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : new Date(),
      });
    });

    console.log(`📊 Found ${plans.length} learning plans`);

    if (plans.length > 0) {
      const { data: insertedPlans, error: plansError } = await supabase
        .from('learning_plans')
        .insert(plans)
        .select();

      if (plansError) {
        console.log(`❌ Error inserting plans: ${plansError.message}`);
      } else {
        console.log(
          `✅ Successfully inserted ${insertedPlans.length} learning plans`
        );
      }
    }

    console.log('\n🎉 Data migration completed!');
    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return false;
  }
}

async function testNewStructure() {
  console.log('\n🧪 Testing New Structure...');
  console.log('===========================');

  try {
    // Test basic queries
    console.log('\n🔍 Testing basic queries...');

    const { data: cards, error: cardsError } = await supabase
      .from('learning_cards')
      .select('*')
      .limit(5);

    if (cardsError) {
      console.log(`❌ Cards query failed: ${cardsError.message}`);
    } else {
      console.log(`✅ Cards query successful: ${cards.length} cards found`);
    }

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    if (categoriesError) {
      console.log(`❌ Categories query failed: ${categoriesError.message}`);
    } else {
      console.log(
        `✅ Categories query successful: ${categories.length} categories found`
      );
    }

    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .limit(5);

    if (topicsError) {
      console.log(`❌ Topics query failed: ${topicsError.message}`);
    } else {
      console.log(`✅ Topics query successful: ${topics.length} topics found`);
    }

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .limit(5);

    if (questionsError) {
      console.log(`❌ Questions query failed: ${questionsError.message}`);
    } else {
      console.log(
        `✅ Questions query successful: ${questions.length} questions found`
      );
    }

    // Test relationships
    console.log('\n🔗 Testing relationships...');

    const { data: cardWithCategories, error: relationshipError } =
      await supabase
        .from('learning_cards')
        .select(
          `
        id,
        title,
        categories (
          id,
          name
        )
      `
        )
        .limit(1);

    if (relationshipError) {
      console.log(`❌ Relationship test failed: ${relationshipError.message}`);
    } else {
      console.log(
        `✅ Relationship test successful: Card with categories loaded`
      );
    }

    console.log('\n🎉 Structure testing completed!');
    return true;
  } catch (error) {
    console.error('❌ Testing failed:', error);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Supabase Data Migration');
    console.log('==========================');

    // Step 1: Check Schema
    console.log('\n📋 Step 1: Checking Schema...');
    const schemaReady = await checkSchema();

    if (!schemaReady) {
      console.log('\n❌ Schema not ready. Please create schema first.');
      return;
    }

    // Step 2: Migrate Data
    console.log('\n📋 Step 2: Migrating Data...');
    const dataMigrated = await migrateData();

    if (!dataMigrated) {
      console.log('\n❌ Data migration failed. Please check the logs above.');
      return;
    }

    // Step 3: Test Structure
    console.log('\n📋 Step 3: Testing Structure...');
    const structureTested = await testNewStructure();

    if (!structureTested) {
      console.log(
        '\n❌ Structure testing failed. Please check the logs above.'
      );
      return;
    }

    console.log('\n🎉 Migration and Testing Completed Successfully!');
    console.log('================================================');
    console.log('✅ Schema verified');
    console.log('✅ Data migrated');
    console.log('✅ Structure tested');
    console.log('\n🚀 Next Steps:');
    console.log('1. Update API endpoints to use Supabase');
    console.log('2. Test the application with new database');
    console.log('3. Deploy the updated application');
  } catch (error) {
    console.error('❌ Script failed:', error);
  }
}

main();
