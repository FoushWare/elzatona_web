#!/usr/bin/env node

// Simple seeding script for problem-solving tasks
// Run with: node seed-problem-solving-tasks.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.GOOGLE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problemSolvingTasks = [
  {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    category: 'Arrays',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // Your code here
  // Return an array of two indices
  return [];
}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
    testCases: [
      {
        id: 't1',
        input: '[[2, 7, 11, 15], 9]',
        expectedOutput: '[0, 1]',
        description: 'Basic test case',
      },
      {
        id: 't2',
        input: '[[3, 2, 4], 6]',
        expectedOutput: '[1, 2]',
        description: 'Different indices',
      },
      {
        id: 't3',
        input: '[[3, 3], 6]',
        expectedOutput: '[0, 1]',
        description: 'Same numbers',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    tags: ['Array', 'Hash Table'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'easy',
    category: 'Strings',
    functionName: 'isValid',
    starterCode: `function isValid(s) {
  // Your code here
  return false;
}`,
    solution: `function isValid(s) {
  const stack = [];
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (map[char]) {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        return false;
      }
      
      const lastOpen = stack.pop();
      if (map[lastOpen] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
    testCases: [
      {
        id: 't1',
        input: '"()"',
        expectedOutput: 'true',
        description: 'Simple parentheses',
      },
      {
        id: 't2',
        input: '"()[]{}"',
        expectedOutput: 'true',
        description: 'Mixed brackets',
      },
      {
        id: 't3',
        input: '"(]"',
        expectedOutput: 'false',
        description: 'Invalid sequence',
      },
      {
        id: 't4',
        input: '"([{}])"',
        expectedOutput: 'true',
        description: 'Nested brackets',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      { input: 's = "()"', output: 'true', explanation: '' },
      { input: 's = "()[]{}"', output: 'true', explanation: '' },
      { input: 's = "(]"', output: 'false', explanation: '' },
    ],
    tags: ['String', 'Stack'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    difficulty: 'medium',
    category: 'Arrays',
    functionName: 'maxSubArray',
    starterCode: `function maxSubArray(nums) {
  // Your code here
  return 0;
}`,
    solution: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  
  return maxSoFar;
}`,
    testCases: [
      {
        id: 't1',
        input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        expectedOutput: '6',
        description: 'Mixed positive and negative',
      },
      {
        id: 't2',
        input: '[1]',
        expectedOutput: '1',
        description: 'Single element',
      },
      {
        id: 't3',
        input: '[5, 4, -1, 7, 8]',
        expectedOutput: '23',
        description: 'All positive',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum = 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The subarray [1] has the largest sum = 1.',
      },
    ],
    tags: ['Array', 'Dynamic Programming'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

async function seedProblemSolvingTasks() {
  console.log('🌱 Starting to seed problem-solving tasks...');
  try {
    for (const task of problemSolvingTasks) {
      const docRef = await addDoc(collection(db, 'problemSolvingTasks'), task);
      console.log(`✅ Added task: ${task.title} (ID: ${docRef.id})`);
    }
    console.log('🎉 Successfully seeded 3 problem-solving tasks!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: node test-problem-solving-crud.js');
    console.log('2. Visit: http://localhost:3000/admin/problem-solving');
    console.log('3. Test CRUD operations in the admin panel');
  } catch (error) {
    console.error('❌ Error seeding problem-solving tasks:', error);
  }
}

seedProblemSolvingTasks();
