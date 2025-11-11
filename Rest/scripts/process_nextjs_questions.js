const fs = require('fs');
const path = require('path');

/**
 * Process Next.js questions from JSON files
 * Converts open-ended to multiple-choice and creates batch scripts (3 questions per batch)
 */

const nextjsDir = path.join(__dirname, '../../apps/admin/network/data/json/nextjs');
const batchesDir = path.join(__dirname, 'nextjs-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Topic mapping - consolidate similar topics
const topicMapping = {
  'Next.js Basics': 'Basics',
  'App Router vs Pages Router': 'Routing',
  'App Router': 'Routing',
  'Pages Router': 'Routing',
  'Loading States': 'Data Fetching',
  'Server Components': 'Server Components',
  'Client Components': 'Client Components',
  'Data Fetching': 'Data Fetching',
  'API Routes': 'API Routes',
  'Middleware': 'Middleware',
  'Static Generation': 'Rendering',
  'Server-Side Rendering': 'Rendering',
  'Static Site Generation': 'Rendering',
  'Image Optimization': 'Optimization',
  'Performance': 'Optimization',
  'Deployment': 'Deployment',
  'Configuration': 'Configuration'
};

function formatCode(content) {
  if (!content) return '';
  
  // Handle code blocks (```language ... ```)
  content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    code = code.trim();
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code>${code}</code></pre>`;
  });

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
  const correctAnswer = sampleAnswers[0] || explanation.split('.')[0] || 'See explanation above';
  
  const wrongAnswers = [
    'This is not correct. Please refer to the explanation.',
    'Incorrect. Review Next.js documentation and concepts.',
    'This is a common misconception. The correct answer is different.',
    'Not quite. Consider Next.js best practices and architecture.'
  ];
  
  let options = [];
  if (question.options && question.options.length > 0) {
    options = question.options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: typeof opt === 'string' ? opt : (opt.text || ''),
      isCorrect: typeof opt === 'object' ? (opt.isCorrect !== undefined ? opt.isCorrect : idx === 0) : idx === 0,
      explanation: typeof opt === 'object' ? (opt.explanation || '') : ''
    }));
  } else {
    options = [
      {
        id: 'o1',
        text: correctAnswer,
        isCorrect: true,
        explanation: explanation
      },
      ...wrongAnswers.map((text, idx) => ({
        id: `o${idx + 2}`,
        text: text,
        isCorrect: false,
        explanation: ''
      }))
    ];
  }
  
  return {
    ...question,
    type: 'multiple-choice',
    options: options
  };
}

// Process all questions and group by topic
const files = fs.readdirSync(nextjsDir).filter(f => f.endsWith('.json')).sort();
const questionsByTopic = {};

console.log(`📁 Found ${files.length} Next.js files\n`);

files.forEach(file => {
  const filePath = path.join(nextjsDir, file);
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log(`  Processing ${file}: ${questions.length} questions`);
  
  questions.forEach(q => {
    // Upgrade beginner to intermediate for senior developers
    if (q.difficulty === 'beginner') {
      q.difficulty = 'intermediate';
    }
    
    // Map topic
    const originalTopic = q.topic || 'Basics';
    const topic = topicMapping[originalTopic] || originalTopic;
    
    q.content = formatCode(q.content || '');
    q.explanation = formatCode(q.explanation || '');
    
    if (q.type === 'open-ended') {
      q = convertOpenEndedToMultipleChoice(q);
    }
    
    q.category = 'Next.js';
    q.topic = topic;
    q.learningCardId = q.learningCardId || 'framework-questions';
    q.isActive = true;
    q.createdAt = q.createdAt || new Date().toISOString();
    q.updatedAt = new Date().toISOString();
    q.createdBy = 'admin';
    q.updatedBy = 'admin';
    q.points = q.points || 15;
    q.hints = q.hints || [
      'Review Next.js documentation',
      'Consider Next.js best practices',
      'Think about server vs client components'
    ];
    
    q.tags = q.tags || [];
    if (!q.tags.includes('nextjs')) {
      q.tags.unshift('nextjs');
    }
    if (!q.tags.includes('intermediate') && !q.tags.includes('difficult') && !q.tags.includes('advanced')) {
      q.tags.push(q.difficulty);
    }
    
    if (!questionsByTopic[topic]) {
      questionsByTopic[topic] = [];
    }
    questionsByTopic[topic].push(q);
  });
});

console.log(`\n📊 Total questions processed: ${Object.values(questionsByTopic).reduce((sum, qs) => sum + qs.length, 0)}`);
console.log('\n📋 Questions by topic:');
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  console.log(`  ${topic}: ${questions.length} questions`);
});

// Create batch scripts (3 questions per batch)
let batchNum = 1;
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  for (let i = 0; i < questions.length; i += 3) {
    const batch = questions.slice(i, i + 3);
    const batchFileName = path.join(batchesDir, `add_nextjs_${topic.toLowerCase().replace(/\s+/g, '_')}_batch${Math.floor(i / 3) + 1}.js`);
    
    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

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

