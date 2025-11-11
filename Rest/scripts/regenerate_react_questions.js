const fs = require('fs');
const path = require('path');

/**
 * Regenerate React questions file from reference.md and add frontend task questions
 * This fixes the corrupted file by recreating it from scratch
 */

const referenceFile = path.join(__dirname, '../final-questions-v01/react/reference.md');
const outputFile = path.join(__dirname, '../final-questions-v01/react-questions.json');
const frontendTaskQuestionsFile = path.join(__dirname, 'frontend-task-questions-extracted.json');

console.log('🔄 Regenerating React questions file...\n');

// Topic mapping
const topicMapping = {
  'Core React': 'Core React',
  'React Router': 'React Router',
  'React Internationalization': 'React Internationalization',
  'React Testing': 'React Testing',
  'React Redux': 'React Redux',
  'React Native': 'React Native',
  'React supported libraries & Integration': 'Libraries & Integration',
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

function convertToMultipleChoice(questionTitle, answer, explanation) {
  // Clean up the answer
  const cleanAnswer = answer
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/\*\*([^\*]+)\*\*/g, '$1')
    .replace(/\*([^\*]+)\*/g, '$1')
    .trim();

  // Generate plausible wrong options
  const wrongOptions = [
    'This is incorrect. Please refer to React documentation.',
    'This is not accurate. Review React best practices.',
    'This statement is false. Consult the React official documentation.'
  ];

  const options = [
    {
      id: 'o1',
      text: cleanAnswer.length > 200 ? cleanAnswer.substring(0, 200) + '...' : cleanAnswer,
      isCorrect: true,
      explanation: explanation.length > 300 ? explanation.substring(0, 300) + '...' : explanation
    },
    ...wrongOptions.map((text, idx) => ({
      id: `o${idx + 2}`,
      text: text,
      isCorrect: false,
      explanation: ''
    }))
  ];

  return options;
}

// Step 1: Parse questions from reference.md
console.log('📖 Step 1: Parsing questions from reference.md...');
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
    
    // Get explanation (full content, truncated if too long)
    const explanation = questionContent.length > 500 
      ? questionContent.substring(0, 500) + '...'
      : questionContent;
    
    // Convert to multiple choice
    const options = convertToMultipleChoice(questionTitle, answer, explanation);
    
    questionNum++;
    
    questions.push({
      id: `react-ref-${questionNum}`,
      title: questionTitle,
      content: formatCode(questionContent.substring(0, 1000)), // Limit content length
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

console.log(`✅ Parsed ${questions.length} questions from reference.md\n`);

// Step 2: Load frontend task questions
console.log('📝 Step 2: Loading frontend task questions...');
let frontendTaskQuestions = [];
if (fs.existsSync(frontendTaskQuestionsFile)) {
  frontendTaskQuestions = JSON.parse(fs.readFileSync(frontendTaskQuestionsFile, 'utf8'));
  console.log(`✅ Loaded ${frontendTaskQuestions.length} frontend task questions\n`);
} else {
  console.log('⚠️  Frontend task questions file not found, skipping...\n');
}

// Step 3: Combine all questions
console.log('🔗 Step 3: Combining all questions...');
const allQuestions = [...questions, ...frontendTaskQuestions];
console.log(`✅ Total questions: ${allQuestions.length} (${questions.length} from reference.md + ${frontendTaskQuestions.length} frontend task)\n`);

// Step 4: Verify uniqueness and deduplicate
console.log('🔍 Step 4: Verifying uniqueness...');
const ids = new Set(allQuestions.map(q => q.id));
if (ids.size !== allQuestions.length) {
  console.log(`⚠️  Warning: Found ${allQuestions.length - ids.size} duplicate IDs`);
  // Remove duplicates, keeping first occurrence
  const uniqueMap = new Map();
  allQuestions.forEach(q => {
    if (!uniqueMap.has(q.id)) {
      uniqueMap.set(q.id, q);
    }
  });
  const uniqueQuestions = Array.from(uniqueMap.values());
  console.log(`✅ Deduplicated: ${uniqueQuestions.length} unique questions\n`);
  
  // Sort questions: react-ref-* first, then react-ft-*
  uniqueQuestions.sort((a, b) => {
    if (a.id.startsWith('react-ref-') && b.id.startsWith('react-ft-')) return -1;
    if (a.id.startsWith('react-ft-') && b.id.startsWith('react-ref-')) return 1;
    const aNum = parseInt(a.id.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b.id.match(/\d+/)?.[0] || 0);
    return aNum - bNum;
  });
  
  // Write unique questions (completely overwrite file)
  fs.writeFileSync(outputFile, JSON.stringify(uniqueQuestions, null, 2));
  console.log(`✅ Saved ${uniqueQuestions.length} questions to ${outputFile}\n`);
  
  // Update allQuestions for summary
  allQuestions.length = 0;
  allQuestions.push(...uniqueQuestions);
} else {
  // Sort questions before writing
  allQuestions.sort((a, b) => {
    if (a.id.startsWith('react-ref-') && b.id.startsWith('react-ft-')) return -1;
    if (a.id.startsWith('react-ft-') && b.id.startsWith('react-ref-')) return 1;
    const aNum = parseInt(a.id.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b.id.match(/\d+/)?.[0] || 0);
    return aNum - bNum;
  });
  
  // Write all questions (completely overwrite file)
  fs.writeFileSync(outputFile, JSON.stringify(allQuestions, null, 2));
  console.log(`✅ Saved ${allQuestions.length} questions to ${outputFile}\n`);
}

// Step 5: Summary
console.log('📊 Summary:');
const topics = {};
allQuestions.forEach(q => {
  topics[q.topic] = (topics[q.topic] || 0) + 1;
});
Object.entries(topics).sort().forEach(([topic, count]) => {
  console.log(`  ${topic}: ${count} questions`);
});

console.log(`\n✅ React questions file regenerated successfully!`);
console.log(`📝 Total: ${allQuestions.length} questions`);

