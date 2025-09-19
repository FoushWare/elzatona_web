// v1.0 - Firebase Questions Demo Page
'use client';

import { useState } from 'react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import FirebaseQuestion from '@/components/FirebaseQuestion';
import QuestionManager from '@/components/QuestionManager';
import {
  BookOpen,
  Settings,
  Play,
  BarChart3,
  Loader2,
  ArrowRight,
  Database,
} from 'lucide-react';

type ViewMode = 'demo' | 'manager' | 'quiz';

export default function FirebaseQuestionsPage() {
  const { user, isAuthenticated, isLoading } = useFirebaseAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('demo');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<any[]>([]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Firebase Questions System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Please sign in to access the Firebase-powered questions system
            </p>
            <a
              href="/auth"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  const viewModes = [
    {
      id: 'demo' as ViewMode,
      title: 'Question Demo',
      description: 'Try Firebase-powered questions',
      icon: Play,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'manager' as ViewMode,
      title: 'Question Manager',
      description: 'Manage questions in Firebase',
      icon: Settings,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'quiz' as ViewMode,
      title: 'Quiz Mode',
      description: 'Take a full quiz',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const handleQuestionComplete = (result: any) => {
    setQuizResults(prev => [...prev, result]);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleQuizComplete = () => {
    setCurrentView('demo');
    setCurrentQuestionIndex(0);
    setQuizResults([]);
  };

  if (currentView === 'manager') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('demo')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Demo</span>
            </button>
          </div>
          <QuestionManager />
        </div>
      </div>
    );
  }

  if (currentView === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('demo')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Demo</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Mode
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Answer multiple questions and track your progress
            </p>
          </div>

          <FirebaseQuestion
            category="JavaScript"
            difficulty="medium"
            onComplete={handleQuestionComplete}
            onNext={currentQuestionIndex < 4 ? undefined : handleQuizComplete}
            showNavigation={true}
            autoAdvance={false}
          />

          {quizResults.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quiz Progress
              </h3>
              <div className="space-y-2">
                {quizResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Question {index + 1}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        +{result.points} pts
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {result.timeSpent}s
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Database className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Firebase Questions System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience a fully Firebase-powered question and answer system with
            real-time progress tracking, question management, and dynamic
            content delivery.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Welcome, {user?.displayName}!</strong> This system stores
              questions as JSON in Firebase Firestore and provides real-time
              question delivery with progress tracking.
            </p>
          </div>
        </div>

        {/* View Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {viewModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => setCurrentView(mode.id)}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${mode.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <mode.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {mode.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {mode.description}
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <span>Try Now</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Features Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🚀 Firebase Questions Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    JSON Storage
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Questions stored as JSON documents in Firebase Firestore
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Real-time Updates
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Questions update in real-time across all users
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400">
                    🎯
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Progress Tracking
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track user attempts and performance in real-time
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 dark:text-yellow-400">
                    🏆
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Question Management
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Full CRUD operations for questions and categories
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 dark:text-red-400">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Search & Filter
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Advanced search and filtering capabilities
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    ⚡
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Performance
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized queries and caching for fast performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎮 Try a Firebase Question
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Experience a question loaded directly from Firebase Firestore with
            real-time progress tracking.
          </p>

          <FirebaseQuestion
            category="JavaScript"
            difficulty="medium"
            onComplete={result => {
              console.log('Question completed:', result);
            }}
            showNavigation={true}
            autoAdvance={false}
          />
        </div>
      </div>
    </div>
  );
}
