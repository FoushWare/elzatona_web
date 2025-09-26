'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useUserType } from '@/contexts/UserTypeContext';
import { UserStatistics } from '@/components/UserStatistics';
import { GuidedTour } from '@/components/GuidedTour';

export default function HomePage() {
  const { userType } = useUserType();
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [activePlan, setActivePlan] = useState<any>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Check if user should see the tour (first visit)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTour = localStorage.getItem('hasSeenHomepageTour');
      if (!hasSeenTour) {
        // Show tour after animations complete
        const tourTimer = setTimeout(() => {
          setShowTour(true);
        }, 2000);
        return () => clearTimeout(tourTimer);
      }
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenHomepageTour', 'true');
    }
  };

  const handleTourSkip = () => {
    setShowTour(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenHomepageTour', 'true');
    }
  };

  const startTour = () => {
    setShowTour(true);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-80 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="absolute bottom-60 right-10 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: '3s' }}
        ></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30">
          <div className="absolute inset-0 bg-white/10 dark:bg-gray-800/20 rounded-full blur-sm scale-110"></div>
          <img
            src="/elzatona-watermark.png"
            alt="Elzatona Watermark"
            className="w-[400px] h-[400px] object-contain relative z-10"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        {/* Tour Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={startTour}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Take Tour</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            {/* Animated title with sparkles */}
            <div className="relative inline-block">
              <h1
                className={`hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 ${
                  showAnimation
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {personalizedContent.title}
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Interviews
                </span>
              </h1>

              {/* Animated sparkles around title */}
              {showAnimation && (
                <>
                  <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
                  <Zap
                    className="absolute -bottom-2 -left-4 w-6 h-6 text-blue-400 animate-bounce"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <Star
                    className="absolute top-1/2 -right-8 w-5 h-5 text-purple-400 animate-ping"
                    style={{ animationDelay: '1s' }}
                  />
                </>
              )}
            </div>

            {/* Animated subtitle */}
            <p
              className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                showAnimation
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {personalizedContent.subtitle}
            </p>
          </div>

          {/* Animated CTA Button */}
          <div
            className={`mb-12 transition-all duration-1000 delay-500 ${
              showAnimation
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative inline-block">
              <Link
                href={personalizedContent.ctaLink}
                className={`main-cta-button group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r ${
                  personalizedContent.color === 'indigo'
                    ? 'from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    : personalizedContent.color === 'purple'
                      ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                } text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span className="relative z-10 flex items-center space-x-2">
                  {personalizedContent.icon}
                  <span>{personalizedContent.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              {/* Animated pointing arrow */}
              {showAnimation && (
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 animate-bounce">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl animate-pulse">👆</div>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1 animate-pulse">
                      Click here!
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative animated arrow with CSS */}
              {showAnimation && (
                <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    <ArrowRight className="w-8 h-8 text-indigo-500 animate-pulse" />
                    <div className="absolute inset-0">
                      <ArrowRight className="w-8 h-8 text-indigo-500 animate-ping opacity-75" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-indigo-600 dark:text-indigo-400 animate-pulse whitespace-nowrap">
                      Start Learning!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Animated stats */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              showAnimation
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <UserStatistics />
          </div>
        </div>
      </section>

      {/* Animated Quick Actions */}
      <section className="quick-actions-section py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 delay-800 ${
                showAnimation
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Quick Actions
            </h2>
            <p
              className={`text-xl text-gray-600 dark:text-gray-300 transition-all duration-1000 delay-900 ${
                showAnimation
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Jump into learning with these popular options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: '/practice',
                icon: <Code className="w-6 h-6 text-white" />,
                title: 'Practice Challenges',
                description:
                  'Solve real interview questions with our interactive editor',
                color:
                  'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
                iconBg: 'bg-indigo-600',
                delay: 1000,
              },
              {
                href: '/learn',
                icon: <BookOpen className="w-6 h-6 text-white" />,
                title: 'Learning Paths',
                description:
                  'Follow structured paths or create your own roadmap',
                color:
                  'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
                iconBg: 'bg-purple-600',
                delay: 1100,
              },
              {
                href: '/progress',
                icon: <Target className="w-6 h-6 text-white" />,
                title: 'Track Progress',
                description:
                  'Monitor your learning journey and celebrate achievements',
                color:
                  'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
                iconBg: 'bg-blue-600',
                delay: 1200,
              },
              {
                href: '/get-started',
                icon: <Award className="w-6 h-6 text-white" />,
                title: 'Get Started',
                description:
                  'Take our interactive tour and choose your learning style',
                color:
                  'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
                iconBg: 'bg-green-600',
                delay: 1300,
                isHighlighted: true, // Add special highlighting for Get Started
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Link
                  href={item.href}
                  className={`group bg-gradient-to-br ${item.color} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    showAnimation
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  } ${item.isHighlighted ? 'ring-2 ring-green-400 ring-opacity-50 shadow-lg get-started-card' : ''}`}
                  style={{ transitionDelay: `${item.delay}ms` }}
                >
                  <div
                    className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      item.isHighlighted ? 'animate-pulse' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                </Link>

                {/* Animated arrow for Get Started card */}
                {item.isHighlighted && showAnimation && (
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className="relative">
                      <ArrowRight className="w-6 h-6 text-green-500 animate-bounce" />
                      <div className="absolute inset-0">
                        <ArrowRight className="w-6 h-6 text-green-500 animate-ping opacity-75" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pulsing border for Get Started card */}
                {item.isHighlighted && showAnimation && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-green-400 animate-ping opacity-20 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated User Type Specific Content */}
      {userType && (
        <section
          className={`py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-1400 ${
            showAnimation
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {userType === 'guided' ? (
              <div
                className={`bg-gradient-to-r ${
                  hasActivePlan
                    ? 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                    : 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
                } rounded-2xl p-8 relative overflow-hidden`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-8 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                </div>

                <div className="text-center relative z-10">
                  <div
                    className={`w-16 h-16 ${
                      hasActivePlan ? 'bg-green-600' : 'bg-indigo-600'
                    } rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}
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
                    <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
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
                    } text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                  >
                    <span>{personalizedContent.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-6 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="absolute top-12 right-12 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-12 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 right-6 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                </div>

                <div className="text-center relative z-10">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
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
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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

      {/* Animated Call-to-Action Section */}
      {!userType && (
        <section
          className={`final-cta-section py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-1500 ${
            showAnimation
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 left-8 w-6 h-6 bg-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-4 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Ace Your Interviews? 🚀
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who have mastered frontend
                  interviews with our comprehensive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/get-started"
                    className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Learning Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/learn"
                    className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Explore Learning Paths</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guided Tour */}
      <GuidedTour
        isOpen={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />
    </div>
  );
}
