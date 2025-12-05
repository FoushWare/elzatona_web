#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding Data to Supabase (Tables Must Exist)\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Read the JSON data
const dataPath = path.join(
  process.cwd(),
  'apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json'
);
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

async function seedCategories() {
  console.log('🔄 Seeding categories...\n');

  try {
    // Clear existing categories
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', 'dummy'); // Delete all records

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing categories:',
        deleteError.message
      );
    }

    // Insert categories
    const categoriesToInsert = data.categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      card_type: category.cardType,
      icon: category.icon,
      color: category.color,
      order: category.order,
    }));

    const { data: insertedCategories, error: insertError } = await supabase
      .from('categories')
      .insert(categoriesToInsert)
      .select();

    if (insertError) {
      console.error('❌ Error inserting categories:', insertError.message);
      return false;
    }

    console.log(
      `✅ Successfully inserted ${insertedCategories.length} categories`
    );
    return true;
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    return false;
  }
}

async function seedTopics() {
  console.log('🔄 Seeding topics...\n');

  try {
    // Clear existing topics
    const { error: deleteError } = await supabase
      .from('topics')
      .delete()
      .neq('id', 'dummy'); // Delete all records

    if (deleteError) {
      console.log('⚠️  Could not clear existing topics:', deleteError.message);
    }

    // Prepare topics data
    const topicsToInsert = [];

    for (const category of data.categories) {
      for (const topic of category.topics) {
        topicsToInsert.push({
          id: topic.id,
          name: topic.name,
          slug: topic.slug,
          description: topic.description,
          difficulty: topic.difficulty,
          estimated_questions: topic.estimatedQuestions,
          order: topic.order,
          category_id: category.id,
        });
      }
    }

    // Insert topics in batches to avoid payload size limits
    const batchSize = 50;
    let insertedCount = 0;

    for (let i = 0; i < topicsToInsert.length; i += batchSize) {
      const batch = topicsToInsert.slice(i, i + batchSize);

      const { data: insertedTopics, error: insertError } = await supabase
        .from('topics')
        .insert(batch)
        .select();

      if (insertError) {
        console.error(
          `❌ Error inserting topics batch ${Math.floor(i / batchSize) + 1}:`,
          insertError.message
        );
        return false;
      }

      insertedCount += insertedTopics.length;
      console.log(
        `   📦 Batch ${Math.floor(i / batchSize) + 1}: Inserted ${insertedTopics.length} topics`
      );
    }

    console.log(`✅ Successfully inserted ${insertedCount} topics`);
    return true;
  } catch (error) {
    console.error('❌ Error seeding topics:', error.message);
    return false;
  }
}

async function seedCards() {
  console.log('🔄 Seeding cards...\n');

  try {
    // Clear existing cards and card_categories
    const { error: deleteCardCategoriesError } = await supabase
      .from('card_categories')
      .delete()
      .neq('card_id', 'dummy');

    const { error: deleteCardsError } = await supabase
      .from('cards')
      .delete()
      .neq('id', 'dummy');

    if (deleteCardsError) {
      console.log(
        '⚠️  Could not clear existing cards:',
        deleteCardsError.message
      );
    }

    // Insert cards
    const cardsToInsert = data.cards.map(card => ({
      id: card.id,
      name: card.name,
      slug: card.slug,
      description: card.description,
      icon: card.icon,
      color: card.color,
      order: card.order,
    }));

    const { data: insertedCards, error: insertError } = await supabase
      .from('cards')
      .insert(cardsToInsert)
      .select();

    if (insertError) {
      console.error('❌ Error inserting cards:', insertError.message);
      return false;
    }

    console.log(`✅ Successfully inserted ${insertedCards.length} cards`);

    // Insert card-category relationships
    const cardCategoriesToInsert = [];

    for (const card of data.cards) {
      for (const categoryId of card.categories) {
        cardCategoriesToInsert.push({
          card_id: card.id,
          category_id: categoryId,
        });
      }
    }

    if (cardCategoriesToInsert.length > 0) {
      const { data: insertedCardCategories, error: cardCategoriesError } =
        await supabase
          .from('card_categories')
          .insert(cardCategoriesToInsert)
          .select();

      if (cardCategoriesError) {
        console.error(
          '❌ Error inserting card-category relationships:',
          cardCategoriesError.message
        );
        return false;
      }

      console.log(
        `✅ Successfully inserted ${insertedCardCategories.length} card-category relationships`
      );
    }

    return true;
  } catch (error) {
    console.error('❌ Error seeding cards:', error.message);
    return false;
  }
}

async function seedLearningPlans() {
  console.log('🔄 Seeding learning plans...\n');

  try {
    // Clear existing learning plans and distributions
    const { error: deleteDistributionsError } = await supabase
      .from('plan_card_distribution')
      .delete()
      .neq('id', 0);

    const { error: deletePlansError } = await supabase
      .from('learning_plans')
      .delete()
      .neq('id', 'dummy');

    if (deletePlansError) {
      console.log(
        '⚠️  Could not clear existing learning plans:',
        deletePlansError.message
      );
    }

    // Insert learning plans
    const plansToInsert = data.plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      slug: plan.slug,
      description: plan.description,
      duration: plan.duration,
      total_questions: plan.totalQuestions,
      new_questions: plan.newQuestions || 0,
      order: plan.order,
    }));

    const { data: insertedPlans, error: insertError } = await supabase
      .from('learning_plans')
      .insert(plansToInsert)
      .select();

    if (insertError) {
      console.error('❌ Error inserting learning plans:', insertError.message);
      return false;
    }

    console.log(
      `✅ Successfully inserted ${insertedPlans.length} learning plans`
    );

    // Insert plan card distributions
    const distributionsToInsert = [];

    for (const plan of data.plans) {
      for (const [cardSlug, questionCount] of Object.entries(
        plan.cardDistribution
      )) {
        distributionsToInsert.push({
          plan_id: plan.id,
          card_slug: cardSlug,
          question_count: questionCount,
        });
      }
    }

    if (distributionsToInsert.length > 0) {
      const { data: insertedDistributions, error: distributionsError } =
        await supabase
          .from('plan_card_distribution')
          .insert(distributionsToInsert)
          .select();

      if (distributionsError) {
        console.error(
          '❌ Error inserting plan distributions:',
          distributionsError.message
        );
        return false;
      }

      console.log(
        `✅ Successfully inserted ${insertedDistributions.length} plan distributions`
      );
    }

    return true;
  } catch (error) {
    console.error('❌ Error seeding learning plans:', error.message);
    return false;
  }
}

async function verifySeeding() {
  console.log('🔄 Verifying seeded data...\n');

  try {
    // Count records in each table
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    const { count: topicsCount } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true });

    const { count: cardsCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true });

    const { count: plansCount } = await supabase
      .from('learning_plans')
      .select('*', { count: 'exact', head: true });

    console.log('📊 Seeding Summary:');
    console.log(`   Categories: ${categoriesCount}`);
    console.log(`   Topics: ${topicsCount}`);
    console.log(`   Cards: ${cardsCount}`);
    console.log(`   Learning Plans: ${plansCount}\n`);

    return true;
  } catch (error) {
    console.error('❌ Error verifying seeding:', error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Starting Supabase data seeding...\n');

    // Seed categories
    const categoriesSeeded = await seedCategories();
    if (!categoriesSeeded) {
      console.log('\n❌ Failed to seed categories.');
      return;
    }

    // Seed topics
    const topicsSeeded = await seedTopics();
    if (!topicsSeeded) {
      console.log('\n❌ Failed to seed topics.');
      return;
    }

    // Seed cards
    const cardsSeeded = await seedCards();
    if (!cardsSeeded) {
      console.log('\n❌ Failed to seed cards.');
      return;
    }

    // Seed learning plans
    const plansSeeded = await seedLearningPlans();
    if (!plansSeeded) {
      console.log('\n❌ Failed to seed learning plans.');
      return;
    }

    // Verify seeding
    await verifySeeding();

    console.log('🎉 Data seeding completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Verify the data in your Supabase dashboard');
    console.log('   2. Test the API endpoints');
    console.log('   3. Update your application to use the seeded data\n');
  } catch (error) {
    console.error('❌ Seeding process failed:', error.message);
  }
}

// Run the seeding process
main();
