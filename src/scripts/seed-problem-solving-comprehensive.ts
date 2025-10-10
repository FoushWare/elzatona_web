// v1.0 - Comprehensive script to seed problem-solving tasks to Firebase
// Run with: npx tsx src/scripts/seed-problem-solving-comprehensive.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
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
      { id: 't1', input: '[[2, 7, 11, 15], 9]', expected: '[0, 1]' },
      { id: 't2', input: '[[3, 2, 4], 6]', expected: '[1, 2]' },
      { id: 't3', input: '[[3, 3], 6]', expected: '[0, 1]' },
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
      { id: 't1', input: '"()"', expected: 'true' },
      { id: 't2', input: '"()[]{}"', expected: 'true' },
      { id: 't3', input: '"(]"', expected: 'false' },
      { id: 't4', input: '"([{}])"', expected: 'true' },
      { id: 't5', input: '"{[]})"', expected: 'false' },
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
      'Given an array of integers nums, find the subarray with the largest sum, and return its sum.',
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
      { id: 't1', input: '[[-2, 1, -3, 4, -1, 2, 1, -5, 4]]', expected: '6' },
      { id: 't2', input: '[[1]]', expected: '1' },
      { id: 't3', input: '[[5, 4, -1, 7, 8]]', expected: '23' },
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
  {
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'easy',
    category: 'Dynamic Programming',
    functionName: 'climbStairs',
    starterCode: `function climbStairs(n) {
  // Your code here
  return 0;
}`,
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1;
  let prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}`,
    testCases: [
      { id: 't1', input: '2', expected: '2' },
      { id: 't2', input: '3', expected: '3' },
      { id: 't3', input: '4', expected: '5' },
    ],
    constraints: ['1 <= n <= 45'],
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation:
          'There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation:
          'There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step',
      },
    ],
    tags: ['Dynamic Programming', 'Math'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    difficulty: 'easy',
    category: 'Arrays',
    functionName: 'maxProfit',
    starterCode: `function maxProfit(prices) {
  // Your code here
  return 0;
}`,
    solution: `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}`,
    testCases: [
      { id: 't1', input: '[7, 1, 5, 3, 6, 4]', expected: '5' },
      { id: 't2', input: '[7, 6, 4, 3, 1]', expected: '0' },
      { id: 't3', input: '[1, 2, 3, 4, 5]', expected: '4' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation:
          'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation:
          'In this case, no transactions are done and the max profit = 0.',
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
    console.log('🎉 Successfully seeded 5 problem-solving tasks!');
  } catch (error) {
    console.error('❌ Error seeding problem-solving tasks:', error);
  }
}

seedProblemSolvingTasks();
