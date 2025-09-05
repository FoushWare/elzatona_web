'use client';

import { useState } from 'react';

interface AlgorithmProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  estimatedTime: string;
  tags: string[];
  completed?: boolean;
  leetcodeUrl?: string;
}

const algorithmProblems: AlgorithmProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    category: 'Array',
    estimatedTime: '15 min',
    tags: ['Array', 'Hash Table', 'Two Pointers'],
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: 'Easy',
    category: 'Stack',
    estimatedTime: '20 min',
    tags: ['Stack', 'String', 'Matching'],
  },
  {
    id: '3',
    title: 'Merge Two Sorted Lists',
    description:
      'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
    difficulty: 'Easy',
    category: 'Linked List',
    estimatedTime: '25 min',
    tags: ['Linked List', 'Recursion', 'Merge'],
  },
  {
    id: '4',
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    estimatedTime: '30 min',
    tags: ['Array', 'Dynamic Programming', "Kadane's Algorithm"],
  },
  {
    id: '5',
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    estimatedTime: '20 min',
    tags: ['Dynamic Programming', 'Fibonacci', 'Math'],
  },
  {
    id: '6',
    title: 'Best Time to Buy and Sell Stock',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    difficulty: 'Easy',
    category: 'Array',
    estimatedTime: '25 min',
    tags: ['Array', 'Dynamic Programming', 'Greedy'],
  },
  {
    id: '7',
    title: 'Maximum Depth of Binary Tree',
    description:
      "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '15 min',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
  },
  {
    id: '8',
    title: 'Symmetric Tree',
    description:
      'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '20 min',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
  },
  {
    id: '9',
    title: 'Path Sum',
    description:
      'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '20 min',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
  },
  {
    id: '10',
    title: 'Binary Tree Inorder Traversal',
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '15 min',
    tags: ['Tree', 'Stack', 'Depth-First Search'],
  },
  {
    id: '11',
    title: 'Same Tree',
    description:
      'Given the roots of two binary trees p and q, write a function to check if they are the same or not.',
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '15 min',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
  },
  {
    id: '12',
    title: 'Invert Binary Tree',
    description:
      'Given the root of a binary tree, invert the tree, and return its root.',
    difficulty: 'Easy',
    category: 'Tree',
    estimatedTime: '20 min',
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search'],
  },
  {
    id: '13',
    title: 'Longest Common Prefix',
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    difficulty: 'Easy',
    category: 'String',
    estimatedTime: '25 min',
    tags: ['String', 'Trie', 'Sorting'],
  },
  {
    id: '14',
    title: 'Roman to Integer',
    description: 'Given a roman numeral, convert it to an integer.',
    difficulty: 'Easy',
    category: 'String',
    estimatedTime: '20 min',
    tags: ['String', 'Hash Table', 'Math'],
  },
  {
    id: '15',
    title: 'Remove Duplicates from Sorted Array',
    description:
      'Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.',
    difficulty: 'Easy',
    category: 'Array',
    estimatedTime: '20 min',
    tags: ['Array', 'Two Pointers'],
  },
  {
    id: '16',
    title: 'Implement strStr()',
    description:
      'Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
    difficulty: 'Easy',
    category: 'String',
    estimatedTime: '25 min',
    tags: ['String', 'Two Pointers', 'KMP Algorithm'],
  },
  {
    id: '17',
    title: 'Search Insert Position',
    description:
      'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
    difficulty: 'Easy',
    category: 'Array',
    estimatedTime: '20 min',
    tags: ['Array', 'Binary Search'],
  },
  {
    id: '18',
    title: 'Count and Say',
    description:
      'The count-and-say sequence is a sequence of digit strings defined by the recursive formula.',
    difficulty: 'Medium',
    category: 'String',
    estimatedTime: '30 min',
    tags: ['String', 'Recursion', 'Simulation'],
  },
  {
    id: '19',
    title: 'Maximum Subarray Sum',
    description:
      'Find the contiguous subarray within an array (containing at least one number) which has the largest sum.',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    estimatedTime: '35 min',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
  },
  {
    id: '20',
    title: 'Spiral Matrix',
    description:
      'Given an m x n matrix, return all elements of the matrix in spiral order.',
    difficulty: 'Medium',
    category: 'Array',
    estimatedTime: '40 min',
    tags: ['Array', 'Matrix', 'Simulation'],
  },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function AlgorithmProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProblems = algorithmProblems.filter(problem => {
    const matchesDifficulty =
      selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  const categories = Array.from(
    new Set(algorithmProblems.map(p => p.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🧮 Algorithm Problems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master data structures and algorithms through curated problem sets.
            Build problem-solving skills and prepare for technical interviews.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map(problem => (
            <div
              key={problem.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {problem.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {problem.category}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {problem.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>⏱️ {problem.estimatedTime}</span>
                  <span className="text-green-600 dark:text-green-400">
                    {problem.completed ? '✅ Completed' : '⭕ Not Started'}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    {problem.completed ? 'Review Solution' : 'Start Problem'}
                  </button>
                  {problem.leetcodeUrl && (
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                    >
                      LeetCode
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {algorithmProblems.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Problems
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {algorithmProblems.filter(p => p.completed).length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {algorithmProblems.filter(p => p.difficulty === 'Easy').length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Easy Problems
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
