'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Play,
  CheckCircle,
  Circle,
} from 'lucide-react';

interface LearningPath {
  id: string;
  name: string;
  order?: number;
  questionCount?: number;
  sectors: Array<{
    id: string;
    name: string;
    questionCount: number;
  }>;
}

interface LearningPathResponse {
  success: boolean;
  data: LearningPath;
  error?: string;
}

export default function LearningPathDetailPage() {
  const router = useRouter();
  const params = useParams();
  const pathId = params.id as string;

  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathId) {
      fetchLearningPath();
    }
  }, [pathId]);

  const fetchLearningPath = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/learning-paths/${pathId}`);
      const data: LearningPathResponse = await response.json();

      if (data.success) {
        setLearningPath(data.data);
      } else {
        setError(data.error || 'Failed to fetch learning path');
      }
    } catch (err) {
      setError('Failed to fetch learning path');
      console.error('Error fetching learning path:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    router.push(`/learning-paths/${pathId}/sections/${sectionId}`);
  };

  const handleStartLearning = () => {
    if (learningPath?.sectors.length > 0) {
      handleSectionClick(learningPath.sectors[0].id);
    }
  };

  const getPathIcon = (pathId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'javascript-practice': <Code className="w-8 h-8" />,
      'javascript-deep-dive': <Code className="w-8 h-8" />,
      'css-practice': <Palette className="w-8 h-8" />,
      'css-mastery': <Palette className="w-8 h-8" />,
      'react-practice': <Zap className="w-8 h-8" />,
      'react-mastery': <Zap className="w-8 h-8" />,
      'html-practice': <Globe className="w-8 h-8" />,
      'typescript-essentials': <Code className="w-8 h-8" />,
      'security-essentials': <Shield className="w-8 h-8" />,
      'performance-optimization': <Zap className="w-8 h-8" />,
      'testing-strategies': <Target className="w-8 h-8" />,
      'build-tools-devops': <Settings className="w-8 h-8" />,
      'frontend-system-design': <Layers className="w-8 h-8" />,
      'api-integration': <Globe className="w-8 h-8" />,
      'ai-tools-frontend': <Brain className="w-8 h-8" />,
    };
    return iconMap[pathId] || <BookOpen className="w-8 h-8" />;
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading learning path...
          </p>
        </div>
      </div>
    );
  }

  if (error || !learningPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Path
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || 'Learning path not found'}
          </p>
          <button
            onClick={() => router.push('/learning-paths')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Learning Paths
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getPathColor(pathId)} rounded-3xl blur-3xl opacity-30 scale-110`}
            />
            <div
              className={`relative w-32 h-32 bg-gradient-to-r ${getPathColor(pathId)} rounded-3xl flex items-center justify-center mx-auto shadow-2xl`}
            >
              <div className="text-white">{getPathIcon(pathId)}</div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {learningPath.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Master {learningPath.name.toLowerCase()} through structured learning
            with curated topics and practice questions.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {learningPath.sectors.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Topics
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {learningPath.questionCount || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Questions
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Free Access
              </div>
            </div>
          </div>

          {/* Start Learning Button */}
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Play className="w-6 h-6" />
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Topics Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Learning Topics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Click on any topic to start learning with curated questions and
              resources.
            </p>

            <div className="grid gap-4">
              {learningPath.sectors.map((sector, index) => (
                <div
                  key={sector.id}
                  className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                  onClick={() => handleSectionClick(sector.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {sector.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{sector.questionCount} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              ~{Math.ceil(sector.questionCount / 10)} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                        <Circle className="w-3 h-3" />
                        <span>Not Started</span>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/learning-paths')}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Learning Paths</span>
          </button>
        </div>
      </div>
    </div>
  );
}
