const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample problem-solving tasks based on Elzatona-web-ui Firebase data
const problemSolvingTasks = [
  {
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    category: 'Strings',
    function_name: 'lengthOfLongestSubstring',
    starter_code: `function lengthOfLongestSubstring(s) {
  // Your implementation here
  // Return the length of the longest substring without repeating characters
}`,
    solution: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
      left = charMap.get(s[right]) + 1;
    }
    charMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
    test_cases: JSON.stringify([
      {
        id: '1',
        input: ['abcabcbb'],
        expected: 3,
        isHidden: false,
      },
      {
        id: '2',
        input: ['bbbbb'],
        expected: 1,
        isHidden: false,
      },
      {
        id: '3',
        input: ['pwwkew'],
        expected: 3,
        isHidden: false,
      },
      {
        id: '4',
        input: [''],
        expected: 0,
        isHidden: true,
      },
    ]),
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces',
    ],
    examples: JSON.stringify([
      {
        input: 'abcabcbb',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 'bbbbb',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 'pwwkew',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ]),
    tags: ['strings', 'sliding-window', 'hash-table', 'two-pointers'],
  },
  {
    title: 'Container With Most Water',
    description:
      'Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, 0) and (i, ai). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.',
    difficulty: 'medium',
    category: 'Arrays',
    function_name: 'maxArea',
    starter_code: `function maxArea(height) {
  // Your implementation here
  // Return the maximum area of water that can be contained
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
        expected: 49,
        isHidden: false,
      },
      {
        id: '2',
        input: [[1, 1]],
        expected: 1,
        isHidden: false,
      },
      {
        id: '3',
        input: [[4, 3, 2, 1, 4]],
        expected: 16,
        isHidden: false,
      },
      {
        id: '4',
        input: [[1, 2, 1]],
        expected: 2,
        isHidden: true,
      },
    ]),
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    examples: JSON.stringify([
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation:
          'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.',
      },
      {
        input: '[1,1]',
        output: '1',
        explanation: 'The container can contain 1 unit of water.',
      },
    ]),
    tags: ['arrays', 'two-pointers', 'greedy'],
  },
  {
    title: '3Sum',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    difficulty: 'medium',
    category: 'Arrays',
    function_name: 'threeSum',
    starter_code: `function threeSum(nums) {
  // Your implementation here
  // Return an array of all unique triplets that sum to zero
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
        isHidden: false,
      },
      {
        id: '2',
        input: [[0, 1, 1]],
        expected: [],
        isHidden: false,
      },
      {
        id: '3',
        input: [[0, 0, 0]],
        expected: [[0, 0, 0]],
        isHidden: false,
      },
      {
        id: '4',
        input: [[-2, 0, 1, 1, 2]],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
        isHidden: true,
      },
    ]),
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    examples: JSON.stringify([
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
    ]),
    tags: ['arrays', 'two-pointers', 'sorting'],
  },
  {
    title: 'Longest Palindromic Substring',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    difficulty: 'medium',
    category: 'Strings',
    function_name: 'longestPalindrome',
    starter_code: `function longestPalindrome(s) {
  // Your implementation here
  // Return the longest palindromic substring
}`,
    solution: `function longestPalindrome(s) {
  if (!s || s.length < 1) return '';
  
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}`,
    test_cases: JSON.stringify([
      {
        id: '1',
        input: ['babad'],
        expected: 'bab',
        isHidden: false,
      },
      {
        id: '2',
        input: ['cbbd'],
        expected: 'bb',
        isHidden: false,
      },
      {
        id: '3',
        input: ['a'],
        expected: 'a',
        isHidden: false,
      },
      {
        id: '4',
        input: ['ac'],
        expected: 'a',
        isHidden: true,
      },
    ]),
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters',
    ],
    examples: JSON.stringify([
      {
        input: 'babad',
        output: 'bab',
        explanation: 'Note that "aba" is also a valid answer.',
      },
      {
        input: 'cbbd',
        output: 'bb',
        explanation: 'The longest palindromic substring is "bb".',
      },
      {
        input: 'a',
        output: 'a',
        explanation: 'The string itself is a palindrome.',
      },
    ]),
    tags: ['strings', 'dynamic-programming', 'palindrome'],
  },
  {
    title: 'Spiral Matrix',
    description:
      'Given an m x n matrix, return all elements of the matrix in spiral order.',
    difficulty: 'medium',
    category: 'Arrays',
    function_name: 'spiralOrder',
    starter_code: `function spiralOrder(matrix) {
  // Your implementation here
  // Return all elements of the matrix in spiral order
}`,
    solution: `function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) return [];
  
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        isHidden: false,
      },
      {
        id: '2',
        input: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
          ],
        ],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        isHidden: false,
      },
      {
        id: '3',
        input: [[[1]]],
        expected: [1],
        isHidden: false,
      },
      {
        id: '4',
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [1, 2, 4, 3],
        isHidden: true,
      },
    ]),
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100',
    ],
    examples: JSON.stringify([
      {
        input: '[[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
        explanation:
          'The matrix is traversed in spiral order: 1→2→3→6→9→8→7→4→5',
      },
      {
        input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]',
        output: '[1,2,3,4,8,12,11,10,9,5,6,7]',
        explanation:
          'The matrix is traversed in spiral order: 1→2→3→4→8→12→11→10→9→5→6→7',
      },
    ]),
    tags: ['arrays', 'matrix', 'simulation'],
  },
  {
    title: 'Rotate Image',
    description:
      'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.',
    difficulty: 'medium',
    category: 'Arrays',
    function_name: 'rotate',
    starter_code: `function rotate(matrix) {
  // Your implementation here
  // Rotate the matrix 90 degrees clockwise in-place
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3],
        ],
        isHidden: false,
      },
      {
        id: '2',
        input: [
          [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
          ],
        ],
        expected: [
          [15, 13, 2, 5],
          [14, 3, 4, 1],
          [12, 6, 8, 9],
          [16, 7, 10, 11],
        ],
        isHidden: false,
      },
      {
        id: '3',
        input: [[[1]]],
        expected: [[1]],
        isHidden: false,
      },
      {
        id: '4',
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [
          [3, 1],
          [4, 2],
        ],
        isHidden: true,
      },
    ]),
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000',
    ],
    examples: JSON.stringify([
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
    ]),
    tags: ['arrays', 'matrix', 'math'],
  },
  {
    title: 'Word Search',
    description:
      'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.',
    difficulty: 'medium',
    category: 'Backtracking',
    function_name: 'exist',
    starter_code: `function exist(board, word) {
  // Your implementation here
  // Return true if word exists in the board
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'ABCCED',
        ],
        expected: true,
        isHidden: false,
      },
      {
        id: '2',
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'SEE',
        ],
        expected: true,
        isHidden: false,
      },
      {
        id: '3',
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'ABCB',
        ],
        expected: false,
        isHidden: false,
      },
      {
        id: '4',
        input: [[['A']], 'A'],
        expected: true,
        isHidden: true,
      },
    ]),
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters',
    ],
    examples: JSON.stringify([
      {
        input:
          '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"',
        output: 'true',
        explanation: 'The word "ABCCED" can be found in the board.',
      },
      {
        input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"',
        output: 'true',
        explanation: 'The word "SEE" can be found in the board.',
      },
    ]),
    tags: ['backtracking', 'matrix', 'dfs'],
  },
  {
    title: 'Generate Parentheses',
    description:
      'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    difficulty: 'medium',
    category: 'Backtracking',
    function_name: 'generateParenthesis',
    starter_code: `function generateParenthesis(n) {
  // Your implementation here
  // Return an array of all well-formed parentheses combinations
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [3],
        expected: ['((()))', '(()())', '(())()', '()(())', '()()()'],
        isHidden: false,
      },
      {
        id: '2',
        input: [1],
        expected: ['()'],
        isHidden: false,
      },
      {
        id: '3',
        input: [2],
        expected: ['(())', '()()'],
        isHidden: false,
      },
      {
        id: '4',
        input: [0],
        expected: [''],
        isHidden: true,
      },
    ]),
    constraints: ['1 <= n <= 8'],
    examples: JSON.stringify([
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
    ]),
    tags: ['backtracking', 'recursion', 'strings'],
  },
  {
    title: 'Subsets',
    description:
      'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
    difficulty: 'medium',
    category: 'Backtracking',
    function_name: 'subsets',
    starter_code: `function subsets(nums) {
  // Your implementation here
  // Return all possible subsets of the array
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [[1, 2, 3]],
        expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        isHidden: false,
      },
      {
        id: '2',
        input: [[0]],
        expected: [[], [0]],
        isHidden: false,
      },
      {
        id: '3',
        input: [[1, 2]],
        expected: [[], [1], [2], [1, 2]],
        isHidden: false,
      },
      {
        id: '4',
        input: [[]],
        expected: [[]],
        isHidden: true,
      },
    ]),
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique',
    ],
    examples: JSON.stringify([
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
    ]),
    tags: ['backtracking', 'recursion', 'arrays'],
  },
  {
    title: 'Copy List with Random Pointer',
    description:
      'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.',
    difficulty: 'medium',
    category: 'Linked List',
    function_name: 'copyRandomList',
    starter_code: `function copyRandomList(head) {
  // Your implementation here
  // Return a deep copy of the linked list with random pointers
}`,
    solution: `function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();
  let current = head;

  // First pass: create new nodes and map old to new
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }

  // Second pass: set next and random pointers
  current = head;
  while (current) {
    const newNode = map.get(current);
    if (current.next) newNode.next = map.get(current.next);
    if (current.random) newNode.random = map.get(current.random);
    current = current.next;
  }

  return map.get(head);
}`,
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [
          [
            [7, null],
            [13, 0],
            [11, 4],
            [10, 2],
            [1, 0],
          ],
        ],
        expected: [
          [7, null],
          [13, 0],
          [11, 4],
          [10, 2],
          [1, 0],
        ],
        isHidden: false,
      },
      {
        id: '2',
        input: [
          [
            [1, 1],
            [2, 1],
          ],
        ],
        expected: [
          [1, 1],
          [2, 1],
        ],
        isHidden: false,
      },
      {
        id: '3',
        input: [
          [
            [3, null],
            [3, 0],
            [3, null],
          ],
        ],
        expected: [
          [3, null],
          [3, 0],
          [3, null],
        ],
        isHidden: false,
      },
      {
        id: '4',
        input: [null],
        expected: null,
        isHidden: true,
      },
    ]),
    constraints: [
      '0 <= n <= 1000',
      '-10^4 <= Node.val <= 10^4',
      'Node.random is null or is pointing to some node in the linked list',
    ],
    examples: JSON.stringify([
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
    ]),
    tags: ['linked-list', 'hash-table', 'recursion'],
  },
  {
    title: 'Find the Duplicate Number',
    description:
      'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.',
    difficulty: 'medium',
    category: 'Arrays',
    function_name: 'findDuplicate',
    starter_code: `function findDuplicate(nums) {
  // Your implementation here
  // Return the duplicate number
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
    test_cases: JSON.stringify([
      {
        id: '1',
        input: [[1, 3, 4, 2, 2]],
        expected: 2,
        isHidden: false,
      },
      {
        id: '2',
        input: [[3, 1, 3, 4, 2]],
        expected: 3,
        isHidden: false,
      },
      {
        id: '3',
        input: [[1, 1]],
        expected: 1,
        isHidden: false,
      },
      {
        id: '4',
        input: [[1, 1, 2]],
        expected: 1,
        isHidden: true,
      },
    ]),
    constraints: [
      '1 <= n <= 10^5',
      'nums.length == n + 1',
      '1 <= nums[i] <= n',
      'All the integers in nums appear only once except for precisely one integer which appears two or more times',
    ],
    examples: JSON.stringify([
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
    ]),
    tags: ['arrays', 'two-pointers', 'binary-search', 'floyd-cycle-detection'],
  },
];

async function seedProblemSolvingTasks() {
  console.log('🚀 Starting to seed problem-solving tasks...');

  try {
    // Insert problem-solving tasks
    const { data, error } = await supabase
      .from('problem_solving_tasks')
      .insert(problemSolvingTasks);

    if (error) {
      console.error('❌ Error seeding problem-solving tasks:', error);
      return;
    }

    console.log(
      `✅ Successfully seeded ${problemSolvingTasks.length} problem-solving tasks!`
    );

    // Verify the data was inserted
    const { data: insertedTasks, error: fetchError } = await supabase
      .from('problem_solving_tasks')
      .select('id, title, category, difficulty')
      .eq('is_active', true);

    if (fetchError) {
      console.error('❌ Error fetching inserted tasks:', fetchError);
      return;
    }

    console.log('📊 Inserted tasks summary:');
    console.table(insertedTasks);

    // Show category breakdown
    const categoryBreakdown = insertedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    console.log('📈 Category breakdown:', categoryBreakdown);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the seeding function
seedProblemSolvingTasks();
