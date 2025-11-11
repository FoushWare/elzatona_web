const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/problem-solving-questions.json');

const newQuestions = [
  {
    "id": "problem-solving-easy-10",
    "title": "Check if Number is Palindrome",
    "content": "Determine if an integer is a palindrome (reads same forwards and backwards).\n\nExample: 121 → true, -121 → false",
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
    "explanation": "Two approaches: 1) Convert to string and compare with reversed version. 2) Reverse half the number mathematically and compare with the other half (more efficient, no string conversion).",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Reverse half of the number and compare with other half. Time: O(log n), Space: O(1)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Convert to string and check if reversed equals original. Time: O(log n), Space: O(log n)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use modulo and division to extract digits. Time: O(log n), Space: O(log n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Compare first and last digit only. Time: O(1), Space: O(1)",
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
    "id": "problem-solving-medium-1",
    "title": "Find Longest Substring Without Repeating Characters",
    "content": "Given a string, find the length of the longest substring without repeating characters.\n\nExample: \"abcabcbb\" → 3 (\"abc\")",
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
    "explanation": "Use sliding window technique with a hash map. Expand window by moving right pointer, track characters in current window. When duplicate found, move left pointer past the duplicate. Track maximum window size.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use sliding window with hash map. Expand window, shrink when duplicate found. Time: O(n), Space: O(min(n, m)) where m is charset size",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Check all possible substrings. Time: O(n³), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use Set and check each substring. Time: O(n²), Space: O(n)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Sort characters and find longest sequence. Time: O(n log n), Space: O(n)",
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
    "id": "problem-solving-medium-2",
    "title": "Find Container With Most Water",
    "content": "Given an array of heights, find two lines that together with x-axis form a container that holds the most water.\n\nExample: [1, 8, 6, 2, 5, 4, 8, 3, 7] → 49",
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
    "explanation": "Use two pointers technique: start with pointers at both ends. Calculate area (min(height[left], height[right]) * (right - left)). Move the pointer with smaller height inward, as moving the larger one cannot increase area.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use two pointers at start and end. Move pointer with smaller height. Calculate area and track max. Time: O(n), Space: O(1)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Try all pairs of lines. Time: O(n²), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Find two tallest lines. Time: O(n), Space: O(1)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Sort heights and use top two. Time: O(n log n), Space: O(n)",
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

console.log(`✅ Added ${newQuestions.length} problem-solving questions (Batch 4)`);
console.log(`📝 Total Problem Solving questions: ${existingQuestions.length}`);
