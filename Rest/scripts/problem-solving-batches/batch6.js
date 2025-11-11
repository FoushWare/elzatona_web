const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/problem-solving-questions.json');

const newQuestions = [
  {
    "id": "problem-solving-medium-6",
    "title": "Product of Array Except Self",
    "content": "Given an array, return an array where each element is the product of all other elements (without using division).\n\nExample: [1, 2, 3, 4] → [24, 12, 8, 6]",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Medium Problems",
    "difficulty": "medium",
    "learningCardId": "problem-solving",
    "isActive": true,
    "createdAt": "2025-11-11T20:16:30.714Z",
    "updatedAt": "2025-11-11T20:16:30.714Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "problem-solving",
      "algorithms",
      "javascript",
      "medium"
    ],
    "explanation": "Use two passes: first pass calculates left products (product of all elements to the left), second pass multiplies by right products (product of all elements to the right). This avoids division and handles zeros.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Two passes: left products, then right products. Multiply corresponding elements. Time: O(n), Space: O(1) excluding output",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Calculate product of all elements, divide by each element. Time: O(n), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "For each element, calculate product of all others. Time: O(n²), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use nested loops to calculate products. Time: O(n²), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Think about the time and space complexity",
      "Consider edge cases (empty arrays, single elements, etc.)",
      "Try to solve it step by step"
    ],
    "metadata": {}
  },
  {
    "id": "problem-solving-medium-7",
    "title": "Validate Sudoku Board",
    "content": "Determine if a 9x9 Sudoku board is valid (no duplicates in rows, columns, or 3x3 boxes).\n\nExample: Valid board returns true",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Medium Problems",
    "difficulty": "medium",
    "learningCardId": "problem-solving",
    "isActive": true,
    "createdAt": "2025-11-11T20:16:30.714Z",
    "updatedAt": "2025-11-11T20:16:30.714Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "problem-solving",
      "algorithms",
      "javascript",
      "medium"
    ],
    "explanation": "Use hash sets to track seen numbers in each row, column, and 3x3 box. For each cell, check if the number exists in the corresponding row, column, and box sets. Since board is fixed 9x9, complexity is O(1).",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use three sets of hash maps: one for rows, one for columns, one for boxes. Check each cell against all three. Time: O(1) - fixed 81 cells, Space: O(1)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Check each row, column, and box separately. Time: O(1), Space: O(1)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use nested loops to check all combinations. Time: O(n⁴), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Sort each row, column, and box. Time: O(1), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Think about the time and space complexity",
      "Consider edge cases (empty arrays, single elements, etc.)",
      "Try to solve it step by step"
    ],
    "metadata": {}
  },
  {
    "id": "problem-solving-medium-8",
    "title": "Find Longest Increasing Subsequence",
    "content": "Given an array, find the length of the longest strictly increasing subsequence.\n\nExample: [10, 9, 2, 5, 3, 7, 101, 18] → 4 ([2, 3, 7, 101])",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Medium Problems",
    "difficulty": "medium",
    "learningCardId": "problem-solving",
    "isActive": true,
    "createdAt": "2025-11-11T20:16:30.714Z",
    "updatedAt": "2025-11-11T20:16:30.714Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "problem-solving",
      "algorithms",
      "javascript",
      "medium"
    ],
    "explanation": "Two approaches: 1) DP: for each element, check all previous elements and update LIS length. 2) Binary search: maintain array of smallest tail values, use binary search to find insertion point (more efficient O(n log n)).",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use dynamic programming: dp[i] = length of LIS ending at i. Time: O(n²), Space: O(n)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use binary search with patience sorting. Maintain array of smallest tail of increasing subsequences. Time: O(n log n), Space: O(n)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Try all possible subsequences. Time: O(2ⁿ), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Sort array and find longest consecutive sequence. Time: O(n log n), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Think about the time and space complexity",
      "Consider edge cases (empty arrays, single elements, etc.)",
      "Try to solve it step by step"
    ],
    "metadata": {}
  }
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

console.log(`✅ Added ${newQuestions.length} problem-solving questions (Batch 6)`);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
