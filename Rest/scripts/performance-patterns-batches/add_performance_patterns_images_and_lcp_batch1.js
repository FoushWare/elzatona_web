const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-loading-sequence-7',
    title: 'Image Loading Prioritization',
    content: 'Which images should be prioritized during the initial page load?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Images and LCP',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.218Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'images-and-lcp',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Above-the-fold (ATF) and hero images directly affect LCP and should be prioritized during initial loading.',
    points: 10,
    options: [
      {
        0: 'B',
        1: 'e',
        2: 'l',
        3: 'o',
        4: 'w',
        5: ' ',
        6: 't',
        7: 'h',
        8: 'e',
        9: ' ',
        10: 'f',
        11: 'o',
        12: 'l',
        13: 'd',
        14: ' ',
        15: 'i',
        16: 'm',
        17: 'a',
        18: 'g',
        19: 'e',
        20: 's',
        explanation: '',
      },
      {
        0: 'A',
        1: 'b',
        2: 'o',
        3: 'v',
        4: 'e',
        5: ' ',
        6: 't',
        7: 'h',
        8: 'e',
        9: ' ',
        10: 'f',
        11: 'o',
        12: 'l',
        13: 'd',
        14: ' ',
        15: 'i',
        16: 'm',
        17: 'a',
        18: 'g',
        19: 'e',
        20: 's',
        21: ' ',
        22: 'i',
        23: 'n',
        24: 'c',
        25: 'l',
        26: 'u',
        27: 'd',
        28: 'i',
        29: 'n',
        30: 'g',
        31: ' ',
        32: 't',
        33: 'h',
        34: 'e',
        35: ' ',
        36: 'h',
        37: 'e',
        38: 'r',
        39: 'o',
        40: ' ',
        41: 'i',
        42: 'm',
        43: 'a',
        44: 'g',
        45: 'e',
        explanation: '',
      },
      {
        0: 'A',
        1: 'l',
        2: 'l',
        3: ' ',
        4: 'i',
        5: 'm',
        6: 'a',
        7: 'g',
        8: 'e',
        9: 's',
        10: ' ',
        11: 'e',
        12: 'q',
        13: 'u',
        14: 'a',
        15: 'l',
        16: 'l',
        17: 'y',
        explanation: '',
      },
      {
        0: 'L',
        1: 'a',
        2: 'z',
        3: 'y',
        4: '-',
        5: 'l',
        6: 'o',
        7: 'a',
        8: 'd',
        9: ' ',
        10: 'a',
        11: 'l',
        12: 'l',
        13: ' ',
        14: 'i',
        15: 'm',
        16: 'a',
        17: 'g',
        18: 'e',
        19: 's',
        explanation: '',
      },
    ],
    sampleAnswers: ['Above the fold images including the hero image'],
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
  `✅ Added ${newQuestions.length} questions for Images and LCP (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
