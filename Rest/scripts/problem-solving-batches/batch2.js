const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/problem-solving-questions.json'
);

const newQuestions = [
  {
    id: 'problem-solving-easy-4',
    title: 'Check for Duplicate Values',
    content:
      'Given an array, determine if any value appears at least twice.\n\nExample: [1, 2, 3, 1] → true',
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: 'Easy Problems',
    difficulty: 'easy',
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: '2025-11-11T20:16:30.714Z',
    updatedAt: '2025-11-11T20:16:30.714Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', 'easy'],
    explanation:
      'Use a Set data structure. Iterate through the array, adding each element to the Set. If an element already exists in the Set, return true. This is the most efficient approach.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use a Set to track seen values. If value exists in Set, return true. Time: O(n), Space: O(n)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Sort array and check adjacent elements. Time: O(n log n), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use nested loops to compare all pairs. Time: O(n²), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use filter and length comparison. Time: O(n), Space: O(n)',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Think about the time and space complexity',
      'Consider edge cases (empty arrays, single elements, etc.)',
      'Try to solve it step by step',
    ],
    metadata: {},
  },
  {
    id: 'problem-solving-easy-5',
    title: 'Find Maximum Profit from Stock Prices',
    content:
      'Given an array of stock prices, find the maximum profit from buying and selling once.\n\nExample: [7, 1, 5, 3, 6, 4] → 5 (buy at 1, sell at 6)',
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: 'Easy Problems',
    difficulty: 'easy',
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: '2025-11-11T20:16:30.714Z',
    updatedAt: '2025-11-11T20:16:30.714Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', 'easy'],
    explanation:
      'Keep track of the minimum price encountered so far. For each day, calculate the profit if selling today (current price - min price) and update the maximum profit seen.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Track minimum price seen so far. For each price, calculate profit and update max profit. Time: O(n), Space: O(1)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Try all buy-sell pairs using nested loops. Time: O(n²), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Find min and max values. Time: O(n), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Sort prices and find difference. Time: O(n log n), Space: O(n)',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Think about the time and space complexity',
      'Consider edge cases (empty arrays, single elements, etc.)',
      'Try to solve it step by step',
    ],
    metadata: {},
  },
  {
    id: 'problem-solving-easy-6',
    title: 'Check if Two Strings are Anagrams',
    content:
      'Given two strings, determine if they are anagrams (same characters, different order).\n\nExample: "listen" and "silent" → true',
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: 'Easy Problems',
    difficulty: 'easy',
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: '2025-11-11T20:16:30.714Z',
    updatedAt: '2025-11-11T20:16:30.714Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', 'easy'],
    explanation:
      'Two approaches: 1) Sort both strings and compare (simpler). 2) Count character frequencies using a hash map (more efficient for large strings). Both are valid solutions.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Sort both strings and compare. Time: O(n log n), Space: O(n)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Count character frequencies using hash map. Compare counts. Time: O(n), Space: O(1) - limited alphabet',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use nested loops to check each character. Time: O(n²), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Compare string lengths only. Time: O(1), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Think about the time and space complexity',
      'Consider edge cases (empty arrays, single elements, etc.)',
      'Try to solve it step by step',
    ],
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
  `✅ Added ${newQuestions.length} problem-solving questions (Batch 2)`
);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
