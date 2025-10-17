import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problemSolvingTasks = [
  {
    title: 'Longest Substring Without Repeating Characters',
    category: 'Strings',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    functionName: 'lengthOfLongestSubstring',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      {
        input: 'abcabcbb',
        output: 3,
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 'bbbbb',
        output: 1,
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 'pwwkew',
        output: 3,
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
    // Your code here
    return 0;
}`,
    solution: `function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let start = 0;
    const charMap = new Map();
    
    for (let end = 0; end < s.length; end++) {
        if (charMap.has(s[end]) && charMap.get(s[end]) >= start) {
            start = charMap.get(s[end]) + 1;
        }
        charMap.set(s[end], end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}`,
    testCases: [
      { input: 'abcabcbb', expected: 3 },
      { input: 'bbbbb', expected: 1 },
      { input: 'pwwkew', expected: 3 },
      { input: '', expected: 0 },
      { input: 'a', expected: 1 },
      { input: 'abcdef', expected: 6 },
    ],
    hints: [
      'Use a sliding window approach with two pointers',
      'Use a hash map to track the last occurrence of each character',
      'Move the start pointer when a duplicate character is found',
      'Update the maximum length at each step',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n)) where m is the size of the charset',
  },
  {
    title: 'Container With Most Water',
    category: 'Arrays',
    description:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    difficulty: 'Medium',
    functionName: 'maxArea',
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    examples: [
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        output: 49,
        explanation:
          'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.',
      },
      {
        input: '[1,1]',
        output: 1,
        explanation: 'The max area is 1.',
      },
    ],
    starterCode: `function maxArea(height) {
    // Your code here
    return 0;
}`,
    solution: `function maxArea(height) {
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
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected: 49 },
      { input: '[1,1]', expected: 1 },
      { input: '[4,3,2,1,4]', expected: 16 },
      { input: '[1,2,1]', expected: 2 },
      { input: '[2,1]', expected: 1 },
    ],
    hints: [
      'Use two pointers approach starting from both ends',
      'Calculate area using the shorter of the two heights',
      'Move the pointer pointing to the shorter line',
      'Keep track of the maximum area found',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    title: '3Sum',
    category: 'Arrays',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    difficulty: 'Medium',
    functionName: 'threeSum',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    examples: [
      {
        input: '[-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation:
          'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].',
      },
      {
        input: '[0,1,1]',
        output: '[]',
        explanation: 'The only possible triplet does not sum up to 0.',
      },
      {
        input: '[0,0,0]',
        output: '[[0,0,0]]',
        explanation: 'The only possible triplet sums up to 0.',
      },
    ],
    starterCode: `function threeSum(nums) {
    // Your code here
    return [];
}`,
    solution: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
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
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[0,1,1]', expected: '[]' },
      { input: '[0,0,0]', expected: '[[0,0,0]]' },
      { input: '[-2,0,1,1,2]', expected: '[[-2,0,2],[-2,1,1]]' },
    ],
    hints: [
      'Sort the array first to handle duplicates easily',
      'Use three pointers: one fixed and two moving',
      'Skip duplicate values to avoid duplicate triplets',
      'Use two pointers technique for the inner loop',
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    title: 'Longest Palindromic Substring',
    category: 'Strings',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    difficulty: 'Medium',
    functionName: 'longestPalindrome',
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.',
    ],
    examples: [
      {
        input: 'babad',
        output: 'bab',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 'cbbd',
        output: 'bb',
        explanation: 'The longest palindromic substring is "bb".',
      },
      {
        input: 'a',
        output: 'a',
        explanation: 'The longest palindromic substring is "a".',
      },
    ],
    starterCode: `function longestPalindrome(s) {
    // Your code here
    return '';
}`,
    solution: `function longestPalindrome(s) {
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
        const len1 = expandAroundCenter(i, i); // odd length
        const len2 = expandAroundCenter(i, i + 1); // even length
        const len = Math.max(len1, len2);
        
        if (len > maxLength) {
            maxLength = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLength);
}`,
    testCases: [
      { input: 'babad', expected: 'bab' },
      { input: 'cbbd', expected: 'bb' },
      { input: 'a', expected: 'a' },
      { input: 'ac', expected: 'a' },
      { input: 'racecar', expected: 'racecar' },
    ],
    hints: [
      'Use expand around center approach',
      'Consider both odd and even length palindromes',
      'For each center, expand outward while characters match',
      'Keep track of the longest palindrome found',
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    title: 'Spiral Matrix',
    category: 'Arrays',
    description:
      'Given an m x n matrix, return all elements of the matrix in spiral order.',
    difficulty: 'Medium',
    functionName: 'spiralOrder',
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100',
    ],
    examples: [
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
        explanation: 'The matrix is traversed in spiral order.',
      },
      {
        input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation: 'The matrix is traversed in spiral order.',
      },
    ],
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
        // Traverse top row
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        
        // Traverse right column
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // Traverse bottom row (if exists)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }
        
        // Traverse left column (if exists)
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
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1,2,3,6,9,8,7,4,5]' },
      {
        input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        expected: '[1,2,3,4,8,12,11,10,9,5,6,7]',
      },
      { input: '[[1]]', expected: '[1]' },
      { input: '[[1,2],[3,4]]', expected: '[1,2,4,3]' },
    ],
    hints: [
      'Use four boundaries: top, bottom, left, right',
      'Traverse in four directions: right, down, left, up',
      'Update boundaries after each direction',
      'Stop when boundaries cross each other',
    ],
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(1)',
  },
  {
    title: 'Rotate Image',
    category: 'Arrays',
    description:
      'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.',
    difficulty: 'Medium',
    functionName: 'rotate',
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000',
    ],
    examples: [
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        output: '[[7,4,1],[8,5,2],[9,6,3]]',
        explanation: 'The matrix is rotated 90 degrees clockwise.',
      },
      {
        input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
        explanation: 'The matrix is rotated 90 degrees clockwise.',
      },
    ],
    starterCode: `function rotate(matrix) {
    // Your code here
    // Note: Modify the matrix in-place
}`,
    solution: `function rotate(matrix) {
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
    testCases: [
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        expected: '[[7,4,1],[8,5,2],[9,6,3]]',
      },
      {
        input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        expected: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
      },
      { input: '[[1]]', expected: '[[1]]' },
      { input: '[[1,2],[3,4]]', expected: '[[3,1],[4,2]]' },
    ],
    hints: [
      'Use two-step approach: transpose then reverse',
      'Transpose: swap matrix[i][j] with matrix[j][i]',
      'Reverse: reverse each row after transposition',
      'This approach works for any n x n matrix',
    ],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    title: 'Word Search',
    category: 'Backtracking',
    description:
      'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.',
    difficulty: 'Medium',
    functionName: 'exist',
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
        explanation: 'The word "ABCCED" exists in the board.',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: 'true',
        explanation: 'The word "SEE" exists in the board.',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: 'false',
        explanation: 'The word "ABCB" does not exist in the board.',
      },
    ],
    starterCode: `function exist(board, word) {
    // Your code here
    return false;
}`,
    solution: `function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    function dfs(row, col, index) {
        if (index === word.length) return true;
        if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
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
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    
    return false;
}`,
    testCases: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        expected: 'true',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        expected: 'true',
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        expected: 'false',
      },
      { input: 'board = [["A"]], word = "A"', expected: 'true' },
    ],
    hints: [
      'Use DFS with backtracking',
      'Mark visited cells temporarily',
      'Check all four directions from each cell',
      'Restore the original cell value after backtracking',
    ],
    timeComplexity: 'O(m * n * 4^L) where L is the length of the word',
    spaceComplexity: 'O(L) for the recursion stack',
  },
  {
    title: 'Generate Parentheses',
    category: 'Backtracking',
    description:
      'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    difficulty: 'Medium',
    functionName: 'generateParenthesis',
    constraints: ['1 <= n <= 8'],
    examples: [
      {
        input: '3',
        output: '["((()))","(()())","(())()","()(())","()()()"]',
        explanation:
          'All possible combinations of well-formed parentheses for n=3.',
      },
      {
        input: '1',
        output: '["()"]',
        explanation: 'The only possible combination for n=1.',
      },
    ],
    starterCode: `function generateParenthesis(n) {
    // Your code here
    return [];
}`,
    solution: `function generateParenthesis(n) {
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
    testCases: [
      {
        input: '3',
        expected: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      { input: '1', expected: '["()"]' },
      { input: '2', expected: '["(())","()()"]' },
    ],
    hints: [
      'Use backtracking with two counters: open and close',
      'Add opening parenthesis if open < n',
      'Add closing parenthesis if close < open',
      'Stop when current string length equals 2 * n',
    ],
    timeComplexity: 'O(4^n / √n)',
    spaceComplexity: 'O(4^n / √n)',
  },
  {
    title: 'Subsets',
    category: 'Backtracking',
    description:
      'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
    difficulty: 'Medium',
    functionName: 'subsets',
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique.',
    ],
    examples: [
      {
        input: '[1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
        explanation: 'All possible subsets of [1,2,3].',
      },
      {
        input: '[0]',
        output: '[[],[0]]',
        explanation: 'All possible subsets of [0].',
      },
    ],
    starterCode: `function subsets(nums) {
    // Your code here
    return [];
}`,
    solution: `function subsets(nums) {
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
    testCases: [
      {
        input: '[1,2,3]',
        expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      },
      { input: '[0]', expected: '[[],[0]]' },
      { input: '[1,2]', expected: '[[],[1],[2],[1,2]]' },
    ],
    hints: [
      'Use backtracking to generate all possible combinations',
      'Start with empty subset and add elements one by one',
      'Use index to avoid duplicates and maintain order',
      'Add current subset to result at each step',
    ],
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(2^n)',
  },
  {
    title: 'Copy List with Random Pointer',
    category: 'Linked List',
    description:
      'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.',
    difficulty: 'Medium',
    functionName: 'copyRandomList',
    constraints: [
      '0 <= n <= 1000',
      '-10^4 <= Node.val <= 10^4',
      'Node.random is null or is pointing to some node in the linked list.',
    ],
    examples: [
      {
        input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        explanation: 'A deep copy of the linked list with random pointers.',
      },
      {
        input: '[[1,1],[2,1]]',
        output: '[[1,1],[2,1]]',
        explanation: 'A deep copy of the linked list with random pointers.',
      },
      {
        input: '[[3,null],[3,0],[3,null]]',
        output: '[[3,null],[3,0],[3,null]]',
        explanation: 'A deep copy of the linked list with random pointers.',
      },
    ],
    starterCode: `function copyRandomList(head) {
    // Your code here
    return null;
}`,
    solution: `function copyRandomList(head) {
    if (!head) return null;
    
    const map = new Map();
    
    // First pass: create new nodes
    let current = head;
    while (current) {
        map.set(current, { val: current.val, next: null, random: null });
        current = current.next;
    }
    
    // Second pass: connect next and random pointers
    current = head;
    while (current) {
        const newNode = map.get(current);
        if (current.next) {
            newNode.next = map.get(current.next);
        }
        if (current.random) {
            newNode.random = map.get(current.random);
        }
        current = current.next;
    }
    
    return map.get(head);
}`,
    testCases: [
      {
        input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        expected: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
      },
      { input: '[[1,1],[2,1]]', expected: '[[1,1],[2,1]]' },
      {
        input: '[[3,null],[3,0],[3,null]]',
        expected: '[[3,null],[3,0],[3,null]]',
      },
      { input: '[]', expected: '[]' },
    ],
    hints: [
      'Use a hash map to store original node to new node mapping',
      'First pass: create all new nodes',
      'Second pass: connect next and random pointers',
      'Handle null cases for next and random pointers',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    title: 'Find the Duplicate Number',
    category: 'Arrays',
    description:
      'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, prove that at least one duplicate number must exist. Assume that there is only one duplicate number, return the duplicate one.',
    difficulty: 'Medium',
    functionName: 'findDuplicate',
    constraints: [
      '1 <= n <= 10^5',
      'nums.length == n + 1',
      '1 <= nums[i] <= n',
      'All the integers in nums appear only once except for precisely one integer which appears two or more times.',
    ],
    examples: [
      {
        input: '[1,3,4,2,2]',
        output: '2',
        explanation: 'The duplicate number is 2.',
      },
      {
        input: '[3,1,3,4,2]',
        output: '3',
        explanation: 'The duplicate number is 3.',
      },
      {
        input: '[1,1]',
        output: '1',
        explanation: 'The duplicate number is 1.',
      },
    ],
    starterCode: `function findDuplicate(nums) {
    // Your code here
    return 0;
}`,
    solution: `function findDuplicate(nums) {
    // Floyd's cycle detection algorithm
    let slow = nums[0];
    let fast = nums[0];
    
    // Phase 1: Find the intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Phase 2: Find the entrance to the cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}`,
    testCases: [
      { input: '[1,3,4,2,2]', expected: '2' },
      { input: '[3,1,3,4,2]', expected: '3' },
      { input: '[1,1]', expected: '1' },
      { input: '[1,1,2]', expected: '1' },
    ],
    hints: [
      "Use Floyd's cycle detection algorithm",
      'Treat the array as a linked list where nums[i] points to nums[nums[i]]',
      'Phase 1: Find intersection point using slow and fast pointers',
      'Phase 2: Find the entrance to the cycle',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];

async function seedProblemSolvingTasks() {
  console.log('🧮 Starting comprehensive problem-solving tasks seeding...\n');

  try {
    for (const task of problemSolvingTasks) {
      console.log(`📝 Adding problem: ${task.title}`);

      const taskData = {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        views: 0,
        completions: 0,
        averageRating: 0,
        tags: [task.category.toLowerCase(), task.difficulty.toLowerCase()],
        isPublished: true,
        featured: false,
        order: problemSolvingTasks.indexOf(task) + 1,
        author: 'Elzatona Team',
        company: 'Elzatona',
      };

      const docRef = await addDoc(
        collection(db, 'problemSolvingTasks'),
        taskData
      );
      console.log(`✅ Problem added with ID: ${docRef.id}`);
    }

    console.log(
      `\n🎉 Successfully seeded ${problemSolvingTasks.length} comprehensive problem-solving tasks!`
    );
    console.log('\n📊 Problem-Solving Tasks Summary:');
    console.log(`- Total Problems: ${problemSolvingTasks.length}`);
    console.log(`- Categories: Arrays, Strings, Backtracking, Linked List`);
    console.log(`- Difficulty Levels: Easy, Medium, Hard`);
    console.log(
      `- Average Test Cases: ${problemSolvingTasks.reduce((sum, task) => sum + task.testCases.length, 0) / problemSolvingTasks.length}`
    );
  } catch (error) {
    console.error('❌ Error seeding problem-solving tasks:', error);
  }
}

// Run the seeder
seedProblemSolvingTasks()
  .then(() => {
    console.log('\n✨ Problem-solving tasks seeding completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
