const fs = require('fs');
const path = require('path');

// Data directory
const dataDir = path.join(__dirname, '../apps/admin/network/data/json');

// Process questions from a file and find questions with options
function findQuestionsWithOptions(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      return [];
    }

    const questionsWithOptions = [];

    for (const question of questions) {
      if (
        question.type === 'multiple-choice' &&
        question.options &&
        Array.isArray(question.options)
      ) {
        questionsWithOptions.push({
          originalId: question.id,
          title: question.title,
          options: question.options,
          correct_answer: question.correct_answer,
        });
      }
    }

    return questionsWithOptions;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Find all questions with options across all files
function findAllQuestionsWithOptions() {
  const allQuestions = [];

  // Get all subdirectories
  const subdirs = fs.readdirSync(dataDir).filter(item => {
    const itemPath = path.join(dataDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const subdir of subdirs) {
    const subdirPath = path.join(dataDir, subdir);
    const files = fs
      .readdirSync(subdirPath)
      .filter(file => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(subdirPath, file);
      const questions = findQuestionsWithOptions(filePath);
      allQuestions.push(...questions);
    }
  }

  return allQuestions;
}

// Generate SQL UPDATE statements
function generateUpdateSQL(questionsWithOptions) {
  const updates = [];

  for (const question of questionsWithOptions) {
    const optionsJson = JSON.stringify(question.options).replace(/'/g, "''");
    const correctAnswer = question.correct_answer
      ? question.correct_answer.replace(/'/g, "''")
      : null;

    const sql = `UPDATE questions 
SET options = '${optionsJson}'${correctAnswer ? `, correct_answer = '${correctAnswer}'` : ''}
WHERE metadata->>'original_id' = '${question.originalId}';`;

    updates.push(sql);
  }

  return updates;
}

// Main execution
console.log('Finding questions with options...');
const questionsWithOptions = findAllQuestionsWithOptions();
console.log(`Found ${questionsWithOptions.length} questions with options`);

if (questionsWithOptions.length > 0) {
  console.log('\nFirst few questions with options:');
  questionsWithOptions.slice(0, 3).forEach((q, i) => {
    console.log(`${i + 1}. ${q.title}`);
    console.log(`   Options: ${q.options.length} options`);
    console.log(`   Correct: ${q.correct_answer || 'Not specified'}`);
  });

  const updateSQL = generateUpdateSQL(questionsWithOptions);

  // Write to file
  const outputFile = path.join(__dirname, 'fix-questions-options.sql');
  fs.writeFileSync(outputFile, updateSQL.join('\n\n'));

  console.log(`\nGenerated ${updateSQL.length} UPDATE statements`);
  console.log(`SQL file saved to: ${outputFile}`);
} else {
  console.log('No questions with options found!');
}
