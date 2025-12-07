const fs = require('fs');
const path = require('path');

/**
 * Generate React Questions from Reference Markdown
 *
 * This script:
 * 1. Parses react/reference.md to extract questions
 * 2. Creates parsed-questions.json format (like javascript/parsed-questions.json)
 * 3. Converts to full format (like react-questions.json)
 */

const REFERENCE_FILE = path.join(
  __dirname,
  '../final-questions-v01/react/reference.md'
);
const PARSED_OUTPUT = path.join(
  __dirname,
  '../final-questions-v01/react/parsed-questions.json'
);
const FULL_OUTPUT = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);

// Section to topic mapping
const SECTION_TO_TOPIC = {
  'Core React': 'Core Concepts',
  'React Router': 'Routing',
  'React Internationalization': 'i18n',
  'React Testing': 'Testing',
  'React Redux': 'State Management',
  'React Native': 'React Native',
  'React supported libraries & Integration': 'Integration',
  Miscellaneous: 'Miscellaneous',
  'Old Q&A': 'Legacy',
};

/**
 * Parse markdown file and extract questions
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const questions = [];
  let currentSection = 'Core React'; // Default section
  let currentQuestion = null;
  let currentContent = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent = [];
  let skipUntilNextQuestion = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect section headers (## Section Name) - but not ### (those are questions)
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (
      sectionMatch &&
      !line.includes('Table of Contents') &&
      !line.includes('###')
    ) {
      // Save previous question if exists
      if (currentQuestion) {
        currentQuestion.explanation = currentContent.join('\n').trim();
        if (codeBlockContent.length > 0) {
          currentQuestion.code = codeBlockContent.join('\n');
        }
        questions.push(currentQuestion);
      }

      currentSection = sectionMatch[1].trim();
      currentQuestion = null;
      currentContent = [];
      codeBlockContent = [];
      skipUntilNextQuestion = false;
      continue;
    }

    // Detect question headers (number. ### Question Title)
    const questionMatch = line.match(/^\s*(\d+)\.\s+###\s+(.+)$/);
    if (questionMatch) {
      // Save previous question if exists
      if (currentQuestion) {
        currentQuestion.explanation = currentContent.join('\n').trim();
        if (codeBlockContent.length > 0) {
          currentQuestion.code = codeBlockContent.join('\n');
        }
        questions.push(currentQuestion);
      }

      const num = parseInt(questionMatch[1]);
      const title = questionMatch[2].trim();

      currentQuestion = {
        num,
        title,
        section: currentSection,
        code: null,
        options: null,
        correctAnswer: null,
        explanation: '',
      };
      currentContent = [];
      codeBlockContent = [];
      inCodeBlock = false;
      skipUntilNextQuestion = false;
      continue;
    }

    // Skip "Back to Top" links and navigation
    if (
      line.includes('[⬆ Back to Top]') ||
      line.includes('**[⬆ Back to Top]**') ||
      line.includes('Table of Contents') ||
      line.trim() === '---' ||
      line.match(/^\|.*\|$/)
    ) {
      // Skip markdown tables
      continue;
    }

    // Skip HTML/div blocks
    if (
      line.trim().startsWith('<div') ||
      line.trim().startsWith('</div>') ||
      line.trim().startsWith('<p align') ||
      line.trim().startsWith('<details') ||
      line.trim().startsWith('</details>') ||
      line.trim().startsWith('<summary') ||
      line.trim().startsWith('</summary>')
    ) {
      continue;
    }

    // Detect code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        if (currentQuestion && codeBlockContent.length > 0) {
          currentQuestion.code = codeBlockContent.join('\n');
        }
        codeBlockContent = [];
        inCodeBlock = false;
        codeBlockLanguage = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        codeBlockLanguage = line.trim().replace(/```/g, '').trim();
        codeBlockContent = [];
      }
      continue;
    }

    // Collect content
    if (currentQuestion) {
      if (inCodeBlock) {
        codeBlockContent.push(line);
      } else {
        // Skip very short lines that are likely formatting
        const trimmed = line.trim();
        if (trimmed && trimmed.length > 2) {
          currentContent.push(line);
        } else if (currentContent.length > 0) {
          // Keep empty lines if we already have content (for formatting)
          currentContent.push(line);
        }
      }
    }
  }

  // Save last question
  if (currentQuestion) {
    currentQuestion.explanation = currentContent.join('\n').trim();
    if (codeBlockContent.length > 0) {
      currentQuestion.code = codeBlockContent.join('\n');
    }
    questions.push(currentQuestion);
  }

  return questions;
}

/**
 * Convert parsed question to full format
 */
function convertToFullFormat(parsedQuestion, index) {
  const section = parsedQuestion.section || 'Core React';
  const topic = SECTION_TO_TOPIC[section] || 'General';

  // Determine difficulty based on section and content
  let difficulty = 'intermediate';
  if (section === 'Core React') {
    difficulty = 'beginner';
  } else if (section === 'React Redux' || section.includes('Advanced')) {
    difficulty = 'advanced';
  }

  // Format content with code examples
  let content = parsedQuestion.explanation || parsedQuestion.title;
  if (parsedQuestion.code) {
    // Format code block as HTML
    const codeHtml = `<pre><code>${escapeHtml(parsedQuestion.code)}</code></pre>`;
    // Insert code before explanation if it exists
    if (parsedQuestion.explanation) {
      content = codeHtml + '\n\n' + parsedQuestion.explanation;
    } else {
      content = codeHtml;
    }
  }

  // Generate tags
  const tags = ['react'];
  if (topic && topic !== 'General') {
    tags.push(topic.toLowerCase().replace(/\s+/g, '-'));
  }
  tags.push(difficulty);

  // Generate unique ID
  const id = `react-${String(index + 1).padStart(3, '0')}-${parsedQuestion.num || index + 1}`;

  return {
    id,
    title: parsedQuestion.title,
    content: content || parsedQuestion.title,
    type: 'open-ended', // Most React Q&A are open-ended
    category: 'React',
    topic: topic,
    difficulty: difficulty,
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: tags,
    explanation: parsedQuestion.explanation || '',
    points: 10,
    options: null, // Open-ended questions don't have options
    hints: [],
    metadata: {
      source: 'reference.md',
      section: section,
      originalNum: parsedQuestion.num || index + 1,
    },
  };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Create first parsed question
 */
function createFirstParsedQuestion() {
  console.log('📖 Parsing React reference file...');
  const allQuestions = parseMarkdownFile(REFERENCE_FILE);

  if (allQuestions.length === 0) {
    console.error('❌ No questions found in reference file');
    process.exit(1);
  }

  console.log(`✅ Found ${allQuestions.length} questions total`);
  console.log(`📝 Creating first question...`);

  const firstQuestion = {
    num: allQuestions[0].num,
    title: allQuestions[0].title,
    section: allQuestions[0].section,
    code: allQuestions[0].code,
    options: allQuestions[0].options,
    correctAnswer: allQuestions[0].correctAnswer,
    explanation: allQuestions[0].explanation,
  };

  // Ensure directory exists
  const parsedDir = path.dirname(PARSED_OUTPUT);
  if (!fs.existsSync(parsedDir)) {
    fs.mkdirSync(parsedDir, { recursive: true });
  }

  fs.writeFileSync(
    PARSED_OUTPUT,
    JSON.stringify([firstQuestion], null, 2),
    'utf8'
  );
  console.log(`✅ Created ${PARSED_OUTPUT} with 1 question`);
  console.log(`   Question: ${firstQuestion.title}`);
}

/**
 * Append parsed questions (10 at a time)
 */
function appendParsedQuestions(count = 10) {
  console.log(`📖 Parsing React reference file...`);
  const allQuestions = parseMarkdownFile(REFERENCE_FILE);

  // Read existing parsed questions
  let existingQuestions = [];
  if (fs.existsSync(PARSED_OUTPUT)) {
    const existingContent = fs.readFileSync(PARSED_OUTPUT, 'utf8');
    existingQuestions = JSON.parse(existingContent);
  }

  const existingCount = existingQuestions.length;
  const startIndex = existingCount;
  const endIndex = Math.min(startIndex + count, allQuestions.length);

  if (startIndex >= allQuestions.length) {
    console.log(
      `✅ All questions already processed (${existingCount}/${allQuestions.length})`
    );
    return;
  }

  console.log(`📝 Appending questions ${startIndex + 1} to ${endIndex}...`);

  const questionsToAdd = allQuestions.slice(startIndex, endIndex).map(q => ({
    num: q.num,
    title: q.title,
    section: q.section,
    code: q.code,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));

  const updatedQuestions = [...existingQuestions, ...questionsToAdd];
  fs.writeFileSync(
    PARSED_OUTPUT,
    JSON.stringify(updatedQuestions, null, 2),
    'utf8'
  );

  console.log(`✅ Added ${questionsToAdd.length} questions`);
  console.log(`   Total: ${updatedQuestions.length}/${allQuestions.length}`);
  console.log(
    `   Progress: ${((updatedQuestions.length / allQuestions.length) * 100).toFixed(1)}%`
  );
}

/**
 * Convert all parsed questions to full format
 */
function convertAllToFullFormat() {
  console.log('📖 Reading parsed questions...');

  if (!fs.existsSync(PARSED_OUTPUT)) {
    console.error(`❌ Parsed questions file not found: ${PARSED_OUTPUT}`);
    console.error('   Please run --first-parsed and --append-parsed first');
    process.exit(1);
  }

  const parsedQuestions = JSON.parse(fs.readFileSync(PARSED_OUTPUT, 'utf8'));
  console.log(`✅ Found ${parsedQuestions.length} parsed questions`);

  console.log('🔄 Converting to full format...');
  const fullQuestions = parsedQuestions.map((q, index) =>
    convertToFullFormat(q, index)
  );

  fs.writeFileSync(FULL_OUTPUT, JSON.stringify(fullQuestions, null, 2), 'utf8');
  console.log(
    `✅ Created ${FULL_OUTPUT} with ${fullQuestions.length} questions`
  );

  // Show summary by section
  const sectionCounts = {};
  parsedQuestions.forEach(q => {
    const section = q.section || 'Unknown';
    sectionCounts[section] = (sectionCounts[section] || 0) + 1;
  });

  console.log('\n📊 Questions by section:');
  Object.entries(sectionCounts).forEach(([section, count]) => {
    console.log(`   ${section}: ${count} questions`);
  });
}

/**
 * Append all remaining questions
 */
function appendAllRemaining() {
  console.log('📖 Parsing React reference file...');
  const allQuestions = parseMarkdownFile(REFERENCE_FILE);

  // Read existing parsed questions
  let existingQuestions = [];
  if (fs.existsSync(PARSED_OUTPUT)) {
    const existingContent = fs.readFileSync(PARSED_OUTPUT, 'utf8');
    existingQuestions = JSON.parse(existingContent);
  }

  const existingCount = existingQuestions.length;
  const remaining = allQuestions.length - existingCount;

  if (remaining <= 0) {
    console.log(
      `✅ All questions already processed (${existingCount}/${allQuestions.length})`
    );
    return;
  }

  console.log(`📝 Appending all remaining ${remaining} questions...`);

  // Append in batches of 10 for progress tracking
  const BATCH_SIZE = 10;
  let processed = 0;

  while (existingQuestions.length < allQuestions.length) {
    const batchSize = Math.min(
      BATCH_SIZE,
      allQuestions.length - existingQuestions.length
    );
    const startIndex = existingQuestions.length;
    const endIndex = startIndex + batchSize;

    const questionsToAdd = allQuestions.slice(startIndex, endIndex).map(q => ({
      num: q.num,
      title: q.title,
      section: q.section,
      code: q.code,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));

    existingQuestions = [...existingQuestions, ...questionsToAdd];
    processed += batchSize;

    console.log(
      `   Processed ${processed}/${remaining} (${((processed / remaining) * 100).toFixed(1)}%)`
    );
  }

  fs.writeFileSync(
    PARSED_OUTPUT,
    JSON.stringify(existingQuestions, null, 2),
    'utf8'
  );
  console.log(`✅ Added all ${remaining} remaining questions`);
  console.log(`   Total: ${existingQuestions.length}/${allQuestions.length}`);
}

// Main CLI
const args = process.argv.slice(2);
const command = args[0];

if (command === '--first-parsed') {
  createFirstParsedQuestion();
} else if (command === '--append-parsed') {
  if (args[1] === 'all') {
    appendAllRemaining();
  } else {
    const count = parseInt(args[1]) || 10;
    appendParsedQuestions(count);
  }
} else if (command === '--convert-to-full') {
  convertAllToFullFormat();
} else {
  console.log('Usage:');
  console.log('  node generate-react-questions.js --first-parsed');
  console.log('  node generate-react-questions.js --append-parsed [count|all]');
  console.log('  node generate-react-questions.js --convert-to-full');
  process.exit(1);
}
