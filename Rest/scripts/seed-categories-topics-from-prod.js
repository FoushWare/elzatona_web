/**
 * Script to seed categories and topics from production (zatona-web) to test (zatona-web-testing)
 *
 * Usage: node Rest/scripts/seed-categories-topics-from-prod.js
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ path: path.resolve(__dirname, '../../.env.test.local') });

const PROD_PROJECT_URL = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const PROD_SERVICE_KEY =
  process.env.PROD_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY; // Use prod key if available, otherwise fallback

const TEST_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const TEST_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!PROD_SERVICE_KEY) {
  console.error('❌ PROD_SUPABASE_SERVICE_ROLE_KEY not found in environment');
  console.log(
    '💡 You may need to set PROD_SUPABASE_SERVICE_ROLE_KEY in .env.test.local'
  );
  process.exit(1);
}

if (!TEST_PROJECT_URL || !TEST_SERVICE_KEY) {
  console.error('❌ Test Supabase credentials not found in .env.test.local');
  process.exit(1);
}

const prodClient = createClient(PROD_PROJECT_URL, PROD_SERVICE_KEY, {
  auth: { persistSession: false },
});

const testClient = createClient(TEST_PROJECT_URL, TEST_SERVICE_KEY, {
  auth: { persistSession: false },
});

async function seedCategoriesAndTopics() {
  try {
    console.log('📥 Fetching categories from production...');
    const { data: categories, error: categoriesError } = await prodClient
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (categoriesError) {
      throw new Error(`Failed to fetch categories: ${categoriesError.message}`);
    }

    console.log(`✅ Found ${categories.length} categories in production`);

    console.log('📥 Fetching topics from production...');
    const { data: topics, error: topicsError } = await prodClient
      .from('topics')
      .select('*')
      .order('order_index', { ascending: true });

    if (topicsError) {
      throw new Error(`Failed to fetch topics: ${topicsError.message}`);
    }

    console.log(`✅ Found ${topics.length} topics in production`);

    // Check existing categories in test
    const { data: existingCategories } = await testClient
      .from('categories')
      .select('id, slug');

    const existingSlugs = new Set(existingCategories?.map(c => c.slug) || []);
    console.log(
      `📊 Found ${existingCategories?.length || 0} existing categories in test project`
    );

    // Insert categories (without learning_card_id since test has no learning_cards)
    const categoryIdMap = new Map(); // old_id -> new_id
    let insertedCategories = 0;
    let skippedCategories = 0;

    for (const category of categories) {
      if (existingSlugs.has(category.slug)) {
        console.log(
          `⏭️  Skipping category "${category.name}" (slug already exists)`
        );
        skippedCategories++;
        // Get the existing category ID for mapping
        const existing = existingCategories.find(c => c.slug === category.slug);
        if (existing) {
          categoryIdMap.set(category.id, existing.id);
        }
        continue;
      }

      const { data: newCategory, error: insertError } = await testClient
        .from('categories')
        .insert({
          name: category.name,
          slug: category.slug,
          description: category.description,
          card_type: category.card_type,
          icon: category.icon,
          color: category.color,
          order_index: category.order_index,
          learning_card_id: null, // Set to null since test has no learning_cards
          is_active: category.is_active,
          created_at: category.created_at,
          updated_at: category.updated_at,
        })
        .select('id')
        .single();

      if (insertError) {
        console.error(
          `❌ Failed to insert category "${category.name}": ${insertError.message}`
        );
        continue;
      }

      categoryIdMap.set(category.id, newCategory.id);
      insertedCategories++;
      console.log(`✅ Inserted category: ${category.name} (${newCategory.id})`);
    }

    console.log(
      `\n📊 Categories: ${insertedCategories} inserted, ${skippedCategories} skipped`
    );

    // Check existing topics in test
    const { data: existingTopics } = await testClient
      .from('topics')
      .select('id, slug');

    const existingTopicSlugs = new Set(existingTopics?.map(t => t.slug) || []);
    console.log(
      `📊 Found ${existingTopics?.length || 0} existing topics in test project`
    );

    // Insert topics with mapped category_ids
    let insertedTopics = 0;
    let skippedTopics = 0;
    let failedTopics = 0;

    for (const topic of topics) {
      if (existingTopicSlugs.has(topic.slug)) {
        console.log(`⏭️  Skipping topic "${topic.name}" (slug already exists)`);
        skippedTopics++;
        continue;
      }

      // Map category_id
      const newCategoryId = topic.category_id
        ? categoryIdMap.get(topic.category_id)
        : null;

      if (topic.category_id && !newCategoryId) {
        console.warn(
          `⚠️  Topic "${topic.name}" has category_id ${topic.category_id} but category not found in mapping. Setting to null.`
        );
      }

      const { error: insertError } = await testClient.from('topics').insert({
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
        difficulty: topic.difficulty,
        estimated_questions: topic.estimated_questions,
        order_index: topic.order_index,
        category_id: newCategoryId,
        is_active: topic.is_active,
        created_at: topic.created_at,
        updated_at: topic.updated_at,
      });

      if (insertError) {
        console.error(
          `❌ Failed to insert topic "${topic.name}": ${insertError.message}`
        );
        failedTopics++;
        continue;
      }

      insertedTopics++;
      if (insertedTopics % 20 === 0) {
        console.log(`✅ Inserted ${insertedTopics} topics...`);
      }
    }

    console.log(
      `\n📊 Topics: ${insertedTopics} inserted, ${skippedTopics} skipped, ${failedTopics} failed`
    );
    console.log(`\n✅ Seeding complete!`);
    console.log(
      `   - Categories: ${insertedCategories} new, ${skippedCategories} existing`
    );
    console.log(
      `   - Topics: ${insertedTopics} new, ${skippedTopics} existing, ${failedTopics} failed`
    );
  } catch (error) {
    console.error('❌ Error seeding categories and topics:', error);
    process.exit(1);
  }
}

seedCategoriesAndTopics();
