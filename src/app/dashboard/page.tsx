'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import {
  BookOpen,
  Code,
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  BarChart3,
  CheckCircle,
  Loader2,
  LogOut,
  Settings,
  Trophy,
  Star,
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

// Recent activities data
const recentActivities = [
  {
    id: 1,
    type: 'question',
    title: 'Completed CSS Grid question',
    time: '2 hours ago',
    points: 10,
    icon: CheckCircle,
    color: 'text-green-500',
  },
  {
    id: 2,
    type: 'challenge',
    title: 'Solved React Hooks challenge',
    time: '1 day ago',
    points: 25,
    icon: Trophy,
    color: 'text-blue-500',
  },
  {
    id: 3,
    type: 'path',
    title: 'Started JavaScript Fundamentals path',
    time: '2 days ago',
    points: 5,
    icon: Target,
    color: 'text-purple-500',
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Earned "Quick Learner" badge',
    time: '3 days ago',
    points: 50,
    icon: Award,
    color: 'text-yellow-500',
  },
];

// Recommendations data
const recommendations = [
  {
    id: 1,
    title: 'React Hooks Deep Dive',
    description: 'Master useState, useEffect, and custom hooks',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'CSS Grid Mastery',
    description: 'Learn advanced CSS Grid layouts and techniques',
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Features',
    description: 'Explore modern JavaScript features and syntax',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
  },
];

export default function DashboardPage() {
  const [showStats, setShowStats] = useState(true);
  const { user, isAuthenticated, isLoading, signOut } = useFirebaseAuth();

  if (isLoading) {
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

  // Authenticated user dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.displayName || 'Developer'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue your frontend development journey?
            </p>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Progress
            </h2>
            <button
              onClick={() => setShowStats(!showStats)}
              className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>

          {showStats && (
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {user?.progress?.questionsCompleted || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Questions Completed
                    </div>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {user?.progress?.totalPoints || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Total Points
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {user?.progress?.currentStreak || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Day Streak
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {user?.progress?.badges?.length || 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Badges Earned
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map(card => (
            <Link
              key={card.id}
              href={card.href}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {card.description}
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {card.stats}
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activities & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center`}
                  >
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    +{activity.points}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Recommended for You
            </h3>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <rec.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {rec.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {rec.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {rec.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
