'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Code,
  FileText,
  ChevronRight,
  Globe,
  Zap,
  Palette,
  Server,
  Filter,
  Clock,
  User,
} from 'lucide-react';

interface DocumentationItem {
  id: string;
  title: string;
  description: string;
  category: 'api' | 'guides' | 'reference' | 'tutorials' | 'examples';
  technology:
    | 'html'
    | 'css'
    | 'javascript'
    | 'react'
    | 'typescript'
    | 'nodejs'
    | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  lastUpdated: string;
  author: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

const documentationItems: DocumentationItem[] = [
  {
    id: 'html-elements-reference',
    title: 'HTML Elements Reference',
    description:
      'Complete reference guide for all HTML elements with examples and browser support.',
    category: 'reference',
    technology: 'html',
    difficulty: 'beginner',
    estimatedReadTime: 15,
    lastUpdated: '2024-12-01',
    author: 'Sarah Johnson',
    tags: ['HTML5', 'Elements', 'Semantic', 'Accessibility'],
    isPopular: true,
  },
  {
    id: 'css-properties-guide',
    title: 'CSS Properties Complete Guide',
    description:
      'Comprehensive guide to CSS properties with examples, browser support, and best practices.',
    category: 'reference',
    technology: 'css',
    difficulty: 'intermediate',
    estimatedReadTime: 25,
    lastUpdated: '2024-11-28',
    author: 'Mike Chen',
    tags: ['CSS3', 'Properties', 'Layout', 'Styling'],
    isPopular: true,
  },
  {
    id: 'javascript-api-reference',
    title: 'JavaScript API Reference',
    description:
      'Complete JavaScript API documentation with examples and browser compatibility.',
    category: 'reference',
    technology: 'javascript',
    difficulty: 'intermediate',
    estimatedReadTime: 30,
    lastUpdated: '2024-12-02',
    author: 'Alex Rodriguez',
    tags: ['JavaScript', 'API', 'ES6+', 'DOM'],
    isNew: true,
  },
  {
    id: 'react-hooks-guide',
    title: 'React Hooks Complete Guide',
    description: 'Learn all React hooks with practical examples and use cases.',
    category: 'guides',
    technology: 'react',
    difficulty: 'intermediate',
    estimatedReadTime: 20,
    lastUpdated: '2024-11-30',
    author: 'Emma Wilson',
    tags: ['React', 'Hooks', 'useState', 'useEffect'],
    isPopular: true,
  },
  {
    id: 'typescript-handbook',
    title: 'TypeScript Handbook',
    description:
      'Official TypeScript documentation with examples and advanced type features.',
    category: 'reference',
    technology: 'typescript',
    difficulty: 'advanced',
    estimatedReadTime: 35,
    lastUpdated: '2024-11-25',
    author: 'David Kim',
    tags: ['TypeScript', 'Types', 'Interfaces', 'Generics'],
  },
  {
    id: 'nodejs-api-docs',
    title: 'Node.js API Documentation',
    description:
      'Complete Node.js API reference with examples and best practices.',
    category: 'api',
    technology: 'nodejs',
    difficulty: 'advanced',
    estimatedReadTime: 40,
    lastUpdated: '2024-11-20',
    author: 'Lisa Thompson',
    tags: ['Node.js', 'API', 'Modules', 'Async'],
  },
  {
    id: 'responsive-design-guide',
    title: 'Responsive Design Guide',
    description:
      'Complete guide to creating responsive web designs with CSS Grid and Flexbox.',
    category: 'guides',
    technology: 'css',
    difficulty: 'intermediate',
    estimatedReadTime: 18,
    lastUpdated: '2024-11-22',
    author: 'Sophie Martinez',
    tags: ['Responsive', 'CSS Grid', 'Flexbox', 'Mobile'],
    isNew: true,
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization',
    description:
      'Comprehensive guide to optimizing web performance and Core Web Vitals.',
    category: 'guides',
    technology: 'general',
    difficulty: 'advanced',
    estimatedReadTime: 22,
    lastUpdated: '2024-11-18',
    author: 'James Park',
    tags: ['Performance', 'Optimization', 'Core Web Vitals', 'Lighthouse'],
  },
  {
    id: 'accessibility-best-practices',
    title: 'Web Accessibility Best Practices',
    description: 'Complete guide to making websites accessible to all users.',
    category: 'guides',
    technology: 'general',
    difficulty: 'intermediate',
    estimatedReadTime: 16,
    lastUpdated: '2024-11-15',
    author: 'Rachel Green',
    tags: ['Accessibility', 'WCAG', 'ARIA', 'Screen Readers'],
  },
  {
    id: 'git-workflow-guide',
    title: 'Git Workflow Guide',
    description:
      'Best practices for Git workflows, branching strategies, and collaboration.',
    category: 'guides',
    technology: 'general',
    difficulty: 'intermediate',
    estimatedReadTime: 12,
    lastUpdated: '2024-11-12',
    author: 'Tom Wilson',
    tags: ['Git', 'Workflow', 'Branching', 'Collaboration'],
  },
  {
    id: 'api-design-patterns',
    title: 'RESTful API Design Patterns',
    description:
      'Best practices for designing RESTful APIs with examples and patterns.',
    category: 'guides',
    technology: 'nodejs',
    difficulty: 'advanced',
    estimatedReadTime: 28,
    lastUpdated: '2024-11-10',
    author: 'Maria Garcia',
    tags: ['API Design', 'REST', 'HTTP', 'Best Practices'],
  },
  {
    id: 'testing-strategies',
    title: 'Frontend Testing Strategies',
    description:
      'Complete guide to testing frontend applications with Jest, React Testing Library, and Cypress.',
    category: 'guides',
    technology: 'react',
    difficulty: 'advanced',
    estimatedReadTime: 24,
    lastUpdated: '2024-11-08',
    author: 'Kevin Lee',
    tags: ['Testing', 'Jest', 'React Testing Library', 'Cypress'],
  },
];

const categories = [
  {
    id: 'all',
    label: 'All Documentation',
    icon: '📚',
    count: documentationItems.length,
  },
  {
    id: 'api',
    label: 'API Reference',
    icon: '🔌',
    count: documentationItems.filter(d => d.category === 'api').length,
  },
  {
    id: 'guides',
    label: 'Guides',
    icon: '📖',
    count: documentationItems.filter(d => d.category === 'guides').length,
  },
  {
    id: 'reference',
    label: 'Reference',
    icon: '📋',
    count: documentationItems.filter(d => d.category === 'reference').length,
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    icon: '🎓',
    count: documentationItems.filter(d => d.category === 'tutorials').length,
  },
  {
    id: 'examples',
    label: 'Examples',
    icon: '💡',
    count: documentationItems.filter(d => d.category === 'examples').length,
  },
];

const technologies = [
  {
    id: 'all',
    label: 'All Technologies',
    icon: '🌐',
    count: documentationItems.length,
  },
  {
    id: 'html',
    label: 'HTML',
    icon: '🌐',
    count: documentationItems.filter(d => d.technology === 'html').length,
  },
  {
    id: 'css',
    label: 'CSS',
    icon: '🎨',
    count: documentationItems.filter(d => d.technology === 'css').length,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: '⚡',
    count: documentationItems.filter(d => d.technology === 'javascript').length,
  },
  {
    id: 'react',
    label: 'React',
    icon: '⚛️',
    count: documentationItems.filter(d => d.technology === 'react').length,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: '🔷',
    count: documentationItems.filter(d => d.technology === 'typescript').length,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    icon: '🟢',
    count: documentationItems.filter(d => d.technology === 'nodejs').length,
  },
  {
    id: 'general',
    label: 'General',
    icon: '📚',
    count: documentationItems.filter(d => d.technology === 'general').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'beginner', label: 'Beginner', color: 'green' },
  { id: 'intermediate', label: 'Intermediate', color: 'yellow' },
  { id: 'advanced', label: 'Advanced', color: 'red' },
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocs = documentationItems.filter(doc => {
    const matchesSearch =
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesTechnology =
      selectedTechnology === 'all' || doc.technology === selectedTechnology;
    const matchesDifficulty =
      selectedDifficulty === 'all' || doc.difficulty === selectedDifficulty;

    return (
      matchesSearch && matchesCategory && matchesTechnology && matchesDifficulty
    );
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

  const getTechnologyIcon = (technology: string) => {
    switch (technology) {
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
        return <Server className="w-5 h-5" />;
      case 'general':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'api':
        return '🔌';
      case 'guides':
        return '📖';
      case 'reference':
        return '📋';
      case 'tutorials':
        return '🎓';
      case 'examples':
        return '💡';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive documentation, API references, and guides for modern
            web development.
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
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-green-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology and Difficulty Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technology
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(technology => (
                      <button
                        key={technology.id}
                        onClick={() => setSelectedTechnology(technology.id)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedTechnology === technology.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-2">{technology.icon}</span>
                        {technology.label} ({technology.count})
                      </button>
                    ))}
                  </div>
                </div>

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
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {difficulty.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredDocs.length} of {documentationItems.length}{' '}
            documentation items
          </p>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getTechnologyIcon(doc.technology)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {doc.technology}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {doc.isNew && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                        NEW
                      </span>
                    )}
                    {doc.isPopular && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                  {doc.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {doc.description}
                </p>

                {/* Category and Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{getCategoryIcon(doc.category)}</span>
                    <span className="capitalize">{doc.category}</span>
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(doc.difficulty)}`}
                  >
                    {doc.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{doc.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{doc.estimatedReadTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{doc.author}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                  Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </div>

                {/* Action Button */}
                <Link
                  href={`/documentation/${doc.id}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 group"
                >
                  <span>Read Documentation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No documentation found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTechnology('all');
                setSelectedDifficulty('all');
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Check out our tutorials and video courses for more learning
              resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutorials"
                className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Tutorials
              </Link>
              <Link
                href="/video-courses"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                View Video Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
