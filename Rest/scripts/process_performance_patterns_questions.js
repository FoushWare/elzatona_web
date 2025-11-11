const fs = require('fs');
const path = require('path');

/**
 * Process performance pattern questions from JSON files
 * Converts open-ended to multiple-choice and creates batch scripts (3 questions per batch)
 */

const performancePatternsDir = path.join(__dirname, '../../apps/admin/network/data/json/performance-patterns');
const batchesDir = path.join(__dirname, 'performance-patterns-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Topic mapping - consolidate similar topics
const topicMapping = {
  'PRPL Pattern': 'PRPL Pattern',
  'Tree Shaking': 'Code Optimization',
  'Tree Shaking Modules': 'Code Optimization',
  'Bundle Splitting': 'Code Splitting',
  'Dynamic Import': 'Code Splitting',
  'Import On Visibility': 'Lazy Loading',
  'Import On Interaction': 'Lazy Loading',
  'Preload': 'Resource Hints',
  'Prefetch': 'Resource Hints',
  'Loading Sequence': 'Loading Optimization',
  'Compression': 'Asset Optimization',
  'Virtualization': 'Rendering Optimization',
  'Third-Party': 'Third-Party Optimization'
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
    'Incorrect. Review performance optimization concepts.',
    'This is a common misconception. The correct answer is different.',
    'Not quite. Consider web performance best practices.'
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

function convertTrueFalseToMultipleChoice(question) {
  // Convert true-false to multiple-choice with 4 options
  let options = [];
  if (question.options && question.options.length > 0) {
    const trueOption = question.options.find(opt => opt.text === 'True' || opt.isCorrect);
    const falseOption = question.options.find(opt => opt.text === 'False' || !opt.isCorrect);
    
    options = [
      {
        id: 'o1',
        text: 'True',
        isCorrect: trueOption ? trueOption.isCorrect : false,
        explanation: trueOption ? (trueOption.explanation || '') : ''
      },
      {
        id: 'o2',
        text: 'False',
        isCorrect: falseOption ? falseOption.isCorrect : false,
        explanation: falseOption ? (falseOption.explanation || '') : ''
      },
      {
        id: 'o3',
        text: 'Partially true - depends on the context',
        isCorrect: false,
        explanation: ''
      },
      {
        id: 'o4',
        text: 'Not applicable',
        isCorrect: false,
        explanation: ''
      }
    ];
  }
  
  return {
    ...question,
    type: 'multiple-choice',
    options: options
  };
}

// Process all questions and group by topic
const files = fs.readdirSync(performancePatternsDir).filter(f => f.endsWith('.json')).sort();
const questionsByTopic = {};

console.log(`📁 Found ${files.length} performance pattern files\n`);

files.forEach(file => {
  const filePath = path.join(performancePatternsDir, file);
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log(`  Processing ${file}: ${questions.length} questions`);
  
  questions.forEach(q => {
    // Upgrade beginner to intermediate for senior developers
    if (q.difficulty === 'beginner') {
      q.difficulty = 'intermediate';
    }
    
    // Map topic
    const originalTopic = q.topic || 'Performance Optimization';
    const topic = topicMapping[originalTopic] || originalTopic;
    
    q.content = formatCode(q.content || '');
    q.explanation = formatCode(q.explanation || '');
    
    // Convert question types
    if (q.type === 'open-ended') {
      q = convertOpenEndedToMultipleChoice(q);
    } else if (q.type === 'true-false') {
      q = convertTrueFalseToMultipleChoice(q);
    }
    
    q.category = 'Performance Patterns';
    q.topic = topic;
    q.learningCardId = q.learningCardId || 'system-design';
    q.isActive = true;
    q.createdAt = q.createdAt || new Date().toISOString();
    q.updatedAt = new Date().toISOString();
    q.createdBy = 'admin';
    q.updatedBy = 'admin';
    q.points = q.points || 15;
    q.hints = q.hints || [
      'Review web performance best practices',
      'Consider loading and rendering optimization',
      'Think about bundle size and network efficiency'
    ];
    
    q.tags = q.tags || [];
    if (!q.tags.includes('performance-patterns')) {
      q.tags.unshift('performance-patterns');
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
    const batchFileName = path.join(batchesDir, `add_performance_patterns_${topic.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}_batch${Math.floor(i / 3) + 1}.js`);
    
    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

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


