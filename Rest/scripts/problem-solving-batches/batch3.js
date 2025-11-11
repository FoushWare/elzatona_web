const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/problem-solving-questions.json');

const newQuestions = [
  {
    "id": "problem-solving-easy-7",
    "title": "Find Maximum Sum Subarray",
    "content": "Given an array of integers, find the contiguous subarray with the largest sum.\n\nExample: [-2, 1, -3, 4, -1, 2, 1, -5, 4] → 6 ([4, -1, 2, 1])",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Easy Problems",
    "difficulty": "easy",
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
      "easy"
    ],
    "explanation": "Kadane's algorithm: iterate through array, maintaining current sum. If current sum becomes negative, reset it to 0. Keep track of maximum sum seen so far.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Kadane's algorithm: track current sum and max sum. Reset current sum if negative. Time: O(n), Space: O(1)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Try all possible subarrays using nested loops. Time: O(n²), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use divide and conquer approach. Time: O(n log n), Space: O(log n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Find sum of all positive numbers. Time: O(n), Space: O(1)",
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
    "id": "problem-solving-easy-8",
    "title": "Merge Two Sorted Arrays",
    "content": "Given two sorted arrays, merge them into one sorted array.\n\nExample: [1, 2, 3] and [2, 5, 6] → [1, 2, 2, 3, 5, 6]",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Easy Problems",
    "difficulty": "easy",
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
      "easy"
    ],
    "explanation": "Use two pointers, one for each array. Compare elements at both pointers, add the smaller one to result, and advance that pointer. Continue until both arrays are processed.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use two pointers, compare elements and add smaller one. Time: O(n + m), Space: O(n + m)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Concatenate and sort. Time: O((n+m) log(n+m)), Space: O(n+m)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use nested loops to insert elements. Time: O(n*m), Space: O(n+m)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use Set to remove duplicates then sort. Time: O((n+m) log(n+m)), Space: O(n+m)",
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
    "id": "problem-solving-easy-9",
    "title": "Count Ways to Climb Stairs",
    "content": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb?\n\nExample: n = 3 → 3 ways (1+1+1, 1+2, 2+1)",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Easy Problems",
    "difficulty": "easy",
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
      "easy"
    ],
    "explanation": "This is a Fibonacci sequence problem. Use dynamic programming: ways to reach step i = ways to reach step (i-1) + ways to reach step (i-2). Can optimize space to O(1) by only keeping last two values.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use dynamic programming: ways[i] = ways[i-1] + ways[i-2]. Time: O(n), Space: O(n) or O(1) with optimization",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use recursion without memoization. Time: O(2ⁿ), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Try all possible combinations. Time: O(2ⁿ), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use factorial calculation. Time: O(n), Space: O(1)",
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

console.log(`✅ Added ${newQuestions.length} problem-solving questions (Batch 3)`);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
