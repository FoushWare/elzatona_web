// v1.0 - Comprehensive problem-solving questions seeding script
// Run with: npx tsx src/scripts/seed-comprehensive-problem-solving.ts

import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase

const db = getFirestore(app);

// ==========================================
// Comprehensive Problem Solving Tasks
// ==========================================

const comprehensiveProblemSolvingTasks = [
  {
    id: 'problem-solving-015',
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string `s`, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    category: 'Strings',
    tags: ['string', 'sliding-window', 'hash-table'],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: '3',
      },
      {
        input: '"bbbbb"',
        expectedOutput: '1',
      },
      {
        input: '"pwwkew"',
        expectedOutput: '3',
      },
      {
        input: '""',
        expectedOutput: '0',
      },
      {
        input: '"dvdf"',
        expectedOutput: '3',
      },
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
    // Your code here
}`,
    solutionCode: `function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
    hints: [
      'Use a sliding window approach with two pointers',
      'Use a Set to track characters in the current window',
      'Move the left pointer when a duplicate character is found',
      'Time complexity: O(n), Space complexity: O(min(m,n)) where m is the charset size',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-016',
    title: 'Container With Most Water',
    description:
      'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    difficulty: 'medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'greedy'],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation:
          'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.',
      },
      {
        input: 'height = [1,1]',
        output: '1',
        explanation: 'The container can hold 1 unit of water.',
      },
    ],
    testCases: [
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        expectedOutput: '49',
      },
      {
        input: '[1,1]',
        expectedOutput: '1',
      },
      {
        input: '[4,3,2,1,4]',
        expectedOutput: '16',
      },
      {
        input: '[1,2,1]',
        expectedOutput: '2',
      },
    ],
    starterCode: `function maxArea(height) {
    // Your code here
}`,
    solutionCode: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        maxArea = Math.max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}`,
    hints: [
      'Use two pointers starting from both ends',
      'The area is determined by the shorter line and the distance between lines',
      'Move the pointer pointing to the shorter line inward',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-017',
    title: '3Sum',
    description:
      'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
    difficulty: 'medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'sorting'],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation:
          'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].',
      },
      {
        input: 'nums = [0,1,1]',
        output: '[]',
        explanation: 'The only possible triplet does not sum up to 0.',
      },
      {
        input: 'nums = [0,0,0]',
        output: '[[0,0,0]]',
        explanation: 'The only possible triplet sums up to 0.',
      },
    ],
    testCases: [
      {
        input: '[-1,0,1,2,-1,-4]',
        expectedOutput: '[[-1,-1,2],[-1,0,1]]',
      },
      {
        input: '[0,1,1]',
        expectedOutput: '[]',
      },
      {
        input: '[0,0,0]',
        expectedOutput: '[[0,0,0]]',
      },
    ],
    starterCode: `function threeSum(nums) {
    // Your code here
}`,
    solutionCode: `function threeSum(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}`,
    hints: [
      'Sort the array first to handle duplicates easily',
      'Use three pointers: one fixed and two moving pointers',
      'Skip duplicate values to avoid duplicate triplets',
      'Time complexity: O(n²), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-018',
    title: 'Longest Palindromic Substring',
    description:
      'Given a string `s`, return the longest palindromic substring in `s`.',
    difficulty: 'medium',
    category: 'Strings',
    tags: ['string', 'dynamic-programming', 'palindrome'],
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.',
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: 'The longest palindromic substring is "bb".',
      },
    ],
    testCases: [
      {
        input: '"babad"',
        expectedOutput: '"bab"',
      },
      {
        input: '"cbbd"',
        expectedOutput: '"bb"',
      },
      {
        input: '"a"',
        expectedOutput: '"a"',
      },
      {
        input: '"ac"',
        expectedOutput: '"a"',
      },
    ],
    starterCode: `function longestPalindrome(s) {
    // Your code here
}`,
    solutionCode: `function longestPalindrome(s) {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLength = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i);     // odd length
        const len2 = expandAroundCenter(i, i + 1); // even length
        const maxLen = Math.max(len1, len2);
        
        if (maxLen > maxLength) {
            maxLength = maxLen;
            start = i - Math.floor((maxLen - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLength);
}`,
    hints: [
      'Use expand around center approach',
      'Check both odd-length and even-length palindromes',
      'For each center, expand outward while characters match',
      'Time complexity: O(n²), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-019',
    title: 'Product of Array Except Self',
    description:
      'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operator.',
    difficulty: 'medium',
    category: 'Arrays',
    tags: ['array', 'prefix-sum'],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
    ],
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]',
        explanation:
          'answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, answer[2] = 1*2*4 = 8, answer[3] = 1*2*3 = 6',
      },
      {
        input: 'nums = [-1,1,0,-3,3]',
        output: '[0,0,9,0,0]',
        explanation:
          'answer[0] = 1*0*(-3)*3 = 0, answer[1] = (-1)*0*(-3)*3 = 0, answer[2] = (-1)*1*(-3)*3 = 9, answer[3] = (-1)*1*0*3 = 0, answer[4] = (-1)*1*0*(-3) = 0',
      },
    ],
    testCases: [
      {
        input: '[1,2,3,4]',
        expectedOutput: '[24,12,8,6]',
      },
      {
        input: '[-1,1,0,-3,3]',
        expectedOutput: '[0,0,9,0,0]',
      },
      {
        input: '[2,3,4,5]',
        expectedOutput: '[60,40,30,24]',
      },
    ],
    starterCode: `function productExceptSelf(nums) {
    // Your code here
}`,
    solutionCode: `function productExceptSelf(nums) {
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
    hints: [
      'Use two passes: one for left products, one for right products',
      'First pass: calculate product of all elements to the left',
      'Second pass: multiply by product of all elements to the right',
      'Time complexity: O(n), Space complexity: O(1) excluding output array',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-020',
    title: 'Spiral Matrix',
    description:
      'Given an `m x n` matrix, return all elements of the matrix in spiral order.',
    difficulty: 'medium',
    category: 'Matrix',
    tags: ['matrix', 'simulation'],
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
        explanation: 'The spiral order is: 1→2→3→6→9→8→7→4→5',
      },
      {
        input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation: 'The spiral order is: 1→2→3→4→8→12→11→10→9→5→6→7',
      },
    ],
    testCases: [
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        expectedOutput: '[1,2,3,6,9,8,7,4,5]',
      },
      {
        input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]',
      },
      {
        input: '[[1]]',
        expectedOutput: '[1]',
      },
    ],
    starterCode: `function spiralOrder(matrix) {
    // Your code here
}`,
    solutionCode: `function spiralOrder(matrix) {
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
    hints: [
      'Use four boundaries: top, bottom, left, right',
      'Traverse in four directions: right, down, left, up',
      'Update boundaries after each direction',
      'Time complexity: O(m*n), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-021',
    title: 'Rotate Image',
    description:
      'You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.',
    difficulty: 'medium',
    category: 'Matrix',
    tags: ['matrix', 'array'],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000',
    ],
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[[7,4,1],[8,5,2],[9,6,3]]',
        explanation: 'The matrix is rotated 90 degrees clockwise.',
      },
      {
        input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
        explanation: 'The matrix is rotated 90 degrees clockwise.',
      },
    ],
    testCases: [
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        expectedOutput: '[[7,4,1],[8,5,2],[9,6,3]]',
      },
      {
        input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        expectedOutput: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
      },
      {
        input: '[[1]]',
        expectedOutput: '[[1]]',
      },
    ],
    starterCode: `function rotate(matrix) {
    // Your code here
}`,
    solutionCode: `function rotate(matrix) {
    const n = matrix.length;
    
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}`,
    hints: [
      'Two-step process: transpose then reverse each row',
      'Transpose: swap matrix[i][j] with matrix[j][i]',
      'Reverse: reverse each row after transposition',
      'Time complexity: O(n²), Space complexity: O(1)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-022',
    title: 'Word Search',
    description:
      'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    difficulty: 'medium',
    category: 'Backtracking',
    tags: ['backtracking', 'matrix', 'dfs'],
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters.',
    ],
    examples: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true',
        explanation: 'The word "ABCCED" can be found in the grid.',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: 'true',
        explanation: 'The word "SEE" can be found in the grid.',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: 'false',
        explanation: 'The word "ABCB" cannot be found in the grid.',
      },
    ],
    testCases: [
      {
        input:
          '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"',
        expectedOutput: 'true',
      },
      {
        input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"',
        expectedOutput: 'true',
      },
      {
        input:
          '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"',
        expectedOutput: 'false',
      },
    ],
    starterCode: `function exist(board, word) {
    // Your code here
}`,
    solutionCode: `function exist(board, word) {
    const m = board.length;
    const n = board[0].length;
    
    function dfs(row, col, index) {
        if (index === word.length) return true;
        if (row < 0 || row >= m || col < 0 || col >= n) return false;
        if (board[row][col] !== word[index]) return false;
        
        const temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        const found = dfs(row + 1, col, index + 1) ||
                    dfs(row - 1, col, index + 1) ||
                    dfs(row, col + 1, index + 1) ||
                    dfs(row, col - 1, index + 1);
        
        board[row][col] = temp; // Restore
        return found;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    
    return false;
}`,
    hints: [
      'Use DFS with backtracking',
      'Mark visited cells temporarily to avoid reuse',
      'Check all four directions from each cell',
      'Time complexity: O(m*n*4^L), Space complexity: O(L) where L is word length',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-023',
    title: 'Generate Parentheses',
    description:
      'Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    difficulty: 'medium',
    category: 'Backtracking',
    tags: ['backtracking', 'string', 'recursion'],
    constraints: ['1 <= n <= 8'],
    examples: [
      {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]',
        explanation:
          'All possible combinations of well-formed parentheses for n=3.',
      },
      {
        input: 'n = 1',
        output: '["()"]',
        explanation: 'Only one possible combination for n=1.',
      },
    ],
    testCases: [
      {
        input: '3',
        expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      {
        input: '1',
        expectedOutput: '["()"]',
      },
      {
        input: '2',
        expectedOutput: '["(())","()()"]',
      },
    ],
    starterCode: `function generateParenthesis(n) {
    // Your code here
}`,
    solutionCode: `function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}`,
    hints: [
      'Use backtracking with two counters: open and close parentheses',
      'Add opening parenthesis if open < n',
      'Add closing parenthesis if close < open',
      'Time complexity: O(4^n/√n), Space complexity: O(4^n/√n)',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-024',
    title: 'Subsets',
    description:
      'Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    difficulty: 'medium',
    category: 'Backtracking',
    tags: ['backtracking', 'array', 'bit-manipulation'],
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique.',
    ],
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
        explanation: 'All possible subsets of [1,2,3].',
      },
      {
        input: 'nums = [0]',
        output: '[[],[0]]',
        explanation: 'All possible subsets of [0].',
      },
    ],
    testCases: [
      {
        input: '[1,2,3]',
        expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      },
      {
        input: '[0]',
        expectedOutput: '[[],[0]]',
      },
      {
        input: '[1,2]',
        expectedOutput: '[[],[1],[2],[1,2]]',
      },
    ],
    starterCode: `function subsets(nums) {
    // Your code here
}`,
    solutionCode: `function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}`,
    hints: [
      'Use backtracking to generate all possible combinations',
      'For each element, choose to include or exclude it',
      'Add current subset to result at each step',
      'Time complexity: O(2^n), Space complexity: O(2^n)',
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

async function seedComprehensiveProblemSolvingTasks() {
  console.log('🌱 Starting comprehensive problem-solving tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of comprehensiveProblemSolvingTasks) {
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

  console.log('🎉 Comprehensive problem-solving tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(
    `   - Total processed: ${comprehensiveProblemSolvingTasks.length}`
  );
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log(
    '🚀 Starting comprehensive problem-solving tasks seeding process...'
  );

  try {
    await seedComprehensiveProblemSolvingTasks();

    console.log(
      '\\n🎉 All problem-solving tasks seeding completed successfully!'
    );
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
