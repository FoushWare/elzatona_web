'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  Plus,
  Minus,
  BookOpen,
  Code,
  Shield,
  Zap,
  Globe,
  GitBranch,
  TestTube,
  Layers,
  Settings,
  Rocket,
  Brain,
  Palette,
  Database,
  Search,
  Filter,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'foundation' | 'frontend' | 'backend' | 'tools' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  questionCount: number;
  color: string;
}

interface FreeStyleRoadmapBuilderProps {
  onSave: (selectedSections: string[]) => void;
  onCancel: () => void;
}

export const FreeStyleRoadmapBuilder: React.FC<
  FreeStyleRoadmapBuilderProps
> = ({ onSave, onCancel }) => {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [showPreview, setShowPreview] = useState(false);

  const sections: Section[] = [
    {
      id: 'frontend-basics',
      name: 'Frontend Basics',
      description: 'HTML, CSS, and JavaScript fundamentals for web development',
      icon: <Globe className="w-5 h-5" />,
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '2-3 weeks',
      questionCount: 45,
      color: 'bg-blue-500',
    },
    {
      id: 'javascript-deep-dive',
      name: 'JavaScript Deep Dive',
      description:
        'Advanced JavaScript concepts, ES6+, closures, and async programming',
      icon: <Code className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 78,
      color: 'bg-yellow-500',
    },
    {
      id: 'react-mastery',
      name: 'React Mastery',
      description:
        'React fundamentals, hooks, state management, and best practices',
      icon: <Layers className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '4-5 weeks',
      questionCount: 92,
      color: 'bg-cyan-500',
    },
    {
      id: 'typescript-essentials',
      name: 'TypeScript Essentials',
      description:
        'TypeScript basics, types, interfaces, and advanced features',
      icon: <Settings className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 56,
      color: 'bg-blue-600',
    },
    {
      id: 'advanced-css',
      name: 'Advanced CSS',
      description: 'CSS Grid, Flexbox, animations, and modern CSS techniques',
      icon: <Palette className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 43,
      color: 'bg-pink-500',
    },
    {
      id: 'web-performance',
      name: 'Web Performance',
      description:
        'Optimization techniques, Core Web Vitals, and performance monitoring',
      icon: <Zap className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '2-3 weeks',
      questionCount: 38,
      color: 'bg-orange-500',
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      description: 'WCAG guidelines, ARIA, and inclusive design principles',
      icon: <Eye className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '1-2 weeks',
      questionCount: 34,
      color: 'bg-green-500',
    },
    {
      id: 'testing-strategies',
      name: 'Testing Strategies',
      description:
        'Unit testing, integration testing, and testing best practices',
      icon: <TestTube className="w-5 h-5" />,
      category: 'tools',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 41,
      color: 'bg-purple-500',
    },
    {
      id: 'git-version-control',
      name: 'Git & Version Control',
      description: 'Git workflows, branching strategies, and collaboration',
      icon: <GitBranch className="w-5 h-5" />,
      category: 'tools',
      difficulty: 'beginner',
      estimatedTime: '1-2 weeks',
      questionCount: 28,
      color: 'bg-gray-500',
    },
    {
      id: 'api-design',
      name: 'API Design',
      description: 'RESTful APIs, GraphQL, and API best practices',
      icon: <Database className="w-5 h-5" />,
      category: 'backend',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 39,
      color: 'bg-indigo-500',
    },
    {
      id: 'api-integration',
      name: 'API Integration',
      description:
        'Fetching data, error handling, and API integration patterns',
      icon: <Rocket className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '1-2 weeks',
      questionCount: 32,
      color: 'bg-teal-500',
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Web security, authentication, and security best practices',
      icon: <Shield className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '2-3 weeks',
      questionCount: 36,
      color: 'bg-red-500',
    },
    {
      id: 'system-design',
      name: 'System Design',
      description:
        'Scalable architecture, design patterns, and system thinking',
      icon: <Brain className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 47,
      color: 'bg-violet-500',
    },
    {
      id: 'deployment-devops',
      name: 'Deployment & DevOps',
      description: 'CI/CD, Docker, cloud deployment, and DevOps practices',
      icon: <Rocket className="w-5 h-5" />,
      category: 'tools',
      difficulty: 'advanced',
      estimatedTime: '2-3 weeks',
      questionCount: 29,
      color: 'bg-emerald-500',
    },
    {
      id: 'english-learning',
      name: 'English Learning',
      description:
        'Technical English, communication skills, and interview preparation',
      icon: <BookOpen className="w-5 h-5" />,
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '1-2 weeks',
      questionCount: 25,
      color: 'bg-amber-500',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Sections', count: sections.length },
    {
      id: 'foundation',
      name: 'Foundation',
      count: sections.filter(s => s.category === 'foundation').length,
    },
    {
      id: 'frontend',
      name: 'Frontend',
      count: sections.filter(s => s.category === 'frontend').length,
    },
    {
      id: 'backend',
      name: 'Backend',
      count: sections.filter(s => s.category === 'backend').length,
    },
    {
      id: 'tools',
      name: 'Tools',
      count: sections.filter(s => s.category === 'tools').length,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      count: sections.filter(s => s.category === 'advanced').length,
    },
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', count: sections.length },
    {
      id: 'beginner',
      name: 'Beginner',
      count: sections.filter(s => s.difficulty === 'beginner').length,
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      count: sections.filter(s => s.difficulty === 'intermediate').length,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      count: sections.filter(s => s.difficulty === 'advanced').length,
    },
  ];

  const filteredSections = sections.filter(section => {
    const matchesSearch =
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || section.category === filterCategory;
    const matchesDifficulty =
      filterDifficulty === 'all' || section.difficulty === filterDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectAll = () => {
    setSelectedSections(filteredSections.map(s => s.id));
  };

  const clearAll = () => {
    setSelectedSections([]);
  };

  const getSelectedSectionsData = () => {
    return sections.filter(s => selectedSections.includes(s.id));
  };

  const getTotalEstimatedTime = () => {
    const selectedData = getSelectedSectionsData();
    return selectedData.reduce((total, section) => {
      const timeRange =
        section.estimatedTime.split('-')[1] ||
        section.estimatedTime.split('-')[0];
      return total + parseInt(timeRange.replace('weeks', '').trim());
    }, 0);
  };

  const getTotalQuestions = () => {
    return getSelectedSectionsData().reduce(
      (total, section) => total + section.questionCount,
      0
    );
  };

  const handleSave = () => {
    onSave(selectedSections);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your Free Style Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the sections you want to include in your personalized
            learning journey. Select as many or as few as you'd like to create
            your custom roadmap.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              <select
                value={filterDifficulty}
                onChange={e => setFilterDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name} ({difficulty.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={selectAll}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Select All Visible</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Minus className="w-4 h-4" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showPreview ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        {showPreview && selectedSections.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Custom Roadmap Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedSections.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Sections Selected
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {getTotalQuestions()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Total Questions
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {getTotalEstimatedTime()}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Estimated Weeks
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {getSelectedSectionsData().map(section => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.color}`}
                    >
                      <div className="text-white">{section.icon}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {section.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {section.estimatedTime} • {section.questionCount}{' '}
                        questions
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSections.map(section => (
            <div
              key={section.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 ${
                selectedSections.includes(section.id)
                  ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'hover:shadow-xl hover:scale-105'
              }`}
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.color}`}
                >
                  <div className="text-white">{section.icon}</div>
                </div>
                {selectedSections.includes(section.id) && (
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {section.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {section.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      section.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : section.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {section.difficulty}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {section.questionCount} questions
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  {section.estimatedTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedSections.length === 0}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              selectedSections.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Save className="w-5 h-5 inline mr-2" />
            Save Roadmap ({selectedSections.length} sections)
          </button>
        </div>
      </div>
    </div>
  );
};




