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
  Atom,
  Cpu,
  Server,
  Building,
  Gauge,
  Wrench,
  Network,
  Building2,
  UserCheck,
  Users,
  Bot,
  Coins,
} from 'lucide-react';

interface Section {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category:
    | 'foundation'
    | 'frontend'
    | 'advanced'
    | 'specialized'
    | 'career'
    | 'emerging';
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
    // Foundation Level (Beginner)
    {
      id: 'html-fundamentals',
      name: 'HTML Fundamentals',
      description:
        'Master HTML semantics, structure, accessibility, and modern HTML5 features',
      icon: <Globe className="w-5 h-5" />,
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '2-3 weeks',
      questionCount: 45,
      color: 'bg-blue-500',
    },
    {
      id: 'css-fundamentals',
      name: 'CSS Fundamentals',
      description:
        'Learn CSS basics, selectors, layouts, and responsive design principles',
      icon: <Palette className="w-5 h-5" />,
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '3-4 weeks',
      questionCount: 50,
      color: 'bg-purple-500',
    },
    {
      id: 'javascript-fundamentals',
      name: 'JavaScript Fundamentals',
      description:
        'Master JavaScript basics, ES6+, and core programming concepts',
      icon: <Code className="w-5 h-5" />,
      category: 'foundation',
      difficulty: 'beginner',
      estimatedTime: '4-5 weeks',
      questionCount: 60,
      color: 'bg-yellow-500',
    },

    // Intermediate Level
    {
      id: 'advanced-css-mastery',
      name: 'Advanced CSS Mastery',
      description: 'Deep dive into advanced CSS techniques and modern layouts',
      icon: <Layers className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 40,
      color: 'bg-indigo-500',
    },
    {
      id: 'javascript-deep-dive',
      name: 'JavaScript Deep Dive',
      description:
        'Advanced JavaScript concepts and modern development patterns',
      icon: <Zap className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '4-5 weeks',
      questionCount: 55,
      color: 'bg-orange-500',
    },
    {
      id: 'typescript-essentials',
      name: 'TypeScript Essentials',
      description: 'Learn TypeScript for type-safe JavaScript development',
      icon: <Settings className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 45,
      color: 'bg-blue-600',
    },
    {
      id: 'react-fundamentals',
      name: 'React Fundamentals',
      description: 'Master React core concepts and modern development patterns',
      icon: <Atom className="w-5 h-5" />,
      category: 'frontend',
      difficulty: 'intermediate',
      estimatedTime: '4-5 weeks',
      questionCount: 50,
      color: 'bg-cyan-500',
    },

    // Advanced Level
    {
      id: 'advanced-react-patterns',
      name: 'Advanced React Patterns',
      description: 'Advanced React concepts and enterprise-level patterns',
      icon: <Cpu className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 45,
      color: 'bg-teal-500',
    },
    {
      id: 'nextjs-mastery',
      name: 'Next.js Mastery',
      description: 'Full-stack React development with Next.js',
      icon: <Server className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 40,
      color: 'bg-gray-600',
    },
    {
      id: 'design-patterns-architecture',
      name: 'Design Patterns & Architecture',
      description:
        'Software design patterns and frontend architecture principles',
      icon: <Building className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 35,
      color: 'bg-red-500',
    },
    {
      id: 'problem-solving-javascript',
      name: 'Problem Solving with JavaScript',
      description: 'Algorithmic thinking and problem-solving skills',
      icon: <Brain className="w-5 h-5" />,
      category: 'advanced',
      difficulty: 'advanced',
      estimatedTime: '4-5 weeks',
      questionCount: 50,
      color: 'bg-green-500',
    },

    // Specialized Topics
    {
      id: 'frontend-security',
      name: 'Frontend Security',
      description:
        'Security best practices and vulnerabilities in frontend development',
      icon: <Shield className="w-5 h-5" />,
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 30,
      color: 'bg-red-600',
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Frontend performance optimization techniques and tools',
      icon: <Gauge className="w-5 h-5" />,
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 35,
      color: 'bg-emerald-500',
    },
    {
      id: 'testing-strategies',
      name: 'Testing Strategies',
      description: 'Comprehensive testing approaches for frontend applications',
      icon: <TestTube className="w-5 h-5" />,
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 40,
      color: 'bg-pink-500',
    },
    {
      id: 'build-tools-devops',
      name: 'Build Tools & DevOps',
      description: 'Modern build tools and deployment strategies',
      icon: <Wrench className="w-5 h-5" />,
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '3-4 weeks',
      questionCount: 35,
      color: 'bg-amber-500',
    },
    {
      id: 'api-integration-communication',
      name: 'API Integration & Communication',
      description: 'Working with APIs and data communication',
      icon: <Network className="w-5 h-5" />,
      category: 'specialized',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 30,
      color: 'bg-violet-500',
    },

    // Interview & Career Preparation
    {
      id: 'system-design-frontend',
      name: 'System Design for Frontend',
      description: 'Frontend system design and architecture decisions',
      icon: <Building2 className="w-5 h-5" />,
      category: 'career',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 40,
      color: 'bg-slate-600',
    },
    {
      id: 'frontend-interview-prep',
      name: 'Frontend Interview Preparation',
      description:
        'Comprehensive preparation for frontend technical interviews',
      icon: <UserCheck className="w-5 h-5" />,
      category: 'career',
      difficulty: 'intermediate',
      estimatedTime: '4-5 weeks',
      questionCount: 60,
      color: 'bg-rose-500',
    },
    {
      id: 'behavioral-soft-skills',
      name: 'Behavioral & Soft Skills',
      description: 'Non-technical skills essential for frontend developers',
      icon: <Users className="w-5 h-5" />,
      category: 'career',
      difficulty: 'beginner',
      estimatedTime: '2-3 weeks',
      questionCount: 25,
      color: 'bg-sky-500',
    },

    // Emerging Technologies
    {
      id: 'ai-tools-frontend',
      name: 'AI Tools for Frontend',
      description:
        'Leveraging AI tools and technologies in frontend development',
      icon: <Bot className="w-5 h-5" />,
      category: 'emerging',
      difficulty: 'intermediate',
      estimatedTime: '2-3 weeks',
      questionCount: 25,
      color: 'bg-fuchsia-500',
    },
    {
      id: 'web3-blockchain-frontend',
      name: 'Web3 & Blockchain Frontend',
      description: 'Frontend development for Web3 and blockchain applications',
      icon: <Coins className="w-5 h-5" />,
      category: 'emerging',
      difficulty: 'advanced',
      estimatedTime: '3-4 weeks',
      questionCount: 30,
      color: 'bg-yellow-600',
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
      id: 'advanced',
      name: 'Advanced',
      count: sections.filter(s => s.category === 'advanced').length,
    },
    {
      id: 'specialized',
      name: 'Specialized',
      count: sections.filter(s => s.category === 'specialized').length,
    },
    {
      id: 'career',
      name: 'Career',
      count: sections.filter(s => s.category === 'career').length,
    },
    {
      id: 'emerging',
      name: 'Emerging',
      count: sections.filter(s => s.category === 'emerging').length,
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

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSave = () => {
    onSave(selectedSections);
  };

  const selectedSectionsData = sections.filter(s =>
    selectedSections.includes(s.id)
  );
  const totalQuestions = selectedSectionsData.reduce(
    (total, section) => total + section.questionCount,
    0
  );
  const totalTime = selectedSectionsData.reduce((total, section) => {
    const timeRange =
      section.estimatedTime.split('-')[1] ||
      section.estimatedTime.split('-')[0];
    return total + parseInt(timeRange.replace('weeks', '').trim());
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Build Your Learning Roadmap
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select the sections you want to focus on for your frontend
            development journey
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={e => setFilterDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name} ({difficulty.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSections.map(section => (
            <div
              key={section.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all duration-200 cursor-pointer ${
                selectedSections.includes(section.id)
                  ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleSectionToggle(section.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${section.color} text-white`}>
                    {section.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        section.difficulty === 'beginner'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : section.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {section.difficulty}
                    </span>
                    {selectedSections.includes(section.id) && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {section.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {section.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{section.estimatedTime}</span>
                  <span>{section.questionCount} questions</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Sections Summary */}
        {selectedSections.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Selected Sections ({selectedSections.length})
              </h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {totalQuestions}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  Total Questions
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {totalTime}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  Weeks Estimated
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedSections.length}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  Sections Selected
                </div>
              </div>
            </div>

            {showPreview && (
              <div className="space-y-2">
                {selectedSectionsData.map(section => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${section.color} text-white`}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {section.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {section.estimatedTime} • {section.questionCount}{' '}
                          questions
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSectionToggle(section.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedSections.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Roadmap ({selectedSections.length} sections)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
