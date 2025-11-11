const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/problem-solving-questions.json');

const newQuestions = [
  {
    "id": "problem-solving-easy-1",
    "title": "Find Two Numbers That Add Up to Target",
    "content": "Given an array of numbers and a target sum, find two numbers that add up to the target. Return their indices.\n\nExample: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (because 2 + 7 = 9)",
    "type": "multiple-choice",
    "category": "Problem Solving",
    "topic": "Easy Problems",
    "difficulty": "easy",
    "learningCardId": "problem-solving",
    "isActive": true,
    "createdAt": "2025-11-11T20:16:30.708Z",
    "updatedAt": "2025-11-11T20:16:30.713Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "problem-solving",
      "algorithms",
      "javascript",
      "easy"
    ],
    "explanation": "Use a hash map (object) to store each number and its index. For each number, check if the complement (target - current number) exists in the map. This gives O(n) time complexity.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use a hash map to store complements. Iterate once, checking if complement exists. Time: O(n), Space: O(n)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use nested loops to check all pairs. Time: O(n²), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Sort the array first, then use two pointers. Time: O(n log n), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use recursion to check all combinations. Time: O(2ⁿ), Space: O(n)",
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
    "id": "problem-solving-easy-2",
    "title": "Validate Balanced Parentheses",
    "content": "Given a string containing only parentheses, brackets, and braces, determine if the string is valid (properly closed).\n\nExample: \"()[]{}\" → true, \"([)]\" → false",
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
    "explanation": "Use a stack data structure. Push opening brackets onto the stack. When encountering a closing bracket, check if it matches the top of the stack. If stack is empty at the end, the string is valid.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use a stack. Push opening brackets, pop when matching closing bracket. Check if stack is empty at end. Time: O(n), Space: O(n)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Count opening and closing brackets. If counts match, it's valid. Time: O(n), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use regex to remove pairs repeatedly until no more pairs. Time: O(n²), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Check if string length is even. Time: O(1), Space: O(1)",
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
    "id": "problem-solving-easy-3",
    "title": "Reverse a String",
    "content": "Given a string, reverse it in-place (if array) or return reversed string.\n\nExample: \"hello\" → \"olleh\"",
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
    "explanation": "For arrays, use two pointers (start and end) and swap characters while moving pointers towards center. For strings in JavaScript, convert to array first since strings are immutable.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use two pointers from start and end, swap characters. Time: O(n), Space: O(1) for array, O(n) for string",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Create new string by iterating backwards. Time: O(n), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use built-in reverse() method. Time: O(n), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use recursion to swap characters. Time: O(n), Space: O(n)",
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

console.log(`✅ Added ${newQuestions.length} problem-solving questions (Batch 1)`);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
