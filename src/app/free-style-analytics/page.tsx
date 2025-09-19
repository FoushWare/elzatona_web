'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Award,
  CheckCircle,
  BookOpen,
  Zap,
  Star,
  Calendar,
  Filter,
  Download,
} from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';

interface AnalyticsData {
  totalSessions: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  sectionsProgress: {
    id: string;
    name: string;
    completed: number;
    total: number;
    accuracy: number;
    timeSpent: number;
  }[];
  dailyProgress: {
    date: string;
    questionsCompleted: number;
    accuracy: number;
    timeSpent: number;
  }[];
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
  }[];
  difficultyBreakdown: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
}

export default function FreeStyleAnalyticsPage() {
  const { userType } = useUserType();
  const { isAuthenticated, isLoading: isAuthLoading } = useFirebaseAuth();
  const router = useRouter();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | 'all'>(
    '7d'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && userType !== 'self-directed') {
      router.push('/learning-mode');
      return;
    }

    loadAnalyticsData();
  }, [userType, isAuthLoading, router, selectedPeriod]);

  const loadAnalyticsData = () => {
    setIsLoading(true);

    // Mock data - in real implementation, this would come from API
    const mockAnalytics: AnalyticsData = {
      totalSessions: 18,
      totalQuestions: 420,
      correctAnswers: 336,
      totalTimeSpent: 840, // 14 hours
      currentStreak: 7,
      longestStreak: 15,
      sectionsProgress: [
        {
          id: 'html-css',
          name: 'HTML & CSS',
          completed: 65,
          total: 80,
          accuracy: 89,
          timeSpent: 120,
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          completed: 95,
          total: 100,
          accuracy: 94,
        },
        { id: 'react', name: 'React', completed: 78, total: 90, accuracy: 87 },
        {
          id: 'typescript',
          name: 'TypeScript',
          completed: 45,
          total: 60,
          accuracy: 82,
        },
        {
          id: 'nextjs',
          name: 'Next.js',
          completed: 32,
          total: 50,
          accuracy: 85,
        },
        {
          id: 'system-design',
          name: 'System Design',
          completed: 28,
          total: 40,
          accuracy: 78,
        },
      ],
      dailyProgress: [
        {
          date: '2024-01-15',
          questionsCompleted: 25,
          accuracy: 92,
          timeSpent: 45,
        },
        {
          date: '2024-01-16',
          questionsCompleted: 22,
          accuracy: 86,
          timeSpent: 40,
        },
        {
          date: '2024-01-17',
          questionsCompleted: 28,
          accuracy: 96,
          timeSpent: 50,
        },
        {
          date: '2024-01-18',
          questionsCompleted: 20,
          accuracy: 85,
          timeSpent: 35,
        },
        {
          date: '2024-01-19',
          questionsCompleted: 30,
          accuracy: 93,
          timeSpent: 55,
        },
        {
          date: '2024-01-20',
          questionsCompleted: 24,
          accuracy: 88,
          timeSpent: 42,
        },
        {
          date: '2024-01-21',
          questionsCompleted: 26,
          accuracy: 90,
          timeSpent: 48,
        },
      ],
      achievements: [
        {
          id: 'first-session',
          name: 'First Steps',
          description: 'Completed your first free style session',
          icon: '🎯',
          earnedAt: '2024-01-15',
        },
        {
          id: 'streak-7',
          name: 'Consistent Learner',
          description: 'Maintained a 7-day learning streak',
          icon: '🔥',
          earnedAt: '2024-01-21',
        },
        {
          id: 'accuracy-95',
          name: 'Accuracy Master',
          description: 'Achieved 95% accuracy in a session',
          icon: '🎯',
          earnedAt: '2024-01-17',
        },
        {
          id: 'section-master',
          name: 'Section Master',
          description: 'Completed 100+ questions in JavaScript',
          icon: '🏆',
          earnedAt: '2024-01-20',
        },
      ],
      difficultyBreakdown: {
        easy: { correct: 120, total: 130 },
        medium: { correct: 180, total: 220 },
        hard: { correct: 36, total: 70 },
      },
    };

    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    }, 1000);
  };

  const getAccuracyPercentage = () => {
    if (!analytics) return 0;
    return Math.round(
      (analytics.correctAnswers / analytics.totalQuestions) * 100
    );
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getDifficultyAccuracy = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!analytics) return 0;
    const data = analytics.difficultyBreakdown[difficulty];
    return Math.round((data.correct / data.total) * 100);
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Analytics Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start practicing to see your analytics.
          </p>
          <button
            onClick={() => router.push('/free-style-practice')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Start Practicing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/free-style-roadmap')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Free Style Analytics
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track your learning progress and achievements
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-lg p-1 shadow-lg border border-white/20 dark:border-gray-700/20">
            {(['7d', '30d', 'all'] as const).map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {period === '7d'
                  ? 'Last 7 days'
                  : period === '30d'
                    ? 'Last 30 days'
                    : 'All time'}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Questions
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.totalQuestions}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Accuracy
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getAccuracyPercentage()}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Time Spent
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(analytics.totalTimeSpent)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current Streak
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.currentStreak} days
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Progress */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Section Progress
            </h3>
            <div className="space-y-4">
              {analytics.sectionsProgress.map(section => (
                <div key={section.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {section.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {section.completed}/{section.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(section.completed / section.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{section.accuracy}% accuracy</span>
                    <span>{formatTime(section.timeSpent)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Difficulty Breakdown
            </h3>
            <div className="space-y-4">
              {(['easy', 'medium', 'hard'] as const).map(difficulty => {
                const data = analytics.difficultyBreakdown[difficulty];
                const accuracy = getDifficultyAccuracy(difficulty);
                return (
                  <div key={difficulty} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {difficulty}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          difficulty === 'easy'
                            ? 'bg-green-500'
                            : difficulty === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{
                          width: `${(data.correct / data.total) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {accuracy}% accuracy
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="mt-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Daily Progress
            </h3>
            <div className="space-y-3">
              {analytics.dailyProgress.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        {new Date(day.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {day.questionsCompleted} questions •{' '}
                        {formatTime(day.timeSpent)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {day.accuracy}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      accuracy
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analytics.achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Earned{' '}
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

