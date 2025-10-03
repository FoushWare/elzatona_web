'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useLearningPlanTemplates } from '@/hooks/useLearningPlanTemplates';
import {
  ArrowLeft,
  Clock,
  Target,
  CheckCircle,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Users,
  Star,
  Play,
  Calendar,
  BarChart3,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export default function LearningPlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useFirebaseAuth();
  const { templates, isLoading, getTemplate } = useLearningPlanTemplates();
  const [isStarting, setIsStarting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const planId = params?.planId as string;
  const plan = getTemplate(planId);

  // Add loading state for navigation
  const handleBackClick = () => {
    setIsNavigating(true);
    router.push('/guided-learning');
  };

  const handleStartPlan = async (selectedPlan: NonNullable<typeof plan>) => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (!selectedPlan) {
      console.error('No plan selected');
      return;
    }

    setIsStarting(true);
    try {
      // Save the plan to localStorage for the practice session
      localStorage.setItem('active-guided-plan', JSON.stringify(selectedPlan));

      // Save to Firestore if authenticated
      if (isAuthenticated && user) {
        // This would be handled by the useLearningPlans hook
        console.log('Saving plan to Firestore:', selectedPlan);
      }

      // Redirect to practice
      router.push(`/guided-practice?plan=${selectedPlan.id}`);
    } catch (error) {
      console.error('Error starting plan:', error);
    } finally {
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Plan Details
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fetching your learning plan...
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Plan Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The learning plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/guided-learning')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Learning Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          disabled={isNavigating}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isNavigating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowLeft className="w-5 h-5" />
          )}
          <span>{isNavigating ? 'Loading...' : 'Back to Learning Plans'}</span>
        </button>

        {/* Plan Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110" />

            {/* Plan Icon */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Calendar className="w-12 h-12 text-white" />

              {/* Rotating Ring */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {plan.name}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            {plan.description}
          </p>

          {/* Plan Badges */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {plan.isRecommended && (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Recommended</span>
              </div>
            )}
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
              {plan.difficulty} Level
            </div>
          </div>
        </div>

        {/* Plan Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.totalQuestions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Questions
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.duration}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.estimatedTime}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Duration
            </div>
          </div>
        </div>

        {/* Learning Sections */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
            Learning Sections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.sections
              .filter(
                (section: any) =>
                  section.questions && section.questions.length > 0
              )
              .map((section: any, index: number) => {
                const actualQuestionCount = section.questions
                  ? section.questions.length
                  : 0;

                return (
                  <div
                    key={section.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      // This will be used to auto-select category in questions manager
                      console.log('Section clicked:', section);
                      // Store the section category for use in questions manager
                      if (section.category) {
                        localStorage.setItem(
                          'selectedSectionCategory',
                          section.category
                        );
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {section.name}
                          </h3>
                          {section.category && (
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              Category: {section.category}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {actualQuestionCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          questions
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${section.weight}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {section.weight}% of total plan
                    </div>
                  </div>
                );
              })}
          </div>

          {plan.sections.filter(
            (section: any) => section.questions && section.questions.length > 0
          ).length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Questions Added Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Questions need to be added to the plan sections before you can
                start learning.
              </p>
              <button
                onClick={() => router.push('/admin/guided-learning')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Manage Plan Questions
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
            What You&apos;ll Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.features.map((feature: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-green-600" />
            Daily Schedule
          </h2>

          <div className="space-y-4">
            {Array.from({ length: plan.duration }, (_, dayIndex) => {
              const dayNumber = dayIndex + 1;
              const dailyQuestions = Math.ceil(
                plan.totalQuestions / plan.duration
              );
              const sectionsForDay = plan.sections.slice(
                0,
                Math.ceil(plan.sections.length / plan.duration)
              );

              return (
                <div
                  key={dayIndex}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {dayNumber}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Day {dayNumber}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {dailyQuestions} questions •{' '}
                      {sectionsForDay.map((s: any) => s.name).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ~{plan.estimatedTime}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Plan Button */}
        <div className="text-center">
          <button
            onClick={() => plan && handleStartPlan(plan)}
            disabled={isStarting || !plan}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
          >
            {isStarting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Starting Your Learning Journey...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span>Start {plan.name}</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>

          {!isAuthenticated && (
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              You&apos;ll be prompted to sign in before starting
            </p>
          )}

          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            Ready to begin your {plan.duration}-day learning journey?
          </p>
        </div>
      </div>
    </div>
  );
}
