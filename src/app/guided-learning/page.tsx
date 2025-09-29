'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useLearningPlanTemplates } from '@/hooks/useLearningPlanTemplates';
import {
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Calendar,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Users,
  Star,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Compass,
} from 'lucide-react';

interface LearningPlan {
  id: string;
  name: string;
  duration: number; // in days
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: {
    id: string;
    name: string;
    questions: number;
    weight: number; // percentage of total
  }[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
}

interface DailyGoal {
  day: number;
  date: string;
  questions: number;
  sections: string[];
  completed: boolean;
  progress: number;
}

// Learning plans are now loaded dynamically from Firestore via useLearningPlanTemplates hook

export default function GuidedLearningPage() {
  const { user, isAuthenticated } = useFirebaseAuth();
  const {
    templates: allTemplates,
    isLoading: templatesLoading,
    error: templatesError,
    getTemplate,
  } = useLearningPlanTemplates();
  const router = useRouter();

  // Filter to only show day-based plans (1-day, 2-day, 3-day, 4-day, 5-day, 6-day, 7-day)
  const templates = allTemplates.filter(plan => {
    const dayBasedPlans = [
      '1-day-plan',
      '2-day-plan',
      '3-day-plan',
      '4-day-plan',
      '5-day-plan',
      '6-day-plan',
      '7-day-plan',
    ];
    return dayBasedPlans.includes(plan.id);
  });

  // Debug logging
  useEffect(() => {
    console.log('🔍 GuidedLearning: Templates state changed:', {
      templatesCount: templates.length,
      templatesLoading,
      templatesError,
      templates: templates.map(t => ({ id: t.id, name: t.name })),
    });
  }, [templates, templatesLoading, templatesError]);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedPlans, setCompletedPlans] = useState<Set<string>>(new Set());
  const [planGrades, setPlanGrades] = useState<Map<string, number>>(new Map());
  const [isNavigatingToPlan, setIsNavigatingToPlan] = useState<string | null>(
    null
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/get-started');
    }
  }, [isAuthenticated, router]);

  // Check if user has an active plan
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check localStorage for active plan
      const activePlan = localStorage.getItem('active-guided-plan');
      if (activePlan) {
        try {
          const plan = JSON.parse(activePlan);
          setCurrentPlan(plan);
          generateDailyGoals(plan);
        } catch (error) {
          console.error('Error parsing active plan:', error);
          // If parsing fails, clear the invalid data
          localStorage.removeItem('active-guided-plan');
        }
      }
    }
  }, [isAuthenticated, user]);

  // Load completed plans and grades from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completedPlansData = localStorage.getItem('completed-guided-plans');
      if (completedPlansData) {
        try {
          const completed = JSON.parse(completedPlansData);
          setCompletedPlans(new Set(completed));
        } catch (error) {
          console.error('Error parsing completed plans:', error);
        }
      }

      // Load plan grades
      const planGradesData = localStorage.getItem('plan-grades');
      if (planGradesData) {
        try {
          const grades = JSON.parse(planGradesData);
          setPlanGrades(new Map(Object.entries(grades)));
        } catch (error) {
          console.error('Error parsing plan grades:', error);
        }
      }
    }
  }, []);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90)
      return 'border-yellow-500 dark:border-yellow-400 ring-4 ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20';
    if (percentage >= 80)
      return 'border-green-500 dark:border-green-400 ring-4 ring-green-200 dark:ring-green-800 bg-green-50/50 dark:bg-green-900/20';
    if (percentage >= 70)
      return 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800 bg-blue-50/50 dark:bg-blue-900/20';
    if (percentage >= 60)
      return 'border-orange-500 dark:border-orange-400 ring-4 ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-900/20';
    return 'border-red-500 dark:border-red-400 ring-4 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/20';
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return 'A+ (Excellent!)';
    if (percentage >= 80) return 'A (Great!)';
    if (percentage >= 70) return 'B+ (Good!)';
    if (percentage >= 60) return 'B (Not bad!)';
    return 'C (Keep practicing!)';
  };

  const generateDailyGoals = (plan: LearningPlan) => {
    const goals: DailyGoal[] = [];
    const today = new Date();

    for (let day = 1; day <= plan.duration; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day - 1);

      goals.push({
        day,
        date: date.toLocaleDateString(),
        questions: plan.dailyQuestions,
        sections: plan.sections.map(s => s.name),
        completed: false,
        progress: 0,
      });
    }

    setDailyGoals(goals);
  };

  const handleResumePlan = () => {
    if (currentPlan) {
      router.push('/guided-practice?plan=' + currentPlan.id);
    }
  };

  const handleResetPlan = () => {
    localStorage.removeItem('active-guided-plan');
    localStorage.removeItem('plan-start-date');
    setCurrentPlan(null);
    setDailyGoals([]);
    setCurrentDay(1);
  };

  if (currentPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Active Learning Plan
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your {currentPlan.name} journey
            </p>
          </div>

          {/* Plan Overview */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentPlan.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentPlan.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  Day {currentDay} of {currentPlan.duration}
                </span>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.duration}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Days Total
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Target className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Questions
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Zap className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.dailyQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Daily Goal
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <TrendingUp className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.estimatedTime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Estimated Time
                </div>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Daily Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyGoals.map((goal, index) => (
                  <div
                    key={goal.day}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      goal.day === currentDay
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : goal.completed
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Day {goal.day}
                      </span>
                      {goal.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {goal.date}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {goal.questions} questions
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {goal.sections.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleResumePlan}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>Continue Learning</span>
              </button>
              <button
                onClick={handleResetPlan}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            Redirecting to get started...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110" />

            {/* Main Icon */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Compass className="w-12 h-12 text-white" />

              {/* Rotating Ring */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Choose Your Learning Journey
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Select a structured learning plan tailored to your timeline. Each
            path is carefully crafted to prepare you for frontend interviews
            with progressive difficulty and comprehensive coverage.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {templatesLoading
                  ? '...'
                  : templates.length > 0
                    ? `${Math.min(...templates.map(p => p.totalQuestions))}-${Math.max(...templates.map(p => p.totalQuestions))}`
                    : '100-400'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questions per Plan
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {templatesLoading
                  ? '...'
                  : templates.length > 0
                    ? `${Math.min(...templates.map(p => p.duration))}-${Math.max(...templates.map(p => p.duration))}`
                    : '1-7'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Days Available
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
          </div>
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

        {/* Completion Statistics */}
        {completedPlans.size > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-semibold">
                🎉 You&apos;ve completed {completedPlans.size} learning plan
                {completedPlans.size > 1 ? 's' : ''}!
              </span>
            </div>
          </div>
        )}

        {/* Learning Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {templatesLoading && (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Loader2 className="w-10 h-10 animate-spin text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Loading Learning Plans
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fetching your personalized learning options...
              </p>
            </div>
          )}

          {templatesError && (
            <div className="col-span-full text-center py-8">
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                <strong>Error:</strong> {templatesError}
              </div>
            </div>
          )}

          {!templatesLoading && !templatesError && templates.length === 0 && (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-600 dark:text-gray-400">
                No learning plans found. Using fallback plans...
              </div>
            </div>
          )}

          {templates.map((plan, index) => {
            const planGrade = planGrades.get(plan.id);
            const isCompleted = completedPlans.has(plan.id);

            return (
              <div
                key={plan.id}
                className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  isCompleted && planGrade !== undefined
                    ? getGradeColor(planGrade)
                    : plan.isRecommended
                      ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800'
                      : hoveredPlan === plan.id
                        ? 'border-purple-300 dark:border-purple-600'
                        : 'border-white/20 dark:border-gray-700/20 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => {
                  setIsNavigatingToPlan(plan.id);
                  router.push(`/guided-learning/${plan.id}`);
                }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Recommended Badge */}
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Recommended</span>
                    </div>
                  </div>
                )}

                {/* Completed Badge */}
                {isCompleted && (
                  <div className="absolute -top-3 right-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${
                        planGrade !== undefined
                          ? planGrade >= 90
                            ? 'bg-yellow-500 text-white'
                            : planGrade >= 80
                              ? 'bg-green-500 text-white'
                              : planGrade >= 70
                                ? 'bg-blue-500 text-white'
                                : planGrade >= 60
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>
                        {planGrade !== undefined
                          ? getGradeText(planGrade)
                          : 'Completed'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.duration}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Days
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.totalQuestions}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Questions
                    </div>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : plan.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {plan.difficulty}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  <div
                    className={`flex items-center space-x-2 font-semibold text-sm transition-colors ${
                      isNavigatingToPlan === plan.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : completedPlans.has(plan.id)
                          ? 'text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300'
                          : 'text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
                    }`}
                  >
                    {isNavigatingToPlan === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {completedPlans.has(plan.id)
                            ? 'Review Plan'
                            : 'View Details'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Why Choose Guided Learning?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Clear Learning Objectives</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Achievement Badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
