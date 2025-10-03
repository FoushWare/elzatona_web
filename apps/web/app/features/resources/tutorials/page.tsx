'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Code,
  Palette,
  Globe,
  Zap,
} from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'html' | 'css' | 'javascript' | 'react' | 'typescript' | 'nodejs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  rating: number;
  studentsCount: number;
  isCompleted?: boolean;
  thumbnail: string;
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
}

const tutorials: Tutorial[] = [
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals: Building Your First Web Page',
    description:
      'Learn the basics of HTML, including semantic elements, forms, and accessibility best practices.',
    category: 'html',
    difficulty: 'beginner',
    estimatedTime: 120,
    rating: 4.8,
    studentsCount: 15420,
    thumbnail: '/api/placeholder/400/225',
    tags: ['HTML5', 'Semantic HTML', 'Accessibility', 'Forms'],
    prerequisites: ['Basic computer skills'],
    learningOutcomes: [
      'Understand HTML structure and syntax',
      'Create semantic, accessible web pages',
      'Build forms with proper validation',
      'Implement responsive layouts',
    ],
  },
  {
    id: 'css-layouts',
    title: 'CSS Layouts: Flexbox and Grid Mastery',
    description:
      'Master modern CSS layout techniques with Flexbox and CSS Grid for responsive designs.',
    category: 'css',
    difficulty: 'intermediate',
    estimatedTime: 180,
    rating: 4.9,
    studentsCount: 12850,
    thumbnail: '/api/placeholder/400/225',
    tags: ['CSS Grid', 'Flexbox', 'Responsive Design', 'Layout'],
    prerequisites: ['Basic CSS knowledge', 'HTML fundamentals'],
    learningOutcomes: [
      'Master CSS Grid and Flexbox',
      'Create complex responsive layouts',
      'Understand layout algorithms',
      'Build modern web interfaces',
    ],
  },
  {
    id: 'javascript-es6',
    title: 'Modern JavaScript: ES6+ Features',
    description:
      'Explore modern JavaScript features including arrow functions, destructuring, modules, and async/await.',
    category: 'javascript',
    difficulty: 'intermediate',
    estimatedTime: 240,
    rating: 4.7,
    studentsCount: 18920,
    thumbnail: '/api/placeholder/400/225',
    tags: ['ES6+', 'Async/Await', 'Modules', 'Destructuring'],
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Master ES6+ JavaScript features',
      'Write clean, modern JavaScript code',
      'Handle asynchronous operations',
      'Use modules and imports effectively',
    ],
  },
  {
    id: 'react-hooks',
    title: 'React Hooks: State and Effect Management',
    description:
      'Learn React Hooks including useState, useEffect, useContext, and custom hooks.',
    category: 'react',
    difficulty: 'intermediate',
    estimatedTime: 200,
    rating: 4.8,
    studentsCount: 22100,
    thumbnail: '/api/placeholder/400/225',
    tags: ['React Hooks', 'useState', 'useEffect', 'Custom Hooks'],
    prerequisites: ['Basic React knowledge', 'JavaScript ES6+'],
    learningOutcomes: [
      'Master React Hooks patterns',
      'Manage component state effectively',
      'Handle side effects with useEffect',
      'Create reusable custom hooks',
    ],
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Fundamentals: Type Safety',
    description:
      'Introduction to TypeScript, covering types, interfaces, generics, and advanced type features.',
    category: 'typescript',
    difficulty: 'intermediate',
    estimatedTime: 160,
    rating: 4.6,
    studentsCount: 9650,
    thumbnail: '/api/placeholder/400/225',
    tags: ['TypeScript', 'Types', 'Interfaces', 'Generics'],
    prerequisites: ['JavaScript knowledge', 'Basic programming concepts'],
    learningOutcomes: [
      'Understand TypeScript type system',
      'Write type-safe code',
      'Use interfaces and generics',
      'Integrate TypeScript with React',
    ],
  },
  {
    id: 'nodejs-api',
    title: 'Node.js API Development: RESTful Services',
    description:
      'Build RESTful APIs with Node.js, Express, and MongoDB. Learn authentication, validation, and testing.',
    category: 'nodejs',
    difficulty: 'advanced',
    estimatedTime: 300,
    rating: 4.7,
    studentsCount: 8750,
    thumbnail: '/api/placeholder/400/225',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    prerequisites: ['JavaScript knowledge', 'Basic HTTP concepts'],
    learningOutcomes: [
      'Build RESTful APIs with Node.js',
      'Implement authentication and authorization',
      'Work with databases and ORMs',
      'Test and deploy Node.js applications',
    ],
  },
];

const categories = [
  { id: 'all', label: 'All Tutorials', icon: '📚', count: tutorials.length },
  {
    id: 'html',
    label: 'HTML',
    icon: '🌐',
    count: tutorials.filter(t => t.category === 'html').length,
  },
  {
    id: 'css',
    label: 'CSS',
    icon: '🎨',
    count: tutorials.filter(t => t.category === 'css').length,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: '⚡',
    count: tutorials.filter(t => t.category === 'javascript').length,
  },
  {
    id: 'react',
    label: 'React',
    icon: '⚛️',
    count: tutorials.filter(t => t.category === 'react').length,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: '🔷',
    count: tutorials.filter(t => t.category === 'typescript').length,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    icon: '🟢',
    count: tutorials.filter(t => t.category === 'nodejs').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'beginner', label: 'Beginner', color: 'green' },
  { id: 'intermediate', label: 'Intermediate', color: 'yellow' },
  { id: 'advanced', label: 'Advanced', color: 'red' },
];

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch =
      searchQuery === '' ||
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      tutorial.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'html':
        return <Globe className="w-5 h-5" />;
      case 'css':
        return <Palette className="w-5 h-5" />;
      case 'javascript':
        return <Zap className="w-5 h-5" />;
      case 'react':
        return <Code className="w-5 h-5" />;
      case 'typescript':
        return <Code className="w-5 h-5" />;
      case 'nodejs':
        return <Code className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎓 Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Step-by-step tutorials for all skill levels. Learn frontend
            development with hands-on projects and real-world examples.
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
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300'
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
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300'
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
            Showing {filteredTutorials.length} of {tutorials.length} tutorials
          </p>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map(tutorial => (
            <div
              key={tutorial.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  {getCategoryIcon(tutorial.category)}
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}
                  >
                    {tutorial.difficulty}
                  </span>
                </div>
                {tutorial.isCompleted && (
                  <div className="absolute top-4 left-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(tutorial.category)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {tutorial.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {tutorial.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {tutorial.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {tutorial.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {tutorial.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{tutorial.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tutorial.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tutorial.studentsCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/tutorials/${tutorial.id}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 group"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Tutorial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tutorials found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of developers who are already learning with our
              tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learning-paths"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Learning Paths
              </Link>
              <Link
                href="/practice"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
