const fs = require('fs');
const path = require('path');

/**
 * Generate frontend-focused problem-solving questions
 * Based on LeetCode patterns but tailored for frontend developers
 */

const outputFile = path.join(
  __dirname,
  '../final-questions-v01/problem-solving-questions.json'
);
const batchesDir = path.join(__dirname, 'problem-solving-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

function formatCode(content) {
  if (!content) return '';
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) return match;
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });
  return content;
}

function generateQuestion(
  id,
  title,
  content,
  difficulty,
  options,
  explanation,
  codeExample = ''
) {
  return {
    id: `problem-solving-${id}`,
    title: title,
    content: formatCode(content + (codeExample ? '\n\n' + codeExample : '')),
    type: 'multiple-choice',
    category: 'Problem Solving',
    topic: difficulty === 'easy' ? 'Easy Problems' : 'Medium Problems',
    difficulty: difficulty,
    learningCardId: 'problem-solving',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['problem-solving', 'algorithms', 'javascript', difficulty],
    explanation: formatCode(explanation),
    points: difficulty === 'easy' ? 10 : 15,
    options: options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : '',
    })),
    hints: [
      'Think about the time and space complexity',
      'Consider edge cases (empty arrays, single elements, etc.)',
      'Try to solve it step by step',
    ],
    metadata: {},
  };
}

// Generate frontend-focused problem-solving questions
const questions = [];

// ========== EASY PROBLEMS ==========

// 1. Two Sum (Frontend context: finding matching pairs in form validation)
questions.push(
  generateQuestion(
    'easy-1',
    'Find Two Numbers That Add Up to Target',
    'Given an array of numbers and a target sum, find two numbers that add up to the target. Return their indices.\n\nExample: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (because 2 + 7 = 9)',
    'easy',
    [
      {
        text: 'Use a hash map to store complements. Iterate once, checking if complement exists. Time: O(n), Space: O(n)',
        isCorrect: true,
      },
      {
        text: 'Use nested loops to check all pairs. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Sort the array first, then use two pointers. Time: O(n log n), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use recursion to check all combinations. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Use a hash map (object) to store each number and its index. For each number, check if the complement (target - current number) exists in the map. This gives O(n) time complexity.'
  )
);

// 2. Valid Parentheses (Frontend context: validating HTML/JSX structure)
questions.push(
  generateQuestion(
    'easy-2',
    'Validate Balanced Parentheses',
    'Given a string containing only parentheses, brackets, and braces, determine if the string is valid (properly closed).\n\nExample: "()[]{}" → true, "([)]" → false',
    'easy',
    [
      {
        text: 'Use a stack. Push opening brackets, pop when matching closing bracket. Check if stack is empty at end. Time: O(n), Space: O(n)',
        isCorrect: true,
      },
      {
        text: "Count opening and closing brackets. If counts match, it's valid. Time: O(n), Space: O(1)",
        isCorrect: false,
      },
      {
        text: 'Use regex to remove pairs repeatedly until no more pairs. Time: O(n²), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Check if string length is even. Time: O(1), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Use a stack data structure. Push opening brackets onto the stack. When encountering a closing bracket, check if it matches the top of the stack. If stack is empty at the end, the string is valid.'
  )
);

// 3. Reverse String (Frontend context: string manipulation in UI)
questions.push(
  generateQuestion(
    'easy-3',
    'Reverse a String',
    'Given a string, reverse it in-place (if array) or return reversed string.\n\nExample: "hello" → "olleh"',
    'easy',
    [
      {
        text: 'Use two pointers from start and end, swap characters. Time: O(n), Space: O(1) for array, O(n) for string',
        isCorrect: true,
      },
      {
        text: 'Create new string by iterating backwards. Time: O(n), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Use built-in reverse() method. Time: O(n), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Use recursion to swap characters. Time: O(n), Space: O(n)',
        isCorrect: false,
      },
    ],
    'For arrays, use two pointers (start and end) and swap characters while moving pointers towards center. For strings in JavaScript, convert to array first since strings are immutable.'
  )
);

// 4. Contains Duplicate (Frontend context: checking for duplicate IDs in lists)
questions.push(
  generateQuestion(
    'easy-4',
    'Check for Duplicate Values',
    'Given an array, determine if any value appears at least twice.\n\nExample: [1, 2, 3, 1] → true',
    'easy',
    [
      {
        text: 'Use a Set to track seen values. If value exists in Set, return true. Time: O(n), Space: O(n)',
        isCorrect: true,
      },
      {
        text: 'Sort array and check adjacent elements. Time: O(n log n), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use nested loops to compare all pairs. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use filter and length comparison. Time: O(n), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Use a Set data structure. Iterate through the array, adding each element to the Set. If an element already exists in the Set, return true. This is the most efficient approach.'
  )
);

// 5. Best Time to Buy and Sell Stock (Frontend context: price tracking in dashboards)
questions.push(
  generateQuestion(
    'easy-5',
    'Find Maximum Profit from Stock Prices',
    'Given an array of stock prices, find the maximum profit from buying and selling once.\n\nExample: [7, 1, 5, 3, 6, 4] → 5 (buy at 1, sell at 6)',
    'easy',
    [
      {
        text: 'Track minimum price seen so far. For each price, calculate profit and update max profit. Time: O(n), Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Try all buy-sell pairs using nested loops. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Find min and max values. Time: O(n), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Sort prices and find difference. Time: O(n log n), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Keep track of the minimum price encountered so far. For each day, calculate the profit if selling today (current price - min price) and update the maximum profit seen.'
  )
);

// 6. Valid Anagram (Frontend context: search/filter functionality)
questions.push(
  generateQuestion(
    'easy-6',
    'Check if Two Strings are Anagrams',
    'Given two strings, determine if they are anagrams (same characters, different order).\n\nExample: "listen" and "silent" → true',
    'easy',
    [
      {
        text: 'Sort both strings and compare. Time: O(n log n), Space: O(n)',
        isCorrect: true,
      },
      {
        text: 'Count character frequencies using hash map. Compare counts. Time: O(n), Space: O(1) - limited alphabet',
        isCorrect: true,
      },
      {
        text: 'Use nested loops to check each character. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Compare string lengths only. Time: O(1), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Two approaches: 1) Sort both strings and compare (simpler). 2) Count character frequencies using a hash map (more efficient for large strings). Both are valid solutions.'
  )
);

// 7. Maximum Subarray (Frontend context: finding best segment in data visualization)
questions.push(
  generateQuestion(
    'easy-7',
    'Find Maximum Sum Subarray',
    'Given an array of integers, find the contiguous subarray with the largest sum.\n\nExample: [-2, 1, -3, 4, -1, 2, 1, -5, 4] → 6 ([4, -1, 2, 1])',
    'easy',
    [
      {
        text: "Kadane's algorithm: track current sum and max sum. Reset current sum if negative. Time: O(n), Space: O(1)",
        isCorrect: true,
      },
      {
        text: 'Try all possible subarrays using nested loops. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use divide and conquer approach. Time: O(n log n), Space: O(log n)',
        isCorrect: false,
      },
      {
        text: 'Find sum of all positive numbers. Time: O(n), Space: O(1)',
        isCorrect: false,
      },
    ],
    "Kadane's algorithm: iterate through array, maintaining current sum. If current sum becomes negative, reset it to 0. Keep track of maximum sum seen so far."
  )
);

// 8. Merge Sorted Arrays (Frontend context: combining sorted lists in UI)
questions.push(
  generateQuestion(
    'easy-8',
    'Merge Two Sorted Arrays',
    'Given two sorted arrays, merge them into one sorted array.\n\nExample: [1, 2, 3] and [2, 5, 6] → [1, 2, 2, 3, 5, 6]',
    'easy',
    [
      {
        text: 'Use two pointers, compare elements and add smaller one. Time: O(n + m), Space: O(n + m)',
        isCorrect: true,
      },
      {
        text: 'Concatenate and sort. Time: O((n+m) log(n+m)), Space: O(n+m)',
        isCorrect: false,
      },
      {
        text: 'Use nested loops to insert elements. Time: O(n*m), Space: O(n+m)',
        isCorrect: false,
      },
      {
        text: 'Use Set to remove duplicates then sort. Time: O((n+m) log(n+m)), Space: O(n+m)',
        isCorrect: false,
      },
    ],
    'Use two pointers, one for each array. Compare elements at both pointers, add the smaller one to result, and advance that pointer. Continue until both arrays are processed.'
  )
);

// 9. Climbing Stairs (Frontend context: dynamic UI transitions)
questions.push(
  generateQuestion(
    'easy-9',
    'Count Ways to Climb Stairs',
    'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb?\n\nExample: n = 3 → 3 ways (1+1+1, 1+2, 2+1)',
    'easy',
    [
      {
        text: 'Use dynamic programming: ways[i] = ways[i-1] + ways[i-2]. Time: O(n), Space: O(n) or O(1) with optimization',
        isCorrect: true,
      },
      {
        text: 'Use recursion without memoization. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Try all possible combinations. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Use factorial calculation. Time: O(n), Space: O(1)',
        isCorrect: false,
      },
    ],
    'This is a Fibonacci sequence problem. Use dynamic programming: ways to reach step i = ways to reach step (i-1) + ways to reach step (i-2). Can optimize space to O(1) by only keeping last two values.'
  )
);

// 10. Palindrome Number (Frontend context: input validation)
questions.push(
  generateQuestion(
    'easy-10',
    'Check if Number is Palindrome',
    'Determine if an integer is a palindrome (reads same forwards and backwards).\n\nExample: 121 → true, -121 → false',
    'easy',
    [
      {
        text: 'Reverse half of the number and compare with other half. Time: O(log n), Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Convert to string and check if reversed equals original. Time: O(log n), Space: O(log n)',
        isCorrect: true,
      },
      {
        text: 'Use modulo and division to extract digits. Time: O(log n), Space: O(log n)',
        isCorrect: false,
      },
      {
        text: 'Compare first and last digit only. Time: O(1), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Two approaches: 1) Convert to string and compare with reversed version. 2) Reverse half the number mathematically and compare with the other half (more efficient, no string conversion).'
  )
);

// ========== MEDIUM PROBLEMS ==========

// 11. Longest Substring Without Repeating Characters (Frontend context: finding unique segments)
questions.push(
  generateQuestion(
    'medium-1',
    'Find Longest Substring Without Repeating Characters',
    'Given a string, find the length of the longest substring without repeating characters.\n\nExample: "abcabcbb" → 3 ("abc")',
    'medium',
    [
      {
        text: 'Use sliding window with hash map. Expand window, shrink when duplicate found. Time: O(n), Space: O(min(n, m)) where m is charset size',
        isCorrect: true,
      },
      {
        text: 'Check all possible substrings. Time: O(n³), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Use Set and check each substring. Time: O(n²), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Sort characters and find longest sequence. Time: O(n log n), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Use sliding window technique with a hash map. Expand window by moving right pointer, track characters in current window. When duplicate found, move left pointer past the duplicate. Track maximum window size.'
  )
);

// 12. Container With Most Water (Frontend context: layout optimization)
questions.push(
  generateQuestion(
    'medium-2',
    'Find Container With Most Water',
    'Given an array of heights, find two lines that together with x-axis form a container that holds the most water.\n\nExample: [1, 8, 6, 2, 5, 4, 8, 3, 7] → 49',
    'medium',
    [
      {
        text: 'Use two pointers at start and end. Move pointer with smaller height. Calculate area and track max. Time: O(n), Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Try all pairs of lines. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Find two tallest lines. Time: O(n), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Sort heights and use top two. Time: O(n log n), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Use two pointers technique: start with pointers at both ends. Calculate area (min(height[left], height[right]) * (right - left)). Move the pointer with smaller height inward, as moving the larger one cannot increase area.'
  )
);

// 13. Three Sum (Frontend context: finding combinations in filters)
questions.push(
  generateQuestion(
    'medium-3',
    'Find All Unique Triplets That Sum to Zero',
    'Given an array, find all unique triplets that sum to zero.\n\nExample: [-1, 0, 1, 2, -1, -4] → [[-1, -1, 2], [-1, 0, 1]]',
    'medium',
    [
      {
        text: 'Sort array. For each element, use two pointers to find pairs that sum to negative of current element. Skip duplicates. Time: O(n²), Space: O(1) excluding output',
        isCorrect: true,
      },
      {
        text: 'Use three nested loops. Time: O(n³), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use hash map for all pairs, then check for third element. Time: O(n²), Space: O(n²)',
        isCorrect: false,
      },
      {
        text: 'Find all combinations using recursion. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Sort the array first. For each element, use two pointers (left and right) to find pairs that sum to the negative of the current element. Skip duplicate values to avoid duplicate triplets.'
  )
);

// 14. Group Anagrams (Frontend context: organizing data in UI)
questions.push(
  generateQuestion(
    'medium-4',
    'Group Strings by Anagram',
    'Given an array of strings, group anagrams together.\n\nExample: ["eat", "tea", "tan", "ate", "nat", "bat"] → [["eat","tea","ate"], ["tan","nat"], ["bat"]]',
    'medium',
    [
      {
        text: 'Use sorted string as key in hash map. Group strings with same sorted key. Time: O(n*k log k) where k is avg string length, Space: O(n*k)',
        isCorrect: true,
      },
      {
        text: 'Compare each string with all others. Time: O(n²*k), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Use character frequency as key. Time: O(n*k), Space: O(n*k)',
        isCorrect: true,
      },
      {
        text: 'Sort entire array and group adjacent anagrams. Time: O(n*k log(n*k)), Space: O(n*k)',
        isCorrect: false,
      },
    ],
    'Two approaches: 1) Sort each string and use sorted string as key in hash map. 2) Use character frequency count as key (more efficient). Group strings with same key together.'
  )
);

// 15. Longest Palindromic Substring (Frontend context: text processing)
questions.push(
  generateQuestion(
    'medium-5',
    'Find Longest Palindromic Substring',
    'Given a string, find the longest palindromic substring.\n\nExample: "babad" → "bab" or "aba"',
    'medium',
    [
      {
        text: 'Expand around center for each possible center (odd and even length). Track longest. Time: O(n²), Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Check all possible substrings. Time: O(n³), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use dynamic programming. Time: O(n²), Space: O(n²)',
        isCorrect: true,
      },
      {
        text: 'Reverse string and find longest common substring. Time: O(n²), Space: O(n²)',
        isCorrect: false,
      },
    ],
    'Expand around center: for each possible center (considering both odd and even length palindromes), expand outward while characters match. Track the longest palindrome found. More space-efficient than DP.'
  )
);

// 16. Product of Array Except Self (Frontend context: calculations in dashboards)
questions.push(
  generateQuestion(
    'medium-6',
    'Product of Array Except Self',
    'Given an array, return an array where each element is the product of all other elements (without using division).\n\nExample: [1, 2, 3, 4] → [24, 12, 8, 6]',
    'medium',
    [
      {
        text: 'Two passes: left products, then right products. Multiply corresponding elements. Time: O(n), Space: O(1) excluding output',
        isCorrect: true,
      },
      {
        text: 'Calculate product of all elements, divide by each element. Time: O(n), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'For each element, calculate product of all others. Time: O(n²), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Use nested loops to calculate products. Time: O(n²), Space: O(n)',
        isCorrect: false,
      },
    ],
    'Use two passes: first pass calculates left products (product of all elements to the left), second pass multiplies by right products (product of all elements to the right). This avoids division and handles zeros.'
  )
);

// 17. Valid Sudoku (Frontend context: form validation)
questions.push(
  generateQuestion(
    'medium-7',
    'Validate Sudoku Board',
    'Determine if a 9x9 Sudoku board is valid (no duplicates in rows, columns, or 3x3 boxes).\n\nExample: Valid board returns true',
    'medium',
    [
      {
        text: 'Use three sets of hash maps: one for rows, one for columns, one for boxes. Check each cell against all three. Time: O(1) - fixed 81 cells, Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Check each row, column, and box separately. Time: O(1), Space: O(1)',
        isCorrect: true,
      },
      {
        text: 'Use nested loops to check all combinations. Time: O(n⁴), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Sort each row, column, and box. Time: O(1), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Use hash sets to track seen numbers in each row, column, and 3x3 box. For each cell, check if the number exists in the corresponding row, column, and box sets. Since board is fixed 9x9, complexity is O(1).'
  )
);

// 18. Longest Increasing Subsequence (Frontend context: finding trends in data)
questions.push(
  generateQuestion(
    'medium-8',
    'Find Longest Increasing Subsequence',
    'Given an array, find the length of the longest strictly increasing subsequence.\n\nExample: [10, 9, 2, 5, 3, 7, 101, 18] → 4 ([2, 3, 7, 101])',
    'medium',
    [
      {
        text: 'Use dynamic programming: dp[i] = length of LIS ending at i. Time: O(n²), Space: O(n)',
        isCorrect: true,
      },
      {
        text: 'Use binary search with patience sorting. Maintain array of smallest tail of increasing subsequences. Time: O(n log n), Space: O(n)',
        isCorrect: true,
      },
      {
        text: 'Try all possible subsequences. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Sort array and find longest consecutive sequence. Time: O(n log n), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Two approaches: 1) DP: for each element, check all previous elements and update LIS length. 2) Binary search: maintain array of smallest tail values, use binary search to find insertion point (more efficient O(n log n)).'
  )
);

// 19. Coin Change (Frontend context: payment calculations)
questions.push(
  generateQuestion(
    'medium-9',
    'Minimum Coins to Make Amount',
    'Given coins of different denominations and a total amount, find the minimum number of coins needed.\n\nExample: coins = [1, 2, 5], amount = 11 → 3 (5 + 5 + 1)',
    'medium',
    [
      {
        text: 'Use dynamic programming: dp[i] = min coins for amount i. For each coin, update dp[i + coin]. Time: O(amount * coins.length), Space: O(amount)',
        isCorrect: true,
      },
      {
        text: 'Use greedy: always pick largest coin. Time: O(amount), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Try all combinations using recursion. Time: O(2ⁿ), Space: O(n)',
        isCorrect: false,
      },
      {
        text: 'Sort coins and use largest first. Time: O(n log n), Space: O(1)',
        isCorrect: false,
      },
    ],
    'Use dynamic programming: create array dp where dp[i] represents minimum coins for amount i. Initialize dp[0] = 0. For each coin, update dp[i + coin] = min(dp[i + coin], dp[i] + 1).'
  )
);

// 20. Word Search (Frontend context: search functionality in grids)
questions.push(
  generateQuestion(
    'medium-10',
    'Find Word in 2D Grid',
    'Given a 2D board and a word, determine if the word exists in the board (can move horizontally or vertically).\n\nExample: board with "ABCE", "SFCS", "ADEE" and word "ABCCED" → true',
    'medium',
    [
      {
        text: 'Use backtracking with DFS. For each cell, explore all directions, mark visited, backtrack. Time: O(m*n*4^L) where L is word length, Space: O(L)',
        isCorrect: true,
      },
      {
        text: 'Try all possible paths using BFS. Time: O(m*n*4^L), Space: O(m*n)',
        isCorrect: false,
      },
      {
        text: 'Check each cell independently. Time: O(m*n*L), Space: O(1)',
        isCorrect: false,
      },
      {
        text: 'Convert board to string and search. Time: O(m*n), Space: O(m*n)',
        isCorrect: false,
      },
    ],
    'Use backtracking with DFS: for each cell matching first character, recursively search in all 4 directions. Mark cells as visited during recursion, unmark during backtracking. Return true if word found.'
  )
);

console.log(`\n✅ Generated ${questions.length} problem-solving questions\n`);

// Group by difficulty
const easy = questions.filter(q => q.difficulty === 'easy');
const medium = questions.filter(q => q.difficulty === 'medium');

console.log(`📊 Breakdown:`);
console.log(`  Easy: ${easy.length} questions`);
console.log(`  Medium: ${medium.length} questions\n`);

// Create batch scripts (3 questions per batch)
let batchNum = 1;
for (let i = 0; i < questions.length; i += 3) {
  const batch = questions.slice(i, i + 3);
  const batchFileName = path.join(batchesDir, `batch${batchNum}.js`);

  const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/problem-solving-questions.json');

const newQuestions = ${JSON.stringify(batch, null, 2)};

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(\`✅ Added \${newQuestions.length} problem-solving questions (Batch ${batchNum})\`);
console.log(\`📝 Total Problem Solving questions: \${existingQuestions.length}\`);
`;

  fs.writeFileSync(batchFileName, scriptContent);
  batchNum++;
}

console.log(`✅ Created ${batchNum - 1} batch scripts in ${batchesDir}`);

// Create master runner script
const masterRunner = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const batchesDir = __dirname;
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.startsWith('batch') && f.endsWith('.js'))
  .sort((a, b) => parseInt(a.match(/\\d+/)?.[0] || 0) - parseInt(b.match(/\\d+/)?.[0] || 0));

console.log(\`🚀 Running \${batches.length} problem-solving question batches...\\n\`);

let successCount = 0;
let errorCount = 0;

batches.forEach((batchFile, index) => {
  const batchPath = path.join(batchesDir, batchFile);
  try {
    process.stdout.write(\`[\${index + 1}/\${batches.length}] \${batchFile}... \`);
    execSync(\`node "\${batchPath}"\`, { stdio: 'pipe', cwd: __dirname });
    process.stdout.write('✅\\n');
    successCount++;
  } catch (error) {
    process.stdout.write('❌\\n');
    errorCount++;
  }
  
  if ((index + 1) % 5 === 0) {
    console.log(\`\\n📊 Progress: \${index + 1}/\${batches.length} batches\\n\`);
  }
});

console.log(\`\\n✅ All batches completed! \${successCount} success, \${errorCount} errors\`);
`;

fs.writeFileSync(path.join(batchesDir, 'run_all_batches.js'), masterRunner);
console.log(
  `✅ Created master runner: ${path.join(batchesDir, 'run_all_batches.js')}\n`
);
