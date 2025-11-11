const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Seeder for Categories
 * Updates existing categories or creates new ones based on slug
 * Links categories to learning cards
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read categories from the categories-topics-cards-plans.json file
const categoriesDataPath = path.join(__dirname, '../../apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json');

async function seedCategories() {
  console.log('🔄 Seeding Categories...\n');

  // Read categories data
  const categoriesData = JSON.parse(fs.readFileSync(categoriesDataPath, 'utf8'));
  const categories = categoriesData.categories || [];

  // Map cardType to learning_card type
  const cardTypeMapping = {
    'Core Technologies': 'core-technologies',
    'Framework Questions': 'framework-questions',
    'System Design': 'system-design'
  };

  // Get learning cards to map cardType to learning_card_id
  const { data: learningCards } = await supabase
    .from('learning_cards')
    .select('id, type');

  const cardMap = {};
  learningCards?.forEach(card => {
    cardMap[card.type] = card.id;
  });

  // Add Frontend Tasks and Problem Solving cards if needed
  const { data: ftCard } = await supabase
    .from('learning_cards')
    .select('id')
    .eq('type', 'frontend-tasks')
    .single();

  const { data: psCard } = await supabase
    .from('learning_cards')
    .select('id')
    .eq('type', 'problem-solving')
    .single();

  if (ftCard) cardMap['frontend-tasks'] = ftCard.id;
  if (psCard) cardMap['problem-solving'] = psCard.id;

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const category of categories) {
    try {
      const cardType = cardTypeMapping[category.cardType] || category.cardType.toLowerCase().replace(/\s+/g, '-');
      const learningCardId = cardMap[cardType];

      if (!learningCardId) {
        console.log(`  ⚠️  Skipping ${category.name}: Learning card not found for type "${category.cardType}"`);
        continue;
      }

      // Check if category exists by slug
      const { data: existing } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('slug', category.slug)
        .single();

      const categoryData = {
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        card_type: category.cardType,
        icon: category.icon || '',
        color: category.color || '#000000',
        order_index: category.order || 0,
        learning_card_id: learningCardId,
        is_active: true,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('slug', category.slug);

        if (error) throw error;
        console.log(`  ✅ Updated: ${category.name} (${category.slug})`);
        updated++;
      } else {
        // Create new category
        const { error } = await supabase
          .from('categories')
          .insert({
            ...categoryData,
            created_at: new Date().toISOString()
          });

        if (error) throw error;
        console.log(`  ✅ Created: ${category.name} (${category.slug})`);
        created++;
      }
    } catch (error) {
      console.error(`  ❌ Error with ${category.name}:`, error.message);
      errors++;
    }
  }

  // Add Frontend Tasks and Problem Solving categories if they don't exist
  const additionalCategories = [
    {
      name: 'Frontend Tasks',
      slug: 'frontend-tasks',
      description: 'Practical frontend implementation tasks and challenges',
      cardType: 'Frontend Tasks',
      icon: '🎯',
      color: '#E67E22',
      order: 0,
      learningCardType: 'frontend-tasks'
    },
    {
      name: 'Problem Solving',
      slug: 'problem-solving',
      description: 'Algorithm and data structure problems for frontend developers',
      cardType: 'Problem Solving',
      icon: '🧩',
      color: '#1ABC9C',
      order: 0,
      learningCardType: 'problem-solving'
    }
  ];

  for (const category of additionalCategories) {
    try {
      const learningCardId = cardMap[category.learningCardType];
      if (!learningCardId) continue;

      const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category.slug)
        .single();

      const categoryData = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        card_type: category.cardType,
        icon: category.icon,
        color: category.color,
        order_index: category.order,
        learning_card_id: learningCardId,
        is_active: true,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('slug', category.slug);
        if (error) throw error;
        console.log(`  ✅ Updated: ${category.name}`);
        updated++;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert({
            ...categoryData,
            created_at: new Date().toISOString()
          });
        if (error) throw error;
        console.log(`  ✅ Created: ${category.name}`);
        created++;
      }
    } catch (error) {
      console.error(`  ❌ Error with ${category.name}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
  console.log(`\n✅ Categories seeding completed!\n`);
}

// Run seeder
seedCategories()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

