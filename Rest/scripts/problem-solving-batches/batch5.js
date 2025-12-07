const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/problem-solving-questions.json'
);

const newQuestions = [
  {
    id: 'problem-solving-medium-3',
    title: 'Find All Unique Triplets That Sum to Zero',
    content:
      'Given an array, find all unique triplets that sum to zero.\n\nExample: [-1, 0, 1, 2, -1, -4] → [[-1, -1, 2], [-1, 0, 1]]',
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
      'Sort the array first. For each element, use two pointers (left and right) to find pairs that sum to the negative of the current element. Skip duplicate values to avoid duplicate triplets.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Sort array. For each element, use two pointers to find pairs that sum to negative of current element. Skip duplicates. Time: O(n²), Space: O(1) excluding output',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use three nested loops. Time: O(n³), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use hash map for all pairs, then check for third element. Time: O(n²), Space: O(n²)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Find all combinations using recursion. Time: O(2ⁿ), Space: O(n)',
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
    id: 'problem-solving-medium-4',
    title: 'Group Strings by Anagram',
    content:
      'Given an array of strings, group anagrams together.\n\nExample: ["eat", "tea", "tan", "ate", "nat", "bat"] → [["eat","tea","ate"], ["tan","nat"], ["bat"]]',
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
      'Two approaches: 1) Sort each string and use sorted string as key in hash map. 2) Use character frequency count as key (more efficient). Group strings with same key together.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use sorted string as key in hash map. Group strings with same sorted key. Time: O(n*k log k) where k is avg string length, Space: O(n*k)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Compare each string with all others. Time: O(n²*k), Space: O(n)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use character frequency as key. Time: O(n*k), Space: O(n*k)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Sort entire array and group adjacent anagrams. Time: O(n*k log(n*k)), Space: O(n*k)',
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
    id: 'problem-solving-medium-5',
    title: 'Find Longest Palindromic Substring',
    content:
      'Given a string, find the longest palindromic substring.\n\nExample: "babad" → "bab" or "aba"',
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
      'Expand around center: for each possible center (considering both odd and even length palindromes), expand outward while characters match. Track the longest palindrome found. More space-efficient than DP.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Expand around center for each possible center (odd and even length). Track longest. Time: O(n²), Space: O(1)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Check all possible substrings. Time: O(n³), Space: O(1)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use dynamic programming. Time: O(n²), Space: O(n²)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Reverse string and find longest common substring. Time: O(n²), Space: O(n²)',
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
  `✅ Added ${newQuestions.length} problem-solving questions (Batch 5)`
);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
