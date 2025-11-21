/**
 * Script to seed topics from production to test with proper category ID mapping
 * 
 * Usage: node Rest/scripts/seed-topics-from-prod.js
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

// Production category ID -> Test category ID mapping
const categoryIdMap = {
  'a12bb288-43b5-40e4-b3af-f64b62849ba3': '1d54dd10-68fe-4ea9-874e-c960930e0402', // react
  'c5929620-9e0e-4be6-86e8-4696112a2cd3': 'b7414324-cc5a-47e4-89f1-6b4a2c46c508', // javascript
  '78c6f92c-4a9d-434a-9117-ecb5bf0778e6': 'b6018602-d9ad-445d-ae97-8d1351b5ed10', // nextjs
  'c126bc36-ccd7-41c0-ba63-c75738514461': 'c66e9e94-32e0-4dea-8594-4931251fa59d', // css
  'ce76320a-02a2-4ee9-aa1f-34fe33b6d7ab': '3083f50b-8a47-48a0-b100-6172cd184d04', // html
  '41900a2b-5006-4204-8362-d9063befa8f6': '40599335-648e-452f-91c6-36c1bcfd390c', // system-design
  'afa2341b-7e6f-4df2-82be-c9876fa43612': '7384b45b-c779-49c3-b9e9-ef335a7cccfa', // design-patterns
  'fbc677a4-ed55-43cd-ab4a-300bdfc58b2e': '85e21817-b2b0-4cd8-8623-8264bdd228d2', // performance-patterns
  'aaf5431b-de59-41a3-851d-0dda673ddb91': 'e66965de-3197-4e60-b774-25958009d094', // rendering-patterns
  '23152893-6be7-4acd-a954-20af29ed5cd6': 'e41ed4a2-738e-487f-8d1e-4e7df90ec478', // security
  '0475006f-85d5-4baf-983f-19effca9cad2': 'a43fb92d-d623-4777-af1f-e1793764eb0f', // frontend-tasks
  '648eae51-f1db-4b65-97c6-47de6384f4e6': 'fb536a4d-ce0f-4e78-93a9-5df27918b4b0', // problem-solving
};

// Topics data from production (parsed from the file)
const topicsData = require('/Users/a.fouad/.cursor/projects/Users-a-fouad-SideProjects-Elzatona-all-Elzatona-web/agent-tools/65368d1b-d2bc-459f-a85b-589cf84710bd.txt');

async function seedTopics() {
  try {
    // Parse the topics JSON from the file
    const topicsJson = JSON.parse(topicsData.replace(/^"Below is the result.*?boundaries\.\n\n<untrusted-data-[^>]+>\n/, '').replace(/\n</untrusted-data-[^>]+>.*$/, ''));
    
    console.log(`📥 Found ${topicsJson.length} topics to insert`);

    // Check existing topics in test
    const { data: existingTopics } = await testClient
      .from('topics')
      .select('slug');

    const existingSlugs = new Set(existingTopics?.map(t => t.slug) || []);
    console.log(`📊 Found ${existingTopics?.length || 0} existing topics in test project`);

    // Insert topics in batches of 50
    const batchSize = 50;
    let inserted = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < topicsJson.length; i += batchSize) {
      const batch = topicsJson.slice(i, i + batchSize);
      const topicsToInsert = [];

      for (const topic of batch) {
        if (existingSlugs.has(topic.slug)) {
          skipped++;
          continue;
        }

        // Map category_id
        const newCategoryId = topic.category_id ? categoryIdMap[topic.category_id] : null;

        topicsToInsert.push({
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
      }

      if (topicsToInsert.length > 0) {
        const { error } = await testClient
          .from('topics')
          .insert(topicsToInsert);

        if (error) {
          console.error(`❌ Failed to insert batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
          failed += topicsToInsert.length;
        } else {
          inserted += topicsToInsert.length;
          console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}: ${topicsToInsert.length} topics (${inserted} total)`);
        }
      }
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   - Topics: ${inserted} inserted, ${skipped} skipped, ${failed} failed`);

  } catch (error) {
    console.error('❌ Error seeding topics:', error);
    process.exit(1);
  }
}

seedTopics();

