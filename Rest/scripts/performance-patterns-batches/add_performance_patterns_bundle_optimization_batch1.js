const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-dynamic-import-14',
    title:
      'How much was the bundle size reduced by using dynamic import for EmojiPicker?',
    content:
      'By dynamically importing EmojiPicker, the initial bundle size was reduced from 1.5 MiB to 1.33 MiB.',
    type: 'mcq',
    category: 'Performance Patterns',
    topic: 'Bundle Optimization',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.188Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'bundle-optimization', null, 'intermediate'],
    explanation:
      'The example reduced the main bundle from 1.5 MiB to 1.33 MiB by deferring the loading of EmojiPicker.',
    points: 10,
    options: [
      {
        0: 'F',
        1: 'r',
        2: 'o',
        3: 'm',
        4: ' ',
        5: '1',
        6: '.',
        7: '5',
        8: ' ',
        9: 'M',
        10: 'i',
        11: 'B',
        12: ' ',
        13: 't',
        14: 'o',
        15: ' ',
        16: '1',
        17: '.',
        18: '2',
        19: ' ',
        20: 'M',
        21: 'i',
        22: 'B',
        explanation: '',
      },
      {
        0: 'F',
        1: 'r',
        2: 'o',
        3: 'm',
        4: ' ',
        5: '1',
        6: '.',
        7: '5',
        8: ' ',
        9: 'M',
        10: 'i',
        11: 'B',
        12: ' ',
        13: 't',
        14: 'o',
        15: ' ',
        16: '1',
        17: '.',
        18: '3',
        19: '3',
        20: ' ',
        21: 'M',
        22: 'i',
        23: 'B',
        explanation: '',
      },
      {
        0: 'F',
        1: 'r',
        2: 'o',
        3: 'm',
        4: ' ',
        5: '1',
        6: '.',
        7: '3',
        8: ' ',
        9: 'M',
        10: 'i',
        11: 'B',
        12: ' ',
        13: 't',
        14: 'o',
        15: ' ',
        16: '1',
        17: '.',
        18: '1',
        19: ' ',
        20: 'M',
        21: 'i',
        22: 'B',
        explanation: '',
      },
      {
        0: 'F',
        1: 'r',
        2: 'o',
        3: 'm',
        4: ' ',
        5: '2',
        6: ' ',
        7: 'M',
        8: 'i',
        9: 'B',
        10: ' ',
        11: 't',
        12: 'o',
        13: ' ',
        14: '1',
        15: '.',
        16: '5',
        17: ' ',
        18: 'M',
        19: 'i',
        20: 'B',
        explanation: '',
      },
    ],
    sampleAnswers: ['From 1.5 MiB to 1.33 MiB'],
    hints: [],
    metadata: {},
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
  `✅ Added ${newQuestions.length} questions for Bundle Optimization (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
