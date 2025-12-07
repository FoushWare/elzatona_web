const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/problem-solving-questions.json'
);

const newQuestions = [
  {
    id: 'problem-solving-medium-9',
    title: 'Minimum Coins to Make Amount',
    content:
      'Given coins of different denominations and a total amount, find the minimum number of coins needed.\n\nExample: coins = [1, 2, 5], amount = 11 → 3 (5 + 5 + 1)',
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: 'Medium Problems',
    difficulty: 'medium',
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: '2025-11-11T20:16:30.714Z',
    updatedAt: '2025-11-11T20:16:30.714Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', 'medium'],
    explanation:
      'Use dynamic programming: create array dp where dp[i] represents minimum coins for amount i. Initialize dp[0] = 0. For each coin, update dp[i + coin] = min(dp[i + coin], dp[i] + 1).',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use dynamic programming: dp[i] = min coins for amount i. For each coin, update dp[i + coin]. Time: O(amount * coins.length), Space: O(amount)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use greedy: always pick largest coin. Time: O(amount), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Try all combinations using recursion. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Sort coins and use largest first. Time: O(n log n), Space: O(1)',
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
    id: 'problem-solving-medium-10',
    title: 'Find Word in 2D Grid',
    content:
      'Given a 2D board and a word, determine if the word exists in the board (can move horizontally or vertically).\n\nExample: board with "ABCE", "SFCS", "ADEE" and word "ABCCED" → true',
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: 'Medium Problems',
    difficulty: 'medium',
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: '2025-11-11T20:16:30.714Z',
    updatedAt: '2025-11-11T20:16:30.714Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', 'medium'],
    explanation:
      'Use backtracking with DFS: for each cell matching first character, recursively search in all 4 directions. Mark cells as visited during recursion, unmark during backtracking. Return true if word found.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use backtracking with DFS. For each cell, explore all directions, mark visited, backtrack. Time: O(m*n*4^L) where L is word length, Space: O(L)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Try all possible paths using BFS. Time: O(m*n*4^L), Space: O(m*n)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Check each cell independently. Time: O(m*n*L), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Convert board to string and search. Time: O(m*n), Space: O(m*n)',
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
  `✅ Added ${newQuestions.length} problem-solving questions (Batch 7)`
);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
