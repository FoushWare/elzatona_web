'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Play,
  Code,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Users,
  Award,
  Map,
  Compass,
} from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContext';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { UserStatistics } from '@/components/UserStatistics';

export default function HomePage() {
  const { userType, hasCompletedOnboarding, isFirstVisit } = useUserType();
  const { isAuthenticated } = useFirebaseAuth();
  const router = useRouter();
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [activePlan, setActivePlan] = useState<any>(null);

  useEffect(() => {
    // Show onboarding prompt if user hasn't completed it and it's not a first visit
    if (!hasCompletedOnboarding && !userType && !isFirstVisit) {
      const timer = setTimeout(() => {
        setShowOnboardingPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedOnboarding, userType, isFirstVisit]);

  // Check for active guided learning plan
  useEffect(() => {
    if (userType === 'guided' && typeof window !== 'undefined') {
      const activePlanData = localStorage.getItem('active-guided-plan');
      if (activePlanData) {
        try {
          const plan = JSON.parse(activePlanData);
          setActivePlan(plan);
          setHasActivePlan(true);
        } catch (error) {
          console.error('Error parsing active plan:', error);
          localStorage.removeItem('active-guided-plan');
        }
      }
    }
  }, [userType]);

  const getPersonalizedContent = () => {
    if (userType === 'guided') {
      if (hasActivePlan && activePlan) {
        return {
          title: `Continue ${activePlan.name}`,
          subtitle: `Pick up where you left off with your ${activePlan.name.toLowerCase()}`,
          cta: 'Continue Practice',
          ctaLink: `/guided-practice?plan=${activePlan.id}`,
          icon: <Play className="w-6 h-6" />,
          color: 'green',
        };
      } else {
        return {
          title: 'Start Your Learning Path',
          subtitle: 'Choose a structured learning plan to begin your journey',
          cta: 'Choose Learning Plan',
          ctaLink: '/guided-learning',
          icon: <Map className="w-6 h-6" />,
          color: 'indigo',
        };
      }
    } else if (userType === 'self-directed') {
      return {
        title: 'Build Your Custom Roadmap',
        subtitle: 'Create and manage your personalized learning journey',
        cta: 'View My Roadmap',
        ctaLink: '/free-style-roadmap',
        icon: <Compass className="w-6 h-6" />,
        color: 'purple',
      };
    } else {
      return {
        title: 'Master Frontend Development',
        subtitle: 'The complete platform to ace your frontend interviews',
        cta: 'Get Started',
        ctaLink: '/get-started',
        icon: <Play className="w-6 h-6" />,
        color: 'indigo',
      };
    }
  };

  const personalizedContent = getPersonalizedContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {personalizedContent.title}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Interviews
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {personalizedContent.subtitle}
            </p>
          </div>

          {/* Personalized CTA */}
          <div className="mb-12">
            <Link
              href={personalizedContent.ctaLink}
              className={`inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r ${
                personalizedContent.color === 'indigo'
                  ? 'from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              {personalizedContent.icon}
              <span>{personalizedContent.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Dynamic Stats */}
          <UserStatistics />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Jump into learning with these popular options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/practice"
              className="group bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Practice Challenges
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Solve real interview questions with our interactive editor
              </p>
            </Link>

            <Link
              href="/learn"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Learning Paths
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Follow structured paths or create your own roadmap
              </p>
            </Link>

            <Link
              href="/progress"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor your learning journey and celebrate achievements
              </p>
            </Link>

            <Link
              href="/get-started"
              className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Started
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Take our interactive tour and choose your learning style
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* User Type Specific Content */}
      {userType && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {userType === 'guided' ? (
              <div
                className={`bg-gradient-to-r ${
                  hasActivePlan
                    ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                    : 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
                } rounded-2xl p-8`}
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${
                      hasActivePlan ? 'bg-green-600' : 'bg-indigo-600'
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    {personalizedContent.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {personalizedContent.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {personalizedContent.subtitle}
                  </p>
                  {hasActivePlan && activePlan && (
                    <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Current Plan:{' '}
                        <span className="font-semibold">{activePlan.name}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {activePlan.totalQuestions} questions •{' '}
                        {activePlan.estimatedTime}
                      </div>
                    </div>
                  )}
                  <Link
                    href={personalizedContent.ctaLink}
                    className={`inline-flex items-center space-x-2 px-6 py-3 ${
                      hasActivePlan
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white rounded-lg font-medium transition-colors`}
                  >
                    <span>{personalizedContent.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Self-Directed Learning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You're creating your own roadmap. Explore content freely and
                    build your personalized learning journey.
                  </p>
                  <Link
                    href="/free-style-roadmap"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>View My Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Onboarding Prompt */}
      {showOnboardingPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Welcome to Elzatona web!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's personalize your learning experience. Choose how you'd
                like to learn.
              </p>
              <div className="space-y-3">
                <Link
                  href="/get-started"
                  className="block w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Choose Learning Style
                </Link>
                <button
                  onClick={() => setShowOnboardingPrompt(false)}
                  className="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
