'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  BarChart3,
  Play,
  Settings,
  Plus,
  Database,
} from 'lucide-react';
import FlashcardDashboard from '@/components/FlashcardDashboard';
import FlashcardSession from '@/components/FlashcardSession';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';

type TabType = 'dashboard' | 'session' | 'manage';

export default function FlashcardsPage() {
  const { user } = useFirebaseAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: BarChart3,
      description: 'View your progress and start sessions',
    },
    {
      id: 'session' as TabType,
      label: 'Study Session',
      icon: Play,
      description: 'Active study session',
    },
    {
      id: 'manage' as TabType,
      label: 'Manage Cards',
      icon: Settings,
      description: 'Create and edit flashcards',
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please sign in to access your flashcard dashboard and track your
              learning progress.
            </p>
            <a
              href="/auth"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-4"
          >
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interactive Flashcards
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Reinforce your learning with spaced repetition. Review cards
            you&apos;ve struggled with and discover new content to expand your
            knowledge.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs opacity-75 hidden sm:block">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <FlashcardDashboard />}

          {activeTab === 'session' && <FlashcardSession />}

          {activeTab === 'manage' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Card Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create, edit, and organize your flashcards. This feature is
                  coming soon!
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    disabled
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Card</span>
                  </button>
                  <button
                    disabled
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                  >
                    <Database className="w-4 h-4" />
                    <span>Import Cards</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Spaced Repetition
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cards you struggle with appear more frequently, while mastered
              cards are scheduled for longer intervals using proven learning
              algorithms.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Progress Tracking
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor your learning progress with detailed statistics, accuracy
              rates, and study streaks to stay motivated.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Play className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Adaptive Sessions
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smart session modes that adapt to your learning needs - review due
              cards, learn new content, or mix both for optimal retention.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
