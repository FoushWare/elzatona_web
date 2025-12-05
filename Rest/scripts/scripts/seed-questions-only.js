#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('🌱 Seeding React Questions (Table Must Exist)\n');

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

async function seedQuestions(questions) {
  console.log('🔄 Seeding questions to database...\n');

  try {
    // Clear existing React questions
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .eq('category', 'React');

    if (deleteError) {
      console.log(
        '⚠️  Could not clear existing React questions:',
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
    console.log('🚀 Starting React Questions Seeding...\n');

    // Load all React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded. Please check the file paths.');
      return;
    }

    // Seed questions
    const questionsSeeded = await seedQuestions(allQuestions);
    if (!questionsSeeded) {
      console.log('\n❌ Failed to seed questions.');
      return;
    }

    // Verify seeding
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
