'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Award,
  BarChart3,
  Zap,
} from 'lucide-react';
import { useFlashcardSession } from '@/hooks/useFlashcardSession';

interface FlashcardDashboardProps {
  className?: string;
}

export default function FlashcardDashboard({
  className = '',
}: FlashcardDashboardProps) {
  const {
    cardsDueForReview,
    newCardsAvailable,
    totalCardsStudied,
    sessionStats,
    isSessionActive,
    startSession,
    endSession,
    isLoading,
    error,
  } = useFlashcardSession();

  const handleStartReview = () => startSession('review', 20);
  const handleStartNew = () => startSession('new', 10);
  const handleStartMixed = () => startSession('mixed', 15);

  const stats = [
    {
      title: 'Cards Due for Review',
      value: cardsDueForReview.length,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      description: 'Cards ready for review',
    },
    {
      title: 'New Cards Available',
      value: newCardsAvailable,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      description: "Cards you haven't seen yet",
    },
    {
      title: 'Total Cards Studied',
      value: totalCardsStudied,
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      description: 'Cards in your learning history',
    },
    {
      title: 'Current Session Accuracy',
      value: `${Math.round(sessionStats.accuracy)}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      description: 'Accuracy in current session',
    },
  ];

  const sessionActions = [
    {
      title: 'Review Due Cards',
      description: 'Study cards that are due for review',
      icon: Clock,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: handleStartReview,
      disabled: cardsDueForReview.length === 0,
      count: cardsDueForReview.length,
    },
    {
      title: 'Learn New Cards',
      description: 'Discover new flashcards',
      icon: BookOpen,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: handleStartNew,
      disabled: newCardsAvailable === 0,
      count: newCardsAvailable,
    },
    {
      title: 'Mixed Session',
      description: 'Combine review and new cards',
      icon: Zap,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: handleStartMixed,
      disabled: cardsDueForReview.length === 0 && newCardsAvailable === 0,
      count: cardsDueForReview.length + newCardsAvailable,
    },
  ];

  if (error) {
    return (
      <div
        className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 ${className}`}
      >
        <div className="flex items-center space-x-3">
          <XCircle className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Error Loading Flashcards
            </h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Flashcard Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your learning progress and start new study sessions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {stat.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Session Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Start Study Session
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sessionActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.onClick}
              disabled={action.disabled || isLoading}
              className={`relative p-6 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                action.disabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : action.color
              }`}
            >
              {action.disabled ? (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <action.icon className="w-6 h-6 opacity-50" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 opacity-75">
                    {action.title}
                  </h4>
                  <p className="text-sm opacity-60 mb-3">
                    {action.description}
                  </p>
                  <div className="bg-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                    No cards available
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <action.icon className="w-6 h-6" />
                    {action.count > 0 && (
                      <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                        {action.count}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{action.title}</h4>
                  <p className="text-sm opacity-90">{action.description}</p>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current Session Stats */}
      {isSessionActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Current Session
            </h3>
            <button
              onClick={endSession}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              End Session
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {sessionStats.cardsReviewed}
              </div>
              <div className="text-sm opacity-90">Cards Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">
                {sessionStats.correctAnswers}
              </div>
              <div className="text-sm opacity-90">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-200">
                {sessionStats.incorrectAnswers}
              </div>
              <div className="text-sm opacity-90">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(sessionStats.accuracy)}%
              </div>
              <div className="text-sm opacity-90">Accuracy</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <span>Time Spent: {sessionStats.timeSpent} minutes</span>
              <span>
                Progress: {sessionStats.cardsReviewed} cards completed
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Study Recommendations
        </h3>

        <div className="space-y-4">
          {cardsDueForReview.length > 0 && (
            <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <Clock className="w-5 h-5 text-orange-500 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800 dark:text-orange-200">
                  {cardsDueForReview.length} cards are due for review
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Review these cards to maintain your learning progress
                </p>
              </div>
            </div>
          )}

          {newCardsAvailable > 0 && (
            <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-800 dark:text-blue-200">
                  {newCardsAvailable} new cards available
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Discover new content to expand your knowledge
                </p>
              </div>
            </div>
          )}

          {cardsDueForReview.length === 0 && newCardsAvailable === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                All caught up!
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                You&apos;ve reviewed all your cards and learned all available
                content. Great job!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
