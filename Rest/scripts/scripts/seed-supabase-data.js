#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding Categories, Topics, and Cards to Supabase\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY2MDQxOCwiZXhwIjoyMDc2MjM2NDE4fQ.BH3xSC7yk5DqX5bTgyedOyC45fNg1_vBcV04X_tkYLQ';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Read the JSON data
const dataPath = path.join(
  process.cwd(),
  'apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json'
);
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

async function createTables() {
  console.log('🔄 Step 1: Creating database tables...\n');

  const createTablesSQL = `
    -- Create categories table
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      card_type VARCHAR(100),
      icon VARCHAR(10),
      color VARCHAR(7),
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create topics table
    CREATE TABLE IF NOT EXISTS topics (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      description TEXT,
      difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
      estimated_questions INTEGER DEFAULT 0,
      "order" INTEGER DEFAULT 0,
      category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create cards table
    CREATE TABLE IF NOT EXISTS cards (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      icon VARCHAR(10),
      color VARCHAR(20),
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create card_categories junction table
    CREATE TABLE IF NOT EXISTS card_categories (
      card_id VARCHAR(50) REFERENCES cards(id) ON DELETE CASCADE,
      category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
      PRIMARY KEY (card_id, category_id)
    );

    -- Create learning plans table
    CREATE TABLE IF NOT EXISTS learning_plans (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      duration INTEGER NOT NULL,
      total_questions INTEGER DEFAULT 0,
      new_questions INTEGER DEFAULT 0,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create plan_card_distribution table
    CREATE TABLE IF NOT EXISTS plan_card_distribution (
      id SERIAL PRIMARY KEY,
      plan_id VARCHAR(50) REFERENCES learning_plans(id) ON DELETE CASCADE,
      card_slug VARCHAR(255) NOT NULL,
      question_count INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Enable RLS on all tables
    ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
    ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
    ALTER TABLE card_categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
    ALTER TABLE plan_card_distribution ENABLE ROW LEVEL SECURITY;

    -- Create policies for service role
    CREATE POLICY IF NOT EXISTS "Service role can manage categories" ON categories FOR ALL USING (
      auth.role() = 'service_role'
    );
    
    CREATE POLICY IF NOT EXISTS "Service role can manage topics" ON topics FOR ALL USING (
      auth.role() = 'service_role'
    );
    
    CREATE POLICY IF NOT EXISTS "Service role can manage cards" ON cards FOR ALL USING (
      auth.role() = 'service_role'
    );
    
    CREATE POLICY IF NOT EXISTS "Service role can manage card_categories" ON card_categories FOR ALL USING (
      auth.role() = 'service_role'
    );
    
    CREATE POLICY IF NOT EXISTS "Service role can manage learning_plans" ON learning_plans FOR ALL USING (
      auth.role() = 'service_role'
    );
    
    CREATE POLICY IF NOT EXISTS "Service role can manage plan_card_distribution" ON plan_card_distribution FOR ALL USING (
      auth.role() = 'service_role'
    );

    -- Create policies for public read access
    CREATE POLICY IF NOT EXISTS "Public can read categories" ON categories FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "Public can read topics" ON topics FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "Public can read cards" ON cards FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "Public can read card_categories" ON card_categories FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "Public can read learning_plans" ON learning_plans FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "Public can read plan_card_distribution" ON plan_card_distribution FOR SELECT USING (true);
  `;

  try {
    // Try to execute the SQL using Supabase client
    const { error: sqlError } = await supabase.rpc('exec', {
      sql: createTablesSQL,
    });

    if (sqlError) {
      console.log(
        '⚠️  Direct SQL execution failed, trying alternative approach...'
      );

      // Try using the REST API directly
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          apikey: supabaseServiceRoleKey,
        },
        body: JSON.stringify({ sql: createTablesSQL }),
      });

      if (!response.ok) {
        console.log('⚠️  REST API approach also failed');
        console.log(
          '📝 Please create the tables manually in your Supabase dashboard:'
        );
        console.log('   1. Go to your Supabase project dashboard');
        console.log('   2. Navigate to SQL Editor');
        console.log('   3. Run the SQL provided in the script');
        console.log('\n   Then run this script again to seed the data.');
        return false;
      }

      console.log('✅ Tables created via REST API');
    } else {
      console.log('✅ Tables created successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    return false;
  }
}

async function seedCategories() {
  console.log('🔄 Step 2: Seeding categories...\n');

  try {
    // Clear existing categories
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', 'dummy'); // Delete all records

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing categories (table might not exist yet)'
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
  console.log('🔄 Step 3: Seeding topics...\n');

  try {
    // Clear existing topics
    const { error: deleteError } = await supabase
      .from('topics')
      .delete()
      .neq('id', 'dummy'); // Delete all records

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing topics (table might not exist yet)'
      );
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
  console.log('🔄 Step 4: Seeding cards...\n');

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
        '⚠️  Could not clear existing cards (table might not exist yet)'
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
  console.log('🔄 Step 5: Seeding learning plans...\n');

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
        '⚠️  Could not clear existing learning plans (table might not exist yet)'
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
  console.log('🔄 Step 6: Verifying seeded data...\n');

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
    console.log('🚀 Starting Supabase seeding process...\n');

    // Step 1: Create tables
    const tablesCreated = await createTables();
    if (!tablesCreated) {
      console.log(
        '\n❌ Failed to create tables. Please create them manually and run the script again.'
      );
      return;
    }

    // Step 2: Seed categories
    const categoriesSeeded = await seedCategories();
    if (!categoriesSeeded) {
      console.log('\n❌ Failed to seed categories.');
      return;
    }

    // Step 3: Seed topics
    const topicsSeeded = await seedTopics();
    if (!topicsSeeded) {
      console.log('\n❌ Failed to seed topics.');
      return;
    }

    // Step 4: Seed cards
    const cardsSeeded = await seedCards();
    if (!cardsSeeded) {
      console.log('\n❌ Failed to seed cards.');
      return;
    }

    // Step 5: Seed learning plans
    const plansSeeded = await seedLearningPlans();
    if (!plansSeeded) {
      console.log('\n❌ Failed to seed learning plans.');
      return;
    }

    // Step 6: Verify seeding
    await verifySeeding();

    console.log('🎉 Seeding completed successfully!');
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
