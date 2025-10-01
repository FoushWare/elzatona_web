'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { SignInPopup } from '@/components/SignInPopup';
import {
  Code,
  Target,
  Brain,
  ArrowRight,
  BookOpen,
  Zap,
  Users,
  Clock,
  CheckCircle,
  Eye,
} from 'lucide-react';

export default function PracticeSelectionPage() {
  const router = useRouter();
  const { isAuthenticated } = useFirebaseAuth();
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const practiceOptions = [
    {
      id: 'browse-questions',
      title: 'Browse Practice Questions',
      description:
        'Explore all available practice questions and choose your preferred learning style',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'indigo',
      path: '/browse-practice-questions',
      features: [
        'Interview questions',
        'Frontend tasks',
        'Problem solving',
        'Multiple categories',
      ],
      stats: 'All Questions',
    },
    {
      id: 'interview-questions',
      title: 'Practice Interview Questions',
      description:
        'Master technical interviews with curated questions from top companies',
      icon: <Users className="w-8 h-8" />,
      color: 'blue',
      path: '/learning-paths',
      features: [
        'Real interview questions',
        'Company-specific practice',
        'Difficulty progression',
        'Time-based challenges',
      ],
      stats: '500+ Questions',
    },
    {
      id: 'frontend-tasks',
      title: 'Practice Frontend Tasks',
      description:
        'Build real-world projects and components to sharpen your skills',
      icon: <Code className="w-8 h-8" />,
      color: 'purple',
      path: '/frontend-tasks',
      features: [
        'Hands-on projects',
        'Component building',
        'UI/UX challenges',
        'Code reviews',
      ],
      stats: '50+ Projects',
    },
    {
      id: 'problem-solving',
      title: 'Practice Problem Solving',
      description:
        'Solve algorithmic and logical problems to improve your thinking',
      icon: <Brain className="w-8 h-8" />,
      color: 'green',
      path: '/problem-solving',
      features: [
        'Algorithm challenges',
        'Data structures',
        'Logic puzzles',
        'Pattern recognition',
      ],
      stats: '200+ Problems',
    },
  ];

  const handleOptionClick = (path: string) => {
    router.push(path);
  };

  const handleCustomRoadmapClick = () => {
    if (isAuthenticated) {
      router.push('/custom-roadmap');
    } else {
      setShowSignInPopup(true);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInPopup(false);
    router.push('/custom-roadmap');
  };

  const handleSignInSkip = () => {
    setShowSignInPopup(false);
    // User can still access other practice options without auth
  };

  const handleSignInClose = () => {
    setShowSignInPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Practice Style
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select how you'd like to practice and improve your frontend
            development skills. Each option offers a unique learning experience
            tailored to different goals.
          </p>
        </div>

        {/* Practice Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {practiceOptions.map(option => (
            <div
              key={option.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleOptionClick(option.path)}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  option.color === 'indigo'
                    ? 'from-indigo-500 to-indigo-600'
                    : option.color === 'purple'
                      ? 'from-purple-500 to-purple-600'
                      : 'from-green-500 to-green-600'
                } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    option.color === 'indigo'
                      ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : option.color === 'purple'
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  {option.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                  {option.description}
                </p>

                {/* Stats */}
                <div className="text-center mb-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      option.color === 'indigo'
                        ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                        : option.color === 'purple'
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    {option.stats}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <button
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      option.color === 'indigo'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : option.color === 'purple'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                    } group-hover:scale-105`}
                  >
                    <span>Start Practicing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current transition-colors duration-300 ${
                  option.color === 'indigo'
                    ? 'group-hover:border-indigo-500'
                    : option.color === 'purple'
                      ? 'group-hover:border-purple-500'
                      : 'group-hover:border-green-500'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Custom Roadmap Option */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-white">
            <h2 className="text-2xl font-bold mb-4">
              Want to Create Your Own Learning Path?
            </h2>
            <p className="text-purple-100 mb-6">
              Build a completely customized learning plan tailored to your
              specific goals, schedule, and interests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleCustomRoadmapClick}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Create Custom Roadmap</span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => router.push('/my-plans')}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>View My Plans</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Not sure which to choose?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Each practice mode is designed for different learning goals. You
              can always switch between them or try multiple approaches.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Interview Prep
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Perfect if you're preparing for technical interviews
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Hands-on Learning
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Great for building practical skills and portfolio
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Problem Solving
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ideal for improving logical thinking and algorithms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Sign-in Popup */}
      {showSignInPopup && (
        <SignInPopup
          isOpen={showSignInPopup}
          onClose={handleSignInClose}
          onSuccess={handleSignInSuccess}
        />
      )}
    </div>
  );
}
