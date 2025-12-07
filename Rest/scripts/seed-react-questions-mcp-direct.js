#!/usr/bin/env node

/**
 * Seed React questions directly to Supabase using MCP
 * This script reads react-questions.json and inserts questions via Supabase MCP
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'kiycimlsatwfqxtfprlr';
const REACT_CATEGORY_ID = '1d54dd10-68fe-4ea9-874e-c960930e0402';
const BATCH_SIZE = 50;

// Topic name mappings (from question topic to database topic)
const topicNameMap = {
  'Core Concepts': 'Core React',
  'Core React': 'Core React',
  Hooks: 'React Hooks',
  'State Management': 'React State Management',
  'Component Lifecycle': 'React Component Lifecycle',
  JSX: 'JSX',
  Props: 'React Props',
  Events: 'React Events',
  Forms: 'React Forms',
  Routing: 'React Router',
  Performance: 'React Performance',
  Testing: 'React Testing',
  Miscellaneous: 'Miscellaneous',
};

function escapeSql(text) {
  if (text === null || text === undefined) return 'NULL';
  if (typeof text === 'object') {
    return `'${JSON.stringify(text).replace(/'/g, "''").replace(/\\/g, '\\\\')}'::jsonb`;
  }
  return `'${String(text).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function formatArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return 'ARRAY[]::text[]';
  }
  return `ARRAY[${arr.map(item => escapeSql(String(item))).join(', ')}]`;
}

async function getTopicsFromDB() {
  console.log('📋 Fetching topics from database...\n');

  // This will be called via MCP, but for now we'll use a hardcoded list
  // In a real scenario, you'd call mcp_supabase_execute_sql here
  const topics = [
    {
      id: 'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
      name: 'Core React',
      slug: 'react-core-react',
    },
    // Add more topics as needed - we'll map dynamically
  ];

  return topics;
}

function findTopicId(questionTopic, allTopics) {
  if (!questionTopic) return null;

  const topicKey = questionTopic.toLowerCase();

  // Direct match
  for (const topic of allTopics) {
    if (
      topic.name.toLowerCase() === topicKey ||
      topic.slug.toLowerCase() === topicKey
    ) {
      return topic.id;
    }
  }

  // Partial match
  for (const topic of allTopics) {
    if (
      topic.name.toLowerCase().includes(topicKey) ||
      topicKey.includes(topic.name.toLowerCase())
    ) {
      return topic.id;
    }
  }

  // Use mapped name
  const mappedName = topicNameMap[questionTopic];
  if (mappedName) {
    for (const topic of allTopics) {
      if (topic.name.toLowerCase() === mappedName.toLowerCase()) {
        return topic.id;
      }
    }
  }

  // Default to Core React
  return 'd9e02bfd-4293-42de-a9a8-65eeb7c61e32';
}

function generateInsertSQL(questions, categoryId, topics) {
  if (questions.length === 0) return '';

  const values = questions
    .map(q => {
      const now = new Date().toISOString();
      const topicId = findTopicId(q.topic, topics);

      // Map question type to valid database type
      let questionType = 'open-ended';
      if (q.type) {
        const validTypes = [
          'multiple-choice',
          'open-ended',
          'true-false',
          'code',
          'mcq',
          'concept',
          'scenario',
        ];
        if (validTypes.includes(q.type)) {
          questionType = q.type;
        } else {
          // Map invalid types
          const typeMap = {
            'code-completion': 'code',
            debugging: 'code',
          };
          questionType = typeMap[q.type] || 'open-ended';
        }
      }

      // Map difficulty
      let difficulty = q.difficulty || 'intermediate';
      if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
        const difficultyMap = {
          easy: 'beginner',
          medium: 'intermediate',
          hard: 'advanced',
        };
        difficulty = difficultyMap[difficulty] || 'intermediate';
      }

      // Handle options
      let optionsJson = null;
      if (q.options) {
        if (typeof q.options === 'object') {
          optionsJson = q.options;
        } else {
          optionsJson = null;
        }
      }

      // Get correct answer
      let correctAnswer = q.correctAnswer || q.answer || '';
      if (q.options && Array.isArray(q.options)) {
        const correctOption = q.options.find(opt => opt.isCorrect === true);
        if (correctOption) {
          correctAnswer = correctOption.text || correctOption.explanation || '';
        }
      } else if (
        q.options &&
        typeof q.options === 'object' &&
        q.correctAnswer
      ) {
        // Handle object format like { A: 'text', B: 'text' } with correctAnswer: 'A'
        if (q.options[q.correctAnswer]) {
          correctAnswer = q.options[q.correctAnswer];
        }
      }

      return `(
      gen_random_uuid(),
      ${escapeSql(q.title)},
      ${escapeSql(q.content || q.title)},
      ${escapeSql(questionType)},
      ${escapeSql(difficulty)},
      ${q.points || 10},
      ${optionsJson ? escapeSql(optionsJson) : 'NULL'},
      ${correctAnswer ? escapeSql(correctAnswer) : 'NULL'},
      ${q.explanation ? escapeSql(q.explanation) : 'NULL'},
      ${q.test_cases ? escapeSql(q.test_cases) : 'NULL'},
      ${formatArray(q.hints || [])},
      ${formatArray(q.tags || [])},
      ${q.metadata ? escapeSql(q.metadata) : "'{}'::jsonb"},
      ${q.stats ? escapeSql(q.stats) : '\'{"avgTime": 0, "correct": 0, "attempts": 0}\'::jsonb'},
      ${escapeSql(categoryId)},
      NULL,
      ${q.isActive !== false},
      ${escapeSql(now)},
      ${escapeSql(now)},
      ${topicId ? escapeSql(topicId) : 'NULL'},
      ${q.timeLimit || q.time_limit || 300}
    )`;
    })
    .join(',\n    ');

  return `INSERT INTO questions (
    id, title, content, type, difficulty, points, options, correct_answer, 
    explanation, test_cases, hints, tags, metadata, stats, category_id, 
    learning_card_id, is_active, created_at, updated_at, topic_id, time_limit
  ) VALUES ${values};`;
}

async function main() {
  console.log('🌱 Seeding React Questions to Supabase via MCP\n');
  console.log(`📦 Project ID: ${PROJECT_ID}`);
  console.log(`📁 Category ID: ${REACT_CATEGORY_ID}\n`);

  // Load questions
  const questionsPath = path.join(
    __dirname,
    '../final-questions-v01/react-questions.json'
  );
  console.log(`📖 Loading questions from: ${questionsPath}\n`);

  if (!fs.existsSync(questionsPath)) {
    console.error(`❌ Questions file not found: ${questionsPath}`);
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  console.log(`✅ Loaded ${questions.length} questions\n`);

  // Get topics from database (we'll need to fetch this via MCP)
  // For now, we'll use a query to get all React topics
  console.log('📋 Note: You need to fetch topics from database first');
  console.log(
    "   Run: SELECT id, name, slug FROM topics WHERE category_id = '1d54dd10-68fe-4ea9-874e-c960930e0402';\n"
  );

  // Generate SQL batches
  console.log('🔄 Generating SQL batches...\n');

  const sqlBatches = [];
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);

    // For now, we'll use a default topic list - in production, fetch from DB
    const defaultTopics = [
      {
        id: 'd9e02bfd-4293-42de-a9a8-65eeb7c61e32',
        name: 'Core React',
        slug: 'react-core-react',
      },
    ];

    const sql = generateInsertSQL(batch, REACT_CATEGORY_ID, defaultTopics);

    sqlBatches.push({
      batchNum: Math.floor(i / BATCH_SIZE) + 1,
      count: batch.length,
      sql,
    });

    console.log(
      `   ✅ Generated batch ${sqlBatches.length}: ${batch.length} questions`
    );
  }

  console.log(
    `\n📊 Total: ${questions.length} questions in ${sqlBatches.length} batches\n`
  );

  // Save SQL to file
  const sqlFile = path.join(__dirname, '../seed-react-questions-mcp.sql');
  const allSQL = sqlBatches
    .map(b => `-- Batch ${b.batchNum} (${b.count} questions)\n${b.sql}\n`)
    .join('\n');

  fs.writeFileSync(sqlFile, allSQL, 'utf8');
  console.log(`💾 SQL saved to: ${sqlFile}`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Fetch all React topics from database`);
  console.log(`   2. Update topic mapping in this script`);
  console.log(`   3. Re-run to generate correct SQL`);
  console.log(`   4. Execute SQL batches via mcp_supabase_execute_sql\n`);
}

main().catch(console.error);
