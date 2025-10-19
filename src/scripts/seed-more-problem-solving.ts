// v1.0 - Seed additional problem-solving questions to Firebase
// Run with: npx tsx src/scripts/seed-more-problem-solving.ts

import { initializeApp } from 'firebase/app';

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

const db = getFirestore(app);

// ==========================================
// Problem Solving Task Interface
// ==========================================

interface ProblemSolvingTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  created_at: string;
  updated_at: string;
  createdBy: string;
  updatedBy: string;
}

// ==========================================
// Additional Problem Solving Tasks
// ==========================================

const additionalProblemSolvingTasks: ProblemSolvingTask[] = [
  {
    id: 'problem-solving-006',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    category: 'Array',
    tags: ['array', 'hash-table', 'two-pointers'],
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
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',
      },
    ],
    testCases: [
      {
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]',
      },
      {
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
      },
      {
        input: '[3,3], 6',
        expectedOutput: '[0,1]',
      },
      {
        input: '[-1,0,1,2,-1,-4], -1',
        expectedOutput: '[0,2]',
      },
    ],
    starterCode: `function twoSum(nums, target) {
    // Your code here
}`,
    solutionCode: `function twoSum(nums, target) {
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
    hints: [
      'Use a hash map to store numbers and their indices',
      'For each number, check if its complement exists in the map',
      'Time complexity: O(n), Space complexity: O(n)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-007',
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order.",
    difficulty: 'easy',
    category: 'Stack',
    tags: ['stack', 'string'],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}.'",
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'Valid parentheses.',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'Valid parentheses.',
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'Invalid parentheses.',
      },
      {
        input: 's = "([)]"',
        output: 'false',
        explanation: 'Invalid parentheses.',
      },
    ],
    testCases: [
      {
        input: '"()"',
        expectedOutput: 'true',
      },
      {
        input: '"()[]{}"',
        expectedOutput: 'true',
      },
      {
        input: '"(]"',
        expectedOutput: 'false',
      },
      {
        input: '"([)]"',
        expectedOutput: 'false',
      },
      {
        input: '"{[]}"',
        expectedOutput: 'true',
      },
    ],
    starterCode: `function isValid(s) {
    // Your code here
}`,
    solutionCode: `function isValid(s) {
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
    hints: [
      'Use a stack to keep track of opening brackets',
      'When you encounter a closing bracket, check if it matches the most recent opening bracket',
      'Time complexity: O(n), Space complexity: O(n)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-008',
    title: 'Merge Two Sorted Lists',
    description:
      'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    difficulty: 'easy',
    category: 'Linked List',
    tags: ['linked-list', 'recursion'],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.',
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'Merged sorted list.',
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]',
        explanation: 'Both lists are empty.',
      },
      {
        input: 'list1 = [], list2 = [0]',
        output: '[0]',
        explanation: 'One list is empty.',
      },
    ],
    testCases: [
      {
        input: '[1,2,4], [1,3,4]',
        expectedOutput: '[1,1,2,3,4,4]',
      },
      {
        input: '[], []',
        expectedOutput: '[]',
      },
      {
        input: '[], [0]',
        expectedOutput: '[0]',
      },
      {
        input: '[1], [2]',
        expectedOutput: '[1,2]',
      },
    ],
    starterCode: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function mergeTwoLists(list1, list2) {
    // Your code here
}`,
    solutionCode: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
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
    hints: [
      'Use a dummy node to simplify the merge process',
      'Compare the values of the current nodes from both lists',
      'Attach the smaller node to the result and move forward',
      'Time complexity: O(n + m), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-009',
    title: 'Maximum Subarray',
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. This is also known as Kadane's algorithm.",
    difficulty: 'medium',
    category: 'Array',
    tags: ['array', 'divide-and-conquer', 'dynamic-programming'],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The single element has the largest sum.',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
        explanation: '[5,4,-1,7,8] has the largest sum = 23.',
      },
    ],
    testCases: [
      {
        input: '[-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
      },
      {
        input: '[1]',
        expectedOutput: '1',
      },
      {
        input: '[5,4,-1,7,8]',
        expectedOutput: '23',
      },
      {
        input: '[-1]',
        expectedOutput: '-1',
      },
    ],
    starterCode: `function maxSubArray(nums) {
    // Your code here
}`,
    solutionCode: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
    hints: [
      "Use Kadane's algorithm approach",
      'Keep track of the maximum sum ending at current position',
      'Update the global maximum whenever you find a better sum',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-010',
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'easy',
    category: 'Dynamic Programming',
    tags: ['math', 'dynamic-programming', 'memoization'],
    constraints: ['1 <= n <= 45'],
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation:
          'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation:
          'There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step',
      },
    ],
    testCases: [
      {
        input: '2',
        expectedOutput: '2',
      },
      {
        input: '3',
        expectedOutput: '3',
      },
      {
        input: '4',
        expectedOutput: '5',
      },
      {
        input: '5',
        expectedOutput: '8',
      },
    ],
    starterCode: `function climbStairs(n) {
    // Your code here
}`,
    solutionCode: `function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1; // ways to reach step 1
    let prev1 = 2; // ways to reach step 2
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
    hints: [
      'This is a Fibonacci sequence problem',
      'Use dynamic programming to avoid recalculating the same values',
      'The number of ways to reach step n = ways to reach (n-1) + ways to reach (n-2)',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-011',
    title: 'Best Time to Buy and Sell Stock',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    difficulty: 'easy',
    category: 'Array',
    tags: ['array', 'dynamic-programming'],
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
    testCases: [
      {
        input: '[7,1,5,3,6,4]',
        expectedOutput: '5',
      },
      {
        input: '[7,6,4,3,1]',
        expectedOutput: '0',
      },
      {
        input: '[1,2,3,4,5]',
        expectedOutput: '4',
      },
      {
        input: '[5,4,3,2,1]',
        expectedOutput: '0',
      },
    ],
    starterCode: `function maxProfit(prices) {
    // Your code here
}`,
    solutionCode: `function maxProfit(prices) {
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
    hints: [
      'Keep track of the minimum price seen so far',
      'For each day, calculate the profit if you sell on that day',
      'Update the maximum profit whenever you find a better profit',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-012',
    title: 'House Robber',
    description:
      'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
    difficulty: 'medium',
    category: 'Dynamic Programming',
    tags: ['array', 'dynamic-programming'],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '4',
        explanation:
          'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.',
      },
      {
        input: 'nums = [2,7,9,3,1]',
        output: '12',
        explanation:
          'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.',
      },
    ],
    testCases: [
      {
        input: '[1,2,3,1]',
        expectedOutput: '4',
      },
      {
        input: '[2,7,9,3,1]',
        expectedOutput: '12',
      },
      {
        input: '[2,1,1,2]',
        expectedOutput: '4',
      },
      {
        input: '[1]',
        expectedOutput: '1',
      },
    ],
    starterCode: `function rob(nums) {
    // Your code here
}`,
    solutionCode: `function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
    hints: [
      'Use dynamic programming approach',
      'For each house, decide whether to rob it or not',
      'If you rob current house, you cannot rob the previous house',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedAdditionalProblemSolvingTasks() {
  console.log('🌱 Starting additional problem-solving tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of additionalProblemSolvingTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        supabase.from('problemSolvingTasks'),
        where('id', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.length === 0) {
        // Add task to Firebase
        await addDoc(supabase.from('problemSolvingTasks'), task);

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
