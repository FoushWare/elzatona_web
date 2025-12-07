const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-islandarcheticure-10',
    title: 'Implementation Example',
    content:
      "In an Astro project, how could you create a 'Like' button as an island on a static blog page?",
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Islands Architecture',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.536Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'islands-architecture', 'advanced'],
    explanation:
      'By creating a separate React component for the Like button and importing it using Astro’s client directive like <code>client:load</code> or <code>client:idle</code>.',
    points: 10,
    sampleAnswers: [
      'By creating a separate React component for the Like button and importing it using Astro’s client directive like `client:load` or `client:idle`.',
      'This ensures the rest of the page remains static while only the Like button’s script is loaded and hydrated on demand.',
    ],
    options: [
      {
        id: 'o1',
        text: 'By creating a separate React component for the Like button and importing it using Astro’s client directive like `client:load` or `client:idle`.',
        isCorrect: true,
        explanation:
          'By creating a separate React component for the Like button and importing it using Astro’s client directive like <code>client:load</code> or <code>client:idle</code>.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review rendering pattern concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Not quite. Consider rendering strategy best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
];

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(
  `✅ Added ${newQuestions.length} questions for Islands Architecture (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
