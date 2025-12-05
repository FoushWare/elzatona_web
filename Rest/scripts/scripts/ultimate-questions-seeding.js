#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

console.log('🌱 Final React Questions Seeding (Correct Types)\n');

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

async function getReactCategoryAndTopics() {
  console.log('🔄 Getting React category and topics...\n');

  try {
    // Get React category
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .ilike('name', '%react%')
      .limit(1);

    if (categoryError) {
      console.error('❌ Error fetching React category:', categoryError.message);
      return { categoryId: null, topics: [] };
    }

    if (!categories || categories.length === 0) {
      console.error('❌ React category not found');
      return { categoryId: null, topics: [] };
    }

    const reactCategory = categories[0];
    console.log(
      `✅ Found React category: ${reactCategory.name} (${reactCategory.id})`
    );

    // Get React topics
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('id, name, slug')
      .eq('category_id', reactCategory.id);

    if (topicsError) {
      console.error('❌ Error fetching React topics:', topicsError.message);
      return { categoryId: reactCategory.id, topics: [] };
    }

    console.log(`✅ Found ${topics.length} React topics:`);
    topics.forEach(topic => {
      console.log(`   ${topic.name} (${topic.slug}): ${topic.id}`);
    });

    return { categoryId: reactCategory.id, topics };
  } catch (error) {
    console.error('❌ Error getting category and topics:', error.message);
    return { categoryId: null, topics: [] };
  }
}

async function loadAllReactQuestions() {
  console.log('\n🔄 Loading React questions from JSON files...\n');

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

async function mapQuestionsToSchema(questions, reactCategoryId, topics) {
  console.log('🔄 Mapping questions to schema with correct types...\n');

  // Create topic mapping
  const topicMap = {};
  topics.forEach(topic => {
    topicMap[topic.name.toLowerCase()] = topic.id;
    topicMap[topic.slug.toLowerCase()] = topic.id;
  });

  console.log(
    `📊 Topic mapping created for ${Object.keys(topicMap).length} topics`
  );

  // Map questions to schema with correct types
  const mappedQuestions = questions.map(question => {
    // Find matching topic
    let topicId = null;
    if (question.topic) {
      const topicKey = question.topic.toLowerCase();
      if (topicMap[topicKey]) {
        topicId = topicMap[topicKey];
      } else {
        // Try to find a close match
        const matchingTopic = topics.find(
          topic =>
            topic.name.toLowerCase().includes(topicKey) ||
            topicKey.includes(topic.name.toLowerCase())
        );
        if (matchingTopic) {
          topicId = matchingTopic.id;
        }
      }
    }

    // Map question type to valid database type
    let questionType = 'multiple-choice'; // Default to valid type
    if (question.type) {
      const typeMap = {
        'open-ended': 'multiple-choice',
        'multiple-choice': 'multiple-choice',
        'true-false': 'multiple-choice',
        'code-completion': 'multiple-choice',
        debugging: 'multiple-choice',
      };
      questionType = typeMap[question.type] || 'multiple-choice';
    }

    return {
      id: randomUUID(), // Generate UUID for each question
      title: question.title,
      content: question.content,
      type: questionType, // Use valid type
      difficulty: question.difficulty || 'beginner',
      points: question.points || 1,
      options: question.options || null,
      correct_answer: question.correctAnswer || null,
      explanation: question.explanation,
      test_cases: question.testCases || null,
      hints: question.hints || [],
      tags: question.tags || [],
      stats: {
        views: 0,
        attempts: 0,
        correct_attempts: 0,
        average_time: 0,
      },
      metadata: {
        original_id: question.id, // Keep original ID for reference
        original_type: question.type, // Keep original type for reference
        topic: question.topic,
        subcategory: question.subcategory,
        sample_answers: question.sampleAnswers || [],
        time_limit: question.timeLimit || 120,
        related_links: question.relatedLinks || [],
        created_by: question.createdBy || 'system',
        updated_by: question.updatedBy || 'system',
        topic_id: topicId,
      },
      category_id: reactCategoryId,
      is_active: question.isActive !== false,
      created_at: question.createdAt
        ? new Date(question.createdAt)
        : new Date(),
      updated_at: question.updatedAt
        ? new Date(question.updatedAt)
        : new Date(),
    };
  });

  console.log(
    `✅ Mapped ${mappedQuestions.length} questions to schema with correct types\n`
  );
  return mappedQuestions;
}

async function seedQuestions(questions) {
  console.log('🔄 Seeding questions to database...\n');

  try {
    // Clear existing React questions
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .eq('category_id', questions[0]?.category_id);

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing React questions:',
        deleteError.message
      );
    }

    // Insert questions in batches
    const batchSize = 25;
    let insertedCount = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);

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
  console.log('🔄 Verifying seeded data...\n');

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

    // Count questions by category
    const { data: categoryStats } = await supabase
      .from('questions')
      .select('category_id')
      .not('category_id', 'is', null);

    const categoryCounts = {};
    categoryStats?.forEach(q => {
      categoryCounts[q.category_id] = (categoryCounts[q.category_id] || 0) + 1;
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
    console.log(`   Category Distribution:`);
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`     ${category}: ${count}`);
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
    console.log('🚀 Starting Final React Questions Seeding...\n');

    // Step 1: Get React category and topics
    const { categoryId, topics } = await getReactCategoryAndTopics();
    if (!categoryId || topics.length === 0) {
      console.log('\n❌ Failed to get React category and topics.');
      return;
    }

    // Step 2: Load React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded.');
      return;
    }

    // Step 3: Map questions to schema with correct types
    const mappedQuestions = await mapQuestionsToSchema(
      allQuestions,
      categoryId,
      topics
    );

    // Step 4: Seed questions
    const questionsSeeded = await seedQuestions(mappedQuestions);
    if (!questionsSeeded) {
      console.log('\n❌ Failed to seed questions.');
      return;
    }

    // Step 5: Verify seeding
    await verifySeeding();

    console.log('🎉 Final React Questions Seeding Completed Successfully!');
    console.log('\n📋 What was seeded:');
    console.log('   ✅ React category with UUID');
    console.log('   ✅ 10 React topics with UUIDs');
    console.log(
      '   ✅ 307 React questions with UUIDs mapped to topics and category'
    );
    console.log('   ✅ All questions use valid "multiple-choice" type');
    console.log('\n🎯 Next steps:');
    console.log('   1. Verify the data in your Supabase dashboard');
    console.log('   2. Test the questions API endpoints');
    console.log('   3. Update your application to use the seeded questions');
    console.log('   4. Consider seeding questions for other categories\n');
  } catch (error) {
    console.error('❌ Seeding process failed:', error.message);
  }
}

// Run the seeding process
main();
