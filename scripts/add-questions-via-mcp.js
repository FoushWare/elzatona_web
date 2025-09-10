#!/usr/bin/env node

/**
 * Add Questions via MCP Firebase Tools
 *
 * This script demonstrates how to add questions to Firebase
 * We'll use this to add our multiple-choice questions
 */

// Sample questions to add to Firebase
const questionsToAdd = [
  {
    id: 'css-mc-1',
    question: 'Which of the following statements about display: block is true?',
    options: [
      'It takes only the width of its content.',
      'It always starts on a new line.',
      'Width and height cannot be set.',
      'It behaves like inline elements.',
    ],
    correctAnswer: 1,
    explanation:
      'Block-level elements always start on a new line and take up the full width of their container. They can have width and height properties set, unlike inline elements.',
    category: 'CSS',
    difficulty: 'beginner',
    tags: ['css', 'display', 'block'],
    learningPath: 'advanced-css',
    type: 'multiple-choice',
    order: 1,
  },
  {
    id: 'js-mc-1',
    question:
      'What is the output of the following code?\n\n```javascript\nconsole.log(typeof null);\n```',
    options: ['null', 'undefined', 'object', 'string'],
    correctAnswer: 2,
    explanation:
      'In JavaScript, typeof null returns "object". This is a well-known quirk in JavaScript.',
    category: 'JavaScript',
    difficulty: 'intermediate',
    tags: ['javascript', 'typeof', 'null'],
    learningPath: 'javascript-deep-dive',
    type: 'multiple-choice',
    order: 1,
  },
  {
    id: 'react-mc-1',
    question:
      'What is the correct way to update state in a functional component?',
    options: [
      'this.setState({ count: 1 })',
      'setState({ count: 1 })',
      'setCount(1)',
      'state.count = 1',
    ],
    correctAnswer: 2,
    explanation:
      'In functional components, you use the setter function returned by useState hook to update state.',
    category: 'React',
    difficulty: 'beginner',
    tags: ['react', 'hooks', 'useState'],
    learningPath: 'react-mastery',
    type: 'multiple-choice',
    order: 1,
  },
];

console.log('📝 Questions to add to Firebase:');
questionsToAdd.forEach((q, index) => {
  console.log(`${index + 1}. ${q.id}: ${q.question.substring(0, 50)}...`);
  console.log(`   Learning Path: ${q.learningPath}`);
  console.log(`   Category: ${q.category}`);
  console.log(`   Type: ${q.type}`);
  console.log('');
});

console.log(
  '✅ Use the MCP Firebase tools to add these questions to Firebase!'
);
console.log('🔧 The questions are ready with proper structure:');
console.log('   - learningPath field for Firebase queries');
console.log('   - type: "multiple-choice" for proper categorization');
console.log('   - options array with correctAnswer index');
console.log('   - proper category and difficulty mapping');
