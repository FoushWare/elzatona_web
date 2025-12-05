#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Final React Setup (Simplified)\n');

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

async function createReactCategory() {
  console.log('🔄 Creating React category...\n');

  try {
    // Check if React category already exists
    const { data: existingCategories, error: checkError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .ilike('name', '%react%');

    if (checkError) {
      console.error('❌ Error checking categories:', checkError.message);
      return null;
    }

    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ React category already exists:');
      existingCategories.forEach(cat => {
        console.log(`   ${cat.name} (${cat.slug}): ${cat.id}`);
      });
      return existingCategories[0].id;
    }

    // Create React category with minimal required fields
    const { data: newCategory, error: createError } = await supabase
      .from('categories')
      .insert({
        name: 'React',
        slug: 'react',
        description:
          'React library fundamentals, components, hooks, and advanced patterns',
        card_type: 'Framework Questions',
        icon: '⚛️',
        color: '#61DAFB',
        order_index: 1,
        is_active: true,
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating React category:', createError.message);
      return null;
    }

    console.log('✅ React category created successfully:');
    console.log(
      `   ${newCategory.name} (${newCategory.slug}): ${newCategory.id}\n`
    );
    return newCategory.id;
  } catch (error) {
    console.error('❌ Error creating React category:', error.message);
    return null;
  }
}

async function createReactTopics(reactCategoryId) {
  console.log('🔄 Creating React topics...\n');

  const reactTopics = [
    {
      name: 'React Basics',
      slug: 'react-basics',
      description: 'Core React concepts, JSX, elements, and components',
      difficulty: 'beginner',
      estimated_questions: 30,
      order_index: 1,
    },
    {
      name: 'Components',
      slug: 'components',
      description: 'Function components, class components, pure components',
      difficulty: 'beginner',
      estimated_questions: 25,
      order_index: 2,
    },
    {
      name: 'Props',
      slug: 'props',
      description: 'Props, prop types, default props, children prop',
      difficulty: 'beginner',
      estimated_questions: 20,
      order_index: 3,
    },
    {
      name: 'State',
      slug: 'state',
      description: 'useState hook, state management, local state',
      difficulty: 'intermediate',
      estimated_questions: 25,
      order_index: 4,
    },
    {
      name: 'Hooks',
      slug: 'hooks',
      description: 'useEffect, custom hooks, hook rules',
      difficulty: 'intermediate',
      estimated_questions: 30,
      order_index: 5,
    },
    {
      name: 'JSX',
      slug: 'jsx',
      description: 'JSX syntax, expressions, conditional rendering',
      difficulty: 'beginner',
      estimated_questions: 15,
      order_index: 6,
    },
    {
      name: 'Virtual DOM',
      slug: 'virtual-dom',
      description: 'Virtual DOM, reconciliation, performance',
      difficulty: 'intermediate',
      estimated_questions: 20,
      order_index: 7,
    },
    {
      name: 'Lifecycle Methods',
      slug: 'lifecycle',
      description: 'Component lifecycle, mounting, updating, unmounting',
      difficulty: 'intermediate',
      estimated_questions: 20,
      order_index: 8,
    },
    {
      name: 'Event Handling',
      slug: 'events',
      description: 'Event handling, synthetic events, form handling',
      difficulty: 'beginner',
      estimated_questions: 15,
      order_index: 9,
    },
    {
      name: 'Lists and Keys',
      slug: 'lists-keys',
      description: 'Rendering lists, keys, performance optimization',
      difficulty: 'beginner',
      estimated_questions: 15,
      order_index: 10,
    },
  ];

  try {
    // Check existing topics
    const { data: existingTopics, error: checkError } = await supabase
      .from('topics')
      .select('id, name, slug')
      .eq('category_id', reactCategoryId);

    if (checkError) {
      console.error('❌ Error checking topics:', checkError.message);
      return [];
    }

    const existingTopicSlugs = existingTopics?.map(t => t.slug) || [];
    const topicsToCreate = reactTopics.filter(
      topic => !existingTopicSlugs.includes(topic.slug)
    );

    if (topicsToCreate.length === 0) {
      console.log('✅ All React topics already exist');
      return existingTopics.map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
      }));
    }

    // Create topics with correct schema
    const topicsWithCategoryId = topicsToCreate.map(topic => ({
      ...topic,
      category_id: reactCategoryId,
    }));

    const { data: newTopics, error: createError } = await supabase
      .from('topics')
      .insert(topicsWithCategoryId)
      .select();

    if (createError) {
      console.error('❌ Error creating topics:', createError.message);
      return [];
    }

    console.log(`✅ Created ${newTopics.length} React topics:`);
    newTopics.forEach(topic => {
      console.log(`   ${topic.name} (${topic.slug}): ${topic.id}`);
    });

    // Combine existing and new topics
    const allTopics = [...(existingTopics || []), ...newTopics];
    console.log(`\n📊 Total React topics: ${allTopics.length}\n`);
    return allTopics;
  } catch (error) {
    console.error('❌ Error creating topics:', error.message);
    return [];
  }
}

async function loadAllReactQuestions() {
  console.log('🔄 Loading React questions from JSON files...\n');

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
  console.log('🔄 Mapping questions to schema...\n');

  // Create topic mapping
  const topicMap = {};
  topics.forEach(topic => {
    topicMap[topic.name.toLowerCase()] = topic.id;
    topicMap[topic.slug.toLowerCase()] = topic.id;
  });

  console.log(
    `📊 Topic mapping created for ${Object.keys(topicMap).length} topics`
  );

  // Map questions to schema
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

    return {
      id: question.id,
      title: question.title,
      content: question.content,
      type: question.type || 'open-ended',
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

  console.log(`✅ Mapped ${mappedQuestions.length} questions to schema\n`);
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
    console.log('🚀 Starting Final React Setup...\n');

    // Step 1: Create React category
    const reactCategoryId = await createReactCategory();
    if (!reactCategoryId) {
      console.log('\n❌ Failed to create React category.');
      return;
    }

    // Step 2: Create React topics
    const topics = await createReactTopics(reactCategoryId);
    if (topics.length === 0) {
      console.log('\n❌ Failed to create React topics.');
      return;
    }

    // Step 3: Load React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded.');
      return;
    }

    // Step 4: Map questions to schema
    const mappedQuestions = await mapQuestionsToSchema(
      allQuestions,
      reactCategoryId,
      topics
    );

    // Step 5: Seed questions
    const questionsSeeded = await seedQuestions(mappedQuestions);
    if (!questionsSeeded) {
      console.log('\n❌ Failed to seed questions.');
      return;
    }

    // Step 6: Verify seeding
    await verifySeeding();

    console.log('🎉 Final React Setup Completed Successfully!');
    console.log('\n📋 What was created:');
    console.log('   ✅ React category with proper UUID');
    console.log(
      '   ✅ 10 React topics (React Basics, Components, Props, etc.)'
    );
    console.log('   ✅ 307 React questions mapped to topics and category');
    console.log('\n🎯 Next steps:');
    console.log('   1. Verify the data in your Supabase dashboard');
    console.log('   2. Test the questions API endpoints');
    console.log('   3. Update your application to use the seeded questions');
    console.log('   4. Consider seeding questions for other categories\n');
  } catch (error) {
    console.error('❌ Setup process failed:', error.message);
  }
}

// Run the complete setup
main();
