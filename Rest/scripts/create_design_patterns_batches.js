const fs = require('fs');
const path = require('path');

/**
 * Create batch scripts to add design pattern questions in batches of 3 per topic
 */

const designPatternsDir = path.join(__dirname, '../../apps/admin/network/data/json/design-patterns');
const batchesDir = path.join(__dirname, 'design-patterns-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Topic mapping
const topicMapping = {
  'General Design Patterns': 'Core Patterns',
  'Common Pattern': 'Core Patterns',
  'Factory Pattern': 'Creational Patterns',
  'Singleton Pattern': 'Creational Patterns',
  'Prototype Pattern': 'Creational Patterns',
  'Observer Pattern': 'Behavioral Patterns',
  'Mediator Pattern': 'Behavioral Patterns',
  'Module Pattern': 'Structural Patterns',
  'Proxy Pattern': 'Structural Patterns',
  'Mixin Pattern': 'Structural Patterns',
  'Flyweight Pattern': 'Structural Patterns',
  'Provider Pattern': 'React Patterns',
  'Static Import': 'Performance Patterns'
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
    'Incorrect. Review the design pattern concepts.',
    'This is a common misconception. The correct answer is different.'
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
const files = fs.readdirSync(designPatternsDir).filter(f => f.endsWith('.json'));
const questionsByTopic = {};

files.forEach(file => {
  const filePath = path.join(designPatternsDir, file);
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const patternName = file
    .replace('.json', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  questions.forEach(q => {
    if (q.difficulty === 'beginner') {
      q.difficulty = 'intermediate';
    }
    
    let originalTopic = q.topic || patternName;
    if (originalTopic === 'General Design Patterns') {
      originalTopic = patternName;
    }
    const topic = topicMapping[originalTopic] || originalTopic;
    
    q.content = formatCode(q.content || '');
    q.explanation = formatCode(q.explanation || '');
    
    if (q.type === 'open-ended') {
      q = convertOpenEndedToMultipleChoice(q);
    }
    
    q.category = 'Design Patterns';
    q.topic = topic;
    q.learningCardId = q.learningCardId || 'system-design';
    q.isActive = true;
    q.createdAt = q.createdAt || new Date().toISOString();
    q.updatedAt = new Date().toISOString();
    q.createdBy = 'admin';
    q.updatedBy = 'admin';
    q.points = q.points || 15;
    q.hints = q.hints || [
      'Review design pattern documentation',
      'Consider the pattern\'s purpose and use cases',
      'Think about when to apply this pattern'
    ];
    
    q.tags = q.tags || [];
    if (!q.tags.includes('design-patterns')) {
      q.tags.unshift('design-patterns');
    }
    if (!q.tags.includes('intermediate') && !q.tags.includes('difficult')) {
      q.tags.push(q.difficulty);
    }
    
    if (!questionsByTopic[topic]) {
      questionsByTopic[topic] = [];
    }
    questionsByTopic[topic].push(q);
  });
});

// Create batch scripts (3 questions per batch)
let batchNum = 1;
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  for (let i = 0; i < questions.length; i += 3) {
    const batch = questions.slice(i, i + 3);
    const batchFileName = path.join(batchesDir, `add_design_patterns_${topic.toLowerCase().replace(/\s+/g, '_')}_batch${Math.floor(i / 3) + 1}.js`);
    
    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

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

console.log(`✅ Created ${batchNum - 1} batch scripts in ${batchesDir}`);
console.log('\n📋 Batch breakdown by topic:');
Object.entries(questionsByTopic).forEach(([topic, questions]) => {
  const batches = Math.ceil(questions.length / 3);
  console.log(`  ${topic}: ${questions.length} questions → ${batches} batches`);
});


