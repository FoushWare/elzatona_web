const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-compression-2',
    title:
      'Which compression algorithms are most commonly used for JavaScript?',
    content:
      'The two most common compression algorithms used for HTTP and JavaScript data are Gzip and Brotli.',
    type: 'mcq',
    category: 'Performance Patterns',
    topic: 'Compression Algorithms',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.172Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'compression-algorithms',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Modern browsers widely support Gzip and Brotli for compressing text-based assets like JavaScript, HTML, and CSS.',
    points: 10,
    options: [
      {
        0: 'J',
        1: 'P',
        2: 'E',
        3: 'G',
        4: ' ',
        5: 'a',
        6: 'n',
        7: 'd',
        8: ' ',
        9: 'P',
        10: 'N',
        11: 'G',
        explanation: '',
      },
      {
        0: 'G',
        1: 'z',
        2: 'i',
        3: 'p',
        4: ' ',
        5: 'a',
        6: 'n',
        7: 'd',
        8: ' ',
        9: 'B',
        10: 'r',
        11: 'o',
        12: 't',
        13: 'l',
        14: 'i',
        explanation: '',
      },
      {
        0: 'Z',
        1: 'l',
        2: 'i',
        3: 'b',
        4: ' ',
        5: 'a',
        6: 'n',
        7: 'd',
        8: ' ',
        9: 'S',
        10: 'n',
        11: 'a',
        12: 'p',
        13: 'p',
        14: 'y',
        explanation: '',
      },
      {
        0: 'W',
        1: 'e',
        2: 'b',
        3: 'P',
        4: ' ',
        5: 'a',
        6: 'n',
        7: 'd',
        8: ' ',
        9: 'A',
        10: 'V',
        11: 'I',
        12: 'F',
        explanation: '',
      },
    ],
    sampleAnswers: ['Gzip and Brotli'],
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
  `✅ Added ${newQuestions.length} questions for Compression Algorithms (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
