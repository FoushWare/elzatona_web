export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'problem-solving';
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  tags: string[];
  problem: {
    statement: string;
    examples: Array<{
      input: string;
      output: string;
      explanation: string;
    }>;
    constraints: string[];
    notes?: string;
  };
  starterCode: {
    javascript: string;
    typescript: string;
  };
  solution: {
    javascript: string;
    typescript: string;
    explanation: string;
  };
  testCases: Array<{
    input: Record<string, unknown>;
    expectedOutput: unknown;
    description: string;
  }>;
  hints: string[];
  relatedTopics: string[];
  completionRate: number;
  frontendRelevance?: string;
  interviewFrequency?: string;
}

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'ps-1',
    title: 'Two Sum',
    description: 'Given an array of integers and a target sum, find two numbers that add up to the target.',
    category: 'problem-solving',
    subcategory: 'Arrays',
    difficulty: 'easy',
    estimatedTime: 20,
    tags: ['Arrays', 'Hash Map', 'Algorithms', 'JavaScript'],
    problem: {
      statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: 'nums = [2, 7, 11, 15], target = 9',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3, 2, 4], target = 6',
          output: '[1, 2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        },
        {
          input: 'nums = [3, 3], target = 6',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists'
      ],
      notes: 'Try to solve this in O(n) time complexity using a hash map approach.'
    },
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
    
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    // Your code here
    
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`
    },
    solution: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      explanation: 'This solution uses a hash map to store numbers and their indices. For each number, we check if its complement (target - current number) exists in the map. If found, we return the indices. Time complexity: O(n), Space complexity: O(n).'
    },
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1],
        description: 'Basic case with two numbers that sum to target'
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2],
        description: 'Case where target is sum of middle and last elements'
      },
      {
        input: { nums: [3, 3], target: 6 },
        expectedOutput: [0, 1],
        description: 'Case with duplicate numbers'
      },
      {
        input: { nums: [1, 5, 8, 10, 13, 15], target: 23 },
        expectedOutput: [4, 5],
        description: 'Larger array with target sum of last two elements'
      }
    ],
    hints: [
      'Use a hash map to store numbers and their indices',
      'For each number, check if its complement (target - num) exists in the map',
      'Time complexity: O(n), Space complexity: O(n)',
      'The hash map approach is more efficient than nested loops',
      'Remember to return the indices, not the values'
    ],
    relatedTopics: ['Hash Maps', 'Arrays', 'Time Complexity', 'Space Complexity', 'JavaScript Maps'],
    completionRate: 92,
    frontendRelevance: 'This problem is relevant for frontend developers as it involves array manipulation and is commonly asked in technical interviews, especially for JavaScript/TypeScript roles.',
    interviewFrequency: 'Very High'
  },
  {
    id: 'fe-1',
    title: 'Valid Parentheses',
    description: 'Check if a string of parentheses is valid using a stack-based approach.',
    category: 'frontend',
    subcategory: 'Stack',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['Stack', 'String', 'Validation', 'JavaScript'],
    problem: {
      statement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'The string contains a pair of open and close parentheses, which are valid.'
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'The string contains multiple valid pairs of parentheses.'
        },
        {
          input: 's = "(]"',
          output: 'false',
          explanation: 'The string contains mismatched parentheses.'
        },
        {
          input: 's = "([)]"',
          output: 'false',
          explanation: 'The string contains mismatched nested parentheses.'
        }
      ],
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only \'()[]{}\''
      ],
      notes: 'Use a stack to keep track of opening brackets and match them with closing brackets.'
    },
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your code here
    
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false`,
      typescript: `function isValid(s: string): boolean {
    // Your code here
    
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false`
    },
    solution: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== brackets[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false`,
      typescript: `function isValid(s: string): boolean {
    const stack: string[] = [];
    const brackets: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== brackets[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false
console.log(isValid("([)]")); // Expected: false`,
      explanation: 'This solution uses a stack to keep track of opening brackets. When we encounter a closing bracket, we check if it matches the most recent opening bracket. Time complexity: O(n), Space complexity: O(n).'
    },
    testCases: [
      {
        input: { s: "()" },
        expectedOutput: true,
        description: 'Simple valid parentheses'
      },
      {
        input: { s: "()[]{}" },
        expectedOutput: true,
        description: 'Multiple valid bracket types'
      },
      {
        input: { s: "(]" },
        expectedOutput: false,
        description: 'Mismatched brackets'
      },
      {
        input: { s: "([)]" },
        expectedOutput: false,
        description: 'Incorrectly nested brackets'
      }
    ],
    hints: [
      'Use a stack data structure',
      'Push opening brackets onto the stack',
      'When you see a closing bracket, pop from stack and check if it matches',
      'Consider edge cases like empty string and unmatched brackets',
      'Make sure the stack is empty at the end'
    ],
    relatedTopics: ['Stack', 'String Manipulation', 'Validation', 'Data Structures', 'JavaScript Arrays'],
    completionRate: 88,
    frontendRelevance: 'This problem is highly relevant for frontend developers as it involves string validation, which is common in form validation, JSON parsing, and template processing.',
    interviewFrequency: 'High'
  },
  {
    id: 'fe-2',
    title: 'Remove Duplicates from Sorted Array',
    description: 'Remove duplicates from a sorted array in-place and return the new length.',
    category: 'frontend',
    subcategory: 'Arrays',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['Arrays', 'Two Pointers', 'In-place', 'JavaScript'],
    problem: {
      statement: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

1. Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
2. Return k.`,
      examples: [
        {
          input: 'nums = [1,1,2]',
          output: '2, nums = [1,2,_]',
          explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k.'
        },
        {
          input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
          output: '5, nums = [0,1,2,3,4,_,_,_,_,_]',
          explanation: 'Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k.'
        }
      ],
      constraints: [
        '1 <= nums.length <= 3 * 10^4',
        '-100 <= nums[i] <= 100',
        'nums is sorted in non-decreasing order'
      ],
      notes: 'Use the two-pointer technique to solve this efficiently in-place.'
    },
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    // Your code here
    
}

// Test cases
console.log(removeDuplicates([1,1,2])); // Expected: 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // Expected: 5`,
      typescript: `function removeDuplicates(nums: number[]): number {
    // Your code here
    
}

// Test cases
console.log(removeDuplicates([1,1,2])); // Expected: 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // Expected: 5`
    },
    solution: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let k = 1; // Position for next unique element
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
}

// Test cases
console.log(removeDuplicates([1,1,2])); // Expected: 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // Expected: 5`,
      typescript: `function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let k = 1; // Position for next unique element
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
}

// Test cases
console.log(removeDuplicates([1,1,2])); // Expected: 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // Expected: 5`,
      explanation: 'This solution uses the two-pointer technique. We keep track of the position where the next unique element should be placed. When we find a new unique element, we place it at that position and increment the counter. Time complexity: O(n), Space complexity: O(1).'
    },
    testCases: [
      {
        input: { nums: [1, 1, 2] },
        expectedOutput: 2,
        description: 'Basic case with duplicates'
      },
      {
        input: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
        expectedOutput: 5,
        description: 'Multiple duplicates'
      },
      {
        input: { nums: [1, 2, 3] },
        expectedOutput: 3,
        description: 'No duplicates'
      },
      {
        input: { nums: [1, 1, 1, 1] },
        expectedOutput: 1,
        description: 'All elements are duplicates'
      }
    ],
    hints: [
      'Use two pointers: one to iterate through the array, another to track where to place unique elements',
      'Since the array is sorted, duplicates will be adjacent',
      'Compare current element with the previous one',
      'Only increment the placement pointer when you find a new unique element',
      'The array should be modified in-place'
    ],
    relatedTopics: ['Two Pointers', 'Arrays', 'In-place Algorithms', 'JavaScript Arrays', 'Optimization'],
    completionRate: 85,
    frontendRelevance: 'This problem is relevant for frontend developers as it involves array manipulation, which is common in data processing, state management, and UI rendering optimization.',
    interviewFrequency: 'High'
  },
  {
    id: 'fe-3',
    title: 'Reverse String',
    description: 'Write a function that reverses a string by modifying the input array in-place.',
    category: 'frontend',
    subcategory: 'Strings',
    difficulty: 'easy',
    estimatedTime: 10,
    tags: ['Strings', 'Two Pointers', 'In-place', 'JavaScript'],
    problem: {
      statement: `Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.`,
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'The string "hello" is reversed to "olleh".'
        },
        {
          input: 's = ["H","a","n","n","a","h"]',
          output: '["h","a","n","n","a","H"]',
          explanation: 'The string "Hannah" is reversed to "hannaH".'
        }
      ],
      constraints: [
        '1 <= s.length <= 10^5',
        's[i] is a printable ascii character.'
      ],
      notes: 'Use the two-pointer technique to swap characters from both ends until you reach the middle.'
    },
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your code here
    
}

// Test cases
const test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

const test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      typescript: `function reverseString(s: string[]): void {
    // Your code here
    
}

// Test cases
const test1: string[] = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

const test2: string[] = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`
    },
    solution: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters at left and right pointers
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Test cases
const test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

const test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      typescript: `function reverseString(s: string[]): void {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters at left and right pointers
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Test cases
const test1: string[] = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

const test2: string[] = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      explanation: 'This solution uses the two-pointer technique. We start with pointers at both ends of the array and swap characters, moving the pointers toward the center until they meet. Time complexity: O(n), Space complexity: O(1).'
    },
    testCases: [
      {
        input: { s: ["h", "e", "l", "l", "o"] },
        expectedOutput: ["o", "l", "l", "e", "h"],
        description: 'Basic string reversal'
      },
      {
        input: { s: ["H", "a", "n", "n", "a", "h"] },
        expectedOutput: ["h", "a", "n", "n", "a", "H"],
        description: 'String with capital letters'
      },
      {
        input: { s: ["a", "b"] },
        expectedOutput: ["b", "a"],
        description: 'Two character string'
      },
      {
        input: { s: ["a"] },
        expectedOutput: ["a"],
        description: 'Single character string'
      }
    ],
    hints: [
      'Use two pointers: one at the beginning and one at the end',
      'Swap characters at both pointers',
      'Move the pointers toward the center',
      'Continue until the pointers meet or cross',
      'This is an in-place algorithm with O(1) space complexity'
    ],
    relatedTopics: ['Two Pointers', 'Strings', 'In-place Algorithms', 'JavaScript Arrays', 'String Manipulation'],
    completionRate: 90,
    frontendRelevance: 'This problem is relevant for frontend developers as it involves string processing, which is essential for tasks like form validation, text manipulation, and data transformation in web applications.',
    interviewFrequency: 'High'
  }
];

export function getChallengeById(id: string): CodingChallenge | undefined {
  return codingChallenges.find(challenge => challenge.id === id);
}

export function getChallengesByCategory(category: 'frontend' | 'problem-solving'): CodingChallenge[] {
  return codingChallenges.filter(challenge => challenge.category === category);
}

export function getChallengesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): CodingChallenge[] {
  return codingChallenges.filter(challenge => challenge.difficulty === difficulty);
}
