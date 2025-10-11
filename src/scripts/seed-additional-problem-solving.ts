// v1.0 - Seed additional problem-solving questions to Firebase
// Run with: npx tsx src/scripts/seed-additional-problem-solving.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// Firebase configuration
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

// ==========================================
// Additional Problem-Solving Questions
// ==========================================

const additionalProblemSolvingTasks = [
  {
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'easy',
    category: 'Linked Lists',
    functionName: 'reverseList',
    starterCode: `function reverseList(head) {
  // Your code here
  return null;
}`,
    solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
    testCases: [
      { id: 't1', input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { id: 't2', input: '[1,2]', expected: '[2,1]' },
      { id: 't3', input: '[]', expected: '[]' },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000]',
      '-5000 <= Node.val <= 5000',
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: '' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: '' },
      { input: 'head = []', output: '[]', explanation: '' },
    ],
    tags: ['Linked List', 'Recursion'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Merge Two Sorted Lists',
    description:
      'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    difficulty: 'easy',
    category: 'Linked Lists',
    functionName: 'mergeTwoLists',
    starterCode: `function mergeTwoLists(list1, list2) {
  // Your code here
  return null;
}`,
    solution: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let current = dummy;
  
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  current.next = list1 || list2;
  return dummy.next;
}`,
    testCases: [
      { id: 't1', input: '[[1,2,4], [1,3,4]]', expected: '[1,1,2,3,4,4]' },
      { id: 't2', input: '[[], []]', expected: '[]' },
      { id: 't3', input: '[[], [0]]', expected: '[0]' },
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order',
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: '',
      },
      { input: 'list1 = [], list2 = []', output: '[]', explanation: '' },
      { input: 'list1 = [], list2 = [0]', output: '[0]', explanation: '' },
    ],
    tags: ['Linked List', 'Recursion'],
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
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
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
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
  }
  
  return maxProfit;
}`,
    testCases: [
      { id: 't1', input: '[7,1,5,3,6,4]', expected: '5' },
      { id: 't2', input: '[7,6,4,3,1]', expected: '0' },
      { id: 't3', input: '[1,2]', expected: '1' },
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
  {
    title: 'Single Number',
    description:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    difficulty: 'easy',
    category: 'Arrays',
    functionName: 'singleNumber',
    starterCode: `function singleNumber(nums) {
  // Your code here
  return 0;
}`,
    solution: `function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}`,
    testCases: [
      { id: 't1', input: '[2,2,1]', expected: '1' },
      { id: 't2', input: '[4,1,2,1,2]', expected: '4' },
      { id: 't3', input: '[1]', expected: '1' },
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-3 * 10^4 <= nums[i] <= 3 * 10^4',
      'Each element in the array appears twice except for one element which appears only once.',
    ],
    examples: [
      { input: 'nums = [2,2,1]', output: '1', explanation: '' },
      { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '' },
      { input: 'nums = [1]', output: '1', explanation: '' },
    ],
    tags: ['Array', 'Bit Manipulation'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Missing Number',
    description:
      'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    difficulty: 'easy',
    category: 'Arrays',
    functionName: 'missingNumber',
    starterCode: `function missingNumber(nums) {
  // Your code here
  return 0;
}`,
    solution: `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`,
    testCases: [
      { id: 't1', input: '[3,0,1]', expected: '2' },
      { id: 't2', input: '[0,1]', expected: '2' },
      { id: 't3', input: '[9,6,4,2,3,5,7,0,1]', expected: '8' },
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 10^4',
      '0 <= nums[i] <= n',
      'All the numbers of nums are unique.',
    ],
    examples: [
      {
        input: 'nums = [3,0,1]',
        output: '2',
        explanation:
          'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.',
      },
      {
        input: 'nums = [0,1]',
        output: '2',
        explanation:
          'n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.',
      },
    ],
    tags: ['Array', 'Hash Table', 'Math', 'Bit Manipulation', 'Sorting'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Find All Anagrams in a String',
    description:
      "Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: 'medium',
    category: 'Strings',
    functionName: 'findAnagrams',
    starterCode: `function findAnagrams(s, p) {
  // Your code here
  return [];
}`,
    solution: `function findAnagrams(s, p) {
  const result = [];
  const pCount = {};
  const sCount = {};
  
  // Count characters in p
  for (let char of p) {
    pCount[char] = (pCount[char] || 0) + 1;
  }
  
  const pLen = p.length;
  const sLen = s.length;
  
  // Initialize sliding window
  for (let i = 0; i < pLen; i++) {
    sCount[s[i]] = (sCount[s[i]] || 0) + 1;
  }
  
  // Check if initial window is anagram
  if (isEqual(pCount, sCount)) {
    result.push(0);
  }
  
  // Slide the window
  for (let i = pLen; i < sLen; i++) {
    // Add new character
    sCount[s[i]] = (sCount[s[i]] || 0) + 1;
    
    // Remove old character
    sCount[s[i - pLen]]--;
    if (sCount[s[i - pLen]] === 0) {
      delete sCount[s[i - pLen]];
    }
    
    // Check if current window is anagram
    if (isEqual(pCount, sCount)) {
      result.push(i - pLen + 1);
    }
  }
  
  return result;
}

function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  
  return true;
}`,
    testCases: [
      { id: 't1', input: '["cbaebabacd", "abc"]', expected: '[0,6]' },
      { id: 't2', input: '["abab", "ab"]', expected: '[0,1,2]' },
      { id: 't3', input: '["baa", "aa"]', expected: '[1]' },
    ],
    constraints: [
      '1 <= s.length, p.length <= 3 * 10^4',
      's and p consist of lowercase English letters only.',
    ],
    examples: [
      {
        input: 's = "cbaebabacd", p = "abc"',
        output: '[0,6]',
        explanation:
          'The substring with start index = 0 is "cba", which is an anagram of "abc". The substring with start index = 6 is "bac", which is an anagram of "abc".',
      },
      {
        input: 's = "abab", p = "ab"',
        output: '[0,1,2]',
        explanation:
          'The substring with start index = 0 is "ab", which is an anagram of "ab". The substring with start index = 1 is "ba", which is an anagram of "ab". The substring with start index = 2 is "ab", which is an anagram of "ab".',
      },
    ],
    tags: ['Hash Table', 'String', 'Sliding Window'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Group Anagrams',
    description:
      'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    difficulty: 'medium',
    category: 'Hash Table',
    functionName: 'groupAnagrams',
    starterCode: `function groupAnagrams(strs) {
  // Your code here
  return [];
}`,
    solution: `function groupAnagrams(strs) {
  const map = {};
  
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map[sorted]) {
      map[sorted] = [];
    }
    map[sorted].push(str);
  }
  
  return Object.values(map);
}`,
    testCases: [
      {
        id: 't1',
        input: '["eat","tea","tan","ate","nat","bat"]',
        expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      { id: 't2', input: '[""]', expected: '[[""]]' },
      { id: 't3', input: '["a"]', expected: '[["a"]]' },
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters only.',
    ],
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: '',
      },
      { input: 'strs = [""]', output: '[[""]]', explanation: '' },
      { input: 'strs = ["a"]', output: '[["a"]]', explanation: '' },
    ],
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Product of Array Except Self',
    description:
      'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operator.',
    difficulty: 'medium',
    category: 'Arrays',
    functionName: 'productExceptSelf',
    starterCode: `function productExceptSelf(nums) {
  // Your code here
  return [];
}`,
    solution: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);
  
  // Calculate left products
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  
  // Calculate right products and multiply with left products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] = result[i] * rightProduct;
    rightProduct *= nums[i];
  }
  
  return result;
}`,
    testCases: [
      { id: 't1', input: '[1,2,3,4]', expected: '[24,12,8,6]' },
      { id: 't2', input: '[-1,1,0,-3,3]', expected: '[0,0,9,0,0]' },
      { id: 't3', input: '[2,3,4,5]', expected: '[60,40,30,24]' },
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
    ],
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: '' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: '' },
    ],
    tags: ['Array', 'Prefix Sum'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Spiral Matrix',
    description:
      'Given an m x n matrix, return all elements of the matrix in spiral order.',
    difficulty: 'medium',
    category: 'Arrays',
    functionName: 'spiralOrder',
    starterCode: `function spiralOrder(matrix) {
  // Your code here
  return [];
}`,
    solution: `function spiralOrder(matrix) {
  if (!matrix.length) return [];
  
  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // Traverse right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    
    // Traverse down
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    // Traverse left
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    
    // Traverse up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
}`,
    testCases: [
      {
        id: 't1',
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        expected: '[1,2,3,6,9,8,7,4,5]',
      },
      {
        id: 't2',
        input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        expected: '[1,2,3,4,8,12,11,10,9,5,6,7]',
      },
      { id: 't3', input: '[[1,2],[3,4]]', expected: '[1,2,4,3]' },
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100',
    ],
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
        explanation: '',
      },
      {
        input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation: '',
      },
    ],
    tags: ['Array', 'Matrix', 'Simulation'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedAdditionalProblemSolvingTasks() {
  console.log('🌱 Seeding additional problem-solving tasks...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of additionalProblemSolvingTasks) {
    try {
      // Check if task already exists (by title)
      const existingQuery = query(
        collection(db, 'problemSolvingTasks'),
        where('title', '==', task.title)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'problemSolvingTasks'), task);
        successCount++;
        console.log(`✅ Added problem-solving task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Problem-solving task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding problem-solving task ${task.title}:`,
        error
      );
    }
  }

  console.log('🎉 Additional problem-solving tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${additionalProblemSolvingTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log(
    '🚀 Starting additional problem-solving tasks seeding process...'
  );

  try {
    await seedAdditionalProblemSolvingTasks();
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
