'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookieAuth } from '@/contexts/CookieAuthContext';
import EnhancedDashboard from '@/components/EnhancedDashboard';
import {
  BookOpen,
  Code,
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  Loader2,
  Trophy,
} from 'lucide-react';

// Dashboard cards data
const dashboardCards = [
  {
    id: 1,
    title: 'Practice Questions',
    description: 'Continue practicing frontend questions',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    href: '/practice/fundamentals',
    stats: '24/100 completed',
  },
  {
    id: 2,
    title: 'Learning Paths',
    description: 'Follow structured learning paths',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    href: '/learning-paths',
    stats: '3 paths in progress',
  },
  {
    id: 3,
    title: 'Coding Challenges',
    description: 'Solve real coding problems',
    icon: Code,
    color: 'from-green-500 to-green-600',
    href: '/coding',
    stats: '12 challenges solved',
  },
  {
    id: 4,
    title: 'Progress Analytics',
    description: 'View your learning progress',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-600',
    href: '/progress',
    stats: '85% completion rate',
  },
];

// Dashboard cards data only - other data moved to EnhancedDashboard

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useCookieAuth();
  const [showStats, setShowStats] = useState(false);
  const [forceShowDashboard, setForceShowDashboard] = useState(false);

  // Add a timeout to force show dashboard if loading takes too long
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.warn('Dashboard loading timeout - forcing dashboard to show');
        setForceShowDashboard(true);
      }, 8000); // 8 second timeout

      return () => clearTimeout(timeout);
    } else {
      setForceShowDashboard(false);
    }
  }, [isLoading]);

  if (isLoading && !forceShowDashboard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Frontend KodDev
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your comprehensive platform for mastering frontend development
              interviews. Sign in to track your progress, unlock achievements,
              and get personalized recommendations.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🚀 Sign In & Start Learning
              </Link>
              <Link
                href="/learning-paths"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-xl transition-all duration-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                📚 Start Learning
              </Link>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Practice Questions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Access 500+ carefully curated frontend interview questions with
                detailed explanations and solutions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Learning Paths
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Follow structured learning paths designed by industry experts to
                master specific technologies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Gamified Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Earn badges, track streaks, and compete with others while
                building your frontend skills.
              </p>
            </div>
          </div>

          {/* Statistics Preview */}
          <div className="text-center">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg mb-6"
            >
              {showStats ? 'Hide Statistics' : 'Show Statistics'}
            </button>

            {showStats && (
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Practice Questions
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    25+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Learning Paths
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    100+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Coding Challenges
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    AI Support
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard - use enhanced dashboard
  return <EnhancedDashboard />;
}
