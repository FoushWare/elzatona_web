'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import {
  Compass,
  Brain,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Zap,
  Users,
  TrendingUp,
  Star,
  Loader2,
} from 'lucide-react';

interface LearningMode {
  id: 'guided' | 'self-directed';
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  features: string[];
  benefits: string[];
  timeCommitment: string;
  difficulty: string;
  bestFor: string[];
}

const learningModes: LearningMode[] = [
  {
    id: 'guided',
    name: 'Guided Learning',
    description:
      'Structured learning paths with clear milestones and progress tracking',
    icon: <Compass className="w-8 h-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    features: [
      'Pre-defined learning paths (1-7 days)',
      'Daily learning goals and milestones',
      'Progress tracking and analytics',
      'Adaptive question selection',
      'Achievement badges and rewards',
    ],
    benefits: [
      'Clear learning objectives',
      'Structured progression',
      'Motivation through milestones',
      'Focused study sessions',
    ],
    timeCommitment: '15-45 minutes daily',
    difficulty: 'Beginner to Intermediate',
    bestFor: [
      'First-time interview candidates',
      'Structured learners',
      'Those with limited time',
      'Goal-oriented individuals',
    ],
  },
  {
    id: 'self-directed',
    name: 'Free Style Learning',
    description: 'Flexible learning where you explore topics at your own pace',
    icon: <Brain className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    features: [
      'Custom roadmap creation',
      'Access to all sections anytime',
      'Flexible timeline (1-N days)',
      'Custom question count selection',
      'Personal learning preferences',
    ],
    benefits: [
      'Complete flexibility',
      'Personalized learning',
      'Self-paced progression',
      'Exploration freedom',
    ],
    timeCommitment: 'Flexible (5 minutes to 2+ hours)',
    difficulty: 'All levels',
    bestFor: [
      'Experienced developers',
      'Self-motivated learners',
      'Those with varying schedules',
      'Exploration-focused individuals',
    ],
  },
];

export default function LearningModePage() {
  const { userType, setUserType } = useUserType();
  const { isAuthenticated, user } = useFirebaseAuth();
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<
    'guided' | 'self-directed' | null
  >(userType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModeSelection = async (mode: 'guided' | 'self-directed') => {
    setIsSubmitting(true);
    try {
      setSelectedMode(mode);
      setUserType(mode);

      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect based on selected mode
      if (mode === 'guided') {
        router.push('/learn');
      } else {
        router.push('/free-style-roadmap');
      }
    } catch (error) {
      console.error('Error selecting learning mode:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/practice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Style
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Select the learning approach that best fits your style and schedule.
            You can always switch between modes later.
          </p>
        </div>

        {/* User Status */}
        {isAuthenticated && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Welcome back, {user?.displayName || 'User'}! Your progress will
                be saved.
              </span>
            </div>
          </div>
        )}

        {/* Learning Modes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {learningModes.map(mode => (
            <div
              key={mode.id}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                selectedMode === mode.id
                  ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800'
                  : 'border-white/20 dark:border-gray-700/20 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedMode(mode.id)}
            >
              {/* Selection Indicator */}
              {selectedMode === mode.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Mode Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-16 h-16 ${mode.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <div className={mode.color}>{mode.icon}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mode.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mode.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {mode.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {mode.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Time
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {mode.timeCommitment}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Target className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Level
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {mode.difficulty}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Best For
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    See below
                  </div>
                </div>
              </div>

              {/* Best For */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                  Best For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mode.bestFor.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={() => handleModeSelection(mode.id)}
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedMode === mode.id
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting && selectedMode === mode.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {selectedMode === mode.id
                        ? 'Selected'
                        : 'Select This Mode'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Not sure which one to choose? You can always switch between modes
            later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Skip for now
            </button>
            {selectedMode && (
              <button
                onClick={() => handleModeSelection(selectedMode)}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Getting Started...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Continue with{' '}
                      {selectedMode === 'guided'
                        ? 'Guided Learning'
                        : 'Free Style Learning'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
