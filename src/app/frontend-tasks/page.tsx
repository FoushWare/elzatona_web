'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code,
  ArrowRight,
  Clock,
  Target,
  Users,
  Star,
  ChevronRight,
  Monitor,
  Flame,
  CheckCircle,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Trophy,
  Zap,
  Shield,
  Layers,
  Settings,
  Brain,
  Globe,
} from 'lucide-react';

interface FrontendTask {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  technologies: string[];
  completionCount: number;
  estimatedTime: string;
  isWarmUp?: boolean;
  author?: string;
  company?: string;
}

const frontendTasks: FrontendTask[] = [
  {
    id: 'counter',
    title: 'Counter',
    description:
      'Build a simple counter that increments whenever a button is clicked',
    category: 'UI coding',
    difficulty: 'easy',
    technologies: ['React', 'HTML5', 'Angular', 'Vue.js', 'Svelte'],
    completionCount: 35400,
    estimatedTime: '5 mins',
    isWarmUp: true,
    author: 'Yangshun Tay',
    company: 'Ex-Meta Staff Engineer',
  },
  {
    id: 'make-counter',
    title: 'Make Counter',
    description:
      'Implement a function that accepts an integer value and returns a function that can be repeatedly called to return increasing values',
    category: 'JS functions',
    difficulty: 'easy',
    technologies: ['JavaScript', 'TypeScript'],
    completionCount: 17300,
    estimatedTime: '10 mins',
  },
  {
    id: 'mean',
    title: 'Mean',
    description:
      'Implement a function that finds the mean of the values inside an array',
    category: 'JS functions',
    difficulty: 'easy',
    technologies: ['JavaScript', 'TypeScript'],
    completionCount: 14500,
    estimatedTime: '8 mins',
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description:
      'Create a contact form with validation and submission handling',
    category: 'UI coding',
    difficulty: 'easy',
    technologies: ['React', 'HTML5', 'CSS3', 'JavaScript'],
    completionCount: 28900,
    estimatedTime: '15 mins',
  },
  {
    id: 'todo-list',
    title: 'Todo List',
    description:
      'Build a todo list application with add, edit, delete, and mark complete functionality',
    category: 'UI coding',
    difficulty: 'medium',
    technologies: ['React', 'HTML5', 'CSS3', 'JavaScript'],
    completionCount: 42100,
    estimatedTime: '25 mins',
  },
  {
    id: 'shopping-cart',
    title: 'Shopping Cart',
    description:
      'Implement a shopping cart with add/remove items, quantity updates, and total calculation',
    category: 'UI coding',
    difficulty: 'medium',
    technologies: ['React', 'TypeScript', 'CSS3'],
    completionCount: 18700,
    estimatedTime: '30 mins',
  },
  {
    id: 'image-gallery',
    title: 'Image Gallery',
    description:
      'Create an image gallery with lightbox, filtering, and lazy loading',
    category: 'UI coding',
    difficulty: 'medium',
    technologies: ['React', 'HTML5', 'CSS3', 'JavaScript'],
    completionCount: 12300,
    estimatedTime: '20 mins',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    description:
      'Build a weather application that fetches and displays weather data',
    category: 'API integration',
    difficulty: 'medium',
    technologies: ['React', 'JavaScript', 'CSS3'],
    completionCount: 15600,
    estimatedTime: '35 mins',
  },
  {
    id: 'chat-interface',
    title: 'Chat Interface',
    description:
      'Create a real-time chat interface with message history and user presence',
    category: 'UI coding',
    difficulty: 'hard',
    technologies: ['React', 'TypeScript', 'WebSocket'],
    completionCount: 8900,
    estimatedTime: '45 mins',
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description:
      'Build a dashboard with charts, data visualization, and interactive filters',
    category: 'UI coding',
    difficulty: 'hard',
    technologies: ['React', 'TypeScript', 'D3.js', 'CSS3'],
    completionCount: 6700,
    estimatedTime: '60 mins',
  },
];

export default function FrontendTasksPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleTaskClick = (taskId: string) => {
    router.push(`/frontend-tasks/${taskId}`);
  };

  const filteredTasks = frontendTasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === 'all' || task.difficulty === difficultyFilter;
    const matchesCategory =
      categoryFilter === 'all' || task.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'UI coding':
        return <Monitor className="w-4 h-4" />;
      case 'JS functions':
        return <Code className="w-4 h-4" />;
      case 'API integration':
        return <Globe className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getTechnologyIcon = (tech: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      React: <Zap className="w-4 h-4" />,
      JavaScript: <Code className="w-4 h-4" />,
      TypeScript: <Code className="w-4 h-4" />,
      HTML5: <Globe className="w-4 h-4" />,
      CSS3: <Layers className="w-4 h-4" />,
      Angular: <Zap className="w-4 h-4" />,
      'Vue.js': <Zap className="w-4 h-4" />,
      Svelte: <Zap className="w-4 h-4" />,
      WebSocket: <Globe className="w-4 h-4" />,
      'D3.js': <Brain className="w-4 h-4" />,
    };
    return iconMap[tech] || <Code className="w-4 h-4" />;
  };

  const totalQuestions = frontendTasks.length;
  const totalHours = Math.round(
    frontendTasks.reduce((acc, task) => {
      const minutes = parseInt(task.estimatedTime.split(' ')[0]);
      return acc + minutes;
    }, 0) / 60
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 rounded-3xl blur-3xl opacity-30 scale-110" />
            <div className="relative w-24 h-24 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Code className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Frontend Tasks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Practice building real-world frontend components and applications.
            Each task includes a live coding environment with instant preview.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {totalQuestions}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Tasks
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {totalHours}h
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Time
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Free Access
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search frontend tasks..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={difficultyFilter}
                  onChange={e => setDifficultyFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="UI coding">UI Coding</option>
                  <option value="JS functions">JS Functions</option>
                  <option value="API integration">API Integration</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 max-w-7xl mx-auto ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-transparent hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
                onClick={() => handleTaskClick(task.id)}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-5 pointer-events-none" />

                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                            {getCategoryIcon(task.category)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {task.title}
                            </h3>
                            {task.isWarmUp && (
                              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                                Warm up question
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">
                            {(task.completionCount / 1000).toFixed(1)}k done
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(task.category)}
                          <span>{task.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span className="capitalize">{task.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedTime}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {task.technologies.slice(0, 4).map(tech => (
                            <div
                              key={tech}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {getTechnologyIcon(tech)}
                              <span>{tech}</span>
                            </div>
                          ))}
                          {task.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                              +{task.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <Play className="w-4 h-4" />
                          <span>Start Task</span>
                        </button>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      {getCategoryIcon(task.category)}
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        {task.isWarmUp && (
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                            Warm up
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(task.category)}
                          <span>{task.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span className="capitalize">{task.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {(task.completionCount / 1000).toFixed(1)}k done
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
