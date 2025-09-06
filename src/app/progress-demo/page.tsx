// v1.0 - Progress Tracking Demo Page
'use client';

import { useState } from 'react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import QuestionWithProgress from '@/components/QuestionWithProgress';
import ChallengeWithProgress from '@/components/ChallengeWithProgress';
import LearningPathWithProgress from '@/components/LearningPathWithProgress';
import {
  BookOpen,
  Code,
  Target,
  BarChart3,
  Loader2,
  ArrowRight,
  Play,
} from 'lucide-react';

// Mock data for demonstration
const mockQuestion = {
  id: 'demo-question-1',
  question: 'What is the correct way to declare a variable in JavaScript?',
  options: [
    'var myVar = 10;',
    'variable myVar = 10;',
    'v myVar = 10;',
    'declare myVar = 10;',
  ],
  correctAnswer: 0,
  explanation:
    'In JavaScript, variables are declared using the var, let, or const keywords. The var keyword is the traditional way to declare variables.',
  category: 'JavaScript',
  difficulty: 'easy' as const,
};

const mockChallenge = {
  id: 'demo-challenge-1',
  title: 'Build a Simple Calculator',
  description:
    'Create a basic calculator that can perform addition, subtraction, multiplication, and division.',
  instructions: [
    'Create a function called calculate that takes two numbers and an operation',
    'Support operations: +, -, *, /',
    'Return the result of the calculation',
    'Handle division by zero by returning "Error"',
  ],
  category: 'JavaScript',
  difficulty: 'medium' as const,
  estimatedTime: 30,
  maxScore: 100,
  testCases: [
    {
      input: 'calculate(5, 3, "+")',
      expectedOutput: '8',
      description: 'Addition test',
    },
    {
      input: 'calculate(10, 2, "/")',
      expectedOutput: '5',
      description: 'Division test',
    },
    {
      input: 'calculate(5, 0, "/")',
      expectedOutput: 'Error',
      description: 'Division by zero test',
    },
  ],
};

const mockLearningPath = {
  id: 'demo-path-1',
  title: 'JavaScript Fundamentals',
  description:
    'Learn the basics of JavaScript programming including variables, functions, and control structures.',
  category: 'JavaScript',
  difficulty: 'beginner' as const,
  estimatedTime: 120,
  sections: [
    {
      id: 'section-1',
      title: 'Variables and Data Types',
      description:
        'Understanding how to declare and use variables in JavaScript',
      content:
        'JavaScript has several data types including numbers, strings, booleans, objects, and more. Variables can be declared using var, let, or const keywords.',
      type: 'reading' as const,
      estimatedTime: 15,
      completed: false,
    },
    {
      id: 'section-2',
      title: 'Functions',
      description: 'Learn how to create and use functions in JavaScript',
      content:
        'Functions are reusable blocks of code that perform specific tasks. They can take parameters and return values.',
      type: 'interactive' as const,
      estimatedTime: 20,
      completed: false,
    },
    {
      id: 'section-3',
      title: 'Control Structures',
      description:
        'Understanding if statements, loops, and other control structures',
      content:
        'Control structures allow you to control the flow of your program. This includes if/else statements, for loops, while loops, and switch statements.',
      type: 'video' as const,
      estimatedTime: 25,
      completed: false,
    },
  ],
};

type DemoMode = 'question' | 'challenge' | 'learning-path' | 'dashboard';

export default function ProgressDemoPage() {
  const { user, isAuthenticated, isLoading } = useFirebaseAuth();
  const [currentMode, setCurrentMode] = useState<DemoMode>('dashboard');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading demo...</p>
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
              Progress Tracking Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Please sign in to see the progress tracking features in action
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

  const demoModes = [
    {
      id: 'dashboard' as DemoMode,
      title: 'Dashboard',
      description: 'View your progress dashboard with analytics',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'question' as DemoMode,
      title: 'Practice Questions',
      description: 'Try interactive questions with progress tracking',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'challenge' as DemoMode,
      title: 'Coding Challenges',
      description: 'Solve coding challenges with real-time progress',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'learning-path' as DemoMode,
      title: 'Learning Paths',
      description: 'Follow structured learning paths with progress tracking',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const handleQuestionComplete = () => {
    setQuestionIndex(prev => prev + 1);
    if (questionIndex >= 2) {
      setCurrentMode('dashboard');
    }
  };

  const handleChallengeComplete = () => {
    setChallengeIndex(prev => prev + 1);
    if (challengeIndex >= 1) {
      setCurrentMode('dashboard');
    }
  };

  const handleLearningPathComplete = () => {
    setCurrentMode('dashboard');
  };

  if (currentMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Progress Tracking Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Experience the comprehensive progress tracking system
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Welcome, {user?.displayName}!</strong> This demo shows
                how the progress tracking system works. Try different activities
                to see your progress update in real-time.
              </p>
            </div>
          </div>

          {/* Demo Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {demoModes.map(mode => (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
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
                  <span>Try Demo</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🚀 Progress Tracking Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Real-time Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track questions, challenges, and learning paths in
                      real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Analytics Dashboard
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View detailed analytics and performance insights
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
                      Continue Where Left Off
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Resume your learning from where you stopped
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
                      Achievement System
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Earn badges and achievements for your progress
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400">🔥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Streak Tracking
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Build and maintain learning streaks
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      ⭐
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Points System
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Earn points based on difficulty and performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentMode === 'question') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => setCurrentMode('dashboard')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Demo</span>
            </button>
          </div>
          <QuestionWithProgress
            question={mockQuestion}
            onComplete={handleQuestionComplete}
          />
        </div>
      </div>
    );
  }

  if (currentMode === 'challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => setCurrentMode('dashboard')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Demo</span>
            </button>
          </div>
          <ChallengeWithProgress
            challenge={mockChallenge}
            onComplete={handleChallengeComplete}
          />
        </div>
      </div>
    );
  }

  if (currentMode === 'learning-path') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => setCurrentMode('dashboard')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Demo</span>
            </button>
          </div>
          <LearningPathWithProgress
            learningPath={mockLearningPath}
            onComplete={handleLearningPathComplete}
          />
        </div>
      </div>
    );
  }

  return null;
}
