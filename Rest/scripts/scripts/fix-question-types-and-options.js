const fs = require('fs');
const path = require('path');

// Data directory
const dataDir = path.join(__dirname, '../apps/admin/network/data/json');

// Process questions from a file and find the correct type and options
function processQuestionsFromFile(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);

    if (!Array.isArray(questions)) {
      return [];
    }

    const questionMappings = [];

    for (const question of questions) {
      questionMappings.push({
        originalId: question.id,
        title: question.title,
        originalType: question.type,
        options: question.options || null,
        correct_answer: question.correct_answer || null,
      });
    }

    return questionMappings;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Find all questions across all files
function findAllQuestions() {
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
      const questions = processQuestionsFromFile(filePath);
      allQuestions.push(...questions);
    }
  }

  return allQuestions;
}

// Generate SQL UPDATE statements
function generateFixSQL(allQuestions) {
  const updates = [];

  for (const question of allQuestions) {
    let sql = `UPDATE questions SET type = '${question.originalType}'`;

    // Add options if the question is multiple-choice and has options
    if (question.originalType === 'multiple-choice' && question.options) {
      const optionsJson = JSON.stringify(question.options).replace(/'/g, "''");
      sql += `, options = '${optionsJson}'`;

      if (question.correct_answer) {
        const correctAnswer = question.correct_answer.replace(/'/g, "''");
        sql += `, correct_answer = '${correctAnswer}'`;
      }
    } else if (question.originalType === 'open-ended') {
      // For open-ended questions, ensure options is NULL
      sql += `, options = NULL, correct_answer = NULL`;
    }

    sql += ` WHERE metadata->>'original_id' = '${question.originalId}';`;
    updates.push(sql);
  }

  return updates;
}

// Main execution
console.log('Processing all questions to fix types and options...');
const allQuestions = findAllQuestions();
console.log(`Found ${allQuestions.length} total questions`);

// Count by type
const typeCounts = allQuestions.reduce((acc, q) => {
  acc[q.originalType] = (acc[q.originalType] || 0) + 1;
  return acc;
}, {});

console.log('\nQuestion types found:');
Object.entries(typeCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} questions`);
});

const fixSQL = generateFixSQL(allQuestions);

// Write to file
const outputFile = path.join(__dirname, 'fix-question-types-and-options.sql');
fs.writeFileSync(outputFile, fixSQL.join('\n\n'));

console.log(`\nGenerated ${fixSQL.length} UPDATE statements`);
console.log(`SQL file saved to: ${outputFile}`);
