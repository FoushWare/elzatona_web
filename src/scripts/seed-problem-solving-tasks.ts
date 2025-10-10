// v1.0 - Seed problem solving tasks to Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
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
      { id: 't1', input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { id: 't2', input: [[3, 2, 4], 6], expected: [1, 2] },
      { id: 't3', input: [[3, 3], 6], expected: [0, 1] },
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
    tags: ['hash-table', 'array', 'two-pointers'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order. 3) Every close bracket has a corresponding open bracket of the same type.",
    difficulty: 'easy',
    category: 'Stacks & Queues',
    functionName: 'isValid',
    starterCode: `function isValid(s) {
    // Your code here
    // Return true if valid, false otherwise
    return false;
}`,
    solution: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    testCases: [
      { id: 't1', input: ['()'], expected: true },
      { id: 't2', input: ['()[]{}'], expected: true },
      { id: 't3', input: ['(]'], expected: false },
      { id: 't4', input: ['([)]'], expected: false },
      { id: 't5', input: ['{[]}'], expected: true },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The string contains valid parentheses.',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All brackets are properly closed.',
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'The closing bracket does not match the opening bracket.',
      },
    ],
    tags: ['stack', 'string'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. A subarray is a contiguous part of an array.',
    difficulty: 'medium',
    category: 'Dynamic Programming',
    functionName: 'maxSubArray',
    starterCode: `function maxSubArray(nums) {
    // Your code here
    // Return the maximum sum of any contiguous subarray
    return 0;
}`,
    solution: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
    testCases: [
      { id: 't1', input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { id: 't2', input: [[1]], expected: 1 },
      { id: 't3', input: [[5, 4, -1, 7, 8]], expected: 23 },
      { id: 't4', input: [[-1]], expected: -1 },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The subarray [1] has the largest sum 1.',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
        explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.',
      },
    ],
    tags: ['array', 'divide-and-conquer', 'dynamic-programming'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Binary Tree Inorder Traversal',
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values. In inorder traversal, we visit the left subtree, then the root, then the right subtree.",
    difficulty: 'easy',
    category: 'Trees',
    functionName: 'inorderTraversal',
    starterCode: `function inorderTraversal(root) {
    // Your code here
    // Return an array of values in inorder traversal
    return [];
}`,
    solution: `function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}`,
    testCases: [
      {
        id: 't1',
        input: [
          {
            val: 1,
            left: null,
            right: {
              val: 2,
              left: { val: 3, left: null, right: null },
              right: null,
            },
          },
        ],
        expected: [1, 3, 2],
      },
      { id: 't2', input: [null], expected: [] },
      { id: 't3', input: [{ val: 1, left: null, right: null }], expected: [1] },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100',
    ],
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation:
          'Inorder traversal visits left subtree, root, then right subtree.',
      },
      {
        input: 'root = []',
        output: '[]',
        explanation: 'Empty tree returns empty array.',
      },
      {
        input: 'root = [1]',
        output: '[1]',
        explanation: 'Single node tree returns that node.',
      },
    ],
    tags: ['stack', 'tree', 'depth-first-search'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    title: 'Longest Common Subsequence',
    description:
      'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.',
    difficulty: 'medium',
    category: 'Dynamic Programming',
    functionName: 'longestCommonSubsequence',
    starterCode: `function longestCommonSubsequence(text1, text2) {
    // Your code here
    // Return the length of the longest common subsequence
    return 0;
}`,
    solution: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}`,
    testCases: [
      { id: 't1', input: ['abcde', 'ace'], expected: 3 },
      { id: 't2', input: ['abc', 'abc'], expected: 3 },
      { id: 't3', input: ['abc', 'def'], expected: 0 },
      { id: 't4', input: ['bsbininm', 'jmjkbkjkv'], expected: 1 },
    ],
    constraints: [
      '1 <= text1.length, text2.length <= 1000',
      'text1 and text2 consist of only lowercase English characters.',
    ],
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: '3',
        explanation:
          'The longest common subsequence is "ace" and its length is 3.',
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: '3',
        explanation:
          'The longest common subsequence is "abc" and its length is 3.',
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: '0',
        explanation: 'There is no common subsequence, so the result is 0.',
      },
    ],
    tags: ['dynamic-programming', 'string'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

async function seedProblemSolvingTasks() {
  try {
    console.log('🌱 Starting to seed problem solving tasks...');

    for (const task of problemSolvingTasks) {
      const docRef = await addDoc(collection(db, 'problemSolvingTasks'), task);
      console.log(`✅ Added problem: ${task.title} with ID: ${docRef.id}`);
    }

    console.log('🎉 Successfully seeded all problem solving tasks!');
    console.log(`📊 Total tasks seeded: ${problemSolvingTasks.length}`);
  } catch (error) {
    console.error('❌ Error seeding problem solving tasks:', error);
  }
}

// Run the seeding function
seedProblemSolvingTasks();
