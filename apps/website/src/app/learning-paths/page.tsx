'use client';

import React, { useState, useMemo, ReactNode, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  Users,
  Star,
  ChevronRight,
  Code,
  Palette,
  Zap,
  Shield,
  Layers,
  Settings,
  Brain,
  Globe,
  Search,
  Filter,
  Grid,
  List,
} from 'lucide-react';
import { useLearningPaths } from '@elzatona/shared-hooks';
import Link from 'next/link';

interface LearningPath {
  id: string;
  name: string;
  order?: number;
  questionCount?: number;
  sectors: Array<{
    id: string;
    name: string;
    question_count: number;
  }>;
}

interface PlanDetailsCategory {
  id: string;
  name: string;
  topics: Array<{
    id: string;
    name: string;
    questions: Array<{
      id: string;
      text: string;
      options?: any[];
    }>;
  }>;
}

export default function LearningPathsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use shared hook
  const {
    learningPaths,
    isLoading: loading,
    error,
    refetch,
  } = useLearningPaths();

  const [expandedPathId, setExpandedPathId] = useState<string | null>(null);
  const [pathDetails, setPathDetails] = useState<
    Record<
      string,
      {
        loading: boolean;
        error: string | null;
        categories: PlanDetailsCategory[];
      }
    >
  >({});

  const toggleExpand = useCallback(
    async (pathId: string) => {
      setExpandedPathId(prev => (prev === pathId ? null : pathId));
      if (!pathDetails[pathId]) {
        setPathDetails(prev => ({
          ...prev,
          [pathId]: { loading: true, error: null, categories: [] },
        }));
        try {
          const res = await fetch(
            `/api/guided-learning/plan-details/${pathId}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const categories: PlanDetailsCategory[] =
            data?.data?.categories || data?.categories || [];
          setPathDetails(prev => ({
            ...prev,
            [pathId]: { loading: false, error: null, categories },
          }));
        } catch (e: any) {
          setPathDetails(prev => ({
            ...prev,
            [pathId]: {
              loading: false,
              error: e?.message || 'Failed to load details',
              categories: [],
            },
          }));
        }
      }
    },
    [pathDetails]
  );

  // Filtered learning paths based on search
  const filteredPaths = useMemo(() => {
    return learningPaths.filter(
      path =>
        path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.sectors.some((sector: any) =>
          sector.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [learningPaths, searchTerm]);

  const getPathIcon = (pathId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'javascript-practice': <Code className='w-6 h-6' />,
      'javascript-deep-dive': <Code className='w-6 h-6' />,
      'css-practice': <Palette className='w-6 h-6' />,
      'css-mastery': <Palette className='w-6 h-6' />,
      'react-practice': <Zap className='w-6 h-6' />,
      'react-mastery': <Zap className='w-6 h-6' />,
      'html-practice': <Globe className='w-6 h-6' />,
      'typescript-essentials': <Code className='w-6 h-6' />,
      'security-essentials': <Shield className='w-6 h-6' />,
      'performance-optimization': <Zap className='w-6 h-6' />,
      'testing-strategies': <Target className='w-6 h-6' />,
      'build-tools-devops': <Settings className='w-6 h-6' />,
      'frontend-system-design': <Layers className='w-6 h-6' />,
      'api-integration': <Globe className='w-6 h-6' />,
      'ai-tools-frontend': <Brain className='w-6 h-6' />,
    };
    return iconMap[pathId] || <BookOpen className='w-6 h-6' />;
  };

  const getPathColor = (pathId: string) => {
    const colorMap: Record<string, string> = {
      'javascript-practice': 'from-yellow-500 to-orange-500',
      'javascript-deep-dive': 'from-yellow-500 to-orange-500',
      'css-practice': 'from-blue-500 to-indigo-500',
      'css-mastery': 'from-blue-500 to-indigo-500',
      'react-practice': 'from-cyan-500 to-blue-500',
      'react-mastery': 'from-cyan-500 to-blue-500',
      'html-practice': 'from-orange-500 to-red-500',
      'typescript-essentials': 'from-blue-600 to-indigo-600',
      'security-essentials': 'from-red-500 to-pink-500',
      'performance-optimization': 'from-green-500 to-emerald-500',
      'testing-strategies': 'from-purple-500 to-violet-500',
      'build-tools-devops': 'from-gray-500 to-slate-500',
      'frontend-system-design': 'from-indigo-500 to-purple-500',
      'api-integration': 'from-teal-500 to-cyan-500',
      'ai-tools-frontend': 'from-pink-500 to-rose-500',
    };
    return colorMap[pathId] || 'from-gray-500 to-slate-500';
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400 text-lg'>
            Loading learning paths...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
            <BookOpen className='w-8 h-8 text-red-600' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Error Loading Paths
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            {error instanceof Error
              ? error.message
              : 'Failed to load learning paths'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 scale-110' />
            <div className='relative w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl'>
              <BookOpen className='w-12 h-12 text-white' />
            </div>
          </div>

          <h1 className='text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>
            Learning Paths
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Choose from structured learning paths covering all aspects of
            frontend development. Each path contains curated topics and
            questions to master specific skills.
          </p>
        </div>

        {/* Search and Filter */}
        <div className='mb-8 max-w-4xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search learning paths or topics...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                />
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className='w-5 h-5' />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <List className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        {filteredPaths.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Search className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              No paths found
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 max-w-6xl mx-auto ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredPaths.map(path => (
              <div
                key={path.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-transparent hover:scale-105 ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
                onClick={() => toggleExpand(path.id)}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getPathColor(path.id)} opacity-5`}
                    />

                    {/* Content */}
                    <div className='relative'>
                      {/* Icon and Title */}
                      <div className='flex items-center gap-4 mb-4'>
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${getPathColor(path.id)} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          {getPathIcon(path.id)}
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>
                            {path.name}
                          </h3>
                          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                            <div className='flex items-center gap-1'>
                              <Target className='w-4 h-4' />
                              <span>{path.sectors.length} topics</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <BookOpen className='w-4 h-4' />
                              <span>{path.questionCount || 0} questions</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Topics Preview */}
                      <div className='mb-4'>
                        <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                          Topics:
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {path.sectors.slice(0, 3).map((sector: any) => (
                            <span
                              key={sector.id}
                              className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium'
                            >
                              {sector.name}
                            </span>
                          ))}
                          {path.sectors.length > 3 && (
                            <span className='px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium'>
                              +{path.sectors.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className='flex items-center justify-between'>
                        <Link
                          href={`/guided-practice?plan=${path.id}`}
                          className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                          onClick={e => e.stopPropagation()}
                        >
                          <span>Start Quizzes</span>
                          <ArrowRight className='w-4 h-4' />
                        </Link>
                      </div>

                      {/* Expandable details: categories -> topics -> questions */}
                      {expandedPathId === path.id && (
                        <div className='mt-6 border-t border-gray-200 dark:border-gray-700 pt-4'>
                          {pathDetails[path.id]?.loading && (
                            <p className='text-gray-500 dark:text-gray-400'>
                              Loading details...
                            </p>
                          )}
                          {pathDetails[path.id]?.error && (
                            <p className='text-red-600 dark:text-red-400'>
                              {pathDetails[path.id]?.error}
                            </p>
                          )}
                          {!!pathDetails[path.id]?.categories?.length && (
                            <div className='space-y-4'>
                              {pathDetails[path.id].categories.map(cat => (
                                <div
                                  key={cat.id}
                                  className='bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4'
                                >
                                  <div className='flex items-center justify-between'>
                                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                                      {cat.name}
                                    </h4>
                                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                                      {cat.topics.length} topics
                                    </span>
                                  </div>
                                  <div className='mt-3 space-y-3'>
                                    {cat.topics.map(topic => (
                                      <div
                                        key={topic.id}
                                        className='bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700'
                                      >
                                        <div className='flex items-center justify-between'>
                                          <div>
                                            <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>
                                              {topic.name}
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                              {topic.questions.length} questions
                                            </p>
                                          </div>
                                          <Link
                                            href={`/guided-practice?plan=${path.id}`}
                                            className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700'
                                            onClick={e => e.stopPropagation()}
                                          >
                                            Start Quiz
                                            <ArrowRight className='w-3 h-3' />
                                          </Link>
                                        </div>
                                        {topic.questions.length > 0 && (
                                          <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                            {topic.questions
                                              .slice(0, 4)
                                              .map(q => (
                                                <div
                                                  key={q.id}
                                                  className='text-xs text-gray-600 dark:text-gray-400 truncate'
                                                >
                                                  • {q.text}
                                                </div>
                                              ))}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${getPathColor(path.id)} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    >
                      {getPathIcon(path.id)}
                    </div>
                    <div className='flex-1 ml-4'>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                        {path.name}
                      </h3>
                      <div className='flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                        <div className='flex items-center gap-1'>
                          <Target className='w-4 h-4' />
                          <span>{path.sectors.length} topics</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <BookOpen className='w-4 h-4' />
                          <span>{path.questionCount || 0} questions</span>
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {path.sectors.slice(0, 4).map((sector: any) => (
                          <span
                            key={sector.id}
                            className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs'
                          >
                            {sector.name}
                          </span>
                        ))}
                        {path.sectors.length > 4 && (
                          <span className='px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs'>
                            +{path.sectors.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex-shrink-0'>
                      <ChevronRight className='w-6 h-6 text-gray-400' />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className='text-center mt-12'>
          <button
            onClick={() => router.back()}
            className='inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md'
          >
            <ArrowRight className='w-4 h-4 rotate-180' />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
