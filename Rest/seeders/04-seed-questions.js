const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Seeder for Questions
 * Updates existing questions or creates new ones based on id
 * Links questions to topics, categories, and learning cards
 * Processes questions in batches to avoid memory issues
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Question files mapping
const questionFiles = {
  'HTML': 'html-questions.json',
  'CSS': 'css-questions.json',
  'JavaScript': 'javascript-questions.json',
  'React': 'react-questions.json',
  'Next.js': 'nextjs-questions.json',
  'Design Patterns': 'design-patterns-questions.json',
  'Performance Patterns': 'performance-patterns-questions.json',
  'Rendering Patterns': 'rendering-patterns-questions.json',
  'Security': 'security-questions.json',
  'System Design': 'system-design-questions.json',
  'Frontend Tasks': 'frontend-tasks-questions.json',
  'Problem Solving': 'problem-solving-questions.json'
};

const BATCH_SIZE = 50; // Process questions in batches

async function seedQuestions() {
  console.log('🔄 Seeding Questions...\n');

  // Get all categories and topics for mapping
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug');

  const { data: topics } = await supabase
    .from('topics')
    .select('id, name, slug, category_id');

  const { data: learningCards } = await supabase
    .from('learning_cards')
    .select('id, type');

  // Create maps for quick lookup
  const categoryMap = {};
  categories?.forEach(cat => {
    categoryMap[cat.name] = cat.id;
  });

  const topicMap = {};
  topics?.forEach(topic => {
    const key = `${topic.category_id}_${topic.name}`;
    topicMap[key] = topic.id;
  });

  const cardMap = {};
  learningCards?.forEach(card => {
    cardMap[card.type] = card.id;
  });

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const [categoryName, fileName] of Object.entries(questionFiles)) {
    const filePath = path.join(__dirname, '../final-questions-v01', fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${fileName}`);
      continue;
    }

    console.log(`\n📖 Processing ${categoryName}...`);
    
    try {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const categoryId = categoryMap[categoryName];
      const learningCardId = questions[0]?.learningCardId ? cardMap[questions[0].learningCardId] : null;

      if (!categoryId) {
        console.log(`  ⚠️  Category not found: ${categoryName}`);
        continue;
      }

      let categoryCreated = 0;
      let categoryUpdated = 0;
      let categoryErrors = 0;

      // Process questions in batches
      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const batch = questions.slice(i, i + BATCH_SIZE);
        
        for (const question of batch) {
          try {
            // Find topic_id by matching topic name
            let topicId = null;
            if (question.topic) {
              const topicKey = `${categoryId}_${question.topic}`;
              topicId = topicMap[topicKey];
              
              // If exact match not found, try to find by category only
              if (!topicId) {
                const categoryTopics = topics?.filter(t => t.category_id === categoryId);
                if (categoryTopics && categoryTopics.length > 0) {
                  // Use first topic as fallback
                  topicId = categoryTopics[0].id;
                }
              }
            }

            // Check if question exists by title+category (since we use UUID IDs)
            // Also check metadata for original_id if it exists
            let existing = null;
            
            // First try to find by metadata.original_id if it exists
            if (question.id) {
              const { data: byMetadata } = await supabase
                .from('questions')
                .select('id')
                .eq('metadata->>original_id', question.id)
                .limit(1)
                .maybeSingle();
              
              if (byMetadata) {
                existing = byMetadata;
              }
            }
            
            // If not found by metadata, try by title+category
            if (!existing) {
              const { data: byTitle } = await supabase
                .from('questions')
                .select('id')
                .eq('title', question.title)
                .eq('category_id', categoryId)
                .limit(1)
                .maybeSingle();
              
              if (byTitle) {
                existing = byTitle;
              }
            }

            // Prepare metadata with original ID for tracking
            const metadata = {
              ...(question.metadata || {}),
              original_id: question.id || null,
              source_file: fileName
            };

            const questionData = {
              title: question.title,
              content: question.content || question.title,
              type: question.type || 'multiple-choice',
              difficulty: question.difficulty === 'easy' ? 'beginner' : 
                         question.difficulty === 'medium' ? 'intermediate' :
                         question.difficulty === 'hard' ? 'advanced' :
                         question.difficulty || 'intermediate',
              answer: question.explanation || '',
              explanation: question.explanation || '',
              hints: question.hints || [],
              time_limit: question.timeLimit || 300,
              points: question.points || 10,
              tags: question.tags || [],
              metadata: metadata,
              options: question.options || null,
              code_template: question.codeTemplate || null,
              test_cases: question.testCases || null,
              sample_answers: question.sampleAnswers || null,
              topic_id: topicId,
              category_id: categoryId,
              learning_card_id: learningCardId,
              is_active: question.isActive !== false,
              updated_at: new Date().toISOString()
            };

            if (existing) {
              // Update existing question
              const { error } = await supabase
                .from('questions')
                .update(questionData)
                .eq('id', existing.id);

              if (error) throw error;
              categoryUpdated++;
            } else {
              // Create new question
              const { error } = await supabase
                .from('questions')
                .insert({
                  ...questionData,
                  created_at: new Date().toISOString()
                });

              if (error) throw error;
              categoryCreated++;
            }
          } catch (error) {
            if (error.code !== 'PGRST116') { // PGRST116 = not found (expected)
              console.error(`    ❌ Error with question "${question.title?.substring(0, 50)}":`, error.message);
              categoryErrors++;
            }
          }
        }

        // Progress indicator
        if ((i + BATCH_SIZE) % (BATCH_SIZE * 5) === 0 || i + BATCH_SIZE >= questions.length) {
          process.stdout.write(`  Progress: ${Math.min(i + BATCH_SIZE, questions.length)}/${questions.length} questions processed\r`);
        }
      }

      console.log(`\n  ✅ ${categoryName}: ${categoryCreated} created, ${categoryUpdated} updated, ${categoryErrors} errors`);
      
      totalCreated += categoryCreated;
      totalUpdated += categoryUpdated;
      totalErrors += categoryErrors;
    } catch (error) {
      console.error(`  ❌ Error processing ${categoryName}:`, error.message);
      totalErrors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Created: ${totalCreated}`);
  console.log(`  Updated: ${totalUpdated}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`\n✅ Questions seeding completed!\n`);
}

// Run seeder
seedQuestions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

