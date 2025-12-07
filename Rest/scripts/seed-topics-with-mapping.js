/**
 * Script to seed topics from production to test with proper category ID mapping
 *
 * Usage: node Rest/scripts/seed-topics-with-mapping.js
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ path: path.resolve(__dirname, '../../.env.test.local') });

const TEST_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const TEST_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!TEST_PROJECT_URL || !TEST_SERVICE_KEY) {
  console.error('❌ Test Supabase credentials not found in .env.test.local');
  process.exit(1);
}

const testClient = createClient(TEST_PROJECT_URL, TEST_SERVICE_KEY, {
  auth: { persistSession: false },
});

// Production category ID -> Test category ID mapping (by slug)
const categorySlugToId = {
  react: null,
  javascript: null,
  nextjs: null,
  css: null,
  html: null,
  'system-design': null,
  'design-patterns': null,
  'performance-patterns': null,
  'rendering-patterns': null,
  security: null,
  'frontend-tasks': null,
  'problem-solving': null,
};

// Production category IDs (from production query)
const prodCategoryMap = {
  'a12bb288-43b5-40e4-b3af-f64b62849ba3': 'react',
  'c5929620-9e0e-4be6-86e8-4696112a2cd3': 'javascript',
  '78c6f92c-4a9d-434a-9117-ecb5bf0778e6': 'nextjs',
  'c126bc36-ccd7-41c0-ba63-c75738514461': 'css',
  'ce76320a-02a2-4ee9-aa1f-34fe33b6d7ab': 'html',
  '41900a2b-5006-4204-8362-d9063befa8f6': 'system-design',
  'afa2341b-7e6f-4df2-82be-c9876fa43612': 'design-patterns',
  'fbc677a4-ed55-43cd-ab4a-300bdfc58b2e': 'performance-patterns',
  'aaf5431b-de59-41a3-851d-0dda673ddb91': 'rendering-patterns',
  '23152893-6be7-4acd-a954-20af29ed5cd6': 'security',
  '0475006f-85d5-4baf-983f-19effca9cad2': 'frontend-tasks',
  '648eae51-f1db-4b65-97c6-47de6384f4e6': 'problem-solving',
};

async function seedTopics() {
  try {
    // Get test category IDs by slug
    console.log('📥 Fetching test categories...');
    const { data: testCategories, error: catError } = await testClient
      .from('categories')
      .select('id, slug');

    if (catError) {
      throw new Error(`Failed to fetch categories: ${catError.message}`);
    }

    // Build mapping: production category ID -> test category ID
    const categoryIdMap = new Map();
    for (const cat of testCategories) {
      categorySlugToId[cat.slug] = cat.id;
    }

    // Build production ID -> test ID mapping
    for (const [prodId, slug] of Object.entries(prodCategoryMap)) {
      const testId = categorySlugToId[slug];
      if (testId) {
        categoryIdMap.set(prodId, testId);
      }
    }

    console.log(`✅ Mapped ${categoryIdMap.size} categories`);

    // Topics data from production (from the file we read earlier)
    // We'll need to parse the topics from the production query
    // For now, let's use MCP to get them directly

    console.log('📥 Topics will be inserted via MCP migration...');
    console.log('💡 Please use the MCP apply_migration tool to insert topics');

    // The topics are too many to insert via script, so we'll create a migration
    console.log('\n✅ Category mapping complete!');
    console.log('📋 Category ID Mapping:');
    for (const [prodId, testId] of categoryIdMap.entries()) {
      const slug = prodCategoryMap[prodId];
      console.log(`   ${slug}: ${prodId} -> ${testId}`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedTopics();
