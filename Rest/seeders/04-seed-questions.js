const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Seeder for Questions
 * Updates existing questions or creates new ones based on id
 * Links questions to topics, categories, and learning cards
 * Processes questions in batches to avoid memory issues
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BATCH_SIZE = 50; // Process questions in batches

// Category name mapping from filename
const categoryNameMap = {
  'html-questions.json': 'HTML',
  'css-questions.json': 'CSS',
  'javascript-questions.json': 'JavaScript',
  'react-questions.json': 'React',
  'nextjs-questions.json': 'Next.js',
  'design-patterns-questions.json': 'Design Patterns',
  'performance-patterns-questions.json': 'Performance Patterns',
  'rendering-patterns-questions.json': 'Rendering Patterns',
  'security-questions.json': 'Security',
  'system-design-questions.json': 'System Design',
  'frontend-tasks-questions.json': 'Frontend Tasks',
  'problem-solving-questions.json': 'Problem Solving',
};

/**
 * Auto-discover all question files in final-questions-v01
 */
function discoverQuestionFiles() {
  const questionsDir = path.join(__dirname, '../final-questions-v01');
  const questionFiles = [];

  // Files to exclude
  const excludeFiles = ['topics.json', 'reference.md'];
  const excludeDirs = ['topics', 'javascript', 'react']; // Exclude nested dirs for now

  function scanDirectory(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativeFilePath = relativePath
        ? path.join(relativePath, entry.name)
        : entry.name;

      if (entry.isDirectory()) {
        // Skip excluded directories
        if (!excludeDirs.includes(entry.name)) {
          scanDirectory(fullPath, relativeFilePath);
        }
      } else if (entry.isFile()) {
        // Look for *-questions.json files
        if (
          entry.name.endsWith('-questions.json') &&
          !excludeFiles.includes(entry.name)
        ) {
          const categoryName =
            categoryNameMap[entry.name] ||
            extractCategoryFromFilename(entry.name);
          questionFiles.push({
            categoryName,
            fileName: entry.name,
            filePath: fullPath,
            relativePath: relativeFilePath,
          });
        }
      }
    }
  }

  scanDirectory(questionsDir);

  return questionFiles;
}

/**
 * Extract category name from filename
 * e.g., "html-questions.json" -> "HTML"
 */
function extractCategoryFromFilename(filename) {
  // Remove -questions.json suffix
  let category = filename.replace(/-questions\.json$/, '');

  // Convert kebab-case to Title Case
  category = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return category;
}

/**
 * Detect question format and normalize to standard format
 */
function normalizeQuestion(question, index, categoryName) {
  // Check if it's already in standard format (has id, title, content, type, category)
  if (
    question.id &&
    question.title &&
    question.content !== undefined &&
    question.type
  ) {
    return question; // Already in standard format
  }

  // Check if it's in parsed format (has num, title, code, options, correctAnswer, explanation)
  if (
    question.num !== undefined &&
    question.title &&
    (question.code !== undefined || question.explanation !== undefined)
  ) {
    // Convert parsed format to standard format
    const id =
      question.id ||
      `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${String(index + 1).padStart(3, '0')}-${question.num || index + 1}`;

    // Format content with code examples
    let content = question.explanation || question.title;
    if (question.code) {
      const codeHtml = `<pre><code>${escapeHtml(question.code)}</code></pre>`;
      content = question.explanation
        ? `${codeHtml}\n\n${question.explanation}`
        : codeHtml;
    }

    // Convert options format if present
    let options = null;
    if (question.options && typeof question.options === 'object') {
      // Check if it's in {A: "...", B: "..."} format
      if (question.options.A || question.options.B) {
        options = Object.entries(question.options).map(([key, text], idx) => ({
          id: `o${idx + 1}`,
          text: String(text),
          isCorrect: key === question.correctAnswer,
          explanation: '',
        }));
      } else if (Array.isArray(question.options)) {
        // Already in array format
        options = question.options;
      }
    }

    return {
      id,
      title: question.title,
      content: content || question.title,
      type: options ? 'multiple-choice' : 'open-ended',
      category: categoryName,
      topic: question.topic || question.section || null,
      difficulty: question.difficulty || 'intermediate',
      learningCardId: question.learningCardId || 'framework-questions',
      isActive: question.isActive !== false,
      explanation: question.explanation || '',
      points: question.points || 10,
      options: options,
      hints: question.hints || [],
      tags: question.tags || [categoryName.toLowerCase()],
      metadata: {
        ...(question.metadata || {}),
        source: question.metadata?.source || 'parsed',
        originalNum: question.num || index + 1,
      },
    };
  }

  // Unknown format - try to create minimal standard format
  console.warn(
    `  ⚠️  Unknown question format at index ${index}, attempting to normalize...`
  );
  return {
    id:
      question.id ||
      `${categoryName.toLowerCase().replace(/\s+/g, '-')}-${String(index + 1).padStart(3, '0')}`,
    title: question.title || `Question ${index + 1}`,
    content: question.content || question.explanation || question.title || '',
    type:
      question.type || (question.options ? 'multiple-choice' : 'open-ended'),
    category: categoryName,
    topic: question.topic || null,
    difficulty: question.difficulty || 'intermediate',
    learningCardId: question.learningCardId || 'framework-questions',
    isActive: question.isActive !== false,
    explanation: question.explanation || '',
    points: question.points || 10,
    options: question.options || null,
    hints: question.hints || [],
    tags: question.tags || [categoryName.toLowerCase()],
    metadata: question.metadata || {},
  };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function seedQuestions() {
  console.log('🔄 Seeding Questions...\n');

  // Get all categories and topics for mapping
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug');

  const { data: topics } = await supabase
    .from('topics')
    .select('id, name, slug, category_id');

  const { data: learningCards } = await supabase
    .from('learning_cards')
    .select('id, type');

  // Create maps for quick lookup
  const categoryMap = {};
  categories?.forEach(cat => {
    categoryMap[cat.name] = cat.id;
  });

  const topicMap = {};
  topics?.forEach(topic => {
    const key = `${topic.category_id}_${topic.name}`;
    topicMap[key] = topic.id;
  });

  const cardMap = {};
  learningCards?.forEach(card => {
    cardMap[card.type] = card.id;
  });

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalErrors = 0;

  // Auto-discover question files
  const questionFiles = discoverQuestionFiles();
  console.log(`\n🔍 Discovered ${questionFiles.length} question files:\n`);
  questionFiles.forEach(file => {
    console.log(`  📄 ${file.fileName} → ${file.categoryName}`);
  });

  for (const fileInfo of questionFiles) {
    const { categoryName, fileName, filePath } = fileInfo;

    if (!fs.existsSync(filePath)) {
      console.log(`\n  ⚠️  File not found: ${fileName}`);
      continue;
    }

    console.log(`\n📖 Processing ${categoryName} (${fileName})...`);

    try {
      let questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Handle empty files
      if (!questions || (Array.isArray(questions) && questions.length === 0)) {
        console.log(`  ⚠️  File is empty, skipping...`);
        continue;
      }

      // Ensure questions is an array
      if (!Array.isArray(questions)) {
        console.log(`  ⚠️  File does not contain an array, skipping...`);
        continue;
      }

      // Normalize questions to standard format
      console.log(`  🔄 Normalizing ${questions.length} questions...`);
      questions = questions.map((q, index) =>
        normalizeQuestion(q, index, categoryName)
      );

      const categoryId = categoryMap[categoryName];
      const learningCardId = questions[0]?.learningCardId
        ? cardMap[questions[0].learningCardId]
        : null;

      if (!categoryId) {
        console.log(`  ⚠️  Category not found: ${categoryName}`);
        continue;
      }

      let categoryCreated = 0;
      let categoryUpdated = 0;
      let categoryErrors = 0;

      // Process questions in batches
      for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        const batch = questions.slice(i, i + BATCH_SIZE);

        for (const question of batch) {
          try {
            // Find topic_id by matching topic name
            let topicId = null;
            if (question.topic) {
              const topicKey = `${categoryId}_${question.topic}`;
              topicId = topicMap[topicKey];

              // If exact match not found, try to find by category only
              if (!topicId) {
                const categoryTopics = topics?.filter(
                  t => t.category_id === categoryId
                );
                if (categoryTopics && categoryTopics.length > 0) {
                  // Use first topic as fallback
                  topicId = categoryTopics[0].id;
                }
              }
            }

            // Check if question exists by title+category (since we use UUID IDs)
            // Also check metadata for original_id if it exists
            let existing = null;

            // First try to find by metadata.original_id if it exists
            if (question.id) {
              const { data: byMetadata } = await supabase
                .from('questions')
                .select('id')
                .eq('metadata->>original_id', question.id)
                .limit(1)
                .maybeSingle();

              if (byMetadata) {
                existing = byMetadata;
              }
            }

            // If not found by metadata, try by title+category
            if (!existing) {
              const { data: byTitle } = await supabase
                .from('questions')
                .select('id')
                .eq('title', question.title)
                .eq('category_id', categoryId)
                .limit(1)
                .maybeSingle();

              if (byTitle) {
                existing = byTitle;
              }
            }

            // Prepare metadata with original ID for tracking
            const metadata = {
              ...(question.metadata || {}),
              original_id: question.id || null,
              source_file: fileName,
              category: categoryName,
            };

            const questionData = {
              title: question.title,
              content: question.content || question.title,
              type: question.type || 'multiple-choice',
              difficulty:
                question.difficulty === 'easy'
                  ? 'beginner'
                  : question.difficulty === 'medium'
                    ? 'intermediate'
                    : question.difficulty === 'hard'
                      ? 'advanced'
                      : question.difficulty || 'intermediate',
              answer: question.explanation || '',
              explanation: question.explanation || '',
              hints: question.hints || [],
              time_limit: question.timeLimit || 300,
              points: question.points || 10,
              tags: question.tags || [],
              metadata: metadata,
              options: question.options || null,
              code_template: question.codeTemplate || null,
              test_cases: question.testCases || null,
              sample_answers: question.sampleAnswers || null,
              topic_id: topicId,
              category_id: categoryId,
              learning_card_id: learningCardId,
              is_active: question.isActive !== false,
              updated_at: new Date().toISOString(),
            };

            if (existing) {
              // Update existing question
              const { error } = await supabase
                .from('questions')
                .update(questionData)
                .eq('id', existing.id);

              if (error) throw error;
              categoryUpdated++;
            } else {
              // Create new question
              const { error } = await supabase.from('questions').insert({
                ...questionData,
                created_at: new Date().toISOString(),
              });

              if (error) throw error;
              categoryCreated++;
            }
          } catch (error) {
            if (error.code !== 'PGRST116') {
              // PGRST116 = not found (expected)
              console.error(
                `    ❌ Error with question "${question.title?.substring(0, 50)}":`,
                error.message
              );
              categoryErrors++;
            }
          }
        }

        // Progress indicator
        if (
          (i + BATCH_SIZE) % (BATCH_SIZE * 5) === 0 ||
          i + BATCH_SIZE >= questions.length
        ) {
          process.stdout.write(
            `  Progress: ${Math.min(i + BATCH_SIZE, questions.length)}/${questions.length} questions processed\r`
          );
        }
      }

      console.log(
        `\n  ✅ ${categoryName}: ${categoryCreated} created, ${categoryUpdated} updated, ${categoryErrors} errors`
      );

      totalCreated += categoryCreated;
      totalUpdated += categoryUpdated;
      totalErrors += categoryErrors;
    } catch (error) {
      console.error(`  ❌ Error processing ${categoryName}:`, error.message);
      totalErrors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Created: ${totalCreated}`);
  console.log(`  Updated: ${totalUpdated}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`\n✅ Questions seeding completed!\n`);
}

// Run seeder
seedQuestions()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
