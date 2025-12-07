const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-import-on-visibility-15',
    title:
      'What happens when the EmojiPicker becomes visible in the viewport using react-loadable-visibility?',
    content:
      'The library detects visibility and begins importing the EmojiPicker module, showing a loading indicator until it’s ready.',
    type: 'scenario',
    category: 'Performance Patterns',
    topic: 'EmojiPicker Example',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10',
    updatedAt: '2025-11-11T18:50:32.209Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'emojipicker-example',
      'beginner',
      'intermediate',
    ],
    explanation: 'The module import only begins when the element is visible.',
    points: 10,
    options: [
      {
        0: 'I',
        1: 't',
        2: ' ',
        3: 'l',
        4: 'o',
        5: 'a',
        6: 'd',
        7: 's',
        8: ' ',
        9: 'i',
        10: 'm',
        11: 'm',
        12: 'e',
        13: 'd',
        14: 'i',
        15: 'a',
        16: 't',
        17: 'e',
        18: 'l',
        19: 'y',
        explanation: '',
      },
      {
        0: 'I',
        1: 't',
        2: ' ',
        3: 'l',
        4: 'o',
        5: 'a',
        6: 'd',
        7: 's',
        8: ' ',
        9: 'w',
        10: 'h',
        11: 'e',
        12: 'n',
        13: ' ',
        14: 'v',
        15: 'i',
        16: 's',
        17: 'i',
        18: 'b',
        19: 'l',
        20: 'e',
        explanation: '',
      },
      {
        0: 'I',
        1: 't',
        2: ' ',
        3: 'p',
        4: 'r',
        5: 'e',
        6: 'l',
        7: 'o',
        8: 'a',
        9: 'd',
        10: 's',
        11: ' ',
        12: 'o',
        13: 'n',
        14: ' ',
        15: 'h',
        16: 'o',
        17: 'v',
        18: 'e',
        19: 'r',
        explanation: '',
      },
      {
        0: 'I',
        1: 't',
        2: ' ',
        3: 'l',
        4: 'o',
        5: 'a',
        6: 'd',
        7: 's',
        8: ' ',
        9: 'o',
        10: 'n',
        11: ' ',
        12: 'b',
        13: 'u',
        14: 'i',
        15: 'l',
        16: 'd',
        17: ' ',
        18: 't',
        19: 'i',
        20: 'm',
        21: 'e',
        explanation: '',
      },
    ],
    sampleAnswers: ['It loads when visible.'],
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
  `✅ Added ${newQuestions.length} questions for EmojiPicker Example (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
