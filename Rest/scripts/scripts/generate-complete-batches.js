#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

console.log('🚀 Complete React Questions Seeding via Supabase MCP\n');

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

// React category and topics data
const reactCategoryId = 'ca612436-af48-4e3f-a7fd-f9a9b2c52374';
const reactTopics = [
  {
    id: 'eee69693-8312-4cb1-8bf7-f2c962aae105',
    name: 'React Basics',
    slug: 'react-basics',
  },
  {
    id: '759ee497-71fd-4347-9018-c9d62ba7470f',
    name: 'Components',
    slug: 'components',
  },
  { id: 'accaeeab-e45f-4999-a647-4e5126bcd487', name: 'Props', slug: 'props' },
  { id: 'ed11a4a3-b4e1-4d70-b69e-4b63e01576c2', name: 'State', slug: 'state' },
  { id: '756586f8-23f1-4a1b-a75f-ad7914b047c3', name: 'Hooks', slug: 'hooks' },
  { id: '6a7eecc1-7cea-4bfd-84d3-e5ddff1d6624', name: 'JSX', slug: 'jsx' },
  {
    id: '0ee220a5-c50b-4c32-afc5-a654931c9fcd',
    name: 'Virtual DOM',
    slug: 'virtual-dom',
  },
  {
    id: '26b91642-be93-4b6c-a974-c73a50b3c263',
    name: 'Lifecycle Methods',
    slug: 'lifecycle',
  },
  {
    id: '2a5901fd-e2ca-4fe3-a914-447622008d02',
    name: 'Event Handling',
    slug: 'events',
  },
  {
    id: '540c20e9-c800-48de-9185-e611c10d37d5',
    name: 'Lists and Keys',
    slug: 'lists-keys',
  },
];

function escapeSqlString(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function escapeJsonString(obj) {
  if (!obj) return 'NULL';
  return `'${JSON.stringify(obj).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
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

function mapQuestionsToSchema(questions) {
  console.log('🔄 Mapping questions to schema...\n');

  // Create topic mapping
  const topicMap = {};
  reactTopics.forEach(topic => {
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
        const matchingTopic = reactTopics.find(
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
      id: randomUUID(),
      title: question.title,
      content: question.content,
      type: 'multiple-choice',
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
        original_id: question.id,
        original_type: question.type,
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

function generateBatchSQL(questions, batchSize = 20) {
  console.log(
    `🔄 Generating SQL batches (${batchSize} questions per batch)...\n`
  );

  const batches = [];
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    let sql = `-- Batch ${batchNumber}: Questions ${i + 1}-${Math.min(i + batchSize, questions.length)}\nINSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES\n`;

    const values = batch.map(question => {
      const options = escapeJsonString(question.options);
      const testCases = escapeJsonString(question.test_cases);
      const stats = escapeJsonString(question.stats);
      const metadata = escapeJsonString(question.metadata);

      // Handle empty arrays properly
      const hints =
        question.hints && question.hints.length > 0
          ? `ARRAY[${question.hints.map(h => escapeSqlString(h)).join(',')}]`
          : 'ARRAY[]::text[]';

      const tags =
        question.tags && question.tags.length > 0
          ? `ARRAY[${question.tags.map(t => escapeSqlString(t)).join(',')}]`
          : 'ARRAY[]::text[]';

      return `(${escapeSqlString(question.id)}, ${escapeSqlString(question.title)}, ${escapeSqlString(question.content)}, ${escapeSqlString(question.type)}, ${escapeSqlString(question.difficulty)}, ${question.points}, ${options}, ${escapeSqlString(question.correct_answer)}, ${escapeSqlString(question.explanation)}, ${testCases}, ${hints}, ${tags}, ${stats}, ${metadata}, ${escapeSqlString(question.category_id)}, ${question.is_active}, ${escapeSqlString(question.created_at.toISOString())}, ${escapeSqlString(question.updated_at.toISOString())})`;
    });

    sql += values.join(',\n') + ';\n';
    batches.push(sql);
  }

  console.log(`✅ Generated ${batches.length} SQL batches\n`);
  return batches;
}

async function main() {
  try {
    console.log('🚀 Starting Complete React Questions Processing...\n');

    // Step 1: Load all React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded.');
      return;
    }

    // Step 2: Map questions to schema
    const mappedQuestions = mapQuestionsToSchema(allQuestions);

    // Step 3: Generate SQL batches
    const sqlBatches = generateBatchSQL(mappedQuestions, 20);

    // Step 4: Save batches to files
    const batchesDir = path.join(
      process.cwd(),
      'scripts',
      'react-batches-complete'
    );
    if (!fs.existsSync(batchesDir)) {
      fs.mkdirSync(batchesDir, { recursive: true });
    }

    sqlBatches.forEach((batch, index) => {
      const batchFile = path.join(batchesDir, `batch-${index + 1}.sql`);
      fs.writeFileSync(batchFile, batch);
    });

    console.log(
      `✅ Generated ${sqlBatches.length} SQL batch files in: ${batchesDir}`
    );
    console.log('\n📋 Batch files created:');
    sqlBatches.forEach((_, index) => {
      console.log(`   📄 batch-${index + 1}.sql`);
    });

    // Step 5: Generate summary
    const summary = {
      totalQuestions: mappedQuestions.length,
      batches: sqlBatches.length,
      questionsPerBatch: 20,
      topics: reactTopics.length,
      categoryId: reactCategoryId,
      generatedAt: new Date().toISOString(),
    };

    const summaryFile = path.join(batchesDir, 'summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

    console.log('\n📊 Summary:');
    console.log(`   📋 Total Questions: ${summary.totalQuestions}`);
    console.log(`   📦 Total Batches: ${summary.batches}`);
    console.log(`   🎯 Questions per Batch: ${summary.questionsPerBatch}`);
    console.log(`   🏷️  Topics: ${summary.topics}`);
    console.log(`   📁 Category ID: ${summary.categoryId}`);

    console.log('\n🎯 Next steps:');
    console.log('   1. Execute each batch using Supabase MCP');
    console.log('   2. Verify the questions in your Supabase dashboard');
    console.log('   3. Test the questions API endpoints\n');
  } catch (error) {
    console.error('❌ Processing failed:', error.message);
  }
}

// Run the processing
main();
