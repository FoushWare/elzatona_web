'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { SignInPopup } from '@/components/SignInPopup';
import {
  Brain,
  Target,
  Clock,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Zap,
  Award,
  TrendingUp,
  Filter,
  Search,
  Grid,
  List,
  Loader2,
  Lightbulb,
  Cpu,
  Database,
} from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedTime: string;
  category: string;
  tags: string[];
  points: number;
  isCompleted: boolean;
  isPopular: boolean;
  acceptanceRate: number;
}

export default function ProblemSolvingPage() {
  const router = useRouter();
  const { isAuthenticated } = useFirebaseAuth();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const loadProblems = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProblems: Problem[] = [
        {
          id: '1',
          title: 'Two Sum',
          description:
            'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          difficulty: 'Easy',
          estimatedTime: '15-30 minutes',
          category: 'Array',
          tags: ['Array', 'Hash Table'],
          points: 50,
          isCompleted: false,
          isPopular: true,
          acceptanceRate: 45.2,
        },
        {
          id: '2',
          title: 'Valid Parentheses',
          description:
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          difficulty: 'Easy',
          estimatedTime: '20-40 minutes',
          category: 'Stack',
          tags: ['String', 'Stack'],
          points: 60,
          isCompleted: false,
          isPopular: true,
          acceptanceRate: 38.7,
        },
        {
          id: '3',
          title: 'Maximum Subarray',
          description:
            'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
          difficulty: 'Medium',
          estimatedTime: '30-60 minutes',
          category: 'Dynamic Programming',
          tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
          points: 120,
          isCompleted: false,
          isPopular: true,
          acceptanceRate: 28.9,
        },
        {
          id: '4',
          title: 'Binary Tree Maximum Path Sum',
          description:
            'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.',
          difficulty: 'Hard',
          estimatedTime: '60-120 minutes',
          category: 'Tree',
          tags: ['Tree', 'Depth-First Search', 'Dynamic Programming'],
          points: 250,
          isCompleted: false,
          isPopular: false,
          acceptanceRate: 15.8,
        },
      ];

      setProblems(mockProblems);
      setIsLoading(false);
    };

    loadProblems();
  }, []);

  const categories = [
    'all',
    'Array',
    'String',
    'Stack',
    'Tree',
    'Dynamic Programming',
    'Graph',
    'Math',
  ];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard', 'Expert'];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDifficulty =
      selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === 'all' || problem.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleProblemClick = (problemId: string) => {
    if (isAuthenticated) {
      router.push(`/problem-solving/${problemId}`);
    } else {
      setShowSignInPopup(true);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInPopup(false);
  };

  const handleSignInSkip = () => {
    setShowSignInPopup(false);
  };

  const handleSignInClose = () => {
    setShowSignInPopup(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'Expert':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading problems...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 scale-110" />
            <div className="relative w-24 h-24 bg-gradient-to-r from-green-500 via-blue-600 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Problem Solving Challenges
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Solve algorithmic and logical problems to improve your critical
            thinking and problem-solving abilities. Each challenge is designed
            to strengthen your programming fundamentals and algorithmic
            thinking.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {problems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Problems
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {problems.filter(p => p.isPopular).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Popular
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {problems.reduce((sum, problem) => sum + problem.points, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Points
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(
                  problems.reduce(
                    (sum, problem) => sum + problem.acceptanceRate,
                    0
                  ) / problems.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Acceptance
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems, tags, or categories..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Difficulties</option>
                {difficulties.slice(1).map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Grid/List */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredProblems.map(problem => (
            <div
              key={problem.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onClick={() => handleProblemClick(problem.id)}
            >
              {problem.isPopular && (
                <div className="absolute -top-3 left-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                </div>
              )}

              {problem.isCompleted && (
                <div className="absolute -top-3 right-4 z-10">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Solved</span>
                  </div>
                </div>
              )}

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {problem.points}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      pts
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{problem.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{problem.acceptanceRate}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Database className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {problem.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 group-hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>Solve Problem</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{problem.points} points</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No problems found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {showSignInPopup && (
        <SignInPopup
          isOpen={showSignInPopup}
          onClose={handleSignInClose}
          onSuccess={handleSignInSuccess}
        />
      )}
    </div>
  );
}
