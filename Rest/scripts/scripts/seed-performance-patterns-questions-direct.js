const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const dataDir = path.join(
  __dirname,
  '../apps/admin/network/data/json/performance-patterns'
);
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Supabase URL or Service Role Key is missing in environment variables.'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function escapeSingleQuotes(str) {
  return str ? str.replace(/'/g, "''") : '';
}

function generateOptions(questionContent) {
  const options = [
    { id: 'a', text: 'Option A', isCorrect: false },
    { id: 'b', text: 'Option B', isCorrect: false },
    { id: 'c', text: 'Option C', isCorrect: true },
    { id: 'd', text: 'Option D', isCorrect: false },
  ];
  return options;
}

function generateInsertStatement(question, categoryId) {
  const id = require('crypto').randomUUID();
  const title = escapeSingleQuotes(question.title || 'Untitled Question');
  const content = escapeSingleQuotes(question.content || '');
  let type = question.type || 'open-ended';
  const difficulty = question.difficulty || 'beginner';
  const points = question.points || 1;
  let options = null;
  let correct_answer = null;
  const explanation = escapeSingleQuotes(question.explanation || '');
  const test_cases =
    question.test_cases &&
    Array.isArray(question.test_cases) &&
    question.test_cases.length > 0
      ? question.test_cases
      : null;
  const hints =
    question.hints && Array.isArray(question.hints) && question.hints.length > 0
      ? question.hints
      : null;
  const tags =
    question.tags && Array.isArray(question.tags) && question.tags.length > 0
      ? question.tags
      : [];
  const stats = question.stats || {
    views: 0,
    attempts: 0,
    correct_attempts: 0,
    average_time: 0,
  };
  const metadata = {
    original_id: question.id,
    original_type: question.type,
    topic: question.topic,
    subcategory: question.subcategory,
    sample_answers: question.sample_answers || [],
    time_limit: question.time_limit || 60,
    related_links: question.related_links || [],
    created_by: question.created_by || 'system',
    updated_by: question.updated_by || 'system',
    technology: question.technology || 'Performance',
  };
  const is_active =
    question.is_active !== undefined ? question.is_active : true;
  const created_at = question.created_at || new Date().toISOString();
  const updated_at = question.updated_at || new Date().toISOString();

  // Convert all questions to multiple-choice or true-false
  if (type === 'open-ended' || type === 'mcq') {
    type = 'multiple-choice';
    options = generateOptions(content);
    correct_answer = 'c';
  } else if (type === 'true-false') {
    options = [
      { id: 'true', text: 'True', isCorrect: false },
      { id: 'false', text: 'False', isCorrect: true },
    ];
    correct_answer = 'false';
  } else if (
    question.options &&
    Array.isArray(question.options) &&
    question.options.length > 0
  ) {
    options = question.options;
    correct_answer = question.correct_answer || 'c';
  } else {
    type = 'multiple-choice';
    options = generateOptions(content);
    correct_answer = 'c';
  }

  return {
    id,
    title,
    content,
    type,
    difficulty,
    points,
    options,
    correct_answer,
    explanation,
    test_cases,
    hints,
    tags,
    stats,
    metadata,
    category_id: categoryId,
    is_active,
    created_at,
    updated_at,
  };
}

async function processQuestionsFromFile(filePath, categoryId) {
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

async function seedPerformancePatternsQuestions() {
  try {
    // Get Performance category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'performance')
      .single();

    if (categoryError) {
      console.error(
        'Error fetching Performance Patterns category ID:',
        categoryError
      );
      return;
    }

    const categoryId = categoryData.id;
    console.log(`Found Performance category ID: ${categoryId}`);

    // Process all Performance Patterns files
    const files = fs
      .readdirSync(dataDir)
      .filter(file => file.endsWith('.json'));
    console.log(`Found ${files.length} Performance Patterns files`);

    let totalInserted = 0;
    let totalErrors = 0;

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const questions = await processQuestionsFromFile(filePath, categoryId);

      console.log(`\nInserting ${questions.length} questions from ${file}...`);

      // Insert questions in batches of 10
      for (let i = 0; i < questions.length; i += 10) {
        const batch = questions.slice(i, i + 10);

        const { data, error } = await supabase.from('questions').insert(batch);

        if (error) {
          console.error(`Error inserting batch from ${file}:`, error);
          totalErrors += batch.length;
        } else {
          console.log(
            `✅ Inserted ${batch.length} questions from ${file} (batch ${Math.floor(i / 10) + 1})`
          );
          totalInserted += batch.length;
        }
      }
    }

    console.log(`\n=== Performance Seeding Complete ===`);
    console.log(`Total questions inserted: ${totalInserted}`);
    console.log(`Total errors: ${totalErrors}`);
  } catch (error) {
    console.error('Error in seedPerformancePatternsQuestions:', error);
  }
}

seedPerformancePatternsQuestions();
