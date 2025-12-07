#!/usr/bin/env node

/**
 * Seed all React questions to Supabase in small batches
 * This script processes questions in batches of 10 and outputs SQL
 * that can be executed via Supabase MCP
 */

const fs = require('fs');
const path = require('path');

const REACT_CATEGORY_ID = '1d54dd10-68fe-4ea9-874e-c960930e0402';
const TOPIC_ID = 'd9e02bfd-4293-42de-a9a8-65eeb7c61e32'; // Core React (default)
const BATCH_SIZE = 10; // Small batches to avoid SQL size limits

function escapeSql(text) {
  if (text === null || text === undefined) return 'NULL';
  if (typeof text === 'object') {
    return `'${JSON.stringify(text).replace(/'/g, "''").replace(/\\/g, '\\\\')}'::jsonb`;
  }
  return `'${String(text).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function formatArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return 'ARRAY[]::text[]';
  return `ARRAY[${arr.map(item => escapeSql(String(item))).join(', ')}]`;
}

function normalizeQuestionType(type) {
  const validTypes = [
    'multiple-choice',
    'open-ended',
    'true-false',
    'code',
    'mcq',
    'concept',
    'scenario',
  ];
  if (validTypes.includes(type)) return type;

  const typeMap = {
    'code-completion': 'code',
    debugging: 'code',
  };
  return typeMap[type] || 'open-ended';
}

function normalizeDifficulty(difficulty) {
  const valid = ['beginner', 'intermediate', 'advanced'];
  if (valid.includes(difficulty)) return difficulty;

  const map = {
    easy: 'beginner',
    medium: 'intermediate',
    hard: 'advanced',
  };
  return map[difficulty] || 'intermediate';
}

function generateBatchSQL(questions, categoryId, topicId) {
  const now = new Date().toISOString();

  const values = questions
    .map(q => {
      const questionType = normalizeQuestionType(q.type);
      const difficulty = normalizeDifficulty(q.difficulty);

      return `(
    gen_random_uuid(),
    ${escapeSql(q.title)},
    ${escapeSql(q.content || q.title)},
    ${escapeSql(questionType)},
    ${escapeSql(difficulty)},
    ${q.points || 10},
    ${q.options ? escapeSql(q.options) : 'NULL'},
    ${q.correctAnswer ? escapeSql(q.correctAnswer) : 'NULL'},
    ${q.explanation ? escapeSql(q.explanation) : 'NULL'},
    NULL,
    ${formatArray(q.hints || [])},
    ${formatArray(q.tags || [])},
    ${q.metadata ? escapeSql(q.metadata) : "'{}'::jsonb"},
    '{"avgTime": 0, "correct": 0, "attempts": 0}'::jsonb,
    '${categoryId}',
    NULL,
    ${q.isActive !== false},
    '${now}',
    '${now}',
    '${topicId}',
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
  console.log('🌱 Seeding All React Questions to Supabase\n');

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

  // Process in batches
  const batches = [];
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const sql = generateBatchSQL(batch, REACT_CATEGORY_ID, TOPIC_ID);

    batches.push({
      batchNum: Math.floor(i / BATCH_SIZE) + 1,
      startIndex: i + 1,
      endIndex: Math.min(i + BATCH_SIZE, questions.length),
      count: batch.length,
      sql,
    });
  }

  console.log(
    `📊 Generated ${batches.length} batches of ${BATCH_SIZE} questions each\n`
  );

  // Save each batch to a separate file
  const outputDir = path.join(__dirname, '../seed-batches');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('💾 Saving batch files...\n');
  batches.forEach(batch => {
    const filename = path.join(
      outputDir,
      `batch-${String(batch.batchNum).padStart(3, '0')}.sql`
    );
    fs.writeFileSync(
      filename,
      `-- Batch ${batch.batchNum}: Questions ${batch.startIndex}-${batch.endIndex} (${batch.count} questions)\n${batch.sql}\n`,
      'utf8'
    );
    console.log(`   ✅ Saved ${filename}`);
  });

  // Also create a combined file with all batches
  const combinedSQL = batches
    .map(
      b =>
        `-- Batch ${b.batchNum}: Questions ${b.startIndex}-${b.endIndex} (${b.count} questions)\n${b.sql}\n`
    )
    .join('\n');

  const combinedFile = path.join(__dirname, '../seed-all-react-questions.sql');
  fs.writeFileSync(combinedFile, combinedSQL, 'utf8');
  console.log(`\n💾 Combined SQL saved to: ${combinedFile}`);

  console.log(`\n✅ Done! Generated ${batches.length} batches`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the SQL batches in: ${outputDir}`);
  console.log(`   2. Execute each batch via: mcp_supabase_execute_sql`);
  console.log(`   3. Or execute the combined file: ${combinedFile}\n`);
}

main().catch(console.error);
