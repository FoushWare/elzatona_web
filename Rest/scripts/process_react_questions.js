const fs = require('fs');
const path = require('path');

/**
 * Process React questions from reference.md
 * Converts to multiple-choice format and creates batch scripts (3 questions per batch)
 */

const referenceFile = path.join(__dirname, '../final-questions-v01/react/reference.md');
const batchesDir = path.join(__dirname, 'react-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Topic mapping based on sections in the reference file
const topicMapping = {
  'Core React': 'Core React',
  'React Router': 'React Router',
  'React Internationalization': 'React Internationalization',
  'React Testing': 'React Testing',
  'React Redux': 'React Redux',
  'React Native': 'React Native',
  'Libraries & Integration': 'Libraries & Integration',
  'Miscellaneous': 'Miscellaneous'
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

function convertToMultipleChoice(question, answer, explanation) {
  // Clean up the answer - remove markdown links, bold, etc.
  const cleanAnswer = answer
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
    .replace(/<details>[\s\S]*?<\/details>/g, '') // Remove details sections
    .replace(/\[⬆ Back to Top\]\([^\)]+\)/g, '') // Remove back to top links
    .trim();
  
  // Extract first paragraph or first few sentences as correct answer
  const sentences = cleanAnswer.split(/[.!?]\s+/).filter(s => s.length > 20);
  const correctAnswer = sentences[0] || cleanAnswer.substring(0, 200);
  
  // Generate wrong answers
  const wrongAnswers = [
    'This is incorrect. Please refer to React documentation.',
    'This is not accurate. Review React best practices.',
    'This is a common misconception. The correct answer differs.',
    'Not quite. Consider React\'s architecture and design principles.'
  ];
  
  const options = [
    {
      id: 'o1',
      text: correctAnswer.length > 150 ? correctAnswer.substring(0, 150) + '...' : correctAnswer,
      isCorrect: true,
      explanation: explanation || ''
    },
    ...wrongAnswers.map((text, idx) => ({
      id: `o${idx + 2}`,
      text: text,
      isCorrect: false,
      explanation: ''
    }))
  ];
  
  return options;
}

// Parse the markdown file
const content = fs.readFileSync(referenceFile, 'utf8');
const questions = [];

// Split by sections
const sections = content.split(/^##\s+/m).filter(s => s.trim());

let currentTopic = 'Core React';
let questionNum = 0;

sections.forEach(section => {
  // Check if this is a main section
  const sectionMatch = section.match(/^([^\n]+)/);
  if (sectionMatch) {
    const sectionTitle = sectionMatch[1].trim();
    if (topicMapping[sectionTitle]) {
      currentTopic = topicMapping[sectionTitle];
    }
  }
  
  // Extract questions (numbered items with ###)
  const questionMatches = section.matchAll(/^\d+\.\s+###\s+([^\n]+)\n\n([\s\S]*?)(?=\d+\.\s+###|##|$)/gm);
  
  for (const match of questionMatches) {
    const questionTitle = match[1].trim();
    let questionContent = match[2].trim();
    
    // Remove back to top links
    questionContent = questionContent.replace(/\[⬆ Back to Top\]\([^\)]+\)/g, '').trim();
    
    // Extract the main answer (first paragraph before details or code blocks)
    const answerMatch = questionContent.match(/^([^\n]+(?:\n(?!```|###|##|\d+\.|\[⬆)[^\n]+)*)/m);
    const answer = answerMatch ? answerMatch[1].trim() : questionContent.split('\n')[0];
    
    // Get explanation (full content)
    const explanation = questionContent.length > 500 
      ? questionContent.substring(0, 500) + '...'
      : questionContent;
    
    // Convert to multiple choice
    const options = convertToMultipleChoice(questionTitle, answer, explanation);
    
    questionNum++;
    
    questions.push({
      id: `react-ref-${questionNum}`,
      title: questionTitle,
      content: formatCode(questionTitle),
      type: 'multiple-choice',
      category: 'React',
      topic: currentTopic,
      difficulty: 'intermediate',
      learningCardId: 'framework-questions',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      tags: ['react', currentTopic.toLowerCase().replace(/\s+/g, '-'), 'intermediate'],
      explanation: formatCode(explanation),
      points: 15,
      options: options,
      hints: [
        'Review React documentation and best practices',
        'Consider React\'s component architecture and patterns',
        'Think about React\'s rendering and state management'
      ],
      metadata: {}
    });
  }
});

console.log(`\n📊 Processed ${questions.length} React questions\n`);
console.log('📋 Questions by topic:');
const topics = {};
questions.forEach(q => {
  topics[q.topic] = (topics[q.topic] || 0) + 1;
});
Object.entries(topics).sort().forEach(([topic, count]) => {
  console.log(`  ${topic}: ${count} questions`);
});

// Group questions by topic and create batches (3 questions per batch)
let batchNum = 1;
Object.entries(topics).forEach(([topic, count]) => {
  const topicQuestions = questions.filter(q => q.topic === topic);
  
  for (let i = 0; i < topicQuestions.length; i += 3) {
    const batch = topicQuestions.slice(i, i + 3);
    const batchFileName = path.join(batchesDir, `add_react_${topic.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}_batch${Math.floor(i / 3) + 1}.js`);
    
    const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

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
Object.entries(topics).forEach(([topic, count]) => {
  const batches = Math.ceil(count / 3);
  console.log(`  ${topic}: ${count} questions → ${batches} batches`);
});


