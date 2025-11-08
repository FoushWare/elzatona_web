const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.join(__dirname, '../apps/admin/network/data/json/nextjs');
const outputSqlFile = path.join(__dirname, 'seed-nextjs-questions.sql');
const outputBatchesDir = path.join(__dirname, 'nextjs-batches');
const BATCH_SIZE = 20; // Number of INSERT statements per batch

if (!fs.existsSync(outputBatchesDir)) {
  fs.mkdirSync(outputBatchesDir);
}

function escapeSingleQuotes(str) {
  return str ? str.replace(/'/g, "''") : '';
}

function generateOptions(questionContent) {
  const options = [
    { id: 'a', text: 'Option A', isCorrect: false },
    { id: 'b', text: 'Option B', isCorrect: false },
    { id: 'c', text: 'Option C', isCorrect: true }, // Default correct
    { id: 'd', text: 'Option D', isCorrect: false },
  ];
  return JSON.stringify(options);
}

function generateInsertStatement(question, categoryId) {
  const id = uuidv4();
  const title = escapeSingleQuotes(question.title || 'Untitled Question');
  const content = escapeSingleQuotes(question.content || '');
  let type = question.type || 'open-ended';
  const difficulty = question.difficulty || 'beginner';
  const points = question.points || 1;
  let options = 'NULL';
  let correct_answer = 'NULL';
  const explanation = escapeSingleQuotes(question.explanation || '');
  const test_cases =
    question.test_cases &&
    Array.isArray(question.test_cases) &&
    question.test_cases.length > 0
      ? `ARRAY[${question.test_cases.map(tc => `'${escapeSingleQuotes(tc)}'`).join(',')}]::jsonb[]`
      : `ARRAY[]::jsonb[]`;
  const hints =
    question.hints && Array.isArray(question.hints) && question.hints.length > 0
      ? `ARRAY[${question.hints.map(h => `'${escapeSingleQuotes(h)}'`).join(',')}]::text[]`
      : `ARRAY[]::text[]`;
  const tags =
    question.tags && Array.isArray(question.tags) && question.tags.length > 0
      ? `ARRAY[${question.tags.map(tag => `'${escapeSingleQuotes(tag)}'`).join(',')}]::text[]`
      : `ARRAY[]::text[]`;
  const stats = JSON.stringify(
    question.stats || {
      views: 0,
      attempts: 0,
      correct_attempts: 0,
      average_time: 0,
    }
  );
  const metadata = JSON.stringify({
    original_id: question.id,
    original_type: question.type,
    topic: question.topic,
    subcategory: question.subcategory,
    sample_answers: question.sample_answers || [],
    time_limit: question.time_limit || 60,
    related_links: question.related_links || [],
    created_by: question.created_by || 'system',
    updated_by: question.updated_by || 'system',
    technology: question.technology || 'Next.js',
  });
  const is_active =
    question.is_active !== undefined ? question.is_active : true;
  const created_at = question.created_at || new Date().toISOString();
  const updated_at = question.updated_at || new Date().toISOString();

  // Convert all questions to multiple-choice or true-false
  if (type === 'open-ended' || type === 'mcq') {
    type = 'multiple-choice';
    options = `'${escapeSingleQuotes(generateOptions(content))}'`;
    correct_answer = `'c'`; // Default to 'c' for converted multiple-choice
  } else if (type === 'true-false') {
    options = `'${escapeSingleQuotes(
      JSON.stringify([
        { id: 'true', text: 'True', isCorrect: false },
        { id: 'false', text: 'False', isCorrect: true },
      ])
    )}'`;
    correct_answer = `'false'`; // Default to 'false' for true-false
  } else if (
    question.options &&
    Array.isArray(question.options) &&
    question.options.length > 0
  ) {
    options = `'${escapeSingleQuotes(JSON.stringify(question.options))}'`;
    correct_answer = `'${escapeSingleQuotes(question.correct_answer || 'c')}'`;
  } else {
    // Fallback for other types or if options are missing for multiple-choice
    type = 'multiple-choice'; // Ensure it's multiple-choice
    options = `'${escapeSingleQuotes(generateOptions(content))}'`;
    correct_answer = `'c'`;
  }

  return `INSERT INTO questions (id, title, content, type, difficulty, points, options, correct_answer, explanation, test_cases, hints, tags, stats, metadata, category_id, is_active, created_at, updated_at) VALUES (
      '${id}',
      '${title}',
      '${content}',
      '${type}',
      '${difficulty}',
      ${points},
      ${options},
      ${correct_answer},
      '${explanation}',
      ${test_cases},
      ${hints},
      ${tags},
      '${stats}',
      '${metadata}',
      '${categoryId}',
      ${is_active},
      '${created_at}',
      '${updated_at}'
    );`;
}

function processQuestionsFromFile(filePath, categoryId) {
  try {
    console.log(`Processing ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      console.log(`Skipping ${filePath} - not an array`);
      return [];
    }

    return questions.map(q => generateInsertStatement(q, categoryId));
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return [];
  }
}

async function generateNextjsQuestionsSql() {
  let allInsertStatements = [];
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

  // Next.js category ID
  const nextjsCategoryId = '9686f91c-d21e-4b1b-a5b9-9f702a58631e';

  console.log('Processing Next.js questions from JSON files...');
  console.log(`Found ${files.length} Next.js files`);

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const statements = processQuestionsFromFile(filePath, nextjsCategoryId);
    allInsertStatements = allInsertStatements.concat(statements);
  }

  console.log(
    `\nGenerated ${allInsertStatements.length} Next.js INSERT statements`
  );
  fs.writeFileSync(outputSqlFile, allInsertStatements.join('\n\n'));
  console.log(`SQL file saved to: ${outputSqlFile}`);

  // Split into batches
  const statements = allInsertStatements.filter(stmt => stmt.trim().length > 0);
  let batchNum = 1;
  for (let i = 0; i < statements.length; i += BATCH_SIZE) {
    const batch = statements.slice(i, i + BATCH_SIZE);
    const batchFileName = path.join(
      outputBatchesDir,
      `nextjs-batch-${batchNum}.sql`
    );
    fs.writeFileSync(batchFileName, batch.join('\n\n') + ';\n');
    console.log(`Created batch ${batchNum}: ${batch.length} statements`);
    batchNum++;
  }
  console.log(`\nCreated ${batchNum - 1} batches`);
  console.log(
    'All Next.js batch files created! Execute them using Supabase MCP tools.'
  );
}

generateNextjsQuestionsSql();
