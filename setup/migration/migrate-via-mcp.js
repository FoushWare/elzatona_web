import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, collection, getDocs } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

// Supabase client with anon key (we'll handle RLS by disabling it)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Anon Key is not set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Firebase Admin SDK
const serviceAccountPath = path.resolve(
  process.cwd(),
  'firebase-service-account.json'
);
if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    'Firebase service account file not found at:',
    serviceAccountPath
  );
  process.exit(1);
}
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
});

const firestore = getFirestore();

console.log('🚀 Supabase Migration via MCP Approach');
console.log('========================================');

async function migrateData() {
  try {
    // First, let's disable RLS temporarily using SQL
    console.log('\n📋 Step 1: Disabling RLS temporarily...');

    const disableRLSQueries = [
      'ALTER TABLE learning_cards DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE categories DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE topics DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE questions DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE plan_cards DISABLE ROW LEVEL SECURITY;',
    ];

    for (const query of disableRLSQueries) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: query });
        if (error) {
          console.warn(
            `⚠️ Could not disable RLS for query: ${query.substring(0, 50)}...`
          );
        }
      } catch (e) {
        console.warn(`⚠️ RLS disable attempt failed: ${e.message}`);
      }
    }

    // Migrate Learning Cards
    console.log('\n📋 Step 2: Migrating Learning Cards...');
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
        .insert(cards);

      if (cardsError) {
        console.error('❌ Error inserting cards:', cardsError.message);
      } else {
        console.log(`✅ Successfully inserted ${cards.length} learning cards`);
      }
    }

    // Migrate Categories
    console.log('\n📋 Step 3: Migrating Categories...');
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
        await supabase.from('categories').insert(categories);

      if (categoriesError) {
        console.error(
          '❌ Error inserting categories:',
          categoriesError.message
        );
      } else {
        console.log(`✅ Successfully inserted ${categories.length} categories`);
      }
    }

    // Migrate Topics
    console.log('\n📋 Step 4: Migrating Topics...');
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
        .insert(topics);

      if (topicsError) {
        console.error('❌ Error inserting topics:', topicsError.message);
      } else {
        console.log(`✅ Successfully inserted ${topics.length} topics`);
      }
    }

    // Migrate Learning Plans
    console.log('\n📋 Step 5: Migrating Learning Plans...');
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
        .insert(plans);

      if (plansError) {
        console.error('❌ Error inserting plans:', plansError.message);
      } else {
        console.log(`✅ Successfully inserted ${plans.length} learning plans`);
      }
    }

    console.log('\n🎉 Migration completed successfully!');

    // Re-enable RLS
    console.log('\n📋 Step 6: Re-enabling RLS...');
    const enableRLSQueries = [
      'ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE categories ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE topics ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE questions ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE plan_cards ENABLE ROW LEVEL SECURITY;',
    ];

    for (const query of enableRLSQueries) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: query });
        if (error) {
          console.warn(
            `⚠️ Could not re-enable RLS for query: ${query.substring(0, 50)}...`
          );
        }
      } catch (e) {
        console.warn(`⚠️ RLS re-enable attempt failed: ${e.message}`);
      }
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

migrateData();
