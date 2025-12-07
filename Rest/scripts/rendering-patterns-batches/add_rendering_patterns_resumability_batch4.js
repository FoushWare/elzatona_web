const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering9-10',
    title: 'Monitoring Rendering in CI/CD',
    content: 'How can rendering performance be monitored in CI/CD pipelines?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'advanced'],
    explanation:
      'Integrate Lighthouse CI or WebPageTest in the pipeline to measure metrics like LCP and CLS on each deployment.',
    points: 10,
    sampleAnswers: [
      'Integrate Lighthouse CI or WebPageTest in the pipeline to measure metrics like LCP and CLS on each deployment.',
      'Set performance budgets that fail builds when metrics exceed thresholds.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Integrate Lighthouse CI or WebPageTest in the pipeline to measure metrics like LCP and CLS on each deployment.',
        isCorrect: true,
        explanation:
          'Integrate Lighthouse CI or WebPageTest in the pipeline to measure metrics like LCP and CLS on each deployment.',
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
  `✅ Added ${newQuestions.length} questions for Resumability (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
