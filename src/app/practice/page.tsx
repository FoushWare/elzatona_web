'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Clock,
  Star,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  timeLimit: number;
  completionRate: number;
  rating: number;
  description: string;
  isCompleted?: boolean;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Build a Todo List Component',
    difficulty: 'Easy',
    category: 'React',
    tags: ['React', 'State Management', 'Components'],
    timeLimit: 30,
    completionRate: 85,
    rating: 4.5,
    description:
      'Create a fully functional todo list component with add, edit, delete, and toggle functionality.',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Implement Debounce Hook',
    difficulty: 'Medium',
    category: 'React',
    tags: ['React', 'Hooks', 'Performance'],
    timeLimit: 45,
    completionRate: 72,
    rating: 4.3,
    description:
      'Build a custom React hook that implements debouncing functionality for search inputs.',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'CSS Grid Layout System',
    difficulty: 'Medium',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Layout'],
    timeLimit: 40,
    completionRate: 68,
    rating: 4.2,
    description:
      'Create a responsive layout system using CSS Grid with multiple breakpoints.',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'JavaScript Array Methods',
    difficulty: 'Easy',
    category: 'JavaScript',
    tags: ['JavaScript', 'Arrays', 'Functional Programming'],
    timeLimit: 25,
    completionRate: 90,
    rating: 4.6,
    description:
      'Implement common array manipulation methods like map, filter, reduce from scratch.',
    isCompleted: true,
  },
  {
    id: '5',
    title: 'Virtual Scrolling Implementation',
    difficulty: 'Hard',
    category: 'React',
    tags: ['React', 'Performance', 'Virtualization'],
    timeLimit: 90,
    completionRate: 45,
    rating: 4.8,
    description:
      'Build a virtual scrolling component to handle large lists efficiently.',
    isCompleted: false,
  },
  {
    id: '6',
    title: 'CSS Animations & Transitions',
    difficulty: 'Medium',
    category: 'CSS',
    tags: ['CSS', 'Animations', 'Transitions'],
    timeLimit: 35,
    completionRate: 75,
    rating: 4.1,
    description:
      'Create smooth animations and transitions for interactive UI elements.',
    isCompleted: false,
  },
];

export default function PracticePage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(mockQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<
    'recent' | 'difficulty' | 'rating' | 'completion'
  >('recent');

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = [
    'All',
    'React',
    'CSS',
    'JavaScript',
    'TypeScript',
    'HTML',
  ];

  useEffect(() => {
    let filtered = questions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        q =>
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'rating':
          return b.rating - a.rating;
        case 'completion':
          return b.completionRate - a.completionRate;
        default:
          return 0;
      }
    });

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedDifficulty, selectedCategory, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                All Practice Questions
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {filteredQuestions.length} questions available • Master frontend
                development
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions, tags, or descriptions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="difficulty">Difficulty</option>
              <option value="rating">Highest Rated</option>
              <option value="completion">Most Completed</option>
            </select>
          </div>
        </div>

        {/* Questions Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map(question => (
              <div
                key={question.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {question.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {question.description}
                    </p>
                  </div>
                  {question.isCompleted && (
                    <div className="ml-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
                  >
                    {question.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {question.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{question.timeLimit}m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{question.completionRate}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{question.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(question.tags || []).slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {(question.tags || []).length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                      +{(question.tags || []).length - 3}
                    </span>
                  )}
                </div>

                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                  Start Practice
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map(question => (
              <div
                key={question.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {question.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
                      >
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {question.category}
                      </span>
                      {question.isCompleted && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {question.description}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{question.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{question.completionRate}% completion rate</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{question.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                      Start Practice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('All');
                setSelectedCategory('All');
              }}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
