const fs = require('fs');
const path = require('path');

/**
 * Process rendering pattern questions from JSON files
 * Converts open-ended to multiple-choice and creates batch scripts (3 questions per batch)
 */

const renderingPatternsDir = path.join(
  __dirname,
  '../../apps/admin/network/data/json/rendering-patterns'
);
const batchesDir = path.join(__dirname, 'rendering-patterns-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Topic mapping - consolidate similar topics
const topicMapping = {
  'Static Rendering': 'Static Rendering',
  'Server-Side Rendering': 'Server-Side Rendering',
  SSR: 'Server-Side Rendering',
  'Client-Side Rendering': 'Client-Side Rendering',
  CSR: 'Client-Side Rendering',
  'Islands Architecture': 'Islands Architecture',
  'Incremental Static Regeneration': 'Incremental Static Regeneration',
  ISR: 'Incremental Static Regeneration',
  'Streaming SSR': 'Streaming SSR',
  'Progressive Hydration': 'Progressive Hydration',
  'React Server Components': 'React Server Components',
  RSC: 'React Server Components',
};

function formatCode(content) {
  if (!content) return '';

  // Handle code blocks (```language ... ```)
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code.trim();
      code = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );

  // Handle inline code (`code`)
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) {
      return match;
    }
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  return content;
}

function convertOpenEndedToMultipleChoice(question) {
  const explanation = question.explanation || '';
  const sampleAnswers = question.sampleAnswers || [];
  const correctAnswer =
    sampleAnswers[0] || explanation.split('.')[0] || 'See explanation above';

  const wrongAnswers = [
    'This is not correct. Please refer to the explanation.',
    'Incorrect. Review rendering pattern concepts.',
    'This is a common misconception. The correct answer is different.',
    'Not quite. Consider rendering strategy best practices.',
  ];

  let options = [];
  if (question.options && question.options.length > 0) {
    options = question.options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: typeof opt === 'string' ? opt : opt.text || '',
      isCorrect:
        typeof opt === 'object'
          ? opt.isCorrect !== undefined
            ? opt.isCorrect
            : idx === 0
          : idx === 0,
      explanation: typeof opt === 'object' ? opt.explanation || '' : '',
    }));
  } else {
    options = [
      {
        id: 'o1',
        text: correctAnswer,
        isCorrect: true,
        explanation: explanation,
      },
      ...wrongAnswers.map((text, idx) => ({
        id: `o${idx + 2}`,
        text: text,
        isCorrect: false,
        explanation: '',
      })),
    ];
  }

  return {
    ...question,
    type: 'multiple-choice',
    options: options,
  };
}

// Process all questions and group by topic
const files = fs
  .readdirSync(renderingPatternsDir)
  .filter(f => f.endsWith('.json'))
  .sort();
const questionsByTopic = {};

console.log(`📁 Found ${files.length} rendering pattern files\n`);

files.forEach(file => {
  const filePath = path.join(renderingPatternsDir, file);
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`  Processing ${file}: ${questions.length} questions`);

  questions.forEach(q => {
    // Upgrade beginner to intermediate for senior developers
    if (q.difficulty === 'beginner') {
      q.difficulty = 'intermediate';
    }

    // Map topic
    const originalTopic = q.topic || 'Rendering Patterns';
    const topic = topicMapping[originalTopic] || originalTopic;

    q.content = formatCode(q.content || '');
    q.explanation = formatCode(q.explanation || '');

    // Convert question types
    if (q.type === 'open-ended') {
      q = convertOpenEndedToMultipleChoice(q);
    }

    q.category = 'Rendering Patterns';
    q.topic = topic;
    q.learningCardId = q.learningCardId || 'system-design';
    q.isActive = true;
    q.createdAt = q.createdAt || new Date().toISOString();
    q.updatedAt = new Date().toISOString();
    q.createdBy = 'admin';
    q.updatedBy = 'admin';
    q.points = q.points || 15;
    q.hints = q.hints || [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ];

    q.tags = q.tags || [];
    if (!q.tags.includes('rendering-patterns')) {
      q.tags.unshift('rendering-patterns');
    }
    if (
      !q.tags.includes('intermediate') &&
      !q.tags.includes('difficult') &&
      !q.tags.includes('advanced')
    ) {
      q.tags.push(q.difficulty);
    }

    if (!questionsByTopic[topic]) {
      questionsByTopic[topic] = [];
    }
    questionsByTopic[topic].push(q);
  });
});

console.log(
  `\n📊 Total questions processed: ${Object.values(questionsByTopic).reduce((sum, qs) => sum + qs.length, 0)}`
);
console.log('\n📋 Questions by topic:');
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  console.log(`  ${topic}: ${questions.length} questions`);
});

// Create batch scripts (3 questions per batch)
let batchNum = 1;
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  for (let i = 0; i < questions.length; i += 3) {
    const batch = questions.slice(i, i + 3);
    const batchFileName = path.join(
      batchesDir,
      `add_rendering_patterns_${topic
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')}_batch${Math.floor(i / 3) + 1}.js`
    );

    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = ${JSON.stringify(batch, null, 2)};

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(\`✅ Added \${newQuestions.length} questions for ${topic} (Batch ${Math.floor(i / 3) + 1})\`);
console.log(\`📝 Total questions: \${existingQuestions.length}\`);
`;

    fs.writeFileSync(batchFileName, scriptContent);
    batchNum++;
  }
});

console.log(`\n✅ Created ${batchNum - 1} batch scripts in ${batchesDir}`);
console.log('\n📋 Batch breakdown by topic:');
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  const batches = Math.ceil(questions.length / 3);
  console.log(`  ${topic}: ${questions.length} questions → ${batches} batches`);
});
