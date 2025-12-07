const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering9-1',
    title: 'Core Web Vitals Overview',
    content:
      'What are Core Web Vitals, and why are they important in rendering performance?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation:
      'Core Web Vitals are a set of metrics—Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—that measure real-world user experience.',
    points: 10,
    sampleAnswers: [
      'Core Web Vitals are a set of metrics—Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—that measure real-world user experience.',
      'They help evaluate visual stability, interactivity, and loading performance.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Core Web Vitals are a set of metrics—Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—that measure real-world user experience.',
        isCorrect: true,
        explanation:
          'Core Web Vitals are a set of metrics—Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)—that measure real-world user experience.',
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
  {
    id: 'rendering-patterns-rendering9-2',
    title: 'Largest Contentful Paint (LCP)',
    content: 'What does the Largest Contentful Paint (LCP) metric measure?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation:
      'Time until the largest visible element (image or text block) renders',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Time until the largest visible element (image or text block) renders',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Total load time of all resources',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'Delay before the first user input is processed',
        isCorrect: false,
      },
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering9-3',
    title: 'First Input Delay (FID)',
    content: 'What does the First Input Delay (FID) metric represent?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation:
      'FID measures the delay between a user’s first interaction (e.g., clicking a button) and the browser’s ability to respond to that interaction.',
    points: 10,
    sampleAnswers: [
      'FID measures the delay between a user’s first interaction (e.g., clicking a button) and the browser’s ability to respond to that interaction.',
      'It helps quantify responsiveness.',
    ],
    options: [
      {
        id: 'o1',
        text: 'FID measures the delay between a user’s first interaction (e.g., clicking a button) and the browser’s ability to respond to that interaction.',
        isCorrect: true,
        explanation:
          'FID measures the delay between a user’s first interaction (e.g., clicking a button) and the browser’s ability to respond to that interaction.',
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
  `✅ Added ${newQuestions.length} questions for Resumability (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
