'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Target,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Search,
} from 'lucide-react';
import {
  LearningPlan,
  PlanSection,
  PlanCategory,
  Topic,
} from '@elzatona/shared/types/learning-plans';

// Mock data - in real app, this would come from Firebase
const mockPlans: LearningPlan[] = [
  {
    id: '1',
    name: 'Frontend Fundamentals - 7 Days',
    description:
      'Complete frontend interview preparation covering HTML, CSS, and JavaScript',
    category: 'questions',
    duration: 7,
    difficulty: 'intermediate',
    sections: [
      {
        id: '1-1',
        name: 'HTML Basics',
        description: 'HTML structure, semantic elements, and accessibility',
        topic: 'html',
        questionCount: 25,
        estimatedTime: 120,
        difficulty: 'easy',
        isEnabled: true,
      },
      {
        id: '1-2',
        name: 'CSS Fundamentals',
        description: 'CSS selectors, layout, and responsive design',
        topic: 'css',
        questionCount: 30,
        estimatedTime: 150,
        difficulty: 'medium',
        isEnabled: true,
      },
      {
        id: '1-3',
        name: 'JavaScript Core',
        description: 'Variables, functions, closures, and ES6+ features',
        topic: 'javascript',
        questionCount: 40,
        estimatedTime: 180,
        difficulty: 'medium',
        isEnabled: true,
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'admin-1',
  },
  {
    id: '2',
    name: 'React Mastery - 5 Days',
    description: 'Deep dive into React.js concepts and best practices',
    category: 'framework',
    duration: 5,
    difficulty: 'advanced',
    sections: [
      {
        id: '2-1',
        name: 'React Components',
        description: 'Functional components, hooks, and lifecycle',
        topic: 'reactjs',
        questionCount: 35,
        estimatedTime: 200,
        difficulty: 'medium',
        isEnabled: true,
      },
      {
        id: '2-2',
        name: 'State Management',
        description: 'useState, useEffect, and context API',
        topic: 'reactjs',
        questionCount: 25,
        estimatedTime: 150,
        difficulty: 'hard',
        isEnabled: true,
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    createdBy: 'admin-1',
  },
];

const categoryOptions: { value: PlanCategory; label: string }[] = [
  { value: 'questions', label: 'Practice Questions' },
  { value: 'framework', label: 'Framework Mastery' },
  { value: 'problem-solving', label: 'Problem Solving' },
  { value: 'system-design', label: 'System Design' },
];

const topicOptions: { value: Topic; label: string; category: PlanCategory }[] =
  [
    // Questions
    { value: 'html', label: 'HTML', category: 'questions' },
    { value: 'css', label: 'CSS', category: 'questions' },
    { value: 'javascript', label: 'JavaScript', category: 'questions' },
    // Framework
    { value: 'reactjs', label: 'React.js', category: 'framework' },
    { value: 'nextjs', label: 'Next.js', category: 'framework' },
    { value: 'vue', label: 'Vue.js', category: 'framework' },
    { value: 'svelte', label: 'Svelte', category: 'framework' },
    { value: 'angular', label: 'Angular', category: 'framework' },
    // Problem Solving
    {
      value: 'basic-problem-solving',
      label: 'Basic Problem Solving',
      category: 'problem-solving',
    },
    {
      value: 'frontend-algorithms',
      label: 'Frontend Algorithms',
      category: 'problem-solving',
    },
    {
      value: 'data-structures',
      label: 'Data Structures',
      category: 'problem-solving',
    },
    // System Design
    {
      value: 'facebook-feeds',
      label: 'Facebook Feeds',
      category: 'system-design',
    },
    {
      value: 'twitter-clone',
      label: 'Twitter Clone',
      category: 'system-design',
    },
    { value: 'e-commerce', label: 'E-commerce', category: 'system-design' },
    {
      value: 'real-time-chat',
      label: 'Real-time Chat',
      category: 'system-design',
    },
  ];

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<LearningPlan[]>(mockPlans);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<LearningPlan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<PlanCategory | 'all'>(
    'all'
  );
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const [newPlan, setNewPlan] = useState<Partial<LearningPlan>>({
    name: '',
    description: '',
    category: 'questions',
    duration: 1,
    difficulty: 'beginner',
    sections: [],
    isActive: true,
  });

  const [newSection, setNewSection] = useState<Partial<PlanSection>>({
    name: '',
    description: '',
    topic: 'html',
    questionCount: 10,
    estimatedTime: 60,
    difficulty: 'easy',
    isEnabled: true,
  });

  const filteredPlans = plans.filter(plan => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || plan.category === filterCategory;
    const matchesDifficulty =
      filterDifficulty === 'all' || plan.difficulty === filterDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.description) return;

    const plan: LearningPlan = {
      id: Date.now().toString(),
      name: newPlan.name!,
      description: newPlan.description!,
      category: newPlan.category!,
      duration: newPlan.duration!,
      difficulty: newPlan.difficulty!,
      sections: newPlan.sections || [],
      isActive: newPlan.isActive!,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin-1',
    };

    setPlans([...plans, plan]);
    setNewPlan({
      name: '',
      description: '',
      category: 'questions',
      duration: 1,
      difficulty: 'beginner',
      sections: [],
      isActive: true,
    });
    setIsCreating(false);
  };

  const handleAddSection = () => {
    if (!newSection.name || !newSection.description) return;

    const section: PlanSection = {
      id: Date.now().toString(),
      name: newSection.name!,
      description: newSection.description!,
      topic: newSection.topic!,
      questionCount: newSection.questionCount!,
      estimatedTime: newSection.estimatedTime!,
      difficulty: newSection.difficulty!,
      isEnabled: newSection.isEnabled!,
    };

    if (editingPlan) {
      const updatedPlan = {
        ...editingPlan,
        sections: [...editingPlan.sections, section],
        updatedAt: new Date(),
      };
      setPlans(plans.map(p => (p.id === editingPlan.id ? updatedPlan : p)));
      setEditingPlan(updatedPlan);
    } else {
      setNewPlan({
        ...newPlan,
        sections: [...(newPlan.sections || []), section],
      });
    }

    setNewSection({
      name: '',
      description: '',
      topic: 'html',
      questionCount: 10,
      estimatedTime: 60,
      difficulty: 'easy',
      isEnabled: true,
    });
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
  };

  const handleTogglePlanStatus = (planId: string) => {
    setPlans(
      plans.map(p =>
        p.id === planId
          ? { ...p, isActive: !p.isActive, updatedAt: new Date() }
          : p
      )
    );
  };

  const getTotalQuestions = (plan: LearningPlan) => {
    return plan.sections.reduce(
      (total, section) => total + section.questionCount,
      0
    );
  };

  const getTotalTime = (plan: LearningPlan) => {
    return plan.sections.reduce(
      (total, section) => total + section.estimatedTime,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Plans Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create and manage learning plans for guided learners
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Plans
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plans.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Active Plans
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plans.filter(p => p.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plans.reduce(
                    (total, plan) => total + getTotalQuestions(plan),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Hours
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(
                    plans.reduce(
                      (total, plan) => total + getTotalTime(plan),
                      0
                    ) / 60
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={e =>
                  setFilterCategory(e.target.value as PlanCategory | 'all')
                }
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={filterDifficulty}
                onChange={e => setFilterDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plans List */}
        <div className="space-y-6">
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plan.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plan.difficulty === 'beginner'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : plan.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {plan.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {plan.description}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{getTotalQuestions(plan)} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{plan.duration} days</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{plan.sections.length} sections</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleTogglePlanStatus(plan.id)}
                      className={`p-2 transition-colors ${
                        plan.isActive
                          ? 'text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                          : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                      }`}
                    >
                      {plan.isActive ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Sections:
                  </h4>
                  {plan.sections.map(section => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {section.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {section.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{section.questionCount} questions</span>
                        <span>{Math.round(section.estimatedTime / 60)}h</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            section.difficulty === 'easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : section.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}
                        >
                          {section.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Plan Button */}
        <div className="mt-8">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Plan</span>
          </button>
        </div>

        {/* Create Plan Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Create New Plan
                  </h3>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Plan Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={newPlan.name || ''}
                      onChange={e =>
                        setNewPlan({ ...newPlan, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter plan name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newPlan.category || 'questions'}
                      onChange={e =>
                        setNewPlan({
                          ...newPlan,
                          category: e.target.value as PlanCategory,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newPlan.description || ''}
                    onChange={e =>
                      setNewPlan({ ...newPlan, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter plan description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newPlan.duration || 1}
                      onChange={e =>
                        setNewPlan({
                          ...newPlan,
                          duration: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newPlan.difficulty || 'beginner'}
                      onChange={e =>
                        setNewPlan({
                          ...newPlan,
                          difficulty: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newPlan.isActive || false}
                        onChange={e =>
                          setNewPlan({ ...newPlan, isActive: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </label>
                  </div>
                </div>

                {/* Add Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Add Section
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Section Name
                      </label>
                      <input
                        type="text"
                        value={newSection.name || ''}
                        onChange={e =>
                          setNewSection({ ...newSection, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter section name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Topic
                      </label>
                      <select
                        value={newSection.topic || 'html'}
                        onChange={e =>
                          setNewSection({
                            ...newSection,
                            topic: e.target.value as Topic,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {topicOptions
                          .filter(
                            option => option.category === newPlan.category
                          )
                          .map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newSection.description || ''}
                      onChange={e =>
                        setNewSection({
                          ...newSection,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter section description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Question Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newSection.questionCount || 10}
                        onChange={e =>
                          setNewSection({
                            ...newSection,
                            questionCount: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Estimated Time (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newSection.estimatedTime || 60}
                        onChange={e =>
                          setNewSection({
                            ...newSection,
                            estimatedTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={newSection.difficulty || 'easy'}
                        onChange={e =>
                          setNewSection({
                            ...newSection,
                            difficulty: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleAddSection}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Section</span>
                  </button>
                </div>

                {/* Sections List */}
                {newPlan.sections && newPlan.sections.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Plan Sections ({newPlan.sections.length})
                    </h4>
                    <div className="space-y-2">
                      {newPlan.sections.map((section, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {section.name}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {section.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{section.questionCount} questions</span>
                            <span>
                              {Math.round(section.estimatedTime / 60)}h
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                section.difficulty === 'easy'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : section.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              }`}
                            >
                              {section.difficulty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlan}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
