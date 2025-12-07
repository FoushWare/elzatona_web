const fs = require('fs');
const path = require('path');

/**
 * Adds all JavaScript questions from parsed-questions.json in batches
 * Processes 3 questions at a time to avoid timeouts
 */

const parsedFile = path.join(
  __dirname,
  '../final-questions-v01/javascript/parsed-questions.json'
);
const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/javascript-questions.json'
);
const parsedQuestions = JSON.parse(fs.readFileSync(parsedFile, 'utf8'));
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Simple code formatting - just remove markdown code blocks
function formatCode(text) {
  if (!text) return text;
  return text
    .replace(/```javascript\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
}

// Determine topic
function determineTopic(question) {
  const code = question.code.toLowerCase();
  if (
    code.includes('class') ||
    code.includes('extends') ||
    code.includes('super')
  )
    return 'Classes';
  if (
    code.includes('promise') ||
    code.includes('async') ||
    code.includes('await')
  )
    return 'Async/Await';
  if (code.includes('set') || code.includes('map') || code.includes('weak'))
    return 'Data Structures';
  if (
    code.includes('event') ||
    code.includes('addEventListener') ||
    code.includes('target')
  )
    return 'Events';
  if (code.includes('prototype') || code.includes('__proto__'))
    return 'Prototypes';
  if (
    code.includes('this') ||
    code.includes('bind') ||
    code.includes('call') ||
    code.includes('apply')
  )
    return 'This Binding';
  if (
    code.includes('destructur') ||
    code.includes('spread') ||
    code.includes('...')
  )
    return 'ES6+ Features';
  if (code.includes('generator') || code.includes('yield')) return 'Generators';
  if (
    code.includes('module') ||
    code.includes('import') ||
    code.includes('export')
  )
    return 'Modules';
  if (code.includes('proxy') || code.includes('reflect')) return 'Advanced';
  return 'Basics';
}

// Determine difficulty
function determineDifficulty(question) {
  const code = question.code.toLowerCase();
  if (
    code.includes('proxy') ||
    code.includes('symbol') ||
    code.includes('generator') ||
    code.includes('async generator')
  )
    return 'difficult';
  if (
    code.includes('class') ||
    code.includes('promise') ||
    code.includes('prototype') ||
    code.includes('this')
  )
    return 'intermediate';
  return 'intermediate';
}

console.log(
  `📝 Processing ${parsedQuestions.length} JavaScript questions in batches of 3...\n`
);

let questionCounter = existingQuestions.length + 1;
const batchSize = 3;
let totalAdded = 0;

for (let i = 0; i < parsedQuestions.length; i += batchSize) {
  const batch = parsedQuestions.slice(i, i + batchSize);
  const batchNum = Math.floor(i / batchSize) + 1;

  const newQuestions = batch.map(parsedQ => {
    const questionId = `js-0${Math.ceil((i + 1) / 3)}-js${String(questionCounter++).padStart(2, '0')}`;
    const topic = determineTopic(parsedQ);
    const difficulty = determineDifficulty(parsedQ);

    // Build options array
    const options = [];
    const optionKeys = ['A', 'B', 'C', 'D'];
    optionKeys.forEach((key, idx) => {
      if (parsedQ.options[key]) {
        options.push({
          id: `o${idx + 1}`,
          text: formatCode(parsedQ.options[key]),
          isCorrect: key === parsedQ.correctAnswer,
          explanation:
            key === parsedQ.correctAnswer ? 'Correct.' : 'Incorrect.',
        });
      }
    });

    return {
      id: questionId,
      title: formatCode(parsedQ.title),
      content: formatCode(parsedQ.code),
      type: 'multiple-choice',
      category: 'JavaScript',
      topic: topic,
      difficulty: difficulty,
      learningCardId: 'core-technologies',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      tags: [
        'javascript',
        topic.toLowerCase().replace(/\s+/g, '-'),
        difficulty,
      ],
      explanation: formatCode(parsedQ.explanation),
      points: difficulty === 'difficult' ? 20 : 15,
      options: options,
      hints: [
        'Consider JavaScript execution context and behavior',
        'Think about scope, hoisting, and closures',
        'Remember ES6+ features and their differences from ES5',
      ],
      metadata: {},
    };
  });

  existingQuestions.push(...newQuestions);
  totalAdded += newQuestions.length;

  // Save after each batch
  fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

  console.log(
    `✅ Batch ${batchNum}: Added ${newQuestions.length} questions (${i + 1}-${Math.min(i + batchSize, parsedQuestions.length)})`
  );
}

console.log(`\n✅ Complete! Added ${totalAdded} JavaScript questions`);
console.log(`📊 Total questions in file: ${existingQuestions.length}`);
