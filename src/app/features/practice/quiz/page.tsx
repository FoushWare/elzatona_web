'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
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
  Target,
  BookOpen,
  Timer,
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category:
    | 'frontend'
    | 'backend'
    | 'algorithms'
    | 'data-structures'
    | 'system-design'
    | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  questionsCount: number;
  rating: number;
  completedCount: number;
  tags: string[];
  isCompleted?: boolean;
  isPremium?: boolean;
  topics: string[];
  passingScore: number;
  attempts?: number;
  bestScore?: number;
}

const quizzes: Quiz[] = [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals Quiz',
    description:
      'Test your knowledge of JavaScript basics including variables, functions, and ES6 features.',
    category: 'frontend',
    difficulty: 'easy',
    estimatedTime: 15,
    questionsCount: 20,
    rating: 4.7,
    completedCount: 15600,
    tags: ['JavaScript', 'ES6', 'Variables', 'Functions'],
    topics: [
      'Variables and Data Types',
      'Functions',
      'ES6 Features',
      'DOM Manipulation',
    ],
    passingScore: 70,
  },
  {
    id: 'react-hooks-quiz',
    title: 'React Hooks Mastery Quiz',
    description:
      'Challenge yourself with questions about React hooks, state management, and lifecycle methods.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 25,
    questionsCount: 30,
    rating: 4.8,
    completedCount: 8900,
    tags: ['React', 'Hooks', 'State Management', 'Lifecycle'],
    topics: ['useState', 'useEffect', 'Custom Hooks', 'Context API'],
    passingScore: 75,
  },
  {
    id: 'css-layout-quiz',
    title: 'CSS Layout and Positioning Quiz',
    description:
      'Master CSS layout techniques including Flexbox, Grid, and responsive design principles.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 20,
    questionsCount: 25,
    rating: 4.6,
    completedCount: 7200,
    tags: ['CSS', 'Flexbox', 'Grid', 'Responsive Design'],
    topics: ['Flexbox', 'CSS Grid', 'Positioning', 'Media Queries'],
    passingScore: 70,
  },
  {
    id: 'nodejs-backend-quiz',
    title: 'Node.js Backend Development Quiz',
    description:
      'Test your knowledge of Node.js, Express, and backend development concepts.',
    category: 'backend',
    difficulty: 'hard',
    estimatedTime: 30,
    questionsCount: 35,
    rating: 4.9,
    completedCount: 4200,
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    topics: [
      'Node.js Core',
      'Express Framework',
      'Middleware',
      'Database Integration',
    ],
    passingScore: 80,
    isPremium: true,
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures and Algorithms Quiz',
    description:
      'Challenge yourself with fundamental data structures and algorithm concepts.',
    category: 'algorithms',
    difficulty: 'hard',
    estimatedTime: 45,
    questionsCount: 40,
    rating: 4.8,
    completedCount: 5600,
    tags: ['Algorithms', 'Data Structures', 'Big O', 'Sorting'],
    topics: [
      'Arrays and Strings',
      'Linked Lists',
      'Trees',
      'Sorting Algorithms',
    ],
    passingScore: 75,
    isPremium: true,
  },
  {
    id: 'html-semantic-quiz',
    title: 'HTML Semantic Elements Quiz',
    description:
      'Learn about semantic HTML elements and accessibility best practices.',
    category: 'frontend',
    difficulty: 'easy',
    estimatedTime: 12,
    questionsCount: 15,
    rating: 4.5,
    completedCount: 11200,
    tags: ['HTML', 'Semantic', 'Accessibility', 'SEO'],
    topics: ['Semantic Elements', 'Accessibility', 'SEO', 'Form Elements'],
    passingScore: 65,
  },
  {
    id: 'system-design-basics',
    title: 'System Design Fundamentals Quiz',
    description:
      'Test your understanding of system design principles and scalability concepts.',
    category: 'system-design',
    difficulty: 'hard',
    estimatedTime: 35,
    questionsCount: 30,
    rating: 4.9,
    completedCount: 2800,
    tags: ['System Design', 'Scalability', 'Load Balancing', 'Caching'],
    topics: [
      'Load Balancing',
      'Caching Strategies',
      'Database Design',
      'Microservices',
    ],
    passingScore: 80,
    isPremium: true,
  },
  {
    id: 'typescript-advanced',
    title: 'Advanced TypeScript Quiz',
    description:
      'Master advanced TypeScript concepts including generics, decorators, and utility types.',
    category: 'frontend',
    difficulty: 'hard',
    estimatedTime: 25,
    questionsCount: 30,
    rating: 4.7,
    completedCount: 3400,
    tags: ['TypeScript', 'Generics', 'Decorators', 'Utility Types'],
    topics: ['Advanced Types', 'Generics', 'Decorators', 'Module System'],
    passingScore: 75,
  },
  {
    id: 'web-performance-quiz',
    title: 'Web Performance Optimization Quiz',
    description:
      'Test your knowledge of web performance optimization techniques and best practices.',
    category: 'general',
    difficulty: 'medium',
    estimatedTime: 20,
    questionsCount: 25,
    rating: 4.6,
    completedCount: 4800,
    tags: ['Performance', 'Optimization', 'Core Web Vitals', 'Lighthouse'],
    topics: [
      'Core Web Vitals',
      'Image Optimization',
      'Code Splitting',
      'Caching',
    ],
    passingScore: 70,
  },
  {
    id: 'git-version-control',
    title: 'Git Version Control Quiz',
    description:
      'Master Git commands, branching strategies, and collaboration workflows.',
    category: 'general',
    difficulty: 'medium',
    estimatedTime: 18,
    questionsCount: 22,
    rating: 4.8,
    completedCount: 6800,
    tags: ['Git', 'Version Control', 'Branching', 'Collaboration'],
    topics: [
      'Git Commands',
      'Branching Strategies',
      'Merge Conflicts',
      'GitHub Workflow',
    ],
    passingScore: 70,
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development Quiz',
    description:
      'Test your knowledge of mobile development concepts and React Native.',
    category: 'frontend',
    difficulty: 'medium',
    estimatedTime: 22,
    questionsCount: 28,
    rating: 4.7,
    completedCount: 3600,
    tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    topics: ['React Native', 'Mobile UI', 'Navigation', 'Platform APIs'],
    passingScore: 75,
  },
  {
    id: 'security-best-practices',
    title: 'Web Security Best Practices Quiz',
    description:
      'Learn about web security vulnerabilities and how to protect against them.',
    category: 'general',
    difficulty: 'hard',
    estimatedTime: 28,
    questionsCount: 32,
    rating: 4.8,
    completedCount: 2400,
    tags: ['Security', 'OWASP', 'Authentication', 'HTTPS'],
    topics: [
      'OWASP Top 10',
      'Authentication',
      'Authorization',
      'Data Protection',
    ],
    passingScore: 80,
    isPremium: true,
  },
];

const categories = [
  { id: 'all', label: 'All Quizzes', icon: '🧠', count: quizzes.length },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    count: quizzes.filter(q => q.category === 'frontend').length,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    count: quizzes.filter(q => q.category === 'backend').length,
  },
  {
    id: 'algorithms',
    label: 'Algorithms',
    icon: '🧮',
    count: quizzes.filter(q => q.category === 'algorithms').length,
  },
  {
    id: 'data-structures',
    label: 'Data Structures',
    icon: '🏗️',
    count: quizzes.filter(q => q.category === 'data-structures').length,
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: '🏛️',
    count: quizzes.filter(q => q.category === 'system-design').length,
  },
  {
    id: 'general',
    label: 'General',
    icon: '📚',
    count: quizzes.filter(q => q.category === 'general').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'easy', label: 'Easy', color: 'green' },
  { id: 'medium', label: 'Medium', color: 'yellow' },
  { id: 'hard', label: 'Hard', color: 'red' },
];

export default function QuizPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch =
      searchQuery === '' ||
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    const matchesFree = !showFreeOnly || !quiz.isPremium;

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
      case 'general':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900/20 dark:to-cyan-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🧠 Practice Quizzes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Test your knowledge with interactive quizzes covering all aspects of
            web development and programming.
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
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
              {/* Free Quizzes Toggle */}
              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={e => setShowFreeOnly(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Show free quizzes only
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
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 text-gray-700 dark:text-gray-300'
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
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 text-gray-700 dark:text-gray-300'
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
            Showing {filteredQuizzes.length} of {quizzes.length} quizzes
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map(quiz => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(quiz.category)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {quiz.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {quiz.isPremium && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                        PREMIUM
                      </span>
                    )}
                    {quiz.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
                  {quiz.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {quiz.description}
                </p>

                {/* Difficulty and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}
                  >
                    {quiz.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.rating}
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Topics Covered:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {quiz.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {quiz.topics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        +{quiz.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {quiz.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {quiz.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{quiz.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Timer className="w-4 h-4" />
                    <span>{quiz.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{quiz.questionsCount} questions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{quiz.completedCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress (if attempted) */}
                {quiz.attempts && quiz.attempts > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Best Score</span>
                      <span>{quiz.bestScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${quiz.bestScore}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {quiz.attempts} attempt{quiz.attempts > 1 ? 's' : ''}
                    </div>
                  </div>
                )}

                {/* Passing Score */}
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Passing Score:{' '}
                  <span className="font-semibold">{quiz.passingScore}%</span>
                </div>

                {/* Action Button */}
                <Link
                  href={`/practice/quiz/${quiz.id}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors duration-200 group"
                >
                  <Play className="w-4 h-4" />
                  <span>{quiz.isCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No quizzes found
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
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Challenge yourself with our comprehensive quiz collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/practice/coding-exercises"
                className="px-8 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Try Coding Exercises
              </Link>
              <Link
                href="/learning-paths"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
              >
                Explore Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
