const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Seeder for Topics
 * Updates existing topics or creates new ones based on slug
 * Links topics to categories
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read categories and topics from the categories-topics-cards-plans.json file
const categoriesDataPath = path.join(
  __dirname,
  '../../apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json'
);

async function seedTopics() {
  console.log('🔄 Seeding Topics...\n');

  // Read categories data
  const categoriesData = JSON.parse(
    fs.readFileSync(categoriesDataPath, 'utf8')
  );
  const categories = categoriesData.categories || [];

  // Get all categories to map slug to category_id
  const { data: dbCategories } = await supabase
    .from('categories')
    .select('id, slug');

  const categoryMap = {};
  dbCategories?.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  let created = 0;
  let updated = 0;
  let errors = 0;
  let skipped = 0;

  for (const category of categories) {
    const categoryId = categoryMap[category.slug];

    if (!categoryId) {
      console.log(
        `  ⚠️  Skipping topics for ${category.name}: Category not found`
      );
      skipped++;
      continue;
    }

    const topics = category.topics || [];

    for (const topic of topics) {
      try {
        // Check if topic exists by slug and category_id
        const { data: existing } = await supabase
          .from('topics')
          .select('id, name, slug')
          .eq('slug', topic.slug)
          .eq('category_id', categoryId)
          .single();

        const topicData = {
          name: topic.name,
          slug: topic.slug,
          description: topic.description || '',
          difficulty: topic.difficulty || 'intermediate',
          estimated_questions: topic.estimatedQuestions || 0,
          order_index: topic.order || 0,
          category_id: categoryId,
          is_active: true,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          // Update existing topic
          const { error } = await supabase
            .from('topics')
            .update(topicData)
            .eq('slug', topic.slug)
            .eq('category_id', categoryId);

          if (error) throw error;
          updated++;
        } else {
          // Create new topic
          const { error } = await supabase.from('topics').insert({
            ...topicData,
            created_at: new Date().toISOString(),
          });

          if (error) throw error;
          created++;
        }
      } catch (error) {
        if (error.code !== 'PGRST116') {
          // PGRST116 = not found (expected for new topics)
          console.error(
            `  ❌ Error with ${category.name} → ${topic.name}:`,
            error.message
          );
          errors++;
        }
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped} categories`);
  console.log(`  Errors: ${errors}`);
  console.log(`\n✅ Topics seeding completed!\n`);
}

// Run seeder
seedTopics()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
