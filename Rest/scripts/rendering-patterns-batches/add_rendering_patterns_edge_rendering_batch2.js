const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render6-4',
    title: 'Progressive Hydration Concept',
    content: 'What is Progressive Hydration in React or similar frameworks?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'intermediate'],
    explanation:
      'It hydrates parts of the UI gradually as JavaScript loads or user interacts',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'It hydrates parts of the UI gradually as JavaScript loads or user interacts',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'It waits until all components are fully loaded before rendering anything',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'It disables interactivity completely',
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
    id: 'rendering-patterns-render6-5',
    title: 'Why Progressive Hydration Matters',
    content:
      'Why is Progressive Hydration beneficial for large, complex pages?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'intermediate'],
    explanation:
      'It reduces the blocking time by enabling interaction in critical parts of the page before the entire app hydrates.',
    points: 10,
    sampleAnswers: [
      'It reduces the blocking time by enabling interaction in critical parts of the page before the entire app hydrates.',
      'Improves perceived performance by prioritizing above-the-fold components.',
    ],
    options: [
      {
        id: 'o1',
        text: 'It reduces the blocking time by enabling interaction in critical parts of the page before the entire app hydrates.',
        isCorrect: true,
        explanation:
          'It reduces the blocking time by enabling interaction in critical parts of the page before the entire app hydrates.',
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
    id: 'rendering-patterns-render6-6',
    title: 'Resumability Explained',
    content: 'What is Resumability in frameworks like Qwik?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'advanced'],
    explanation:
      'Resumability allows the browser to resume application execution without rehydrating all components.',
    points: 10,
    sampleAnswers: [
      'Resumability allows the browser to resume application execution without rehydrating all components.',
      'Instead of downloading and re-running the full JS, it resumes from pre-serialized state.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Resumability allows the browser to resume application execution without rehydrating all components.',
        isCorrect: true,
        explanation:
          'Resumability allows the browser to resume application execution without rehydrating all components.',
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
  `✅ Added ${newQuestions.length} questions for Edge Rendering (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
