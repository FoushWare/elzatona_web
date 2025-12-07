const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering4-10',
    title: 'Limitations of Islands Architecture',
    content: 'What is a limitation of the Islands Architecture approach?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Client-Side Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'client-side-rendering', 'advanced'],
    explanation:
      'It’s difficult to scale for highly interactive apps like social media feeds',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'It’s difficult to scale for highly interactive apps like social media feeds',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'It cannot be used with React',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'It requires a full backend rewrite',
        isCorrect: false,
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
  `✅ Added ${newQuestions.length} questions for Client-Side Rendering (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
