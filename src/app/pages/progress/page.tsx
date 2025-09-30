'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useSecureProgress } from '@/hooks/useSecureProgress';
import {
  CheckCircle,
  Trophy,
  Clock,
  TrendingUp,
  BookOpen,
  Target,
  User,
  Calendar,
  Award,
  BarChart3,
  Zap,
  Star,
  ArrowRight,
  Loader2,
  Sparkles,
  Rocket,
  Shield,
  Globe,
} from 'lucide-react';

export default function ProgressPage() {
  const {
    progress: localProgress,
    completeQuestion,
    addAchievement,
    setRoadmapSections,
    updateStreak,
  } = useProgressTracking();
  const { isAuthenticated, user, isLoading: isAuthLoading } = useFirebaseAuth();
  const { progress: secureProgress, isLoading: isProgressLoading } =
    useSecureProgress();
  const router = useRouter();
  const [showDemo, setShowDemo] = useState(false);

  const handleCompleteQuestion = () => {
    completeQuestion('demo-question', 120); // 2 minutes
    if (progress.completedQuestions % 3 === 0) {
      addAchievement(`Completed ${progress.completedQuestions + 1} Questions!`);
    }
  };

  const handleAddRoadmapSection = () => {
    const sections = [
      'react-mastery',
      'javascript-deep-dive',
      'typescript-essentials',
      'web-performance',
    ];
    setRoadmapSections(sections);
  };

  const handleUpdateStreak = () => {
    updateStreak();
  };

  // Show loading state while checking authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  // Authenticated User Dashboard
  if (isAuthenticated && user) {
    const progressData = secureProgress || localProgress;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 scale-110" />

              {/* User Avatar */}
              <div className="relative w-24 h-24 bg-gradient-to-r from-green-500 via-blue-600 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}

                {/* Online Status Ring */}
                <div className="absolute inset-0 rounded-3xl border-4 border-green-400 animate-pulse" />
              </div>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome back, {user.displayName || 'Learner'}! 🎉
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Your progress is automatically saved and synced across all
              devices. Keep up the great work!
            </p>
          </div>

          {/* Progress Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Questions Completed */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressData?.totalQuestions || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Questions
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {progressData?.accuracy
                  ? `${Math.round(progressData.accuracy)}% accuracy`
                  : 'Start practicing!'}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressData?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Day Streak
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {progressData?.currentStreak
                  ? 'Keep it up! 🔥'
                  : 'Start your streak today!'}
              </div>
            </div>

            {/* Time Spent */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressData?.timeSpent
                      ? Math.round(progressData.timeSpent / 60)
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Minutes
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total learning time
              </div>
            </div>

            {/* Current Plan */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {progressData?.currentPlan
                      ? `${progressData.currentPlan.progress}%`
                      : '0%'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Plan Progress
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {progressData?.currentPlan ? 'Active plan' : 'No active plan'}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <button
              onClick={() => router.push('/guided-learning')}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Continue Learning</h3>
                  <p className="text-sm opacity-90">Resume your guided path</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => router.push('/free-style-practice')}
              className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Free Practice</h3>
                  <p className="text-sm opacity-90">Practice any topic</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => router.push('/profile')}
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Profile Settings</h3>
                  <p className="text-sm opacity-90">Manage your account</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
              Your Learning Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Achievements
                </h3>
                <div className="space-y-3">
                  {progressData?.achievements?.badges?.length > 0 ? (
                    progressData.achievements.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-900 dark:text-white">
                          {badge}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Complete questions to unlock achievements!</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Last Activity
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {progressData?.lastActivity
                          ? new Date(
                              progressData.lastActivity
                            ).toLocaleDateString()
                          : 'No recent activity'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Shield className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Data Security
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your progress is securely saved
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Cross-Device Sync
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Access from anywhere
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated User - Sign In Prompt
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110" />

            {/* Main Icon */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />

              {/* Rotating Ring */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Track Your Learning Progress
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Monitor your frontend development journey, track achievements, and
            save your progress across all devices.
          </p>
        </div>

        {/* Demo Progress Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
            Try Progress Tracking
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Experience how progress tracking works with these demo actions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={handleCompleteQuestion}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Complete Question</h3>
                  <p className="text-sm opacity-90">+1 to progress</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={handleAddRoadmapSection}
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Add Roadmap</h3>
                  <p className="text-sm opacity-90">4 sections</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={handleUpdateStreak}
              className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Update Streak</h3>
                  <p className="text-sm opacity-90">+1 day</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <ProgressIndicator showSignInPrompt={true} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Question Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track every question you complete, monitor your accuracy, and see
              your improvement over time.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Achievements
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock badges and achievements as you progress through your
              learning journey.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Learning Streaks
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build consistent learning habits with streak tracking and daily
              goals.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Time Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor how much time you spend learning and optimize your study
              sessions.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Custom Roadmaps
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track progress through your personalized learning roadmap and
              sections.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Cross-Device Sync
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access your progress from any device and never lose your learning
              momentum.
            </p>
          </div>
        </div>

        {/* Sign In Benefits */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-white text-center">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl blur-xl" />

            <h2 className="text-4xl font-bold mb-4 relative z-10">
              Ready to Save Your Progress? 🚀
            </h2>
            <p className="text-xl mb-8 opacity-90 relative z-10">
              Sign in to sync your progress across all devices and never lose
              your learning momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <div className="font-semibold text-lg">Mobile</div>
              <div className="text-sm opacity-90">Learn on the go</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <div className="font-semibold text-lg">Desktop</div>
              <div className="text-sm opacity-90">Deep focus sessions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">☁️</span>
              </div>
              <div className="font-semibold text-lg">Cloud Sync</div>
              <div className="text-sm opacity-90">Always up to date</div>
            </div>
          </div>

          <button
            onClick={() => router.push('/auth')}
            className="px-12 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <User className="w-6 h-6" />
            <span>Sign In to Save Progress</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
