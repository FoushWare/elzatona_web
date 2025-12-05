#!/usr/bin/env node

// Simple seeding script for problem-solving tasks
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problemSolvingTasks = [
  {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    category: 'Array',
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
        description: 'Basic example',
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
      'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
      'Input: nums = [3,2,4], target = 6\nOutput: [1,2]',
      'Input: nums = [3,3], target = 6\nOutput: [0,1]',
    ],
    tags: ['Array', 'Hash Table'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'easy',
    category: 'Stack',
    functionName: 'isValid',
    starterCode: `function isValid(s) {
    // Your code here
    // Return true if valid, false otherwise
    return false;
}`,
    solution: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
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
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      'Input: s = "()"\nOutput: true',
      'Input: s = "()[]{}"\nOutput: true',
      'Input: s = "(]"\nOutput: false',
    ],
    tags: ['String', 'Stack'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    difficulty: 'medium',
    category: 'Dynamic Programming',
    functionName: 'maxSubArray',
    starterCode: `function maxSubArray(nums) {
    // Your code here
    // Return the maximum sum
    return 0;
}`,
    solution: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
    testCases: [
      {
        id: 't1',
        input: '[-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        description: "Kadane's algorithm example",
      },
      {
        id: 't2',
        input: '[1]',
        expectedOutput: '1',
        description: 'Single element',
      },
      {
        id: 't3',
        input: '[5,4,-1,7,8]',
        expectedOutput: '23',
        description: 'All positive',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      'Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.',
      'Input: nums = [1]\nOutput: 1',
      'Input: nums = [5,4,-1,7,8]\nOutput: 23',
    ],
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedTasks() {
  try {
    console.log('🌱 Starting to seed problem-solving tasks...');

    for (const task of problemSolvingTasks) {
      const docRef = await addDoc(collection(db, 'problemSolvingTasks'), task);
      console.log(`✅ Added task: ${task.title} (ID: ${docRef.id})`);
    }

    console.log(
      `🎉 Successfully seeded ${problemSolvingTasks.length} problem-solving tasks!`
    );
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding tasks:', error);
    process.exit(1);
  }
}

seedTasks();
