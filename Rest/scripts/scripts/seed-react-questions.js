#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding React Questions to Supabase\n');

// Supabase configuration
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// React question files
const reactQuestionFiles = [
  '1-25QA.json',
  '26-50QA.json',
  '51-75QA.json',
  '76-100QA.json',
  '101-151QA.json',
  '152-200QA.json',
  '201-251QA.json',
  '252-306QA.json',
];

async function createQuestionsTable() {
  console.log('🔄 Step 1: Creating questions table...\n');

  const createQuestionsTableSQL = `
    -- Create questions table
    CREATE TABLE IF NOT EXISTS questions (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      content TEXT NOT NULL,
      type VARCHAR(50) CHECK (type IN ('open-ended', 'multiple-choice', 'true-false', 'code-completion', 'debugging')),
      category VARCHAR(100),
      subcategory VARCHAR(100),
      topic VARCHAR(100),
      difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
      learning_card_id VARCHAR(50),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_by VARCHAR(100) DEFAULT 'system',
      updated_by VARCHAR(100) DEFAULT 'system',
      tags TEXT[],
      explanation TEXT,
      points INTEGER DEFAULT 1,
      time_limit INTEGER DEFAULT 120,
      sample_answers TEXT[],
      options JSONB,
      correct_answer TEXT,
      hints TEXT[],
      related_links TEXT[]
    );

    -- Enable RLS
    ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY IF NOT EXISTS "Service role can manage questions" ON questions FOR ALL USING (
      auth.role() = 'service_role'
    );

    CREATE POLICY IF NOT EXISTS "Public can read questions" ON questions FOR SELECT USING (true);
  `;

  try {
    // Try to execute the SQL using Supabase client
    const { error: sqlError } = await supabase.rpc('exec', {
      sql: createQuestionsTableSQL,
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
        body: JSON.stringify({ sql: createQuestionsTableSQL }),
      });

      if (!response.ok) {
        console.log('⚠️  REST API approach also failed');
        console.log(
          '📝 Please create the questions table manually in your Supabase dashboard:'
        );
        console.log('   1. Go to your Supabase project dashboard');
        console.log('   2. Navigate to SQL Editor');
        console.log('   3. Run the SQL provided in the script');
        console.log('\n   Then run this script again to seed the questions.');
        return false;
      }

      console.log('✅ Questions table created via REST API');
    } else {
      console.log('✅ Questions table created successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Error creating questions table:', error.message);
    return false;
  }
}

async function loadAllReactQuestions() {
  console.log('🔄 Step 2: Loading React questions from JSON files...\n');

  const allQuestions = [];
  const reactDataPath = path.join(
    process.cwd(),
    'apps/admin/network/data/json/react'
  );

  for (const filename of reactQuestionFiles) {
    try {
      const filePath = path.join(reactDataPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const questions = JSON.parse(fileContent);

      console.log(
        `   📁 Loaded ${questions.length} questions from ${filename}`
      );
      allQuestions.push(...questions);
    } catch (error) {
      console.error(`❌ Error loading ${filename}:`, error.message);
    }
  }

  console.log(`✅ Total React questions loaded: ${allQuestions.length}\n`);
  return allQuestions;
}

async function mapTopicsToQuestions(questions) {
  console.log('🔄 Step 3: Mapping questions to topics and categories...\n');

  try {
    // Get existing topics and categories
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('id, name, slug, category_id')
      .eq('category_id', 'cat-react');

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug');

    if (topicsError) {
      console.error('❌ Error fetching topics:', topicsError.message);
      return questions;
    }

    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError.message);
      return questions;
    }

    // Create mapping dictionaries
    const topicMap = {};
    const categoryMap = {};

    // Map topic names to topic IDs
    topics.forEach(topic => {
      topicMap[topic.name.toLowerCase()] = topic.id;
      topicMap[topic.slug.toLowerCase()] = topic.id;
    });

    // Map category names to category IDs
    categories.forEach(category => {
      categoryMap[category.name.toLowerCase()] = category.id;
      categoryMap[category.slug.toLowerCase()] = category.id;
    });

    // Update questions with proper topic and category IDs
    const mappedQuestions = questions.map(question => {
      const mappedQuestion = { ...question };

      // Map topic
      if (question.topic) {
        const topicKey = question.topic.toLowerCase();
        if (topicMap[topicKey]) {
          mappedQuestion.topic_id = topicMap[topicKey];
        } else {
          // Try to find a close match
          const matchingTopic = topics.find(
            topic =>
              topic.name.toLowerCase().includes(topicKey) ||
              topicKey.includes(topic.name.toLowerCase())
          );
          if (matchingTopic) {
            mappedQuestion.topic_id = matchingTopic.id;
          } else {
            console.log(`   ⚠️  No topic mapping found for: ${question.topic}`);
          }
        }
      }

      // Map category
      if (question.category) {
        const categoryKey = question.category.toLowerCase();
        if (categoryMap[categoryKey]) {
          mappedQuestion.category_id = categoryMap[categoryKey];
        } else {
          // Default to React category
          mappedQuestion.category_id = 'cat-react';
        }
      } else {
        mappedQuestion.category_id = 'cat-react';
      }

      return mappedQuestion;
    });

    console.log(
      `✅ Mapped ${mappedQuestions.length} questions to topics and categories\n`
    );
    return mappedQuestions;
  } catch (error) {
    console.error('❌ Error mapping topics:', error.message);
    return questions;
  }
}

async function seedQuestions(questions) {
  console.log('🔄 Step 4: Seeding questions to database...\n');

  try {
    // Clear existing questions
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .neq('id', 'dummy'); // Delete all records

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing questions:',
        deleteError.message
      );
    }

    // Prepare questions for insertion
    const questionsToInsert = questions.map(question => ({
      id: question.id,
      title: question.title,
      content: question.content,
      type: question.type || 'open-ended',
      category: question.category,
      subcategory: question.subcategory,
      topic: question.topic,
      difficulty: question.difficulty || 'beginner',
      learning_card_id: question.learningCardId || 'card-frameworks',
      is_active: question.isActive !== false,
      created_at: question.createdAt
        ? new Date(question.createdAt)
        : new Date(),
      updated_at: question.updatedAt
        ? new Date(question.updatedAt)
        : new Date(),
      created_by: question.createdBy || 'system',
      updated_by: question.updatedBy || 'system',
      tags: question.tags || [],
      explanation: question.explanation,
      points: question.points || 1,
      time_limit: question.timeLimit || 120,
      sample_answers: question.sampleAnswers || [],
      options: question.options || null,
      correct_answer: question.correctAnswer || null,
      hints: question.hints || [],
      related_links: question.relatedLinks || [],
    }));

    // Insert questions in batches to avoid payload size limits
    const batchSize = 25;
    let insertedCount = 0;

    for (let i = 0; i < questionsToInsert.length; i += batchSize) {
      const batch = questionsToInsert.slice(i, i + batchSize);

      const { data: insertedQuestions, error: insertError } = await supabase
        .from('questions')
        .insert(batch)
        .select();

      if (insertError) {
        console.error(
          `❌ Error inserting questions batch ${Math.floor(i / batchSize) + 1}:`,
          insertError.message
        );
        return false;
      }

      insertedCount += insertedQuestions.length;
      console.log(
        `   📦 Batch ${Math.floor(i / batchSize) + 1}: Inserted ${insertedQuestions.length} questions`
      );
    }

    console.log(`✅ Successfully inserted ${insertedCount} questions\n`);
    return true;
  } catch (error) {
    console.error('❌ Error seeding questions:', error.message);
    return false;
  }
}

async function verifySeeding() {
  console.log('🔄 Step 5: Verifying seeded data...\n');

  try {
    // Count total questions
    const { count: totalQuestions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    // Count questions by difficulty
    const { data: difficultyStats } = await supabase
      .from('questions')
      .select('difficulty')
      .not('difficulty', 'is', null);

    const difficultyCounts = {};
    difficultyStats?.forEach(q => {
      difficultyCounts[q.difficulty] =
        (difficultyCounts[q.difficulty] || 0) + 1;
    });

    // Count questions by type
    const { data: typeStats } = await supabase
      .from('questions')
      .select('type')
      .not('type', 'is', null);

    const typeCounts = {};
    typeStats?.forEach(q => {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    });

    // Count questions by topic
    const { data: topicStats } = await supabase
      .from('questions')
      .select('topic')
      .not('topic', 'is', null);

    const topicCounts = {};
    topicStats?.forEach(q => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    });

    console.log('📊 Questions Seeding Summary:');
    console.log(`   Total Questions: ${totalQuestions}`);
    console.log(`   Difficulty Distribution:`);
    Object.entries(difficultyCounts).forEach(([difficulty, count]) => {
      console.log(`     ${difficulty}: ${count}`);
    });
    console.log(`   Type Distribution:`);
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`     ${type}: ${count}`);
    });
    console.log(`   Top Topics:`);
    Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([topic, count]) => {
        console.log(`     ${topic}: ${count}`);
      });

    console.log('\n✅ Verification completed successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ Error verifying seeding:', error.message);
    return false;
  }
}

async function main() {
  try {
    console.log('🚀 Starting React Questions Seeding Process...\n');

    // Step 1: Create questions table
    const tableCreated = await createQuestionsTable();
    if (!tableCreated) {
      console.log(
        '\n❌ Failed to create questions table. Please create it manually and run the script again.'
      );
      return;
    }

    // Step 2: Load all React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded. Please check the file paths.');
      return;
    }

    // Step 3: Map questions to topics and categories
    const mappedQuestions = await mapTopicsToQuestions(allQuestions);

    // Step 4: Seed questions
    const questionsSeeded = await seedQuestions(mappedQuestions);
    if (!questionsSeeded) {
      console.log('\n❌ Failed to seed questions.');
      return;
    }

    // Step 5: Verify seeding
    await verifySeeding();

    console.log('🎉 React Questions Seeding Completed Successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Verify the questions in your Supabase dashboard');
    console.log('   2. Test the questions API endpoints');
    console.log('   3. Update your application to use the seeded questions');
    console.log(
      '   4. Consider seeding questions for other categories (JavaScript, CSS, etc.)\n'
    );
  } catch (error) {
    console.error('❌ Seeding process failed:', error.message);
  }
}

// Run the seeding process
main();
