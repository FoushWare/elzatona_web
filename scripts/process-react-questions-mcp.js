#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

console.log('🌱 Loading React Questions from JSON Files\n');

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

// React category and topics data (from Supabase MCP query)
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
      id: randomUUID(), // Generate UUID for each question
      title: question.title,
      content: question.content,
      type: 'multiple-choice', // Use valid type
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

  console.log(`✅ Mapped ${mappedQuestions.length} questions to schema\n`);
  return mappedQuestions;
}

function generateSupabaseSQL(questions) {
  console.log('🔄 Generating Supabase SQL for questions...\n');

  // Clear existing React questions first
  let sql = `-- Clear existing React questions
DELETE FROM questions WHERE category_id = '${reactCategoryId}';

-- Insert React questions
INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES
`;

  // Generate INSERT statements
  const values = questions.map(question => {
    const options = question.options
      ? `'${JSON.stringify(question.options).replace(/'/g, "''")}'`
      : 'NULL';
    const testCases = question.test_cases
      ? `'${JSON.stringify(question.test_cases).replace(/'/g, "''")}'`
      : 'NULL';
    const stats = `'${JSON.stringify(question.stats).replace(/'/g, "''")}'`;
    const metadata = `'${JSON.stringify(question.metadata).replace(/'/g, "''")}'`;
    const hints = question.hints
      ? `ARRAY[${question.hints.map(h => `'${h.replace(/'/g, "''")}'`).join(',')}]`
      : 'NULL';
    const tags = question.tags
      ? `ARRAY[${question.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(',')}]`
      : 'NULL';

    return `('${question.id}', '${question.title.replace(/'/g, "''")}', '${question.content.replace(/'/g, "''")}', '${question.type}', '${question.difficulty}', ${question.points}, ${options}, ${question.correct_answer ? `'${question.correct_answer.replace(/'/g, "''")}'` : 'NULL'}, ${question.explanation ? `'${question.explanation.replace(/'/g, "''")}'` : 'NULL'}, ${testCases}, ${hints}, ${tags}, ${stats}, ${metadata}, '${question.category_id}', ${question.is_active}, '${question.created_at.toISOString()}', '${question.updated_at.toISOString()}')`;
  });

  sql += values.join(',\n') + ';\n\n';

  // Add verification query
  sql += `-- Verify insertion
SELECT 
  COUNT(*) as total_questions,
  COUNT(CASE WHEN difficulty = 'beginner' THEN 1 END) as beginner,
  COUNT(CASE WHEN difficulty = 'intermediate' THEN 1 END) as intermediate,
  COUNT(CASE WHEN difficulty = 'advanced' THEN 1 END) as advanced
FROM questions 
WHERE category_id = '${reactCategoryId}';`;

  return sql;
}

async function main() {
  try {
    console.log('🚀 Starting React Questions Processing...\n');

    // Step 1: Load all React questions
    const allQuestions = await loadAllReactQuestions();
    if (allQuestions.length === 0) {
      console.log('\n❌ No questions loaded.');
      return;
    }

    // Step 2: Map questions to schema
    const mappedQuestions = mapQuestionsToSchema(allQuestions);

    // Step 3: Generate SQL
    const sql = generateSupabaseSQL(mappedQuestions);

    // Step 4: Save SQL to file
    const sqlFilePath = path.join(
      process.cwd(),
      'scripts/react-questions-mcp.sql'
    );
    fs.writeFileSync(sqlFilePath, sql);

    console.log(`✅ SQL generated and saved to: ${sqlFilePath}`);
    console.log(
      `📊 Generated SQL for ${mappedQuestions.length} React questions`
    );
    console.log('\n🎯 Next steps:');
    console.log('   1. Execute the SQL using Supabase MCP');
    console.log('   2. Verify the questions in your Supabase dashboard');
    console.log('   3. Test the questions API endpoints\n');
  } catch (error) {
    console.error('❌ Processing failed:', error.message);
  }
}

// Run the processing
main();
