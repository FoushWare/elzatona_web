'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Code,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Search,
  Filter,
  ChevronRight,
  Zap,
  Globe,
  Palette,
  Database,
  Server,
  Smartphone,
  Target,
} from 'lucide-react';

interface CodingExercise {
  id: string;
  title: string;
  description: string;
  category:
    | 'frontend'
    | 'backend'
    | 'algorithms'
    | 'data-structures'
    | 'system-design'
    | 'mobile';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  rating: number;
  completedCount: number;
  tags: string[];
  isCompleted?: boolean;
  isPremium?: boolean;
  languages: string[];
  hints?: string[];
  testCases?: number;
}

const codingExercises: CodingExercise[] = [
  {
    id: 'responsive-navbar',
    title: 'Build a Responsive Navigation Bar',
    description:
      'Create a fully responsive navigation bar with mobile menu, dropdowns, and smooth animations.',
    category: 'frontend',
    difficulty: 'easy',
    estimatedTime: 45,
    rating: 4.8,
    completedCount: 12500,
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Mobile'],
    languages: ['HTML', 'CSS', 'JavaScript'],
    testCases: 8,
  },
  {
    id: 'todo-app-react',
    title: 'Todo App with React Hooks',
    description:
      'Build a complete todo application using React hooks, local storage, and modern React patterns.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 90,
    rating: 4.9,
    completedCount: 8900,
    tags: ['React', 'Hooks', 'Local Storage', 'State Management'],
    languages: ['JavaScript', 'React'],
    testCases: 12,
  },
  {
    id: 'binary-search-tree',
    title: 'Binary Search Tree Implementation',
    description:
      'Implement a binary search tree with insert, delete, search, and traversal operations.',
    category: 'data-structures',
    difficulty: 'medium',
    estimatedTime: 120,
    rating: 4.7,
    completedCount: 5600,
    tags: ['Data Structures', 'Trees', 'Algorithms', 'Recursion'],
    languages: ['JavaScript', 'Python', 'Java'],
    testCases: 15,
  },
  {
    id: 'rest-api-nodejs',
    title: 'RESTful API with Node.js',
    description:
      'Build a complete REST API with authentication, validation, and database integration.',
    category: 'backend',
    difficulty: 'hard',
    estimatedTime: 180,
    rating: 4.8,
    completedCount: 3200,
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'API Design'],
    languages: ['JavaScript', 'Node.js'],
    testCases: 20,
    isPremium: true,
  },
  {
    id: 'two-sum-problem',
    title: 'Two Sum Problem',
    description:
      'Find two numbers in an array that add up to a target sum. Classic algorithm problem.',
    category: 'algorithms',
    difficulty: 'easy',
    estimatedTime: 30,
    rating: 4.6,
    completedCount: 15600,
    tags: ['Arrays', 'Hash Table', 'Two Pointers'],
    languages: ['JavaScript', 'Python', 'Java', 'C++'],
    testCases: 10,
  },
  {
    id: 'react-native-weather',
    title: 'Weather App with React Native',
    description:
      'Create a cross-platform weather app with location services and real-time data.',
    category: 'mobile',
    difficulty: 'medium',
    estimatedTime: 150,
    rating: 4.7,
    completedCount: 4200,
    tags: ['React Native', 'API Integration', 'Location Services', 'Mobile'],
    languages: ['JavaScript', 'React Native'],
    testCases: 14,
    isPremium: true,
  },
  {
    id: 'css-grid-layout',
    title: 'Advanced CSS Grid Layout',
    description:
      'Create complex layouts using CSS Grid with responsive design and animations.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 75,
    rating: 4.8,
    completedCount: 6800,
    tags: ['CSS Grid', 'Layout', 'Responsive Design', 'Animations'],
    languages: ['CSS', 'HTML'],
    testCases: 6,
  },
  {
    id: 'load-balancer-design',
    title: 'Load Balancer System Design',
    description:
      'Design a load balancer system that can handle millions of requests with high availability.',
    category: 'system-design',
    difficulty: 'hard',
    estimatedTime: 240,
    rating: 4.9,
    completedCount: 1800,
    tags: [
      'System Design',
      'Load Balancing',
      'Scalability',
      'High Availability',
    ],
    languages: ['Any'],
    testCases: 5,
    isPremium: true,
  },
  {
    id: 'merge-sort-algorithm',
    title: 'Merge Sort Implementation',
    description:
      'Implement the merge sort algorithm with optimization and analyze its time complexity.',
    category: 'algorithms',
    difficulty: 'medium',
    estimatedTime: 60,
    rating: 4.5,
    completedCount: 7200,
    tags: ['Sorting', 'Divide and Conquer', 'Recursion', 'Time Complexity'],
    languages: ['JavaScript', 'Python', 'Java', 'C++'],
    testCases: 12,
  },
  {
    id: 'express-middleware',
    title: 'Custom Express Middleware',
    description:
      'Build custom middleware for Express.js including authentication, logging, and error handling.',
    category: 'backend',
    difficulty: 'medium',
    estimatedTime: 90,
    rating: 4.7,
    completedCount: 4500,
    tags: ['Express.js', 'Middleware', 'Authentication', 'Error Handling'],
    languages: ['JavaScript', 'Node.js'],
    testCases: 8,
  },
  {
    id: 'react-context-api',
    title: 'React Context API State Management',
    description:
      'Implement global state management using React Context API with custom hooks.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 80,
    rating: 4.8,
    completedCount: 6100,
    tags: ['React', 'Context API', 'State Management', 'Custom Hooks'],
    languages: ['JavaScript', 'React'],
    testCases: 10,
  },
  {
    id: 'hash-table-implementation',
    title: 'Hash Table Implementation',
    description:
      'Implement a hash table with collision handling using chaining and open addressing.',
    category: 'data-structures',
    difficulty: 'hard',
    estimatedTime: 150,
    rating: 4.6,
    completedCount: 2800,
    tags: ['Hash Table', 'Collision Handling', 'Data Structures'],
    languages: ['JavaScript', 'Python', 'Java'],
    testCases: 18,
    isPremium: true,
  },
];

const categories = [
  {
    id: 'all',
    label: 'All Exercises',
    icon: '💻',
    count: codingExercises.length,
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    count: codingExercises.filter(e => e.category === 'frontend').length,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    count: codingExercises.filter(e => e.category === 'backend').length,
  },
  {
    id: 'algorithms',
    label: 'Algorithms',
    icon: '🧮',
    count: codingExercises.filter(e => e.category === 'algorithms').length,
  },
  {
    id: 'data-structures',
    label: 'Data Structures',
    icon: '🏗️',
    count: codingExercises.filter(e => e.category === 'data-structures').length,
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: '🏛️',
    count: codingExercises.filter(e => e.category === 'system-design').length,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    count: codingExercises.filter(e => e.category === 'mobile').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'easy', label: 'Easy', color: 'green' },
  { id: 'medium', label: 'Medium', color: 'yellow' },
  { id: 'hard', label: 'Hard', color: 'red' },
];

export default function CodingExercisesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredExercises = codingExercises.filter(exercise => {
    const matchesSearch =
      searchQuery === '' ||
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      exercise.difficulty === selectedDifficulty;
    const matchesFree = !showFreeOnly || !exercise.isPremium;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesFree;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Palette className="w-5 h-5" />;
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'algorithms':
        return <Zap className="w-5 h-5" />;
      case 'data-structures':
        return <Database className="w-5 h-5" />;
      case 'system-design':
        return <Globe className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💻 Coding Exercises
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice coding with hands-on exercises, from beginner-friendly
            challenges to advanced system design problems.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Free Exercises Toggle */}
              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={e => setShowFreeOnly(e.target.checked)}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Show free exercises only
                  </span>
                </label>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Difficulty
                </h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedDifficulty === difficulty.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {difficulty.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredExercises.length} of {codingExercises.length}{' '}
            exercises
          </p>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(exercise.category)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {exercise.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {exercise.isPremium && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                        PREMIUM
                      </span>
                    )}
                    {exercise.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  {exercise.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {exercise.description}
                </p>

                {/* Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}
                  >
                    {exercise.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.rating}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exercise.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {exercise.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{exercise.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {exercise.languages.map(language => (
                    <span
                      key={language}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{exercise.completedCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{exercise.testCases} tests</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/practice/coding-exercises/${exercise.id}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200 group"
                >
                  <Play className="w-4 h-4" />
                  <span>
                    {exercise.isCompleted ? 'Continue' : 'Start Exercise'}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No exercises found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setShowFreeOnly(false);
              }}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Coding?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of developers who are already practicing with our
              coding exercises
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/practice/projects"
                className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Projects
              </Link>
              <Link
                href="/learning-paths"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                View Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
